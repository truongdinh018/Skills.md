import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getDepartment, type Department } from "./departments";

/** GitHub owner/repo used in one-line install commands (agentskill.sh style). */
export const SKILLSHUB_REPO = "truongdinh018/Skills.md";

export type AgentPlatform =
  | "cursor"
  | "claude-code"
  | "copilot"
  | "windsurf"
  | "codex"
  | "cline"
  | "gemini-cli"
  | "opencode";

export const PLATFORM_SKILL_DIRS: Record<AgentPlatform, string> = {
  cursor: "~/.cursor/skills",
  "claude-code": "~/.claude/skills",
  copilot: "~/.copilot/skills",
  windsurf: "~/.windsurf/skills",
  codex: "~/.codex/skills",
  cline: "~/.cline/skills",
  "gemini-cli": "~/.gemini/skills",
  opencode: "~/.opencode/skills",
};

export type AgentSkillPackage = {
  slug: string;
  name: string;
  description: string;
  department: string;
  departmentInfo: Department | undefined;
  /** Relative path from repo root (for degit / GitHub) */
  packagePath: string;
  installId: string;
  isExample: boolean;
  hasChecklist: boolean;
  modes: ("guide" | "check" | "comply")[];
};

const ROOT = process.cwd();
const AGENT_DIR = path.join(ROOT, "agent-skills");
const SKILLS_ROOT = path.join(ROOT, "skills");

function readSkillMd(
  dir: string,
): { name: string; description: string } | null {
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

function inferDepartment(slug: string, name: string): string {
  const known = [
    "construction-tech",
    "engineering",
    "site-management",
    "qaqc",
    "hse",
    "estimating",
    "procurement",
    "finance",
    "hr",
    "legal",
    "contracts",
    "cost-control",
    "investment",
    "marketing",
    "sales",
    "product",
    "support",
  ];
  for (const d of known) {
    if (slug.startsWith(d + "-") || name.startsWith(d + "-")) return d;
  }
  return "engineering";
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

/** Flat `skills/<installId>/SKILL.md` — preferred for `npx skills add`. */
function scanPublishedSkillsRoot(): AgentSkillPackage[] {
  if (!fs.existsSync(SKILLS_ROOT)) return [];
  const out: AgentSkillPackage[] = [];
  for (const entry of fs.readdirSync(SKILLS_ROOT)) {
    if (entry.startsWith(".") || entry.startsWith("_")) continue;
    const abs = path.join(SKILLS_ROOT, entry);
    if (!fs.statSync(abs).isDirectory()) continue;
    const meta = readSkillMd(abs);
    if (!meta) continue;
    const department = inferDepartment(entry, meta.name);
    out.push({
      slug: entry.replace(new RegExp(`^${department}-`), "") || entry,
      name: meta.name,
      description: meta.description,
      department,
      departmentInfo: getDepartment(department),
      packagePath: `skills/${entry}`,
      installId: meta.name || entry,
      isExample: false,
      hasChecklist: fs.existsSync(path.join(abs, "checklist.yaml")),
      modes: detectModes(meta.description),
    });
  }
  return out;
}

let cache: AgentSkillPackage[] | null = null;

/** All installable Agent Skill packages (deduped by installId). */
export function getAllAgentPackages(): AgentSkillPackage[] {
  if (cache) return cache;

  const byId = new Map<string, AgentSkillPackage>();

  // Prefer flat skills/ (CLI-friendly), then agent-skills/
  for (const pkg of scanPublishedSkillsRoot()) {
    byId.set(pkg.installId, pkg);
  }

  if (fs.existsSync(AGENT_DIR)) {
    const exampleRoot = path.join(AGENT_DIR, "_example");
    if (fs.existsSync(exampleRoot)) {
      for (const dept of fs.readdirSync(exampleRoot)) {
        for (const pkg of scanDepartmentDir(
          dept,
          path.join(exampleRoot, dept),
          true,
        )) {
          if (!byId.has(pkg.installId)) byId.set(pkg.installId, pkg);
        }
      }
    }
    for (const entry of fs.readdirSync(AGENT_DIR)) {
      if (entry.startsWith("_") || entry.startsWith(".")) continue;
      const abs = path.join(AGENT_DIR, entry);
      if (!fs.statSync(abs).isDirectory()) continue;
      for (const pkg of scanDepartmentDir(entry, abs, false)) {
        if (!byId.has(pkg.installId)) byId.set(pkg.installId, pkg);
      }
    }
  }

  cache = [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
  return cache;
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
    (p) =>
      (p.department === department && p.slug === slug) ||
      p.installId === `${department}-${slug}` ||
      p.name === `${department}-${slug}`,
  );
}

/** One-liner like agentskill.sh / skills.sh — works for AI agents. */
export function skillsCliInstallCommand(
  pkg: AgentSkillPackage,
  agent: AgentPlatform | "*" = "*",
): string {
  const agentFlag = agent === "*" ? "-a '*'" : `-a ${agent}`;
  return `npx skills add ${SKILLSHUB_REPO} -s ${pkg.installId} ${agentFlag} -g -y`;
}

export function skillsCliSetupAllCommand(): string {
  return `npx skills add ${SKILLSHUB_REPO} --all -g`;
}

export function degitInstallCommand(
  pkg: AgentSkillPackage,
  platform: AgentPlatform = "cursor",
): string {
  const dest = `${PLATFORM_SKILL_DIRS[platform]}/${pkg.installId}`;
  return `npx degit ${SKILLSHUB_REPO}/${pkg.packagePath} ${dest}`;
}

export function cursorInstallCommand(pkg: AgentSkillPackage): string {
  return skillsCliInstallCommand(pkg, "cursor");
}

export function claudeInstallCommand(pkg: AgentSkillPackage): string {
  return skillsCliInstallCommand(pkg, "claude-code");
}

/** Prompt block for AI agents (agentskill.sh style). */
export function aiInstallPrompt(pkg?: AgentSkillPackage): string {
  if (pkg) {
    return [
      `Install the company SOP skill "${pkg.installId}" from SkillsHub so you can guide, check, and audit compliance.`,
      `Run exactly:`,
      skillsCliInstallCommand(pkg, "*"),
      `Then confirm the skill is available and offer modes: guide | check | comply.`,
    ].join("\n");
  }
  return [
    `You are setting up SkillsHub company SOP skills for this user.`,
    `1. Run: ${skillsCliSetupAllCommand()}`,
    `   (or install meta skill: npx skills add ${SKILLSHUB_REPO} -s skillshub -a '*' -g -y)`,
    `2. List installed skills and ask which department SOP they need.`,
    `3. For a specific SOP use: npx skills add ${SKILLSHUB_REPO} -s <skill-id> -a '*' -g -y`,
    `Do NOT git clone the whole monorepo. Use the skills CLI so only SKILL.md packages are installed.`,
  ].join("\n");
}
