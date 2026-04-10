export interface CategorySEOContent {
  seoTitle: string;
  seoDescription: string;
  intro: string;
  sections: { heading: string; text: string }[];
  relatedCategories: string[];
}

export const categoryContent: Record<string, CategorySEOContent> = {
  'home-living': {
    seoTitle: 'Home & Decor Products | Home Organizers – Sesoris',
    seoDescription: 'Shop 124+ home & decor products at Sesoris — floating shelves, wall organizers, decorative baskets & storage solutions. Free shipping over $50.',
    intro: 'Transform every room in your home with Sesoris Home & Decor collection — 124 carefully curated products designed to bring order, beauty, and functionality to your living spaces. From floating shelves and wall-mounted organizers to decorative storage baskets and display racks, every piece is selected for its quality, durability, and timeless design.',
    sections: [
      {
        heading: 'Home Organization Solutions',
        text: 'A well-organized home starts with the right tools. Our home organization products are designed to maximize your space while keeping aesthetics front and center. From modular shelving systems that adapt to any wall to stackable storage boxes that make the most of closet space, we offer solutions for every corner of your home. Each product is crafted from durable materials — bamboo, metal, wood, and high-quality plastics — that stand the test of time.',
      },
      {
        heading: 'Wall Decor & Display',
        text: 'Your walls are blank canvases waiting to be transformed. Our wall decor and display collection includes floating shelves in various sizes, picture ledges, gallery wall kits, and decorative hooks. Whether you prefer a minimalist Scandinavian look or a warm, eclectic style, you\'ll find wall pieces that express your personality while providing practical storage and display space.',
      },
      {
        heading: 'Storage Baskets & Bins',
        text: 'Storage baskets and bins are the backbone of any organized home. Our collection features woven natural fiber baskets, fabric storage cubes, metal wire bins, and lidded boxes in a range of sizes and colors. Use them in your bedroom to corral accessories, in the bathroom for towels, in the living room for blankets, or in the kids\' room for toys. Every basket in our collection balances style with practicality.',
      },
      {
        heading: 'Why Choose Sesoris for Home Decor',
        text: 'Sesoris curates every product in our Home & Decor collection with one goal: to make your home more livable. We partner with manufacturers who share our commitment to quality and sustainability. Most of our home organizers are made from eco-friendly materials wherever possible. With free shipping on orders over $50 and hassle-free returns, shopping for your home has never been easier.',
      },
    ],
    relatedCategories: ['kitchen-dining', 'personal-care', 'gift-sets'],
  },
  'kitchen-dining': {
    seoTitle: 'Kitchen & Dining Products | Kitchen Storage – Sesoris',
    seoDescription: 'Discover 86+ kitchen & dining essentials at Sesoris — dish racks, storage containers, cutting boards & more. Quality kitchen tools, free shipping over $50.',
    intro: 'Elevate your kitchen and dining experience with Sesoris Kitchen & Dining collection — 86 practical, high-quality products that make meal prep, cooking, and entertaining a pleasure. From premium dish racks and kitchen organizers to elegant serveware and storage containers, we have everything you need to create a functional and beautiful kitchen.',
    sections: [
      {
        heading: 'Kitchen Organization Essentials',
        text: 'An organized kitchen is the foundation of efficient cooking. Our kitchen organization products include counter-top organizers for spices and oils, drawer dividers for utensils, pot and pan racks, and refrigerator organizer bins. Designed with the home cook in mind, these products help you find what you need instantly — so you can focus on the cooking, not the searching.',
      },
      {
        heading: 'Dish Racks & Drying Solutions',
        text: 'Our bestselling dish racks combine smart design with durability. Available in stainless steel, bamboo, and coated metal, they feature separate compartments for plates, bowls, cups, and cutlery. Many models include a draining tray to keep your counter dry. Whether you have a compact studio kitchen or a spacious family home, we have a dish rack that fits perfectly.',
      },
      {
        heading: 'Food Storage & Containers',
        text: 'Reduce food waste and keep your pantry organized with our food storage containers. Our airtight containers come in glass, BPA-free plastic, and stainless steel — suitable for dry goods, leftovers, meal prep, and everything in between. Stackable designs maximize shelf space, and clear materials let you see contents at a glance. All our food containers are dishwasher-safe for easy cleaning.',
      },
      {
        heading: 'Dining & Serveware',
        text: 'From casual weekday dinners to special occasion entertaining, our dining and serveware collection has you covered. Discover serving platters, salad bowls, placemats, table runners, and napkin sets that add a touch of elegance to every meal. Most pieces are designed to be both functional for everyday use and elegant enough for guests — because your table deserves to look its best every day.',
      },
    ],
    relatedCategories: ['home-living', 'tools-gadgets', 'gift-sets'],
  },
  'tools-gadgets': {
    seoTitle: 'Tools & Gadgets | Innovative Everyday Tools – Sesoris',
    seoDescription: 'Browse 67+ innovative tools & gadgets at Sesoris — multi-tools, smart home gadgets, kitchen tools & everyday accessories. Quality built to last.',
    intro: 'Discover tools and gadgets that solve everyday problems with elegance and efficiency. Sesoris Tools & Gadgets collection brings together 67 innovative products — from versatile multi-tools and precision kitchen gadgets to smart home accessories and outdoor gear. Every item is chosen for its build quality, clever design, and genuine usefulness in daily life.',
    sections: [
      {
        heading: 'Multi-Tools & Everyday Carry',
        text: 'The right tool for every situation — that\'s the Sesoris promise. Our multi-tools are built for those who like to be prepared. Featuring stainless steel construction, ergonomic handles, and multiple functions in a compact form factor, they\'re perfect for home repairs, camping, or everyday carry. From pocket knives with bottle openers to folding scissors with rulers, our multi-tools do more with less.',
      },
      {
        heading: 'Smart Kitchen Gadgets',
        text: 'Cook smarter with our selection of innovative kitchen gadgets. Precision timers, avocado slicers, collapsible colanders, digital scales, and herb strippers — these are the tools that professional home cooks rely on to save time and improve results. Made from food-safe materials and designed for intuitive use, our kitchen gadgets make cooking more enjoyable and efficient.',
      },
      {
        heading: 'Home Maintenance & DIY',
        text: 'Keep your home in perfect condition with our home maintenance tools and accessories. Our collection includes precision screwdrivers, level tools, measuring tapes, cable management solutions, and adhesive hooks rated for heavy loads. Whether you\'re hanging a picture frame or organizing your garage, we have the tools that make the job easy — and look good doing it.',
      },
    ],
    relatedCategories: ['home-living', 'tech-accessories', 'kitchen-dining'],
  },
  'gift-sets': {
    seoTitle: 'Gift Sets | Curated Gifts for Any Occasion – Sesoris',
    seoDescription: 'Shop 93+ curated gift sets at Sesoris — perfect for birthdays, housewarmings, holidays & more. Thoughtfully packaged, ready to give. Free shipping over $50.',
    intro: 'Finding the perfect gift has never been easier. Sesoris Gift Sets collection features 93 thoughtfully curated presents for every occasion — birthdays, housewarmings, holidays, weddings, and corporate gifting. Each set is beautifully packaged and arrives ready to gift, saving you the stress of wrapping while ensuring a memorable unboxing experience for the recipient.',
    sections: [
      {
        heading: 'Housewarming Gift Sets',
        text: 'Help a friend or family member settle into their new home with a Sesoris housewarming gift set. Our housewarming collections include premium home organization tools, kitchen essentials, and decorative pieces that any new homeowner will love and actually use. Unlike generic gifts, our sets are practical, lasting, and chosen with care — a reflection of how much you value the relationship.',
      },
      {
        heading: 'Birthday & Celebration Gifts',
        text: 'Make every birthday memorable with a Sesoris gift set. From self-care and wellness collections to kitchen enthusiast bundles and home decor sets, we have something for every personality. Our gift sets are priced for every budget, from thoughtful small gifts to luxurious premium sets. Each comes in premium packaging that makes unwrapping as exciting as the gift itself.',
      },
      {
        heading: 'Corporate & Bulk Gifting',
        text: 'Impress clients, reward employees, or say thank you to your team with Sesoris corporate gift sets. Our professional packaging and high-quality products make a strong impression in any corporate context. We offer bulk pricing for orders of 10 or more sets — contact us for custom packaging and branding options for your corporate gifting program.',
      },
    ],
    relatedCategories: ['personal-care', 'home-living', 'kitchen-dining'],
  },
  'personal-care': {
    seoTitle: 'Personal Care Products | Wellness & Beauty – Sesoris',
    seoDescription: 'Explore 78+ personal care essentials at Sesoris — aromatherapy diffusers, skincare tools, bathroom organizers & wellness accessories. Quality self-care.',
    intro: 'Invest in yourself with Sesoris Personal Care collection — 78 premium products designed to elevate your daily self-care routine. From aromatherapy diffusers and essential oil sets to skincare tools, bath organizers, and wellness accessories, we curate only the best products to help you look, feel, and live better every single day.',
    sections: [
      {
        heading: 'Aromatherapy & Wellness',
        text: 'Transform your home into a personal sanctuary with our aromatherapy collection. Our ultrasonic diffusers disperse essential oils as a fine mist, naturally humidifying your space while filling it with calming, energizing, or uplifting scents. Pair them with our curated essential oil sets for a complete aromatherapy experience. Many of our diffusers double as ambient night lights, making them perfect for bedrooms and meditation spaces.',
      },
      {
        heading: 'Skincare Tools & Accessories',
        text: 'Upgrade your skincare routine with tools that actually work. Our skincare accessories include facial rollers, gua sha stones, silicone cleansing brushes, and LED light therapy devices. Paired with the right skincare products, these tools help improve circulation, reduce puffiness, and enhance product absorption. All our skincare tools are made from dermatologist-approved materials that are safe for all skin types.',
      },
      {
        heading: 'Bathroom Organization',
        text: 'A tidy bathroom is the foundation of a stress-free morning routine. Our bathroom organization products include countertop organizers for skincare products, drawer trays for cosmetics, shower caddies, and toothbrush holders. Made from water-resistant materials and designed for easy cleaning, our bathroom organizers keep your space looking pristine while giving every product a designated home.',
      },
    ],
    relatedCategories: ['home-living', 'gift-sets', 'tech-accessories'],
  },
  'tech-accessories': {
    seoTitle: 'Tech Accessories | Smart Gadgets & Cable Organizers – Sesoris',
    seoDescription: 'Shop 54+ tech accessories at Sesoris — wireless earbuds, charging stations, cable organizers & smart home gadgets. Stay connected and organized.',
    intro: 'Stay connected, organized, and ahead of the curve with Sesoris Tech Accessories collection — 54 smart products for the modern, tech-savvy lifestyle. From high-quality wireless earbuds and multi-device charging stations to cable management solutions and smart home gadgets, we bring you technology that enhances everyday life without the complexity.',
    sections: [
      {
        heading: 'Wireless Audio & Earbuds',
        text: 'Experience music, podcasts, and calls in pristine quality with our wireless audio collection. Our earbuds and headphones feature advanced Bluetooth connectivity, active noise cancellation, and ergonomic designs for all-day comfort. With long battery life and fast charging cases, you\'ll never miss a beat. Whether you\'re commuting, working out, or focusing at your desk, we have the audio solution for you.',
      },
      {
        heading: 'Charging Stations & Power Accessories',
        text: 'Tame your cable chaos with our multi-device charging stations. Charge your phone, tablet, earbuds, and smartwatch simultaneously from a single organized hub. Our charging stations feature USB-A, USB-C, and wireless Qi charging pads, and are compatible with all major device brands. Compact and stylish, they look great on desks and nightstands while keeping everything powered and ready.',
      },
      {
        heading: 'Cable Management & Organization',
        text: 'Say goodbye to tangled cables with our smart cable management solutions. From magnetic cable clips and velcro organizers to cable boxes that hide power strips and excess cord, our products turn cable chaos into clean, organized calm. Designed for desks, entertainment centers, and home offices, these solutions are as practical as they are aesthetically pleasing.',
      },
    ],
    relatedCategories: ['tools-gadgets', 'home-living', 'personal-care'],
  },
};
