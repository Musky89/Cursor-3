import Image from "next/image";
import Link from "next/link";
import type { FragranceRecord } from "@/lib/fragrances";

type Props = {
  fragrance: FragranceRecord;
};

export function FragranceCard({ fragrance }: Props) {
  return (
    <article className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-lg shadow-black/30">
      <Link href={`/fragrance/${fragrance.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-zinc-800">
          <Image
            src={fragrance.imageUrl}
            alt={fragrance.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
        </div>
        <div className="space-y-2 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-400">{fragrance.brand}</p>
          <h3 className="line-clamp-2 text-sm font-semibold text-zinc-100">{fragrance.name}</h3>
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>{fragrance.launchYear ?? "Year n/a"}</span>
            <span>
              {fragrance.ratingValue ? `${fragrance.ratingValue.toFixed(2)} / 5` : "Unrated"}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
