import { Metadata } from 'next';
import ToolWidget from './ToolWidget';

const TOOL_NAME = "Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk";
const TOOL_URL = 'https://www.sesoris.com/tools/quiz-tipe-organisasi-rumahmu-rekomendasi-produk';
const TOOL_DESCRIPTION =
  'Quiz singkat 3 pertanyaan untuk menemukan tipe organisasi rumahmu plus rekomendasi produk penyimpanan sesuai ruang dan budget. Ikuti gratis sekarang.';

export const metadata: Metadata = {
  title: "Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk",
  description: TOOL_DESCRIPTION,
  alternates: { canonical: '/tools/quiz-tipe-organisasi-rumahmu-rekomendasi-produk' },
  openGraph: {
    title: "Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk | Sesoris",
    description: TOOL_DESCRIPTION,
    type: 'website',
    url: '/tools/quiz-tipe-organisasi-rumahmu-rekomendasi-produk',
  },
};

const faqs = [
  {
    q: "Apa itu Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk?",
    a: "Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk adalah quiz gratis online yang merangkum jawabanmu jadi rekomendasi produk organizer. Tanpa daftar, tanpa install.",
  },
  {
    q: "Bagaimana cara pakai Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk?",
    a: 'Jawab 3 pertanyaan singkat tentang ruang, ukuran, dan budget, lalu klik tombol "Generate". Hasil rekomendasi muncul instan.',
  },
  {
    q: 'Apakah gratis?',
    a: 'Ya, 100% gratis. Tanpa watermark, tanpa batasan.',
  },
  {
    q: 'Bisa copy hasilnya?',
    a: 'Bisa. Hasil muncul di kotak yang bisa kamu copy manual atau klik tombol copy (kalau ada).',
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
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk</h1>
      <p className="text-lg text-gray-700 mb-6">Jawab 3 pertanyaan singkat dan temukan tipe organisasi rumahmu beserta rekomendasi produk penyimpanan yang paling cocok.</p>

      <ToolWidget />

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Cara Pakai</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Pilih ruang utama yang ingin kamu rapikan: kamar tidur, dapur, kamar mandi, atau living room.</li>
          <li>Pilih ukuran ruangnya, dari sempit (kurang dari 9 m²) sampai luas (lebih dari 15 m²).</li>
          <li>Pilih budget yang kamu siapkan untuk produk organizer.</li>
          <li>Klik tombol "Generate" dan lihat hasil rekomendasinya secara instan.</li>
        </ol>
      </section>

      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Tips Sebelum Belanja Organizer</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Jawab sesuai kondisi nyata ruangmu sekarang, bukan kondisi ideal yang dibayangkan; rekomendasinya jadi lebih akurat.</li>
          <li>Mulai dari satu ruang dulu. Merapikan seisi rumah sekaligus cepat bikin kewalahan dan akhirnya berhenti di tengah jalan.</li>
          <li>Ukur dulu area kosong (lebar, tinggi, kedalaman) sebelum membeli organizer baru supaya tidak salah ukuran.</li>
          <li>Declutter dulu, baru beli wadah. Banyak orang membeli box penyimpanan untuk barang yang sebenarnya sudah layak dilepas.</li>
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
