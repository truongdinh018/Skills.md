import type { Skill } from "./skills";

/** Lowercase + strip Vietnamese diacritics for accent-insensitive matching. */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

export type SearchableSkill = Pick<
  Skill,
  "title" | "summary" | "tags"
> & {
  departmentInfo: Pick<Skill["departmentInfo"], "name">;
};

/**
 * Pure, dependency-free filter used by both the server library and the
 * client-side browser. Matches when every whitespace-separated term appears
 * in the title, summary, tags or department name.
 */
export function filterSkills<T extends SearchableSkill>(
  skills: T[],
  query: string,
): T[] {
  const q = normalize(query).trim();
  if (!q) return skills;
  const terms = q.split(/\s+/);
  return skills.filter((skill) => {
    const haystack = normalize(
      [
        skill.title,
        skill.summary,
        skill.tags.join(" "),
        skill.departmentInfo.name,
      ].join(" "),
    );
    return terms.every((term) => haystack.includes(term));
  });
}
