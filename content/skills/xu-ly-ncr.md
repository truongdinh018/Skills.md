---
title: "Xử lý phiếu không phù hợp (NCR)"
department: "qaqc"
summary: "Quy trình phát hành và đóng phiếu Non-Conformance Report khi phát hiện công việc không đạt yêu cầu chất lượng."
tags: ["ncr", "không phù hợp", "chất lượng"]
difficulty: "Trung bình"
author: "Phòng QA/QC"
updated: "2026-07-29"
readingTime: "5 phút"
---

## Mục tiêu

Xử lý **có hệ thống** các sản phẩm/công tác không đạt, đảm bảo được khắc phục và ngăn tái diễn.

## Quy trình NCR

1. **Phát hiện & ghi nhận** — mô tả sai khác so với tiêu chuẩn, kèm ảnh/vị trí.
2. **Phân loại phương án xử lý:**
   - Sửa chữa (rework) về đúng thiết kế
   - Sửa để dùng được (repair) — cần tính toán/duyệt
   - Chấp nhận có điều kiện (use-as-is) — phải được duyệt
   - Loại bỏ (reject)
3. **Phê duyệt phương án** — tư vấn thiết kế / chủ đầu tư khi cần.
4. **Thực hiện khắc phục** và kiểm tra lại.
5. **Hành động phòng ngừa** — tránh lặp lại.
6. **Đóng NCR** — ký xác nhận đã đạt.

## Nội dung tối thiểu của phiếu

- [ ] Mã NCR, ngày, vị trí, hạng mục
- [ ] Mô tả không phù hợp + tiêu chuẩn vi phạm
- [ ] Phương án xử lý và người duyệt
- [ ] Bằng chứng khắc phục (ảnh, kết quả thí nghiệm)

> **Lưu ý:** NCR không phải để "bắt lỗi" cá nhân, mà để kiểm soát chất lượng và cải tiến. Ghi nhận trung thực giúp toàn dự án tốt hơn.
