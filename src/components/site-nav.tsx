import Link from "next/link";

const links = [
  { href: "/", label: "Journal" },
  { href: "/directory", label: "Library" },
  { href: "/forum", label: "Salon" },
  { href: "/brands", label: "Houses" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)]/80 bg-[color:var(--background)]/80 backdrop-blur-xl">
      <nav className="lux-container flex items-center justify-between py-3.5">
        <Link
          href="/"
          className="font-serif text-xl tracking-[0.16em] text-[color:var(--gold-soft)]"
        >
          OUD ATLAS
        </Link>
        <ul className="flex items-center gap-1 text-sm text-zinc-200 sm:gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className="rounded-full px-3 py-1.5 transition hover:bg-[color:var(--surface-soft)] hover:text-[color:var(--gold-soft)]/95"
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
