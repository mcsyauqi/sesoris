/**
 * Batch translate all Indonesian blog articles to English
 * Uses Claude Haiku for cost-efficient translation
 */
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

const client = new Anthropic();
const blogDir = path.join(process.cwd(), 'content', 'blog');

const categoryMap: Record<string, string> = {
  'Tips & Trik': 'Tips & Tricks',
  'Tutorial': 'Tutorial',
  'Inspirasi': 'Inspiration',
  'Lifestyle': 'Lifestyle',
  'Review': 'Review',
};

function translateDate(dateFormatted: string): string {
  const monthMap: Record<string, string> = {
    'Januari': 'January', 'Februari': 'February', 'Maret': 'March',
    'April': 'April', 'Mei': 'May', 'Juni': 'June',
    'Juli': 'July', 'Agustus': 'August', 'September': 'September',
    'Oktober': 'October', 'November': 'November', 'Desember': 'December',
  };
  let result = dateFormatted;
  for (const [id, en] of Object.entries(monthMap)) {
    if (result.includes(id)) {
      // Convert "20 Maret 2026" → "March 20, 2026"
      result = result.replace(id, en);
      const match = result.match(/(\d+)\s+(\w+)\s+(\d+)/);
      if (match) {
        result = `${match[2]} ${match[1]}, ${match[3]}`;
      }
      break;
    }
  }
  return result;
}

function translateReadTime(readTime: string): string {
  return readTime.replace('menit', 'min read').replace('min read read', 'min read');
}

async function translateArticle(filePath: string): Promise<boolean> {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const article = JSON.parse(raw);

  // Skip if already in English (check for common Indonesian words in title)
  const indonesianIndicators = /\b(dan|untuk|yang|dengan|cara|tips|terbaik|rumah|dapur|rak|tempat|membuat|memilih|panduan|rekomendasi|inspirasi|minimalis|modern|lengkap|mudah|praktis|kreatif|solusi|penyimpanan)\b/i;
  if (!indonesianIndicators.test(article.title) && !indonesianIndicators.test(article.excerpt)) {
    return false; // Already English
  }

  const contentStr = JSON.stringify(article.content);

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 8192,
    messages: [{
      role: 'user',
      content: `Translate the following blog article from Indonesian to English. This is for Sesoris, a home & living accessories e-commerce store.

RULES:
- Translate naturally, not word-by-word. Write fluent English.
- Keep all markdown formatting (##, ###, **, [], (), !, >, •, 1., :::)
- Keep all URLs unchanged
- Keep all image paths unchanged (e.g. /images/blog/...)
- Keep "Sesoris" brand name unchanged
- Keep ":::baca-juga" as ":::read-also" (change this specific tag)
- Keep "Baca Juga" section headers as "Related Articles"
- Translate alt text in image markdown to English
- Convert prices from Rp to approximate USD where mentioned (Rp 50.000 ≈ $3, Rp 100.000 ≈ $6, Rp 500.000 ≈ $30)
- Keep external URLs but translate anchor text

TITLE: ${article.title}

EXCERPT: ${article.excerpt}

CONTENT (JSON array of strings):
${contentStr}

Reply ONLY with valid JSON (no markdown code block):
{
  "title": "translated title",
  "excerpt": "translated excerpt (max 160 chars)",
  "content": ["translated content array..."]
}`
    }],
  });

  const textBlock = message.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response');
  }

  let responseText = textBlock.text.trim();
  if (responseText.startsWith('```')) {
    responseText = responseText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  const translated = JSON.parse(responseText);

  // Update article with translations
  article.title = translated.title;
  article.excerpt = translated.excerpt;
  article.content = translated.content;
  article.category = categoryMap[article.category] || article.category;
  article.dateFormatted = translateDate(article.dateFormatted);
  article.readTime = translateReadTime(article.readTime);

  fs.writeFileSync(filePath, JSON.stringify(article, null, 2), 'utf-8');
  return true;
}

async function main() {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.json')).sort();
  console.log(`Found ${files.length} articles to check\n`);

  let translated = 0;
  let skipped = 0;
  let failed = 0;

  // Process in batches of 5 for rate limiting
  for (let i = 0; i < files.length; i += 5) {
    const batch = files.slice(i, i + 5);
    const results = await Promise.allSettled(
      batch.map(async (file) => {
        const filePath = path.join(blogDir, file);
        try {
          const wasTranslated = await translateArticle(filePath);
          if (wasTranslated) {
            translated++;
            console.log(`✅ [${translated + skipped + failed}/${files.length}] ${file}`);
          } else {
            skipped++;
            console.log(`⏭️  [${translated + skipped + failed}/${files.length}] ${file} (already English)`);
          }
        } catch (err) {
          failed++;
          console.error(`❌ [${translated + skipped + failed}/${files.length}] ${file}: ${err}`);
        }
      })
    );

    // Small delay between batches to avoid rate limiting
    if (i + 5 < files.length) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  console.log(`\n=== DONE ===`);
  console.log(`Translated: ${translated}`);
  console.log(`Skipped (already English): ${skipped}`);
  console.log(`Failed: ${failed}`);
}

main().catch(console.error);
