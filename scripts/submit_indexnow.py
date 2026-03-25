#!/usr/bin/env python
"""
Submit URLs to IndexNow API for instant Bing/Yandex indexing.

Usage:
  python scripts/submit_indexnow.py                    # Submit all URLs from sitemap.xml
  python scripts/submit_indexnow.py https://url1 ...   # Submit specific URLs
"""

import sys
import json
import urllib.request
import xml.etree.ElementTree as ET

INDEXNOW_KEY = "79b9964b914803633dc6634b50b80797"
HOST = "www.sesoris.com"
SITEMAP_URL = f"https://{HOST}/sitemap.xml"
KEY_LOCATION = f"https://{HOST}/{INDEXNOW_KEY}.txt"

# Submit to multiple engines for maximum coverage
ENDPOINTS = [
    ("Bing", "https://www.bing.com/indexnow"),
    ("Yandex", "https://yandex.com/indexnow"),
    ("IndexNow", "https://api.indexnow.org/indexnow"),
]


def fetch_sitemap_urls() -> list[str]:
    """Fetch and parse sitemap.xml to extract all URLs."""
    print(f"Fetching sitemap from {SITEMAP_URL} ...")
    req = urllib.request.Request(SITEMAP_URL, headers={"User-Agent": "IndexNow-Submit/1.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        xml_data = resp.read()

    root = ET.fromstring(xml_data)
    # Handle XML namespace
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [loc.text for loc in root.findall(".//sm:loc", ns) if loc.text]

    if not urls:
        # Try without namespace (some sitemaps don't use it)
        urls = [loc.text for loc in root.findall(".//loc") if loc.text]

    print(f"Found {len(urls)} URLs in sitemap\n")
    return urls


def submit_to_endpoint(name: str, endpoint: str, urls: list[str]) -> None:
    """Submit URLs to a single IndexNow endpoint."""
    batch_size = 10000
    for i in range(0, len(urls), batch_size):
        batch = urls[i : i + batch_size]
        payload = json.dumps({
            "host": HOST,
            "key": INDEXNOW_KEY,
            "keyLocation": KEY_LOCATION,
            "urlList": batch,
        }).encode("utf-8")

        req = urllib.request.Request(
            endpoint,
            data=payload,
            headers={
                "Content-Type": "application/json; charset=utf-8",
                "User-Agent": "IndexNow-Submit/1.0",
            },
            method="POST",
        )

        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                status = resp.status
        except urllib.error.HTTPError as e:
            status = e.code

        if status in (200, 202):
            print(f"  {name}: OK (HTTP {status}) - {len(batch)} URLs accepted")
        else:
            print(f"  {name}: Warning (HTTP {status})")


def submit_urls(urls: list[str]) -> None:
    """Submit URLs to all IndexNow endpoints."""
    if not urls:
        print("No URLs to submit.")
        return

    print(f"Submitting {len(urls)} URLs to IndexNow engines...")
    for name, endpoint in ENDPOINTS:
        submit_to_endpoint(name, endpoint, urls)

    print(f"\nDone. Submitted {len(urls)} URLs to {len(ENDPOINTS)} engines.")


def main():
    if len(sys.argv) > 1:
        urls = sys.argv[1:]
        print(f"Submitting {len(urls)} URL(s) from command line arguments\n")
    else:
        urls = fetch_sitemap_urls()

    submit_urls(urls)


if __name__ == "__main__":
    main()
