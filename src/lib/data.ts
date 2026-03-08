import fragrancesData from "@/data/fragrances.json";
import type { Fragrance } from "./types";

function extractPerfumeId(url: string): string | null {
  const match = url.match(/-(\d+)\.html$/);
  return match?.[1] ?? null;
}

function buildPackshotUrl(perfumeId: string): string {
  return `https://fimgs.net/mdimg/perfume/375x500.${perfumeId}.jpg`;
}

const fragrances: Fragrance[] = (fragrancesData as Fragrance[]).map((fragrance) => {
  const perfumeId = extractPerfumeId(fragrance.url);
  if (!perfumeId) return fragrance;

  return {
    ...fragrance,
    imageUrl: buildPackshotUrl(perfumeId),
  };
});

export function getAllFragrances(): Fragrance[] {
  return fragrances;
}

export function getFragranceBySlug(slug: string): Fragrance | undefined {
  return fragrances.find((f) => f.slug === slug);
}

export function getFragrancesByBrand(brand: string): Fragrance[] {
  return fragrances.filter((f) => f.brand === brand);
}

export function getFeaturedFragrances(count = 6): Fragrance[] {
  return [...fragrances]
    .sort((a, b) => b.ratingValue - a.ratingValue)
    .slice(0, count);
}

export function getAllBrands(): string[] {
  const brands = new Set(fragrances.map((f) => f.brand));
  return Array.from(brands).sort();
}

export function getBrandCount(): number {
  return new Set(fragrances.map((f) => f.brand)).size;
}
