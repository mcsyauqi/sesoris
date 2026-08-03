'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, CheckCircle, Quote } from 'lucide-react';
import { testimonials } from '@/data/products';

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const testimonial = testimonials[current];

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
            What Our Customers Say
          </h2>
          <p style={{ color: '#5F6873', fontSize: '15px' }}>Real reviews from our verified buyers</p>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: 'clamp(24px, 4vw, 48px)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            position: 'relative',
            textAlign: 'center'
          }}>
            <Quote style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              width: '36px',
              height: '36px',
              color: '#E8F5E9'
            }} />

            <p style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: '#343A40',
              lineHeight: 1.7,
              fontStyle: 'italic',
              marginBottom: '24px'
            }}>
              &ldquo;{testimonial.content}&rdquo;
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '20px' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  style={{
                    width: '18px',
                    height: '18px',
                    fill: i < testimonial.rating ? '#FFC107' : '#E9ECEF',
                    color: i < testimonial.rating ? '#FFC107' : '#E9ECEF'
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0
              }}>
                <Image src={testimonial.avatar} alt={testimonial.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, color: '#212529' }}>{testimonial.name}</div>
                {testimonial.verified && (
                  <div style={{ fontSize: '13px', color: '#1E7E34', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle style={{ width: '12px', height: '12px' }} />
                    Verified Buyer
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '28px'
            }}>
              <button
                onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)}
                aria-label="Show previous customer review"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background: '#F8F9FA',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronLeft style={{ width: '20px', height: '20px' }} />
              </button>

              {/* gap 0 because every dot button is a 24x24 touch target already;
                  the visible 8px dot is the inner span. */}
              <div style={{ display: 'flex', gap: 0 }}>
                {testimonials.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Show review ${i + 1} of ${testimonials.length}, by ${t.name}`}
                    aria-current={i === current ? 'true' : undefined}
                    style={{
                      width: i === current ? '40px' : '24px',
                      height: '24px',
                      flexShrink: 0,
                      border: 'none',
                      background: 'transparent',
                      padding: 0,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        width: i === current ? '24px' : '8px',
                        height: '8px',
                        borderRadius: '50px',
                        background: i === current ? '#1B5E3B' : '#E9ECEF',
                        transition: 'all 0.2s'
                      }}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrent((p) => (p + 1) % testimonials.length)}
                aria-label="Show next customer review"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background: '#F8F9FA',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronRight style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
