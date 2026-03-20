'use client';

import { useState } from 'react';
import { Gift, Send } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <section className="section-padding" style={{ background: '#1B5E3B', position: 'relative', overflow: 'hidden' }}>
      {/* Pattern Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.05,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <Gift style={{ width: '24px', height: '24px', color: 'white' }} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading), Georgia, serif',
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 400,
            color: 'white',
            marginBottom: '12px'
          }}>
            Subscribe to Our Newsletter
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '28px' }}>
            Get special promotions, new product updates, and exclusive offers delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              style={{
                flex: 1,
                padding: '14px 18px',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                fontSize: '15px',
                minWidth: 0
              }}
            />
            <button
              type="submit"
              style={{
                padding: '14px 24px',
                borderRadius: '8px',
                border: 'none',
                background: 'white',
                color: '#1B5E3B',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                justifyContent: 'center'
              }}
            >
              <Send style={{ width: '16px', height: '16px' }} />
              Subscribe
            </button>
          </form>

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '16px' }}>
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
