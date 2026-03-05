import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import * as cheerio from "cheerio";
import { firefox } from "playwright";

const ROOT = process.cwd();
const RAW_OUTPUT_PATH = path.join(ROOT, "data", "raw", "fragrantica-oud-raw.json");
const APP_OUTPUT_PATH = path.join(ROOT, "src", "data", "fragrances.json");

const DISCOVERY_URLS = [
  "https://www.fragrantica.com/search/?query=oud",
  "https://www.fragrantica.com/search/?query=agarwood",
  "https://www.fragrantica.com/search/?query=aoud",
  "https://www.fragrantica.com/search/?query=aloeswood",
  "https://www.fragrantica.com/search/?query=dehn%20al%20oud",
  "https://www.fragrantica.com/search/?ingredients.EN=Chalood%20Bark",
  "https://www.fragrantica.com/ingredients-search/?ingredients.EN=Chalood%20Bark",
  "https://www.fragrantica.com/notes/Oud-1025.html",
];

const KEYWORDS = [
  "oud",
  "oudh",
  "agarwood",
  "aoud",
  "aloeswood",
  "dehn al oud",
  "chalood",
];

const REQUEST_DELAY_MS = Number.parseInt(process.env.SCRAPER_DELAY_MS ?? "1200", 10);
const MAX_DETAIL_PAGES = Number.parseInt(process.env.MAX_DETAIL_PAGES ?? "500", 10);

function normalizePerfumeUrl(href) {
  if (!href || !href.includes("/perfume/")) return null;
  const normalized = href.startsWith("http")
    ? href
    : `https://www.fragrantica.com${href.startsWith("/") ? "" : "/"}${href}`;
  const hashless = normalized.split("#")[0];
  const queryless = hashless.split("?")[0];
  if (!/\/perfume\/.+-\d+\.html$/i.test(queryless)) return null;
  return queryless;
}

function hasOudSignal(value) {
  const lower = value.toLowerCase();
  return KEYWORDS.some((keyword) => lower.includes(keyword));
}

function parseYear(text) {
  const match = text.match(/\b(19|20)\d{2}\b/);
  return match ? Number.parseInt(match[0], 10) : null;
}

function uniqueNonEmpty(values) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function extractImageFromListingAnchor($, anchor) {
  const immediateImage = $(anchor).find("img").first().attr("src");
  if (immediateImage) return immediateImage;
  const container = $(anchor).closest("article, li, div");
  if (!container.length) return null;
  return container.find("img").first().attr("src") ?? null;
}

async function ensureDirs() {
  await mkdir(path.dirname(RAW_OUTPUT_PATH), { recursive: true });
  await mkdir(path.dirname(APP_OUTPUT_PATH), { recursive: true });
}

async function checkRobots() {
  const robotsUrl = "https://www.fragrantica.com/robots.txt";
  const response = await fetch(robotsUrl);
  const text = await response.text();
  const disallowedAjax = text
    .toLowerCase()
    .split("\n")
    .some((line) => line.trim() === "disallow: /ajax");
  console.log(`robots.txt fetched (${response.status}).`);
  if (disallowedAjax) {
    console.log(
      "robots.txt disallows /ajax. Scraper will only read publicly rendered HTML pages.",
    );
  }
}

async function discoverPerfumeUrls(browser) {
  /** @type {Map<string, {sources: string[], listingImageUrl: string | null}>} */
  const discovered = new Map();

  for (const discoveryUrl of DISCOVERY_URLS) {
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      await page.goto(discoveryUrl, {
        waitUntil: "domcontentloaded",
        timeout: 120000,
      });
      await page.waitForTimeout(6000);

      const html = await page.content();
      const $ = cheerio.load(html);

      const title = await page.title();
      console.log(`Discovery: ${discoveryUrl} (title: ${title})`);

      $('a[href*="/perfume/"]').each((_, anchor) => {
        const href = $(anchor).attr("href");
        const url = normalizePerfumeUrl(href);
        if (!url) return;

        const listingImageUrl = extractImageFromListingAnchor($, anchor);
        const existing = discovered.get(url);
        if (existing) {
          existing.sources.push(discoveryUrl);
          if (!existing.listingImageUrl && listingImageUrl) {
            existing.listingImageUrl = listingImageUrl;
          }
          return;
        }

        discovered.set(url, {
          sources: [discoveryUrl],
          listingImageUrl: listingImageUrl ?? null,
        });
      });
    } catch (error) {
      console.log(`Discovery failed for ${discoveryUrl}: ${error.message}`);
    } finally {
      await context.close();
      await sleep(REQUEST_DELAY_MS);
    }
  }

  console.log(`Discovered ${discovered.size} unique perfume URLs.`);
  return discovered;
}

function extractJsonLd($) {
  const scripts = $('script[type="application/ld+json"]')
    .map((_, el) => $(el).contents().text())
    .get();
  for (const raw of scripts) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const product = parsed.find((entry) => entry?.["@type"] === "Product");
        if (product) return product;
      }
      if (parsed?.["@type"] === "Product") return parsed;
    } catch {
      // Ignore malformed script tags.
    }
  }
  return null;
}

function normalizeImageUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `https://www.fragrantica.com${url}`;
  return null;
}

async function enrichPerfumeDetails(browser, discovered) {
  const urls = [...discovered.keys()].slice(0, MAX_DETAIL_PAGES);
  const details = [];
  const failedUrls = [];

  for (const [index, url] of urls.entries()) {
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 120000 });
      await page.waitForTimeout(3000);

      const pageTitle = await page.title();
      const html = await page.content();
      if (pageTitle === "Just a moment..." || html.includes("cf-challenge")) {
        throw new Error("Blocked by anti-bot challenge");
      }

      const $ = cheerio.load(html);
      const jsonLd = extractJsonLd($);

      const canonical =
        $('link[rel="canonical"]').attr("href")?.split("?")[0] ?? url;
      const title =
        $("h1").first().text().trim() ||
        jsonLd?.name ||
        pageTitle.replace(" Fragrance", "").trim();

      const brand =
        $('a[href*="/designers/"]').first().text().trim() ||
        jsonLd?.brand?.name ||
        null;

      const description =
        $('meta[name="description"]').attr("content")?.trim() ||
        $("p").first().text().trim() ||
        "";

      const imageUrl =
        normalizeImageUrl($('meta[property="og:image"]').attr("content")) ||
        normalizeImageUrl(jsonLd?.image) ||
        normalizeImageUrl(discovered.get(url)?.listingImageUrl) ||
        null;

      const noteLinks = uniqueNonEmpty(
        $('a[href*="/notes/"]')
          .map((_, el) => $(el).text())
          .get(),
      );

      const accordLabels = uniqueNonEmpty(
        $('[class*="accord"]')
          .map((_, el) => $(el).text())
          .get(),
      ).filter((label) => label.length <= 24);

      const searchSignal = [
        title,
        description,
        noteLinks.join(" "),
        accordLabels.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      if (!hasOudSignal(searchSignal)) {
        continue;
      }

      const launchYear = parseYear(description);
      const ratingValue =
        Number.parseFloat(jsonLd?.aggregateRating?.ratingValue ?? "") || null;
      const ratingCount =
        Number.parseInt(jsonLd?.aggregateRating?.ratingCount ?? "", 10) || null;

      const idMatch = canonical.match(/-(\d+)\.html$/);
      const id = idMatch ? Number.parseInt(idMatch[1], 10) : null;
      const slug = canonical
        .split("/")
        .pop()
        ?.replace(".html", "")
        .toLowerCase() ?? `${id ?? index}`;

      details.push({
        id,
        slug,
        name: title,
        brand,
        url: canonical,
        imageUrl,
        launchYear,
        ratingValue,
        ratingCount,
        accords: accordLabels.slice(0, 10),
        notes: noteLinks.slice(0, 20),
        description,
        sources: uniqueNonEmpty(discovered.get(url)?.sources ?? []),
      });

      if ((index + 1) % 10 === 0 || index === urls.length - 1) {
        console.log(
          `Enriched ${index + 1}/${urls.length} pages -> ${details.length} Oud matches.`,
        );
      }
    } catch (error) {
      failedUrls.push({ url, reason: error.message });
    } finally {
      await context.close();
      await sleep(REQUEST_DELAY_MS);
    }
  }

  return { details, failedUrls };
}

function buildAppPayload(records) {
  const cleaned = records
    .filter((item) => item.name && item.url && item.imageUrl)
    .map((item) => ({
      id: item.id ?? null,
      slug: item.slug,
      name: item.name,
      brand: item.brand ?? "Unknown Brand",
      url: item.url,
      imageUrl: item.imageUrl,
      launchYear: item.launchYear,
      ratingValue: item.ratingValue,
      ratingCount: item.ratingCount,
      accords: item.accords,
      notes: item.notes,
      description: item.description,
      sources: item.sources,
    }));

  cleaned.sort((a, b) => {
    const ratingA = a.ratingValue ?? -1;
    const ratingB = b.ratingValue ?? -1;
    if (ratingA !== ratingB) return ratingB - ratingA;
    return a.name.localeCompare(b.name);
  });

  return cleaned;
}

async function readExistingRaw() {
  try {
    const existing = JSON.parse(await readFile(RAW_OUTPUT_PATH, "utf8"));
    if (Array.isArray(existing?.records)) return existing.records;
  } catch {
    // no-op
  }
  return [];
}

async function main() {
  await ensureDirs();
  await checkRobots();

  const browser = await firefox.launch({ headless: true });
  try {
    const discovered = await discoverPerfumeUrls(browser);
    const { details, failedUrls } = await enrichPerfumeDetails(browser, discovered);
    const existing = await readExistingRaw();

    const mergedByUrl = new Map();
    for (const record of [...existing, ...details]) {
      mergedByUrl.set(record.url, record);
    }
    const mergedRecords = [...mergedByUrl.values()];
    const appPayload = buildAppPayload(mergedRecords);

    const rawOutput = {
      generatedAt: new Date().toISOString(),
      totalDiscoveredUrls: discovered.size,
      totalQualifiedRecords: mergedRecords.length,
      failedUrls,
      records: mergedRecords,
    };

    await writeFile(RAW_OUTPUT_PATH, `${JSON.stringify(rawOutput, null, 2)}\n`, "utf8");
    await writeFile(APP_OUTPUT_PATH, `${JSON.stringify(appPayload, null, 2)}\n`, "utf8");

    console.log(
      `Completed. Wrote ${appPayload.length} records to ${path.relative(ROOT, APP_OUTPUT_PATH)}.`,
    );
    if (failedUrls.length > 0) {
      console.log(`Skipped ${failedUrls.length} URLs due to temporary blocks/errors.`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error("Scrape failed:", error);
  process.exitCode = 1;
});
