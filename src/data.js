// All business info lives here. Edit this file, then run `node build.js`.

const business = {
  name: "Steve's Iron",
  tagline: ['Quality.', 'Commitment.', 'Integration.'],
  phone: '(949) 456-0176',
  phoneHref: 'tel:+19494560176',
  email: 'steve@stevesiron.com',
  street: '905 Calle Gomero',
  city: 'San Clemente',
  region: 'CA',
  zip: '92673',
  license: '968768 C-23',
  licenseLong: 'California licensed C-23 Ornamental Metals Welding Contractor, License #968768',
  hours: 'Mon–Sat 9 AM – 5 PM',
  years: '25+',
  site: 'https://stevesiron.com',
  mapsUrl: 'https://maps.google.com/?q=905+Calle+Gomero,+San+Clemente,+CA+92673',
  reviewsUrl: 'https://www.google.com/search?q=Steve%27s+Iron+San+Clemente+reviews',
  houzzUrl: 'https://www.houzz.com/professionals/fencing-and-gate-sales-and-construction/steves-iron-pfvwus-pf~2050751198',
  facebookUrl: 'https://www.facebook.com/p/Steves-Iron-100066639412856/',
  yelpUrl: 'https://www.yelp.com/biz/steves-iron-san-clemente',
  // TODO: add Steve's Instagram handle when confirmed, e.g. 'https://www.instagram.com/<handle>/'
  instagramUrl: '',
};

// The 5 service boxes. `photo` is the file to drop into assets/img/photos/.
const services = [
  {
    id: 'gates',
    title: 'Gates',
    icon: 'gate',
    text: 'Iron gate repair and new custom swing gates. Gate hinge weld repairs, sagging gates corrected, and latches and locks that work again.',
  },
  {
    id: 'fences',
    title: 'Fences',
    icon: 'fence',
    text: 'Broken wrought iron fences fixed and bent fencing straightened. We also install galvanized and powder coated standard fence panels and gates.',
  },
  {
    id: 'railings',
    title: 'Railings',
    icon: 'rail',
    text: 'New custom hand rails, scrollwork railings, and welding and repair of existing railings and handrails on stairs, porches and balconies.',
  },
  {
    id: 'restoration',
    title: 'Restoration',
    icon: 'spark',
    text: 'Wrought iron restoration for homes and businesses. Rusted gates and fences restored, rusted-out posts replaced, rust repaired and recoated.',
  },
  {
    id: 'mobile-welding',
    title: 'Mobile Welding',
    icon: 'truck',
    text: 'We come to your home, business, garage, dock or roadside location and bring everything, including a generator to power our electric welders. Trailers, security bars, brackets, tools, grates, frames and more.',
  },
];

// Job photos (assets/img/gallery/). Captions come from Steve's own gallery.
// `type` drives the filter buttons on the Gallery page.
const gallery = [
  { file: 'job-01.jpg', caption: 'Horizontal linear design slat gate', type: 'Gates' },
  { file: 'job-02.jpg', caption: 'Horizontal linear design slat fence panels', city: 'San Clemente', type: 'Fences' },
  { file: 'job-03.jpg', caption: 'Horizontal linear design slat fence panels', city: 'San Clemente', type: 'Fences' },
  { file: 'job-04.jpg', caption: 'Handrail with custom mounting brackets going up brick steps', city: 'Dana Point', type: 'Handrails' },
  { file: 'job-05.jpg', caption: 'Wrought iron side yard gate', type: 'Gates' },
  { file: 'job-06.jpg', caption: 'Black entry step handrail', type: 'Handrails' },
  { file: 'job-07.jpg', caption: 'Black iron patio railing', type: 'Fences' },
  { file: 'job-08.jpg', caption: 'Modern black handrail', city: 'Dana Point', type: 'Handrails' },
  { file: 'job-09.jpg', caption: 'Standard property fence', city: 'Dana Point', type: 'Fences' },
  { file: 'job-10.jpg', caption: 'Sleek slat design gate', city: 'Dana Point', type: 'Gates' },
  { file: 'job-11.jpg', caption: 'Spiral handrails going up', city: 'San Clemente', type: 'Handrails' },
  { file: 'job-12.jpg', caption: 'Spiral handrails going down', city: 'San Clemente', type: 'Handrails' },
];

// Hero panels (paired with the tagline) and "Our Previous Works" cards.
const heroPhotos = ['gallery/job-11.jpg', 'gallery/job-10.jpg', 'gallery/job-02.jpg'];
const works = [
  { title: 'Custom Slat Gates', photo: 'gallery/job-10.jpg' },
  { title: 'Custom Handrails', photo: 'gallery/job-04.jpg' },
  { title: 'Fences & Panels', photo: 'gallery/job-09.jpg' },
];
const aboutPhoto = 'gallery/job-05.jpg';

// Google reviews shown on every page.
const reviews = [
  { quote: 'Extremely pleased with Steve’s work. I highly recommend him and his team.', name: 'Charles' },
  { quote: 'Steve was easy to work with and great with communication.', name: 'Nicholas' },
  { quote: 'Steve was great, he was prompt, polite and we now have a beautiful wrought iron gate!', name: 'Karen' },
];
const reviewCount = '100+';

// City pages. Order matters: Dana Point first.
const cities = [
  {
    slug: 'dana-point',
    photo: 'gallery/job-08.jpg',
    name: 'Dana Point',
    featured: true,
    intro: 'Dana Point is right next door to our San Clemente shop, and it’s where we do a lot of our favorite work. From bluff-top homes in Monarch Beach to cottages in Capistrano Beach and the shops in the Lantern District, Steve keeps iron gates, fences and railings working and looking sharp.',
    focus: [
      ['Salt-air rust repair', 'Ocean air is hard on iron. We restore rusted gates and fences and replace rusted-out posts before they fail.'],
      ['Harbor & dock welding', 'Our mobile rig comes to the dock. Brackets, frames, rails and trailers welded on site at Dana Point Harbor.'],
      ['Coastal railings', 'Custom hand rails and scroll railings for stairs, decks and balconies with a view.'],
    ],
    areas: ['Monarch Beach', 'Capistrano Beach', 'Lantern District', 'Dana Point Harbor'],
  },
  {
    slug: 'san-clemente',
    photo: 'gallery/job-11.jpg',
    name: 'San Clemente',
    intro: 'San Clemente is home. Our shop is at 905 Calle Gomero, so we’re close to every neighborhood in town, from the Pier Bowl to Talega and Forster Ranch. Need it fast? We can usually get out quickly, and you can always bring smaller jobs to the shop.',
    focus: [
      ['Drop-off welding', 'Bring it to the shop at 905 Calle Gomero. Drop-off welding has a $95 minimum.'],
      ['Gate & fence repair', 'Sagging gates, broken hinges, latches that won’t catch and bent fence sections fixed on site.'],
      ['24/7 emergencies', 'Gate stuck open or fence down? Call any time and we’ll get out to you.'],
    ],
    areas: ['Pier Bowl', 'Talega', 'Forster Ranch', 'Shorecliffs'],
  },
  {
    slug: 'san-juan-capistrano',
    name: 'San Juan Capistrano',
    intro: 'San Juan Capistrano has some of the best old iron in South County, plus plenty of ranch and equestrian properties that need gates and trailers that hold up. Steve handles both, with custom work that fits the town’s character.',
    focus: [
      ['Ranch & property gates', 'Heavy swing gates built, re-hung and re-welded so they swing true and latch every time.'],
      ['Trailer repair', 'Mobile welding for trailers, hitches, frames and brackets, right where they’re parked.'],
      ['Wrought iron restoration', 'Older iron brought back: rust repaired, broken pieces re-welded, posts replaced.'],
    ],
    areas: ['Los Rios District', 'San Juan Hills', 'Mission District'],
  },
  {
    slug: 'laguna-niguel',
    name: 'Laguna Niguel',
    intro: 'Laguna Niguel’s hillside homes and HOA communities have a lot of iron: pool fences, side-yard gates, entry railings. Steve keeps them safe, working and up to standard.',
    focus: [
      ['HOA & community fencing', 'Galvanized and powder coated fence panels and gates installed and repaired.'],
      ['Side-yard & pool gates', 'Gates that sag, drag or won’t latch fixed, with hinge weld repairs on site.'],
      ['Hand rails', 'Solid new hand rails for steep driveways, entry steps and hillside stairs.'],
    ],
    areas: ['Hillside neighborhoods', 'HOA communities'],
  },
  {
    slug: 'laguna-beach',
    name: 'Laguna Beach',
    intro: 'Between the salt air and the hillside stairs, Laguna Beach iron works hard. Steve restores coastal gates and fences and builds railings that are safe and look right on a Laguna home.',
    focus: [
      ['Coastal restoration', 'Rusted wrought iron gates and fences restored before the rust takes over.'],
      ['Stair & balcony railings', 'Custom hand rails and railings for hillside stairs, decks and balconies.'],
      ['On-site repairs', 'Tight lots and steep streets are no problem. The mobile rig brings its own power.'],
    ],
    areas: ['South Laguna', 'Top of the World', 'Village'],
  },
  {
    slug: 'mission-viejo',
    name: 'Mission Viejo',
    intro: 'Mission Viejo homeowners call Steve for the everyday iron that makes a house work: side gates, pool fences, security bars and hand rails.',
    focus: [
      ['Gate repair', 'Hinge welds, sagging gates corrected and latches that lock again.'],
      ['Security bars', 'Security bars welded, repaired and installed.'],
      ['Fence panels', 'Standard galvanized and powder coated fence panels and gates installed.'],
    ],
    areas: ['Lake Mission Viejo area', 'Residential neighborhoods'],
  },
  {
    slug: 'laguna-hills',
    name: 'Laguna Hills',
    intro: 'From homes to shopping centers and office parks, Laguna Hills properties rely on gates, fences and rails that work. Steve handles residential and commercial jobs alike.',
    focus: [
      ['Commercial gates', 'Swing gates for businesses repaired and rebuilt so they open, close and lock.'],
      ['Mobile welding', 'We weld on site at your business, so there’s no hauling and no downtime.'],
      ['Residential iron', 'Fences, railings and gates for Laguna Hills homes.'],
    ],
    areas: ['Residential', 'Commercial'],
  },
  {
    slug: 'irvine',
    name: 'Irvine',
    intro: 'Irvine businesses and HOAs call Steve for fast, licensed mobile welding. We come to you with everything we need, including our own generator.',
    focus: [
      ['Business & industrial', 'Frames, brackets, grates and security bars welded and repaired on site.'],
      ['HOA fences & gates', 'Community fence panels and gates installed and repaired.'],
      ['Emergency service', '24/7 repairs when a gate or fence can’t wait.'],
    ],
    areas: ['Business parks', 'HOA communities'],
  },
  {
    slug: 'newport-beach',
    name: 'Newport Beach',
    intro: 'Newport Beach means docks, balconies and a lot of coastal iron. Steve’s mobile welding comes right to the dock or the driveway, and his restoration work keeps salt-air iron looking good.',
    focus: [
      ['Dock welding', 'Mobile welding at the dock for brackets, rails and frames.'],
      ['Balcony & stair railings', 'Custom railings and hand rails that are solid, safe and good-looking.'],
      ['Rust restoration', 'Coastal gates and fences restored and protected.'],
    ],
    areas: ['Balboa Island', 'Corona del Mar', 'Newport Harbor'],
  },
];

module.exports = { business, services, gallery, heroPhotos, works, aboutPhoto, reviews, reviewCount, cities };
