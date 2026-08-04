---
title: "Nguyên tắc sử dụng Design System"
department: "product"
summary: "Hướng dẫn dùng design system nhất quán: token, component và khi nào được tạo ngoại lệ."
tags: ["design system", "ui", "nhất quán"]
difficulty: "Trung bình"
author: "Phòng Sản phẩm"
updated: "2026-07-12"
readingTime: "6 phút"
---

## Mục tiêu

Giữ giao diện **nhất quán** và tăng tốc độ phát triển bằng cách tái sử dụng thành phần chung.

## Nguyên tắc cốt lõi

1. **Ưu tiên component có sẵn** trước khi tạo mới.
2. **Dùng design token** (màu, khoảng cách, bo góc) thay vì giá trị cứng.
3. **Nhất quán hơn hoàn hảo** — tuân thủ hệ thống kể cả khi có ý tưởng riêng.

## Khi nào được tạo ngoại lệ

- Có nhu cầu thực sự chưa được hệ thống hỗ trợ.
- Đã trao đổi với người phụ trách design system.
- Ghi lại lý do để cân nhắc đưa vào hệ thống sau này.

## Checklist trước khi merge UI

- [ ] Dùng token thay cho màu/spacing cứng
- [ ] Tái sử dụng component chung khi có thể
- [ ] Kiểm tra trạng thái: hover, focus, disabled
- [ ] Kiểm tra khả năng tiếp cận (contrast, aria-label)

> **Mẹo:** Mỗi ngoại lệ không ghi lại hôm nay là một khoản "nợ thiết kế" phải trả trong tương lai.
