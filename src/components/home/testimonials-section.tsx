'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Rating } from '@/components/ui/rating';
import { testimonials } from '@/data/products';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 700,
            color: '#212529',
            marginBottom: '12px'
          }}>
            What Our Customers Say
          </h2>
          <p style={{ color: '#6C757D', maxWidth: '400px', margin: '0 auto' }}>
            Read reviews from our happy customers
          </p>
        </div>

        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '48px',
            boxShadow: '0 16px 32px rgba(0,0,0,0.1)',
            position: 'relative'
          }}>
            <Quote style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              width: '40px',
              height: '40px',
              color: '#E8F5E9'
            }} />

            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontSize: '18px',
                color: '#343A40',
                marginBottom: '24px',
                fontStyle: 'italic',
                position: 'relative',
                zIndex: 10,
                lineHeight: 1.6
              }}>
                &ldquo;{currentTestimonial.content}&rdquo;
              </p>

              <Rating value={currentTestimonial.rating} className="justify-center mb-4" />

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}>
                {currentTestimonial.avatar && (
                  <div style={{
                    position: 'relative',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    overflow: 'hidden'
                  }}>
                    <Image
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: 600, color: '#212529' }}>
                    {currentTestimonial.name}
                  </p>
                  {currentTestimonial.verified && (
                    <p style={{
                      fontSize: '14px',
                      color: '#28A745',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <CheckCircle style={{ width: '12px', height: '12px' }} />
                      Verified Buyer
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '32px'
            }}>
              <button
                onClick={prevTestimonial}
                style={{
                  padding: '8px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer'
                }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft style={{ width: '24px', height: '24px', color: '#343A40' }} />
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    style={{
                      width: index === currentIndex ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '9999px',
                      background: index === currentIndex ? '#1B5E3B' : '#E9ECEF',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                style={{
                  padding: '8px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer'
                }}
                aria-label="Next testimonial"
              >
                <ChevronRight style={{ width: '24px', height: '24px', color: '#343A40' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
