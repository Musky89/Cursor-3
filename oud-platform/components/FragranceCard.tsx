import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Fragrance } from "@/lib/db";

export function FragranceCard({ fragrance }: { fragrance: Fragrance }) {
  const genderColor =
    fragrance.gender === "female"
      ? "text-pink-400"
      : fragrance.gender === "male"
        ? "text-blue-400"
        : "text-gold-400";

  const genderLabel =
    fragrance.gender === "female"
      ? "For Her"
      : fragrance.gender === "male"
        ? "For Him"
        : "Unisex";

  return (
    <Link
      href={`/directory/${fragrance.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-bg-card transition-all duration-300 hover:border-gold-700/40 hover:bg-bg-card-hover hover:shadow-lg hover:shadow-gold-900/10"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-bg-tertiary">
        {fragrance.picture ? (
          <Image
            src={fragrance.picture}
            alt={fragrance.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-4xl text-text-muted/30">O</span>
          </div>
        )}
        {fragrance.year && fragrance.year >= 2024 && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-600/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            New
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold leading-tight text-text-primary transition-colors group-hover:text-gold-300">
          {fragrance.name}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">{fragrance.brand}</p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center gap-1.5">
            {fragrance.rating && (
              <>
                <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                <span className="text-sm font-medium text-gold-300">
                  {fragrance.rating.toFixed(1)}
                </span>
                {fragrance.num_reviews > 0 && (
                  <span className="text-xs text-text-muted">
                    ({fragrance.num_reviews})
                  </span>
                )}
              </>
            )}
          </div>
          <span className={`text-xs font-medium ${genderColor}`}>
            {genderLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
