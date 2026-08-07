import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllSkills } from "@/lib/skills";
import { DEPARTMENTS } from "@/lib/departments";
import { SkillBrowser } from "@/components/skill-browser";

export const metadata: Metadata = {
  title: "Browse skills",
  description: "Marketplace: tìm kiếm và lọc skill theo phòng ban / agent package.",
};

export default function SkillsPage() {
  const skills = getAllSkills();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
          Marketplace
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Browse skills</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          Search không phân biệt dấu tiếng Việt. Bật filter{" "}
          <span className="font-mono text-[var(--accent)]">Agent package</span>{" "}
          để chỉ thấy SOP đã có SKILL.md cài được.
        </p>
      </header>

      <Suspense
        fallback={
          <p className="font-mono text-sm text-[var(--muted)]">Loading…</p>
        }
      >
        <SkillBrowser skills={skills} departments={DEPARTMENTS} />
      </Suspense>
    </div>
  );
}
