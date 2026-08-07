# Compliance rubric (dùng chung mọi phòng ban)

Áp dụng cho **mode comply** của mọi Agent Skill SOP. Mode **check** chỉ báo Pass/Fail từng mục; mode **comply** phải gán **Verdict** theo bảng dưới.

## Verdict

| Verdict | Điều kiện |
|---------|-----------|
| `COMPLIANT` | Mọi mục `must` = Pass; mọi hold point **mở**; evidence bắt buộc có đủ |
| `PARTIAL` | Không còn `must` = Fail ở mức blocker; còn ≥1 `must` major Fail **hoặc** ≥1 `should` Fail quan trọng; hold point liên quan blocker vẫn phải mở |
| `NON_COMPLIANT` | ≥1 mục `must` = Fail; **hoặc** hold point bị bỏ qua / làm tiếp khi chưa mở |
| `INSUFFICIENT_EVIDENCE` | Không đủ bằng chứng để kết luận Pass/Fail cho ≥1 mục `must` hoặc hold point (chưa chứng minh vi phạm, cũng chưa chứng minh đạt) |

### Quy tắc ưu tiên

1. Hold point chưa mở mà công việc đã đi tiếp → luôn `NON_COMPLIANT` (không dùng `PARTIAL`).
2. Chỉ thiếu bằng chứng, chưa có bằng chứng trái SOP → ưu tiên `INSUFFICIENT_EVIDENCE` hơn `NON_COMPLIANT`.
3. Mọi `must` Pass + hold point mở → `COMPLIANT` dù còn `should` Fail (ghi `should` vào findings mức `minor`).
4. Không kết luận `COMPLIANT` khi còn mục `must` ở trạng thái Insufficient.

## Severity (finding)

| Severity | Khi nào gắn |
|----------|-------------|
| `blocker` | Hold point; an toàn / pháp lý / chất lượng không thể bỏ qua; `must` gắn `hold_point: true` |
| `major` | `must` thường; sai lệch ảnh hưởng nghiệm thu / thanh toán / bàn giao |
| `minor` | `should`; cải tiến; ghi chú hình thức không chặn |

Map mặc định từ `checklist.yaml`:

- `severity: must` + `hold_point: true` → finding `blocker` nếu Fail/Insufficient
- `severity: must` → `major`
- `severity: should` → `minor`

## Format báo cáo bắt buộc

```markdown
## Báo cáo tuân thủ — [Tên SOP]
- **Verdict:** COMPLIANT | PARTIAL | NON_COMPLIANT | INSUFFICIENT_EVIDENCE
- **Department / SOP:** [dept] / [slug]
- **Nguồn:** checklist.yaml@version + references/sop.md
- **Thời điểm:** [ISO date hoặc local]

### Findings
| ID | Severity | Finding | Evidence gap | Action |
|----|----------|---------|--------------|--------|
| CHK-… | blocker/major/minor | … | … | … |

### Hold points
| ID | Status | Evidence |
|----|--------|----------|
| HP-… | open/blocked | … |

### Kết luận & khuyến nghị
[1–5 gạch đầu dòng hành động cụ thể, có owner gợi ý]
```

## Ngôn ngữ với người dùng

- Nêu rõ Verdict ngay đầu báo cáo.
- Phân biệt **bắt buộc sửa** (`blocker`/`major`) và **nên cải thiện** (`minor`).
- Không “làm mềm” `NON_COMPLIANT` thành đạt yêu cầu.
