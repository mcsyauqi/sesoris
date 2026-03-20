"""
Download stock photos from Unsplash and convert to 1200x675 WebP for the Sesoris blog.
"""

import os
import time
import requests
from PIL import Image
from io import BytesIO

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "public", "images", "blog")

# Each entry: (filename, primary_id, [fallback_ids])
IMAGES = [
    ("bag-organizer-travel-hero.webp", "1553062407-98eeb64c6a62", [
        "1581553680321-4fffff48e024", "1596178065871-8f4e7bfb3b0d"]),
    ("bag-organizer-travel-section1.webp", "1596394516093-501ba68a0ba6", [
        "1581553680321-4fffff48e024", "1553062407-98eeb64c6a62"]),
    ("bag-organizer-travel-section2.webp", "1581553680321-4fffff48e024", [
        "1596394516093-501ba68a0ba6", "1553062407-98eeb64c6a62"]),
    ("tas-travel-lipat-hero.webp", "1520333789090-1afc82db536a", [
        "1501555088652-021faa106b9b", "1527631746610-bca00a040d60"]),
    ("tas-travel-lipat-section1.webp", "1473625247510-8ceb1760943f", [
        "1500835556837-99ac94a94552", "1488085061387-422e29b40080"]),
    ("tas-travel-lipat-section2.webp", "1544620347-c4fd4a3d5957", [
        "1476514525535-07fb3b4ae5f1", "1500835556837-99ac94a94552"]),
    ("packing-cubes-hero.webp", "1469854523086-cc02fe5d8800", [
        "1596394516093-501ba68a0ba6", "1488646953014-85cb44e25828"]),
    ("packing-cubes-section1.webp", "1530521954074-e64f6810b32d", [
        "1488646953014-85cb44e25828", "1469854523086-cc02fe5d8800"]),
    ("packing-cubes-section2.webp", "1488646953014-85cb44e25828", [
        "1530521954074-e64f6810b32d", "1469854523086-cc02fe5d8800"]),
    ("travel-accessories-hero.webp", "1452421822248-d4c2b47f0c81", [
        "1468818438311-4bab781ab9b8", "1506905925346-21bda4d32df4"]),
    ("travel-accessories-section1.webp", "1468818438311-4bab781ab9b8", [
        "1452421822248-d4c2b47f0c81", "1506905925346-21bda4d32df4"]),
    ("travel-accessories-section2.webp", "1506905925346-21bda4d32df4", [
        "1452421822248-d4c2b47f0c81", "1468818438311-4bab781ab9b8"]),
    ("tas-outdoor-hero.webp", "1501555088652-021faa106b9b", [
        "1551632811-561732d1e306", "1464207687429-7505649dae38"]),
    ("tas-outdoor-section1.webp", "1551632811-561732d1e306", [
        "1501555088652-021faa106b9b", "1464207687429-7505649dae38"]),
    ("tas-outdoor-section2.webp", "1464207687429-7505649dae38", [
        "1501555088652-021faa106b9b", "1551632811-561732d1e306"]),
    ("perlengkapan-traveling-hero.webp", "1488085061387-422e29b40080", [
        "1500835556837-99ac94a94552", "1476514525535-07fb3b4ae5f1"]),
    ("perlengkapan-traveling-section1.webp", "1500835556837-99ac94a94552", [
        "1488085061387-422e29b40080", "1476514525535-07fb3b4ae5f1"]),
    ("perlengkapan-traveling-section2.webp", "1476514525535-07fb3b4ae5f1", [
        "1500835556837-99ac94a94552", "1488085061387-422e29b40080"]),
    ("travel-gear-hero.webp", "1527631746610-bca00a040d60", [
        "1504280390367-361c6d9f38f4", "1510312305653-8ed496efae75"]),
    ("travel-gear-section1.webp", "1504280390367-361c6d9f38f4", [
        "1527631746610-bca00a040d60", "1510312305653-8ed496efae75"]),
    ("travel-gear-section2.webp", "1510312305653-8ed496efae75", [
        "1504280390367-361c6d9f38f4", "1527631746610-bca00a040d60"]),
    ("dry-bag-hero.webp", "1530541930197-dc21e432b56c", [
        "1544551763-46a013bb70d5", "1560807707-8cc77767d783"]),
    ("dry-bag-section1.webp", "1544551763-46a013bb70d5", [
        "1530541930197-dc21e432b56c", "1560807707-8cc77767d783"]),
    ("dry-bag-section2.webp", "1560807707-8cc77767d783", [
        "1544551763-46a013bb70d5", "1530541930197-dc21e432b56c"]),
]

TARGET_W, TARGET_H = 1200, 675
WEBP_QUALITY = 85


def build_url(photo_id: str) -> str:
    return (
        f"https://images.unsplash.com/photo-{photo_id}"
        f"?w={TARGET_W}&h={TARGET_H}&fit=crop&auto=format"
    )


def download_and_save(filename: str, primary_id: str, fallbacks: list[str]) -> bool:
    out_path = os.path.join(OUTPUT_DIR, filename)
    ids_to_try = [primary_id] + fallbacks

    for photo_id in ids_to_try:
        url = build_url(photo_id)
        try:
            print(f"  Trying photo-{photo_id} ...")
            resp = requests.get(url, timeout=30, allow_redirects=True)
            if resp.status_code == 404:
                print(f"    404 - skipping this ID")
                continue
            resp.raise_for_status()

            img = Image.open(BytesIO(resp.content))
            img = img.convert("RGB")
            img = img.resize((TARGET_W, TARGET_H), Image.LANCZOS)
            img.save(out_path, "WEBP", quality=WEBP_QUALITY)

            size_kb = os.path.getsize(out_path) / 1024
            print(f"    Saved {filename} ({size_kb:.0f} KB)")
            return True

        except requests.exceptions.RequestException as e:
            print(f"    Network error: {e}")
            continue
        except Exception as e:
            print(f"    Processing error: {e}")
            continue

    print(f"  FAILED: Could not download {filename} with any ID")
    return False


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    total = len(IMAGES)
    success = 0
    failed = []

    print(f"Downloading {total} images to {OUTPUT_DIR}\n")

    for i, (filename, primary_id, fallbacks) in enumerate(IMAGES, 1):
        print(f"[{i}/{total}] {filename}")
        if download_and_save(filename, primary_id, fallbacks):
            success += 1
        else:
            failed.append(filename)
        # Small delay to be polite to Unsplash
        if i < total:
            time.sleep(0.5)

    print(f"\nDone: {success}/{total} succeeded")
    if failed:
        print(f"Failed: {', '.join(failed)}")


if __name__ == "__main__":
    main()
