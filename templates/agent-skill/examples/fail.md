# Ví dụ FAIL / NON_COMPLIANT (minh họa format — thay bằng case thật)

## Bối cảnh

- Người thực hiện: [vai trò]
- Công đoạn: [tên]
- Bằng chứng: thiếu biên bản ký / ảnh không đủ

## Kết quả kiểm tra (rút gọn)

| ID | Mục | Severity | Kết quả | Ghi chú |
|----|-----|----------|---------|---------|
| CHK-01 | […] | must | Pass | Ổn |
| CHK-02 | […] | must | Insufficient | Chưa có biên bản ký |

**Hold points:** chưa mở (blocked)  
**Verdict comply:** `NON_COMPLIANT` (hoặc `INSUFFICIENT_EVIDENCE` nếu chỉ thiếu bằng chứng, chưa chứng minh sai)

## Hành động bắt buộc

1. Dừng bước tiếp theo đến khi hold point mở.
2. Bổ sung bằng chứng / gọi người phê duyệt.
3. Chạy lại mode **check** hoặc **comply**.
