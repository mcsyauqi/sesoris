export interface CategorySEOContent {
  seoTitle: string;
  seoDescription: string;
  intro: string;
  sections: { heading: string; text: string }[];
  faqs: { question: string; answer: string }[];
  relatedCategories: string[];
}

/**
 * Category copy is written answer-first: the opening sentence of every section
 * answers the heading directly, because AI answer engines extract at the
 * paragraph level rather than the page level.
 *
 * Hard rule for this file: describe only products that actually exist in
 * src/data/products.ts. Earlier revisions listed spice racks, drawer dividers,
 * gua sha tools, and charging stations that were never in the catalog. Those
 * are unsupported claims and they are not to come back. No statistic goes in
 * here without a source URL that genuinely contains the number, so this file
 * carries no statistics at all.
 */
export const categoryContent: Record<string, CategorySEOContent> = {
  'home-living': {
    seoTitle: 'Stackable Storage Bins & Corner Shower Caddies - Sesoris',
    seoDescription: 'Shop stackable open-front storage bins and a stainless steel corner shower caddy at Sesoris. Ships from a US warehouse.',
    intro: 'Home & Decor at Sesoris covers two storage problems that show up in most homes: small parts and supplies with no place to live, and a shower corner with nowhere to put bottles. Both products ship from a US warehouse.',
    sections: [
      {
        heading: 'What is in the Home & Decor collection',
        text: 'The collection holds two products. The Stackable Storage Bins come as a 24-pack of open-front PP plastic bins, 12 blue and 12 red, each 5.39 x 4.13 x 3.07 in. on the outside, with 96 plastic supports and 48 label papers. The Corner Shower Caddy is a 304 stainless steel shelf, 10.5 in. along each back side, rated for 22 lbs and mounted with adhesive plates instead of screws.',
      },
      {
        heading: 'When open-front stackable bins make sense',
        text: 'Open-front bins suit anything you grab often and in small amounts: screws and hardware, craft supplies, spice packets in a pantry, or office supplies. The open front lets you see and reach the contents without unstacking, and the labels keep a row of identical bins readable. Each bin has an inner space of 4.21 x 3.39 x 2.68 in., so measure the items you plan to store before you buy.',
      },
      {
        heading: 'Installing an adhesive corner shower caddy',
        text: 'The caddy mounts with two adhesive plates, so there is no drilling into tile. Clean and dry the corner first, press the plates in place, and wait 24 hours before loading the shelf. It works best on smooth, flat surfaces such as glazed tile or glass; textured or porous surfaces give the adhesive less to grip.',
      },
    ],
    faqs: [
      {
        question: 'How many bins come in the stackable storage set?',
        answer: 'The set has 24 bins, 12 blue and 12 red, plus 96 plastic supports, 48 label papers, and a user manual.',
      },
      {
        question: 'Does the corner shower caddy need drilling?',
        answer: 'No. It mounts with two adhesive plates. Wait 24 hours after mounting before putting anything on it. It is rated for up to 22 lbs.',
      },
    ],
    relatedCategories: ['kitchen-dining', 'bags-pouches'],
  },
  'kitchen-dining': {
    seoTitle: 'Pull-Out Cabinet Organizers & Pantry Storage - Sesoris',
    seoDescription: 'Shop pull-out cabinet organizers in 11.5, 14, 17, and 20 in. widths, an over-the-door pantry rack, and a bamboo bread box. Ships from a US warehouse.',
    intro: 'Kitchen & Dining at Sesoris is built around one problem: deep cabinets and pantries where the things at the back are hard to reach. Most of the collection is pull-out organizers that bring the back of a cabinet out to you, plus a door-mounted pantry rack and a bamboo bread box.',
    sections: [
      {
        heading: 'What is in the Kitchen & Dining collection',
        text: 'The collection holds seven products: pull-out wire basket organizers in 11.5, 14, 17, and 20 in. widths, a black steel slide-out cabinet drawer, an 8-tier over-the-door pantry organizer, and a double-layer bamboo bread box that comes with a cutting board and bread knife.',
      },
      {
        heading: 'How to choose the right pull-out organizer size',
        text: 'Measure the inside of the cabinet opening, not the cabinet door. Each wire basket lists a minimum opening: the 11.5 in. basket needs 14 in. of width, the 14 in. basket needs 15.1 in., the 17 in. basket needs 19.3 in., and the 20 in. basket needs 22.3 in. Check depth and height too, and look for hinges, face frames, and pipes that stick into the opening. The wire baskets screw into the cabinet floor and are each rated for 28.6 lbs.',
      },
      {
        heading: 'A no-drill option for cabinets',
        text: 'The Slide-Out Cabinet Drawer, Black Steel, measures 11.81 x 16.92 x 3.15 in., pulls out up to 13 in., and holds up to 55 lbs. It mounts with adhesive tape instead of screws, which suits rentals and cabinets you would rather not drill.',
      },
      {
        heading: 'Using the back of the pantry door',
        text: 'The 8-tier over-the-door pantry organizer turns a door into shelving. It fits doors up to 2 in. thick, needs a door gap of more than 0.06 in. for the hooks, and needs 7.1 in. of clearance behind the door. The total capacity is 26.5 lbs, or 3.31 lbs per basket, which suits spices, snacks, and small jars rather than heavy cans. It can also be screwed to a wall.',
      },
    ],
    faqs: [
      {
        question: 'Which pull-out cabinet organizer fits my cabinet?',
        answer: 'Match the minimum cabinet opening on each product page to the inside of your cabinet opening. For width, that is 14 in. for the 11.5 in. basket, 15.1 in. for the 14 in. basket, 19.3 in. for the 17 in. basket, and 22.3 in. for the 20 in. basket.',
      },
      {
        question: 'Do the pull-out organizers need drilling?',
        answer: 'The chrome wire baskets screw into the cabinet floor. The black steel slide-out drawer mounts with adhesive tape and needs no drilling.',
      },
      {
        question: 'How much can the over-the-door pantry organizer hold?',
        answer: 'It holds 26.5 lbs in total and 3.31 lbs per basket across its 8 baskets.',
      },
    ],
    relatedCategories: ['home-living', 'bags-pouches'],
  },
  'bags-pouches': {
    seoTitle: 'Makeup Bags & Makeup Train Cases - Sesoris',
    seoDescription: 'Shop a large 8-compartment travel makeup bag and an aluminum makeup train case with a mirror at Sesoris. Ships from a US warehouse.',
    intro: 'Bags & Pouches at Sesoris holds two ways to keep cosmetics sorted: a soft travel makeup bag that opens wide, and a hard aluminum train case with fold-out trays and a mirror.',
    sections: [
      {
        heading: 'What is in the Bags & Pouches collection',
        text: 'The Large Travel Makeup Bag is a pink PU leather bag, 11.22 x 7.68 x 5.91 in., with 8 compartments and a wide double zipper. The Aluminum Makeup Train Case is 9.06 x 5.91 x 5.91 in., with accordion trays, a built-in mirror, a lockable latch, and a top handle.',
      },
      {
        heading: 'Soft bag or hard case',
        text: 'A soft bag is lighter, at 0.44 lbs, and squeezes into a suitcase. A hard case, at 2.65 lbs, protects glass bottles and compacts and keeps everything visible on fold-out trays, which suits a vanity or a kit you carry to work.',
      },
    ],
    faqs: [
      {
        question: 'How many compartments does the travel makeup bag have?',
        answer: 'It has 8 compartments and opens wide with a double zipper.',
      },
      {
        question: 'Does the makeup train case lock?',
        answer: 'Yes. It has a lockable latch, a built-in mirror, and a top handle.',
      },
    ],
    relatedCategories: ['outdoor-travel', 'home-living'],
  },
  'outdoor-travel': {
    seoTitle: 'Packing Cubes for Travel - Sesoris',
    seoDescription: 'Shop a 9-piece packing set with 3 mesh-top packing cubes, 3 zip pouches, and 3 storage bags at Sesoris. Ships from a US warehouse.',
    intro: 'Travel & Outdoor at Sesoris holds a 9-piece packing set that splits a suitcase into sections, so clothes stay folded and easy to find.',
    sections: [
      {
        heading: 'What is in the 9-piece packing set',
        text: 'The set has 3 mesh-top packing cubes (large 15.7 x 11.8 x 5.1 in., medium 11.8 x 11.0 x 5.1 in., small 7.9 x 8.3 x 5.1 in.), 3 zip pouches, and 3 frosted storage bags, all in hot pink. The whole set weighs 0.49 lbs.',
      },
      {
        heading: 'How to pack with cubes',
        text: 'Put one category of clothing in each cube, such as tops in the large cube and underwear in the small one, and roll soft items to fit more in. Use the frosted bags for toiletries or worn clothes so they stay separate from clean items.',
      },
    ],
    faqs: [
      {
        question: 'What sizes are the packing cubes?',
        answer: 'Large 15.7 x 11.8 x 5.1 in., medium 11.8 x 11.0 x 5.1 in., and small 7.9 x 8.3 x 5.1 in.',
      },
    ],
    relatedCategories: ['bags-pouches'],
  },
};
