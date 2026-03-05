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
    <main className="lux-container py-10">
      <div className="lux-panel p-7 sm:p-8">
        <p className="lux-eyebrow">Community Salon</p>
        <h1 className="mt-2 font-serif text-4xl text-zinc-100">Oud Forum</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-300">
          The conversation layer for people who care how a scent unfolds after 10 minutes, 2 hours,
          and the next morning.
        </p>
      </div>

      <section className="mt-8 space-y-3">
        {forumSections.map((section) => (
          <article
            key={section.title}
            className="lux-panel p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl text-zinc-100">{section.title}</h2>
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

      <div className="lux-panel mt-8 p-6">
        <h2 className="font-serif text-2xl text-zinc-100">Planned interaction model</h2>
        <ul className="mt-3 space-y-2 text-sm text-zinc-300">
          <li>• Wear diary threads that capture opening, heart, and dry-down over time.</li>
          <li>• Moderator-curated launch conversations for high-signal brand interaction.</li>
          <li>• Structured comparison templates for projection, longevity, and mood profile.</li>
        </ul>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--line)] bg-black/35 px-3 py-2 text-right">
      <dt className="uppercase tracking-wide text-zinc-400">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-zinc-100">{value}</dd>
    </div>
  );
}
