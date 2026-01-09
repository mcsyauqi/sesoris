import type { Product, Category, HeroSlide, TrustBadge, Testimonial, FAQ } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Beautiful items for your home',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    productCount: 124,
  },
  {
    id: '2',
    name: 'Kitchen & Dining',
    slug: 'kitchen-dining',
    description: 'Essential kitchen products',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    productCount: 86,
  },
  {
    id: '3',
    name: 'Tools & Gadgets',
    slug: 'tools-gadgets',
    description: 'Innovative tools for everyday',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    productCount: 67,
  },
  {
    id: '4',
    name: 'Gift Sets',
    slug: 'gift-sets',
    description: 'Perfect gifts for everyone',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400',
    productCount: 93,
  },
  {
    id: '5',
    name: 'Personal Care',
    slug: 'personal-care',
    description: 'Self-care essentials',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    productCount: 78,
  },
  {
    id: '6',
    name: 'Tech Accessories',
    slug: 'tech-accessories',
    description: 'Smart tech solutions',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    productCount: 54,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Bamboo Desk Organizer',
    slug: 'bamboo-desk-organizer',
    description: 'Keep your workspace tidy with this elegant bamboo desk organizer. Features multiple compartments for pens, notepads, and office supplies. Eco-friendly and durable, it adds a natural touch to any desk setup.',
    shortDescription: 'Elegant bamboo organizer for a tidy workspace',
    price: 29.99,
    compareAtPrice: 39.99,
    images: [
      { id: '1-1', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600', alt: 'Bamboo Desk Organizer', sortOrder: 0 },
      { id: '1-2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', alt: 'Bamboo Desk Organizer Side View', sortOrder: 1 },
    ],
    category: categories[0],
    categoryId: '1',
    sku: 'BDO-001',
    quantity: 50,
    featured: true,
    isNew: false,
    rating: 4.5,
    reviewCount: 128,
    specifications: {
      'Material': 'Bamboo',
      'Dimensions': '10" x 6" x 4"',
      'Weight': '1.5 lbs',
      'Color': 'Natural',
    },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Smart Water Bottle',
    slug: 'smart-water-bottle',
    description: 'Stay hydrated with this smart water bottle that tracks your daily water intake. LED display shows temperature and hydration reminders. Keeps drinks cold for 24 hours or hot for 12 hours.',
    shortDescription: 'Track your hydration with smart technology',
    price: 34.99,
    images: [
      { id: '2-1', url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600', alt: 'Smart Water Bottle', sortOrder: 0 },
    ],
    category: categories[1],
    categoryId: '2',
    sku: 'SWB-001',
    quantity: 75,
    featured: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 256,
    variants: [
      { id: 'v1', name: 'Black', sku: 'SWB-001-BK', quantity: 30, options: { color: 'Black' } },
      { id: 'v2', name: 'White', sku: 'SWB-001-WH', quantity: 25, options: { color: 'White' } },
      { id: 'v3', name: 'Blue', sku: 'SWB-001-BL', quantity: 20, options: { color: 'Blue' } },
    ],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'Portable Blender',
    slug: 'portable-blender',
    description: 'Make fresh smoothies anywhere with this powerful portable blender. USB rechargeable, dishwasher safe, and perfect for travel. One-touch operation for convenience.',
    shortDescription: 'Fresh smoothies on the go',
    price: 24.99,
    compareAtPrice: 34.99,
    images: [
      { id: '3-1', url: 'https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=600', alt: 'Portable Blender', sortOrder: 0 },
    ],
    category: categories[1],
    categoryId: '2',
    sku: 'PBL-001',
    quantity: 100,
    featured: false,
    isNew: true,
    rating: 4.3,
    reviewCount: 89,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-15',
  },
  {
    id: '4',
    name: 'LED Desk Lamp with Wireless Charger',
    slug: 'led-desk-lamp-wireless-charger',
    description: 'Modern LED desk lamp with built-in wireless charging pad. Adjustable brightness and color temperature. Touch controls and sleek design perfect for home office.',
    shortDescription: 'Illuminate and charge simultaneously',
    price: 49.99,
    images: [
      { id: '4-1', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600', alt: 'LED Desk Lamp', sortOrder: 0 },
    ],
    category: categories[5],
    categoryId: '6',
    sku: 'LDL-001',
    quantity: 40,
    featured: true,
    isNew: false,
    rating: 4.7,
    reviewCount: 203,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15',
  },
  {
    id: '5',
    name: 'Aromatherapy Diffuser',
    slug: 'aromatherapy-diffuser',
    description: 'Create a relaxing atmosphere with this ultrasonic aromatherapy diffuser. Features 7 LED colors, auto shut-off, and whisper-quiet operation. Perfect for bedroom or office.',
    shortDescription: 'Relaxation through aromatherapy',
    price: 32.99,
    images: [
      { id: '5-1', url: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?w=600', alt: 'Aromatherapy Diffuser', sortOrder: 0 },
    ],
    category: categories[4],
    categoryId: '5',
    sku: 'ARD-001',
    quantity: 60,
    featured: false,
    isNew: false,
    rating: 4.6,
    reviewCount: 167,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-15',
  },
  {
    id: '6',
    name: 'Premium Gift Box Set',
    slug: 'premium-gift-box-set',
    description: 'Curated gift box featuring premium self-care items. Includes scented candle, bath bombs, organic soap, and more. Beautifully packaged for gifting.',
    shortDescription: 'The perfect gift for any occasion',
    price: 59.99,
    compareAtPrice: 79.99,
    images: [
      { id: '6-1', url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600', alt: 'Premium Gift Box Set', sortOrder: 0 },
    ],
    category: categories[3],
    categoryId: '4',
    sku: 'PGB-001',
    quantity: 35,
    featured: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 342,
    createdAt: '2024-01-02',
    updatedAt: '2024-01-15',
  },
  {
    id: '7',
    name: 'Multi-Tool Pocket Knife',
    slug: 'multi-tool-pocket-knife',
    description: 'Compact multi-tool featuring 12 essential functions. Stainless steel construction, ergonomic grip, and includes carrying case. Perfect for outdoor adventures.',
    shortDescription: '12-in-1 versatile multi-tool',
    price: 27.99,
    images: [
      { id: '7-1', url: 'https://images.unsplash.com/photo-1571929499638-0c4c8b03bbef?w=600', alt: 'Multi-Tool Pocket Knife', sortOrder: 0 },
    ],
    category: categories[2],
    categoryId: '3',
    sku: 'MTK-001',
    quantity: 45,
    featured: false,
    isNew: true,
    rating: 4.4,
    reviewCount: 98,
    createdAt: '2024-01-11',
    updatedAt: '2024-01-15',
  },
  {
    id: '8',
    name: 'Minimalist Wallet',
    slug: 'minimalist-wallet',
    description: 'Slim and stylish genuine leather wallet. RFID blocking technology protects your cards. Holds up to 10 cards and cash. Perfect for those who prefer minimal carry.',
    shortDescription: 'Slim leather wallet with RFID protection',
    price: 39.99,
    images: [
      { id: '8-1', url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600', alt: 'Minimalist Wallet', sortOrder: 0 },
    ],
    category: categories[4],
    categoryId: '5',
    sku: 'MNW-001',
    quantity: 80,
    featured: true,
    isNew: false,
    rating: 4.5,
    reviewCount: 189,
    variants: [
      { id: 'v4', name: 'Black', sku: 'MNW-001-BK', quantity: 40, options: { color: 'Black' } },
      { id: 'v5', name: 'Brown', sku: 'MNW-001-BR', quantity: 40, options: { color: 'Brown' } },
    ],
    createdAt: '2024-01-04',
    updatedAt: '2024-01-15',
  },
  {
    id: '9',
    name: 'Ceramic Plant Pot Set',
    slug: 'ceramic-plant-pot-set',
    description: 'Set of 3 modern ceramic plant pots with drainage holes. Perfect for succulents and small plants. Includes matching saucers. Adds elegance to any space.',
    shortDescription: 'Modern ceramic pots for your plants',
    price: 44.99,
    images: [
      { id: '9-1', url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600', alt: 'Ceramic Plant Pot Set', sortOrder: 0 },
    ],
    category: categories[0],
    categoryId: '1',
    sku: 'CPP-001',
    quantity: 55,
    featured: false,
    isNew: false,
    rating: 4.7,
    reviewCount: 145,
    createdAt: '2024-01-06',
    updatedAt: '2024-01-15',
  },
  {
    id: '10',
    name: 'Wireless Earbuds Pro',
    slug: 'wireless-earbuds-pro',
    description: 'Premium wireless earbuds with active noise cancellation. 30-hour battery life with charging case. IPX5 water resistant. Crystal clear audio quality.',
    shortDescription: 'Premium audio with noise cancellation',
    price: 79.99,
    compareAtPrice: 99.99,
    images: [
      { id: '10-1', url: 'https://images.unsplash.com/photo-1590658165737-15a047b7c0b0?w=600', alt: 'Wireless Earbuds Pro', sortOrder: 0 },
    ],
    category: categories[5],
    categoryId: '6',
    sku: 'WEP-001',
    quantity: 30,
    featured: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 412,
    createdAt: '2024-01-13',
    updatedAt: '2024-01-15',
  },
  {
    id: '11',
    name: 'Foldable Storage Bins',
    slug: 'foldable-storage-bins',
    description: 'Set of 4 collapsible fabric storage bins. Perfect for organizing closets, shelves, and drawers. Reinforced handles for easy carrying.',
    shortDescription: 'Organize with foldable bins',
    price: 22.99,
    images: [
      { id: '11-1', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', alt: 'Foldable Storage Bins', sortOrder: 0 },
    ],
    category: categories[0],
    categoryId: '1',
    sku: 'FSB-001',
    quantity: 90,
    featured: false,
    isNew: false,
    rating: 4.3,
    reviewCount: 76,
    createdAt: '2024-01-07',
    updatedAt: '2024-01-15',
  },
  {
    id: '12',
    name: 'Electric Wine Opener',
    slug: 'electric-wine-opener',
    description: 'Effortlessly open wine bottles with this rechargeable electric opener. Opens up to 30 bottles on a single charge. Includes foil cutter and charging base.',
    shortDescription: 'Open wine bottles with ease',
    price: 36.99,
    images: [
      { id: '12-1', url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600', alt: 'Electric Wine Opener', sortOrder: 0 },
    ],
    category: categories[1],
    categoryId: '2',
    sku: 'EWO-001',
    quantity: 65,
    featured: false,
    isNew: false,
    rating: 4.6,
    reviewCount: 134,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-15',
  },
];

export const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Gift Your Loved Ones',
    subtitle: 'The Ultimate Gift Shop',
    description: 'Find perfect presents for everyone you care about. Quality products, great prices.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    secondaryButtonText: 'View Collections',
    secondaryButtonLink: '/collections',
  },
  {
    id: '2',
    title: 'New Arrivals',
    subtitle: 'Fresh Finds Just For You',
    description: 'Discover our latest collection of innovative products for modern living.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200',
    buttonText: 'Explore New',
    buttonLink: '/collection/new-arrivals',
  },
  {
    id: '3',
    title: 'Up to 50% Off',
    subtitle: 'Limited Time Sale',
    description: 'Grab amazing deals on selected items. Hurry, while stocks last!',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200',
    buttonText: 'Shop Sale',
    buttonLink: '/collection/sale',
  },
];

export const trustBadges: TrustBadge[] = [
  {
    id: '1',
    icon: 'truck',
    title: 'Free Shipping',
    description: 'Orders over $50',
  },
  {
    id: '2',
    icon: 'refresh',
    title: 'Easy Returns',
    description: '30 Days',
  },
  {
    id: '3',
    icon: 'shield',
    title: 'Secure Payment',
    description: '100% Protected',
  },
  {
    id: '4',
    icon: 'headphones',
    title: '24/7 Support',
    description: 'Always Here',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    content: 'Amazing quality products! Fast shipping and the customer service was incredibly helpful. Will definitely order again!',
    rating: 5,
    date: '2024-01-10',
    verified: true,
  },
  {
    id: '2',
    name: 'James K.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    content: 'Found the perfect gift for my wife here. The packaging was beautiful and the product exceeded expectations.',
    rating: 5,
    date: '2024-01-08',
    verified: true,
  },
  {
    id: '3',
    name: 'Emily R.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    content: 'Love the variety of products available. Everything is so well-curated and reasonably priced. My new favorite shop!',
    rating: 4,
    date: '2024-01-05',
    verified: true,
  },
  {
    id: '4',
    name: 'Michael T.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    content: 'The smart water bottle I bought is fantastic. Great build quality and the tracking features work flawlessly.',
    rating: 5,
    date: '2024-01-03',
    verified: true,
  },
  {
    id: '5',
    name: 'Lisa W.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    content: 'Ordered the gift box set for my mom and she absolutely loved it. Premium quality items and beautiful presentation.',
    rating: 5,
    date: '2024-01-01',
    verified: true,
  },
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 5-7 business days. Express shipping (2-3 business days) and next-day delivery are also available for an additional fee.',
    category: 'Shipping',
  },
  {
    id: '2',
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries worldwide. International shipping typically takes 10-14 business days. Shipping costs and delivery times vary by location.',
    category: 'Shipping',
  },
  {
    id: '3',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy on all unused items in their original packaging. Simply contact our customer service team to initiate a return.',
    category: 'Returns',
  },
  {
    id: '4',
    question: 'How do I track my order?',
    answer: 'Once your order ships, you\'ll receive an email with a tracking number. You can also track your order on our website using your order number and email address.',
    category: 'Orders',
  },
  {
    id: '5',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay for your convenience.',
    category: 'Payment',
  },
  {
    id: '6',
    question: 'Are your products eco-friendly?',
    answer: 'Many of our products are made from sustainable materials. Look for the eco-friendly badge on product pages for environmentally conscious options.',
    category: 'Products',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category.slug === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getOnSaleProducts(): Product[] {
  return products.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
}

export function getBestSellers(): Product[] {
  return [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.name.toLowerCase().includes(lowerQuery)
  );
}
