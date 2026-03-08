import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFragranceBySlug, getFragrancesByBrand } from "@/lib/data";
import { FragranceCard } from "@/components/fragrance-card";
import { MetricBadge } from "@/components/metric-badge";
import { CTAButton } from "@/components/cta-button";

interface FragrancePageProps {
  params: { slug: string };
}

export default function FragrancePage({ params }: FragrancePageProps) {
  const fragrance = getFragranceBySlug(params.slug);

  if (!fragrance) {
    notFound();
  }

  const siblings = getFragrancesByBrand(fragrance.brand).filter(
    (f) => f.id !== fragrance.id
  );

  // Generate a poetic subtitle from the first 3 notes
  const poeticNotes = fragrance.notes.slice(0, 3).join(", ");

  return (
    <>
      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-7 md:py-20">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-10 flex items-center gap-2 text-[11px] md:text-[12px] text-ink-3 font-body">
          <Link
            href="/directory"
            className="hover:text-ink-2 transition-colors"
          >
            Directory
          </Link>
          <span className="text-line">/</span>
          <span className="text-ink-2">{fragrance.brand}</span>
          <span className="text-line">/</span>
          <span className="text-gold-1/70">{fragrance.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Bottle visual */}
          <div className="lg:col-span-5">
            <div className="bottle-frame aspect-[3/4] flex items-center justify-center p-6 sm:p-8 md:p-14 lg:sticky lg:top-28">
              <div className="relative w-full h-full flex items-center justify-center bottle-glow">
                <Image
                  src={fragrance.imageUrl}
                  alt={`${fragrance.name} by ${fragrance.brand}`}
                  width={375}
                  height={500}
                  priority
                  className="bottle-image relative z-10 object-contain w-auto h-full max-h-full drop-shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* Info column */}
          <div className="lg:col-span-6 lg:col-start-7 py-2 md:py-4">
            {/* House name */}
            <span className="block text-[11px] tracking-editorial uppercase text-gold-1 font-body font-medium mb-4">
              {fragrance.brand}
            </span>

            {/* Composition name */}
            <h1 className="font-display text-display-xl text-ink-1 font-light mb-3">
              {fragrance.name}
            </h1>

            {/* Poetic subtitle */}
            <p className="font-display text-[1.05rem] text-ink-3 italic mb-8 md:mb-10">
              A study in {poeticNotes.toLowerCase()}
            </p>

            {/* Metrics row */}
            <div className="grid grid-cols-3 border border-line/40 divide-x divide-line/40 mb-8 md:mb-10">
              <MetricBadge label="Year" value={fragrance.launchYear} />
              <MetricBadge
                label="Rating"
                value={fragrance.ratingValue.toFixed(2)}
              />
              <MetricBadge
                label="Votes"
                value={fragrance.ratingCount.toLocaleString()}
              />
            </div>

            {/* Description */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-[11px] tracking-editorial uppercase text-ink-3 font-body font-medium mb-4">
                Composition Notes
              </h2>
              <p className="text-ink-2 text-[15px] leading-[1.85]">
                {fragrance.description}
              </p>
            </div>

            {/* Notes tags */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-[11px] tracking-editorial uppercase text-ink-3 font-body font-medium mb-4">
                Olfactive Pyramid
              </h2>
              <div className="flex flex-wrap gap-2">
                {fragrance.notes.map((note) => (
                  <span
                    key={note}
                    className="px-3.5 py-1.5 text-[12px] text-ink-2 border border-line/50 font-body hover:border-gold-1/30 hover:text-gold-2 transition-all duration-300 cursor-default"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="divider-fine mb-8" />

            {/* Source link */}
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-ink-3 font-body">
                External reference
              </span>
              <a
                href={fragrance.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-ink-3 hover:text-gold-2 transition-colors font-body underline underline-offset-4 decoration-line/50"
              >
                View on Fragrantica →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── MORE FROM THIS HOUSE ── */}
      {siblings.length > 0 && (
        <section className="border-t border-line/30 mt-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="mb-12">
              <span className="inline-block text-[11px] tracking-editorial uppercase text-gold-1 mb-4 font-body font-medium">
                From the same house
              </span>
              <h2 className="font-display text-display-md text-ink-1 font-light">
                More by {fragrance.brand}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-7 md:gap-y-14">
              {siblings.slice(0, 4).map((frag) => (
                <FragranceCard key={frag.id} fragrance={frag} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BACK TO DIRECTORY CTA ── */}
      <section className="border-t border-line/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 text-center">
          <CTAButton href="/directory" variant="ghost">
            Return to the full archive
          </CTAButton>
        </div>
      </section>
    </>
  );
}
