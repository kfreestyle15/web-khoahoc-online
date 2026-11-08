---
phase: 1
title: "Phase 1: Cài đặt và vẽ capybara"
status: completed
priority: P2
effort: "1h"
dependencies: []
---

# Phase 1: Cài đặt và vẽ capybara

## Overview

Người dùng cài VS Code, mở thư mục dự án và tạo file `index.html` đầu tiên. Kết quả là một con capybara pixel mắt lé đứng trên nền trời xanh.

**Khái niệm học được:** file HTML là gì, canvas (tấm vẽ trên trang web), tọa độ x/y, biến, vẽ pixel từ lưới ký tự.

## Requirements

- Có hướng dẫn cài VS Code từng bước cho người chưa biết gì: tải từ `code.visualstudio.com`, kéo vào Applications, File → Open Folder → chọn `game mario`.
- Hướng dẫn tạo file mới tên `index.html` trong VS Code, và cách mở bằng cách bấm đúp file trong Finder.
- Canvas có kích thước logic 320×180, phóng to 3 lần bằng CSS, `imageSmoothingEnabled = false` để pixel sắc nét.
- Phần THÔNG SỐ ở đầu script có `PHONG_TO` và `BANG_MAU` (mỗi ký tự ứng với một màu).
- Capybara vẽ từ lưới ký tự khoảng 16×12 ô, nằm ngang: thân tròn nâu, tai nhỏ, mõm vuông, 4 chân ngắn, **hai con ngươi lệch nhau (mắt lé)**.
- Hàm `vePixel(luoi, x, y)` dùng chung để vẽ mọi hình từ lưới. Các giai đoạn sau dùng lại hàm này, không viết lại.
- Vẽ thêm một dải đất ở dưới đáy.

## Files

- Create: `/Users/truongbaodi/Downloads/CLAUDE APP/game mario/index.html`

## Implementation Steps

1. Viết khung HTML tối thiểu: `<canvas>`, CSS nền tối và căn giữa, `<script>`.
2. Khai báo `BANG_MAU` và lưới `CAPYBARA` (mảng chuỗi ký tự, `.` là trong suốt).
3. Viết `vePixel` lặp qua từng hàng và từng ký tự, mỗi ký tự là một ô 1×1 pixel logic.
4. Tô nền trời, vẽ dải đất, vẽ capybara đứng trên đất.
5. Chú thích tiếng Việt trên từng khối code, giải thích "biến", "mảng", "vòng lặp `for`".

## Todo

- [x] Hướng dẫn cài VS Code và mở thư mục
- [x] Khung HTML + canvas phóng to sắc nét
- [x] Bảng màu và lưới capybara mắt lé
- [x] Hàm `vePixel` dùng chung
- [x] Nền trời, dải đất, capybara
- [x] Gợi ý thử: đổi màu thân trong `BANG_MAU`, đổi chỗ con ngươi

## Success Criteria

- Bấm đúp `index.html` thấy capybara mắt lé, nhận ra được là capybara, pixel sắc nét không mờ.
- Console (Safari: Develop → Show JavaScript Console; Chrome: F12) không có lỗi đỏ.
- Đổi một màu trong `BANG_MAU` rồi lưu và tải lại trang thì capybara đổi màu.

## Verification

- Mở file trong trình duyệt và chụp màn hình để so với mô tả.
- Kiểm tra Console không có lỗi.
