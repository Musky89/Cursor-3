import { SectionHeader } from "@/components/section-header";
import { CTAButton } from "@/components/cta-button";

const programs = [
  {
    name: "Directory Listing",
    fit: "For every brand",
    timeline: "5 business days",
    deliverables: [
      "Dedicated brand profile",
      "Composition pages with notes, year, and ratings",
      "Bottle image and launch metadata QA",
      "Inclusion in search and filter experience",
    ],
  },
  {
    name: "Launch Feature",
    fit: "For new release campaigns",
    timeline: "2-3 weeks",
    deliverables: [
      "Hero placement on the homepage during launch window",
      "Structured launch page with key claims and materials",
      "Forum thread kickoff with moderation",
      "Post-launch engagement summary (views, saves, discussion volume)",
    ],
  },
  {
    name: "Brand Partnership",
    fit: "For quarterly collaboration",
    timeline: "Monthly cadence",
    deliverables: [
      "Recurring launch slots",
      "Editorial calendar planning with your team",
      "Early access feedback thread with top contributors",
      "Quarterly performance review and recommendations",
    ],
  },
];

export default function BrandsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-24">
      <div className="max-w-3xl mb-12 md:mb-16">
        <SectionHeader
          kicker="For Brands"
          title="Launch and grow on Oud Atlas"
          subtitle="A practical collaboration model for fragrance brands: clear deliverables, clear timelines, and collector-grade audience quality."
        />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-14 md:mb-20">
        {[
          { label: "Audience fit", value: "Collectors + informed buyers" },
          { label: "Content model", value: "Directory + launch features + forum" },
          { label: "Reporting", value: "Views, engagement, discussion metrics" },
        ].map((item) => (
          <article key={item.label} className="border border-line/40 p-5 md:p-6">
            <span className="block text-[10px] tracking-editorial uppercase text-ink-3 mb-2">
              {item.label}
            </span>
            <p className="text-ink-1 text-[15px]">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="mb-16 md:mb-24">
        <h2 className="font-display text-[2rem] md:text-display-sm text-ink-1 font-light mb-6 md:mb-8">
          Programs
        </h2>
        <div className="space-y-4 md:space-y-6">
          {programs.map((program) => (
            <article key={program.name} className="border border-line/40">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-4 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-line/30">
                  <h3 className="font-display text-[2rem] md:text-[1.45rem] text-ink-1 font-light mb-2">
                    {program.name}
                  </h3>
                  <p className="text-[13px] text-ink-3 mb-1">
                    <span className="text-ink-2">Best fit:</span> {program.fit}
                  </p>
                  <p className="text-[13px] text-ink-3">
                    <span className="text-ink-2">Timeline:</span> {program.timeline}
                  </p>
                </div>
                <div className="lg:col-span-8 p-6 md:p-8">
                  <span className="block text-[10px] tracking-editorial uppercase text-ink-3 mb-4">
                    Deliverables
                  </span>
                  <ul className="space-y-3">
                    {program.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[14px] text-ink-2">
                        <span className="mt-2 w-1 h-1 rounded-full bg-gold-1/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line/30 pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
          <div className="lg:col-span-5">
            <h2 className="font-display text-[2rem] md:text-display-sm text-ink-1 font-light mb-4">
              How collaboration works
            </h2>
            <p className="text-ink-3 text-[14px] leading-relaxed">
              We keep the process simple and accountable: intake, setup, go-live, and reporting.
            </p>
          </div>
          <div className="lg:col-span-7 space-y-4">
            {[
              "1) Intake call: objectives, releases, and target audience.",
              "2) Asset QA: imagery, composition notes, and metadata verification.",
              "3) Publish: directory pages and launch placements go live.",
              "4) Review: we share performance metrics and next-step recommendations.",
            ].map((step) => (
              <div key={step} className="border border-line/30 p-4 md:p-5 text-[14px] text-ink-2">
                {step}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-20 text-center border-t border-line/30 pt-12 md:pt-16">
          <p className="font-display text-[2rem] md:text-display-sm text-ink-2 font-light mb-6">
            Ready to launch with Oud Atlas?
          </p>
          <CTAButton href="mailto:brands@oudatlas.com?subject=Brand%20Partnership%20Request">
            Contact brand partnerships
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
