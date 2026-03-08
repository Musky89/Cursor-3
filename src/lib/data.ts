import fragrancesData from "@/data/fragrances.json";
import type { Fragrance } from "./types";

const fragrances: Fragrance[] = fragrancesData as Fragrance[];

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
