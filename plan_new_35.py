import json

new_articles = [
    {"slug": "rak-kamar-mandi", "title": "Rak Kamar Mandi Minimalis: Solusi Penyimpanan di Ruang Terbatas", "date": "2026-05-27", "category": "Panduan", "kw": "rak kamar mandi, rak kamar mandi minimalis"},
    {"slug": "organizer-kamar-mandi", "title": "Organizer Kamar Mandi: Cara Menata Toiletries agar Rapi dan Higienis", "date": "2026-05-28", "category": "Tips & Trik", "kw": "organizer kamar mandi, cara menata kamar mandi"},
    {"slug": "keranjang-laundry", "title": "Keranjang Laundry Terbaik: Pilihan Material dan Desain untuk Rumah Modern", "date": "2026-05-29", "category": "Panduan", "kw": "keranjang laundry, tempat baju kotor"},
    {"slug": "rak-mesin-cuci", "title": "Rak Mesin Cuci: Maksimalkan Area Laundry dengan Penyimpanan Vertikal", "date": "2026-05-30", "category": "Panduan", "kw": "rak mesin cuci, organizer laundry"},
    {"slug": "tempat-sabun-kamar-mandi", "title": "Tempat Sabun dan Shampoo: Organizer Shower yang Praktis dan Estetik", "date": "2026-05-31", "category": "Panduan", "kw": "tempat sabun kamar mandi, rak shower"},
    {"slug": "rak-buku-minimalis", "title": "Rak Buku Minimalis: 15 Desain untuk Pecinta Buku di Rumah Kecil", "date": "2026-06-01", "category": "Inspirasi", "kw": "rak buku minimalis, rak buku dinding"},
    {"slug": "lemari-pakaian-minimalis", "title": "Lemari Pakaian Minimalis: Panduan Memilih Wardrobe yang Tepat", "date": "2026-06-02", "category": "Panduan", "kw": "lemari pakaian minimalis, wardrobe minimalis"},
    {"slug": "tempat-tidur-dengan-storage", "title": "Tempat Tidur dengan Storage: Solusi Cerdas untuk Kamar Sempit", "date": "2026-06-03", "category": "Inspirasi", "kw": "tempat tidur dengan laci, bed storage"},
    {"slug": "meja-tv-minimalis", "title": "Meja TV Minimalis dengan Penyimpanan: Pilihan Terbaik 2026", "date": "2026-06-04", "category": "Inspirasi", "kw": "meja tv minimalis, rak tv minimalis"},
    {"slug": "dekorasi-ruang-keluarga", "title": "Dekorasi Ruang Keluarga: Ide Nyaman dan Fungsional untuk Keluarga Indonesia", "date": "2026-06-05", "category": "Inspirasi", "kw": "dekorasi ruang keluarga, ruang keluarga minimalis"},
    {"slug": "rak-monitor-meja-kerja", "title": "Rak Monitor Meja Kerja: Ergonomis dan Rapi untuk Produktivitas", "date": "2026-06-06", "category": "Panduan", "kw": "rak monitor, monitor stand meja kerja"},
    {"slug": "cable-management", "title": "Cable Management: Cara Merapikan Kabel di Meja Kerja dan Rumah", "date": "2026-06-07", "category": "Tips & Trik", "kw": "cable management, organizer kabel, merapikan kabel"},
    {"slug": "tempat-dokumen-rumah", "title": "Tempat Dokumen Rumah: Sistem Filing yang Rapi untuk Keluarga", "date": "2026-06-08", "category": "Tips & Trik", "kw": "tempat dokumen, filing cabinet rumah, organizer dokumen"},
    {"slug": "tips-produktif-kerja-dari-rumah", "title": "Tips Produktif Kerja dari Rumah: Tata Ruang dan Organisasi WFH", "date": "2026-06-09", "category": "Lifestyle", "kw": "tips kerja dari rumah, produktif WFH, home office"},
    {"slug": "rak-panci-dapur", "title": "Rak Panci Dapur: Organisasi Peralatan Masak yang Efisien", "date": "2026-06-10", "category": "Panduan", "kw": "rak panci, organizer panci dapur"},
    {"slug": "organizer-kulkas", "title": "Organizer Kulkas: Cara Menata Isi Kulkas agar Rapi dan Hemat Listrik", "date": "2026-06-11", "category": "Tips & Trik", "kw": "organizer kulkas, rak dalam kulkas, menata kulkas"},
    {"slug": "rak-microwave", "title": "Rak Microwave Minimalis: Hemat Meja Dapur dengan Penyimpanan Vertikal", "date": "2026-06-12", "category": "Panduan", "kw": "rak microwave, meja microwave minimalis"},
    {"slug": "tempat-sampah-dapur", "title": "Tempat Sampah Dapur: Panduan Memilih yang Higienis dan Estetik", "date": "2026-06-13", "category": "Panduan", "kw": "tempat sampah dapur, waste bin dapur"},
    {"slug": "organizer-pisau-dapur", "title": "Organizer Pisau Dapur: Penyimpanan Aman untuk Pisau dan Talenan", "date": "2026-06-14", "category": "Panduan", "kw": "tempat pisau dapur, knife organizer, rak talenan"},
    {"slug": "rak-mainan-anak", "title": "Rak Mainan Anak: Solusi Rapi untuk Kamar Bermain si Kecil", "date": "2026-06-15", "category": "Panduan", "kw": "rak mainan anak, toy organizer"},
    {"slug": "organizer-perlengkapan-bayi", "title": "Organizer Perlengkapan Bayi: Menata Kamar Bayi yang Fungsional", "date": "2026-06-16", "category": "Panduan", "kw": "organizer bayi, perlengkapan bayi, menata kamar bayi"},
    {"slug": "meja-belajar-anak", "title": "Meja Belajar Anak Minimalis: Desain Ergonomis untuk Belajar Nyaman", "date": "2026-06-17", "category": "Inspirasi", "kw": "meja belajar anak, meja belajar minimalis"},
    {"slug": "tempat-penyimpanan-mainan", "title": "Tempat Penyimpanan Mainan: Ajari Anak Merapikan dengan Cara Menyenangkan", "date": "2026-06-18", "category": "Tips & Trik", "kw": "tempat penyimpanan mainan, toy storage"},
    {"slug": "vertical-garden-rumah", "title": "Vertical Garden Rumah Minimalis: Panduan Taman Vertikal untuk Pemula", "date": "2026-06-19", "category": "Inspirasi", "kw": "vertical garden, taman vertikal rumah minimalis"},
    {"slug": "rak-tanaman-minimalis", "title": "Rak Tanaman Minimalis: Plant Stand Estetik untuk Indoor dan Outdoor", "date": "2026-06-20", "category": "Inspirasi", "kw": "rak tanaman, plant stand minimalis"},
    {"slug": "peralatan-berkebun", "title": "Peralatan Berkebun dan Cara Menyimpannya dengan Rapi", "date": "2026-06-21", "category": "Tips & Trik", "kw": "peralatan berkebun, alat berkebun, garden tools"},
    {"slug": "rak-sepeda-rumah", "title": "Rak Sepeda di Rumah: Solusi Penyimpanan untuk Hobi Bersepeda", "date": "2026-06-22", "category": "Panduan", "kw": "rak sepeda, bike storage, gantungan sepeda"},
    {"slug": "checklist-pindah-rumah", "title": "Checklist Pindah Rumah: Panduan Lengkap Persiapan Pindahan", "date": "2026-06-23", "category": "Tips & Trik", "kw": "checklist pindah rumah, persiapan pindahan"},
    {"slug": "belanja-hemat-perlengkapan-rumah", "title": "Belanja Hemat Perlengkapan Rumah: Tips Cerdas Isi Rumah Baru", "date": "2026-06-24", "category": "Tips & Trik", "kw": "belanja hemat rumah, perlengkapan rumah baru"},
    {"slug": "vacuum-storage-bag", "title": "Vacuum Storage Bag: Kompres Pakaian dan Selimut hingga 75% Lebih Kecil", "date": "2026-06-25", "category": "Panduan", "kw": "vacuum bag, vacuum storage bag, kantong vakum"},
    {"slug": "under-bed-storage", "title": "Under Bed Storage: Manfaatkan Kolong Tempat Tidur untuk Penyimpanan", "date": "2026-06-26", "category": "Tips & Trik", "kw": "under bed storage, penyimpanan bawah tempat tidur"},
    {"slug": "cara-declutter-rumah", "title": "Cara Declutter Rumah: Metode Mudah Singkirkan Barang Tidak Terpakai", "date": "2026-06-27", "category": "Tips & Trik", "kw": "declutter rumah, cara decluttering"},
    {"slug": "label-organizer", "title": "Label Organizer: Sistem Labeling Cerdas untuk Rumah Super Rapi", "date": "2026-06-28", "category": "Tips & Trik", "kw": "label organizer, labeling penyimpanan"},
    {"slug": "perlengkapan-rumah-minimalis", "title": "Perlengkapan Rumah Minimalis Multifungsi yang Wajib Dimiliki", "date": "2026-06-29", "category": "Panduan", "kw": "perlengkapan rumah minimalis, peralatan rumah tangga wajib"},
    {"slug": "tren-home-organization-2026", "title": "Tren Home Organization 2026: Invisible Storage hingga Smart Organizer", "date": "2026-06-30", "category": "Lifestyle", "kw": "tren home organization 2026, invisible storage, smart organizer"},
]

print("Total: " + str(len(new_articles)))
for i, a in enumerate(new_articles, 1):
    print(str(i) + ". " + a["date"] + " | " + a["slug"] + " | " + a["title"][:60])

with open("new_articles_plan.json", "w", encoding="utf-8") as f:
    json.dump(new_articles, f, ensure_ascii=False, indent=2)
print("\nSaved plan")
