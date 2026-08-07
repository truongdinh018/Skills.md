"use client";

import { useState } from "react";
import { Copy, Check, Download } from "lucide-react";

type Props = {
  slug: string;
  raw: string;
};

export function SkillActions({ slug, raw }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  function download() {
    const blob = new Blob([raw], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 font-mono text-xs font-medium transition-colors hover:border-[var(--accent)]/40"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-[var(--accent)]" /> Copied
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" /> Copy Markdown
          </>
        )}
      </button>
      <button
        type="button"
        onClick={download}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 font-mono text-xs font-medium transition-colors hover:border-[var(--accent)]/40"
      >
        <Download className="h-3.5 w-3.5" /> Download .md
      </button>
    </div>
  );
}
