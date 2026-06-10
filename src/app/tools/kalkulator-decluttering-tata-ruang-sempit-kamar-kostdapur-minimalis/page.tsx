import { Metadata } from 'next';
import ToolWidget from './ToolWidget';

const TOOL_NAME = 'Kalkulator Decluttering & Tata Ruang Sempit (Kamar Kost/Dapur Minimalis)';
const TOOL_URL = 'https://www.sesoris.com/tools/kalkulator-decluttering-tata-ruang-sempit-kamar-kostdapur-minimalis';
const TOOL_DESCRIPTION =
  'Bingung barang mana yang harus dilepas? Jawab 8 pertanyaan cepat, dapatkan keputusan KEEP, REVIEW, atau LEPAS untuk kamar kost dan dapur minimalis.';

export const metadata: Metadata = {
  title: 'Kalkulator Decluttering & Tata Ruang Sempit',
  description: TOOL_DESCRIPTION,
  alternates: { canonical: '/tools/kalkulator-decluttering-tata-ruang-sempit-kamar-kostdapur-minimalis' },
  openGraph: {
    title: 'Kalkulator Decluttering & Tata Ruang Sempit | Sesoris',
    description: TOOL_DESCRIPTION,
    type: 'website',
    url: '/tools/kalkulator-decluttering-tata-ruang-sempit-kamar-kostdapur-minimalis',
  },
};

const faqs = [
  {
    q: 'Apa itu Kalkulator Decluttering & Tata Ruang Sempit (Kamar Kost/Dapur Minimalis)?',
    a: 'Kalkulator Decluttering & Tata Ruang Sempit (Kamar Kost/Dapur Minimalis) adalah tool gratis online yang bantu kamu hitung dengan cepat tanpa perlu install aplikasi.',
  },
  {
    q: 'Bagaimana cara pakai Kalkulator Decluttering & Tata Ruang Sempit (Kamar Kost/Dapur Minimalis)?',
    a: 'Isi field input di atas, klik tombol "Hitung", hasilnya muncul instan. Reset kalau mau hitung ulang.',
  },
  {
    q: 'Apakah Kalkulator Decluttering & Tata Ruang Sempit (Kamar Kost/Dapur Minimalis) gratis?',
    a: 'Ya, 100% gratis. Tidak perlu daftar atau login.',
  },
  {
    q: 'Apakah hasil Kalkulator Decluttering & Tata Ruang Sempit (Kamar Kost/Dapur Minimalis) akurat?',
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
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Kalkulator Decluttering & Tata Ruang Sempit (Kamar Kost/Dapur Minimalis)</h1>
      <p className="text-lg text-gray-700 mb-6">Tentukan prioritas decluttering kamar/dapur kecil.</p>

      <ToolWidget />

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Cara Pakai</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Pegang atau bayangkan satu barang yang bikin kamu ragu: simpan atau lepas?</li>
          <li>Jawab 8 pertanyaan Ya/Tidak tentang frekuensi pemakaian, nilai emosional, kondisi, dan tempat penyimpanannya.</li>
          <li>Klik tombol "Hitung". Skor 0-8 muncul beserta keputusan: KEEP, REVIEW, atau LEPAS.</li>
          <li>Klik "Reset" dan ulangi untuk barang berikutnya, satu per satu.</li>
        </ol>
      </section>

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Tips Decluttering Ruang Sempit</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Cara baca skor: 6-8 berarti KEEP, 3-5 berarti REVIEW, dan 0-2 berarti sudah waktunya LEPAS.</li>
          <li>Barang kategori REVIEW masukkan ke satu kotak khusus selama 30 hari. Kalau tidak pernah disentuh, hampir pasti aman dilepas: donasi, jual, atau daur ulang.</li>
          <li>Untuk kamar kost, prioritaskan melepas barang besar yang jarang dipakai; satu barang besar membebaskan ruang lebih banyak daripada sepuluh barang kecil.</li>
          <li>Di dapur minimalis, mulai dari alat duplikat (dua spatula, tiga panci serupa) dan bumbu atau bahan yang sudah kedaluwarsa.</li>
          <li>Setelah decluttering, baru tentukan kebutuhan storage box supaya tidak membeli wadah untuk barang yang seharusnya dilepas.</li>
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
