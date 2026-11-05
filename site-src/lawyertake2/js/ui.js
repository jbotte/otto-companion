/* ============================================================================
   LW_UI — design studio: theme picker, per-section variant switching,
   rendering engine, scroll reveals, and small component bindings.
   Loaded last; expects window.DATA and window.SECTIONS to exist.
   ========================================================================== */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const SECTIONS = window.SECTIONS || {};
  const SECTION_KEYS = Object.keys(SECTIONS);

  /* ---------------------------------------------------------------- state */
  const LS_KEY = 'hw-studio-v1';

  function loadState() {
    try {
      const raw = JSON.parse(localStorage.getItem(LS_KEY));
      if (raw && typeof raw === 'object') {
        return { theme: raw.theme || 'lex', sections: raw.sections || {} };
      }
    } catch (_) { /* private mode / corrupt value — fall through */ }
    return { theme: 'lex', sections: {} };
  }

  let state = loadState();
  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (_) {}
  }

  /* ---------------------------------------------------------------- themes */
  const THEMES = [
    { name: 'lex', label: 'Lex', hint: 'Ivory · navy · gold' },
    { name: 'noir', label: 'Noir', hint: 'Black · gold' },
    { name: 'light', label: 'Light', hint: 'Crisp white' },
    { name: 'dark', label: 'Dark', hint: 'Slate' },
    { name: 'corporate', label: 'Corporate', hint: 'Blue · teal' },
    { name: 'business', label: 'Business', hint: 'Navy · blue' },
    { name: 'emerald', label: 'Emerald', hint: 'Green' },
    { name: 'dracula', label: 'Dracula', hint: 'Violet · pink' },
    { name: 'cmyk', label: 'CMYK', hint: 'Print' },
    { name: 'autumn', label: 'Autumn', hint: 'Rust · amber' },
    { name: 'luxury', label: 'Luxury', hint: 'Black · gold' },
    { name: 'synthwave', label: 'Synthwave', hint: 'Neon' },
  ];

  let probe = null;
  function probeTheme(name) {
    if (!probe) {
      probe = document.createElement('div');
      probe.style.cssText =
        'position:absolute;width:0;height:0;overflow:hidden;visibility:hidden';
      document.body.appendChild(probe);
    }
    probe.setAttribute('data-theme', name);
    const cs = getComputedStyle(probe);
    const v = (n) => cs.getPropertyValue(n).trim();
    return {
      b1: v('--color-base-100') || '#ffffff',
      p: v('--color-primary') || '#888888',
    };
  }

  function applyTheme(name) {
    if (!THEMES.some((t) => t.name === name)) name = 'lex';
    document.documentElement.setAttribute('data-theme', name);
    state.theme = name;
    save();
    $$('#studio-themes .swatch').forEach((b) =>
      b.classList.toggle('is-active', b.dataset.theme === name)
    );
  }

  /* -------------------------------------------------------------- rendering */
  function clampIdx(key) {
    const max = SECTIONS[key].variants.length;
    return Math.min(Math.max(state.sections[key] || 0, 0), max - 1);
  }

  function renderSection(key, animate = true) {
    const def = SECTIONS[key];
    const host = document.querySelector('[data-section="' + key + '"]');
    if (!def || !host) return;
    host.innerHTML = def.variants[clampIdx(key)];
    if (animate) {
      host.classList.remove('variant-swap');
      void host.offsetWidth; // restart the animation
      host.classList.add('variant-swap');
    }
    bindSection(key, host);
    refreshReveals(host);
    updateSectionButtons(key);
  }

  function updateSectionButtons(key) {
    const idx = clampIdx(key);
    $$('#studio-sections .var-btn[data-sec="' + key + '"]').forEach((b) =>
      b.classList.toggle('is-active', +b.dataset.idx === idx)
    );
  }

  /* ------------------------------------------------------ component bindings */
  function bindSection(key, host) {
    bindTabs(host);
    bindSlider(host);
    bindDemoForms(host);
  }

  function bindTabs(host) {
    $$('.tabs[data-lw-tabs]', host).forEach((tabs) => {
      const tabEls = $$('.tab', tabs);
      const panels = $$('[data-lw-panel]', host);
      tabEls.forEach((tab, i) => {
        tab.addEventListener('click', (e) => {
          e.preventDefault();
          tabEls.forEach((t) => t.classList.remove('tab-active'));
          tab.classList.add('tab-active');
          panels.forEach((p) => {
            p.hidden = +p.dataset.lwPanel !== i;
          });
        });
      });
    });
  }

  function bindSlider(host) {
    const slider = $('.lw-slider', host);
    if (!slider) return;
    const items = $$('.carousel-item', slider);
    const dots = $$('[data-lw-dot]', host);
    let i = 0;
    let timer = null;

    const show = (n) => {
      i = (n + items.length) % items.length;
      items.forEach((el, k) => el.classList.toggle('is-active', k === i));
      dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
    };
    const restart = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => show(i + 1), 6000);
    };

    $$('[data-lw-prev]', host).forEach((b) =>
      b.addEventListener('click', () => { show(i - 1); restart(); })
    );
    $$('[data-lw-next]', host).forEach((b) =>
      b.addEventListener('click', () => { show(i + 1); restart(); })
    );
    dots.forEach((d) =>
      d.addEventListener('click', () => { show(+d.dataset.lwDot); restart(); })
    );
    slider.addEventListener('mouseenter', () => { if (timer) clearInterval(timer); });
    slider.addEventListener('mouseleave', restart);

    show(0);
    restart();
  }

  function bindDemoForms(host) {
    $$('form[data-lw-demo]', host).forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        toast('Demo form — nothing was sent. In production this would reach the firm.');
      });
    });
  }

  function toast(msg) {
    let t = $('#lw-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'lw-toast';
      t.className = 'toast toast-bottom toast-end z-60';
      document.body.appendChild(t);
    }
    t.innerHTML =
      '<div class="alert alert-success shadow-lg"><span>' + msg + '</span></div>';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => { t.innerHTML = ''; }, 4200);
  }

  /* ---------------------------------------------------------- scroll reveals */
  let observer = null;
  function refreshReveals(root = document) {
    const els = $$('.reveal:not(.on)', root);
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('on'));
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('on');
              observer.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
    }
    els.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------- studio UI */
  function buildStudio() {
    const themesHost = $('#studio-themes');
    themesHost.innerHTML = THEMES.map((t) => {
      const c = probeTheme(t.name);
      const bg =
        'linear-gradient(135deg, ' + c.b1 + ' 0%, ' + c.b1 + ' 50%, ' + c.p + ' 50%, ' + c.p + ' 100%)';
      return (
        '<button type="button" class="swatch" data-theme="' + t.name +
        '" title="' + t.label + ' — ' + t.hint + '" aria-label="Theme: ' + t.label +
        '" style="background:' + bg + '"></button>'
      );
    }).join('');
    themesHost.addEventListener('click', (e) => {
      const b = e.target.closest('.swatch');
      if (b) applyTheme(b.dataset.theme);
    });

    const secsHost = $('#studio-sections');
    secsHost.innerHTML = SECTION_KEYS.map((key) => {
      const def = SECTIONS[key];
      const btns = def.variants
        .map(
          (_, i) =>
            '<button type="button" class="var-btn" data-sec="' + key +
            '" data-idx="' + i + '" aria-label="' + def.label + ' variant ' + (i + 1) +
            '">' + (i + 1) + '</button>'
        )
        .join('');
      return (
        '<div class="panel-row"><span class="panel-row-label">' + def.label +
        '</span><div class="row gap-1">' + btns + '</div></div>'
      );
    }).join('');
    secsHost.addEventListener('click', (e) => {
      const b = e.target.closest('.var-btn');
      if (!b) return;
      state.sections[b.dataset.sec] = +b.dataset.idx;
      save();
      renderSection(b.dataset.sec);
    });

    $('#studio-shuffle').addEventListener('click', () => {
      SECTION_KEYS.forEach((key) => {
        state.sections[key] = Math.floor(Math.random() * SECTIONS[key].variants.length);
      });
      save();
      SECTION_KEYS.forEach((k) => renderSection(k));
    });

    $('#studio-reset').addEventListener('click', () => {
      state = { theme: 'lex', sections: {} };
      save();
      applyTheme('lex');
      SECTION_KEYS.forEach((k) => renderSection(k));
    });

    const fab = $('#studio-fab');
    const panel = $('#studio-panel');
    const setPanel = (open) => {
      panel.hidden = !open;
      fab.classList.toggle('is-open', open);
      fab.setAttribute('aria-expanded', String(open));
    };
    fab.addEventListener('click', () => setPanel(panel.hidden));
    $('#studio-close').addEventListener('click', () => setPanel(false));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setPanel(false);
    });
  }

  /* ------------------------------------------------------------- mobile nav */
  function bindNav() {
    const toggle = $('#nav-toggle');
    const mobile = $('#nav-mobile');
    if (!toggle || !mobile) return;
    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('hidden') === false;
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    $$('#nav-mobile a').forEach((a) =>
      a.addEventListener('click', () => {
        mobile.classList.add('hidden');
        toggle.classList.remove('is-open');
      })
    );
  }

  /* ------------------------------------------------------------------ init */
  buildStudio();
  applyTheme(state.theme);
  SECTION_KEYS.forEach((k) => renderSection(k, false));
  refreshReveals();
  bindNav();
})();
