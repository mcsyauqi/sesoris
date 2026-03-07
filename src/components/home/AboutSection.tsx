import Link from 'next/link';
import Image from 'next/image';
import { Leaf, ArrowRight } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="section-padding" style={{ background: '#F8F9FA' }}>
      <div className="container">
        <div className="grid-about">
          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              aspectRatio: '4/3',
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                alt="About Sesoris"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            {/* Floating Card */}
            <div className="hide-mobile" style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-20px',
              background: 'white',
              borderRadius: '16px',
              padding: '20px 24px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Leaf style={{ width: '36px', height: '36px', color: '#1B5E3B' }} />
              <div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#1B5E3B' }}>Sesoris</div>
                <div style={{ fontSize: '11px', color: '#6C757D' }}>Do It With Ease</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: '#E8F5E9',
              color: '#1B5E3B',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '50px',
              marginBottom: '16px'
            }}>
              Tentang Kami
            </span>
            <h2 style={{
              fontFamily: 'var(--font-heading), Georgia, serif',
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: 400,
              color: '#212529',
              marginBottom: '20px'
            }}>
              Kenapa Pilih Sesoris?
            </h2>
            <p style={{ color: '#6C757D', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
              Sesoris menghadirkan produk-produk terbaik untuk Anda. Kami percaya bahwa kualitas, fungsionalitas, dan gaya bisa berjalan beriringan.
            </p>
            <p style={{ color: '#6C757D', fontSize: '15px', lineHeight: 1.7, marginBottom: '28px' }}>
              Setiap produk dikurasi dengan cermat untuk memastikan Anda mendapatkan yang terbaik. Misi kami adalah membuat hidup Anda lebih teratur dan menyenangkan.
            </p>

            {/* Stats */}
            <div className="grid-stats" style={{ marginBottom: '28px' }}>
              <div>
                <div style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: '#1B5E3B' }}>50K+</div>
                <div style={{ fontSize: '13px', color: '#6C757D' }}>Pelanggan Puas</div>
              </div>
              <div>
                <div style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: '#1B5E3B' }}>500+</div>
                <div style={{ fontSize: '13px', color: '#6C757D' }}>Produk</div>
              </div>
              <div>
                <div style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: '#1B5E3B' }}>4.8</div>
                <div style={{ fontSize: '13px', color: '#6C757D' }}>Rating Rata-rata</div>
              </div>
            </div>

            <Link
              href="/about"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              Selengkapnya
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
