#!/usr/bin/env python3
"""
Phase 1: Scrape oud fragrances from Fragrantica's Algolia index.
Gets names, brands, years, images, ratings, reviews, gender for ~1000 fragrances.
"""

import requests
import json
import time
import sys

APP_ID = "FGVI612DFZ"
API_KEY = "ODRkMmYxOWVkY2I2MGE1MGM0M2I4M2FlMzliMWI5ZTk5MTkwZWEwNTBhODBmZjdhZjBlZTJmODJhMzgwZjI0OXZhbGlkVW50aWw9MTc3NDQzMTc2Nw=="
INDEX = "fragrantica_perfumes"
BASE_URL = f"https://{APP_ID.lower()}-dsn.algolia.net/1/indexes/*/queries"

ATTRS = json.dumps([
    "naslov", "dizajner", "godina", "url.EN", "picture", "thumbnail",
    "spol", "num_reviews.EN", "rating", "objectID", "slug", "collection",
    "designer_meta.category", "designer_meta.country", "id"
])

QUERIES = ["oud", "agarwood", "bakhoor", "dehn al oud", "oud oil"]


def fetch_page(query: str, page: int) -> dict:
    params = {
        "x-algolia-api-key": API_KEY,
        "x-algolia-application-id": APP_ID,
    }
    body = {
        "requests": [{
            "indexName": INDEX,
            "params": f"query={query}&hitsPerPage=30&page={page}&attributesToRetrieve={ATTRS}"
        }]
    }
    resp = requests.post(BASE_URL, params=params, json=body, timeout=30)
    resp.raise_for_status()
    return resp.json()["results"][0]


def normalize_hit(hit: dict) -> dict:
    obj_id = hit.get("objectID", "")
    urls = hit.get("url", {}).get("EN", [])
    return {
        "id": obj_id,
        "name": hit.get("naslov", ""),
        "brand": hit.get("dizajner", ""),
        "year": hit.get("godina"),
        "gender": hit.get("spol", "unisex"),
        "rating": hit.get("rating"),
        "num_reviews": hit.get("num_reviews", {}).get("EN", 0),
        "collection": hit.get("collection", ""),
        "designer_country": hit.get("designer_meta", {}).get("country", ""),
        "designer_category": hit.get("designer_meta", {}).get("category", ""),
        "slug": hit.get("slug", ""),
        "url": urls[0] if urls else "",
        "picture": hit.get("picture", f"https://fimgs.net/mdimg/perfume/375x500.{obj_id}.jpg"),
        "thumbnail": hit.get("thumbnail", f"https://fimgs.net/mdimg/perfume/m.{obj_id}.jpg"),
    }


def scrape_all():
    all_fragrances = {}

    for query in QUERIES:
        print(f"\n--- Querying: '{query}' ---")
        first = fetch_page(query, 0)
        total = first["nbHits"]
        pages = first["nbPages"]
        print(f"Total hits: {total}, Pages: {pages}")

        for page in range(pages):
            if page > 0:
                result = fetch_page(query, page)
            else:
                result = first

            for hit in result["hits"]:
                frag = normalize_hit(hit)
                if frag["id"] not in all_fragrances:
                    all_fragrances[frag["id"]] = frag

            new_count = len(all_fragrances)
            print(f"  Page {page + 1}/{pages} - Total unique: {new_count}")
            time.sleep(0.2)

    fragrances = sorted(all_fragrances.values(), key=lambda x: x.get("num_reviews", 0), reverse=True)
    print(f"\n=== Total unique fragrances: {len(fragrances)} ===")
    return fragrances


if __name__ == "__main__":
    fragrances = scrape_all()

    output_path = "/workspace/data/fragrances_algolia.json"
    with open(output_path, "w") as f:
        json.dump(fragrances, f, indent=2, ensure_ascii=False)
    print(f"Saved to {output_path}")

    print(f"\nTop 10 by reviews:")
    for frag in fragrances[:10]:
        print(f"  {frag['name']} by {frag['brand']} ({frag.get('year', '?')}) - {frag['rating']:.2f} ({frag['num_reviews']} reviews)")
