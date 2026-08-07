import Link from "next/link";
import type { Department } from "@/lib/departments";
import type { Difficulty } from "@/lib/skills";

export function DepartmentBadge({
  department,
  asLink = true,
}: {
  department: Department;
  asLink?: boolean;
}) {
  const content = (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-[var(--muted)]">
      <span aria-hidden>{department.icon}</span>
      {department.shortName}
    </span>
  );

  if (!asLink) return content;

  return (
    <Link
      href={`/departments/${department.slug}`}
      className="transition-opacity hover:opacity-80"
    >
      {content}
    </Link>
  );
}

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  "Cơ bản": "border-emerald-500/30 text-emerald-400",
  "Trung bình": "border-amber-500/30 text-amber-400",
  "Nâng cao": "border-rose-500/30 text-rose-400",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border bg-transparent px-2 py-0.5 font-mono text-[10px] font-medium ${DIFFICULTY_STYLES[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}
