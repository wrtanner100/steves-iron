(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Year ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header shadow on scroll ---------- */
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

  /* ---------- Active nav link ---------- */
  const navLinks = $$('.nav-menu a[href^="#"]');
  const sections = navLinks
    .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));

  /* ---------- Image slots: use the real photo if it exists, otherwise keep the designed placeholder ---------- */
  const icons = {
    gate: '<svg viewBox="0 0 48 48"><path d="M6 44V14M42 44V14M6 14h36M6 44h36"/><path d="M12 44V20M18 44V20M24 44V20M30 44V20M36 44V20"/><path d="M12 20c0-4 3-6 6-6M36 20c0-4-3-6-6-6"/><circle cx="24" cy="8" r="3"/><circle cx="6" cy="10" r="2"/><circle cx="42" cy="10" r="2"/></svg>',
    fence: '<svg viewBox="0 0 48 48"><path d="M4 16h40M4 38h40"/><path d="M8 44V12l2-4 2 4v32M20 44V12l2-4 2 4v32M32 44V12l2-4 2 4v32"/><path d="M14 44V16M26 44V16M38 44V16"/></svg>',
    rail: '<svg viewBox="0 0 48 48"><path d="M4 42h10v-8h10v-8h10v-8h10"/><path d="M6 30 42 8"/><path d="M10 42V28M20 34V22M30 26V16M40 18V9"/></svg>',
    spark: '<svg viewBox="0 0 48 48"><path d="M24 4v8M24 36v8M4 24h8M36 24h8M10 10l6 6M32 32l6 6M38 10l-6 6M16 32l-6 6"/><circle cx="24" cy="24" r="5"/></svg>',
    truck: '<svg viewBox="0 0 48 48"><path d="M2 12h28v22H2zM30 20h9l7 8v6H30z"/><circle cx="11" cy="36" r="4"/><circle cx="37" cy="36" r="4"/><path d="m12 18-4 7h6l-3 6"/></svg>',
    bolt: '<svg viewBox="0 0 48 48"><path d="M28 2 10 28h12l-4 18 20-28H26z"/></svg>',
  };

  const loadImage = (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });

  $$('[data-img]').forEach(async (el) => {
    if (el.dataset.icon && icons[el.dataset.icon]) {
      el.insertAdjacentHTML('afterbegin', `<span class="slot-icon" aria-hidden="true">${icons[el.dataset.icon]}</span>`);
    }
    const sources = [el.dataset.img, el.dataset.fallback].filter(Boolean);
    for (const src of sources) {
      try {
        await loadImage(src);
        el.style.setProperty('--photo', `url("${src}")`);
        el.classList.add('has-img');
        el.dataset.loaded = src;
        return;
      } catch { /* try next source */ }
    }
  });

  /* ---------- Services carousel arrows ---------- */
  const track = $('#service-track');
  $$('[data-scroll]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = track.querySelector('.service-card');
      const step = card ? card.getBoundingClientRect().width + 24 : 300;
      track.scrollBy({ left: step * Number(btn.dataset.scroll), behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  /* ---------- Gallery lightbox (only for real photos) ---------- */
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.innerHTML = '<button type="button" aria-label="Close">&times;</button><img alt="" />';
  document.body.appendChild(lightbox);
  const closeLightbox = () => lightbox.classList.remove('open');
  lightbox.addEventListener('click', (e) => { if (e.target !== lightbox.querySelector('img')) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  $$('.g-item').forEach((fig) => {
    fig.addEventListener('click', () => {
      if (!fig.dataset.loaded) return;
      const img = lightbox.querySelector('img');
      img.src = fig.dataset.loaded;
      img.alt = fig.querySelector('figcaption')?.textContent || '';
      lightbox.classList.add('open');
      lightbox.querySelector('button').focus();
    });
  });

  /* ---------- Quote form: validates, then opens an email to Steve ---------- */
  const form = $('#quote-form');
  const status = $('.form-status', form);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    let valid = true;
    $$('input[required]', form).forEach((input) => {
      const bad = !input.value.trim();
      input.classList.toggle('invalid', bad);
      if (bad) valid = false;
    });
    const email = form.elements.email;
    if (email.value && !email.checkValidity()) { email.classList.add('invalid'); valid = false; }

    if (!valid) {
      status.className = 'form-status err';
      status.textContent = 'Please fill in your name, phone number and what you need help with.';
      return;
    }

    const subject = `Free quote request from ${data.name}`;
    const body = [
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email || '(not provided)'}`,
      '',
      `How can we help: ${data.message}`,
    ].join('\n');
    window.location.href = `mailto:steve@stevesiron.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.className = 'form-status ok';
    status.innerHTML = 'Thanks! Your email app should open with your request ready to send. Prefer to talk? Call <a href="tel:+19494560176">(949) 456-0176</a>.';
    form.reset();
  });
  $$('input', form).forEach((input) => input.addEventListener('input', () => input.classList.remove('invalid')));

  /* ---------- Reveal on scroll ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const targets = $$('.section-head, .service-card, .why-item, .step, .g-item, .review, .rating-bar, .area-list, .map, .faq details, .contact-cards li, .stat');
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
    }, { threshold: 0.12 });
    targets.forEach((el) => io.observe(el));
  }

  /* ---------- Count-up stats ---------- */
  const counters = $$('[data-count]');
  if (!reduceMotion && counters.length) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const end = Number(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / 1200, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3))) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => co.observe(el));
  }

  /* ---------- Hero welding sparks ---------- */
  const canvas = $('.hero-sparks');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    const hero = $('.hero');
    let w = 0, h = 0, dpr = 1, sparks = [], running = true, origin = { x: 0, y: 0 };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth;
      h = hero.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Sparks shoot from a "weld point" in the photo area on desktop, lower-right on mobile
      origin = w > 960 ? { x: w * 0.7, y: h * 0.55 } : { x: w * 0.82, y: h * 0.78 };
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = () => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.3;
      const speed = 2 + Math.random() * 6;
      sparks.push({
        x: origin.x + (Math.random() - 0.5) * 8,
        y: origin.y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.008 + Math.random() * 0.02,
      });
    };

    const frame = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const burst = Math.random() < 0.12 ? 18 : 3;
      for (let i = 0; i < burst; i++) spawn();

      // Glow at the weld point
      const flicker = 0.6 + Math.random() * 0.4;
      const g = ctx.createRadialGradient(origin.x, origin.y, 0, origin.x, origin.y, 60 * flicker);
      g.addColorStop(0, `rgba(255, 244, 214, ${0.9 * flicker})`);
      g.addColorStop(0.3, `rgba(255, 176, 40, ${0.35 * flicker})`);
      g.addColorStop(1, 'rgba(255, 120, 20, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, 60 * flicker, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = 'lighter';
      sparks = sparks.filter((s) => s.life > 0 && s.y < h + 20);
      for (const s of sparks) {
        const px = s.x, py = s.y;
        s.vy += 0.16;
        s.vx *= 0.99;
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;
        ctx.strokeStyle = `rgba(255, ${170 + Math.floor(s.life * 80)}, ${Math.floor(s.life * 120)}, ${s.life})`;
        ctx.lineWidth = 1.6 * s.life + 0.4;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
      requestAnimationFrame(frame);
    };

    // Pause when the hero is off screen
    new IntersectionObserver(([entry]) => {
      const wasRunning = running;
      running = entry.isIntersecting;
      if (running && !wasRunning) requestAnimationFrame(frame);
    }).observe(hero);
    requestAnimationFrame(frame);
  }
})();
