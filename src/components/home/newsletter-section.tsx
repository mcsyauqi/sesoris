'use client';

import { useState } from 'react';
import { Send, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setEmail('');
    toast.success('Thanks for subscribing! Check your inbox for a welcome gift.');
  };

  return (
    <section style={{ padding: '64px 0', background: '#1B5E3B', position: 'relative', overflow: 'hidden' }}>
      {/* Background Pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            marginBottom: '24px'
          }}>
            <Gift style={{ width: '32px', height: '32px', color: 'white' }} />
          </div>

          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 700,
            color: 'white',
            marginBottom: '16px'
          }}>
            Subscribe to Our Newsletter
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '18px',
            marginBottom: '32px'
          }}>
            Get special offers, new product updates, and exclusive deals directly to your inbox.
          </p>

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            maxWidth: '480px',
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              style={{
                flex: '1 1 200px',
                minWidth: '200px',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '16px',
                outline: 'none'
              }}
            />
            <Button
              type="submit"
              isLoading={isLoading}
              style={{
                background: 'white',
                color: '#1B5E3B',
                whiteSpace: 'nowrap'
              }}
            >
              <Send style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              Subscribe
            </Button>
          </form>

          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '16px'
          }}>
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
