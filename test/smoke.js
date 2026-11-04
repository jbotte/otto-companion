'use strict';
/*
 * Non-Electron smoke test: starts the agent WebSocket server and the scoped
 * file-share HTTP server with stubbed store, then exercises both from Node.
 * Run: node test/smoke.js   (needs `npm install` for ws)
 */
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { AgentServer } = require('../src/main/agent-server');
const { FileShare } = require('../src/main/file-share');

class MemStore {
  constructor() { this.data = {}; }
  get(k, f) { return this.data[k] === undefined ? f : this.data[k]; }
  set(k, v) { this.data[k] = v; }
}

const t0 = 'smoke-secret-value';
const QS = new URLSearchParams(); QS.set('token', t0); const qstr = QS.toString();
const PORT_WS = 9323, PORT_HTTP = 9324;

(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'otto-share-'));
  const store = new MemStore();
  const files = new FileShare(store);
  const folder = files.addFolder(dir);

  const agent = new AgentServer();
  agent.methods = {
    'fs.folders': () => files.folders(),
    'fs.list': ({ folder: f, path: p }) => files.list(f, p),
    'fs.write': ({ folder: f, path: p, content }) => files.write(f, p, content),
    'fs.delete': ({ folder: f, path: p }) => files.remove(f, p)
  };
  agent.requiresApproval = new Set();
  agent.start({ host: '127.0.0.1', port: PORT_WS, token: t0 });
  files.start({ host: '127.0.0.1', port: PORT_HTTP, token: t0 });
  await new Promise((r) => setTimeout(r, 200));

  // --- HTTP: status + write + list (authenticated)
  const H = { 'content-type': 'application/json', 'x-otto-token': t0 };
  let res = await fetch(`http://127.0.0.1:${PORT_HTTP}/status?${qstr}`);
  let body = await res.json();
  assert(body.ok && body.result.folders.length === 1, 'status should list one folder');
  console.log('PASS http status');

  res = await fetch(`http://127.0.0.1:${PORT_HTTP}/status?token=wrong`);
  assert(res.status === 401, 'bad token must 401');
  console.log('PASS http auth reject');

  res = await fetch(`http://127.0.0.1:${PORT_HTTP}/write`, {
    method: 'POST', headers: H,
    body: JSON.stringify({ folder: folder.id, path: 'notes/hello.txt', content: 'hi from smoke' })
  });
  body = await res.json();
  assert(body.ok && body.result.bytes > 0, 'write failed');
  assert(fs.readFileSync(path.join(dir, 'notes/hello.txt'), 'utf8') === 'hi from smoke', 'content mismatch');
  console.log('PASS http write + nested dirs');

  res = await fetch(`http://127.0.0.1:${PORT_HTTP}/list?${qstr}&folder=${folder.id}&path=notes`);
  body = await res.json();
  assert(body.ok && body.result.entries.some((e) => e.name === 'hello.txt'), 'list failed');
  console.log('PASS http list');

  // path escape must fail
  res = await fetch(`http://127.0.0.1:${PORT_HTTP}/read?${qstr}&folder=${folder.id}&path=../../etc/passwd`);
  body = await res.json();
  assert(!body.ok && /escapes/.test(body.error), 'path escape should be refused: ' + JSON.stringify(body));
  console.log('PASS path-escape guard');

  // read-only enforcement
  store.data.folders[0].readOnly = true;
  res = await fetch(`http://127.0.0.1:${PORT_HTTP}/write`, {
    method: 'POST', headers: H,
    body: JSON.stringify({ folder: folder.id, path: 'blocked.txt', content: 'nope' })
  });
  body = await res.json();
  assert(!body.ok && /read-only/.test(body.error), 'readOnly must block writes');
  store.data.folders[0].readOnly = false;
  console.log('PASS read-only flag');

  // --- WS: JSON-RPC happy path + bad token
  const rpc = (method, params) => new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://127.0.0.1:${PORT_WS}/?${qstr}`);
    const timer = setTimeout(() => reject(new Error('ws timeout')), 5000);
    ws.addEventListener('open', () => ws.send(JSON.stringify({ id: 1, method, params })));
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id === 1) { clearTimeout(timer); ws.close(); resolve(msg); }
    });
    ws.addEventListener('error', (e) => { clearTimeout(timer); reject(new Error('ws error ' + (e.message || ''))); });
  });

  let msg = await rpc('fs.write', { folder: folder.id, path: 'from-rpc.txt', content: 'rpc works' });
  assert(msg.ok && msg.result.bytes > 0, 'rpc write failed: ' + JSON.stringify(msg));
  msg = await rpc('fs.list', { folder: folder.id, path: '' });
  assert(msg.ok && msg.result.entries.some((e) => e.name === 'from-rpc.txt'), 'rpc list failed');
  console.log('PASS ws json-rpc write/list');

  const bad = new WebSocket(`ws://127.0.0.1:${PORT_WS}/?token=nope`);
  const code = await new Promise((resolve) => bad.addEventListener('close', (ev) => resolve(ev.code)));
  assert(code === 4401, 'bad-token ws must close 4401, got ' + code);
  console.log('PASS ws auth reject');

  agent.stop();
  files.stop();
  fs.rmSync(dir, { recursive: true, force: true });
  console.log('\nALL SMOKE TESTS PASSED');
  process.exit(0);
})().catch((e) => { console.error('SMOKE FAIL:', e.message); process.exit(1); });
