# Steve's Iron: Website

The new website for **Steve's Iron**: custom wrought iron and mobile welding in Dana Point, San Clemente and South Orange County.

It's a fast static site (HTML, CSS and a little JS). There are no dependencies, and it hosts free on GitHub Pages, Netlify or Cloudflare Pages.

## Brand

- **Colors:** black, white, red `#F65257` and yellow `#FBDE44`
- **Fonts:** Plus Jakarta Sans for headings and body, Bebas Neue for the yellow "No job too small" accents. Both are self-hosted in `assets/fonts/`.
- **Tagline:** Quality. Commitment. Integration.
- **Trust markers:** CA License #968768 C-23, Best of Houzz, 25+ years, 24/7 emergency, (949) 456-0176 on every page

## Pages

| URL | What it is |
| --- | --- |
| `/` | Homepage: hero, services, previous works, about, reviews, service areas, quote form |
| `/service-areas/` | All cities |
| `/service-areas/dana-point/` | Dana Point page (featured first) |
| `/service-areas/<city>/` | San Clemente, San Juan Capistrano, Laguna Niguel, Laguna Beach, Mission Viejo, Laguna Hills, Irvine, Newport Beach |

Each city page has its own title, description, local copy and `Service` structured data. `sitemap.xml` and `robots.txt` are included.

## Editing content

All text lives in **`src/data.js`**: business info, services, reviews and city pages. Page templates are in `src/layout.js` and `build.js`.

After editing, rebuild the HTML:

```bash
node build.js
```

This needs Node 18+ and nothing else. Commit the generated `.html` files too, since those are what gets hosted.

## Before showing Steve / launch checklist

- [ ] **Photos:** drop his real job photos into `assets/img/photos/` (see the [photo guide](assets/img/photos/README.md)). Get them from his site's Gallery, Instagram and Houzz.
- [ ] **Reviews:** pick his 3–4 best Google reviews and paste them word for word into `reviews` in `src/data.js`, with names. The current three are real excerpts from his public reviews, but they don't include reviewer names.
- [ ] **Logo:** ask Steve for the original logo file. The site uses a simple black-and-white text mark until then.
- [ ] **Best of Houzz badge:** swap the CSS badge for the official badge image from his Houzz pro account.
- [ ] **Instagram:** add his handle as `instagramUrl` in `src/data.js`.
- [ ] **Hours:** confirm them. His site says Mon–Sat 9–5, and some listings say Mon–Fri 8–5.
- [ ] **Quote form (optional):** it currently opens the visitor's email app. Point it at Formspree or Netlify Forms to collect submissions directly.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy on GitHub Pages

Go to Settings → Pages → Deploy from a branch, then pick the branch and `/ (root)`. To use stevesiron.com, add a custom domain there.
