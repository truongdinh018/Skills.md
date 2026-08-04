---
title: "Xử lý sự cố production (Incident Response)"
department: "engineering"
summary: "Quy trình ứng phó sự cố có mức độ ưu tiên rõ ràng, giảm thời gian downtime và học hỏi sau sự cố."
tags: ["incident", "vận hành", "on-call"]
difficulty: "Nâng cao"
author: "Phòng Kỹ thuật"
updated: "2026-07-22"
readingTime: "8 phút"
---

## Mục tiêu

Khôi phục dịch vụ **nhanh nhất có thể** và rút ra bài học để không lặp lại.

## Phân loại mức độ (Severity)

| Mức | Ảnh hưởng | Ví dụ |
| --- | --- | --- |
| SEV1 | Toàn bộ hệ thống ngừng | Website down hoàn toàn |
| SEV2 | Tính năng chính lỗi | Không thanh toán được |
| SEV3 | Ảnh hưởng nhỏ | Lỗi hiển thị nhỏ |

## Quy trình 5 bước

1. **Phát hiện** — Nhận alert hoặc báo cáo từ khách hàng.
2. **Điều phối** — Chỉ định một *Incident Commander*.
3. **Giảm thiểu** — Ưu tiên khôi phục dịch vụ (rollback, tắt tính năng...).
4. **Khắc phục** — Sửa triệt để nguyên nhân gốc.
5. **Hậu sự cố** — Viết postmortem **không đổ lỗi** trong 48 giờ.

## Mẫu thông báo nội bộ

```text
[SEV2] Thanh toán gián đoạn
Bắt đầu: 14:05
Ảnh hưởng: ~15% giao dịch thất bại
Đang xử lý: rollback bản deploy 14:00
IC: @ten-nguoi
```

> **Nguyên tắc vàng:** Khôi phục trước, tìm nguyên nhân gốc sau.
