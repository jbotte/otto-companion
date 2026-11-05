/* Team / attorneys — 6 layout variants. */
window.SECTIONS = window.SECTIONS || {};
window.SECTIONS.team = {
  label: 'Attorneys',
  variants: [
    /* 1. Partner grid */
    `<div class="shell section-pad reveal">
  <header class="mb-8">
    <p class="eyebrow eyebrow--plain">The Bench</p>
    <h2 class="display-lg">Four partners. No hand-offs.</h2>
    <p class="lead mt-3">Every matter is staffed by name, not by department. The partner who reads your file is the partner who argues it.</p>
  </header>
  <div class="grid-4">
    <div class="card card-hover team-card bg-base-100 border border-base-300 shadow-sm">
      ${UI.avatar(DATA.team[0], 0, 'av-lg')}
      <h3 class="mt-3">${DATA.team[0].name}</h3><p class="text-xs uppercase tracking-wide muted">${DATA.team[0].role}</p>
      <p class="text-sm mt-2">${DATA.team[0].bio}</p>
      <div class="team-more text-xs mt-2">J.D., Columbia Law · Clerk, U.S. Court of Appeals for the Second Circuit · Admitted NY &amp; England</div>
    </div>
    <div class="card card-hover team-card bg-base-100 border border-base-300 shadow-sm">
      ${UI.avatar(DATA.team[1], 1, 'av-lg')}
      <h3 class="mt-3">${DATA.team[1].name}</h3><p class="text-xs uppercase tracking-wide muted">${DATA.team[1].role}</p>
      <p class="text-sm mt-2">${DATA.team[1].bio}</p>
      <div class="team-more text-xs mt-2">B.A. Morehouse · J.D. NYU Law · National Trial Lawyers, Top 40 Under 40</div>
    </div>
    <div class="card card-hover team-card bg-base-100 border border-base-300 shadow-sm">
      ${UI.avatar(DATA.team[2], 2, 'av-lg')}
      <h3 class="mt-3">${DATA.team[2].name}</h3><p class="text-xs uppercase tracking-wide muted">${DATA.team[2].role}</p>
      <p class="text-sm mt-2">${DATA.team[2].bio}</p>
      <div class="team-more text-xs mt-2">LL.M. Temple · Clerk, NY Appellate Term · Admitted NY &amp; Singapore</div>
    </div>
    <div class="card card-hover team-card bg-base-100 border border-base-300 shadow-sm">
      ${UI.avatar(DATA.team[3], 3, 'av-lg')}
      <h3 class="mt-3">${DATA.team[3].name}</h3><p class="text-xs uppercase tracking-wide muted">${DATA.team[3].role}</p>
      <p class="text-sm mt-2">${DATA.team[3].bio}</p>
      <div class="team-more text-xs mt-2">M.Acc. Lagos · J.D. Fordham · Admitted NY &amp; England &amp; Wales</div>
    </div>
  </div>
</div>`,

    /* 2. Duo cards */
    `<div class="shell section-pad--sm reveal">
  <h2 class="mb-6">Whoever you call, this is who answers.</h2>
  <div class="grid-2">
    <div class="card card-hover bg-base-100 border border-base-300 shadow-sm p-6">
      <div class="row gap-3">${UI.avatar(DATA.team[0], 0, 'av-lg')}
        <div class="flex-1"><h3>${DATA.team[0].name}</h3><p class="text-xs muted">${DATA.team[0].role}</p>
        <p class="text-sm mt-1">${DATA.team[0].bio}</p></div>
      </div>
    </div>
    <div class="card card-hover bg-base-100 border border-base-300 shadow-sm p-6">
      <div class="row gap-3">${UI.avatar(DATA.team[1], 1, 'av-lg')}
        <div class="flex-1"><h3>${DATA.team[1].name}</h3><p class="text-xs muted">${DATA.team[1].role}</p>
        <p class="text-sm mt-1">${DATA.team[1].bio}</p></div>
      </div>
    </div>
    <div class="card card-hover bg-base-100 border border-base-300 shadow-sm p-6">
      <div class="row gap-3">${UI.avatar(DATA.team[2], 2, 'av-lg')}
        <div class="flex-1"><h3>${DATA.team[2].name}</h3><p class="text-xs muted">${DATA.team[2].role}</p>
        <p class="text-sm mt-1">${DATA.team[2].bio}</p></div>
      </div>
    </div>
    <div class="card card-hover bg-base-100 border border-base-300 shadow-sm p-6">
      <div class="row gap-3">${UI.avatar(DATA.team[3], 3, 'av-lg')}
        <div class="flex-1"><h3>${DATA.team[3].name}</h3><p class="text-xs muted">${DATA.team[3].role}</p>
        <p class="text-sm mt-1">${DATA.team[3].bio}</p></div>
      </div>
    </div>
  </div>
</div>`,

    /* 3. Directory rows */
    `<div class="shell section-pad reveal">
  <header class="mb-6">
    <p class="eyebrow eyebrow--plain">The Bench</p>
    <h2 class="display-lg">Find the right name, then call the desk.</h2>
  </header>
  <div class="col gap-1">
    <a class="svc-row" href="#contact">${UI.avatar(DATA.team[0], 0, 'av-sm')}
      <div class="flex-1"><h3>${DATA.team[0].name}</h3><p class="text-xs muted">${DATA.team[0].role}</p></div>
      <span class="text-xs muted">Corporate</span>
      <span class="row-arrow faint">${UI.icon('upright', 'ico')}</span>
    </a>
    <a class="svc-row" href="#contact">${UI.avatar(DATA.team[1], 1, 'av-sm')}
      <div class="flex-1"><h3>${DATA.team[1].name}</h3><p class="text-xs muted">${DATA.team[1].role}</p></div>
      <span class="text-xs muted">Litigation</span>
      <span class="row-arrow faint">${UI.icon('upright', 'ico')}</span>
    </a>
    <a class="svc-row" href="#contact">${UI.avatar(DATA.team[2], 2, 'av-sm')}
      <div class="flex-1"><h3>${DATA.team[2].name}</h3><p class="text-xs muted">${DATA.team[2].role}</p></div>
      <span class="text-xs muted">Real Estate</span>
      <span class="row-arrow faint">${UI.icon('upright', 'ico')}</span>
    </a>
    <a class="svc-row" href="#contact">${UI.avatar(DATA.team[3], 3, 'av-sm')}
      <div class="flex-1"><h3>${DATA.team[3].name}</h3><p class="text-xs muted">${DATA.team[3].role}</p></div>
      <span class="text-xs muted">Tax &amp; IP</span>
      <span class="row-arrow faint">${UI.icon('upright', 'ico')}</span>
    </a>
  </div>
</div>`,

    /* 4. Dark bench */
    `<div class="band-neutral section-pad reveal">
  <header class="mb-8">
    <p class="eyebrow eyebrow--plain">The Bench</p>
    <h2 class="display-lg">A bench built for the long argument.</h2>
    <p class="lead mt-3">Two decades of adversarial work, distilled into four people who read two paragraphs ahead of the other side.</p>
  </header>
  <div class="grid-4">
    <div class="tile bg-white-5 border border-white-10">
      ${UI.avatar(DATA.team[0], 0, 'av-md')}<h3 class="mt-3">${DATA.team[0].name}</h3>
      <p class="text-xs uppercase tracking-wide muted">${DATA.team[0].role}</p>
      <p class="text-sm muted mt-2">${DATA.team[0].bio}</p>
    </div>
    <div class="tile bg-white-5 border border-white-10">
      ${UI.avatar(DATA.team[1], 1, 'av-md')}<h3 class="mt-3">${DATA.team[1].name}</h3>
      <p class="text-xs uppercase tracking-wide muted">${DATA.team[1].role}</p>
      <p class="text-sm muted mt-2">${DATA.team[1].bio}</p>
    </div>
    <div class="tile bg-white-5 border border-white-10">
      ${UI.avatar(DATA.team[2], 2, 'av-md')}<h3 class="mt-3">${DATA.team[2].name}</h3>
      <p class="text-xs uppercase tracking-wide muted">${DATA.team[2].role}</p>
      <p class="text-sm muted mt-2">${DATA.team[2].bio}</p>
    </div>
    <div class="tile bg-white-5 border border-white-10">
      ${UI.avatar(DATA.team[3], 3, 'av-md')}<h3 class="mt-3">${DATA.team[3].name}</h3>
      <p class="text-xs uppercase tracking-wide muted">${DATA.team[3].role}</p>
      <p class="text-sm muted mt-2">${DATA.team[3].bio}</p>
    </div>
  </div>
</div>`,

    /* 5. Portrait + list */
    `<div class="shell section-pad split reveal">
  <div class="photo-block photo-block--tall">
    <div class="photo-icon-grid">
      <span class="icon-chip">${UI.icon('users', 'ico')}</span><span class="icon-chip">${UI.icon('scale', 'ico')}</span>
      <span class="icon-chip">${UI.icon('gavel', 'ico')}</span><span class="icon-chip">${UI.icon('book', 'ico')}</span>
    </div>
    <div class="photo-card">Four partners. One bench.</div>
  </div>
  <div class="col">
    <div class="row gap-3">${UI.avatar(DATA.team[0], 0, 'av-md')}
      <div class="flex-1"><h3>${DATA.team[0].name}</h3><p class="text-xs muted">${DATA.team[0].role}</p>
      <p class="text-xs mt-1">${DATA.team[0].bio}</p></div>
    </div>
    <hr class="rule" />
    <div class="row gap-3">${UI.avatar(DATA.team[1], 1, 'av-md')}
      <div class="flex-1"><h3>${DATA.team[1].name}</h3><p class="text-xs muted">${DATA.team[1].role}</p>
      <p class="text-xs mt-1">${DATA.team[1].bio}</p></div>
    </div>
    <hr class="rule" />
    <div class="row gap-3">${UI.avatar(DATA.team[2], 2, 'av-md')}
      <div class="flex-1"><h3>${DATA.team[2].name}</h3><p class="text-xs muted">${DATA.team[2].role}</p>
      <p class="text-xs mt-1">${DATA.team[2].bio}</p></div>
    </div>
    <hr class="rule" />
    <div class="row gap-3">${UI.avatar(DATA.team[3], 3, 'av-md')}
      <div class="flex-1"><h3>${DATA.team[3].name}</h3><p class="text-xs muted">${DATA.team[3].role}</p>
      <p class="text-xs mt-1">${DATA.team[3].bio}</p></div>
    </div>
  </div>
</div>`,

    /* 6. Roster panel */
    `<div class="shell section-pad reveal">
  <header class="mb-6">
    <p class="eyebrow eyebrow--plain">The Bench</p>
    <h2 class="display-lg">The whole roster, in one column.</h2>
  </header>
  <div class="border border-base-300 rounded-2xl p-6">
    <div class="row gap-3"><span class="text-xs stat-serif muted">01</span>${UI.avatar(DATA.team[0], 0, 'av-sm')}
      <div class="flex-1"><h3>${DATA.team[0].name}</h3><p class="text-xs muted">${DATA.team[0].role}</p></div>
      <span class="badge badge-ghost badge-sm">Corporate</span>
    </div>
    <hr class="rule" />
    <div class="row gap-3"><span class="text-xs stat-serif muted">02</span>${UI.avatar(DATA.team[1], 1, 'av-sm')}
      <div class="flex-1"><h3>${DATA.team[1].name}</h3><p class="text-xs muted">${DATA.team[1].role}</p></div>
      <span class="badge badge-ghost badge-sm">Litigation</span>
    </div>
    <hr class="rule" />
    <div class="row gap-3"><span class="text-xs stat-serif muted">03</span>${UI.avatar(DATA.team[2], 2, 'av-sm')}
      <div class="flex-1"><h3>${DATA.team[2].name}</h3><p class="text-xs muted">${DATA.team[2].role}</p></div>
      <span class="badge badge-ghost badge-sm">Real Estate</span>
    </div>
    <hr class="rule" />
    <div class="row gap-3"><span class="text-xs stat-serif muted">04</span>${UI.avatar(DATA.team[3], 3, 'av-sm')}
      <div class="flex-1"><h3>${DATA.team[3].name}</h3><p class="text-xs muted">${DATA.team[3].role}</p></div>
      <span class="badge badge-ghost badge-sm">Tax &amp; IP</span>
    </div>
  </div>
</div>`,
  ],
};
