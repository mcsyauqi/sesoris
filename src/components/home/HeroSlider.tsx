'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, ShieldCheck } from 'lucide-react';

const slides = [
  {
    id: 1,
    tagline: 'Koleksi Baru 2026',
    title: 'Rumah Rapi,',
    titleAccent: 'Hidup Lebih Tenang.',
    description: 'Temukan solusi penyimpanan pintar untuk rumah yang lebih rapi dan nyaman.',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&h=533&fit=crop&q=75',
    buttonText: 'Lihat Koleksi',
    buttonLink: '/shop',
    stat: { value: '500+', label: 'Produk' },
  },
  {
    id: 2,
    tagline: 'Terlaris',
    title: 'Dapur Rapi,',
    titleAccent: 'Masak Jadi Menyenangkan.',
    description: 'Rak dapur, organizer, dan kontainer makanan premium untuk dapur impian yang lebih tertata.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=533&fit=crop&q=75',
    buttonText: 'Lihat Terlaris',
    buttonLink: '/best-sellers',
    stat: { value: '4.8', label: 'Rating' },
  },
  {
    id: 3,
    tagline: 'Promo Spesial',
    title: 'Hemat Hingga',
    titleAccent: '50%.',
    description: 'Promo terbatas untuk produk pilihan. Upgrade rumah tanpa bikin boros.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=533&fit=crop&q=75',
    buttonText: 'Belanja Sekarang',
    buttonLink: '/on-sale',
    stat: { value: '50K+', label: 'Pelanggan' },
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((current + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [current, goToSlide]);

  const slide = slides[current];

  return (
    <section className="hero-section">
      {/* Background image with overlay */}
      <div className="hero-bg">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`hero-bg-slide ${i === current ? 'active' : ''}`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              style={{ objectFit: 'cover' }}
              priority={i === 0}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              sizes="100vw"
            />
          </div>
        ))}
        <div className="hero-overlay" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-content-grid">
          {/* Main content */}
          <div className="hero-text">
            <span className="hero-tagline">
              {slide.tagline}
            </span>

            {/* Static H1 for SEO, always visible to crawlers */}
            <h1 className="hero-title" aria-label="Sesoris, Home Organizers & Storage Solutions">
              {slide.title}
              <br />
              <span className="hero-title-accent">{slide.titleAccent}</span>
            </h1>

            <p className="hero-description">
              {slide.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link
                href={slide.buttonLink}
                className="hero-cta"
              >
                {slide.buttonText}
                <ArrowRight style={{ width: '18px', height: '18px' }} />
              </Link>

              <div className="hero-rating">
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} style={{ width: '14px', height: '14px', fill: '#FFC107', color: '#FFC107' }} />
                  ))}
                </div>
                <span style={{ fontSize: '13px', opacity: 0.9 }}>50.000+ pelanggan puas</span>
              </div>
            </div>
          </div>

          {/* Right side - floating stat card */}
          <div className="hero-side">
            <div className="hero-stat-card">
              <div className="hero-stat-value">{slide.stat.value}</div>
              <div className="hero-stat-label">{slide.stat.label}</div>
            </div>
          </div>
        </div>

        {/* Bottom bar: dots + trust badges */}
        <div className="hero-bottom">
          <div className="hero-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`hero-dot ${i === current ? 'active' : ''}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="hero-mini-badges">
            <div className="hero-mini-badge">
              <Truck style={{ width: '16px', height: '16px' }} />
              <span>Gratis Ongkir</span>
            </div>
            <div className="hero-mini-badge">
              <ShieldCheck style={{ width: '16px', height: '16px' }} />
              <span>Garansi 30 Hari</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
