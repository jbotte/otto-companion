'use strict';
const { WebContentsView, session } = require('electron');
const crypto = require('crypto');

const LEVELS = ['verbose', 'info', 'warning', 'error'];
const CONSOLE_CAP = 400;
const NET_CAP = 600;

/**
 * Owns all browsed tabs (WebContentsView), browser profiles (persist: partitions),
 * console + network capture, and the CDP debugger bridge Otto drives.
 */
class BrowserManager {
  constructor(win, store, emit) {
    this.win = win;
    this.store = store;
    this.emit = emit; // (type, payload) -> main forwards to renderer + agent log
    this.tabs = new Map(); // id -> { id, profile, view, url, title }
    this.activeTabId = null;
    this.tabSeq = 1;
    this.bounds = { x: 0, y: 0, width: 0, height: 0 };
    this.hooked = new Set(); // partitions with webRequest hooks
    this.netLog = []; // { ts, partition, method, url, statusCode?, error?, resourceType }
  }

  // ---------- profiles ----------
  profiles() {
    let list = this.store.get('profiles');
    if (!list || !list.length) {
      list = [{ id: 'default', name: 'Default' }];
      this.store.set('profiles', list);
    }
    return list;
  }

  addProfile(name) {
    const list = this.profiles();
    if (list.some((p) => p.name.toLowerCase() === String(name).toLowerCase())) {
      throw new Error('profile already exists: ' + name);
    }
    const id = String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + crypto.randomBytes(2).toString('hex');
    const profile = { id, name: String(name) };
    list.push(profile);
    this.store.set('profiles', list);
    this.emit('profiles', this.profiles());
    return profile;
  }

  // ---------- session hooks (console/network) ----------
  hookPartition(partition) {
    if (this.hooked.has(partition)) return;
    this.hooked.add(partition);
    const ses = session.fromPartition('persist:' + partition);
    const filter = { urls: ['*://*/*'] };
    const push = (kind) => (details, cb) => {
      if (kind !== 'before') {
        const entry = {
          ts: Date.now(),
          partition,
          method: details.method,
          url: details.url,
          resourceType: details.resourceType,
          statusCode: kind === 'done' ? details.statusCode : undefined,
          error: kind === 'error' ? details.error : undefined
        };
        this.netLog.push(entry);
        if (this.netLog.length > NET_CAP) this.netLog.splice(0, this.netLog.length - NET_CAP);
        this.emit('net', entry);
      }
      cb({});
    };
    ses.webRequest.onBeforeRequest(filter, push('before'));
    ses.webRequest.onCompleted(filter, push('done'));
    ses.webRequest.onErrorOccurred(filter, push('error'));
  }

  // ---------- tabs ----------
  listTabs() {
    return [...this.tabs.values()].map((t) => ({
      id: t.id, profile: t.profile, url: t.url, title: t.title, active: t.id === this.activeTabId
    }));
  }

  openTab({ profile = 'default', url = 'about:blank', background = false } = {}) {
    const profileIds = new Set(this.profiles().map((p) => p.id));
    if (!profileIds.has(profile)) throw new Error('unknown profile: ' + profile);
    this.hookPartition(profile);
    const view = new WebContentsView({
      webPreferences: { partition: 'persist:' + profile, contextIsolation: true, sandbox: true }
    });
    const id = String(this.tabSeq++);
    const tab = { id, profile, view, url, title: '', console: [] };
    const wc = view.webContents;

    wc.on('console-message', (event, level, message, line, sourceId) => {
      const e = event && typeof event === 'object' ? event : {};
      let lvl = level ?? e.level ?? 'log';
      if (typeof lvl === 'number') lvl = LEVELS[lvl] || 'log';
      const entry = {
        ts: Date.now(), tabId: Number(id), level: String(lvl),
        message: String(message ?? e.message ?? ''),
        line: line ?? e.lineNumber ?? null,
        source: sourceId ?? e.sourceId ?? null,
        url: wc.getURL()
      };
      tab.console.push(entry);
      if (tab.console.length > CONSOLE_CAP) tab.console.shift();
      this.emit('console', entry);
    });
    wc.on('did-navigate', (_e, u) => { tab.url = u; this.touch(tab); });
    wc.on('did-navigate-in-page', (_e, u) => { tab.url = u; this.touch(tab); });
    wc.on('page-title-updated', (_e, t) => { tab.title = t; this.touch(tab); });
    wc.on('did-fail-load', (_e, code, desc, u) => {
      if (code !== -3) this.emit('agent', { kind: 'page', text: `load failed (${code} ${desc}) ${u}` });
    });
    wc.on('render-process-gone', (_e, d) => {
      this.emit('agent', { kind: 'page', text: `renderer gone (${d.reason}) tab ${id}` });
    });

    this.win.contentView.addChildView(view);
    this.tabs.set(id, tab);
    if (!background) this.activate(id);
    else view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
    if (url !== 'about:blank') wc.loadURL(url).catch(() => {});
    this.touch(tab);
    return this.summarize(tab);
  }

  activate(id) {
    const tab = this.tabs.get(String(id));
    if (!tab) throw new Error('no such tab: ' + id);
    for (const t of this.tabs.values()) t.view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
    this.activeTabId = tab.id;
    tab.view.setBounds(this.bounds);
    this.touch(tab);
    return this.summarize(tab);
  }

  closeTab(id) {
    const tab = this.tabs.get(String(id));
    if (!tab) return;
    try { tab.view.webContents.close(); } catch {}
    try { this.win.contentView.removeChildView(tab.view); } catch {}
    this.tabs.delete(tab.id);
    if (this.activeTabId === tab.id) {
      const next = [...this.tabs.values()][0];
      this.activeTabId = next ? next.id : null;
      if (next) next.view.setBounds(this.bounds);
    }
    this.touch(tab);
  }

  setBounds(b) {
    this.bounds = b;
    const tab = this.tabs.get(this.activeTabId);
    if (tab) tab.view.setBounds(b);
  }

  tab(tabId) {
    if (tabId === undefined || tabId === null) {
      const t = this.tabs.get(this.activeTabId);
      if (!t) throw new Error('no active tab');
      return t;
    }
    const t = this.tabs.get(String(tabId));
    if (!t) throw new Error('no such tab: ' + tabId);
    return t;
  }

  touch(tab) {
    this.emit('tabs', this.listTabs());
    void tab;
  }

  summarize(tab) {
    return { id: tab.id, profile: tab.profile, url: tab.url, title: tab.title, active: tab.id === this.activeTabId };
  }

  // ---------- navigation & content ----------
  async navigate(tabId, url) {
    const tab = this.tab(tabId);
    if (!/^https?:\/\//i.test(url)) url = 'https://duckduckgo.com/?q=' + encodeURIComponent(url);
    await tab.view.webContents.loadURL(url);
    return this.summarize(tab);
  }

  async reload(tabId) {
    const tab = this.tab(tabId);
    await tab.view.webContents.reload();
    return this.summarize(tab);
  }

  async go(tabId, dir) {
    const wc = this.tab(tabId).view.webContents;
    if (dir === 'back' && wc.canGoBack()) wc.goBack();
    else if (dir === 'forward' && wc.canGoForward()) wc.goForward();
    await new Promise((r) => setTimeout(r, 300));
    return this.summarize(this.tab(tabId));
  }

  async html(tabId) {
    return this.tab(tabId).view.webContents.executeJavaScript('document.documentElement.outerHTML');
  }

  async text(tabId) {
    return this.tab(tabId).view.webContents.executeJavaScript('document.body ? document.body.innerText.slice(0, 200000) : ""');
  }

  async evaluate(tabId, code) {
    const res = await this.tab(tabId).view.webContents.executeJavaScript(
      `(async () => { try { const r = await (${code}); return JSON.stringify({ ok: true, result: r }); } catch (e) { return JSON.stringify({ ok: false, error: String(e && e.message || e) }); } })()`
    );
    return JSON.parse(res);
  }

  async screenshot(tabId) {
    const img = await this.tab(tabId).view.webContents.capturePage();
    return img.toDataURL('image/png');
  }

  async scroll(tabId, direction = 'down', amount = 600) {
    const dy = direction === 'up' ? -Math.abs(amount) : Math.abs(amount);
    await this.tab(tabId).view.webContents.executeJavaScript(`window.scrollBy(0, ${dy})`);
    return { scrolled: dy };
  }

  consoleLog(tabId, tail = 100) {
    return this.tab(tabId).console.slice(-Number(tail));
  }

  netLogFor({ partition, tail = 100 } = {}) {
    const rows = partition ? this.netLog.filter((r) => r.partition === partition) : this.netLog;
    return rows.slice(-Number(tail));
  }

  // ---------- CDP-powered input ----------
  async cdp(tab, method, params) {
    const wc = tab.view.webContents;
    if (!wc.debugger.isAttached()) wc.debugger.attach('1.3');
    return wc.debugger.sendCommand(method, params);
  }

  async click(tabId, selector) {
    const tab = this.tab(tabId);
    const box = await tab.view.webContents.executeJavaScript(
      `(function(){ const el = document.querySelector(${JSON.stringify(selector)}); if (!el) return null; ` +
      `el.scrollIntoView({ block: 'center', inline: 'center' }); const r = el.getBoundingClientRect(); ` +
      `return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`
    );
    if (!box) throw new Error('selector not found: ' + selector);
    const x = Math.round(box.x), y = Math.round(box.y);
    await this.cdp(tab, 'Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
    await this.cdp(tab, 'Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
    return { clicked: selector, x, y };
  }

  async type(tabId, selector, text, { clear = false, enter = false } = {}) {
    const tab = this.tab(tabId);
    const ok = await tab.view.webContents.executeJavaScript(
      `(function(){ const el = document.querySelector(${JSON.stringify(selector)}); if (!el) return false; ` +
      `el.focus(); if (${clear} && 'value' in el) { el.value = ''; el.dispatchEvent(new Event('input', { bubbles: true })); } return true; })()`
    );
    if (!ok) throw new Error('selector not found: ' + selector);
    await this.cdp(tab, 'Input.insertText', { text: String(text) });
    if (enter) {
      const key = { key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 };
      await this.cdp(tab, 'Input.dispatchKeyEvent', { type: 'keyDown', ...key });
      await this.cdp(tab, 'Input.dispatchKeyEvent', { type: 'keyUp', ...key });
    }
    return { typed: String(text).length, selector, enter };
  }
}

module.exports = { BrowserManager };
