/* Hero — 6 layout variants. */
window.SECTIONS = window.SECTIONS || {};
window.SECTIONS.hero = {
  label: 'Hero',
  variants: [
    /* 1. Full-bleed dark */
    `<div class="hero-bleed section-pad relative overflow-hidden reveal">
  <div class="shell relative z-10">
    <p class="eyebrow mb-2">Established ${DATA.firm.est}</p>
    <h1 class="display-xxl">Counsel for <span class="accent-word"><em>consequential</em></span> decisions.</h1>
    <p class="lead max-w-2 mt-4">${DATA.firm.tagline} Six practices, three offices, and one standard of care applied to every matter that crosses the desk.</p>
    <div class="row gap-2 mt-6">
      <a class="btn btn-primary" href="#contact">Open a matter</a>
      <a class="btn btn-outline" href="#services">Browse practices</a>
    </div>
  </div>
  <div class="hero-scroll-cue"><span class="cue-line"></span><span class="text-xs uppercase tracking-widest">Scroll</span></div>
</div>`,

    /* 2. Split editorial */
    `<div class="shell section-pad split gap-4 reveal">
  <div class="col gap-2">
    <p class="eyebrow">${DATA.firm.legal} · ${DATA.firm.address}</p>
    <h1 class="display-xl">Leverage, kept <span class="accent-word"><em>quiet</em></span> until it is needed.</h1>
    <p class="lead">${DATA.stats[0].value} recovered for clients, ${DATA.stats[1].value} of matters resolved in our clients' favour, and three offices that answer as one firm.</p>
    <div class="row gap-2 mt-4">
      <a class="btn btn-primary" href="#contact">Book a consultation</a>
      <a class="link-arrow" href="#services">See the practice areas</a>
    </div>
  </div>
  <div class="photo-block photo-block--tall">
    <div class="photo-watermark">${UI.icon('scale','ico-xl')}</div>
    <div class="photo-card">
      <p class="text-xs uppercase tracking-widest muted">${DATA.firm.offices}</p>
      <p class="text-sm mt-1">${DATA.firm.tagline}</p>
    </div>
  </div>
</div>`,

    /* 3. Centered masthead */
    `<div class="shell section-pad text-center max-w-3 mx-auto reveal">
  <p class="eyebrow eyebrow--plain">${DATA.firm.offices}</p>
  <h1 class="display-xl">Measured by <span class="accent-word"><em>outcomes</em></span>, not by letterhead.</h1>
  <p class="lead mt-3">${DATA.firm.tagline} ${DATA.stats[2].value} years at the bar, spent almost entirely on the work that refused to be easy.</p>
  <div class="divider"></div>
  <div class="grid-4 gap-2">
    <div class="stat"><p class="stat-serif text-3xl">${DATA.stats[0].value}</p><p class="text-xs uppercase tracking-wide muted">${DATA.stats[0].label}</p></div>
    <div class="stat"><p class="stat-serif text-3xl">${DATA.stats[1].value}</p><p class="text-xs uppercase tracking-wide muted">${DATA.stats[1].label}</p></div>
    <div class="stat"><p class="stat-serif text-3xl">${DATA.stats[2].value}</p><p class="text-xs uppercase tracking-wide muted">${DATA.stats[2].label}</p></div>
    <div class="stat"><p class="stat-serif text-3xl">${DATA.stats[3].value}</p><p class="text-xs uppercase tracking-wide muted">${DATA.stats[3].label}</p></div>
  </div>
</div>`,

    /* 4. Ledger band */
    `<div class="band-neutral section-pad reveal">
  <div class="shell">
    <div class="split gap-4">
      <div class="col gap-2">
        <h2 class="display-lg">Retained for the difficult half of business</h2>
        <p class="lead">${DATA.firm.tagline} The three practices below take most of our instructions — and most of the ${DATA.stats[0].value} returned to clients.</p>
        <a class="btn btn-primary" href="#contact">Speak with counsel</a>
      </div>
      <div class="col gap-2">
        <div class="flex gap-2 items-start">
          <div class="icon-chip">${UI.icon(DATA.services[0].icon,'ico-lg')}</div>
          <div>
            <h3>${DATA.services[0].title}</h3>
            <p class="text-sm muted">${DATA.services[0].desc}</p>
          </div>
        </div>
        <div class="divider"></div>
        <div class="flex gap-2 items-start">
          <div class="icon-chip">${UI.icon(DATA.services[1].icon,'ico-lg')}</div>
          <div>
            <h3>${DATA.services[1].title}</h3>
            <p class="text-sm muted">${DATA.services[1].desc}</p>
          </div>
        </div>
        <div class="divider"></div>
        <div class="flex gap-2 items-start">
          <div class="icon-chip">${UI.icon(DATA.services[2].icon,'ico-lg')}</div>
          <div>
            <h3>${DATA.services[2].title}</h3>
            <p class="text-sm muted">${DATA.services[2].desc}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,

    /* 5. Framed statement */
    `<div class="shell section-pad reveal">
  <div class="border border-base-300 rounded-2xl p-8 relative overflow-hidden">
    <div class="photo-watermark">${UI.icon('gavel','ico-xl')}</div>
    <p class="quote-glyph">&ldquo;</p>
    <h2 class="display-lg">Discretion is how we keep the advantage. Results are how we spend it.</h2>
    <p class="text-sm muted mt-2">${DATA.firm.name} has practised both since ${DATA.firm.est} — ${DATA.metrics[2].value}% of our matters close before a courtroom is involved, which is usually the point.</p>
    <div class="row gap-2 mt-6">
      <a class="link-arrow" href="${DATA.firm.phoneHref}">${DATA.firm.phone}</a>
      <a class="link-arrow" href="mailto:${DATA.firm.email}">${DATA.firm.email}</a>
    </div>
  </div>
</div>`,

    /* 6. Index column */
    `<div class="shell section-pad grid gap-4 reveal">
  <div class="col gap-2 max-w-1">
    <div class="icon-chip">${UI.icon('scale','ico-lg')}</div>
    <p class="eyebrow eyebrow--plain">Est. ${DATA.firm.est}</p>
    <span class="block text-xs muted">${DATA.firm.offices.split(' · ')[0]}</span>
    <span class="block text-xs muted">${DATA.firm.offices.split(' · ')[1]}</span>
    <span class="block text-xs muted">${DATA.firm.offices.split(' · ')[2]}</span>
    <a class="link-arrow mt-2" href="${DATA.firm.phoneHref}">${DATA.firm.phone}</a>
  </div>
  <div class="grid-2 gap-2">
    <div class="flex gap-2 items-start">
      <div class="icon-chip">${UI.icon(DATA.services[0].icon,'ico-lg')}</div>
      <div><h3>${DATA.services[0].title}</h3><p class="text-sm muted">${DATA.services[0].desc}</p></div>
    </div>
    <div class="flex gap-2 items-start">
      <div class="icon-chip">${UI.icon(DATA.services[1].icon,'ico-lg')}</div>
      <div><h3>${DATA.services[1].title}</h3><p class="text-sm muted">${DATA.services[1].desc}</p></div>
    </div>
    <div class="flex gap-2 items-start">
      <div class="icon-chip">${UI.icon(DATA.services[2].icon,'ico-lg')}</div>
      <div><h3>${DATA.services[2].title}</h3><p class="text-sm muted">${DATA.services[2].desc}</p></div>
    </div>
    <div class="flex gap-2 items-start">
      <div class="icon-chip">${UI.icon(DATA.services[3].icon,'ico-lg')}</div>
      <div><h3>${DATA.services[3].title}</h3><p class="text-sm muted">${DATA.services[3].desc}</p></div>
    </div>
    <div class="flex gap-2 items-start">
      <div class="icon-chip">${UI.icon(DATA.services[4].icon,'ico-lg')}</div>
      <div><h3>${DATA.services[4].title}</h3><p class="text-sm muted">${DATA.services[4].desc}</p></div>
    </div>
    <div class="flex gap-2 items-start">
      <div class="icon-chip">${UI.icon(DATA.services[5].icon,'ico-lg')}</div>
      <div><h3>${DATA.services[5].title}</h3><p class="text-sm muted">${DATA.services[5].desc}</p></div>
    </div>
  </div>
</div>`,
  ],
};
