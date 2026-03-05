const packages = [
  {
    name: "Founder Launch",
    price: "$1,500 / launch",
    bullets: [
      "Editorial launch page",
      "Homepage spotlight for 7 days",
      "Community AMA thread",
      "Email + social announcement",
    ],
  },
  {
    name: "Collector Release",
    price: "$4,500 / launch",
    bullets: [
      "Everything in Founder Launch",
      "Video + photo gallery module",
      "Waitlist and lead capture",
      "Post-launch report dashboard",
    ],
  },
  {
    name: "Signature Partnership",
    price: "Custom annual",
    bullets: [
      "Quarterly launch allocation",
      "Co-branded education series",
      "Private event and sampling funnel",
      "Priority audience segmentation",
    ],
  },
];

export default function BrandsPage() {
  return (
    <main className="lux-container py-10">
      <div className="lux-panel p-7 sm:p-8">
        <p className="lux-eyebrow">For Fragrance Houses</p>
        <h1 className="mt-2 font-serif text-4xl text-zinc-100">
          Premium Oud brand launch program
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300">
          Your launches deserve an environment with tone, story, and informed audiences. We publish
          introductions like editorial work — not banner placements.
        </p>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {packages.map((pkg) => (
          <article
            key={pkg.name}
            className="lux-panel p-5"
          >
            <h2 className="font-serif text-2xl text-zinc-100">{pkg.name}</h2>
            <p className="mt-1 text-[color:var(--gold-soft)]">{pkg.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {pkg.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="text-[color:var(--gold)]">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <div className="lux-panel mt-8 p-6">
        <h2 className="font-serif text-2xl text-zinc-100">Execution promise to partner brands</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-300">
          This is not ad inventory. Each launch combines narrative positioning, community
          conversation, and post-drop performance reporting so brands can track qualified demand.
        </p>
      </div>
    </main>
  );
}
