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
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${department.accent.bg} ${department.accent.text} ${department.accent.ring}`}
    >
      <span aria-hidden>{department.icon}</span>
      {department.name}
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
  "Cơ bản":
    "bg-emerald-50 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300",
  "Trung bình":
    "bg-amber-50 text-amber-700 ring-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300",
  "Nâng cao":
    "bg-rose-50 text-rose-700 ring-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${DIFFICULTY_STYLES[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}
