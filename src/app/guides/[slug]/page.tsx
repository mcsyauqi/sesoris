import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { comparisonGuides, getComparisonGuide } from '@/data/comparison-guides';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return comparisonGuides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getComparisonGuide(slug);
  if (!guide) return {};
  const path = `/guides/${guide.slug}`;
  return {
    title: `${guide.title} | Sesoris`,
    description: guide.description,
    alternates: selfReferencingAlternates(path),
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://www.sesoris.com${path}`,
      siteName: 'Sesoris',
      type: 'article',
    },
  };
}

export default async function ComparisonGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getComparisonGuide(slug);
  if (!guide) notFound();

  const url = `https://www.sesoris.com/guides/${guide.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    author: { '@type': 'Organization', name: 'Sesoris', url: 'https://www.sesoris.com/' },
    publisher: { '@type': 'Organization', name: 'Sesoris', url: 'https://www.sesoris.com/' },
    mainEntityOfPage: url,
    datePublished: '2026-08-12',
    dateModified: '2026-08-12',
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sesoris.com/' },
      { '@type': 'ListItem', position: 2, name: 'Buying Guides', item: 'https://www.sesoris.com/guides' },
      { '@type': 'ListItem', position: 3, name: guide.title, item: url },
    ],
  };

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#1F2933]">
      {[articleSchema, faqSchema, breadcrumbSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-16 md:pt-24">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#1B5E3B]">{guide.eyebrow}</p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[#0D3D23] md:text-6xl">{guide.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{guide.description}</p>
        <div className="mt-8 rounded-3xl border border-orange-200 bg-orange-50 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A9431C]">Short verdict</p>
          <p className="mt-3 text-lg font-semibold leading-8 text-[#0D3D23]">{guide.verdict}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="text-3xl font-bold text-[#0D3D23]">Side-by-side comparison</h2>
        <div className="mt-6 overflow-x-auto rounded-3xl border border-[#DDE8E0] bg-white shadow-[0_24px_80px_rgba(18,53,36,0.08)]">
          <table className="min-w-[900px] w-full border-collapse">
            <thead className="bg-[#EEF5EE]">
              <tr>
                <th className="p-5 text-left text-sm font-bold text-[#0D3D23]">Option</th>
                <th className="p-5 text-left text-sm font-bold text-[#0D3D23]">Best for</th>
                {guide.criteria.map((criterion) => <th key={criterion} className="p-5 text-left text-sm font-bold text-[#0D3D23]">{criterion}</th>)}
              </tr>
            </thead>
            <tbody>
              {guide.options.map((option) => (
                <tr key={option.name} className="border-t border-slate-100">
                  <th className="p-5 text-left align-top font-bold text-[#0D3D23]">{option.name}</th>
                  <td className="p-5 align-top leading-7 text-slate-600">{option.bestFor}</td>
                  {option.values.map((value, index) => <td key={`${option.name}-${guide.criteria[index]}`} className="p-5 align-top leading-7 text-slate-600">{value}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl bg-[#0D3D23] p-7 text-white md:p-9">
          <h2 className="text-3xl font-bold">A reliable buying process</h2>
          <ol className="mt-6 space-y-5">
            {guide.buyingSteps.map((step, index) => (
              <li key={step} className="flex gap-4 leading-7 text-white/85">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6B35] font-bold text-white">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-[#0D3D23]">Who should choose what</h2>
          <div className="mt-6 grid gap-4">
            {guide.recommendations.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#DDE8E0] bg-white p-6">
                <h3 className="text-xl font-bold text-[#0D3D23]">{item.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12">
        <h2 className="text-3xl font-bold text-[#0D3D23]">Frequently asked questions</h2>
        <div className="mt-6 divide-y divide-slate-200 rounded-3xl border border-[#DDE8E0] bg-white px-6 md:px-8">
          {guide.faqs.map((faq) => (
            <article key={faq.question} className="py-6">
              <h3 className="text-lg font-bold text-[#0D3D23]">{faq.question}</h3>
              <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/shop" className="rounded-full bg-[#1B5E3B] px-5 py-3 font-bold text-white">Browse home organizers</Link>
          <Link href="/blog" className="rounded-full border border-[#1B5E3B] px-5 py-3 font-bold text-[#1B5E3B]">Read more guides</Link>
        </div>
      </section>
    </main>
  );
}
