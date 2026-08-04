import { describe, it, expect } from "vitest";
import {
  getAllSkills,
  getSkillBySlug,
  getSkillsByDepartment,
  getFeaturedSkills,
  getAllTags,
  searchSkills,
} from "./skills";
import { normalize, filterSkills } from "./search";
import { DEPARTMENTS } from "./departments";

describe("skills library", () => {
  it("loads skills from the content directory", () => {
    const skills = getAllSkills();
    expect(skills.length).toBeGreaterThan(0);
  });

  it("attaches valid department info to every skill", () => {
    const validSlugs = new Set(DEPARTMENTS.map((d) => d.slug));
    for (const skill of getAllSkills()) {
      expect(validSlugs.has(skill.department)).toBe(true);
      expect(skill.departmentInfo.slug).toBe(skill.department);
    }
  });

  it("finds a skill by slug and returns undefined for unknown slugs", () => {
    const first = getAllSkills()[0];
    expect(getSkillBySlug(first.slug)?.title).toBe(first.title);
    expect(getSkillBySlug("khong-ton-tai")).toBeUndefined();
  });

  it("filters skills by department", () => {
    const eng = getSkillsByDepartment("engineering");
    expect(eng.length).toBeGreaterThan(0);
    expect(eng.every((s) => s.department === "engineering")).toBe(true);
  });

  it("returns featured skills", () => {
    expect(getFeaturedSkills().length).toBeGreaterThan(0);
  });

  it("collects a unique, sorted list of tags", () => {
    const tags = getAllTags();
    expect(tags.length).toBeGreaterThan(0);
    expect(new Set(tags).size).toBe(tags.length);
  });
});

describe("search", () => {
  it("strips Vietnamese diacritics when normalizing", () => {
    expect(normalize("Kỹ Thuật")).toBe("ky thuat");
    expect(normalize("Đánh giá")).toBe("danh gia");
  });

  it("matches accent-insensitively", () => {
    const skills = getAllSkills();
    const withAccents = searchSkills("kỹ thuật", skills);
    const withoutAccents = searchSkills("ky thuat", skills);
    expect(withoutAccents.length).toBe(withAccents.length);
    expect(withoutAccents.length).toBeGreaterThan(0);
  });

  it("returns all skills for an empty query", () => {
    const skills = getAllSkills();
    expect(filterSkills(skills, "").length).toBe(skills.length);
  });

  it("requires every term to match", () => {
    const skills = getAllSkills();
    const result = searchSkills("review code", skills);
    expect(result.some((s) => s.slug === "code-review-hieu-qua")).toBe(true);
  });
});
