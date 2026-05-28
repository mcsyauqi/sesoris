import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronRight, Home, Ruler, ShieldCheck, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/product';
import { products } from '@/data/products';
import { formatPrice, toIdrPrice } from '@/lib/utils';

const pageUrl = 'https://www.sesoris.com/rak-serbaguna-multifungsi';

const targetProductSlugs = [
  'rak-piring-stainless-steel-2-tier',
  'rak-sepatu-minimalis-5-tingkat',
  'rak-dinding-floating-shelf-set',
  'rak-buku-minimalis-industrial',
  'foldable-storage-bins',
  'bamboo-desk-organizer',
];

const rackProducts = targetProductSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter(Boolean);

const comparisonRows = [
  ['Rak piring serbaguna', 'Dapur kecil, area wastafel, pantry', 'Tahan air, mudah dibersihkan, punya tray pembuangan'],
  ['Rak sepatu bertingkat', 'Entryway, kamar, kos, apartemen', 'Footprint ramping, kapasitas bertingkat, rangka kokoh'],
  ['Rak dinding multifungsi', 'Ruang tamu, kamar, meja kerja', 'Hemat lantai, cocok untuk dekorasi dan barang kecil'],
  ['Rak buku industrial', 'Home office, ruang keluarga, studio', 'Beban lebih besar, tampilan rapi, mudah diakses'],
  ['Storage bin lipat', 'Lemari, bawah meja, gudang kecil', 'Fleksibel, bisa dilipat, cocok untuk kategori barang campuran'],
];

const faqs = [
  {
    question: 'Apa itu rak penyimpanan multifungsi?',
    answer: 'Rak penyimpanan multifungsi adalah rak yang bisa dipakai untuk lebih dari satu kebutuhan, misalnya menyimpan peralatan dapur, sepatu, buku, dekorasi, perlengkapan kerja, atau stok rumah tangga. Kuncinya ada pada desain modular, ukuran yang efisien, dan material yang sesuai dengan ruangan.',
  },
  {
    question: 'Rak serbaguna paling cocok untuk ruangan kecil yang mana?',
    answer: 'Untuk ruangan kecil, pilih rak vertikal seperti rak sepatu 5 tingkat, rak dinding, atau rak piring 2 tingkat. Model vertikal memanfaatkan tinggi ruangan sehingga lantai tetap lega.',
  },
  {
    question: 'Bagaimana cara memilih rak serbaguna untuk dapur?',
    answer: 'Perhatikan material tahan lembap, kapasitas harian, sistem drainase, dan ukuran meja. Untuk area cuci piring, rak stainless dengan drip tray lebih aman dibanding material yang mudah menyerap air.',
  },
  {
    question: 'Apakah rak dinding bisa dipakai sebagai penyimpanan?',
    answer: 'Bisa. Rak dinding cocok untuk buku kecil, tanaman, dekorasi, kunci, dompet, dan barang ringan lain. Pastikan pemasangan memakai bracket dan sekrup yang sesuai dengan jenis dinding.',
  },
  {
    question: 'Berapa budget ideal untuk rak penyimpanan multifungsi?',
    answer: 'Untuk kebutuhan rumah harian, siapkan budget mulai dari ratusan ribu rupiah tergantung material, kapasitas, dan fungsi. Rak kecil atau storage bin biasanya lebih terjangkau, sementara rak buku atau rak metal besar cenderung lebih mahal.',
  },
  {
    question: 'Apakah satu rak cukup untuk semua kebutuhan storage?',
    answer: 'Biasanya tidak. Sistem storage yang rapi lebih efektif jika dibagi per zona: dapur, pintu masuk, meja kerja, kamar, dan ruang keluarga. Gunakan satu rak utama per zona agar barang tidak bercampur.',
  },
  {
    question: 'Produk Sesoris mana yang paling fleksibel untuk mulai menata rumah?',
    answer: 'Untuk mulai cepat, kombinasikan storage bin lipat, rak dinding, dan rak sepatu bertingkat. Tiga produk ini mencakup barang kecil, dekorasi, dan area masuk rumah yang paling sering berantakan.',
  },
];

export const metadata: Metadata = {
  title: 'Rak Penyimpanan Multifungsi & Rak Serbaguna untuk Rumah Rapi',
  description: 'Panduan memilih rak penyimpanan multifungsi dan rak serbaguna untuk dapur, kamar, ruang tamu, entryway, dan meja kerja. Lihat rekomendasi produk Sesoris.',
  alternates: {
    canonical: '/rak-serbaguna-multifungsi',
  },
  openGraph: {
    title: 'Rak Penyimpanan Multifungsi & Rak Serbaguna | Sesoris',
    description: 'Bandingkan jenis rak serbaguna, tips memilih ukuran/material, FAQ, dan rekomendasi produk Sesoris untuk rumah lebih rapi.',
    url: pageUrl,
    type: 'website',
    images: [{ url: '/images/products/floating-shelf-hero.webp', width: 1200, height: 630, alt: 'Rak penyimpanan multifungsi Sesoris' }],
  },
};

export default function RakSerbagunaPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://www.sesoris.com' },
      { '@type': 'ListItem', position: 2, name: 'Rak Serbaguna Multifungsi', item: pageUrl },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Rekomendasi rak penyimpanan multifungsi Sesoris',
    itemListElement: rackProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product!.name,
        description: product!.description,
        image: `https://www.sesoris.com${product!.images[0]?.url ?? '/og-default.webp'}`,
        url: `https://www.sesoris.com/product/${product!.slug}`,
        brand: { '@type': 'Brand', name: 'Sesoris' },
        aggregateRating: product!.reviewCount > 0 ? {
          '@type': 'AggregateRating',
          ratingValue: product!.rating,
          reviewCount: product!.reviewCount,
        } : undefined,
        offers: {
          '@type': 'Offer',
          price: toIdrPrice(product!.price),
          priceCurrency: 'IDR',
          availability: product!.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          url: `https://www.sesoris.com/product/${product!.slug}`,
        },
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }} />

      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: '#6C757D' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>Rak Serbaguna Multifungsi</span>
          </div>
        </div>
      </div>

      <section style={{ background: '#F4F1EA', padding: '56px 0 48px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, 0.9fr)', gap: '40px', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#1B5E3B', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              Panduan belanja rak penyimpanan
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', lineHeight: 1.05, fontWeight: 800, color: '#212529', marginBottom: '20px' }}>
              Rak Penyimpanan Multifungsi untuk Rumah Lebih Rapi
            </h1>
            <p style={{ color: '#495057', fontSize: '17px', lineHeight: 1.75, maxWidth: '680px', marginBottom: '28px' }}>
              Temukan rak serbaguna untuk dapur, kamar, ruang tamu, entryway, dan meja kerja. Halaman ini membantu Anda membandingkan jenis rak, memilih material yang tepat, lalu langsung menuju produk Sesoris yang relevan.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="#rekomendasi-produk" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Lihat Rekomendasi
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </Link>
              <Link href="#tips-memilih" className="btn btn-outline">
                Tips Memilih Rak
              </Link>
            </div>
          </div>
          <div style={{ position: 'relative', aspectRatio: '4 / 3', borderRadius: '18px', overflow: 'hidden', background: '#E8DED0' }}>
            <Image
              src="/images/products/floating-shelf-hero.webp"
              alt="Rak penyimpanan multifungsi untuk rumah rapi"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '48px 16px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
          {[
            ['5 zona rumah', 'Dapur, kamar, entryway, ruang tamu, dan meja kerja.'],
            ['6 produk pilihan', 'Rak, storage bin, shelf, dan organizer Sesoris yang saling melengkapi.'],
            ['FAQ + schema', 'Konten siap menjawab pertanyaan umum calon pembeli dari Google.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ border: '1px solid #E9ECEF', borderRadius: '12px', padding: '20px', background: 'white' }}>
              <Sparkles style={{ width: '20px', height: '20px', color: '#1B5E3B', marginBottom: '10px' }} />
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#212529', marginBottom: '6px' }}>{title}</h2>
              <p style={{ fontSize: '14px', color: '#6C757D', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container" style={{ padding: '32px 16px' }}>
        <div style={{ maxWidth: '860px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#212529', marginBottom: '14px' }}>
            Apa Itu Rak Penyimpanan Multifungsi?
          </h2>
          <p style={{ color: '#495057', lineHeight: 1.85, fontSize: '16px', marginBottom: '18px' }}>
            Rak penyimpanan multifungsi adalah solusi storage yang bisa dipakai lintas kebutuhan. Satu rak bisa membantu menata piring, sepatu, buku, tanaman, perlengkapan kerja, atau stok rumah tangga selama ukuran, material, dan kapasitasnya sesuai dengan ruangan.
          </p>
          <p style={{ color: '#495057', lineHeight: 1.85, fontSize: '16px' }}>
            Untuk rumah Indonesia yang sering punya ruang terbatas, rak serbaguna lebih efektif jika dipilih berdasarkan zona. Area basah seperti dapur butuh material tahan lembap, sedangkan ruang tamu dan kamar lebih cocok memakai rak dinding atau bookshelf yang tetap dekoratif.
          </p>
        </div>
      </section>

      <section id="tips-memilih" style={{ background: '#F8F9FA', padding: '48px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#212529', marginBottom: '22px' }}>
            Cara Memilih Rak Serbaguna yang Tepat
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
            {[
              [Ruler, 'Ukur ruang sebelum membeli', 'Catat tinggi, lebar, dan kedalaman area. Sisakan ruang buka-tutup pintu atau jalur jalan agar rak tidak mengganggu aktivitas.'],
              [ShieldCheck, 'Sesuaikan material dengan area', 'Pakai stainless atau plastik untuk area lembap, kayu untuk dekorasi, dan rangka metal untuk beban lebih berat.'],
              [CheckCircle2, 'Pilih berdasarkan kategori barang', 'Pisahkan barang dapur, sepatu, buku, alat kerja, dan stok rumah agar setiap rak punya fungsi jelas.'],
            ].map(([Icon, title, desc]) => {
              const TypedIcon = Icon as typeof Ruler;
              return (
                <div key={title as string} style={{ background: 'white', borderRadius: '12px', padding: '22px', border: '1px solid #E9ECEF' }}>
                  <TypedIcon style={{ width: '24px', height: '24px', color: '#1B5E3B', marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#212529', marginBottom: '8px' }}>{title as string}</h3>
                  <p style={{ fontSize: '14px', color: '#495057', lineHeight: 1.7 }}>{desc as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '48px 16px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#212529', marginBottom: '18px' }}>
          Perbandingan Jenis Rak Serbaguna
        </h2>
        <div style={{ overflowX: 'auto', border: '1px solid #E9ECEF', borderRadius: '12px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
            <thead>
              <tr style={{ background: '#1B5E3B', color: 'white' }}>
                <th style={{ textAlign: 'left', padding: '14px 16px' }}>Jenis</th>
                <th style={{ textAlign: 'left', padding: '14px 16px' }}>Cocok untuk</th>
                <th style={{ textAlign: 'left', padding: '14px 16px' }}>Yang perlu dicek</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row[0]} style={{ borderTop: '1px solid #E9ECEF' }}>
                  {row.map((cell) => (
                    <td key={cell} style={{ padding: '14px 16px', color: '#495057', fontSize: '14px', lineHeight: 1.6 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="rekomendasi-produk" style={{ background: '#F8F9FA', padding: '48px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', alignItems: 'end', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#212529', marginBottom: '8px' }}>
                Rekomendasi Produk Rak & Storage Sesoris
              </h2>
              <p style={{ color: '#6C757D', maxWidth: '640px', lineHeight: 1.7 }}>
                Mulai dari rak dapur sampai rak dinding, berikut pilihan produk yang paling relevan untuk keyword rak penyimpanan multifungsi dan rak serbaguna.
              </p>
            </div>
            <Link href="/shop" style={{ color: '#1B5E3B', fontWeight: 700, display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
              Lihat semua produk <ArrowRight style={{ width: '16px', height: '16px' }} />
            </Link>
          </div>
          <div className="grid-products">
            {rackProducts.map((product) => (
              <ProductCard key={product!.id} product={product!} />
            ))}
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '48px 16px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#212529', marginBottom: '18px' }}>
          Paket Kombinasi Rak untuk Tiap Ruangan
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px' }}>
          {[
            ['Dapur kecil', 'Rak piring stainless + storage bin untuk stok bahan kering.', ['rak-piring-stainless-steel-2-tier', 'foldable-storage-bins']],
            ['Entryway rapi', 'Rak sepatu 5 tingkat + rak dinding untuk kunci dan barang kecil.', ['rak-sepatu-minimalis-5-tingkat', 'rak-dinding-floating-shelf-set']],
            ['Meja kerja produktif', 'Organizer bambu + rak dinding untuk catatan, kabel, dan stationery.', ['bamboo-desk-organizer', 'rak-dinding-floating-shelf-set']],
            ['Ruang keluarga', 'Bookshelf industrial + floating shelf untuk buku, dekorasi, dan tanaman.', ['rak-buku-minimalis-industrial', 'rak-dinding-floating-shelf-set']],
          ].map(([title, desc, slugs]) => {
            const comboProducts = (slugs as string[]).map((slug) => products.find((product) => product.slug === slug)).filter(Boolean);
            const total = comboProducts.reduce((sum, product) => sum + product!.price, 0);
            return (
              <div key={title as string} style={{ border: '1px solid #E9ECEF', borderRadius: '12px', padding: '22px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#212529', marginBottom: '8px' }}>{title as string}</h3>
                <p style={{ fontSize: '14px', color: '#495057', lineHeight: 1.7, marginBottom: '12px' }}>{desc as string}</p>
                <div style={{ fontSize: '13px', color: '#6C757D', marginBottom: '10px' }}>Estimasi mulai {formatPrice(total)}</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {comboProducts.map((product) => (
                    <Link key={product!.id} href={`/product/${product!.slug}`} style={{ fontSize: '13px', color: '#1B5E3B', fontWeight: 600 }}>
                      {product!.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ background: '#F8F9FA', padding: '48px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#212529', marginBottom: '22px' }}>
            FAQ Rak Penyimpanan Multifungsi
          </h2>
          <div style={{ display: 'grid', gap: '14px', maxWidth: '900px' }}>
            {faqs.map((faq) => (
              <div key={faq.question} style={{ background: 'white', border: '1px solid #E9ECEF', borderRadius: '12px', padding: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#212529', marginBottom: '8px' }}>{faq.question}</h3>
                <p style={{ color: '#495057', lineHeight: 1.75, fontSize: '14px' }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '48px 16px 72px' }}>
        <div style={{ background: '#1B5E3B', borderRadius: '18px', padding: '32px', color: 'white', display: 'flex', justifyContent: 'space-between', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px' }}>Siap mulai menata rumah?</h2>
            <p style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, maxWidth: '620px' }}>
              Pilih rak serbaguna sesuai zona rumah, lalu kombinasikan dengan storage bin atau organizer agar hasilnya lebih tahan lama.
            </p>
          </div>
          <Link href="/category/home-living" className="btn" style={{ background: 'white', color: '#1B5E3B', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Belanja Organizer Rumah
            <ArrowRight style={{ width: '16px', height: '16px' }} />
          </Link>
        </div>
      </section>
    </>
  );
}
