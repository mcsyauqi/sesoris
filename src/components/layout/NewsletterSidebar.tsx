'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export function NewsletterSidebar() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'blog_sidebar' }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Subscribed!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1B5E3B 0%, #2E7D4A 100%)',
      borderRadius: '16px',
      padding: '28px 24px',
      color: 'white',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
      }}>
        <Mail style={{ width: '24px', height: '24px' }} />
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
        Weekly Home Tips
      </h3>
      <p style={{ fontSize: '13px', opacity: 0.85, lineHeight: 1.6, marginBottom: '20px' }}>
        Get home organization ideas, product picks, and exclusive deals delivered weekly.
      </p>

      {status === 'success' ? (
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '10px',
          padding: '14px',
          textAlign: 'center',
          fontSize: '14px',
        }}>
          ✓ {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading'}
            style={{
              padding: '12px 14px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255,255,255,0.12)',
              color: 'white',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '12px',
              borderRadius: '10px',
              background: 'white',
              color: '#1B5E3B',
              border: 'none',
              fontWeight: 600,
              fontSize: '14px',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
            }}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
          </button>
          {status === 'error' && (
            <p style={{ fontSize: '12px', color: '#ffcdd2', textAlign: 'center' }}>{message}</p>
          )}
        </form>
      )}

      <p style={{ fontSize: '11px', opacity: 0.6, textAlign: 'center', marginTop: '12px' }}>
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
