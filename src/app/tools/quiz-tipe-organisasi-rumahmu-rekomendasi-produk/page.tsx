import { Metadata } from 'next';
import ToolWidget from './ToolWidget';

const TOOL_NAME = 'Home Organization Style Quiz + Product Recommendations';
const TOOL_URL = 'https://www.sesoris.com/tools/quiz-tipe-organisasi-rumahmu-rekomendasi-produk';
const TOOL_DESCRIPTION =
  'Quick 3-question quiz to discover your home organization style, plus storage product recommendations that fit your space and budget. Take it free now.';

export const metadata: Metadata = {
  title: 'Home Organization Style Quiz + Product Picks',
  description: TOOL_DESCRIPTION,
  alternates: { canonical: '/tools/quiz-tipe-organisasi-rumahmu-rekomendasi-produk' },
  openGraph: {
    title: 'Home Organization Style Quiz + Product Picks | Sesoris',
    description: TOOL_DESCRIPTION,
    type: 'website',
    url: '/tools/quiz-tipe-organisasi-rumahmu-rekomendasi-produk',
  },
};

const faqs = [
  {
    q: 'What is the Home Organization Style Quiz?',
    a: 'The Home Organization Style Quiz is a free online quiz that turns your answers into organizer product recommendations. No sign-up, no install.',
  },
  {
    q: 'How do I take the Home Organization Style Quiz?',
    a: 'Answer 3 short questions about your room, its size, and your budget, then click the "Generate" button. Your recommendation appears instantly.',
  },
  {
    q: 'Is it free?',
    a: 'Yes, 100% free. No watermarks, no limits.',
  },
  {
    q: 'Can I copy my result?',
    a: 'Yes. The result appears in a box you can copy manually, or with the copy button when available.',
  },
  {
    q: 'Does it work on my phone?',
    a: 'Yes. The quiz is responsive and works on phones, tablets, and desktops.',
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
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Home Organization Style Quiz + Product Recommendations</h1>
      <p className="text-lg text-gray-700 mb-6">Answer 3 short questions to discover your home organization style and get storage product recommendations that fit you best.</p>

      <ToolWidget />

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Pick the main room you want to organize: bedroom, kitchen, bathroom, or living room.</li>
          <li>Choose the room size, from small (under 100 sq ft) to large (over 160 sq ft).</li>
          <li>Select the budget you have set aside for organizer products.</li>
          <li>Click the "Generate" button and see your recommendation instantly.</li>
        </ol>
      </section>

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Tips Before Shopping for Organizers</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Answer based on how your room actually is right now, not the ideal version in your head; the recommendation gets much more accurate.</li>
          <li>Start with one room. Tidying the whole house at once quickly gets overwhelming, and most people quit halfway.</li>
          <li>Measure the empty area first (width, height, depth) before buying a new organizer so you do not end up with the wrong size.</li>
          <li>Declutter first, then buy containers. Many people buy storage boxes for items they should really let go of.</li>
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
