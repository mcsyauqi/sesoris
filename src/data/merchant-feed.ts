/**
 * Google Merchant Center feed overrides, keyed by product slug.
 * Served by src/app/merchant-feed.xml/route.ts.
 *
 * title: written the way shoppers phrase the need (product type first, then size,
 *   material, count, colour). Every attribute is taken from the product's own
 *   name, description or specifications in products.ts; nothing is added that the
 *   product page does not say. Max 150 characters (Merchant Center limit).
 * image: a cleaner main image when images[0] carries text overlays, which Merchant
 *   Center flags. Either an index into product.images or a path under /images/merchant
 *   (a crop of an existing product image with the overlay strip removed).
 *
 * A product without an entry falls back to product.name and images[0].
 */
export interface MerchantOverride {
  title: string;
  image?: number | string;
}

export const merchantOverrides: Record<string, MerchantOverride> = {
  'pull-out-cabinet-organizer-14-inch': { title: 'Pull-Out Cabinet Organizer for Kitchen Base Cabinets, 14 in. Wide Sliding Chrome Wire Basket with Liner' },
  'pull-out-cabinet-organizer-20-inch': { title: 'Pull-Out Cabinet Organizer for Deep Kitchen and Pantry Cabinets, 20 in. Wide Sliding Chrome Basket, Ball-Bearing Rails' },
  'slide-out-cabinet-drawer-black': { title: 'Slide-Out Cabinet Drawer, No-Drill Adhesive Mount, Black Steel, 11.8 x 16.9 in., Holds 55 lbs' },
  'pull-out-cabinet-organizer-17-inch': { title: 'Pull-Out Cabinet Organizer for Deep Base Cabinets, 17 in. Wide Sliding Chrome Wire Basket, Extends to 41.8 in.' },
  'over-the-door-pantry-organizer-8-tier': { title: 'Over-the-Door Pantry Organizer with 8 Adjustable Wire Baskets, Black Steel, Door or Wall Mount' },
  'bamboo-bread-box-double-layer': { title: 'Double-Layer Bamboo Bread Box for Kitchen Counter with Cutting Board and Bread Knife' },
  'travel-makeup-bag-large': { title: 'Large Travel Makeup Bag with 8 Compartments and Brush Slot, Pink PU Leather, Double Zipper' },
  'pull-out-cabinet-organizer-11-5-inch': { title: 'Narrow Pull-Out Cabinet Organizer for Slim Base and Under-Sink Cabinets, 11.5 in. Wide Chrome Basket' },
  'stackable-storage-bins-24-pack': { title: 'Stackable Storage Bins for Small Parts, 24 Pack Open-Front Plastic Bins with Labels, Blue and Red' },
  'aluminum-makeup-train-case': { title: 'Aluminum Makeup Train Case with Mirror, Fold-Out Trays and Lockable Latch, Silver' },
  'corner-shower-caddy-silver': { title: 'Corner Shower Caddy, No-Drill Adhesive Mount, 304 Stainless Steel, Silver' },
  'packing-cubes-9-piece-set': { title: 'Packing Cubes for Suitcase Travel, 9-Piece Set with Zip Pouches and Storage Bags, Hot Pink' },
  'pull-out-under-sink-organizer-2-tier-black': { title: '2-Tier Pull-Out Under-Sink Organizer with Sliding Basket, Black Steel' },
  'over-the-door-shoe-rack-12-tier-white': { title: 'Over-the-Door Shoe Rack, 12 Tiers Holds 36 Pairs, White Steel, 72.8 in. Tall' },
  'freestanding-garment-rack-shelves-white': { title: 'Freestanding Clothes Rack with Fabric Shelves, 2 Hanging Rods and Side Hooks, White, 66 in. Tall' },
  'toilet-paper-holder-with-shelf-black': { title: 'Toilet Paper Holder with Phone Shelf, Matte Black Stainless Steel, Fits Mega Rolls' },
  'zippered-travel-document-organizer-silver-gray': { title: 'Travel Document Organizer for Passport, Cards and Tickets, Zippered with 12 Pockets, Silver Gray' },
  'ribbed-glass-jar-wooden-lid': { title: 'Ribbed Glass Storage Jar with Wooden Lid for Coffee Beans, Candy and Snacks, Borosilicate Glass' },
  '12-slot-watch-box-clear-lid-black': { title: '12-Slot Watch Box Organizer with Clear Window Lid, Black Leather-Look Case, Cushioned Slots' },
  'clear-travel-toiletry-bottle-set-7-piece': { title: 'Travel Size Toiletry Bottles Set, 7 Pieces with Silicone Squeeze Bottles, Spray Bottle and Clear Pouch' },
  '3-tier-wire-shelving-rack-chrome-12-inch': { title: '3-Tier Wire Shelving Rack, Small Chrome Metal Shelf, 11.8 x 11.8 x 23.6 in., 66 lbs per Shelf' },
  'pull-out-spice-rack-2-tier-4-inch': { title: 'Pull-Out Spice Rack for Narrow Cabinets, 2-Tier Chrome Steel, 4.33 in. Wide' },
  'adhesive-corner-shower-shelf-2-hooks-white': { title: 'Adhesive Corner Shower Shelf with 2 Hooks, No-Drill, White Plastic, Holds 8.8 lbs' },
  '4-tier-corner-wire-shelf-silver': { title: '4-Tier Corner Wire Shelf for 90 Degree Corners, Silver Steel, 35.4 in. Tall' },
  'clear-plastic-storage-boxes-24-pack': { title: 'Small Clear Plastic Storage Boxes with Lids, 24 Pack for Beads, Craft Supplies and Jewelry' },
  'double-zip-pu-leather-makeup-bag-pink': { title: 'Double-Zip Makeup Bag with Two Compartments and Handles, Pink PU Leather, 11.1 in.' },
  'hanging-wall-organizer-3-pocket-yellow': { title: 'Hanging Wall Organizer with 3 Pockets, Yellow Linen-Cotton Fabric on Wooden Rod' },
  'sink-caddy-removable-brush-holder-9-inch-black': { title: 'Kitchen Sink Caddy with Removable Brush Holder and Drain Spout Tray, Black Metal, 9.1 in.' },
  'under-bed-shoe-storage-box-16-compartments': { title: 'Under-Bed Shoe Storage Box with 16 Compartments and Clear Lid, Gray Fabric' },
  '10-tier-shoe-rack-black': { title: '10-Tier Tall Narrow Shoe Rack, Black Fabric Shelves on Steel Frame, 60 in. Tall' },
  'silicone-makeup-brush-holder-pink': { title: 'Silicone Travel Makeup Brush Holder with Sponge Case, Pink' },
  'makeup-bag-brush-slots-dividers-pink': { title: 'Makeup Bag with Brush Slots and Adjustable Dividers, Pink Oxford Cloth', image: 2 },
  'black-mesh-makeup-bag-top-handle': { title: 'See-Through Black Mesh Makeup Bag with Top Handle and Gold-Tone Zipper' },
  'stackable-egg-holders-18-eggs-set-of-2': { title: 'Egg Holder for Refrigerator, Stackable with Lids, Holds 18 Eggs Each, Set of 2, Clear Plastic' },
  'purse-organizer-insert-13-pockets-blue': { title: 'Purse Organizer Insert for Handbags with 13 Pockets and Handles, Blue Nylon' },
  'round-acrylic-desk-organizer-4-compartment': { title: 'Round Acrylic Desk Organizer for Pens and Office Supplies, 4 Compartments, Clear with Gold-Tone Handle' },
  'stackable-water-bottle-organizer-4-tier': { title: 'Stackable Water Bottle Organizer Rack, 4 Tiers Holds 12 Bottles, Clear Plastic' },
  'over-the-door-shoe-organizer-24-pocket': { title: 'Over-the-Door Shoe Organizer with 24 Clear Pockets and Metal Hooks, White' },
  'expandable-cabinet-shelf-2-tier-black': { title: 'Expandable Kitchen Cabinet Shelf Organizer, Stackable 2-Tier, Set of 2, Black Steel, 16 to 25.6 in. Wide' },
  'three-section-pu-leather-toiletry-bag-white': { title: 'Three-Section Toiletry and Makeup Bag with Side Handle, White PU Leather' },
  'folding-storage-cabinet-4-tier-wheels-small': { title: 'Folding Storage Cabinet with Wheels and Magnetic Doors, 4 Tiers, 76 Qt, Beige' },
  'over-sink-dish-rack-covered-25-6-inch': { title: 'Over-the-Sink Dish Drying Rack with Covered Top Tier, 2 Tiers, 25.6 in. Wide, Black Steel', image: 1 },
  'sink-caddy-brush-holder-drain-spout-black': { title: 'Kitchen Sink Caddy with Brush Holder and Swivel Drain Spout, Black Metal' },
  '90l-clothes-storage-bags-navy-2-pack': { title: 'Clothes Storage Bags with Clear Window, 90L, Set of 2, Navy Fabric with Zippered Lid' },
  'mesh-desk-drawer-organizer-4-piece-black': { title: 'Desk Drawer Organizer Trays, 4-Piece Black Steel Mesh Set' },
  'compression-bedding-storage-bag-medium-gray': { title: 'Compression Storage Bag for Comforters and Bedding, Medium, Gray Nylon' },
  'swivel-cabinet-spice-rack-20-bottles-white': { title: 'Swivel Spice Rack for Cabinets, Pull-Out 2-Tier Organizer Holds 20 Bottles, White' },
  'diatomaceous-earth-sink-tray-white': { title: 'Diatomaceous Earth Sink Tray for Soap and Toothbrushes, Absorbent Diatomite, White Marble Look', image: '/images/merchant/diatomaceous-earth-sink-tray-white.webp' },
  'portable-closet-wardrobe-gray-58-inch': { title: 'Portable Closet Wardrobe with Cover and Hanging Rod, 12 Shelves, Gray, 58 x 17 x 69 in.' },
  'rotating-makeup-organizer-3-tier-green': { title: 'Rotating Makeup Organizer, 3-Tier 360 Degree Spinning Trays, Green with Gold-Tone Rods', image: 2 },
  'foldable-narrow-shoe-rack-6-tier': { title: '6-Tier Foldable Narrow Shoe Rack, Collapsible, White and Gray, 36.6 in. Tall' },
  '9-tier-narrow-shoe-rack-white-mint': { title: '9-Tier Narrow Shoe Rack for Entryways and Corners, Plastic, White and Mint, 50.6 in. Tall' },
  'mesh-desk-organizer-9-compartment-green': { title: 'Mesh Desk Organizer with Drawer, 9 Compartments, Lime Green Metal' },
  'foldable-laundry-hamper-with-lid-brown': { title: 'Foldable Laundry Hamper with Lid and Handles, Brown Linen-Look Fabric, 24.8 in. Tall' },
  'adjustable-monitor-riser-black': { title: 'Monitor Stand Riser for Desk with 3 Adjustable Heights, Black Metal, Holds 44 lbs', image: '/images/merchant/adjustable-monitor-riser-black.webp' },
  'rolling-egg-holder-double-layer-36': { title: 'Rolling Egg Holder for Refrigerator, Double-Layer Dispenser Holds 36 Eggs, Transparent Brown' },
};
