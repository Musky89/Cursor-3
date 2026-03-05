"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState, useCallback } from "react";

export function DirectoryFilters({
  currentQuery,
  currentGender,
  currentSort,
  currentRating,
  currentBrand,
}: {
  currentQuery: string;
  currentGender: string;
  currentSort: string;
  currentRating?: string;
  currentBrand?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(currentQuery);
  const [showFilters, setShowFilters] = useState(false);

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`/directory?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams("q", query);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fragrances or brands..."
            className="w-full rounded-lg border border-border-primary bg-bg-secondary py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold-600"
          />
        </form>

        <div className="flex items-center gap-2">
          <select
            value={currentSort}
            onChange={(e) => updateParams("sort", e.target.value)}
            className="rounded-lg border border-border-primary bg-bg-secondary px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-gold-600"
          >
            <option value="reviews">Most Reviewed</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
            <option value="name">A-Z</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
              showFilters
                ? "border-gold-600 bg-gold-900/20 text-gold-300"
                : "border-border-primary bg-bg-secondary text-text-secondary hover:text-text-primary"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="rounded-xl border border-border-primary bg-bg-secondary p-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Gender
              </label>
              <select
                value={currentGender}
                onChange={(e) => updateParams("gender", e.target.value)}
                className="w-full rounded-lg border border-border-subtle bg-bg-tertiary px-3 py-2 text-sm text-text-primary outline-none focus:border-gold-600"
              >
                <option value="all">All</option>
                <option value="unisex">Unisex</option>
                <option value="male">For Him</option>
                <option value="female">For Her</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Min Rating
              </label>
              <select
                value={currentRating || ""}
                onChange={(e) => updateParams("rating", e.target.value)}
                className="w-full rounded-lg border border-border-subtle bg-bg-tertiary px-3 py-2 text-sm text-text-primary outline-none focus:border-gold-600"
              >
                <option value="">Any</option>
                <option value="4.5">4.5+</option>
                <option value="4.0">4.0+</option>
                <option value="3.5">3.5+</option>
                <option value="3.0">3.0+</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
