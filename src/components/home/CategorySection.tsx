import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/products';

export function CategorySection() {
  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading), Georgia, serif',
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 400,
            color: '#212529',
            marginBottom: '12px'
          }}>
            Shop by Category
          </h2>
          <p style={{ color: '#6C757D', fontSize: '15px' }}>
            Find the right product for every need
          </p>
        </div>

        <div className="grid-categories">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`} style={{ display: 'block' }}>
              <div className="img-hover-zoom" style={{
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
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  style={{ objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '14px',
                  right: '14px',
                  color: 'white'
                }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>{cat.name}</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>{cat.productCount} products</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
