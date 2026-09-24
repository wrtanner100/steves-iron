// Builds the static site from src/. Run: node build.js
const fs = require('fs');
const path = require('path');
const { business: b, works, cities } = require('./src/data');
const L = require('./src/layout');

const write = (rel, html) => {
  const file = path.join(__dirname, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log('wrote', rel);
};

const page = ({ root, path: p, title, description, jsonLd, home = false, body }) =>
  (L.head({ root, title, description, path: p, jsonLd }) + L.header({ root, home }) + body + L.footer({ root }))
    .replace(/\{\{root\}\}/g, root);

/* ------------------------------ Home ------------------------------ */
const heroPanels = [
  { word: b.tagline[0], photo: 'hero-quality.jpg', alt: 'Wrought iron scroll railing by Steve’s Iron' },
  { word: b.tagline[1], photo: 'hero-commitment.jpg', alt: 'Custom iron gate by Steve’s Iron' },
  { word: b.tagline[2], photo: 'hero-integration.jpg', alt: 'Steve welding on site' },
];

const home = `
    <section class="hero">
      <div class="hero-panels">
        ${heroPanels.map((h) => `<div class="hero-panel">${L.slot(h.photo, '', h.alt)}<span>${h.word.toUpperCase()}</span></div>`).join('')}
      </div>
      <div class="container hero-copy">
        <div class="hero-badges">
          <span class="pill pill-yellow">Licensed ${b.license}</span>
          <span class="pill">Best of Houzz</span>
          <span class="pill">${b.years} Years</span>
        </div>
        <h1>Custom Wrought Iron &amp; Mobile Welding in Dana Point &amp; South OC</h1>
        <p class="hero-lead">Steve’s Iron repairs iron gates and fences and specializes in mobile welding and wrought iron restoration of residential and commercial swing gates and fences. We come to you, 24/7.</p>
        <div class="hero-actions">
          <a href="${b.phoneHref}" class="btn btn-yellow btn-xl">${L.icons.phone} Call ${b.phone}</a>
          <a href="#quote" class="btn btn-red btn-xl">Get a Free Quote</a>
        </div>
        <div class="stats">
          <div class="stat"><strong>${b.years}</strong><span>Years in business</span></div>
          <div class="stat"><strong>100+</strong><span>5-star reviews</span></div>
          <div class="stat"><strong>24/7</strong><span>Emergency service</span></div>
          <div class="stat"><strong>C-23</strong><span>CA License #968768</span></div>
        </div>
      </div>
    </section>

    ${L.noJobBand()}

    <section class="section services" id="services">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">What We Do</p>
          <h2>Gates, fences, railings, restoration &amp; mobile welding</h2>
          <p class="muted">We weld and repair trailers, railings, handrails, fences, gates, security bars, brackets, tools, grates, frames (and more), and install galvanized and powder coated standard fence panels and gates.</p>
        </div>
        ${L.serviceBoxes()}
      </div>
    </section>

    <section class="section works" id="work">
      <div class="works-shape" aria-hidden="true"></div>
      <div class="container">
        <h2 class="works-title">Our Previous Works</h2>
        <div class="work-grid">
          ${works.map((w, i) => `
          <article class="work-card">
            ${L.slot(w.photo, '', w.title)}
            <div class="work-body">
              <h3>${w.title.replace(' ', '<br />')}</h3>
              ${i === works.length - 1 ? `<a href="${b.houzzUrl}" target="_blank" rel="noopener" class="pill-link">View Projects</a>` : ''}
            </div>
          </article>`).join('')}
        </div>
      </div>
    </section>

    <section class="section about" id="about">
      <div class="container about-grid">
        <div class="about-photo">
          ${L.slot('steve.jpg', '', 'Steve of Steve’s Iron')}
          ${L.houzzBadge}
        </div>
        <div>
          <p class="eyebrow">Why Steve’s Iron</p>
          <h2>${b.tagline.join(' ')}</h2>
          <p class="muted">You get Steve: a licensed contractor with ${b.years} years in business who answers his phone, shows up, and stands behind the work. Our commitment to quality shows in our 24/7 emergency service and dedication to customer satisfaction.</p>
          <ul class="checks">
            <li><strong>Licensed &amp; accountable.</strong> ${b.licenseLong}.</li>
            <li><strong>We come to you.</strong> Mobile welding at your business, home, garage, dock or roadside location. We bring everything, generator included.</li>
            <li><strong>No job too small.</strong> One broken hinge or a full run of fence, it gets the same care.</li>
            <li><strong>Free quotes.</strong> Straight pricing up front. Bringing materials to us? Drop-off welding has a $95 minimum.</li>
          </ul>
        </div>
      </div>
    </section>

    ${L.reviewsSection()}

    <section class="section areas" id="areas">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Service Areas</p>
          <h2>Serving Dana Point &amp; all of South OC</h2>
        </div>
        <div class="area-grid">
          ${cities.map((c) => `
          <a class="area-card${c.featured ? ' area-featured' : ''}" href="service-areas/${c.slug}/">
            <span class="area-name">${c.name}</span>
            ${c.featured ? `<span class="area-note">${c.areas.join(' · ')}</span>` : ''}
            <span class="area-arrow">${L.icons.arrow}</span>
          </a>`).join('')}
        </div>
      </div>
    </section>

    ${L.ctaBand()}
    ${L.contactSection()}
`;

write('index.html', page({
  root: '',
  path: '/',
  home: true,
  title: 'Steve’s Iron | Custom Wrought Iron & Mobile Welding in Dana Point & South OC',
  description: `Custom wrought iron gates, fences, railings, restoration and mobile welding in Dana Point, San Clemente and South Orange County. Licensed C-23 #968768. 24/7. Call ${b.phone}.`,
  jsonLd: L.localBusiness(),
  body: home,
}));

/* -------------------------- Service areas index -------------------------- */
const areasIndex = `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Service Areas</p>
        <h1>Wrought iron &amp; mobile welding across South Orange County</h1>
        <p class="hero-lead">Based in San Clemente, Steve’s mobile rig covers Dana Point and the rest of South OC. Pick your city.</p>
      </div>
    </section>
    <section class="section areas">
      <div class="container">
        <div class="area-grid">
          ${cities.map((c) => `
          <a class="area-card${c.featured ? ' area-featured' : ''}" href="${c.slug}/">
            <span class="area-name">${c.name}</span>
            <span class="area-note">${c.areas.join(' · ')}</span>
            <span class="area-arrow">${L.icons.arrow}</span>
          </a>`).join('')}
        </div>
        <p class="muted center">Don’t see your city? Call <a href="${b.phoneHref}">${b.phone}</a>. We go where the job is.</p>
      </div>
    </section>
    ${L.ctaBand()}
    ${L.contactSection()}
`;
write('service-areas/index.html', page({
  root: '../',
  path: '/service-areas/',
  title: 'Service Areas | Steve’s Iron: Wrought Iron & Mobile Welding, South OC',
  description: 'Steve’s Iron serves Dana Point, San Clemente, San Juan Capistrano, Laguna Niguel, Laguna Beach, Mission Viejo, Laguna Hills, Irvine and Newport Beach.',
  jsonLd: L.localBusiness(),
  body: areasIndex,
}));

/* ------------------------------ City pages ------------------------------ */
cities.forEach((c) => {
  const others = cities.filter((o) => o.slug !== c.slug);
  const body = `
    <section class="page-hero city-hero">
      ${L.slot(`city-${c.slug}.jpg`, 'city-photo', `Iron work in ${c.name}`)}
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="../../">Home</a> / <a href="../">Service Areas</a> / <span>${c.name}</span></nav>
        <div class="hero-badges">
          <span class="pill pill-yellow">Licensed ${b.license}</span>
          <span class="pill">24/7 Emergency</span>
        </div>
        <h1>Wrought Iron &amp; Mobile Welding in ${c.name}</h1>
        <p class="hero-lead">${L.esc(c.intro)}</p>
        <div class="hero-actions">
          <a href="${b.phoneHref}" class="btn btn-yellow btn-xl">${L.icons.phone} Call ${b.phone}</a>
          <a href="#quote" class="btn btn-red btn-xl">Get a Free Quote</a>
        </div>
      </div>
    </section>

    ${L.noJobBand()}

    <section class="section city-focus">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">In ${c.name}</p>
          <h2>What ${c.name} calls Steve for</h2>
        </div>
        <div class="focus-grid">
          ${c.focus.map(([t, d], i) => `
          <div class="focus">
            <span class="focus-num">0${i + 1}</span>
            <h3>${L.esc(t)}</h3>
            <p>${L.esc(d)}</p>
          </div>`).join('')}
        </div>
        <p class="muted">Serving all of ${c.name}, including ${c.areas.join(', ')}.</p>
      </div>
    </section>

    <section class="section services" id="services">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Services</p>
          <h2>Everything iron, in ${c.name}</h2>
        </div>
        ${L.serviceBoxes(c.name)}
      </div>
    </section>

    ${L.reviewsSection()}

    <section class="section areas">
      <div class="container">
        <div class="section-head"><p class="eyebrow">Nearby</p><h2>Also serving</h2></div>
        <div class="area-grid">
          ${others.map((o) => `<a class="area-card" href="../${o.slug}/"><span class="area-name">${o.name}</span><span class="area-arrow">${L.icons.arrow}</span></a>`).join('')}
        </div>
      </div>
    </section>

    ${L.ctaBand(c.name)}
    ${L.contactSection(c.name)}
`;
  write(`service-areas/${c.slug}/index.html`, page({
    root: '../../',
    path: `/service-areas/${c.slug}/`,
    title: `Wrought Iron & Mobile Welding in ${c.name}, CA | Steve’s Iron`,
    description: `Iron gate and fence repair, custom railings, wrought iron restoration and mobile welding in ${c.name}, CA. Licensed C-23 #968768. 24/7 emergency service. Call ${b.phone}.`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Wrought iron repair and mobile welding',
      areaServed: { '@type': 'City', name: `${c.name}, CA` },
      provider: L.localBusiness(),
    },
    body,
  }));
});

/* ------------------------------ Sitemap ------------------------------ */
const urls = ['/', '/service-areas/', ...cities.map((c) => `/service-areas/${c.slug}/`)];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${b.site}${u}</loc></url>`).join('\n')}
</urlset>
`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${b.site}/sitemap.xml\n`);
