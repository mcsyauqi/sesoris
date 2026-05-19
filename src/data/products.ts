import type { Product, Category, Testimonial, Review } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Home & Decor',
    slug: 'home-living',
    description: 'Quality products for your home',
    image: '/images/products/floating-shelf-hero.webp',
    productCount: 124,
  },
  {
    id: '2',
    name: 'Kitchen & Dining',
    slug: 'kitchen-dining',
    description: 'Essential kitchen supplies',
    image: '/images/products/dish-rack-hero.webp',
    productCount: 86,
  },
  {
    id: '3',
    name: 'Tools & Gadgets',
    slug: 'tools-gadgets',
    description: 'Innovative tools for everyday life',
    image: '/images/products/multi-tool-knife-hero.webp',
    productCount: 67,
  },
  {
    id: '4',
    name: 'Gift Sets',
    slug: 'gift-sets',
    description: 'Perfect gifts for everyone',
    image: '/images/products/premium-gift-box-hero.webp',
    productCount: 93,
  },
  {
    id: '5',
    name: 'Personal Care',
    slug: 'personal-care',
    description: 'Personal care essentials',
    image: '/images/products/aromatherapy-diffuser-hero.webp',
    productCount: 78,
  },
  {
    id: '6',
    name: 'Tech Accessories',
    slug: 'tech-accessories',
    description: 'Smart technology solutions',
    image: '/images/products/wireless-earbuds-hero.webp',
    productCount: 54,
  },
  {
    id: '7',
    name: 'Bags & Pouches',
    slug: 'bags-pouches',
    description: 'Stylish bags, pouches, and carrying solutions for home organization, travel, and everyday use.',
    image: '/images/products/multi-tool-knife-hero.webp',
    productCount: 2,
  },
  {
    id: '8',
    name: 'Office Desk',
    slug: 'office-desk',
    description: 'Desk organizers, lamps, cable tools, and work-from-home accessories for a cleaner workspace.',
    image: '/images/blog/cara-menciptakan-home-office-yang-produktif-panduan-lifestyle-2026-organized-desk.webp',
    productCount: 4,
  },
  {
    id: '9',
    name: 'Outdoor Travel',
    slug: 'outdoor-travel',
    description: 'Travel organizers, outdoor bags, and compact packing gear for cleaner trips and everyday mobility.',
    image: '/images/blog/travel-gear-hero.webp',
    productCount: 4,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Bamboo Desk Organizer',
    slug: 'bamboo-desk-organizer',
    description: 'Keep your desk tidy with this elegant bamboo organizer.',
    fullDescription: `The Bamboo Desk Organizer from Sesoris is the perfect solution for keeping your workspace neat and organized. Made from high-quality, sustainably harvested natural bamboo, this organizer is not only functional but also eco-friendly.

The minimalist design with a natural touch enhances the aesthetics of your workspace. It features various compartments specifically designed to store stationery, smartphones, business cards, and other office supplies.

Every section is finely sanded to ensure there are no rough wood fibers that could damage your belongings. The natural oil finish provides light water resistance while highlighting the beauty of the natural bamboo grain.

This organizer is perfect for home offices, workplaces, or as a gift for colleagues. With proper care, this product will last for years and become even more beautiful over time.`,
    features: [
      'Made from 100% eco-friendly natural bamboo',
      '5 compartments of various sizes',
      'Dedicated smartphone slot with charger cable hole',
      'Water-resistant natural oil finish',
      'Minimalist design suitable for any interior',
      'Anti-slip base for maximum stability',
    ],
    specifications: [
      { label: 'Material', value: 'Natural Bamboo' },
      { label: 'Dimensions', value: '25 x 15 x 12 cm' },
      { label: 'Weight', value: '450 grams' },
      { label: 'Color', value: 'Natural Bamboo' },
      { label: 'Warranty', value: '1 Year' },
    ],
    price: 18.99,
    compareAtPrice: 24.99,
    images: [
      { url: '/images/products/bamboo-desk-organizer-hero.webp', alt: 'Bamboo Desk Organizer front view' },
      { url: '/images/products/bamboo-desk-organizer-closeup.webp', alt: 'Bamboo Desk Organizer on workspace' },
      { url: '/images/products/bamboo-desk-organizer-workspace.webp', alt: 'Bamboo Desk Organizer compartment detail' },
      { url: '/images/products/bamboo-desk-organizer-front-view.webp', alt: 'Bamboo Desk Organizer front view' },
      { url: '/images/products/bamboo-desk-organizer-detail.webp', alt: 'Bamboo Desk Organizer material detail' },
    ],
    category: categories[0],
    rating: 4.7,
    reviewCount: 3,
    inStock: true,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Smart Water Bottle',
    slug: 'smart-water-bottle',
    description: 'Stay hydrated with this smart water bottle that tracks your water intake.',
    fullDescription: `The Smart Water Bottle from Sesoris is the latest innovation in maintaining your hydration health. Equipped with smart sensor technology integrated with a smartphone app, this bottle will remind you to drink water regularly throughout the day.

The built-in LED screen displays real-time water temperature and the amount of water you've consumed. The companion app (available for iOS and Android) allows you to set daily hydration goals based on your weight, activity level, and weather conditions.

Made from food-grade 304 stainless steel with dual vacuum insulation technology, this bottle can keep drinks cold for up to 24 hours or hot for up to 12 hours. The anti-bacterial inner lining ensures your water stays fresh and hygienic.

The ergonomic design with an anti-slip grip makes it easy to carry this bottle anywhere — the gym, office, or outdoors. The secure one-touch lid prevents spills and can be easily opened with one hand.`,
    features: [
      'Smart sensor with Bluetooth connectivity',
      'LED display for temperature and volume',
      'iOS & Android app for hydration tracking',
      'Vacuum insulation maintains temperature for 24 hours',
      'Food-grade 304 stainless steel',
      'Anti-bacterial lining',
      'Spill-proof one-touch lid',
    ],
    specifications: [
      { label: 'Capacity', value: '500ml' },
      { label: 'Material', value: 'Stainless Steel 304' },
      { label: 'Battery', value: 'USB Rechargeable (30 days)' },
      { label: 'Dimensions', value: '7 x 7 x 24 cm' },
      { label: 'Weight', value: '350 grams' },
      { label: 'Connectivity', value: 'Bluetooth 5.0' },
    ],
    price: 21.99,
    images: [
      { url: '/images/products/smart-water-bottle-hero.webp', alt: 'Smart Water Bottle front view' },
      { url: '/images/products/smart-water-bottle-closeup.webp', alt: 'Smart Water Bottle during workout' },
      { url: '/images/products/smart-water-bottle-workout.webp', alt: 'Smart Water Bottle LED screen detail' },
      { url: '/images/products/smart-water-bottle-front-view.webp', alt: 'Smart Water Bottle front view' },
      { url: '/images/products/smart-water-bottle-detail.webp', alt: 'Smart Water Bottle cap detail' },
    ],
    category: categories[1],
    rating: 4.6,
    reviewCount: 24,
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '3',
    name: 'LED Desk Lamp with Wireless Charger',
    slug: 'led-desk-lamp-wireless-charger',
    description: 'Modern LED desk lamp with a built-in wireless charging pad.',
    fullDescription: `The LED Desk Lamp with Wireless Charger is the perfect combination of high-quality lighting and wireless charging convenience. This 2-in-1 product will simplify your workspace while adding a modern touch.

The lamp uses the latest LED technology with 5 color modes (warm white to cool white) and 10 adjustable brightness levels. Eye-care features with flicker-free and anti-glare technology protect your eyes during long work hours.

The 15W fast wireless charger supports all Qi-compatible smartphones, including iPhones and Android flagships. Simply place your smartphone on the lamp base and charging will start automatically.

The 360° flexible neck allows you to direct light to the exact position needed. The memory function remembers your last settings, and the automatic 30/60-minute timer helps save energy. Sensitive touch controls make operation effortless.`,
    features: [
      '5 color modes with 10 brightness levels',
      'Eye-care technology: flicker-free & anti-glare',
      '15W fast wireless charger',
      'Compatible with all Qi smartphones',
      '360° flexible neck',
      'Memory function & auto timer',
      'Sensitive touch control',
      'Additional USB output for wired charging',
    ],
    specifications: [
      { label: 'Lamp Power', value: '10W LED' },
      { label: 'Wireless Charger', value: '15W Max' },
      { label: 'Color Temperature', value: '2700K - 6500K' },
      { label: 'Lumen', value: '800 lm' },
      { label: 'Material', value: 'Aluminium + ABS' },
      { label: 'Dimensions', value: '40 x 15 x 12 cm' },
      { label: 'Input', value: 'DC 24V/1.5A' },
    ],
    price: 31.99,
    images: [
      { url: '/images/products/led-desk-lamp-hero.webp', alt: 'LED Desk Lamp front view' },
      { url: '/images/products/led-desk-lamp-closeup.webp', alt: 'LED Desk Lamp on workspace' },
      { url: '/images/products/led-desk-lamp-ambiance.webp', alt: 'LED Desk Lamp room ambiance' },
      { url: '/images/products/led-desk-lamp-front-view.webp', alt: 'LED Desk Lamp front view' },
      { url: '/images/products/led-desk-lamp-workspace.webp', alt: 'LED Desk Lamp on workspace' },
    ],
    category: categories[5],
    rating: 4.8,
    reviewCount: 31,
    inStock: true,
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Premium Gift Box Set',
    slug: 'premium-gift-box-set',
    description: 'Curated gift box filled with premium self-care items.',
    fullDescription: `The Premium Gift Box Set from Sesoris is the perfect gift choice, combining various high-quality self-care products in one elegant package. Each item is carefully selected to deliver a luxurious relaxation and self-care experience.

This set includes: an aromatherapy scented candle with a soothing lavender-vanilla fragrance (40-hour burn time), an organic bath bomb set (3 pcs with natural ingredients), a premium silk eye mask for quality sleep, and a mini essential oil diffuser with USB power.

All products are packaged in a premium box with matte finishing and satin ribbon. A personalizable greeting card is included for a personal touch. The box uses eco-friendly materials that are recyclable.

Perfect for various occasions: birthdays, anniversaries, Mother's Day, or simply to show appreciation to loved ones. The beautiful packaging means you don't need to wrap it again — it's ready to give.`,
    features: [
      'Aromatherapy scented candle 200g (40-hour burn time)',
      'Organic bath bomb set 3 pcs',
      'Premium silk eye mask',
      'Mini USB essential oil diffuser',
      'Premium gift-ready packaging',
      'Personalizable greeting card',
      'Eco-friendly materials',
    ],
    specifications: [
      { label: 'Package Contents', value: '4 items + greeting card' },
      { label: 'Box Dimensions', value: '30 x 25 x 10 cm' },
      { label: 'Total Weight', value: '1.2 kg' },
      { label: 'Candle Burn Time', value: '40 hours' },
      { label: 'Bath Bomb', value: '3 x 100g' },
      { label: 'Diffuser', value: 'USB powered, 100ml' },
    ],
    price: 37.99,
    compareAtPrice: 49.99,
    images: [
      { url: '/images/products/premium-gift-box-hero.webp', alt: 'Premium Gift Box Set top view' },
      { url: '/images/products/premium-gift-box-closeup.webp', alt: 'Premium Gift Box Set package contents' },
      { url: '/images/products/premium-gift-box-products.webp', alt: 'Premium Gift Box Set self-care products' },
      { url: '/images/products/premium-gift-box-top-view.webp', alt: 'Premium Gift Box Set top view' },
      { url: '/images/products/premium-gift-box-contents.webp', alt: 'Premium Gift Box Set contents' },
    ],
    category: categories[3],
    rating: 4.7,
    reviewCount: 18,
    inStock: true,
    isFeatured: true,
  },
  {
    id: '5',
    name: 'Minimalist Wallet',
    slug: 'minimalist-wallet',
    description: 'Slim and stylish genuine leather wallet with RFID protection.',
    fullDescription: `The Minimalist Wallet from Sesoris is a modern wallet designed for a practical lifestyle. Made from premium full-grain cowhide leather at only 7mm thick when full, this wallet fits comfortably in front or back pockets without creating a bulge.

The RFID blocking technology protects your credit/debit cards from electronic data theft (e-skimming). A special layer inside the wallet blocks RFID signals up to 13.56 MHz, keeping your financial information safe.

The clever design with an elastic card holder provides quick access to frequently used cards. A hidden slot at the back can store folded bills or backup cards. Optimal capacity: 6-8 cards + cash.

Hand-stitched with waxed thread for long-lasting durability. The leather will develop a natural patina over time, giving your wallet a unique character. Available in 3 classic colors: Black, Brown, and Tan.`,
    features: [
      'Premium full-grain cowhide leather',
      'RFID blocking technology',
      'Only 7mm thick',
      'Elastic card holder for quick access',
      'Hidden slot for cash',
      'Hand-stitched with waxed thread',
      'Capacity for 6-8 cards',
    ],
    specifications: [
      { label: 'Material', value: 'Full-grain Leather' },
      { label: 'Dimensions', value: '10.5 x 7.5 x 0.7 cm' },
      { label: 'Weight', value: '45 grams' },
      { label: 'Card Capacity', value: '6-8 cards' },
      { label: 'RFID Protection', value: '13.56 MHz' },
      { label: 'Warranty', value: '2 Years' },
    ],
    price: 24.99,
    images: [
      { url: '/images/products/minimalist-wallet-hero.webp', alt: 'Minimalist Wallet front view' },
      { url: '/images/products/minimalist-wallet-closeup.webp', alt: 'Minimalist Wallet leather material' },
      { url: '/images/products/minimalist-wallet-stitching.webp', alt: 'Minimalist Wallet stitching detail' },
      { url: '/images/products/minimalist-wallet-front-view.webp', alt: 'Minimalist Wallet front view' },
      { url: '/images/products/minimalist-wallet-leather.webp', alt: 'Minimalist Wallet leather texture' },
    ],
    category: categories[4],
    rating: 4.5,
    reviewCount: 42,
    inStock: true,
    isFeatured: true,
  },
  {
    id: '6',
    name: 'Wireless Earbuds Pro',
    slug: 'wireless-earbuds-pro',
    description: 'Premium wireless earbuds with active noise cancellation.',
    fullDescription: `The Wireless Earbuds Pro from Sesoris delivers a premium audio experience with cutting-edge Active Noise Cancellation (ANC) technology. Enjoy your favorite music without distractions, or activate Transparency Mode to stay aware of your surroundings.

The 10mm custom-tuned drivers produce rich, balanced sound with deep yet non-overwhelming bass. AAC and SBC codecs are supported for maximum compatibility with various devices. Low 60ms latency is ideal for gaming and video watching.

The ergonomic design with 3 ear tip sizes (S/M/L) ensures all-day comfort and an optimal seal for the best ANC performance. IPX5 rating protects the earbuds from sweat and light rain.

Battery lasts up to 8 hours per charge with ANC on, or 10 hours with ANC off. The charging case provides an additional 24 hours, totaling 32 hours of playtime. A 10-minute fast charge gives 2 hours of use. Wireless charging compatible.`,
    features: [
      'Active Noise Cancellation (ANC)',
      'Transparency Mode',
      '10mm custom-tuned drivers',
      'Bluetooth 5.2 with 60ms latency',
      'IPX5 water resistant',
      'Touch control on both earbuds',
      '32 hours total playtime',
      'Wireless charging compatible',
      'USB-C fast charging',
    ],
    specifications: [
      { label: 'Driver', value: '10mm Dynamic' },
      { label: 'Bluetooth', value: '5.2' },
      { label: 'Codec', value: 'AAC, SBC' },
      { label: 'Earbuds Battery', value: '8 hours (ANC on)' },
      { label: 'Total Battery', value: '32 hours' },
      { label: 'Water Resistance', value: 'IPX5' },
      { label: 'Weight per Earbud', value: '5.5 grams' },
    ],
    price: 49.99,
    compareAtPrice: 62.99,
    images: [
      { url: '/images/products/wireless-earbuds-hero.webp', alt: 'Wireless Earbuds Pro front view' },
      { url: '/images/products/wireless-earbuds-closeup.webp', alt: 'Wireless Earbuds Pro with case' },
      { url: '/images/products/wireless-earbuds-detail.webp', alt: 'Wireless Earbuds Pro detail' },
      { url: '/images/products/wireless-earbuds-front-view.webp', alt: 'Wireless Earbuds Pro front view' },
      { url: '/images/products/wireless-earbuds-with-case.webp', alt: 'Wireless Earbuds Pro with charging case' },
    ],
    category: categories[5],
    rating: 4.6,
    reviewCount: 28,
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '7',
    name: 'Portable Blender',
    slug: 'portable-blender',
    description: 'Make fresh smoothies anywhere with this portable blender.',
    fullDescription: `The Portable Blender from Sesoris is the perfect companion for an active healthy lifestyle. With a 400ml capacity ideal for a single serving of smoothie, you can take this blender to the gym, office, camping, or anywhere you go.

The powerful 150W motor with 6 stainless steel blades can blend frozen fruit, vegetables, ice cubes, and various other ingredients in seconds. Simply add your ingredients, close the lid, press the button twice, and in 30-40 seconds your smoothie is ready.

The rechargeable 2000mAh lithium battery via USB-C can be used for 15-20 blending cycles per charge. The LED indicator shows battery status and operation. The safety lock ensures the motor won't spin if the lid is not properly secured.

The jar is made from BPA-free Tritan that is food-safe, impact-resistant, and doesn't retain odors. Easy to clean — just fill with water and soap, then run the blender. The leak-proof design allows you to drink directly from the jar or carry it in your bag.`,
    features: [
      '150W motor with 6 stainless steel blades',
      '400ml personal size capacity',
      '2000mAh USB-C rechargeable battery',
      '15-20x blending per charge',
      'BPA-free Tritan jar',
      'Safety lock protection',
      'Leak-proof design',
      'Self-cleaning function',
    ],
    specifications: [
      { label: 'Motor', value: '150W' },
      { label: 'Capacity', value: '400ml' },
      { label: 'Blade', value: '6 Blade Stainless Steel' },
      { label: 'Battery', value: '2000mAh Li-ion' },
      { label: 'Charging', value: 'USB-C (2 hours)' },
      { label: 'Dimensions', value: '8 x 8 x 23 cm' },
      { label: 'Weight', value: '450 grams' },
    ],
    price: 15.99,
    compareAtPrice: 21.99,
    images: [
      { url: '/images/products/portable-blender-hero.webp', alt: 'Portable Blender front view' },
      { url: '/images/products/portable-blender-closeup.webp', alt: 'Portable Blender with smoothie ingredients' },
      { url: '/images/products/portable-blender-smoothie.webp', alt: 'Portable Blender finished smoothie' },
      { url: '/images/products/portable-blender-front-view.webp', alt: 'Portable Blender front view' },
      { url: '/images/products/portable-blender-ingredients.webp', alt: 'Portable Blender with ingredients' },
    ],
    category: categories[1],
    rating: 4.7,
    reviewCount: 35,
    inStock: true,
    isNew: true,
  },
  {
    id: '8',
    name: 'Aromatherapy Diffuser',
    slug: 'aromatherapy-diffuser',
    description: 'Create a relaxing atmosphere with this ultrasonic diffuser.',
    fullDescription: `The Aromatherapy Diffuser from Sesoris uses ultrasonic technology to convert water and essential oils into a fine mist that spreads throughout the room. Enjoy the benefits of aromatherapy without heat that can damage the properties of essential oils.

The 300ml tank can operate for up to 10 hours in low mist mode or 6 hours in high mist mode. Coverage area of up to 30m² makes it ideal for bedrooms, living rooms, or offices. The 1/3/6-hour timer allows you to set the duration according to your needs.

The LED ambient light with 7 changeable or dimmable colors adds a decorative touch. Choose a favorite color or let them cycle gradually for a dynamic atmosphere. A light-only mode is available for use as a night light.

Auto shut-off when the water runs out protects the unit from damage and ensures safety. Whisper-quiet operation below 30dB won't disturb your sleep or work concentration. The elegant wood grain design suits various interior styles.`,
    features: [
      'Heatless ultrasonic technology',
      '300ml tank (6-10 hours of operation)',
      'Coverage area up to 30m²',
      '1/3/6-hour timer',
      '7-color LED ambient light',
      'Auto shut-off waterless protection',
      'Whisper-quiet operation (<30dB)',
      'Wood grain design',
    ],
    specifications: [
      { label: 'Capacity', value: '300ml' },
      { label: 'Coverage', value: '30m²' },
      { label: 'Mist Output', value: '30ml/hour' },
      { label: 'Noise Level', value: '<30dB' },
      { label: 'Power', value: '12W' },
      { label: 'Dimensions', value: '16 x 16 x 12 cm' },
      { label: 'Timer', value: '1/3/6 hours' },
    ],
    price: 20.99,
    images: [
      { url: '/images/products/aromatherapy-diffuser-hero.webp', alt: 'Aromatherapy Diffuser front view' },
      { url: '/images/products/aromatherapy-diffuser-closeup.webp', alt: 'Aromatherapy Diffuser relaxing ambiance' },
      { url: '/images/products/aromatherapy-diffuser-ambiance.webp', alt: 'Aromatherapy Diffuser with candles' },
      { url: '/images/products/aromatherapy-diffuser-front-view.webp', alt: 'Aromatherapy Diffuser front view' },
      { url: '/images/products/aromatherapy-diffuser-candles.webp', alt: 'Aromatherapy Diffuser with candles' },
    ],
    category: categories[4],
    rating: 4.8,
    reviewCount: 22,
    inStock: true,
  },
  {
    id: '9',
    name: 'Ceramic Plant Pot Set',
    slug: 'ceramic-plant-pot-set',
    description: 'Set of 3 modern ceramic plant pots with drainage holes.',
    fullDescription: `The Ceramic Plant Pot Set from Sesoris is a set of 3 plant pots with a modern minimalist design that will beautify your room while providing an optimal environment for your favorite indoor plants.

The set includes 3 pot sizes: Small (12cm), Medium (15cm), and Large (18cm) diameter, suitable for various plant types from succulents to small monsteras. Each pot features a drainage hole at the bottom and a separate saucer to catch excess water.

Made from high-quality ceramic with an elegant matte finish. The clean white color provides a clean and modern look, allowing green plants to be the main focus. Suitable for various interior styles from Scandinavian to industrial.

The high-temperature firing process produces strong and durable ceramic. The smooth glazed surface is easy to clean and does not absorb water. The bamboo saucer adds a natural touch and protects furniture surfaces from water.`,
    features: [
      'Set of 3 pots (Small/Medium/Large)',
      'Drainage hole in every pot',
      'Bamboo saucer included',
      'High-fired quality ceramic',
      'Elegant matte finish',
      'Suitable for various plants',
      'Easy to clean',
    ],
    specifications: [
      { label: 'Small Size', value: '12 x 12 x 10 cm' },
      { label: 'Medium Size', value: '15 x 15 x 13 cm' },
      { label: 'Large Size', value: '18 x 18 x 15 cm' },
      { label: 'Pot Material', value: 'Ceramic' },
      { label: 'Saucer Material', value: 'Bamboo' },
      { label: 'Color', value: 'Matte White' },
      { label: 'Total Weight', value: '2.5 kg' },
    ],
    price: 27.99,
    images: [
      { url: '/images/products/ceramic-plant-pot-hero.webp', alt: 'Ceramic Plant Pot Set front view' },
      { url: '/images/products/ceramic-plant-pot-closeup.webp', alt: 'Ceramic Plant Pot Set with plants' },
      { url: '/images/products/ceramic-plant-pot-room.webp', alt: 'Ceramic Plant Pot Set room setting' },
      { url: '/images/products/ceramic-plant-pot-front-view.webp', alt: 'Ceramic Plant Pot Set front view' },
      { url: '/images/products/ceramic-plant-pot-with-plants.webp', alt: 'Ceramic Plant Pot Set with plants' },
    ],
    category: categories[0],
    rating: 4.6,
    reviewCount: 19,
    inStock: true,
  },
  {
    id: '10',
    name: 'Multi-Tool Pocket Knife',
    slug: 'multi-tool-pocket-knife',
    description: 'Compact multi-tool with 12 essential functions.',
    fullDescription: `The Multi-Tool Pocket Knife from Sesoris is a versatile companion that combines 12 tools in one compact device. From household tasks to outdoor adventures, this multi-tool is ready to help you tackle various jobs.

The 12 available functions include: main blade, small blade, can opener, bottle opener, Phillips screwdriver, flat screwdriver, scissors, file/nail file, saw, awl/leather punch, wire stripper, and keyring hole. Each tool is designed for easy access and one-handed use.

The main blade is made from 420HC stainless steel with 57-59 HRC hardness, offering a balance between sharpness and ease of sharpening. Good edge retention ensures the blade stays sharp after repeated use. The blade lock mechanism prevents accidental closure during use.

The stainless steel body with G10 insets provides a secure grip even when wet. Compact dimensions (9cm closed) and lightweight (140g) make it easy to carry in your pocket or attach to a keychain. A nylon pouch is included for storage and protection.`,
    features: [
      '12 functions in 1 tool',
      'Main blade 420HC stainless steel',
      'Blade lock mechanism',
      'G10 handle grip',
      'One-hand opening',
      'Built-in wire stripper',
      'Nylon pouch included',
      'Compact and lightweight (140g)',
    ],
    specifications: [
      { label: 'Number of Functions', value: '12' },
      { label: 'Blade Material', value: '420HC Stainless Steel' },
      { label: 'Handle Material', value: 'Stainless Steel + G10' },
      { label: 'Closed Length', value: '9 cm' },
      { label: 'Open Length', value: '16 cm' },
      { label: 'Weight', value: '140 grams' },
      { label: 'Blade Hardness', value: '57-59 HRC' },
    ],
    price: 17.99,
    images: [
      { url: '/images/products/multi-tool-knife-hero.webp', alt: 'Multi-Tool Pocket Knife front view' },
      { url: '/images/products/multi-tool-knife-closeup.webp', alt: 'Multi-Tool Pocket Knife all functions' },
      { url: '/images/products/multi-tool-knife-functions.webp', alt: 'Multi-Tool Pocket Knife blade detail' },
      { url: '/images/products/multi-tool-knife-front-view.webp', alt: 'Multi-Tool Pocket Knife front view' },
      { url: '/images/products/multi-tool-knife-blade.webp', alt: 'Multi-Tool Pocket Knife blade close-up' },
    ],
    category: categories[2],
    rating: 4.5,
    reviewCount: 27,
    inStock: true,
    isNew: true,
  },
  {
    id: '11',
    name: 'Foldable Storage Bins',
    slug: 'foldable-storage-bins',
    description: 'Set of 4 foldable fabric storage bins for organizing.',
    fullDescription: `The Foldable Storage Bins from Sesoris are a flexible storage solution that helps you tidy up your home without taking up space. The set contains 4 bins that fold flat when not in use, perfect for limited spaces.

Made from quality non-woven fabric with a reinforced cardboard structure inside, these bins maintain their shape well even when full. Fabric handles on both sides make it easy to move and access the contents inside.

The 30x30x30cm size per bin is ideal for storing various items: clothing, children's toys, books, hobby supplies, or office materials. The universal cube design is suitable for use with popular shelving systems like Kallax.

A transparent label holder on the front allows you to identify contents easily without opening. Available in neutral colors that suit various interiors. Easy to clean with a damp cloth for light stains.`,
    features: [
      'Set of 4 storage bins',
      'Folds flat when not in use',
      'Reinforced cardboard structure',
      'Dual fabric handles',
      'Transparent label holder',
      'Universal size for shelving systems',
      'Quality non-woven fabric',
      'Easy to clean',
    ],
    specifications: [
      { label: 'Contents', value: '4 bins' },
      { label: 'Dimensions per Bin', value: '30 x 30 x 30 cm' },
      { label: 'Folded Dimensions', value: '30 x 30 x 3 cm' },
      { label: 'Material', value: 'Non-woven Fabric + Cardboard' },
      { label: 'Capacity per Bin', value: '27 liters' },
      { label: 'Weight per Bin', value: '200 grams' },
      { label: 'Color', value: 'Gray' },
    ],
    price: 14.99,
    images: [
      { url: '/images/products/storage-bins-hero.webp', alt: 'Foldable Storage Bins front view' },
      { url: '/images/products/storage-bins-closeup.webp', alt: 'Foldable Storage Bins in cabinet' },
      { url: '/images/products/storage-bins-home.webp', alt: 'Foldable Storage Bins home setting' },
      { url: '/images/products/storage-bins-front-view.webp', alt: 'Foldable Storage Bins front view' },
      { url: '/images/products/storage-bins-cabinet.webp', alt: 'Foldable Storage Bins in cabinet' },
    ],
    category: categories[0],
    rating: 4.4,
    reviewCount: 1,
    inStock: true,
  },
  {
    id: '12',
    name: 'Electric Wine Opener',
    slug: 'electric-wine-opener',
    description: 'Open wine bottles effortlessly with this rechargeable opener.',
    fullDescription: `The Electric Wine Opener from Sesoris makes the moment of opening wine elegant and effortless. With a single button press, this electric corkscrew will remove the cork in seconds without any manual effort.

The powerful motor can open up to 80 bottles on a single full charge. The smooth process prevents corks from breaking or crumbling, which often happens with manual openers. Compatible with both natural and synthetic corks of various sizes.

The built-in LED light illuminates the bottle area, making it easy to use in low-light conditions like wine cellars or romantic dinners. The ergonomic design with a stainless steel body provides a comfortable grip and premium appearance.

The complete set includes: electric opener, charging base/stand, foil cutter for removing seals, vacuum wine stopper for preserving unfinished wine, and wine pourer aerator for optimizing wine aroma and flavor. All accessories are neatly stored in an elegant gift box.`,
    features: [
      'Automatic cork removal in 6 seconds',
      'Battery for 80+ bottles per charge',
      'Built-in LED light',
      'Stainless steel body',
      'Charging base included',
      'Free: foil cutter, stopper, pourer',
      'Gift box packaging',
    ],
    specifications: [
      { label: 'Motor', value: 'DC 6V' },
      { label: 'Capacity', value: '80+ bottles/charge' },
      { label: 'Opening Time', value: '6 seconds' },
      { label: 'Material', value: 'Stainless Steel + ABS' },
      { label: 'Battery', value: 'Li-ion Rechargeable' },
      { label: 'Dimensions', value: '5 x 5 x 23 cm' },
      { label: 'Weight', value: '280 grams' },
    ],
    price: 22.99,
    images: [
      { url: '/images/products/wine-opener-hero.webp', alt: 'Electric Wine Opener front view' },
      { url: '/images/products/wine-opener-closeup.webp', alt: 'Electric Wine Opener opening a bottle' },
      { url: '/images/products/wine-opener-accessories.webp', alt: 'Electric Wine Opener with accessories' },
      { url: '/images/products/wine-opener-front-view.webp', alt: 'Electric Wine Opener front view' },
      { url: '/images/products/wine-opener-opening.webp', alt: 'Electric Wine Opener opening a bottle' },
    ],
    category: categories[1],
    rating: 4.7,
    reviewCount: 15,
    inStock: true,
  },
  {
    id: '13',
    name: 'Stainless Steel 2-Tier Dish Rack',
    slug: 'rak-piring-stainless-steel-2-tier',
    description: 'Stainless steel 2-tier dish rack with drip tray, perfect for minimalist kitchens.',
    fullDescription: `The Stainless Steel 2-Tier Dish Rack from Sesoris is the best solution for drying and storing plates, glasses, and other kitchen utensils. Made from food-grade 304 stainless steel that is rust-resistant and easy to clean.

The 2-tier design maximizes vertical space, making it ideal for kitchens with limited countertop area. The upper tier is specifically designed for plates and bowls with vertical slots that keep them upright for quick drying. The lower tier features hooks for glasses and a compartment for cutlery.

The drip tray at the bottom directs water to one side with a drain spout, keeping the countertop dry. Food-grade silicone anti-slip feet ensure the rack stays in place and won't scratch the surface.

Easy to assemble without tools, set up in just 5 minutes. The sturdy structure can hold up to 15 kg. The brushed steel finish provides a modern look that suits various kitchen styles.`,
    features: [
      'Rust-resistant food-grade 304 stainless steel',
      '2 tiers with 20+ plate capacity',
      'Drip tray with drain spout',
      'Hooks for 6 glasses and cutlery compartment',
      'Food-grade silicone anti-slip feet',
      'Tool-free easy assembly in 5 minutes',
    ],
    specifications: [
      { label: 'Material', value: 'Stainless Steel 304' },
      { label: 'Dimensions', value: '42 x 25 x 38 cm' },
      { label: 'Weight', value: '1.8 kg' },
      { label: 'Capacity', value: '20+ plates, 6 glasses' },
      { label: 'Max Load', value: '15 kg' },
      { label: 'Warranty', value: '2 Years' },
    ],
    price: 18.99,
    compareAtPrice: 24.99,
    images: [
      { url: '/images/products/dish-rack-hero.webp', alt: 'Stainless steel 2-tier dish rack front view' },
      { url: '/images/products/dish-rack-closeup.webp', alt: 'Dish rack with plates and glasses' },
      { url: '/images/products/dish-rack-kitchen.webp', alt: 'Dish rack in minimalist kitchen' },
      { url: '/images/products/dish-rack-front-view.webp', alt: 'Dish Rack front view' },
      { url: '/images/products/dish-rack-with-dishes.webp', alt: 'Dish Rack with plates and glasses' },
    ],
    category: categories[1],
    rating: 5.0,
    reviewCount: 2,
    inStock: true,
    isFeatured: true,
    isNew: true,
  },
  {
    id: '14',
    name: 'Minimalist 5-Tier Shoe Rack',
    slug: 'rak-sepatu-minimalis-5-tingkat',
    description: 'Minimalist 5-tier shoe rack that holds up to 15 pairs of shoes with a sturdy steel frame.',
    fullDescription: `The Minimalist 5-Tier Shoe Rack from Sesoris is designed to keep your shoe collection organized and easily accessible. With a capacity of up to 15 pairs of shoes, this rack is the perfect solution for entryways, bedrooms, or closets.

The steel frame with a rust-resistant powder-coated finish ensures long-lasting durability. Each tier is made from breathable non-woven fabric that promotes air circulation, preventing shoes from becoming damp and smelly.

The modular design allows you to adjust the spacing between tiers to accommodate different types of shoes, from flat shoes to boots. The top tier can be set higher for sneakers or heels.

The slim dimensions (60 x 30 cm footprint) make this rack ideal for tight spaces like hallways, behind doors, or room corners. It weighs only 2 kg yet can support a total load of 25 kg. Available in black, white, and gray.`,
    features: [
      '5 tiers holding up to 15 pairs of shoes',
      'Rust-resistant powder-coated steel frame',
      'Breathable fabric for air circulation',
      'Adjustable tier spacing for different shoe types',
      'Slim design with only 60 x 30 cm footprint',
      'Easy assembly without special tools',
    ],
    specifications: [
      { label: 'Material', value: 'Steel + Non-woven Fabric' },
      { label: 'Dimensions', value: '60 x 30 x 90 cm' },
      { label: 'Weight', value: '2 kg' },
      { label: 'Capacity', value: '15 pairs of shoes' },
      { label: 'Max Load', value: '25 kg' },
      { label: 'Color', value: 'Black' },
    ],
    price: 10.99,
    compareAtPrice: 15.99,
    images: [
      { url: '/images/products/shoe-rack-hero.webp', alt: 'Minimalist 5-tier shoe rack' },
      { url: '/images/products/shoe-rack-closeup.webp', alt: 'Shoe rack with various shoes' },
      { url: '/images/products/shoe-rack-entryway.webp', alt: 'Shoe rack in home entryway' },
      { url: '/images/products/shoe-rack-front-view.webp', alt: 'Shoe Rack front view' },
      { url: '/images/products/shoe-rack-with-shoes.webp', alt: 'Shoe Rack with various shoes' },
    ],
    category: categories[0],
    rating: 5.0,
    reviewCount: 1,
    inStock: true,
    isFeatured: true,
    isNew: true,
  },
  {
    id: '15',
    name: 'Floating Wall Shelf Set',
    slug: 'rak-dinding-floating-shelf-set',
    description: 'Set of 3 minimalist floating wall shelves made from solid wood, perfect for decor and storage.',
    fullDescription: `The Floating Wall Shelf Set from Sesoris consists of 3 shelves in different sizes that can be arranged according to your creativity. Made from solid paulownia wood with a natural finish that showcases the beauty of the real wood grain.

The concealed bracket mounting system makes the shelves appear to float on the wall without visible screws. Mounting hardware is included in the package, complete with an installation guide and mini level tool.

Each shelf is 2 cm thick with a finely sanded surface and slightly rounded edges for safety. The water-resistant finish protects against moisture and makes cleaning easy.

Perfect for displaying decorative plants, favorite books, family photos, or decor collections. Each shelf's 5 kg load capacity allows you to safely place various items. This set is available in natural, walnut, and white.`,
    features: [
      'Set of 3 shelves in different sizes (40/50/60 cm)',
      'Solid paulownia wood with natural grain',
      'Concealed bracket - floating appearance',
      'Water-resistant finish',
      'Mounting hardware and mini level included',
      '5 kg capacity per shelf',
    ],
    specifications: [
      { label: 'Material', value: 'Solid Paulownia Wood' },
      { label: 'Size', value: '40/50/60 x 15 x 2 cm' },
      { label: 'Set Weight', value: '1.5 kg' },
      { label: 'Max Load', value: '5 kg per shelf' },
      { label: 'Color', value: 'Natural Wood' },
      { label: 'Package Contents', value: '3 shelves + brackets + screws + level' },
    ],
    price: 15.99,
    images: [
      { url: '/images/products/floating-shelf-hero.webp', alt: 'Floating shelf set on living room wall' },
      { url: '/images/products/floating-shelf-closeup.webp', alt: 'Floating Shelf wood grain edge detail' },
      { url: '/images/products/floating-shelf-detail.webp', alt: 'Floating shelf natural wood detail' },
      { url: '/images/products/floating-shelf-wall.webp', alt: 'Floating Shelf set on wall' },
      { url: '/images/products/floating-shelf-plants.webp', alt: 'Floating Shelf with plant decorations' },
    ],
    category: categories[0],
    rating: 5.0,
    reviewCount: 1,
    inStock: true,
    isNew: true,
  },
  {
    id: '16',
    name: 'Magnetic Wall Key Holder',
    slug: 'gantungan-kunci-dinding-magnetik',
    description: 'Magnetic wall key holder with strong magnets, minimalist design in walnut wood and stainless steel.',
    fullDescription: `The Magnetic Wall Key Holder from Sesoris uses powerful neodymium magnet technology to securely hold your keys. Simply place your keys against the shelf surface, and the magnets will hold them automatically.

The top section functions as a small shelf for placing wallets, sunglasses, or mail. The bottom section features 5 additional hooks for keys without metal rings, masks, or small bags.

Made from a combination of select walnut wood and brushed stainless steel, delivering a premium look perfect for entryways, hallways, or areas near the door. Wall-mounted design with 2 concealed screw points.

N52-grade neodymium magnets — the highest grade — can hold up to 500 grams per point, strong enough for even the heaviest keychains. The wood surface is coated with clear coat for long-lasting protection.`,
    features: [
      'N52 neodymium magnets - highest grade',
      'Top shelf for wallet and accessories',
      '5 additional hooks on the bottom',
      'Walnut wood + brushed stainless steel',
      'Easy installation with 2 concealed screw points',
      'Holds 500g per magnet point',
    ],
    specifications: [
      { label: 'Material', value: 'Walnut Wood + Stainless Steel' },
      { label: 'Dimensions', value: '30 x 8 x 5 cm' },
      { label: 'Weight', value: '350 grams' },
      { label: 'Magnet', value: 'Neodymium N52, 6 points' },
      { label: 'Hooks', value: '5 pieces' },
      { label: 'Warranty', value: '1 Year' },
    ],
    price: 9.99,
    images: [
      { url: '/images/products/key-holder-hero.webp', alt: 'Magnetic wall key holder in walnut' },
      { url: '/images/products/key-holder-with-keys.webp', alt: 'Key holder with keys attached' },
      { url: '/images/products/key-holder-closeup.webp', alt: 'Key holder in home entryway' },
      { url: '/images/products/key-holder-front-view.webp', alt: 'Key Holder front view' },
      { url: '/images/products/key-holder-entryway.webp', alt: 'Key Holder in home entryway' },
    ],
    category: categories[0],
    rating: 5.0,
    reviewCount: 1,
    inStock: true,
    isFeatured: true,
    isNew: true,
  },
  {
    id: '17',
    name: 'Industrial Minimalist Bookshelf',
    slug: 'rak-buku-minimalis-industrial',
    description: 'Industrial-style 4-tier bookshelf with iron frame and pine wood shelves, perfect for offices and living rooms.',
    fullDescription: `The Industrial Minimalist Bookshelf from Sesoris combines timeless industrial style with modern functionality. A matte black hollow iron frame paired with solid pine wood shelves creates an eye-catching visual contrast.

The 4 shelf tiers provide ample space for book collections, decorative plants, photos, and decor. The open-shelf design makes the room feel more spacious compared to closed cabinets, while providing easy access to all items.

The iron frame is precision-welded and coated with rust-resistant powder coating for maximum durability. The pine wood shelves are kiln-dried to prevent warping, then finished with stain and water-resistant clear coat.

The feet feature adjustable levelers for uneven floors. The compact dimensions (80 x 30 cm footprint) make it fit perfectly in office corners, living rooms, or bedrooms. The total load capacity of 40 kg is evenly distributed across 4 tiers.`,
    features: [
      '4 spacious open-shelf tiers for books and decor',
      'Welded matte black hollow iron frame',
      'Kiln-dried solid pine wood shelves',
      'Rust-resistant powder coating',
      'Adjustable feet for uneven floors',
      '40 kg total capacity',
    ],
    specifications: [
      { label: 'Material', value: 'Hollow Iron + Pine Wood' },
      { label: 'Dimensions', value: '80 x 30 x 120 cm' },
      { label: 'Weight', value: '8 kg' },
      { label: 'Levels', value: '4 levels' },
      { label: 'Max Load', value: '40 kg total' },
      { label: 'Warranty', value: '2 Years' },
    ],
    price: 37.99,
    compareAtPrice: 49.99,
    images: [
      { url: '/images/products/bookshelf-hero.webp', alt: 'Industrial Minimalist Bookshelf - product shot' },
      { url: '/images/products/bookshelf-closeup.webp', alt: 'Bookshelf with book collection' },
      { url: '/images/products/bookshelf-living-room.webp', alt: 'Bookshelf in living room' },
      { url: '/images/products/bookshelf-front-view.webp', alt: 'Industrial Bookshelf front view' },
      { url: '/images/products/bookshelf-books.webp', alt: 'Bookshelf with book collection' },
    ],
    category: categories[0],
    rating: 4.6,
    reviewCount: 14,
    inStock: true,
    isNew: true,
  },
  {
    id: '18',
    name: 'Multi-Purpose Storage Pouch',
    slug: 'multi-purpose-storage-pouch',
    description: 'Versatile zippered storage pouch for travel essentials, cables, cosmetics, and everyday organization.',
    fullDescription: `The Multi-Purpose Storage Pouch from Sesoris is the ultimate organizational companion for home, work, and travel. Its durable water-resistant exterior keeps your belongings safe while the roomy interior holds everything from cables and chargers to cosmetics and stationery.

The smooth YKK-style zipper glides effortlessly open and close, even when the pouch is packed full. Inside, an elastic mesh pocket keeps smaller items visible and separated, while the wide main compartment accommodates larger essentials without bulk.

Available in a sleek charcoal grey, this pouch fits neatly into backpacks, tote bags, suitcases, or desk drawers. The slim profile means it never takes up too much space, yet its capacity surprises anyone who opens it.

Whether you're a frequent flyer, a student, or simply someone who values order at home, this storage pouch delivers reliable organization day after day.`,
    features: [
      'Water-resistant nylon exterior',
      'Smooth full-length zipper for easy access',
      'Interior elastic mesh pocket for small items',
      'Wide main compartment fits chargers, cosmetics, stationery',
      'Slim, lightweight design — only 65 grams',
      'Fits in bags, drawers, and suitcase pockets',
    ],
    specifications: [
      { label: 'Material', value: 'Water-Resistant Nylon' },
      { label: 'Dimensions', value: '22 x 14 x 4 cm' },
      { label: 'Weight', value: '65 grams' },
      { label: 'Closure', value: 'Full-Length Zipper' },
      { label: 'Color', value: 'Charcoal Grey' },
      { label: 'Pockets', value: '1 Main + 1 Mesh' },
    ],
    price: 13.99,
    compareAtPrice: 16.99,
    images: [
      { url: '/images/blog/bag-organizer-travel-hero.webp', alt: 'Multi-Purpose Storage Pouch front view' },
      { url: '/images/blog/bag-organizer-travel-section1.webp', alt: 'Storage Pouch interior detail' },
      { url: '/images/blog/bag-organizer-travel-section2.webp', alt: 'Storage Pouch in use' },
    ],
    category: categories[6],
    rating: 4.6,
    reviewCount: 12,
    inStock: true,
    isNew: true,
  },
  {
    id: '19',
    name: 'Canvas Tote Organizer Bag',
    slug: 'canvas-tote-organizer-bag',
    description: 'Spacious eco-friendly canvas tote with multiple interior pockets, perfect for groceries, gym, and everyday use.',
    fullDescription: `The Canvas Tote Organizer Bag from Sesoris combines eco-conscious materials with smart organizational design. Made from 100% natural cotton canvas, this tote is machine-washable, durable, and kinder to the planet than single-use bags.

Inside, you'll find a dedicated interior zip pocket for valuables, two slip pockets for phones or water bottles, and the wide main compartment that easily fits a laptop, groceries, or gym gear. The reinforced base keeps the bag upright even when loaded.

The long parallel handles allow comfortable shoulder carrying, while the extra-wide gusset gives the bag enough depth to hold bulky items without stress on the seams. Corner reinforcements add years of life to heavy-use areas.

Use it as your everyday bag, a reusable grocery tote, a gym bag, or a weekend carry-all. It folds flat when empty for easy storage in a drawer or locker.`,
    features: [
      '100% natural cotton canvas — machine washable',
      'Interior zip pocket + 2 slip pockets',
      'Reinforced base and corner stitching',
      'Extra-wide gusset for bulky loads',
      'Long shoulder handles with comfortable grip',
      'Folds flat for compact storage',
    ],
    specifications: [
      { label: 'Material', value: '100% Cotton Canvas' },
      { label: 'Dimensions', value: '40 x 35 x 15 cm' },
      { label: 'Weight', value: '280 grams' },
      { label: 'Handle Length', value: '60 cm' },
      { label: 'Color', value: 'Natural Canvas' },
      { label: 'Care', value: 'Machine Washable 30°C' },
    ],
    price: 17.99,
    compareAtPrice: 21.99,
    images: [
      { url: '/images/blog/tas-travel-lipat-hero.webp', alt: 'Canvas Tote Organizer Bag front view' },
      { url: '/images/blog/tas-travel-lipat-section1.webp', alt: 'Canvas Tote interior pockets' },
      { url: '/images/blog/tas-travel-lipat-section2.webp', alt: 'Canvas Tote in daily use' },
    ],
    category: categories[6],
    rating: 4.7,
    reviewCount: 19,
    inStock: true,
    isNew: true,
  },
  {
    id: '20',
    name: 'Travel Toiletry Bag',
    slug: 'travel-toiletry-bag',
    description: 'Hanging travel toiletry organizer with waterproof lining, multiple compartments, and hook for easy access.',
    fullDescription: `The Travel Toiletry Bag from Sesoris is engineered for travellers who refuse to compromise on organisation. The full-length hanging hook lets you instantly create a organised grooming station in any bathroom — simply hook it over a door, towel bar, or shower rail.

Inside, a waterproof EVA-lined main compartment protects your toiletries from leaks, while clear PVC panels on the inner door panels keep products visible and accessible. Elastic loops hold bottles of varying sizes securely, preventing tipping during transit.

The exterior features a quick-access front pocket ideal for items you reach for most — toothbrush, razor, hand cream. When not in use, the bag rolls up and clicks closed with two snap buttons, taking up minimal space in your luggage.

TSA-compliant sizing means it's approved for carry-on use. Premium materials throughout — nylon oxford exterior, brass-tone zipper pulls, reinforced stitching — make this bag a travel companion that lasts for years.`,
    features: [
      'Hanging hook for hotel door or towel bar',
      'Waterproof EVA-lined main compartment',
      'Clear PVC inner panels for visibility',
      'Elastic loops for bottles and tubes',
      'Front quick-access pocket',
      'Rolls up and snaps closed for packing',
    ],
    specifications: [
      { label: 'Material', value: 'Nylon Oxford + EVA Lining' },
      { label: 'Dimensions (open)', value: '28 x 20 x 10 cm' },
      { label: 'Dimensions (rolled)', value: '20 x 11 x 6 cm' },
      { label: 'Weight', value: '180 grams' },
      { label: 'Compartments', value: '3 main + 1 front pocket' },
      { label: 'Hook', value: 'Stainless Steel, max 3 kg' },
    ],
    price: 16.99,
    compareAtPrice: 20.99,
    images: [
      { url: '/images/blog/travel-accessories-hero.webp', alt: 'Travel Toiletry Bag hanging open' },
      { url: '/images/blog/travel-accessories-section1.webp', alt: 'Travel Toiletry Bag compartments detail' },
      { url: '/images/blog/travel-accessories-section2.webp', alt: 'Travel Toiletry Bag rolled up' },
    ],
    category: categories[8],
    rating: 4.8,
    reviewCount: 27,
    inStock: true,
    isFeatured: true,
  },
  {
    id: '21',
    name: 'Mesh Zipper Pouches Set',
    slug: 'mesh-zipper-pouches-set',
    description: 'Set of 6 mesh zipper pouches in assorted sizes for cables, stationery, cosmetics, and travel accessories.',
    fullDescription: `The Mesh Zipper Pouches Set from Sesoris gives you six versatile organisers in one convenient bundle — the essential toolkit for anyone who values a clutter-free bag, drawer, or suitcase.

The set includes two large pouches (20 x 14 cm), two medium pouches (16 x 11 cm), and two small pouches (12 x 8 cm). Each features a transparent mesh front that lets you instantly identify contents without opening, and a solid back panel that adds structure and privacy.

Smooth nylon zippers run the full length of each pouch, opening wide for easy access. The mesh material is lightweight yet tear-resistant, and the reinforced zipper ends and seams ensure these pouches survive years of daily use.

Use them to organise cables and adapters, sort makeup and skincare, pack snacks for travel, store craft supplies, or separate documents. Each pouch features a small loop at the zipper pull for easy retrieval from deep bags.`,
    features: [
      'Set of 6: 2 large + 2 medium + 2 small',
      'Transparent mesh front for instant contents visibility',
      'Smooth full-length nylon zipper',
      'Reinforced seams and zipper ends',
      'Lightweight at only 20–40 grams per pouch',
      'Loop at zipper pull for easy retrieval',
    ],
    specifications: [
      { label: 'Set Contents', value: '6 pouches (2L + 2M + 2S)' },
      { label: 'Large Pouch', value: '20 x 14 cm' },
      { label: 'Medium Pouch', value: '16 x 11 cm' },
      { label: 'Small Pouch', value: '12 x 8 cm' },
      { label: 'Material', value: 'Mesh Nylon + Solid Nylon Back' },
      { label: 'Colors', value: 'Navy Blue Set' },
    ],
    price: 12.99,
    compareAtPrice: 15.99,
    images: [
      { url: '/images/blog/packing-cubes-hero.webp', alt: 'Mesh Zipper Pouches Set all 6 pouches' },
      { url: '/images/blog/packing-cubes-section1.webp', alt: 'Mesh Pouches in use for cables' },
      { url: '/images/blog/packing-cubes-section2.webp', alt: 'Mesh Pouch size comparison' },
    ],
    category: categories[8],
    rating: 4.5,
    reviewCount: 34,
    inStock: true,
  },
  {
    id: '22',
    name: 'Hanging Travel Organizer',
    slug: 'hanging-travel-organizer',
    description: 'Multi-pocket hanging travel organizer for clothes, documents, and accessories — perfect for hotels and home closets.',
    fullDescription: `The Hanging Travel Organizer from Sesoris transforms the way you pack and unpack during travel. With 12 compartments across three panels, it provides dedicated spaces for shirts, socks, underwear, documents, chargers, and more — all accessible in seconds by simply hanging it from a closet rod, door hook, or wardrobe rail.

The organizer folds into a compact 35 x 25 cm rectangle secured with two snap buttons, fitting easily into any size suitcase or carry-on. When you arrive at your hotel, unfold it, hang it up, and your entire wardrobe is instantly visible and accessible.

Made from durable 600D polyester with a laminated lining for wipe-clean maintenance, each compartment panel is reinforced at stress points. The top hanger is made from chromed steel rated to hold up to 5 kg fully loaded.

Beyond travel, use it in your bedroom closet to organise seasonal items, scarves, belts, and accessories. The clear-panel compartments let you find what you need without rifling through piles.`,
    features: [
      '12 compartments across 3 hanging panels',
      'Chromed steel hanger rated for 5 kg',
      'Folds to 35 x 25 cm for easy packing',
      'Wipe-clean laminated lining',
      'Reinforced stress points and stitching',
      'Works in hotel closets, door hooks, and home wardrobes',
    ],
    specifications: [
      { label: 'Material', value: '600D Polyester + Laminated Lining' },
      { label: 'Unfolded Size', value: '35 x 120 cm (3 panels)' },
      { label: 'Folded Size', value: '35 x 25 x 4 cm' },
      { label: 'Weight', value: '420 grams' },
      { label: 'Compartments', value: '12 total' },
      { label: 'Hanger', value: 'Chromed Steel, max 5 kg' },
    ],
    price: 22.99,
    compareAtPrice: 27.99,
    images: [
      { url: '/images/blog/perlengkapan-traveling-hero.webp', alt: 'Hanging Travel Organizer fully unfolded' },
      { url: '/images/blog/perlengkapan-traveling-section1.webp', alt: 'Hanging Organizer compartments filled' },
      { url: '/images/blog/perlengkapan-traveling-section2.webp', alt: 'Hanging Organizer folded for packing' },
    ],
    category: categories[8],
    rating: 4.6,
    reviewCount: 21,
    inStock: true,
    isFeatured: true,
  },
  {
    id: '23',
    name: 'Gym Drawstring Bag',
    slug: 'gym-drawstring-bag',
    description: 'Lightweight drawstring gym bag with reinforced base and interior pocket — ideal for sports, school, and casual use.',
    fullDescription: `The Gym Drawstring Bag from Sesoris is the no-fuss carrying solution for those who prefer lightweight practicality. Made from 210D ripstop nylon, it's strong enough for daily gym sessions, school runs, and casual outings, while packing down to almost nothing when empty.

The wide opening with dual-cord drawstring closure makes packing fast and retrieval effortless. The reinforced base is made from tarpaulin material — the same used in outdoor gear — ensuring it stands up to whatever you throw at it, literally and figuratively.

An interior slip pocket provides a safe place for keys, a phone, or small valuables, keeping them separated from sweaty gym clothes or heavy books. Padded corners on the base prevent premature wear on hard floors.

Available in bold cobalt blue, this bag is as much a style statement as it is a utility item. A reflective strip across the back panel adds visibility for early morning and late evening training sessions.`,
    features: [
      '210D ripstop nylon — lightweight and tear-resistant',
      'Tarpaulin-reinforced base for durability',
      'Interior slip pocket for phone and valuables',
      'Dual-cord drawstring closure',
      'Reflective strip for low-light visibility',
      'Packs flat when empty',
    ],
    specifications: [
      { label: 'Material', value: '210D Ripstop Nylon + Tarpaulin Base' },
      { label: 'Dimensions', value: '45 x 35 cm (approximate)' },
      { label: 'Capacity', value: '15 litres' },
      { label: 'Weight', value: '110 grams' },
      { label: 'Closure', value: 'Dual Drawstring Cord' },
      { label: 'Color', value: 'Cobalt Blue' },
    ],
    price: 14.99,
    compareAtPrice: 18.99,
    images: [
      { url: '/images/blog/tas-outdoor-hero.webp', alt: 'Gym Drawstring Bag front view' },
      { url: '/images/blog/tas-outdoor-section1.webp', alt: 'Gym Bag interior pocket' },
      { url: '/images/blog/tas-outdoor-section2.webp', alt: 'Gym Bag in use at the gym' },
    ],
    category: categories[8],
    rating: 4.4,
    reviewCount: 16,
    inStock: true,
    isNew: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'Outstanding product quality! Fast shipping and very helpful customer service. Will definitely order again!',
    rating: 5,
    verified: true,
  },
  {
    id: '2',
    name: 'James K.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'Found the perfect gift for my wife here. Beautiful packaging and the product exceeded expectations.',
    rating: 5,
    verified: true,
  },
  {
    id: '3',
    name: 'Emily R.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: 'Love the product variety. Everything is well curated and reasonably priced.',
    rating: 5,
    verified: true,
  },
];

// ── Product Reviews ──────────────────────────────────────────────────────────
export const reviews: Review[] = [
  // Bamboo Desk Organizer
  {
    id: 'r1', productId: '1', name: 'Rina Dewi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
    rating: 5, title: 'Organizer terbaik yang pernah saya beli!',
    content: 'Materialnya bagus banget, terasa kokoh dan berat yang pas. Sudah 3 bulan dipakai dan tidak ada tanda-tanda rusak. Mejaku sekarang jauh lebih rapi. Sangat worth it untuk harganya!',
    verified: true, date: '2026-03-10', helpful: 12, location: 'Jakarta',
  },
  {
    id: 'r2', productId: '1', name: 'Budi Santoso',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
    rating: 5, title: 'Kualitas premium, pengiriman cepat',
    content: 'Packaging-nya sangat aman, produk sampai dalam kondisi sempurna. Design minimalis cocok banget dengan setup meja kerja saya. Compartment-nya cukup untuk semua stationery.',
    verified: true, date: '2026-03-05', helpful: 8, location: 'Surabaya',
  },
  {
    id: 'r3', productId: '1', name: 'Maya Putri',
    rating: 4, title: 'Bagus, hanya kurang satu slot',
    content: 'Secara keseluruhan sangat puas. Bambu asli, tidak ada bau aneh. Hanya harap ada slot tambahan untuk ruler/penggaris panjang. Tapi untuk harga segini sudah excellent!',
    verified: true, date: '2026-02-28', helpful: 5, location: 'Bandung',
  },
  // Stainless Steel Dish Rack
  {
    id: 'r4', productId: '13', name: 'Sari Indah',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face',
    rating: 5, title: 'Rak piring impian, anti karat!',
    content: 'Sudah pakai 4 bulan, nggak ada karat sama sekali. Beda banget sama rak piring murah yang dulu. Kapasitasnya besar, muat banyak piring sekaligus. Drainagenya juga bagus, air nggak menggenang.',
    verified: true, date: '2026-03-15', helpful: 18, location: 'Jakarta',
  },
  {
    id: 'r5', productId: '13', name: 'Hendri K.',
    rating: 5, title: 'Worth every rupiah!',
    content: 'Istri langsung suka waktu liat produknya. Kelihatan mahal tapi harganya reasonable. Stainless steel tebal, tidak goyang. Pasang juga mudah, tidak perlu alat khusus.',
    verified: true, date: '2026-03-01', helpful: 9, location: 'Medan',
  },
  // Shoe Rack
  {
    id: 'r6', productId: '14', name: 'Tika Rahayu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
    rating: 5, title: 'Solusi terbaik untuk lorong sempit',
    content: 'Apartment saya kecil jadi space sangat terbatas. Rak sepatu ini perfect! 5 tier muat sekitar 20 pasang sepatu. Rakitannya mudah, cukup 15 menit. Bahan kuat tidak goyang.',
    verified: true, date: '2026-03-18', helpful: 14, location: 'Depok',
  },
  // Floating Shelf
  {
    id: 'r7', productId: '15', name: 'Dian Pratiwi',
    rating: 5, title: 'Shelf-nya cantik, tampilannya premium',
    content: 'Dipasang di ruang tamu untuk tempat tanaman dan buku. Hasilnya cantik banget! Kuat, sudah naruh buku-buku tebal + pot tanaman kecil dan tidak ada tanda-tanda melemah. Highly recommended!',
    verified: true, date: '2026-03-12', helpful: 11, location: 'Yogyakarta',
  },
  // Foldable Storage Bins
  {
    id: 'r8', productId: '11', name: 'Anto Wijaya',
    rating: 4, title: 'Praktis untuk storage kamar',
    content: 'Suka banget karena bisa dilipat kalau tidak dipakai. Materialnya cukup kuat untuk menyimpan baju-baju. Warnanya juga netral, cocok sama desain kamar. Pengiriman cepat dan aman.',
    verified: true, date: '2026-02-20', helpful: 7, location: 'Semarang',
  },
  // Wireless Earbuds Pro
  {
    id: 'r10', productId: '6', name: 'Rizky Firmansyah',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    rating: 5, title: 'ANC-nya luar biasa, worth every penny!',
    content: 'Sudah coba banyak earbuds di range harga ini, tapi yang ini juara. ANC-nya benar-benar efektif, suara luar ruangan bisa diredam sampai 70%. Suara bass-nya dalam tapi tidak boomy. Battery 32 jam total beneran terbukti, sudah saya pakai 2 minggu setiap hari. Highly recommended!',
    verified: true, date: '2026-03-20', helpful: 23, location: 'Jakarta',
  },
  {
    id: 'r11', productId: '6', name: 'Cindy Octaviani',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face',
    rating: 4, title: 'Kualitas premium, konektivitas stabil',
    content: 'Bluetooth 5.2-nya benar-benar stabil, tidak pernah putus-putus walau HP di kantong. Transparency mode-nya juga berguna banget waktu di jalan. Minus sedikit: touch control kadang perlu dua kali tap. Tapi overall sangat puas untuk harganya.',
    verified: true, date: '2026-03-14', helpful: 15, location: 'Bandung',
  },
  // Magnetic Key Holder
  {
    id: 'r9', productId: '16', name: 'Ayu Lestari',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    rating: 5, title: 'No more "di mana kunci??"',
    content: 'Kelihatannya simple tapi life-changing! Tidak pernah lagi kehilangan kunci karena sekarang ada tempat permanen-nya. Magnetnya kuat, bisa nempel kunci + gantungan yang lumayan berat.',
    verified: true, date: '2026-03-08', helpful: 16, location: 'Tangerang',
  },
];

export const getReviewsByProductId = (productId: string) =>
  reviews.filter((r) => r.productId === productId);

export const getAverageRating = (productId: string) => {
  const productReviews = getReviewsByProductId(productId);
  if (!productReviews.length) return 0;
  return productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
};

export const getFeaturedProducts = () => products.filter((p) => p.isFeatured);
export const getNewArrivals = () => products.filter((p) => p.isNew);
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (categorySlug: string) =>
  categorySlug === 'office-desk'
    ? products.filter((p) => ['1', '3', '6', '16'].includes(p.id))
    : products.filter((p) => p.category.slug === categorySlug);
export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
