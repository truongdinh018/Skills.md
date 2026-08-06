import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Layers, Sparkles } from "lucide-react";
import { DEPARTMENTS } from "@/lib/departments";
import {
  getAllSkills,
  getFeaturedSkills,
  getSkillsByDepartment,
} from "@/lib/skills";
import { SkillCard } from "@/components/skill-card";
import { HeroSearch } from "@/components/hero-search";
import { DepartmentBadge } from "@/components/badges";

export default function HomePage() {
  const skills = getAllSkills();
  const featured = getFeaturedSkills();
  // getAllSkills() is already sorted by `updated` (newest first).
  const recent = skills.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="bg-grid absolute inset-0 opacity-70" aria-hidden />
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/20 to-sky-500/20 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
            <Layers className="h-3.5 w-3.5" /> Thư viện kỹ năng nội bộ
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Nơi lưu trữ & chia sẻ{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent">
              skill
            </span>{" "}
            cho mọi phòng ban
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
            Chuẩn hóa quy trình và hướng dẫn công việc dưới dạng skill dễ tìm,
            dễ đọc — giúp cả công ty làm việc nhất quán và onboarding nhanh hơn.
          </p>

          <HeroSearch />

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold transition-colors hover:border-indigo-300"
            >
              Xem tất cả skill <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#departments"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold transition-colors hover:border-indigo-300"
            >
              Xem theo phòng ban
            </Link>
          </div>

          <dl className="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-6">
            <Stat value={skills.length} label="Skill" />
            <Stat value={DEPARTMENTS.length} label="Phòng ban" />
            <Stat value="100%" label="Markdown" />
          </dl>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Duyệt theo phòng ban
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Mỗi phòng ban có bộ skill riêng phù hợp với công việc.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((dept) => {
            const count = getSkillsByDepartment(dept.slug).length;
            return (
              <Link
                key={dept.slug}
                href={`/departments/${dept.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${dept.gradient}`}
                  aria-hidden
                />
                <div className="flex items-center justify-between">
                  <span className="text-3xl" aria-hidden>
                    {dept.icon}
                  </span>
                  <span className="rounded-full bg-[var(--background)] px-2.5 py-1 text-xs font-medium text-[var(--muted)] ring-1 ring-inset ring-[var(--border)]">
                    {count} skill
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {dept.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {dept.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-500" />
            <h2 className="text-2xl font-bold tracking-tight">Skill nổi bật</h2>
          </div>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Những skill được nhiều phòng ban tham khảo nhất.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((skill) => (
              <SkillCard key={skill.slug} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently updated (ranked) */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          <h2 className="text-2xl font-bold tracking-tight">Mới cập nhật</h2>
        </div>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Những skill vừa được thêm hoặc chỉnh sửa gần đây.
        </p>
        <ol className="mt-8 divide-y divide-[var(--border)] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          {recent.map((skill, i) => (
            <li key={skill.slug}>
              <Link
                href={`/skills/${skill.slug}`}
                className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-[var(--background)] sm:px-6"
              >
                <span className="w-6 shrink-0 text-center text-lg font-bold text-[var(--muted)]">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {skill.title}
                    </h3>
                    <DepartmentBadge
                      department={skill.departmentInfo}
                      asLink={false}
                    />
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-sm text-[var(--muted)]">
                    {skill.summary}
                  </p>
                </div>
                <span className="hidden shrink-0 items-center gap-1.5 text-xs text-[var(--muted)] sm:inline-flex">
                  <Clock className="h-3.5 w-3.5" /> {skill.updated}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-500" />
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
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-2 py-4">
      <dd className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
        {value}
      </dd>
      <dt className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
        {label}
      </dt>
    </div>
  );
}
