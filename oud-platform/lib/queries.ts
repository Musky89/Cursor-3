import { getDb, type Fragrance, type Brand, type ForumTopic } from "./db";

export function getFeaturedFragrances(limit = 12): Fragrance[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT * FROM fragrances 
       WHERE rating IS NOT NULL AND num_reviews > 10 
       ORDER BY rating DESC, num_reviews DESC 
       LIMIT ?`
    )
    .all(limit) as Fragrance[];
}

export function getTrendingFragrances(limit = 12): Fragrance[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT * FROM fragrances 
       WHERE num_reviews > 50 
       ORDER BY num_reviews DESC 
       LIMIT ?`
    )
    .all(limit) as Fragrance[];
}

export function getNewReleases(limit = 12): Fragrance[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT * FROM fragrances 
       WHERE year >= 2024 AND rating IS NOT NULL 
       ORDER BY year DESC, num_reviews DESC 
       LIMIT ?`
    )
    .all(limit) as Fragrance[];
}

export function getFragranceBySlug(slug: string): Fragrance | undefined {
  const db = getDb();
  return db
    .prepare(`SELECT * FROM fragrances WHERE slug = ?`)
    .get(slug) as Fragrance | undefined;
}

export function getRelatedFragrances(
  brand: string,
  excludeId: number,
  limit = 6
): Fragrance[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT * FROM fragrances 
       WHERE brand = ? AND id != ? AND rating IS NOT NULL
       ORDER BY num_reviews DESC 
       LIMIT ?`
    )
    .all(brand, excludeId, limit) as Fragrance[];
}

export function searchFragrances(params: {
  query?: string;
  brand?: string;
  gender?: string;
  minRating?: number;
  year?: number;
  sort?: string;
  page?: number;
  limit?: number;
}): { fragrances: Fragrance[]; total: number } {
  const db = getDb();
  const conditions: string[] = [];
  const values: (string | number)[] = [];
  const limit = params.limit || 24;
  const page = params.page || 1;
  const offset = (page - 1) * limit;

  if (params.query) {
    conditions.push(`(name LIKE ? OR brand LIKE ?)`);
    values.push(`%${params.query}%`, `%${params.query}%`);
  }

  if (params.brand) {
    conditions.push(`brand = ?`);
    values.push(params.brand);
  }

  if (params.gender && params.gender !== "all") {
    conditions.push(`gender = ?`);
    values.push(params.gender);
  }

  if (params.minRating) {
    conditions.push(`rating >= ?`);
    values.push(params.minRating);
  }

  if (params.year) {
    conditions.push(`year = ?`);
    values.push(params.year);
  }

  const where =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  let orderBy = "ORDER BY num_reviews DESC";
  switch (params.sort) {
    case "rating":
      orderBy = "ORDER BY rating DESC NULLS LAST";
      break;
    case "newest":
      orderBy = "ORDER BY year DESC NULLS LAST";
      break;
    case "name":
      orderBy = "ORDER BY name ASC";
      break;
    case "reviews":
      orderBy = "ORDER BY num_reviews DESC";
      break;
  }

  const total = (
    db.prepare(`SELECT COUNT(*) as count FROM fragrances ${where}`).get(...values) as {
      count: number;
    }
  ).count;

  const fragrances = db
    .prepare(
      `SELECT * FROM fragrances ${where} ${orderBy} LIMIT ? OFFSET ?`
    )
    .all(...values, limit, offset) as Fragrance[];

  return { fragrances, total };
}

export function getBrands(params?: {
  page?: number;
  limit?: number;
  country?: string;
}): { brands: (Brand & { fragrance_count: number; avg_rating: number | null })[]; total: number } {
  const db = getDb();
  const limit = params?.limit || 48;
  const page = params?.page || 1;
  const offset = (page - 1) * limit;

  let countryFilter = "";
  const values: (string | number)[] = [];

  if (params?.country) {
    countryFilter = "WHERE b.country = ?";
    values.push(params.country);
  }

  const total = (
    db
      .prepare(
        `SELECT COUNT(DISTINCT b.id) as count FROM brands b ${countryFilter}`
      )
      .get(...values) as { count: number }
  ).count;

  const brands = db
    .prepare(
      `SELECT b.*, 
              COUNT(f.id) as fragrance_count,
              ROUND(AVG(f.rating), 2) as avg_rating
       FROM brands b
       LEFT JOIN fragrances f ON f.brand = b.name
       ${countryFilter}
       GROUP BY b.id
       ORDER BY fragrance_count DESC
       LIMIT ? OFFSET ?`
    )
    .all(...values, limit, offset) as (Brand & {
    fragrance_count: number;
    avg_rating: number | null;
  })[];

  return { brands, total };
}

export function getBrandBySlug(slug: string) {
  const db = getDb();
  const brand = db
    .prepare(`SELECT * FROM brands WHERE slug = ?`)
    .get(slug) as Brand | undefined;

  if (!brand) return null;

  const fragrances = db
    .prepare(
      `SELECT * FROM fragrances WHERE brand = ? ORDER BY num_reviews DESC`
    )
    .all(brand.name) as Fragrance[];

  return { brand, fragrances };
}

export function getForumTopics(params?: {
  category?: string;
  page?: number;
  limit?: number;
}): { topics: ForumTopic[]; total: number } {
  const db = getDb();
  const limit = params?.limit || 20;
  const page = params?.page || 1;
  const offset = (page - 1) * limit;

  let categoryFilter = "";
  const values: (string | number)[] = [];

  if (params?.category && params.category !== "all") {
    categoryFilter = "WHERE category = ?";
    values.push(params.category);
  }

  const total = (
    db
      .prepare(
        `SELECT COUNT(*) as count FROM forum_topics ${categoryFilter}`
      )
      .get(...values) as { count: number }
  ).count;

  const topics = db
    .prepare(
      `SELECT * FROM forum_topics ${categoryFilter} 
       ORDER BY is_pinned DESC, updated_at DESC 
       LIMIT ? OFFSET ?`
    )
    .all(...values, limit, offset) as ForumTopic[];

  return { topics, total };
}

export function getForumTopic(id: number) {
  const db = getDb();
  const topic = db
    .prepare(`SELECT * FROM forum_topics WHERE id = ?`)
    .get(id) as ForumTopic | undefined;

  if (!topic) return null;

  const replies = db
    .prepare(
      `SELECT * FROM forum_replies WHERE topic_id = ? ORDER BY created_at ASC`
    )
    .all(id);

  // Increment view
  db.prepare(`UPDATE forum_topics SET views = views + 1 WHERE id = ?`).run(id);

  return { topic, replies };
}

export function getStats() {
  const db = getDb();
  const fragranceCount = (
    db.prepare(`SELECT COUNT(*) as count FROM fragrances`).get() as {
      count: number;
    }
  ).count;
  const brandCount = (
    db.prepare(`SELECT COUNT(DISTINCT brand) as count FROM fragrances`).get() as {
      count: number;
    }
  ).count;
  const topCountries = db
    .prepare(
      `SELECT designer_country as country, COUNT(*) as count 
       FROM fragrances 
       WHERE designer_country IS NOT NULL AND designer_country != ''
       GROUP BY designer_country 
       ORDER BY count DESC 
       LIMIT 10`
    )
    .all() as { country: string; count: number }[];

  return { fragranceCount, brandCount, topCountries };
}

export function getUniqueYears(): number[] {
  const db = getDb();
  return (
    db
      .prepare(
        `SELECT DISTINCT year FROM fragrances WHERE year IS NOT NULL ORDER BY year DESC`
      )
      .all() as { year: number }[]
  ).map((r) => r.year);
}

export function getUniqueBrandNames(): string[] {
  const db = getDb();
  return (
    db
      .prepare(
        `SELECT DISTINCT brand FROM fragrances ORDER BY brand ASC`
      )
      .all() as { brand: string }[]
  ).map((r) => r.brand);
}
