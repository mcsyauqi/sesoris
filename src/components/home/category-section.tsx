import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/products';

export function CategorySection() {
  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 700,
            color: '#212529',
            marginBottom: '12px'
          }}>
            Shop by Category
          </h2>
          <p style={{ color: '#6C757D', maxWidth: '400px', margin: '0 auto' }}>
            Find the perfect product for every need
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '24px'
        }}>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <div style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#F1F3F5'
              }}>
                <Image
                  src={category.image || '/placeholder.jpg'}
                  alt={category.name}
                  fill
                  className="object-cover"
                  style={{ transition: 'transform 0.5s ease' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px',
                  color: 'white'
                }}>
                  <h3 style={{ fontWeight: 600, fontSize: '18px', marginBottom: '2px' }}>
                    {category.name}
                  </h3>
                  <p style={{ fontSize: '14px', opacity: 0.7 }}>
                    {category.productCount} items
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
