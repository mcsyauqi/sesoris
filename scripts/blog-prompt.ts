// Shared blog article prompt builder for rich content generation
import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'content', 'blog');

export interface ExistingPost {
  slug: string;
  title: string;
  category: string;
}

export function getExistingPosts(): ExistingPost[] {
  try {
    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.json'));
    return files.map((file) => {
      const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
      const post = JSON.parse(raw);
      return { slug: post.slug, title: post.title, category: post.category };
    });
  } catch {
    return [];
  }
}

export function getInternalLinksContext(existing: ExistingPost[]): string {
  if (existing.length === 0) return 'No existing articles yet.';

  const blogLinks = existing
    .map((p) => `- [${p.title}](/blog/${p.slug})`)
    .join('\n');

  const sitePages = [
    '- [Sesoris Home](https://www.sesoris.com)',
    '- [All Products](https://www.sesoris.com/shop)',
    '- [Collections](https://www.sesoris.com/collections)',
    '- [Best Sellers](https://www.sesoris.com/best-sellers)',
    '- [New Arrivals](https://www.sesoris.com/new-arrivals)',
    '- [About Us](https://www.sesoris.com/about)',
    '- [Blog](https://www.sesoris.com/blog)',
  ].join('\n');

  return `SITE PAGES:\n${sitePages}\n\nEXISTING BLOG ARTICLES:\n${blogLinks}`;
}

export function buildRichContentPrompt(basePrompt: string): string {
  const existing = getExistingPosts();
  const internalLinks = getInternalLinksContext(existing);

  const existingTitles = existing
    .slice(-20)
    .map((p) => `- ${p.title} (${p.category})`)
    .join('\n');

  const currentYear = new Date().getFullYear();
  // Sesoris targets a US/English-speaking audience. Locale must be en-US, otherwise
  // the model reads an Indonesian date string as a language cue and drifts back to ID.
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return `You are a professional blog writer for Sesoris, an e-commerce store selling home organization, kitchen, and household essentials. Tagline: "Live More Organized". Website: https://www.sesoris.com

AUDIENCE AND LANGUAGE (NON-NEGOTIABLE):
Sesoris targets the UNITED STATES market. Every single word you output must be US English.
Do NOT write in Bahasa Indonesia. Do NOT reference Indonesia, Indonesian homes, Indonesian
house types (e.g. "rumah tipe 36"), Jakarta, Jogja, or Rupiah anywhere in the article.

TODAY'S DATE: ${currentDate}
CURRENT YEAR: ${currentYear}
IMPORTANT: Always use the year ${currentYear} in content. DO NOT use old years like 2024 or 2025.

${basePrompt}

CONTENT QUALITY GUIDELINES:
- Articles should be 1500-2500 words, informative and comprehensive
- CRITICAL: Write ENTIRELY in natural US English. Do not mix in any Bahasa Indonesia words or sentences
- Use "I" consistently when an author perspective is needed
- Use natural, friendly, conversational US English for American households
- Use only verifiable specific data. Do not invent percentages, prices, case studies, or test results
- Include practical, actionable tips
- Target keyword must appear in the first paragraph, at least 2 H2 headings, and the conclusion
- ALWAYS write the year ${currentYear}, NEVER write 2024 or 2025
- Prices must use US dollars (US$) and reflect the US market. NEVER use Rupiah / "Rp"
- Measurements must use US imperial units (inches, feet, pounds, quarts). NEVER use cm, m, kg, or liters
- Never use an em dash in public content

CONTENT FORMAT (array of strings):
- "## Heading H2", main headings (5-8 per article)
- "### Heading H3", sub-headings
- "Regular paragraph with **bold text** and [link text](url)..."
- "• Bullet point item", for list items (no nesting)
- "1. Numbered item", for ordered lists
- "> Quote text", for blockquotes/highlights
- "![Descriptive SEO alt text in US English](PLACEHOLDER_IMAGE)", image placeholder (will be auto-generated)
- ":::read-also" followed by links, closed with ":::", for the "Also Read" box

SEO GUIDELINES (IMPORTANT):
- Image alt text MUST be descriptive and contain keywords naturally, in US English
- Primary keyword MUST appear in: title, first paragraph, at least 2 H2 headings, and conclusion
- Every image must have alt text that specifically describes the image
- H2 headings should contain keyword variations (LSI keywords)
- Write a meta description (excerpt) containing the keyword and a CTA, max 155 characters

EXTERNAL LINKING (REQUIRED, at least 2 external links):
Naturally insert links to credible/authoritative sources within the content:
- Home & lifestyle media: houzz.com, thespruce.com, goodhousekeeping.com
- Inspiration: pinterest.com, architecturaldigest.com
- Educational sources: wikipedia.org, realsimple.com
- Include data/statistics from verifiable sources
Format: [natural anchor text](https://full-url)

INTERNAL LINKING (REQUIRED, at least 5 internal links):
Insert internal links naturally within paragraphs using [text](url) format.
Also add 1-2 "Related Articles" boxes between sections.

${internalLinks}

EXISTING ARTICLES (do not duplicate topics):
${existingTitles || 'No articles yet.'}

RESPOND ONLY in JSON format (without markdown code block):
{
  "title": "SEO-Friendly Article Title",
  "slug": "title-in-kebab-case",
  "excerpt": "Meta description in 1-2 sentences, max 160 characters",
  "category": "Tips & Tricks or Tutorial or Inspiration or Lifestyle or Review",
  "readTime": "X min read",
  "image_prompts": [
    {
      "filename": "hero",
      "prompt": "Photo description for AI image generator, home/lifestyle context, 16:9 aspect ratio",
      "alt": "Descriptive SEO alt text in English"
    },
    {
      "filename": "section-1",
      "prompt": "Second photo description...",
      "alt": "Second alt text..."
    }
  ],
  "content": [
    "Engaging opening paragraph with **primary keyword** and hook...",
    "![SEO alt text in English](PLACEHOLDER_IMAGE_hero)",
    "## H2 Heading with Keyword",
    "Informative paragraph with [internal link](url)...",
    "### H3 Sub-heading",
    "• Bullet point 1 with **bold**",
    "• Bullet point 2",
    "![Second image alt text](PLACEHOLDER_IMAGE_section-1)",
    ":::read-also",
    "- [Related Article Title](/blog/article-slug)",
    "- [Another Article Title](/blog/another-slug)",
    ":::",
    "## Second H2 Heading with LSI Keyword",
    "1. First numbered item",
    "2. Second numbered item",
    "> Important quote or highlight",
    "## FAQ: Frequently Asked Questions About [Keyword]",
    "**Q: Common question?**",
    "Detailed answer...",
    "## Conclusion",
    "Closing paragraph with CTA to [Sesoris](https://www.sesoris.com)..."
  ]
}`;
}
