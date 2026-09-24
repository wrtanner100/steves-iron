# Steve's Iron: Website

A new website for **Steve's Iron**, a mobile welding and wrought iron repair business in San Clemente, CA ([stevesiron.com](https://stevesiron.com/)).

It's a fast, dependency-free static site (plain HTML, CSS and JS). There's no build step, and it hosts free on GitHub Pages, Netlify or Cloudflare Pages.

## What's on the page

- A header with the address, email, social links, a click-to-call phone button and a "Get a Quote" button
- A hero section with an animated welding-spark effect and trust points (C-23 license, 24/7, 25+ years, no job too small)
- A free quote form. It checks the fields, then opens an email to `steve@stevesiron.com` with the request filled in.
- A scrolling credentials banner
- A swipeable services carousel with 8 services
- A stats band, a "Why choose us" section and a 4-step process section
- A gallery with a lightbox
- Testimonials with a Yelp rating link
- Service areas with a map of San Clemente, Dana Point, San Juan Capistrano, Mission Viejo, Laguna Hills, Laguna Niguel, Irvine, Newport Beach and Laguna Beach
- An FAQ, a contact section and a footer
- A sticky Call / Quote bar on mobile
- SEO basics: meta tags, Open Graph tags and `LocalBusiness` structured data for Google

## Business info used

| | |
| --- | --- |
| Phone | (949) 456-0176 |
| Email | steve@stevesiron.com |
| Address | 905 Calle Gomero, San Clemente, CA 92673 |
| Hours | Mon–Sat 9 AM – 5 PM, emergency service 24/7 |
| License | CA C-23 Ornamental Metals Welding Contractor #968768 |
| Drop-off welding | $95 minimum |

## Before launch

1. **Add Steve's photos.** Put them in `assets/img/` using the file names in [`assets/img/README.md`](assets/img/README.md). Until then, each image slot shows a styled placeholder.
2. **Check the reviews.** The two testimonials are summarized from public reviews. Replace them with real quotes (with the customer's OK).
3. **Pick a form backend (optional).** The form opens the visitor's email app. To collect submissions without email, point the form at Formspree, Netlify Forms or similar in `assets/js/main.js`.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy on GitHub Pages

Go to Settings → Pages → Deploy from a branch, then pick the branch and `/ (root)`.

## Structure

```
index.html
assets/
  css/styles.css    # all styles; the palette is set in :root
  css/fonts.css     # self-hosted Barlow Condensed + Poppins
  fonts/            # woff2 files
  js/main.js        # nav, carousel, form, lightbox, animations, sparks
  img/              # photos + favicon
```
