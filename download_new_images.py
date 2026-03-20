"""Download images for 28 new blog articles from Unsplash."""
import os
import requests
from PIL import Image
from io import BytesIO

TARGET_SIZE = (1200, 675)
OUT_DIR = "public/images/blog"

# slug -> Unsplash photo ID
PHOTOS = {
    "teras-rumah-minimalis": "xMObPS6V_gY",
    "warna-cat-rumah-minimalis": "pJadQetzTkI",
    "desain-rumah-minimalis-3-kamar": "xtLIgpytpck",
    "desain-rumah-minimalis-2-lantai": "MP0bgaS_d1c",
    "interior-rumah-minimalis": "Ixp4YhCKZkI",
    "desain-dapur-minimalis": "sIcUGIm0Lcw",
    "denah-rumah-minimalis": "V3TnGf6Kbe0",
    "rak-dapur": "bkXzABDt08Q",
    "wadah-makanan": "9Sz3oHKVJBk",
    "desk-organizer": "q3o_8MtL2qs",
    "dekorasi-dapur": "MP0IUfwrn0A",
    "kotak-penyimpanan": "4ujhCgx_IBI",
    "rak-penyimpanan": "wivlCFq56VQ",
    "tempat-penyimpanan-baju": "HcXMF3KWMHI",
    "organizer-makeup": "4LiIbCMoGdY",
    "tempat-penyimpanan-asi": "6SwOOX7GGAE",
    "rak-penyimpanan-makanan": "vA1L1jRTM70",
    "rak-gantung-dapur": "FV3GConVSss",
    "tempat-penyimpanan-sepatu": "pr5pBW4hBDw",
    "keranjang-penyimpanan": "9z7iruA6T9Y",
    "rak-penyimpanan-gudang": "RJQE64NmC_o",
    "storage-box-mini": "JVD3XPqjLaQ",
    "rak-dinding-dapur": "R-LK3sqLiBw",
    "tempat-penyimpanan-obat": "fV4-BKiX0kM",
    "storage-box-lipat": "EGW5cK6MVWI",
    "rak-dapur-besi": "R9OS29xJb-8",
    "diy-storage-box": "ae0NC5l4fU0",
    "storage-box-baju": "AvhMzXIOejI",
}

FALLBACK_IDS = [
    "R-LK3sqLiBw", "FV3GConVSss", "bkXzABDt08Q",
    "MP0IUfwrn0A", "q3o_8MtL2qs", "sIcUGIm0Lcw"
]

os.makedirs(OUT_DIR, exist_ok=True)

def download_and_convert(photo_id, slug, fallback_idx=0):
    url = f"https://images.unsplash.com/photo-{photo_id}?w=1200&h=675&fit=crop&auto=format"
    try:
        resp = requests.get(url, timeout=15)
        if resp.status_code != 200:
            raise Exception(f"HTTP {resp.status_code}")
        img = Image.open(BytesIO(resp.content)).convert("RGB")
        img = img.resize(TARGET_SIZE, Image.LANCZOS)
        out = os.path.join(OUT_DIR, f"{slug}.webp")
        img.save(out, "WEBP", quality=85)
        print(f"OK: {slug} ({photo_id})")
        return True
    except Exception as e:
        print(f"FAIL: {slug} ({photo_id}) - {e}")
        if fallback_idx < len(FALLBACK_IDS):
            fb = FALLBACK_IDS[fallback_idx]
            print(f"  Trying fallback {fb}...")
            return download_and_convert(fb, slug, fallback_idx + 1)
        return False

success = 0
for slug, pid in PHOTOS.items():
    out_path = os.path.join(OUT_DIR, f"{slug}.webp")
    if os.path.exists(out_path):
        print(f"SKIP: {slug} (already exists)")
        success += 1
        continue
    if download_and_convert(pid, slug):
        success += 1

print(f"\nDone: {success}/{len(PHOTOS)} images")
