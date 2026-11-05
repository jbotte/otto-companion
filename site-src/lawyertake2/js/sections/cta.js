/* Call to action — 6 layout variants. */
window.SECTIONS = window.SECTIONS || {};
window.SECTIONS.cta = {
  label: 'Call to action',
  variants: [
    /* 1. Gradient band */
    `<div class="band-gradient section-pad reveal">
  <div class="shell text-center max-w-3 mx-auto">
    <p class="eyebrow">Ready when you are</p>
    <p class="display-xl">The call that changes the outcome starts here.</p>
    <p class="lead">Tell us what is on the table and what is at stake. A partner will give you a plain, unhurried read on both.</p>
    <div class="row justify-center gap-2 mt-6">
      <a class="btn btn-primary" href="#contact">Book a consultation ${UI.icon('arrow','ico-sm')}</a>
      <a class="btn btn-ghost" href="${DATA.firm.phoneHref}">${DATA.firm.phone}</a>
    </div>
  </div>
</div>`,

    /* 2. Split photo */
    `<div class="shell section-pad split reveal">
  <div class="photo-block photo-block--short">
    <div class="photo-watermark">${UI.icon('phone','ico-xl')}</div>
  </div>
  <div>
    <p class="eyebrow">Start the conversation</p>
    <h2 class="h2">One conversation is usually the difference.</h2>
    <p class="lead">Most matters we won began as a twenty-minute call someone almost did not make. Make that call.</p>
    <a class="btn btn-primary mt-4" href="#contact">Book a consultation ${UI.icon('arrow','ico-sm')}</a>
  </div>
</div>`,

    /* 3. Framed card */
    `<div class="shell section-pad--sm reveal">
  <div class="card bg-base-200 border border-base-300 rounded-2xl p-8">
    <div class="row row--wrap gap-3 justify-between">
      <div class="flex-1">
        <h2 class="h2">Something on your desk right now?</h2>
        <p class="text-sm muted">An early read from a partner costs you nothing and settles the question.</p>
      </div>
      <div class="col gap-2">
        <a class="btn btn-primary" href="#contact">Book a consultation ${UI.icon('arrow','ico-sm')}</a>
        <p class="text-xs muted text-center">Or call ${DATA.firm.phone}</p>
      </div>
    </div>
  </div>
</div>`,

    /* 4. Dark statement */
    `<div class="band-neutral section-pad reveal">
  <div class="shell text-center">
    <p class="display-lg">Whatever you are weighing, we have probably weighed it before. Let's talk.</p>
    <div class="row justify-center gap-2 mt-6">
      <a class="btn btn-primary" href="#contact">Book a consultation ${UI.icon('arrow','ico-sm')}</a>
      <a class="btn btn-outline" href="#services">Browse our services ${UI.icon('arrow','ico-sm')}</a>
    </div>
  </div>
</div>`,

    /* 5. Gold band */
    `<div class="band-secondary section-pad reveal">
  <div class="shell split">
    <div>
      <h2 class="h2">Three offices, one phone number.</h2>
      <p class="lead">New York to Singapore, a partner picks up. Time zones are logistics, not excuses.</p>
    </div>
    <div class="col gap-2">
      <a class="btn btn-neutral" href="#contact">Book a consultation ${UI.icon('arrow','ico-sm')}</a>
      <div class="row gap-2 text-xs mt-2">${DATA.firm.hours} · ${DATA.firm.offices}</div>
    </div>
  </div>
</div>`,

    /* 6. Minimal */
    `<div class="shell section-pad--sm text-center reveal">
  <p class="eyebrow--plain">${DATA.firm.tagline}</p>
  <p class="display-lg">Say the hard part out loud. We will bring the plan.</p>
  <a class="link-arrow mt-4" href="#contact">Book a consultation ${UI.icon('arrow','ico-sm')}</a>
</div>`,
  ],
};
