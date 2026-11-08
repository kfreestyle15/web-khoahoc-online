---
phase: 5
title: "Phase 5: Quái và thắng/thua"
status: completed
priority: P2
effort: "1h"
dependencies: [4]
---

# Phase 5: Quái và thắng/thua

## Overview

Thêm quái và vòng chơi hoàn chỉnh. Quái là một con bọ hoặc cục slime pixel tự thiết kế, đi qua lại. Đạp lên đầu thì quái chết, chạm hông hay rơi hố thì chơi lại, chạm cờ thì thắng.

**Khái niệm học được:** trạng thái game (đang chơi, thắng, thua), dùng lại hàm (quái dùng chung hàm va chạm với capybara), ghép mọi phần thành một game.

## Requirements

- Quái tự thiết kế, ví dụ slime xanh lá có mắt to. Không giống quái nấm Goomba. Có 2 khung hoạt ảnh.
- Lúc nạp màn, mỗi ký tự `E` tạo một quái. Màn có 4–6 quái.
- Quái đi theo một hướng với `TOC_DO_QUAI` và bị trọng lực kéo. Chạm tường thì quay đầu, sắp tới mép bục cũng quay đầu (không tự rơi xuống hố).
- Quái dùng lại `diChuyenVaVaCham` của giai đoạn 3.
- Va chạm capybara với quái:
  - Capybara đang rơi xuống (`vy > 0`) và đáy capybara ở nửa trên của quái: quái bị bẹp (hiện hình bẹp khoảng 0.3 giây rồi biến mất), capybara nảy lên, `diem += 2`.
  - Trường hợp khác: thua.
- Rơi xuống dưới đáy màn: thua.
- Biến `trangThai` có 3 giá trị: `"choi"`, `"thang"`, `"thua"`.
  - `"thua"`: hiện "Ối! Bấm Enter để chơi lại". Bấm Enter thì `napMan()` lại từ đầu, điểm về 0.
  - Chạm cờ: `"thang"`, hiện "Thắng! Điểm: N" và "Bấm Enter để chơi lại".
- Capybara có hình riêng khi thua (mắt lé thành dấu X) và khi thắng (nhảy mừng).
- Khi không ở trạng thái `"choi"` thì dừng cập nhật vật lý nhưng vẫn vẽ.

## Files

- Modify: `/Users/truongbaodi/Downloads/CLAUDE APP/game mario/index.html`

## Implementation Steps

1. Vẽ lưới pixel cho quái (2 khung đi, 1 khung bẹp).
2. Tạo quái trong `napMan()`, cập nhật đi qua lại, quay đầu ở tường và mép bục.
3. Viết phần va chạm capybara–quái: đạp đầu hoặc thua.
4. Thêm `trangThai`, thua khi rơi hố, thắng khi chạm cờ, chơi lại bằng Enter.
5. Vẽ chữ thông báo ở giữa màn hình, có nền mờ cho dễ đọc.
6. Rà toàn bộ file: chú thích tiếng Việt đầy đủ, thông số gom ở đầu, xóa code thừa.
7. Thêm một khối chú thích ở đầu file: "Thử sửa những con số này", liệt kê các thông số.

## Todo

- [x] Hình pixel quái tự thiết kế
- [x] Quái đi qua lại, quay đầu ở tường và mép bục
- [x] Đạp đầu quái thì quái chết và capybara nảy lên
- [x] Chạm hông quái hoặc rơi hố thì thua
- [x] Chạm cờ thì thắng
- [x] Bấm Enter để chơi lại
- [x] Rà lại chú thích và thông số

## Success Criteria

- Toàn bộ 7 tiêu chí trong [plan.md](./plan.md) đều đạt.
- Đạp quái thì quái bẹp rồi biến mất, capybara nảy lên.
- Đi ngang vào quái thì hiện màn thua; bấm Enter thì chơi lại từ đầu với đủ xu, khối và quái.
- Quái không tự rơi xuống hố.
- Chơi từ đầu tới cờ thì hiện màn thắng kèm điểm.
- Console không có lỗi suốt một lượt chơi đầy đủ.

## Verification

- Chơi trọn một lượt thắng và một lượt thua, mỗi lượt bấm Enter chơi lại ít nhất một lần.
- Thử trên cả Safari và Chrome.
- Người dùng tự sửa 3 thông số (`TOC_DO_CHAY`, `LUC_NHAY`, một màu của capybara) và thấy game đổi theo.
