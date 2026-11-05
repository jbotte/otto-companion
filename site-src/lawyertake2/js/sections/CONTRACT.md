# Section-file contract — Hale & Whitmore (daisyUI 5.7.47, no build step)

You are writing ONE file of a static law-firm website. Read this entire contract,
then create the assigned file exactly as specified. Do not create or modify any
other file.

## File format (must match exactly)

Plain browser script. No modules, no imports, no fetch. The file must look like:

```js
/* <One-line description> — 6 layout variants. */
window.SECTIONS = window.SECTIONS || {};
window.SECTIONS.<key> = {
  label: '<Label>',
  variants: [
    /* 1. <variant name> */
    `...html...`,
    /* 2. <variant name> */
    `...html...`,
    /* ... exactly 6 template-literal strings total ... */
  ],
};
```

- `variants` must contain exactly 6 template-literal strings.
- Each string is the INNER content of the host element. The host
  (`<section data-section="key">` or `<footer data-section="footer">`) already
  exists in index.html — do NOT include the `<section>`/`<footer>` tag itself.
  Start each variant with a wrapper like `<div class="shell ...">` or a band
  class (`<div class="band-neutral section-pad">...`).

## Globals available (loaded before this file)

- `DATA` (window.DATA):
  - `firm`: { name, legal, est, tagline, phone, phoneHref, email, address, city, hours, offices }
  - `services`: [{ icon, title, desc }] × 6
  - `team`: [{ name, role, bio, initials }] × 4
  - `testimonials`: [{ quote, name, role, initials }] × 4
  - `stats`: [{ value, label }] × 4
  - `metrics`: [{ label, value (0–100) }] × 3
  - `values`: [{ icon, title, desc }] × 3
  - `milestones`: [{ year, title, desc }] × 5
- `UI` (window.UI):
  - `UI.icon(name, cls='ico')` → inline SVG string. Available names:
    scale, gavel, briefcase, building, bulb, percent, shield, lock, target,
    phone, mail, pin, clock, arrow, upright, check, star, menu, x, shuffle,
    reset, chevronL, chevronR, award, book, chart, users, landmark, doc, home,
    send, eye, key
  - `UI.avatar(person, index, size='av-md')` → initials avatar
    (size: 'av-sm' | 'av-md' | 'av-lg')
  - `UI.serviceCard(service, index)` → complete practice-area card

## Allowed daisyUI 5.7.47 classes (verified to exist in 5.7.47)

btn, btn-primary, btn-secondary, btn-outline, btn-ghost, btn-neutral, btn-sm,
btn-lg, btn-circle, btn-square, btn-block, badge, badge-primary, badge-ghost,
badge-outline, badge-sm, card, card-body, card-actions, alert, alert-soft,
avatar, divider, timeline, timeline-vertical, timeline-box,
timeline-indicators, timeline-content, timeline-start, timeline-middle,
timeline-end, stats, stats-horizontal, stats-vertical, stat, stat-figure,
stat-title, stat-desc, tabs, tabs-box, tabs-lift, tab, tab-active, collapse,
collapse-arrow, collapse-title, collapse-content, carousel, carousel-item,
progress, progress-primary, radial-progress, input, select, textarea, menu,
menu-vertical, hero, hero-content, navbar, table

Do NOT use: `form-control` (removed in v5), `container`, or any Tailwind class
not in the custom list below.

## Allowed custom classes (defined in css/styles.css — do not invent new ones)

- Layout: shell, section-pad, section-pad--sm, row, row--wrap, col, grid-2,
  grid-3, grid-4, split, split--rev, max-w-1, max-w-2, max-w-3, max-w-4
- Spacing: gap-1..gap-5, mt-1/2/3/4/5/6/8/10/12, mb-1/2/3/4/5/6/8, p-2/4/6/8,
  px-4, px-6, py-2/4/6
- Display/flex: flex, flex-col, flex-wrap, flex-1, items-center, items-start,
  justify-center, justify-between, block, hidden, relative, absolute, inset-0,
  overflow-hidden, w-full, h-full, z-10/40/50/60
- Typography: display, display-xxl, display-xl, display-lg, h2, h3, lead,
  eyebrow, eyebrow--plain, muted, faint, accent-word, stat-serif, quote-glyph,
  text-xs/sm/base/lg/xl/2xl/3xl/4xl/5xl/6xl, font-medium/semibold/bold,
  leading-tight, leading-relaxed, uppercase, tracking-wide, tracking-widest,
  text-center/left/right
- Borders/shadows: rounded-md/lg/xl/2xl/full, border, border-0,
  border-base-200, border-base-300, border-white-10, border-white-20,
  shadow-sm/md/lg
- Backgrounds/opacity: bg-base-100/200/300, bg-primary, bg-secondary,
  bg-neutral, bg-white-5, bg-white-10, op-40/60/80
- Section blocks: hero-bleed, band-neutral, band-gradient, band-secondary,
  photo-block, photo-block--tall, photo-block--short, photo-watermark,
  photo-card, photo-icon-grid, icon-chip, check-chip, link-arrow, card-hover,
  svc-row, num-ghost, tile, team-card, team-more, wall, tab-panel, lw-slider,
  slider-btn, slider-dot, lw-timeline, lw-progress, lw-radial, lw-form,
  footer-wordmark, hero-scroll-cue, cue-line
- Icons: ico, ico-sm, ico-lg, ico-xl
- Avatars: av-sm, av-md, av-lg, av-center, avatar-text, avatar-grad-0..3
- Motion: reveal (add to blocks that should fade in on scroll). Do NOT add
  `variant-swap` — the engine handles it.
- Misc: ml-auto, mr-auto, mx-auto, dot, rule, hide-sm

## Design rules

1. Premium, confident law-firm voice. Real copy only — no lorem ipsum, no
   "placeholder", no TODO.
2. Anything that exists in DATA (names, numbers, services, quotes) MUST come
   from DATA via template interpolation. Only write fresh copy for text that
   does not exist in DATA (short bridging sentences, labels).
3. The 6 variants must be genuinely different layouts/compositions — not
   restyled copies of one another.
4. No external images, fonts, or assets. Visuals come from photo-block,
   icon-chip, avatar helpers, and typography.
5. Keep the file under 260 lines. Template literals only; no backticks inside
   content.
6. Add class="reveal" to major blocks so they animate in on scroll.
7. Links: internal anchors (#contact, #services, #team, #about,
   #testimonials), `tel:` from DATA.firm.phoneHref, `mailto:` from
   DATA.firm.email.
8. Interactive parts (the engine wires them after render):
   - tabs: `data-lw-tabs` on the `.tabs` element; `data-lw-panel="0..n"` on
     each panel (first panel visible, others get `hidden`)
   - slider: `data-lw-prev` / `data-lw-next` on `.slider-btn` buttons,
     `data-lw-dot="0..n"` on `.slider-dot` buttons (first dot gets is-active)
   - demo forms: `data-lw-demo` on the `<form>`

## After writing

1. Run `node --check <file>` — it must pass with no errors.
2. Report: file path, line count, and one line per variant describing its layout.
