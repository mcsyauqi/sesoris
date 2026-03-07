// Curated Unsplash images organized by topic for blog hero images
export const imagePool: Record<string, string[]> = {
  'home-organization': [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200&h=600&fit=crop',
  ],
  kitchen: [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&h=600&fit=crop',
  ],
  bedroom: [
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=600&fit=crop',
  ],
  lifestyle: [
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop',
  ],
  bathroom: [
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&h=600&fit=crop',
  ],
  workspace: [
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=1200&h=600&fit=crop',
  ],
  storage: [
    'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&h=600&fit=crop',
  ],
  plants: [
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1501004318855-ee2d90d0b798?w=1200&h=600&fit=crop',
  ],
};

export function getRandomImage(topic: string): string {
  const images = imagePool[topic] || imagePool['home-organization'];
  return images[Math.floor(Math.random() * images.length)];
}
