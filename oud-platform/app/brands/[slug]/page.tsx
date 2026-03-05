import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, Tag } from "lucide-react";
import { FragranceCard } from "@/components/FragranceCard";
import { getBrandBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getBrandBySlug(slug);

  if (!data) notFound();

  const { brand, fragrances } = data;
  const avgRating =
    fragrances.filter((f) => f.rating).reduce((acc, f) => acc + (f.rating || 0), 0) /
    (fragrances.filter((f) => f.rating).length || 1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/brands"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-gold-400"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Brands
      </Link>

      {/* Brand Header */}
      <div className="rounded-2xl border border-border-subtle bg-bg-card p-6 sm:p-8">
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          {brand.name}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          {brand.country && (
            <div className="flex items-center gap-1.5 text-sm text-text-secondary">
              <MapPin className="h-4 w-4 text-text-muted" />
              {brand.country}
            </div>
          )}
          {brand.category && (
            <div className="flex items-center gap-1.5 text-sm text-text-secondary">
              <Tag className="h-4 w-4 text-text-muted" />
              <span className="capitalize">
                {brand.category.replace("_", " ")}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
            {avgRating.toFixed(1)} avg rating
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 sm:max-w-md">
          <div className="rounded-xl border border-border-subtle bg-bg-secondary p-3 text-center">
            <p className="font-display text-xl font-bold text-gold-400">
              {fragrances.length}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-text-muted">
              Fragrances
            </p>
          </div>
          <div className="rounded-xl border border-border-subtle bg-bg-secondary p-3 text-center">
            <p className="font-display text-xl font-bold text-gold-400">
              {avgRating.toFixed(1)}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-text-muted">
              Avg Rating
            </p>
          </div>
          <div className="rounded-xl border border-border-subtle bg-bg-secondary p-3 text-center">
            <p className="font-display text-xl font-bold text-gold-400">
              {fragrances.reduce((a, f) => a + f.num_reviews, 0).toLocaleString()}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-text-muted">
              Reviews
            </p>
          </div>
        </div>
      </div>

      {/* Fragrances Grid */}
      <div className="mt-10">
        <h2 className="font-display text-xl font-semibold text-text-primary">
          All Fragrances ({fragrances.length})
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {fragrances.map((f) => (
            <FragranceCard key={f.id} fragrance={f} />
          ))}
        </div>
      </div>
    </div>
  );
}
