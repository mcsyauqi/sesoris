export interface CategorySEOContent {
  seoTitle: string;
  seoDescription: string;
  intro: string;
  sections: { heading: string; text: string }[];
  relatedCategories: string[];
}

export const categoryContent: Record<string, CategorySEOContent> = {
  'home-living': {
    seoTitle: 'Home & Decor Products | Home Organizers - Sesoris',
    seoDescription: 'Shop curated home and decor products at Sesoris, from wall shelves and organizers to decorative baskets and storage solutions. Free shipping on orders over $50.',
    intro: 'Tidy up every corner of your home with the Sesoris Home & Decor collection. Discover curated products that help your space feel more organized, beautiful, and functional, from wall shelves and mounted organizers to decorative baskets and display shelves.',
    sections: [
      {
        heading: 'Home Organizer Solutions',
        text: 'A tidy home starts with the right storage tools. Sesoris organizer products help you maximize space without sacrificing style. Choose modular shelving, stackable storage boxes, baskets, and multi-purpose organizers for the bedroom, living room, kitchen, or workspace.',
      },
      {
        heading: 'Wall Decor & Display',
        text: 'Your walls can double as both storage and decor. This collection includes floating shelves, picture ledges, decorative hooks, and display shelves in a range of sizes to fit minimalist, warm, or modern home styles.',
      },
      {
        heading: 'Baskets & Storage Bins',
        text: 'Baskets and storage bins keep small items easy to find. Use them for bedroom accessories, towels, blankets, kids toys, bath essentials, or household stock. Each product is chosen to stay practical while still looking great.',
      },
      {
        heading: 'Why Choose Sesoris for Home Decor',
        text: 'Sesoris curates home products based on function, material, durability, and design. The goal is simple: make your home more comfortable to live in with products that are easy to use every day. Enjoy free shipping on orders over $50.',
      },
    ],
    relatedCategories: ['kitchen-dining', 'personal-care', 'gift-sets'],
  },
  'kitchen-dining': {
    seoTitle: 'Kitchen & Dining Products | Kitchen Storage - Sesoris',
    seoDescription: 'Discover curated kitchen and dining essentials at Sesoris, from dish racks and food containers to cutting boards, spice organizers, and serving tools.',
    intro: 'Make your kitchen tidier and cooking more comfortable with the Sesoris Kitchen & Dining collection. Choose practical products for meal prep, ingredient storage, dish drying, and everyday dining needs.',
    sections: [
      {
        heading: 'Everyday Kitchen Organizers',
        text: 'A well-organized kitchen makes cooking faster. This collection includes spice organizers, drawer dividers, pot racks, dish racks, and fridge storage containers so every item has a clear place.',
      },
      {
        heading: 'Dish Racks & Drying',
        text: 'Sesoris dish racks combine a compact design with durable materials. Some models feature separate areas for plates, bowls, glasses, and cutlery, complete with a drip tray to keep your counter clean.',
      },
      {
        heading: 'Food Containers',
        text: 'Food containers help your pantry stay fresh and organized. Choose airtight containers in glass, BPA-free plastic, or stainless steel for dry goods, leftovers, and meal prep.',
      },
      {
        heading: 'Dining & Serving Essentials',
        text: 'For everyday meals or family gatherings, Sesoris offers serving tools, bowls, placemats, table runners, and table accessories that stay functional and look great in use.',
      },
    ],
    relatedCategories: ['home-living', 'tools-gadgets', 'gift-sets'],
  },
  'tools-gadgets': {
    seoTitle: 'Tools & Gadgets | Practical Everyday Essentials - Sesoris',
    seoDescription: 'Shop curated practical tools and everyday gadgets at Sesoris, including multi-tools, kitchen gadgets, smart home accessories, and outdoor essentials.',
    intro: 'The Sesoris Tools & Gadgets collection features curated products that make everyday problems easier to solve. Discover multi-tools, kitchen gadgets, home maintenance tools, and compact, useful outdoor accessories.',
    sections: [
      {
        heading: 'Multi-Tool & Everyday Carry',
        text: 'Multi-tools are ideal for anyone who wants to always be prepared. Sesoris curated products use sturdy materials, a compact shape, and practical functions for light repairs, camping, travel, or everyday needs.',
      },
      {
        heading: 'Practical Kitchen Gadgets',
        text: 'Cook more efficiently with kitchen tools like timers, digital scales, collapsible strainers, slicers, and other small accessories that save time without cluttering your kitchen.',
      },
      {
        heading: 'Home Maintenance & DIY',
        text: 'Equip your home with precision screwdrivers, tape measures, level tools, cable management, and multi-purpose hooks. These products make small home jobs quick and tidy to finish.',
      },
    ],
    relatedCategories: ['home-living', 'tech-accessories', 'kitchen-dining'],
  },
  'gift-sets': {
    seoTitle: 'Gift Sets | Curated Gifts for Every Occasion - Sesoris',
    seoDescription: 'Shop Sesoris gift sets for birthdays, housewarmings, holidays, wedding gifts, and corporate gifting. Ready to give with tidy packaging.',
    intro: 'Finding the perfect gift is easier with the Sesoris Gift Sets collection. Curated gift picks for birthdays, new homes, holidays, weddings, and corporate gifting needs.',
    sections: [
      {
        heading: 'New Home Gift Sets',
        text: 'Help a friend or family member set up their new home with gift sets that include organizers, kitchen essentials, and practical decor they can actually use every day.',
      },
      {
        heading: 'Birthday & Celebration Gifts',
        text: 'Choose self-care sets, kitchen essentials, home decor, or practical accessories that match the recipient. Every set is put together to feel personal and easy to give.',
      },
      {
        heading: 'Corporate & Bulk Gifting',
        text: 'For clients, employees, or business partners, Sesoris offers bulk purchase options. Contact our team for product recommendations, packaging options, and branding needs.',
      },
    ],
    relatedCategories: ['personal-care', 'home-living', 'kitchen-dining'],
  },
  'personal-care': {
    seoTitle: 'Personal Care Products | Wellness & Beauty - Sesoris',
    seoDescription: 'Discover curated personal care products at Sesoris, including aromatherapy diffusers, skincare tools, bathroom organizers, and wellness accessories.',
    intro: 'The Sesoris Personal Care collection features curated products for a more comfortable self-care routine. Discover aromatherapy diffusers, skincare tools, bathroom organizers, and everyday wellness accessories.',
    sections: [
      {
        heading: 'Aromatherapy & Wellness',
        text: 'Create a calmer atmosphere at home with ultrasonic diffusers and aromatherapy accessories. These products gently disperse scent without excess heat.',
      },
      {
        heading: 'Skincare Tools & Accessories',
        text: 'Round out your skincare routine with facial rollers, gua sha tools, cleansing brushes, and other easy-to-use accessories. Each product is chosen based on material and comfort of use.',
      },
      {
        heading: 'Bathroom Organizers',
        text: 'Bathroom organizers keep skincare, cosmetics, toothbrushes, hand towels, and bath essentials neatly in place. Water-resistant, easy-to-clean materials make them ideal for daily use.',
      },
    ],
    relatedCategories: ['home-living', 'gift-sets', 'tech-accessories'],
  },
  'tech-accessories': {
    seoTitle: 'Tech Accessories | Gadgets & Cable Organizers - Sesoris',
    seoDescription: 'Shop curated tech accessories at Sesoris, from earbuds and charging stations to cable organizers and smart home gadgets.',
    intro: 'Stay productive and organized with the Sesoris Tech Accessories collection. Curated products for a modern lifestyle, from wireless earbuds and charging stations to cable organizers and smart home gadgets.',
    sections: [
      {
        heading: 'Wireless Audio & Earbuds',
        text: 'Enjoy music, podcasts, and calls with comfortable, curated earbuds or headphones. Many products offer a stable connection, long battery life, and a compact design.',
      },
      {
        heading: 'Charging Station & Power Accessories',
        text: 'Cut down on cable clutter with a multi-device charging station. These products let you charge your phone, tablet, earbuds, and smartwatch from one tidy spot.',
      },
      {
        heading: 'Cable Organizers',
        text: 'Use cable clips, velcro organizers, cable boxes, and other cable-management accessories for your desk, TV stand, bedroom, or home office to keep the space looking clean.',
      },
    ],
    relatedCategories: ['tools-gadgets', 'home-living', 'personal-care'],
  },
  'bags-pouches': {
    seoTitle: 'Bags & Pouches | Travel & Storage Organizers - Sesoris',
    seoDescription: 'Shop bags, pouches, and carry organizers at Sesoris, including travel pouches, tote bags, storage pouches, and everyday essentials organizers.',
    intro: 'Stay organized at home, at the office, or on the road with the Sesoris Bags & Pouches collection. Choose mesh pouches, travel organizers, canvas totes, and toiletry bags to keep small items easy to find.',
    sections: [
      {
        heading: 'Travel Organizer Bags',
        text: 'Travel pouches and toiletry bags keep toiletries, cables, medication, cosmetics, and documents neatly separated. Clear compartments make packing and unpacking faster.',
      },
      {
        heading: 'Storage Pouch & Organizer',
        text: 'Multi-purpose storage pouches work great for drawers, shelves, work bags, and suitcases. Choose mesh, canvas, or PVC material to keep contents visible and organized.',
      },
      {
        heading: 'Canvas Totes & Everyday Bags',
        text: 'Canvas totes are practical for shopping, work, the gym, or short trips. Sturdy handles, interior pockets, and a simple design make them comfortable for everyday, repeated use.',
      },
      {
        heading: 'Why Choose Sesoris Bags & Pouches',
        text: 'Every bag and pouch is chosen based on stitching quality, zippers, material, and function. Enjoy free shipping on orders over $50.',
      },
    ],
    relatedCategories: ['home-living', 'personal-care', 'tools-gadgets'],
  },
  'office-desk': {
    seoTitle: 'Desk Accessories | Desk Organizers - Sesoris',
    seoDescription: 'Shop desk accessories at Sesoris, from bamboo organizers and LED desk lamps to cable tools and productivity essentials for a tidy workspace.',
    intro: 'Build a calmer, more productive desk with the Sesoris Desk collection. This category includes organizers, task lighting, wireless audio, and practical accessories for a home office, study space, or small workstation.',
    sections: [
      {
        heading: 'Desk Organizers for Everyday Workflow',
        text: 'Desk organizers help separate stationery, devices, notes, and small items so your work surface stays clean. Great for remote workers, students, and creators.',
      },
      {
        heading: 'Lighting & Focus Accessories',
        text: 'Focused work needs comfortable lighting and minimal distractions. Choose LED desk lamps, wireless chargers, and audio accessories that support reading, writing, meetings, and content creation.',
      },
      {
        heading: 'Office Setups for Small Spaces',
        text: 'You do not need a large room to build a functional home office. Compact desk accessories, cable tools, and multi-purpose organizers make even a small area easy to maintain.',
      },
      {
        heading: 'Why Choose Sesoris Desk Products',
        text: 'Sesoris curates desk accessories based on function, material, and clean design so your desk looks tidier, feels comfortable to use, and stays easy to maintain every day.',
      },
    ],
    relatedCategories: ['home-living', 'tech-accessories', 'tools-gadgets'],
  },
  'outdoor-travel': {
    seoTitle: 'Outdoor Travel Gear | Travel Organizers & Bags',
    seoDescription: 'Shop outdoor travel gear at Sesoris: toiletry bags, mesh pouches, hanging organizers, and lightweight bags for more organized travel.',
    intro: 'The Sesoris Outdoor Travel collection is built for lighter, cleaner, and easier-to-organize trips. Discover travel organizers, hanging toiletry bags, mesh zipper pouches, gym drawstring bags, and compact packing tools.',
    sections: [
      {
        heading: 'Travel Organizers for Tidy Packing',
        text: 'Travel organizers divide your bag into clear zones for toiletries, cables, documents, clothing, and small items. Use small pouches for chargers and medication, medium pouches for skincare, and large organizers for bathroom essentials or clothing.',
      },
      {
        heading: 'Outdoor Bags for Everyday Mobility',
        text: 'Outdoor travel does not always mean a long hike. Many customers need a lightweight bag for commuting, the gym, a day trip, school, or weekend plans. Products are chosen based on material, compartments, and ease of access.',
      },
      {
        heading: 'How to Choose Travel Gear',
        text: 'Start with the items that make your bag messy most often. Choose a toiletry bag with a water-resistant lining for bath essentials, a mesh pouch for cables, and a hanging organizer if you frequently switch hotels or stays.',
      },
      {
        heading: 'Related Shopping',
        text: 'Outdoor travel products pair well with Bags & Pouches for daily carry, Tech Accessories for cable management, Personal Care for toiletries, and Tools & Gadgets for practical essentials.',
      },
      {
        heading: 'Why Choose Sesoris Outdoor Travel',
        text: 'Sesoris selects travel gear based on simple organization, durable materials, and practical design. The goal is not to add more stuff, but to make every item easier to find and better protected.',
      },
    ],
    relatedCategories: ['bags-pouches', 'tech-accessories', 'personal-care', 'tools-gadgets'],
  },
};
