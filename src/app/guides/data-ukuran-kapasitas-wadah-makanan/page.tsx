import type { Metadata } from 'next';
import Link from 'next/link';
import { selfReferencingAlternates } from '@/lib/seo-alternates';

type ContainerRow = {
  brand: string;
  model: string;
  capacity: string;
  dimensions: string;
  material: string;
  microwave: string;
  freezer: string;
  source: string;
};

const sourceDate = '2026-09-24';
const pagePath = '/guides/data-ukuran-kapasitas-wadah-makanan';
const pageUrl = `https://www.sesoris.com${pagePath}`;

const containers: ContainerRow[] = [
  {
    brand: 'Rubbermaid',
    model: 'Brilliance Small Rectangle 1.3 Cup',
    capacity: '308 mL / 1.3 cup',
    dimensions: '6.027 × 3.869 × 1.688 in',
    material: 'Plastic',
    microwave: 'Yes',
    freezer: 'Yes',
    source: 'https://www.rubbermaid.com/food-storage/everyday-use-containers/brilliance/brilliance-small-food-storage-container-1.3-cup-rectangle/SP_2551584.html',
  },
  {
    brand: 'Rubbermaid',
    model: 'Brilliance Medium Rectangle 3.2 Cup',
    capacity: '757 mL / 3.2 cup',
    dimensions: '4.875 × 8 × 5.25 in',
    material: 'Plastic',
    microwave: 'Yes',
    freezer: 'Yes',
    source: 'https://www.rubbermaid.com/food-storage/everyday-use-containers/brilliance/brilliance-medium-food-storage-containers-rectangle/SP_2551587.html',
  },
  {
    brand: 'Rubbermaid',
    model: 'Brilliance Large 9.6 Cup',
    capacity: '2,271 mL / 9.6 cup',
    dimensions: '11.046 × 7.595 × 3.095 in',
    material: 'Plastic',
    microwave: 'Yes',
    freezer: 'Yes',
    source: 'https://www.rubbermaid.com/food-storage/everyday-use-containers/brilliance/brilliance-9.6-cup-large-food-storage-container/SP_2551580.html',
  },
  {
    brand: 'Rubbermaid',
    model: 'TakeAlongs Medium Square 5.2 Cup',
    capacity: '1,230 mL / 5.2 cup',
    dimensions: '6.372 × 6.982 × 4.125 in',
    material: 'Plastic',
    microwave: 'Yes',
    freezer: 'Yes',
    source: 'https://www.rubbermaid.com/food-storage/everyday-use-containers/takealongs/takealongs-medium-square-food-storage-containers/SP_2551571.html',
  },
  {
    brand: 'Rubbermaid',
    model: 'TakeAlongs Medium Rectangle 8 Cup',
    capacity: '1,893 mL / 8 cup',
    dimensions: '9.75 × 6.25 × 4.25 in',
    material: 'Plastic',
    microwave: 'Yes',
    freezer: 'Yes',
    source: 'https://www.rubbermaid.com/food-storage/everyday-use-containers/takealongs/takealongs-medium-rectangular-food-storage-containers/SAP_2086750.html',
  },
  {
    brand: 'Rubbermaid',
    model: 'EasyFindLids Medium Divided 4.8 Cup',
    capacity: '1,136 mL / 4.8 cup',
    dimensions: '9.352 × 9.352 × 2.229 in',
    material: 'Plastic',
    microwave: 'Yes',
    freezer: 'Yes',
    source: 'https://www.rubbermaid.com/food-storage/everyday-use-containers/easyfindlids/easyfindlids-medium-food-storage-container-divided/SP_2551592.html',
  },
  {
    brand: 'Rubbermaid',
    model: 'Brilliance Salad Container Medium Deep 4.7 Cup',
    capacity: '1,112 mL / 4.7 cup',
    dimensions: '8.125 × 5.355 × 3.385 in',
    material: 'Plastic',
    microwave: 'Yes',
    freezer: 'Yes',
    source: 'https://www.rubbermaid.com/food-storage/meal-prep-containers/brilliance-food-storage-salad-container-medium-deep-4.7-cup-clear/SP_2551583.html',
  },
  {
    brand: 'Rubbermaid',
    model: 'Brilliance Round Leak-Proof 6.97 Cup',
    capacity: '1,649 mL / 6.97 cup',
    dimensions: '9 × 7.5 × 3.75 in',
    material: 'Tritan plastic',
    microwave: 'Check label',
    freezer: 'Yes',
    source: 'https://www.rubbermaid.com/food-storage/everyday-use-containers/brilliance/rubbermaid-brilliance-round-leak-proof-food-storage-container-6.97-cup/SP_3703961.html',
  },
  {
    brand: 'Rubbermaid',
    model: 'Brilliance Round Leak-Proof 2.17 Cup, 2 Pack',
    capacity: '513 mL / 2.17 cup',
    dimensions: '4.75 × 6 × 7 in',
    material: 'Tritan plastic',
    microwave: 'Check label',
    freezer: 'Yes',
    source: 'https://www.rubbermaid.com/food-storage/everyday-use-containers/brilliance/rubbermaid--brilliance-round-leak-proof-food-storage-containers-2.17-cup-2-pack/SP_3703919.html',
  },
  {
    brand: 'Rubbermaid',
    model: 'Brilliance Pantry Sugar 12 Cup',
    capacity: '2,839 mL / 12 cup',
    dimensions: '7.9 × 5.4 × 7.1 in',
    material: 'BPA-free plastic',
    microwave: 'No',
    freezer: 'Yes',
    source: 'https://www.rubbermaid.com/food-storage/everyday-use-containers/brilliance/brilliance-pantry-sugar-container-bpa-free-plastic-airtight-12-cup/SAP_1994227.html',
  },
  {
    brand: 'Glasslock',
    model: 'OCST-040 Square 1.5 Cup',
    capacity: '355 mL / 1.5 cup',
    dimensions: '4.5 × 4.5 × 2.25 in',
    material: 'Tempered glass',
    microwave: 'Yes, glass only',
    freezer: 'Yes, glass only',
    source: 'https://glasslockusa.com/product/ocst-040-glasslock-oven-safe-square-1-5-cups/',
  },
  {
    brand: 'Glasslock',
    model: 'OCST-090 Square 3.3 Cup',
    capacity: '781 mL / 3.3 cup',
    dimensions: '5.75 × 5.75 × 2.75 in',
    material: 'Tempered glass',
    microwave: 'Yes, glass only',
    freezer: 'Yes, glass only',
    source: 'https://glasslockusa.com/product/ocst-090-glasslock-oven-safe-square-3-3-cups/',
  },
  {
    brand: 'Glasslock',
    model: 'OCST-165 Square 6.0 Cup',
    capacity: '1,420 mL / 6.0 cup',
    dimensions: '7 × 7 × 3 in',
    material: 'Tempered glass',
    microwave: 'Yes, glass only',
    freezer: 'Yes, glass only',
    source: 'https://glasslockusa.com/product/ocst-165-glasslock-oven-safe-square-6-0-cups/',
  },
  {
    brand: 'Glasslock',
    model: 'OCCT-019 Round 0.7 Cup',
    capacity: '166 mL / 0.7 cup',
    dimensions: '3.75 in diameter × 1.75 in h',
    material: 'Tempered glass',
    microwave: 'Yes, glass only',
    freezer: 'Yes, glass only',
    source: 'https://glasslockusa.com/product/occt-019-glasslock-oven-safe-round-0-7-cups/',
  },
  {
    brand: 'Glasslock',
    model: 'OCCT-045 Round 1.6 Cup',
    capacity: '379 mL / 1.6 cup',
    dimensions: '5 in diameter × 2.25 in h',
    material: 'Tempered glass',
    microwave: 'Yes, glass only',
    freezer: 'Yes, glass only',
    source: 'https://glasslockusa.com/product/occt-045-glasslock-oven-safe-round-1-6-cups/',
  },
  {
    brand: 'Glasslock',
    model: 'OCCT-085 Round 3.1 Cup',
    capacity: '733 mL / 3.1 cup',
    dimensions: '6 in diameter × 2.75 in h',
    material: 'Tempered glass',
    microwave: 'Yes, glass only',
    freezer: 'Yes, glass only',
    source: 'https://glasslockusa.com/product/occt-085-glasslock-oven-safe-round-3-1-cups/',
  },
  {
    brand: 'Glasslock',
    model: 'OCCT-148 Round 5.4 Cup',
    capacity: '1,278 mL / 5.4 cup',
    dimensions: '7.25 in diameter × 3 in h',
    material: 'Tempered glass',
    microwave: 'Yes, glass only',
    freezer: 'Yes, glass only',
    source: 'https://glasslockusa.com/product/occt-148-glasslock-oven-safe-round-5-4-cups/',
  },
  {
    brand: 'Glasslock',
    model: 'OCRT-048 Rectangle 1.6 Cup',
    capacity: '379 mL / 1.6 cup',
    dimensions: '5.75 × 3.75 × 2.25 in',
    material: 'Tempered glass',
    microwave: 'Yes, glass only',
    freezer: 'Yes, glass only',
    source: 'https://glasslockusa.com/product/ocrt-048-glasslock-oven-safe-rectangle-1-6-cups/',
  },
  {
    brand: 'Glasslock',
    model: 'OCRT-090 Rectangle 3.5 Cup',
    capacity: '828 mL / 3.5 cup',
    dimensions: '7 × 5 × 2.75 in',
    material: 'Tempered glass',
    microwave: 'Yes, glass only',
    freezer: 'Yes, glass only',
    source: 'https://glasslockusa.com/product/ocrt-090-glasslock-oven-safe-rectangle-3-5-cups/',
  },
  {
    brand: 'Glasslock',
    model: 'OCRT-173 Rectangle 6.3 Cup',
    capacity: '1,491 mL / 6.3 cup',
    dimensions: '8 × 6.25 × 3 in',
    material: 'Tempered glass',
    microwave: 'Yes, glass only',
    freezer: 'Yes, glass only',
    source: 'https://glasslockusa.com/product/ocrt-173-glasslock-oven-safe-rectangle-6-3-cups/',
  },
];

export const metadata: Metadata = {
  title: 'Food Container Size and Capacity Data | Sesoris',
  description: 'A source-backed reference table of 20 popular Rubbermaid and Glasslock food containers with capacity, dimensions, material, microwave, and freezer guidance.',
  alternates: selfReferencingAlternates(pagePath),
  openGraph: {
    title: 'Food Container Size and Capacity Data',
    description: 'Compare 20 food container sizes with source links for capacity, dimensions, material, microwave, and freezer guidance.',
    url: pageUrl,
    siteName: 'Sesoris',
    type: 'article',
  },
};

export default function FoodContainerDataPage() {
  const citations = containers.map((row) => row.source);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Food Container Size and Capacity Data',
    description: metadata.description,
    author: { '@type': 'Organization', name: 'Sesoris', url: 'https://www.sesoris.com/' },
    publisher: { '@type': 'Organization', name: 'Sesoris', url: 'https://www.sesoris.com/' },
    datePublished: sourceDate,
    dateModified: sourceDate,
    mainEntityOfPage: pageUrl,
  };
  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Food container size and capacity reference table',
    description: 'Twenty manufacturer-sourced food container records.',
    creator: { '@type': 'Organization', name: 'Sesoris' },
    dateModified: sourceDate,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    distribution: { '@type': 'DataDownload', contentUrl: pageUrl, encodingFormat: 'text/html' },
    citation: citations,
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sesoris.com/' },
      { '@type': 'ListItem', position: 2, name: 'Buying Guides', item: 'https://www.sesoris.com/guides' },
      { '@type': 'ListItem', position: 3, name: 'Food Container Size Data', item: pageUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#1F2933]">
      {[articleSchema, datasetSchema, breadcrumbSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-16 md:pt-24">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#1B5E3B]">Sesoris reference data</p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[#0D3D23] md:text-6xl">Food container size and capacity data</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-600">Use this table to match a container to a meal, shelf, lunch bag, or freezer drawer. It lists 20 popular containers and links each row to the manufacturer source used for the record.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#DDE8E0] bg-white p-5"><p className="text-3xl font-bold text-[#0D3D23]">20</p><p className="mt-1 text-sm text-slate-600">manufacturer-sourced records</p></div>
          <div className="rounded-2xl border border-[#DDE8E0] bg-white p-5"><p className="text-3xl font-bold text-[#0D3D23]">2 brands</p><p className="mt-1 text-sm text-slate-600">Rubbermaid and Glasslock</p></div>
          <div className="rounded-2xl border border-[#DDE8E0] bg-white p-5"><p className="text-3xl font-bold text-[#0D3D23]">mL + cup</p><p className="mt-1 text-sm text-slate-600">capacity shown in both units</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="overflow-x-auto rounded-3xl border border-[#DDE8E0] bg-white shadow-[0_24px_80px_rgba(18,53,36,0.08)]">
          <table className="min-w-[1500px] w-full border-collapse text-left">
            <caption className="sr-only">Food container size and capacity data</caption>
            <thead className="bg-[#EEF5EE]">
              <tr>
                {['Brand', 'Model', 'Capacity', 'Dimensions', 'Material', 'Microwave', 'Freezer', 'Source'].map((heading) => <th key={heading} scope="col" className="p-4 text-sm font-bold text-[#0D3D23]">{heading}</th>)}
              </tr>
            </thead>
            <tbody>
              {containers.map((row) => (
                <tr key={`${row.brand}-${row.model}`} className="border-t border-slate-100 align-top">
                  <td className="p-4 font-bold text-[#0D3D23]">{row.brand}</td>
                  <td className="p-4 font-semibold text-slate-700">{row.model}</td>
                  <td className="p-4 whitespace-nowrap text-slate-600">{row.capacity}</td>
                  <td className="p-4 whitespace-nowrap text-slate-600">{row.dimensions}</td>
                  <td className="p-4 text-slate-600">{row.material}</td>
                  <td className="p-4 text-slate-600">{row.microwave}</td>
                  <td className="p-4 text-slate-600">{row.freezer}</td>
                  <td className="p-4"><a className="font-bold text-[#A9431C] underline" href={row.source} target="_blank" rel="noreferrer">Official source</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl bg-[#0D3D23] p-7 text-white md:p-9">
          <h2 className="text-3xl font-bold">How to read the numbers</h2>
          <div className="mt-5 space-y-4 leading-8 text-white/85">
            <p>mL values are rounded from the manufacturer cup value using 1 US cup = 236.588 mL. They are a convenient comparison unit, not a promise that every container should be filled to the rim.</p>
            <p>Dimensions are reproduced in the unit and order shown by the manufacturer. A set page may describe the outside footprint of the set rather than one individual container, so use the linked product page when cabinet clearance matters.</p>
            <p>For Glasslock rows, the microwave and freezer notes refer to the tempered-glass container. Lids are polypropylene and should be removed or used only as instructed by the manufacturer before heating.</p>
          </div>
        </article>
        <article className="rounded-3xl border border-[#DDE8E0] bg-white p-7 md:p-9">
          <h2 className="text-3xl font-bold text-[#0D3D23]">Quick size guide</h2>
          <ul className="mt-5 space-y-4 leading-7 text-slate-600">
            <li><strong className="text-[#0D3D23]">Under 500 mL:</strong> sauces, snacks, cut fruit, and single portions.</li>
            <li><strong className="text-[#0D3D23]">500 to 1,000 mL:</strong> lunch portions, leftovers, and prepared sides.</li>
            <li><strong className="text-[#0D3D23]">1,000 to 2,000 mL:</strong> family sides, meal prep, and larger leftovers.</li>
            <li><strong className="text-[#0D3D23]">Over 2,000 mL:</strong> bulk ingredients, pantry storage, and batch cooking.</li>
          </ul>
        </article>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-16 text-slate-600">
        <h2 className="text-3xl font-bold text-[#0D3D23]">Keep the source in view</h2>
        <p className="mt-4 leading-8">Manufacturers can change packaging, dimensions, and care instructions. This reference was checked on {sourceDate}. Open the source in the relevant row before making a purchase or heating decision, especially when the lid is involved.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/guides" className="rounded-full bg-[#1B5E3B] px-5 py-3 font-bold text-white">Back to buying guides</Link>
          <Link href="/shop" className="rounded-full border border-[#1B5E3B] px-5 py-3 font-bold text-[#1B5E3B]">Browse organizers</Link>
        </div>
      </section>
    </main>
  );
}
