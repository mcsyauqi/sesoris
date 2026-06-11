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
    <ToolPageShell
      crumb={TOOL_NAME}
      title="Online Unit Converter"
      subtitle="Convert between cooking units: grams, spoons, cups, milliliters, and more."
    >
      <ToolWidget />

      <ToolSection title="How to Use">
        <ol style={orderedListStyle}>
          <li>Enter the amount you want to convert, for example 100.</li>
          <li>Pick the source unit in the "From" field, for example grams.</li>
          <li>Pick the target unit in the "To" field, for example ounces or kilograms.</li>
          <li>Click the "Calculate" button. The conversion result appears right below, complete with its unit.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Kitchen Unit Conversion Tips">
        <ul style={unorderedListStyle}>
          <li>1 standard recipe cup = 240 ml, while many local drinking glasses hold around 200 ml. Do not mix them up when following a recipe.</li>
          <li>The Indonesian "ons" = 100 grams, which is different from the international ounce (oz) at only 28.35 grams. This converter includes both.</li>
          <li>1 tablespoon (tbsp) = 15 ml and 1 teaspoon (tsp) = 5 ml; handy for measuring liquid seasonings without a scale.</li>
          <li>Converting mass to volume (e.g. grams to ml) requires the ingredient&apos;s density, so this tool intentionally rejects cross-type conversions to keep results honest.</li>
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
