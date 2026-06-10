import { Metadata } from 'next';
import ToolWidget from './ToolWidget';

const TOOL_NAME = 'Kalkulator Kapasitas & Kebutuhan Storage Box';
const TOOL_URL = 'https://www.sesoris.com/tools/kalkulator-kapasitas-kebutuhan-storage-box';
const TOOL_DESCRIPTION =
  'Hitung jumlah storage box yang kamu butuhkan dari jumlah baju, buku, sepatu, dan barang kecil. Gratis, hasil instan. Hitung kebutuhanmu sekarang.';

export const metadata: Metadata = {
  title: 'Kalkulator Kapasitas & Kebutuhan Storage Box',
  description: TOOL_DESCRIPTION,
  alternates: { canonical: '/tools/kalkulator-kapasitas-kebutuhan-storage-box' },
  openGraph: {
    title: 'Kalkulator Kapasitas & Kebutuhan Storage Box | Sesoris',
    description: TOOL_DESCRIPTION,
    type: 'website',
    url: '/tools/kalkulator-kapasitas-kebutuhan-storage-box',
  },
};

const faqs = [
  {
    q: 'Apa itu Kalkulator Kapasitas & Kebutuhan Storage Box?',
    a: 'Kalkulator Kapasitas & Kebutuhan Storage Box adalah tool gratis online yang bantu kamu hitung dengan cepat tanpa perlu install aplikasi.',
  },
  {
    q: 'Bagaimana cara pakai Kalkulator Kapasitas & Kebutuhan Storage Box?',
    a: 'Isi field input di atas, klik tombol "Hitung", hasilnya muncul instan. Reset kalau mau hitung ulang.',
  },
  {
    q: 'Apakah Kalkulator Kapasitas & Kebutuhan Storage Box gratis?',
    a: 'Ya, 100% gratis. Tidak perlu daftar atau login.',
  },
  {
    q: 'Apakah hasil Kalkulator Kapasitas & Kebutuhan Storage Box akurat?',
    a: 'Akurat sesuai formula standar. Hasil ini panduan; konsultasi ahli kalau butuh keputusan penting.',
  },
  {
    q: 'Bisa dipakai di HP?',
    a: 'Bisa. Tool ini responsive dan jalan di HP, tablet, dan desktop.',
  },
];
const internalLinks = [
  {
    url: 'https://www.sesoris.com/',
    title: 'Beranda',
  },
  {
    url: 'https://www.sesoris.com/blog',
    title: 'Blog',
  },
  {
    url: 'https://www.sesoris.com/about',
    title: 'Tentang',
  },
];

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Kalkulator Kapasitas & Kebutuhan Storage Box</h1>
      <p className="text-lg text-gray-700 mb-6">Hitung berapa storage box dibutuhkan untuk barang kamu.</p>

      <ToolWidget />

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Cara Pakai</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Pilih kapasitas storage box yang mau kamu pakai: 30 L (kecil), 50 L (sedang), 80 L (besar), atau 120 L (jumbo).</li>
          <li>Isi jumlah baju, buku, pasang sepatu, dan barang kecil lain yang mau disimpan.</li>
          <li>Klik tombol "Hitung". Estimasi volume total dan jumlah box yang dibutuhkan muncul instan.</li>
          <li>Ulangi dengan ukuran box berbeda untuk membandingkan mana yang paling efisien.</li>
        </ol>
      </section>

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Tips Memilih Storage Box</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Kalkulasi memakai asumsi volume rata-rata: baju 1,5 L per helai, buku 1 L, sepatu 3 L per pasang, dan barang kecil 0,5 L.</li>
          <li>Hasil sudah memperhitungkan efisiensi pengisian 75%, karena selalu ada ruang kosong di antara barang.</li>
          <li>Box 50 L paling serbaguna untuk pakaian; box jumbo 120 L cocok untuk bedcover dan barang musiman, tapi berat saat penuh.</li>
          <li>Gunakan vacuum bag untuk pakaian tebal supaya muat lebih banyak per box.</li>
          <li>Pilih box transparan atau beri label supaya isi mudah ditemukan tanpa bongkar semua.</li>
        </ul>
      </section>

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Pertanyaan Umum</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">{f.q}</h3>
              <p className="text-gray-700">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Artikel Terkait</h2>
        <ul className="space-y-2">
          {internalLinks.map((l, i) => (
            <li key={i}><a href={l.url} className="text-blue-600 hover:underline">{l.title}</a></li>
          ))}
        </ul>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: TOOL_NAME,
          url: TOOL_URL,
          description: TOOL_DESCRIPTION,
          applicationCategory: 'UtilityApplication',
          operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0' },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
          }),
        }}
      />
    </article>
  );
}
