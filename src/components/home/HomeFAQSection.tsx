import Link from 'next/link';
import { Plus } from 'lucide-react';
import { products, categories } from '@/data/products';
import { FREE_SHIPPING_MIN, SHIPPING_FEE } from '@/lib/shipping';

// Answers must match checkout.ts (US-only shipping, flat fee) and the returns page.
const faqs = [
  {
    question: 'What types of home organizers does Sesoris sell?',
    answer: `Sesoris offers ${products.length} products across ${categories.length} categories: ${categories.map((c) => c.name).join(', ')}. The range covers pull-out cabinet organizers, spice racks, sink caddies, shoe racks, storage bins and boxes, shelving, closet storage, makeup and toiletry bags, and travel organizers, all shipped from a US warehouse.`,
  },
  {
    question: 'Does Sesoris offer free shipping?',
    answer: `Yes. Shipping is free on orders over $${FREE_SHIPPING_MIN}. Below that, shipping is a flat $${SHIPPING_FEE}. Each product page shows its estimated delivery time.`,
  },
  {
    question: 'Are Sesoris products good quality?',
    answer: 'Sesoris products are chosen for durability and everyday use: chrome-plated and carbon steel racks, food-safe containers, and sturdy fabric and PU organizers. Each listing states the material, measurements, and weight capacity where it applies, so you can judge before you buy.',
  },
  {
    question: 'How do I choose the right storage solution for my kitchen?',
    answer: 'Start by measuring the inside of the space: width, depth, and height, plus any hinges, face frames, or pipes. Then decide what you need to store (spices, cookware, cleaning supplies, or dry goods) and compare with the dimensions and minimum opening listed on each product. For deep base cabinets, a pull-out basket brings the back of the cabinet within reach.',
  },
  {
    question: 'Can I return or exchange a product?',
    answer: 'Yes. You can return a product within 30 days if it is still in its original condition. Contact us by email at admin@sesoris.com or on WhatsApp at +62-813-2610-2061 and we will arrange the return or exchange.',
  },
  {
    question: 'Where is Sesoris based?',
    answer: 'Sesoris was founded in Yogyakarta, Indonesia. Orders ship to addresses in the United States from our US warehouse. For bulk or wholesale inquiries, please contact us directly.',
  },
];

export function HomeFAQSection() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <section className="section-padding">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="container faq-grid">
        <div className="faq-aside">
          <h2 className="section-title">Questions, answered</h2>
          <p className="section-lede">
            Still unsure? <Link href="/contact" className="text-link">Contact us</Link> or browse
            the <Link href="/blog" className="text-link">home organization blog</Link>.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>
                {faq.question}
                <Plus aria-hidden />
              </summary>
              <p className="faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
