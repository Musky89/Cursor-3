import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "oud.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
  }
  return db;
}

export interface Fragrance {
  id: number;
  name: string;
  brand: string;
  slug: string;
  year: number | null;
  gender: string;
  rating: number | null;
  num_reviews: number;
  thumbnail: string;
  picture: string;
  fragrantica_url: string;
  description: string | null;
  notes: string | null;
  accords: string | null;
  perfumers: string | null;
  designer_country: string | null;
  designer_category: string | null;
  collection: string | null;
  created_at: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  country: string | null;
  category: string | null;
  fragrance_count: number;
  avg_rating: number | null;
}

export interface ForumTopic {
  id: number;
  title: string;
  content: string;
  author_name: string;
  category: string;
  fragrance_id: number | null;
  views: number;
  reply_count: number;
  created_at: string;
  updated_at: string;
}

export interface ForumReply {
  id: number;
  topic_id: number;
  content: string;
  author_name: string;
  created_at: string;
}

export function initDb() {
  const db = getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS fragrances (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      year INTEGER,
      gender TEXT DEFAULT 'unisex',
      rating REAL,
      num_reviews INTEGER DEFAULT 0,
      thumbnail TEXT,
      picture TEXT,
      fragrantica_url TEXT,
      description TEXT,
      notes TEXT,
      accords TEXT,
      perfumers TEXT,
      designer_country TEXT,
      designer_category TEXT,
      collection TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS brands (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      country TEXT,
      category TEXT,
      logo_url TEXT,
      description TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS forum_topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author_name TEXT NOT NULL,
      category TEXT DEFAULT 'general',
      fragrance_id INTEGER,
      views INTEGER DEFAULT 0,
      reply_count INTEGER DEFAULT 0,
      is_pinned INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (fragrance_id) REFERENCES fragrances(id)
    );

    CREATE TABLE IF NOT EXISTS forum_replies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      author_name TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (topic_id) REFERENCES forum_topics(id)
    );

    CREATE TABLE IF NOT EXISTS launches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fragrance_id INTEGER NOT NULL,
      launch_date TEXT,
      is_featured INTEGER DEFAULT 0,
      description TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (fragrance_id) REFERENCES fragrances(id)
    );

    CREATE INDEX IF NOT EXISTS idx_fragrances_brand ON fragrances(brand);
    CREATE INDEX IF NOT EXISTS idx_fragrances_rating ON fragrances(rating DESC);
    CREATE INDEX IF NOT EXISTS idx_fragrances_year ON fragrances(year DESC);
    CREATE INDEX IF NOT EXISTS idx_fragrances_slug ON fragrances(slug);
    CREATE INDEX IF NOT EXISTS idx_brands_slug ON brands(slug);
    CREATE INDEX IF NOT EXISTS idx_forum_topics_category ON forum_topics(category);
    CREATE INDEX IF NOT EXISTS idx_forum_topics_created ON forum_topics(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_launches_featured ON launches(is_featured);
  `);

  return db;
}
