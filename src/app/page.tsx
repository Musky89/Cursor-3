import Link from "next/link";
import { oudBrands, oudFragrances } from "@/lib/fragrances";
import { FragranceCard } from "@/components/fragrance-card";

export default function Home() {
  const fragranceCount = oudFragrances.length;
  const brandCount = oudBrands.length;
  const featured = oudFragrances.slice(0, 4);

  return (
    <main className="pb-16 pt-10 sm:pb-20 sm:pt-14">
      <section className="lux-container">
        <div className="lux-panel relative overflow-hidden p-7 sm:p-11">
          <div className="absolute -left-16 -top-14 h-56 w-56 rounded-full bg-[color:var(--gold)]/10 blur-3xl" />
          <p className="lux-eyebrow">A fragrance journal, not a commodity feed</p>
          <h1 className="lux-title mt-4 max-w-4xl">
            Enter the world of Oud through memory, ritual, and emotion.
          </h1>
          <p className="lux-subtle mt-5 max-w-2xl text-base">
            Oud Atlas is built like a fine fragrance house note: dark woods, warm resin, human
            stories. Discover scents through atmosphere, craftsmanship, and the people who wear
            them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/directory"
              className="rounded-full bg-[color:var(--gold)] px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-[color:var(--gold-soft)]"
            >
              Begin Discovery
            </Link>
            <Link
              href="/brands"
              className="rounded-full border border-[color:var(--line)] px-6 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-[color:var(--gold)]/60 hover:text-[color:var(--gold-soft)]"
            >
              For Fragrance Houses
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatCard label="Compositions" value={String(fragranceCount)} />
          <StatCard label="Houses" value={String(brandCount)} />
          <StatCard label="Editorial rhythm" value="Daily curation" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Panel
            title="Scent-led discovery"
            body="Browse by mood, note families, and artisanal signatures rather than algorithmic noise."
          />
          <Panel
            title="Collector conversation"
            body="A community layer designed for nuanced wear reports, comparisons, and rituals."
          />
          <Panel
            title="Launch atelier"
            body="Premium houses can unveil new work in a context that preserves story and craft."
          />
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="lux-eyebrow">Featured now</p>
              <h2 className="mt-1 font-serif text-3xl text-zinc-100">Compositions in focus</h2>
            </div>
            <Link href="/directory" className="text-sm text-[color:var(--gold-soft)] hover:underline">
              View full catalog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featured.map((fragrance) => (
              <FragranceCard key={fragrance.slug} fragrance={fragrance} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="lux-panel px-5 py-5">
      <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-400/90">{label}</p>
      <p className="mt-2 text-xl font-semibold text-zinc-100 sm:text-2xl">{value}</p>
    </div>
  );
}

function Panel({ title, body }: { title: string; body: string }) {
  return (
    <article className="lux-panel p-5">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-soft)]">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{body}</p>
    </article>
  );
}
