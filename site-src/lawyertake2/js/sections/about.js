/* Firm — about-page narratives: split story, timelines, values tabs, numbers band, ledger — 6 layout variants. */
window.SECTIONS = window.SECTIONS || {};
window.SECTIONS.about = {
  label: 'Firm',
  variants: [
    /* 1. Split story */
    `<div class="shell section-pad split reveal">
  <div class="col gap-5">
    <div>
      <span class="eyebrow">The Firm</span>
      <h2 class="h2 mt-2">A firm built on two disciplines and one standard.</h2>
      <p class="lead mt-3">That conviction predates the firm. ${DATA.firm.legal} has practised since ${DATA.firm.est} on the belief that a client's most consequential decisions deserve unusual attention — so we kept the caseload small enough to read every file ourselves, and stayed counsel to the companies and families who first trusted us.</p>
    </div>
    <div class="col gap-4">
      <div class="row gap-3"><span class="check-chip">${UI.icon('check','ico-sm')}</span><div><h3 class="h3">${DATA.values[0].title}</h3><p class="text-sm muted mt-1">${DATA.values[0].desc}</p></div></div>
      <div class="row gap-3"><span class="check-chip">${UI.icon('check','ico-sm')}</span><div><h3 class="h3">${DATA.values[1].title}</h3><p class="text-sm muted mt-1">${DATA.values[1].desc}</p></div></div>
      <div class="row gap-3"><span class="check-chip">${UI.icon('check','ico-sm')}</span><div><h3 class="h3">${DATA.values[2].title}</h3><p class="text-sm muted mt-1">${DATA.values[2].desc}</p></div></div>
    </div>
  </div>
  <div class="photo-block photo-block--tall">
    <div class="photo-watermark">${UI.icon('landmark','ico-xl')}</div>
    <div class="photo-card"><p class="stat-serif text-4xl">${DATA.stats[0].value}</p><p class="text-xs uppercase tracking-widest mt-2">recovered since ${DATA.firm.est}</p></div>
  </div>
</div>`,

    /* 2. Timeline, vertical */
    `<div class="shell section-pad">
  <div class="max-w-3 reveal">
    <span class="eyebrow">Since ${DATA.firm.est}</span>
    <h2 class="h2 mt-2">The history of the firm, told at the five turns that changed it.</h2>
  </div>
  <div class="timeline timeline-vertical lw-timeline mt-8 reveal">
    <li><div class="timeline-start"><div class="timeline-box">${DATA.milestones[0].year}</div></div><span class="timeline-middle"><span class="timeline-indicators"></span></span><div class="timeline-content"><h3 class="h3">${DATA.milestones[0].title}</h3><p class="text-sm muted mt-1">${DATA.milestones[0].desc}</p></div></li>
    <li><div class="timeline-start"><div class="timeline-box">${DATA.milestones[1].year}</div></div><span class="timeline-middle"><span class="timeline-indicators"></span></span><div class="timeline-content"><h3 class="h3">${DATA.milestones[1].title}</h3><p class="text-sm muted mt-1">${DATA.milestones[1].desc}</p></div></li>
    <li><div class="timeline-start"><div class="timeline-box">${DATA.milestones[2].year}</div></div><span class="timeline-middle"><span class="timeline-indicators"></span></span><div class="timeline-content"><h3 class="h3">${DATA.milestones[2].title}</h3><p class="text-sm muted mt-1">${DATA.milestones[2].desc}</p></div></li>
    <li><div class="timeline-start"><div class="timeline-box">${DATA.milestones[3].year}</div></div><span class="timeline-middle"><span class="timeline-indicators"></span></span><div class="timeline-content"><h3 class="h3">${DATA.milestones[3].title}</h3><p class="text-sm muted mt-1">${DATA.milestones[3].desc}</p></div></li>
    <li><div class="timeline-start"><div class="timeline-box">${DATA.milestones[4].year}</div></div><span class="timeline-middle"><span class="timeline-indicators"></span></span><div class="timeline-content"><h3 class="h3">${DATA.milestones[4].title}</h3><p class="text-sm muted mt-1">${DATA.milestones[4].desc}</p></div></li>
  </div>
</div>`,

    /* 3. Values as tabs */
    `<div class="shell section-pad">
  <div class="max-w-3 reveal">
    <span class="eyebrow">How we practise</span>
    <h2 class="h2 mt-2">Three commitments, written down before the retainer is signed.</h2>
  </div>
  <div class="tabs tabs-box mt-6 reveal" data-lw-tabs>
    <a class="tab tab-active">${DATA.values[0].title}</a>
    <a class="tab">${DATA.values[1].title}</a>
    <a class="tab">${DATA.values[2].title}</a>
  </div>
  <div class="tab-panel" data-lw-panel="0">
    <span class="icon-chip">${UI.icon(DATA.values[0].icon)}</span>
    <h3 class="h3 mt-4">${DATA.values[0].title}</h3>
    <p class="lead mt-2">${DATA.values[0].desc}</p>
  </div>
  <div class="tab-panel" data-lw-panel="1" hidden>
    <span class="icon-chip">${UI.icon(DATA.values[1].icon)}</span>
    <h3 class="h3 mt-4">${DATA.values[1].title}</h3>
    <p class="lead mt-2">${DATA.values[1].desc}</p>
  </div>
  <div class="tab-panel" data-lw-panel="2" hidden>
    <span class="icon-chip">${UI.icon(DATA.values[2].icon)}</span>
    <h3 class="h3 mt-4">${DATA.values[2].title}</h3>
    <p class="lead mt-2">${DATA.values[2].desc}</p>
  </div>
</div>`,

    /* 4. Numbers band */
    `<div class="band-neutral section-pad">
  <div class="shell split reveal">
    <div class="col gap-4">
      <span class="quote-glyph">&ldquo;</span>
      <p class="display-lg">Precision is a discipline and discretion is a promise. We have never been willing to trade either for speed, and we have never had to.</p>
    </div>
    <div class="grid-2">
      <div class="tile bg-white-5 border border-white-10 rounded-xl p-6"><div class="stat-serif text-4xl">${DATA.stats[0].value}</div><div class="text-xs uppercase tracking-widest muted mt-2">${DATA.stats[0].label}</div></div>
      <div class="tile bg-white-5 border border-white-10 rounded-xl p-6"><div class="stat-serif text-4xl">${DATA.stats[1].value}</div><div class="text-xs uppercase tracking-widest muted mt-2">${DATA.stats[1].label}</div></div>
      <div class="tile bg-white-5 border border-white-10 rounded-xl p-6"><div class="stat-serif text-4xl">${DATA.stats[2].value}</div><div class="text-xs uppercase tracking-widest muted mt-2">${DATA.stats[2].label}</div></div>
      <div class="tile bg-white-5 border border-white-10 rounded-xl p-6"><div class="stat-serif text-4xl">${DATA.stats[3].value}</div><div class="text-xs uppercase tracking-widest muted mt-2">${DATA.stats[3].label}</div></div>
    </div>
  </div>
</div>`,

    /* 5. Timeline, horizontal */
    `<div class="shell section-pad overflow-hidden reveal">
  <div class="max-w-3">
    <span class="eyebrow">The record</span>
    <h2 class="h2 mt-2">The whole record, laid out end to end.</h2>
    <p class="text-sm muted mt-2">Read left to right: each marker is a year in which the firm changed shape rather than simply grew.</p>
  </div>
  <div class="timeline timeline-horizontal lw-timeline mt-8">
    <li><span class="timeline-middle"><span class="timeline-indicators"></span></span><div class="timeline-box">${DATA.milestones[0].year}</div><div class="timeline-content"><h3 class="h3">${DATA.milestones[0].title}</h3><p class="text-sm muted mt-1">${DATA.milestones[0].desc}</p></div></li>
    <li><span class="timeline-middle"><span class="timeline-indicators"></span></span><div class="timeline-box">${DATA.milestones[1].year}</div><div class="timeline-content"><h3 class="h3">${DATA.milestones[1].title}</h3><p class="text-sm muted mt-1">${DATA.milestones[1].desc}</p></div></li>
    <li><span class="timeline-middle"><span class="timeline-indicators"></span></span><div class="timeline-box">${DATA.milestones[2].year}</div><div class="timeline-content"><h3 class="h3">${DATA.milestones[2].title}</h3><p class="text-sm muted mt-1">${DATA.milestones[2].desc}</p></div></li>
    <li><span class="timeline-middle"><span class="timeline-indicators"></span></span><div class="timeline-box">${DATA.milestones[3].year}</div><div class="timeline-content"><h3 class="h3">${DATA.milestones[3].title}</h3><p class="text-sm muted mt-1">${DATA.milestones[3].desc}</p></div></li>
    <li><span class="timeline-middle"><span class="timeline-indicators"></span></span><div class="timeline-box">${DATA.milestones[4].year}</div><div class="timeline-content"><h3 class="h3">${DATA.milestones[4].title}</h3><p class="text-sm muted mt-1">${DATA.milestones[4].desc}</p></div></li>
  </div>
</div>`,

    /* 6. Ledger */
    `<div class="shell section-pad split split--rev reveal">
  <div class="col">
    <div><p class="stat-serif text-2xl muted">${DATA.milestones[0].year}</p><h3 class="h3 mt-1">${DATA.milestones[0].title}</h3><p class="text-sm muted mt-1">${DATA.milestones[0].desc}</p></div>
    <hr class="rule mt-4" />
    <div><p class="stat-serif text-2xl muted">${DATA.milestones[1].year}</p><h3 class="h3 mt-1">${DATA.milestones[1].title}</h3><p class="text-sm muted mt-1">${DATA.milestones[1].desc}</p></div>
    <hr class="rule mt-4" />
    <div><p class="stat-serif text-2xl muted">${DATA.milestones[2].year}</p><h3 class="h3 mt-1">${DATA.milestones[2].title}</h3><p class="text-sm muted mt-1">${DATA.milestones[2].desc}</p></div>
    <hr class="rule mt-4" />
    <div><p class="stat-serif text-2xl muted">${DATA.milestones[3].year}</p><h3 class="h3 mt-1">${DATA.milestones[3].title}</h3><p class="text-sm muted mt-1">${DATA.milestones[3].desc}</p></div>
    <hr class="rule mt-4" />
    <div><p class="stat-serif text-2xl muted">${DATA.milestones[4].year}</p><h3 class="h3 mt-1">${DATA.milestones[4].title}</h3><p class="text-sm muted mt-1">${DATA.milestones[4].desc}</p></div>
  </div>
  <div class="col gap-4">
    <div class="card card-hover bg-base-100 border border-base-300 shadow-sm p-6"><span class="icon-chip">${UI.icon(DATA.values[0].icon)}</span><h3 class="h3 mt-4">${DATA.values[0].title}</h3><p class="text-sm muted mt-2">${DATA.values[0].desc}</p></div>
    <div class="card card-hover bg-base-100 border border-base-300 shadow-sm p-6"><span class="icon-chip">${UI.icon(DATA.values[1].icon)}</span><h3 class="h3 mt-4">${DATA.values[1].title}</h3><p class="text-sm muted mt-2">${DATA.values[1].desc}</p></div>
    <div class="card card-hover bg-base-100 border border-base-300 shadow-sm p-6"><span class="icon-chip">${UI.icon(DATA.values[2].icon)}</span><h3 class="h3 mt-4">${DATA.values[2].title}</h3><p class="text-sm muted mt-2">${DATA.values[2].desc}</p></div>
  </div>
</div>`,
  ],
};
