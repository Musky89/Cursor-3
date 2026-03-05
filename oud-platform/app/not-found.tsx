import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-600/20 to-gold-800/20">
        <span className="font-display text-4xl text-gold-400">?</span>
      </div>
      <h1 className="mt-6 font-display text-3xl font-bold text-text-primary">
        Page Not Found
      </h1>
      <p className="mt-2 max-w-md text-sm text-text-secondary">
        The fragrance you&apos;re looking for seems to have evaporated. Let&apos;s
        get you back to exploring the world of oud.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-gradient-to-r from-gold-500 to-gold-700 px-5 py-2.5 text-sm font-semibold text-bg-primary transition-all hover:from-gold-400 hover:to-gold-600"
        >
          Go Home
        </Link>
        <Link
          href="/directory"
          className="rounded-lg border border-border-primary px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
        >
          Browse Directory
        </Link>
      </div>
    </div>
  );
}
