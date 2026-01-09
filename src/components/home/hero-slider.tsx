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
      className="relative overflow-hidden bg-gradient-to-br from-[#E8F5E9] to-white"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container">
        <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center">
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
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full py-12">
                {/* Content */}
                <div className="text-center lg:text-left">
                  <span className="inline-block px-4 py-1.5 bg-[#1B5E3B]/10 text-[#1B5E3B] text-sm font-medium rounded-full mb-4">
                    {slide.subtitle}
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#212529] mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  {slide.description && (
                    <p className="text-lg text-[#6C757D] mb-8 max-w-md mx-auto lg:mx-0">
                      {slide.description}
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
                <div className="relative h-[300px] md:h-[400px] lg:h-[500px] hidden md:block">
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
            <ChevronLeft className="w-6 h-6 text-[#343A40]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-[#343A40]" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  'w-2.5 h-2.5 rounded-full transition-all',
                  index === currentSlide
                    ? 'bg-[#1B5E3B] w-8'
                    : 'bg-[#1B5E3B]/30 hover:bg-[#1B5E3B]/50'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
