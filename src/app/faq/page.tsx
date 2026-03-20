import type { Metadata } from 'next';
import FAQPageClient from './FAQPageClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about Sesoris products, shipping, returns, and more.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Frequently Asked Questions | Sesoris',
    description: 'Find answers to common questions about Sesoris products, shipping, returns, and more.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does shipping take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business day delivery. International orders may take 10-14 business days.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I track my order?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Once your order ships, you'll receive an email with a tracking number. You can also track your order by visiting our Track Order page and entering your order number.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do you ship internationally?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We ship to most countries worldwide. Shipping costs and delivery times vary by location. International customers may be responsible for customs duties and taxes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my package is lost or damaged?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Please contact our customer service within 48 hours of expected delivery. We'll work with the carrier to locate your package or arrange a replacement.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is your return policy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept returns within 30 days of purchase for unused items in original packaging. Some items like personalized products are final sale.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I start a return?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Visit our Returns page, enter your order number, and select the items you wish to return. You'll receive a prepaid shipping label via email.",
      },
    },
    {
      '@type': 'Question',
      name: 'When will I receive my refund?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Refunds are processed within 5-7 business days after we receive your return. The refund will be credited to your original payment method.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I exchange an item?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! You can exchange items for a different size or color. Start an exchange through our Returns page and select "Exchange" as your option.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my payment information secure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. We use SSL encryption and never store your full credit card details. All payments are processed through secure, PCI-compliant payment providers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use multiple payment methods?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Currently, we only support one payment method per order. However, you can use gift cards in combination with another payment method.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if an item is in stock?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Stock availability is shown on each product page. If an item is out of stock, you can sign up for email notifications when it's back.",
      },
    },
    {
      '@type': 'Question',
      name: 'Are your products eco-friendly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many of our products are made with sustainable materials. Look for the "Eco-Friendly" badge on product listings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer product warranties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most products come with a 1-year manufacturer warranty. Extended warranties are available for select items at checkout.',
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQPageClient />
    </>
  );
}
