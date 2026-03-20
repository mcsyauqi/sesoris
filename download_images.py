"""
Download stock photos from Unsplash and convert to 1200x675 webp for Sesoris blog.
"""

import os
import io
import time
import urllib.request
from PIL import Image

OUTPUT_DIR = os.path.join("D:", os.sep, "Projects", "Sesoris", "sesoris", "public", "images", "blog")

# Pool of known working Unsplash photo IDs grouped by theme
ORGANIZATION_IDS = [
    "photo-1556909114-f6e7ad7d3136",
    "photo-1616046229478-9901c5536a45",
    "photo-1600585152220-90363fe7e115",
    "photo-1556909172-54557c7e4fb7",
    "photo-1600607687939-ce8a6c25118c",
    "photo-1600566752355-35792bedcfea",
]

CONTAINER_IDS = [
    "photo-1565538810643-b5bdb714032a",
    "photo-1507003211169-0a1dd7228f2d",
    "photo-1600585154340-be6161a56a0c",
]

SPICE_IDS = [
    "photo-1584568694244-14fbdf83bd30",
    "photo-1556910103-1c02745aae4d",
    "photo-1558618666-fcd25c85f82e",
]

KITCHEN_IDS = [
    "photo-1556909190-a32fb30bdf4a",
    "photo-1631679706909-1844bbd07221",
    "photo-1556909114-44e3e70034e2",
]

DISH_RACK_IDS = [
    "photo-1609799517470-4dc0ffbfb2a0",
    "photo-1493809842364-78f1bb95d95d",
    "photo-1600585152220-90363fe7e115",
]

WALL_SHELF_IDS = [
    "photo-1600607687939-ce8a6c25118c",
    "photo-1556909114-f6e7ad7d3136",
    "photo-1616046229478-9901c5536a45",
]

# Mapping: filename -> list of photo IDs to try (in order)
IMAGES = {
    # Home organizer
    "home-organizer-hero.webp": ORGANIZATION_IDS,
    "home-organizer-section1.webp": [
        "photo-1556909172-54557c7e4fb7",
        "photo-1565538810643-b5bdb714032a",
        "photo-1616046229478-9901c5536a45",
    ],
    "home-organizer-section2.webp": [
        "photo-1616046229478-9901c5536a45",
        "photo-1556909114-f6e7ad7d3136",
        "photo-1600566752355-35792bedcfea",
    ],
    # Container box
    "container-box-hero.webp": CONTAINER_IDS,
    "container-box-section1.webp": [
        "photo-1507003211169-0a1dd7228f2d",
        "photo-1565538810643-b5bdb714032a",
        "photo-1556909172-54557c7e4fb7",
    ],
    "container-box-section2.webp": [
        "photo-1600585154340-be6161a56a0c",
        "photo-1600585152220-90363fe7e115",
        "photo-1556909114-f6e7ad7d3136",
    ],
    # Tempat bumbu dapur (spice rack)
    "tempat-bumbu-dapur-hero.webp": SPICE_IDS,
    "tempat-bumbu-dapur-section1.webp": [
        "photo-1556910103-1c02745aae4d",
        "photo-1584568694244-14fbdf83bd30",
        "photo-1558618666-fcd25c85f82e",
    ],
    "tempat-bumbu-dapur-section2.webp": [
        "photo-1558618666-fcd25c85f82e",
        "photo-1556909190-a32fb30bdf4a",
        "photo-1631679706909-1844bbd07221",
    ],
    # Rak piring lemari dapur (dish rack kitchen cabinet)
    "rak-piring-lemari-dapur-hero.webp": DISH_RACK_IDS,
    "rak-piring-lemari-dapur-section1.webp": [
        "photo-1493809842364-78f1bb95d95d",
        "photo-1556909190-a32fb30bdf4a",
        "photo-1631679706909-1844bbd07221",
    ],
    "rak-piring-lemari-dapur-section2.webp": [
        "photo-1631679706909-1844bbd07221",
        "photo-1600585152220-90363fe7e115",
        "photo-1556909114-44e3e70034e2",
    ],
    # Rak aluminium dapur (aluminum kitchen rack)
    "rak-aluminium-dapur-hero.webp": KITCHEN_IDS,
    "rak-aluminium-dapur-section1.webp": [
        "photo-1631679706909-1844bbd07221",
        "photo-1556909114-44e3e70034e2",
        "photo-1493809842364-78f1bb95d95d",
    ],
    "rak-aluminium-dapur-section2.webp": [
        "photo-1556909114-44e3e70034e2",
        "photo-1600585152220-90363fe7e115",
        "photo-1556909190-a32fb30bdf4a",
    ],
    # Rak piring tempel tembok dapur (wall mounted dish rack)
    "rak-piring-tempel-tembok-dapur-hero.webp": WALL_SHELF_IDS,
    "rak-piring-tempel-tembok-dapur-section1.webp": [
        "photo-1556909114-f6e7ad7d3136",
        "photo-1493809842364-78f1bb95d95d",
        "photo-1600607687939-ce8a6c25118c",
    ],
    "rak-piring-tempel-tembok-dapur-section2.webp": [
        "photo-1616046229478-9901c5536a45",
        "photo-1600566752355-35792bedcfea",
        "photo-1600585154340-be6161a56a0c",
    ],
}

TARGET_WIDTH = 1200
TARGET_HEIGHT = 675
WEBP_QUALITY = 85


def download_and_convert(filename, photo_ids):
    """Download from Unsplash, resize to 1200x675, save as webp."""
    output_path = os.path.join(OUTPUT_DIR, filename)

    if os.path.exists(output_path):
        print(f"  SKIP (already exists): {filename}")
        return True

    for photo_id in photo_ids:
        url = f"https://images.unsplash.com/{photo_id}?w=1200&h=675&fit=crop&auto=format"
        print(f"  Trying {photo_id} ...")
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            })
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read()

            img = Image.open(io.BytesIO(data))
            img = img.convert("RGB")
            img = img.resize((TARGET_WIDTH, TARGET_HEIGHT), Image.LANCZOS)
            img.save(output_path, "WEBP", quality=WEBP_QUALITY)
            size_kb = os.path.getsize(output_path) / 1024
            print(f"  OK: {filename} ({size_kb:.0f} KB)")
            return True
        except Exception as e:
            print(f"  FAIL ({photo_id}): {e}")
            time.sleep(0.5)

    print(f"  ERROR: Could not download any photo for {filename}")
    return False


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Processing {len(IMAGES)} images...\n")

    success = 0
    failed = 0

    for filename, photo_ids in IMAGES.items():
        print(f"[{success + failed + 1}/{len(IMAGES)}] {filename}")
        if download_and_convert(filename, photo_ids):
            success += 1
        else:
            failed += 1
        # Small delay between downloads to be polite
        time.sleep(0.3)

    print(f"\nDone: {success} succeeded, {failed} failed out of {len(IMAGES)} total.")


if __name__ == "__main__":
    main()
