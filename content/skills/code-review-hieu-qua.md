---
title: "Review code hiệu quả"
department: "engineering"
summary: "Nguyên tắc và checklist để review pull request nhanh, chất lượng và tôn trọng đồng đội."
tags: ["code review", "chất lượng", "pull request"]
difficulty: "Trung bình"
author: "Phòng Kỹ thuật"
updated: "2026-07-30"
readingTime: "7 phút"
featured: true
---

## Mục tiêu

Đảm bảo mọi thay đổi code được kiểm tra về **tính đúng đắn, khả năng bảo trì và bảo mật** trước khi merge.

## Nguyên tắc

1. Review **nhỏ và thường xuyên** hơn là dồn một PR khổng lồ.
2. Bình luận về **code, không về con người**.
3. Phân biệt rõ *bắt buộc sửa* và *góp ý tuỳ chọn* (dùng tiền tố `nit:`).

## Checklist khi review

- [ ] Thay đổi có giải quyết đúng vấn đề mô tả trong PR không?
- [ ] Có test bao phủ phần logic mới không?
- [ ] Có xử lý các trường hợp biên (null, rỗng, lỗi mạng)?
- [ ] Đặt tên biến/hàm rõ nghĩa?
- [ ] Không lộ secret/API key?

## Ví dụ bình luận tốt

```text
nit: Có thể tách hàm này thành helper để tái sử dụng.
blocker: Query này thiếu index -> có nguy cơ full scan trên bảng lớn.
```

## SLA đề xuất

| Loại PR | Thời gian phản hồi |
| --- | --- |
| Hotfix | < 1 giờ |
| Thường | < 1 ngày làm việc |

> **Lưu ý:** Nếu tranh luận quá 2 vòng bình luận, hãy chuyển sang trao đổi trực tiếp.
