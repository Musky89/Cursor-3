import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFragranceBySlug, oudFragrances } from "@/lib/fragrances";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return oudFragrances.map((item) => ({ slug: item.slug }));
}

export default async function FragranceDetailPage({ params }: Props) {
  const { slug } = await params;
  const fragrance = getFragranceBySlug(slug);
  if (!fragrance) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link href="/directory" className="text-sm text-amber-300 hover:text-amber-200">
        ← Back to directory
      </Link>

      <section className="mt-4 grid gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:grid-cols-[280px_1fr]">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800">
          <Image
            src={fragrance.imageUrl}
            alt={fragrance.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 280px"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">{fragrance.brand}</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-100">{fragrance.name}</h1>
          <p className="mt-4 text-sm leading-6 text-zinc-300">{fragrance.description}</p>

          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Meta label="Launch year" value={fragrance.launchYear?.toString() ?? "N/A"} />
            <Meta
              label="Rating"
              value={
                fragrance.ratingValue
                  ? `${fragrance.ratingValue.toFixed(2)} / 5 (${fragrance.ratingCount ?? 0})`
                  : "N/A"
              }
            />
          </dl>

          {fragrance.notes.length > 0 && (
            <div className="mt-5">
              <h2 className="text-xs uppercase tracking-[0.15em] text-zinc-400">Detected notes</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {fragrance.notes.slice(0, 12).map((note) => (
                  <span
                    key={note}
                    className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs text-zinc-200"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          <a
            href={fragrance.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-200"
          >
            View source on Fragrantica
          </a>
        </div>
      </section>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">
      <dt className="text-xs uppercase tracking-wide text-zinc-400">{label}</dt>
      <dd className="mt-1 font-medium text-zinc-100">{value}</dd>
    </div>
  );
}
