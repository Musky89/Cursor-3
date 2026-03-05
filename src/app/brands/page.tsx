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
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Monetization</p>
      <h1 className="mt-2 text-3xl font-semibold text-zinc-100">
        Premium Oud brand launch program
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
        Start with community trust and organic discovery, then sell launch outcomes. Packages are
        designed for premium houses that want qualified enthusiasts instead of generic reach.
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {packages.map((pkg) => (
          <article
            key={pkg.name}
            className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-xl shadow-black/20"
          >
            <h2 className="text-lg font-semibold text-zinc-100">{pkg.name}</h2>
            <p className="mt-1 text-amber-300">{pkg.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {pkg.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="text-amber-300">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
