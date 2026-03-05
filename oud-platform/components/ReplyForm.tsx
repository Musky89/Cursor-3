"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ReplyForm({ topicId }: { topicId: number }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !authorName.trim()) {
      setError("Name and reply content are required");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/forum/${topicId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          author_name: authorName.trim(),
        }),
      });

      if (!res.ok) throw new Error("Failed to post reply");

      setContent("");
      setAuthorName("");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-card p-6">
      <h3 className="text-sm font-semibold text-text-primary">Add a Reply</h3>

      {error && (
        <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg border border-border-primary bg-bg-secondary px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold-600"
          maxLength={50}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="Share your thoughts..."
          className="w-full rounded-lg border border-border-primary bg-bg-secondary px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold-600"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-gradient-to-r from-gold-500 to-gold-700 px-5 py-2.5 text-sm font-semibold text-bg-primary transition-all hover:from-gold-400 hover:to-gold-600 disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post Reply"}
        </button>
      </form>
    </div>
  );
}
