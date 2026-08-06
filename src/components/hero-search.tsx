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
    <form onSubmit={submit} className="mx-auto mt-8 flex max-w-xl gap-2">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm skill: an toàn, hợp đồng, dòng tiền..."
          aria-label="Tìm kiếm skill"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] py-3.5 pl-11 pr-4 text-sm shadow-sm outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>
      <button
        type="submit"
        className="rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500"
      >
        Tìm
      </button>
    </form>
  );
}
