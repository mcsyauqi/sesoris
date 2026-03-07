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

export function buildRichContentPrompt(basePrompt: string): string {
  const existing = getExistingPosts();
  const internalLinks = getInternalLinksContext(existing);

  const existingTitles = existing
    .slice(-20)
    .map((p) => `- ${p.title} (${p.category})`)
    .join('\n');

  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return `Kamu adalah penulis blog profesional untuk Sesoris, toko e-commerce Indonesia yang menjual produk home organization, peralatan dapur, dan kebutuhan rumah tangga. Tagline: "Hidup Lebih Teratur". Website: https://www.sesoris.com

TANGGAL HARI INI: ${currentDate}
TAHUN SEKARANG: ${currentYear}
PENTING: Selalu gunakan tahun ${currentYear} dalam konten. JANGAN gunakan tahun lama seperti 2024 atau 2025.

${basePrompt}

PANDUAN KONTEN BERKUALITAS:
- Artikel harus 1500-2500 kata, informatif dan komprehensif
- Bahasa Indonesia yang natural, ramah, tidak kaku
- Gunakan data/angka spesifik (contoh: "mengurangi kekacauan 40%", "harga mulai Rp 50.000")
- Sertakan tips praktis yang actionable
- Target keyword harus ada di paragraf pertama, minimal 2 H2, dan kesimpulan
- SELALU tulis tahun ${currentYear}, JANGAN pernah tulis 2024 atau 2025
- Konteks harga dalam Rupiah (Rp), relevan untuk pasar Indonesia

FORMAT KONTEN (array of strings):
- "## Heading H2" — heading utama (5-8 per artikel)
- "### Heading H3" — sub-heading
- "Paragraf biasa dengan **bold text** dan [link teks](url)..."
- "• Bullet point item" — untuk list items (tanpa nesting)
- "1. Numbered item" — untuk ordered list
- "> Quote text" — untuk blockquote/highlight
- "![Alt text SEO deskriptif dalam bahasa Indonesia](PLACEHOLDER_IMAGE)" — placeholder gambar (akan di-generate otomatis)
- ":::baca-juga" diikuti link-link, ditutup ":::" — untuk box "Baca Juga"

PANDUAN SEO PENTING:
- Alt text gambar WAJIB deskriptif dan mengandung keyword dalam bahasa Indonesia
- Keyword utama WAJIB ada di: judul, paragraf pertama, minimal 2 heading H2, dan kesimpulan
- Setiap gambar harus punya alt text yang mendeskripsikan gambar secara spesifik
- Heading H2 harus mengandung variasi keyword (LSI keywords)
- Tulis meta description (excerpt) yang mengandung keyword dan CTA, maks 155 karakter

EXTERNAL LINKING (WAJIB minimal 2 external link):
Sisipkan link ke sumber kredibel/otoritatif secara natural dalam konten:
- Situs berita/media: kompas.com, detik.com, cnnindonesia.com
- Marketplace referensi: tokopedia.com, shopee.co.id
- Sumber edukasi: wikipedia.org, kbbi.kemdikbud.go.id
- Situs inspirasi: pinterest.com, houzz.com, ideaonline.co.id
- Sertakan data/statistik dengan sumber yang bisa diverifikasi
Format: [teks anchor natural](https://url-lengkap)

INTERNAL LINKING (WAJIB minimal 5 internal link):
Sisipkan internal link secara natural di dalam paragraf menggunakan format [teks](url).
Juga tambahkan 1-2 box "Baca Juga" di antara section.

${internalLinks}

ARTIKEL YANG SUDAH ADA (jangan duplikasi topik):
${existingTitles || 'Belum ada artikel.'}

BALAS HANYA dalam format JSON (tanpa markdown code block):
{
  "title": "Judul Artikel SEO-Friendly",
  "slug": "judul-dalam-kebab-case",
  "excerpt": "Meta description 1-2 kalimat, maks 160 karakter",
  "category": "Tips & Trik atau Tutorial atau Inspirasi atau Lifestyle atau Review",
  "readTime": "X menit",
  "image_prompts": [
    {
      "filename": "hero",
      "prompt": "Deskripsi foto untuk AI image generator dalam bahasa Inggris, konteks Indonesia, 16:9",
      "alt": "Alt text SEO deskriptif dalam bahasa Indonesia"
    },
    {
      "filename": "section-1",
      "prompt": "Deskripsi foto kedua...",
      "alt": "Alt text kedua..."
    }
  ],
  "content": [
    "Paragraf pembuka yang menarik dengan **keyword utama** dan hook...",
    "![Alt text SEO Indonesia](PLACEHOLDER_IMAGE_hero)",
    "## Heading H2 dengan Keyword",
    "Paragraf informatif dengan [internal link](url)...",
    "### Sub-heading H3",
    "• Bullet point 1 dengan **bold**",
    "• Bullet point 2",
    "![Alt text gambar kedua](PLACEHOLDER_IMAGE_section-1)",
    ":::baca-juga",
    "- [Judul Artikel Terkait](/blog/slug-artikel)",
    "- [Judul Artikel Lain](/blog/slug-lain)",
    ":::",
    "## Heading H2 Kedua dengan LSI Keyword",
    "1. Numbered item pertama",
    "2. Numbered item kedua",
    "> Quote atau highlight penting",
    "## FAQ: Pertanyaan Seputar [Keyword]",
    "**Q: Pertanyaan umum?**",
    "Jawaban lengkap...",
    "## Kesimpulan",
    "Paragraf penutup dengan CTA ke [Sesoris](https://www.sesoris.com)..."
  ]
}`;
}
