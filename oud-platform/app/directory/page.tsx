import { Suspense } from "react";
import { FragranceCard } from "@/components/FragranceCard";
import { searchFragrances } from "@/lib/queries";
import { DirectoryFilters } from "./DirectoryFilters";
import { Pagination } from "@/components/Pagination";

export const dynamic = "force-dynamic";

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const brand = params.brand || "";
  const gender = params.gender || "all";
  const sort = params.sort || "reviews";
  const page = parseInt(params.page || "1", 10);
  const minRating = params.rating ? parseFloat(params.rating) : undefined;

  const { fragrances, total } = searchFragrances({
    query,
    brand: brand || undefined,
    gender,
    sort,
    page,
    minRating,
    limit: 24,
  });

  const totalPages = Math.ceil(total / 24);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Oud Fragrance Directory
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Browse {total.toLocaleString()} oud fragrances from around the world
        </p>
      </div>

      <DirectoryFilters
        currentQuery={query}
        currentGender={gender}
        currentSort={sort}
        currentRating={minRating?.toString()}
        currentBrand={brand}
      />

      {fragrances.length > 0 ? (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {fragrances.map((f) => (
              <FragranceCard key={f.id} fragrance={f} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              baseUrl="/directory"
              params={params}
            />
          )}
        </>
      ) : (
        <div className="mt-16 text-center">
          <p className="font-display text-xl text-text-secondary">
            No fragrances found
          </p>
          <p className="mt-2 text-sm text-text-muted">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
}
