import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Calendar, Clock, ArrowLeft, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';

const blogPosts: Record<string, {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: { name: string; avatar: string; role: string };
  content: string[];
}> = {
  'tips-menata-rumah-minimalis-marie-kondo': {
    title: '10 Tips Menata Rumah Minimalis ala Marie Kondo',
    excerpt: 'Pelajari metode KonMari untuk merapikan rumah Anda dan hanya menyimpan barang yang membawa kebahagiaan.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop',
    category: 'Tips & Trik',
    date: '5 Januari 2026',
    readTime: '8 menit',
    author: { name: 'Sarah Putri', avatar: 'SP', role: 'Interior Designer' },
    content: [
      'Marie Kondo, konsultan organizing asal Jepang, telah mengubah cara jutaan orang di seluruh dunia menata rumah mereka. Metode KonMari yang diciptakannya fokus pada satu pertanyaan sederhana: "Apakah barang ini membawa kebahagiaan?"',

      '## 1. Mulai dengan Komitmen',
      'Sebelum memulai, buatlah komitmen untuk benar-benar menyelesaikan proses decluttering. Metode KonMari bukan sekadar membersihkan rumah, tapi transformasi gaya hidup. Tentukan waktu khusus dan pastikan Anda siap secara mental.',

      '## 2. Visualisasikan Gaya Hidup Ideal',
      'Bayangkan seperti apa rumah impian Anda. Bagaimana rasanya tinggal di sana? Visualisasi ini akan menjadi motivasi Anda selama proses berlangsung.',

      '## 3. Sortir Berdasarkan Kategori, Bukan Lokasi',
      'Kumpulkan semua barang dari kategori yang sama (misalnya: pakaian) ke satu tempat. Ini membantu Anda melihat berapa banyak barang yang sebenarnya Anda miliki.',

      '## 4. Ikuti Urutan yang Tepat',
      'Marie Kondo merekomendasikan urutan: pakaian, buku, kertas/dokumen, komono (barang campur), dan terakhir benda sentimental. Urutan ini membantu Anda mengasah kemampuan memutuskan.',

      '## 5. Pegang Setiap Barang',
      'Ambil setiap barang dan rasakan. Tanyakan pada diri sendiri: "Apakah ini membawa kebahagiaan?" Jika tidak, ucapkan terima kasih dan lepaskan.',

      '## 6. Lipat dengan Benar',
      'Metode melipat KonMari memungkinkan Anda menyimpan lebih banyak dalam ruang yang lebih kecil. Lipat pakaian menjadi persegi panjang kecil dan simpan berdiri, bukan ditumpuk.',

      '## 7. Tentukan Tempat untuk Setiap Barang',
      'Setiap barang harus memiliki "rumah" sendiri. Setelah digunakan, kembalikan ke tempatnya. Ini mencegah kekacauan menumpuk kembali.',

      '## 8. Simpan dengan Cara yang Membuat Anda Bahagia',
      'Gunakan kotak-kotak cantik, organizer yang menarik, atau kontainer yang Anda sukai. Penyimpanan yang estetis membuat Anda lebih termotivasi menjaga kerapian.',

      '## 9. Jangan Simpan "Just in Case"',
      'Barang yang disimpan "untuk jaga-jaga" biasanya tidak pernah digunakan. Percayalah bahwa Anda bisa mendapatkan apa yang dibutuhkan saat diperlukan.',

      '## 10. Nikmati Prosesnya',
      'Decluttering bukan hukuman, tapi hadiah untuk diri sendiri. Nikmati setiap momen dan rasakan beban yang terangkat seiring berkurangnya barang.',

      '## Kesimpulan',
      'Metode KonMari bukan sekadar tentang membuang barang, tapi tentang memilih apa yang benar-benar penting dalam hidup Anda. Dengan rumah yang rapi dan penuh barang yang Anda cintai, Anda akan merasakan ketenangan dan kebahagiaan yang lebih besar.',
    ],
  },
  'cara-merawat-peralatan-dapur-stainless-steel': {
    title: 'Cara Merawat Peralatan Dapur Stainless Steel',
    excerpt: 'Panduan lengkap membersihkan dan merawat peralatan dapur stainless steel agar tetap mengkilap.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop',
    category: 'Tutorial',
    date: '2 Januari 2026',
    readTime: '5 menit',
    author: { name: 'Budi Santoso', avatar: 'BS', role: 'Home Care Expert' },
    content: [
      'Peralatan dapur stainless steel adalah investasi jangka panjang yang membutuhkan perawatan tepat. Dengan cara yang benar, peralatan Anda bisa tetap mengkilap dan awet selama bertahun-tahun.',

      '## Mengapa Stainless Steel?',
      'Stainless steel populer karena tahan karat, higienis, dan memiliki tampilan modern. Namun, material ini tetap bisa tergores, bernoda, atau kusam jika tidak dirawat dengan baik.',

      '## Pembersihan Harian',
      'Untuk pembersihan sehari-hari, gunakan air hangat dan sabun cuci piring. Gunakan spons lembut atau kain mikrofiber. Selalu bilas dengan air bersih dan keringkan segera untuk mencegah water spots.',

      '## Menghilangkan Noda Membandel',
      'Untuk noda yang sulit, buat pasta dari baking soda dan air. Oleskan pada noda, diamkan 15-20 menit, lalu gosok lembut searah grain (tekstur) stainless steel. Bilas dan keringkan.',

      '## Mengembalikan Kilau',
      'Oleskan sedikit baby oil atau olive oil pada kain bersih, lalu poles permukaan stainless steel searah grain. Ini akan mengembalikan kilau dan memberikan lapisan pelindung.',

      '## Yang Harus Dihindari',
      '- Jangan gunakan spons abrasif atau steel wool\n- Hindari pembersih yang mengandung chlorine\n- Jangan biarkan makanan asam menempel lama\n- Jangan gunakan pemutih langsung',

      '## Tips Mencegah Goresan',
      'Gunakan talenan saat memotong, jangan langsung di atas permukaan stainless steel. Simpan peralatan dengan lapisan pelindung atau organizer khusus.',

      '## Perawatan Berkala',
      'Lakukan deep cleaning sebulan sekali dengan cuka putih untuk menghilangkan mineral deposit. Semprot cuka, diamkan 5 menit, bilas, dan keringkan.',

      '## Kesimpulan',
      'Dengan perawatan rutin yang tepat, peralatan stainless steel Anda akan tetap cantik dan berfungsi optimal. Investasikan sedikit waktu untuk merawatnya, dan nikmati dapur yang selalu bersih mengkilap.',
    ],
  },
  'inspirasi-dekorasi-kamar-tidur-2026': {
    title: 'Inspirasi Dekorasi Kamar Tidur 2026',
    excerpt: 'Tren dekorasi kamar tidur terbaru yang cozy dan instagramable untuk tahun ini.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=600&fit=crop',
    category: 'Inspirasi',
    date: '28 Desember 2025',
    readTime: '6 menit',
    author: { name: 'Maya Dewi', avatar: 'MD', role: 'Interior Stylist' },
    content: [
      'Tahun 2026 membawa tren dekorasi kamar tidur yang menggabungkan kenyamanan, keberlanjutan, dan estetika. Berikut inspirasi yang bisa Anda terapkan.',

      '## 1. Earth Tones Dominan',
      'Warna-warna alam seperti sage green, terracotta, warm beige, dan dusty rose menjadi pilihan utama. Warna-warna ini menciptakan atmosfer menenangkan yang sempurna untuk ruang istirahat.',

      '## 2. Tekstur Berlapis',
      'Kombinasikan berbagai tekstur: linen untuk seprai, boucle untuk throw blanket, velvet untuk bantal aksen, dan rattan untuk furnitur. Layering tekstur membuat ruangan terasa kaya dan nyaman.',

      '## 3. Curved Furniture',
      'Furnitur dengan garis lengkung menggantikan sudut tajam. Headboard melengkung, meja samping organik, dan cermin oval menjadi pilihan populer.',

      '## 4. Statement Lighting',
      'Lampu gantung sculptural atau lampu meja dengan desain unik menjadi focal point. Pilih lampu dengan cahaya hangat untuk suasana cozy.',

      '## 5. Sustainable Materials',
      'Material ramah lingkungan seperti bambu, rattan, kapas organik, dan kayu reclaimed semakin diminati. Selain estetis, ini juga mendukung gaya hidup berkelanjutan.',

      '## 6. Minimalis dengan Karakter',
      'Minimalis tetap tren, tapi dengan sentuhan personal. Pilih beberapa item dekorasi bermakna daripada banyak aksesori generik.',

      '## 7. Biophilic Design',
      'Tanaman indoor, material alami, dan pencahayaan natural menjadi elemen penting. Koneksi dengan alam terbukti meningkatkan kualitas tidur.',

      '## 8. Cozy Reading Nook',
      'Jika ruang memungkinkan, buat sudut baca dengan kursi nyaman dan pencahayaan yang baik. Ini menjadi spot relaksasi sebelum tidur.',

      '## Tips Implementasi',
      'Mulai dari elemen terbesar (cat dinding, bedding) lalu tambahkan aksen. Tidak perlu mengubah semuanya sekaligus – perubahan bertahap lebih sustainable dan budget-friendly.',

      '## Kesimpulan',
      'Kamar tidur impian 2026 adalah perpaduan antara kenyamanan, personalitas, dan kesadaran lingkungan. Pilih elemen yang resonan dengan Anda dan ciptakan sanctuary pribadi.',
    ],
  },
  'sustainable-living-mulai-dari-rumah': {
    title: 'Sustainable Living: Mulai dari Rumah',
    excerpt: 'Langkah-langkah sederhana untuk memulai gaya hidup ramah lingkungan dari rumah Anda.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop',
    category: 'Lifestyle',
    date: '20 Desember 2025',
    readTime: '7 menit',
    author: { name: 'Rina Wijaya', avatar: 'RW', role: 'Sustainability Advocate' },
    content: [
      'Gaya hidup berkelanjutan tidak harus dimulai dengan perubahan drastis. Langkah-langkah kecil dari rumah bisa membuat dampak besar bagi lingkungan.',

      '## Mengapa Sustainable Living?',
      'Setiap tahun, rata-rata rumah tangga Indonesia menghasilkan ratusan kilogram sampah. Dengan perubahan kebiasaan sederhana, kita bisa mengurangi jejak karbon dan menciptakan masa depan lebih baik.',

      '## 1. Kurangi Sampah Plastik',
      'Ganti kantong plastik dengan tas belanja reusable. Gunakan wadah kaca atau stainless steel untuk menyimpan makanan. Bawa botol minum dan tumbler sendiri.',

      '## 2. Hemat Energi',
      'Matikan lampu dan elektronik saat tidak digunakan. Ganti ke lampu LED. Manfaatkan cahaya natural sebanyak mungkin. Cabut charger dari stop kontak.',

      '## 3. Hemat Air',
      'Perbaiki keran yang bocor segera. Gunakan shower alih-alih bath. Tampung air hujan untuk menyiram tanaman. Cuci pakaian dengan muatan penuh.',

      '## 4. Composting di Rumah',
      'Mulai composting untuk sampah organik dapur. Ini mengurangi sampah ke TPA dan menghasilkan pupuk gratis untuk tanaman.',

      '## 5. Pilih Produk Ramah Lingkungan',
      'Cari produk dengan kemasan minimal atau recyclable. Pilih produk lokal untuk mengurangi carbon footprint transportasi. Beli produk berkualitas yang tahan lama.',

      '## 6. Reduce, Reuse, Recycle',
      'Sebelum membeli, tanyakan apakah benar-benar perlu. Kreatif menggunakan ulang barang. Pisahkan sampah untuk didaur ulang dengan benar.',

      '## 7. Urban Gardening',
      'Tanam sayuran atau herbs sendiri, meski hanya di pot kecil. Ini mengurangi packaging dan food miles, plus lebih segar dan sehat.',

      '## 8. Second-hand First',
      'Pertimbangkan barang bekas untuk furnitur dan pakaian. Thrift shopping tidak hanya sustainable tapi juga hemat budget.',

      '## Memulai dengan Realistis',
      'Tidak perlu sempurna. Mulai dengan satu atau dua kebiasaan baru, lalu tambahkan secara bertahap. Progress lebih penting daripada perfection.',

      '## Kesimpulan',
      'Setiap langkah kecil berarti. Dengan konsistensi, perubahan kecil di rumah Anda berkontribusi pada perubahan besar bagi bumi.',
    ],
  },
  'mengorganisir-dapur-kecil-dengan-efektif': {
    title: 'Mengorganisir Dapur Kecil dengan Efektif',
    excerpt: 'Solusi cerdas untuk memaksimalkan ruang di dapur mungil Anda.',
    image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=1200&h=600&fit=crop',
    category: 'Tips & Trik',
    date: '15 Desember 2025',
    readTime: '5 menit',
    author: { name: 'Hendra Kusuma', avatar: 'HK', role: 'Space Organizer' },
    content: [
      'Dapur kecil bukan berarti harus berantakan. Dengan strategi organizing yang tepat, dapur mungil bisa menjadi sangat fungsional dan tetap rapi.',

      '## Prinsip Dasar',
      'Kunci dapur kecil yang efektif adalah: vertical storage, multi-fungsi, dan declutter rutin. Setiap inch ruang harus dimanfaatkan optimal.',

      '## 1. Manfaatkan Ruang Vertikal',
      'Pasang rak dinding, gantungan magnetic untuk pisau, dan hook untuk peralatan masak. Dinding adalah real estate berharga di dapur kecil.',

      '## 2. Gunakan Bagian Dalam Pintu Kabinet',
      'Pasang organizer di bagian dalam pintu untuk menyimpan tutup panci, talenan, atau foil dan plastic wrap.',

      '## 3. Stackable Containers',
      'Gunakan kontainer yang bisa ditumpuk untuk menyimpan bahan kering. Ini menghemat ruang dibanding kemasan asli yang berbagai ukuran.',

      '## 4. Lazy Susan di Sudut',
      'Tempatkan lazy susan (meja putar) di sudut kabinet untuk akses mudah ke bumbu atau kaleng yang sering digunakan.',

      '## 5. Rak Sisipan',
      'Gunakan rak sisipan untuk memaksimalkan ruang vertikal dalam kabinet. Piring, mangkuk, dan gelas bisa disimpan lebih banyak.',

      '## 6. Gantungan Under-Cabinet',
      'Pasang rak atau hook di bawah kabinet atas untuk menyimpan cangkir, sendok pengukur, atau paper towel.',

      '## 7. Trolley Beroda',
      'Jika ada ruang sempit antara kulkas dan dinding, masukkan trolley tipis beroda untuk menyimpan bumbu atau kaleng.',

      '## 8. Declutter Rutin',
      'Periksa secara berkala dan buang makanan kadaluarsa, peralatan rusak, atau yang sudah tidak digunakan. Less is more di dapur kecil.',

      '## 9. Zone System',
      'Kelompokkan barang berdasarkan fungsi: zona prep, zona memasak, zona penyimpanan. Ini mempercepat workflow di dapur.',

      '## 10. Pilih Peralatan Multi-fungsi',
      'Satu food processor lebih baik dari tiga alat terpisah. Pilih peralatan yang bisa melakukan multiple tasks.',

      '## Kesimpulan',
      'Dapur kecil yang terorganisir dengan baik bisa sama efisiennya dengan dapur besar. Kuncinya adalah kreativitas dan konsistensi dalam menjaga kerapian.',
    ],
  },
  'review-koleksi-kontainer-serbaguna-sesoris': {
    title: 'Review: Koleksi Kontainer Serbaguna Sesoris',
    excerpt: 'Ulasan lengkap tentang koleksi kontainer terbaru dari Sesoris untuk berbagai kebutuhan.',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1200&h=600&fit=crop',
    category: 'Review',
    date: '10 Desember 2025',
    readTime: '4 menit',
    author: { name: 'Tim Sesoris', avatar: 'TS', role: 'Product Team' },
    content: [
      'Kami dengan bangga mempersembahkan koleksi kontainer serbaguna terbaru dari Sesoris. Dirancang berdasarkan feedback pelanggan, koleksi ini menjawab berbagai kebutuhan penyimpanan modern.',

      '## Overview Koleksi',
      'Koleksi ini terdiri dari 5 ukuran berbeda (XS hingga XL) dengan 3 pilihan material: plastik food-grade, kaca borosilikat, dan stainless steel. Semua tersedia dalam warna netral yang timeless.',

      '## Material & Kualitas',
      'Setiap kontainer dibuat dari material premium. Plastik kami BPA-free dan food-safe. Kaca borosilikat tahan suhu ekstrem (-20°C hingga 400°C). Stainless steel grade 304 anti karat.',

      '## Desain Tutup',
      'Tutup silikon dengan 4-lock system memastikan kedap udara dan anti bocor. Bisa dibawa di tas tanpa khawatir tumpah. Tutup juga microwave-safe (kecuali stainless steel).',

      '## Stackable Design',
      'Semua ukuran dirancang agar bisa ditumpuk dengan stabil. Ini menghemat hingga 40% ruang penyimpanan dibanding kontainer biasa.',

      '## Ukuran yang Tepat',
      '- XS (0.5L): Perfect untuk bumbu, saus\n- S (1.5L): Ideal untuk snack, sisa makanan\n- M (4.5L): Cocok untuk meal prep\n- L (12L): Untuk penyimpanan bulk\n- XL (30L): Storage box serbaguna',

      '## Apa Kata Pelanggan',
      '"Akhirnya kontainer yang benar-benar tidak bocor!" - Ani, Jakarta\n"Desainnya cantik, tidak malu taruh di meja makan" - Budi, Yogyakarta\n"Worth the price, sudah 2 tahun masih seperti baru" - Citra, Surabaya',

      '## Harga & Value',
      'Memang sedikit lebih mahal dari kontainer pasaran, tapi durabilitas dan fungsionalitasnya sebanding. Garansi 2 tahun untuk defect manufaktur.',

      '## Tips Perawatan',
      'Cuci dengan spons lembut, hindari abrasif. Untuk kaca, bisa masuk dishwasher. Keringkan tutup silikon dengan baik sebelum disimpan.',

      '## Verdict',
      'Rating: 4.8/5\nKoleksi kontainer Sesoris adalah investasi worthwhile untuk kitchen organization. Desain thoughtful, material berkualitas, dan durabilitas terbukti.',

      '## Dimana Beli',
      'Tersedia di website Sesoris, Tokopedia, Shopee, dan experience store Yogyakarta. Free shipping untuk pembelian di atas Rp 500.000.',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: '#6C757D' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <Link href="/blog" style={{ color: '#6C757D' }}>Blog</Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>{post.category}</span>
          </div>
        </div>
      </div>

      <article>
        {/* Hero */}
        <div style={{ position: 'relative', minHeight: '450px', display: 'flex', alignItems: 'flex-end' }}>
          <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 1, padding: '0 16px 48px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <span style={{
                display: 'inline-block',
                background: '#1B5E3B',
                color: 'white',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 500,
                marginBottom: '16px',
              }}>
                {post.category}
              </span>
              <h1 style={{
                fontSize: '36px',
                fontWeight: 700,
                color: 'white',
                marginBottom: '16px',
                lineHeight: 1.3,
              }}>
                {post.title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'rgba(255,255,255,0.9)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar style={{ width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '14px' }}>{post.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock style={{ width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '14px' }}>{post.readTime} baca</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={{ padding: '0 16px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Author */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 0',
              borderBottom: '1px solid #E9ECEF',
              marginTop: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#1B5E3B',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                }}>
                  {post.author.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#212529' }}>{post.author.name}</div>
                  <div style={{ fontSize: '14px', color: '#6C757D' }}>{post.author.role}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#F8F9FA',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Facebook style={{ width: '16px', height: '16px', color: '#343A40' }} />
                </button>
                <button style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#F8F9FA',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Twitter style={{ width: '16px', height: '16px', color: '#343A40' }} />
                </button>
                <button style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#F8F9FA',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Linkedin style={{ width: '16px', height: '16px', color: '#343A40' }} />
                </button>
                <button style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#F8F9FA',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Share2 style={{ width: '16px', height: '16px', color: '#343A40' }} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '40px 0 80px' }}>
              {post.content.map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} style={{
                      fontSize: '22px',
                      fontWeight: 600,
                      color: '#212529',
                      marginTop: '32px',
                      marginBottom: '16px',
                    }}>
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.includes('\n')) {
                  return (
                    <div key={index} style={{
                      fontSize: '16px',
                      lineHeight: 1.8,
                      color: '#343A40',
                      marginBottom: '20px',
                      whiteSpace: 'pre-line',
                    }}>
                      {paragraph}
                    </div>
                  );
                }
                return (
                  <p key={index} style={{
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: '#343A40',
                    marginBottom: '20px',
                  }}>
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Back to Blog */}
            <div style={{
              paddingBottom: '48px',
              borderTop: '1px solid #E9ECEF',
              paddingTop: '24px',
            }}>
              <Link href="/blog" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#1B5E3B',
                fontWeight: 500,
              }}>
                <ArrowLeft style={{ width: '18px', height: '18px' }} />
                Kembali ke Blog
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
