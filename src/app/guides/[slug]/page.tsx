import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { comparisonGuides, DEFAULT_GUIDE_DATE, getComparisonGuide } from '@/data/comparison-guides';
import { getProductBySlug } from '@/data/products';

function formatGuideDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
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
    title: guide.title,
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
  const datePublished = guide.datePublished ?? DEFAULT_GUIDE_DATE;
  const dateModified = guide.dateModified ?? datePublished;
  const comparedProducts = guide.options
    .map((option) => (option.productSlug ? { option, product: getProductBySlug(option.productSlug) } : null))
    .filter((entry): entry is { option: (typeof guide.options)[number]; product: NonNullable<ReturnType<typeof getProductBySlug>> } => Boolean(entry?.product));
  const isProductComparison = comparedProducts.length === guide.options.length && comparedProducts.length > 0;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    author: { '@type': 'Organization', name: 'Sesoris', url: 'https://www.sesoris.com/' },
    publisher: { '@type': 'Organization', name: 'Sesoris', url: 'https://www.sesoris.com/' },
    mainEntityOfPage: url,
    datePublished,
    dateModified,
    ...(isProductComparison
      ? { about: comparedProducts.map(({ product }) => ({ '@type': 'Product', name: product.name, url: `https://www.sesoris.com/product/${product.slug}` })) }
      : {}),
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
    <main className="min-h-screen bg-[var(--surface-2)] text-[var(--ink)]">
      {[articleSchema, faqSchema, breadcrumbSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-16 md:pt-24">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand)]">{guide.eyebrow}</p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[var(--brand-deep)] md:text-6xl">{guide.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{guide.description}</p>
        <p className="mt-4 text-sm text-slate-500">
          By Sesoris · Last updated <time dateTime={dateModified}>{formatGuideDate(dateModified)}</time>
          {dateModified !== datePublished && <> · First published <time dateTime={datePublished}>{formatGuideDate(datePublished)}</time></>}
        </p>
        <div className="mt-8 rounded-3xl border border-orange-200 bg-orange-50 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-ink)]">Short verdict</p>
          <p className="mt-3 text-lg font-semibold leading-8 text-[var(--brand-deep)]">{guide.verdict}</p>
        </div>
      </section>

      {isProductComparison && (
        <section className="mx-auto max-w-6xl px-5 py-10" aria-labelledby="compared-products">
          <h2 id="compared-products" className="text-3xl font-bold text-[var(--brand-deep)]">The products compared</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {comparedProducts.map(({ option, product }) => (
              <Link key={product.slug} href={`/product/${product.slug}`} className="flex gap-5 rounded-3xl border border-[var(--brand-line)] bg-white p-5 transition hover:-translate-y-1 hover:shadow-xl">
                <Image src={product.images[0].url} alt={product.images[0].alt} width={128} height={128} className="h-28 w-28 shrink-0 rounded-2xl bg-slate-50 object-contain md:h-32 md:w-32" />
                <span className="flex flex-col">
                  <span className="text-lg font-bold leading-snug text-[var(--brand-deep)]">{product.name}</span>
                  <span className="mt-1 text-sm leading-6 text-slate-600">Best for: {option.bestFor}</span>
                  <span className="mt-auto pt-3 font-bold text-[var(--accent-ink)]">${product.price.toFixed(2)} · View product</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="text-3xl font-bold text-[var(--brand-deep)]">Side-by-side comparison</h2>
        {isProductComparison ? (
          <div className="mt-6 overflow-x-auto rounded-3xl border border-[var(--brand-line)] bg-white shadow-[0_24px_80px_rgba(18,53,36,0.08)]">
            <table className="w-full min-w-[640px] border-collapse">
              <caption className="sr-only">{guide.title}: criteria compared row by row</caption>
              <thead className="bg-[var(--brand-tint)]">
                <tr>
                  <th scope="col" className="p-5 text-left text-sm font-bold text-[var(--brand-deep)]">Criterion</th>
                  {comparedProducts.map(({ product }) => (
                    <th key={product.slug} scope="col" className="p-5 text-left text-sm font-bold text-[var(--brand-deep)]">
                      <Link href={`/product/${product.slug}`} className="underline decoration-[var(--brand-line)] underline-offset-4 hover:text-[var(--brand)]">{product.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100">
                  <th scope="row" className="p-5 text-left align-top font-bold text-[var(--brand-deep)]">Best for</th>
                  {guide.options.map((option) => <td key={`${option.name}-best`} className="p-5 align-top leading-7 text-slate-600">{option.bestFor}</td>)}
                </tr>
                {guide.criteria.map((criterion, index) => (
                  <tr key={criterion} className="border-t border-slate-100">
                    <th scope="row" className="p-5 text-left align-top font-bold text-[var(--brand-deep)]">{criterion}</th>
                    {guide.options.map((option) => <td key={`${option.name}-${criterion}`} className="p-5 align-top leading-7 text-slate-600">{option.values[index]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
        <div className="mt-6 overflow-x-auto rounded-3xl border border-[var(--brand-line)] bg-white shadow-[0_24px_80px_rgba(18,53,36,0.08)]">
          <table className="min-w-[900px] w-full border-collapse">
            <thead className="bg-[var(--brand-tint)]">
              <tr>
                <th className="p-5 text-left text-sm font-bold text-[var(--brand-deep)]">Option</th>
                <th className="p-5 text-left text-sm font-bold text-[var(--brand-deep)]">Best for</th>
                {guide.criteria.map((criterion) => <th key={criterion} className="p-5 text-left text-sm font-bold text-[var(--brand-deep)]">{criterion}</th>)}
              </tr>
            </thead>
            <tbody>
              {guide.options.map((option) => (
                <tr key={option.name} className="border-t border-slate-100">
                  <th className="p-5 text-left align-top font-bold text-[var(--brand-deep)]">{option.name}</th>
                  <td className="p-5 align-top leading-7 text-slate-600">{option.bestFor}</td>
                  {option.values.map((value, index) => <td key={`${option.name}-${guide.criteria[index]}`} className="p-5 align-top leading-7 text-slate-600">{value}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl bg-[var(--brand-deep)] p-7 text-white md:p-9">
          <h2 className="text-3xl font-bold">A reliable buying process</h2>
          <ol className="mt-6 space-y-5">
            {guide.buyingSteps.map((step, index) => (
              <li key={step} className="flex gap-4 leading-7 text-white/85">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] font-bold text-white">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-[var(--brand-deep)]">Who should choose what</h2>
          <div className="mt-6 grid gap-4">
            {guide.recommendations.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[var(--brand-line)] bg-white p-6">
                <h3 className="text-xl font-bold text-[var(--brand-deep)]">{item.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {guide.method && guide.method.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 pt-12" aria-labelledby="method">
          <h2 id="method" className="text-3xl font-bold text-[var(--brand-deep)]">How we compared</h2>
          <div className="mt-6 space-y-4 rounded-3xl border border-[var(--brand-line)] bg-white p-6 leading-7 text-slate-600 md:p-8">
            {guide.method.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p className="text-sm text-slate-500">Table last checked against the Sesoris catalog on <time dateTime={dateModified}>{formatGuideDate(dateModified)}</time>.</p>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-5 py-12">
        <h2 className="text-3xl font-bold text-[var(--brand-deep)]">Frequently asked questions</h2>
        <div className="mt-6 divide-y divide-slate-200 rounded-3xl border border-[var(--brand-line)] bg-white px-6 md:px-8">
          {guide.faqs.map((faq) => (
            <article key={faq.question} className="py-6">
              <h3 className="text-lg font-bold text-[var(--brand-deep)]">{faq.question}</h3>
              <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/shop" className="rounded-full bg-[var(--brand)] px-5 py-3 font-bold text-white">Browse home organizers</Link>
          <Link href="/blog" className="rounded-full border border-[var(--brand)] px-5 py-3 font-bold text-[var(--brand)]">Read more guides</Link>
        </div>
      </section>
    </main>
  );
}
