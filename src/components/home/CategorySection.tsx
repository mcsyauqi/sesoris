import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/products';

export function CategorySection() {
  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
            Shop by Category
          </h2>
          <p style={{ color: '#6C757D', fontSize: '16px' }}>
            Find the perfect product for every need
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '20px'
        }}>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`} style={{ display: 'block' }}>
              <div style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#F1F3F5'
              }}>
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  color: 'white'
                }}>
                  <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '2px' }}>{cat.name}</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>{cat.productCount} items</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
