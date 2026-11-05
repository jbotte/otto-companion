#!/usr/bin/env node
'use strict';
/* Variant gallery: for each section, click through all 6 studio layouts on the
 * Mac's browser, screenshot each, and stitch a labelled contact sheet.
 * Uses only non-gated agent methods (navigate/click/screenshot/html). */
const fs = require('fs');
const os = require('os');
const path = require('path');
const WebSocket = require('ws');
const sharp = require('sharp');

const HOST = process.env.OTTO_AGENT_HOST || '127.0.0.1';
const BASE = 'file:///Users/john/Documents/lawyertake2/index.html';
const SECTIONS = ['hero', 'about', 'services', 'stats', 'team', 'testimonials', 'cta', 'contact', 'footer'];
const OUT = path.join(__dirname, '..', 'shots');
let TAB = null;

function cfg() {
  const b = path.join(os.homedir(), '.config', 'otto-companion', 'agent.json');
  try { return JSON.parse(fs.readFileSync(b, 'utf8')); } catch { return {}; }
}
const c = cfg();
const token = process.env.OTTO_AGENT_AUTH_KEY || c.token || '';
const ws = new WebSocket(`ws://${HOST}:9223/?token=${token}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let seq = 0;
const pending = new Map();
ws.on('message', (raw) => {
  const m = JSON.parse(raw.toString());
  const p = pending.get(m.id);
  if (p) { pending.delete(m.id); m.ok ? p.res(m.result) : p.rej(new Error(m.error)); }
});
function rpc(method, params = {}) {
  return new Promise((res, rej) => {
    const id = String(++seq);
    pending.set(id, { res, rej });
    ws.send(JSON.stringify({ id, method, params }));
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 60000);
  });
}
const call = async (m, p) => { try { return await rpc(m, p); } catch (e) { console.log('  !', m, String(e.message).slice(0, 60)); return null; } };

async function currentVariants() {
  const html = await rpc('browser.html', { tab: TAB });
  const src = typeof html === 'string' ? html : (html && html.html) || '';
  const out = {};
  for (const m of src.matchAll(/class="var-btn([^"]*)"[^>]*data-sec="([^"]+)"[^>]*data-idx="(\d+)"/g))
    if (m[1].includes('is-active')) out[m[2]] = +m[3];
  return out;
}

async function montage(sec, files) {
  const W = 640, H = 360, COLS = 3, ROWS = 2, HEAD = 64;
  const tiles = [];
  for (let i = 0; i < files.length; i++) {
    const buf = await sharp(files[i]).resize(W, H, { fit: 'cover' }).toBuffer();
    tiles.push({ input: buf, left: (i % COLS) * W, top: HEAD + Math.floor(i / COLS) * H });
  }
  const labels = Array.from({ length: files.length }, (_, i) => {
    const x = (i % COLS) * W + 10, y = HEAD + Math.floor(i / COLS) * H + 10;
    return `<rect x="${x}" y="${y}" width="40" height="26" rx="6" fill="rgba(0,0,0,.72)"/>` +
      `<text x="${x + 20}" y="${y + 18}" font-family="sans-serif" font-size="15" font-weight="bold" fill="#fff" text-anchor="middle">${i + 1}</text>`;
  }).join('');
  const svg = `<svg width="${W * COLS}" height="${HEAD + H * ROWS}"><rect width="100%" height="${HEAD}" fill="#10141b"/>` +
    `<text x="16" y="40" font-family="sans-serif" font-size="26" font-weight="bold" fill="#e8e2cf">${sec.toUpperCase()} — pick a layout (1-6)</text>${labels}</svg>`;
  const sheet = path.join(OUT, sec + '.png');
  await sharp({ create: { width: W * COLS, height: HEAD + H * ROWS, channels: 3, background: '#10141b' } })
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }, ...tiles])
    .png({ quality: 85 })
    .toFile(sheet);
  console.log('sheet', sec);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  await new Promise((r) => ws.on('open', r));

  await call('window.ensure', {});
  await sleep(1200);
  const t = await rpc('tabs.open', { url: BASE });
  TAB = String(t.id);
  await sleep(1800);

  const original = await currentVariants();
  console.log('original variants:', JSON.stringify(original));

  await call('browser.navigate', { tab: TAB, url: BASE });
  await sleep(1800);
  await call('browser.click', { tab: TAB, selector: '#studio-fab' }); // open studio
  await sleep(400);

  for (const sec of SECTIONS) {
    console.log('section', sec);
    await call('browser.navigate', { tab: TAB, url: BASE + '#sec-' + sec });
    await sleep(1300);
    const files = [];
    for (let idx = 0; idx < 6; idx++) {
      await call('browser.click', { tab: TAB, selector: `[data-sec="${sec}"][data-idx="${idx}"]` });
      await sleep(900); // variant-swap + reveal animations
      let shot;
      if (sec === 'footer') { // studio panel would cover the bottom; close, shoot, reopen
        await call('browser.click', { tab: TAB, selector: '#studio-close' });
        await sleep(250);
        shot = await call('browser.screenshot', { tab: TAB });
        await call('browser.click', { tab: TAB, selector: '#studio-fab' });
      } else {
        shot = await call('browser.screenshot', { tab: TAB });
      }
      if (!shot) continue;
      const b64 = String(shot).replace(/^data:image\/png;base64,/, '');
      const f = path.join(OUT, `${sec}-${idx}.png`);
      fs.writeFileSync(f, Buffer.from(b64, 'base64'));
      files.push(f);
      process.stdout.write('.');
    }
    console.log();
    if (files.length === 6) await montage(sec, files);
  }

  // restore John's original picks
  for (const [sec, idx] of Object.entries(original)) {
    await call('browser.click', { tab: TAB, selector: `[data-sec="${sec}"][data-idx="${idx}"]` });
    await sleep(150);
  }
  await call('browser.click', { tab: TAB, selector: '#studio-close' });
  console.log('DONE');
  process.exit(0);
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
