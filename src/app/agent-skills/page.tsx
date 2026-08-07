import type { Metadata } from "next";
import Link from "next/link";
import { Bot } from "lucide-react";
import {
  getAllAgentPackages,
  skillsCliSetupAllCommand,
  type AgentSkillPackage,
} from "@/lib/agent-skills";
import { InstallPanel } from "@/components/install-panel";
import { CopyCommand } from "@/components/copy-command";
import { getSkillBySlug } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Agent Skills",
  description:
    "Package SKILL.md cài được cho Cursor / Claude Code — guide, check, comply.",
};

export default function AgentSkillsPage() {
  const packages = getAllAgentPackages();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
          Installable packages
        </p>
        <h1 className="mt-2 flex items-center gap-2 text-3xl font-bold tracking-tight">
          <Bot className="h-7 w-7 text-[var(--accent)]" />
          Agent Skills
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
          Mỗi package là một SOP đóng gói chuẩn Agent Skills. Cài một lệnh như{" "}
          <a
            href="https://agentskill.sh/"
            className="text-[var(--accent)] hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            agentskill.sh
          </a>{" "}
          — AI hướng dẫn, kiểm tra checklist và chấm tuân thủ.
        </p>
        <div className="mt-5 max-w-2xl">
          <CopyCommand
            command={skillsCliSetupAllCommand()}
            label="Install all"
          />
          <Link
            href="/install"
            className="mt-2 inline-block font-mono text-xs text-[var(--accent)] hover:underline"
          >
            Full install guide →
          </Link>
        </div>
      </header>

      {packages.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[var(--border)] p-10 text-center font-mono text-sm text-[var(--muted)]">
          Chưa có package. Xem templates/agent-skill/
        </p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {packages.map((pkg) => (
            <AgentPackageCard key={`${pkg.packagePath}`} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  );
}

function AgentPackageCard({ pkg }: { pkg: AgentSkillPackage }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="font-mono text-sm font-semibold text-[var(--accent)]">
          {pkg.name}
        </h2>
        {pkg.isExample && (
          <span className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] uppercase text-[var(--muted)]">
            example
          </span>
        )}
        {pkg.departmentInfo && (
          <Link
            href={`/departments/${pkg.department}`}
            className="font-mono text-[10px] text-[var(--muted)] hover:text-[var(--accent)]"
          >
            {pkg.departmentInfo.shortName}
          </Link>
        )}
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-[var(--muted)]">
        {pkg.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {pkg.modes.map((m) => (
          <span
            key={m}
            className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] uppercase text-[var(--muted)]"
          >
            {m}
          </span>
        ))}
        {pkg.hasChecklist && (
          <span className="rounded border border-[var(--accent)]/30 px-1.5 py-0.5 font-mono text-[10px] text-[var(--accent)]">
            checklist.yaml
          </span>
        )}
      </div>
      <div className="mt-4">
        <InstallPanel pkg={pkg} compact />
      </div>
      {getSkillBySlug(pkg.slug) && (
        <Link
          href={`/skills/${pkg.slug}`}
          className="mt-3 inline-block font-mono text-xs text-[var(--accent)] hover:underline"
        >
          Xem SOP trên hub →
        </Link>
      )}
    </div>
  );
}
