# Oud Atlas

A premium Oud directory + community + launch platform built with Next.js.

## What is included

- Polished dark-luxury UI for Oud audience positioning.
- Searchable directory of Oud fragrances.
- Detail pages with visuals, notes, and source links.
- Community forum IA page.
- Premium brand launch package page.
- Fragrantica scraping pipeline for Oud-oriented discovery.

## Run locally

```bash
npm install
npm run scrape:oud
npm run dev
```

Open `http://localhost:3000`.

## Scraper behavior

The scraper is intentionally conservative:

- checks `robots.txt`,
- only crawls publicly rendered HTML endpoints,
- throttles requests,
- does not use anti-bot bypass techniques.

Output files:

- Raw scrape artifact: `data/raw/fragrantica-oud-raw.json`
- App dataset: `src/data/fragrances.json`

## Product scope

Detailed platform scope and monetization roadmap:

- `docs/platform-scope.md`
