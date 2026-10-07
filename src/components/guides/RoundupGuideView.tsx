import Image from 'next/image';
import Link from 'next/link';
import type { RoundupGuide } from '@/data/roundup-guides';
import { getProductBySlug } from '@/data/products';

const BASE = 'https://www.sesoris.com';

function formatGuideDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

function resolvePicks(guide: RoundupGuide) {
  return guide.picks.map((pick) => {
    const product = getProductBySlug(pick.productSlug);
    if (!product) throw new Error(`RoundupGuideView: unknown product ${pick.productSlug}`);
    return { pick, product };
  });
}

function buildSchemas(guide: RoundupGuide) {
  const url = `${BASE}/guides/${guide.slug}`;
  const picks = resolvePicks(guide);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.description,
      author: { '@type': 'Organization', name: 'Sesoris', url: `${BASE}/` },
      publisher: { '@type': 'Organization', name: 'Sesoris', url: `${BASE}/` },
      mainEntityOfPage: url,
      datePublished: guide.datePublished,
      dateModified: guide.dateModified,
      ...(guide.sources.length ? { citation: guide.sources.map((source) => source.url) } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: guide.title,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: picks.length,
      itemListElement: picks.map(({ pick, product }, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${BASE}/product/${product.slug}`,
        item: {
          '@type': 'Product',
          name: product.name,
          description: `${pick.award}. ${pick.why}`,
          url: `${BASE}/product/${product.slug}`,
          image: `${BASE}${product.images[0].url}`,
          offers: {
            '@type': 'Offer',
            price: product.price.toFixed(2),
            priceCurrency: 'USD',
            availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            url: `${BASE}/product/${product.slug}`,
          },
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: 'Buying Guides', item: `${BASE}/guides` },
        { '@type': 'ListItem', position: 3, name: guide.title, item: url },
      ],
    },
  ];
}

export default function RoundupGuideView({ guide }: { guide: RoundupGuide }) {
  const picks = resolvePicks(guide);
  const cell = 'p-4 align-top text-sm leading-6 text-slate-600';
  const head = 'p-4 text-left text-sm font-bold text-[var(--brand-deep)]';

  return (
    <main className="min-h-screen bg-[var(--surface-2)] text-[var(--ink)]">
      {buildSchemas(guide).map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="mx-auto max-w-6xl px-5 pb-10 pt-16 md:pt-24">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand)]">{guide.eyebrow}</p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[var(--brand-deep)] md:text-6xl">{guide.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{guide.description}</p>
        <p className="mt-4 text-sm text-slate-500">
          By Sesoris · Last updated <time dateTime={guide.dateModified}>{formatGuideDate(guide.dateModified)}</time> · Every product listed is sold by Sesoris
        </p>
        <div className="mt-8 rounded-3xl border border-orange-200 bg-orange-50 p-6 md:p-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-ink)]">Short answer</h2>
          <p className="mt-3 text-lg font-semibold leading-8 text-[var(--brand-deep)]">{guide.answer}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-6" aria-labelledby="key-numbers">
        <h2 id="key-numbers" className="text-3xl font-bold text-[var(--brand-deep)]">Key numbers</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {guide.keyNumbers.map((item) => (
            <li key={item} className="rounded-2xl border border-[var(--brand-line)] bg-white p-5 leading-7 text-slate-700">{item}</li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10" aria-labelledby="at-a-glance">
        <h2 id="at-a-glance" className="text-3xl font-bold text-[var(--brand-deep)]">The picks at a glance</h2>
        <div className="mt-6 overflow-x-auto rounded-3xl border border-[var(--brand-line)] bg-white shadow-[0_24px_80px_rgba(18,53,36,0.08)]">
          <table className="w-full min-w-[960px] border-collapse">
            <caption className="sr-only">{guide.title}: each pick with its price and listed specifications</caption>
            <thead className="bg-[var(--brand-tint)]">
              <tr>
                <th scope="col" className={head}>#</th>
                <th scope="col" className={head}>Product</th>
                <th scope="col" className={head}>Price</th>
                {guide.columns.map((column) => <th key={column} scope="col" className={head}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {picks.map(({ pick, product }, index) => (
                <tr key={product.slug} className="border-t border-slate-100">
                  <td className={`${cell} font-bold`}>{index + 1}</td>
                  <th scope="row" className="p-4 text-left align-top text-sm">
                    <Link href={`/product/${product.slug}`} className="font-bold text-[var(--brand-deep)] underline decoration-[var(--brand-line)] underline-offset-4 hover:text-[var(--brand)]">{product.name}</Link>
                    <span className="mt-1 block font-semibold text-[var(--accent-ink)]">{pick.award}</span>
                  </th>
                  <td className={`${cell} font-bold text-[var(--brand-deep)]`}>${product.price.toFixed(2)}</td>
                  {pick.cells.map((value, cellIndex) => <td key={guide.columns[cellIndex]} className={cell}>{value}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-6" aria-labelledby="picks">
        <h2 id="picks" className="text-3xl font-bold text-[var(--brand-deep)]">Why each pick made the list</h2>
        <div className="mt-6 grid gap-5">
          {picks.map(({ pick, product }, index) => (
            <article key={product.slug} className="flex flex-col gap-5 rounded-3xl border border-[var(--brand-line)] bg-white p-5 md:flex-row md:p-6">
              <Link href={`/product/${product.slug}`} className="shrink-0">
                <Image src={product.images[0].url} alt={product.images[0].alt} width={160} height={160} className="h-36 w-36 rounded-2xl bg-slate-50 object-contain md:h-40 md:w-40" />
              </Link>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand)]">{index + 1}. {pick.award}</p>
                <h3 className="mt-2 text-xl font-bold text-[var(--brand-deep)]">
                  <Link href={`/product/${product.slug}`} className="hover:text-[var(--brand)]">{product.name}</Link>
                </h3>
                <p className="mt-2 leading-7 text-slate-600">{pick.why}</p>
                <p className="mt-2 leading-7 text-slate-600"><strong className="text-[var(--brand-deep)]">Watch out:</strong> {pick.watchOut}</p>
                <Link href={`/product/${product.slug}`} className="mt-3 inline-block font-bold text-[var(--accent-ink)]">${product.price.toFixed(2)} · View product</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pt-12" aria-labelledby="method">
        <h2 id="method" className="text-3xl font-bold text-[var(--brand-deep)]">How we picked and calculated</h2>
        <div className="mt-6 space-y-4 rounded-3xl border border-[var(--brand-line)] bg-white p-6 leading-7 text-slate-600 md:p-8">
          {guide.method.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {guide.sources.length > 0 && (
            <div>
              <p className="font-bold text-[var(--brand-deep)]">Sources</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {guide.sources.map((source) => (
                  <li key={source.url}><a href={source.url} rel="noopener" target="_blank" className="underline underline-offset-4 hover:text-[var(--brand)]">{source.label}</a></li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-sm text-slate-500">Table last checked against the Sesoris catalog on <time dateTime={guide.dateModified}>{formatGuideDate(guide.dateModified)}</time>.</p>
        </div>
      </section>

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
        <h2 className="mt-10 text-2xl font-bold text-[var(--brand-deep)]">Related reading</h2>
        <ul className="mt-4 space-y-2">
          {guide.related.map((link) => (
            <li key={link.href}><Link href={link.href} className="font-semibold text-[var(--brand)] underline underline-offset-4">{link.label}</Link></li>
          ))}
        </ul>
      </section>
    </main>
  );
}
