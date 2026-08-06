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
      // Clipboard may be unavailable (e.g. insecure context); ignore.
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
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm font-medium transition-colors hover:border-indigo-300"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-600" /> Đã sao chép
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" /> Sao chép Markdown
          </>
        )}
      </button>
      <button
        type="button"
        onClick={download}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm font-medium transition-colors hover:border-indigo-300"
      >
        <Download className="h-4 w-4" /> Tải .md
      </button>
    </div>
  );
}
