'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, ChevronDown, Search, HelpCircle } from 'lucide-react';

const faqs = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business day delivery. International orders may take 10-14 business days.',
      },
      {
        q: 'How can I track my order?',
        a: 'Once your order ships, you\'ll receive an email with a tracking number. You can also track your order by visiting our Track Order page and entering your order number.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes! We ship to most countries worldwide. Shipping costs and delivery times vary by location. International customers may be responsible for customs duties and taxes.',
      },
      {
        q: 'What if my package is lost or damaged?',
        a: 'Please contact our customer service within 48 hours of expected delivery. We\'ll work with the carrier to locate your package or arrange a replacement.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 30 days of purchase for unused items in original packaging. Some items like personalized products are final sale.',
      },
      {
        q: 'How do I start a return?',
        a: 'Visit our Returns page, enter your order number, and select the items you wish to return. You\'ll receive a prepaid shipping label via email.',
      },
      {
        q: 'When will I receive my refund?',
        a: 'Refunds are processed within 5-7 business days after we receive your return. The refund will be credited to your original payment method.',
      },
      {
        q: 'Can I exchange an item?',
        a: 'Yes! You can exchange items for a different size or color. Start an exchange through our Returns page and select "Exchange" as your option.',
      },
    ],
  },
  {
    category: 'Payment & Security',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely. We use SSL encryption and never store your full credit card details. All payments are processed through secure, PCI-compliant payment providers.',
      },
      {
        q: 'Can I use multiple payment methods?',
        a: 'Currently, we only support one payment method per order. However, you can use gift cards in combination with another payment method.',
      },
    ],
  },
  {
    category: 'Products',
    questions: [
      {
        q: 'How do I know if an item is in stock?',
        a: 'Stock availability is shown on each product page. If an item is out of stock, you can sign up for email notifications when it\'s back.',
      },
      {
        q: 'Are your products eco-friendly?',
        a: 'Many of our products are made with sustainable materials. Look for the "Eco-Friendly" badge on product listings.',
      },
      {
        q: 'Do you offer product warranties?',
        a: 'Most products come with a 1-year manufacturer warranty. Extended warranties are available for select items at checkout.',
      },
    ],
  },
];

export default function FAQPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: '#5F6873' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#5F6873' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>FAQ</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#E8F5E9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <HelpCircle style={{ width: '32px', height: '32px', color: '#1B5E3B' }} />
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: '#5F6873', fontSize: '16px', marginBottom: '32px' }}>
            Find answers to common questions about orders, shipping, returns, and more.
          </p>

          {/* Search */}
          <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
            <Search style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              color: '#5F6873',
            }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                borderRadius: '12px',
                border: '1px solid #E9ECEF',
                fontSize: '15px',
              }}
            />
          </div>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {filteredFaqs.map((category) => (
            <div key={category.category} style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#212529', marginBottom: '16px' }}>
                {category.category}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {category.questions.map((item, index) => {
                  const key = `${category.category}-${index}`;
                  const isOpen = openItems[key];
                  return (
                    <div
                      key={key}
                      style={{
                        background: 'white',
                        borderRadius: '12px',
                        border: '1px solid #E9ECEF',
                        overflow: 'hidden',
                      }}
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        style={{
                          width: '100%',
                          padding: '16px 20px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <span style={{ fontWeight: 500, color: '#212529' }}>{item.q}</span>
                        <ChevronDown
                          style={{
                            width: '20px',
                            height: '20px',
                            color: '#5F6873',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                            transition: 'transform 0.2s',
                          }}
                        />
                      </button>
                      {isOpen && (
                        <div style={{
                          padding: '0 20px 16px',
                          color: '#5F6873',
                          fontSize: '14px',
                          lineHeight: 1.6,
                        }}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div style={{
          maxWidth: '600px',
          margin: '48px auto 0',
          background: '#F8F9FA',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#212529', marginBottom: '8px' }}>
            Still have questions?
          </h3>
          <p style={{ color: '#5F6873', marginBottom: '20px' }}>
            Can&apos;t find the answer you&apos;re looking for? Our team is here to help.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Contact Support
          </Link>
        </div>
      </div>
    </>
  );
}
