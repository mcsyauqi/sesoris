import type { Product, Category, Testimonial } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Rumah & Dekorasi',
    slug: 'home-living',
    description: 'Produk berkualitas untuk rumah Anda',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    productCount: 124,
  },
  {
    id: '2',
    name: 'Dapur & Makan',
    slug: 'kitchen-dining',
    description: 'Peralatan dapur esensial',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    productCount: 86,
  },
  {
    id: '3',
    name: 'Alat & Gadget',
    slug: 'tools-gadgets',
    description: 'Alat inovatif untuk keseharian',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
    productCount: 67,
  },
  {
    id: '4',
    name: 'Paket Hadiah',
    slug: 'gift-sets',
    description: 'Hadiah sempurna untuk semua orang',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop',
    productCount: 93,
  },
  {
    id: '5',
    name: 'Perawatan Diri',
    slug: 'personal-care',
    description: 'Esensial perawatan diri',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    productCount: 78,
  },
  {
    id: '6',
    name: 'Aksesoris Teknologi',
    slug: 'tech-accessories',
    description: 'Solusi teknologi pintar',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    productCount: 54,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Bamboo Desk Organizer',
    slug: 'bamboo-desk-organizer',
    description: 'Rapikan meja kerja Anda dengan organizer bambu elegan ini.',
    fullDescription: `Bamboo Desk Organizer dari Sesoris adalah solusi sempurna untuk menjaga meja kerja Anda tetap rapi dan terorganisir. Dibuat dari bambu alami berkualitas tinggi yang dipanen secara berkelanjutan, organizer ini tidak hanya fungsional tetapi juga ramah lingkungan.

Desain minimalis dengan sentuhan natural akan menambah estetika ruang kerja Anda. Terdapat berbagai kompartemen yang dirancang khusus untuk menyimpan alat tulis, smartphone, kartu nama, dan berbagai perlengkapan kantor lainnya.

Setiap bagian diamplas halus untuk memastikan tidak ada serat kayu yang kasar yang dapat merusak barang-barang Anda. Finishing natural oil memberikan perlindungan tahan air ringan sekaligus menonjolkan keindahan serat bambu alami.

Organizer ini sangat cocok untuk home office, kantor, atau sebagai hadiah untuk rekan kerja. Dengan perawatan yang tepat, produk ini akan bertahan bertahun-tahun dan semakin cantik seiring waktu.`,
    features: [
      'Terbuat dari bambu alami 100% ramah lingkungan',
      '5 kompartemen berbagai ukuran',
      'Slot khusus untuk smartphone dengan lubang kabel charger',
      'Finishing anti air dengan natural oil',
      'Desain minimalis cocok untuk berbagai interior',
      'Dasar anti slip untuk stabilitas maksimal',
    ],
    specifications: [
      { label: 'Material', value: 'Bambu Alami' },
      { label: 'Dimensi', value: '25 x 15 x 12 cm' },
      { label: 'Berat', value: '450 gram' },
      { label: 'Warna', value: 'Natural Bambu' },
      { label: 'Garansi', value: '1 Tahun' },
    ],
    price: 299000,
    compareAtPrice: 399000,
    images: [
      { url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=600&fit=crop', alt: 'Bamboo Desk Organizer tampak depan' },
      { url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop', alt: 'Bamboo Desk Organizer di meja kerja' },
      { url: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=600&h=600&fit=crop', alt: 'Bamboo Desk Organizer detail kompartemen' },
    ],
    category: categories[0],
    rating: 0,
    reviewCount: 0,
    inStock: true,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Smart Water Bottle',
    slug: 'smart-water-bottle',
    description: 'Tetap terhidrasi dengan botol air pintar yang melacak asupan minum Anda.',
    fullDescription: `Smart Water Bottle dari Sesoris adalah inovasi terbaru dalam menjaga kesehatan hidrasi Anda. Dilengkapi dengan teknologi sensor pintar yang terintegrasi dengan aplikasi smartphone, botol ini akan mengingatkan Anda untuk minum air secara teratur sepanjang hari.

Layar LED built-in menampilkan suhu air secara real-time dan jumlah air yang telah Anda minum. Aplikasi pendamping (tersedia untuk iOS dan Android) memungkinkan Anda mengatur target hidrasi harian berdasarkan berat badan, tingkat aktivitas, dan kondisi cuaca.

Terbuat dari stainless steel food-grade 304 dengan teknologi vacuum insulation ganda, botol ini dapat menjaga minuman dingin hingga 24 jam atau panas hingga 12 jam. Lapisan dalam anti-bakteri memastikan air Anda tetap segar dan higienis.

Desain ergonomis dengan grip anti-slip memudahkan Anda membawa botol ini ke mana saja - gym, kantor, outdoor. Tutup one-touch yang aman mencegah tumpahan dan mudah dibuka dengan satu tangan.`,
    features: [
      'Sensor pintar dengan konektivitas Bluetooth',
      'Layar LED penunjuk suhu dan volume',
      'Aplikasi iOS & Android untuk tracking hidrasi',
      'Vacuum insulation menjaga suhu 24 jam',
      'Stainless steel food-grade 304',
      'Lapisan anti-bakteri',
      'Tutup one-touch anti tumpah',
    ],
    specifications: [
      { label: 'Kapasitas', value: '500ml' },
      { label: 'Material', value: 'Stainless Steel 304' },
      { label: 'Baterai', value: 'USB Rechargeable (30 hari)' },
      { label: 'Dimensi', value: '7 x 7 x 24 cm' },
      { label: 'Berat', value: '350 gram' },
      { label: 'Konektivitas', value: 'Bluetooth 5.0' },
    ],
    price: 349000,
    images: [
      { url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop', alt: 'Smart Water Bottle tampak depan' },
      { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop', alt: 'Smart Water Bottle saat berolahraga' },
      { url: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&h=600&fit=crop', alt: 'Smart Water Bottle detail layar LED' },
    ],
    category: categories[1],
    rating: 0,
    reviewCount: 0,
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '3',
    name: 'LED Desk Lamp with Wireless Charger',
    slug: 'led-desk-lamp-wireless-charger',
    description: 'Lampu meja LED modern dengan pad pengisian wireless built-in.',
    fullDescription: `LED Desk Lamp with Wireless Charger adalah kombinasi sempurna antara pencahayaan berkualitas tinggi dan kemudahan pengisian daya tanpa kabel. Produk 2-in-1 ini akan menyederhanakan meja kerja Anda sekaligus menambah sentuhan modern.

Lampu menggunakan teknologi LED terbaru dengan 5 mode warna (warm white hingga cool white) dan 10 tingkat kecerahan yang dapat disesuaikan. Fitur eye-care dengan flicker-free dan anti-glare technology melindungi mata Anda selama bekerja berjam-jam.

Wireless charger 15W fast charging mendukung semua smartphone dengan fitur Qi-compatible, termasuk iPhone dan Android flagship. Cukup letakkan smartphone di base lamp dan pengisian akan dimulai otomatis.

Leher fleksibel 360° memungkinkan Anda mengarahkan cahaya ke posisi yang tepat. Memory function mengingat pengaturan terakhir Anda, dan timer otomatis 30/60 menit membantu menghemat energi. Touch control sensitif memudahkan pengoperasian.`,
    features: [
      '5 mode warna dengan 10 tingkat kecerahan',
      'Eye-care technology: flicker-free & anti-glare',
      'Wireless charger 15W fast charging',
      'Kompatibel dengan semua smartphone Qi',
      'Leher fleksibel 360°',
      'Memory function & auto timer',
      'Touch control sensitif',
      'USB output tambahan untuk charging kabel',
    ],
    specifications: [
      { label: 'Daya Lampu', value: '10W LED' },
      { label: 'Wireless Charger', value: '15W Max' },
      { label: 'Color Temperature', value: '2700K - 6500K' },
      { label: 'Lumen', value: '800 lm' },
      { label: 'Material', value: 'Aluminium + ABS' },
      { label: 'Dimensi', value: '40 x 15 x 12 cm' },
      { label: 'Input', value: 'DC 24V/1.5A' },
    ],
    price: 499000,
    images: [
      { url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop', alt: 'LED Desk Lamp tampak depan' },
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=600&fit=crop', alt: 'LED Desk Lamp di meja kerja' },
      { url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=600&fit=crop', alt: 'LED Desk Lamp suasana ruangan' },
    ],
    category: categories[5],
    rating: 0,
    reviewCount: 0,
    inStock: true,
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Premium Gift Box Set',
    slug: 'premium-gift-box-set',
    description: 'Kotak hadiah terkurasi berisi item self-care premium.',
    fullDescription: `Premium Gift Box Set dari Sesoris adalah pilihan hadiah sempurna yang menggabungkan berbagai produk self-care berkualitas tinggi dalam satu paket elegan. Setiap item dipilih dengan cermat untuk memberikan pengalaman relaksasi dan perawatan diri yang mewah.

Set ini mencakup: scented candle aromaterapi dengan wangi lavender-vanilla yang menenangkan (burn time 40 jam), organic bath bomb set (3 pcs dengan bahan alami), premium silk eye mask untuk tidur berkualitas, dan mini essential oil diffuser dengan USB power.

Semua produk dikemas dalam kotak premium dengan finishing matte dan pita satin. Termasuk kartu ucapan yang dapat dipersonalisasi untuk sentuhan personal. Box ini menggunakan material ramah lingkungan yang dapat didaur ulang.

Cocok untuk berbagai occasion: ulang tahun, anniversary, Hari Ibu, atau sekadar untuk menunjukkan apresiasi kepada orang tersayang. Packaging yang cantik berarti Anda tidak perlu repot membungkus lagi - siap untuk langsung diberikan.`,
    features: [
      'Scented candle aromaterapi 200g (40 jam burn time)',
      'Organic bath bomb set 3 pcs',
      'Premium silk eye mask',
      'Mini USB essential oil diffuser',
      'Packaging premium siap kado',
      'Kartu ucapan yang dapat dipersonalisasi',
      'Material ramah lingkungan',
    ],
    specifications: [
      { label: 'Isi Paket', value: '4 item + kartu ucapan' },
      { label: 'Dimensi Box', value: '30 x 25 x 10 cm' },
      { label: 'Berat Total', value: '1.2 kg' },
      { label: 'Candle Burn Time', value: '40 jam' },
      { label: 'Bath Bomb', value: '3 x 100g' },
      { label: 'Diffuser', value: 'USB powered, 100ml' },
    ],
    price: 599000,
    compareAtPrice: 799000,
    images: [
      { url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=600&fit=crop', alt: 'Premium Gift Box Set tampak atas' },
      { url: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&h=600&fit=crop', alt: 'Premium Gift Box Set isi paket' },
      { url: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=600&h=600&fit=crop', alt: 'Premium Gift Box Set produk self-care' },
    ],
    category: categories[3],
    rating: 0,
    reviewCount: 0,
    inStock: true,
    isFeatured: true,
  },
  {
    id: '5',
    name: 'Minimalist Wallet',
    slug: 'minimalist-wallet',
    description: 'Dompet kulit asli tipis dan stylish dengan perlindungan RFID.',
    fullDescription: `Minimalist Wallet dari Sesoris adalah dompet modern yang dirancang untuk gaya hidup praktis. Dibuat dari kulit sapi full-grain premium dengan ketebalan hanya 7mm saat penuh, dompet ini pas di saku depan maupun belakang tanpa membuat tonjolan.

Fitur RFID blocking technology melindungi kartu kredit/debit Anda dari pencurian data elektronik (e-skimming). Lapisan khusus dalam dompet memblokir sinyal RFID hingga 13.56 MHz, menjaga informasi finansial Anda tetap aman.

Desain clever dengan elastic card holder memungkinkan akses cepat ke kartu yang sering digunakan. Slot tersembunyi di belakang dapat menyimpan uang kertas yang dilipat atau kartu cadangan. Kapasitas optimal: 6-8 kartu + uang tunai.

Jahitan tangan dengan benang waxed thread menjamin ketahanan jangka panjang. Kulit akan mengembangkan patina natural seiring waktu, memberikan karakter unik pada dompet Anda. Tersedia dalam 3 warna klasik: Black, Brown, dan Tan.`,
    features: [
      'Kulit sapi full-grain premium',
      'RFID blocking technology',
      'Ketebalan hanya 7mm',
      'Elastic card holder untuk akses cepat',
      'Slot tersembunyi untuk uang tunai',
      'Jahitan tangan dengan waxed thread',
      'Kapasitas 6-8 kartu',
    ],
    specifications: [
      { label: 'Material', value: 'Full-grain Leather' },
      { label: 'Dimensi', value: '10.5 x 7.5 x 0.7 cm' },
      { label: 'Berat', value: '45 gram' },
      { label: 'Kapasitas Kartu', value: '6-8 kartu' },
      { label: 'RFID Protection', value: '13.56 MHz' },
      { label: 'Garansi', value: '2 Tahun' },
    ],
    price: 399000,
    images: [
      { url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop', alt: 'Minimalist Wallet tampak depan' },
      { url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop', alt: 'Minimalist Wallet material kulit' },
      { url: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&h=600&fit=crop', alt: 'Minimalist Wallet detail jahitan' },
    ],
    category: categories[4],
    rating: 0,
    reviewCount: 0,
    inStock: true,
    isFeatured: true,
  },
  {
    id: '6',
    name: 'Wireless Earbuds Pro',
    slug: 'wireless-earbuds-pro',
    description: 'Earbuds wireless premium dengan active noise cancellation.',
    fullDescription: `Wireless Earbuds Pro dari Sesoris menghadirkan pengalaman audio premium dengan teknologi Active Noise Cancellation (ANC) terdepan. Nikmati musik favorit Anda tanpa gangguan, atau aktifkan Transparency Mode untuk tetap aware dengan lingkungan sekitar.

Driver 10mm custom-tuned menghasilkan suara yang kaya dan seimbang dengan bass yang dalam namun tidak overwhelming. Codec AAC dan SBC didukung untuk kompatibilitas maksimal dengan berbagai perangkat. Latency rendah 60ms ideal untuk gaming dan menonton video.

Desain ergonomis dengan 3 ukuran ear tips (S/M/L) memastikan kenyamanan sepanjang hari dan seal yang optimal untuk performa ANC terbaik. Rating IPX5 melindungi earbuds dari keringat dan hujan ringan.

Baterai tahan hingga 8 jam per charge dengan ANC aktif, atau 10 jam dengan ANC off. Charging case menyediakan tambahan 24 jam, total 32 jam playtime. Fast charging 10 menit memberikan 2 jam penggunaan. Wireless charging compatible.`,
    features: [
      'Active Noise Cancellation (ANC)',
      'Transparency Mode',
      'Driver 10mm custom-tuned',
      'Bluetooth 5.2 dengan latency 60ms',
      'IPX5 water resistant',
      'Touch control di kedua earbuds',
      '32 jam total playtime',
      'Wireless charging compatible',
      'USB-C fast charging',
    ],
    specifications: [
      { label: 'Driver', value: '10mm Dynamic' },
      { label: 'Bluetooth', value: '5.2' },
      { label: 'Codec', value: 'AAC, SBC' },
      { label: 'Baterai Earbuds', value: '8 jam (ANC on)' },
      { label: 'Baterai Total', value: '32 jam' },
      { label: 'Water Resistance', value: 'IPX5' },
      { label: 'Berat per Earbud', value: '5.5 gram' },
    ],
    price: 799000,
    compareAtPrice: 999000,
    images: [
      { url: 'https://images.unsplash.com/photo-1590658165737-15a047b7c0b0?w=600&h=600&fit=crop', alt: 'Wireless Earbuds Pro tampak depan' },
      { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop', alt: 'Wireless Earbuds Pro dengan case' },
      { url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop', alt: 'Wireless Earbuds Pro detail' },
    ],
    category: categories[5],
    rating: 0,
    reviewCount: 0,
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '7',
    name: 'Portable Blender',
    slug: 'portable-blender',
    description: 'Buat smoothie segar di mana saja dengan blender portable ini.',
    fullDescription: `Portable Blender dari Sesoris adalah teman setia untuk gaya hidup sehat aktif. Dengan kapasitas 400ml yang pas untuk satu porsi smoothie, blender ini dapat Anda bawa ke gym, kantor, camping, atau ke mana saja Anda pergi.

Motor 150W yang powerful dengan 6 blade stainless steel dapat menghaluskan buah beku, sayuran, es batu, dan berbagai bahan lainnya dalam hitungan detik. Cukup masukkan bahan, tutup, tekan tombol dua kali, dan dalam 30-40 detik smoothie Anda siap.

Baterai lithium 2000mAh rechargeable via USB-C dapat digunakan hingga 15-20 kali blending per charge. LED indicator menunjukkan status baterai dan operasi. Safety lock memastikan motor tidak akan berputar jika tutup tidak terpasang dengan benar.

Jar terbuat dari Tritan BPA-free yang food-safe, tahan benturan, dan tidak menyimpan bau. Mudah dibersihkan - cukup isi dengan air dan sabun, lalu jalankan blender. Desain leak-proof memungkinkan Anda minum langsung dari jar atau membawanya di dalam tas.`,
    features: [
      'Motor 150W dengan 6 blade stainless steel',
      'Kapasitas 400ml personal size',
      'Baterai 2000mAh USB-C rechargeable',
      '15-20x blending per charge',
      'Tritan jar BPA-free',
      'Safety lock protection',
      'Leak-proof design',
      'Self-cleaning function',
    ],
    specifications: [
      { label: 'Motor', value: '150W' },
      { label: 'Kapasitas', value: '400ml' },
      { label: 'Blade', value: '6 Blade Stainless Steel' },
      { label: 'Baterai', value: '2000mAh Li-ion' },
      { label: 'Charging', value: 'USB-C (2 jam)' },
      { label: 'Dimensi', value: '8 x 8 x 23 cm' },
      { label: 'Berat', value: '450 gram' },
    ],
    price: 249000,
    compareAtPrice: 349000,
    images: [
      { url: 'https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=600&h=600&fit=crop', alt: 'Portable Blender tampak depan' },
      { url: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&h=600&fit=crop', alt: 'Portable Blender dengan bahan smoothie' },
      { url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=600&fit=crop', alt: 'Portable Blender hasil smoothie' },
    ],
    category: categories[1],
    rating: 0,
    reviewCount: 0,
    inStock: true,
    isNew: true,
  },
  {
    id: '8',
    name: 'Aromatherapy Diffuser',
    slug: 'aromatherapy-diffuser',
    description: 'Ciptakan suasana relaks dengan diffuser ultrasonik ini.',
    fullDescription: `Aromatherapy Diffuser dari Sesoris menggunakan teknologi ultrasonik untuk mengubah air dan essential oil menjadi mist halus yang menyebar ke seluruh ruangan. Nikmati manfaat aromaterapi tanpa panas yang dapat merusak khasiat essential oil.

Tangki 300ml dapat beroperasi hingga 10 jam dalam low mist mode atau 6 jam dalam high mist mode. Coverage area hingga 30m² menjadikannya ideal untuk kamar tidur, ruang tamu, atau kantor. Timer 1/3/6 jam memungkinkan Anda mengatur durasi sesuai kebutuhan.

LED ambient light dengan 7 warna yang dapat diubah atau dimatikan memberikan sentuhan dekoratif. Pilih satu warna favorit atau biarkan berganti secara gradual untuk suasana yang dinamis. Mode light-only tersedia untuk penggunaan sebagai night light.

Auto shut-off ketika air habis melindungi unit dari kerusakan dan memastikan keamanan. Operasi whisper-quiet di bawah 30dB tidak akan mengganggu tidur atau konsentrasi kerja Anda. Desain wood grain yang elegan cocok untuk berbagai gaya interior.`,
    features: [
      'Teknologi ultrasonik tanpa panas',
      'Tangki 300ml (6-10 jam operasi)',
      'Coverage area hingga 30m²',
      'Timer 1/3/6 jam',
      '7 warna LED ambient light',
      'Auto shut-off waterless protection',
      'Whisper-quiet operation (<30dB)',
      'Wood grain design',
    ],
    specifications: [
      { label: 'Kapasitas', value: '300ml' },
      { label: 'Coverage', value: '30m²' },
      { label: 'Mist Output', value: '30ml/jam' },
      { label: 'Noise Level', value: '<30dB' },
      { label: 'Daya', value: '12W' },
      { label: 'Dimensi', value: '16 x 16 x 12 cm' },
      { label: 'Timer', value: '1/3/6 jam' },
    ],
    price: 329000,
    images: [
      { url: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?w=600&h=600&fit=crop', alt: 'Aromatherapy Diffuser tampak depan' },
      { url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=600&fit=crop', alt: 'Aromatherapy Diffuser suasana relaks' },
      { url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=600&fit=crop', alt: 'Aromatherapy Diffuser dengan lilin' },
    ],
    category: categories[4],
    rating: 0,
    reviewCount: 0,
    inStock: true,
  },
  {
    id: '9',
    name: 'Ceramic Plant Pot Set',
    slug: 'ceramic-plant-pot-set',
    description: 'Set 3 pot tanaman keramik modern dengan lubang drainage.',
    fullDescription: `Ceramic Plant Pot Set dari Sesoris adalah set 3 pot tanaman dengan desain modern minimalis yang akan mempercantik ruangan Anda sekaligus memberikan lingkungan optimal untuk tanaman indoor kesayangan.

Set mencakup 3 ukuran pot: Small (12cm), Medium (15cm), dan Large (18cm) diameter, cocok untuk berbagai jenis tanaman dari succulent hingga monstera kecil. Setiap pot dilengkapi lubang drainage di bagian bawah dan saucer terpisah untuk menampung air berlebih.

Terbuat dari keramik berkualitas tinggi dengan finishing matte yang elegan. Warna putih bersih memberikan tampilan clean dan modern, memungkinkan tanaman hijau menjadi fokus utama. Cocok untuk berbagai gaya interior dari Scandinavian hingga industrial.

Proses pembakaran pada suhu tinggi menghasilkan keramik yang kuat dan tahan lama. Permukaan glazed halus mudah dibersihkan dan tidak menyerap air. Bamboo saucer memberikan sentuhan natural dan melindungi permukaan furniture dari air.`,
    features: [
      'Set 3 pot (Small/Medium/Large)',
      'Lubang drainage di setiap pot',
      'Bamboo saucer included',
      'Keramik high-fired berkualitas',
      'Finishing matte elegan',
      'Cocok untuk berbagai tanaman',
      'Mudah dibersihkan',
    ],
    specifications: [
      { label: 'Ukuran Small', value: '12 x 12 x 10 cm' },
      { label: 'Ukuran Medium', value: '15 x 15 x 13 cm' },
      { label: 'Ukuran Large', value: '18 x 18 x 15 cm' },
      { label: 'Material Pot', value: 'Keramik' },
      { label: 'Material Saucer', value: 'Bambu' },
      { label: 'Warna', value: 'Putih Matte' },
      { label: 'Berat Total', value: '2.5 kg' },
    ],
    price: 449000,
    images: [
      { url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=600&fit=crop', alt: 'Ceramic Plant Pot Set tampak depan' },
      { url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop', alt: 'Ceramic Plant Pot Set dengan tanaman' },
      { url: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&h=600&fit=crop', alt: 'Ceramic Plant Pot Set suasana ruangan' },
    ],
    category: categories[0],
    rating: 0,
    reviewCount: 0,
    inStock: true,
  },
  {
    id: '10',
    name: 'Multi-Tool Pocket Knife',
    slug: 'multi-tool-pocket-knife',
    description: 'Multi-tool kompak dengan 12 fungsi esensial.',
    fullDescription: `Multi-Tool Pocket Knife dari Sesoris adalah companion serbaguna yang menggabungkan 12 tools dalam satu perangkat kompak. Dari pekerjaan rumah tangga hingga petualangan outdoor, multi-tool ini siap membantu Anda menyelesaikan berbagai tugas.

12 fungsi yang tersedia: main blade, small blade, can opener, bottle opener, Phillips screwdriver, flat screwdriver, scissors, file/nail file, saw, awl/leather punch, wire stripper, dan keyring hole. Setiap tool dirancang untuk kemudahan akses dan penggunaan satu tangan.

Blade utama terbuat dari stainless steel 420HC dengan hardness 57-59 HRC, menawarkan keseimbangan antara ketajaman dan kemudahan diasah. Edge retention yang baik memastikan pisau tetap tajam setelah penggunaan berulang. Blade lock mechanism mencegah penutupan tidak sengaja saat digunakan.

Body dari stainless steel dengan sisipan G10 memberikan grip yang secure bahkan saat basah. Dimensi kompak (9cm tertutup) dan berat ringan (140g) memudahkan Anda membawa di saku atau menggantungnya di keychain. Termasuk pouch nilon untuk penyimpanan dan perlindungan.`,
    features: [
      '12 fungsi dalam 1 tool',
      'Main blade 420HC stainless steel',
      'Blade lock mechanism',
      'G10 handle grip',
      'One-hand opening',
      'Wire stripper built-in',
      'Nilon pouch included',
      'Kompak dan ringan (140g)',
    ],
    specifications: [
      { label: 'Jumlah Fungsi', value: '12' },
      { label: 'Material Blade', value: '420HC Stainless Steel' },
      { label: 'Material Handle', value: 'Stainless Steel + G10' },
      { label: 'Panjang Tertutup', value: '9 cm' },
      { label: 'Panjang Terbuka', value: '16 cm' },
      { label: 'Berat', value: '140 gram' },
      { label: 'Blade Hardness', value: '57-59 HRC' },
    ],
    price: 279000,
    images: [
      { url: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=600&h=600&fit=crop', alt: 'Multi-Tool Pocket Knife tampak depan' },
      { url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=600&fit=crop', alt: 'Multi-Tool Pocket Knife semua fungsi' },
      { url: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&h=600&fit=crop', alt: 'Multi-Tool Pocket Knife detail blade' },
    ],
    category: categories[2],
    rating: 0,
    reviewCount: 0,
    inStock: true,
    isNew: true,
  },
  {
    id: '11',
    name: 'Foldable Storage Bins',
    slug: 'foldable-storage-bins',
    description: 'Set 4 storage bin fabric yang dapat dilipat untuk organizing.',
    fullDescription: `Foldable Storage Bins dari Sesoris adalah solusi penyimpanan fleksibel yang membantu Anda merapikan rumah tanpa memakan tempat. Set berisi 4 bin yang dapat dilipat rata saat tidak digunakan, sempurna untuk ruangan terbatas.

Terbuat dari fabric non-woven berkualitas dengan struktur reinforced cardboard di bagian dalam, bin ini dapat mempertahankan bentuknya dengan baik bahkan saat penuh. Handle kain di kedua sisi memudahkan pemindahan dan akses ke isi di dalamnya.

Ukuran 30x30x30cm per bin ideal untuk menyimpan berbagai item: pakaian, mainan anak, buku, perlengkapan hobi, atau supplies kantor. Desain cube universal cocok untuk digunakan dengan sistem shelving populer seperti Kallax.

Label holder transparan di bagian depan memungkinkan Anda mengidentifikasi isi dengan mudah tanpa harus membuka. Tersedia dalam warna-warna netral yang cocok untuk berbagai interior. Mudah dibersihkan dengan lap basah untuk noda ringan.`,
    features: [
      'Set 4 storage bins',
      'Dapat dilipat rata saat tidak digunakan',
      'Reinforced cardboard structure',
      'Dual fabric handles',
      'Label holder transparan',
      'Ukuran universal untuk shelving',
      'Non-woven fabric berkualitas',
      'Mudah dibersihkan',
    ],
    specifications: [
      { label: 'Isi', value: '4 bins' },
      { label: 'Dimensi per Bin', value: '30 x 30 x 30 cm' },
      { label: 'Dimensi Dilipat', value: '30 x 30 x 3 cm' },
      { label: 'Material', value: 'Non-woven Fabric + Cardboard' },
      { label: 'Kapasitas per Bin', value: '27 liter' },
      { label: 'Berat per Bin', value: '200 gram' },
      { label: 'Warna', value: 'Abu-abu' },
    ],
    price: 229000,
    images: [
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop', alt: 'Foldable Storage Bins tampak depan' },
      { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=600&fit=crop', alt: 'Foldable Storage Bins dalam lemari' },
      { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=600&fit=crop', alt: 'Foldable Storage Bins suasana rumah' },
    ],
    category: categories[0],
    rating: 0,
    reviewCount: 0,
    inStock: true,
  },
  {
    id: '12',
    name: 'Electric Wine Opener',
    slug: 'electric-wine-opener',
    description: 'Buka botol wine dengan mudah menggunakan opener rechargeable ini.',
    fullDescription: `Electric Wine Opener dari Sesoris membuat momen membuka wine menjadi elegan dan effortless. Dengan sentuhan satu tombol, corkscrew elektrik ini akan mengeluarkan gabus dalam hitungan detik tanpa perlu tenaga manual.

Motor powerful dapat membuka hingga 80 botol dengan sekali pengisian penuh. Proses yang smooth mencegah gabus patah atau hancur yang sering terjadi pada pembuka manual. Cocok untuk gabus natural maupun synthetic berbagai ukuran.

Built-in LED light menerangi area botol, memudahkan penggunaan dalam kondisi pencahayaan redup seperti wine cellar atau romantic dinner. Design ergonomis dengan body stainless steel memberikan grip yang nyaman dan tampilan premium.

Set lengkap termasuk: electric opener, charging base/stand, foil cutter untuk memotong seal, wine stopper vacuum untuk menyimpan wine yang belum habis, dan wine pourer aerator untuk mengoptimalkan aroma dan rasa wine. Semua aksesoris tersimpan rapi dalam gift box elegan.`,
    features: [
      'Automatic cork removal dalam 6 detik',
      'Baterai untuk 80+ botol per charge',
      'Built-in LED light',
      'Stainless steel body',
      'Charging base included',
      'Free: foil cutter, stopper, pourer',
      'Gift box packaging',
    ],
    specifications: [
      { label: 'Motor', value: 'DC 6V' },
      { label: 'Kapasitas', value: '80+ botol/charge' },
      { label: 'Waktu Buka', value: '6 detik' },
      { label: 'Material', value: 'Stainless Steel + ABS' },
      { label: 'Baterai', value: 'Li-ion Rechargeable' },
      { label: 'Dimensi', value: '5 x 5 x 23 cm' },
      { label: 'Berat', value: '280 gram' },
    ],
    price: 369000,
    images: [
      { url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=600&fit=crop', alt: 'Electric Wine Opener tampak depan' },
      { url: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&h=600&fit=crop', alt: 'Electric Wine Opener membuka botol' },
      { url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=600&fit=crop', alt: 'Electric Wine Opener dengan aksesoris' },
    ],
    category: categories[1],
    rating: 0,
    reviewCount: 0,
    inStock: true,
  },
  {
    id: '13',
    name: 'Rak Piring Stainless Steel 2 Tier',
    slug: 'rak-piring-stainless-steel-2-tier',
    description: 'Rak piring stainless steel 2 tingkat dengan baki penampung air, cocok untuk dapur minimalis.',
    fullDescription: `Rak Piring Stainless Steel 2 Tier dari Sesoris adalah solusi terbaik untuk mengeringkan dan menyimpan piring, gelas, dan peralatan dapur lainnya. Dibuat dari stainless steel 304 food-grade yang tahan karat dan mudah dibersihkan.

Desain 2 tingkat memaksimalkan ruang vertikal sehingga cocok untuk dapur dengan countertop terbatas. Tingkat atas dirancang khusus untuk piring dan mangkuk dengan slot vertikal yang menjaga piring tetap tegak dan cepat kering. Tingkat bawah dilengkapi hooks untuk gelas dan kompartemen untuk sendok garpu.

Baki penampung air di bagian bawah mengarahkan air ke satu sisi dengan drain spout, menjaga countertop tetap kering. Kaki anti-slip dari silikon food-grade memastikan rak tidak bergeser dan tidak menggores permukaan meja.

Mudah dirakit tanpa alat, cukup pasang dalam 5 menit. Struktur kokoh mampu menahan beban hingga 15 kg. Finishing brushed steel memberikan tampilan modern yang cocok untuk berbagai gaya dapur.`,
    features: [
      'Stainless steel 304 food-grade anti karat',
      '2 tingkat dengan kapasitas 20+ piring',
      'Baki penampung air dengan drain spout',
      'Hooks untuk 6 gelas dan kompartemen alat makan',
      'Kaki anti-slip silikon food-grade',
      'Perakitan mudah tanpa alat, 5 menit',
    ],
    specifications: [
      { label: 'Material', value: 'Stainless Steel 304' },
      { label: 'Dimensi', value: '42 x 25 x 38 cm' },
      { label: 'Berat', value: '1.8 kg' },
      { label: 'Kapasitas', value: '20+ piring, 6 gelas' },
      { label: 'Beban Maks', value: '15 kg' },
      { label: 'Garansi', value: '2 Tahun' },
    ],
    price: 289000,
    compareAtPrice: 389000,
    images: [
      { url: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&h=600&fit=crop', alt: 'Rak piring stainless steel 2 tier tampak depan' },
      { url: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=600&fit=crop', alt: 'Rak piring dengan piring dan gelas' },
      { url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=600&fit=crop', alt: 'Rak piring di dapur minimalis' },
    ],
    category: categories[1],
    rating: 0,
    reviewCount: 0,
    inStock: true,
    isFeatured: true,
    isNew: true,
  },
  {
    id: '14',
    name: 'Rak Sepatu Minimalis 5 Tingkat',
    slug: 'rak-sepatu-minimalis-5-tingkat',
    description: 'Rak sepatu 5 tingkat berdesain minimalis, muat hingga 15 pasang sepatu dengan rangka baja kokoh.',
    fullDescription: `Rak Sepatu Minimalis 5 Tingkat dari Sesoris dirancang untuk menjaga koleksi sepatu Anda tetap terorganisir dan mudah diakses. Dengan kapasitas hingga 15 pasang sepatu, rak ini adalah solusi sempurna untuk entryway, kamar tidur, atau closet.

Rangka baja dengan finishing powder-coated anti karat menjamin ketahanan jangka panjang. Setiap tingkat terbuat dari non-woven fabric yang breathable, membantu sirkulasi udara agar sepatu tidak lembab dan bau.

Desain modular memungkinkan Anda menyesuaikan jarak antar tingkat untuk mengakomodasi berbagai jenis sepatu, dari flat shoes hingga boots. Tingkat teratas bisa diatur lebih tinggi untuk sneakers atau heels.

Dimensi slim (60 x 30 cm footprint) membuat rak ini ideal untuk ruang sempit seperti lorong, di balik pintu, atau sudut kamar. Berat hanya 2 kg namun mampu menahan beban total 25 kg. Tersedia dalam warna hitam, putih, dan abu-abu.`,
    features: [
      '5 tingkat muat hingga 15 pasang sepatu',
      'Rangka baja powder-coated anti karat',
      'Fabric breathable untuk sirkulasi udara',
      'Jarak tingkat bisa diatur sesuai jenis sepatu',
      'Desain slim, footprint hanya 60 x 30 cm',
      'Assembly mudah tanpa alat khusus',
    ],
    specifications: [
      { label: 'Material', value: 'Baja + Non-woven Fabric' },
      { label: 'Dimensi', value: '60 x 30 x 90 cm' },
      { label: 'Berat', value: '2 kg' },
      { label: 'Kapasitas', value: '15 pasang sepatu' },
      { label: 'Beban Maks', value: '25 kg' },
      { label: 'Warna', value: 'Hitam' },
    ],
    price: 179000,
    compareAtPrice: 249000,
    images: [
      { url: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&h=600&fit=crop', alt: 'Rak sepatu minimalis 5 tingkat' },
      { url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop', alt: 'Rak sepatu dengan berbagai sepatu' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=600&fit=crop', alt: 'Rak sepatu di entryway rumah' },
    ],
    category: categories[0],
    rating: 0,
    reviewCount: 0,
    inStock: true,
    isFeatured: true,
    isNew: true,
  },
  {
    id: '15',
    name: 'Rak Dinding Floating Shelf Set',
    slug: 'rak-dinding-floating-shelf-set',
    description: 'Set 3 rak dinding floating minimalis dari kayu solid, sempurna untuk dekorasi dan penyimpanan.',
    fullDescription: `Rak Dinding Floating Shelf Set dari Sesoris terdiri dari 3 rak dengan ukuran berbeda yang bisa disusun sesuai kreativitas Anda. Dibuat dari kayu paulownia solid dengan finishing natural yang memperlihatkan keindahan serat kayu asli.

Sistem pemasangan concealed bracket membuat rak terlihat melayang di dinding tanpa sekrup yang terlihat. Hardware mounting sudah termasuk dalam paket, lengkap dengan panduan pemasangan dan alat level mini.

Setiap rak memiliki ketebalan 2 cm dengan permukaan yang diamplas halus dan tepi yang sedikit rounded untuk keamanan. Finishing water-resistant melindungi dari kelembapan dan memudahkan pembersihan.

Cocok untuk memajang tanaman hias, buku favorit, foto keluarga, atau koleksi dekorasi. Kapasitas beban masing-masing rak hingga 5 kg memungkinkan Anda menaruh berbagai item dengan aman. Set ini tersedia dalam warna natural, walnut, dan putih.`,
    features: [
      'Set 3 rak ukuran berbeda (40/50/60 cm)',
      'Kayu paulownia solid dengan serat natural',
      'Concealed bracket - tampil melayang',
      'Finishing water-resistant',
      'Hardware mounting dan level mini included',
      'Kapasitas 5 kg per rak',
    ],
    specifications: [
      { label: 'Material', value: 'Kayu Paulownia Solid' },
      { label: 'Ukuran', value: '40/50/60 x 15 x 2 cm' },
      { label: 'Berat Set', value: '1.5 kg' },
      { label: 'Beban Maks', value: '5 kg per rak' },
      { label: 'Warna', value: 'Natural Wood' },
      { label: 'Isi Paket', value: '3 rak + bracket + sekrup + level' },
    ],
    price: 249000,
    images: [
      { url: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=600&h=600&fit=crop', alt: 'Floating shelf set di dinding ruang tamu' },
      { url: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&h=600&fit=crop', alt: 'Floating shelf dengan dekorasi tanaman' },
      { url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=600&fit=crop', alt: 'Floating shelf detail kayu natural' },
    ],
    category: categories[0],
    rating: 0,
    reviewCount: 0,
    inStock: true,
    isNew: true,
  },
  {
    id: '16',
    name: 'Gantungan Kunci Dinding Magnetik',
    slug: 'gantungan-kunci-dinding-magnetik',
    description: 'Gantungan kunci dinding dengan magnet kuat, desain minimalis dari kayu walnut dan stainless steel.',
    fullDescription: `Gantungan Kunci Dinding Magnetik dari Sesoris menggunakan teknologi magnet neodymium yang kuat untuk menahan kunci Anda dengan aman. Cukup tempelkan kunci ke permukaan rak, dan magnet akan menahan kunci secara otomatis.

Bagian atas berfungsi sebagai shelf kecil untuk menaruh dompet, sunglasses, atau surat. Bagian bawah dilengkapi 5 hooks tambahan untuk kunci yang tidak memiliki ring metal, masker, atau tas kecil.

Terbuat dari kombinasi kayu walnut pilihan dan stainless steel brushed, memberikan tampilan premium yang cocok untuk entryway, koridor, atau area dekat pintu. Desain wall-mounted dengan 2 titik sekrup yang tersembunyi.

Magnet neodymium N52 grade tertinggi mampu menahan beban hingga 500 gram per titik, cukup untuk gantungan kunci terberat sekalipun. Permukaan kayu dilapisi clear coat untuk perlindungan jangka panjang.`,
    features: [
      'Magnet neodymium N52 - grade tertinggi',
      'Shelf atas untuk dompet dan aksesori',
      '5 hooks tambahan di bagian bawah',
      'Kayu walnut + stainless steel brushed',
      'Instalasi mudah, 2 titik sekrup tersembunyi',
      'Tahan beban 500g per titik magnet',
    ],
    specifications: [
      { label: 'Material', value: 'Kayu Walnut + Stainless Steel' },
      { label: 'Dimensi', value: '30 x 8 x 5 cm' },
      { label: 'Berat', value: '350 gram' },
      { label: 'Magnet', value: 'Neodymium N52, 6 titik' },
      { label: 'Hooks', value: '5 buah' },
      { label: 'Garansi', value: '1 Tahun' },
    ],
    price: 159000,
    images: [
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop', alt: 'Gantungan kunci dinding magnetik walnut' },
      { url: 'https://images.unsplash.com/photo-1585412459212-4ab91ece49c3?w=600&h=600&fit=crop', alt: 'Gantungan kunci dengan kunci terpasang' },
      { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=600&fit=crop', alt: 'Gantungan kunci di entryway rumah' },
    ],
    category: categories[0],
    rating: 0,
    reviewCount: 0,
    inStock: true,
    isFeatured: true,
    isNew: true,
  },
  {
    id: '17',
    name: 'Rak Buku Minimalis Industrial',
    slug: 'rak-buku-minimalis-industrial',
    description: 'Rak buku 4 tingkat bergaya industrial dengan rangka besi dan papan kayu pinus, cocok untuk ruang kerja dan ruang tamu.',
    fullDescription: `Rak Buku Minimalis Industrial dari Sesoris menggabungkan gaya industrial yang timeless dengan fungsionalitas modern. Rangka besi hollow hitam matte dipadukan dengan papan kayu pinus solid memberikan kontras visual yang menarik.

4 tingkat rak memberikan ruang luas untuk koleksi buku, tanaman hias, foto, dan dekorasi. Desain open-shelf membuat ruangan terasa lebih luas dibandingkan lemari tertutup, sekaligus memudahkan akses ke semua item.

Rangka besi di-welding presisi dan dilapisi powder-coating anti karat untuk ketahanan maksimal. Papan kayu pinus dikeringkan kiln-dried untuk mencegah warping, lalu difinishing dengan stain dan clear coat tahan air.

Kaki dilengkapi adjustable feet untuk menyesuaikan lantai yang tidak rata. Dimensi compact (80 x 30 cm footprint) membuatnya pas di sudut ruang kerja, ruang tamu, atau kamar tidur. Kapasitas beban total 40 kg terdistribusi merata di 4 tingkat.`,
    features: [
      '4 tingkat open-shelf luas untuk buku dan dekorasi',
      'Rangka besi hollow hitam matte welded',
      'Papan kayu pinus solid kiln-dried',
      'Powder-coating anti karat',
      'Adjustable feet untuk lantai tidak rata',
      'Kapasitas total 40 kg',
    ],
    specifications: [
      { label: 'Material', value: 'Besi Hollow + Kayu Pinus' },
      { label: 'Dimensi', value: '80 x 30 x 120 cm' },
      { label: 'Berat', value: '8 kg' },
      { label: 'Tingkat', value: '4 level' },
      { label: 'Beban Maks', value: '40 kg total' },
      { label: 'Garansi', value: '2 Tahun' },
    ],
    price: 599000,
    compareAtPrice: 799000,
    images: [
      { url: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&h=600&fit=crop', alt: 'Rak buku industrial tampak depan' },
      { url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=600&fit=crop', alt: 'Rak buku dengan koleksi buku' },
      { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop', alt: 'Rak buku di ruang tamu' },
    ],
    category: categories[0],
    rating: 0,
    reviewCount: 0,
    inStock: true,
    isNew: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'Kualitas produk luar biasa! Pengiriman cepat dan customer service sangat membantu. Pasti akan order lagi!',
    rating: 5,
    verified: true,
  },
  {
    id: '2',
    name: 'James K.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'Menemukan hadiah sempurna untuk istri di sini. Packaging cantik dan produknya melebihi ekspektasi.',
    rating: 5,
    verified: true,
  },
  {
    id: '3',
    name: 'Emily R.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: 'Suka dengan variasi produknya. Semua terkurasi dengan baik dan harganya reasonable.',
    rating: 5,
    verified: true,
  },
];

export const getFeaturedProducts = () => products.filter((p) => p.isFeatured);
export const getNewArrivals = () => products.filter((p) => p.isNew);
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (categorySlug: string) =>
  products.filter((p) => p.category.slug === categorySlug);
export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
