/* ============================================================================
   LW_UI core — shared markup helpers for section variants.
   Loaded after js/data.js and before js/sections/*.js.
   ========================================================================== */
(function () {
  'use strict';

  /* Lucide-inspired 24×24 stroke icons, one entry per name. */
  const ICONS = {
    scale:
      '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    gavel:
      '<path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0a2.12 2.12 0 0 1 0-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>',
    briefcase:
      '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    building:
      '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 21v-3h6v3"/><path d="M8 7h2"/><path d="M14 7h2"/><path d="M8 11h2"/><path d="M14 11h2"/>',
    bulb:
      '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.94 10.54c.6.47 1.1 1.18 1.27 1.96l.13.5h5.08l.13-.5c.17-.78.67-1.49 1.27-1.96A6 6 0 0 0 12 3Z"/>',
    percent:
      '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    shield:
      '<path d="M12 2 4 5.5v5.6c0 4.9 3.4 8.7 8 10.4 4.6-1.7 8-5.5 8-10.4V5.5L12 2Z"/>',
    lock:
      '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    target:
      '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    phone:
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>',
    mail:
      '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    pin:
      '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock:
      '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
    arrow:
      '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    upright:
      '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
    check: '<path d="m4 12.5 5 5L20 6.5"/>',
    star:
      '<path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9 2.9-6Z"/>',
    menu:
      '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
    x:
      '<path d="m6 6 12 12"/><path d="M18 6 6 18"/>',
    shuffle:
      '<path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.97a4 4 0 0 0 3.3-1.7l5.45-8.6a4 4 0 0 1 3.3-1.7H22"/><path d="M2 6h1.97a4 4 0 0 1 3.3 1.7l.8.9"/><path d="M22 18h-7.97a4 4 0 0 1-3.3-1.7"/>',
    reset:
      '<path d="M3 12a9 9 0 1 0 2.64-6.36L3 8"/><path d="M3 3v5h5"/>',
    chevronL: '<path d="m15 6-6 6 6 6"/>',
    chevronR: '<path d="m9 6 6 6-6 6"/>',
    award:
      '<circle cx="12" cy="8.5" r="5.5"/><path d="m8.8 13-1.3 8 4.5-2.7 4.5 2.7-1.3-8"/>',
    book:
      '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    chart:
      '<path d="M3 3v18h18"/><path d="M7 15v-3"/><path d="M12 15V8"/><path d="M17 15v-5"/>',
    users:
      '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.4 3.5-5.5 6.5-5.5s5.7 2.1 6.5 5.5"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17.5 14.5c2.2.3 3.8 1.9 4.3 4.5"/>',
    landmark:
      '<path d="M3 21h18"/><path d="M5 21v-9"/><path d="M9.5 21v-9"/><path d="M14.5 21v-9"/><path d="M19 21v-9"/><path d="m12 2 9 6H3l9-6Z"/>',
    doc:
      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h4"/>',
    home:
      '<path d="m3 10.5 9-7.5 9 7.5"/><path d="M5 9v12h14V9"/><path d="M10 21v-6h4v6"/>',
    send: '<path d="m22 2-7 20-4-9-9-4 20-7Z"/>',
    eye:
      '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    key:
      '<circle cx="8" cy="15" r="4.5"/><path d="m11.5 11.5 8-8"/><path d="M17 5l3 3"/><path d="M14 8l2 2"/>',
  };

  const icon = (name, cls = 'ico') =>
    '<svg class="' +
    cls +
    '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    (ICONS[name] || '') +
    '</svg>';

  /* Initials avatar on a theme-derived gradient. size: av-sm | av-md | av-lg */
  const avatar = (p, i, size = 'av-md') =>
    '<div class="avatar"><div class="' +
    size +
    ' rounded-full avatar-grad-' +
    (i % 4) +
    ' av-center avatar-text">' +
    p.initials +
    '</div></div>';

  /* Full practice-area card (used by several services variants). */
  const serviceCard = (s, i) =>
    '<article class="card card-hover bg-base-100 border border-base-300 shadow-sm">' +
    '<div class="card-body gap-2">' +
    '<div class="row gap-3">' +
    '<span class="icon-chip">' + icon(s.icon, 'ico-lg') + '</span>' +
    '<h3 class="h3">' + s.title + '</h3>' +
    '</div>' +
    '<p class="muted text-sm leading-relaxed">' + s.desc + '</p>' +
    '<a class="link-arrow text-sm mt-auto" href="#contact">' +
    icon('arrow', 'ico-sm') +
    ' Discuss this practice</a>' +
    '</div>' +
    '</article>';

  window.UI = { icon: icon, avatar: avatar, serviceCard: serviceCard, ICONS: ICONS };
})();
