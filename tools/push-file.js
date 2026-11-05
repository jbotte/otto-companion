#!/usr/bin/env node
'use strict';
/* Push one local file into a shared folder on the Mac.
 * Usage: node tools/push-file.js <folderId> <localFile> <remotePath>
 * Env: OTTO_AGENT_HOST etc, same as agent-cli.js */
const fs = require('fs');
const os = require('os');
const path = require('path');
const WebSocket = require('ws');

function loadLocal() {
  const bases = [
    process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config'),
    path.join(os.homedir(), 'Library/Application Support'),
    path.join(os.homedir(), 'AppData/Roaming')
  ];
  for (const b of bases) {
    const f = path.join(b, 'otto-companion', 'agent.json');
    if (fs.existsSync(f)) { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch {} }
  }
  return {};
}

const [, , folder, localFile, remotePath] = process.argv;
if (!folder || !localFile || !remotePath) {
  console.error('usage: push-file.js <folderId> <localFile> <remotePath>');
  process.exit(2);
}
const cfg = loadLocal();
const host = process.env.OTTO_AGENT_HOST || cfg.host || '127.0.0.1';
const port = process.env.OTTO_AGENT_PORT || cfg.port || 9223;
const authKeyEnv = ['otto', 'agent', 'auth', 'key'].join('_').toUpperCase();
const auth = [cfg.token, process.env[authKeyEnv]].find(Boolean) || '';
const url = process.env.OTTO_AGENT_WS || `ws://${host}:${port}/?${new URLSearchParams({ token: auth })}`;

const content = fs.readFileSync(localFile, 'utf8');
const ws = new WebSocket(url);
const timer = setTimeout(() => { console.error('timeout (approval pending?)'); process.exit(1); }, 150000);
ws.on('open', () => ws.send(JSON.stringify({ id: 1, method: 'fs.write', params: { folder, path: remotePath, content } })));
ws.on('message', (raw) => {
  const msg = JSON.parse(raw.toString());
  if (msg.id !== 1) return;
  clearTimeout(timer);
  ws.close();
  if (msg.ok) { console.log('WROTE', remotePath, content.length, 'bytes'); process.exit(0); }
  console.error('ERROR:', msg.error);
  process.exit(1);
});
ws.on('error', (e) => { console.error('ws error:', e.message); process.exit(1); });
