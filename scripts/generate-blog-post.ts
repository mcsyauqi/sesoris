import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { authors } from './authors';
import { buildRichContentPrompt, getExistingPosts } from './blog-prompt';
import { generateArticleImages } from './generate-image';

const client = new Anthropic();
const blogDir = path.join(process.cwd(), 'content', 'blog');

const categories = ['Tips & Tricks', 'Tutorial', 'Inspiration', 'Lifestyle', 'Review'];

const keywordQueuePath = path.join(process.cwd(), 'data', 'keyword-queue.json');
const keywordConsumedPath = path.join(process.cwd(), 'data', 'keyword-consumed.json');

interface QueuedKeyword {
  keyword: string;
  volume: number;
  category: string;
  intent: string;
  priority: string;
  /**
   * Set when this keyword substring-overlaps an already-published article and the
   * overlap was resolved by locking a distinct angle instead of dropping the keyword.
   * Injected into the generation prompt so the two pages do not cannibalize.
   */
  angleLock?: string;
}

interface KeywordConsumptionLedgerEntry extends QueuedKeyword {
  slug: string;
  date: string;
  status: 'consumed' | 'published' | 'putback' | 'duplicate' | 'skipped-redirect-collision' | 'skipped-non-english';
  note?: string;
}

// Sesoris targets a US/English-speaking audience (site copy, pricing, and blog
// content are all English as of cycle #39, 2026-07-20). Historically the keyword
// queue occasionally received Indonesian-language keywords (leftover from the
// site's original ID-market targeting), which produced bilingual or fully
// Indonesian articles that then had to be manually retargeted after publish.
// This filter rejects those keywords before generation ever starts.
const INDONESIAN_KEYWORD_PATTERN =
  /\b(yang|untuk|dengan|dari|dan|atau|adalah|tidak|bisa|akan|juga|rumah|dapur|kamar|ruang tamu|lemari|rak|keranjang|penyimpanan|murah|terbaik|minimalis|tempel dinding|susun|piring|bumbu|sempit|ala indonesia|jogja|yogyakarta)\b/i;

function isNonEnglishKeyword(keyword: string): boolean {
  return INDONESIAN_KEYWORD_PATTERN.test(keyword);
}

function readKeywordLedger(): KeywordConsumptionLedgerEntry[] {
  if (!fs.existsSync(keywordConsumedPath)) return [];
  return JSON.parse(fs.readFileSync(keywordConsumedPath, 'utf-8'));
}

function appendKeywordLedger(entry: KeywordConsumptionLedgerEntry): void {
  const ledger = readKeywordLedger();
  ledger.push(entry);
  fs.writeFileSync(keywordConsumedPath, JSON.stringify(ledger, null, 2), 'utf-8');
}

function updateLatestKeywordLedgerStatus(
  keyword: QueuedKeyword,
  slug: string,
  status: KeywordConsumptionLedgerEntry['status'],
  note?: string,
): void {
  const ledger = readKeywordLedger();
  for (let i = ledger.length - 1; i >= 0; i -= 1) {
    const entry = ledger[i];
    if (entry.keyword === keyword.keyword && entry.slug === slug) {
      ledger[i] = { ...entry, status, note };
      fs.writeFileSync(keywordConsumedPath, JSON.stringify(ledger, null, 2), 'utf-8');
      return;
    }
  }
  appendKeywordLedger({ ...keyword, slug, date: toISODate(new Date()), status, note });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function getNextKeyword(): { keyword: QueuedKeyword; slug: string; putback: (status?: 'putback' | 'duplicate', note?: string) => void } | null {
  if (!fs.existsSync(keywordQueuePath)) return null;
  const queue: QueuedKeyword[] = JSON.parse(fs.readFileSync(keywordQueuePath, 'utf-8'));
  if (queue.length === 0) return null;

  // Redirect sources may never become article slugs: the pre-publish guard
  // (check-scheduled-publishing.mjs) fails the whole run on a collision, which
  // killed publishing for 3 days straight (2026-07-10..12) when legacy
  // Indonesian keywords collided with data/legacy-blog-redirects.json.
  const legacyRedirectsPath = path.join(process.cwd(), 'data', 'legacy-blog-redirects.json');
  const legacyRedirects: Set<string> = fs.existsSync(legacyRedirectsPath)
    ? new Set(JSON.parse(fs.readFileSync(legacyRedirectsPath, 'utf-8')))
    : new Set();

  // Consume in the queue's reviewed order. Strategy changes such as parking a
  // priority tier require an explicit business decision before they are encoded.
  // Keywords whose slug collides with a redirect source are dropped (never
  // publishable), logged to the ledger, and the next keyword is tried.
  let next: QueuedKeyword | undefined;
  let slug = '';
  while (queue.length > 0) {
    const candidate = queue.shift()!;
    const candidateSlug = slugify(candidate.keyword);
    if (isNonEnglishKeyword(candidate.keyword)) {
      appendKeywordLedger({
        ...candidate,
        slug: candidateSlug,
        date: toISODate(new Date()),
        status: 'skipped-non-english',
        note: 'keyword contains Indonesian-language terms; Sesoris now targets an English-speaking (US) audience',
      });
      console.log(`Skipping "${candidate.keyword}": looks like an Indonesian-language keyword, site targets English/US.`);
      continue;
    }
    if (legacyRedirects.has(candidateSlug)) {
      appendKeywordLedger({
        ...candidate,
        slug: candidateSlug,
        date: toISODate(new Date()),
        status: 'skipped-redirect-collision',
        note: 'slug is a legacy redirect source; article would trip the pre-publish guard',
      });
      console.log(`Skipping "${candidate.keyword}": slug "${candidateSlug}" is a redirect source.`);
      continue;
    }
    const existingArticlePath = path.join(blogDir, `${candidateSlug}.json`);
    if (fs.existsSync(existingArticlePath)) {
      appendKeywordLedger({
        ...candidate,
        slug: candidateSlug,
        date: toISODate(new Date()),
        status: 'duplicate',
        note: `Existing file found for slug: ${candidateSlug}; removed from queue before generation`,
      });
      console.log(`Skipping "${candidate.keyword}": article slug "${candidateSlug}" already exists.`);
      continue;
    }
    next = candidate;
    slug = candidateSlug;
    break;
  }
  fs.writeFileSync(keywordQueuePath, JSON.stringify(queue, null, 2), 'utf-8');
  if (!next) return null;

  // Record the consumed keyword in an append-only ledger.
  const consumed = next;
  appendKeywordLedger({ ...consumed, slug, date: toISODate(new Date()), status: 'consumed' });
  console.log(`Keyword from queue: "${consumed.keyword}" (vol: ${consumed.volume}, ${queue.length} remaining)`);

  // Provide a putback function to restore keyword if generation fails or duplicates an existing slug.
  const putback = (status: 'putback' | 'duplicate' = 'putback', note?: string) => {
    const current: QueuedKeyword[] = fs.existsSync(keywordQueuePath)
      ? JSON.parse(fs.readFileSync(keywordQueuePath, 'utf-8'))
      : [];
    if (!current.some((item) => item.keyword === consumed.keyword)) {
      current.unshift(consumed);
    }
    fs.writeFileSync(keywordQueuePath, JSON.stringify(current, null, 2), 'utf-8');
    updateLatestKeywordLedgerStatus(consumed, slug, status, note);
    console.log(`Keyword returned to queue: "${consumed.keyword}" (${status})`);
  };

  return { keyword: consumed, slug, putback };
}


const productLinkSuggestions = [
  { match: /(desk|office|workspace|meja|lamp|charging|wireless)/i, links: ['[LED Desk Lamp with Wireless Charger](/product/led-desk-lamp-wireless-charger)', '[Bamboo Desk Organizer](/product/bamboo-desk-organizer)', '[Desk & Workspace collection](/category/office-desk)'] },
  { match: /(dish|rack|kitchen|dapur|pantry|container|food|meal|cook)/i, links: ['[Stainless Steel 2-Tier Dish Rack](/product/stainless-steel-2-tier-dish-rack)', '[Portable Blender](/product/portable-blender)', '[Kitchen & Dining collection](/category/kitchen-dining)'] },
  { match: /(storage|box|organizer|declutter|home|shelf|rak|closet|room)/i, links: ['[Foldable Storage Bins](/product/foldable-storage-bins)', '[Floating Wall Shelf Set](/product/rak-dinding-floating-shelf-set)', '[Home & Decor collection](/category/home-living)'] },
  { match: /(travel|pouch|bag|packing|outdoor|trip)/i, links: ['[Travel Toiletry Bag](/product/travel-toiletry-bag)', '[Mesh Zipper Pouches Set](/product/mesh-zipper-pouches-set)', '[Travel & Outdoor collection](/category/outdoor-travel)'] },
  { match: /(self care|wellness|aroma|bath|beauty|skincare|diffuser)/i, links: ['[Aromatherapy Diffuser](/product/aromatherapy-diffuser)', '[Minimalist Wallet](/product/minimalist-wallet)', '[Self Care collection](/category/personal-care)'] },
];

function buildRelatedProductBlock(slug: string, title: string, category: string): string[] {
  const haystack = `${slug} ${title} ${category}`;
  const picked = productLinkSuggestions.find((item) => item.match.test(haystack)) ?? productLinkSuggestions[2];
  return [
    '## Related Products from Sesoris',
    `If you want to turn this guide into a real setup, start with ${picked.links[0]} and ${picked.links[1]}. For broader options, browse the ${picked.links[2]} so the article journey does not stop at reading only.`,
    `Our practical rule: choose one product that solves the main clutter problem first, then add supporting organizers only when the daily workflow is already clear. This keeps the shopping path useful, not pushy.`,
  ];
}

function injectRelatedProductLinks(content: string[], slug: string, title: string, category: string): string[] {
  if (content.some((line) => line.includes('/product/'))) return content;
  const insertAt = content.findIndex((line) => line.startsWith('## Frequently Asked Questions') || line.startsWith('## FAQ'));
  const block = buildRelatedProductBlock(slug, title, category);
  if (insertAt >= 0) return [...content.slice(0, insertAt), ...block, ...content.slice(insertAt)];
  return [...content, ...block];
}

const topicsByDay: Record<number, string> = {
  0: 'lifestyle',        // Sunday
  1: 'home-organization', // Monday
  2: 'kitchen',           // Tuesday
  3: 'workspace',         // Wednesday
  4: 'bedroom',           // Thursday
  5: 'storage',           // Friday
  6: 'plants',            // Saturday
};

function getLeastUsedCategory(existing: { category: string }[]): string {
  const counts: Record<string, number> = {};
  categories.forEach((c) => (counts[c] = 0));
  existing.forEach((p) => {
    if (counts[p.category] !== undefined) counts[p.category]++;
  });
  const sorted = Object.entries(counts).sort((a, b) => a[1] - b[1]);
  return sorted[0][0];
}

function formatDate(date: Date): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Scheduled-publishing override. `PUBLISH_DATE=YYYY-MM-DD npm run generate:blog`
// dates the article in the future, so getAllPosts() (which gates on `date <= today`)
// holds it back until that day arrives. Without it every run publishes same-day,
// which is why the blog had a zero-article forward buffer on 2026-07-31 despite the
// cron running successfully every morning. The date also drives the per-day topic
// bias below, so a run scheduled for a Saturday gets the Saturday topic.
// Noon UTC keeps toISODate() and the local-time formatDate() on the same calendar day.
function resolvePublishDate(): Date {
  const raw = process.env.PUBLISH_DATE?.trim();
  if (!raw) return new Date();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    throw new Error(`PUBLISH_DATE must be YYYY-MM-DD, received: ${raw}`);
  }
  const parsed = new Date(`${raw}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`PUBLISH_DATE is not a real date: ${raw}`);
  }
  return parsed;
}

async function generatePost() {
  const today = resolvePublishDate();
  const dayOfWeek = today.getDay();
  const topicBias = topicsByDay[dayOfWeek] || 'home-organization';
  const existing = getExistingPosts();
  const leastUsedCategory = getLeastUsedCategory(existing);

  // Try to get keyword from queue first
  const nextKeyword = getNextKeyword();
  const queuedKeyword = nextKeyword?.keyword ?? null;
  const queuedSlug = nextKeyword?.slug ?? null;
  const putbackKeyword = nextKeyword?.putback ?? null;

  let basePrompt: string;
  if (queuedKeyword) {
    // This branch fires on every scheduled run (the queue is virtually never empty),
    // so its language instruction IS the site's effective language. It previously said
    // "dalam Bahasa Indonesia", which is why every cycle since #25 shipped fully
    // Indonesian articles under English slugs no matter how many times the published
    // articles were hand-translated after the fact. Root cause, not the keyword queue.
    basePrompt = `Write a NEW blog article in US ENGLISH targeting the keyword: "${queuedKeyword.keyword}"

The article must:
- Be optimized for the target keyword "${queuedKeyword.keyword}"
- Include the keyword naturally in the title, first paragraph, headings, and body
- Be informative, practical, and comprehensive for a US audience
- Be relevant to home & living products
- Never invent data, prices, or case studies
- Be written 100% in US English. Do NOT write any Bahasa Indonesia, and do NOT localize to Indonesia

KEYWORD DATA:
- Target keyword: ${queuedKeyword.keyword}
- Monthly search volume: ${queuedKeyword.volume}
- Category: ${queuedKeyword.category}
- Search intent: ${queuedKeyword.intent}
- Priority: ${queuedKeyword.priority}

TOPIC CONTEXT:
- Least used category: ${leastUsedCategory} (use this if it fits the keyword)
- Available categories: ${categories.join(', ')}${
      queuedKeyword.angleLock
        ? `

ANGLE LOCK (MANDATORY - a published article already covers an overlapping phrase):
${queuedKeyword.angleLock}
Do not restate or re-list the material owned by that existing article. Keep this article on the angle above so the two pages stay distinct.`
        : ''
    }`;
  } else {
    basePrompt = `Write a NEW blog article in English. The article should be:
- Informative, practical, and comprehensive for an international audience
- Relevant to home & living products

TOPIC CONTEXT:
- Today is ${['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][dayOfWeek]}, topic bias: ${topicBias}
- Least used category: ${leastUsedCategory} (prioritize this)
- Available categories: ${categories.join(', ')}`;
  }

  const prompt = buildRichContentPrompt(basePrompt);

  console.log('Generating blog post with Claude Sonnet...');

  // The putback calls below only guard a BAD RESPONSE. If this request THROWS -- expired
  // credit, rate limit, network -- the exception skipped every one of them and the keyword
  // stayed marked `consumed` with no article written. On 2026-08-11 that silently burned 3
  // keywords in a single run while the workflow reported success.
  let message;
  try {
    message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 20000,
      messages: [{ role: 'user', content: prompt }],
    });
  } catch (err) {
    putbackKeyword?.('putback', `API call failed: ${(err as Error).message.slice(0, 200)}`);
    throw err;
  }

  const textBlock = message.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    putbackKeyword?.();
    console.log('No text response from Claude, skipping gracefully');
    process.exit(0);
  }

  // Root-cause guard (2026-07-15 silent no-op): a truncated response is not valid JSON.
  // Surface truncation explicitly instead of a generic parse failure.
  if (message.stop_reason === 'max_tokens') {
    putbackKeyword?.();
    console.log('Claude response truncated (stop_reason=max_tokens), keyword returned to queue');
    process.exit(0);
  }

  let responseText = textBlock.text.trim();
  // Strip markdown code block if present
  if (responseText.startsWith('```')) {
    responseText = responseText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let generated: any;
  try {
    generated = JSON.parse(responseText);
  } catch (err) {
    putbackKeyword?.();
    console.log('Failed to parse Claude response as JSON, skipping gracefully');
    console.log(`Parse error: ${err instanceof Error ? err.message : String(err)}`);
    console.log(`Response head: ${responseText.slice(0, 200)}`);
    console.log(`Response tail: ${responseText.slice(-200)}`);
    process.exit(0);
  }

  // Validate required fields
  const required = ['slug', 'title', 'excerpt', 'category', 'content'] as const;
  for (const field of required) {
    if (!generated[field]) {
      putbackKeyword?.();
      console.log(`Missing required field: ${field}, skipping gracefully`);
      process.exit(0);
    }
  }
  if (!Array.isArray(generated.content) || generated.content.length < 5) {
    putbackKeyword?.();
    console.log('Content must be an array with at least 5 paragraphs, skipping gracefully');
    process.exit(0);
  }

  // Dash lint: strip em/en dashes from all user-facing strings (writing rule: no em dash).
  // Em dash -> " - ", en dash in ranges (8-10, 0-3M) -> "-", leftover en dash -> " - ".
  const lintDashes = (s: string): string =>
    s
      .replace(/\s*—\s*/g, ' - ')
      .replace(/([0-9A-Za-z])\s*–\s*([0-9A-Za-z])/g, '$1-$2')
      .replace(/\s*–\s*/g, ' - ')
      .replace(/&(mdash|#8212);/g, ' - ')
      .replace(/&(ndash|#8211);/g, '-');
  generated.title = lintDashes(generated.title);
  generated.excerpt = lintDashes(generated.excerpt);
  generated.content = generated.content.map((line: string) => lintDashes(line));

  // Language gate (hard fail, not a prompt hint). Sesoris targets the US, but the model
  // has drifted back to Bahasa Indonesia in every cycle since #25 whenever a prompt
  // instruction was the only safeguard. A prose rule that is not enforced by an
  // exit-code gate WILL be violated, so the output is measured, not trusted.
  // Threshold: Indonesian function words are near-absent in real English prose; even a
  // single "yang"/"dengan"/"adalah" per 1000 words means the article drifted.
  const ID_FUNCTION_WORDS =
    /\b(yang|untuk|dengan|dan|adalah|tidak|bisa|dari|pada|akan|atau|juga|karena|sudah|lebih|dalam|kamu|anda|ini|itu|agar|saja|bahwa|oleh|kita|banyak|sangat)\b/gi;
  const bodyForLangCheck = [generated.title, generated.excerpt, ...generated.content].join(' ');
  const idHits = (bodyForLangCheck.match(ID_FUNCTION_WORDS) || []).length;
  const wordCount = bodyForLangCheck.split(/\s+/).filter(Boolean).length;
  const idPerThousand = wordCount > 0 ? (idHits / wordCount) * 1000 : 0;
  if (idPerThousand > 1) {
    putbackKeyword?.('putback', `generated article was not English (${idHits} Indonesian function words / ${wordCount} words)`);
    console.error(
      `LANGUAGE GATE FAILED: article is not US English. ` +
        `${idHits} Indonesian function words in ${wordCount} words (${idPerThousand.toFixed(1)}/1000, limit 1). ` +
        `Keyword returned to queue; nothing was written.`,
    );
    process.exit(1);
  }

  // Currency/unit gate: US audience must never see Rupiah or metric units.
  const currencyViolations = bodyForLangCheck.match(/\bRp\s?[\d.]|\brupiah\b/gi) || [];
  if (currencyViolations.length > 0) {
    putbackKeyword?.('putback', `generated article used Rupiah (${currencyViolations.length} hits)`);
    console.error(`CURRENCY GATE FAILED: found Rupiah in a US-market article (${currencyViolations.length} hits). Nothing was written.`);
    process.exit(1);
  }

  if (queuedKeyword) {
    const targetSlug = queuedSlug ?? slugify(queuedKeyword.keyword);
    const modelSlug = generated.slug;
    generated.slug = targetSlug;
    if (modelSlug !== targetSlug) {
      console.log(`Using keyword-derived slug: ${targetSlug} (model proposed: ${modelSlug})`);
    }
  }

  const filePath = path.join(blogDir, `${generated.slug}.json`);
  if (fs.existsSync(filePath)) {
    if (queuedKeyword) {
      updateLatestKeywordLedgerStatus(
        queuedKeyword,
        generated.slug,
        'duplicate',
        `Existing file found for slug: ${generated.slug}; not returned to queue`,
      );
    }
    console.log(`Post already exists: ${generated.slug}, keyword marked duplicate and discarded to avoid blocking the queue`);
    process.exit(0);
  }

  // Pick random author
  const author = authors[Math.floor(Math.random() * authors.length)];

  // Generate images via Gemini Imagen 4
  let heroImage = '/images/blog/default-hero.webp';
  let contentArray: string[] = generated.content;

  if (generated.image_prompts && generated.image_prompts.length > 0) {
    console.log(`Generating ${generated.image_prompts.length} images...`);
    const imageDescs = generated.image_prompts.map((ip: { filename: string; prompt: string; alt: string }) => ({
      prompt: ip.prompt,
      filename: ip.filename,
      altText: ip.alt,
    }));

    const images = await generateArticleImages(generated.slug, imageDescs);

    // Replace PLACEHOLDER_IMAGE references in content with actual paths
    contentArray = generated.content.map((line: string) => {
      for (const img of images) {
        // Strip slug prefix and .webp extension to match the placeholder name
        const baseName = img.filename.replace(`${generated.slug}-`, '').replace(/\.webp$/, '');
        const placeholder = `PLACEHOLDER_IMAGE_${baseName}`;
        if (line.includes(placeholder)) {
          return line.replace(placeholder, img.publicPath);
        }
      }
      return line;
    });

    // Use first image as hero
    if (images.length > 0) {
      heroImage = images[0].publicPath;
    }
  }

  // Remove any remaining unresolved PLACEHOLDER_IMAGE lines (if image gen failed)
  contentArray = contentArray.filter((line) => !line.includes('PLACEHOLDER_IMAGE'));
  contentArray = injectRelatedProductLinks(contentArray, generated.slug, generated.title, generated.category);

  const post = {
    slug: generated.slug,
    title: generated.title,
    excerpt: generated.excerpt,
    image: heroImage,
    category: generated.category,
    date: toISODate(today),
    dateFormatted: formatDate(today),
    readTime: generated.readTime,
    author,
    content: contentArray,
  };

  fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf-8');
  if (queuedKeyword) {
    updateLatestKeywordLedgerStatus(queuedKeyword, generated.slug, 'published', `Created ${path.relative(process.cwd(), filePath)}`);
  }
  console.log(`Blog post created: ${filePath}`);
  console.log(`Title: ${post.title}`);
  console.log(`Category: ${post.category}`);
  console.log(`Author: ${post.author.name}`);
}

generatePost().catch((err) => {
  console.error('Failed to generate blog post:', err);
  process.exit(1);
});
