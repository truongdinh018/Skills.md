---
name: dept-sop-slug
description: >-
  SOP phòng ban [TÊN PHÒNG] — [TÊN QUY TRÌNH]. Dùng khi người dùng muốn
  (1) hướng dẫn làm theo SOP / walkthrough từng bước (guide),
  (2) kiểm tra / review công việc đối chiếu checklist (check),
  hoặc (3) chấm tuân thủ / audit / giám sát compliance (comply).
  Trigger tiếng Việt: "hướng dẫn SOP", "làm theo quy trình", "kiểm tra theo SOP",
  "review checklist", "chấm tuân thủ", "audit", "có đạt hold point không".
---

# [Tên SOP] — Agent Skill (guide / check / comply)

Bạn đang thực thi SOP chuẩn của phòng ban. **Không bỏ qua mục `must`.**
Thiếu bằng chứng ở hold point → kết luận `NON_COMPLIANT` (xem rubric dùng chung).

## Files trong package

- `references/sop.md` — nội dung SOP đầy đủ (đồng bộ với hub `content/skills/`)
- `checklist.yaml` — checklist máy đọc được cho mode check/comply
- `examples/pass.md` / `examples/fail.md` — mẫu kết quả
- Rubric chung: `agent-skills/_shared/compliance-rubric.md` (khi cài nguyên repo)
  hoặc copy rubric vào `references/compliance-rubric.md` nếu phân phối skill đơn lẻ

## Chọn mode

Đọc yêu cầu người dùng rồi chọn **một** mode:

| Mode | Khi nào | Hành vi |
|------|---------|---------|
| **guide** | "hướng dẫn", "làm theo", "bước tiếp theo", walkthrough | Dẫn từng bước |
| **check** | "kiểm tra", "review", "đối chiếu checklist" | Pass/fail từng mục |
| **comply** | "tuân thủ", "audit", "chấm", "giám sát", "compliance" | Báo cáo theo rubric |

Nếu không rõ mode → hỏi một câu ngắn rồi mới tiếp tục.

Đọc `references/sop.md` và `checklist.yaml` trước khi trả lời.

---

## Mode: guide

1. Xác nhận ngữ cảnh: ai đang làm, công đoạn hiện tại, đã có bằng chứng gì.
2. Dẫn **một bước / một lần trả lời** (không dump cả SOP).
3. Mỗi bước: hành động cụ thể + kết quả mong đợi + cảnh báo nếu có.
4. Trước **hold point**: dừng, yêu cầu xác nhận + bằng chứng bắt buộc, chỉ cho sang bước sau khi đủ.
5. Kết thúc: tóm tắt đã xong / còn lại / hold point chưa mở.

---

## Mode: check

1. Thu thập đầu vào: mô tả hiện trạng, ảnh, biên bản, checklist đã tick, hoặc trả lời Q&A.
2. Duyệt từng item trong `checklist.yaml`:
   - `must` → Pass / Fail / Insufficient evidence
   - `should` → Pass / Fail / N/A (không chặn riêng)
3. Không đánh Pass mục `must` nếu thiếu evidence khi `evidence` được khai báo.
4. Output bảng:

```markdown
## Kết quả kiểm tra — [Tên SOP]
| ID | Mục | Severity | Kết quả | Ghi chú / bằng chứng |
|----|-----|----------|---------|----------------------|
| CHK-… | … | must | Pass/Fail/Insufficient | … |

**Hold points:** mở / chưa mở
**Tóm tắt:** …
**Hành động tiếp:** …
```

---

## Mode: comply

1. Thực hiện toàn bộ bước của mode **check**.
2. Áp dụng `compliance-rubric.md`:
   - Thiếu evidence hold point → `NON_COMPLIANT` hoặc `INSUFFICIENT_EVIDENCE`
   - Mọi `must` đạt + hold point mở → có thể `COMPLIANT`
   - Một phần `must` fail → `NON_COMPLIANT` (hoặc `PARTIAL` chỉ khi rubric cho phép)
3. Output báo cáo chuẩn:

```markdown
## Báo cáo tuân thủ — [Tên SOP]
- **Verdict:** COMPLIANT | PARTIAL | NON_COMPLIANT | INSUFFICIENT_EVIDENCE
- **Department / SOP:** …
- **Auditor (AI):** …
- **Thời điểm:** …

### Findings
| ID | Severity | Finding | Evidence gap | Action |
|----|----------|---------|--------------|--------|
| … | blocker/major/minor | … | … | … |

### Hold points
| ID | Status | Evidence |
|----|--------|----------|
| … | open/blocked | … |

### Kết luận & khuyến nghị
…
```

4. Không kết luận `COMPLIANT` nếu còn `must` Fail hoặc hold point chưa mở.

---

## Quy tắc cứng (mọi mode)

- Nguồn sự thật: `references/sop.md` + `checklist.yaml` — không bịa tiêu chí ngoài file.
- Tiếng Việt khi người dùng dùng tiếng Việt (trừ khi họ yêu cầu ngôn ngữ khác).
- Phân biệt rõ ràng buộc (`must`) và khuyến nghị (`should`).
- Khi thiếu dữ liệu: hỏi hoặc đánh `Insufficient` — không đoán Pass.
