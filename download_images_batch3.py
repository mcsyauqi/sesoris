"""
Batch 3: Download stock photos from Unsplash and convert to 1200x675 webp for Sesoris blog.
"""

import os
import requests
from PIL import Image
from io import BytesIO

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "public", "images", "blog")
os.makedirs(OUTPUT_DIR, exist_ok=True)

FALLBACK_IDS = [
    "photo-1484154218962-a197022b5858",
    "photo-1556910103-1c02745aae4d",
    "photo-1600210492486-724fe5c67fb0",
    "photo-1505691938895-1758d7feb511",
    "photo-1618221195710-dd6b41faaea6",
]

IMAGES = [
    # Kitchen/home themed
    ("rak-stainless-dapur-hero.webp", "photo-1556909114-44e3e70034e2"),
    ("rak-stainless-dapur-section1.webp", "photo-1556909172-54557c7e4fb7"),
    ("rak-stainless-dapur-section2.webp", "photo-1600585152220-90363fe7e115"),
    ("rak-kolong-dapur-hero.webp", "photo-1556909190-a32fb30bdf4a"),
    ("rak-kolong-dapur-section1.webp", "photo-1493809842364-78f1bb95d95d"),
    ("rak-kolong-dapur-section2.webp", "photo-1631679706909-1844bbd07221"),
    ("rak-meja-kerja-hero.webp", "photo-1518455027359-f3f8164ba6bd"),
    ("rak-meja-kerja-section1.webp", "photo-1600566752355-35792bedcfea"),
    ("rak-meja-kerja-section2.webp", "photo-1542546068979-b6affb46ea8f"),
    ("tempat-alat-tulis-hero.webp", "photo-1513542789411-b6a5d4f31634"),
    ("tempat-alat-tulis-section1.webp", "photo-1456735190827-d1262f71b8a3"),
    ("tempat-alat-tulis-section2.webp", "photo-1434030216411-0b793f4b4173"),
    # Home organization/interior themed
    ("cara-merapikan-rumah-hero.webp", "photo-1616046229478-9901c5536a45"),
    ("cara-merapikan-rumah-section1.webp", "photo-1600607687939-ce8a6c25118c"),
    ("cara-merapikan-rumah-section2.webp", "photo-1600585154340-be6161a56a0c"),
    ("cara-menata-dapur-sempit-hero.webp", "photo-1556909114-f6e7ad7d3136"),
    ("cara-menata-dapur-sempit-section1.webp", "photo-1609799517470-4dc0ffbfb2a0"),
    ("cara-menata-dapur-sempit-section2.webp", "photo-1558618666-fcd25c85f82e"),
    ("cara-menata-kamar-kost-hero.webp", "photo-1522708323590-d24dbb6b0267"),
    ("cara-menata-kamar-kost-section1.webp", "photo-1560448204-e02f11c3d0e2"),
    ("cara-menata-kamar-kost-section2.webp", "photo-1502672260266-1c1ef2d93688"),
]

TARGET_WIDTH = 1200
TARGET_HEIGHT = 675


def build_url(photo_id: str) -> str:
    return f"https://images.unsplash.com/{photo_id}?w=1200&h=675&fit=crop&auto=format"


def download_and_convert(filename: str, photo_id: str) -> bool:
    output_path = os.path.join(OUTPUT_DIR, filename)

    # Try primary ID, then fallbacks
    ids_to_try = [photo_id] + FALLBACK_IDS

    for idx, pid in enumerate(ids_to_try):
        url = build_url(pid)
        label = "primary" if idx == 0 else f"fallback #{idx}"
        try:
            print(f"  Trying {label}: {pid}")
            resp = requests.get(url, timeout=30)
            resp.raise_for_status()

            img = Image.open(BytesIO(resp.content))
            img = img.convert("RGB")
            img = img.resize((TARGET_WIDTH, TARGET_HEIGHT), Image.LANCZOS)
            img.save(output_path, "WEBP", quality=85)

            size_kb = os.path.getsize(output_path) / 1024
            print(f"  -> Saved {filename} ({size_kb:.1f} KB)")
            return True

        except Exception as e:
            print(f"  [WARN] {label} failed: {e}")

    print(f"  [ERROR] All attempts failed for {filename}")
    return False


def main():
    print(f"Downloading {len(IMAGES)} images to {OUTPUT_DIR}\n")
    success = 0
    failed = 0

    for i, (filename, photo_id) in enumerate(IMAGES, 1):
        print(f"[{i}/{len(IMAGES)}] {filename}")
        if download_and_convert(filename, photo_id):
            success += 1
        else:
            failed += 1
        print()

    print(f"Done! {success} succeeded, {failed} failed.")


if __name__ == "__main__":
    main()
