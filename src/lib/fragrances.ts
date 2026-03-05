import fragrances from "@/data/fragrances.json";

export type FragranceRecord = {
  id: number | null;
  slug: string;
  name: string;
  brand: string;
  url: string;
  imageUrl: string;
  launchYear: number | null;
  ratingValue: number | null;
  ratingCount: number | null;
  accords: string[];
  notes: string[];
  description: string;
  sources: string[];
};

export const oudFragrances = fragrances as FragranceRecord[];

export const oudBrands = [...new Set(oudFragrances.map((item) => item.brand))].sort();

export function getFragranceBySlug(slug: string) {
  return oudFragrances.find((item) => item.slug === slug);
}
