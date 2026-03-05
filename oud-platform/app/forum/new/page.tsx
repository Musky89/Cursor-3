"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const CATEGORIES = [
  { value: "general", label: "General Discussion" },
  { value: "reviews", label: "Reviews" },
  { value: "recommendations", label: "Recommendations" },
  { value: "education", label: "Education" },
  { value: "brands", label: "Brands" },
  { value: "new-releases", label: "New Releases" },
];

export default function NewTopicPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [category, setCategory] = useState("general");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !authorName.trim()) {
      setError("All fields are required");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/forum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          author_name: authorName.trim(),
          category,
        }),
      });

      if (!res.ok) throw new Error("Failed to create topic");

      const data = await res.json();
      router.push(`/forum/${data.id}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/forum"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-gold-400"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Forum
      </Link>

      <h1 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
        Start a New Discussion
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        Share your thoughts, ask questions, or review an oud fragrance
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-secondary">
            Your Name
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Enter your display name"
            className="w-full rounded-lg border border-border-primary bg-bg-secondary px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold-600"
            maxLength={50}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-secondary">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-bg-secondary px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-gold-600"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-secondary">
            Topic Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What would you like to discuss?"
            className="w-full rounded-lg border border-border-primary bg-bg-secondary px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold-600"
            maxLength={200}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-secondary">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts, questions, or experiences..."
            rows={8}
            className="w-full rounded-lg border border-border-primary bg-bg-secondary px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-gold-600"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-gradient-to-r from-gold-500 to-gold-700 px-6 py-2.5 text-sm font-semibold text-bg-primary transition-all hover:from-gold-400 hover:to-gold-600 disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post Topic"}
          </button>
          <Link
            href="/forum"
            className="rounded-lg border border-border-primary px-6 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
