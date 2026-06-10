import { Metadata } from 'next';
import ToolWidget from './ToolWidget';

const TOOL_NAME = 'Online Unit Converter';
const TOOL_URL = 'https://www.sesoris.com/tools/konverter-satuan-online';
const TOOL_DESCRIPTION =
  'Free online cooking unit converter: grams, kg, ounces, cups, tablespoons, teaspoons, ml, and liters. Instant results for everyday recipes. Try it now.';

export const metadata: Metadata = {
  title: 'Online Unit Converter: Grams, Cups, Tbsp, ml',
  description: TOOL_DESCRIPTION,
  alternates: { canonical: '/tools/konverter-satuan-online' },
  openGraph: {
    title: 'Online Unit Converter: Grams, Cups, Tbsp, ml | Sesoris',
    description: TOOL_DESCRIPTION,
    type: 'website',
    url: '/tools/konverter-satuan-online',
  },
};

const faqs = [
  {
    q: 'What is the Online Unit Converter?',
    a: 'The Online Unit Converter is a free online tool that helps you convert cooking and kitchen units in seconds, no app install required.',
  },
  {
    q: 'How do I use the Online Unit Converter?',
    a: 'Fill in the input fields above, click the "Calculate" button, and the result appears instantly. Hit Reset to start a new conversion.',
  },
  {
    q: 'Is the Online Unit Converter free?',
    a: 'Yes, 100% free. No sign-up or login needed.',
  },
  {
    q: 'Are the results accurate?',
    a: 'Results follow standard conversion formulas. Treat them as a guide; consult a professional for critical decisions.',
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
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Online Unit Converter</h1>
      <p className="text-lg text-gray-700 mb-6">Convert between cooking units: grams, spoons, cups, milliliters, and more.</p>

      <ToolWidget />

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Enter the amount you want to convert, for example 100.</li>
          <li>Pick the source unit in the "From" field, for example grams.</li>
          <li>Pick the target unit in the "To" field, for example ounces or kilograms.</li>
          <li>Click the "Calculate" button. The conversion result appears right below, complete with its unit.</li>
        </ol>
      </section>

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Kitchen Unit Conversion Tips</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>1 standard recipe cup = 240 ml, while many local drinking glasses hold around 200 ml. Do not mix them up when following a recipe.</li>
          <li>The Indonesian "ons" = 100 grams, which is different from the international ounce (oz) at only 28.35 grams. This converter includes both.</li>
          <li>1 tablespoon (tbsp) = 15 ml and 1 teaspoon (tsp) = 5 ml; handy for measuring liquid seasonings without a scale.</li>
          <li>Converting mass to volume (e.g. grams to ml) requires the ingredient&apos;s density, so this tool intentionally rejects cross-type conversions to keep results honest.</li>
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
