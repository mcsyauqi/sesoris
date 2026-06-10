import { Metadata } from 'next';
import ToolWidget from './ToolWidget';

const TOOL_NAME = 'Konverter Satuan Online';
const TOOL_URL = 'https://www.sesoris.com/tools/konverter-satuan-online';
const TOOL_DESCRIPTION =
  'Konverter satuan masak online gratis: gram, kg, ons, cup, sendok makan, sendok teh, ml, sampai liter. Hasil instan buat resep harian. Coba sekarang.';

export const metadata: Metadata = {
  title: 'Konverter Satuan Online: Gram, Cup, Sendok, ml',
  description: TOOL_DESCRIPTION,
  alternates: { canonical: '/tools/konverter-satuan-online' },
  openGraph: {
    title: 'Konverter Satuan Online: Gram, Cup, Sendok, ml | Sesoris',
    description: TOOL_DESCRIPTION,
    type: 'website',
    url: '/tools/konverter-satuan-online',
  },
};

const faqs = [
  {
    q: 'Apa itu Konverter Satuan Online?',
    a: 'Konverter Satuan Online adalah tool gratis online yang bantu kamu hitung dengan cepat tanpa perlu install aplikasi.',
  },
  {
    q: 'Bagaimana cara pakai Konverter Satuan Online?',
    a: 'Isi field input di atas, klik tombol "Hitung", hasilnya muncul instan. Reset kalau mau hitung ulang.',
  },
  {
    q: 'Apakah Konverter Satuan Online gratis?',
    a: 'Ya, 100% gratis. Tidak perlu daftar atau login.',
  },
  {
    q: 'Apakah hasil Konverter Satuan Online akurat?',
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
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Konverter Satuan Online</h1>
      <p className="text-lg text-gray-700 mb-6">Konversi antar satuan masakan: gram, sendok, cup, mililiter, dan lainnya.</p>

      <ToolWidget />

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Cara Pakai</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Masukkan jumlah yang mau dikonversi, misal 100.</li>
          <li>Pilih satuan asal di kolom "Dari", contoh: gram.</li>
          <li>Pilih satuan tujuan di kolom "Ke", contoh: ons atau kilogram.</li>
          <li>Klik tombol "Hitung". Hasil konversi langsung muncul di bawah, lengkap dengan satuannya.</li>
        </ol>
      </section>

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Tips Konversi Satuan Dapur</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>1 cup standar resep = 240 ml, sedangkan gelas belimbing yang umum di Indonesia = 200 ml. Jangan tertukar saat mengikuti resep luar.</li>
          <li>1 ons di Indonesia = 100 gram. Berbeda dengan ounce (oz) internasional yang hanya 28,35 gram.</li>
          <li>1 sendok makan (sdm) = 15 ml dan 1 sendok teh (sdt) = 5 ml; praktis untuk menakar bumbu cair tanpa timbangan.</li>
          <li>Konversi massa ke volume (misal gram ke ml) butuh densitas bahan, jadi tool ini sengaja menolak konversi lintas jenis agar hasilnya tidak menyesatkan.</li>
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
