'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { heroSlides } from '@/data/products';

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #E8F5E9 0%, #ffffff 100%)' }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container">
        <div
          className="relative flex items-center"
          style={{ minHeight: '500px' }}
        >
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                'absolute inset-0 flex items-center transition-all duration-700',
                index === currentSlide
                  ? 'opacity-100 translate-x-0 z-10'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-full z-0'
                  : 'opacity-0 translate-x-full z-0'
              )}
            >
              <div
                className="w-full py-12"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '48px',
                  alignItems: 'center'
                }}
              >
                {/* Content */}
                <div style={{ textAlign: 'left' }}>
                  <span
                    className="inline-block mb-4"
                    style={{
                      padding: '6px 16px',
                      background: 'rgba(27, 94, 59, 0.1)',
                      color: '#1B5E3B',
                      fontSize: '14px',
                      fontWeight: 500,
                      borderRadius: '9999px'
                    }}
                  >
                    {slide.subtitle}
                  </span>
                  <h1
                    style={{
                      fontSize: 'clamp(32px, 5vw, 56px)',
                      fontWeight: 700,
                      color: '#212529',
                      marginBottom: '16px',
                      lineHeight: 1.2
                    }}
                  >
                    {slide.title}
                  </h1>
                  {slide.description && (
                    <p
                      style={{
                        fontSize: '18px',
                        color: '#6C757D',
                        marginBottom: '32px',
                        maxWidth: '400px'
                      }}
                    >
                      {slide.description}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <Button asChild size="lg">
                      <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                    </Button>
                    {slide.secondaryButtonText && (
                      <Button asChild variant="outline" size="lg">
                        <Link href={slide.secondaryButtonLink!}>
                          {slide.secondaryButtonText}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Image */}
                <div style={{ position: 'relative', height: '400px' }}>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-contain object-center"
                    priority={index === 0}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: '#343A40' }} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" style={{ color: '#343A40' }} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20" style={{ display: 'flex', gap: '8px' }}>
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: index === currentSlide ? '32px' : '10px',
                  height: '10px',
                  borderRadius: '9999px',
                  background: index === currentSlide ? '#1B5E3B' : 'rgba(27, 94, 59, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
