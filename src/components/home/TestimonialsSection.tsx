import Image from 'next/image';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { testimonials } from '@/data/products';

export function TestimonialsSection() {
  const testimonial = testimonials[0];

  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading), Georgia, serif',
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 400,
            color: '#212529',
            marginBottom: '12px',
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
            textAlign: 'center',
          }}>
            <Quote style={{ position: 'absolute', top: '20px', left: '20px', width: '36px', height: '36px', color: '#E8F5E9' }} />
            <p style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: '#343A40',
              lineHeight: 1.7,
              fontStyle: 'italic',
              marginBottom: '24px',
            }}>
              &ldquo;{testimonial.content}&rdquo;
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '20px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} style={{ width: '18px', height: '18px', fill: i < testimonial.rating ? '#FFC107' : '#E9ECEF', color: i < testimonial.rating ? '#FFC107' : '#E9ECEF' }} />
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                <Image src={testimonial.avatar} alt={testimonial.name} fill sizes="48px" style={{ objectFit: 'cover' }} />
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
          </div>
        </div>
      </div>
    </section>
  );
}
