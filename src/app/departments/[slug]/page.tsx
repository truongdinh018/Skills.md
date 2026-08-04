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
  if (!dept) return { title: "Không tìm thấy phòng ban" };
  return {
    title: `Skill phòng ${dept.name}`,
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
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-4 w-4" /> Trang chủ
      </Link>

      <header className="mt-6 flex items-start gap-4 border-b border-[var(--border)] pb-8">
        <span
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${dept.gradient} text-3xl text-white shadow-sm`}
          aria-hidden
        >
          {dept.icon}
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Phòng {dept.name}
          </h1>
          <p className="mt-2 max-w-2xl text-[var(--muted)]">
            {dept.description}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {skills.length} skill
          </p>
        </div>
      </header>

      {skills.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-[var(--border)] p-10 text-center text-[var(--muted)]">
          Phòng ban này chưa có skill nào. Hãy là người đóng góp đầu tiên!
        </div>
      )}
    </div>
  );
}
