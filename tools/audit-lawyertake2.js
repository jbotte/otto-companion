// Audits the lawyertake2 site: variant counts, banned classes, contract compliance.
const path = require('path');
const fs = require('fs');
const dir = path.join(__dirname, '..', 'site-src', 'lawyertake2', 'js', 'sections');
const problems = [];
const w = {};
global.window = w;
require(path.join(dir, '..', 'data.js'));
require(path.join(dir, '..', 'ui-core.js'));
global.DATA = w.DATA;
global.UI = w.UI;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js'))) {
  w.SECTIONS = {};
  delete require.cache[path.join(dir, f)];
  try {
    require(path.join(dir, f));
    const key = Object.keys(w.SECTIONS)[0];
    const def = w.SECTIONS[key];
    const v = def.variants || [];
    const line = [f.padEnd(18), 'key=' + (key || 'NONE').padEnd(12), 'variants=' + v.length];
    if (!def.label) problems.push(f + ': missing label');
    if (key !== f.replace('.js', '')) problems.push(f + ': key mismatch (' + key + ')');
    if (v.length !== 6) problems.push(f + ': ' + v.length + ' variants (contract says 6)');
    // banned classes inside content
    v.forEach((html, i) => {
      if (typeof html !== 'string') { problems.push(f + '[' + i + ']: not a string'); return; }
      const banned = ['form-control', 'class="container', ' lorem', 'TODO', 'placeholder text'];
      for (const b of banned) if (html.toLowerCase().includes(b.toLowerCase())) problems.push(f + '[' + i + ']: contains "' + b + '"');
      if (!/class="reveal/.test(html) && !/reveal/.test(html)) problems.push(f + '[' + i + ']: no reveal class');
      // unclosed quote sanity: count backticks got handled by node parse; check <div vs </div balance
      const open = (html.match(/<div\b/g) || []).length;
      const close = (html.match(/<\/div>/g) || []).length;
      if (open !== close) problems.push(f + '[' + i + ']: div balance ' + open + ' open / ' + close + ' close');
    });
    console.log(line.join(' '));
  } catch (e) {
    problems.push(f + ': LOAD ERROR ' + e.message);
  }
}
console.log('\n--- DATA sanity ---');
const D = w.DATA;
console.log('services', D.services.length, '| team', D.team.length, '| testimonials', D.testimonials.length, '| stats', D.stats.length, '| milestones', D.milestones.length);
// icon names referenced vs available
const icons = new Set(Object.keys(w.UI.ICONS));
const used = new Set();
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js'))) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  for (const m of src.matchAll(/icon\('([a-zA-Z]+)'/g)) used.add(m[1]);
}
for (const s of [...D.services, ...D.values]) used.add(s.icon);
const missing = [...used].filter((n) => !icons.has(n));
console.log('icons used:', used.size, missing.length ? 'MISSING: ' + missing.join(', ') : '— all defined');
console.log('\n--- problems ---');
console.log(problems.length ? problems.join('\n') : 'none');
