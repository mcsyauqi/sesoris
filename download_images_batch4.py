"""
Batch 4: Download home interior/decoration themed images from Unsplash,
resize to 1200x675, and save as WebP for the Sesoris blog.
"""

import os
import requests
from PIL import Image
from io import BytesIO
import time

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "public", "images", "blog")

FALLBACKS = {
    "home": [
        "photo-1600210492493-0946911123ea",
        "photo-1560448204-e02f11c3d0e2",
        "photo-1585128792020-803d29415281",
    ],
    "kitchen": [
        "photo-1556909114-f6e7ad7d3136",
        "photo-1556909172-54557c7e4fb7",
        "photo-1600585152220-90363fe7e115",
    ],
    "cookies": [
        "photo-1607920592519-bab25aab376e",
        "photo-1548365328-8c6db3220e4c",
        "photo-1509440159596-0249088772ff",
    ],
}

IMAGES = [
    ("cara-menata-ruang-tamu-sempit-hero.webp", "photo-1583847268964-b28dc8f51f92", "home"),
    ("cara-menata-ruang-tamu-sempit-section1.webp", "photo-1556909114-f6e7ad7d3136", "home"),
    ("cara-menata-ruang-tamu-sempit-section2.webp", "photo-1586023492125-27b2c045efd7", "home"),
    ("cara-menata-dapur-minimalis-hero.webp", "photo-1565538810643-b5bdb714032a", "kitchen"),
    ("cara-menata-dapur-minimalis-section1.webp", "photo-1556909114-44e3e70034e2", "kitchen"),
    ("cara-menata-dapur-minimalis-section2.webp", "photo-1600585152220-90363fe7e115", "kitchen"),
    ("cara-menata-dapur-agar-rapi-hero.webp", "photo-1556909190-a32fb30bdf4a", "kitchen"),
    ("cara-menata-dapur-agar-rapi-section1.webp", "photo-1600607687644-aac4c3eac7f4", "kitchen"),
    ("cara-menata-dapur-agar-rapi-section2.webp", "photo-1556909172-54557c7e4fb7", "kitchen"),
    ("inspirasi-dapur-minimalis-hero.webp", "photo-1600566753086-00f18d616e14", "kitchen"),
    ("inspirasi-dapur-minimalis-section1.webp", "photo-1507089947368-19c1da9775ae", "kitchen"),
    ("inspirasi-dapur-minimalis-section2.webp", "photo-1631679706909-1844bbd07221", "kitchen"),
    ("tips-menata-dapur-kecil-hero.webp", "photo-1493809842364-78f1bb95d95d", "kitchen"),
    ("tips-menata-dapur-kecil-section1.webp", "photo-1609799517470-4dc0ffbfb2a0", "kitchen"),
    ("tips-menata-dapur-kecil-section2.webp", "photo-1558618666-fcd25c85f82e", "kitchen"),
    ("tips-rumah-rapi-hero.webp", "photo-1616046229478-9901c5536a45", "home"),
    ("tips-rumah-rapi-section1.webp", "photo-1600585154340-be6161a56a0c", "home"),
    ("tips-rumah-rapi-section2.webp", "photo-1600607687939-ce8a6c25118c", "home"),
    ("tips-menata-kamar-tidur-sempit-hero.webp", "photo-1522708323590-d24dbb6b0267", "home"),
    ("tips-menata-kamar-tidur-sempit-section1.webp", "photo-1560448204-e02f11c3d0e2", "home"),
    ("tips-menata-kamar-tidur-sempit-section2.webp", "photo-1502672260266-1c1ef2d93688", "home"),
    ("ide-menata-kamar-kost-hero.webp", "photo-1540518614846-7eded433c457", "home"),
    ("ide-menata-kamar-kost-section1.webp", "photo-1513694203232-719a280e022f", "home"),
    ("ide-menata-kamar-kost-section2.webp", "photo-1560185007-cde436f6a4d0", "home"),
    ("inspirasi-rumah-rapi-minimalis-hero.webp", "photo-1600585154340-be6161a56a0c", "home"),
    ("inspirasi-rumah-rapi-minimalis-section1.webp", "photo-1600607687939-ce8a6c25118c", "home"),
    ("inspirasi-rumah-rapi-minimalis-section2.webp", "photo-1616046229478-9901c5536a45", "home"),
    ("toples-kue-lebaran-hero.webp", "photo-1558961363-fa8fdf82db35", "cookies"),
    ("toples-kue-lebaran-section1.webp", "photo-1486427944544-d2c246c4df14", "cookies"),
    ("toples-kue-lebaran-section2.webp", "photo-1499636136210-6f4ee915583e", "cookies"),
]

TARGET_W, TARGET_H = 1200, 675
WEBP_QUALITY = 85


def build_url(photo_id):
    return f"https://images.unsplash.com/{photo_id}?w=1200&h=675&fit=crop&auto=format"


def download_image(photo_id):
    """Download image bytes from Unsplash. Returns bytes or None."""
    url = build_url(photo_id)
    try:
        resp = requests.get(url, timeout=30)
        if resp.status_code == 200:
            return resp.content
        print(f"    HTTP {resp.status_code} for {photo_id}")
    except requests.RequestException as e:
        print(f"    Request error for {photo_id}: {e}")
    return None


def process_and_save(image_bytes, output_path):
    """Resize to 1200x675 and save as WebP."""
    img = Image.open(BytesIO(image_bytes))
    img = img.convert("RGB")
    img = img.resize((TARGET_W, TARGET_H), Image.LANCZOS)
    img.save(output_path, "WEBP", quality=WEBP_QUALITY)
    size_kb = os.path.getsize(output_path) / 1024
    return size_kb


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    success, failed = 0, 0

    for i, (filename, photo_id, category) in enumerate(IMAGES, 1):
        output_path = os.path.join(OUTPUT_DIR, filename)
        print(f"[{i:02d}/{len(IMAGES)}] {filename}")

        # Try primary ID
        data = download_image(photo_id)

        # Try fallbacks on failure
        if data is None:
            print(f"  Primary failed, trying fallbacks for '{category}'...")
            for fb_id in FALLBACKS.get(category, []):
                if fb_id == photo_id:
                    continue
                data = download_image(fb_id)
                if data is not None:
                    print(f"  Using fallback: {fb_id}")
                    break

        if data is None:
            print(f"  FAILED - no image downloaded")
            failed += 1
            continue

        try:
            size_kb = process_and_save(data, output_path)
            print(f"  OK - {size_kb:.0f} KB")
            success += 1
        except Exception as e:
            print(f"  ERROR processing: {e}")
            failed += 1

        # Small delay to be polite to Unsplash
        time.sleep(0.3)

    print(f"\nDone: {success} success, {failed} failed out of {len(IMAGES)} total.")


if __name__ == "__main__":
    main()
