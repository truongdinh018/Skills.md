import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DEPARTMENTS, getDepartment } from "@/lib/departments";
import { getSkillsByDepartment } from "@/lib/skills";
import { SkillCard } from "@/components/skill-card";

export function generateStaticParams() {
  return DEPARTMENTS.map((dept) => ({ slug: dept.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/departments/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const dept = getDepartment(slug);
  if (!dept) return { title: "Category not found" };
  return {
    title: dept.name,
    description: dept.description,
  };
}

export default async function DepartmentPage({
  params,
}: PageProps<"/departments/[slug]">) {
  const { slug } = await params;
  const dept = getDepartment(slug);

  if (!dept) notFound();

  const skills = getSkillsByDepartment(dept.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link
        href="/#categories"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Categories
      </Link>

      <header className="mt-6 border-b border-[var(--border)] pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
          Category
        </p>
        <div className="mt-3 flex items-start gap-4">
          <span className="text-4xl" aria-hidden>
            {dept.icon}
          </span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{dept.name}</h1>
            <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
              {dept.description}
            </p>
            <p className="mt-2 font-mono text-xs text-[var(--muted)]">
              {skills.length} skills
            </p>
          </div>
        </div>
      </header>

      {skills.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-dashed border-[var(--border)] p-10 text-center font-mono text-sm text-[var(--muted)]">
          No skills in this category yet.
        </div>
      )}
    </div>
  );
}
