import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
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

function formatDateID(date: Date): string {
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
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
        const placeholder = `PLACEHOLDER_IMAGE_${img.filename.replace(`${generated.slug}-`, '')}`;
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

  const post = {
    slug: generated.slug,
    title: generated.title,
    excerpt: generated.excerpt,
    image: heroImage,
    category: generated.category,
    date: toISODate(today),
    dateFormatted: formatDateID(today),
    readTime: generated.readTime,
    author,
    content: contentArray,
  };

  fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf-8');
  console.log(`  [Content] Blog post saved: ${post.slug}`);

  const articleUrl = `${SITE_URL}/blog/${post.slug}`;
  await addAttachment(card.id, articleUrl, `📝 ${post.title}`);
  await addComment(card.id, `✅ Artikel telah dipublikasikan!\n\n**${post.title}**\n${articleUrl}\n\nKategori: ${post.category}\nWaktu baca: ${post.readTime}\nPenulis: ${post.author.name}`);
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
        ? `${prompt}\n\nNote: Saya belum punya data aktual. Buatkan template monitoring report yang siap diisi dengan data, beserta panduan singkat cara mendapatkan setiap data point.`
        : `Buatkan template weekly SEO monitoring report untuk sesoris.com. Include: rankings check, traffic analysis, indexation status, technical issues, backlink review, dan action items. Format yang mudah diisi.`,
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

// --- Email Notification ---
const NOTIFY_EMAIL = 'ahmadthariqsyauqi@gmail.com';

async function sendEmailReport(results: { name: string; label: string; status: string; articleUrl?: string; articleTitle?: string; category?: string; readTime?: string }[], processed: number, errors: number) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  // Fallback to App Password if OAuth2 not configured
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!clientId && !gmailUser) {
    console.log('  [Email] No email credentials configured, skipping email');
    return;
  }

  let transporter;
  if (gmailUser && gmailPass) {
    // Prefer App Password (simpler, more reliable)
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPass },
    });
  } else if (clientId && clientSecret && refreshToken) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: NOTIFY_EMAIL,
        clientId,
        clientSecret,
        refreshToken,
      },
    });
  } else {
    console.log('  [Email] Incomplete email credentials, skipping');
    return;
  }

  const today = formatDateID(new Date());
  const taskRows = results
    .map((r) => `<tr><td style="padding:8px;border:1px solid #e0e0e0">${r.status === 'OK' ? '&#9989;' : '&#10060;'}</td><td style="padding:8px;border:1px solid #e0e0e0">${r.name}</td><td style="padding:8px;border:1px solid #e0e0e0">${r.label}</td><td style="padding:8px;border:1px solid #e0e0e0">${r.status}</td></tr>`)
    .join('\n');

  // Build published articles section
  const publishedArticles = results.filter((r) => r.articleUrl && r.status === 'OK');
  const articlesHtml = publishedArticles.length > 0
    ? `<div style="margin:16px 0;padding:16px;background:#e8f5e9;border-radius:8px;border-left:4px solid #1B5E3B">
        <h3 style="margin:0 0 12px;color:#1B5E3B">📝 Artikel Dipublikasikan Hari Ini</h3>
        ${publishedArticles.map((r) => `
          <div style="margin:8px 0;padding:12px;background:white;border-radius:6px">
            <a href="${r.articleUrl}" style="color:#1B5E3B;font-weight:bold;font-size:16px;text-decoration:none">${r.articleTitle}</a>
            <div style="margin-top:4px;color:#666;font-size:13px">
              ${r.category ? `📂 ${r.category}` : ''} ${r.readTime ? `&nbsp;•&nbsp; ⏱️ ${r.readTime}` : ''}
            </div>
            <a href="${r.articleUrl}" style="display:inline-block;margin-top:8px;padding:6px 16px;background:#1B5E3B;color:white;border-radius:4px;text-decoration:none;font-size:13px">Baca Artikel →</a>
          </div>
        `).join('')}
      </div>`
    : '';

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#1B5E3B;color:white;padding:20px;border-radius:8px 8px 0 0">
        <h2 style="margin:0">Sesoris Task Report</h2>
        <p style="margin:4px 0 0;opacity:0.8">${today}</p>
      </div>
      <div style="padding:20px;background:#f9f9f9;border-radius:0 0 8px 8px">
        <p><strong>${processed}</strong> task selesai, <strong>${errors}</strong> error</p>
        ${articlesHtml}
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          <thead>
            <tr style="background:#1B5E3B;color:white">
              <th style="padding:8px;text-align:left">Status</th>
              <th style="padding:8px;text-align:left">Task</th>
              <th style="padding:8px;text-align:left">Label</th>
              <th style="padding:8px;text-align:left">Result</th>
            </tr>
          </thead>
          <tbody>${taskRows}</tbody>
        </table>
        <p style="color:#666;font-size:13px">Semua task sudah dipindah ke list <strong>Done</strong> di Trello.<br>
        <a href="https://trello.com/b/EPQSmskz/sesoris">Buka Trello Board</a></p>
      </div>
    </div>`;

  await transporter.sendMail({
    from: `"Sesoris Bot" <${gmailUser}>`,
    to: NOTIFY_EMAIL,
    subject: `[Sesoris] ${processed} task selesai - ${today}`,
    html,
  });

  console.log(`  [Email] Report sent to ${NOTIFY_EMAIL}`);
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

  // Send email report
  if (results.length > 0) {
    try {
      await sendEmailReport(results, processed, errors);
    } catch (err) {
      console.error('Failed to send email report:', err);
    }
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
