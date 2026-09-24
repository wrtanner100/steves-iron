# Extra photos (optional)

Steve's job photos live in `assets/img/gallery/` and are listed, with captions, in `gallery` in `src/data.js`.

To add a new job photo:
1. Save it as `assets/img/gallery/job-13.jpg` (and so on). A square-ish crop about 900px wide works best.
2. Add a line to `gallery` in `src/data.js` with a caption, city and type (Gates, Fences or Handrails).
3. Run `node build.js`.

## City page backgrounds

Dana Point and San Clemente already use gallery photos. The other city pages show a black wrought-iron pattern until a photo is dropped in here:

`city-san-juan-capistrano.jpg`, `city-laguna-niguel.jpg`, `city-laguna-beach.jpg`, `city-mission-viejo.jpg`, `city-laguna-hills.jpg`, `city-irvine.jpg`, `city-newport-beach.jpg`

No rebuild is needed for these. Or point a city at a gallery photo with `photo: 'gallery/job-XX.jpg'` in `src/data.js`.
