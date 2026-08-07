import Link from "next/link";
import { Terminal } from "lucide-react";

const NAV = [
  { href: "/skills", label: "Browse" },
  { href: "/#categories", label: "Categories" },
  { href: "/agent-skills", label: "Agent Skills" },
  { href: "/docs/framework", label: "Docs" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] font-mono text-sm text-[var(--accent)]">
            <Terminal className="h-4 w-4" />
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight">
            <span className="text-[var(--muted)]">&gt;_</span>
            skills<span className="text-[var(--accent)]">hub</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-[var(--muted)] transition-colors hover:bg-[var(--card)] hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/skills"
          className="rounded-md bg-[var(--accent)] px-3 py-1.5 font-mono text-xs font-semibold text-[var(--accent-fg)] transition-opacity hover:opacity-90"
        >
          Browse skills
        </Link>
      </div>
    </header>
  );
}
