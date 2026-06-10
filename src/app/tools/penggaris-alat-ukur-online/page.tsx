import { Metadata } from 'next';
import ToolWidget from './ToolWidget';

const TOOL_NAME = 'Online Ruler & Measuring Tool';
const TOOL_URL = 'https://www.sesoris.com/tools/penggaris-alat-ukur-online';
const TOOL_DESCRIPTION =
  'Free online ruler with cm, mm, and inch scales right on your screen. Measure small objects without a physical ruler, with easy calibration. Try it now.';

export const metadata: Metadata = {
  title: 'Online Ruler & Measuring Tool (cm, mm, inches)',
  description: TOOL_DESCRIPTION,
  alternates: { canonical: '/tools/penggaris-alat-ukur-online' },
  openGraph: {
    title: 'Online Ruler & Measuring Tool (cm, mm, inches) | Sesoris',
    description: TOOL_DESCRIPTION,
    type: 'website',
    url: '/tools/penggaris-alat-ukur-online',
  },
};

const faqs = [
  {
    q: 'What is the Online Ruler & Measuring Tool?',
    a: 'The Online Ruler & Measuring Tool is a free tool that displays a virtual ruler with cm, mm, and inch scales right on your device screen. No sign-up, no install.',
  },
  {
    q: 'How do I use the Online Ruler & Measuring Tool?',
    a: 'Enter the length of your object, choose cm or inches, then click the "Generate" button. A ruler and a comparison bar matching your object appear on screen instantly.',
  },
  {
    q: 'Is it free?',
    a: 'Yes, 100% free. No watermarks, no limits.',
  },
  {
    q: 'How accurate are the measurements?',
    a: 'Accuracy depends on your screen resolution. For precise results, calibrate first with a standard-size object such as a credit card (3.37 in / 8.56 cm long) before measuring.',
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
];

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Online Ruler & Measuring Tool</h1>
      <p className="text-lg text-gray-700 mb-6">Free Online Ruler & Measuring Tool. Display cm, mm, and inch scales on your screen to measure small objects without a physical ruler. Perfect when you search for an "online ruler".</p>

      <ToolWidget />

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Enter the length of the object you want to measure or compare (in cm or inches).</li>
          <li>Choose the measurement unit: cm/mm or inches.</li>
          <li>Click the "Generate" button. A virtual ruler with a blue bar the length of your object appears on screen instantly.</li>
          <li>Hold a physical object against the screen to compare it with the scale, or read the automatic cm, mm, and inch conversions below the ruler.</li>
        </ol>
      </section>

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Tips for More Accurate Measurements</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Calibrate first: hold a credit card or ID card (standard length 3.37 in / 8.56 cm) against the screen and match it with the ruler scale.</li>
          <li>On a phone, rotate to landscape mode so a longer section of the scale is visible.</li>
          <li>Use the automatic conversions below the ruler when you need mm or inch values without doing the math.</li>
          <li>For high-precision needs (engineering, medical, sewing patterns), always double-check with a physical measuring tool.</li>
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
