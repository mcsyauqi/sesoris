'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Mail, Gift } from 'lucide-react';

const POPUP_SHOWN_KEY = 'sesoris_newsletter_popup_shown';
const POPUP_COOLDOWN_DAYS = 7;

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const showPopup = useCallback(() => {
    const lastShown = localStorage.getItem(POPUP_SHOWN_KEY);
    if (lastShown) {
      const daysSince = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      if (daysSince < POPUP_COOLDOWN_DAYS) return;
    }
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Exit-intent: mouse leaves viewport from top
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 5) {
        showPopup();
      }
    }

    // Fallback: show after 45 seconds if user hasn't left
    const timer = setTimeout(() => {
      showPopup();
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [showPopup]);

  function dismiss() {
    setIsVisible(false);
    localStorage.setItem(POPUP_SHOWN_KEY, Date.now().toString());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'exit_popup' }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Subscribed!');
        localStorage.setItem(POPUP_SHOWN_KEY, Date.now().toString());
        setTimeout(() => setIsVisible(false), 3000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 9998,
          animation: 'fadeIn 0.3s ease',
        }}
      />

      {/* Popup */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        background: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        width: 'min(480px, calc(100vw - 32px))',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
        animation: 'slideUp 0.3s ease',
      }}>
        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0,0,0,0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <X style={{ width: '16px', height: '16px' }} />
        </button>

        {/* Green top section */}
        <div style={{
          background: 'linear-gradient(135deg, #1B5E3B 0%, #2E7D4A 100%)',
          padding: '40px 32px 32px',
          textAlign: 'center',
          color: 'white',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <Gift style={{ width: '32px', height: '32px' }} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
            Get 10% OFF Your First Order
          </h2>
          <p style={{ fontSize: '14px', opacity: 0.85, lineHeight: 1.6 }}>
            Join our newsletter and receive exclusive deals, home organization tips, and new product alerts.
          </p>
        </div>

        {/* Form section */}
        <div style={{ padding: '28px 32px 32px' }}>
          {status === 'success' ? (
            <div style={{
              textAlign: 'center',
              padding: '20px',
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: '#E8F5E9',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
              }}>
                <Mail style={{ width: '24px', height: '24px', color: '#1B5E3B' }} />
              </div>
              <p style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>You&apos;re in!</p>
              <p style={{ fontSize: '14px', color: '#6C757D' }}>{message}</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'loading'}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: `1px solid ${status === 'error' ? '#dc3545' : '#DEE2E6'}`,
                    fontSize: '15px',
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    background: '#1B5E3B',
                    color: 'white',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '15px',
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    opacity: status === 'loading' ? 0.7 : 1,
                  }}
                >
                  {status === 'loading' ? 'Subscribing...' : 'Claim My 10% Discount'}
                </button>
              </form>
              {status === 'error' && (
                <p style={{ fontSize: '13px', color: '#dc3545', marginTop: '8px', textAlign: 'center' }}>{message}</p>
              )}
              <p style={{ fontSize: '12px', color: '#ADB5BD', textAlign: 'center', marginTop: '12px' }}>
                No spam, ever. Unsubscribe anytime.
              </p>
              <button
                onClick={dismiss}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: '#ADB5BD',
                  fontSize: '12px',
                  cursor: 'pointer',
                  marginTop: '8px',
                  textAlign: 'center',
                }}
              >
                No thanks, I don&apos;t want a discount
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, -45%) } to { opacity: 1; transform: translate(-50%, -50%) } }
      `}</style>
    </>
  );
}
