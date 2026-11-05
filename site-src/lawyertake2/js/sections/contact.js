/* Contact — six enquiry layouts, all fed by DATA.firm. */
window.SECTIONS = window.SECTIONS || {};
window.SECTIONS.contact = {
  label: 'Contact',
  variants: [
    /* 1. Form + info — one quiet column of detail cards beside the enquiry form. */
    `
    <div class="shell section-pad split reveal">
      <div class="col gap-1 w-full">
        <h2 class="h2">Tell us what is at stake.</h2>
        <p class="lead muted">
          Set the facts out as you have them. A partner reads every enquiry and
          answers the same working day — usually with the question you had not
          thought to ask.
        </p>
        <form class="lw-form col gap-3 mt-4" data-lw-demo>
          <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c1-name">Name</label><input class="input w-full" id="c1-name" name="name" type="text" placeholder="Your full name" autocomplete="name" required></div>
          <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c1-email">Email</label><input class="input w-full" id="c1-email" name="email" type="email" placeholder="you@company.com" autocomplete="email" required></div>
          <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c1-matter">Matter type</label><select class="select w-full" id="c1-matter" name="matter" required><option value="" selected>Choose a practice area</option><option>Corporate</option><option>Litigation</option><option>Real Estate</option><option>Intellectual Property</option><option>Tax</option><option>Estates</option></select></div>
          <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c1-detail">The matter</label><textarea class="textarea w-full" id="c1-detail" name="detail" rows="4" placeholder="Briefly describe your matter…"></textarea></div>
          <button class="btn btn-primary btn-block mt-2" type="submit">Send to a partner ${UI.icon('send', 'ico-sm')}</button>
        </form>
      </div>
      <div class="col gap-3">
        <div class="card bg-base-200 p-6"><span class="icon-chip">${UI.icon('pin', 'ico')}</span><h3 class="h3 mt-4">Where we sit</h3><p class="text-sm muted mt-1">${DATA.firm.address}, ${DATA.firm.city}</p></div>
        <div class="card bg-base-200 p-6"><span class="icon-chip">${UI.icon('mail', 'ico')}</span><h3 class="h3 mt-4">Write to us</h3><p class="text-sm muted mt-1">${DATA.firm.email} — marked confidential, opened by a partner.</p></div>
        <div class="card bg-base-200 p-6"><span class="icon-chip">${UI.icon('phone', 'ico')}</span><h3 class="h3 mt-4">Call the desk</h3><p class="text-sm muted mt-1">${DATA.firm.phone} · ${DATA.firm.hours}</p></div>
      </div>
    </div>
`,

    /* 2. Dark band — full-bleed dark band, pitch on the left, raised form card on the right. */
    `
    <div class="band-neutral section-pad reveal">
      <div class="shell split">
        <div class="col gap-3">
          <span class="eyebrow">Contact</span>
          <h2 class="h2">Two ways to reach a partner before the week is out.</h2>
          <p class="lead">
            Mail is read each morning and the line is answered by whoever owns the
            matter. Nothing here is routed through a call centre, and nothing waits
            for a marketing team to triage it.
          </p>
          <div class="row gap-2">
            <a class="btn btn-outline btn-sm" href="${DATA.firm.phoneHref}">${UI.icon('phone', 'ico-sm')} ${DATA.firm.phone}</a>
            <a class="btn btn-primary btn-sm" href="mailto:${DATA.firm.email}">${UI.icon('mail', 'ico-sm')} ${DATA.firm.email}</a>
          </div>
        </div>
        <div class="card bg-base-100 p-8 rounded-2xl">
          <form class="lw-form col gap-3" data-lw-demo>
            <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c2-name">Name</label><input class="input w-full" id="c2-name" name="name" type="text" placeholder="Your full name" autocomplete="name" required></div>
            <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c2-email">Email</label><input class="input w-full" id="c2-email" name="email" type="email" placeholder="you@company.com" autocomplete="email" required></div>
            <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c2-matter">Matter type</label><select class="select w-full" id="c2-matter" name="matter" required><option value="" selected>Choose a practice area</option><option>Corporate</option><option>Litigation</option><option>Real Estate</option><option>Intellectual Property</option><option>Tax</option><option>Estates</option></select></div>
            <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c2-detail">The matter</label><textarea class="textarea w-full" id="c2-detail" name="detail" rows="4" placeholder="Briefly describe your matter…"></textarea></div>
            <p class="text-xs muted mt-1">Sent straight to a partner — no intake queue, no auto-reply.</p>
            <button class="btn btn-primary btn-block mt-2" type="submit">Send to a partner ${UI.icon('send', 'ico-sm')}</button>
          </form>
        </div>
      </div>
    </div>
`,

    /* 3. Trio grid — three equal cells: form card, address card, column of icon rows. */
    `
    <div class="shell section-pad section-pad--sm reveal">
      <div class="grid-3">
        <div class="col gap-3">
          <span class="eyebrow eyebrow--plain">Contact</span>
          <div class="card bg-base-100 border border-base-300 shadow-sm p-6">
            <h3 class="h3">Open a file</h3>
            <form class="lw-form col gap-3 mt-4" data-lw-demo>
              <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c3-name">Name</label><input class="input w-full" id="c3-name" name="name" type="text" placeholder="Your full name" autocomplete="name" required></div>
              <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c3-email">Email</label><input class="input w-full" id="c3-email" name="email" type="email" placeholder="you@company.com" autocomplete="email" required></div>
              <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c3-matter">Matter type</label><select class="select w-full" id="c3-matter" name="matter" required><option value="" selected>Choose a practice area</option><option>Corporate</option><option>Litigation</option><option>Real Estate</option><option>Intellectual Property</option><option>Tax</option><option>Estates</option></select></div>
              <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c3-detail">The matter</label><textarea class="textarea w-full" id="c3-detail" name="detail" rows="4" placeholder="Briefly describe your matter…"></textarea></div>
              <button class="btn btn-primary btn-block mt-2" type="submit">Send to a partner ${UI.icon('send', 'ico-sm')}</button>
            </form>
          </div>
        </div>
        <div class="card bg-base-200 p-6">
          <h3 class="h3">New York, and where else</h3>
          <p class="text-sm muted mt-1">${DATA.firm.address}<br>${DATA.firm.city}</p>
          <p class="text-sm muted mt-4">Rooms in ${DATA.firm.offices}.</p>
        </div>
        <div class="col gap-3">
          <div class="row gap-2"><span class="icon-chip">${UI.icon('clock', 'ico')}</span><div class="col gap-1"><span class="text-xs uppercase tracking-wide">Hours</span><span class="text-sm muted">${DATA.firm.hours}</span></div></div>
          <div class="row gap-2"><span class="icon-chip">${UI.icon('pin', 'ico')}</span><div class="col gap-1"><span class="text-xs uppercase tracking-wide">Offices</span><span class="text-sm muted">${DATA.firm.offices}</span></div></div>
          <div class="row gap-2"><span class="icon-chip">${UI.icon('phone', 'ico')}</span><div class="col gap-1"><span class="text-xs uppercase tracking-wide">Telephone</span><span class="text-sm muted">${DATA.firm.phone}</span></div></div>
        </div>
      </div>
    </div>
`,

    /* 4. Tabs contact — write / call / visit, switched by the tab engine. */
    `
    <div class="shell section-pad reveal">
      <div class="col gap-1 max-w-3">
        <span class="eyebrow">Contact</span>
        <h2 class="h2 mt-2">Choose how you would rather be answered.</h2>
      </div>
      <div class="tabs tabs-box mt-6" data-lw-tabs>
        <a class="tab tab-active">Write to us</a>
        <a class="tab">Call</a>
        <a class="tab">Visit</a>
      </div>
      <div class="tab-panel" data-lw-panel="0">
        <form class="lw-form col gap-3 max-w-3" data-lw-demo>
          <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c4-name">Name</label><input class="input w-full" id="c4-name" name="name" type="text" placeholder="Your full name" autocomplete="name" required></div>
          <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c4-email">Email</label><input class="input w-full" id="c4-email" name="email" type="email" placeholder="you@company.com" autocomplete="email" required></div>
          <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c4-matter">Matter type</label><select class="select w-full" id="c4-matter" name="matter" required><option value="" selected>Choose a practice area</option><option>Corporate</option><option>Litigation</option><option>Real Estate</option><option>Intellectual Property</option><option>Tax</option><option>Estates</option></select></div>
          <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c4-detail">The matter</label><textarea class="textarea w-full" id="c4-detail" name="detail" rows="4" placeholder="Briefly describe your matter…"></textarea></div>
          <button class="btn btn-primary btn-block mt-2" type="submit">Send to a partner ${UI.icon('send', 'ico-sm')}</button>
        </form>
      </div>
      <div class="tab-panel" data-lw-panel="1" hidden>
        <a class="display display-lg" href="${DATA.firm.phoneHref}">${DATA.firm.phone}</a>
        <p class="text-sm muted mt-2">${DATA.firm.hours} — one number across all three offices.</p>
      </div>
      <div class="tab-panel" data-lw-panel="2" hidden>
        <h3 class="h3">${DATA.firm.address}</h3>
        <p class="text-sm muted mt-1">${DATA.firm.city}</p>
        <p class="text-sm muted mt-4">Rooms in ${DATA.firm.offices}.</p>
        <p class="text-xs muted mt-2">By appointment — we meet you at whichever office sits nearest the work.</p>
      </div>
    </div>
`,

    /* 5. Centered form — centred headline and lead, one wide card, three chips under it. */
    `
    <div class="shell section-pad reveal">
      <div class="max-w-2 mx-auto text-center">
        <span class="eyebrow eyebrow--plain">Contact</span>
        <h2 class="h2 mt-2">Say the problem out loud.</h2>
        <p class="lead muted mt-4">
          A paragraph is enough to start. Whoever reads it decides who staffs it —
          and you will know within a day either way.
        </p>
        <div class="card bg-base-200 border border-base-300 rounded-2xl p-8 text-left mt-6">
          <form class="lw-form col gap-3" data-lw-demo>
            <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c5-name">Name</label><input class="input w-full" id="c5-name" name="name" type="text" placeholder="Your full name" autocomplete="name" required></div>
            <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c5-email">Email</label><input class="input w-full" id="c5-email" name="email" type="email" placeholder="you@company.com" autocomplete="email" required></div>
            <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c5-matter">Matter type</label><select class="select w-full" id="c5-matter" name="matter" required><option value="" selected>Choose a practice area</option><option>Corporate</option><option>Litigation</option><option>Real Estate</option><option>Intellectual Property</option><option>Tax</option><option>Estates</option></select></div>
            <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c5-detail">The matter</label><textarea class="textarea w-full" id="c5-detail" name="detail" rows="4" placeholder="Briefly describe your matter…"></textarea></div>
            <button class="btn btn-primary btn-block mt-2" type="submit">Send to a partner ${UI.icon('send', 'ico-sm')}</button>
          </form>
        </div>
        <div class="row justify-center gap-3 mt-6">
          <span class="text-xs muted">${DATA.firm.phone}</span>
          <span class="text-xs muted">${DATA.firm.email}</span>
          <span class="text-xs muted">${DATA.firm.hours}</span>
        </div>
      </div>
    </div>
`,

    /* 6. Split reversed — graphic block and chips on the left, headline plus form on the right. */
    `
    <div class="shell section-pad split split--rev reveal">
      <div class="col gap-1 w-full">
        <h2 class="h2">The first conversation costs nothing and decides everything.</h2>
        <p class="lead muted">
          Send the outline of the matter and we will tell you who would run it,
          what it is likely to cost, and whether you need us at all.
        </p>
        <form class="lw-form col gap-3 mt-4" data-lw-demo>
          <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c6-name">Name</label><input class="input w-full" id="c6-name" name="name" type="text" placeholder="Your full name" autocomplete="name" required></div>
          <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c6-email">Email</label><input class="input w-full" id="c6-email" name="email" type="email" placeholder="you@company.com" autocomplete="email" required></div>
          <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c6-matter">Matter type</label><select class="select w-full" id="c6-matter" name="matter" required><option value="" selected>Choose a practice area</option><option>Corporate</option><option>Litigation</option><option>Real Estate</option><option>Intellectual Property</option><option>Tax</option><option>Estates</option></select></div>
          <div class="col gap-1 w-full"><label class="text-xs uppercase tracking-wide" for="c6-detail">The matter</label><textarea class="textarea w-full" id="c6-detail" name="detail" rows="4" placeholder="Briefly describe your matter…"></textarea></div>
          <button class="btn btn-primary btn-block mt-2" type="submit">Send to a partner ${UI.icon('send', 'ico-sm')}</button>
        </form>
      </div>
      <div class="col gap-1 w-full">
        <div class="photo-block photo-block--short w-full"><span class="photo-watermark">${UI.icon('pin', 'ico-xl')}</span></div>
        <div class="row gap-2 mt-4">
          <span class="text-xs muted">${DATA.firm.offices}</span>
          <span class="text-xs muted">${DATA.firm.hours}</span>
        </div>
      </div>
    </div>
`,
  ],
};
