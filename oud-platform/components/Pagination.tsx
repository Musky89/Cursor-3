import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  params,
}: {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  params: Record<string, string | undefined>;
}) {
  const getPageUrl = (page: number) => {
    const p = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value && key !== "page") p.set(key, value);
    }
    if (page > 1) p.set("page", page.toString());
    const qs = p.toString();
    return `${baseUrl}${qs ? `?${qs}` : ""}`;
  };

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5">
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-primary text-text-secondary transition-colors hover:border-gold-700/40 hover:text-text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      )}

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-text-muted">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={getPageUrl(page)}
            className={`flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-gold-600 text-bg-primary"
                : "border border-border-primary text-text-secondary hover:border-gold-700/40 hover:text-text-primary"
            }`}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-primary text-text-secondary transition-colors hover:border-gold-700/40 hover:text-text-primary"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
