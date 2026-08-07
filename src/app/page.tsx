import Link from "next/link";
import { ArrowRight, Bot, BookOpen, Layers, Terminal } from "lucide-react";
import { DEPARTMENTS } from "@/lib/departments";
import {
  getAllSkills,
  getFeaturedSkills,
  getSkillsByDepartment,
} from "@/lib/skills";
import { getAllAgentPackages } from "@/lib/agent-skills";
import { SkillCard } from "@/components/skill-card";
import { HeroSearch } from "@/components/hero-search";
import { DepartmentBadge } from "@/components/badges";

export default function HomePage() {
  const skills = getAllSkills();
  const featured = getFeaturedSkills();
  const recent = skills.slice(0, 8);
  const agentCount = getAllAgentPackages().length;
  const agentReady = skills.filter((s) => s.hasAgentPackage).length;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <div className="bg-noise absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Open-source skills · internal marketplace
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Your team&apos;s SOPs.
            <br />
            <span className="text-[var(--accent)]">Already trained</span> for
            every AI agent.
          </h1>
          <p className="animate-fade-up-delay-2 mt-5 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
            Duyệt skill theo phòng ban, cài Agent Skill một lệnh, chạy guide /
            check / comply trên Cursor, Claude Code và Copilot — cùng một nguồn
            sự thật.
          </p>

          <div className="animate-fade-up-delay-2">
            <HeroSearch />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 font-mono text-sm font-semibold text-[var(--accent-fg)] hover:opacity-90"
            >
              Browse skills <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/agent-skills"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 font-mono text-sm text-[var(--foreground)] hover:border-[var(--accent)]/40"
            >
              <Bot className="h-4 w-4 text-[var(--accent)]" />
              Agent packages
            </Link>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat value={skills.length} label="Skills" />
            <Stat value={DEPARTMENTS.length} label="Categories" />
            <Stat value={agentCount} label="Agent pkgs" />
            <Stat value={agentReady} label="AI-ready" />
          </dl>
        </div>
      </section>

      {/* How it works — like skills-hub steps */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-3 sm:px-6">
          <Step
            n="01"
            title="Browse"
            body="Tìm SOP theo phòng ban, tag, độ khó. Filter Agent package khi cần cài vào AI."
          />
          <Step
            n="02"
            title="Install"
            body="Copy lệnh cài vào ~/.cursor/skills hoặc ~/.claude/skills — cả team dùng chung."
          />
          <Step
            n="03"
            title="Run"
            body="Gọi guide / check / comply trong agent. Hold point và checklist must không bị bỏ qua."
          />
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <Layers className="h-5 w-5 text-[var(--accent)]" />
              Categories
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Phòng ban = category trong marketplace.
            </p>
          </div>
          <Link
            href="/skills"
            className="font-mono text-xs text-[var(--accent)] hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {DEPARTMENTS.map((dept) => {
            const count = getSkillsByDepartment(dept.slug).length;
            return (
              <Link
                key={dept.slug}
                href={`/departments/${dept.slug}`}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--accent)]/35 hover:bg-[var(--card-hover)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl" aria-hidden>
                    {dept.icon}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--muted)]">
                    {count}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-semibold">{dept.shortName}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">
                  {dept.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-2)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <BookOpen className="h-5 w-5 text-[var(--accent)]" />
            Featured skills
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Skill nổi bật — ưu tiên onboarding và hold point hiện trường.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((skill) => (
              <SkillCard key={skill.slug} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard-style recent */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <Terminal className="h-5 w-5 text-[var(--accent)]" />
          Leaderboard · recently updated
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Giống skills.sh — xếp theo thời gian cập nhật (telemetry install sẽ
          thêm sau).
        </p>
        <ol className="mt-8 divide-y divide-[var(--border)] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]">
          {recent.map((skill, i) => (
            <li key={skill.slug}>
              <Link
                href={`/skills/${skill.slug}`}
                className="group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-[var(--card-hover)] sm:px-5"
              >
                <span className="w-6 shrink-0 text-center font-mono text-sm text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-semibold group-hover:text-[var(--accent)]">
                      {skill.title}
                    </h3>
                    <DepartmentBadge
                      department={skill.departmentInfo}
                      asLink={false}
                    />
                    {skill.hasAgentPackage && (
                      <span className="font-mono text-[10px] text-[var(--accent)]">
                        agent
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs text-[var(--muted)]">
                    {skill.summary}
                  </p>
                </div>
                <span className="hidden shrink-0 font-mono text-[10px] text-[var(--muted)] sm:inline">
                  {skill.updated}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[var(--muted)] group-hover:text-[var(--accent)]" />
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-3">
      <dd className="font-mono text-2xl font-bold text-[var(--accent)]">
        {value}
      </dd>
      <dt className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
        {label}
      </dt>
    </div>
  );
}

function Step({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
      <p className="font-mono text-xs text-[var(--accent)]">{n}</p>
      <h3 className="mt-2 text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-[var(--muted)]">{body}</p>
    </div>
  );
}
