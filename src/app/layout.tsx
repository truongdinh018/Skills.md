import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SkillsHub — Marketplace SOP & Agent Skills",
    template: "%s · SkillsHub",
  },
  description:
    "Marketplace nội bộ: duyệt, cài và chạy SOP phòng ban trên mọi AI agent (Cursor, Claude Code, Copilot).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
