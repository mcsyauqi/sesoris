import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight } from 'lucide-react';

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
              href={`/shop?collection=${collection.slug}`}
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
    </>
  );
}
