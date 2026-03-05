import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ExternalLink, ArrowLeft, User } from "lucide-react";
import { FragranceCard } from "@/components/FragranceCard";
import { SectionHeader } from "@/components/SectionHeader";
import { getFragranceBySlug, getRelatedFragrances } from "@/lib/queries";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fragrance = getFragranceBySlug(slug);
  if (!fragrance) return { title: "Not Found" };

  const title = `${fragrance.name} by ${fragrance.brand} | OudBase`;
  const description = fragrance.description
    ? fragrance.description.slice(0, 160)
    : `Explore ${fragrance.name} by ${fragrance.brand}. Rating: ${fragrance.rating?.toFixed(1) || "N/A"}. Browse notes, accords, and reviews on OudBase.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: fragrance.picture ? [{ url: fragrance.picture }] : [],
    },
  };
}

export default async function FragranceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fragrance = getFragranceBySlug(slug);

  if (!fragrance) notFound();

  const related = getRelatedFragrances(fragrance.brand, fragrance.id);
  const notes: string[] = fragrance.notes
    ? JSON.parse(fragrance.notes)
    : [];
  const accords: string[] = fragrance.accords
    ? JSON.parse(fragrance.accords)
    : [];
  const perfumers: string[] = fragrance.perfumers
    ? JSON.parse(fragrance.perfumers)
    : [];

  const genderLabel =
    fragrance.gender === "female"
      ? "For Women"
      : fragrance.gender === "male"
        ? "For Men"
        : "Unisex";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/directory"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-gold-400"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Directory
      </Link>

      <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border-subtle bg-bg-card">
          {fragrance.picture ? (
            <Image
              src={fragrance.picture}
              alt={fragrance.name}
              fill
              sizes="400px"
              className="object-contain p-6"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-display text-6xl text-text-muted/20">O</span>
            </div>
          )}
          {fragrance.year && fragrance.year >= 2024 && (
            <span className="absolute left-4 top-4 rounded-full bg-gold-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              New Release
            </span>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-border-primary bg-bg-secondary px-3 py-0.5 text-xs font-medium text-text-secondary">
              {genderLabel}
            </span>
            {fragrance.year && (
              <span className="rounded-full border border-border-primary bg-bg-secondary px-3 py-0.5 text-xs font-medium text-text-secondary">
                {fragrance.year}
              </span>
            )}
            {fragrance.designer_category && (
              <span className="rounded-full border border-gold-700/30 bg-gold-900/20 px-3 py-0.5 text-xs font-medium capitalize text-gold-400">
                {fragrance.designer_category.replace("_", " ")}
              </span>
            )}
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-5xl">
            {fragrance.name}
          </h1>

          <Link
            href={`/brands/${fragrance.brand.toLowerCase().replace(/[^\w]+/g, "-")}`}
            className="mt-2 inline-block text-lg text-gold-400 transition-colors hover:text-gold-300"
          >
            {fragrance.brand}
          </Link>

          {/* Rating */}
          {fragrance.rating && (
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(fragrance.rating!)
                          ? "fill-gold-400 text-gold-400"
                          : "text-border-primary"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xl font-bold text-gold-300">
                  {fragrance.rating.toFixed(2)}
                </span>
              </div>
              {fragrance.num_reviews > 0 && (
                <span className="text-sm text-text-muted">
                  {fragrance.num_reviews.toLocaleString()} reviews
                </span>
              )}
            </div>
          )}

          {/* Perfumers */}
          {perfumers.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Perfumer{perfumers.length > 1 ? "s" : ""}
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {perfumers.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border-primary bg-bg-secondary px-3 py-1.5 text-sm text-text-primary"
                  >
                    <User className="h-3.5 w-3.5 text-text-muted" />
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {notes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Fragrance Notes
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {notes.map((note) => (
                  <span
                    key={note}
                    className="rounded-full border border-gold-700/30 bg-gold-900/15 px-3 py-1 text-sm font-medium text-gold-300"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Accords */}
          {accords.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Main Accords
              </h3>
              <div className="mt-3 space-y-2">
                {accords.map((accord, i) => (
                  <div key={accord} className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg-tertiary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                        style={{
                          width: `${Math.max(20, 100 - i * 12)}%`,
                        }}
                      />
                    </div>
                    <span className="min-w-[100px] text-sm capitalize text-text-secondary">
                      {accord}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {fragrance.description && (
            <div className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                About
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {fragrance.description}
              </p>
            </div>
          )}

          {/* External Link */}
          {fragrance.fragrantica_url && (
            <a
              href={fragrance.fragrantica_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-gold-400"
            >
              View on Fragrantica
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}

          {/* Quick Info Grid */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Brand", value: fragrance.brand },
              { label: "Year", value: fragrance.year?.toString() || "N/A" },
              { label: "Gender", value: genderLabel },
              {
                label: "Origin",
                value: fragrance.designer_country || "Unknown",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border-subtle bg-bg-card p-3"
              >
                <p className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
                  {item.label}
                </p>
                <p className="mt-0.5 text-sm font-medium text-text-primary">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Fragrances */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-border-subtle pt-12">
          <SectionHeader
            title={`More from ${fragrance.brand}`}
            href={`/brands/${fragrance.brand.toLowerCase().replace(/[^\w]+/g, "-")}`}
            linkText="View all"
          />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {related.map((f) => (
              <FragranceCard key={f.id} fragrance={f} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
