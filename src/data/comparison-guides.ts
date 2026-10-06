import { getProductBySlug } from '@/data/products';

export type ComparisonGuide = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  verdict: string;
  criteria: string[];
  options: Array<{
    name: string;
    bestFor: string;
    values: string[];
    /** Catalog slug when the option is a real Sesoris product (product-vs-product guides). */
    productSlug?: string;
  }>;
  buyingSteps: string[];
  recommendations: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
  /** How the comparison was scored. Shown on the page as the method section. */
  method?: string[];
  /** ISO dates (YYYY-MM-DD). Shown on the page and used for Article schema + sitemap lastmod. */
  datePublished?: string;
  dateModified?: string;
};

export const DEFAULT_GUIDE_DATE = '2026-08-12';

function perPieceOf(slug: string, count: number) {
  const product = getProductBySlug(slug);
  if (!product) throw new Error(`comparison-guides: unknown product slug ${slug}`);
  return `${(product.price / count).toFixed(2)}`;
}

/** Live catalog price, so comparison tables never drift from the product data. */
function priceOf(slug: string, units?: { count: number; noun: string }) {
  const product = getProductBySlug(slug);
  if (!product) throw new Error(`comparison-guides: unknown product slug ${slug}`);
  const total = `$${product.price.toFixed(2)}`;
  if (!units) return total;
  return `${total} for ${units.count} (about $${(product.price / units.count).toFixed(2)} per ${units.noun})`;
}

const productComparisonMethod = [
  'Both products in this comparison are sold by Sesoris. Every dimension, weight rating, material, and package count in the table comes from the specification sheet our US-warehouse supplier publishes for that exact product, the same data shown on each product page.',
  'Prices are the current Sesoris prices pulled from the catalog when this page was built. Per-piece prices are the pack price divided by the number of pieces, rounded to the cent.',
  'Durability is described through what the supplier states (material and rated load), not through our own lab testing, because we have not run one. Cleaning and access notes are our reading of the listed construction, for example an open wire floor versus a solid panel.',
  'We update this page when a product, price, or specification changes. The date at the top of the page is the last time the table was checked against the catalog.',
];

export const comparisonGuides: ComparisonGuide[] = [
  {
    slug: 'lidded-boxes-vs-open-front-bins',
    eyebrow: 'Sesoris product comparison',
    title: 'Lidded Storage Boxes vs Open-Front Bins: Two 24-Packs Compared',
    description: 'A side-by-side comparison of two Sesoris 24-packs: clear plastic boxes with snap lids and stackable open-front PP bins, by size, closure, stacking, cleaning, and price per piece.',
    verdict: 'Choose the lidded boxes for tiny loose items that must stay put when a box is turned over, such as beads, earrings, and pins. Choose the open-front bins for parts and supplies you grab many times a day, because you can reach in without lifting a lid or unstacking.',
    criteria: ['Closure', 'Size of each piece', 'Approximate volume per piece', 'Material and build', 'Stacking', 'Access and visibility', 'Ease of cleaning', 'Labeling', 'Sesoris price'],
    options: [
      {
        name: 'Clear Plastic Storage Boxes with Lids, 24 Pack',
        productSlug: 'clear-plastic-storage-boxes-24-pack',
        bestFor: 'Beads, jewelry, craft findings, pins, and clips that must not spill',
        values: [
          'Hinged lid with a snap closure on every box',
          '12 rectangular boxes at 5.11 x 3.14 x 1.18 in. and 12 square boxes at 2.16 x 2.16 x 0.78 in.',
          'About 19 cu in. per rectangular box and about 3.6 cu in. per square box (outer dimensions)',
          'Clear plastic, lids attached to the boxes',
          'Stack flat in a drawer or on a shelf',
          'Clear walls show the contents; the lid has to be opened to reach in',
          'Shallow 1.18 in. depth is easy to wipe out; the hinge adds one more edge to clean',
          'No labels included; the clear plastic is the label',
          priceOf('clear-plastic-storage-boxes-24-pack', { count: 24, noun: 'box' }),
        ],
      },
      {
        name: 'Stackable Storage Bins, 24 Pack',
        productSlug: 'stackable-storage-bins-24-pack',
        bestFor: 'Hardware, office supplies, and small parts you reach for all day',
        values: [
          'No lid; the front is open for reach-in access',
          '24 bins at 5.39 x 4.13 x 3.07 in. outside, 4.21 x 3.39 x 2.68 in. inside',
          'About 38 cu in. per bin (inner dimensions)',
          'PP plastic, full set weighs 3.97 lbs',
          'Stack into columns with the 96 included plastic supports',
          'Open front lets you see and reach the contents without moving the bin above',
          'No lid or hinge; a single open shell that rinses out',
          '48 label papers included',
          priceOf('stackable-storage-bins-24-pack', { count: 24, noun: 'bin' }),
        ],
      },
    ],
    buyingSteps: [
      'Sort what you want to store by size: anything smaller than a fingertip belongs in a closed box.',
      'Decide how often you open each category. Daily items go in open-front bins, occasional items in lidded boxes.',
      'Measure the drawer or shelf. The lidded boxes are 1.18 in. tall, the open bins are 3.07 in. tall.',
      'Plan labels before filling. The open bins ship with 48 labels; clear boxes show their contents instead.',
    ],
    recommendations: [
      { title: 'Choose the lidded boxes if contents are tiny', body: 'Snap lids keep beads, studs, and pins inside when a box is tipped or carried, and two box sizes let you split a collection by type.' },
      { title: 'Choose the open-front bins for speed', body: 'Each bin holds roughly twice the volume of a rectangular lidded box and you can reach in from the front while the bins stay stacked.' },
      { title: 'Use both on one bench', body: 'Many hobby and repair benches run open bins for daily parts and a drawer of lidded boxes for the smallest pieces.' },
    ],
    faqs: [
      { question: 'Which pack is cheaper per piece?', answer: `At current Sesoris prices the lidded boxes work out to ${perPieceOf('clear-plastic-storage-boxes-24-pack', 24)} per box and the open-front bins to ${perPieceOf('stackable-storage-bins-24-pack', 24)} per bin. Each open bin holds about twice the volume of a rectangular lidded box.` },
      { question: 'Can open-front bins hold very small items?', answer: 'They can, but tiny items can spill from the open front if a bin is tipped or pulled out quickly. Keep the smallest pieces in lidded boxes.' },
      { question: 'How did you calculate the volume?', answer: 'Length times width times height from the supplier dimensions. The open bins list inner dimensions, so their figure is usable space. The lidded boxes list only outer dimensions, so their usable space is slightly smaller than the figure shown.' },
    ],
    method: productComparisonMethod,
    datePublished: '2026-10-07',
    dateModified: '2026-10-07',
  },
  {
    slug: 'expandable-vs-fixed-shelving',
    eyebrow: 'Sesoris product comparison',
    title: 'Expandable Cabinet Shelves vs a Fixed 3-Tier Wire Rack',
    description: 'Compare the Sesoris expandable steel cabinet shelves with the fixed-size 3-tier chrome wire rack by width, height, rated load, cleaning, assembly, and price.',
    verdict: 'Choose the expandable shelves when you need to fit an existing cabinet or counter run, because width and height both adjust. Choose the fixed wire rack when you need more load per shelf and a stand-alone unit for a corner, pantry, or closet floor.',
    criteria: ['Width', 'Depth', 'Height', 'Number of shelves', 'Rated load (durability)', 'Material and shelf surface', 'Ease of cleaning', 'Assembly', 'Best placement', 'Sesoris price'],
    options: [
      {
        name: 'Expandable Stacking Cabinet Shelves, Set of 2',
        productSlug: 'expandable-cabinet-shelf-2-tier-black',
        bestFor: 'Inside kitchen cabinets and along counters of uneven width',
        values: [
          'Adjustable from 16 to 25.6 in.',
          '8.7 in.',
          '3.9 to 7.1 in. per shelf in four settings; up to 19.7 in. when stacked',
          '2, used side by side or stacked',
          '22.05 lbs per shelf as rated by the supplier',
          'Black steel frame with flat solid shelf panels',
          'Flat panels wipe clean in one pass and small jars do not tip through',
          'Join the two shelves with the included screws and nuts',
          'Inside a cabinet or on a counter',
          priceOf('expandable-cabinet-shelf-2-tier-black'),
        ],
      },
      {
        name: '3-Tier Wire Shelving Rack, Chrome',
        productSlug: '3-tier-wire-shelving-rack-chrome-12-inch',
        bestFor: 'A stand-alone rack for a pantry corner, laundry room, or closet',
        values: [
          '11.8 in., fixed',
          '11.8 in.',
          '23.6 in. overall, fixed',
          '3',
          '66 lbs per shelf as rated by the supplier',
          'Chrome-finish metal posts and open wire shelves, leveling feet',
          'Open wire lets dust fall through, but each wire needs wiping and small items can tip on the gaps',
          'Shelves lock onto the posts with sleeve connectors by hand, no power tools',
          'Floor, counter, or pantry corner',
          priceOf('3-tier-wire-shelving-rack-chrome-12-inch'),
        ],
      },
    ],
    buyingSteps: [
      'Measure the inside width, depth, and height of the cabinet or the floor spot first.',
      'Add up the heaviest load you plan for one shelf and compare it with the rated load.',
      'Check whether small items like spice jars need a solid surface or can sit on wire.',
      'Decide whether you need a unit that stands alone or one that slots into existing storage.',
    ],
    recommendations: [
      { title: 'Expandable shelves for cabinets', body: 'Width adjusts from 16 to 25.6 in. and height from 3.9 to 7.1 in., so one set can be reconfigured when you move or change what the cabinet holds.' },
      { title: 'Fixed wire rack for heavier loads', body: 'Each wire shelf is rated at 66 lbs, three times the 22.05 lbs per shelf rating of the expandable set, and it stands on its own leveling feet.' },
      { title: 'Watch the depth', body: 'The expandable shelves are 8.7 in. deep and the wire rack is 11.8 in. deep. Measure cabinet depth before choosing, especially for plates.' },
    ],
    faqs: [
      { question: 'Which option holds more weight?', answer: 'The fixed wire rack. The supplier rates each of its three shelves at 66 lbs, compared with 22.05 lbs for each expandable shelf.' },
      { question: 'Will the expandable shelves fit a standard upper cabinet?', answer: 'They fit cabinets at least 16 in. wide and 8.7 in. deep. Height can be set from 3.9 to 7.1 in. per shelf, so measure the space between your existing shelves.' },
      { question: 'Do I need tools to assemble either one?', answer: 'The wire rack goes together by hand. The expandable shelves are joined with the included screws and nuts when you stack them.' },
    ],
    method: productComparisonMethod,
    datePublished: '2026-10-07',
    dateModified: '2026-10-07',
  },
  {
    slug: 'stainless-steel-vs-plastic-corner-shower-shelves',
    eyebrow: 'Sesoris product comparison',
    title: 'Stainless Steel vs Plastic Corner Shower Shelves',
    description: 'Compare two no-drill Sesoris corner shower shelves, one in 304 stainless steel and one in white plastic, by rated load, mounting, drainage, cleaning, extras, and price.',
    verdict: 'Choose the stainless steel caddy for heavier loads, since it is rated for 22 lbs against 8.8 lbs for the plastic shelf. Choose the plastic shelf when you want the two built-in hooks for a loofah or razor and a perforated base you can simply rinse.',
    criteria: ['Material', 'Rated load (durability)', 'Size', 'Mounting', 'Drainage', 'Ease of cleaning', 'Extras', 'Sesoris price'],
    options: [
      {
        name: 'Corner Shower Caddy, Stainless Steel',
        productSlug: 'corner-shower-caddy-silver',
        bestFor: 'Full-size bottles and heavier loads in a tiled corner',
        values: [
          '304 stainless steel, silver finish',
          '22 lbs as rated by the supplier',
          '10.5 in. along each back side',
          '2 adhesive mounting plates, no drilling; wait 24 hours before loading',
          'Open wire floor, water runs straight through',
          'Wipe the wires and the rim; nothing to take apart',
          'None listed',
          priceOf('corner-shower-caddy-silver'),
        ],
      },
      {
        name: 'Adhesive Corner Shower Shelf with 2 Hooks, White',
        productSlug: 'adhesive-corner-shower-shelf-2-hooks-white',
        bestFor: 'Lighter loads and hanging a washcloth, loofah, or razor',
        values: [
          'White plastic',
          '8.8 lbs as rated by the supplier',
          'Quarter-round shelf for a 90 degree corner; side length not listed by the supplier',
          'Adhesive strips on smooth surfaces such as tile, with a locking lever; wait 24 hours before loading',
          'Perforated base with small drain holes and two larger round openings',
          'Rinse with water and wipe dry, as the supplier recommends',
          '2 hooks under the front edge',
          priceOf('adhesive-corner-shower-shelf-2-hooks-white'),
        ],
      },
    ],
    buyingSteps: [
      'Weigh what you plan to store: a full shampoo, conditioner, and body wash set can approach the plastic shelf rating.',
      'Check the wall. Both mount with adhesive, so the tile must be smooth, clean, and dry.',
      'Wait the full 24 hours before loading either shelf.',
      'Decide whether built-in hooks matter for a loofah, washcloth, or razor.',
    ],
    recommendations: [
      { title: 'Stainless steel for capacity', body: 'At 22 lbs rated load it carries two and a half times what the plastic shelf is rated for.' },
      { title: 'Plastic for hooks and quick rinsing', body: 'The two hooks under the front edge and the perforated base make it a tidy spot for a loofah, razor, and a few lighter bottles.' },
      { title: 'Stack two for a tall shower', body: 'Either shelf can be mounted twice at different heights to split bottles from smaller items, as long as each one stays within its rating.' },
    ],
    faqs: [
      { question: 'Which shower shelf holds more?', answer: 'The stainless steel caddy, rated at 22 lbs by the supplier. The plastic shelf is rated at 8.8 lbs.' },
      { question: 'Do I need to drill?', answer: 'No. The steel caddy hangs on two adhesive plates and the plastic shelf uses adhesive strips with a locking lever. Both need 24 hours before loading.' },
      { question: 'Why is bamboo not in this comparison?', answer: 'Sesoris does not currently sell a bamboo shower shelf, and this page only compares products we actually stock with their published specifications.' },
    ],
    method: productComparisonMethod,
    datePublished: '2026-10-07',
    dateModified: '2026-10-07',
  },
  {
    slug: 'shoe-storage-types',
    eyebrow: 'Shoe storage buying guide',
    title: 'Hanging vs Tiered vs Enclosed Shoe Storage',
    description: 'Compare hanging, tiered, and enclosed shoe storage by capacity, footprint, visibility, dust protection, access, and room fit.',
    verdict: 'Choose a tiered rack for the best everyday balance, an enclosed cabinet when visual calm and dust control matter most, or hanging storage when floor space is the binding constraint.',
    criteria: ['Floor footprint', 'Typical capacity', 'Visibility', 'Dust protection', 'Daily access', 'Best room'],
    options: [
      { name: 'Hanging organizer', bestFor: 'Renters and very small closets', values: ['None or minimal', 'Low to medium', 'High', 'Low', 'Fast', 'Closet or entry door'] },
      { name: 'Tiered rack', bestFor: 'Daily family footwear', values: ['Medium', 'Medium to high', 'High', 'Low', 'Fastest', 'Entryway, mudroom, closet'] },
      { name: 'Enclosed cabinet', bestFor: 'Clean-looking shared spaces', values: ['Medium to high', 'Medium', 'Low when closed', 'High', 'Moderate', 'Entryway or bedroom'] },
    ],
    buyingSteps: ['Count the pairs used each week, not every pair you own.', 'Measure width, depth, door swing, and baseboard clearance.', 'Reserve easy-access positions for daily shoes and upper or lower zones for occasional pairs.', 'Choose ventilated construction for frequently worn footwear.'],
    recommendations: [
      { title: 'Best all-around: tiered rack', body: 'Open tiers make pairs easy to see, reduce morning friction, and scale well for households. Use matching trays or a low basket for small accessories.' },
      { title: 'Best for visual calm: enclosed cabinet', body: 'A cabinet hides mismatched footwear and protects it from household dust. Check interior depth for larger sizes before buying.' },
      { title: 'Best for zero floor space: hanging organizer', body: 'Door and closet organizers use otherwise idle vertical space. Confirm door clearance and avoid overloading lightweight hardware.' },
    ],
    faqs: [
      { question: 'Which shoe storage type holds the most pairs?', answer: 'A wide multi-tier rack usually offers the most capacity per dollar, while a tall enclosed cabinet can hold a similar count with a cleaner appearance.' },
      { question: 'Is enclosed shoe storage better for odor control?', answer: 'Not automatically. Enclosed storage controls visual clutter and dust, but it still needs ventilation and dry shoes to prevent trapped moisture and odor.' },
      { question: 'What depth should I measure for shoe storage?', answer: 'Measure the longest footwear in the household and add clearance for doors, heels, and easy removal. Product dimensions should be checked against that real measurement.' },
    ],
  },
  {
    slug: 'storage-box-materials',
    eyebrow: 'Storage box buying guide',
    title: 'Plastic vs Fabric vs Woven Storage Boxes',
    description: 'Compare plastic, fabric, and woven storage boxes by moisture resistance, structure, visibility, weight, appearance, and ideal use.',
    verdict: 'Use plastic for moisture-prone or heavy-duty storage, fabric for lightweight flexible organization, and woven boxes where the container remains visible as part of the room.',
    criteria: ['Moisture resistance', 'Structure', 'Empty weight', 'Contents visibility', 'Appearance', 'Best use'],
    options: [
      { name: 'Plastic box', bestFor: 'Garage, pantry, utility, seasonal storage', values: ['High with a fitted lid', 'Rigid', 'Medium', 'High when clear', 'Practical', 'Stacking and long-term protection'] },
      { name: 'Fabric bin', bestFor: 'Closets, shelves, children’s rooms', values: ['Low', 'Soft to semi-rigid', 'Light', 'Low', 'Soft and coordinated', 'Lightweight categories'] },
      { name: 'Woven basket', bestFor: 'Living rooms and open shelving', values: ['Low to medium by material', 'Semi-rigid', 'Light to medium', 'Low', 'Decorative', 'Visible everyday storage'] },
    ],
    buyingSteps: ['Define whether the box must protect, transport, display, or simply group items.', 'Measure the shelf opening and leave hand clearance above the container.', 'Match the material to humidity and cleaning needs.', 'Use consistent labels even when the box is transparent.'],
    recommendations: [
      { title: 'Best for protection: plastic', body: 'Rigid sides and wipe-clean surfaces suit garages, under-bed zones, and pantry overflow. A fitted lid matters more than decorative detailing.' },
      { title: 'Best for flexible shelving: fabric', body: 'Fabric bins are light and forgiving when shelf dimensions are tight. They work best for linens, toys, cables, and other dry lightweight items.' },
      { title: 'Best for open rooms: woven', body: 'Woven baskets soften visible storage and keep daily objects contained. Add a removable liner when the contents may shed or stain.' },
    ],
    faqs: [
      { question: 'Are clear plastic boxes always better?', answer: 'Clear boxes improve visibility, but opaque boxes can look calmer in shared rooms. Labels can provide fast identification without exposing every item.' },
      { question: 'Can fabric bins be used in a garage?', answer: 'They are a poor fit for damp or dusty garages. Use rigid, lidded, wipe-clean containers when moisture and debris are likely.' },
      { question: 'How do I prevent storage boxes from becoming clutter?', answer: 'Give each box one category, set a capacity limit, label it, and remove an item before adding a new one when the container is full.' },
    ],
  },
  {
    slug: 'kitchen-rack-types',
    eyebrow: 'Kitchen rack buying guide',
    title: 'Wall-Mounted vs Freestanding vs Corner Kitchen Racks',
    description: 'Compare wall-mounted, freestanding, and corner kitchen racks by installation, capacity, counter use, flexibility, access, and cleaning.',
    verdict: 'Choose wall-mounted storage to free counters, freestanding racks for flexible high capacity, and corner racks only when an otherwise awkward corner has reliable reach and clearance.',
    criteria: ['Installation', 'Capacity', 'Counter impact', 'Flexibility', 'Access', 'Cleaning'],
    options: [
      { name: 'Wall-mounted rack', bestFor: 'Small kitchens with sound walls', values: ['Drilling usually required', 'Medium', 'Frees counter space', 'Low after installation', 'Good at eye level', 'Clear surface below'] },
      { name: 'Freestanding rack', bestFor: 'Renters and changing layouts', values: ['None', 'Medium to high', 'Uses floor or counter area', 'High', 'Very good', 'Moveable for cleaning'] },
      { name: 'Corner rack', bestFor: 'Recovering an unused corner', values: ['None or light fixing', 'Low to medium', 'Uses corner footprint', 'Medium', 'Depends on depth', 'Can trap crumbs behind'] },
    ],
    buyingSteps: ['List the items that need to be stored and their combined weight.', 'Measure outlets, backsplash seams, cabinet doors, and appliance ventilation zones.', 'Keep frequently used items between waist and eye level.', 'Leave enough clearance to wipe every surface without dismantling the rack.'],
    recommendations: [
      { title: 'Best for compact kitchens: wall-mounted', body: 'A properly anchored wall rack converts vertical space into storage while keeping the worktop clear. Match anchors to the wall material and expected load.' },
      { title: 'Best for flexibility: freestanding', body: 'Freestanding racks can move with a renter and adapt to pantry, utility, or kitchen duty. Look for adjustable feet and shelf heights.' },
      { title: 'Best as a targeted fix: corner rack', body: 'Corner racks are useful only when the items remain easy to reach. Deep corner shelves can create a second layer of forgotten clutter.' },
    ],
    faqs: [
      { question: 'Which kitchen rack saves the most counter space?', answer: 'A wall-mounted rack saves the most counter space when it is installed safely and does not interfere with cabinets, outlets, or cooking ventilation.' },
      { question: 'Are freestanding kitchen racks safe for heavy appliances?', answer: 'Only when the manufacturer’s load rating, shelf dimensions, stability, and ventilation clearances support that appliance. Heavy items should stay low.' },
      { question: 'How much clearance should a kitchen rack have?', answer: 'Clearance depends on doors, appliances, and the stored items. Measure actual movement paths and follow appliance ventilation instructions.' },
    ],
  },
  {
    slug: 'desk-organizer-capacity',
    eyebrow: 'Desk organizer buying guide',
    title: 'Desk Organizers Compared by Capacity and Cost',
    description: 'Compare trays, drawer units, vertical organizers, and modular systems by capacity, footprint, access, flexibility, and relative cost.',
    verdict: 'Start with a low-cost tray for a few daily tools, choose drawers for many small items, use vertical organizers for paper, and buy modular storage only when your workflow changes often.',
    criteria: ['Capacity', 'Desk footprint', 'Item visibility', 'Access speed', 'Flexibility', 'Relative cost'],
    options: [
      { name: 'Desktop tray', bestFor: 'Minimal daily tools', values: ['Low', 'Low', 'High', 'Fastest', 'Low', 'Low'] },
      { name: 'Drawer organizer', bestFor: 'Many small supplies', values: ['Medium to high', 'Medium', 'Low when closed', 'Fast', 'Medium', 'Medium'] },
      { name: 'Vertical file organizer', bestFor: 'Paper, notebooks, tablets', values: ['Medium', 'Low', 'High', 'Fast', 'Medium', 'Low to medium'] },
      { name: 'Modular system', bestFor: 'Changing creative or technical work', values: ['Scalable', 'Variable', 'Variable', 'Fast after setup', 'Highest', 'Medium to high'] },
    ],
    buyingSteps: ['Clear the desk and return only items used during a normal week.', 'Group tools by action: writing, charging, paper, meetings, and reference.', 'Measure the usable surface after monitor, keyboard, and movement space.', 'Choose the smallest organizer that holds the weekly-use set with room to retrieve items.'],
    recommendations: [
      { title: 'Best budget choice: simple tray', body: 'A tray creates one defined landing zone for a small daily kit. It is inexpensive and makes excess items obvious instead of hiding them.' },
      { title: 'Best for supply-heavy work: drawers', body: 'Shallow labeled drawers separate cables, sticky notes, adapters, and writing tools without consuming the entire work surface.' },
      { title: 'Best long-term flexibility: modular system', body: 'Interlocking modules are useful when projects change. Buy only the modules needed now and expand after observing real friction.' },
    ],
    faqs: [
      { question: 'How large should a desk organizer be?', answer: 'It should fit the tools used in a normal week without reducing keyboard, mouse, writing, or device space. Measure the working zone before shopping.' },
      { question: 'Are drawer organizers better than open trays?', answer: 'Drawers hide visual clutter and separate categories; trays are faster for a small set of frequently used tools. The better option follows the workflow.' },
      { question: 'What should not stay on a desk?', answer: 'Bulk refills, archives, rarely used cables, and unrelated household items should live in nearby storage so the desktop supports current work.' },
    ],
  },
  {
    slug: 'small-home-storage-under-400-square-feet',
    eyebrow: 'Small-home storage guide',
    title: 'How to Choose Storage for a Home Under 400 Square Feet',
    description: 'A practical guide to choosing vertical, hidden, mobile, and modular storage for homes around 400 square feet or less.',
    verdict: 'Prioritize vertical storage first, add hidden storage only for stable categories, use mobile units for flexible rooms, and keep modular systems shallow enough to preserve circulation.',
    criteria: ['Space used', 'Best category', 'Visibility', 'Mobility', 'Installation', 'Main risk'],
    options: [
      { name: 'Vertical wall storage', bestFor: 'Books, decor, kitchen tools', values: ['Wall area', 'Frequently used items', 'High', 'Fixed', 'Anchoring required', 'Overloading or visual noise'] },
      { name: 'Hidden furniture storage', bestFor: 'Linens and occasional items', values: ['Existing furniture volume', 'Stable categories', 'Low', 'Low', 'Usually none', 'Forgotten contents'] },
      { name: 'Mobile cart', bestFor: 'Shared kitchen, work, or hobby zones', values: ['Small floor footprint', 'Active project supplies', 'High', 'High', 'None', 'Blocking circulation'] },
      { name: 'Shallow modular system', bestFor: 'Entry, closet, multipurpose wall', values: ['Wall plus narrow floor zone', 'Mixed categories', 'Medium', 'Medium', 'Varies', 'Growing too deep or wide'] },
    ],
    buyingSteps: ['Draw the circulation path before adding any storage footprint.', 'Measure wall height, door swing, outlet access, and furniture clearances.', 'Assign one stable category to each hidden zone.', 'Prefer shallow pieces and closed backs where items could fall behind furniture.', 'Review the system after two weeks and remove containers that merely store delayed decisions.'],
    recommendations: [
      { title: 'Use height before adding another cabinet', body: 'Wall-mounted shelves and over-door solutions add capacity without narrowing the room. Keep the most-used items in the easiest reach zone.' },
      { title: 'Protect circulation', body: 'A narrow aisle makes even a tidy home feel stressful. Tape the proposed footprint on the floor and test normal movement before buying.' },
      { title: 'Choose containers after categories', body: 'Buying bins first often creates mismatched capacity. Define the category, edit the quantity, measure the destination, and only then choose a container.' },
    ],
    faqs: [
      { question: 'What storage should I buy first for a very small home?', answer: 'Start with the highest-friction daily category and use unused vertical space before adding more floor-standing furniture.' },
      { question: 'Is hidden storage always better in a small home?', answer: 'No. Hidden storage reduces visual noise but can make frequently used items harder to retrieve and easier to forget. Use it for stable, labeled categories.' },
      { question: 'How deep should small-space storage be?', answer: 'It should be only as deep as the stored category requires while preserving doors, walkways, and seating. Measure real objects and circulation before selecting furniture.' },
    ],
  },
];

export function getComparisonGuide(slug: string) {
  return comparisonGuides.find((guide) => guide.slug === slug);
}
