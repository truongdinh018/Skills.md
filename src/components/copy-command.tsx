"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type Props = {
  command: string;
  label?: string;
  /** Prompt / multi-line — omit the `$ ` shell prefix. */
  multiline?: boolean;
};

export function CopyCommand({ command, label, multiline = false }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface-2)]">
      {label && (
        <div className="border-b border-[var(--border)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
          {label}
        </div>
      )}
      <div className="flex items-stretch gap-0">
        <pre
          className={`flex-1 overflow-x-auto px-3 py-3 font-mono text-xs leading-relaxed text-[var(--accent)] sm:text-sm ${
            multiline ? "max-h-48 whitespace-pre-wrap" : ""
          }`}
        >
          <code>
            {multiline ? command : `$ ${command}`}
          </code>
        </pre>
        <button
          type="button"
          onClick={copy}
          aria-label="Sao chép lệnh"
          className="shrink-0 border-l border-[var(--border)] px-3 text-[var(--muted)] transition-colors hover:bg-[var(--card)] hover:text-[var(--accent)]"
        >
          {copied ? (
            <Check className="h-4 w-4 text-[var(--accent)]" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
