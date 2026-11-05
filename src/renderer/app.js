'use strict';
/* global companion */
const $ = (id) => document.getElementById(id);
let state = null;
let activeProfile = 'default';

// ---------------------------------------------------------------- layout
function reportLayout() {
  const r = $('browserArea').getBoundingClientRect();
  companion.layout({ x: Math.round(r.left), y: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) });
}
new ResizeObserver(reportLayout).observe($('browserArea'));
window.addEventListener('resize', reportLayout);

// ---------------------------------------------------------------- rendering
function renderProfiles() {
  const el = $('profiles');
  el.innerHTML = '';
  for (const p of state.profiles) {
    const row = document.createElement('button');
    row.className = 'item' + (p.id === activeProfile ? ' active' : '');
    row.textContent = p.name;
    row.onclick = () => { activeProfile = p.id; renderProfiles(); };
    el.appendChild(row);
  }
}

function renderGrants() {
  const el = $('grants');
  const list = (state && state.grants) || [];
  el.innerHTML = '';
  if (!list.length) {
    el.innerHTML = '<div class="muted pad">None. Folder-wide approvals appear here.</div>';
    return;
  }
  for (const g of list) {
    const row = document.createElement('div');
    row.className = 'item rowish';
    const mins = Math.max(0, Math.round((g.expires - Date.now()) / 60000));
    row.innerHTML = `<span class="grow">${g.op === 'read' ? '📖' : '✏️'} ${g.folder}</span><span class="muted"> ${mins}m</span>`;
    const x = document.createElement('button');
    x.className = 'mini';
    x.textContent = '✕';
    x.title = 'Revoke';
    x.onclick = async (e) => { e.stopPropagation(); await companion.grantsRevoke(g.key); };
    row.appendChild(x);
    el.appendChild(row);
  }
}

function renderFolders() {
  const el = $('folders');
  el.innerHTML = '';
  if (!state.folders.length) {
    el.innerHTML = '<div class="muted pad">No folders shared yet.</div>';
    return;
  }
  for (const f of state.folders) {
    const row = document.createElement('div');
    row.className = 'item rowish';
    row.title = f.path;
    row.innerHTML = `<span class="grow">${f.readOnly ? '🔒 ' : ''}${f.name}</span>`;
    const ro = document.createElement('button');
    ro.className = 'mini';
    ro.textContent = f.readOnly ? 'RW' : 'RO';
    ro.title = 'Toggle read-only';
    ro.onclick = async (e) => { e.stopPropagation(); await companion.folderReadonly(f.id, !f.readOnly); state = await companion.state(); renderFolders(); };
    const del = document.createElement('button');
    del.className = 'mini';
    del.textContent = '×';
    del.title = 'Stop sharing';
    del.onclick = async (e) => { e.stopPropagation(); await companion.folderRemove(f.id); state = await companion.state(); renderFolders(); };
    row.appendChild(ro);
    row.appendChild(del);
    el.appendChild(row);
  }
}

function renderTabs() {
  const el = $('tabbar');
  el.innerHTML = '';
  for (const t of state.tabs) {
    const chip = document.createElement('div');
    chip.className = 'chip' + (t.active ? ' active' : '');
    chip.title = t.url + '  (' + t.profile + ')';
    const label = document.createElement('span');
    label.textContent = (t.title || t.url || 'new tab').slice(0, 40);
    label.onclick = () => companion.tabActivate(t.id);
    const x = document.createElement('span');
    x.className = 'x';
    x.textContent = '×';
    x.onclick = (e) => { e.stopPropagation(); companion.tabClose(t.id); };
    chip.appendChild(label);
    chip.appendChild(x);
    el.appendChild(chip);
  }
  const active = state.tabs.find((t) => t.active);
  $('url').value = active ? active.url : '';
}

function pushLog(el, cls, text) {
  const line = document.createElement('div');
  line.className = 'line ' + cls;
  line.textContent = text;
  el.appendChild(line);
  while (el.childElementCount > 400) el.removeChild(el.firstChild);
  el.scrollTop = el.scrollHeight;
}

const LEVEL_CLS = { error: 'err', warning: 'warn', info: 'info', verbose: 'muted', log: '' };

// ---------------------------------------------------------------- events
companion.onEvent(({ type, data }) => {
  if (type === 'tabs' || type === 'profiles' || type === 'folders') {
    state = { ...state, [type]: data };
    if (type === 'tabs') renderTabs();
    if (type === 'profiles') renderProfiles();
    if (type === 'folders') renderFolders();
  } else if (type === 'console') {
    pushLog($('logConsole'), LEVEL_CLS[data.level] || '', `[${data.level}] ${data.message}${data.line ? ' (line ' + data.line + ')' : ''}`);
  } else if (type === 'net') {
    const cls = data.error ? 'err' : (data.statusCode >= 400 ? 'warn' : '');
    pushLog($('logNetwork'), cls, `${data.method} ${data.statusCode || data.error || '…'} ${data.url}`);
  } else if (type === 'agentlog') {
    const { type: t, method, params, allowed, text, note } = data;
    if (t === 'call') pushLog($('agentLog'), 'info', `→ ${method} ${JSON.stringify(params).slice(0, 120)}`);
    else if (t === 'approval') pushLog($('agentLog'), 'warn', `⏸ approval requested: ${method}`);
    else if (t === 'approval-result') pushLog($('agentLog'), allowed ? 'info' : 'err', `${allowed ? '✓ allowed' : '✗ denied'}: ${method}`);
    else if (t === 'client') pushLog($('agentLog'), 'info', text || note || '');
    else if (t === 'page') pushLog($('agentLog'), 'warn', text || '');
  } else if (type === 'grants') {
    state = { ...(state || {}), grants: data.grants || [] };
    renderGrants();
  } else if (type === 'agentstatus') {
    const a = data.agent || {};
    $('agentStatus').textContent = `ws://${data.bind === 'lan' ? '<you>': '127.0.0.1'}:${a.port || ''} · ${(data.clients ?? 0)} client(s)` + (data.error ? ' · ' + data.error : '');
  }
});

// ---------------------------------------------------------------- controls
$('goBtn').onclick = () => { const v = $('url').value.trim(); if (v) companion.navigate(v); };
$('clearGrants').onclick = () => companion.grantsClear();
$('url').addEventListener('keydown', (e) => { if (e.key === 'Enter') { const v = e.target.value.trim(); if (v) companion.navigate(v); } });
$('back').onclick = () => companion.nav('back');
$('forward').onclick = () => companion.nav('forward');
$('reload').onclick = () => companion.reload();
$('newTab').onclick = () => companion.tabOpen({ profile: activeProfile, url: 'about:blank' });
$('addProfile').onclick = async () => {
  const name = window.prompt('Profile name (each profile has its own cookies/logins):');
  if (name) { await companion.profileCreate(name); state = await companion.state(); renderProfiles(); }
};
$('addFolder').onclick = async () => { await companion.folderAdd(); state = await companion.state(); renderFolders(); };
$('bindSelect').onchange = async (e) => { await companion.setBind(e.target.value); };
$('rotateToken').onclick = async () => { state = await companion.state(); renderAgent(); };

document.querySelectorAll('#panelTabs button').forEach((b) => {
  b.onclick = () => {
    document.querySelectorAll('#panelTabs button').forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
    $('logConsole').classList.toggle('hidden', b.dataset.view !== 'logConsole');
    $('logNetwork').classList.toggle('hidden', b.dataset.view !== 'logNetwork');
  };
});

function renderAgent() {
  $('bindSelect').value = state.bind || 'localhost';
  $('token').textContent = (state.token || '').slice(0, 6) + '••••';
  $('token').title = state.token || '';
}

// ---------------------------------------------------------------- boot
(async () => {
  state = await companion.state();
  renderProfiles();
  renderFolders();
  renderTabs();
  renderAgent();
  reportLayout();
})();
