import { SectionHeader } from "@/components/section-header";
import { CTAButton } from "@/components/cta-button";

const forumCategories = [
  {
    title: "General Discussion",
    description:
      "First impressions, blind buys, and day-to-day wear reports. Start here for broad fragrance conversation.",
    threads: 234,
    today: 18,
    medianResponse: "42 min",
  },
  {
    title: "Composition Analysis",
    description:
      "Deep note breakdowns, structure analysis, and side-by-side comparisons of similar releases.",
    threads: 189,
    today: 11,
    medianResponse: "55 min",
  },
  {
    title: "Brands & Releases",
    description:
      "New launches, reformulations, and brand strategy. Focused discussion on direction and product quality.",
    threads: 278,
    today: 24,
    medianResponse: "38 min",
  },
  {
    title: "Collection Management",
    description:
      "Rotation planning, decants, storage, and buying strategy. Practical advice for building and maintaining a collection.",
    threads: 312,
    today: 15,
    medianResponse: "47 min",
  },
];

const recentTopics = [
  {
    title: "Best oud-forward release under $250 this year?",
    category: "Brands & Releases",
    replies: 42,
    views: 1180,
    lastActivity: "12m ago",
  },
  {
    title: "Oud Wood vs Halfeti for office wear",
    category: "General Discussion",
    replies: 31,
    views: 920,
    lastActivity: "28m ago",
  },
  {
    title: "How to evaluate projection vs longevity objectively",
    category: "Composition Analysis",
    replies: 19,
    views: 640,
    lastActivity: "1h ago",
  },
  {
    title: "Safe storage for 50+ bottle collections in warm climates",
    category: "Collection Management",
    replies: 26,
    views: 710,
    lastActivity: "2h ago",
  },
];

export default function ForumPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-24">
      <SectionHeader
        kicker="Community"
        title="Forum"
        subtitle="Structured discussion for collectors, buyers, and brands. Clear categories, useful threads, and practical moderation."
      />

      <section className="border border-line/40 bg-surface-800/30 p-5 md:p-6 mb-8 md:mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-ink-2 text-[14px] md:text-[15px] leading-relaxed">
              Need to start a topic? We review new thread requests daily to keep signal quality high.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <CTAButton href="mailto:community@oudatlas.com?subject=Forum%20Thread%20Request">
              Start a thread
            </CTAButton>
            <CTAButton href="/directory" variant="ghost">
              Use directory data
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-14 md:mb-20">
        {forumCategories.map((category) => (
          <article
            key={category.title}
            className="border border-line/40 hover:border-line/70 transition-colors duration-300 p-6 md:p-8"
          >
            <h3 className="font-display text-[1.95rem] md:text-[1.35rem] text-ink-1 font-light mb-2">
              {category.title}
            </h3>
            <p className="text-ink-3 text-[14px] leading-[1.7] mb-5">{category.description}</p>
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-line/30">
              <div>
                <span className="block text-ink-1 text-[15px]">{category.threads}</span>
                <span className="text-[10px] tracking-editorial uppercase text-ink-3">Threads</span>
              </div>
              <div>
                <span className="block text-ink-1 text-[15px]">{category.today}</span>
                <span className="text-[10px] tracking-editorial uppercase text-ink-3">Today</span>
              </div>
              <div>
                <span className="block text-ink-1 text-[15px]">{category.medianResponse}</span>
                <span className="text-[10px] tracking-editorial uppercase text-ink-3">Median reply</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="border border-line/40 mb-14 md:mb-20">
        <div className="px-5 md:px-8 py-5 border-b border-line/30">
          <h2 className="font-display text-[2rem] md:text-display-sm text-ink-1 font-light">
            Recent discussions
          </h2>
        </div>
        <div className="hidden md:block">
          <div className="grid grid-cols-12 px-8 py-3 text-[10px] tracking-editorial uppercase text-ink-3 border-b border-line/30">
            <span className="col-span-6">Topic</span>
            <span className="col-span-2">Category</span>
            <span className="col-span-2">Replies / Views</span>
            <span className="col-span-2">Last activity</span>
          </div>
          {recentTopics.map((topic) => (
            <div
              key={topic.title}
              className="grid grid-cols-12 px-8 py-4 border-b border-line/20 last:border-b-0"
            >
              <p className="col-span-6 text-ink-2 text-[14px] leading-relaxed">{topic.title}</p>
              <p className="col-span-2 text-ink-3 text-[13px]">{topic.category}</p>
              <p className="col-span-2 text-ink-3 text-[13px]">
                {topic.replies} / {topic.views}
              </p>
              <p className="col-span-2 text-ink-3 text-[13px]">{topic.lastActivity}</p>
            </div>
          ))}
        </div>
        <div className="md:hidden divide-y divide-line/20">
          {recentTopics.map((topic) => (
            <div key={topic.title} className="p-5">
              <p className="text-ink-2 text-[14px] leading-relaxed mb-2">{topic.title}</p>
              <p className="text-[12px] text-ink-3 mb-2">{topic.category}</p>
              <div className="flex items-center gap-3 text-[12px] text-ink-3">
                <span>{topic.replies} replies</span>
                <span className="w-px h-3 bg-line/50" />
                <span>{topic.views} views</span>
                <span className="w-px h-3 bg-line/50" />
                <span>{topic.lastActivity}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line/30 pt-12 md:pt-16">
        <h2 className="font-display text-[2rem] md:text-display-sm text-ink-1 font-light mb-6">
          Posting guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: "Be specific",
              text: "Include wear context, weather, spray count, and timeline when sharing impressions.",
            },
            {
              title: "Stay evidence-based",
              text: "Differentiate personal preference from objective performance claims.",
            },
            {
              title: "Keep it useful",
              text: "Post threads that help someone decide, learn, compare, or avoid mistakes.",
            },
          ].map((rule) => (
            <article key={rule.title} className="border border-line/30 p-5">
              <h3 className="font-display text-[1.25rem] text-ink-1 font-light mb-2">{rule.title}</h3>
              <p className="text-[13px] text-ink-3 leading-relaxed">{rule.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
