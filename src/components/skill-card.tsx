import Link from "next/link";
import { ArrowRight, Bot, Clock } from "lucide-react";
import type { Skill } from "@/lib/skills";
import { DepartmentBadge, DifficultyBadge } from "@/components/badges";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="group flex h-full flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--accent)]/40 hover:bg-[var(--card-hover)]"
    >
      <div className="flex flex-wrap items-center gap-2">
        <DepartmentBadge department={skill.departmentInfo} asLink={false} />
        <DifficultyBadge difficulty={skill.difficulty} />
        {skill.hasAgentPackage && (
          <span className="inline-flex items-center gap-1 rounded border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[var(--accent)]">
            <Bot className="h-3 w-3" /> agent
          </span>
        )}
      </div>

      <h3 className="mt-3 text-base font-semibold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)]">
        {skill.title}
      </h3>

      <p className="mt-2 line-clamp-3 flex-1 text-sm text-[var(--muted)]">
        {skill.summary}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {skill.modes.map((mode) => (
          <span
            key={mode}
            className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] uppercase text-[var(--muted)]"
          >
            {mode}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3 text-xs text-[var(--muted)]">
        <span className="inline-flex items-center gap-1 font-mono">
          <Clock className="h-3.5 w-3.5" />
          {skill.readingTime}
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-[var(--accent)]">
          Open
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
