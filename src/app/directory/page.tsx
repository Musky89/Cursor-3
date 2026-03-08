"use client";

import { useState, useMemo } from "react";
import { FragranceCard } from "@/components/fragrance-card";
import { SectionHeader } from "@/components/section-header";
import fragrancesData from "@/data/fragrances.json";
import type { Fragrance } from "@/lib/types";

const fragrances: Fragrance[] = fragrancesData as Fragrance[];

type SortOption = "rating" | "year" | "name" | "votes";

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("rating");

  const brands = useMemo(() => {
    const set = new Set(fragrances.map((f) => f.brand));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    let result = [...fragrances];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.brand.toLowerCase().includes(q) ||
          f.notes.some((n) => n.toLowerCase().includes(q))
      );
    }

    if (selectedBrand !== "all") {
      result = result.filter((f) => f.brand === selectedBrand);
    }

    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.ratingValue - a.ratingValue);
        break;
      case "year":
        result.sort((a, b) => b.launchYear - a.launchYear);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "votes":
        result.sort((a, b) => b.ratingCount - a.ratingCount);
        break;
    }

    return result;
  }, [search, selectedBrand, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-14 md:py-24">
      {/* Header */}
      <div className="mb-10 md:mb-14">
        <SectionHeader
          kicker="The Archive"
          title="Directory"
          subtitle="Every composition in the collection — searchable by name, house, or note. Arranged with intention, not algorithm."
        />
      </div>

      {/* Filter bar */}
      <div className="border border-line/40 bg-surface-800/30 p-4 sm:p-5 md:p-6 mb-10 md:mb-12">
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-stretch md:items-center">
          {/* Search input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, house, or note…"
              className="w-full bg-transparent border border-line/50 px-4 py-3 text-[15px] text-ink-1 placeholder:text-ink-3/50 font-body focus:outline-none focus:border-gold-1/40 transition-colors duration-300"
            />
          </div>

          {/* Brand select */}
          <div className="relative w-full md:w-auto">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="appearance-none w-full md:w-auto bg-transparent border border-line/50 px-4 py-3 pr-10 text-[14px] text-ink-2 font-body focus:outline-none focus:border-gold-1/40 transition-colors duration-300 cursor-pointer md:min-w-[180px]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%239A8F80' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              <option value="all">All Houses</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Sort select */}
          <div className="relative w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none w-full md:w-auto bg-transparent border border-line/50 px-4 py-3 pr-10 text-[14px] text-ink-2 font-body focus:outline-none focus:border-gold-1/40 transition-colors duration-300 cursor-pointer md:min-w-[150px]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%239A8F80' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              <option value="rating">Highest Rated</option>
              <option value="year">Most Recent</option>
              <option value="name">Alphabetical</option>
              <option value="votes">Most Discussed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-7 md:mb-8 flex items-center justify-between">
        <span className="text-[13px] text-ink-3 font-body">
          {filtered.length} composition{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-7 md:gap-y-14">
          {filtered.map((frag, i) => (
            <FragranceCard key={frag.id} fragrance={frag} priority={i < 4} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="text-center py-24 border border-line/20">
          <p className="font-display text-display-sm text-ink-2 font-light italic mb-3">
            No compositions found
          </p>
          <p className="text-ink-3 text-[14px]">
            Try adjusting your search or filters — the archive rewards curiosity.
          </p>
        </div>
      )}
    </div>
  );
}
