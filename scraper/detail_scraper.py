#!/usr/bin/env python3
"""
Phase 2: Scrape detailed notes, accords, and descriptions from Fragrantica pages.
Uses Playwright to handle Cloudflare. Targets top fragrances by review count.
"""

import asyncio
import json
import sys
import time
from pathlib import Path

DATA_DIR = Path("/workspace/data")


async def scrape_detail(page, url: str, frag_id: str) -> dict:
    """Scrape a single fragrance detail page for notes and accords."""
    try:
        resp = await page.goto(url, wait_until="domcontentloaded", timeout=20000)
        if not resp or resp.status != 200:
            return {}

        await page.wait_for_timeout(1500)
        content = await page.content()

        from bs4 import BeautifulSoup
        soup = BeautifulSoup(content, "lxml")

        result = {}

        # Extract notes - Fragrantica groups them into top/middle/base
        note_groups = {}
        # Look for note pyramid sections
        pyramid_divs = soup.find_all("div", id=lambda x: x and "pyramid" in str(x).lower())
        if not pyramid_divs:
            pyramid_divs = soup.find_all("div", class_=lambda x: x and "pyramid" in str(x).lower())

        # Alternative: look for note spans with specific patterns
        all_notes = []
        note_links = soup.find_all("a", href=lambda x: x and "/notes/" in str(x))
        for link in note_links:
            note_text = link.get_text(strip=True)
            if note_text and len(note_text) > 1:
                all_notes.append(note_text)

        if all_notes:
            result["notes"] = list(dict.fromkeys(all_notes))  # dedupe preserving order

        # Try to extract structured note pyramid
        note_sections = soup.find_all("b")
        current_section = None
        for b_tag in note_sections:
            text = b_tag.get_text(strip=True).lower()
            if "top note" in text:
                current_section = "top"
                note_groups["top"] = []
            elif "middle note" in text or "heart note" in text:
                current_section = "middle"
                note_groups["middle"] = []
            elif "base note" in text:
                current_section = "base"
                note_groups["base"] = []

        # Extract notes per section from the page structure
        note_divs = soup.find_all("div", class_=lambda x: x and "cell" in str(x) if x else False)

        if note_groups:
            result["note_pyramid"] = note_groups

        # Extract main accords
        accords = []
        accord_bars = soup.find_all("div", class_=lambda x: x and "accord" in str(x).lower() if x else False)
        for bar in accord_bars:
            text = bar.get_text(strip=True)
            if text and len(text) > 1 and len(text) < 30:
                accords.append(text)

        # Also try to find accords via their specific structure
        if not accords:
            for div in soup.find_all("div"):
                style = div.get("style", "")
                if "width:" in style and "%" in style:
                    text = div.get_text(strip=True)
                    if text and 2 < len(text) < 25:
                        accords.append(text)

        if accords:
            result["accords"] = list(dict.fromkeys(accords))[:10]

        # Extract description/review text
        desc_div = soup.find("div", itemprop="description")
        if desc_div:
            result["description"] = desc_div.get_text(strip=True)[:500]
        else:
            # Try meta description
            meta = soup.find("meta", {"name": "description"})
            if meta:
                result["description"] = meta.get("content", "")[:500]

        # Extract perfumer info
        perfumer_links = soup.find_all("a", href=lambda x: x and "/noses/" in str(x))
        perfumers = [p.get_text(strip=True) for p in perfumer_links if p.get_text(strip=True)]
        if perfumers:
            result["perfumers"] = list(dict.fromkeys(perfumers))

        return result

    except Exception as e:
        print(f"  Error scraping {frag_id}: {e}", file=sys.stderr)
        return {}


async def main():
    from playwright.async_api import async_playwright

    with open(DATA_DIR / "fragrances_algolia.json") as f:
        fragrances = json.load(f)

    # Load existing detail data if resuming
    detail_path = DATA_DIR / "fragrances_details.json"
    if detail_path.exists():
        with open(detail_path) as f:
            details = json.load(f)
    else:
        details = {}

    # Top N fragrances by reviews that we haven't scraped yet
    TARGET = 500
    to_scrape = [
        f for f in fragrances
        if f["id"] not in details and f.get("url")
    ][:TARGET]

    print(f"Already scraped: {len(details)}")
    print(f"To scrape: {len(to_scrape)}")

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-blink-features=AutomationControlled"]
        )
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            viewport={"width": 1920, "height": 1080},
            locale="en-US",
        )
        page = await context.new_page()
        await page.add_init_script('Object.defineProperty(navigator, "webdriver", {get: () => undefined})')

        for i, frag in enumerate(to_scrape):
            url = frag["url"]
            frag_id = frag["id"]

            detail = await scrape_detail(page, url, frag_id)
            if detail:
                details[frag_id] = detail
                notes_count = len(detail.get("notes", []))
                accords_count = len(detail.get("accords", []))
                print(f"  [{i+1}/{len(to_scrape)}] {frag['name']} - notes:{notes_count} accords:{accords_count}")
            else:
                print(f"  [{i+1}/{len(to_scrape)}] {frag['name']} - FAILED")

            # Save every 25
            if (i + 1) % 25 == 0:
                with open(detail_path, "w") as f:
                    json.dump(details, f, indent=2, ensure_ascii=False)
                print(f"  Saved checkpoint ({len(details)} total)")

            await asyncio.sleep(0.5)

        await browser.close()

    with open(detail_path, "w") as f:
        json.dump(details, f, indent=2, ensure_ascii=False)
    print(f"\nDone! Scraped details for {len(details)} fragrances.")


if __name__ == "__main__":
    asyncio.run(main())
