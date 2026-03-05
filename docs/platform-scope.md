# Oud Atlas Platform Scope

## 1) Product thesis

Build a specialized Oud platform with three core layers:

1. **Directory**: the most useful, searchable Oud-focused catalog.
2. **Community**: high-signal forum discussions that compound SEO and trust.
3. **Launch commerce**: paid launch placements for premium brands.

The business model depends on trust-first audience growth before aggressive monetization.

## 2) Target users

- **Collectors/enthusiasts**: want deep note-level comparisons and launch intelligence.
- **Curious mainstream users**: need guided pathways into Oud.
- **Premium brands**: want qualified audience access, not generic impressions.

## 3) Core MVP (implemented)

- Premium homepage framing value proposition and monetization.
- Oud directory with filtering/search.
- Fragrance detail pages with source links and visual assets.
- Forum information architecture page.
- Brand launch package page.
- Fragrantica ingestion pipeline that:
  - checks `robots.txt`,
  - crawls only publicly rendered pages,
  - throttles requests,
  - deduplicates entries,
  - captures image URLs and metadata.

## 4) Monetization phases

### Phase A: Audience build

- Organic directory traffic.
- Community posting cadence.
- Newsletter and launch watchlist.

### Phase B: Paid placements

- Sponsored launch pages.
- Homepage/section spotlight slots.
- Featured forum announcements.

### Phase C: Data products

- Brand analytics dashboards.
- Sentiment snapshots from forum + ratings.
- Regional trend intelligence for launch planning.

## 5) Data strategy

- Primary: Fragrantica page ingestion for Oud-related entries.
- Secondary (future): licensed feeds + user-contributed edits + moderation layer.
- Keep raw scrape artifacts and transformed app payload separately for auditability.

## 6) Next high-impact build steps

1. Auth (email/social + role-based moderation).
2. Postgres + Prisma schema for persistent forum data.
3. Submission workflow for brands and user scent lists.
4. Editorial CMS for launch stories and evergreen guides.
5. Stripe billing for launch packages and premium memberships.
