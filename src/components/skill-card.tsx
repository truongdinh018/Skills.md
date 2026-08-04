import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { Skill } from "@/lib/skills";
import { DepartmentBadge, DifficultyBadge } from "@/components/badges";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:hover:border-indigo-500/50"
    >
      <div className="flex flex-wrap items-center gap-2">
        <DepartmentBadge department={skill.departmentInfo} asLink={false} />
        <DifficultyBadge difficulty={skill.difficulty} />
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--foreground)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
        {skill.title}
      </h3>

      <p className="mt-2 line-clamp-3 flex-1 text-sm text-[var(--muted)]">
        {skill.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {skill.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-[var(--background)] px-2 py-0.5 text-xs text-[var(--muted)] ring-1 ring-inset ring-[var(--border)]"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3 text-xs text-[var(--muted)]">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {skill.readingTime}
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-indigo-600 dark:text-indigo-400">
          Xem chi tiết
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
