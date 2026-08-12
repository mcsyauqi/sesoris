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
  }>;
  buyingSteps: string[];
  recommendations: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

export const comparisonGuides: ComparisonGuide[] = [
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
