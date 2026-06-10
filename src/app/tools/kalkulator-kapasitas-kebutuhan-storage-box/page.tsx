import { Metadata } from 'next';
import ToolWidget from './ToolWidget';

const TOOL_NAME = 'Storage Box Capacity Calculator';
const TOOL_URL = 'https://www.sesoris.com/tools/kalkulator-kapasitas-kebutuhan-storage-box';
const TOOL_DESCRIPTION =
  'Calculate how many storage boxes you need based on your clothes, books, shoes, and small items. Free with instant results. Estimate your needs now.';

export const metadata: Metadata = {
  title: 'Storage Box Capacity Calculator: How Many Boxes?',
  description: TOOL_DESCRIPTION,
  alternates: { canonical: '/tools/kalkulator-kapasitas-kebutuhan-storage-box' },
  openGraph: {
    title: 'Storage Box Capacity Calculator: How Many Boxes? | Sesoris',
    description: TOOL_DESCRIPTION,
    type: 'website',
    url: '/tools/kalkulator-kapasitas-kebutuhan-storage-box',
  },
};

const faqs = [
  {
    q: 'What is the Storage Box Capacity Calculator?',
    a: 'The Storage Box Capacity Calculator is a free online tool that helps you estimate how many storage boxes you need in seconds, no app install required.',
  },
  {
    q: 'How do I use the Storage Box Capacity Calculator?',
    a: 'Fill in the input fields above, click the "Calculate" button, and the result appears instantly. Hit Reset to run a new estimate.',
  },
  {
    q: 'Is the Storage Box Capacity Calculator free?',
    a: 'Yes, 100% free. No sign-up or login needed.',
  },
  {
    q: 'Are the results accurate?',
    a: 'Results follow standard volume assumptions and a 75% packing efficiency. Treat them as a guide; your actual item sizes may vary.',
  },
  {
    q: 'Does it work on my phone?',
    a: 'Yes. The tool is responsive and works on phones, tablets, and desktops.',
  },
];
const internalLinks = [
  {
    url: 'https://www.sesoris.com/',
    title: 'Home',
  },
  {
    url: 'https://www.sesoris.com/blog',
    title: 'Blog',
  },
  {
    url: 'https://www.sesoris.com/about',
    title: 'About',
  },
];

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Storage Box Capacity Calculator</h1>
      <p className="text-lg text-gray-700 mb-6">Work out how many storage boxes you need for your belongings.</p>

      <ToolWidget />

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Pick the storage box capacity you plan to use: 30 L (small), 50 L (medium), 80 L (large), or 120 L (jumbo).</li>
          <li>Enter how many clothes, books, pairs of shoes, and other small items you want to store.</li>
          <li>Click the "Calculate" button. The estimated total volume and number of boxes needed appear instantly.</li>
          <li>Repeat with different box sizes to compare which option is the most efficient.</li>
        </ol>
      </section>

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Tips for Choosing Storage Boxes</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>The calculation uses average volume assumptions: 1.5 L per garment, 1 L per book, 3 L per pair of shoes, and 0.5 L per small item.</li>
          <li>Results already account for 75% packing efficiency, since there is always empty space between items.</li>
          <li>A 50 L box is the most versatile for clothing; a 120 L jumbo box suits comforters and seasonal items but gets heavy when full.</li>
          <li>Use vacuum bags for bulky clothing so you can fit more per box.</li>
          <li>Choose clear boxes or add labels so you can find things without unpacking everything.</li>
        </ul>
      </section>

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">{f.q}</h3>
              <p className="text-gray-700">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Related Pages</h2>
        <ul className="space-y-2">
          {internalLinks.map((l, i) => (
            <li key={i}><a href={l.url} className="text-blue-600 hover:underline">{l.title}</a></li>
          ))}
        </ul>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: TOOL_NAME,
          url: TOOL_URL,
          description: TOOL_DESCRIPTION,
          applicationCategory: 'UtilityApplication',
          operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0' },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
          }),
        }}
      />
    </article>
  );
}
