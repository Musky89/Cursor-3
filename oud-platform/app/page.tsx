import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, TrendingUp, Sparkles, Users } from "lucide-react";
import { FragranceCard } from "@/components/FragranceCard";
import { SectionHeader } from "@/components/SectionHeader";
import {
  getFeaturedFragrances,
  getTrendingFragrances,
  getNewReleases,
  getStats,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const topRated = getFeaturedFragrances(8);
  const trending = getTrendingFragrances(8);
  const newReleases = getNewReleases(8);
  const stats = getStats();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-900/20 via-bg-primary to-bg-primary" />
        <div className="absolute inset-0 bg-noise opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-700/30 bg-gold-900/20 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-gold-400" />
              <span className="text-xs font-medium text-gold-300">
                {stats.fragranceCount.toLocaleString()} Oud Fragrances &middot;{" "}
                {stats.brandCount.toLocaleString()} Brands
              </span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient-gold">The World of Oud,</span>
              <br />
              <span className="text-text-primary">at Your Fingertips</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Explore the most comprehensive directory of oud fragrances. From
              timeless Arabian classics to modern niche masterpieces — discover
              your next signature scent.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/directory"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-700 px-6 py-3 text-sm font-semibold text-bg-primary shadow-lg shadow-gold-900/30 transition-all hover:from-gold-400 hover:to-gold-600 hover:shadow-gold-900/40"
              >
                Explore Directory
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/forum"
                className="inline-flex items-center gap-2 rounded-lg border border-border-primary bg-bg-secondary px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:border-gold-700/40 hover:bg-bg-tertiary"
              >
                <Users className="h-4 w-4" />
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border-subtle bg-bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              {
                label: "Oud Fragrances",
                value: stats.fragranceCount.toLocaleString(),
              },
              { label: "Houses & Brands", value: stats.brandCount.toLocaleString() },
              {
                label: "Countries",
                value: stats.topCountries.length.toString(),
              },
              { label: "Community Topics", value: "Growing" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl font-bold text-gold-400">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          title="Trending Now"
          subtitle="The most talked-about oud fragrances"
          href="/directory?sort=reviews"
          linkText="View all trending"
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {trending.map((f) => (
            <FragranceCard key={f.id} fragrance={f} />
          ))}
        </div>
      </section>

      {/* Top Rated */}
      <section className="border-y border-border-subtle bg-bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            title="Highest Rated"
            subtitle="The finest oud fragrances by community rating"
            href="/directory?sort=rating"
            linkText="View all top rated"
          />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {topRated.map((f) => (
              <FragranceCard key={f.id} fragrance={f} />
            ))}
          </div>
        </div>
      </section>

      {/* New Launches */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          title="New Releases"
          subtitle="The latest oud fragrances hitting the market"
          href="/launches"
          linkText="View all launches"
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {newReleases.map((f) => (
            <FragranceCard key={f.id} fragrance={f} />
          ))}
        </div>
      </section>

      {/* Top Origins */}
      <section className="border-t border-border-subtle bg-bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader title="Top Origins" subtitle="Where the finest oud houses call home" />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {stats.topCountries.map((c) => (
              <Link
                key={c.country}
                href={`/brands?country=${encodeURIComponent(c.country)}`}
                className="group flex flex-col items-center gap-2 rounded-xl border border-border-subtle bg-bg-card p-5 transition-all hover:border-gold-700/40 hover:bg-bg-card-hover"
              >
                <span className="text-base font-medium text-text-primary transition-colors group-hover:text-gold-300">
                  {c.country}
                </span>
                <span className="text-xs text-text-muted">
                  {c.count} fragrances
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for Brands */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-gold-700/20 bg-gradient-to-br from-gold-900/30 via-bg-secondary to-bg-secondary p-8 sm:p-12">
            <div className="absolute inset-0 bg-noise opacity-30" />
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
                Are You an Oud Brand?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                Showcase your latest oud creations to a passionate community of
                fragrance enthusiasts. Feature your new launches on OudBase and
                reach thousands of dedicated oud lovers.
              </p>
              <Link
                href="/launches"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-700 px-6 py-3 text-sm font-semibold text-bg-primary transition-all hover:from-gold-400 hover:to-gold-600"
              >
                Partner With Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
