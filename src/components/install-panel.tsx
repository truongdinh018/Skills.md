import Link from "next/link";
import { Terminal } from "lucide-react";
import type { AgentSkillPackage } from "@/lib/agent-skills";
import {
  claudeInstallCommand,
  cursorInstallCommand,
} from "@/lib/agent-skills";
import { CopyCommand } from "@/components/copy-command";

type Props = {
  pkg: AgentSkillPackage;
  compact?: boolean;
};

export function InstallPanel({ pkg, compact = false }: Props) {
  return (
    <div
      className={`rounded-xl border border-[var(--border)] bg-[var(--card)] ${compact ? "p-4" : "p-5"}`}
    >
      <div className="flex items-center gap-2">
        <Terminal className="h-4 w-4 text-[var(--accent)]" />
        <h3 className="text-sm font-semibold tracking-tight">
          Cài Agent Skill
        </h3>
        {pkg.isExample && (
          <span className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] uppercase text-[var(--muted)]">
            example
          </span>
        )}
      </div>
      {!compact && (
        <p className="mt-2 text-xs text-[var(--muted)]">
          Chạy từ thư mục gốc repo Skills.md. Modes:{" "}
          {pkg.modes.map((m) => (
            <code key={m} className="mx-0.5 text-[var(--accent)]">
              {m}
            </code>
          ))}
        </p>
      )}
      <div className="mt-3 space-y-2">
        <CopyCommand command={cursorInstallCommand(pkg)} label="Cursor" />
        <CopyCommand command={claudeInstallCommand(pkg)} label="Claude Code" />
      </div>
      <p className="mt-3 text-[11px] text-[var(--muted)]">
        Package:{" "}
        <code className="text-[var(--foreground)]">{pkg.packagePath}</code>
        {" · "}
        <Link
          href="/docs/framework"
          className="text-[var(--accent)] hover:underline"
        >
          Hướng dẫn framework
        </Link>
      </p>
    </div>
  );
}
