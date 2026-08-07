# Agent Skills theo phòng ban

Thư mục này chứa **Agent Skill** (chuẩn `SKILL.md`) để mọi AI agent
(Cursor, Claude Code, GitHub Copilot, …) và nhân sự phòng ban **cài cùng một bộ SOP**.

Hub người đọc vẫn nằm ở `content/skills/`. Xem hướng dẫn đầy đủ:
[docs/SOP-AGENT-FRAMEWORK.md](../docs/SOP-AGENT-FRAMEWORK.md).

## Cấu trúc

```
agent-skills/
  _shared/
    compliance-rubric.md     # thang tuân thủ dùng chung
  _example/
    construction-tech/
      nghiem-thu-cot-thep/   # ví dụ đầy đủ — copy pattern này
  <department>/              # slug = src/lib/departments.ts
    <sop-slug>/
      SKILL.md
      checklist.yaml
      references/sop.md
      examples/…             # tuỳ chọn
```

## Quy ước ownership

- Mỗi phòng ban sở hữu folder `agent-skills/<department>/`.
- Slug SOP trùng `content/skills/<slug>.md`.
- Đổi SOP hub → cập nhật `references/sop.md` + `checklist.yaml` trong cùng PR nếu có thể.

## Cài nhanh (ví dụ mẫu)

Published cho CLI (kiểu [agentskill.sh](https://agentskill.sh/)): `skills/<install-id>/`.

```bash
npx skills add truongdinh018/Skills.md -s construction-tech-nghiem-thu-cot-thep -a '*' -g -y
```

Hoặc sao chép từ example trong repo:

```bash
mkdir -p ~/.cursor/skills
cp -R agent-skills/_example/construction-tech/nghiem-thu-cot-thep \
  ~/.cursor/skills/construction-tech-nghiem-thu-cot-thep
# kèm rubric
mkdir -p ~/.cursor/skills/construction-tech-nghiem-thu-cot-thep/references
cp agent-skills/_shared/compliance-rubric.md \
  ~/.cursor/skills/construction-tech-nghiem-thu-cot-thep/references/
```

Hoặc trong project:

```bash
mkdir -p .cursor/skills
cp -R agent-skills/_example/construction-tech/nghiem-thu-cot-thep \
  .cursor/skills/construction-tech-nghiem-thu-cot-thep
```

Claude Code: dùng `.claude/skills/` thay cho `.cursor/skills/`.

Sau khi cài, thử:

- Guide: “Hướng dẫn nghiệm thu cốt thép theo SOP”
- Check: “Kiểm tra hiện trường theo checklist nghiệm thu cốt thép: …”
- Comply: “Chấm tuân thủ SOP nghiệm thu cốt thép với các bằng chứng sau: …”
