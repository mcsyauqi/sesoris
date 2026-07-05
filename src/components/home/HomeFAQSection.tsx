'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What types of home organizers does Sesoris sell?',
    answer: 'Sesoris offers 23 curated products across 9 categories, including Home Living, Kitchen & Dining, Bags & Pouches, Tools & Gadgets, Office Desk Organizers, and Outdoor & Travel Gear. From kitchen racks and food containers to desk organizers and travel bags, all in one place.',
  },
  {
    question: 'Does Sesoris offer free shipping?',
    answer: 'Yes! We offer free shipping on all orders over $50. For orders below that threshold, a flat shipping fee applies based on your location. Most orders are processed within 1 business day and delivered in 2–5 days.',
  },
  {
    question: 'Are Sesoris products good quality?',
    answer: 'Sesoris products are carefully curated for durability and functionality. Our stainless steel kitchen racks, food storage containers, desk organizers, and storage boxes are selected for everyday use. Current product review data in the site catalog averages about 4.7 stars.',
  },
  {
    question: 'How do I choose the right storage solution for my kitchen?',
    answer: 'Start by measuring your available space, countertop, cabinet, and wall space. Then identify what you need to store: spices, cookware, utensils, or dry goods. Our Kitchen & Dining category is organized by use case to make selection easy. For small kitchens, wall-mounted racks and stackable containers work best.',
  },
  {
    question: 'Can I return or exchange a product?',
    answer: 'Yes. We offer a 30-day satisfaction guarantee. If you are not satisfied with your purchase, contact our customer service team via WhatsApp at +62-813-2610-2061 and we will arrange a return or exchange at no extra cost, provided the item is in original condition.',
  },
  {
    question: 'Where is Sesoris based?',
    answer: 'Sesoris is based in Yogyakarta, Indonesia. We ship nationwide across all provinces. For bulk or wholesale inquiries, please contact us directly.',
  },
];

export function HomeFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="section-padding" style={{ background: '#F8F9FA' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading), Georgia, serif',
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 400,
            color: '#212529',
            marginBottom: '12px',
          }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: '#6C757D', fontSize: '15px' }}>
            Everything you need to know about Sesoris products and shopping experience.
          </p>
        </div>

        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: 'white',
                borderRadius: '12px',
                marginBottom: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '18px 20px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                }}
                aria-expanded={openIndex === i}
              >
                <span style={{ fontWeight: 600, fontSize: '15px', color: '#212529', lineHeight: 1.4 }}>
                  {faq.question}
                </span>
                <ChevronDown
                  style={{
                    width: '20px',
                    height: '20px',
                    color: '#1B5E3B',
                    flexShrink: 0,
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>
              {openIndex === i && (
                <div style={{ padding: '0 20px 18px', color: '#6C757D', fontSize: '14px', lineHeight: 1.7 }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <p style={{ color: '#6C757D', fontSize: '14px' }}>
            Still have questions?{' '}
            <Link href="/contact" style={{ color: '#1B5E3B', fontWeight: 600, textDecoration: 'underline' }}>
              Contact our team
            </Link>
            {' '}or browse our{' '}
            <Link href="/blog" style={{ color: '#1B5E3B', fontWeight: 600, textDecoration: 'underline' }}>
              home organization blog
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
