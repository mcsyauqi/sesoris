import { Metadata } from 'next';
import ToolWidget from './ToolWidget';

const TOOL_NAME = 'Penggaris & Alat Ukur Online';
const TOOL_URL = 'https://www.sesoris.com/tools/penggaris-alat-ukur-online';
const TOOL_DESCRIPTION =
  'Penggaris online gratis dengan skala cm, mm, dan inch langsung di layar. Ukur benda kecil tanpa penggaris fisik, bisa kalibrasi. Coba sekarang.';

export const metadata: Metadata = {
  title: 'Penggaris & Alat Ukur Online Gratis (cm, mm, inch)',
  description: TOOL_DESCRIPTION,
  alternates: { canonical: '/tools/penggaris-alat-ukur-online' },
  openGraph: {
    title: 'Penggaris & Alat Ukur Online Gratis (cm, mm, inch) | Sesoris',
    description: TOOL_DESCRIPTION,
    type: 'website',
    url: '/tools/penggaris-alat-ukur-online',
  },
};

const faqs = [
  {
    q: 'Apa itu Penggaris & Alat Ukur Online?',
    a: 'Penggaris & Alat Ukur Online adalah tool gratis yang menampilkan penggaris virtual dengan skala cm, mm, dan inch langsung di layar perangkatmu. Tanpa daftar, tanpa install.',
  },
  {
    q: 'Bagaimana cara pakai Penggaris & Alat Ukur Online?',
    a: 'Masukkan panjang objek, pilih unit cm atau inch, lalu klik tombol "Generate". Penggaris dan batang pembanding sepanjang objek muncul instan di layar.',
  },
  {
    q: 'Apakah gratis?',
    a: 'Ya, 100% gratis. Tanpa watermark, tanpa batasan.',
  },
  {
    q: 'Apakah hasil pengukurannya akurat?',
    a: 'Akurasi tergantung resolusi layar perangkat. Untuk hasil presisi, kalibrasi dulu dengan benda berukuran standar seperti KTP (panjang 8,5 cm) sebelum mengukur.',
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
];

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Penggaris & Alat Ukur Online</h1>
      <p className="text-lg text-gray-700 mb-6">Penggaris & Alat Ukur Online gratis. Tampilkan skala cm, mm, dan inch di layar untuk mengukur benda kecil tanpa penggaris fisik. Buat yang nyari "penggaris online".</p>

      <ToolWidget />

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Cara Pakai</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Masukkan panjang objek yang ingin kamu ukur atau bandingkan (dalam cm atau inch).</li>
          <li>Pilih unit pengukuran: cm/mm atau inch.</li>
          <li>Klik tombol "Generate". Penggaris virtual lengkap dengan batang biru sepanjang objek langsung muncul di layar.</li>
          <li>Tempelkan benda fisik ke layar untuk membandingkan dengan skala, atau baca hasil konversi cm, mm, dan inch di bawah penggaris.</li>
        </ol>
      </section>

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Tips Mengukur Lebih Akurat</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Kalibrasi dulu: tempelkan KTP atau kartu ATM (panjang standar 8,5 cm) ke layar, lalu cocokkan dengan skala penggaris.</li>
          <li>Di HP, putar layar ke mode landscape supaya skala yang terlihat lebih panjang.</li>
          <li>Gunakan hasil konversi otomatis di bawah penggaris kalau butuh nilai mm atau inch tanpa hitung manual.</li>
          <li>Untuk kebutuhan presisi tinggi (teknik, medis, jahit pola), tetap gunakan alat ukur fisik sebagai acuan akhir.</li>
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
