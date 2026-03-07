import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { authors } from './authors';
import { imagePool, getRandomImage } from './image-pool';

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

function getExistingPosts(): { slug: string; title: string; category: string }[] {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.json'));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const post = JSON.parse(raw);
    return { slug: post.slug, title: post.title, category: post.category };
  });
}

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

  const recentTitles = existing
    .slice(-20)
    .map((p) => `- ${p.title} (${p.category})`)
    .join('\n');

  const imageTopics = Object.keys(imagePool).join(', ');

  const prompt = `Kamu adalah penulis blog profesional untuk Sesoris, toko e-commerce Indonesia yang menjual produk home organization, peralatan dapur, dan kebutuhan rumah tangga. Tagline: "Hidup Lebih Teratur".

Tulis artikel blog BARU dalam Bahasa Indonesia. Artikel harus:
- Informatif, praktis, dan bermanfaat untuk pembaca Indonesia
- Panjang 800-1200 kata
- Memiliki 5-8 heading (## format)
- Menggunakan bahasa yang natural dan ramah, bukan formal kaku
- Relevan dengan produk home & living

KONTEKS TOPIK:
- Hari ini adalah hari ${['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'][dayOfWeek]}, bias topik: ${topicBias}
- Kategori yang paling jarang dipakai: ${leastUsedCategory} (prioritaskan ini)
- Kategori yang tersedia: ${categories.join(', ')}

ARTIKEL YANG SUDAH ADA (jangan duplikasi):
${recentTitles}

TOPIK GAMBAR yang tersedia (pilih satu untuk image_topic): ${imageTopics}

Balas HANYA dalam format JSON berikut (tanpa markdown code block):
{
  "title": "Judul Artikel",
  "slug": "judul-artikel-dalam-kebab-case",
  "excerpt": "Ringkasan 1-2 kalimat",
  "category": "Salah satu dari: ${categories.join(', ')}",
  "readTime": "X menit",
  "image_topic": "salah satu dari: ${imageTopics}",
  "content": [
    "Paragraf pembuka...",
    "## Heading Pertama",
    "Paragraf...",
    "## Heading Kedua",
    "Paragraf...",
    "## Kesimpulan",
    "Paragraf penutup..."
  ]
}`;

  console.log('Generating blog post with Claude Sonnet...');

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
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

  // Pick random author and image
  const author = authors[Math.floor(Math.random() * authors.length)];
  const image = getRandomImage(generated.image_topic || topicBias);

  const post = {
    slug: generated.slug,
    title: generated.title,
    excerpt: generated.excerpt,
    image,
    category: generated.category,
    date: toISODate(today),
    dateFormatted: formatDate(today),
    readTime: generated.readTime,
    author,
    content: generated.content,
  };

  // Validate required fields
  const required = ['slug', 'title', 'excerpt', 'category', 'content'] as const;
  for (const field of required) {
    if (!post[field]) throw new Error(`Missing required field: ${field}`);
  }
  if (!Array.isArray(post.content) || post.content.length < 5) {
    throw new Error('Content must be an array with at least 5 paragraphs');
  }

  // Write to file
  const filePath = path.join(blogDir, `${post.slug}.json`);
  if (fs.existsSync(filePath)) {
    throw new Error(`Post already exists: ${post.slug}`);
  }

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
