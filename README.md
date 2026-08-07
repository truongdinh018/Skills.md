# SkillsHub — Marketplace SOP & Agent Skills

Marketplace nội bộ để **duyệt, cài và chạy SOP theo phòng ban** trên mọi AI agent
(Cursor, Claude Code, Copilot…).

**Live:** [https://truongdinh018.github.io/Skills.md/](https://truongdinh018.github.io/Skills.md/)

UX lấy cảm hứng từ [skills.sh](https://www.skills.sh/), [skills-hub.ai](https://skills-hub.ai/),
[agentskill.sh](https://agentskill.sh/) — nội dung là quy trình công ty (tiếng Việt).

## Tính năng

| Khu vực | Mô tả |
|--------|--------|
| Marketplace | Browse, Categories, search (không phân biệt dấu), leaderboard cập nhật |
| Hub SOP | Markdown + frontmatter theo phòng ban |
| Agent Skills | Package `SKILL.md` với 3 mode: **guide** · **check** · **comply** |
| Install | Copy lệnh cài Cursor / Claude ngay trên trang skill |
| Templates | Khung chung cho mọi phòng ban (`templates/`) |

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Vitest · GitHub Pages

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm test
```

## Cấu trúc

```
content/skills/                 # SOP trên hub (người đọc)
templates/                      # human-sop, checklist.yaml, agent-skill/
agent-skills/                   # package cài được
  _shared/compliance-rubric.md
  _example/construction-tech/nghiem-thu-cot-thep/
docs/SOP-AGENT-FRAMEWORK.md     # hướng dẫn phòng ban
src/app/                        # UI marketplace
```

## Thêm SOP (hub)

Copy [`templates/human-sop.md`](templates/human-sop.md) → `content/skills/<slug>.md`.

`department` phải là slug trong [`src/lib/departments.ts`](src/lib/departments.ts).

```markdown
---
title: "Tên SOP"
department: "construction-tech"
summary: "Mô tả ngắn."
tags: ["tag1"]
difficulty: "Trung bình"   # Cơ bản | Trung bình | Nâng cao
author: "Phòng …"
updated: "2026-08-07"
readingTime: "6 phút"
featured: false
modes: ["guide", "check", "comply"]
---
```

## Agent Skill (AI)

Chi tiết: [`docs/SOP-AGENT-FRAMEWORK.md`](docs/SOP-AGENT-FRAMEWORK.md).

```bash
# Cài ví dụ nghiệm thu cốt thép vào Cursor
cp -R agent-skills/_example/construction-tech/nghiem-thu-cot-thep \
  ~/.cursor/skills/construction-tech-nghiem-thu-cot-thep
```

Sau đó trong agent: *“Hướng dẫn nghiệm thu cốt thép”* / *“Kiểm tra checklist…”* / *“Chấm tuân thủ…”*.

## Deploy GitHub Pages

Mỗi push `main` chạy [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. `npm ci` → `npm test`
2. Static export với `BUILD_STATIC_EXPORT=true` và `PAGES_BASE_PATH=/Skills.md`
3. Deploy artifact `out/` lên Pages

Bật: **Settings → Pages → Source: GitHub Actions**.

Build local:

```bash
BUILD_STATIC_EXPORT=true PAGES_BASE_PATH=/Skills.md npm run build
# → ./out
```

## License

Nội bộ trừ khi chủ repo quy định khác.
