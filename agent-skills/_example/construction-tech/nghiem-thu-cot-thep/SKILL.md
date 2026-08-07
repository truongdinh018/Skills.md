---
name: construction-tech-nghiem-thu-cot-thep
description: >-
  SOP Kỹ thuật thi công — Nghiệm thu cốt thép trước khi đổ bê tông (hold point).
  Dùng khi người dùng muốn (1) hướng dẫn làm theo SOP / walkthrough từng bước (guide),
  (2) kiểm tra / review hiện trường đối chiếu checklist (check),
  hoặc (3) chấm tuân thủ / audit / giám sát compliance trước khi đổ (comply).
  Trigger: "nghiệm thu cốt thép", "kiểm tra cốt thép trước đổ", "hold point bê tông",
  "hướng dẫn nghiệm thu cốt thép", "chấm tuân thủ nghiệm thu cốt thép".
---

# Nghiệm thu cốt thép trước khi đổ bê tông — Agent Skill

Bạn đang thực thi SOP chuẩn phòng **Kỹ thuật thi công**. **Không bỏ qua mục `must`.**
Thiếu biên bản ký ở hold point → `NON_COMPLIANT`.

## Files

- `references/sop.md` — SOP đầy đủ
- `checklist.yaml` — checklist máy đọc
- `examples/pass.md` / `examples/fail.md`
- Rubric: `references/compliance-rubric.md` (copy từ `agent-skills/_shared/`) hoặc
  `../../_shared/compliance-rubric.md` khi làm việc trong repo này

## Chọn mode

| Mode | Trigger | Hành vi |
|------|---------|---------|
| **guide** | hướng dẫn, làm theo, bước tiếp | Dẫn từng bước; dừng trước khi đổ |
| **check** | kiểm tra, review checklist | Pass/fail từng mục `checklist.yaml` |
| **comply** | tuân thủ, audit, chấm | Báo cáo theo compliance rubric |

Đọc `references/sop.md` và `checklist.yaml` trước khi trả lời.

---

## Mode: guide

1. Xác nhận: hạng mục / vị trí đổ, bản vẽ hiệu lực, đã tự kiểm chưa, ai tham gia nghiệm thu.
2. Một bước mỗi lần trả lời.
3. Thứ tự gợi ý: kiểm cốt thép → kiểm cốp pha & chi tiết chờ → mời nghiệm thu → ký biên bản → **chỉ sau đó** cho phép đổ.
4. Trước hold point “ký biên bản”: yêu cầu xác nhận biên bản đã ký; **không** hướng dẫn đổ nếu chưa có.
5. Nhắc cảnh báo SOP: tuyệt đối không đổ khi chưa có biên bản ký duyệt.

---

## Mode: check

1. Nhận mô tả hiện trường / ảnh / biên bản / checklist đã tick.
2. Duyệt từng item trong `checklist.yaml` (`must` / `should`).
3. Không Pass mục có `evidence` bắt buộc nếu thiếu bằng chứng.
4. Output bảng ID / Mục / Severity / Kết quả / Ghi chú; nêu hold point mở hay chưa.

---

## Mode: comply

1. Chạy toàn bộ logic **check**.
2. Áp dụng compliance rubric:
   - Chưa có biên bản ký mà đã / sắp đổ → `NON_COMPLIANT`
   - Thiếu ảnh/bằng chứng quan sát cho `must` → `INSUFFICIENT_EVIDENCE` hoặc Fail mục đó
   - Mọi `must` Pass + HP-01 mở → `COMPLIANT`
3. Báo cáo đủ Verdict, Findings, Hold points, Kết luận.

---

## Quy tắc cứng

- Nguồn sự thật: `references/sop.md` + `checklist.yaml`.
- Hold point HP-01 (biên bản ký) chặn mọi kết luận cho phép đổ.
- Tiếng Việt mặc định với người dùng Việt.
