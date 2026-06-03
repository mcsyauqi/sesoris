import { Metadata } from 'next';
import Script from 'next/script';
import ToolWidget from './ToolWidget';

export const metadata: Metadata = {
  title: 'Kalkulator Kapasitas & Kebutuhan Storage Box',
  description: 'Kalkulator Kapasitas & Kebutuhan Storage Box gratis online.  Mudah dipakai, hasil instan.',
  alternates: { canonical: 'https://www.sesoris.com/tools/kalkulator-kapasitas-kebutuhan-storage-box/' },
};

const faqs = [
  {
    "q": "Apa itu Kalkulator Kapasitas & Kebutuhan Storage Box?",
    "a": "Kalkulator Kapasitas & Kebutuhan Storage Box adalah tool gratis online yang bantu kamu hitung dengan cepat tanpa perlu install aplikasi."
  },
  {
    "q": "Bagaimana cara pakai Kalkulator Kapasitas & Kebutuhan Storage Box?",
    "a": "Isi field input di atas, klik tombol \"Hitung\", hasilnya muncul instan. Reset kalau mau hitung ulang."
  },
  {
    "q": "Apakah Kalkulator Kapasitas & Kebutuhan Storage Box gratis?",
    "a": "Ya, 100% gratis. Tidak perlu daftar atau login."
  },
  {
    "q": "Apakah hasil Kalkulator Kapasitas & Kebutuhan Storage Box akurat?",
    "a": "Akurat sesuai formula standar. Hasil ini panduan; konsultasi ahli kalau butuh keputusan penting."
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
  },
  {
    "url": "https://www.sesoris.com/tentang",
    "title": "Tentang"
  }
];

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Kalkulator Kapasitas & Kebutuhan Storage Box</h1>
      <p className="text-lg text-gray-700 mb-6">Hitung berapa storage box dibutuhkan untuk barang kamu.</p>

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
        {JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":"Kalkulator Kapasitas & Kebutuhan Storage Box","description":"Kalkulator Kapasitas & Kebutuhan Storage Box gratis online.  Mudah dipakai, hasil instan.","url":"https://www.sesoris.com/tools/kalkulator-kapasitas-kebutuhan-storage-box/"})}
      </Script>
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Apa itu Kalkulator Kapasitas & Kebutuhan Storage Box?","acceptedAnswer":{"@type":"Answer","text":"Kalkulator Kapasitas & Kebutuhan Storage Box adalah tool gratis online yang bantu kamu hitung dengan cepat tanpa perlu install aplikasi."}},{"@type":"Question","name":"Bagaimana cara pakai Kalkulator Kapasitas & Kebutuhan Storage Box?","acceptedAnswer":{"@type":"Answer","text":"Isi field input di atas, klik tombol \"Hitung\", hasilnya muncul instan. Reset kalau mau hitung ulang."}},{"@type":"Question","name":"Apakah Kalkulator Kapasitas & Kebutuhan Storage Box gratis?","acceptedAnswer":{"@type":"Answer","text":"Ya, 100% gratis. Tidak perlu daftar atau login."}},{"@type":"Question","name":"Apakah hasil Kalkulator Kapasitas & Kebutuhan Storage Box akurat?","acceptedAnswer":{"@type":"Answer","text":"Akurat sesuai formula standar. Hasil ini panduan; konsultasi ahli kalau butuh keputusan penting."}},{"@type":"Question","name":"Bisa dipakai di HP?","acceptedAnswer":{"@type":"Answer","text":"Bisa. Tool ini responsive dan jalan di HP, tablet, dan desktop."}}]})}
      </Script>
    </article>
  );
}
