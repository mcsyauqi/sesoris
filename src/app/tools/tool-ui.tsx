import Link from 'next/link';
import { Home, ChevronRight, Sparkles } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Shared presentation layer for the /tools pages.
 * Uses the site's design language (inline styles + .container/.btn classes
 * from globals.css) instead of Tailwind utilities, because the global
 * unlayered `* { margin:0; padding:0 }` reset overrides Tailwind v4's
 * layered utility classes.
 */

export function ToolPageShell({
  crumb,
  title,
  subtitle,
  children,
}: {
  crumb: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: '#F8F9FA', padding: '12px 0', borderBottom: '1px solid #E9ECEF' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', minWidth: 0 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: '#6C757D', flexShrink: 0 }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D', flexShrink: 0 }} />
            <span
              style={{
                color: '#212529',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {crumb}
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <article style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 0 72px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              background: '#E8F5E9',
              color: '#1B5E3B',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '50px',
              marginBottom: '20px',
            }}
          >
            <Sparkles style={{ width: '14px', height: '14px' }} />
            Free Online Tool
          </span>
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 38px)',
              fontWeight: 700,
              color: '#212529',
              marginBottom: '14px',
              lineHeight: 1.25,
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: '17px', color: '#6C757D', lineHeight: 1.7 }}>{subtitle}</p>
          {children}
        </article>
      </div>
    </>
  );
}

export function ToolSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ margin: '44px 0' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#212529', marginBottom: '16px' }}>{title}</h2>
      {children}
    </section>
  );
}

export const orderedListStyle: CSSProperties = {
  listStyle: 'decimal',
  paddingLeft: '22px',
  color: '#495057',
  fontSize: '15px',
  lineHeight: 1.8,
  display: 'grid',
  gap: '8px',
  margin: 0,
};

export const unorderedListStyle: CSSProperties = {
  ...orderedListStyle,
  listStyle: 'disc',
};

export function FaqCards({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div style={{ display: 'grid', gap: '14px' }}>
      {faqs.map((f, i) => (
        <div
          key={i}
          style={{
            background: 'white',
            border: '1px solid #E9ECEF',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '8px' }}>{f.q}</h3>
          <p style={{ fontSize: '14px', color: '#6C757D', lineHeight: 1.7, margin: 0 }}>{f.a}</p>
        </div>
      ))}
    </div>
  );
}

export function RelatedLinks({ links }: { links: { url: string; title: string }[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {links.map((l, i) => (
        <li key={i}>
          <a
            href={l.url}
            style={{
              display: 'inline-block',
              padding: '8px 18px',
              background: '#E8F5E9',
              color: '#1B5E3B',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            {l.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Styles shared by the interactive ToolWidget client components. */
export const widgetCardStyle: CSSProperties = {
  background: '#F8F9FA',
  border: '1px solid #E9ECEF',
  borderRadius: '16px',
  padding: 'clamp(16px, 3vw, 28px)',
  margin: '32px 0',
};

export const widgetTitleStyle: CSSProperties = {
  fontSize: '20px',
  fontWeight: 700,
  color: '#212529',
  marginBottom: '16px',
};

export const widgetButtonRowStyle: CSSProperties = {
  display: 'flex',
  gap: '12px',
  marginTop: '20px',
  flexWrap: 'wrap',
};

export const widgetResultStyle: CSSProperties = {
  marginTop: '20px',
  padding: '16px 20px',
  background: 'white',
  border: '1px solid #E9ECEF',
  borderRadius: '12px',
  fontSize: '16px',
  lineHeight: 1.7,
};
