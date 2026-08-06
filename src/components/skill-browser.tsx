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
  // Read ?q= and ?dept= from the URL (client-side; the page wraps this in a
  // Suspense boundary so static export bails to client rendering here).
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

  const filtered = useMemo(() => {
    const byDept =
      department === "all"
        ? skills
        : skills.filter((s) => s.department === department);
    return filterSkills(byDept, query);
  }, [skills, department, query]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm skill theo tên, mô tả, tag..."
            aria-label="Tìm kiếm skill"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] py-3 pl-11 pr-10 text-sm outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
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

        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={department === "all"}
            onClick={() => setDepartment("all")}
          >
            Tất cả
          </FilterChip>
          {departments.map((dept) => (
            <FilterChip
              key={dept.slug}
              active={department === dept.slug}
              onClick={() => setDepartment(dept.slug)}
            >
              <span aria-hidden>{dept.icon}</span> {dept.shortName}
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-[var(--muted)]" aria-live="polite">
        {filtered.length} skill{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-[var(--border)] p-10 text-center text-[var(--muted)]">
          Không tìm thấy skill nào phù hợp. Thử từ khóa khác nhé.
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
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-indigo-600 text-white shadow-sm"
          : "bg-[var(--card)] text-[var(--muted)] ring-1 ring-inset ring-[var(--border)] hover:text-[var(--foreground)]"
      }`}
    >
      {children}
    </button>
  );
}
