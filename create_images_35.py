"""Create hero images for 35 new articles from existing similar images."""
import os
from PIL import Image

TARGET_SIZE = (1200, 675)
OUT_DIR = "public/images/blog"

FALLBACK = {
    "rak-kamar-mandi": "rak-piring-tempel-tembok-dapur",
    "organizer-kamar-mandi": "home-organizer",
    "keranjang-laundry": "keranjang-penyimpanan",
    "rak-mesin-cuci": "rak-serbaguna",
    "tempat-sabun-kamar-mandi": "home-organizer",
    "rak-buku-minimalis": "rak-minimalis",
    "lemari-pakaian-minimalis": "lemari-penyimpanan",
    "tempat-tidur-dengan-storage": "inspirasi-kamar-tidur-minimalis-sederhana-yang-bikin-betah-2026",
    "meja-tv-minimalis": "inspirasi-ruang-tamu-minimalis-modern-2026",
    "dekorasi-ruang-keluarga": "inspirasi-ruang-tamu-minimalis-modern-2026",
    "rak-monitor-meja-kerja": "rak-meja-kerja",
    "cable-management": "desk-organizer",
    "tempat-dokumen-rumah": "tempat-alat-tulis",
    "tips-produktif-kerja-dari-rumah": "cara-menciptakan-home-office-yang-produktif-panduan-lifestyle-2026",
    "rak-panci-dapur": "rak-kolong-dapur",
    "organizer-kulkas": "food-container",
    "rak-microwave": "rak-aluminium-dapur",
    "tempat-sampah-dapur": "cara-menata-dapur-agar-rapi",
    "organizer-pisau-dapur": "peralatan-dapur-wajib-untuk-rumah-tangga-baru",
    "rak-mainan-anak": "rak-serbaguna",
    "organizer-perlengkapan-bayi": "tempat-penyimpanan-asi",
    "meja-belajar-anak": "tempat-alat-tulis",
    "tempat-penyimpanan-mainan": "kotak-penyimpanan",
    "vertical-garden-rumah": "teras-rumah-minimalis",
    "rak-tanaman-minimalis": "rak-minimalis",
    "peralatan-berkebun": "alat-camping",
    "rak-sepeda-rumah": "rak-penyimpanan-gudang",
    "checklist-pindah-rumah": "cara-merapikan-rumah",
    "belanja-hemat-perlengkapan-rumah": "peralatan-dapur-wajib-untuk-rumah-tangga-baru",
    "vacuum-storage-bag": "storage-box-lipat",
    "under-bed-storage": "storage-box-baju",
    "cara-declutter-rumah": "cara-merapikan-rumah",
    "label-organizer": "home-organizer",
    "perlengkapan-rumah-minimalis": "peralatan-dapur-wajib-untuk-rumah-tangga-baru",
    "tren-home-organization-2026": "inspirasi-rumah-rapi-minimalis",
}

success = 0
for i, (slug, src_slug) in enumerate(FALLBACK.items()):
    out_path = os.path.join(OUT_DIR, slug + "-hero.webp")
    if os.path.exists(out_path):
        print("SKIP: " + slug)
        success += 1
        continue

    src_path = os.path.join(OUT_DIR, src_slug + "-hero.webp")
    if not os.path.exists(src_path):
        print("MISS SRC: " + src_slug + "-hero.webp for " + slug)
        continue

    img = Image.open(src_path).convert("RGB")
    w, h = img.size
    cx = (i % 7) * 3 + 3
    cy = (i % 5) * 3 + 3
    img = img.crop((cx, cy, w - cx, h - cy))
    img = img.resize(TARGET_SIZE, Image.LANCZOS)
    img.save(out_path, "WEBP", quality=85)
    print("OK: " + slug + " <- " + src_slug)
    success += 1

print("\nDone: " + str(success) + "/" + str(len(FALLBACK)))
