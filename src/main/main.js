'use strict';
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const crypto = require('crypto');
const { Store } = require('./store');
const { BrowserManager } = require('./browser-manager');
const { AgentServer } = require('./agent-server');
const { FileShare } = require('./file-share');

let win, store, browser, agent, files;

// ------------------------------------------------------------------ helpers
function sendToUI(type, data) {
  try { if (win && !win.isDestroyed()) win.webContents.send('companion:event', { type, data }); } catch {}
}

function forwardAgentEvent(type, payload) {
  sendToUI('agentlog', { type, ...payload });
  if (type === 'status') sendToUI('agentstatus', payload);
}

function startServers() {
  const bind = store.get('bind', 'lan'); // tailnet-first default; UI can flip to localhost
  const host = bind === 'lan' ? '0.0.0.0' : '127.0.0.1';
  const token = ensureToken();
  const a = agent.start({ host, port: store.get('agentPort', 9223), token });
  const f = files.start({ host, port: store.get('sharePort', 9224), token });
  sendToUI('agentstatus', { agent: a, share: f, bind, clients: 0 });
}

function ensureToken() {
  let token = store.get('agentToken');
  if (!token) {
    token = crypto.randomBytes(16).toString('hex');
    store.set('agentToken', token);
  }
  // CLI reads this file to find the token without UI copy/paste.
  const fs = require('fs');
  try {
    const p = path.join(app.getPath('userData'), 'agent.json');
    fs.mkdirSync(app.getPath('userData'), { recursive: true });
    fs.writeFileSync(p, JSON.stringify({ token, port: store.get('agentPort', 9223), sharePort: store.get('sharePort', 9224) }, null, 2));
  } catch {}
  return token;
}

async function requestApproval(method, params) {
  const detail = JSON.stringify(params, (k, v) => (k === 'content' && typeof v === 'string' && v.length > 2000 ? v.slice(0, 2000) + '…' : v), 2).slice(0, 2000);
  const { response } = await dialog.showMessageBox(win, {
    type: 'warning',
    buttons: ['Allow once', 'Deny'],
    defaultId: 1,
    cancelId: 1,
    title: 'Otto requests an action',
    message: `Otto wants to run: ${method}`,
    detail,
    noLink: true
  });
  return response === 0;
}

// ------------------------------------------------------------------ agent methods
function registerMethods() {
  agent.methods = {
    'profiles.list': () => browser.profiles(),
    'profiles.create': ({ name }) => browser.addProfile(name),

    'tabs.list': () => browser.listTabs(),
    'tabs.open': (p) => browser.openTab(p),
    'tabs.close': ({ id }) => { browser.closeTab(id); return { closed: String(id) }; },
    'tabs.activate': ({ id }) => browser.activate(id),

    'browser.navigate': ({ tab, url }) => browser.navigate(tab, url),
    'browser.reload': ({ tab }) => browser.reload(tab),
    'browser.back': ({ tab }) => browser.go(tab, 'back'),
    'browser.forward': ({ tab }) => browser.go(tab, 'forward'),
    'browser.html': ({ tab }) => browser.html(tab),
    'browser.text': ({ tab }) => browser.text(tab),
    'browser.screenshot': ({ tab }) => browser.screenshot(tab),
    'browser.click': ({ tab, selector }) => browser.click(tab, selector),
    'browser.type': ({ tab, selector, text, clear, enter }) => browser.type(tab, selector, text, { clear, enter }),
    'browser.scroll': ({ tab, direction, amount }) => browser.scroll(tab, direction, amount),
    'browser.console': ({ tab, tail }) => browser.consoleLog(tab, tail),
    'browser.network': ({ profile, tail }) => browser.netLogFor({ partition: profile, tail }),
    'browser.evaluate': ({ tab, code }) => browser.evaluate(tab, code),

    'fs.folders': () => files.folders(),
    'fs.list': ({ folder, path: p }) => files.list(folder, p),
    'fs.read': ({ folder, path: p }) => files.read(folder, p),
    'fs.write': ({ folder, path: p, content, encoding }) => files.write(folder, p, content, encoding),
    'fs.mkdir': ({ folder, path: p }) => files.mkdir(folder, p),
    'fs.delete': ({ folder, path: p }) => files.remove(folder, p)
  };
  agent.requiresApproval = new Set(['browser.evaluate', 'fs.read', 'fs.write', 'fs.mkdir', 'fs.delete']);
  agent.requestApproval = requestApproval;
}

// ------------------------------------------------------------------ UI IPC
function registerUI() {
  const state = () => ({
    profiles: browser.profiles(),
    tabs: browser.listTabs(),
    folders: files.folders().map(({ id, name, path: p, readOnly }) => ({ id, name, path: p, readOnly })),
    bind: store.get('bind', 'localhost'),
    agentPort: store.get('agentPort', 9223),
    sharePort: store.get('sharePort', 9224),
    token: store.get('agentToken', '')
  });

  ipcMain.handle('ui:state', () => state());
  ipcMain.on('ui:layout', (_e, rect) => browser.setBounds(rect));
  ipcMain.handle('ui:tab-open', (_e, opts) => browser.openTab(opts || {}));
  ipcMain.handle('ui:tab-close', (_e, { id }) => browser.closeTab(id));
  ipcMain.handle('ui:tab-activate', (_e, { id }) => browser.activate(id));
  ipcMain.handle('ui:navigate', (_e, { url }) => browser.navigate(undefined, url));
  ipcMain.handle('ui:nav', (_e, { dir }) => browser.go(undefined, dir));
  ipcMain.handle('ui:reload', () => browser.reload(undefined));
  ipcMain.handle('ui:profile-create', (_e, { name }) => browser.addProfile(name));
  ipcMain.handle('ui:folder-add', async () => {
    const r = await dialog.showOpenDialog(win, { properties: ['openDirectory'] });
    if (r.canceled || !r.filePaths[0]) return null;
    return files.addFolder(r.filePaths[0]);
  });
  ipcMain.handle('ui:folder-remove', (_e, { id }) => files.removeFolder(id));
  ipcMain.handle('ui:folder-readonly', (_e, { id, readOnly }) => {
    const list = files.folders();
    const f = list.find((x) => x.id === id);
    if (f) { f.readOnly = !!readOnly; store.set('folders', list); sendToUI('folders', list); }
    return f || null;
  });
  ipcMain.handle('ui:set-bind', (_e, { bind }) => {
    store.set('bind', bind === 'lan' ? 'lan' : 'localhost');
    startServers();
    return store.get('bind');
  });
  ipcMain.handle('ui:new-token', () => {
    store.set('agentToken', crypto.randomBytes(16).toString('hex'));
    startServers();
    return store.get('agentToken');
  });
}

// ------------------------------------------------------------------ boot
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => { if (win) win.focus(); });

  app.whenReady().then(() => {
    store = new Store('settings', { bind: 'lan', agentPort: 9223, sharePort: 9224 });

    win = new BrowserWindow({
      width: 1440, height: 900, minWidth: 1024, minHeight: 640,
      backgroundColor: '#0e1116',
      title: 'Otto Companion',
      webPreferences: {
        preload: path.join(__dirname, '..', 'preload', 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false
      }
    });
    win.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));

    browser = new BrowserManager(win, store, (type, data) => sendToUI(type, data));
    files = new FileShare(store, (type, data) => sendToUI(type, data));
    agent = new AgentServer();
    agent.emit = forwardAgentEvent;
    registerMethods();
    registerUI();
    startServers();

    browser.openTab({ profile: 'default', url: 'https://example.com' });

    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) app.quit(); });
  });

  app.on('window-all-closed', () => {
    agent.stop();
    files.stop();
    app.quit();
  });
}
