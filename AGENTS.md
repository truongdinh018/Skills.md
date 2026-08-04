<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This repo is a single Next.js 16 (App Router) web app — a "Skills Hub" that stores skills as Markdown files. There is only one service to run.

- Dev server: `npm run dev` serves on http://localhost:3000. Standard scripts live in `package.json` (`dev`, `build`, `start`, `lint`, `test`).
- Content model: skills are Markdown files in `content/skills/*.md` with frontmatter parsed by `src/lib/skills.ts`. The loader validates frontmatter and throws at load time if a skill is missing required fields or references a department slug not defined in `src/lib/departments.ts` — so both `next build` and `npm test` will fail loudly on a malformed skill. Fix the frontmatter rather than the loader.
- `getAllSkills()` caches results in module memory. Adding/renaming a Markdown file is picked up by the dev server on the next request, but if you script things directly against the lib in a long-lived process you may need a fresh process to bust the cache.
- Search must stay diacritics-insensitive (Vietnamese). The pure, fs-free matcher lives in `src/lib/search.ts` and is shared by the server (`src/lib/skills.ts`) and the client component (`src/components/skill-browser.tsx`). Client components must import search helpers from `src/lib/search.ts`, never from `src/lib/skills.ts` (the latter imports `node:fs`).
- `AGENTS.md` and `CLAUDE.md`: the top `nextjs-agent-rules` block and `CLAUDE.md` are auto-generated/re-added by `next dev`. This is expected; commit them so the working tree stays clean. Do not delete the block (it just comes back).
- Deploy: GitHub Pages via `.github/workflows/deploy.yml` on push to `main`. Static export is **opt-in** and only turned on when `BUILD_STATIC_EXPORT=true` (see `next.config.ts`); `PAGES_BASE_PATH` sets `basePath` for the project site (e.g. `/Skills.md`). Normal `next dev`/`next build`/`next start` are unaffected when those env vars are unset. Caveat: with export enabled, `next start` is unsupported — serve the generated `out/` with any static server instead. Pages must be enabled once (Settings → Pages → Source: GitHub Actions); the workflow also attempts `enablement: true`.

