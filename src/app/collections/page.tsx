import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore curated Sesoris collections. Themed product bundles for every room and lifestyle need.',
  alternates: { canonical: '/collections' },
  openGraph: {
    title: 'Collections | Sesoris',
    description: 'Explore curated Sesoris collections. Themed product bundles for every room and lifestyle need.',
    images: [{ url: '/og-default.webp', width: 1200, height: 630 }],
  },
};

const collections = [
  {
    id: '1',
    name: 'Summer Essentials',
    slug: 'summer-essentials',
    description: 'Beat the heat with our curated summer collection',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
    productCount: 24,
  },
  {
    id: '2',
    name: 'Home Office',
    slug: 'home-office',
    description: 'Work from home in style and comfort',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&h=400&fit=crop',
    productCount: 18,
  },
  {
    id: '3',
    name: 'Eco-Friendly Living',
    slug: 'eco-friendly',
    description: 'Sustainable products for a greener lifestyle',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop',
    productCount: 32,
  },
  {
    id: '4',
    name: 'Kitchen Must-Haves',
    slug: 'kitchen-must-haves',
    description: 'Essential tools for every home chef',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    productCount: 45,
  },
  {
    id: '5',
    name: 'Fitness & Wellness',
    slug: 'fitness-wellness',
    description: 'Stay healthy and active with our fitness gear',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    productCount: 28,
  },
  {
    id: '6',
    name: 'Gift Ideas',
    slug: 'gift-ideas',
    description: 'Perfect presents for every occasion',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=400&fit=crop',
    productCount: 56,
  },
];

export default function CollectionsPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: '#6C757D' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>Collections</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
            Our Collections
          </h1>
          <p style={{ color: '#6C757D', fontSize: '16px' }}>
            Explore our curated collections designed for every lifestyle
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href="/shop"
              style={{
                display: 'block',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <div style={{ aspectRatio: '3/2', position: 'relative' }}>
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>
                    {collection.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                    {collection.productCount} products
                  </p>
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ color: '#6C757D', fontSize: '14px', lineHeight: 1.5 }}>
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SEO Content Section */}
      <div style={{ background: '#F8F9FA', padding: '48px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
            About Our Collections
          </h2>
          <p style={{ color: '#495057', lineHeight: '1.7', marginBottom: '16px' }}>
            Sesoris collections are carefully curated groups of products designed to work beautifully together. Each collection is built around a specific lifestyle theme, room, or function — making it easy to find coordinated products that complement each other and your home.
          </p>
          <p style={{ color: '#495057', lineHeight: '1.7', marginBottom: '16px' }}>
            From minimalist home office setups to complete kitchen organization systems, our collections take the guesswork out of home styling. Every product within a collection is selected for its design compatibility, quality, and practical value.
          </p>
          <p style={{ color: '#495057', lineHeight: '1.7', marginBottom: '24px' }}>
            Whether you are furnishing a new home, renovating a specific room, or looking for coordinated gift sets, our collections provide a cohesive starting point. Browse by theme or function and discover products that work together seamlessly.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/shop" style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #1B5E3B', color: '#1B5E3B', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              Shop All Products
            </Link>
            <Link href="/best-sellers" style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #1B5E3B', color: '#1B5E3B', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              Best Sellers
            </Link>
            <Link href="/bundles" style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #1B5E3B', color: '#1B5E3B', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              Bundle Deals
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
