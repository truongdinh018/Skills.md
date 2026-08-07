import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Sparkles, Terminal } from "lucide-react";
import {
  SKILLSHUB_REPO,
  aiInstallPrompt,
  getAllAgentPackages,
  skillsCliSetupAllCommand,
  skillsCliInstallCommand,
} from "@/lib/agent-skills";
import { CopyCommand } from "@/components/copy-command";
import { InstallPanel } from "@/components/install-panel";

export const metadata: Metadata = {
  title: "Install",
  description:
    "Cài SkillsHub Agent Skills một lệnh — npx skills add, paste prompt cho AI, degit.",
};

export default function InstallPage() {
  const packages = getAllAgentPackages().filter((p) => p.installId !== "skillshub");
  const meta = getAllAgentPackages().find((p) => p.installId === "skillshub");
  const example =
    packages.find((p) => p.installId === "construction-tech-nghiem-thu-cot-thep") ??
    packages[0];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
          How to install
        </p>
        <h1 className="mt-2 flex items-center gap-2 text-3xl font-bold tracking-tight">
          <Terminal className="h-7 w-7 text-[var(--accent)]" />
          Install skills
        </h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Giống{" "}
          <a
            href="https://agentskill.sh/"
            className="text-[var(--accent)] hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            agentskill.sh
          </a>
          : AI hoặc bạn chạy một lệnh — skill vào đúng thư mục Cursor / Claude /
          Copilot / Windsurf.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">1. Setup nhanh</h2>
        <CopyCommand
          command={skillsCliSetupAllCommand()}
          label="Install all published skills (global)"
        />
        {meta && (
          <CopyCommand
            command={skillsCliInstallCommand(meta, "*")}
            label="Meta skill — dạy AI cách cài thêm SOP"
          />
        )}
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Sparkles className="h-5 w-5 text-[var(--accent)]" />
          2. Paste vào AI (khuyên dùng)
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Copy khối dưới vào Cursor / Claude / Copilot — agent sẽ tự chạy{" "}
          <code className="text-[var(--accent)]">npx skills add</code>.
        </p>
        <CopyCommand command={aiInstallPrompt()} label="AI setup prompt" multiline />
      </section>

      {example && (
        <section className="mt-10 space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">
            3. Một SOP cụ thể
          </h2>
          <InstallPanel pkg={example} />
        </section>
      )}

      <section className="mt-10 space-y-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 text-sm text-[var(--muted)]">
        <h2 className="text-base font-semibold text-[var(--foreground)]">
          Ghi chú
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Repo:{" "}
            <code className="text-[var(--accent)]">{SKILLSHUB_REPO}</code>
          </li>
          <li>
            Chỉ package có <code>SKILL.md</code> mới cài được — bỏ qua HTML export
            trong thư mục <code>skills/</code>.
          </li>
          <li>
            Chi tiết framework:{" "}
            <Link href="/docs/framework" className="text-[var(--accent)] hover:underline">
              /docs/framework
            </Link>
          </li>
          <li>
            <a
              href="https://agentskill.sh/install"
              className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              agentskill.sh install guide
              <ExternalLink className="h-3 w-3" />
            </a>
          </li>
        </ul>
      </section>

      {packages.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            Packages sẵn sàng
          </h2>
          <ul className="space-y-2 font-mono text-xs">
            {packages.map((p) => (
              <li key={p.installId}>
                <code className="text-[var(--accent)]">{p.installId}</code>
                <span className="text-[var(--muted)]"> — {p.packagePath}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/agent-skills"
            className="mt-4 inline-block font-mono text-xs text-[var(--accent)] hover:underline"
          >
            Xem tất cả Agent Skills →
          </Link>
        </section>
      )}
    </div>
  );
}
