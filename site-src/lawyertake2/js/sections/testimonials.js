/* Client testimonials — 6 layout variants. */
window.SECTIONS = window.SECTIONS || {};
window.SECTIONS.testimonials = {
  label: 'Client words',
  variants: [
    /* 1. Slider carousel */
    `<div class="shell section-pad reveal">
  <p class="eyebrow eyebrow--plain">Client Words</p>
  <h2 class="h2 mt-1">What they say once the matter is closed.</h2>
  <div class="lw-slider relative h-full mt-6" style="height:20rem">
    <div class="carousel-item is-active">
      <div class="card bg-base-200 border border-base-300 p-8 h-full">
        <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[0].quote}</p>
        <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[0], 0, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[0].name}</p><p class="muted text-sm">${DATA.testimonials[0].role}</p></div></div>
      </div>
    </div>
    <div class="carousel-item">
      <div class="card bg-base-200 border border-base-300 p-8 h-full">
        <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[1].quote}</p>
        <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[1], 1, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[1].name}</p><p class="muted text-sm">${DATA.testimonials[1].role}</p></div></div>
      </div>
    </div>
    <div class="carousel-item">
      <div class="card bg-base-200 border border-base-300 p-8 h-full">
        <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[2].quote}</p>
        <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[2], 2, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[2].name}</p><p class="muted text-sm">${DATA.testimonials[2].role}</p></div></div>
      </div>
    </div>
    <div class="carousel-item">
      <div class="card bg-base-200 border border-base-300 p-8 h-full">
        <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[3].quote}</p>
        <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[3], 3, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[3].name}</p><p class="muted text-sm">${DATA.testimonials[3].role}</p></div></div>
      </div>
    </div>
  </div>
  <div class="row justify-between mt-6">
    <div class="row gap-1">
      <button class="slider-btn" type="button" data-lw-prev aria-label="Previous quote">${UI.icon('chevronL', 'ico-sm')}</button>
      <button class="slider-btn" type="button" data-lw-next aria-label="Next quote">${UI.icon('chevronR', 'ico-sm')}</button>
    </div>
    <div class="row gap-1">
      <button class="slider-dot is-active" type="button" data-lw-dot="0" aria-label="Quote one"></button>
      <button class="slider-dot" type="button" data-lw-dot="1" aria-label="Quote two"></button>
      <button class="slider-dot" type="button" data-lw-dot="2" aria-label="Quote three"></button>
      <button class="slider-dot" type="button" data-lw-dot="3" aria-label="Quote four"></button>
    </div>
  </div>
</div>`,

    /* 2. Quote wall */
    `<div class="shell section-pad--sm reveal">
  <h2 class="h2">Four clients, four verdicts on the same firm.</h2>
  <div class="wall mt-6 reveal">
    <div class="card bg-base-100 border border-base-300 shadow-sm p-6">
      <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[0].quote}</p>
      <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[0], 0, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[0].name}</p><p class="muted text-sm">${DATA.testimonials[0].role}</p></div></div>
    </div>
    <div class="card bg-base-100 border border-base-300 shadow-sm p-6">
      <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[1].quote}</p>
      <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[1], 1, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[1].name}</p><p class="muted text-sm">${DATA.testimonials[1].role}</p></div></div>
    </div>
    <div class="card bg-base-100 border border-base-300 shadow-sm p-6">
      <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[2].quote}</p>
      <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[2], 2, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[2].name}</p><p class="muted text-sm">${DATA.testimonials[2].role}</p></div></div>
    </div>
    <div class="card bg-base-100 border border-base-300 shadow-sm p-6">
      <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[3].quote}</p>
      <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[3], 3, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[3].name}</p><p class="muted text-sm">${DATA.testimonials[3].role}</p></div></div>
    </div>
  </div>
</div>`,

    /* 3. Duo grid */
    `<div class="shell section-pad reveal">
  <h2 class="h2">The work speaks. So do the people it was done for.</h2>
  <div class="grid-2 gap-3 mt-6 reveal">
    <div class="card bg-base-200 rounded-2xl p-8">
      <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[0].quote}</p>
      <div class="divider"></div>
      <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[0], 0, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[0].name}</p><p class="muted text-sm">${DATA.testimonials[0].role}</p></div></div>
    </div>
    <div class="card bg-base-200 rounded-2xl p-8">
      <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[1].quote}</p>
      <div class="divider"></div>
      <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[1], 1, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[1].name}</p><p class="muted text-sm">${DATA.testimonials[1].role}</p></div></div>
    </div>
    <div class="card bg-base-200 rounded-2xl p-8">
      <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[2].quote}</p>
      <div class="divider"></div>
      <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[2], 2, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[2].name}</p><p class="muted text-sm">${DATA.testimonials[2].role}</p></div></div>
    </div>
    <div class="card bg-base-200 rounded-2xl p-8">
      <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[3].quote}</p>
      <div class="divider"></div>
      <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[3], 3, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[3].name}</p><p class="muted text-sm">${DATA.testimonials[3].role}</p></div></div>
    </div>
  </div>
</div>`,

    /* 4. Dark carousel */
    `<div class="band-neutral section-pad reveal">
  <div class="shell">
    <h2 class="h2">Quiet counsel, loud results.</h2>
    <div class="lw-slider relative mt-6" style="height:22rem">
      <div class="carousel-item is-active absolute inset-0">
        <div class="card bg-white-5 border border-white-10 p-8 h-full">
          <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[0].quote}</p>
          <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[0], 0, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[0].name}</p><p class="faint text-sm">${DATA.testimonials[0].role}</p></div></div>
        </div>
      </div>
      <div class="carousel-item absolute inset-0">
        <div class="card bg-white-5 border border-white-10 p-8 h-full">
          <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[1].quote}</p>
          <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[1], 1, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[1].name}</p><p class="faint text-sm">${DATA.testimonials[1].role}</p></div></div>
        </div>
      </div>
      <div class="carousel-item absolute inset-0">
        <div class="card bg-white-5 border border-white-10 p-8 h-full">
          <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[2].quote}</p>
          <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[2], 2, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[2].name}</p><p class="faint text-sm">${DATA.testimonials[2].role}</p></div></div>
        </div>
      </div>
      <div class="carousel-item absolute inset-0">
        <div class="card bg-white-5 border border-white-10 p-8 h-full">
          <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[3].quote}</p>
          <div class="row mt-4 gap-3">${UI.avatar(DATA.testimonials[3], 3, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[3].name}</p><p class="faint text-sm">${DATA.testimonials[3].role}</p></div></div>
        </div>
      </div>
    </div>
    <div class="row justify-center gap-1 mt-4">
      <button class="slider-btn" type="button" data-lw-prev aria-label="Previous quote">${UI.icon('chevronL', 'ico-sm')}</button>
      <button class="slider-btn" type="button" data-lw-next aria-label="Next quote">${UI.icon('chevronR', 'ico-sm')}</button>
      <button class="slider-dot is-active" type="button" data-lw-dot="0" aria-label="Quote one"></button>
      <button class="slider-dot" type="button" data-lw-dot="1" aria-label="Quote two"></button>
      <button class="slider-dot" type="button" data-lw-dot="2" aria-label="Quote three"></button>
      <button class="slider-dot" type="button" data-lw-dot="3" aria-label="Quote four"></button>
    </div>
  </div>
</div>`,

    /* 5. Tabs by client */
    `<div class="shell section-pad reveal">
  <h2 class="h2">One voice per matter.</h2>
  <div class="tabs tabs-box mt-4 reveal" data-lw-tabs>
    <a class="tab tab-active">${DATA.testimonials[0].name}</a>
    <a class="tab">${DATA.testimonials[1].name}</a>
    <a class="tab">${DATA.testimonials[2].name}</a>
    <a class="tab">${DATA.testimonials[3].name}</a>
  </div>
  <div class="tab-panel mt-4" data-lw-panel="0">
    <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[0].quote}</p>
    <div class="row mt-3 gap-3">${UI.avatar(DATA.testimonials[0], 0, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[0].name}</p><p class="muted text-sm">${DATA.testimonials[0].role}</p></div><div class="row gap-1 mt-3 op-60 ml-auto">${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}</div></div>
  </div>
  <div class="tab-panel mt-4" data-lw-panel="1" hidden>
    <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[1].quote}</p>
    <div class="row mt-3 gap-3">${UI.avatar(DATA.testimonials[1], 1, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[1].name}</p><p class="muted text-sm">${DATA.testimonials[1].role}</p></div><div class="row gap-1 mt-3 op-60 ml-auto">${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}</div></div>
  </div>
  <div class="tab-panel mt-4" data-lw-panel="2" hidden>
    <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[2].quote}</p>
    <div class="row mt-3 gap-3">${UI.avatar(DATA.testimonials[2], 2, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[2].name}</p><p class="muted text-sm">${DATA.testimonials[2].role}</p></div><div class="row gap-1 mt-3 op-60 ml-auto">${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}</div></div>
  </div>
  <div class="tab-panel mt-4" data-lw-panel="3" hidden>
    <p class="quote-glyph">&ldquo;</p><p class="lead">${DATA.testimonials[3].quote}</p>
    <div class="row mt-3 gap-3">${UI.avatar(DATA.testimonials[3], 3, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[3].name}</p><p class="muted text-sm">${DATA.testimonials[3].role}</p></div><div class="row gap-1 mt-3 op-60 ml-auto">${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}${UI.icon('star', 'ico-sm')}</div></div>
  </div>
</div>`,

    /* 6. Split feature */
    `<div class="shell section-pad split split--rev reveal">
  <div class="col gap-2">
    <p class="eyebrow eyebrow--plain">Client Words</p>
    <h2 class="h2">Long relationships, short speeches.</h2>
    <p class="lead">Most of the people below have been with the firm for a decade or more — long relationships, kept one careful decision at a time.</p>
    <a class="btn btn-outline btn-sm mt-4" href="#contact">Start a conversation${UI.icon('arrow', 'ico-sm')}</a>
  </div>
  <div class="col gap-3 reveal">
    <div class="card bg-base-100 border border-base-300 p-6">
      <p class="lead">${DATA.testimonials[0].quote}</p>
      <div class="row mt-3 gap-3">${UI.avatar(DATA.testimonials[0], 0, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[0].name}</p><p class="muted text-sm">${DATA.testimonials[0].role}</p></div></div>
    </div>
    <div class="card bg-base-100 border border-base-300 p-6">
      <p class="lead">${DATA.testimonials[1].quote}</p>
      <div class="row mt-3 gap-3">${UI.avatar(DATA.testimonials[1], 1, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[1].name}</p><p class="muted text-sm">${DATA.testimonials[1].role}</p></div></div>
    </div>
    <div class="card bg-base-100 border border-base-300 p-6">
      <p class="lead">${DATA.testimonials[2].quote}</p>
      <div class="row mt-3 gap-3">${UI.avatar(DATA.testimonials[2], 2, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[2].name}</p><p class="muted text-sm">${DATA.testimonials[2].role}</p></div></div>
    </div>
    <div class="card bg-base-100 border border-base-300 p-6">
      <p class="lead">${DATA.testimonials[3].quote}</p>
      <div class="row mt-3 gap-3">${UI.avatar(DATA.testimonials[3], 3, 'av-sm')}<div><p class="font-semibold">${DATA.testimonials[3].name}</p><p class="muted text-sm">${DATA.testimonials[3].role}</p></div></div>
    </div>
  </div>
</div>`,
  ],
};
