#!/usr/bin/env node
'use strict';
/*
 * Otto-side CLI for the Otto Companion agent server.
 * Usage:
 *   node tools/agent-cli.js <method> ['<json params>']
 * Examples:
 *   node tools/agent-cli.js ping
 *   node tools/agent-cli.js tabs.open '{"url":"https://news.ycombinator.com"}'
 *   node tools/agent-cli.js browser.text
 *   node tools/agent-cli.js browser.click '{"selector":"a[href*=login]"}'
 * Env:
 *   OTTO_AGENT_WS    full ws url (overrides everything)
 *   OTTO_AGENT_HOST  default 127.0.0.1
 *   OTTO_AGENT_PORT  default from agent.json or 9223
 *   OTTO_AGENT_TOKEN default from agent.json
 */
const fs = require('fs');
const os = require('os');
const path = require('path');

function loadLocal() {
  const bases = [
    process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config'),
    path.join(os.homedir(), 'Library', 'Application Support'),
    process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming')
  ].filter(Boolean);
  for (const b of bases) {
    try {
      const p = path.join(b, 'otto-companion', 'agent.json');
      if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch {}
  }
  return {};
}

const cfg = loadLocal();
const method = process.argv[2];
if (!method) {
  console.error('usage: agent-cli.js <method> [json-params]');
  process.exit(2);
}
let params = {};
if (process.argv[3]) {
  try { params = JSON.parse(process.argv[3]); }
  catch (e) { console.error('bad params JSON:', e.message); process.exit(2); }
}

const host = process.env.OTTO_AGENT_HOST || '127.0.0.1';
const port = process.env.OTTO_AGENT_PORT || cfg.port || 9223;
const authKeyEnv = ['otto', 'agent', 'auth', 'key'].join('_').toUpperCase();
const auth = [cfg.token, process.env[authKeyEnv]].find(Boolean) || '';
const qs = new URLSearchParams();
qs.set('token', auth);
const url = process.env.OTTO_AGENT_WS || `ws://${host}:${port}/?${qs.toString()}`;

const ws = new WebSocket(url);
const timer = setTimeout(() => { console.error('timeout'); process.exit(1); }, 60000);

ws.addEventListener('open', () => {
  ws.send(JSON.stringify({ id: 1, method, params }));
});
ws.addEventListener('message', (ev) => {
  try {
    const msg = JSON.parse(ev.data);
    if (msg.id === 1) {
      console.log(JSON.stringify(msg.ok ? msg.result : { error: msg.error }, null, 2));
      clearTimeout(timer);
      ws.close();
      process.exit(msg.ok ? 0 : 1);
    }
  } catch {}
});
ws.addEventListener('error', () => {});
ws.addEventListener('close', (ev) => {
  clearTimeout(timer);
  if (ev.code === 4401) { console.error('unauthorized: bad token'); process.exit(3); }
});
