import { Metadata } from 'next';
import Script from 'next/script';
import ToolWidget from './ToolWidget';

export const metadata: Metadata = {
  title: 'Quiz \'Tipe Organisasi Rumahmu\' + Rekomendasi Produk',
  description: 'Quiz \'Tipe Organisasi Rumahmu\' + Rekomendasi Produk gratis online. Klik tombol, dapat hasil instan. ',
  alternates: { canonical: 'https://www.sesoris.com/tools/quiz-tipe-organisasi-rumahmu-rekomendasi-produk/' },
};

const faqs = [
  {
    "q": "Apa itu Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk?",
    "a": "Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk adalah tool gratis online yang generate hasil random tiap klik. Tanpa daftar, tanpa install."
  },
  {
    "q": "Bagaimana cara pakai Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk?",
    "a": "Klik tombol \"Generate\" di atas. Hasil muncul instan. Klik lagi kalau mau yang baru."
  },
  {
    "q": "Apakah gratis?",
    "a": "Ya, 100% gratis. Tanpa watermark, tanpa batasan."
  },
  {
    "q": "Bisa copy hasilnya?",
    "a": "Bisa. Hasil muncul di kotak yang bisa kamu copy manual atau klik tombol copy (kalau ada)."
  },
  {
    "q": "Bisa dipakai di HP?",
    "a": "Bisa. Tool ini responsive dan jalan di HP, tablet, dan desktop."
  }
];
const internalLinks = [
  {
    "url": "https://www.sesoris.com/",
    "title": "Beranda"
  },
  {
    "url": "https://www.sesoris.com/blog",
    "title": "Blog"
  }
];

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk</h1>
      <p className="text-lg text-gray-700 mb-6">Quiz \'Tipe Organisasi Rumahmu\' + Rekomendasi Produk gratis online. Klik tombol, dapat hasil instan. </p>

      <ToolWidget />

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

      <Script id="article-schema" type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":"Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk","description":"Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk gratis online. Klik tombol, dapat hasil instan. ","url":"https://www.sesoris.com/tools/quiz-tipe-organisasi-rumahmu-rekomendasi-produk/"})}
      </Script>
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Apa itu Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk?","acceptedAnswer":{"@type":"Answer","text":"Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk adalah tool gratis online yang generate hasil random tiap klik. Tanpa daftar, tanpa install."}},{"@type":"Question","name":"Bagaimana cara pakai Quiz 'Tipe Organisasi Rumahmu' + Rekomendasi Produk?","acceptedAnswer":{"@type":"Answer","text":"Klik tombol \"Generate\" di atas. Hasil muncul instan. Klik lagi kalau mau yang baru."}},{"@type":"Question","name":"Apakah gratis?","acceptedAnswer":{"@type":"Answer","text":"Ya, 100% gratis. Tanpa watermark, tanpa batasan."}},{"@type":"Question","name":"Bisa copy hasilnya?","acceptedAnswer":{"@type":"Answer","text":"Bisa. Hasil muncul di kotak yang bisa kamu copy manual atau klik tombol copy (kalau ada)."}},{"@type":"Question","name":"Bisa dipakai di HP?","acceptedAnswer":{"@type":"Answer","text":"Bisa. Tool ini responsive dan jalan di HP, tablet, dan desktop."}}]})}
      </Script>
    </article>
  );
}
