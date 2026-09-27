import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { products } from '@/data/products';

const hero = {
  tagline: 'New Collection 2026',
  title: 'Tidy Home,',
  titleAccent: 'Calmer Living.',
  description: 'Smart storage solutions for a tidier, more comfortable home.',
  image: '/images/hero/hero-1.webp',
  buttonText: 'Shop the Collection',
  buttonLink: '/shop',
  stat: { value: String(products.length), label: 'Products' },
};

export function HeroSlider() {
  return (
    <section className="hero-section">
      <div className="hero-bg">
        <div className="hero-bg-slide active no-fade">
          <Image
            src={hero.image}
            alt="Tidy home with organized storage"
            fill
            style={{ objectFit: 'cover' }}
            priority
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            unoptimized
            sizes="100vw"
          />
        </div>
        <div className="hero-overlay" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-content-grid">
          <div className="hero-text">
            <span className="hero-tagline">{hero.tagline}</span>
            <h1 className="hero-title" aria-label="Sesoris, Home Organizers & Storage Solutions">
              {hero.title}
              <br />{' '}
              <span className="hero-title-accent">{hero.titleAccent}</span>
            </h1>
            <p className="hero-description">{hero.description}</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href={hero.buttonLink} className="hero-cta">
                {hero.buttonText}
                <ArrowRight style={{ width: '18px', height: '18px' }} />
              </Link>
              <div className="hero-rating">
                <span style={{ fontSize: '13px', opacity: 0.9 }}>Curated for organized living</span>
              </div>
            </div>
          </div>

          <div className="hero-side">
            <div className="hero-stat-card">
              <div className="hero-stat-value">{hero.stat.value}</div>
              <div className="hero-stat-label">{hero.stat.label}</div>
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <div />
          <div className="hero-mini-badges">
            <div className="hero-mini-badge">
              <Truck style={{ width: '16px', height: '16px' }} />
              <span>Free Shipping</span>
            </div>
            <div className="hero-mini-badge">
              <ShieldCheck style={{ width: '16px', height: '16px' }} />
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
