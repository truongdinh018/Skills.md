"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/skills/?q=${encodeURIComponent(query)}` : "/skills/");
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto mt-8 flex w-full max-w-xl flex-col gap-2 sm:flex-row"
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search skills: an toàn, thầu, dòng tiền…"
          aria-label="Tìm kiếm skill"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] py-3.5 pl-11 pr-16 font-mono text-sm outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/30"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-[var(--border)] bg-[var(--surface-2)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--muted)] sm:inline">
          ⌘K
        </kbd>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-[var(--accent)] px-5 py-3.5 font-mono text-sm font-semibold text-[var(--accent-fg)] transition-opacity hover:opacity-90"
      >
        Search
      </button>
    </form>
  );
}
