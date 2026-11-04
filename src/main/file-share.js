'use strict';
const http = require('http');
const fsp = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const MAX_JSON_BODY = 64 * 1024 * 1024;
const MAX_INLINE_READ = 2 * 1024 * 1024;
const MIME = {
  '.html': 'text/html', '.htm': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.pdf': 'application/pdf',
  '.txt': 'text/plain', '.md': 'text/plain', '.zip': 'application/zip', '.mp4': 'video/mp4',
  '.csv': 'text/csv', '.xml': 'application/xml'
};

/**
 * Scoped file sharing: only the folders the owner explicitly designates are
 * reachable. Served over a token-authenticated HTTP API bound to localhost
 * (or all interfaces when LAN/tailnet mode is on). SFTP mode is a planned
 * alternative (see PROJECT_PLAN.md).
 */
class FileShare {
  constructor(store, emit = () => {}) {
    this.store = store;
    this.emit = emit;
    this.server = null;
    this.host = '127.0.0.1';
    this.port = 9224;
    this.token = null;
  }

  folders() { return this.store.get('folders', []); }

  addFolder(fsPath) {
    const list = this.folders();
    if (list.some((f) => f.path === fsPath)) throw new Error('already shared: ' + fsPath);
    const folder = { id: crypto.randomBytes(4).toString('hex'), name: path.basename(fsPath) || fsPath, path: fsPath, readOnly: false };
    list.push(folder);
    this.store.set('folders', list);
    this.emit('folders', list);
    return folder;
  }

  removeFolder(id) {
    const list = this.folders().filter((f) => f.id !== id);
    this.store.set('folders', list);
    this.emit('folders', list);
  }

  folder(id) {
    const f = this.folders().find((x) => x.id === id);
    if (!f) throw new Error('folder not shared: ' + id);
    return f;
  }

  safeJoin(folder, rel = '') {
    const root = path.resolve(folder.path);
    const cleaned = '/' + String(rel).replace(/^[/\\]+/, '').replace(/\\/g, '/');
    const p = path.resolve(root + cleaned);
    if (p !== root && !p.startsWith(root + path.sep)) throw new Error('path escapes share');
    return p;
  }

  async list(folderId, rel = '') {
    const dir = this.safeJoin(this.folder(folderId), rel);
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    const out = [];
    for (const e of entries.slice(0, 5000)) {
      let size = null, mtime = null;
      try { const st = await fsp.stat(path.join(dir, e.name)); size = st.size; mtime = st.mtimeMs; } catch {}
      out.push({ name: e.name, dir: e.isDirectory(), size, mtime });
    }
    return { dir, entries: out };
  }

  async read(folderId, rel) {
    const f = this.folder(folderId);
    const p = this.safeJoin(f, rel);
    const st = await fsp.stat(p);
    if (st.isDirectory()) throw new Error('is a directory: ' + rel);
    if (st.size > MAX_INLINE_READ) throw new Error('too big for inline read (' + st.size + ' bytes); use GET /download');
    return { path: rel, size: st.size, content: await fsp.readFile(p, 'utf8') };
  }

  async write(folderId, rel, content, encoding = 'utf8') {
    const f = this.folder(folderId);
    if (f.readOnly) throw new Error('folder is read-only: ' + f.name);
    const p = this.safeJoin(f, rel);
    await fsp.mkdir(path.dirname(p), { recursive: true });
    const buf = encoding === 'base64' ? Buffer.from(content, 'base64') : Buffer.from(String(content), 'utf8');
    await fsp.writeFile(p, buf);
    return { path: rel, bytes: buf.length };
  }

  async mkdir(folderId, rel) {
    const f = this.folder(folderId);
    if (f.readOnly) throw new Error('folder is read-only: ' + f.name);
    const p = this.safeJoin(f, rel);
    await fsp.mkdir(p, { recursive: true });
    return { path: rel };
  }

  async remove(folderId, rel) {
    const f = this.folder(folderId);
    if (f.readOnly) throw new Error('folder is read-only: ' + f.name);
    const p = this.safeJoin(f, rel);
    await fsp.rm(p, { recursive: true, force: true });
    return { removed: rel };
  }

  start({ host = '127.0.0.1', port = 9224, token }) {
    this.stop();
    this.host = host;
    this.port = Number(port);
    this.token = token;
    this.server = http.createServer((req, res) => this.route(req, res).catch((e) => this.send(res, 500, { ok: false, error: String(e.message || e) })));
    this.server.listen(this.port, this.host);
    return { host: this.host, port: this.port };
  }

  stop() {
    if (this.server) { try { this.server.close(); } catch {} this.server = null; }
  }

  equal(a, b) {
    const ba = Buffer.from(String(a)), bb = Buffer.from(String(b));
    return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
  }

  send(res, code, obj) {
    const body = JSON.stringify(obj);
    res.writeHead(code, { 'content-type': 'application/json' });
    res.end(body);
  }

  async readBody(req) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      let len = 0;
      req.on('data', (c) => {
        len += c.length;
        if (len > MAX_JSON_BODY) { reject(new Error('body too large')); req.destroy(); return; }
        chunks.push(c);
      });
      req.on('end', () => {
        if (!chunks.length) return resolve({});
        try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch { reject(new Error('invalid JSON body')); }
      });
      req.on('error', reject);
    });
  }

  async route(req, res) {
    const url = new URL(req.url, 'http://local');
    const token = req.headers['x-otto-token'] || url.searchParams.get('token');
    if (!this.token || !this.equal(token || '', this.token)) return this.send(res, 401, { ok: false, error: 'unauthorized' });
    const q = url.searchParams;

    if (req.method === 'GET' && url.pathname === '/status') {
      return this.send(res, 200, { ok: true, result: { folders: this.folders().map(({ id, name, readOnly }) => ({ id, name, readOnly })) } });
    }
    if (req.method === 'GET' && url.pathname === '/list') {
      return this.send(res, 200, { ok: true, result: await this.list(q.get('folder'), q.get('path') || '') });
    }
    if (req.method === 'GET' && url.pathname === '/read') {
      return this.send(res, 200, { ok: true, result: await this.read(q.get('folder'), q.get('path')) });
    }
    if (req.method === 'GET' && url.pathname === '/download') {
      const f = this.folder(q.get('folder'));
      const p = this.safeJoin(f, q.get('path') || '');
      const st = await fsp.stat(p);
      if (st.isDirectory()) throw new Error('is a directory');
      res.writeHead(200, {
        'content-type': MIME[path.extname(p).toLowerCase()] || 'application/octet-stream',
        'content-length': st.size,
        'content-disposition': 'attachment; filename="' + path.basename(p).replace(/"/g, '') + '"'
      });
      const stream = require('fs').createReadStream(p);
      stream.pipe(res);
      return;
    }
    if (req.method === 'POST' && url.pathname === '/write') {
      const b = await this.readBody(req);
      return this.send(res, 200, { ok: true, result: await this.write(b.folder, b.path, b.content ?? '', b.encoding) });
    }
    if (req.method === 'POST' && url.pathname === '/mkdir') {
      const b = await this.readBody(req);
      return this.send(res, 200, { ok: true, result: await this.mkdir(b.folder, b.path) });
    }
    if (req.method === 'POST' && url.pathname === '/delete') {
      const b = await this.readBody(req);
      return this.send(res, 200, { ok: true, result: await this.remove(b.folder, b.path) });
    }
    return this.send(res, 404, { ok: false, error: 'not found' });
  }
}

module.exports = { FileShare };
