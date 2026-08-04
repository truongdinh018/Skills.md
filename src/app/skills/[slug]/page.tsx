import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, CalendarDays } from "lucide-react";
import { getAllSkills, getSkillBySlug } from "@/lib/skills";
import { DepartmentBadge, DifficultyBadge } from "@/components/badges";
import { Markdown } from "@/components/markdown";
import { SkillCard } from "@/components/skill-card";

export function generateStaticParams() {
  return getAllSkills().map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/skills/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) return { title: "Không tìm thấy skill" };
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

  const related = getAllSkills()
    .filter((s) => s.department === skill.department && s.slug !== skill.slug)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/skills"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
      </Link>

      <header className="mt-6 border-b border-[var(--border)] pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <DepartmentBadge department={skill.departmentInfo} />
          <DifficultyBadge difficulty={skill.difficulty} />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {skill.title}
        </h1>
        <p className="mt-3 text-lg text-[var(--muted)]">{skill.summary}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4" /> {skill.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" /> Cập nhật {skill.updated}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {skill.readingTime}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[var(--card)] px-2 py-0.5 text-xs text-[var(--muted)] ring-1 ring-inset ring-[var(--border)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-8">
        <Markdown content={skill.content} />
      </div>

      {related.length > 0 && (
        <section className="mt-14 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-bold tracking-tight">
            Skill liên quan trong {skill.departmentInfo.name}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {related.map((s) => (
              <SkillCard key={s.slug} skill={s} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
