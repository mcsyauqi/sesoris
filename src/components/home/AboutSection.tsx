import Link from 'next/link';
import { ArrowRight, Ruler, RotateCcw, MapPin } from 'lucide-react';
import { NewsletterForm } from '@/components/layout/NewsletterForm';

export function AboutSection() {
  return (
    <section className="section-padding" style={{ background: 'var(--surface-2)' }}>
      <div className="container about-news">
        <div className="about-copy">
          <h2 className="section-title" style={{ marginBottom: 20 }}>A small store with a narrow focus</h2>
          <p>
            Sesoris is an independent home organization store founded in Yogyakarta, Indonesia. We keep
            the catalog small on purpose: organizers we can describe precisely,
            with real measurements and stock in a US warehouse.
          </p>
          <p>
            If something does not fit or is not what you expected, you have 30 days to send it back.
            Questions before you order? Message us and a person answers.
          </p>
          <ul className="about-facts">
            <li><Ruler aria-hidden /> Sizes and specs up front</li>
            <li><RotateCcw aria-hidden /> 30-day returns</li>
            <li><MapPin aria-hidden /> Ships from the US</li>
          </ul>
          <Link href="/about" className="btn btn-outline">
            About Sesoris <ArrowRight aria-hidden />
          </Link>
        </div>

        <div className="news-card">
          <h2>New organizers and guides, by email</h2>
          <p>Get new products and the best of the blog in your inbox. No spam, unsubscribe anytime.</p>
          <NewsletterForm source="homepage" formClass="news-form" buttonClass="btn btn-light" />
          <div className="ruler" aria-hidden />
        </div>
      </div>
    </section>
  );
}
