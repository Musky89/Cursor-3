#!/usr/bin/env python3
"""Download thumbnail images for all fragrances."""

import json
import os
import time
from pathlib import Path
from curl_cffi import requests as cf_requests

DATA_DIR = Path("/workspace/data")
IMG_DIR = DATA_DIR / "images"
IMG_DIR.mkdir(exist_ok=True)

with open(DATA_DIR / "fragrances_algolia.json") as f:
    fragrances = json.load(f)

# Only download for top 600 by reviews (the most important ones)
top_frags = sorted(fragrances, key=lambda x: x.get("num_reviews", 0), reverse=True)[:600]

downloaded = 0
skipped = 0
failed = 0

for i, frag in enumerate(top_frags):
    frag_id = frag["id"]
    thumb_url = frag.get("thumbnail", "")
    pic_url = frag.get("picture", "")

    thumb_path = IMG_DIR / f"{frag_id}_thumb.jpg"
    pic_path = IMG_DIR / f"{frag_id}_full.jpg"

    for url, path in [(thumb_url, thumb_path), (pic_url, pic_path)]:
        if path.exists():
            skipped += 1
            continue
        if not url:
            continue
        try:
            resp = cf_requests.get(url, impersonate="chrome", timeout=15)
            if resp.status_code == 200 and len(resp.content) > 100:
                with open(path, "wb") as f:
                    f.write(resp.content)
                downloaded += 1
            else:
                failed += 1
        except Exception as e:
            failed += 1

    if (i + 1) % 50 == 0:
        print(f"Progress: {i+1}/{len(top_frags)} - downloaded:{downloaded} skipped:{skipped} failed:{failed}")

    time.sleep(0.1)

print(f"\nDone! Downloaded:{downloaded} Skipped:{skipped} Failed:{failed}")
