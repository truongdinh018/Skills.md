import type { Metadata } from "next";
import { getAllSkills } from "@/lib/skills";
import { DEPARTMENTS } from "@/lib/departments";
import { SkillBrowser } from "@/components/skill-browser";

export const metadata: Metadata = {
  title: "Tất cả skill",
  description: "Tìm kiếm và lọc toàn bộ skill theo phòng ban.",
};

export default function SkillsPage() {
  const skills = getAllSkills();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tất cả skill</h1>
        <p className="mt-2 text-[var(--muted)]">
          Tìm kiếm theo từ khóa hoặc lọc theo phòng ban để tìm đúng quy trình
          bạn cần.
        </p>
      </header>

      <SkillBrowser skills={skills} departments={DEPARTMENTS} />
    </div>
  );
}
