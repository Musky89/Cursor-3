import Image from "next/image";
import Link from "next/link";
import type { FragranceRecord } from "@/lib/fragrances";

type Props = {
  fragrance: FragranceRecord;
};

export function FragranceCard({ fragrance }: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] shadow-xl shadow-black/35 transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--gold)]/40">
      <Link href={`/fragrance/${fragrance.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
          <Image
            src={fragrance.imageUrl}
            alt={fragrance.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
          {fragrance.ratingValue ? (
            <span className="absolute right-3 top-3 rounded-full border border-[color:var(--gold)]/60 bg-black/60 px-2 py-1 text-[11px] text-[color:var(--gold-soft)]">
              {fragrance.ratingValue.toFixed(2)}
            </span>
          ) : null}
        </div>
        <div className="space-y-2 p-4">
          <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-400">{fragrance.brand}</p>
          <h3 className="line-clamp-2 font-serif text-lg leading-tight text-zinc-100">
            {fragrance.name}
          </h3>
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>{fragrance.launchYear ?? "Year n/a"}</span>
            <span>{fragrance.ratingCount ? `${fragrance.ratingCount} votes` : "Unrated"}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
