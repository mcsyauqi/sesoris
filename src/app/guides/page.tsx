import type { Metadata } from 'next';
import Link from 'next/link';
import { comparisonGuides } from '@/data/comparison-guides';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

export const metadata: Metadata = {
  title: 'Home Organization Buying Guides',
  description: 'Practical Sesoris comparison guides for choosing shoe storage, storage boxes, kitchen racks, desk organizers, and small-home storage.',
  alternates: selfReferencingAlternates('/guides'),
};

export default function BuyingGuidesPage() {
  return (
    <main className="min-h-screen bg-[var(--surface-2)] text-[var(--ink)]">
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--brand)]">Sesoris buying guides</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-[var(--brand-deep)] md:text-6xl">Choose storage that fits your space and routine</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">Each guide compares practical options side by side, explains the tradeoffs, and ends with a direct recommendation for different homes and workflows.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {comparisonGuides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="rounded-3xl border border-[var(--brand-line)] bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand)]">{guide.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-bold text-[var(--brand-deep)]">{guide.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{guide.description}</p>
              <span className="mt-5 inline-block font-bold text-[var(--accent-ink)]">Open comparison guide</span>
            </Link>
          ))}
          <Link href="/guides/data-ukuran-kapasitas-wadah-makanan" className="rounded-3xl border border-[var(--brand-line)] bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand)]">Reference data</p>
            <h2 className="mt-3 text-2xl font-bold text-[var(--brand-deep)]">Food container size and capacity data</h2>
            <p className="mt-3 leading-7 text-slate-600">Compare 20 Rubbermaid and Glasslock containers by capacity, dimensions, material, microwave use, and freezer guidance.</p>
            <span className="mt-5 inline-block font-bold text-[var(--accent-ink)]">Open reference table</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
