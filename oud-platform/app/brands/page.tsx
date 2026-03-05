import Link from "next/link";
import { Star } from "lucide-react";
import { getBrands } from "@/lib/queries";
import { Pagination } from "@/components/Pagination";

export const dynamic = "force-dynamic";

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const country = params.country;

  const { brands, total } = getBrands({ page, limit: 48, country });
  const totalPages = Math.ceil(total / 48);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Oud Houses & Brands
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          {total} brands crafting oud fragrances
          {country ? ` from ${country}` : ""}
        </p>
      </div>

      {country && (
        <div className="mb-6">
          <Link
            href="/brands"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border-primary bg-bg-secondary px-3 py-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            &larr; Clear filter: {country}
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="group rounded-xl border border-border-subtle bg-bg-card p-5 transition-all duration-300 hover:border-gold-700/40 hover:bg-bg-card-hover"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-text-primary transition-colors group-hover:text-gold-300">
                  {brand.name}
                </h2>
                <div className="mt-1 flex items-center gap-3">
                  {brand.country && (
                    <span className="text-xs text-text-muted">
                      {brand.country}
                    </span>
                  )}
                  {brand.category && (
                    <span className="rounded-full border border-gold-700/20 bg-gold-900/10 px-2 py-0.5 text-[10px] capitalize text-gold-400">
                      {brand.category.replace("_", " ")}
                    </span>
                  )}
                </div>
              </div>

              {brand.avg_rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                  <span className="text-sm font-medium text-gold-300">
                    {brand.avg_rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-3">
              <span className="text-xs text-text-muted">
                {brand.fragrance_count} fragrance
                {brand.fragrance_count !== 1 ? "s" : ""}
              </span>
              <span className="text-xs font-medium text-gold-400 opacity-0 transition-opacity group-hover:opacity-100">
                View &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          baseUrl="/brands"
          params={params}
        />
      )}
    </div>
  );
}
