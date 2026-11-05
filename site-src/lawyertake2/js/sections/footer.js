/* Footer band — 6 layout variants. Host element is <footer data-section="footer">. */
window.SECTIONS = window.SECTIONS || {};
window.SECTIONS.footer = {
  label: 'Footer',
  variants: [
    /* 1. Classic grid */
    `<div class="section-pad--sm reveal">
  <div class="shell">
    <div class="grid-4">
      <div>
        <div class="icon-chip">${UI.icon('scale', 'ico-lg')}</div>
        <h3 class="mt-3">${DATA.firm.name}</h3>
        <p class="text-sm muted mt-2">${DATA.firm.tagline}</p>
      </div>
      <div class="col gap-2">
        <a class="text-sm" href="#services">Practice</a>
        <a class="text-sm" href="#team">Attorneys</a>
        <a class="text-sm" href="#testimonials">Testimonials</a>
      </div>
      <div class="col gap-2">
        <a class="text-sm" href="#about">Firm</a>
        <a class="text-sm" href="#contact">Contact</a>
        <a class="text-sm" href="#top">Back to top</a>
      </div>
      <div class="col gap-2">
        <p class="text-sm">${DATA.firm.address}</p>
        <p class="text-sm muted">${DATA.firm.city}</p>
        <a class="text-sm" href="mailto:${DATA.firm.email}">${DATA.firm.email}</a>
        <a class="text-sm" href="${DATA.firm.phoneHref}">${DATA.firm.phone}</a>
      </div>
    </div>
    <hr class="rule mt-8" />
    <div class="row row--wrap justify-between mt-4">
      <p class="text-xs muted">© 2026 ${DATA.firm.legal} · Attorney advertising</p>
      <p class="text-xs muted">Choose another footer in the Design Studio</p>
    </div>
  </div>
</div>`,

    /* 2. Wordmark */
    `<div class="section-pad text-center reveal">
  <div class="shell">
    <div class="footer-wordmark">${DATA.firm.name}</div>
    <hr class="rule mt-6" />
    <div class="row justify-center gap-4 mt-4">
      <a class="text-xs uppercase tracking-widest" href="#services">Practice</a>
      <a class="text-xs uppercase tracking-widest" href="#about">Firm</a>
      <a class="text-xs uppercase tracking-widest" href="#team">Attorneys</a>
      <a class="text-xs uppercase tracking-widest" href="#testimonials">Clients</a>
      <a class="text-xs uppercase tracking-widest" href="#contact">Contact</a>
    </div>
    <p class="text-xs faint mt-4">© 2026 ${DATA.firm.legal} · Attorney advertising</p>
  </div>
</div>`,

    /* 3. Dark band */
    `<div class="band-neutral section-pad--sm reveal">
  <div class="shell split">
    <div class="col gap-2">
      <h3>${DATA.firm.name}</h3>
      <p class="lead">One team across three time zones, handling the work that decides what you keep.</p>
      <p class="text-xs muted">${DATA.firm.hours}</p>
    </div>
    <div>
      <div class="grid-2 gap-2">
        <a class="text-sm" href="#services">${DATA.services[0].title}</a>
        <a class="text-sm" href="#services">${DATA.services[1].title}</a>
        <a class="text-sm" href="#services">${DATA.services[2].title}</a>
        <a class="text-sm" href="#services">${DATA.services[3].title}</a>
        <a class="text-sm" href="#services">${DATA.services[4].title}</a>
        <a class="text-sm" href="#services">${DATA.services[5].title}</a>
      </div>
      <div class="row row--wrap justify-between mt-4">
        <a class="text-sm" href="#top">Back to top</a>
        <a class="text-sm" href="mailto:${DATA.firm.email}">${DATA.firm.email}</a>
        <a class="text-sm" href="${DATA.firm.phoneHref}">${DATA.firm.phone}</a>
      </div>
    </div>
  </div>
</div>`,

    /* 4. Ledger */
    `<div class="section-pad--sm reveal">
  <div class="shell">
    <p class="display-lg">Three cities. One standard of care.</p>
    <hr class="rule mt-6" />
    <div class="grid-3 mt-6">
      <div>
        <h3>${DATA.firm.name}</h3>
        <p class="text-sm muted mt-2">${DATA.firm.tagline}</p>
      </div>
      <div class="col gap-2">
        ${DATA.firm.offices.split(' · ').map(function (city) { return '<p class="text-sm">' + city + '</p>'; }).join('')}
      </div>
      <div class="col gap-2">
        <a class="link-arrow text-sm" href="mailto:${DATA.firm.email}">${DATA.firm.email}</a>
        <a class="link-arrow text-sm" href="${DATA.firm.phoneHref}">${DATA.firm.phone}</a>
        <p class="text-xs muted">${DATA.firm.hours}</p>
      </div>
    </div>
  </div>
</div>`,

    /* 5. Centered minimal */
    `<div class="section-pad text-center reveal">
  <div class="shell max-w-3 mx-auto">
    <div class="icon-chip">${UI.icon('scale', 'ico-lg')}</div>
    <h3 class="mt-3">${DATA.firm.name}</h3>
    <p class="lead mt-2">${DATA.firm.tagline}</p>
    <div class="row justify-center gap-4 mt-4">
      <a class="text-xs uppercase tracking-widest" href="#services">Practice</a>
      <a class="text-xs uppercase tracking-widest" href="#about">Firm</a>
      <a class="text-xs uppercase tracking-widest" href="#team">Attorneys</a>
      <a class="text-xs uppercase tracking-widest" href="#testimonials">Clients</a>
      <a class="text-xs uppercase tracking-widest" href="#contact">Contact</a>
    </div>
    <hr class="rule mt-6" />
    <p class="text-xs faint mt-4">© 2026 ${DATA.firm.legal} · Attorney advertising</p>
  </div>
</div>`,

    /* 6. Gradient */
    `<div class="band-gradient section-pad--sm reveal">
  <div class="shell split--rev">
    <div>
      <div class="grid-2 gap-2">
        <a class="text-sm" href="#services">${DATA.services[0].title}</a>
        <a class="text-sm" href="#services">${DATA.services[1].title}</a>
        <a class="text-sm" href="#services">${DATA.services[2].title}</a>
        <a class="text-sm" href="#services">${DATA.services[3].title}</a>
        <a class="text-sm" href="#services">${DATA.services[4].title}</a>
        <a class="text-sm" href="#services">${DATA.services[5].title}</a>
      </div>
      <p class="text-xs mt-4">© 2026 ${DATA.firm.legal} · Attorney advertising</p>
    </div>
    <div class="col gap-2">
      <h3>${DATA.firm.name}</h3>
      <p class="text-sm">${DATA.firm.tagline}</p>
      <a class="btn btn-primary btn-sm" href="#contact">Start a matter</a>
      <p class="text-xs mt-3">${DATA.firm.hours} · ${DATA.firm.offices}</p>
    </div>
  </div>
</div>`,
  ],
};
