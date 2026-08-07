import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { Markdown } from "@/components/markdown";

export const metadata: Metadata = {
  title: "SOP + Agent Skill framework",
  description:
    "Hướng dẫn viết SOP hub, đóng gói Agent Skill, cài đa nền tảng.",
};

export default function FrameworkDocsPage() {
  const file = path.join(process.cwd(), "docs", "SOP-AGENT-FRAMEWORK.md");
  const content = fs.existsSync(file)
    ? fs.readFileSync(file, "utf8")
    : "# Docs missing\n\nFile `docs/SOP-AGENT-FRAMEWORK.md` chưa có.";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
        Docs
      </p>
      <div className="prose prose-invert mt-4 max-w-none">
        <Markdown content={content} />
      </div>
    </div>
  );
}
