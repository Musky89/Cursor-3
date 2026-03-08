import { SectionHeader } from "@/components/section-header";
import { CTAButton } from "@/components/cta-button";

const packages = [
  {
    name: "Archive Presence",
    positioning: "Foundation",
    description:
      "Your compositions documented in the Oud Atlas archive with editorial care — accurate metadata, thoughtful descriptions, and proper contextualization within the broader olfactive landscape.",
    inclusions: [
      "Full composition listing with editorial descriptions",
      "High-fidelity bottle imagery integration",
      "Olfactive pyramid documentation",
      "House profile in the directory",
    ],
    investment: "Complimentary",
    note: "Available to all houses with verifiable compositions",
  },
  {
    name: "Editorial Feature",
    positioning: "Signature",
    description:
      "A dedicated editorial treatment that gives your compositions the narrative context they deserve — written by our editorial team with the depth and sensibility of a print feature.",
    inclusions: [
      "Long-form composition narrative (per fragrance)",
      "Featured placement in curated selections",
      "Salon discussion seeding with engaged audience",
      "Cross-referencing with related compositions",
      "Priority archive listing",
    ],
    investment: "By Arrangement",
    note: "Limited to twelve houses per quarter",
  },
  {
    name: "Launch Atelier",
    positioning: "Premier",
    description:
      "A full editorial launch experience for new compositions — the digital equivalent of an intimate press preview, designed to build anticipation among collectors and connoisseurs.",
    inclusions: [
      "Pre-launch editorial teaser campaign",
      "Dedicated composition narrative and visual story",
      "Exclusive Salon preview for engaged members",
      "Persistent featured placement for launch quarter",
      "House interview or creative director profile",
      "Post-launch community sentiment report",
    ],
    investment: "By Arrangement",
    note: "Limited to four launches per quarter",
  },
];

export default function BrandsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
      {/* Narrative intro */}
      <div className="max-w-3xl mb-20 md:mb-28">
        <SectionHeader
          kicker="For Houses"
          title="Present your work in its proper context"
        />
        <div className="space-y-5 text-ink-3 text-[15px] leading-[1.8] -mt-4">
          <p>
            The fragrance industry has no shortage of platforms. What it lacks is a space where
            compositions are treated as creative work rather than product listings — where the
            audience arrives with genuine curiosity about craft, materials, and the human decisions
            behind a blend.
          </p>
          <p className="text-ink-2">
            Oud Atlas is that space. We offer houses an editorial stage built for the specific
            demands of fine fragrance: unhurried, visually restrained, and populated by collectors
            who read note pyramids the way gallery visitors read exhibition cards.
          </p>
        </div>
      </div>

      {/* Packages */}
      <div className="space-y-6 md:space-y-8 mb-24 md:mb-32">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="border border-line/40 hover:border-line/60 transition-colors duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left column: name + positioning */}
              <div className="lg:col-span-4 p-8 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-line/30 flex flex-col justify-between">
                <div>
                  <span className="inline-block text-[10px] tracking-editorial uppercase text-gold-1/70 font-body font-medium mb-3">
                    {pkg.positioning}
                  </span>
                  <h3 className="font-display text-display-sm text-ink-1 font-light mb-3">
                    {pkg.name}
                  </h3>
                  <p className="text-ink-3 text-[13px] leading-[1.7]">{pkg.description}</p>
                </div>

                <div className="mt-8">
                  <span className="font-display text-[1.3rem] text-gold-2 font-light">
                    {pkg.investment}
                  </span>
                  {pkg.note && (
                    <p className="text-[11px] text-ink-3/60 mt-2 italic font-display">{pkg.note}</p>
                  )}
                </div>
              </div>

              {/* Right column: inclusions */}
              <div className="lg:col-span-8 p-8 md:p-10 lg:p-12">
                <span className="block text-[10px] tracking-editorial uppercase text-ink-3 font-body font-medium mb-6">
                  What&apos;s included
                </span>
                <div className="space-y-4">
                  {pkg.inclusions.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gold-1/50 flex-shrink-0 group-hover:bg-gold-1 transition-colors" />
                      <span className="text-ink-2 text-[14px] leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Execution promise */}
      <section className="border-t border-line/30 pt-16 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="inline-block text-[11px] tracking-editorial uppercase text-gold-1 mb-6 font-body font-medium">
              Our Promise
            </span>
            <h2 className="font-display text-display-md text-ink-1 font-light">
              Execution at the level
              <br />
              <span className="italic text-gold-2">your craft demands</span>
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 space-y-8">
            {[
              {
                title: "Editorial integrity",
                text: "Every composition is reviewed and described by our editorial team — not generated, not templated, not rushed. We write about fragrance the way we believe it should be written about.",
              },
              {
                title: "Audience quality",
                text: "Our readership consists of collectors, industry professionals, and serious enthusiasts. Not casual browsers. Not coupon seekers. People who understand and value craft.",
              },
              {
                title: "Visual restraint",
                text: "Your compositions are presented in a visual environment designed to communicate quality through negative space, considered typography, and the absence of visual noise.",
              },
              {
                title: "No algorithmic manipulation",
                text: "Placement is editorial, not paid. Featured status is earned by the quality and interest of the composition, not the size of the marketing budget.",
              },
            ].map((promise) => (
              <div key={promise.title} className="space-y-2">
                <h3 className="font-display text-[1.05rem] text-ink-1 font-light">
                  {promise.title}
                </h3>
                <p className="text-ink-3 text-[14px] leading-[1.75]">{promise.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center border-t border-line/30 pt-16">
          <p className="font-display text-display-sm text-ink-2 font-light italic mb-6">
            Interested in presenting your house on Oud Atlas?
          </p>
          <CTAButton href="mailto:houses@oudatlas.com">Begin a Conversation</CTAButton>
        </div>
      </section>
    </div>
  );
}
