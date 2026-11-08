---
phase: 2
title: "Phase 2: Di chuyển bằng bàn phím"
status: completed
priority: P2
effort: "45m"
dependencies: [1]
---

# Phase 2: Di chuyển bằng bàn phím

## Overview

Thêm vòng lặp game và điều khiển bàn phím. Bấm ← → thì capybara chạy, quay mặt theo hướng chạy và chân nhún khi di chuyển.

**Khái niệm học được:** vòng lặp game (cuốn sách lật hình), sự kiện bàn phím, hàm, object.

## Requirements

- Object `phim` lưu phím nào đang giữ, cập nhật qua `keydown` và `keyup`. Chặn mũi tên và Space cuộn trang.
- Object `capy` gồm `x`, `y`, `vx`, `huong`.
- **Bước cập nhật cố định 1/60 giây**: dùng `requestAnimationFrame`, cộng dồn thời gian thực, chạy `capNhat()` từng bước 1/60 giây, rồi gọi `ve()`. Giới hạn số bước tối đa mỗi khung hình để không đứng hình khi chuyển tab.
- Thông số mới ở đầu file: `TOC_DO_CHAY`.
- Quay mặt: vẽ lật ngang hình khi `huong = -1` (thêm tham số `lat` cho `vePixel`).
- Hoạt ảnh chạy: thêm một lưới thứ hai cho chân ở tư thế khác, đổi qua lại vài khung hình một lần khi đang chạy.
- Không cho capybara chạy ra khỏi mép trái.

## Files

- Modify: `/Users/truongbaodi/Downloads/CLAUDE APP/game mario/index.html`

## Implementation Steps

1. Thêm phần BÀN PHÍM với `phim` và hai sự kiện.
2. Chuyển phần vẽ của giai đoạn 1 vào hàm `ve()`.
3. Viết `capNhat()`: đặt `vx` theo phím, cộng vào `x`, cập nhật `huong` và bộ đếm hoạt ảnh.
4. Viết vòng lặp có bước cố định.
5. Thêm lưới chân thứ hai và cách lật hình.
6. Giải thích vòng lặp game bằng ví dụ cuốn sách lật hình.

## Todo

- [x] Đọc bàn phím
- [x] Vòng lặp game bước cố định 1/60 giây
- [x] Chạy trái/phải, quay mặt
- [x] Hoạt ảnh chân nhún
- [x] Gợi ý thử: đổi `TOC_DO_CHAY`

## Success Criteria

- Giữ → thì capybara chạy sang phải, giữ ← thì quay mặt và chạy sang trái, thả phím thì dừng.
- Chân nhún khi chạy, đứng yên thì không nhún.
- Tốc độ chạy như nhau trên màn 60Hz và 120Hz.
- Bấm mũi tên không làm trang web cuộn.
- Console không có lỗi.

## Verification

- Chơi thử trong trình duyệt bằng bàn phím.
- Đổi `TOC_DO_CHAY` gấp đôi và thấy capybara chạy nhanh gấp đôi.
