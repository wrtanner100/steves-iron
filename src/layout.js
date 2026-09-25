const { business: b, services, reviews, reviewCount, cities } = require('./data');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const icons = {
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s-7-6.2-7-12a7 7 0 1 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z"/><path d="m9 12 2 2 4-4"/></svg>',
  quote: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 6h10v10H8a4 4 0 0 0 4 4v4a8 8 0 0 1-8-8V6zm14 0h10v10h-6a4 4 0 0 0 4 4v4a8 8 0 0 1-8-8V6z" fill="currentColor" stroke="none"/></svg>',
  gate: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 44V14M42 44V14M6 14h36M6 44h36"/><path d="M12 44V20M18 44V20M24 44V20M30 44V20M36 44V20"/><path d="M12 20c0-4 3-6 6-6M36 20c0-4-3-6-6-6"/><circle cx="24" cy="8" r="3"/></svg>',
  fence: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 16h40M4 38h40"/><path d="M8 44V12l2-4 2 4v32M20 44V12l2-4 2 4v32M32 44V12l2-4 2 4v32"/><path d="M14 44V16M26 44V16M38 44V16"/></svg>',
  rail: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 42h10v-8h10v-8h10v-8h10"/><path d="M6 30 42 8"/><path d="M10 42V28M20 34V22M30 26V16M40 18V9"/></svg>',
  spark: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4v8M24 36v8M4 24h8M36 24h8M10 10l6 6M32 32l6 6M38 10l-6 6M16 32l-6 6"/><circle cx="24" cy="24" r="5"/></svg>',
  truck: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M2 12h28v22H2zM30 20h9l7 8v6H30z"/><circle cx="11" cy="36" r="4"/><circle cx="37" cy="36" r="4"/><path d="m12 18-4 7h6l-3 6"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" fill="currentColor" stroke="none"/></svg>',
};

// Steve's gate logo, recolored white on a transparent background for the dark site.
// logo-black.png is the same logo for light backgrounds.
const logo = (root) => `
<a href="${root}" class="logo" aria-label="${esc(b.name)} home">
  <img src="${root}assets/img/logo-white.png" alt="${esc(b.name)}" width="768" height="471" />
</a>`;

const houzzBadge = `
<a class="houzz-badge" href="${b.houzzUrl}" target="_blank" rel="noopener" aria-label="Best of Houzz, see Steve's Iron on Houzz">
  <span class="hb-top">Best of</span><span class="hb-name">Houzz</span>
</a>`;

const head = ({ root, title, description, path, jsonLd }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="theme-color" content="#0b0b0b" />
  <link rel="canonical" href="${b.site}${path}" />
  <link rel="icon" href="${root}assets/img/favicon.svg" type="image/svg+xml" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${b.site}${path}" />
  <meta property="og:image" content="${b.site}/assets/img/gallery/job-10.jpg" />
  <link rel="preload" href="${root}assets/fonts/plus-jakarta-sans-400.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="${root}assets/css/fonts.css" />
  <link rel="stylesheet" href="${root}assets/css/styles.css" />
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>`;

const localBusiness = (extra = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: b.name,
  slogan: b.tagline.join(' '),
  description: 'Custom wrought iron and mobile welding: gates, fences, railings, restoration and on-site welding across South Orange County.',
  url: `${b.site}/`,
  telephone: '+1-949-456-0176',
  email: b.email,
  address: { '@type': 'PostalAddress', streetAddress: b.street, addressLocality: b.city, addressRegion: b.region, postalCode: b.zip, addressCountry: 'US' },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '17:00' }],
  areaServed: cities.map((c) => c.name),
  sameAs: [b.facebookUrl, b.yelpUrl, b.houzzUrl, b.instagramUrl].filter(Boolean),
  ...extra,
});

const header = ({ root, home }) => {
  const h = home ? '' : root; // on the homepage, in-page anchors; elsewhere link back home
  return `
  <header class="site-header">
    <div class="container header-inner">
      ${logo(root)}
      <nav class="nav" aria-label="Main">
        <ul class="nav-menu" id="nav-menu">
          <li><a href="${h}#services">Services</a></li>
                    <li><a href="${h}#reviews">Reviews</a></li>
          <li><a href="${root}gallery/">Gallery</a></li>
          <li><a href="${root}service-areas/">Service Areas</a></li>
          <li><a href="${h}#contact">Contact</a></li>
        </ul>
      </nav>
      <div class="header-cta">
        <a href="${b.phoneHref}" class="btn btn-red btn-call" aria-label="Call ${b.phone}">${icons.phone}<span class="call-label">Call Now</span><span class="call-number">${b.phone}</span></a>
        <a href="${h}#quote" class="btn btn-light">Free Quote</a>
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Open menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>
  <main id="main">`;
};

const slot = (file, cls = '', label = '') =>
  `<div class="photo ${cls}" data-img="{{root}}assets/img/${file}"${label ? ` role="img" aria-label="${esc(label)}"` : ''}></div>`;

const noJobBand = () => {
  const items = ['No job too small', '24/7 emergency service', `Licensed ${b.license}`, 'Free quotes', 'We come to you'];
  const group = items.map((t) => `<span>&ndash; ${esc(t)}</span>`).join('');
  return `
  <section class="band" aria-label="${items.join(', ')}">
    <div class="band-track"><div class="band-group">${group}</div><div class="band-group" aria-hidden="true">${group}</div></div>
  </section>`;
};

const serviceBoxes = (city) => `
  <div class="service-grid">
    ${services.map((s) => `
    <article class="service" id="${s.id}">
      <div class="service-icon">${icons[s.icon]}</div>
      <h3>${esc(s.title)}${city ? ` <span class="in-city">in ${esc(city)}</span>` : ''}</h3>
      <p>${esc(s.text)}</p>
      <a href="#quote" class="text-link">Get a free quote ${icons.arrow}</a>
    </article>`).join('')}
    <article class="service service-cta">
      <h3>Not sure what you need?</h3>
      <p>Send a photo or give Steve a call. Free quotes, no job too small.</p>
      <a href="${b.phoneHref}" class="btn btn-black">${icons.phone} ${b.phone}</a>
    </article>
  </div>`;

const reviewsSection = () => `
  <section class="section reviews" id="reviews">
    <div class="container">
      <div class="section-title">
        <span class="title-mark" aria-hidden="true">${icons.quote}</span>
        <h2>What People Say About Steve</h2>
        <span class="title-mark" aria-hidden="true">${icons.quote}</span>
      </div>
      <div class="rating-summary">
        <span class="stars" aria-hidden="true">★★★★★</span>
        <span><strong>5-star rated</strong> &middot; ${reviewCount} reviews from South County homeowners &amp; businesses</span>
      </div>
      <div class="review-grid">
        ${reviews.map((r) => `
        <figure class="review">
          <span class="stars" aria-label="5 out of 5 stars">★★★★★</span>
          <blockquote>“${esc(r.quote)}”</blockquote>
          <figcaption>
            <span class="avatar" aria-hidden="true">${esc(r.name[0])}</span>
            <span><strong>${esc(r.name)}</strong><small>Google review</small></span>
          </figcaption>
        </figure>`).join('')}
      </div>
      <div class="center-actions">
        <a href="${b.reviewsUrl}" target="_blank" rel="noopener" class="btn btn-outline-light">Read all ${reviewCount} reviews ${icons.arrow}</a>
      </div>
    </div>
  </section>`;


// CTA graphic: a wrought iron gate (arched top rail, spear-tip pickets, scroll
// rings) with a live weld spark where a picket meets the middle rail.
const gateArt = () => {
  const archY = (x) => { const t = (x - 20) / 280; return 70 - 100 * t * (1 - t); };
  const pickets = [];
  for (let x = 50; x <= 270; x += 30) {
    const top = archY(x) - 16;
    pickets.push(`<path class="draw" d="M${x} 232V${top.toFixed(1)}"/><path class="draw tip" d="M${x - 5} ${(top + 6).toFixed(1)}L${x} ${(top - 8).toFixed(1)}L${x + 5} ${(top + 6).toFixed(1)}Z"/>`);
  }
  const rings = [];
  for (let x = 65; x <= 255; x += 30) rings.push(`<circle class="draw" cx="${x}" cy="191" r="9"/>`);
  const sparks = Array.from({ length: 12 }, (_, i) => {
    const a = -170 + i * 15 + (i % 3) * 4; // mostly upward and sideways
    return `<g transform="rotate(${a})"><line class="spark" x1="0" y1="0" x2="20" y2="0" style="--d:${(i * 0.09).toFixed(2)}s;--l:${46 + (i % 4) * 14}px"/></g>`;
  }).join('');
  return `<svg class="cta-art" viewBox="0 0 320 260" aria-hidden="true">
        <defs><radialGradient id="weldGlow"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset=".35" stop-color="#fff5d6" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
        <g class="gate">
          <path class="draw" d="M20 250V40M300 250V40"/>
          <circle class="draw" cx="20" cy="30" r="8"/><circle class="draw" cx="300" cy="30" r="8"/>
          <path class="draw" d="M20 70Q160-30 300 70"/>
          <path class="draw" d="M20 150H300M20 232H300"/>
          ${pickets.join('')}
          ${rings.join('')}
        </g>
        <g class="weld" transform="translate(170 150)">
          <circle class="weld-glow" r="30" fill="url(#weldGlow)"/>
          <circle class="weld-core" r="4"/>
          ${sparks}
        </g>
      </svg>`;
};

const ctaBand = (city) => `
  <section class="cta-band">
    <div class="container cta-inner">
      <h2>Got a gate, fence or railing that needs fixing${city ? ` in ${esc(city)}` : ''}?</h2>
      <div class="cta-actions">
        <a href="${b.phoneHref}" class="btn btn-black btn-lg">${icons.phone} Call ${b.phone}</a>
        <a href="#quote" class="btn btn-white btn-lg">Get a Free Quote</a>
      </div>
      ${gateArt()}
    </div>
  </section>`;

const contactSection = (city) => `
  <section class="section contact" id="contact">
    <div class="container contact-grid">
      <div id="quote">
        <p class="eyebrow">Free Quote</p>
        <h2>Tell Steve what you need${city ? ` in ${esc(city)}` : ''}.</h2>
        <p class="muted">Fill this out and your email app opens with everything ready to send. Or just call. Steve picks up.</p>
        <form class="quote-form" id="quote-form" novalidate>
          <div class="form-row">
            <label><span>Name</span><input type="text" name="name" required autocomplete="name" /></label>
            <label><span>Phone</span><input type="tel" name="phone" required autocomplete="tel" /></label>
          </div>
          <div class="form-row">
            <label><span>Email <em>(optional)</em></span><input type="email" name="email" autocomplete="email" /></label>
            <label><span>City</span><input type="text" name="city" value="${city ? esc(city) : ''}" autocomplete="address-level2" /></label>
          </div>
          <label><span>What do you need?</span>
            <select name="service">
              ${services.map((s) => `<option>${esc(s.title)}</option>`).join('')}
              <option>Emergency repair</option>
              <option>Something else</option>
            </select>
          </label>
          <label><span>Details</span><textarea name="message" rows="4" required placeholder="e.g. Side gate is sagging and won’t latch"></textarea></label>
          <button type="submit" class="btn btn-red btn-lg">Send My Free Quote Request</button>
          <p class="form-status" role="status" aria-live="polite"></p>
        </form>
      </div>
      <aside class="contact-info">
        <a class="big-phone" href="${b.phoneHref}">${icons.phone}<span><small>Call or text Steve</small>${b.phone}</span></a>
        <ul class="info-list">
          <li>${icons.mail}<a href="mailto:${b.email}">${b.email}</a></li>
          <li>${icons.pin}<a href="${b.mapsUrl}" target="_blank" rel="noopener">${b.street}, ${b.city}, ${b.region} ${b.zip}</a></li>
          <li>${icons.clock}<span>${b.hours}<br />Emergency service 24/7</span></li>
          <li>${icons.shield}<span>${b.licenseLong}</span></li>
        </ul>
        ${houzzBadge}
      </aside>
    </div>
  </section>`;

const footer = ({ root }) => `
  </main>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        ${logo(root)}
        <p class="footer-tagline">${b.tagline.join(' ')}</p>
        <p>Custom wrought iron and mobile welding for homes and businesses across South Orange County. ${b.years} years in business.</p>
      </div>
      <div>
        <h4>Services</h4>
        <ul>${services.map((s) => `<li><a href="${root}#${s.id}">${esc(s.title)}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h4>Service Areas</h4>
        <ul>${cities.map((c) => `<li><a href="${root}service-areas/${c.slug}/">${esc(c.name)}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="${b.phoneHref}" class="footer-phone">${b.phone}</a></li>
          <li><a href="mailto:${b.email}">${b.email}</a></li>
          <li>${b.street}<br />${b.city}, ${b.region} ${b.zip}</li>
          <li>${b.hours}</li>
        </ul>
        <div class="socials">
          <a href="${b.facebookUrl}" target="_blank" rel="noopener" aria-label="Facebook">${icons.facebook}</a>
          <a href="${b.houzzUrl}" target="_blank" rel="noopener" aria-label="Houzz">H</a>
          <a href="${b.yelpUrl}" target="_blank" rel="noopener" aria-label="Yelp">Y</a>
        </div>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>&copy; <span id="year">${new Date().getFullYear()}</span> ${esc(b.name)} &middot; CA Lic. #${b.license}</span>
      <a href="#main">Back to top &uarr;</a>
    </div>
  </footer>
  <div class="mobile-bar">
    <a href="${b.phoneHref}" class="btn btn-red">${icons.phone} Call Now</a>
    <a href="#quote" class="btn btn-light">Free Quote</a>
  </div>
  <script src="${root}assets/js/main.js" defer></script>
</body>
</html>
`;

module.exports = { esc, icons, head, header, footer, slot, noJobBand, serviceBoxes, reviewsSection, ctaBand, contactSection, localBusiness, houzzBadge };
