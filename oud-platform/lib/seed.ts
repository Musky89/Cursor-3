import { initDb } from "./db";
import fs from "fs";
import path from "path";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function main() {
  const dataDir = path.join(process.cwd(), "..", "data");

  const algoliaPath = path.join(dataDir, "fragrances_algolia.json");
  const detailsPath = path.join(dataDir, "fragrances_details.json");

  const algoliaData = JSON.parse(fs.readFileSync(algoliaPath, "utf-8"));
  const detailsData = fs.existsSync(detailsPath)
    ? JSON.parse(fs.readFileSync(detailsPath, "utf-8"))
    : {};

  console.log(`Algolia fragrances: ${algoliaData.length}`);
  console.log(`Detail records: ${Object.keys(detailsData).length}`);

  const db = initDb();

  // Seed fragrances
  const insertFrag = db.prepare(`
    INSERT OR REPLACE INTO fragrances
    (id, name, brand, slug, year, gender, rating, num_reviews, thumbnail, picture,
     fragrantica_url, description, notes, accords, perfumers, designer_country,
     designer_category, collection)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const brands = new Map<
    string,
    { country: string | null; category: string | null }
  >();

  const insertMany = db.transaction(() => {
    for (const frag of algoliaData) {
      const detail = detailsData[frag.id] || {};
      const fragSlug = frag.slug
        ? slugify(frag.slug.replace("/", "-"))
        : slugify(`${frag.brand}-${frag.name}-${frag.id}`);

      insertFrag.run(
        parseInt(frag.id),
        frag.name,
        frag.brand,
        fragSlug,
        frag.year || null,
        frag.gender || "unisex",
        frag.rating || null,
        frag.num_reviews || 0,
        frag.thumbnail || null,
        frag.picture || null,
        frag.url || null,
        detail.description || null,
        detail.notes ? JSON.stringify(detail.notes) : null,
        detail.accords ? JSON.stringify(detail.accords) : null,
        detail.perfumers ? JSON.stringify(detail.perfumers) : null,
        frag.designer_country || null,
        frag.designer_category || null,
        frag.collection || null
      );

      if (!brands.has(frag.brand)) {
        brands.set(frag.brand, {
          country: frag.designer_country || null,
          category: frag.designer_category || null,
        });
      }
    }
  });

  insertMany();
  console.log(`Inserted ${algoliaData.length} fragrances`);

  // Seed brands
  const insertBrand = db.prepare(`
    INSERT OR IGNORE INTO brands (name, slug, country, category)
    VALUES (?, ?, ?, ?)
  `);

  const insertBrands = db.transaction(() => {
    for (const [name, meta] of brands.entries()) {
      insertBrand.run(name, slugify(name), meta.country, meta.category);
    }
  });

  insertBrands();
  console.log(`Inserted ${brands.size} brands`);

  // Seed sample forum topics
  const forumTopics = [
    {
      title: "Best Oud Fragrances for Beginners?",
      content:
        "I'm new to oud fragrances and looking for recommendations. I've heard Tom Ford Oud Wood is a good starting point. What are your suggestions for someone who wants to explore oud without being overwhelmed?",
      author: "OudExplorer",
      category: "recommendations",
    },
    {
      title: "Oud Wood vs Oud for Greatness - Which is the better investment?",
      content:
        "I can only pick one right now. Oud Wood is a classic but Oud for Greatness has been getting a lot of hype. For those who've tried both, which offers better longevity and overall experience?",
      author: "FragranceCollector",
      category: "reviews",
    },
    {
      title: "The Art of Oud: Understanding Different Oud Varieties",
      content:
        "There are many types of oud used in perfumery - Cambodian, Indian (Hindi), Laotian, and synthetic oud. Each has distinct characteristics. Let's discuss the differences and which brands use which varieties.",
      author: "OudConnoisseur",
      category: "education",
    },
    {
      title: "Best Oud Houses from the Middle East",
      content:
        "Beyond the Western niche houses, there's an incredible world of oud perfumery in the Gulf. Arabian Oud, Ajmal, Swiss Arabian, Rasasi - which Middle Eastern houses do you think offer the best value and quality?",
      author: "GulfFragHead",
      category: "brands",
    },
    {
      title: "MFK Oud Satin Mood - Does it live up to the hype?",
      content:
        "Everyone raves about Oud Satin Mood. I finally got a sample and I'm not sure what I think yet. The opening is beautiful but the drydown seems generic. Am I missing something?",
      author: "NicheNose",
      category: "reviews",
    },
    {
      title: "Synthetic vs Natural Oud - Can You Tell the Difference?",
      content:
        "With real oud being incredibly expensive, most fragrances use synthetic oud (Iso E Super, Cashmeran, etc). But some houses still use real oud chips. Can most people actually tell the difference?",
      author: "PerfumeScience",
      category: "education",
    },
    {
      title: "Best Oud Fragrances Under $50",
      content:
        "Not everyone can afford MFK or Tom Ford. What are the best affordable oud fragrances? I've heard good things about Lattafa and Al Haramain. Share your budget-friendly oud picks!",
      author: "BudgetOud",
      category: "recommendations",
    },
    {
      title: "New Launch: Creed Oud Zarian - First Impressions",
      content:
        "Creed just dropped their new Oud Zarian and I managed to get a bottle. Initial impression: this is a much darker and richer scent than their usual offerings. The oud is front and center. Thoughts?",
      author: "CreedFan",
      category: "new-releases",
    },
  ];

  const insertTopic = db.prepare(`
    INSERT INTO forum_topics (title, content, author_name, category, views, reply_count)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const topic of forumTopics) {
    insertTopic.run(
      topic.title,
      topic.content,
      topic.author,
      topic.category,
      Math.floor(Math.random() * 500) + 50,
      Math.floor(Math.random() * 20) + 2
    );
  }
  console.log(`Inserted ${forumTopics.length} forum topics`);

  // Seed launches (recent fragrances as featured)
  const recentFrags = db
    .prepare(
      `SELECT id FROM fragrances WHERE year >= 2024 AND rating IS NOT NULL ORDER BY num_reviews DESC LIMIT 20`
    )
    .all() as { id: number }[];

  const insertLaunch = db.prepare(`
    INSERT INTO launches (fragrance_id, launch_date, is_featured, description)
    VALUES (?, ?, ?, ?)
  `);

  for (const frag of recentFrags) {
    insertLaunch.run(
      frag.id,
      `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-01`,
      Math.random() > 0.5 ? 1 : 0,
      "New release from a premium oud house."
    );
  }
  console.log(`Inserted ${recentFrags.length} launches`);

  console.log("\nDone! Database seeded successfully.");
}

main();
