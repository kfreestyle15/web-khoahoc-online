---
title: Hoàn thành game Capybara mắt lé
date: 2026-11-07
summary: Đã làm xong index.html gồm cả 5 giai đoạn và kiểm thử bằng mô phỏng trong trình duyệt
---

# Hoàn thành game Capybara mắt lé

## What happened
Đã viết `index.html`, một file JavaScript thuần trên canvas 320x176, gồm cả 5 giai đoạn của kế hoạch `plans/261107-1513-capybara-platformer`. Bản đồ dài 112 cột, có 23 xu, 5 khối xu, 5 slime, 3 hố và cờ đích.

## Verification
Kiểm thử bằng cách gọi trực tiếp `capNhat()` trong trình duyệt của app (Chromium):
- Cú nhảy cao nhất 51.5 điểm (bục cần 48), cú nhảy ngắn 12 điểm.
- Va vào tường dừng đúng tại x = 532.
- Mỗi khối xu chỉ nhả một lần.
- Đạp slime thì slime bẹp rồi biến mất; chạm ngang thì thua; rơi hố thì thua.
- Chạm cờ thì thắng; bấm Enter thì nạp lại màn đầy đủ.
- Slime trên bục không rơi khỏi mép.
- Console không có lỗi.

## Decision
- Dùng "con dấu" (canvas vẽ sẵn mỗi hình) thay vì fillRect từng điểm mỗi khung hình, để game chạy mượt.
- Thu canvas từ 180 xuống 176 để không lộ dải trời bên dưới mặt đất.

## Next steps
Chưa kiểm thử trên Safari, và chưa có người chơi thật bằng bàn phím từ đầu tới cờ. Người dùng tự sửa 3 thông số để hoàn tất mục tiêu học.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
