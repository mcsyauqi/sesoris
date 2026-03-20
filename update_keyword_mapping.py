"""Map all 278 keywords to existing blog articles in Google Spreadsheet."""
import os, json, glob
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

creds = Credentials.from_authorized_user_file('token.json', ['https://www.googleapis.com/auth/spreadsheets'])
if not creds.valid and creds.expired and creds.refresh_token:
    creds.refresh(Request())

service = build('sheets', 'v4', credentials=creds)
SPREADSHEET_ID = '1MY7gCk8Yy3Ebxmqn8eQjTKlVvhhPJbJN1m7AnAkBBbg'

slugs = set()
for f in glob.glob('content/blog/*.json'):
    slugs.add(os.path.basename(f).replace('.json',''))

# Keyword pattern -> target slug (order matters: more specific first)
mapping_rules = [
    # Storage box
    ('storage box plastik vs kain', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('storage box plastik', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('storage box lipat untuk baju', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('storage box lipat', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('storage box mini', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('storage box organizer', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('storage box aesthetic', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('storage box kecil', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('storage box untuk pakaian', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('storage box baju lebaran', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('storage box baju', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('storage box terbaik', 'storage-box-terbaik-untuk-organisasi-rumah'),
    ('storage box murah', 'harga-storage-box'),
    ('jual storage box', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('beli storage box murah', 'harga-storage-box'),
    ('rekomendasi storage box', 'storage-box-terbaik-untuk-organisasi-rumah'),
    ('panduan memilih storage box', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('collapsible storage box', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('foldable storage box', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('plastic storage box', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('container storage box', 'container-box'),
    ('diy storage box', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('diskon 12.12 storage box', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('storage box', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('box storage', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('harga storage box', 'harga-storage-box'),
    # Kotak penyimpanan
    ('kotak penyimpanan barang kecil', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('kotak penyimpanan serbaguna', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('kotak penyimpanan baju', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('kotak penyimpanan barang', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('kotak kayu penyimpanan', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    ('kotak penyimpanan', 'storage-box-terbaik-2026-panduan-lengkap-memilih-kotak-penyimpanan'),
    # Container box
    ('container box', 'container-box'),
    # Rak penyimpanan
    ('rak penyimpanan barang dapur tertutup', 'rak-serbaguna'),
    ('rak penyimpanan barang dapur', 'rak-serbaguna'),
    ('rak penyimpanan barang di gudang', 'rak-serbaguna'),
    ('rak penyimpanan barang tertutup', 'rak-serbaguna'),
    ('rak penyimpanan barang kecil', 'rak-serbaguna'),
    ('rak penyimpanan barang', 'tempat-penyimpanan-barang'),
    ('rak penyimpanan serbaguna', 'rak-serbaguna'),
    ('rak penyimpanan bertingkat roda', 'rak-serbaguna'),
    ('rak penyimpanan dokumen', 'rak-serbaguna'),
    ('rak penyimpanan makanan', 'rak-serbaguna'),
    ('rak penyimpanan untuk kamar kost', 'rak-serbaguna'),
    ('rak penyimpanan murah', 'rak-serbaguna'),
    ('jual rak penyimpanan', 'rak-serbaguna'),
    ('harga rak penyimpanan', 'rak-serbaguna'),
    ('rak penyimpanan', 'rak-serbaguna'),
    # Tempat penyimpanan
    ('tempat penyimpanan baju', 'lemari-penyimpanan'),
    ('tempat penyimpanan sepatu', 'tempat-penyimpanan-barang'),
    ('tempat penyimpanan asi', 'food-container'),
    ('tempat penyimpanan obat', 'tempat-penyimpanan-barang'),
    ('tempat penyimpanan alat kebersihan', 'tempat-penyimpanan-barang'),
    ('tempat penyimpanan makanan', 'cara-menyimpan-makanan-agar-tahan-lama'),
    ('tempat penyimpanan barang', 'tempat-penyimpanan-barang'),
    ('tempat penyimpanan', 'tempat-penyimpanan-barang'),
    # Lemari & organizer
    ('lemari penyimpanan', 'lemari-penyimpanan'),
    ('home organizer', 'home-organizer'),
    ('organizer rumah', 'home-organizer'),
    ('organizer kamar mandi minimalis', 'home-organizer'),
    ('organizer murah', 'home-organizer'),
    ('jual organizer rumah', 'home-organizer'),
    ('keranjang penyimpanan', 'tempat-penyimpanan-barang'),
    # Rak minimalis
    ('rak sepatu minimalis hemat tempat', 'rak-minimalis'),
    ('rak buku minimalis dinding', 'rak-minimalis'),
    ('rak buku anak minimalis', 'rak-minimalis'),
    ('rak minimalis', 'rak-minimalis'),
    ('rak serbaguna', 'rak-serbaguna'),
    # Kitchen set
    ('kitchen set minimalis dapur kecil murah', 'kitchen-set-minimalis-dapur-kecil-murah'),
    ('kitchen set minimalis dapur kecil', 'kitchen-set-minimalis-dapur-kecil-murah'),
    ('kitchen set modern minimalis', 'inspirasi-kitchen-set-minimalis-modern'),
    ('kitchen set minimalis murah', 'kitchen-set-minimalis-dapur-kecil-murah'),
    ('harga kitchen set minimalis dapur kecil', 'harga-kitchen-set-minimalis-dapur-kecil'),
    ('harga kitchen set minimalis', 'harga-kitchen-set-minimalis-dapur-kecil'),
    ('model kitchen set minimalis terbaru', 'inspirasi-kitchen-set-minimalis-modern'),
    ('model kitchen set minimalis', 'inspirasi-kitchen-set-minimalis-modern'),
    ('gambar kitchen set minimalis', 'inspirasi-kitchen-set-minimalis-modern'),
    ('desain kitchen set minimalis', 'inspirasi-kitchen-set-minimalis-modern'),
    ('contoh kitchen set minimalis', 'inspirasi-kitchen-set-minimalis-modern'),
    ('kitchen set minimalis', 'kitchen-set-minimalis'),
    ('kitchen organizer', 'mengorganisir-dapur-kecil-dengan-efektif'),
    ('rekomendasi kitchen organizer', 'mengorganisir-dapur-kecil-dengan-efektif'),
    # Desain/dekorasi dapur
    ('desain dapur minimalis', 'inspirasi-dapur-minimalis'),
    ('desain dapur', 'inspirasi-dapur-minimalis'),
    ('dekorasi dapur minimalis', 'inspirasi-dapur-minimalis'),
    ('dekorasi dapur sederhana', 'inspirasi-dapur-minimalis'),
    ('dekorasi dapur aesthetic', 'inspirasi-dapur-minimalis'),
    ('dekorasi dapur cantik', 'inspirasi-dapur-minimalis'),
    ('dekorasi dapur kecil', 'inspirasi-dapur-minimalis'),
    ('dekorasi dapur sempit', 'inspirasi-dapur-minimalis'),
    ('dekorasi dapur', 'inspirasi-dapur-minimalis'),
    ('inspirasi dekorasi dapur', 'inspirasi-dapur-minimalis'),
    # Rak dapur
    ('rak dapur aluminium', 'rak-aluminium-dapur'),
    ('rak dapur minimalis tempel dinding', 'rak-piring-tempel-tembok-dapur'),
    ('rak dapur minimalis', 'rak-serbaguna'),
    ('rak dapur serbaguna', 'rak-serbaguna'),
    ('rak dapur gantung', 'rak-piring-tempel-tembok-dapur'),
    ('rak dapur sudut serbaguna', 'rak-kolong-dapur'),
    ('rak dapur besi', 'rak-stainless-dapur'),
    ('rak dapur sederhana', 'rak-serbaguna'),
    ('rak dapur murah', 'rak-serbaguna'),
    ('rak dapur terbaik', 'rak-serbaguna'),
    ('jual rak dapur', 'rak-serbaguna'),
    ('harga rak dapur', 'rak-serbaguna'),
    ('beli rak dapur online', 'rak-serbaguna'),
    ('rekomendasi rak dapur', 'rak-serbaguna'),
    ('rak dapur', 'rak-serbaguna'),
    ('rak gantung dapur', 'rak-piring-tempel-tembok-dapur'),
    ('rak dinding dapur', 'rak-piring-tempel-tembok-dapur'),
    # Rak bumbu
    ('rak bumbu dapur', 'tempat-bumbu-dapur'),
    ('inspirasi rak bumbu dapur', 'tempat-bumbu-dapur'),
    # Rak piring
    ('rak piring lemari dapur', 'rak-piring-lemari-dapur'),
    ('rak piring tempel tembok dapur', 'rak-piring-tempel-tembok-dapur'),
    ('rak piring stainless anti karat', 'rak-piring-aluminium-kelebihan-dan-cara-memilih'),
    ('rak piring stainless vs plastik', 'rak-piring-aluminium-kelebihan-dan-cara-memilih'),
    ('rak piring minimalis', 'desain-rak-piring-minimalis-untuk-dapur-modern'),
    ('rak piring dapur', 'rak-piring-lemari-dapur'),
    ('rak piring murah', 'rekomendasi-rak-piring-terbaik'),
    ('rak piring terbaik', 'rekomendasi-rak-piring-terbaik'),
    ('harga rak piring', 'rekomendasi-rak-piring-terbaik'),
    ('jual rak piring', 'rekomendasi-rak-piring-terbaik'),
    ('panduan memilih rak piring', 'rekomendasi-rak-piring-terbaik'),
    ('cara menata rak piring', 'rak-piring-lemari-dapur'),
    ('tips menata rak dapur', 'rak-piring-lemari-dapur'),
    ('rak piring', 'rekomendasi-rak-piring-terbaik'),
    # Rak stainless/aluminium/kolong
    ('rak stainless dapur', 'rak-stainless-dapur'),
    ('rak aluminium dapur', 'rak-aluminium-dapur'),
    ('rak kolong dapur', 'rak-kolong-dapur'),
    ('organizer kolong sink', 'rak-kolong-dapur'),
    # Wadah makanan
    ('wadah makanan untuk jualan unik', 'wadah-makanan-untuk-jualan'),
    ('wadah makanan untuk jualan', 'wadah-makanan-untuk-jualan'),
    ('wadah makanan stainless steel', 'cara-merawat-peralatan-dapur-stainless-steel'),
    ('wadah makanan stainless', 'cara-merawat-peralatan-dapur-stainless-steel'),
    ('wadah makanan plastik vs kaca', 'food-container'),
    ('wadah makanan plastik', 'food-container'),
    ('wadah makanan ramah lingkungan', 'food-container'),
    ('wadah makanan estetik', 'food-container'),
    ('wadah penyimpanan makanan', 'food-container'),
    ('wadah makanan sekali pakai', 'wadah-makanan-untuk-jualan'),
    ('wadah makanan lebaran', 'tempat-kue-lebaran'),
    ('wadah makanan terbaik', 'food-container'),
    ('wadah makanan murah', 'food-container'),
    ('jual wadah makanan', 'food-container'),
    ('rekomendasi wadah makanan', 'food-container'),
    ('wadah makanan', 'food-container'),
    # Food container
    ('food container untuk meal prep', 'food-container'),
    ('food container anti tumpah', 'food-container'),
    ('food container', 'food-container'),
    # Travel organizer
    ('travel bag organizer', 'bag-organizer-travel'),
    ('organizer travel bag', 'bag-organizer-travel'),
    ('travel organizer bag set 7 in 1', 'bag-organizer-travel'),
    ('travel organizer bag', 'bag-organizer-travel'),
    ('travel organizer liburan', 'bag-organizer-travel'),
    ('rekomendasi travel organizer', 'bag-organizer-travel'),
    ('jual travel organizer', 'bag-organizer-travel'),
    ('bag organizer travel', 'bag-organizer-travel'),
    ('bag in bag organizer', 'bag-organizer-travel'),
    ('tas organizer koper', 'bag-organizer-travel'),
    ('tas organizer dokumen perjalanan', 'bag-organizer-travel'),
    ('tas organizer mudik', 'bag-organizer-travel'),
    ('tas gadget organizer multifungsi', 'bag-organizer-travel'),
    ('tas organizer', 'bag-organizer-travel'),
    ('travel pouch organizer', 'bag-organizer-travel'),
    ('travel pouch anti air', 'bag-organizer-travel'),
    ('toiletry bag travel', 'bag-organizer-travel'),
    ('toiletry bag pria', 'bag-organizer-travel'),
    ('cable organizer bag', 'bag-organizer-travel'),
    ('cable organizer travel waterproof', 'bag-organizer-travel'),
    ('pouch serbaguna', 'bag-organizer-travel'),
    ('pouch makeup travel kecil', 'bag-organizer-travel'),
    ('gadget organizer', 'bag-organizer-travel'),
    ('organizer makeup', 'bag-organizer-travel'),
    # Tas
    ('tas travel lipat', 'tas-travel-lipat'),
    ('tas outdoor', 'tas-outdoor'),
    # Packing
    ('packing cubes compression', 'packing-cubes'),
    ('packing cubes', 'packing-cubes'),
    ('packing tips liburan', 'packing-cubes'),
    ('cara packing koper rapi', 'packing-cubes'),
    ('tips packing traveling', 'packing-cubes'),
    # Desk organizer
    ('desk organizer kayu minimalis', 'rak-meja-kerja'),
    ('desk organizer anak sekolah', 'rak-meja-kerja'),
    ('desk organizer', 'rak-meja-kerja'),
    ('jual desk organizer', 'rak-meja-kerja'),
    ('rekomendasi desk organizer', 'rak-meja-kerja'),
    ('rak meja belajar anak', 'rak-meja-kerja'),
    ('rak meja kerja', 'rak-meja-kerja'),
    ('rak buku meja', 'rak-meja-kerja'),
    ('desktop organizer multifungsi', 'rak-meja-kerja'),
    ('desktop organizer', 'rak-meja-kerja'),
    ('drawer organizer', 'rak-meja-kerja'),
    ('organizer meja kantor', 'rak-meja-kerja'),
    ('organizer laci meja kantor', 'rak-meja-kerja'),
    ('stationery organizer', 'tempat-alat-tulis'),
    ('pen holder organizer', 'tempat-alat-tulis'),
    ('tempat alat tulis anak', 'tempat-alat-tulis'),
    ('tempat alat tulis', 'tempat-alat-tulis'),
    ('cable organizer for desk', 'rak-meja-kerja'),
    ('cable organizer meja kerja', 'rak-meja-kerja'),
    ('monitor stand organizer', 'rak-meja-kerja'),
    ('makeup organizer', 'home-organizer'),
    ('desk setup minimalis indonesia', 'cara-menciptakan-home-office-yang-produktif-panduan-lifestyle-2026'),
    ('ide desk setup minimalis', 'cara-menciptakan-home-office-yang-produktif-panduan-lifestyle-2026'),
    ('tips home office rapi', 'cara-menciptakan-home-office-yang-produktif-panduan-lifestyle-2026'),
    ('tips menata meja belajar', 'rak-meja-kerja'),
    # Travel/outdoor
    ('travel accessories', 'travel-accessories'),
    ('aksesoris travel', 'travel-accessories'),
    ('perlengkapan traveling', 'perlengkapan-traveling'),
    ('travel gear', 'travel-gear'),
    ('dry bag', 'dry-bag'),
    ('outdoor gadget', 'travel-gear'),
    ('alat camping', 'alat-camping'),
    # Informational
    ('cara menata rumah kecil agar rapi', 'cara-menata-rumah-kecil-agar-rapi'),
    ('cara merapikan rumah', 'cara-merapikan-rumah'),
    ('cara menata dapur sempit', 'cara-menata-dapur-sempit'),
    ('cara menata kamar kost', 'cara-menata-kamar-kost'),
    ('cara menata rumah minimalis', 'desain-rumah-minimalis'),
    ('cara menata dapur minimalis', 'cara-menata-dapur-minimalis'),
    ('cara menata dapur agar rapi', 'cara-menata-dapur-agar-rapi'),
    ('tips menata rumah minimalis', 'tips-menata-rumah-minimalis-marie-kondo'),
    ('inspirasi dapur minimalis', 'inspirasi-dapur-minimalis'),
    ('cara menyimpan makanan agar tahan lama', 'cara-menyimpan-makanan-agar-tahan-lama'),
    ('cara merapikan lemari baju', 'cara-merapikan-lemari-baju'),
    ('cara menata ruang tamu sempit', 'cara-menata-ruang-tamu-sempit'),
    ('tips menata dapur kecil', 'tips-menata-dapur-kecil'),
    ('tips rumah rapi', 'tips-rumah-rapi'),
    ('tips menata kamar tidur sempit', 'tips-menata-kamar-tidur-sempit'),
    ('ide menata kamar kost', 'ide-menata-kamar-kost'),
    ('inspirasi rumah rapi minimalis', 'inspirasi-rumah-rapi-minimalis'),
    ('cara menata meja kerja', 'rak-meja-kerja'),
    ('cara menyimpan bumbu dapur', 'tempat-bumbu-dapur'),
    ('cara decluttering rumah', 'cara-merapikan-rumah'),
    ('panduan decluttering rumah', 'cara-merapikan-rumah'),
    ('tips merapikan rumah sebelum lebaran', 'bersih-bersih-rumah-sebelum-lebaran'),
    ('tips menyimpan makanan di kulkas', 'cara-menyimpan-makanan-agar-tahan-lama'),
    ('tips dapur bersih dan rapi', 'cara-menata-dapur-agar-rapi'),
    ('ide storage rumah', 'tempat-penyimpanan-barang'),
    ('ide penyimpanan barang di rumah kecil', 'cara-menata-rumah-kecil-agar-rapi'),
    ('ide penataan dapur sempit', 'cara-menata-dapur-sempit'),
    ('ide menata rumah subsidi', 'cara-menata-rumah-kecil-agar-rapi'),
    ('inspirasi dekorasi kamar tidur', 'inspirasi-dekorasi-kamar-tidur-2026'),
    ('inspirasi rak dinding', 'rak-minimalis'),
    ('panduan metode konmari', 'tips-menata-rumah-minimalis-marie-kondo'),
    ('metode konmari 2026', 'tips-menata-rumah-minimalis-marie-kondo'),
    ('tips organisasi rumah', 'tips-rumah-rapi'),
    ('ide storage kamar tidur', 'tips-menata-kamar-tidur-sempit'),
    # Comparison
    ('rak dapur kayu vs besi', 'rak-serbaguna'),
    # Lebaran/Seasonal
    ('toples kue lebaran', 'toples-kue-lebaran'),
    ('tempat kue lebaran', 'tempat-kue-lebaran'),
    ('bersih-bersih rumah sebelum lebaran', 'bersih-bersih-rumah-sebelum-lebaran'),
    ('dekorasi rumah lebaran', 'dekorasi-rumah-lebaran'),
    ('wadah makanan lebaran', 'tempat-kue-lebaran'),
    ('persiapan rumah ramadan', 'bersih-bersih-rumah-sebelum-lebaran'),
    ('menata dapur sebelum lebaran', 'bersih-bersih-rumah-sebelum-lebaran'),
    ('rak hidangan lebaran', 'toples-kue-lebaran'),
    ('promo lebaran home organizer', 'home-organizer'),
    ('promo 11.11 rak dapur', 'rak-serbaguna'),
    # Sustainable/trending
    ('sustainable living tips', 'sustainable-living-mulai-dari-rumah'),
    ('tips sustainable living', 'sustainable-living-mulai-dari-rumah'),
    ('living sustainable life', 'sustainable-living-mulai-dari-rumah'),
    ('sustainable living', 'sustainable-living-mulai-dari-rumah'),
    ('sustainable storage bamboo rattan', 'sustainable-living-mulai-dari-rumah'),
    ('aesthetic room organization', 'inspirasi-rumah-rapi-minimalis'),
    ('japandi style storage', 'rak-minimalis'),
    ('decluttering minimalis', 'cara-merapikan-rumah'),
    ('warm minimalism indonesia', 'gaya-hidup-minimalis-transformasi-rumah-storage-solutions-2026'),
    ('multifunctional furniture storage', 'tempat-penyimpanan-barang'),
    ('smart storage rumah kecil', 'cara-menata-rumah-kecil-agar-rapi'),
    ('rak bambu aesthetic', 'rak-minimalis'),
    ('home organization trend 2026', 'home-organizer'),
    ('eco friendly home organizer', 'home-organizer'),
    # Existing articles
    ('review koleksi kontainer serbaguna sesoris', 'review-koleksi-kontainer-serbaguna-sesoris'),
    ('mengorganisir dapur kecil dengan efektif', 'mengorganisir-dapur-kecil-dengan-efektif'),
    ('sustainable living mulai dari rumah', 'sustainable-living-mulai-dari-rumah'),
    ('inspirasi dekorasi kamar tidur 2026', 'inspirasi-dekorasi-kamar-tidur-2026'),
    ('cara merawat peralatan dapur stainless steel', 'cara-merawat-peralatan-dapur-stainless-steel'),
    ('tips menata rumah minimalis marie kondo', 'tips-menata-rumah-minimalis-marie-kondo'),
    ('rekomendasi rak piring terbaik', 'rekomendasi-rak-piring-terbaik'),
    ('tutorial membuat daftar inventaris rumah tangga', 'tutorial-membuat-daftar-inventaris-rumah-tangga'),
    ('tutorial membuat spice rack diy dapur kecil', 'tutorial-membuat-spice-rack-diy-dapur-kecil'),
    ('wadah makanan untuk jualan', 'wadah-makanan-untuk-jualan'),
]

# Read current data
result = service.spreadsheets().values().get(
    spreadsheetId=SPREADSHEET_ID,
    range="'Keyword Database'!A:J"
).execute()
rows = result.get('values', [])

updates = []
unmapped = []
for row in rows[1:]:
    keyword = row[1].lower().strip()
    slug_found = None

    # Try exact slug match
    potential = keyword.replace(' ', '-')
    if potential in slugs:
        slug_found = potential
    else:
        # Try mapping rules
        for pattern, slug in mapping_rules:
            if keyword == pattern.lower():
                if slug in slugs:
                    slug_found = slug
                    break
        if not slug_found:
            for pattern, slug in mapping_rules:
                if pattern.lower() in keyword:
                    if slug in slugs:
                        slug_found = slug
                        break

    if slug_found:
        url = f'https://www.sesoris.com/blog/{slug_found}'
        updates.append(['Published', slug_found, url])
    else:
        updates.append(['Planned', '', ''])
        unmapped.append((row[0], keyword))

body = {'values': updates}
service.spreadsheets().values().update(
    spreadsheetId=SPREADSHEET_ID,
    range="'Keyword Database'!H2",
    valueInputOption='RAW',
    body=body
).execute()

mapped = sum(1 for u in updates if u[0] == 'Published')
print(f'Mapped: {mapped} / {len(updates)}')
print(f'Unmapped: {len(unmapped)}')
if unmapped:
    for no, kw in unmapped:
        print(f'  #{no} "{kw}"')
