import { SectionHeader } from "@/components/section-header";
import { EditorialPanel } from "@/components/editorial-panel";

const salonRooms = [
  {
    title: "The Opening",
    description:
      "First impressions, blind buys, and the stories behind how a composition found you. Share the moment a fragrance stopped you in your tracks.",
    threads: 234,
    members: 1820,
    icon: "◇",
  },
  {
    title: "The Heart",
    description:
      "Deep composition analysis, note breakdowns, and the craft behind the blend. For those who want to understand what they smell, not just name it.",
    threads: 189,
    members: 1450,
    icon: "◈",
  },
  {
    title: "The Dry-Down",
    description:
      "Long-term reflections. How does a fragrance evolve over months and years of wear? Revisit compositions with the perspective that only time provides.",
    threads: 156,
    members: 980,
    icon: "◆",
  },
  {
    title: "The Collection",
    description:
      "Curation philosophy, storage, display, and the art of building a wardrobe. From the minimalist five-bottle rotation to the encyclopedic archive.",
    threads: 312,
    members: 2100,
    icon: "▣",
  },
  {
    title: "House Visits",
    description:
      "Brand-focused discussions. New releases, reformulations, house DNA, creative directors. Separate the marketing from the material.",
    threads: 278,
    members: 1670,
    icon: "▪",
  },
  {
    title: "The Source",
    description:
      "Raw materials, ingredients, sustainability, and sourcing. For those drawn to the agricultural and chemical realities behind the artistry.",
    threads: 98,
    members: 640,
    icon: "○",
  },
];

export default function ForumPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
      {/* Header */}
      <SectionHeader
        kicker="Community"
        title="The Salon"
        subtitle="A place for unhurried conversation about the compositions, materials, and houses that define fine fragrance. No algorithmic feeds. No promotional noise."
      />

      {/* Rooms grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-20">
        {salonRooms.map((room) => (
          <EditorialPanel
            key={room.title}
            variant="bordered"
            className="p-8 md:p-10 group hover:border-line/70 transition-all duration-500 cursor-pointer"
          >
            <div className="flex items-start gap-5">
              <span className="text-gold-1/50 text-[1.5rem] font-display leading-none mt-0.5 group-hover:text-gold-1/80 transition-colors duration-500">
                {room.icon}
              </span>
              <div className="flex-1 space-y-3">
                <h3 className="font-display text-[1.2rem] text-ink-1 font-light group-hover:text-gold-2 transition-colors duration-300">
                  {room.title}
                </h3>
                <p className="text-ink-3 text-[13px] leading-[1.7]">
                  {room.description}
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-[11px] text-ink-3/70 font-body">
                    <span className="text-ink-2">{room.threads}</span> threads
                  </span>
                  <span className="w-px h-3 bg-line/50" />
                  <span className="text-[11px] text-ink-3/70 font-body">
                    <span className="text-ink-2">
                      {room.members.toLocaleString()}
                    </span>{" "}
                    members
                  </span>
                </div>
              </div>
            </div>
          </EditorialPanel>
        ))}
      </div>

      {/* Discussion quality model */}
      <section className="border-t border-line/30 pt-16 md:pt-20">
        <div className="max-w-3xl">
          <span className="inline-block text-[11px] tracking-editorial uppercase text-gold-1 mb-6 font-body font-medium">
            Our Standard
          </span>
          <h2 className="font-display text-display-md text-ink-1 font-light mb-6">
            On the quality of discourse
          </h2>
          <div className="space-y-5 text-ink-3 text-[15px] leading-[1.8]">
            <p>
              The Salon is moderated with a simple principle: every contribution should leave the
              reader knowing more than they did before. We value specificity over opinion,
              experience over hearsay, and nuance over certainty.
            </p>
            <p>
              Discussions that reduce compositions to simple
              &ldquo;thumbs up / thumbs down&rdquo; verdicts miss what makes fragrance compelling.
              We encourage members to describe what they smell, how it evolves, and what it evokes
              — not just whether they like it.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                label: "Specificity",
                text: "Name the notes, describe the evolution, cite the wear time. Be precise.",
              },
              {
                label: "Generosity",
                text: "Share what you know. The best collectors are also the best teachers.",
              },
              {
                label: "Patience",
                text: "Let compositions reveal themselves. First spray is never the full story.",
              },
            ].map((principle) => (
              <div key={principle.label} className="space-y-2">
                <span className="text-[12px] tracking-editorial uppercase text-gold-1/70 font-body font-medium">
                  {principle.label}
                </span>
                <p className="text-[13px] text-ink-3 leading-relaxed">{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
