/* Numbers — stat readouts and measurable metrics, drawn from DATA.stats / DATA.metrics — 6 layout variants. */
window.SECTIONS = window.SECTIONS || {};
window.SECTIONS.stats = {
  label: 'Numbers',
  variants: [
    /* 1. Stats bar */
    `<div class="shell section-pad">
  <div class="text-center max-w-2 mx-auto reveal">
    <p class="eyebrow">By the Numbers</p>
    <h2 class="display-lg">Measured by outcome, never by advertisement.</h2>
  </div>
  <div class="stats stats-horizontal shadow-lg w-full mt-6 reveal">
    <div class="stat">
      <div class="stat-title text-xs uppercase muted">${DATA.stats[0].label}</div>
      <div class="stat-figure stat-serif text-4xl">${DATA.stats[0].value}</div>
      <div class="stat-desc text-xs">Cumulative recoveries across commercial, IP and fiduciary matters since 1998.</div>
    </div>
    <div class="stat">
      <div class="stat-title text-xs uppercase muted">${DATA.stats[1].label}</div>
      <div class="stat-figure stat-serif text-4xl">${DATA.stats[1].value}</div>
      <div class="stat-desc text-xs">Settlements, dismissals and verdicts that met the brief we signed.</div>
    </div>
    <div class="stat">
      <div class="stat-title text-xs uppercase muted">${DATA.stats[2].label}</div>
      <div class="stat-figure stat-serif text-4xl">${DATA.stats[2].value}</div>
      <div class="stat-desc text-xs">Practising in New York, London and Singapore, under two flags and one standard.</div>
    </div>
    <div class="stat">
      <div class="stat-title text-xs uppercase muted">${DATA.stats[3].label}</div>
      <div class="stat-figure stat-serif text-4xl">${DATA.stats[3].value}</div>
      <div class="stat-desc text-xs">Founders, boards and families who stay on retainer year after year.</div>
    </div>
  </div>
</div>`,

    /* 2. Gold band */
    `<div class="band-secondary section-pad">
  <p class="eyebrow eyebrow--plain mb-4 reveal">By the numbers</p>
  <div class="grid-4 reveal">
    <div class="col gap-2">
      <p class="stat-serif text-5xl">${DATA.stats[0].value}</p>
      <p class="text-xs uppercase tracking-widest">${DATA.stats[0].label}</p>
    </div>
    <div class="col gap-2">
      <p class="stat-serif text-5xl">${DATA.stats[1].value}</p>
      <p class="text-xs uppercase tracking-widest">${DATA.stats[1].label}</p>
    </div>
    <div class="col gap-2">
      <p class="stat-serif text-5xl">${DATA.stats[2].value}</p>
      <p class="text-xs uppercase tracking-widest">${DATA.stats[2].label}</p>
    </div>
    <div class="col gap-2">
      <p class="stat-serif text-5xl">${DATA.stats[3].value}</p>
      <p class="text-xs uppercase tracking-widest">${DATA.stats[3].label}</p>
    </div>
  </div>
</div>`,

    /* 3. Radial gauges */
    `<div class="shell section-pad--sm">
  <div class="split">
    <div class="reveal">
      <h2 class="display-lg">Three numbers we are willing to publish.</h2>
      <p class="lead">Most of what we do resists measurement; these three do not, and each one is reconciled against closed files every year.</p>
    </div>
    <div class="grid-3 reveal">
      <div class="col gap-2">
        <div class="radial-progress lw-radial" role="progressbar" aria-valuenow="${DATA.metrics[0].value}" style="--value:${DATA.metrics[0].value}">${DATA.metrics[0].value}%</div>
        <p class="text-xs muted">${DATA.metrics[0].label}</p>
      </div>
      <div class="col gap-2">
        <div class="radial-progress lw-radial" role="progressbar" aria-valuenow="${DATA.metrics[1].value}" style="--value:${DATA.metrics[1].value}">${DATA.metrics[1].value}%</div>
        <p class="text-xs muted">${DATA.metrics[1].label}</p>
      </div>
      <div class="col gap-2">
        <div class="radial-progress lw-radial" role="progressbar" aria-valuenow="${DATA.metrics[2].value}" style="--value:${DATA.metrics[2].value}">${DATA.metrics[2].value}%</div>
        <p class="text-xs muted">${DATA.metrics[2].label}</p>
      </div>
    </div>
  </div>
</div>`,

    /* 4. Progress ledger */
    `<div class="shell section-pad">
  <h2 class="display-lg reveal">The same record, read two ways.</h2>
  <div class="grid-2 mt-6 reveal">
    <div class="stats stats-vertical bg-base-200 border border-base-300 rounded-xl p-6">
      <div class="stat">
        <div class="stat-title">${DATA.stats[0].label}</div>
        <div class="stat-figure stat-serif">${DATA.stats[0].value}</div>
      </div>
      <div class="stat">
        <div class="stat-title">${DATA.stats[1].label}</div>
        <div class="stat-figure stat-serif">${DATA.stats[1].value}</div>
      </div>
      <div class="stat">
        <div class="stat-title">${DATA.stats[2].label}</div>
        <div class="stat-figure stat-serif">${DATA.stats[2].value}</div>
      </div>
      <div class="stat">
        <div class="stat-title">${DATA.stats[3].label}</div>
        <div class="stat-figure stat-serif">${DATA.stats[3].value}</div>
      </div>
    </div>
    <div class="col gap-4">
      <div>
        <div class="flex justify-between text-sm mb-2"><span>${DATA.metrics[0].label}</span><span class="muted">${DATA.metrics[0].value}%</span></div>
        <span class="lw-progress block w-full"><span class="bar" style="width:${DATA.metrics[0].value}%"></span></span>
      </div>
      <div>
        <div class="flex justify-between text-sm mb-2"><span>${DATA.metrics[1].label}</span><span class="muted">${DATA.metrics[1].value}%</span></div>
        <span class="lw-progress block w-full"><span class="bar" style="width:${DATA.metrics[1].value}%"></span></span>
      </div>
      <div>
        <div class="flex justify-between text-sm mb-2"><span>${DATA.metrics[2].label}</span><span class="muted">${DATA.metrics[2].value}%</span></div>
        <span class="lw-progress block w-full"><span class="bar" style="width:${DATA.metrics[2].value}%"></span></span>
      </div>
    </div>
  </div>
</div>`,

    /* 5. Quiet ledger */
    `<div class="band-neutral section-pad">
  <div class="flex items-center justify-between reveal">
    <span class="stat-serif text-5xl">${DATA.stats[0].value}</span>
    <span class="text-xs uppercase tracking-widest">${DATA.stats[0].label}</span>
  </div>
  <hr class="rule" />
  <div class="flex items-center justify-between reveal">
    <span class="stat-serif text-5xl">${DATA.stats[1].value}</span>
    <span class="text-xs uppercase tracking-widest">${DATA.stats[1].label}</span>
  </div>
  <hr class="rule" />
  <div class="flex items-center justify-between reveal">
    <span class="stat-serif text-5xl">${DATA.stats[2].value}</span>
    <span class="text-xs uppercase tracking-widest">${DATA.stats[2].label}</span>
  </div>
  <hr class="rule" />
  <div class="flex items-center justify-between reveal">
    <span class="stat-serif text-5xl">${DATA.stats[3].value}</span>
    <span class="text-xs uppercase tracking-widest">${DATA.stats[3].label}</span>
  </div>
</div>`,

    /* 6. Gradient statement */
    `<div class="band-gradient section-pad">
  <div class="text-center max-w-3 mx-auto reveal">
    <p class="eyebrow eyebrow--plain">By the numbers</p>
    <p class="display-xl">“${DATA.stats[0].value}” — recovered, not merely claimed.</p>
    <p class="lead">The figure below the line is what four hundred engagements cost the other side.</p>
    <div class="grid-4 mt-8">
      <div class="col gap-2">
        <p class="stat-serif text-4xl">${DATA.stats[0].value}</p>
        <p class="text-xs uppercase">${DATA.stats[0].label}</p>
      </div>
      <div class="col gap-2">
        <p class="stat-serif text-4xl">${DATA.stats[1].value}</p>
        <p class="text-xs uppercase">${DATA.stats[1].label}</p>
      </div>
      <div class="col gap-2">
        <p class="stat-serif text-4xl">${DATA.stats[2].value}</p>
        <p class="text-xs uppercase">${DATA.stats[2].label}</p>
      </div>
      <div class="col gap-2">
        <p class="stat-serif text-4xl">${DATA.stats[3].value}</p>
        <p class="text-xs uppercase">${DATA.stats[3].label}</p>
      </div>
    </div>
  </div>
</div>`,
  ],
};
