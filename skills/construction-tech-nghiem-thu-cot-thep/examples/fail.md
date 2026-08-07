# Ví dụ FAIL — nghiệm thu cốt thép

## Bối cảnh

- Hạng mục: Cột C1 tầng 2
- Hiện trạng: cốt thép nhìn ổn trên ảnh; **chưa có biên bản ký**; đội thi công muốn đổ trong giờ tới

## Kết quả kiểm tra (rút gọn)

| ID | Mục | Severity | Kết quả | Ghi chú |
|----|-----|----------|---------|---------|
| CHK-REBAR-01 … | Cốt thép | must | Pass / Insufficient | Tùy ảnh đủ hay không |
| CHK-PROC-03 | Biên bản ký trước khi đổ | must | Insufficient / Fail | Không có biên bản |

**Hold points:** HP-01 **blocked**  
**Verdict comply:** `NON_COMPLIANT` (nếu đã/đang đổ) hoặc `INSUFFICIENT_EVIDENCE` (nếu chưa đổ, chỉ thiếu biên bản)  
**Cho phép đổ bê tông:** không

## Hành động bắt buộc

1. Dừng đổ bê tông.
2. Hoàn tất kiểm tra hiện trường + ký biên bản.
3. Chạy lại mode check/comply trước khi đổ.
