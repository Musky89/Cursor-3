import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye, Clock, MessageSquare } from "lucide-react";
import { getForumTopic } from "@/lib/queries";
import { ReplyForm } from "@/components/ReplyForm";

export const dynamic = "force-dynamic";

const CATEGORY_COLORS: Record<string, string> = {
  general: "text-blue-400 border-blue-400/20 bg-blue-400/10",
  reviews: "text-green-400 border-green-400/20 bg-green-400/10",
  recommendations: "text-purple-400 border-purple-400/20 bg-purple-400/10",
  education: "text-amber-400 border-amber-400/20 bg-amber-400/10",
  brands: "text-pink-400 border-pink-400/20 bg-pink-400/10",
  "new-releases": "text-gold-400 border-gold-400/20 bg-gold-400/10",
};

export default async function ForumTopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = getForumTopic(parseInt(id, 10));

  if (!data) notFound();

  const { topic, replies } = data;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/forum"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-gold-400"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Forum
      </Link>

      {/* Topic */}
      <article className="rounded-2xl border border-border-subtle bg-bg-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
              CATEGORY_COLORS[topic.category] ||
              "text-text-muted border-border-primary"
            }`}
          >
            {topic.category.replace("-", " ")}
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Eye className="h-3 w-3" />
            {topic.views} views
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <MessageSquare className="h-3 w-3" />
            {topic.reply_count} replies
          </span>
        </div>

        <h1 className="mt-4 font-display text-2xl font-bold text-text-primary sm:text-3xl">
          {topic.title}
        </h1>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-600 to-gold-800 text-sm font-bold text-bg-primary">
            {topic.author_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">
              {topic.author_name}
            </p>
            <p className="flex items-center gap-1 text-xs text-text-muted">
              <Clock className="h-3 w-3" />
              {new Date(topic.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-border-subtle pt-6">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-text-secondary">
            {topic.content}
          </p>
        </div>
      </article>

      {/* Replies */}
      <div className="mt-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
          Replies ({replies.length})
        </h2>

        {replies.length > 0 ? (
          <div className="space-y-4">
            {replies.map((reply: any) => (
              <div
                key={reply.id}
                className="rounded-xl border border-border-subtle bg-bg-card p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-tertiary text-xs font-semibold text-text-secondary">
                    {reply.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {reply.author_name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {new Date(reply.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {reply.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border-subtle bg-bg-card p-8 text-center">
            <p className="text-sm text-text-muted">
              No replies yet. Be the first to respond!
            </p>
          </div>
        )}
      </div>

      {/* Reply Form */}
      <div className="mt-8">
        <ReplyForm topicId={topic.id} />
      </div>
    </div>
  );
}
