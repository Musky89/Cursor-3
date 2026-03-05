import Image from "next/image";
import Link from "next/link";
import { Star, Sparkles, ArrowRight, Mail } from "lucide-react";
import { getNewReleases } from "@/lib/queries";
import { FragranceCard } from "@/components/FragranceCard";
import { SectionHeader } from "@/components/SectionHeader";

export const dynamic = "force-dynamic";

export default function LaunchesPage() {
  const newReleases = getNewReleases(24);
  const featured = newReleases.slice(0, 3);
  const rest = newReleases.slice(3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-700/30 bg-gold-900/20 px-4 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-gold-400" />
          <span className="text-xs font-medium text-gold-300">
            Latest Launches
          </span>
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold text-text-primary sm:text-4xl">
          New Oud Releases
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">
          Discover the newest oud fragrances from the world&apos;s finest
          perfume houses. Be among the first to explore these latest creations.
        </p>
      </div>

      {/* Featured Launches */}
      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Featured Launches
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {featured.map((f) => (
              <Link
                key={f.id}
                href={`/directory/${f.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-gold-700/20 bg-gradient-to-b from-gold-900/20 to-bg-card transition-all hover:border-gold-700/40 hover:shadow-lg hover:shadow-gold-900/10"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {f.picture && (
                    <Image
                      src={f.picture}
                      alt={f.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="mb-2 inline-block rounded-full bg-gold-600/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {f.year}
                  </span>
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {f.name}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {f.brand}
                  </p>
                  {f.rating && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                      <span className="text-sm font-medium text-gold-300">
                        {f.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All New Releases */}
      {rest.length > 0 && (
        <section>
          <SectionHeader title="All New Releases" />
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {rest.map((f) => (
              <FragranceCard key={f.id} fragrance={f} />
            ))}
          </div>
        </section>
      )}

      {/* Brand CTA */}
      <section className="mt-16">
        <div className="rounded-2xl border border-gold-700/20 bg-gradient-to-br from-gold-900/30 via-bg-secondary to-bg-secondary p-8 sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
              Launch Your Oud Fragrance on OudBase
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Get your new oud creation in front of thousands of dedicated
              fragrance enthusiasts. Our featured launch program includes a
              premium showcase, community exposure, and editorial coverage.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Featured Spotlight",
                  desc: "Prime placement on our homepage and launches page",
                },
                {
                  title: "Community Buzz",
                  desc: "Dedicated forum discussion and community engagement",
                },
                {
                  title: "Editorial Coverage",
                  desc: "In-depth fragrance review and brand story feature",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border-subtle bg-bg-card/50 p-4 text-left"
                >
                  <h3 className="text-sm font-semibold text-gold-300">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-xs text-text-muted">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="mailto:brands@oudbase.com"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-700 px-6 py-3 text-sm font-semibold text-bg-primary transition-all hover:from-gold-400 hover:to-gold-600"
              >
                <Mail className="h-4 w-4" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
