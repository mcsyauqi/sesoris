"""Download images for 28 new blog articles using Unsplash source API."""
import os
import requests
from PIL import Image
from io import BytesIO
import time

TARGET_SIZE = (1200, 675)
OUT_DIR = "public/images/blog"
os.makedirs(OUT_DIR, exist_ok=True)

# slug -> search keywords for Unsplash
SEARCHES = {
    "teras-rumah-minimalis": "minimalist terrace house tropical",
    "warna-cat-rumah-minimalis": "minimalist house paint color interior",
    "desain-rumah-minimalis-3-kamar": "minimalist house architecture modern",
    "desain-rumah-minimalis-2-lantai": "two story modern house minimalist",
    "interior-rumah-minimalis": "minimalist interior living room",
    "desain-dapur-minimalis": "small kitchen minimalist design",
    "denah-rumah-minimalis": "house floor plan architecture",
    "rak-dapur": "kitchen shelf rack organizer",
    "wadah-makanan": "food container storage kitchen",
    "desk-organizer": "desk organizer workspace tidy",
    "dekorasi-dapur": "kitchen decoration minimalist aesthetic",
    "kotak-penyimpanan": "storage box container organize",
    "rak-penyimpanan": "storage shelf organizer home",
    "tempat-penyimpanan-baju": "closet clothes organizer wardrobe",
    "organizer-makeup": "makeup organizer cosmetics storage",
    "tempat-penyimpanan-asi": "breast milk storage baby bottle",
    "rak-penyimpanan-makanan": "pantry organizer food storage shelf",
    "rak-gantung-dapur": "hanging kitchen rack shelf",
    "tempat-penyimpanan-sepatu": "shoe rack storage organizer",
    "keranjang-penyimpanan": "storage basket woven home decor",
    "rak-penyimpanan-gudang": "warehouse storage shelving heavy duty",
    "storage-box-mini": "small storage box organizer mini",
    "rak-dinding-dapur": "wall mounted kitchen shelf",
    "tempat-penyimpanan-obat": "medicine cabinet storage first aid",
    "storage-box-lipat": "foldable storage box collapsible",
    "rak-dapur-besi": "metal kitchen rack iron shelf",
    "diy-storage-box": "diy craft storage box cardboard",
    "storage-box-baju": "clothes storage box wardrobe organizer",
}

success = 0
for slug, keywords in SEARCHES.items():
    out_path = os.path.join(OUT_DIR, f"{slug}.webp")
    if os.path.exists(out_path):
        print(f"SKIP: {slug}")
        success += 1
        continue

    kw = keywords.replace(" ", ",")
    url = f"https://source.unsplash.com/1200x675/?{kw}"
    try:
        resp = requests.get(url, timeout=20, allow_redirects=True)
        if resp.status_code == 200 and len(resp.content) > 5000:
            img = Image.open(BytesIO(resp.content)).convert("RGB")
            img = img.resize(TARGET_SIZE, Image.LANCZOS)
            img.save(out_path, "WEBP", quality=85)
            print(f"OK: {slug}")
            success += 1
        else:
            print(f"FAIL: {slug} - status={resp.status_code} size={len(resp.content)}")
    except Exception as e:
        print(f"FAIL: {slug} - {e}")

    time.sleep(1)  # Rate limit

print(f"\nDone: {success}/{len(SEARCHES)}")
