'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

/** Posts to /api/newsletter (Brevo). Shared by the footer and the homepage card. */
export function NewsletterForm({ source, formClass, buttonClass, buttonLabel = 'Subscribe' }: {
  source: string;
  formClass?: string;
  buttonClass?: string;
  buttonLabel?: string;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const id = `newsletter-${source}`;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'You are subscribed.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  if (status === 'success') {
    return <p className="news-status" role="status">{message}</p>;
  }

  return (
    <>
      <form onSubmit={onSubmit} className={formClass}>
        <label htmlFor={id} className="sr-only">Email address</label>
        <input
          id={id}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading'}
          aria-invalid={status === 'error'}
          className="field"
        />
        <button type="submit" disabled={status === 'loading'} className={buttonClass}>
          {status === 'loading' ? 'Sending…' : buttonLabel}
        </button>
      </form>
      {status === 'error' && <p className="news-status is-error" role="alert">{message}</p>}
    </>
  );
}
