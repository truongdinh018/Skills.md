import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-2)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-mono text-sm text-[var(--foreground)]">
            <span className="text-[var(--muted)]">&gt;_</span>
            skills<span className="text-[var(--accent)]">hub</span>
          </p>
          <p className="mt-1 max-w-md text-xs text-[var(--muted)]">
            Marketplace SOP nội bộ — cài Agent Skill một lần, dùng chung mọi AI
            agent trong phòng ban.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 font-mono text-xs text-[var(--muted)]">
          <Link href="/skills" className="hover:text-[var(--accent)]">
            Browse
          </Link>
          <Link href="/install" className="hover:text-[var(--accent)]">
            Install
          </Link>
          <Link href="/agent-skills" className="hover:text-[var(--accent)]">
            Agent Skills
          </Link>
          <Link href="/docs/framework" className="hover:text-[var(--accent)]">
            Docs
          </Link>
        </div>
      </div>
    </footer>
  );
}
