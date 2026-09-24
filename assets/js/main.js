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

  /* ---------- Photo slots: use Steve's photo if the file exists, else keep the iron pattern ---------- */
  $$('[data-img]').forEach((el) => {
    const img = new Image();
    img.onload = () => {
      el.style.setProperty('--photo', `url("${img.src}")`);
      el.classList.add('has-img');
    };
    img.src = el.dataset.img;
  });

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
    const targets = $$('.section-head, .service, .work-card, .review, .area-card, .focus, .stat, .checks li');
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
