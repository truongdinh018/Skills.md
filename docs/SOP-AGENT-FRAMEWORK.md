# Framework SOP + Agent Skill đa nền tảng

Khung chung để mỗi phòng ban xuất bản **một SOP** phục vụ:

1. **Người đọc** trên Skills Hub (`content/skills/`)
2. **AI agent** (Cursor, Claude Code, Copilot, …) qua chuẩn [Agent Skills / `SKILL.md`](https://github.com/agentskills/agentskills)
3. Ba chế độ: **guide** (hướng dẫn) · **check** (kiểm tra) · **comply** (chấm tuân thủ)

Nhân sự cùng phòng ban cài **cùng một package** → AI tuân thủ cùng checklist và hold point.

## Sơ đồ nhanh

```
templates/human-sop.md          →  content/skills/<slug>.md     (hub web)
templates/checklist.yaml        →  agent-skills/<dept>/<slug>/checklist.yaml
templates/agent-skill/*         →  agent-skills/<dept>/<slug>/  (SKILL.md + refs)
agent-skills/_shared/compliance-rubric.md  →  dùng chung khi comply
```

Ví dụ điền sẵn: [`agent-skills/_example/construction-tech/nghiem-thu-cot-thep/`](../agent-skills/_example/construction-tech/nghiem-thu-cot-thep/).

## Bước 1 — Viết SOP cho hub

1. Copy [`templates/human-sop.md`](../templates/human-sop.md) → `content/skills/<slug>.md`
2. Điền frontmatter bắt buộc (`title`, `department`, `summary`, `tags`, `difficulty`, `author`, `updated`, `readingTime`)
3. `department` phải là slug có trong [`src/lib/departments.ts`](../src/lib/departments.ts)
4. Field tùy chọn (khuyến nghị): `modes`, `hold_points`, `evidence_required`
5. Chạy `npm test` để loader xác nhận frontmatter

## Bước 2 — Tạo Agent Skill cho cùng SOP

```bash
DEPT=construction-tech
SLUG=nghiem-thu-cot-thep

mkdir -p "agent-skills/$DEPT/$SLUG/references" "agent-skills/$DEPT/$SLUG/examples"
cp templates/agent-skill/SKILL.md.template "agent-skills/$DEPT/$SLUG/SKILL.md"
cp templates/checklist.yaml "agent-skills/$DEPT/$SLUG/"
cp "content/skills/$SLUG.md" "agent-skills/$DEPT/$SLUG/references/sop.md"
cp agent-skills/_shared/compliance-rubric.md \
  "agent-skills/$DEPT/$SLUG/references/compliance-rubric.md"
cp templates/agent-skill/examples/pass.md "agent-skills/$DEPT/$SLUG/examples/"
cp templates/agent-skill/examples/fail.md "agent-skills/$DEPT/$SLUG/examples/"
```

Sau đó chỉnh:

- `SKILL.md` → `name: <dept>-<slug>`, `description` có trigger guide/check/comply
- `checklist.yaml` → mọi mục `must`/`should`, hold points, evidence
- `examples/*` → case thật của phòng ban

## Bước 3 — Cài cho mọi agent (nhân sự dùng chung)

### Cursor (user)

```bash
cp -R agent-skills/<dept>/<slug> ~/.cursor/skills/<dept>-<slug>
```

### Cursor (theo project — cả team clone repo)

```bash
mkdir -p .cursor/skills
cp -R agent-skills/<dept>/<slug> .cursor/skills/<dept>-<slug>
```

### Claude Code

```bash
cp -R agent-skills/<dept>/<slug> ~/.claude/skills/<dept>-<slug>
# hoặc .claude/skills/ trong project
```

### GitHub Copilot / agent khác hỗ trợ Agent Skills

Copy cùng folder `SKILL.md` vào thư mục skills của tool (xem docs tool). Nguyên tắc: **một thư mục = một skill**, có `SKILL.md` ở gốc.

### Khi repo đã public trên GitHub (kiểu agentskill.sh)

Publish bản cài vào `skills/<dept>-<slug>/` (có `SKILL.md`), rồi:

```bash
npx skills add truongdinh018/Skills.md -s <dept>-<slug> -a '*' -g -y
# hoặc paste prompt từ trang /install vào AI
```

Meta skill: `-s skillshub`.

## Bước 4 — Dùng 3 mode (câu mẫu)

**Guide**

> Hướng dẫn tôi làm theo SOP nghiệm thu cốt thép. Đang ở bước tự kiểm của nhà thầu.

**Check**

> Kiểm tra theo checklist nghiệm thu cốt thép. Hiện trạng: … ; ảnh: … ; biên bản: chưa có.

**Comply**

> Chấm tuân thủ SOP nghiệm thu cốt thép trước khi đổ. Đây là bằng chứng: …

Agent phải đọc `SKILL.md` → chọn mode → dùng `checklist.yaml` + rubric.

## Ownership phòng ban

| Ai | Việc |
|----|------|
| Chủ SOP phòng ban | Nội dung `content/skills/` + `agent-skills/<dept>/` |
| Mọi nhân sự phòng | Cài package skill vào agent họ dùng |
| Platform / IT | Giữ `templates/`, `_shared/compliance-rubric.md`, docs này |

Không sửa template gốc khi viết SOP thật — **copy rồi điền**.

## Quy tắc tuân thủ (tóm tắt)

Chi tiết: [`agent-skills/_shared/compliance-rubric.md`](../agent-skills/_shared/compliance-rubric.md).

- Không bỏ qua mục `must`
- Hold point thiếu evidence → không `COMPLIANT`
- Bỏ qua hold point / làm tiếp khi chưa mở → `NON_COMPLIANT`

## Phase sau (chưa có trong khung này)

- UI hub chấm điểm / dashboard
- Script sync tự động hub ↔ agent-skills
- Bắt buộc field mới trong `src/lib/skills.ts`
