import Image from "next/image";
import Link from "next/link";
import type { Fragrance } from "@/lib/types";

interface FragranceCardProps {
  fragrance: Fragrance;
  priority?: boolean;
}

export function FragranceCard({ fragrance, priority = false }: FragranceCardProps) {
  return (
    <Link
      href={`/fragrance/${fragrance.slug}`}
      className="group block"
    >
      <article className="relative">
        {/* Bottle image area */}
        <div className="bottle-frame aspect-[3/4] overflow-hidden mb-4 sm:mb-5">
          <div className="relative w-full h-full flex items-center justify-center p-5 sm:p-6 bottle-glow">
            <Image
              src={fragrance.imageUrl}
              alt={`${fragrance.name} by ${fragrance.brand}`}
              width={280}
              height={373}
              className="bottle-image relative z-10 object-contain w-auto h-full max-h-[85%] transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
              priority={priority}
            />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <span className="block text-[10px] sm:text-[11px] tracking-editorial uppercase text-ink-3 font-body font-medium">
            {fragrance.brand}
          </span>
          <h3 className="font-display text-[1.65rem] sm:text-[1.25rem] text-ink-1 font-light leading-[1.08] sm:leading-tight group-hover:text-gold-2 transition-colors duration-300">
            {fragrance.name}
          </h3>
          <div className="flex items-center gap-3 pt-1">
            <span className="text-[13px] sm:text-[12px] text-ink-3 font-body">
              {fragrance.launchYear}
            </span>
            <span className="w-px h-3 bg-line" />
            <span className="text-[13px] sm:text-[12px] text-ink-3 font-body">
              <span className="text-gold-1">{fragrance.ratingValue.toFixed(1)}</span>
              {" · "}
              {fragrance.ratingCount.toLocaleString()} votes
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
