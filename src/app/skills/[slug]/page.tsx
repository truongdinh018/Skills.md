import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bot, CalendarDays, Clock, User } from "lucide-react";
import { getAllSkills, getSkillBySlug } from "@/lib/skills";
import { getAgentPackageForHubSkill } from "@/lib/agent-skills";
import { DepartmentBadge, DifficultyBadge } from "@/components/badges";
import { Markdown } from "@/components/markdown";
import { SkillCard } from "@/components/skill-card";
import { SkillActions } from "@/components/skill-actions";
import { InstallPanel } from "@/components/install-panel";

export function generateStaticParams() {
  return getAllSkills().map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/skills/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) return { title: "Skill not found" };
  return {
    title: skill.title,
    description: skill.summary,
  };
}

export default async function SkillDetailPage({
  params,
}: PageProps<"/skills/[slug]">) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) notFound();

  const agentPkg = getAgentPackageForHubSkill(skill.department, skill.slug);

  const related = getAllSkills()
    .filter((s) => s.department === skill.department && s.slug !== skill.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link
        href="/skills"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Browse
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <article>
          <header className="border-b border-[var(--border)] pb-8">
            <div className="flex flex-wrap items-center gap-2">
              <DepartmentBadge department={skill.departmentInfo} />
              <DifficultyBadge difficulty={skill.difficulty} />
              {skill.hasAgentPackage && (
                <span className="inline-flex items-center gap-1 rounded border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-1.5 py-0.5 font-mono text-[10px] uppercase text-[var(--accent)]">
                  <Bot className="h-3 w-3" /> agent
                </span>
              )}
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {skill.title}
            </h1>
            <p className="mt-3 text-base text-[var(--muted)]">{skill.summary}</p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--muted)]">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> {skill.author}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono">
                <CalendarDays className="h-3.5 w-3.5" /> {skill.updated}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono">
                <Clock className="h-3.5 w-3.5" /> {skill.readingTime}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {skill.modes.map((m) => (
                <span
                  key={m}
                  className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] uppercase text-[var(--accent)]"
                >
                  {m}
                </span>
              ))}
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] text-[var(--muted)]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-5">
              <SkillActions slug={skill.slug} raw={skill.raw} />
            </div>
          </header>

          <div className="prose prose-invert mt-8 max-w-none">
            <Markdown content={skill.content} />
          </div>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          {agentPkg ? (
            <InstallPanel pkg={agentPkg} />
          ) : (
            <div className="rounded-xl border border-dashed border-[var(--border)] p-5 text-sm text-[var(--muted)]">
              <p className="font-semibold text-[var(--foreground)]">
                Chưa có Agent package
              </p>
              <p className="mt-2 text-xs">
                Copy template từ{" "}
                <code className="text-[var(--accent)]">templates/agent-skill/</code>{" "}
                theo{" "}
                <Link href="/docs/framework" className="text-[var(--accent)]">
                  framework docs
                </Link>
                .
              </p>
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-14 border-t border-[var(--border)] pt-8">
          <h2 className="text-lg font-bold tracking-tight">
            Related · {skill.departmentInfo.name}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {related.map((s) => (
              <SkillCard key={s.slug} skill={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
