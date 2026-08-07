"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import type { Skill } from "@/lib/skills";
import type { Department } from "@/lib/departments";
import { filterSkills } from "@/lib/search";
import { SkillCard } from "@/components/skill-card";

type Props = {
  skills: Skill[];
  departments: Department[];
  initialDepartment?: string;
  initialQuery?: string;
};

export function SkillBrowser({
  skills,
  departments,
  initialDepartment = "all",
  initialQuery = "",
}: Props) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(
    () => searchParams.get("q") ?? initialQuery,
  );
  const [department, setDepartment] = useState(() => {
    const dept = searchParams.get("dept");
    return dept && departments.some((d) => d.slug === dept)
      ? dept
      : initialDepartment;
  });
  const [agentOnly, setAgentOnly] = useState(
    () => searchParams.get("agent") === "1",
  );

  const filtered = useMemo(() => {
    let list =
      department === "all"
        ? skills
        : skills.filter((s) => s.department === department);
    if (agentOnly) list = list.filter((s) => s.hasAgentPackage);
    return filterSkills(list, query);
  }, [skills, department, query, agentOnly]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name, tag, department…"
            aria-label="Tìm kiếm skill"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] py-3 pl-10 pr-10 font-mono text-sm outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/30"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Xóa tìm kiếm"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            active={department === "all"}
            onClick={() => setDepartment("all")}
          >
            All
          </FilterChip>
          {departments.map((dept) => (
            <FilterChip
              key={dept.slug}
              active={department === dept.slug}
              onClick={() => setDepartment(dept.slug)}
            >
              {dept.shortName}
            </FilterChip>
          ))}
          <span className="mx-1 h-4 w-px bg-[var(--border)]" aria-hidden />
          <FilterChip
            active={agentOnly}
            onClick={() => setAgentOnly((v) => !v)}
          >
            Agent package
          </FilterChip>
        </div>
      </div>

      <p className="mt-6 font-mono text-xs text-[var(--muted)]" aria-live="polite">
        {filtered.length} skill{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-[var(--border)] p-10 text-center font-mono text-sm text-[var(--muted)]">
          No skills matched. Try another query.
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
        active
          ? "bg-[var(--accent)] text-[var(--accent-fg)]"
          : "bg-[var(--card)] text-[var(--muted)] ring-1 ring-inset ring-[var(--border)] hover:text-[var(--foreground)]"
      }`}
    >
      {children}
    </button>
  );
}
