// Shared blog article prompt builder for rich content generation
import fs from 'fs';
import path from 'path';
import { imagePool, getRandomImage } from './image-pool';

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
  if (existing.length === 0) return 'Belum ada artikel lain.';

  const blogLinks = existing
    .map((p) => `- [${p.title}](/blog/${p.slug})`)
    .join('\n');

  const sitePages = [
    '- [Beranda Sesoris](https://www.sesoris.com)',
    '- [Semua Produk](https://www.sesoris.com/shop)',
    '- [Koleksi](https://www.sesoris.com/collections)',
    '- [Best Sellers](https://www.sesoris.com/best-sellers)',
    '- [New Arrivals](https://www.sesoris.com/new-arrivals)',
    '- [Tentang Kami](https://www.sesoris.com/about)',
    '- [Blog](https://www.sesoris.com/blog)',
  ].join('\n');

  return `HALAMAN SITUS:\n${sitePages}\n\nARTIKEL BLOG YANG SUDAH ADA:\n${blogLinks}`;
}

export function getSectionImages(topic: string): string[] {
  const images = imagePool[topic] || imagePool['home-organization'];
  // Return 2-3 random images for section use
  const shuffled = [...images].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export function buildRichContentPrompt(basePrompt: string, imageTopic?: string): string {
  const existing = getExistingPosts();
  const internalLinks = getInternalLinksContext(existing);
  const imageTopics = Object.keys(imagePool).join(', ');
  const sectionImages = imageTopic ? getSectionImages(imageTopic) : [];

  const existingTitles = existing
    .slice(-20)
    .map((p) => `- ${p.title} (${p.category})`)
    .join('\n');

  return `Kamu adalah penulis blog profesional untuk Sesoris, toko e-commerce Indonesia yang menjual produk home organization, peralatan dapur, dan kebutuhan rumah tangga. Tagline: "Hidup Lebih Teratur". Website: https://www.sesoris.com

${basePrompt}

PANDUAN KONTEN BERKUALITAS:
- Artikel harus 1500-2500 kata, informatif dan komprehensif
- Bahasa Indonesia yang natural, ramah, tidak kaku
- Gunakan data/angka spesifik (contoh: "mengurangi kekacauan 40%", "harga mulai Rp 50.000")
- Sertakan tips praktis yang actionable
- Target keyword harus ada di paragraf pertama, minimal 2 H2, dan kesimpulan

FORMAT KONTEN (array of strings):
- "## Heading H2" — heading utama (5-8 per artikel)
- "### Heading H3" — sub-heading
- "Paragraf biasa dengan **bold text** dan [link teks](url)..."
- "• Bullet point item" — untuk list items (tanpa nesting)
- "1. Numbered item" — untuk ordered list
- "> Quote text" — untuk blockquote/highlight
- "![Deskripsi gambar](URL_GAMBAR)" — untuk gambar di dalam artikel
- ":::baca-juga" diikuti link-link, ditutup ":::" — untuk box "Baca Juga"

INTERNAL LINKING (WAJIB minimal 5 internal link):
Sisipkan internal link secara natural di dalam paragraf menggunakan format [teks](url).
Juga tambahkan 1-2 box "Baca Juga" di antara section.

${internalLinks}

ARTIKEL YANG SUDAH ADA (jangan duplikasi topik):
${existingTitles || 'Belum ada artikel.'}

${sectionImages.length > 0 ? `GAMBAR UNTUK SECTION (gunakan 2-3 di dalam artikel):
${sectionImages.map((url, i) => `- Gambar ${i + 1}: ${url}`).join('\n')}` : ''}

TOPIK GAMBAR yang tersedia (pilih satu untuk image_topic): ${imageTopics}

BALAS HANYA dalam format JSON (tanpa markdown code block):
{
  "title": "Judul Artikel SEO-Friendly",
  "slug": "judul-dalam-kebab-case",
  "excerpt": "Meta description 1-2 kalimat, maks 160 karakter",
  "category": "Tips & Trik atau Tutorial atau Inspirasi atau Lifestyle atau Review",
  "readTime": "X menit",
  "image_topic": "salah satu dari: ${imageTopics}",
  "content": [
    "Paragraf pembuka yang menarik dengan **keyword utama** dan hook...",
    "![Deskripsi gambar](URL_GAMBAR)",
    "## Heading H2 Pertama",
    "Paragraf informatif dengan [internal link](url)...",
    "### Sub-heading H3",
    "• Bullet point 1 dengan **bold**",
    "• Bullet point 2",
    ":::baca-juga",
    "- [Judul Artikel Terkait](/blog/slug-artikel)",
    "- [Judul Artikel Lain](/blog/slug-lain)",
    ":::",
    "## Heading H2 Kedua",
    "1. Numbered item pertama",
    "2. Numbered item kedua",
    "> Quote atau highlight penting",
    "## FAQ",
    "**Q: Pertanyaan umum?**",
    "Jawaban lengkap...",
    "## Kesimpulan",
    "Paragraf penutup dengan CTA ke [Sesoris](https://www.sesoris.com)..."
  ]
}`;
}
