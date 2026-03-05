import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/directory", label: "Directory" },
  { href: "/forum", label: "Forum" },
  { href: "/brands", label: "Brand Launches" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-amber-300">
          OUD ATLAS
        </Link>
        <ul className="flex items-center gap-4 text-sm text-zinc-200 sm:gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link className="transition hover:text-amber-300" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
