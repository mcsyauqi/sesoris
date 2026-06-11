import { Metadata } from 'next';
import ToolWidget from './ToolWidget';
import {
  ToolPageShell,
  ToolSection,
  FaqCards,
  RelatedLinks,
  orderedListStyle,
  unorderedListStyle,
} from '../tool-ui';

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
    <ToolPageShell
      crumb={TOOL_NAME}
      title="Online Ruler & Measuring Tool"
      subtitle='Free Online Ruler & Measuring Tool. Display cm, mm, and inch scales on your screen to measure small objects without a physical ruler. Perfect when you search for an "online ruler".'
    >
      <ToolWidget />

      <ToolSection title="How to Use">
        <ol style={orderedListStyle}>
          <li>Enter the length of the object you want to measure or compare (in cm or inches).</li>
          <li>Choose the measurement unit: cm/mm or inches.</li>
          <li>Click the "Generate" button. A virtual ruler with a green bar the length of your object appears on screen instantly.</li>
          <li>Hold a physical object against the screen to compare it with the scale, or read the automatic cm, mm, and inch conversions below the ruler.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Tips for More Accurate Measurements">
        <ul style={unorderedListStyle}>
          <li>Calibrate first: hold a credit card or ID card (standard length 3.37 in / 8.56 cm) against the screen and match it with the ruler scale.</li>
          <li>On a phone, rotate to landscape mode so a longer section of the scale is visible.</li>
          <li>Use the automatic conversions below the ruler when you need mm or inch values without doing the math.</li>
          <li>For high-precision needs (engineering, medical, sewing patterns), always double-check with a physical measuring tool.</li>
        </ul>
      </ToolSection>

      <ToolSection title="Frequently Asked Questions">
        <FaqCards faqs={faqs} />
      </ToolSection>

      <ToolSection title="Related Pages">
        <RelatedLinks links={internalLinks} />
      </ToolSection>

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
    </ToolPageShell>
  );
}
