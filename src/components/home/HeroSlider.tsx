'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    subtitle: 'Limited Time Sale',
    title: 'Up to 50% Off',
    description: 'Grab amazing deals on selected items. Hurry, while stocks last!',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=600&fit=crop',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
  },
  {
    id: 2,
    subtitle: 'The Ultimate Gift Shop',
    title: 'Gift Your Loved Ones',
    description: 'Find perfect presents for everyone you care about.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=600&fit=crop',
    buttonText: 'Explore Gifts',
    buttonLink: '/category/gift-sets',
  },
  {
    id: 3,
    subtitle: 'Fresh Finds',
    title: 'New Arrivals',
    description: 'Discover our latest collection of innovative products.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop',
    buttonText: 'View New',
    buttonLink: '/collection/new-arrivals',
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center',
          minHeight: '480px',
          padding: '48px 0'
        }}>
          {/* Content */}
          <div>
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
              fontSize: '48px',
              fontWeight: 700,
              color: '#212529',
              lineHeight: 1.1,
              marginBottom: '16px'
            }}>
              {slide.title}
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#6C757D',
              marginBottom: '32px',
              maxWidth: '400px',
              lineHeight: 1.6
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
          <div style={{ position: 'relative', height: '400px', borderRadius: '16px', overflow: 'hidden' }}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>

        {/* Navigation */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px'
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

        {/* Arrows */}
        <button
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ChevronLeft style={{ width: '20px', height: '20px' }} />
        </button>
        <button
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
            display: 'flex',
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
