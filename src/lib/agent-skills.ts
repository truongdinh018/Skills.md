import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getDepartment, type Department } from "./departments";

export type AgentSkillPackage = {
  /** Folder name under department, e.g. nghiem-thu-cot-thep */
  slug: string;
  /** Agent Skills name from SKILL.md frontmatter */
  name: string;
  description: string;
  department: string;
  departmentInfo: Department | undefined;
  /** Relative path from repo root */
  packagePath: string;
  /** Cursor install target folder name */
  installId: string;
  isExample: boolean;
  hasChecklist: boolean;
  modes: ("guide" | "check" | "comply")[];
};

const ROOT = process.cwd();
const AGENT_DIR = path.join(ROOT, "agent-skills");

function readSkillMd(dir: string): { name: string; description: string } | null {
  const skillPath = path.join(dir, "SKILL.md");
  if (!fs.existsSync(skillPath)) return null;
  const raw = fs.readFileSync(skillPath, "utf8");
  const { data } = matter(raw);
  const name = typeof data.name === "string" ? data.name : path.basename(dir);
  const description =
    typeof data.description === "string" ? data.description.trim() : "";
  return { name, description };
}

function detectModes(description: string): ("guide" | "check" | "comply")[] {
  const d = description.toLowerCase();
  const modes: ("guide" | "check" | "comply")[] = [];
  if (d.includes("guide") || d.includes("hướng dẫn")) modes.push("guide");
  if (d.includes("check") || d.includes("kiểm tra")) modes.push("check");
  if (d.includes("comply") || d.includes("tuân thủ") || d.includes("audit")) {
    modes.push("comply");
  }
  return modes.length > 0 ? modes : ["guide", "check", "comply"];
}

function scanDepartmentDir(
  deptSlug: string,
  absDept: string,
  isExample: boolean,
): AgentSkillPackage[] {
  if (!fs.existsSync(absDept) || !fs.statSync(absDept).isDirectory()) return [];
  const out: AgentSkillPackage[] = [];
  for (const entry of fs.readdirSync(absDept)) {
    if (entry.startsWith(".")) continue;
    const abs = path.join(absDept, entry);
    if (!fs.statSync(abs).isDirectory()) continue;
    const meta = readSkillMd(abs);
    if (!meta) continue;
    const packagePath = isExample
      ? `agent-skills/_example/${deptSlug}/${entry}`
      : `agent-skills/${deptSlug}/${entry}`;
    out.push({
      slug: entry,
      name: meta.name,
      description: meta.description,
      department: deptSlug,
      departmentInfo: getDepartment(deptSlug),
      packagePath,
      installId: meta.name || `${deptSlug}-${entry}`,
      isExample,
      hasChecklist: fs.existsSync(path.join(abs, "checklist.yaml")),
      modes: detectModes(meta.description),
    });
  }
  return out;
}

let cache: AgentSkillPackage[] | null = null;

/** All installable Agent Skill packages under agent-skills/ */
export function getAllAgentPackages(): AgentSkillPackage[] {
  if (cache) return cache;
  if (!fs.existsSync(AGENT_DIR)) {
    cache = [];
    return cache;
  }

  const packages: AgentSkillPackage[] = [];

  const exampleRoot = path.join(AGENT_DIR, "_example");
  if (fs.existsSync(exampleRoot)) {
    for (const dept of fs.readdirSync(exampleRoot)) {
      packages.push(
        ...scanDepartmentDir(dept, path.join(exampleRoot, dept), true),
      );
    }
  }

  for (const entry of fs.readdirSync(AGENT_DIR)) {
    if (entry.startsWith("_") || entry.startsWith(".")) continue;
    const abs = path.join(AGENT_DIR, entry);
    if (!fs.statSync(abs).isDirectory()) continue;
    packages.push(...scanDepartmentDir(entry, abs, false));
  }

  packages.sort((a, b) => a.name.localeCompare(b.name));
  cache = packages;
  return packages;
}

export function getAgentPackageBySlug(
  slug: string,
): AgentSkillPackage | undefined {
  return getAllAgentPackages().find((p) => p.slug === slug || p.name === slug);
}

export function getAgentPackageForHubSkill(
  department: string,
  slug: string,
): AgentSkillPackage | undefined {
  return getAllAgentPackages().find(
    (p) => p.department === department && p.slug === slug,
  );
}

export function cursorInstallCommand(pkg: AgentSkillPackage): string {
  return `cp -R ${pkg.packagePath} ~/.cursor/skills/${pkg.installId}`;
}

export function claudeInstallCommand(pkg: AgentSkillPackage): string {
  return `cp -R ${pkg.packagePath} ~/.claude/skills/${pkg.installId}`;
}
