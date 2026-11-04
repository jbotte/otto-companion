'use strict';
const { WebSocketServer } = require('ws');

/**
 * WebSocket JSON-RPC endpoint Otto (or the CLI) talks to.
 * Messages in:  { id, method, params }
 * Messages out: { id, ok, result | error }  plus  { event: '...' } broadcasts.
 * Methods in `requiresApproval` trigger a native Allow/Deny dialog first.
 */
class AgentServer {
  constructor() {
    this.wss = null;
    this.methods = {};
    this.requiresApproval = new Set();
    this.requestApproval = async () => false;
    this.log = () => {};
    this.emit = () => {};
    this.host = '127.0.0.1';
    this.port = 9223;
  }

  start({ host = '127.0.0.1', port = 9223, token }) {
    this.stop();
    if (!token) throw new Error('agent server requires a token');
    this.host = host;
    this.port = Number(port);
    this.wss = new WebSocketServer({ host, port: this.port });
    this.wss.on('connection', (ws, req) => {
      let url;
      try { url = new URL(req.url, 'http://local'); } catch { ws.close(4400, 'bad request'); return; }
      if (url.searchParams.get('token') !== token) {
        ws.close(4401, 'unauthorized');
        this.emit('status', { clients: this.wss.clients.size, note: 'rejected: bad token' });
        return;
      }
      this.emit('client', { text: `agent connected from ${req.socket.remoteAddress}` });
      this.emit('status', { clients: this.wss.clients.size });
      ws.on('message', async (buf) => {
        let msg;
        try { msg = JSON.parse(buf.toString()); } catch { ws.send(JSON.stringify({ ok: false, error: 'invalid JSON' })); return; }
        await this.handle(ws, msg);
      });
      ws.on('close', () => this.emit('status', { clients: this.wss.clients.size }));
    });
    this.wss.on('error', (e) => this.emit('status', { error: String(e.message || e) }));
    return { host: this.host, port: this.port };
  }

  async handle(ws, msg) {
    const { id, method, params = {} } = msg || {};
    const reply = (obj) => {
      if (ws.readyState === ws.OPEN) ws.send(JSON.stringify({ id, ...obj }));
    };
    if (method === 'ping') return reply({ ok: true, result: { pong: Date.now() } });
    const fn = this.methods[method];
    if (!fn) return reply({ ok: false, error: 'unknown method: ' + method });
    if (this.requiresApproval.has(method)) {
      this.emit('approval', { method, params });
      let allowed = false;
      try { allowed = await this.requestApproval(method, params); } catch { allowed = false; }
      this.emit('approval-result', { method, allowed });
      if (!allowed) return reply({ ok: false, error: 'denied by user' });
    }
    this.emit('call', { method, params });
    try {
      const result = await fn(params);
      reply({ ok: true, result });
    } catch (e) {
      reply({ ok: false, error: String((e && e.message) || e) });
    }
  }

  stop() {
    if (this.wss) { try { this.wss.close(); } catch {} this.wss = null; }
  }
}

module.exports = { AgentServer };
