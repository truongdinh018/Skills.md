import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getDepartment, type Department } from "./departments";
import { filterSkills } from "./search";

export type Difficulty = "Cơ bản" | "Trung bình" | "Nâng cao";

export type SkillFrontmatter = {
  title: string;
  department: string;
  summary: string;
  tags: string[];
  difficulty: Difficulty;
  author: string;
  updated: string;
  readingTime: string;
  featured?: boolean;
};

export type Skill = SkillFrontmatter & {
  slug: string;
  content: string;
  /** The full raw file contents (frontmatter + body), for download/copy. */
  raw: string;
  department: string;
  departmentInfo: Department;
  /** Optional hub fields (not required by loader). */
  modes: ("guide" | "check" | "comply")[];
  /** True when agent-skills/<dept>/<slug> or _example twin exists. */
  hasAgentPackage: boolean;
};

const SKILLS_DIR = path.join(process.cwd(), "content", "skills");

function isSkillFrontmatter(data: unknown): data is SkillFrontmatter {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.title === "string" &&
    typeof d.department === "string" &&
    typeof d.summary === "string" &&
    Array.isArray(d.tags) &&
    typeof d.difficulty === "string" &&
    typeof d.author === "string" &&
    typeof d.updated === "string" &&
    typeof d.readingTime === "string"
  );
}

function parseModes(data: Record<string, unknown>): ("guide" | "check" | "comply")[] {
  const raw = data.modes;
  if (!Array.isArray(raw)) return ["guide", "check", "comply"];
  const allowed = new Set(["guide", "check", "comply"]);
  const modes = raw.filter(
    (m): m is "guide" | "check" | "comply" =>
      typeof m === "string" && allowed.has(m),
  );
  return modes.length > 0 ? modes : ["guide", "check", "comply"];
}

function agentPackageExists(department: string, slug: string): boolean {
  const candidates = [
    path.join(process.cwd(), "agent-skills", department, slug, "SKILL.md"),
    path.join(
      process.cwd(),
      "agent-skills",
      "_example",
      department,
      slug,
      "SKILL.md",
    ),
  ];
  return candidates.some((p) => fs.existsSync(p));
}

function readSkillFile(fileName: string): Skill | null {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(SKILLS_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  if (!isSkillFrontmatter(data)) {
    throw new Error(
      `Skill "${fileName}" thiếu hoặc sai định dạng frontmatter bắt buộc.`,
    );
  }

  const departmentInfo = getDepartment(data.department);
  if (!departmentInfo) {
    throw new Error(
      `Skill "${fileName}" tham chiếu phòng ban không tồn tại: "${data.department}".`,
    );
  }

  const dataRec = data as Record<string, unknown>;

  return {
    ...data,
    slug,
    content,
    raw,
    departmentInfo,
    modes: parseModes(dataRec),
    hasAgentPackage: agentPackageExists(data.department, slug),
  };
}

let cache: Skill[] | null = null;

export function getAllSkills(): Skill[] {
  if (cache) return cache;

  if (!fs.existsSync(SKILLS_DIR)) {
    cache = [];
    return cache;
  }

  const files = fs
    .readdirSync(SKILLS_DIR)
    .filter((f) => f.endsWith(".md"));

  const skills = files
    .map(readSkillFile)
    .filter((s): s is Skill => s !== null)
    .sort((a, b) => (a.updated < b.updated ? 1 : -1));

  cache = skills;
  return skills;
}

export function getSkillBySlug(slug: string): Skill | undefined {
  return getAllSkills().find((s) => s.slug === slug);
}

export function getSkillsByDepartment(departmentSlug: string): Skill[] {
  return getAllSkills().filter((s) => s.department === departmentSlug);
}

export function getFeaturedSkills(): Skill[] {
  const featured = getAllSkills().filter((s) => s.featured);
  return featured.length > 0 ? featured : getAllSkills().slice(0, 3);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const skill of getAllSkills()) {
    for (const tag of skill.tags) set.add(tag);
  }
  return [...set].sort((a, b) => a.localeCompare(b, "vi"));
}

/**
 * Diacritics-insensitive search across title, summary, tags and department
 * name. Delegates to the shared, fs-free filter in `./search`.
 */
export function searchSkills(query: string, skills?: Skill[]): Skill[] {
  return filterSkills(skills ?? getAllSkills(), query);
}
