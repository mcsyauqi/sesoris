#!/usr/bin/env python3
"""Generate all 42 SEO blog articles for Sesoris as JSON files with images."""
import json, os, sys, urllib.request, shutil
sys.stdout.reconfigure(encoding='utf-8')

from PIL import Image as PILImage

BLOG_DIR = "content/blog"
IMG_DIR = "public/images/blog"

# Valid internal links (existing articles)
EXISTING_SLUGS = [
    "cara-membuat-mini-bar-dapur-di-rumah-minimalis",
    "cara-menata-rumah-kecil-agar-rapi",
    "cara-menciptakan-home-office-yang-produktif-panduan-lifestyle-2026",
    "cara-merawat-peralatan-dapur-stainless-steel",
    "desain-rak-piring-minimalis-untuk-dapur-modern",
    "desain-rumah-minimalis",
    "gaya-hidup-minimalis-transformasi-rumah-storage-solutions-2026",
    "harga-kitchen-set-minimalis-dapur-kecil",
    "harga-storage-box",
    "inspirasi-dekorasi-kamar-tidur-2026",
    "inspirasi-kamar-tidur-minimalis-sederhana-yang-bikin-betah-2026",
    "inspirasi-kitchen-set-minimalis-modern",
    "inspirasi-ruang-tamu-minimalis-modern-2026",
    "kitchen-set-minimalis",
    "kitchen-set-minimalis-dapur-kecil-murah",
    "lemari-piring-modern-pilihan-material-dan-desain",
    "memilih-meja-kompor-yang-tepat-untuk-dapur",
    "menciptakan-zona-relaksasi-di-rumah-panduan-lifestyle-2026",
    "mengorganisir-dapur-kecil-dengan-efektif",
    "peralatan-dapur-wajib-untuk-rumah-tangga-baru",
    "rak-piring-aluminium-kelebihan-dan-cara-memilih",
    "rekomendasi-rak-piring-terbaik",
    "review-koleksi-kontainer-serbaguna-sesoris",
    "storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan",
    "storage-box-terbaik-untuk-organisasi-rumah",
    "sustainable-living-mulai-dari-rumah",
    "tips-menata-rumah-minimalis-marie-kondo",
    "tutorial-membuat-daftar-inventaris-rumah-tangga",
    "tutorial-membuat-spice-rack-diy-dapur-kecil",
    "tutorial-membuat-taman-mini-indoor-panduan-lengkap-2026",
    "wadah-makanan-untuk-jualan",
    "work-life-balance-di-rumah-strategi-gaya-hidup-seimbang",
]

def il(text, slug):
    """Internal link helper - only link to existing slugs"""
    return f"[{text}](/blog/{slug})"

def download_image(query, filename):
    """Download image from Unsplash and convert to 1200x675 webp"""
    filepath = os.path.join(IMG_DIR, filename)
    if os.path.exists(filepath):
        print(f"  Skip (exists): {filename}")
        return True

    q = urllib.parse.quote(query)
    url = f"https://images.unsplash.com/photo-{q}?w=1200&h=675&fit=crop&crop=center"
    tmp = f"_tmp_{filename}.jpg"
    try:
        # Use specific Unsplash photo IDs for reliable downloads
        urllib.request.urlretrieve(url, tmp)
        img = PILImage.open(tmp)
        img = img.resize((1200, 675), PILImage.LANCZOS)
        img.save(filepath, 'WEBP', quality=80)
        os.remove(tmp)
        print(f"  OK: {filename}")
        return True
    except Exception as e:
        if os.path.exists(tmp):
            os.remove(tmp)
        print(f"  FAIL: {filename} - {e}")
        return False

# Unsplash photo IDs for reliable image downloads
PHOTO_IDS = {
    "shelf": "1556909114-f6e7ad7d3136",
    "kitchen-rack": "1556909114-f6e7ad7d3136",
    "food-container": "1584568694244-14fbdf83bd30",
    "food-storage": "1504674900247-0877df9cc836",
    "kitchen": "1556909114-f6e7ad7d3136",
    "camping": "1504280390367-361c6d9f38f4",
    "outdoor": "1551632811-561732d1e306",
    "living-room": "1522708323590-d24dbb6b0267",
    "bedroom": "1522771739788-ce6462e6430e",
    "desk": "1518455027359-f3f8164ba6bd",
    "travel-bag": "1553062407-98eeb64c6a62",
    "backpack": "1553062407-98eeb64c6a62",
    "minimalist-room": "1502672260266-1c1ef2d93688",
    "organized-closet": "1558618666-fcd25c85f82e",
    "spice-rack": "1596040033229-a9821ebd058d",
    "small-kitchen": "1556909114-f6e7ad7d3136",
    "lebaran": "1559056199-641a0ac8b55e",
    "cookies": "1558961363-fa8fdf82db35",
    "home-cleaning": "1581578731548-c64695cc6952",
    "decoration": "1513694203232-719a280e022f",
    "dry-bag": "1551632811-561732d1e306",
    "packing": "1553062407-98eeb64c6a62",
    "stationery": "1513364776144-60967b0f800f",
    "storage-box": "1558618666-fcd25c85f82e",
}

def get_photo_url(photo_id, w=1200, h=675):
    return f"https://images.unsplash.com/photo-{photo_id}?w={w}&h={h}&fit=crop&crop=center"

def download_photo(photo_id, filename):
    """Download specific Unsplash photo by ID"""
    filepath = os.path.join(IMG_DIR, filename)
    if os.path.exists(filepath):
        print(f"  Skip (exists): {filename}")
        return True

    url = get_photo_url(photo_id)
    tmp = f"_tmp_{filename}.jpg"
    try:
        urllib.request.urlretrieve(url, tmp)
        img = PILImage.open(tmp)
        img = img.resize((1200, 675), PILImage.LANCZOS)
        img.save(filepath, 'WEBP', quality=80)
        os.remove(tmp)
        print(f"  OK: {filename}")
        return True
    except Exception as e:
        if os.path.exists(tmp):
            os.remove(tmp)
        print(f"  FAIL: {filename} - {e}")
        return False

def save_article(data):
    filepath = os.path.join(BLOG_DIR, f"{data['slug']}.json")
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    wc = len(' '.join(data['content']).split())
    print(f"  Saved: {data['slug']}.json ({wc} words)")

# ============================================================================
# ARTICLE DEFINITIONS
# ============================================================================

articles = []

# Schedule: Mar 18 has 1 slot taken, so 2 more on Mar 18, then 3/day
schedule_dates = []
schedule_dates.extend(["2026-03-18"] * 2)
for d in range(19, 32):
    schedule_dates.extend([f"2026-03-{d:02d}"] * 3)
schedule_dates.extend(["2026-04-01"] * 3)
schedule_dates.extend(["2026-04-02"] * 3)
schedule_dates = schedule_dates[:42]

date_labels = {
    "2026-03-18": "18 Maret 2026", "2026-03-19": "19 Maret 2026",
    "2026-03-20": "20 Maret 2026", "2026-03-21": "21 Maret 2026",
    "2026-03-22": "22 Maret 2026", "2026-03-23": "23 Maret 2026",
    "2026-03-24": "24 Maret 2026", "2026-03-25": "25 Maret 2026",
    "2026-03-26": "26 Maret 2026", "2026-03-27": "27 Maret 2026",
    "2026-03-28": "28 Maret 2026", "2026-03-29": "29 Maret 2026",
    "2026-03-30": "30 Maret 2026", "2026-03-31": "31 Maret 2026",
    "2026-04-01": "1 April 2026", "2026-04-02": "2 April 2026",
}

authors = [
    {"name": "Ayu Lestari", "avatar": "AL", "role": "Home Organization Expert"},
    {"name": "Rizki Pratama", "avatar": "RP", "role": "Interior Design Enthusiast"},
    {"name": "Sari Dewi", "avatar": "SD", "role": "Kitchen & Cooking Expert"},
    {"name": "Budi Santoso", "avatar": "BS", "role": "Travel & Outdoor Expert"},
    {"name": "Dina Maharani", "avatar": "DM", "role": "Lifestyle & Home Blogger"},
]

def get_author(idx):
    return authors[idx % len(authors)]

# ============================================================================
# ARTICLE 1: rak-serbaguna
# ============================================================================
articles.append({
    "slug": "rak-serbaguna",
    "title": "15 Rekomendasi Rak Serbaguna Terbaik untuk Rumah Rapi (2026)",
    "excerpt": "Panduan lengkap memilih rak serbaguna untuk rumah. Rekomendasi 15 model terbaik dari bahan plastik, besi, dan kayu beserta tips pemilihan sesuai kebutuhan.",
    "image": "/images/blog/rak-serbaguna-hero.webp",
    "category": "Home Living",
    "readTime": "10 menit",
    "content": [
        "Rak serbaguna adalah solusi penyimpanan paling praktis untuk rumah Indonesia. Dengan satu **rak serbaguna** yang tepat, Anda bisa mengorganisir berbagai barang mulai dari buku, peralatan dapur, sampai perlengkapan kamar mandi dalam satu tempat.",

        "![Rak serbaguna multifungsi dengan berbagai ukuran untuk organisasi rumah](/images/blog/rak-serbaguna-hero.webp)",

        "Artikel ini membahas 15 rekomendasi rak serbaguna terbaik di 2026, lengkap dengan panduan memilih berdasarkan material, ukuran, dan budget. Anda juga akan menemukan tips penataan agar rak tidak terlihat berantakan.",

        "## Apa Itu Rak Serbaguna dan Mengapa Penting?",

        "Rak serbaguna adalah furniture penyimpanan yang dirancang untuk menampung berbagai jenis barang. Berbeda dengan rak khusus (rak buku, rak sepatu), rak serbaguna memiliki desain fleksibel yang bisa digunakan di ruangan mana saja.",

        "Menurut survei Jakpat 2025, 73% rumah tangga Indonesia mengalami masalah kekurangan ruang penyimpanan. Rak serbaguna menjadi solusi paling terjangkau dibanding membeli lemari besar atau renovasi ruangan.",

        "### Keunggulan Rak Serbaguna",
        "- **Fleksibel**: bisa dipindah ke ruangan mana saja sesuai kebutuhan",
        "- **Hemat ruang**: desain vertikal memanfaatkan area yang biasanya kosong",
        "- **Terjangkau**: harga mulai dari Rp 50.000 untuk model dasar",
        "- **Mudah dirakit**: kebanyakan model tinggal pasang tanpa alat khusus",

        "## Jenis Rak Serbaguna Berdasarkan Material",

        "### 1. Rak Serbaguna Plastik",
        "Material plastik cocok untuk area lembap seperti kamar mandi dan dapur. Bobotnya ringan sehingga mudah dipindahkan. Harga paling terjangkau, mulai Rp 50.000 - 300.000.",

        "### 2. Rak Serbaguna Besi/Metal",
        "Rak besi memiliki daya tahan lebih tinggi dan bisa menahan beban berat. Cocok untuk garasi, gudang, atau dapur. Kisaran harga Rp 150.000 - 1.500.000.",

        "### 3. Rak Serbaguna Kayu",
        "Material kayu memberikan kesan hangat dan natural. Cocok untuk ruang tamu dan kamar tidur. Harga mulai Rp 200.000 - 2.000.000 tergantung jenis kayu.",

        "### 4. Rak Serbaguna Kombinasi",
        "Kombinasi besi dan kayu (industrial style) sedang tren di 2026. Kuat, estetik, dan cocok untuk gaya interior modern minimalis.",

        "## 15 Rekomendasi Rak Serbaguna Terbaik 2026",

        "![Berbagai model rak serbaguna untuk setiap ruangan di rumah](/images/blog/rak-serbaguna-models.webp)",

        "| No | Model | Material | Tier | Kisaran Harga |",
        "| --- | --- | --- | --- | --- |",
        "| 1 | Rak Susun 4 Tingkat | Plastik PP | Budget | Rp 89.000 |",
        "| 2 | Rak Sudut Segitiga | Plastik ABS | Budget | Rp 65.000 |",
        "| 3 | Rak Dinding Floating 3 Set | MDF | Budget | Rp 120.000 |",
        "| 4 | Rak Industrial 5 Tier | Besi + Kayu | Mid | Rp 450.000 |",
        "| 5 | Rak Lipat Portabel | Besi Chrome | Mid | Rp 350.000 |",
        "| 6 | Rak Bambu 4 Tingkat | Bambu | Mid | Rp 380.000 |",
        "| 7 | Rak Cube Modular 9 Kotak | Particle Board | Mid | Rp 550.000 |",
        "| 8 | Rak Gantung Pintu | Besi | Budget | Rp 95.000 |",
        "| 9 | Rak Putar 360 Derajat | Plastik + Besi | Mid | Rp 280.000 |",
        "| 10 | Rak Tangga Dekoratif | Kayu Pinus | Premium | Rp 750.000 |",
        "| 11 | Rak Trolley Roda | Besi Powder Coat | Mid | Rp 320.000 |",
        "| 12 | Rak Over-the-Toilet | Besi + Bambu | Mid | Rp 420.000 |",
        "| 13 | Rak Buku Dinding Invisible | Besi | Budget | Rp 75.000 |",
        "| 14 | Rak Standing 6 Tier | Besi Industrial | Premium | Rp 1.200.000 |",
        "| 15 | Rak Modular Custom | Besi + MDF | Premium | Rp 1.500.000 |",

        "## Cara Memilih Rak Serbaguna yang Tepat",

        "### Sesuaikan dengan Ruangan",
        "- **Kamar mandi**: pilih material anti-karat (plastik atau stainless steel)",
        "- **Dapur**: prioritaskan material tahan panas dan mudah dibersihkan",
        "- **Ruang tamu**: pilih yang estetik, material kayu atau industrial style",
        "- **Kamar tidur**: rak cube modular atau rak tangga dekoratif",

        "### Ukur Ruangan Terlebih Dahulu",
        "Kesalahan paling umum adalah membeli rak tanpa mengukur ruang yang tersedia. Ukur tinggi, lebar, dan kedalaman area yang akan ditempati rak. Sisakan minimal 5 cm dari dinding untuk sirkulasi udara.",

        "Untuk rumah kecil, baca juga panduan lengkap " + il("cara menata rumah kecil agar rapi", "cara-menata-rumah-kecil-agar-rapi") + " yang sudah kami siapkan.",

        ":::baca-juga",
        "- " + il("Review Koleksi Kontainer Serbaguna Sesoris", "review-koleksi-kontainer-serbaguna-sesoris"),
        "- " + il("Storage Box Terbaik 2026: Panduan Lengkap", "storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan"),
        ":::",

        "## Tips Menata Rak Serbaguna Agar Rapi",

        "![Tips menata rak serbaguna agar tetap rapi dan estetik](/images/blog/rak-serbaguna-tips.webp)",

        "1. **Kelompokkan barang** berdasarkan kategori, bukan lokasi asal",
        "2. **Gunakan kontainer** atau kotak penyimpanan di dalam rak untuk barang kecil",
        "3. **Sisakan 20% ruang kosong** agar tidak terlihat penuh sesak",
        "4. **Letakkan barang berat di bawah** untuk stabilitas",
        "5. **Rotasi barang musiman** - simpan yang tidak dipakai di " + il("storage box", "harga-storage-box"),

        "Kombinasikan rak serbaguna dengan " + il("kontainer serbaguna", "review-koleksi-kontainer-serbaguna-sesoris") + " untuk hasil organisasi yang maksimal.",

        "## Rak Serbaguna untuk Setiap Ruangan",

        "### Untuk Dapur",
        "Dapur membutuhkan rak yang tahan lembap dan mudah dibersihkan. Pilih " + il("rak aluminium", "rak-piring-aluminium-kelebihan-dan-cara-memilih") + " atau rak stainless steel. Letakkan bumbu, peralatan masak, dan bahan makanan yang sering dipakai di rak terbuka agar mudah dijangkau.",

        "### Untuk Kamar Tidur",
        "Rak cube modular sangat cocok untuk kamar tidur. Bisa berfungsi sebagai tempat buku, display, sekaligus pembatas ruangan. Temukan " + il("inspirasi kamar tidur minimalis", "inspirasi-kamar-tidur-minimalis-sederhana-yang-bikin-betah-2026") + " untuk referensi penataan.",

        "### Untuk Ruang Tamu",
        "Di ruang tamu, rak berfungsi ganda sebagai display dan penyimpanan. Rak tangga dekoratif atau floating shelf bisa menampilkan tanaman, foto, dan buku. Lihat " + il("inspirasi ruang tamu minimalis modern", "inspirasi-ruang-tamu-minimalis-modern-2026") + " untuk ide penataan.",

        "## Pertanyaan Umum (FAQ)",

        "### Berapa harga rak serbaguna yang bagus?",
        "Rak serbaguna berkualitas baik bisa didapatkan mulai Rp 200.000 - 500.000. Untuk budget terbatas, rak plastik susun 4 tingkat seharga Rp 89.000 sudah cukup fungsional.",

        "### Rak serbaguna bahan apa yang paling awet?",
        "Rak besi powder coated dan rak stainless steel paling awet karena tahan karat dan beban berat. Untuk indoor, rak kayu jati atau mahoni juga sangat tahan lama.",

        "### Bagaimana cara membersihkan rak serbaguna?",
        "Lap dengan kain lembap setiap minggu. Untuk rak besi, cek apakah ada karat dan olesi anti-karat jika perlu. Rak kayu bisa dilap dengan furniture polish sebulan sekali.",

        "### Apakah rak serbaguna bisa menahan beban berat?",
        "Tergantung material dan konstruksi. Rak besi bisa menahan 20-50 kg per tier, rak kayu 10-30 kg, dan rak plastik 5-15 kg. Selalu cek spesifikasi beban maksimal sebelum membeli.",

        "### Di mana beli rak serbaguna murah tapi berkualitas?",
        "Marketplace seperti Tokopedia dan Shopee menawarkan banyak pilihan. Kunjungi juga [toko Sesoris](https://www.sesoris.com/shop) untuk koleksi rak dan organizer berkualitas dengan harga bersaing.",

        "## Kesimpulan",

        "Rak serbaguna adalah investasi kecil yang memberikan dampak besar untuk kerapihan rumah. Pilih material yang sesuai dengan ruangan, ukur area yang tersedia, dan tata barang dengan prinsip pengelompokan. Dengan rak yang tepat, rumah Anda bisa lebih terorganisir tanpa perlu renovasi besar.",

        "Temukan koleksi rak dan organizer terlengkap di [Sesoris](https://www.sesoris.com/shop) untuk solusi penyimpanan rumah Anda.",
    ],
    "images": [
        ("1558618666-fcd25c85f82e", "rak-serbaguna-hero.webp"),
        ("1502672260266-1c1ef2d93688", "rak-serbaguna-models.webp"),
        ("1522708323590-d24dbb6b0267", "rak-serbaguna-tips.webp"),
    ]
})

# ============================================================================
# ARTICLE 2: food-container
# ============================================================================
articles.append({
    "slug": "food-container",
    "title": "10 Food Container Terbaik untuk Menyimpan Makanan Lebih Awet (2026)",
    "excerpt": "Rekomendasi food container terbaik 2026 untuk menyimpan makanan agar tahan lama. Panduan memilih wadah makanan dari kaca, plastik BPA-free, hingga stainless steel.",
    "image": "/images/blog/food-container-hero.webp",
    "category": "Kitchen & Dining",
    "readTime": "9 menit",
    "content": [
        "**Food container** yang tepat bisa membuat makanan Anda bertahan hingga 3 kali lebih lama dibanding disimpan di wadah biasa. Selain menjaga kesegaran, food container berkualitas juga mencegah kontaminasi bakteri dan menjaga nutrisi makanan tetap terjaga.",

        "![Berbagai jenis food container dari kaca, plastik, dan stainless steel](/images/blog/food-container-hero.webp)",

        "Dalam panduan ini, kami membahas 10 food container terbaik di 2026 berdasarkan material, keamanan pangan, dan durabilitas. Anda juga akan menemukan tips menyimpan makanan agar lebih awet.",

        "## Mengapa Food Container yang Tepat Itu Penting?",

        "Organisasi pangan yang buruk menjadi penyebab utama food waste di rumah tangga Indonesia. Data Bappenas menunjukkan bahwa sekitar 23-48 juta ton makanan terbuang setiap tahun di Indonesia. Sebagian besar karena penyimpanan yang tidak tepat.",

        "Food container berkualitas membantu:",
        "- **Memperpanjang umur simpan** makanan di kulkas dan freezer",
        "- **Mencegah tumpah** dan bau menyebar di dalam kulkas",
        "- **Memudahkan meal prep** untuk keluarga atau bisnis kuliner",
        "- **Mengurangi food waste** karena makanan tidak cepat basi",

        "## Jenis Food Container Berdasarkan Material",

        "### 1. Food Container Kaca (Borosilicate Glass)",
        "Kaca borosilicate adalah pilihan premium untuk food container. Tahan suhu ekstrem (-20 sampai 400 derajat Celsius), tidak menyerap bau, dan aman untuk microwave serta oven. Kekurangannya adalah bobot yang lebih berat dan risiko pecah.",

        "### 2. Food Container Plastik BPA-Free",
        "Plastik food-grade yang bebas BPA menjadi pilihan paling populer karena ringan dan terjangkau. Pastikan cari label \"BPA-Free\" dan simbol segitiga dengan angka 5 (PP - Polypropylene) yang aman untuk makanan.",

        "### 3. Food Container Stainless Steel",
        "Stainless steel sangat tahan lama dan tidak bereaksi dengan makanan asam. Cocok untuk membawa bekal dan menyimpan makanan kering. Tidak bisa digunakan di microwave.",

        "### 4. Food Container Silikon",
        "Material silikon fleksibel dan bisa dilipat saat tidak digunakan. Cocok untuk traveling dan menghemat ruang penyimpanan.",

        "## 10 Rekomendasi Food Container Terbaik 2026",

        "![Rekomendasi food container terbaik untuk berbagai kebutuhan](/images/blog/food-container-rekomendasi.webp)",

        "| No | Produk | Material | Kapasitas | Harga |",
        "| --- | --- | --- | --- | --- |",
        "| 1 | Lock & Lock Classic | Plastik PP | 350ml - 4.5L | Rp 35.000 - 150.000 |",
        "| 2 | Ikea IKEA 365+ | Kaca + PP Lid | 400ml - 1.8L | Rp 79.000 - 169.000 |",
        "| 3 | Pyrex Simply Store | Borosilicate | 500ml - 3L | Rp 120.000 - 280.000 |",
        "| 4 | Tupperware FreezerMate | Plastik PP | 250ml - 2.5L | Rp 85.000 - 250.000 |",
        "| 5 | OXO Good Grips | Plastik Tritan | 400ml - 2.6L | Rp 150.000 - 350.000 |",
        "| 6 | Glasslock Tempered | Tempered Glass | 400ml - 2L | Rp 89.000 - 200.000 |",
        "| 7 | Sistema KLIP IT | Plastik PP | 200ml - 3.5L | Rp 55.000 - 180.000 |",
        "| 8 | Luminarc Pure Box | Kaca + PP | 380ml - 1.5L | Rp 65.000 - 160.000 |",
        "| 9 | Cuitisan Stainless | Stainless Steel | 350ml - 2L | Rp 180.000 - 400.000 |",
        "| 10 | Sesoris Food Container | Plastik BPA-Free | 500ml - 3L | Rp 45.000 - 120.000 |",

        "## Cara Memilih Food Container yang Tepat",

        "### Untuk Meal Prep",
        "Pilih set food container dengan ukuran seragam agar mudah ditumpuk di kulkas. Material kaca lebih disarankan karena bisa langsung dipanaskan di microwave tanpa perlu pindah wadah.",

        "### Untuk Bisnis Kuliner",
        "Jika Anda menjual makanan, pilih " + il("wadah makanan untuk jualan", "wadah-makanan-untuk-jualan") + " yang food-grade, leak-proof, dan tampilannya profesional. Pertimbangkan juga food container sekali pakai berbahan ramah lingkungan.",

        "### Untuk Menyimpan di Freezer",
        "Pastikan food container berlabel \"freezer-safe\". Tidak semua plastik tahan suhu beku. Kaca borosilicate dan plastik PP (Polypropylene) aman untuk freezer.",

        ":::baca-juga",
        "- " + il("Wadah Makanan untuk Jualan: Panduan Lengkap", "wadah-makanan-untuk-jualan"),
        "- " + il("Cara Merawat Peralatan Dapur Stainless Steel", "cara-merawat-peralatan-dapur-stainless-steel"),
        ":::",

        "## Tips Menyimpan Makanan Agar Tahan Lama",

        "![Tips menyimpan makanan dengan food container agar lebih awet](/images/blog/food-container-tips.webp)",

        "1. **Dinginkan makanan dulu** sebelum masukkan ke container dan kulkas",
        "2. **Jangan isi penuh** - sisakan ruang 1-2 cm untuk ekspansi di freezer",
        "3. **Label tanggal** pada setiap container agar tahu urutan konsumsi",
        "4. **Pisahkan makanan basah dan kering** untuk mencegah kelembapan berlebih",
        "5. **Bersihkan segera** setelah digunakan agar tidak meninggalkan noda membandel",

        "Organisasi kulkas yang baik dimulai dari food container yang tepat. Kombinasikan dengan " + il("peralatan dapur wajib", "peralatan-dapur-wajib-untuk-rumah-tangga-baru") + " lainnya untuk dapur yang lebih teratur.",

        "## Food Container vs Wadah Biasa",

        "| Aspek | Food Container | Wadah Biasa |",
        "| --- | --- | --- |",
        "| Kedap udara | Ya (seal rapat) | Tidak selalu |",
        "| Food-grade | Tersertifikasi | Belum tentu |",
        "| Tahan microwave | Sebagian besar | Jarang |",
        "| Anti bocor | Ya | Sering bocor |",
        "| Harga | Rp 35.000+ | Rp 5.000+ |",

        "## Pertanyaan Umum (FAQ)",

        "### Apakah food container plastik aman untuk makanan panas?",
        "Hanya food container berbahan PP (Polypropylene) dengan simbol segitiga 5 yang aman untuk makanan panas. Hindari plastik dengan simbol 3 (PVC) dan 6 (PS/Styrofoam).",

        "### Berapa lama makanan bisa disimpan di food container?",
        "Di kulkas (0-4 derajat C): nasi 3-5 hari, sayur matang 3-4 hari, daging matang 3-4 hari. Di freezer (-18 derajat C): bisa bertahan 1-3 bulan tergantung jenis makanan.",

        "### Food container kaca atau plastik yang lebih bagus?",
        "Kaca lebih higienis, tidak menyerap bau, dan tahan lama. Plastik lebih ringan dan anti-pecah. Untuk di rumah, kaca lebih disarankan. Untuk dibawa bepergian, plastik atau stainless steel lebih praktis.",

        "### Bagaimana cara menghilangkan bau pada food container plastik?",
        "Rendam dalam larutan baking soda (1 sendok makan per liter air) selama 30 menit. Bilas bersih dan jemur di bawah sinar matahari. Untuk noda membandel, gunakan campuran cuka putih dan air.",

        "### Apakah food container bisa digunakan di microwave?",
        "Pastikan ada label \"microwave-safe\" pada container. Selalu buka tutupnya sedikit saat memanaskan untuk mencegah tekanan berlebih. Hindari memanaskan food container stainless steel di microwave.",

        "## Kesimpulan",

        "Food container berkualitas adalah investasi kecil yang berdampak besar untuk kesehatan keluarga dan penghematan pengeluaran makanan. Pilih material yang sesuai kebutuhan, utamakan keamanan pangan (BPA-free, food-grade), dan rawat dengan benar agar tahan lama.",

        "Temukan koleksi food container dan wadah makanan berkualitas di [Sesoris](https://www.sesoris.com/shop) dengan harga terjangkau.",
    ],
    "images": [
        ("1584568694244-14fbdf83bd30", "food-container-hero.webp"),
        ("1504674900247-0877df9cc836", "food-container-rekomendasi.webp"),
        ("1556909114-f6e7ad7d3136", "food-container-tips.webp"),
    ]
})

# ============================================================================
# ARTICLE 3: alat-camping
# ============================================================================
articles.append({
    "slug": "alat-camping",
    "title": "20 Alat Camping Wajib untuk Pemula dan Berpengalaman (2026)",
    "excerpt": "Daftar lengkap alat camping yang wajib dibawa saat berkemah. Dari tenda, sleeping bag, hingga peralatan masak outdoor beserta tips packing efisien.",
    "image": "/images/blog/alat-camping-hero.webp",
    "category": "Outdoor & Travel",
    "readTime": "11 menit",
    "content": [
        "Memilih **alat camping** yang tepat bisa menjadi pembeda antara pengalaman berkemah yang menyenangkan dan yang penuh masalah. Baik Anda pemula yang baru pertama kali camping atau petualang berpengalaman, checklist peralatan yang lengkap adalah kunci kesuksesan.",

        "![Peralatan camping lengkap tertata rapi siap untuk petualangan outdoor](/images/blog/alat-camping-hero.webp)",

        "Panduan ini membahas 20 alat camping wajib beserta rekomendasi produk, tips memilih, dan cara packing yang efisien agar semua peralatan muat dalam tas carrier.",

        "## Kategori Alat Camping yang Wajib Dimiliki",

        "Alat camping bisa dibagi menjadi 5 kategori utama. Setiap kategori memiliki peralatan yang fungsinya tidak bisa digantikan:",

        "### 1. Shelter (Tempat Berlindung)",
        "- **Tenda** - pilih kapasitas sesuai jumlah peserta + 1 (tenda 3 orang untuk 2 camper)",
        "- **Tarp/flysheet** - perlindungan tambahan dari hujan dan embun",
        "- **Footprint** - alas pelindung tenda dari kelembapan tanah",

        "### 2. Tidur dan Istirahat",
        "- **Sleeping bag** - sesuaikan rating suhu dengan lokasi camping",
        "- **Sleeping pad/matras** - isolasi dari tanah dingin dan keras",
        "- **Bantal tiup** - ringan dan mudah dikemas",

        "### 3. Peralatan Masak",
        "- **Kompor camping** - pilih yang ringan dan efisien bahan bakar",
        "- **Nesting cookware set** - panci dan wajan yang bisa ditumpuk",
        "- **Peralatan makan** - sendok garpu lipat, piring, dan gelas camping",

        "### 4. Navigasi dan Keamanan",
        "- **Headlamp** - lebih praktis dari senter karena hands-free",
        "- **Pisau lipat/multitool** - alat serbaguna untuk berbagai kebutuhan",
        "- **P3K kit** - obat luka, perban, obat diare, anti-nyamuk",
        "- **Peluit darurat** - untuk sinyal keadaan darurat",

        "### 5. Perlengkapan Pendukung",
        "- **Tali paracord** - serba guna untuk berbagai situasi",
        "- **Dry bag** - melindungi barang dari air hujan dan sungai",
        "- **Power bank** - pastikan kapasitas minimal 10.000 mAh",

        "## Checklist Alat Camping Lengkap",

        "![Checklist peralatan camping yang harus dibawa](/images/blog/alat-camping-checklist.webp)",

        "| No | Alat | Prioritas | Berat (est.) | Budget |",
        "| --- | --- | --- | --- | --- |",
        "| 1 | Tenda 2-3P | Wajib | 2-3 kg | Rp 300rb - 2jt |",
        "| 2 | Sleeping bag | Wajib | 0.8-1.5 kg | Rp 150rb - 1jt |",
        "| 3 | Matras/sleeping pad | Wajib | 0.5-1 kg | Rp 100rb - 500rb |",
        "| 4 | Kompor portable | Wajib | 0.3-0.5 kg | Rp 80rb - 400rb |",
        "| 5 | Nesting cook set | Wajib | 0.5-1 kg | Rp 100rb - 600rb |",
        "| 6 | Headlamp | Wajib | 0.1 kg | Rp 50rb - 300rb |",
        "| 7 | Pisau lipat | Wajib | 0.15 kg | Rp 50rb - 500rb |",
        "| 8 | P3K kit | Wajib | 0.3 kg | Rp 50rb - 200rb |",
        "| 9 | Carrier/tas | Wajib | 1.5-2.5 kg | Rp 300rb - 2jt |",
        "| 10 | Raincoat/ponco | Wajib | 0.2 kg | Rp 30rb - 100rb |",
        "| 11 | Dry bag | Penting | 0.1 kg | Rp 30rb - 150rb |",
        "| 12 | Tarp/flysheet | Penting | 0.5-1 kg | Rp 100rb - 500rb |",
        "| 13 | Bantal tiup | Penting | 0.1 kg | Rp 40rb - 200rb |",
        "| 14 | Water filter | Penting | 0.2 kg | Rp 100rb - 500rb |",
        "| 15 | Tali paracord 15m | Penting | 0.2 kg | Rp 30rb - 80rb |",
        "| 16 | Botol air 1L | Penting | 0.15 kg | Rp 30rb - 200rb |",
        "| 17 | Power bank 10K | Opsional | 0.2 kg | Rp 100rb - 300rb |",
        "| 18 | Hammock | Opsional | 0.5 kg | Rp 80rb - 300rb |",
        "| 19 | Kursi lipat mini | Opsional | 0.8 kg | Rp 100rb - 400rb |",
        "| 20 | Peluit darurat | Wajib | 0.02 kg | Rp 10rb - 30rb |",

        "## Tips Memilih Alat Camping untuk Pemula",

        "1. **Mulai dari yang esensial** - beli perlengkapan wajib dulu, tambahkan opsional seiring pengalaman",
        "2. **Jangan tergoda harga murah** - alat camping murahan sering rusak saat dibutuhkan",
        "3. **Perhatikan berat** - total beban carrier idealnya tidak melebihi 20% berat badan Anda",
        "4. **Beli satu set** - nesting cookware set lebih hemat daripada beli terpisah",
        "5. **Cek review** - baca pengalaman pengguna lain sebelum membeli merek tertentu",

        "Untuk perlengkapan pendukung, siapkan juga " + il("tas outdoor", "storage-box-terbaik-untuk-organisasi-rumah") + " yang tahan air dan memiliki banyak kompartemen.",

        "## Cara Packing Alat Camping yang Efisien",

        "![Teknik packing alat camping ke dalam carrier](/images/blog/alat-camping-packing.webp)",

        "### Prinsip Pembagian Berat di Carrier",
        "- **Bawah**: barang ringan tapi besar (sleeping bag, baju ganti)",
        "- **Tengah**: barang paling berat (nesting set, kompor, makanan)",
        "- **Atas**: barang yang sering diakses (snack, raincoat, headlamp)",
        "- **Kantong samping**: botol air, tenda pole",
        "- **Kantong atas (brain)**: dompet, HP, P3K, peluit",

        "### Tips Anti-Basah",
        "Masukkan semua pakaian dan sleeping bag ke dalam dry bag. Bungkus elektronik (HP, power bank) dengan kantong ziplock. Pastikan raincover carrier terpasang sebelum berangkat.",

        ":::baca-juga",
        "- " + il("Sustainable Living Mulai dari Rumah", "sustainable-living-mulai-dari-rumah"),
        "- " + il("Storage Box Terbaik untuk Organisasi", "storage-box-terbaik-untuk-organisasi-rumah"),
        ":::",

        "## Lokasi Camping Populer di Indonesia",

        "- **Jawa Barat**: Ranca Upas, Kawah Putih, Cikole",
        "- **Jawa Tengah**: Dieng, Umbul Sidomukti, Gunung Merbabu",
        "- **Jawa Timur**: Bromo, B29, Ranu Kumbolo",
        "- **Bali**: Kintamani, Danau Tamblingan",

        "Setiap lokasi memiliki cuaca dan medan yang berbeda. Sesuaikan perlengkapan camping dengan kondisi lokasi tujuan.",

        "## Pertanyaan Umum (FAQ)",

        "### Berapa budget minimal untuk alat camping lengkap?",
        "Untuk pemula, budget Rp 1.500.000 - 3.000.000 sudah cukup untuk peralatan dasar yang berkualitas layak pakai. Investasi di tenda dan sleeping bag berkualitas sangat disarankan.",

        "### Alat camping apa yang paling penting?",
        "Tenda, sleeping bag, dan headlamp adalah tiga alat yang paling krusial. Tanpa ketiganya, pengalaman camping bisa sangat tidak nyaman dan bahkan berbahaya.",

        "### Bagaimana cara merawat alat camping?",
        "Selalu keringkan tenda dan sleeping bag sebelum disimpan. Simpan di tempat kering dengan sirkulasi udara baik. Cuci peralatan masak setelah digunakan dan olesi minyak tipis pada pisau lipat.",

        "### Apakah perlu beli semua alat sekaligus?",
        "Tidak. Mulai dari peralatan esensial (tenda, sleeping bag, matras, headlamp) lalu tambahkan secara bertahap seiring pengalaman. Untuk camping perdana, beberapa alat bisa disewa atau dipinjam.",

        "### Tas carrier ukuran berapa yang ideal?",
        "Untuk camping 1-2 malam, carrier 40-50 liter sudah cukup. Untuk ekspedisi lebih lama, pilih 60-80 liter. Pastikan carrier memiliki frame yang nyaman dan hip belt yang kokoh.",

        "## Kesimpulan",

        "Persiapan alat camping yang matang adalah fondasi dari pengalaman outdoor yang menyenangkan. Gunakan checklist di atas untuk memastikan tidak ada yang tertinggal. Mulai dari perlengkapan wajib, packing dengan efisien, dan selalu siapkan rencana cadangan untuk cuaca buruk.",

        "Temukan perlengkapan outdoor dan travel organizer di [Sesoris](https://www.sesoris.com/shop) untuk melengkapi petualangan Anda.",
    ],
    "images": [
        ("1504280390367-361c6d9f38f4", "alat-camping-hero.webp"),
        ("1551632811-561732d1e306", "alat-camping-checklist.webp"),
        ("1553062407-98eeb64c6a62", "alat-camping-packing.webp"),
    ]
})

# ============================================================================
# Generate schedule and save articles
# ============================================================================

if __name__ == "__main__":
    print("=" * 60)
    print("GENERATING SEO BLOG ARTICLES FOR SESORIS")
    print("=" * 60)

    # Only process articles defined above for now
    for idx, article in enumerate(articles):
        date = schedule_dates[idx]
        author = get_author(idx)

        print(f"\n[{idx+1}/{len(articles)}] {article['slug']}")

        # Build article data
        data = {
            "slug": article["slug"],
            "title": article["title"],
            "excerpt": article["excerpt"],
            "image": article["image"],
            "category": article["category"],
            "date": date,
            "dateFormatted": date_labels.get(date, date),
            "readTime": article.get("readTime", "10 menit"),
            "author": author,
            "content": article["content"],
        }

        # Save JSON
        save_article(data)

        # Download images
        for photo_id, filename in article.get("images", []):
            download_photo(photo_id, filename)

    print(f"\n{'=' * 60}")
    print(f"DONE! Generated {len(articles)} articles")
    print(f"{'=' * 60}")
