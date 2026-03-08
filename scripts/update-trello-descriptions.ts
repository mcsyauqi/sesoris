// Update all Sesoris Trello content cards with rich, optimized descriptions
// Modeled after Creativism's detailed card format for maximum AI output quality

const TRELLO_API_KEY = process.env.TRELLO_API_KEY!;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN!;
const BOARD_ID = '67cd86248c2571637e6ba911';

// --- Article data (same as create-content-calendar.ts) ---
interface ArticlePlan {
  keyword: string;
  title: string;
  category: string;
  searchVolume: number;
  prompt: string;
}

// --- LSI Keywords per topic cluster ---
const LSI_KEYWORDS: Record<string, string[]> = {
  kitchen: [
    'dapur', 'memasak', 'peralatan masak', 'kitchen set', 'organisasi dapur',
    'rumah tangga', 'penyimpanan dapur', 'bersih', 'rapi', 'fungsional',
    'higienis', 'anti karat', 'stainless steel', 'aluminium', 'food grade',
  ],
  dekorasi: [
    'desain interior', 'estetik', 'modern', 'minimalis', 'ruang tamu',
    'dekorasi rumah', 'hiasan dinding', 'furniture', 'pencahayaan', 'warna cat',
    'Instagramable', 'aesthetic', 'cozy', 'nyaman', 'elegan',
  ],
  bathroom: [
    'kamar mandi', 'toilet', 'shower', 'wastafel', 'anti air',
    'penyimpanan', 'kebersihan', 'modern', 'stainless', 'anti karat',
    'waterproof', 'higienis', 'compact', 'space-saving', 'pemasangan',
  ],
  storage: [
    'organizer', 'storage', 'rapi', 'decluttering', 'KonMari',
    'box penyimpanan', 'container', 'home organization', 'label', 'kategori',
    'hemat ruang', 'multifungsi', 'stackable', 'foldable', 'transparent',
  ],
  lifestyle: [
    'gaya hidup', 'sustainable', 'rumah tangga', 'keluarga', 'praktis',
    'hemat', 'tips rumah', 'produktif', 'efisien', 'ramah lingkungan',
    'zero waste', 'minimalis', 'self-care', 'work from home', 'rutinitas',
  ],
  seasonal: [
    'Ramadhan', 'Lebaran', 'Idul Fitri', 'hari raya', 'dekorasi',
    'persiapan', 'tamu', 'silaturahmi', 'hampers', 'kue lebaran',
    'bersih-bersih', 'mudik', 'tradisi', 'kebersamaan', 'berkah',
  ],
};

// Map keyword to topic cluster for LSI
function getTopicCluster(keyword: string, category: string): string {
  const kw = keyword.toLowerCase();
  if (kw.includes('kamar mandi') || kw.includes('sabun') || kw.includes('handuk') || kw.includes('bathroom') || kw.includes('toilet')) return 'bathroom';
  if (kw.includes('ramadhan') || kw.includes('lebaran') || kw.includes('hampers')) return 'seasonal';
  if (kw.includes('dekorasi') || kw.includes('aesthetic') || kw.includes('estetik') || kw.includes('ruang tamu')) return 'dekorasi';
  if (kw.includes('organiz') || kw.includes('storage') || kw.includes('penyimpan') || kw.includes('declutter') || kw.includes('wardrobe') || kw.includes('sepatu') || kw.includes('make up')) return 'storage';
  if (kw.includes('sustainable') || kw.includes('zero waste') || kw.includes('tanaman') || kw.includes('work from home') || kw.includes('bersih-bersih') || kw.includes('meal prep')) return 'lifestyle';
  if (kw.includes('dapur') || kw.includes('rak piring') || kw.includes('bumbu') || kw.includes('kompor') || kw.includes('kitchen') || kw.includes('alat') || kw.includes('perlengkapan') || kw.includes('lemari piring') || kw.includes('wastafel') || kw.includes('cuci piring') || kw.includes('tempat piring') || kw.includes('mini bar') || kw.includes('pantry') || kw.includes('container makanan') || kw.includes('lemari makan') || kw.includes('rak stenlis') || kw.includes('lemari rak')) return 'kitchen';
  // Fallback based on category
  if (category === 'Review' || category === 'Tutorial') return 'kitchen';
  if (category === 'Inspirasi') return 'dekorasi';
  if (category === 'Lifestyle') return 'lifestyle';
  return 'storage';
}

function getSearchIntent(category: string, keyword: string): { type: string; guide: string } {
  const kw = keyword.toLowerCase();

  if (kw.includes('harga') || kw.includes('rekomendasi') || kw.includes('terbaik') || kw.includes('review') || kw.includes('murah')) {
    return {
      type: 'Commercial Investigation',
      guide: 'User sedang membandingkan produk sebelum membeli. Fokus: perbandingan fitur, harga, pro-cons, rekomendasi spesifik dengan CTA ke produk.',
    };
  }

  if (kw.includes('cara') || kw.includes('tips') || kw.includes('panduan') || kw.includes('tutorial') || kw.includes('diy')) {
    return {
      type: 'Informational (How-to)',
      guide: 'User mencari langkah-langkah praktis. Fokus: step-by-step yang jelas, visual aids, tips dari pengalaman, common mistakes.',
    };
  }

  if (category === 'Review') {
    return {
      type: 'Commercial Investigation',
      guide: 'User sedang riset produk. Fokus: spesifikasi detail, perbandingan material, kisaran harga, rekomendasi berdasarkan budget dan kebutuhan.',
    };
  }

  if (category === 'Inspirasi') {
    return {
      type: 'Informational (Inspirational)',
      guide: 'User mencari ide dan inspirasi visual. Fokus: banyak contoh konkret, tren terkini, visual description, mood/atmosphere.',
    };
  }

  if (category === 'Tutorial') {
    return {
      type: 'Informational (How-to)',
      guide: 'User ingin belajar langkah-langkah. Fokus: tutorial detail, material/tools needed, estimasi biaya, tips dari pengalaman.',
    };
  }

  return {
    type: 'Informational (General)',
    guide: 'User mencari informasi umum. Fokus: comprehensive coverage, struktur jelas, tips praktis, data pendukung.',
  };
}

function getPriority(sv: number): { label: string; score: number; duration: string } {
  if (sv >= 5000) return { label: 'HIGH', score: Math.round(sv * 0.08), duration: '2-3 jam' };
  if (sv >= 1500) return { label: 'MEDIUM', score: Math.round(sv * 0.06), duration: '1.5-2 jam' };
  return { label: 'LOW', score: Math.round(sv * 0.05), duration: '1-1.5 jam' };
}

function estimateKD(sv: number): { value: number; label: string } {
  if (sv >= 10000) return { value: 55, label: 'Hard' };
  if (sv >= 5000) return { value: 42, label: 'Medium' };
  if (sv >= 2000) return { value: 32, label: 'Medium-Low' };
  if (sv >= 1000) return { value: 22, label: 'Low' };
  return { value: 15, label: 'Very Low' };
}

function generateH2Structure(keyword: string, category: string, prompt: string): string {
  const kw = keyword;
  const structures: string[] = [];

  if (category === 'Review') {
    structures.push(
      `[H2] Apa Itu ${kw.charAt(0).toUpperCase() + kw.slice(1)}?`,
      `[H2] Jenis-Jenis ${kw.charAt(0).toUpperCase() + kw.slice(1)} yang Tersedia`,
      `[H2] Cara Memilih ${kw.charAt(0).toUpperCase() + kw.slice(1)} yang Tepat`,
      `[H2] Rekomendasi ${kw.charAt(0).toUpperCase() + kw.slice(1)} Terbaik`,
      `[H2] Perbandingan Harga dan Kualitas`,
      `[H2] Tips Perawatan agar Awet`,
      `[H2] Kesimpulan`,
      `[H2] FAQ: Pertanyaan Seputar ${kw.charAt(0).toUpperCase() + kw.slice(1)}`,
    );
  } else if (category === 'Tutorial') {
    structures.push(
      `[H2] Mengapa ${kw.charAt(0).toUpperCase() + kw.slice(1)} Penting?`,
      `[H2] Material dan Alat yang Dibutuhkan`,
      `[H2] Langkah-Langkah ${kw.charAt(0).toUpperCase() + kw.slice(1)}`,
      `[H2] Tips dari Ahli untuk Hasil Maksimal`,
      `[H2] Kesalahan yang Harus Dihindari`,
      `[H2] Estimasi Biaya dan Waktu`,
      `[H2] Kesimpulan`,
      `[H2] FAQ: Pertanyaan Seputar ${kw.charAt(0).toUpperCase() + kw.slice(1)}`,
    );
  } else if (category === 'Inspirasi') {
    structures.push(
      `[H2] Tren ${kw.charAt(0).toUpperCase() + kw.slice(1)} Terkini`,
      `[H2] Inspirasi Desain ${kw.charAt(0).toUpperCase() + kw.slice(1)}`,
      `[H2] Kombinasi Warna dan Material`,
      `[H2] Tips Implementasi dengan Budget Terbatas`,
      `[H2] Produk Pendukung yang Direkomendasikan`,
      `[H2] Kesimpulan`,
      `[H2] FAQ: Pertanyaan Seputar ${kw.charAt(0).toUpperCase() + kw.slice(1)}`,
    );
  } else {
    structures.push(
      `[H2] Mengapa ${kw.charAt(0).toUpperCase() + kw.slice(1)} Penting?`,
      `[H2] Tips Praktis ${kw.charAt(0).toUpperCase() + kw.slice(1)}`,
      `[H2] Cara Implementasi Step-by-Step`,
      `[H2] Produk yang Membantu ${kw.charAt(0).toUpperCase() + kw.slice(1)}`,
      `[H2] Kesalahan Umum dan Cara Menghindarinya`,
      `[H2] Kesimpulan`,
      `[H2] FAQ: Pertanyaan Seputar ${kw.charAt(0).toUpperCase() + kw.slice(1)}`,
    );
  }

  return structures.join('\n');
}

function buildRichDescription(article: ArticlePlan, dateStr: string): string {
  const priority = getPriority(article.searchVolume);
  const kd = estimateKD(article.searchVolume);
  const intent = getSearchIntent(article.category, article.keyword);
  const cluster = getTopicCluster(article.keyword, article.category);
  const lsiKeywords = LSI_KEYWORDS[cluster] || LSI_KEYWORDS.kitchen;
  const h2Structure = generateH2Structure(article.keyword, article.category, article.prompt);
  const slug = article.title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60);

  return `⏱️ DURASI: ${priority.duration}
📊 PRIORITY: ${priority.label}
📈 SCORE: ${priority.score}

📌 INFORMASI DASAR
Keyword Utama     : ${article.keyword}
Search Volume     : ${article.searchVolume.toLocaleString()}/bulan
Keyword Difficulty: ${kd.value}/100 (${kd.label})
Kategori          : ${article.category}
Jadwal Publish    : ${dateStr}
URL Target        : https://www.sesoris.com/blog/${slug}

🎯 SEARCH INTENT
Tipe  : ${intent.type}
Guide : ${intent.guide}

🔑 KEYWORD STRATEGY
PRIMARY KEYWORD: "${article.keyword}"
Wajib muncul di: Title, Meta Description, H1, Paragraf pertama (100 kata pertama), minimal 1 H2, Kesimpulan

LSI KEYWORDS (sebarin natural, jangan keyword stuffing):
${lsiKeywords.join(', ')}

📝 AI PROMPT - UNTUK CONTENT GENERATOR:

\`\`\`
Kamu adalah Senior SEO Content Writer dengan pengalaman 15+ tahun menulis artikel yang ranking di Page 1 Google Indonesia. Kamu ahli dalam:
- SEO on-page optimization
- User intent analysis
- Content structure yang engaging
- Copywriting yang mengkonversi
- E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

TUGAS: Buatkan artikel SEO-optimized dengan spesifikasi berikut:

═══════════════════════════════════════
📌 DATA ARTIKEL
═══════════════════════════════════════
KEYWORD UTAMA    : "${article.keyword}"
SEARCH VOLUME    : ${article.searchVolume.toLocaleString()}/bulan
SEARCH INTENT    : ${intent.type}
KATEGORI         : ${article.category}
URL TARGET       : https://www.sesoris.com/blog/${slug}

═══════════════════════════════════════
🏢 TENTANG SESORIS (WAJIB DIPROMOSIKAN)
═══════════════════════════════════════
Nama        : Sesoris
Tagline     : "Hidup Lebih Teratur"
Tipe        : E-Commerce Produk Home Organization & Kebutuhan Rumah Tangga
Website     : https://www.sesoris.com
Produk      : Rak dapur, organizer rumah, storage box, peralatan dapur, dekorasi rumah, perlengkapan kamar mandi
Keunggulan  : Produk berkualitas, harga terjangkau, pengiriman seluruh Indonesia, desain modern minimalis
Halaman     : Shop (/shop), Koleksi (/collections), Best Sellers (/best-sellers), New Arrivals (/new-arrivals)

═══════════════════════════════════════
📋 INSTRUKSI PENULISAN
═══════════════════════════════════════

STEP 1 - RISET DULU (WAJIB):
Sebelum menulis, analisis konteks keyword "${article.keyword}":
• Topik apa saja yang harus dibahas untuk comprehensive coverage?
• Angle unik apa yang bisa diambil agar berbeda dari kompetitor?
• Data/statistik apa yang bisa memperkuat artikel?
• Pain point apa yang dicari pembaca saat search keyword ini?

STEP 2 - TULIS DENGAN STRUKTUR INI:

[H1] → Judul menarik, keyword di awal/dekat awal, max 60 karakter untuk title tag
Contoh format: "${article.title}"

[INTRO - 150-200 kata]
• Kalimat pertama = hook yang menarik perhatian (fakta mengejutkan/pertanyaan/statistik)
• Paragraf 1: Jelaskan masalah/kebutuhan pembaca terkait "${article.keyword}"
• Paragraf 2: Preview solusi yang akan dibahas
• WAJIB: Keyword "${article.keyword}" muncul di 100 kata pertama
• Akhiri dengan: "Dalam artikel ini, Anda akan mempelajari..."

${h2Structure}

═══════════════════════════════════════
📏 ATURAN PENULISAN (WAJIB DIIKUTI)
═══════════════════════════════════════
• Word count     : 1.800-2.500 kata
• Keyword density: 1-2% (natural, jangan stuffing)
• Paragraf       : Maksimal 3 kalimat per paragraf (mobile-friendly)
• Kalimat        : Maksimal 25 kata per kalimat (mudah dibaca)
• Tone           : Profesional tapi friendly, seperti teman yang expert
• POV            : Gunakan "Anda" untuk pembaca, "kami" untuk Sesoris
• Bahasa         : Indonesia natural, boleh pakai istilah teknis tapi jelaskan
• Tahun          : SELALU gunakan tahun 2026, JANGAN pernah tulis 2024/2025

INTERNAL LINK (WAJIB 5+):
Sisipkan link ke halaman Sesoris yang relevan:
• https://www.sesoris.com/shop (Semua Produk)
• https://www.sesoris.com/collections (Koleksi)
• https://www.sesoris.com/best-sellers (Best Sellers)
• https://www.sesoris.com/new-arrivals (New Arrivals)
• https://www.sesoris.com/blog (Blog)
• Link ke artikel blog terkait yang sudah ada

EXTERNAL LINK (2-3):
Link ke sumber authority: kompas.com, detik.com, tokopedia.com, pinterest.com, wikipedia.org, houzz.com

LSI KEYWORDS (sebarin natural di seluruh artikel):
${lsiKeywords.join(', ')}

═══════════════════════════════════════
📤 OUTPUT YANG DIBUTUHKAN
═══════════════════════════════════════
1. Meta Title (50-60 char): Keyword di awal + hook menarik
2. Meta Description (150-155 char): Keyword + benefit + CTA
3. Artikel lengkap sesuai struktur di atas
4. Minimal 5 FAQ dengan jawaban singkat
5. 3-5 image prompts dengan alt text SEO (bahasa Indonesia)
6. CTA ke Sesoris (https://www.sesoris.com) di kesimpulan

KONTEKS SPESIFIK ARTIKEL:
${article.prompt}
\`\`\`

✅ CHECKLIST SEBELUM PUBLISH
☐ Keyword muncul di: Title, Meta, H1, 100 kata pertama, H2, kesimpulan
☐ Word count minimal 1.800 kata
☐ Internal link ke Sesoris minimal 5
☐ External link ke sumber authority 2-3
☐ Setiap gambar ada alt text dengan keyword (bahasa Indonesia)
☐ FAQ minimal 5 pertanyaan (format schema-ready)
☐ CTA ke Sesoris ada di kesimpulan
☐ Meta title 50-60 karakter
☐ Meta description 150-155 karakter
☐ Tidak ada keyword stuffing
☐ Paragraf pendek (max 3 kalimat)
☐ Semua harga dalam Rupiah (Rp)
☐ Tahun yang digunakan: 2026

📊 TARGET: Ranking Page 1 Google dalam 2-3 bulan`;
}

// --- Trello API ---
async function getBoardCards(): Promise<{ id: string; name: string; desc: string; due: string | null }[]> {
  const res = await fetch(
    `https://api.trello.com/1/boards/${BOARD_ID}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&fields=name,desc,due&filter=open&limit=300`,
  );
  if (!res.ok) throw new Error(`Failed to get cards: ${res.status}`);
  return res.json();
}

async function updateCard(cardId: string, desc: string): Promise<void> {
  const res = await fetch(
    `https://api.trello.com/1/cards/${cardId}?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ desc }),
    },
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update card ${cardId}: ${res.status} ${err}`);
  }
}

// --- Article lookup (from create-content-calendar.ts) ---
const articles: ArticlePlan[] = [
  // === KITCHEN & DAPUR ===
  { keyword: 'rak piring', title: 'Rekomendasi Rak Piring Terbaik', category: 'Review', searchVolume: 22200, prompt: 'Tulis artikel review dan rekomendasi rak piring terbaik untuk rumah Indonesia. Bahas berbagai jenis (aluminium, stainless, plastik, kayu), kelebihan kekurangan masing-masing, tips memilih sesuai ukuran dapur, dan rekomendasi produk beserta kisaran harga dalam Rupiah.' },
  { keyword: 'kitchen set minimalis', title: 'Inspirasi Kitchen Set Minimalis Modern', category: 'Inspirasi', searchVolume: 18100, prompt: 'Tulis artikel inspirasi desain kitchen set minimalis modern untuk rumah Indonesia. Bahas tren terbaru, kombinasi warna, material yang cocok, layout untuk dapur kecil, dan tips menghemat biaya renovasi dapur.' },
  { keyword: 'rak piring aluminium', title: 'Rak Piring Aluminium: Kelebihan dan Cara Memilih', category: 'Review', searchVolume: 18100, prompt: 'Tulis artikel lengkap tentang rak piring aluminium. Bahas kelebihan dibanding material lain, cara memilih yang berkualitas, tips perawatan agar tidak kusam, dan rekomendasi harga terjangkau.' },
  { keyword: 'rak piring minimalis', title: 'Desain Rak Piring Minimalis untuk Dapur Modern', category: 'Inspirasi', searchVolume: 9900, prompt: 'Tulis artikel inspirasi rak piring minimalis yang cocok untuk dapur modern. Bahas berbagai desain (gantung, berdiri, built-in), tips menata agar rapi, dan cara memaksimalkan ruang penyimpanan di dapur kecil.' },
  { keyword: 'mini bar dapur', title: 'Cara Membuat Mini Bar Dapur di Rumah Minimalis', category: 'Tutorial', searchVolume: 9900, prompt: 'Tulis artikel tutorial membuat mini bar dapur di rumah minimalis. Bahas ide desain, material yang dibutuhkan, estimasi biaya, langkah-langkah pembuatan, dan tips dekorasi agar terlihat estetik.' },
  { keyword: 'meja kompor', title: 'Memilih Meja Kompor yang Tepat untuk Dapur', category: 'Review', searchVolume: 8100, prompt: 'Tulis artikel panduan memilih meja kompor yang tepat. Bahas jenis material (aluminium, stainless, granit), ukuran ideal, fitur keamanan, dan tips perawatan. Sertakan rekomendasi produk dengan harga.' },
  { keyword: 'lemari piring', title: 'Lemari Piring Modern: Pilihan Material dan Desain', category: 'Review', searchVolume: 6600, prompt: 'Tulis artikel review lemari piring modern untuk rumah Indonesia. Bahas pilihan material (kaca, aluminium, kayu), desain terbaru, kapasitas penyimpanan, dan tips memilih sesuai budget.' },
  { keyword: 'storage box', title: 'Storage Box Terbaik untuk Organisasi Rumah', category: 'Review', searchVolume: 6600, prompt: 'Tulis artikel review storage box terbaik untuk organisasi rumah. Bahas berbagai ukuran dan material, cara memilih sesuai kebutuhan, tips labeling dan stacking, serta rekomendasi produk berkualitas.' },
  { keyword: 'peralatan dapur', title: 'Peralatan Dapur Wajib untuk Rumah Tangga Baru', category: 'Tips & Trik', searchVolume: 6600, prompt: 'Tulis artikel tips peralatan dapur yang wajib dimiliki untuk rumah tangga baru. Buat checklist lengkap dari alat masak dasar sampai peralatan khusus, tips membeli hemat, dan cara merawat agar awet.' },
  { keyword: 'alat masak', title: 'Panduan Lengkap Memilih Alat Masak Berkualitas', category: 'Review', searchVolume: 5400, prompt: 'Tulis artikel panduan memilih alat masak berkualitas. Bahas perbedaan material (teflon, stainless, cast iron, ceramic), kelebihan kekurangan, tips perawatan, dan rekomendasi brand terpercaya di Indonesia.' },
  { keyword: 'rak piring stainless', title: 'Rak Piring Stainless Steel: Anti Karat dan Tahan Lama', category: 'Review', searchVolume: 5400, prompt: 'Tulis artikel tentang rak piring stainless steel. Bahas keunggulan anti karat, cara membedakan stainless asli dan palsu, tips perawatan, perbandingan harga dengan material lain, dan rekomendasi produk.' },
  { keyword: 'rak piring wastafel', title: 'Rak Piring di Atas Wastafel: Solusi Dapur Sempit', category: 'Tips & Trik', searchVolume: 5400, prompt: 'Tulis artikel tips memasang rak piring di atas wastafel untuk dapur sempit. Bahas jenis rak yang cocok, ukuran ideal, cara instalasi, material terbaik, dan tips menata agar tidak berantakan.' },
  { keyword: 'meja bar dapur', title: 'Inspirasi Meja Bar Dapur untuk Rumah Modern', category: 'Inspirasi', searchVolume: 5400, prompt: 'Tulis artikel inspirasi meja bar dapur untuk rumah modern Indonesia. Bahas desain untuk ruang kecil, material populer, ukuran ideal, dan ide dekorasi yang Instagramable.' },
  { keyword: 'rak piring plastik', title: 'Rak Piring Plastik: Murah dan Ringan', category: 'Review', searchVolume: 5400, prompt: 'Tulis artikel review rak piring plastik. Bahas kelebihan (murah, ringan, warna-warni), kekurangan, material PP vs ABS, cara memilih yang food-safe, dan rekomendasi brand terpercaya.' },
  { keyword: 'alat dapur', title: 'Alat Dapur Multifungsi yang Wajib Dimiliki', category: 'Tips & Trik', searchVolume: 4400, prompt: 'Tulis artikel tentang alat dapur multifungsi yang wajib dimiliki. Bahas produk yang menghemat ruang, review alat 2-in-1 dan 3-in-1, tips memilih yang berkualitas, dan cara organisasi di dapur kecil.' },
  { keyword: 'kitchen set minimalis dapur kecil', title: 'Kitchen Set Minimalis untuk Dapur Kecil: Ide dan Tips', category: 'Tutorial', searchVolume: 4400, prompt: 'Tulis artikel tutorial merancang kitchen set minimalis untuk dapur kecil. Bahas layout optimal (L-shape, I-shape, U-shape), material terjangkau, warna yang membuat ruangan terlihat luas, dan estimasi biaya.' },
  { keyword: 'dekorasi ruang tamu minimalis', title: 'Dekorasi Ruang Tamu Minimalis yang Elegan', category: 'Inspirasi', searchVolume: 4400, prompt: 'Tulis artikel inspirasi dekorasi ruang tamu minimalis yang elegan. Bahas pemilihan furnitur, color palette, pencahayaan, tanaman hias, dan wall art. Sertakan tips agar terlihat luas meski ruangan kecil.' },
  { keyword: 'rak dapur', title: 'Cara Memilih Rak Dapur yang Tepat', category: 'Tips & Trik', searchVolume: 3600, prompt: 'Tulis artikel tips memilih rak dapur yang tepat sesuai kebutuhan. Bahas jenis (gantung, berdiri, sudut), material, kapasitas beban, dan cara menata agar dapur terlihat rapi dan efisien.' },
  { keyword: 'rak bumbu dapur', title: 'Rak Bumbu Dapur: Organisasi Bumbu Jadi Mudah', category: 'Tips & Trik', searchVolume: 3600, prompt: 'Tulis artikel tentang rak bumbu dapur yang memudahkan organisasi. Bahas jenis rak bumbu (putar, gantung, drawer insert), tips menata bumbu agar mudah dijangkau, dan DIY rak bumbu sederhana.' },
  { keyword: 'dapur cantik', title: 'Tips Membuat Dapur Cantik dan Fungsional', category: 'Tips & Trik', searchVolume: 2900, prompt: 'Tulis artikel tips membuat dapur cantik yang tetap fungsional. Bahas kombinasi warna, backsplash estetik, pencahayaan dapur, tanaman hias di dapur, dan aksesori yang membuat dapur terlihat mewah.' },
  { keyword: 'harga rak piring', title: 'Daftar Harga Rak Piring Terbaru dan Tips Memilih', category: 'Review', searchVolume: 2900, prompt: 'Tulis artikel daftar harga rak piring terbaru di Indonesia. Bandingkan harga berdasarkan material dan ukuran, tips mendapatkan harga terbaik, dan rekomendasi rak piring dengan value for money terbaik.' },
  { keyword: 'lemari dapur aluminium', title: 'Lemari Dapur Aluminium: Tahan Lama dan Anti Rayap', category: 'Review', searchVolume: 2900, prompt: 'Tulis artikel review lemari dapur aluminium. Bahas keunggulan anti rayap dan tahan air, perbandingan dengan kayu dan HPL, harga per meter, tips memilih tukang, dan perawatan jangka panjang.' },
  { keyword: 'rak kamar mandi', title: 'Rak Kamar Mandi: Solusi Penyimpanan Praktis', category: 'Review', searchVolume: 2900, prompt: 'Tulis artikel review rak kamar mandi untuk penyimpanan praktis. Bahas rak sudut, rak gantung, over-toilet storage, material tahan air, dan tips menata toiletries agar kamar mandi rapi.' },
  { keyword: 'rak piring kitchen set', title: 'Rak Piring Built-in Kitchen Set: Panduan Lengkap', category: 'Tutorial', searchVolume: 2900, prompt: 'Tulis panduan lengkap rak piring built-in di kitchen set. Bahas jenis pull-out, lift-up, dan sliding, material stainless food-grade, ukuran standar, dan tips custom order.' },
  { keyword: 'lemari piring aluminium', title: 'Lemari Piring Aluminium: Modern dan Anti Rayap', category: 'Review', searchVolume: 2900, prompt: 'Tulis artikel review lemari piring aluminium. Bahas keunggulan modern dan anti rayap, variasi warna, desain terbaru, harga per unit, dan perbandingan dengan lemari kayu.' },
  { keyword: 'tempat bumbu dapur', title: 'Tempat Bumbu Dapur Estetik dan Fungsional', category: 'Review', searchVolume: 2400, prompt: 'Tulis artikel review tempat bumbu dapur yang estetik dan fungsional. Bahas berbagai desain (jar set, spice rack, drawer organizer), material food-safe, dan tips menata bumbu agar dapur terlihat rapi.' },
  { keyword: 'rak dapur minimalis', title: 'Rak Dapur Minimalis: Solusi Penyimpanan Efisien', category: 'Inspirasi', searchVolume: 2400, prompt: 'Tulis artikel inspirasi rak dapur minimalis untuk penyimpanan efisien. Bahas desain yang sedang tren, cara memaksimalkan ruang vertikal, DIY rak dapur, dan produk rekomendasi.' },
  { keyword: 'dekorasi kamar minimalis', title: 'Dekorasi Kamar Tidur Minimalis yang Nyaman', category: 'Inspirasi', searchVolume: 2400, prompt: 'Tulis artikel inspirasi dekorasi kamar tidur minimalis. Bahas pemilihan tempat tidur, warna dinding, pencahayaan, storage solution, dan aksesori kamar yang membuat tidur lebih nyenyak.' },
  { keyword: 'dekorasi ruang tamu aesthetic', title: 'Ruang Tamu Aesthetic: Tips Dekorasi Kekinian', category: 'Inspirasi', searchVolume: 2400, prompt: 'Tulis artikel tips membuat ruang tamu aesthetic dan kekinian. Bahas tren desain interior terbaru, pemilihan furniture statement, wall decor, tanaman indoor, dan tips foto agar Instagramable.' },
  { keyword: 'rak sabun kamar mandi', title: 'Rak Sabun Kamar Mandi Stainless Anti Karat', category: 'Review', searchVolume: 2400, prompt: 'Tulis artikel tentang rak sabun kamar mandi stainless. Bahas kelebihan material stainless, cara memilih yang berkualitas, tips pemasangan tanpa bor, dan perawatan agar tetap mengkilap.' },
  { keyword: 'mini bar dapur sempit', title: 'Mini Bar untuk Dapur Sempit: Ide Kreatif', category: 'Inspirasi', searchVolume: 2400, prompt: 'Tulis artikel ide kreatif mini bar untuk dapur sempit. Bahas desain fold-down, wall-mounted shelf bar, penggunaan jendela sebagai bar, dan tips dekorasi agar terlihat cozy meski ruang terbatas.' },
  { keyword: 'rak piring master', title: 'Review Rak Piring Master: Worth It atau Tidak?', category: 'Review', searchVolume: 2400, prompt: 'Tulis review mendalam rak piring Master brand. Bahas kualitas material, varian produk, harga, kelebihan dan kekurangan, after-sales service, dan bandingkan dengan kompetitor.' },
  { keyword: 'rak piring minimalis terbaru', title: 'Model Rak Piring Minimalis Terbaru untuk Dapur Modern', category: 'Inspirasi', searchVolume: 2400, prompt: 'Tulis artikel tentang model rak piring minimalis terbaru. Bahas desain tren terkini, material inovatif, fitur smart, warna populer, dan rekomendasi untuk berbagai budget.' },
  { keyword: 'rak bumbu', title: 'Jenis Rak Bumbu dan Cara Menata yang Benar', category: 'Tutorial', searchVolume: 1900, prompt: 'Tulis tutorial menata bumbu dapur dengan rak bumbu. Bahas jenis rak (putar, tier, magnetic, wall-mounted), cara mengorganisir bumbu A-Z, tips labeling, dan penyimpanan bumbu agar tahan lama.' },
  { keyword: 'lemari rak piring', title: 'Lemari Rak Piring: Solusi All-in-One Penyimpanan Dapur', category: 'Review', searchVolume: 1900, prompt: 'Tulis artikel review lemari rak piring all-in-one. Bahas desain yang menggabungkan lemari dan rak, material, kapasitas, tips memilih ukuran, dan rekomendasi produk populer.' },
  { keyword: 'rak piring minimalis tertutup', title: 'Rak Piring Minimalis Tertutup: Bersih dan Modern', category: 'Review', searchVolume: 1900, prompt: 'Tulis artikel tentang rak piring minimalis tertutup. Bahas desain modern yang clean, material terbaik, sistem ventilasi, dan tips menata agar piring cepat kering di dalam rak tertutup.' },
  { keyword: 'harga rak piring aluminium', title: 'Update Harga Rak Piring Aluminium Terbaru', category: 'Review', searchVolume: 1900, prompt: 'Tulis artikel update harga rak piring aluminium terbaru. Bandingkan harga berdasarkan ukuran, brand, dan fitur. Sertakan tips belanja online vs offline dan cara nego harga.' },
  { keyword: 'rak make up', title: 'Rak Make Up Organizer: Tips Menata Koleksi Kosmetik', category: 'Tips & Trik', searchVolume: 1900, prompt: 'Tulis artikel tips menata koleksi kosmetik dengan rak make up organizer. Bahas jenis organizer (acrylic, rotating, drawer), cara mengkategorikan produk, tips ekspired date, dan DIY organizer.' },
  { keyword: 'tempat sabun kamar mandi', title: 'Tempat Sabun Kamar Mandi: Pilihan Desain Terbaik', category: 'Review', searchVolume: 6600, prompt: 'Tulis artikel review tempat sabun kamar mandi terbaik. Bahas jenis (tempel, gantung, rak sudut), material anti karat, cara pemasangan, dan desain yang cocok untuk kamar mandi modern Indonesia.' },
  { keyword: 'rak piring kitchen set bawah', title: 'Rak Piring Kitchen Set Bawah: Memaksimalkan Kabinet', category: 'Tips & Trik', searchVolume: 1600, prompt: 'Tulis artikel tips memaksimalkan rak piring di kitchen set bawah. Bahas pull-out rack, sliding basket, cara menata piring dan mangkuk, dan aksesori organizer untuk kabinet bawah.' },
  { keyword: 'rak piring kayu', title: 'Rak Piring Kayu: Estetik Natural untuk Dapur', category: 'Review', searchVolume: 1600, prompt: 'Tulis artikel review rak piring kayu. Bahas jenis kayu yang cocok, kelebihan estetika natural, cara perawatan agar tidak berjamur, finishing waterproof, dan rekomendasi produk.' },
  { keyword: 'rak piring tertutup', title: 'Rak Piring Tertutup: Bebas Debu dan Serangga', category: 'Review', searchVolume: 1600, prompt: 'Tulis artikel tentang rak piring tertutup. Bahas kelebihan (hygiene, anti debu), jenis material, desain modern, cara memilih ukuran tepat, dan perbandingan harga.' },
  { keyword: 'gantungan handuk kamar mandi', title: 'Gantungan Handuk Kamar Mandi Modern dan Estetik', category: 'Review', searchVolume: 1600, prompt: 'Tulis artikel tentang gantungan handuk kamar mandi modern. Bahas berbagai desain (bar, hook, heated), material, cara instalasi, dan tips memilih yang sesuai dengan desain kamar mandi.' },
  { keyword: 'tempat sepatu', title: 'Rak dan Tempat Sepatu: Organisasi Koleksi Sepatu', category: 'Tips & Trik', searchVolume: 1600, prompt: 'Tulis artikel tips organisasi sepatu dengan rak dan tempat sepatu. Bahas jenis shoe storage (rack, box, over-door), tips untuk koleksi banyak, cara merawat sepatu, dan DIY shoe organizer.' },
  { keyword: 'perlengkapan dapur', title: 'Checklist Perlengkapan Dapur Lengkap untuk Pengantin Baru', category: 'Tips & Trik', searchVolume: 1600, prompt: 'Tulis checklist perlengkapan dapur lengkap untuk pengantin baru. Buat list per kategori (memasak, makan, minum, penyimpanan, pembersihan), prioritas beli, dan tips belanja hemat.' },
  { keyword: 'lemari gantung dapur', title: 'Lemari Gantung Dapur: Hemat Ruang, Maksimal Fungsi', category: 'Review', searchVolume: 1600, prompt: 'Tulis artikel tentang lemari gantung dapur. Bahas jenis (single, double, corner), material, ukuran ideal, cara pemasangan yang aman, dan tips menata isi lemari gantung agar efisien.' },
  { keyword: 'rak piring gantung', title: 'Rak Piring Gantung: Solusi Dapur Tanpa Kitchen Set', category: 'Tips & Trik', searchVolume: 1600, prompt: 'Tulis artikel tentang rak piring gantung sebagai solusi dapur tanpa kitchen set. Bahas kelebihan, jenis material, cara pemasangan di dinding, tips menata, dan rekomendasi produk terjangkau.' },
  { keyword: 'rak stenlis', title: 'Rak Stainless Steel: Investasi Jangka Panjang untuk Rumah', category: 'Review', searchVolume: 1600, prompt: 'Tulis artikel tentang rak stainless steel sebagai investasi jangka panjang. Bahas kelebihan durabilitas, jenis rak (dapur, kamar mandi, laundry), tips membedakan kualitas, dan panduan harga.' },
  { keyword: 'rak piring bertutup', title: 'Panduan Memilih Rak Piring Bertutup Anti Debu', category: 'Tips & Trik', searchVolume: 1600, prompt: 'Tulis panduan memilih rak piring bertutup anti debu. Bahas jenis tutup (kaca, plastik, jaring), sistem draining, material body, ukuran sesuai jumlah anggota keluarga, dan tips perawatan.' },
  { keyword: 'dekorasi rumah minimalis', title: 'Panduan Dekorasi Rumah Minimalis Lengkap', category: 'Tutorial', searchVolume: 1600, prompt: 'Tulis panduan lengkap dekorasi rumah minimalis dari A-Z. Bahas prinsip less is more, pemilihan warna, furnitur multifungsi, storage solution, dan tips untuk setiap ruangan.' },
  { keyword: 'dekorasi ruang tamu sederhana tapi menarik', title: 'Dekorasi Ruang Tamu Sederhana tapi Menarik', category: 'Tips & Trik', searchVolume: 1600, prompt: 'Tulis artikel tips dekorasi ruang tamu sederhana tapi tetap menarik dengan budget terbatas. Bahas DIY decor, repurposing furnitur lama, tanaman hias murah, dan trik visual agar ruangan terlihat mewah.' },
  { keyword: 'kitchen set minimalis modern', title: 'Kitchen Set Minimalis Modern: Tren Terbaru', category: 'Inspirasi', searchVolume: 1600, prompt: 'Tulis artikel tren kitchen set minimalis modern terbaru. Bahas desain handleless, smart storage, warna two-tone, material HPL vs akrilik, dan teknologi soft-close.' },
  { keyword: 'lemari makan', title: 'Lemari Makan: Fungsi dan Desain untuk Ruang Makan', category: 'Inspirasi', searchVolume: 1600, prompt: 'Tulis artikel inspirasi lemari makan untuk ruang makan Indonesia. Bahas fungsi sebagai display dan penyimpanan, desain modern vs klasik, material, dan tips menata koleksi tableware.' },
  { keyword: 'desain dapur minimalis', title: 'Desain Dapur Minimalis: Inspirasi dan Tips Praktis', category: 'Inspirasi', searchVolume: 1600, prompt: 'Tulis artikel inspirasi desain dapur minimalis lengkap. Bahas color scheme populer, material countertop, backsplash modern, lighting, dan tips agar dapur minimalis tetap fungsional.' },
  { keyword: 'rak dapur serbaguna', title: 'Rak Dapur Serbaguna: Satu Rak untuk Semua Kebutuhan', category: 'Review', searchVolume: 1300, prompt: 'Tulis artikel review rak dapur serbaguna. Bahas rak multi-tier, rak sudut, rak expandable, dan rak modular. Sertakan tips memilih, cara menata, dan rekomendasi produk sesuai budget.' },
  { keyword: 'kitchen set sederhana', title: 'Kitchen Set Sederhana yang Tetap Stylish', category: 'Inspirasi', searchVolume: 1300, prompt: 'Tulis artikel inspirasi kitchen set sederhana yang tetap stylish. Bahas desain untuk budget terbatas, material murah berkualitas, warna yang cocok, dan tips DIY kitchen set.' },
  { keyword: 'kitchen set dapur sempit', title: 'Desain Kitchen Set untuk Dapur Sempit Rumah Type 36', category: 'Tutorial', searchVolume: 1300, prompt: 'Tulis tutorial mendesain kitchen set untuk dapur sempit rumah type 36/45. Bahas layout space-saving, material ringan, warna yang membuat lapang, storage vertical, dan estimasi biaya.' },
  { keyword: 'rak piring kecil', title: 'Rak Piring Kecil untuk Dapur Mungil', category: 'Review', searchVolume: 1300, prompt: 'Tulis artikel review rak piring kecil yang cocok untuk dapur mungil. Bahas rak compact, rak foldable, rak countertop mini, tips menata piring sedikit, dan rekomendasi produk di bawah Rp200.000.' },
  { keyword: 'rak cuci piring', title: 'Rak Cuci Piring: Tips Memilih dan Menata', category: 'Tips & Trik', searchVolume: 1300, prompt: 'Tulis artikel tips memilih dan menata rak cuci piring. Bahas rak di atas sink, dish drying rack, material anti karat, ukuran sesuai wastafel, dan tips agar area cuci piring selalu bersih.' },
  { keyword: 'lemari piring kaca', title: 'Lemari Piring Kaca: Pajang Koleksi dengan Elegan', category: 'Inspirasi', searchVolume: 1300, prompt: 'Tulis artikel inspirasi lemari piring kaca untuk memajang koleksi peralatan makan. Bahas desain modern dan klasik, pencahayaan LED, tips display, dan perawatan kaca agar tetap bersih.' },
  { keyword: 'meja kompor aluminium', title: 'Meja Kompor Aluminium: Ringan dan Tahan Karat', category: 'Review', searchVolume: 1300, prompt: 'Tulis artikel review meja kompor aluminium. Bahas kelebihan ringan dan tahan karat, ukuran standar, fitur tambahan (laci, rak bawah), dan tips memilih yang kokoh meski ringan.' },
  { keyword: 'rak bumbu dapur dari kayu', title: 'DIY Rak Bumbu Dapur dari Kayu', category: 'Tutorial', searchVolume: 1300, prompt: 'Tulis tutorial membuat rak bumbu dapur dari kayu secara DIY. Bahas material yang dibutuhkan, langkah-langkah pembuatan, tips finishing, dan desain yang bisa disesuaikan dengan dapur.' },
  { keyword: 'tempat bumbu', title: 'Tempat Bumbu Cantik untuk Dapur Instagramable', category: 'Inspirasi', searchVolume: 1300, prompt: 'Tulis artikel inspirasi tempat bumbu cantik yang membuat dapur Instagramable. Bahas jar set uniform, spice labels estetik, rak display, dan tips food photography dapur.' },
  { keyword: 'rak piring aluminium mini', title: 'Rak Piring Aluminium Mini untuk Dapur Kecil', category: 'Review', searchVolume: 1300, prompt: 'Tulis artikel review rak piring aluminium mini yang cocok untuk dapur kecil. Bahas ukuran compact, desain portable, kapasitas, harga terjangkau, dan tips memaksimalkan rak mini.' },
  { keyword: 'rak piring aluminium terbaru', title: 'Rak Piring Aluminium Model Terbaru', category: 'Review', searchVolume: 1300, prompt: 'Tulis artikel tentang model terbaru rak piring aluminium. Bahas inovasi desain, fitur baru, finishing premium, kapasitas, dan perbandingan harga model terbaru vs model lama.' },
  { keyword: 'rak kompor', title: 'Rak Kompor: Organisasi Area Memasak Lebih Rapi', category: 'Tips & Trik', searchVolume: 1000, prompt: 'Tulis artikel tentang rak kompor untuk organisasi area memasak. Bahas rak di atas kompor, rak samping kompor, material tahan panas, tips keamanan, dan cara menata bumbu & alat masak di dekat kompor.' },
  { keyword: 'rak piring besi', title: 'Rak Piring Besi: Kokoh dan Ekonomis', category: 'Review', searchVolume: 1000, prompt: 'Tulis artikel review rak piring besi. Bahas kelebihan kokoh dan harga ekonomis, perbedaan besi chrome dan powder coated, tips mencegah karat, dan rekomendasi produk budget-friendly.' },
  { keyword: 'rak wastafel cuci piring', title: 'Rak di Atas Wastafel: Organisasi Area Cuci Piring', category: 'Tips & Trik', searchVolume: 1000, prompt: 'Tulis artikel tips memasang rak di atas wastafel cuci piring. Bahas rak expandable, drainer rack, material anti karat, ukuran sesuai wastafel, dan tips agar area cucian tetap kering dan rapi.' },
  { keyword: 'cara menata rumah', title: 'Cara Menata Rumah agar Rapi dan Nyaman', category: 'Tutorial', searchVolume: 1000, prompt: 'Tulis panduan cara menata rumah agar rapi dan nyaman. Bahas metode KonMari, tips decluttering per ruangan, storage hacks, dan rutinitas harian untuk menjaga kerapian.' },
  { keyword: 'dapur modern', title: 'Tren Dapur Modern Indonesia: Desain dan Teknologi', category: 'Inspirasi', searchVolume: 1000, prompt: 'Tulis artikel tentang tren dapur modern di Indonesia. Bahas smart kitchen, desain open concept, material terkini, built-in appliances, dan teknologi dapur yang memudahkan memasak.' },
  { keyword: 'box penyimpan barang', title: 'Box Penyimpanan Barang: Panduan Memilih dan Menata', category: 'Tutorial', searchVolume: 1000, prompt: 'Tulis panduan memilih dan menata box penyimpanan barang. Bahas jenis box (clear, fabric, stackable), ukuran ideal, tips labeling, teknik KonMari untuk packing, dan ide penyimpanan kreatif.' },
  { keyword: 'meja bartender dapur minimalis', title: 'Meja Bar Dapur Minimalis untuk Ruang Kecil', category: 'Inspirasi', searchVolume: 1000, prompt: 'Tulis artikel inspirasi meja bar dapur minimalis untuk ruang kecil. Bahas desain foldable, wall-mounted, dan island bar kecil. Sertakan tips dekorasi dan estimasi biaya pembuatan.' },
  { keyword: 'tempat piring', title: 'Jenis-Jenis Tempat Piring dan Cara Memilih', category: 'Review', searchVolume: 1000, prompt: 'Tulis artikel review jenis-jenis tempat piring. Bahas dish rack, plate stand, cabinet organizer, dan wall-mounted plate rack. Sertakan tips memilih berdasarkan jumlah keluarga dan ukuran dapur.' },
  { keyword: 'rumah minimalis rapi', title: 'Rahasia Rumah Minimalis Selalu Rapi', category: 'Tips & Trik', searchVolume: 880, prompt: 'Tulis artikel rahasia menjaga rumah minimalis selalu rapi. Bahas mindset minimalis, one in one out rule, rutinitas 15 menit harian, zone cleaning, dan produk organisasi yang wajib dimiliki.' },
  { keyword: 'meja dapur kayu', title: 'Meja Dapur Kayu: Klasik yang Tak Lekang Waktu', category: 'Inspirasi', searchVolume: 880, prompt: 'Tulis artikel inspirasi meja dapur kayu. Bahas jenis kayu (jati, pinus, mahoni), gaya desain (rustic, modern, Scandinavian), perawatan, dan cara memilih ukuran sesuai dapur.' },
  { keyword: 'rak piring terbaru', title: 'Tren Rak Piring Terbaru: Desain dan Inovasi', category: 'Review', searchVolume: 880, prompt: 'Tulis artikel tren rak piring terbaru. Bahas inovasi desain (auto-drain, UV sterilizer, modular), material baru, smart features, dan review produk terbaru di pasaran Indonesia.' },
  { keyword: 'rak piring plastik tertutup', title: 'Rak Piring Plastik Tertutup: Hygiene dan Terjangkau', category: 'Review', searchVolume: 880, prompt: 'Tulis artikel review rak piring plastik tertutup. Bahas kelebihan hygiene, desain compact, warna-warni modern, ventilasi udara, tips memilih BPA-free, dan rekomendasi di bawah Rp150.000.' },
  { keyword: 'lemari kompor', title: 'Lemari Kompor: Desain Terintegrasi untuk Dapur Rapi', category: 'Review', searchVolume: 880, prompt: 'Tulis artikel tentang lemari kompor terintegrasi. Bahas desain built-in, material tahan panas, sistem ventilasi, ukuran standar kompor Indonesia, dan tips keamanan gas.' },
  { keyword: 'lemari rak piring aluminium', title: 'Lemari Rak Piring Aluminium: Gabungan Kekuatan dan Estetika', category: 'Review', searchVolume: 880, prompt: 'Tulis review lemari rak piring aluminium. Bahas finishing modern, anti karat dan rayap, variasi warna, desain kaca kombinasi, dan perbandingan harga antar brand.' },
  { keyword: 'meja kompor stainless', title: 'Meja Kompor Stainless: Pilihan Profesional untuk Rumah', category: 'Review', searchVolume: 880, prompt: 'Tulis artikel tentang meja kompor stainless berkualitas profesional untuk rumah. Bahas grade stainless (304 vs 201), ketebalan ideal, fitur tambahan, dan cara merawat agar tetap mengkilap.' },
  { keyword: 'rak piring wastafel murah', title: 'Rekomendasi Rak Piring Wastafel Murah di Bawah 100 Ribu', category: 'Review', searchVolume: 880, prompt: 'Tulis artikel rekomendasi rak piring wastafel murah di bawah Rp100.000. Review produk dari marketplace, tips memilih yang berkualitas meski murah, dan cara memaksimalkan penggunaan.' },
  { keyword: 'tanaman hias rumah', title: 'Tanaman Hias untuk Setiap Ruangan di Rumah', category: 'Lifestyle', searchVolume: 720, prompt: 'Tulis artikel tentang tanaman hias yang cocok untuk setiap ruangan. Bahas tanaman low maintenance, tanaman pembersih udara, pot dan planter estetik, dan tips perawatan indoor plant.' },
  { keyword: 'kotak penyimpanan', title: 'Kotak Penyimpanan Multifungsi untuk Setiap Ruangan', category: 'Review', searchVolume: 720, prompt: 'Tulis artikel review kotak penyimpanan multifungsi. Bahas kotak untuk pakaian, mainan anak, dokumen, sepatu, dan barang musiman. Sertakan tips memilih material yang awet dan rekomendasi produk.' },
  { keyword: 'tips menata dapur', title: 'Tips Menata Dapur Kecil agar Terlihat Luas', category: 'Tips & Trik', searchVolume: 720, prompt: 'Tulis artikel tips menata dapur kecil agar terlihat luas. Bahas penggunaan warna terang, cermin, rak vertikal, pencahayaan, dan trik visual yang membuat dapur kecil terasa spacious.' },
  { keyword: 'dekorasi ramadhan', title: 'Dekorasi Ramadhan Simple untuk Rumah', category: 'Inspirasi', searchVolume: 720, prompt: 'Tulis artikel dekorasi Ramadhan simple untuk rumah. Bahas ornamen bulan dan bintang, lantern, DIY decor, warna khas Ramadhan, dan tips dekorasi yang tidak berlebihan tapi tetap meriah.' },
  { keyword: 'rak dinding', title: 'Rak Dinding: Dekorasi Sekaligus Penyimpanan', category: 'Inspirasi', searchVolume: 720, prompt: 'Tulis artikel inspirasi rak dinding sebagai dekorasi sekaligus penyimpanan. Bahas floating shelf, box shelf, hexagonal shelf, cara pemasangan yang aman, dan tips menata display.' },
  { keyword: 'rak gantung dapur', title: 'Rak Gantung Dapur: Hemat Space di Dapur Kecil', category: 'Tips & Trik', searchVolume: 720, prompt: 'Tulis artikel tentang rak gantung dapur untuk menghemat space. Bahas jenis (ceiling mount, wall mount, tension rod), material, cara instalasi DIY, dan tips menata peralatan dapur di rak gantung.' },
  { keyword: 'work from home setup', title: 'Setup WFH Produktif di Rumah Minimalis', category: 'Tips & Trik', searchVolume: 590, prompt: 'Tulis artikel setup work from home yang produktif di rumah minimalis. Bahas pemilihan meja dan kursi, kabel management, pencahayaan, storage untuk dokumen, dan tips fokus di rumah.' },
  { keyword: 'dekorasi rumah estetik', title: 'Tips Membuat Rumah Estetik dengan Budget Minim', category: 'Tips & Trik', searchVolume: 590, prompt: 'Tulis artikel tips membuat rumah estetik tanpa harus mahal. Bahas DIY decoration, thrift shopping, repurpose barang lama, tanaman hias, dan color coordination yang membuat rumah terlihat premium.' },
  { keyword: 'decluttering rumah', title: 'Panduan Decluttering Rumah untuk Pemula', category: 'Tutorial', searchVolume: 590, prompt: 'Tulis panduan decluttering rumah untuk pemula. Bahas metode step-by-step, tips memilah barang (keep, donate, trash), emotional attachment, dan manfaat psikologis rumah bersih.' },
  { keyword: 'persiapan lebaran rumah', title: 'Checklist Persiapan Lebaran: Bersih-bersih Rumah', category: 'Tips & Trik', searchVolume: 590, prompt: 'Tulis checklist persiapan lebaran untuk bersih-bersih rumah. Bahas jadwal pembersihan per ruangan, tips deep cleaning, penataan ulang furnitur, dan persiapan menyambut tamu.' },
  { keyword: 'rak sudut kamar mandi', title: 'Rak Sudut Kamar Mandi: Maksimalkan Ruang Mati', category: 'Tips & Trik', searchVolume: 590, prompt: 'Tulis artikel tentang rak sudut kamar mandi. Bahas jenis (tension pole, wall mount, freestanding), material anti air, cara pemasangan, dan tips menata toiletries di rak sudut.' },
  { keyword: 'desain dapur letter L', title: 'Desain Dapur Letter L: Layout Paling Efisien', category: 'Tutorial', searchVolume: 590, prompt: 'Tulis artikel tentang desain dapur letter L yang paling efisien. Bahas triangle kitchen concept, pembagian zona (basah, kering, masak), ukuran ideal, dan tips untuk rumah type 36-45.' },
  { keyword: 'kitchen island minimalis', title: 'Kitchen Island Minimalis untuk Dapur Modern', category: 'Inspirasi', searchVolume: 590, prompt: 'Tulis artikel inspirasi kitchen island minimalis. Bahas desain untuk dapur kecil, island multifungsi (meja makan + storage), material, dan tips DIY kitchen island dari furnitur IKEA.' },
  { keyword: 'rak sepatu minimalis', title: 'Rak Sepatu Minimalis untuk Foyer Rumah', category: 'Inspirasi', searchVolume: 590, prompt: 'Tulis artikel inspirasi rak sepatu minimalis untuk area foyer rumah. Bahas desain slim, shoe cabinet, bench with storage, dan tips menata sepatu agar pintu masuk selalu rapi.' },
  { keyword: 'container makanan', title: 'Container Makanan Terbaik untuk Food Storage', category: 'Review', searchVolume: 590, prompt: 'Tulis review container makanan terbaik untuk food storage. Bahas material (glass, plastic, stainless), airtight seal, microwave-safe, freezer-safe, dan rekomendasi set dengan harga terjangkau.' },
  { keyword: 'sustainable living rumah', title: 'Sustainable Living: Gaya Hidup Ramah Lingkungan di Rumah', category: 'Lifestyle', searchVolume: 480, prompt: 'Tulis artikel tentang sustainable living di rumah. Bahas pengurangan sampah plastik, produk ramah lingkungan, composting, energi efisien, dan cara memulai gaya hidup berkelanjutan.' },
  { keyword: 'organisasi lemari pakaian', title: 'Cara Organisasi Lemari Pakaian agar Rapi', category: 'Tutorial', searchVolume: 480, prompt: 'Tulis tutorial organisasi lemari pakaian agar selalu rapi. Bahas teknik folding KonMari, penggunaan divider dan box, capsule wardrobe, dan tips seasonal rotation pakaian.' },
  { keyword: 'menata kamar tidur kecil', title: 'Tips Menata Kamar Tidur Kecil agar Nyaman', category: 'Tips & Trik', searchVolume: 480, prompt: 'Tulis artikel tips menata kamar tidur kecil agar nyaman. Bahas furniture multifungsi, storage under bed, vertical space, pemilihan warna, dan tips agar kamar terasa lebih luas.' },
  { keyword: 'kamar anak rapi', title: 'Tips Menjaga Kamar Anak Tetap Rapi', category: 'Tips & Trik', searchVolume: 480, prompt: 'Tulis artikel tips menjaga kamar anak tetap rapi. Bahas storage ramah anak, labeling dengan gambar, toy rotation, rutinitas bersih-bersih fun, dan furniture yang tumbuh bersama anak.' },
  { keyword: 'hampers lebaran', title: 'Ide Hampers Lebaran dengan Produk Rumah Tangga', category: 'Inspirasi', searchVolume: 480, prompt: 'Tulis artikel ide hampers Lebaran berisi produk rumah tangga. Bahas packaging cantik, produk yang cocok (kontainer, organizer, kitchen tools), personalisasi, dan tips hampers budget-friendly.' },
  { keyword: 'cara menata dapur kecil', title: 'Cara Menata Dapur Kecil Apartemen', category: 'Tutorial', searchVolume: 480, prompt: 'Tulis tutorial menata dapur kecil apartemen. Bahas layout efisien, vertical storage, magnetic knife strip, over-door organizer, dan tips multifungsi untuk ruang terbatas.' },
  { keyword: 'tips bersih-bersih rumah', title: 'Tips Bersih-bersih Rumah Cepat 30 Menit', category: 'Tips & Trik', searchVolume: 480, prompt: 'Tulis artikel tips bersih-bersih rumah cepat dalam 30 menit. Bahas power cleaning method, zona prioritas, alat yang dibutuhkan, playlist motivasi, dan rutinitas harian vs mingguan.' },
  { keyword: 'wardrobe organizer', title: 'Wardrobe Organizer: Cara Menata Lemari Pakaian', category: 'Tutorial', searchVolume: 480, prompt: 'Tulis tutorial menggunakan wardrobe organizer untuk menata lemari pakaian. Bahas jenis organizer (hanging, shelf divider, drawer), teknik folding, capsule wardrobe, dan seasonal swap.' },
  { keyword: 'tips hemat ruang rumah kecil', title: 'Tips Hemat Ruang untuk Rumah Kecil', category: 'Tips & Trik', searchVolume: 480, prompt: 'Tulis artikel tips hemat ruang untuk rumah kecil Indonesia. Bahas furnitur multifungsi, vertical storage, hidden storage, mirror trick, dan produk space-saving yang wajib dimiliki.' },
  { keyword: 'pantry dapur', title: 'Cara Membuat Pantry Dapur Rapi dan Terorganisir', category: 'Tutorial', searchVolume: 480, prompt: 'Tulis tutorial membuat pantry dapur rapi dan terorganisir. Bahas container uniform, labeling system, FIFO method, grouping by category, dan tips untuk pantry kecil.' },
  { keyword: 'zero waste dapur', title: 'Zero Waste di Dapur: Panduan Praktis', category: 'Lifestyle', searchVolume: 390, prompt: 'Tulis panduan zero waste di dapur. Bahas mengurangi food waste, wadah reusable, belanja tanpa plastik, composting sisa makanan, dan produk zero waste untuk dapur Indonesia.' },
  { keyword: 'menata meja makan lebaran', title: 'Tips Menata Meja Makan untuk Lebaran', category: 'Tutorial', searchVolume: 390, prompt: 'Tulis tutorial menata meja makan untuk Lebaran. Bahas table setting etiquette, pemilihan tableware, centerpiece, folding napkin, dan tips agar meja terlihat mewah meski dengan budget terbatas.' },
  { keyword: 'laundry room organization', title: 'Organisasi Laundry Room di Rumah Indonesia', category: 'Tips & Trik', searchVolume: 390, prompt: 'Tulis artikel tips organisasi laundry room/area cuci di rumah Indonesia. Bahas rak mesin cuci, sorting hamper, drying rack, ironing station, dan tips untuk rumah tanpa laundry room khusus.' },
  { keyword: 'meal prep container', title: 'Panduan Meal Prep Container untuk Pemula', category: 'Tips & Trik', searchVolume: 390, prompt: 'Tulis panduan meal prep container untuk pemula. Bahas jenis container (glass vs plastic), ukuran porsi, tips meal planning mingguan, food safety, dan rekomendasi produk.' },
  { keyword: 'bathroom storage ideas', title: 'Ide Penyimpanan Kamar Mandi agar Rapi', category: 'Tips & Trik', searchVolume: 390, prompt: 'Tulis artikel ide penyimpanan kamar mandi agar rapi. Bahas over-toilet shelf, shower caddy, vanity organizer, towel storage, dan tips untuk kamar mandi mungil.' },
  { keyword: 'home office organizer', title: 'Home Office Organizer: Ruang Kerja Produktif', category: 'Tips & Trik', searchVolume: 390, prompt: 'Tulis artikel tentang home office organizer. Bahas desk organizer, cable management, file storage, digital decluttering, dan tips menjaga meja kerja tetap rapi setiap hari.' },
  { keyword: 'organizing tips Indonesia', title: 'Tips Organizing Rumah ala Indonesia', category: 'Tips & Trik', searchVolume: 390, prompt: 'Tulis artikel tips organizing rumah yang disesuaikan dengan kondisi Indonesia. Bahas iklim tropis, rumah type kecil, budget terjangkau, barang-barang khas Indonesia, dan solusi kreatif lokal.' },
];

// --- Main ---
async function main() {
  if (!TRELLO_API_KEY || !TRELLO_TOKEN) {
    throw new Error('TRELLO_API_KEY and TRELLO_TOKEN required');
  }

  console.log('=== Updating Trello Card Descriptions ===\n');

  // Build keyword-to-article lookup
  const articleByKeyword = new Map<string, ArticlePlan>();
  const articleByTitle = new Map<string, ArticlePlan>();
  for (const a of articles) {
    articleByKeyword.set(a.keyword.toLowerCase(), a);
    articleByTitle.set(a.title.toLowerCase(), a);
  }

  // Get all board cards
  const cards = await getBoardCards();
  const blogCards = cards.filter((c) => c.name.startsWith('[Blog]'));

  console.log(`Found ${blogCards.length} blog cards on the board\n`);

  let updated = 0;
  let skipped = 0;
  let notFound = 0;

  for (const card of blogCards) {
    // Extract title from card name: "[Blog] Title Here"
    const title = card.name.replace('[Blog] ', '').trim();

    // Try to find matching article
    let article = articleByTitle.get(title.toLowerCase());

    if (!article) {
      // Try to match by keyword from existing desc
      const kwMatch = card.desc.match(/\*\*Keyword:\*\*\s*(.+)/);
      if (kwMatch) {
        article = articleByKeyword.get(kwMatch[1].trim().toLowerCase());
      }
    }

    if (!article) {
      console.log(`  NOT FOUND: ${title}`);
      notFound++;
      continue;
    }

    // Extract date from card
    const dateStr = card.due ? card.due.split('T')[0] : 'TBD';

    // Build rich description
    const newDesc = buildRichDescription(article, dateStr);

    try {
      await updateCard(card.id, newDesc);
      updated++;
      console.log(`  ✓ Updated: ${title} (SV: ${article.searchVolume})`);

      // Rate limit
      await new Promise((r) => setTimeout(r, 150));
    } catch (err) {
      console.error(`  ✗ Error updating ${title}:`, err);
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Not found: ${notFound}`);
  console.log(`Total blog cards: ${blogCards.length}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
