const forumSections = [
  {
    title: "Oud Starter Guides",
    threads: 26,
    posts: 184,
    description: "Entry pathways for people moving from designer scents into niche Oud.",
  },
  {
    title: "Daily Wear vs. Statement Oud",
    threads: 42,
    posts: 509,
    description: "Compare projection, seasonality, office-wearability, and skin chemistry.",
  },
  {
    title: "Regional Craft & Artisanal Houses",
    threads: 31,
    posts: 292,
    description: "Independent makers from GCC, South Asia, and Europe doing serious Oud work.",
  },
  {
    title: "Launch Watch",
    threads: 19,
    posts: 103,
    description: "Early reactions to new drops from premium and boutique brands.",
  },
];

export default function ForumPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Community</p>
      <h1 className="mt-2 text-3xl font-semibold text-zinc-100">Oud Forum</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">
        Structure discussions around practical discovery, deep enthusiast knowledge, and launch
        conversations that matter to premium brands.
      </p>

      <section className="mt-8 space-y-3">
        {forumSections.map((section) => (
          <article
            key={section.title}
            className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-zinc-100">{section.title}</h2>
                <p className="mt-1 text-sm text-zinc-300">{section.description}</p>
              </div>
              <dl className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                <Metric label="Threads" value={String(section.threads)} />
                <Metric label="Posts" value={String(section.posts)} />
              </dl>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-right">
      <dt className="uppercase tracking-wide text-zinc-400">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-zinc-100">{value}</dd>
    </div>
  );
}
