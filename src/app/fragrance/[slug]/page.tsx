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
  const similar = oudFragrances
    .filter((item) => item.brand === fragrance.brand && item.slug !== fragrance.slug)
    .slice(0, 4);
  const impression = fragrance.notes.length
    ? `${fragrance.notes.slice(0, 3).join(" • ")}`
    : "Dark woods • warm resin • quiet smoke";

  return (
    <main className="lux-container py-10">
      <Link href="/directory" className="text-sm text-[color:var(--gold-soft)] hover:underline">
        ← Back to directory
      </Link>

      <section className="lux-panel mt-4 grid gap-8 p-6 sm:grid-cols-[340px_1fr]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[color:var(--line)] bg-zinc-900">
          <Image
            src={fragrance.imageUrl}
            alt={fragrance.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 340px"
          />
        </div>
        <div>
          <p className="lux-eyebrow">{fragrance.brand}</p>
          <h1 className="mt-2 font-serif text-4xl leading-tight text-zinc-100">{fragrance.name}</h1>
          <p className="mt-3 font-serif text-lg text-[color:var(--gold-soft)]/90">{impression}</p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">{fragrance.description}</p>

          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm md:max-w-md">
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
                    className="rounded-full border border-[color:var(--line)] bg-black/40 px-3 py-1 text-xs text-zinc-200"
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
            className="mt-6 inline-block rounded-full bg-[color:var(--gold)] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[color:var(--gold-soft)]"
          >
            View source on Fragrantica
          </a>
        </div>
      </section>

      {similar.length > 0 ? (
        <section className="mt-8">
          <h2 className="font-serif text-2xl text-zinc-100">More from {fragrance.brand}</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {similar.map((item) => (
              <Link
                key={item.slug}
                href={`/fragrance/${item.slug}`}
                className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] p-3 text-sm text-zinc-200 transition hover:border-[color:var(--gold)]/40"
              >
                <p className="line-clamp-2 font-medium">{item.name}</p>
                <p className="mt-1 text-xs text-zinc-400">{item.launchYear ?? "Year n/a"}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--line)] bg-black/35 px-3 py-2">
      <dt className="text-xs uppercase tracking-wide text-zinc-400">{label}</dt>
      <dd className="mt-1 font-medium text-zinc-100">{value}</dd>
    </div>
  );
}
