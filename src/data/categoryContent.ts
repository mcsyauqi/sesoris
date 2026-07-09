export interface CategorySEOContent {
  seoTitle: string;
  seoDescription: string;
  intro: string;
  sections: { heading: string; text: string }[];
  relatedCategories: string[];
}

export const categoryContent: Record<string, CategorySEOContent> = {
  'home-living': {
    seoTitle: 'Produk Rumah & Dekorasi | Organizer Rumah - Sesoris',
    seoDescription: 'Belanja produk rumah dan dekorasi terkurasi di Sesoris, dari rak dinding, organizer, keranjang dekoratif, hingga solusi storage. Gratis ongkir di atas Rp 800.000.',
    intro: 'Rapikan setiap sudut rumah dengan koleksi Rumah & Dekorasi Sesoris. Temukan produk pilihan untuk membantu ruang terasa lebih tertata, indah, dan fungsional, mulai dari rak dinding, organizer tempel, keranjang dekoratif, sampai rak display.',
    sections: [
      {
        heading: 'Solusi Organizer Rumah',
        text: 'Rumah yang rapi dimulai dari alat penyimpanan yang tepat. Produk organizer Sesoris membantu memaksimalkan ruang tanpa mengorbankan tampilan. Pilih rak modular, storage box bertumpuk, keranjang, dan organizer serbaguna untuk kamar, ruang tamu, dapur, maupun area kerja.',
      },
      {
        heading: 'Dekorasi Dinding & Display',
        text: 'Dinding bisa menjadi area penyimpanan sekaligus dekorasi. Koleksi ini mencakup floating shelf, picture ledge, hook dekoratif, dan rak pajangan dalam berbagai ukuran untuk gaya rumah minimalis, hangat, atau modern.',
      },
      {
        heading: 'Keranjang & Storage Bin',
        text: 'Keranjang dan storage bin membantu barang kecil tetap mudah ditemukan. Gunakan untuk aksesori kamar, handuk, selimut, mainan anak, perlengkapan mandi, atau stok rumah tangga. Setiap produk dipilih agar tetap praktis sekaligus enak dilihat.',
      },
      {
        heading: 'Mengapa Pilih Sesoris untuk Dekorasi Rumah',
        text: 'Sesoris mengkurasi produk rumah berdasarkan fungsi, material, daya tahan, dan desain. Tujuannya sederhana: membuat rumah lebih nyaman dihuni dengan produk yang mudah dipakai setiap hari. Nikmati juga gratis ongkir untuk pesanan di atas Rp 800.000.',
      },
    ],
    relatedCategories: ['kitchen-dining', 'personal-care', 'gift-sets'],
  },
  'kitchen-dining': {
    seoTitle: 'Produk Dapur & Makan | Storage Dapur - Sesoris',
    seoDescription: 'Temukan perlengkapan dapur dan makan terkurasi di Sesoris, dari rak piring, kontainer makanan, talenan, organizer bumbu, hingga alat saji pilihan.',
    intro: 'Buat dapur lebih rapi dan aktivitas masak lebih nyaman dengan koleksi Dapur & Makan Sesoris. Pilih produk praktis untuk persiapan masak, penyimpanan bahan, pengeringan alat makan, dan kebutuhan meja makan harian.',
    sections: [
      {
        heading: 'Organizer Dapur Harian',
        text: 'Dapur yang tertata membuat proses memasak lebih cepat. Koleksi ini mencakup organizer bumbu, sekat laci, rak panci, rak piring, dan wadah kulkas agar setiap barang punya tempat yang jelas.',
      },
      {
        heading: 'Rak Piring & Pengering',
        text: 'Rak piring pilihan Sesoris menggabungkan desain ringkas dan material tahan lama. Beberapa model memiliki area terpisah untuk piring, mangkuk, gelas, dan sendok garpu, lengkap dengan tray pengering agar meja tetap bersih.',
      },
      {
        heading: 'Kontainer Makanan',
        text: 'Kontainer makanan membantu stok dapur lebih awet dan pantry lebih rapi. Pilih wadah kedap udara, bahan kaca, plastik bebas BPA, atau stainless steel untuk bahan kering, sisa makanan, dan meal prep.',
      },
      {
        heading: 'Peralatan Makan & Saji',
        text: 'Untuk makan harian maupun acara keluarga, Sesoris menyediakan alat saji, mangkuk, placemat, table runner, dan aksesori meja yang fungsional serta tetap terlihat rapi saat digunakan.',
      },
    ],
    relatedCategories: ['home-living', 'tools-gadgets', 'gift-sets'],
  },
  'tools-gadgets': {
    seoTitle: 'Alat & Gadget | Peralatan Praktis Harian - Sesoris',
    seoDescription: 'Belanja alat praktis dan gadget harian pilihan di Sesoris, termasuk multi-tool, gadget dapur, aksesori rumah pintar, dan perlengkapan outdoor.',
    intro: 'Koleksi Alat & Gadget Sesoris berisi produk pilihan yang membantu menyelesaikan masalah harian dengan cara lebih mudah. Temukan multi-tool, gadget dapur, alat perawatan rumah, sampai aksesori outdoor yang ringkas dan berguna.',
    sections: [
      {
        heading: 'Multi-Tool & Everyday Carry',
        text: 'Multi-tool cocok untuk pengguna yang ingin selalu siap. Produk pilihan Sesoris memakai material kuat, bentuk ringkas, dan fungsi praktis untuk perbaikan ringan, camping, perjalanan, atau kebutuhan harian.',
      },
      {
        heading: 'Gadget Dapur Praktis',
        text: 'Masak lebih efisien dengan alat dapur seperti timer, timbangan digital, saringan lipat, slicer, dan aksesori kecil lain yang membantu menghemat waktu tanpa membuat dapur penuh.',
      },
      {
        heading: 'Perawatan Rumah & DIY',
        text: 'Lengkapi rumah dengan obeng presisi, meteran, alat level, cable management, dan hook serbaguna. Produk ini memudahkan pekerjaan kecil di rumah tetap rapi dan cepat selesai.',
      },
    ],
    relatedCategories: ['home-living', 'tech-accessories', 'kitchen-dining'],
  },
  'gift-sets': {
    seoTitle: 'Paket Hadiah | Kado Pilihan untuk Berbagai Momen - Sesoris',
    seoDescription: 'Belanja paket hadiah Sesoris untuk ulang tahun, housewarming, hari raya, wedding gift, dan corporate gifting. Siap diberikan dengan kemasan rapi.',
    intro: 'Mencari hadiah jadi lebih mudah dengan koleksi Paket Hadiah Sesoris. Pilihan kado terkurasi untuk ulang tahun, rumah baru, hari raya, pernikahan, dan kebutuhan corporate gifting.',
    sections: [
      {
        heading: 'Paket Hadiah Rumah Baru',
        text: 'Bantu teman atau keluarga menata rumah baru dengan paket hadiah berisi organizer, perlengkapan dapur, dan dekorasi praktis yang benar-benar bisa dipakai sehari-hari.',
      },
      {
        heading: 'Kado Ulang Tahun & Perayaan',
        text: 'Pilih paket self-care, perlengkapan dapur, dekorasi rumah, atau aksesori praktis sesuai karakter penerima. Setiap paket disiapkan agar terasa personal dan mudah diberikan.',
      },
      {
        heading: 'Corporate & Bulk Gifting',
        text: 'Untuk klien, karyawan, atau partner bisnis, Sesoris menyediakan opsi pembelian jumlah besar. Hubungi tim kami untuk rekomendasi produk, opsi kemasan, dan kebutuhan branding.',
      },
    ],
    relatedCategories: ['personal-care', 'home-living', 'kitchen-dining'],
  },
  'personal-care': {
    seoTitle: 'Produk Perawatan Diri | Wellness & Beauty - Sesoris',
    seoDescription: 'Temukan produk perawatan diri terkurasi di Sesoris, termasuk diffuser aromaterapi, skincare tools, organizer kamar mandi, dan aksesori wellness.',
    intro: 'Koleksi Perawatan Diri Sesoris berisi produk pilihan untuk rutinitas self-care yang lebih nyaman. Temukan diffuser aromaterapi, skincare tools, organizer kamar mandi, dan aksesori wellness harian.',
    sections: [
      {
        heading: 'Aromaterapi & Wellness',
        text: 'Ciptakan suasana rumah yang lebih tenang dengan diffuser ultrasonik dan aksesori aromaterapi. Produk ini membantu menyebarkan aroma secara halus tanpa panas berlebih.',
      },
      {
        heading: 'Skincare Tools & Aksesori',
        text: 'Lengkapi rutinitas skincare dengan facial roller, gua sha, cleansing brush, dan aksesori lain yang mudah digunakan. Setiap produk dipilih berdasarkan material dan kenyamanan pemakaian.',
      },
      {
        heading: 'Organizer Kamar Mandi',
        text: 'Organizer kamar mandi membantu skincare, kosmetik, sikat gigi, handuk kecil, dan perlengkapan mandi tetap tertata. Material tahan air dan mudah dibersihkan membuatnya cocok untuk penggunaan harian.',
      },
    ],
    relatedCategories: ['home-living', 'gift-sets', 'tech-accessories'],
  },
  'tech-accessories': {
    seoTitle: 'Aksesori Teknologi | Gadget & Organizer Kabel - Sesoris',
    seoDescription: 'Belanja aksesori teknologi pilihan di Sesoris, dari earbuds, charging station, organizer kabel, hingga gadget rumah pintar.',
    intro: 'Tetap produktif dan rapi dengan koleksi Aksesori Teknologi Sesoris. Produk pilihan untuk gaya hidup modern, mulai dari wireless earbuds, charging station, organizer kabel, hingga gadget rumah pintar.',
    sections: [
      {
        heading: 'Audio Wireless & Earbuds',
        text: 'Nikmati musik, podcast, dan panggilan dengan earbuds atau headphone pilihan yang nyaman dipakai. Banyak produk mendukung koneksi stabil, baterai tahan lama, dan desain ringkas.',
      },
      {
        heading: 'Charging Station & Power Accessories',
        text: 'Kurangi kabel berantakan dengan charging station multi-device. Produk ini membantu mengisi daya ponsel, tablet, earbuds, dan smartwatch dari satu area yang lebih rapi.',
      },
      {
        heading: 'Organizer Kabel',
        text: 'Gunakan cable clip, velcro organizer, cable box, dan aksesori manajemen kabel untuk meja kerja, rak TV, kamar, atau home office agar area terlihat bersih.',
      },
    ],
    relatedCategories: ['tools-gadgets', 'home-living', 'personal-care'],
  },
  'bags-pouches': {
    seoTitle: 'Tas & Pouch | Organizer Travel dan Storage - Sesoris',
    seoDescription: 'Belanja tas, pouch, dan organizer bawa barang di Sesoris, termasuk travel pouch, tote bag, storage pouch, dan organizer perlengkapan harian.',
    intro: 'Tetap rapi saat di rumah, kantor, maupun perjalanan dengan koleksi Tas & Pouch Sesoris. Pilih mesh pouch, travel organizer, canvas tote, dan toiletry bag untuk menyimpan barang kecil agar mudah ditemukan.',
    sections: [
      {
        heading: 'Tas Organizer Travel',
        text: 'Travel pouch dan toiletry bag membantu perlengkapan mandi, kabel, obat, kosmetik, dan dokumen tetap terpisah. Kompartemen yang jelas membuat packing dan unpacking lebih cepat.',
      },
      {
        heading: 'Storage Pouch & Organizer',
        text: 'Storage pouch serbaguna cocok untuk laci, rak, tas kerja, dan koper. Pilih material mesh, canvas, atau PVC sesuai kebutuhan agar isi mudah terlihat dan tidak tercecer.',
      },
      {
        heading: 'Canvas Tote & Tas Harian',
        text: 'Canvas tote praktis untuk belanja, kerja, gym, atau perjalanan singkat. Pegangan kuat, kantong dalam, dan desain simpel membuatnya nyaman dipakai berulang.',
      },
      {
        heading: 'Mengapa Pilih Tas & Pouch Sesoris',
        text: 'Setiap tas dan pouch dipilih berdasarkan kualitas jahitan, resleting, material, dan fungsi. Nikmati gratis ongkir untuk pesanan di atas Rp 800.000.',
      },
    ],
    relatedCategories: ['home-living', 'personal-care', 'tools-gadgets'],
  },
  'office-desk': {
    seoTitle: 'Aksesori Meja Kerja | Organizer Meja - Sesoris',
    seoDescription: 'Belanja aksesori meja kerja di Sesoris, mulai dari organizer bambu, lampu meja LED, alat kabel, hingga perlengkapan produktivitas untuk workspace rapi.',
    intro: 'Bangun meja kerja yang lebih tenang dan produktif dengan koleksi Meja Kerja Sesoris. Kategori ini mencakup organizer, lampu kerja, audio wireless, dan aksesori praktis untuk home office, ruang belajar, atau workstation kecil.',
    sections: [
      {
        heading: 'Organizer Meja untuk Workflow Harian',
        text: 'Organizer meja membantu memisahkan alat tulis, perangkat, catatan, dan barang kecil agar permukaan kerja tetap bersih. Cocok untuk pekerja remote, pelajar, dan kreator.',
      },
      {
        heading: 'Lampu & Aksesori Fokus',
        text: 'Kerja fokus butuh pencahayaan nyaman dan distraksi yang minim. Pilih lampu meja LED, charging wireless, dan aksesori audio yang mendukung membaca, menulis, meeting, dan produksi konten.',
      },
      {
        heading: 'Setup Kantor di Ruang Kecil',
        text: 'Anda tidak perlu ruangan besar untuk membuat home office yang fungsional. Aksesori meja ringkas, alat kabel, dan organizer multi-fungsi membuat area kecil tetap mudah dirawat.',
      },
      {
        heading: 'Mengapa Pilih Produk Meja Kerja Sesoris',
        text: 'Sesoris mengkurasi aksesori meja berdasarkan fungsi, material, dan desain bersih agar meja terlihat lebih rapi, nyaman dipakai, dan mudah dijaga setiap hari.',
      },
    ],
    relatedCategories: ['home-living', 'tech-accessories', 'tools-gadgets'],
  },
  'outdoor-travel': {
    seoTitle: 'Perlengkapan Outdoor Travel | Organizer dan Tas Travel',
    seoDescription: 'Belanja perlengkapan outdoor travel di Sesoris: toiletry bag, mesh pouch, hanging organizer, dan tas ringan untuk perjalanan yang lebih rapi.',
    intro: 'Koleksi Outdoor Travel Sesoris dibuat untuk perjalanan yang lebih ringan, bersih, dan mudah diatur. Temukan travel organizer, toiletry bag gantung, mesh zipper pouch, gym drawstring bag, dan alat packing ringkas.',
    sections: [
      {
        heading: 'Organizer Travel untuk Packing Rapi',
        text: 'Organizer travel membagi tas menjadi area jelas untuk toiletries, kabel, dokumen, pakaian, dan barang kecil. Gunakan pouch kecil untuk charger dan obat, pouch sedang untuk skincare, dan organizer besar untuk kebutuhan kamar mandi atau pakaian.',
      },
      {
        heading: 'Tas Outdoor untuk Mobilitas Harian',
        text: 'Outdoor travel tidak selalu berarti hiking jauh. Banyak pelanggan membutuhkan tas ringan untuk commuting, gym, day trip, sekolah, atau agenda akhir pekan. Produk dipilih berdasarkan material, kompartemen, dan kemudahan akses.',
      },
      {
        heading: 'Cara Memilih Travel Gear',
        text: 'Mulai dari barang yang paling sering membuat tas berantakan. Pilih toiletry bag dengan lapisan tahan air untuk perlengkapan mandi, mesh pouch untuk kabel, dan hanging organizer jika sering berpindah hotel atau penginapan.',
      },
      {
        heading: 'Jalur Belanja Terkait',
        text: 'Produk outdoor travel cocok dipadukan dengan Tas & Pouch untuk daily carry, Aksesori Teknologi untuk manajemen kabel, Perawatan Diri untuk toiletry, dan Alat & Gadget untuk perlengkapan praktis.',
      },
      {
        heading: 'Mengapa Pilih Outdoor Travel Sesoris',
        text: 'Sesoris memilih travel gear berdasarkan organisasi sederhana, material tahan lama, dan desain praktis. Tujuannya bukan menambah barang, tetapi membuat setiap barang lebih mudah ditemukan dan terlindungi.',
      },
    ],
    relatedCategories: ['bags-pouches', 'tech-accessories', 'personal-care', 'tools-gadgets'],
  },
};
