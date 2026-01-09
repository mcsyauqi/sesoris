'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, CheckCircle, Quote } from 'lucide-react';
import { testimonials } from '@/data/products';

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const testimonial = testimonials[current];

  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
            What Our Customers Say
          </h2>
          <p style={{ color: '#6C757D' }}>Read reviews from our happy customers</p>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '48px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            position: 'relative',
            textAlign: 'center'
          }}>
            <Quote style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              width: '40px',
              height: '40px',
              color: '#E8F5E9'
            }} />

            <p style={{
              fontSize: '18px',
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
                position: 'relative'
              }}>
                <Image src={testimonial.avatar} alt={testimonial.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, color: '#212529' }}>{testimonial.name}</div>
                {testimonial.verified && (
                  <div style={{ fontSize: '13px', color: '#28A745', display: 'flex', alignItems: 'center', gap: '4px' }}>
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
              marginTop: '32px'
            }}>
              <button
                onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)}
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

              <div style={{ display: 'flex', gap: '8px' }}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: i === current ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '50px',
                      border: 'none',
                      background: i === current ? '#1B5E3B' : '#E9ECEF',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrent((p) => (p + 1) % testimonials.length)}
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
