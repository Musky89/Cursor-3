import Link from "next/link";
import { oudBrands, oudFragrances } from "@/lib/fragrances";

export default function Home() {
  const fragranceCount = oudFragrances.length;
  const brandCount = oudBrands.length;

  return (
    <main className="bg-zinc-950">
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6">
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-zinc-900 via-zinc-900 to-amber-900/20 p-8 shadow-2xl shadow-black/40 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            Directory + community + launches
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-zinc-100 sm:text-5xl">
            The high-trust digital home for Oud discovery and premium brand launches.
          </h1>
          <p className="mt-5 max-w-2xl text-zinc-300">
            Build community first, then convert the audience into monetizable launch demand for
            premium Oud houses.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatCard label="Oud entries scraped" value={String(fragranceCount)} />
            <StatCard label="Brands represented" value={String(brandCount)} />
            <StatCard label="Monetization rails" value="4" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/directory"
              className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-amber-200"
            >
              Browse Directory
            </Link>
            <Link
              href="/brands"
              className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-semibold text-zinc-100 transition hover:border-amber-300 hover:text-amber-300"
            >
              Launch Program
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Panel
            title="Audience flywheel"
            body="Directory + reviews + forum conversations generate recurring traffic and user-generated content."
          />
          <Panel
            title="Revenue path"
            body="Paid launch placements, premium brand pages, affiliate links, and members-only early access."
          />
          <Panel
            title="Data moat"
            body="Maintain an Oud-specific dataset and insight layer that generic fragrance sites do not prioritize."
          />
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-5">
      <p className="text-xs uppercase tracking-wide text-zinc-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-100">{value}</p>
    </div>
  );
}

function Panel({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-300">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{body}</p>
    </article>
  );
}
