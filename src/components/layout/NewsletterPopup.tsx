'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Mail, Copy, Check } from 'lucide-react';

const POPUP_SHOWN_KEY = 'sesoris_newsletter_popup_shown';
const POPUP_COOLDOWN_DAYS = 7;
/** Read by the cart and checkout pages to prefill the coupon box. */
export const WELCOME_CODE_KEY = 'sesoris_welcome_code';

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);

  const showPopup = useCallback(() => {
    let lastShown: string | null = null;
    try {
      lastShown = localStorage.getItem(POPUP_SHOWN_KEY);
    } catch {
      // storage blocked: treat as never shown
    }
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
    try {
      localStorage.setItem(POPUP_SHOWN_KEY, Date.now().toString());
    } catch {
      // storage blocked: the popup may show again next visit
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the code stays selectable on screen
    }
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
        setCode(data.code || '');
        setMessage(
          data.code
            ? data.emailed
              ? `We also emailed it to ${email}. Use it at checkout on your first order.`
              : 'We could not email it right now, so please save it. Use it at checkout on your first order.'
            : data.message || 'You are subscribed.',
        );
        try {
          localStorage.setItem(POPUP_SHOWN_KEY, Date.now().toString());
          if (data.code) localStorage.setItem(WELCOME_CODE_KEY, data.code);
        } catch {
          // storage blocked: the code is still on screen and in the email
        }
        // Stays open: the visitor needs time to copy the code.
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
          background: 'rgb(10 24 17 / 0.5)',
          zIndex: 109, // just under --z-modal
          animation: 'fadeIn 0.3s ease',
        }}
      />

      {/* Popup */}
      <div role="dialog" aria-modal="true" aria-labelledby="popup-title" style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 110, // --z-modal
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        width: 'min(480px, calc(100vw - 32px))',
        boxShadow: '0 32px 64px -24px rgb(10 24 17 / 0.45)',
        animation: 'slideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      }}>
        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgb(255 255 255 / 0.12)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius)',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <X style={{ width: '16px', height: '16px' }} />
        </button>

        {/* Top panel */}
        <div style={{
          background: 'var(--brand-deep)',
          padding: '36px 32px 0',
          color: 'white',
        }}>
          <h2 id="popup-title" style={{ fontSize: '28px', fontWeight: 750, marginBottom: '8px', lineHeight: 1.15, paddingRight: '32px' }}>
            Get 10% off your first order
          </h2>
          <p style={{ fontSize: '15px', color: 'rgb(255 255 255 / 0.82)', lineHeight: 1.6 }}>
            Join our newsletter for deals, home organization guides, and new product alerts.
          </p>
          <div className="ruler" aria-hidden style={{ margin: '24px -32px 0' }} />
        </div>

        {/* Form section */}
        <div style={{ padding: '28px 32px 32px' }}>
          {status === 'success' ? (
            <div role="status" style={{ textAlign: 'center', padding: '4px 0' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'var(--brand-tint)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
              }}>
                <Mail style={{ width: '22px', height: '22px', color: 'var(--brand)' }} />
              </div>
              <p style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: code ? '14px' : '4px', fontSize: '17px' }}>
                {code ? 'Your 10% code' : 'You’re in!'}
              </p>
              {code && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '2px dashed var(--brand)',
                  borderRadius: 'var(--radius)',
                  padding: '10px 10px 10px 16px',
                  marginBottom: '12px',
                }}>
                  <span style={{
                    flex: 1,
                    minWidth: 0,
                    fontSize: '19px',
                    fontWeight: 750,
                    letterSpacing: '0.04em',
                    color: 'var(--brand)',
                    userSelect: 'all',
                    overflowWrap: 'anywhere',
                    textAlign: 'left',
                  }}>{code}</span>
                  <button type="button" onClick={copyCode} className="btn btn-primary" style={{ flexShrink: 0, minHeight: '40px', padding: '0 14px', gap: '6px' }}>
                    {copied ? <Check style={{ width: '16px', height: '16px' }} /> : <Copy style={{ width: '16px', height: '16px' }} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              )}
              <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.6 }}>{message}</p>
              <a href="/shop" onClick={dismiss} className="btn btn-primary" style={{ marginTop: '18px', width: '100%' }}>
                Start shopping
              </a>
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
                  aria-label="Email address"
                  aria-invalid={status === 'error'}
                  className="field"
                  style={{ width: '100%', borderColor: status === 'error' ? 'var(--danger)' : undefined }}
                />
                <button type="submit" disabled={status === 'loading'} className="btn btn-primary">
                  {status === 'loading' ? 'Subscribing…' : 'Get my 10% code'}
                </button>
              </form>
              {status === 'error' && (
                <p style={{ fontSize: '13px', color: 'var(--danger)', marginTop: '8px', textAlign: 'center' }}>{message}</p>
              )}
              <p style={{ fontSize: '13px', color: 'var(--ink-muted)', textAlign: 'center', marginTop: '12px' }}>
                No spam, ever. Unsubscribe anytime.
              </p>
              <button
                onClick={dismiss}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: 'var(--ink-muted)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginTop: '4px',
                  minHeight: '40px',
                  textAlign: 'center',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                No thanks
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
