---
phase: 4
title: "Phase 4: Màn chơi, camera, xu và cờ"
status: completed
priority: P2
effort: "1h"
dependencies: [3]
---

# Phase 4: Màn chơi, camera, xu và cờ

## Overview

Biến màn tạm thành một màn chơi thật, dài khoảng 6–8 lần chiều rộng màn hình. Camera cuộn theo capybara. Có xu để ăn, khối húc ra xu, hố để nhảy qua và cờ đích.

**Khái niệm học được:** mảng và cách duyệt mảng, map viết bằng ký tự, camera (dời góc nhìn), đếm điểm.

## Requirements

- Màn chơi mới bằng mảng ký tự, khoảng 120 cột × 11 hàng, với các ký tự:
  - `#` đất hoặc bục, `B` khối có xu, `b` khối đã húc (rắn, đổi màu), `o` xu, `F` cờ đích, `E` vị trí quái (giai đoạn 5 mới dùng), `.` trống.
- Có ít nhất 2 hố, vài bục ở các độ cao, khoảng 15 xu, 3 khối `B`. Dễ cho người mới, không cần nhảy quá chính xác.
- Lúc nạp màn, đọc map để tạo danh sách `xu` và vị trí cờ.
- Camera: `cameraX` bám theo capybara (giữ capybara hơi lệch trái), không vượt mép trái và mép phải map. Chỉ vẽ các ô nằm trong khung nhìn.
- Ăn xu: chồng hộp với xu thì xóa xu đó và `diem += 1`.
- Húc khối: khi đẩy capybara ra theo trục Y từ phía trên đầu (đang đi lên) và ô đó là `B` thì đổi thành `b`, cộng điểm, và cho một đồng xu bật lên rồi biến mất.
- Cờ đích là hình pixel tự vẽ: cột và lá cờ có hình mặt capybara nhỏ.
- Hiện "Điểm: N" ở góc trên trái, không bị cuộn theo camera.
- Nền có vài đám mây pixel cuộn chậm hơn (parallax 0.5) để thấy rõ cảm giác đang chạy.

## Files

- Modify: `/Users/truongbaodi/Downloads/CLAUDE APP/game mario/index.html`

## Implementation Steps

1. Thay map tạm bằng map dài. Thêm hình pixel cho `B`, `b`, xu, cờ, mây.
2. Viết `napMan()` để đọc map, tạo danh sách xu, tìm vị trí xuất phát và cờ.
3. Thêm camera và chỉ vẽ phần đang nhìn thấy.
4. Nhận biết ăn xu và húc khối; thêm hiệu ứng xu bật lên.
5. Vẽ điểm và mây.
6. Giải thích camera: "thế giới đứng yên, chỉ khung nhìn dời đi".

## Todo

- [x] Map dài có hố, bục, xu, khối, cờ
- [x] `napMan()` đọc map
- [x] Camera cuộn ngang có giới hạn
- [x] Ăn xu và tính điểm
- [x] Húc khối ra xu, mỗi khối một lần
- [x] Cờ đích, mây parallax, hiện điểm
- [x] Gợi ý thử: tự vẽ thêm một bục bằng cách sửa ký tự trong map

## Success Criteria

- Chạy từ đầu tới cuối màn, camera cuộn mượt và không lộ vùng ngoài map.
- Ăn xu thì xu biến mất và điểm tăng 1.
- Húc khối `B` từ dưới lên thì có xu bật ra và điểm tăng; húc lần hai không ra thêm.
- Rơi xuống hố thì capybara rơi khỏi màn hình (giai đoạn 5 sẽ xử lý chơi lại).
- Cờ hiện ở cuối màn.
- Console không có lỗi.

## Verification

- Chơi hết màn, đếm điểm khớp với số xu đã ăn và số khối đã húc.
- Sửa một ký tự trong map, tải lại trang và thấy màn thay đổi đúng chỗ.
