'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    subtitle: 'Promo Terbatas',
    title: 'Diskon Hingga 50%',
    description: 'Dapatkan penawaran terbaik untuk produk pilihan. Buruan sebelum kehabisan!',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=600&fit=crop',
    buttonText: 'Belanja Sekarang',
    buttonLink: '/shop',
  },
  {
    id: 2,
    subtitle: 'Hadiah Sempurna',
    title: 'Berikan yang Terbaik',
    description: 'Temukan hadiah spesial untuk orang-orang tersayang.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=600&fit=crop',
    buttonText: 'Lihat Koleksi',
    buttonLink: '/category/gift-sets',
  },
  {
    id: 3,
    subtitle: 'Baru Datang',
    title: 'Produk Terbaru',
    description: 'Jelajahi koleksi terbaru produk inovatif kami.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop',
    buttonText: 'Lihat Semua',
    buttonLink: '/new-arrivals',
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section style={{
      background: 'linear-gradient(135deg, #E8F5E9 0%, #fff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div className="grid-hero">
          {/* Content */}
          <div style={{ order: 1 }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: 'rgba(27, 94, 59, 0.1)',
              color: '#1B5E3B',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '50px',
              marginBottom: '16px'
            }}>
              {slide.subtitle}
            </span>
            <h1 style={{
              fontFamily: 'var(--font-heading), Georgia, serif',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 400,
              color: '#212529',
              lineHeight: 1.1,
              marginBottom: '16px'
            }}>
              {slide.title}
            </h1>
            <p style={{
              fontSize: '15px',
              color: '#6C757D',
              marginBottom: '28px',
              maxWidth: '400px',
              lineHeight: 1.7
            }}>
              {slide.description}
            </p>
            <Link
              href={slide.buttonLink}
              className="btn btn-primary"
              style={{ fontSize: '15px' }}
            >
              {slide.buttonText}
            </Link>
          </div>

          {/* Image */}
          <div style={{
            position: 'relative',
            aspectRatio: '4/3',
            borderRadius: '16px',
            overflow: 'hidden',
            order: 2
          }}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>

        {/* Dots Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          paddingBottom: '24px'
        }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? '32px' : '8px',
                height: '8px',
                borderRadius: '50px',
                background: i === current ? '#1B5E3B' : 'rgba(27, 94, 59, 0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>

        {/* Arrows - hidden on mobile */}
        <button
          className="hide-mobile"
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'white',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ChevronLeft style={{ width: '20px', height: '20px' }} />
        </button>
        <button
          className="hide-mobile"
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'white',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ChevronRight style={{ width: '20px', height: '20px' }} />
        </button>
      </div>
    </section>
  );
}
