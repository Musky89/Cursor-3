# OudBase — The World's Premier Oud Fragrance Directory

A comprehensive directory and community platform for oud fragrances. Built to serve fragrance enthusiasts and provide a platform for premium oud brands to showcase their latest creations.

## What's Inside

### Data Collection (`/scraper`)
- **Algolia-based scraper** that extracts fragrance data from Fragrantica's search index
- **Detail scraper** using `curl_cffi` to bypass Cloudflare and extract notes, accords, perfumers, and descriptions
- **Image downloader** for fragrance bottle photos

### Dataset (`/data`)
- **2,686 oud fragrances** with names, brands, years, ratings, reviews, gender, and images
- **351 fragrances** with detailed notes, descriptions, and perfumer information
- **1,040 unique brands** from 10+ countries
- **1,200 fragrance images** (thumbnails + full-size)

### Platform (`/oud-platform`)
A Next.js 16 application with:

**Directory** — Searchable, filterable grid of all oud fragrances with sorting by rating, reviews, year, or name

**Fragrance Detail Pages** — Full profiles with notes pyramid, accords, perfumer info, ratings, descriptions, and related fragrances

**Brands** — Browse 1,040+ oud houses filtered by country and category (niche, celebrity, natural perfumery)

**Community Forum** — Discussion forum with categories (reviews, recommendations, education, brands, new releases) with full posting and reply functionality

**New Launches** — Featured section for recent oud releases with a CTA for brands to partner

**API** — Search endpoint (`/api/search`) and forum endpoints (`/api/forum`, `/api/forum/:id/replies`)

## Tech Stack

- **Next.js 16** with App Router and Turbopack
- **Tailwind CSS v4** with a custom dark luxurious theme
- **SQLite** via better-sqlite3 (embedded, zero-config)
- **TypeScript** throughout
- **Lucide React** for icons

## Design

Dark, luxurious theme with gold/amber accents inspired by the rich world of oud:
- Deep blacks and charcoals for backgrounds
- Gold gradient accents for interactive elements
- Playfair Display serif for headings, Inter for body text
- Responsive design for mobile through desktop

## Getting Started

```bash
cd oud-platform
npm install
npm run seed   # Seeds the database from scraped data
npm run dev    # Starts development server on :3000
```

## Monetization Strategy

1. **Community Building** — Forum and directory attract oud enthusiasts
2. **Brand Partnerships** — Featured launch program for premium oud houses
3. **Premium Listings** — Enhanced brand pages with editorial coverage
4. **Advertising** — Targeted placements for oud-related products
