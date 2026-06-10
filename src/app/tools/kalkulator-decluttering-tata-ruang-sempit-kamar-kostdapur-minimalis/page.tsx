import { Metadata } from 'next';
import ToolWidget from './ToolWidget';

const TOOL_NAME = 'Decluttering & Small Space Calculator (Small Bedroom/Minimalist Kitchen)';
const TOOL_URL = 'https://www.sesoris.com/tools/kalkulator-decluttering-tata-ruang-sempit-kamar-kostdapur-minimalis';
const TOOL_DESCRIPTION =
  'Not sure which items to let go? Answer 8 quick questions and get a clear KEEP, REVIEW, or LET GO decision for small bedrooms and minimalist kitchens.';

export const metadata: Metadata = {
  title: 'Free Decluttering & Small Space Calculator',
  description: TOOL_DESCRIPTION,
  alternates: { canonical: '/tools/kalkulator-decluttering-tata-ruang-sempit-kamar-kostdapur-minimalis' },
  openGraph: {
    title: 'Free Decluttering & Small Space Calculator | Sesoris',
    description: TOOL_DESCRIPTION,
    type: 'website',
    url: '/tools/kalkulator-decluttering-tata-ruang-sempit-kamar-kostdapur-minimalis',
  },
};

const faqs = [
  {
    q: 'What is the Decluttering & Small Space Calculator?',
    a: 'The Decluttering & Small Space Calculator is a free online tool that helps you decide which items to keep or let go in seconds, no app install required.',
  },
  {
    q: 'How do I use the Decluttering & Small Space Calculator?',
    a: 'Answer the 8 Yes/No questions above, click the "Calculate" button, and your result appears instantly. Hit Reset to score the next item.',
  },
  {
    q: 'Is the Decluttering & Small Space Calculator free?',
    a: 'Yes, 100% free. No sign-up or login needed.',
  },
  {
    q: 'How accurate is the result?',
    a: 'The score follows a standard decluttering framework. Treat it as a guide; the final decision is always yours.',
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
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Decluttering & Small Space Calculator (Small Bedroom/Minimalist Kitchen)</h1>
      <p className="text-lg text-gray-700 mb-6">Set your decluttering priorities for a small bedroom or kitchen.</p>

      <ToolWidget />

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Hold or picture one item you are unsure about: keep it or let it go?</li>
          <li>Answer 8 Yes/No questions about how often you use it, its emotional value, its condition, and where it is stored.</li>
          <li>Click the "Calculate" button. A score from 0-8 appears along with the decision: KEEP, REVIEW, or LET GO.</li>
          <li>Click "Reset" and repeat for the next item, one at a time.</li>
        </ol>
      </section>

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Small Space Decluttering Tips</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>How to read the score: 6-8 means KEEP, 3-5 means REVIEW, and 0-2 means it is time to LET GO.</li>
          <li>Put REVIEW items in one dedicated box for 30 days. If you never reach for them, they are almost certainly safe to release: donate, sell, or recycle.</li>
          <li>In a small bedroom, prioritize letting go of large items you rarely use; one big item frees up more space than ten small ones.</li>
          <li>In a minimalist kitchen, start with duplicate tools (two spatulas, three similar pots) and expired spices or ingredients.</li>
          <li>Declutter first, then work out your storage box needs so you do not buy containers for items you should be letting go of.</li>
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
