/* Practice areas — six practice-area layouts, all fed by DATA.services. */
window.SECTIONS = window.SECTIONS || {};
window.SECTIONS.services = {
  label: 'Practice areas',
  variants: [
    /* 1. Card grid — eyebrow + headline over a three-up grid of ready-made cards. */
    `
    <div class="shell section-pad">
      <div class="max-w-3 reveal">
        <span class="eyebrow">Practice Areas</span>
        <h2 class="display display-xl mt-2">Six practices. One standard of care.</h2>
        <p class="lead muted mt-4 max-w-2">
          Every matter is led by a partner who has run it before, and stays open
          until the outcome is settled — not signed.
        </p>
      </div>
      <div class="grid-3 mt-8 reveal">
        ${DATA.services.map((s, i) => UI.serviceCard(s, i)).join('')}
      </div>
    </div>
`,

    /* 2. Dossier rows — sticky-feel heading column beside a numbered index of rows. */
    `
    <div class="shell section-pad">
      <div class="split">
        <div class="col gap-3 max-w-2 reveal">
          <span class="eyebrow">Practice Areas</span>
          <h2 class="h2">The bench, listed in the order it is called.</h2>
          <p class="lead muted">
            Six practices, staffed as one team. Read the one that matches the
            decision in front of you, then take it to a partner.
          </p>
          <a class="btn btn-outline mt-2" href="#contact">
            Book a matter review ${UI.icon('arrow', 'ico-sm')}
          </a>
        </div>
        <div class="reveal">
          ${DATA.services.map(
            (s, i) =>
              '<a class="svc-row" href="#contact"><span class="num-ghost">0' +
              (i + 1) +
              '</span><div class="flex-1"><h3 class="h3">' +
              s.title +
              '</h3><p class="muted text-sm leading-relaxed mt-1">' +
              s.desc +
              '</p></div><span class="row-arrow faint">' +
              UI.icon('upright', 'ico') +
              '</span></a>'
          ).join('')}
        </div>
      </div>
    </div>
`,

    /* 3. Big duo — centred headline, then two columns of taller, quieter cards. */
    `
    <div class="shell section-pad--sm">
      <div class="text-center mx-auto max-w-3 reveal">
        <span class="eyebrow eyebrow--plain">Practice Areas</span>
        <h2 class="display display-lg mt-2">Depth, in six directions.</h2>
      </div>
      <div class="grid-2 mt-8 reveal">
        ${DATA.services.map(
          (s) =>
            '<article class="card card-hover bg-base-100 border border-base-300 shadow-sm">' +
            '<div class="card-body gap-2">' +
            '<span class="icon-chip">' +
            UI.icon(s.icon, 'ico-lg') +
            '</span>' +
            '<h3 class="h3 mt-2">' +
            s.title +
            '</h3><p class="muted text-sm leading-relaxed">' +
            s.desc +
            '</p><a class="link-arrow text-sm mt-auto" href="#contact">' +
            UI.icon('arrow', 'ico-sm') +
            ' Talk to the team</a></div></article>'
        ).join('')}
      </div>
    </div>
`,

    /* 4. Practice tabs — one tab per practice area; each panel pairs copy with a block. */
    `
    <div class="shell section-pad">
      <div class="max-w-3 reveal">
        <span class="eyebrow">Practice Areas</span>
        <h2 class="display display-xl mt-2">Open a practice area.</h2>
        <p class="lead muted mt-4 max-w-2">
          Six disciplines, staffed as one bench. Choose the one facing your
          problem and read how we work it.
        </p>
      </div>
      <div class="mt-8 reveal">
        <div class="tabs tabs-box text-sm" data-lw-tabs>
          ${DATA.services.map(
            (s, i) =>
              '<button type="button" class="tab' +
              (i === 0 ? ' tab-active' : '') +
              '">' +
              s.title +
              '</button>'
          ).join('')}
        </div>
        <div class="col mt-4">
          ${DATA.services.map((s, i) => {
            const more = [
              'Diligence begins in the first week, not after the letter of intent, so price and structure still have room to move.',
              'Evidence, experts, and theory of the case are assembled before we file. Opposing counsel usually reads the result and asks to talk.',
              'Title, zoning, and financing are read as one document, so a deal that looks cheap on paper never surprises you at completion.',
              'Freedom-to-operate opinions, filing strategy, and employee agreements are handled as a single programme rather than four memos.',
              'Holding entities, transfer pricing, and residency are modelled before the money moves, then re-checked every year.',
              'Wills, trustees, and succession are drafted alongside the operating agreements, so the two can never disagree.',
            ];
            const right =
              i % 2 === 0
                ? '<div class="photo-block photo-block--short relative overflow-hidden">' +
                  '<span class="photo-watermark">' +
                  UI.icon(s.icon, 'ico-xl') +
                  '</span></div>'
                : '<div class="photo-block--short bg-base-200 border border-base-300 rounded-2xl relative overflow-hidden flex items-center justify-center">' +
                  '<span class="photo-watermark">' +
                  UI.icon(s.icon, 'ico-xl') +
                  '</span>' +
                  '<span class="icon-chip">' +
                  UI.icon(s.icon, 'ico') +
                  '</span></div>';
            return (
              '<div class="tab-panel" data-lw-panel="' +
              i +
              '"' +
              (i === 0 ? '' : ' hidden') +
              '><div class="grid-2"><div class="col gap-2">' +
              '<h3 class="h3">' +
              s.title +
              '</h3><p class="muted text-sm leading-relaxed">' +
              s.desc +
              '</p><p class="text-sm leading-relaxed mt-2">' +
              more[i] +
              '</p></div>' +
              right +
              '</div></div>'
            );
          }).join('')}
        </div>
      </div>
    </div>
`,

    /* 5. Dark inventory — dark band, six quiet tiles on a three-up grid. */
    `
    <div class="band-neutral section-pad">
      <div class="max-w-3 reveal">
        <span class="eyebrow">Practice Areas</span>
        <h2 class="display display-lg mt-2">What we are trusted to carry.</h2>
        <p class="lead muted mt-4 max-w-2">
          Six practices, kept deliberately narrow. Breadth without a partner
          accountable for the file is not coverage — it is a phone directory.
        </p>
      </div>
      <div class="grid-3 mt-8 reveal">
        ${DATA.services.map(
          (s) =>
            '<div class="tile bg-white-5 border border-white-10">' +
            '<span class="icon-chip text-secondary" style="background: transparent">' +
            UI.icon(s.icon, 'ico-lg') +
            '</span>' +
            '<h3 class="h3 mt-4">' +
            s.title +
            '</h3><p class="text-sm muted mt-2 leading-relaxed">' +
            s.desc +
            '</p></div>'
        ).join('')}
      </div>
    </div>
`,

    /* 6. Index + cards — left index menu, right grid of compact practice cards. */
    `
    <div class="shell section-pad split">
      <div class="col gap-4 max-w-2 reveal">
        <div>
          <span class="eyebrow">Practice Areas</span>
          <h2 class="h2 mt-2">Six practices, read two ways.</h2>
          <p class="lead muted mt-3">
            Browse the index on the left, or the practice cards on the right —
            either route ends with a partner, not a form.
          </p>
        </div>
        <ul class="menu menu-vertical">
          ${DATA.services.map(
            (s) =>
              '<li><a class="text-sm" href="#contact">' +
              UI.icon(s.icon, 'ico-sm') +
              s.title +
              '</a></li>'
          ).join('')}
        </ul>
      </div>
      <div class="grid-2 reveal">
        ${DATA.services.map(
          (s) =>
            '<article class="card bg-base-100 border border-base-300 shadow-sm">' +
            '<div class="card-body gap-1">' +
            '<h3 class="h3">' +
            s.title +
            '</h3><p class="text-sm muted leading-relaxed">' +
            s.desc +
            '</p><a class="link-arrow text-sm mt-auto" href="#contact">' +
            UI.icon('arrow', 'ico-sm') +
            ' Discuss this practice</a></div></article>'
        ).join('')}
      </div>
    </div>
`,
  ],
};
