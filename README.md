# Skills.md — Skills Hub

Website nội bộ để **lưu trữ và chia sẻ skill** (quy trình, hướng dẫn công việc)
cho các phòng ban trong công ty. Mỗi skill là một file Markdown, được phân loại
theo phòng ban, có tìm kiếm và lọc.

Ý tưởng lấy cảm hứng từ các trang web chuyên cung cấp "skill/playbook" nội bộ:
skill được viết bằng Markdown, có metadata (phòng ban, độ khó, tag, thời gian
đọc) và hiển thị dưới dạng thư viện dễ duyệt.

## Tính năng

- Trang chủ với thống kê, danh sách phòng ban và skill nổi bật.
- Trang **Tất cả skill** với tìm kiếm (không phân biệt dấu tiếng Việt) và lọc
  theo phòng ban.
- Trang chi tiết skill render Markdown (bảng, checklist, code block…).
- Trang theo từng phòng ban.

## Công nghệ

- [Next.js 16](https://nextjs.org/) (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + `@tailwindcss/typography`
- Nội dung: Markdown + frontmatter (`gray-matter`), render bằng
  `react-markdown` + `remark-gfm`
- Test: [Vitest](https://vitest.dev/)

## Bắt đầu

```bash
npm install      # cài dependencies
npm run dev      # chạy dev server tại http://localhost:3000
```

Các lệnh khác:

```bash
npm run lint     # kiểm tra ESLint
npm test         # chạy unit test (Vitest)
npm run build    # build production
npm start        # chạy bản production sau khi build
```

## Thêm một skill mới

Tạo một file Markdown trong `content/skills/<slug>.md` với frontmatter:

```markdown
---
title: "Tên skill"
department: "engineering"   # slug phòng ban, xem src/lib/departments.ts
summary: "Mô tả ngắn."
tags: ["tag1", "tag2"]
difficulty: "Cơ bản"        # Cơ bản | Trung bình | Nâng cao
author: "Tên tác giả"
updated: "2026-07-30"
readingTime: "5 phút"
featured: true              # (tùy chọn) hiển thị ở mục nổi bật
---

Nội dung Markdown của skill...
```

Danh sách phòng ban được định nghĩa trong [`src/lib/departments.ts`](src/lib/departments.ts).

## Deploy lên GitHub Pages

Trang web được deploy tự động lên **GitHub Pages** bằng GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

Bật một lần trong repo: **Settings → Pages → Source: GitHub Actions**
(workflow cũng thử bật tự động qua `enablement: true`, nhưng một số tổ chức
chặn nên có thể cần bật thủ công).

Sau đó, mỗi lần push lên `main`, workflow sẽ:

1. `npm ci` để cài dependencies.
2. Build **static export** với `BUILD_STATIC_EXPORT=true` và `PAGES_BASE_PATH`
   trỏ tới `/<tên-repo>` (ví dụ `/Skills.md`), tạo ra thư mục `out/`.
3. Upload `out/` và deploy lên Pages.

Trang sẽ có tại: `https://<username>.github.io/<tên-repo>/`
(ví dụ `https://truongdinh018.github.io/Skills.md/`).

Build static export cục bộ để kiểm tra:

```bash
BUILD_STATIC_EXPORT=true PAGES_BASE_PATH=/Skills.md npm run build
# Kết quả nằm trong ./out (đây là site tĩnh sẽ deploy)
```

> Lưu ý: khi bật static export, `npm start` (`next start`) không dùng được —
> hãy serve thư mục `out/` bằng static server bất kỳ.
