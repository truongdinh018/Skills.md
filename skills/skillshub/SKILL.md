---
name: skillshub
description: >-
  Install and discover SkillsHub company SOP Agent Skills (guide / check / comply).
  Use when the user wants to install Skills.md skills, set up SOP skills for AI,
  browse departments, or says /skillshub, /learn skillshub, "cài skill SOP",
  "install SkillsHub", "npx skills add truongdinh018/Skills.md".
---

# SkillsHub — install & discover SOP skills

You help the user install **portable Agent Skills** from the SkillsHub repo
`truongdinh018/Skills.md` (marketplace inspired by [agentskill.sh](https://agentskill.sh/)).

## Prefer CLI install (do not clone the whole monorepo)

```bash
# Meta / this skill
npx skills add truongdinh018/Skills.md -s skillshub -a '*' -g -y

# One SOP package
npx skills add truongdinh018/Skills.md -s construction-tech-nghiem-thu-cot-thep -a '*' -g -y

# Everything published under skills/
npx skills add truongdinh018/Skills.md --all -g
```

Fallback if `skills` CLI is unavailable:

```bash
npx degit truongdinh018/Skills.md/skills/<skill-id> ~/.cursor/skills/<skill-id>
```

Platform dirs (pick what the user runs):

| Agent | Global skills dir |
|-------|-------------------|
| Cursor | `~/.cursor/skills` |
| Claude Code | `~/.claude/skills` |
| Copilot | `~/.copilot/skills` |
| Windsurf | `~/.windsurf/skills` |
| Codex | `~/.codex/skills` |
| Cline | `~/.cline/skills` |

## After install

1. Confirm the skill folder contains `SKILL.md` (+ optional `checklist.yaml`).
2. Offer modes: **guide** | **check** | **comply**.
3. Point humans to the hub: `https://truongdinh018.github.io/Skills.md/` (or local marketplace).

## Rules

- Install only packages that have `SKILL.md` — ignore Next.js HTML under `skills/*/index.html`.
- Never invent SOP steps; load the installed skill files as source of truth.
- Default language with Vietnamese users: Vietnamese.
