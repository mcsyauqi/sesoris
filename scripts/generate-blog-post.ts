import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { authors } from './authors';
import { buildRichContentPrompt, getExistingPosts } from './blog-prompt';
import { generateArticleImages } from './generate-image';

const client = new Anthropic();
const blogDir = path.join(process.cwd(), 'content', 'blog');

const categories = ['Tips & Trik', 'Tutorial', 'Inspirasi', 'Lifestyle', 'Review'];

const topicsByDay: Record<number, string> = {
  0: 'lifestyle',        // Minggu
  1: 'home-organization', // Senin
  2: 'kitchen',           // Selasa
  3: 'workspace',         // Rabu
  4: 'bedroom',           // Kamis
  5: 'storage',           // Jumat
  6: 'plants',            // Sabtu
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
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

async function generatePost() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const topicBias = topicsByDay[dayOfWeek] || 'home-organization';
  const existing = getExistingPosts();
  const leastUsedCategory = getLeastUsedCategory(existing);

  const basePrompt = `Tulis artikel blog BARU dalam Bahasa Indonesia. Artikel harus:
- Informatif, praktis, dan komprehensif untuk pembaca Indonesia
- Relevan dengan produk home & living

KONTEKS TOPIK:
- Hari ini adalah hari ${['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'][dayOfWeek]}, bias topik: ${topicBias}
- Kategori yang paling jarang dipakai: ${leastUsedCategory} (prioritaskan ini)
- Kategori yang tersedia: ${categories.join(', ')}`;

  const prompt = buildRichContentPrompt(basePrompt);

  console.log('Generating blog post with Claude Sonnet...');

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt }],
  });

  const textBlock = message.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude');
  }

  let responseText = textBlock.text.trim();
  // Strip markdown code block if present
  if (responseText.startsWith('```')) {
    responseText = responseText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  const generated = JSON.parse(responseText);

  // Validate required fields
  const required = ['slug', 'title', 'excerpt', 'category', 'content'] as const;
  for (const field of required) {
    if (!generated[field]) throw new Error(`Missing required field: ${field}`);
  }
  if (!Array.isArray(generated.content) || generated.content.length < 5) {
    throw new Error('Content must be an array with at least 5 paragraphs');
  }

  const filePath = path.join(blogDir, `${generated.slug}.json`);
  if (fs.existsSync(filePath)) {
    throw new Error(`Post already exists: ${generated.slug}`);
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
    dateFormatted: formatDate(today),
    readTime: generated.readTime,
    author,
    content: contentArray,
  };

  fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf-8');
  console.log(`Blog post created: ${filePath}`);
  console.log(`Title: ${post.title}`);
  console.log(`Category: ${post.category}`);
  console.log(`Author: ${post.author.name}`);
}

generatePost().catch((err) => {
  console.error('Failed to generate blog post:', err);
  process.exit(1);
});
