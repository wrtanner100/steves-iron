# Steve's Iron: Website

The new website for **Steve's Iron**: custom wrought iron and mobile welding in Dana Point, San Clemente and South Orange County.

It's a fast static site (HTML, CSS and a little JS). There are no dependencies, and it hosts free on GitHub Pages, Netlify or Cloudflare Pages.

## Brand

- **Colors:** black, white and red `#F65257`
- **Logo:** Steve's gate logo, recolored as `assets/img/logo-white.png` (for dark backgrounds) and `logo-black.png` (for light ones). It's cleaned up from his current small JPG.
- **Fonts:** Plus Jakarta Sans for headings and body, Bebas Neue for the red "No job too small" accents. Both are self-hosted in `assets/fonts/`.
- **Tagline:** Quality. Commitment. Integration.
- **Trust markers:** CA License #968768 C-23, Best of Houzz, 25+ years, 24/7 emergency, (949) 456-0176 on every page

## Pages

| URL | What it is |
| --- | --- |
| `/` | Homepage: hero, services, previous works, about, reviews, service areas, quote form |
| `/gallery/` | Photo gallery of Steve's jobs, with filters (Gates / Fences / Handrails) and a lightbox |
| `/service-areas/` | All cities |
| `/service-areas/dana-point/` | Dana Point page (featured first) |
| `/service-areas/<city>/` | San Clemente, San Juan Capistrano, Laguna Niguel, Laguna Beach, Mission Viejo, Laguna Hills, Irvine, Newport Beach |

Each city page has its own title, description, local copy and `Service` structured data. `sitemap.xml` and `robots.txt` are included.

## Editing content

All text lives in **`src/data.js`**: business info, services, gallery photos and captions, reviews and city pages. Page templates are in `src/layout.js` and `build.js`.

After editing, rebuild the HTML:

```bash
node build.js
```

This needs Node 18+ and nothing else. Commit the generated `.html` files too, since those are what gets hosted.

## Still to do

- [ ] **Logo:** ask Steve for the original logo file. The current one is upscaled from the small JPG on his site. Replace `logo-white.png` and `logo-black.png`.
- [ ] **Best of Houzz badge:** swap the CSS badge for the official badge image from his Houzz pro account.
- [ ] **Instagram:** add his handle as `instagramUrl` in `src/data.js`.
- [ ] **More photos:** add more jobs to the gallery (see the [photo guide](assets/img/photos/README.md)).
- [ ] **Quote form (optional):** it currently opens the visitor's email app. Point it at Formspree or Netlify Forms to collect submissions directly.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy on GitHub Pages

Go to Settings → Pages → Deploy from a branch, then pick the branch and `/ (root)`. To use stevesiron.com, add a custom domain there.
