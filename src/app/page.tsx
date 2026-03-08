import Image from "next/image";
import { CTAButton } from "@/components/cta-button";
import { SectionHeader } from "@/components/section-header";
import { FragranceCard } from "@/components/fragrance-card";
import { getFeaturedFragrances, getAllFragrances, getBrandCount } from "@/lib/data";

export default function HomePage() {
  const featured = getFeaturedFragrances(6);
  const totalFragrances = getAllFragrances().length;
  const brandCount = getBrandCount();

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background: deep atmospheric gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 65% 40%, rgba(214,176,106,0.04) 0%, transparent 60%),
              radial-gradient(ellipse 50% 70% at 20% 80%, rgba(26,24,21,0.9) 0%, transparent 60%),
              linear-gradient(175deg, #080706 0%, #0d0c0a 40%, #11100E 100%)
            `,
          }}
        />

        {/* Fine horizontal rule accent */}
        <div className="absolute top-[42%] left-0 right-0 h-px bg-line/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Text block */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2 animate-fade-up opacity-0">
                <span className="inline-block text-[11px] tracking-editorial uppercase text-gold-1 font-body font-medium">
                  The Fragrance Editorial
                </span>
              </div>

              <h1 className="font-display text-display-xl text-ink-1 font-light animate-fade-up opacity-0 stagger-1">
                Where every
                <br />
                composition finds
                <br />
                <span className="italic text-gold-2">its narrative</span>
              </h1>

              <p className="text-ink-3 text-[16px] leading-[1.75] max-w-lg animate-fade-up opacity-0 stagger-2">
                An archive built for those who read a pyramid of notes the way others read poetry
                — with patience, reverence, and an ear for what lingers in the dry-down.
              </p>

              <div className="flex items-center gap-6 pt-2 animate-fade-up opacity-0 stagger-3">
                <CTAButton href="/directory">Explore the Archive</CTAButton>
                <CTAButton href="/brands" variant="ghost">
                  For Houses
                </CTAButton>
              </div>
            </div>

            {/* Feature visual composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[520px] md:h-[620px] max-w-[470px] mx-auto lg:ml-auto animate-fade-in opacity-0 stagger-2">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 56% at 52% 48%, rgba(214,176,106,0.18) 0%, rgba(214,176,106,0.06) 30%, transparent 75%)",
                  }}
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] h-[88%] bottle-frame">
                  <div className="relative w-full h-full p-8 flex items-center justify-center bottle-glow">
                    <Image
                      src={featured[0].imageUrl}
                      alt={`${featured[0].name} by ${featured[0].brand}`}
                      width={375}
                      height={500}
                      priority
                      className="bottle-image-hero relative z-10 object-contain w-auto h-full max-h-[90%] drop-shadow-[0_26px_60px_rgba(0,0,0,0.45)]"
                    />
                  </div>
                </div>

                {/* Supporting bottles for richer hero depth */}
                <div className="absolute left-0 bottom-9 w-[36%] h-[48%] bottle-frame border-line/40">
                  <div className="relative w-full h-full p-4 flex items-end justify-center">
                    <Image
                      src={featured[1].imageUrl}
                      alt={`${featured[1].name} by ${featured[1].brand}`}
                      width={220}
                      height={293}
                      className="bottle-image object-contain w-auto h-full max-h-[92%] opacity-[0.85]"
                    />
                  </div>
                </div>

                <div className="absolute right-0 top-12 w-[30%] h-[40%] bottle-frame border-line/40">
                  <div className="relative w-full h-full p-3 flex items-center justify-center">
                    <Image
                      src={featured[2].imageUrl}
                      alt={`${featured[2].name} by ${featured[2].brand}`}
                      width={180}
                      height={240}
                      className="bottle-image object-contain w-auto h-full max-h-[90%] opacity-[0.8]"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-4 right-2 text-right bg-surface-900/70 border border-line/50 px-4 py-3 backdrop-blur-[2px]">
                  <span className="text-[10px] tracking-editorial uppercase text-ink-3 font-body">
                    Editorial highlight
                  </span>
                  <p className="font-display text-[1rem] text-ink-1 italic leading-tight">
                    {featured[0].name}
                  </p>
                  <p className="text-[11px] text-ink-3">{featured[0].brand}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED COMPOSITIONS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionHeader
          kicker="Selected Works"
          title="Notable compositions"
          subtitle="Curated from the archive — these are the fragrances that define houses, shift conversations, and reward repeated wear."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
          {featured.map((frag, i) => (
            <FragranceCard
              key={frag.id}
              fragrance={frag}
              priority={i < 3}
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <CTAButton href="/directory" variant="ghost">
            Browse the full archive
          </CTAButton>
        </div>
      </section>

      {/* ── EDITORIAL MISSION ── */}
      <section className="border-y border-line/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="inline-block text-[11px] tracking-editorial uppercase text-gold-1 mb-6 font-body font-medium">
                Our Position
              </span>
              <h2 className="font-display text-display-lg text-ink-1 font-light leading-[1.1]">
                Fragrance
                <br />
                deserves better
                <br />
                <span className="italic text-gold-2">criticism.</span>
              </h2>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 space-y-6">
              <p className="text-ink-2 text-[16px] leading-[1.8]">
                The current landscape of fragrance media is dominated by affiliate links and
                algorithmic recommendations. Compositions are reduced to star ratings. Houses are
                ranked by marketing spend. The art is lost.
              </p>
              <p className="text-ink-3 text-[15px] leading-[1.8]">
                Oud Atlas exists as an alternative — a quiet archive where every composition is
                documented with the same care a gallery gives to its permanent collection. No
                sponsored placements. No trending algorithms. Just the work, in its own context.
              </p>
              <div className="pt-4 flex items-center gap-8">
                <div>
                  <span className="font-display text-[2rem] text-ink-1 font-light">
                    {totalFragrances}
                  </span>
                  <span className="block text-[10px] tracking-editorial uppercase text-ink-3 mt-1">
                    Compositions
                  </span>
                </div>
                <div className="w-px h-10 bg-line" />
                <div>
                  <span className="font-display text-[2rem] text-ink-1 font-light">
                    {brandCount}
                  </span>
                  <span className="block text-[10px] tracking-editorial uppercase text-ink-3 mt-1">
                    Houses
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY THIS EXISTS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Collectors */}
          <div className="border border-line/40 p-10 md:p-14 space-y-5 group hover:border-line/70 transition-colors duration-500">
            <span className="inline-block text-[11px] tracking-editorial uppercase text-gold-1 font-body font-medium">
              For Collectors
            </span>
            <h3 className="font-display text-display-sm text-ink-1 font-light">
              Your reference library
            </h3>
            <p className="text-ink-3 text-[14px] leading-[1.75]">
              A curated archive where every composition is contextualized — year of release,
              olfactive pyramid, house lineage. No distractions, no affiliate noise. Discover
              compositions through editorial curation, not an algorithm.
            </p>
            <CTAButton href="/directory" variant="ghost" size="compact">
              Enter the directory
            </CTAButton>
          </div>

          {/* For Houses */}
          <div className="border border-line/40 p-10 md:p-14 space-y-5 group hover:border-line/70 transition-colors duration-500">
            <span className="inline-block text-[11px] tracking-editorial uppercase text-gold-1 font-body font-medium">
              For Houses
            </span>
            <h3 className="font-display text-display-sm text-ink-1 font-light">
              An editorial stage
            </h3>
            <p className="text-ink-3 text-[14px] leading-[1.75]">
              Present your compositions in a context that matches their craft. Oud Atlas offers
              houses an editorial launch venue — designed to communicate quality, narrative, and
              artistry to an audience that cares about the work.
            </p>
            <CTAButton href="/brands" variant="ghost" size="compact">
              Partnership details
            </CTAButton>
          </div>
        </div>
      </section>

      {/* ── CLOSING QUOTE ── */}
      <section className="border-t border-line/30">
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
          <blockquote>
            <p className="font-display text-display-md text-ink-1 font-light italic leading-[1.35]">
              &ldquo;A great perfume is one that makes you feel something you can&rsquo;t name —
              something between a memory and a premonition.&rdquo;
            </p>
          </blockquote>
          <div className="divider-gold w-12 mx-auto mt-10 mb-6" />
          <p className="text-[12px] tracking-editorial uppercase text-ink-3 font-body">
            The Oud Atlas Editors
          </p>
        </div>
      </section>
    </>
  );
}
