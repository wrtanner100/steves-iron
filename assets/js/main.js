(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header border on scroll ---------- */
  const header = $('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const toggle = $('.nav-toggle');
  const menu = $('#nav-menu');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Active nav link (homepage anchors) ---------- */
  const navLinks = $$('.nav-menu a[href^="#"]');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navLinks.map((a) => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean).forEach((s) => spy.observe(s));

  /* ---------- Photo slots: try data-img, then data-fallback; else keep the iron pattern ---------- */
  const loadInto = (el, sources) => {
    if (!sources.length) return;
    const img = new Image();
    img.onload = () => {
      el.style.setProperty('--photo', `url("${img.src}")`);
      el.classList.add('has-img');
      el.dataset.loaded = sources[0];
    };
    img.onerror = () => loadInto(el, sources.slice(1));
    img.src = sources[0];
  };
  $$('[data-img]').forEach((el) => loadInto(el, [el.dataset.img, el.dataset.fallback].filter(Boolean)));

  /* ---------- Hero: intro animation, parallax ---------- */
  const hero = $('.hero');
  if (hero && $('.hero-frame', hero)) {
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('ready')));
    const bg = $('.hero-bg', hero);
    if (!reduceMotion) {
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = Math.min(window.scrollY, window.innerHeight);
          bg.style.setProperty('--parallax', `${y * 0.18}px`);
          ticking = false;
        });
      }, { passive: true });
    }
  }

  /* ---------- CTA gate graphic draws itself in when scrolled into view ---------- */
  const ctas = $$('.cta-band');
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); co.unobserve(e.target); }
    }), { threshold: 0.35 });
    ctas.forEach((c) => co.observe(c));
  } else ctas.forEach((c) => c.classList.add('in'));

  /* ---------- Cursor glow on cards ---------- */
  $$('.service, .review').forEach((card) => card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }));

  /* ---------- Count-up stats ---------- */
  const counters = $$('[data-count]');
  if (!reduceMotion && counters.length) {
    const cio = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target, end = Number(el.dataset.count), suffix = el.dataset.suffix || '', t0 = performance.now();
      const step = (now) => {
        const t = Math.min((now - t0) / 1400, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3))) + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      cio.unobserve(el);
    }), { threshold: 0.6 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------- Gallery: filters + lightbox ---------- */
  const items = $$('.g-item');
  if (items.length) {
    const filters = $$('.filter');
    filters.forEach((btn) => btn.addEventListener('click', () => {
      filters.forEach((f) => { f.classList.toggle('active', f === btn); f.setAttribute('aria-pressed', String(f === btn)); });
      items.forEach((it) => { it.hidden = btn.dataset.filter !== 'All' && it.dataset.type !== btn.dataset.filter; });
    }));

    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML = '<button type="button" class="lb-close" aria-label="Close">&times;</button>'
      + '<button type="button" class="lb-nav lb-prev" aria-label="Previous photo">&#8592;</button>'
      + '<figure><img alt="" /><figcaption></figcaption></figure>'
      + '<button type="button" class="lb-nav lb-next" aria-label="Next photo">&#8594;</button>';
    document.body.appendChild(lb);
    const lbImg = $('img', lb);
    const lbCap = $('figcaption', lb);
    let current = 0;
    let opener = null;
    const visible = () => items.filter((it) => !it.hidden);
    const show = (i) => {
      const list = visible();
      current = (i + list.length) % list.length;
      const img = $('img', list[current]);
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = img.alt;
    };
    const close = () => { lb.classList.remove('open'); if (opener) opener.focus(); };
    items.forEach((it) => $('.g-open', it).addEventListener('click', (e) => {
      opener = e.currentTarget;
      show(visible().indexOf(it));
      lb.classList.add('open');
      $('.lb-close', lb).focus();
    }));
    $('.lb-close', lb).addEventListener('click', close);
    $('.lb-prev', lb).addEventListener('click', () => show(current - 1));
    $('.lb-next', lb).addEventListener('click', () => show(current + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ---------- Quote form: validates, then opens an email to Steve ---------- */
  const form = $('#quote-form');
  if (form) {
    const status = $('.form-status', form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      $$('[required]', form).forEach((field) => {
        const bad = !field.value.trim();
        field.classList.toggle('invalid', bad);
        if (bad) valid = false;
      });
      const email = form.elements.email;
      if (email.value && !email.checkValidity()) { email.classList.add('invalid'); valid = false; }
      if (!valid) {
        status.className = 'form-status err';
        status.textContent = 'Please add your name, phone number and a few details about the job.';
        return;
      }
      const d = Object.fromEntries(new FormData(form));
      const subject = `Free quote request: ${d.service}${d.city ? ` in ${d.city}` : ''}`;
      const body = [
        `Name: ${d.name}`,
        `Phone: ${d.phone}`,
        `Email: ${d.email || '(not provided)'}`,
        `City: ${d.city || '(not provided)'}`,
        `Service: ${d.service}`,
        '',
        d.message,
      ].join('\n');
      window.location.href = `mailto:steve@stevesiron.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.className = 'form-status ok';
      status.textContent = 'Thanks! Your email app should open with your request ready to send. Prefer to talk? Call (949) 456-0176.';
    });
    $$('input, textarea', form).forEach((f) => f.addEventListener('input', () => f.classList.remove('invalid')));
  }

  /* ---------- Reveal on scroll ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const targets = $$('.section-head, .service, .work-card, .g-item, .review, .area-card, .focus, .stat, .checks li');
    targets.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
        el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 5) * 70}ms`;
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: 0.1 });
    targets.forEach((el) => io.observe(el));
  }
})();
