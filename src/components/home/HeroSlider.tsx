'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, ShieldCheck } from 'lucide-react';

const slides = [
  {
    id: 1,
    tagline: 'New Collection 2026',
    title: 'Tidy Home,',
    titleAccent: 'Calmer Living.',
    description: 'Smart storage solutions for a tidier, more comfortable home.',
    image: '/images/hero/hero-1.webp',
    buttonText: 'Shop the Collection',
    buttonLink: '/shop',
    stat: { value: '23', label: 'Products' },
  },
  {
    id: 2,
    tagline: 'Best Sellers',
    title: 'Organized Kitchen,',
    titleAccent: 'Cooking Made Easy.',
    description: 'Premium kitchen racks, organizers, and food containers for a dream kitchen.',
    image: '/images/hero/hero-2.webp',
    buttonText: 'Shop Best Sellers',
    buttonLink: '/best-sellers',
    stat: { value: '30-Day', label: 'Easy Returns' },
  },
  {
    id: 3,
    tagline: 'Special Offers',
    title: 'Save Up To',
    titleAccent: '50%.',
    description: 'Limited-time deals on selected items. Upgrade your home without breaking the bank.',
    image: '/images/hero/hero-3.webp',
    buttonText: 'Shop Now',
    buttonLink: '/on-sale',
    stat: { value: '9', label: 'Categories' },
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
                <span style={{ fontSize: '13px', opacity: 0.9 }}>Curated for organized living</span>
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
