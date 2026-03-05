#!/usr/bin/env python3
"""
Phase 2: Scrape detailed notes, accords, perfumers, and descriptions
from Fragrantica pages using curl_cffi to bypass Cloudflare.
"""

import json
import sys
import time
import re
from pathlib import Path
from curl_cffi import requests as cf_requests
from bs4 import BeautifulSoup

DATA_DIR = Path("/workspace/data")


def extract_notes_structured(soup):
    """Extract top/middle/base note pyramid."""
    pyramid = {"top": [], "middle": [], "base": []}

    pyramid_div = soup.find("div", id="pyramid")
    if not pyramid_div:
        pyramid_div = soup.find("div", class_=lambda x: x and "pyramid" in str(x))

    note_containers = soup.find_all("div", {"style": lambda x: x and "margin-bottom" in str(x) if x else False})

    current_section = None
    for elem in soup.find_all(["b", "h4", "p", "span"]):
        text = elem.get_text(strip=True).lower()
        if "top note" in text:
            current_section = "top"
        elif "middle note" in text or "heart note" in text:
            current_section = "middle"
        elif "base note" in text:
            current_section = "base"

    return pyramid


def scrape_detail(url: str) -> dict:
    """Scrape a single fragrance detail page."""
    try:
        resp = cf_requests.get(url, impersonate="chrome", timeout=20)
        if resp.status_code != 200:
            return {}

        soup = BeautifulSoup(resp.text, "lxml")

        result = {}

        # Notes
        note_links = soup.find_all("a", href=lambda x: x and "/notes/" in str(x))
        notes = []
        for link in note_links:
            text = link.get_text(strip=True)
            if text and len(text) > 1 and text != "Notes":
                notes.append(text)
        if notes:
            result["notes"] = list(dict.fromkeys(notes))

        # Accords - found in specific divs with style width percentages
        accords = []
        # Method 1: Look for accord bars
        for div in soup.find_all("div", class_=lambda x: x and "accord" in str(x).lower() if x else False):
            text = div.get_text(strip=True)
            if text and 2 < len(text) < 30:
                accords.append(text)

        # Method 2: Look for the accord section with colored bars
        if not accords:
            accord_section = soup.find("div", string=re.compile(r"main accords", re.I))
            if not accord_section:
                for div in soup.find_all("div"):
                    if div.get_text(strip=True) == "Main accords":
                        accord_section = div
                        break

            if accord_section:
                parent = accord_section.parent
                if parent:
                    for bar in parent.find_all("div", style=True):
                        style = bar.get("style", "")
                        if "width:" in style and "%" in style:
                            text = bar.get_text(strip=True)
                            if text and 2 < len(text) < 30:
                                accords.append(text)

        # Method 3: regex on full page for accord data
        if not accords:
            accord_matches = re.findall(
                r'<div[^>]*style="[^"]*width:\s*[\d.]+%[^"]*"[^>]*>\s*<div[^>]*>\s*([A-Za-z\s]+?)\s*</div>',
                resp.text
            )
            accords = [a.strip() for a in accord_matches if 2 < len(a.strip()) < 30]

        if accords:
            result["accords"] = list(dict.fromkeys(accords))[:10]

        # Description
        desc_div = soup.find("div", itemprop="description")
        if desc_div:
            result["description"] = desc_div.get_text(strip=True)[:500]
        else:
            for p in soup.find_all("p"):
                text = p.get_text(strip=True)
                if len(text) > 100 and ("fragrance" in text.lower() or "perfume" in text.lower()):
                    result["description"] = text[:500]
                    break

        # Perfumers
        perfumer_links = soup.find_all("a", href=lambda x: x and "/noses/" in str(x))
        perfumers = [p.get_text(strip=True) for p in perfumer_links if p.get_text(strip=True) and p.get_text(strip=True) != "Perfumers"]
        if perfumers:
            result["perfumers"] = list(dict.fromkeys(perfumers))

        # Longevity/Sillage - look for vote bar data
        # Season data
        # Price value

        return result

    except Exception as e:
        print(f"  Error: {e}", file=sys.stderr)
        return {}


def main():
    with open(DATA_DIR / "fragrances_algolia.json") as f:
        fragrances = json.load(f)

    detail_path = DATA_DIR / "fragrances_details.json"
    if detail_path.exists():
        with open(detail_path) as f:
            details = json.load(f)
    else:
        details = {}

    TARGET = 500
    to_scrape = [
        f for f in fragrances
        if f["id"] not in details and f.get("url")
    ][:TARGET]

    print(f"Already scraped: {len(details)}")
    print(f"To scrape: {len(to_scrape)}")

    failed = 0
    for i, frag in enumerate(to_scrape):
        url = frag["url"]
        frag_id = frag["id"]

        detail = scrape_detail(url)
        if detail and detail.get("notes"):
            details[frag_id] = detail
            n = len(detail.get("notes", []))
            a = len(detail.get("accords", []))
            p = len(detail.get("perfumers", []))
            print(f"  [{i+1}/{len(to_scrape)}] {frag['name']} - notes:{n} accords:{a} perfumers:{p}")
            failed = 0
        else:
            print(f"  [{i+1}/{len(to_scrape)}] {frag['name']} - FAILED")
            failed += 1
            if failed > 5:
                print("Too many consecutive failures, stopping.")
                break

        if (i + 1) % 50 == 0:
            with open(detail_path, "w") as f:
                json.dump(details, f, indent=2, ensure_ascii=False)
            print(f"  --- Checkpoint: {len(details)} total ---")

        time.sleep(1.0)

    with open(detail_path, "w") as f:
        json.dump(details, f, indent=2, ensure_ascii=False)
    print(f"\nDone! Scraped details for {len(details)} fragrances.")


if __name__ == "__main__":
    main()
