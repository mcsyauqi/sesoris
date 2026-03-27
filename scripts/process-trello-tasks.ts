import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { getBoardCards, moveCardToList, addComment, addAttachment, type TrelloCard } from './trello-client';
import { authors } from './authors';
import { buildRichContentPrompt } from './blog-prompt';
import { generateArticleImages } from './generate-image';

// --- Config ---
const BOARD_ID = '67cd86248c2571637e6ba911';
const LIST_DONE = '69ac3239a74c30d92d890460';
const LIST_INBOX = '69ac323df27189d7f606b192';
const LIST_TODO = '69ac323c20d7386e9533a861';
const SITE_URL = 'https://www.sesoris.com';

const client = new Anthropic();
const blogDir = path.join(process.cwd(), 'content', 'blog');

// --- Helpers ---
function isDueToday(card: TrelloCard): boolean {
  if (!card.due) return false;
  const due = new Date(card.due);
  const today = new Date();
  // Due today or overdue (but not more than 7 days overdue)
  // Use FORCE_DAYS_AHEAD env to expand lookahead for testing
  const lookahead = parseInt(process.env.FORCE_DAYS_AHEAD || '1', 10);
  const diffDays = (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= -lookahead && diffDays <= 7;
}

function getLabel(card: TrelloCard): string {
  return card.labels[0]?.name || '';
}

function extractPrompt(desc: string): string {
  const match = desc.match(/```\n?([\s\S]*?)```/);
  return match ? match[1].trim() : '';
}

function formatDate(date: Date): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// --- Task Processors ---

async function processContentTask(card: TrelloCard): Promise<{ url: string; title: string; category: string; readTime: string } | undefined> {
  console.log(`  [Content] Generating blog article...`);
  const prompt = extractPrompt(card.desc);
  if (!prompt) {
    console.log(`  [Content] No AI prompt found in card, skipping`);
    return;
  }

  const richPrompt = buildRichContentPrompt(prompt);

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    messages: [{
      role: 'user',
      content: richPrompt,
    }],
  });

  const textBlock = message.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') throw new Error('No text from Claude');

  let responseText = textBlock.text.trim();
  if (responseText.startsWith('```')) {
    responseText = responseText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  const generated = JSON.parse(responseText);
  const today = new Date();
  const author = authors[Math.floor(Math.random() * authors.length)];

  const filePath = path.join(blogDir, `${generated.slug}.json`);
  if (fs.existsSync(filePath)) {
    console.log(`  [Content] Post already exists: ${generated.slug}, skipping`);
    return;
  }

  // Generate images via Gemini Imagen 4
  let heroImage = '/images/blog/default-hero.webp';
  let contentArray: string[] = generated.content;

  if (generated.image_prompts && generated.image_prompts.length > 0) {
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
  console.log(`  [Content] Blog post saved: ${post.slug}`);

  const articleUrl = `${SITE_URL}/blog/${post.slug}`;
  await addAttachment(card.id, articleUrl, `📝 ${post.title}`);
  await addComment(card.id, `✅ Article published!\n\n**${post.title}**\n${articleUrl}\n\nCategory: ${post.category}\nRead time: ${post.readTime}\nAuthor: ${post.author.name}`);
  await moveCardToList(card.id, LIST_DONE);
  console.log(`  [Content] Card moved to Done`);

  return { url: articleUrl, title: post.title, category: post.category, readTime: post.readTime };
}

async function processGBPTask(card: TrelloCard): Promise<void> {
  console.log(`  [GBP] Generating Google Business Profile post...`);
  const prompt = extractPrompt(card.desc);
  if (!prompt) {
    console.log(`  [GBP] No AI prompt found, skipping`);
    return;
  }

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  });

  const textBlock = message.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') throw new Error('No text from Claude');

  const content = textBlock.text.trim();
  await addComment(card.id, `📍 **GBP Post Content - Ready to Publish**\n\n${content}`);
  await moveCardToList(card.id, LIST_DONE);
  console.log(`  [GBP] Content added to card, moved to Done`);
}

async function processBacklinkTask(card: TrelloCard): Promise<void> {
  console.log(`  [Backlink] Generating article for external platform...`);
  const prompt = extractPrompt(card.desc);
  if (!prompt) {
    console.log(`  [Backlink] No AI prompt found, skipping`);
    return;
  }

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  const textBlock = message.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') throw new Error('No text from Claude');

  const content = textBlock.text.trim();
  await addComment(card.id, `🔗 **Artikel Backlink - Ready to Submit**\n\n${content}`);
  await moveCardToList(card.id, LIST_DONE);
  console.log(`  [Backlink] Article added to card, moved to Done`);
}

async function processMonitoringTask(card: TrelloCard): Promise<void> {
  console.log(`  [Monitoring] Generating monitoring checklist...`);
  const prompt = extractPrompt(card.desc);

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: prompt
        ? `${prompt}\n\nNote: I don't have actual data yet. Create a monitoring report template ready to be filled with data, along with a brief guide on how to obtain each data point.`
        : `Create a weekly SEO monitoring report template for sesoris.com. Include: rankings check, traffic analysis, indexation status, technical issues, backlink review, and action items. Use an easy-to-fill format.`,
    }],
  });

  const textBlock = message.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') throw new Error('No text from Claude');

  const content = textBlock.text.trim();
  await addComment(card.id, `📊 **Monitoring Report Template**\n\n${content}`);
  await moveCardToList(card.id, LIST_DONE);
  console.log(`  [Monitoring] Report template added, moved to Done`);
}

async function processGenericTask(card: TrelloCard): Promise<void> {
  console.log(`  [Generic] Processing task...`);
  const prompt = extractPrompt(card.desc);
  if (!prompt) {
    console.log(`  [Generic] No AI prompt found, skipping (manual task)`);
    return;
  }

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  });

  const textBlock = message.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') throw new Error('No text from Claude');

  const content = textBlock.text.trim();
  await addComment(card.id, `✅ **Task Output**\n\n${content}`);
  await moveCardToList(card.id, LIST_DONE);
  console.log(`  [Generic] Output added, moved to Done`);
}

// --- Main ---
async function main() {
  console.log('=== Sesoris Trello Task Processor ===');
  console.log(`Date: ${new Date().toISOString()}\n`);

  const cards = await getBoardCards(BOARD_ID);
  const actionableLists = [LIST_INBOX, LIST_TODO];
  const dueTasks = cards.filter(
    (c) => actionableLists.includes(c.idList) && isDueToday(c)
  );

  console.log(`Found ${dueTasks.length} tasks due today/overdue\n`);

  if (dueTasks.length === 0) {
    console.log('No tasks to process. Exiting.');
    return;
  }

  let processed = 0;
  let errors = 0;
  const results: { name: string; label: string; status: string; articleUrl?: string; articleTitle?: string; category?: string; readTime?: string }[] = [];

  for (const card of dueTasks) {
    const label = getLabel(card);
    console.log(`\nProcessing: ${card.name}`);
    console.log(`  Label: ${label} | Due: ${card.due}`);

    try {
      let articleInfo: { url: string; title: string; category: string; readTime: string } | undefined;
      switch (label) {
        case 'Content':
          articleInfo = await processContentTask(card);
          break;
        case 'Local SEO':
          await processGBPTask(card);
          break;
        case 'Off Page':
          await processBacklinkTask(card);
          break;
        case 'Monitoring':
          await processMonitoringTask(card);
          break;
        default:
          await processGenericTask(card);
      }
      processed++;
      results.push({
        name: card.name, label, status: 'OK',
        articleUrl: articleInfo?.url,
        articleTitle: articleInfo?.title,
        category: articleInfo?.category,
        readTime: articleInfo?.readTime,
      });
    } catch (err) {
      console.error(`  ERROR processing ${card.name}:`, err);
      errors++;
      results.push({ name: card.name, label, status: `Error: ${err instanceof Error ? err.message : String(err)}` });
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Processed: ${processed}`);
  console.log(`Errors: ${errors}`);
  console.log(`Total due: ${dueTasks.length}`);

}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
