"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, Sparkles, Terminal } from "lucide-react";
import type { AgentSkillPackage } from "@/lib/agent-skills";
import {
  aiInstallPrompt,
  claudeInstallCommand,
  cursorInstallCommand,
  degitInstallCommand,
  skillsCliInstallCommand,
} from "@/lib/agent-skills";
import { CopyCommand } from "@/components/copy-command";

type Props = {
  pkg: AgentSkillPackage;
  compact?: boolean;
};

export function InstallPanel({ pkg, compact = false }: Props) {
  const [tab, setTab] = useState<"cli" | "ai" | "fallback">("cli");

  return (
    <div
      className={`rounded-xl border border-[var(--border)] bg-[var(--card)] ${compact ? "p-4" : "p-5"}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Terminal className="h-4 w-4 text-[var(--accent)]" />
        <h3 className="text-sm font-semibold tracking-tight">Cài Agent Skill</h3>
        {pkg.isExample && (
          <span className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] uppercase text-[var(--muted)]">
            example
          </span>
        )}
      </div>

      {!compact && (
        <p className="mt-2 text-xs text-[var(--muted)]">
          Một lệnh như{" "}
          <a
            href="https://agentskill.sh/"
            className="text-[var(--accent)] hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            agentskill.sh
          </a>
          . Modes:{" "}
          {pkg.modes.map((m) => (
            <code key={m} className="mx-0.5 text-[var(--accent)]">
              {m}
            </code>
          ))}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-1">
        <TabButton active={tab === "cli"} onClick={() => setTab("cli")}>
          CLI
        </TabButton>
        <TabButton active={tab === "ai"} onClick={() => setTab("ai")}>
          <Sparkles className="mr-1 inline h-3 w-3" />
          Paste to AI
        </TabButton>
        <TabButton active={tab === "fallback"} onClick={() => setTab("fallback")}>
          degit
        </TabButton>
      </div>

      <div className="mt-3 space-y-2">
        {tab === "cli" && (
          <>
            <CopyCommand
              command={skillsCliInstallCommand(pkg, "*")}
              label="All agents (recommended)"
            />
            {!compact && (
              <>
                <CopyCommand command={cursorInstallCommand(pkg)} label="Cursor only" />
                <CopyCommand
                  command={claudeInstallCommand(pkg)}
                  label="Claude Code only"
                />
              </>
            )}
          </>
        )}
        {tab === "ai" && (
          <CopyCommand
            command={aiInstallPrompt(pkg)}
            label="Prompt — paste into Cursor / Claude / Copilot"
            multiline
          />
        )}
        {tab === "fallback" && (
          <>
            <CopyCommand
              command={degitInstallCommand(pkg, "cursor")}
              label="degit → Cursor"
            />
            <CopyCommand
              command={degitInstallCommand(pkg, "claude-code")}
              label="degit → Claude Code"
            />
          </>
        )}
      </div>

      <p className="mt-3 text-[11px] text-[var(--muted)]">
        <Bot className="mr-1 inline h-3 w-3" />
        <code className="text-[var(--foreground)]">{pkg.packagePath}</code>
        {" · "}
        <Link href="/install" className="text-[var(--accent)] hover:underline">
          Install guide
        </Link>
        {" · "}
        <Link
          href="/docs/framework"
          className="text-[var(--accent)] hover:underline"
        >
          Framework
        </Link>
      </p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide transition-colors ${
        active
          ? "bg-[var(--accent)] text-[var(--accent-fg)]"
          : "border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
      }`}
    >
      {children}
    </button>
  );
}
