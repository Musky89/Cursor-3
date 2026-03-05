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
        <div className="lux-panel overflow-hidden p-7 sm:p-10">
          <p className="lux-kicker">Niche Fragrance Culture • Built for Oud</p>
          <h1 className="lux-title mt-4 max-w-4xl">
            A fragrance platform that looks and feels like the product category it represents.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">
            Directory precision, community depth, and launch infrastructure for premium houses —
            designed for collectors, not generic traffic.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/directory"
              className="rounded-full bg-[color:var(--gold)] px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-[color:var(--gold-soft)]"
            >
              Explore Directory
            </Link>
            <Link
              href="/brands"
              className="rounded-full border border-[color:var(--line)] px-6 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-[color:var(--gold)]/60 hover:text-[color:var(--gold-soft)]"
            >
              Launch With Oud Atlas
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatCard label="Oud fragrances" value={String(fragranceCount)} />
          <StatCard label="Brands covered" value={String(brandCount)} />
          <StatCard label="Revenue products" value="3" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Panel
            title="Audience flywheel"
            body="Editorial discovery + forum discussion + structured comparisons that compound over time."
          />
          <Panel
            title="Revenue path"
            body="Premium launch packages, sponsored drops, lead capture, and collector subscriptions."
          />
          <Panel
            title="Data moat"
            body="Oud-specific taxonomy and sentiment signal that mainstream fragrance properties rarely prioritize."
          />
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="lux-kicker">Featured now</p>
              <h2 className="mt-1 font-serif text-3xl text-zinc-100">Collector interest picks</h2>
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
      <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">{label}</p>
      <p className="mt-2 text-xl font-semibold text-zinc-100 sm:text-2xl">{value}</p>
    </div>
  );
}

function Panel({ title, body }: { title: string; body: string }) {
  return (
    <article className="lux-panel p-5">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--gold-soft)]">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{body}</p>
    </article>
  );
}
