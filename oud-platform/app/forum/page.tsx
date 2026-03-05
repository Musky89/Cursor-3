import Link from "next/link";
import {
  MessageSquare,
  Eye,
  Clock,
  Pin,
  Plus,
} from "lucide-react";
import { getForumTopics } from "@/lib/queries";
import { Pagination } from "@/components/Pagination";

export const dynamic = "force-dynamic";

const CATEGORIES = [
  { value: "all", label: "All Topics" },
  { value: "general", label: "General" },
  { value: "reviews", label: "Reviews" },
  { value: "recommendations", label: "Recommendations" },
  { value: "education", label: "Education" },
  { value: "brands", label: "Brands" },
  { value: "new-releases", label: "New Releases" },
];

const CATEGORY_COLORS: Record<string, string> = {
  general: "text-blue-400 border-blue-400/20 bg-blue-400/10",
  reviews: "text-green-400 border-green-400/20 bg-green-400/10",
  recommendations: "text-purple-400 border-purple-400/20 bg-purple-400/10",
  education: "text-amber-400 border-amber-400/20 bg-amber-400/10",
  brands: "text-pink-400 border-pink-400/20 bg-pink-400/10",
  "new-releases": "text-gold-400 border-gold-400/20 bg-gold-400/10",
};

export default async function ForumPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const category = params.category || "all";
  const page = parseInt(params.page || "1", 10);

  const { topics, total } = getForumTopics({ category, page });
  const totalPages = Math.ceil(total / 20);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
            Community
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Discuss, discover, and share your passion for oud fragrances
          </p>
        </div>
        <Link
          href="/forum/new"
          className="hidden items-center gap-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-700 px-4 py-2.5 text-sm font-semibold text-bg-primary transition-all hover:from-gold-400 hover:to-gold-600 sm:inline-flex"
        >
          <Plus className="h-4 w-4" />
          New Topic
        </Link>
      </div>

      {/* Categories */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.value}
            href={
              cat.value === "all"
                ? "/forum"
                : `/forum?category=${cat.value}`
            }
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              category === cat.value
                ? "bg-gold-600 text-bg-primary"
                : "border border-border-primary bg-bg-secondary text-text-secondary hover:text-text-primary"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Topics List */}
      <div className="space-y-3">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/forum/${topic.id}`}
            className="group block rounded-xl border border-border-subtle bg-bg-card p-5 transition-all duration-200 hover:border-gold-700/40 hover:bg-bg-card-hover"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-tertiary text-sm font-semibold text-gold-400">
                {topic.author_name.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="truncate font-display text-base font-semibold text-text-primary transition-colors group-hover:text-gold-300">
                    {topic.title}
                  </h2>
                </div>

                <p className="mt-1 line-clamp-2 text-sm text-text-muted">
                  {topic.content}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize ${
                      CATEGORY_COLORS[topic.category] ||
                      "text-text-muted border-border-primary"
                    }`}
                  >
                    {topic.category.replace("-", " ")}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <MessageSquare className="h-3 w-3" />
                    {topic.reply_count}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <Eye className="h-3 w-3" />
                    {topic.views}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <Clock className="h-3 w-3" />
                    {new Date(topic.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-xs text-text-muted">
                    by{" "}
                    <span className="font-medium text-text-secondary">
                      {topic.author_name}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {topics.length === 0 && (
          <div className="rounded-xl border border-border-subtle bg-bg-card p-12 text-center">
            <p className="font-display text-xl text-text-secondary">
              No topics yet
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Be the first to start a discussion!
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          baseUrl="/forum"
          params={params}
        />
      )}

      {/* Mobile FAB */}
      <Link
        href="/forum/new"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-gold-700 text-bg-primary shadow-lg shadow-gold-900/40 transition-transform hover:scale-105 sm:hidden"
        aria-label="New Topic"
      >
        <Plus className="h-6 w-6" />
      </Link>
    </div>
  );
}
