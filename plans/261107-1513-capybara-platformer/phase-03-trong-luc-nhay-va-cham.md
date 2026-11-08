---
phase: 3
title: "Phase 3: Trọng lực, nhảy và va chạm"
status: completed
priority: P1
effort: "1h15m"
dependencies: [2]
---

# Phase 3: Trọng lực, nhảy và va chạm

## Overview

Đây là giai đoạn khó và quan trọng nhất. Capybara bị trọng lực kéo xuống, bấm Space thì nhảy, đứng được trên đất và trên bục, và bị tường chặn lại. Xong giai đoạn này là xong khoảng 60% độ khó của cả game.

**Khái niệm học được:** vận tốc, trọng lực, câu lệnh `if`, va chạm hai hình chữ nhật (AABB), lưới ô (tile).

## Requirements

- Màn chơi tạm thời bằng một mảng chuỗi ký tự ngắn, vừa một màn hình: `#` là đất hoặc bục, `.` là trống. Mỗi ô 16×16 pixel logic.
- Hàm `laO(cot, hang)` trả về ô đó có phải ô rắn không. Ngoài mép trái và phải tính là rắn; dưới đáy tính là trống (để giai đoạn 5 có hố).
- Thông số mới: `TRONG_LUC`, `LUC_NHAY`, `TOC_DO_ROI_TOI_DA` (nhỏ hơn 16 để không rơi xuyên đất).
- Thêm `vy` và `dangDungDat` cho `capy`. Hộp va chạm của capybara nhỏ hơn hình vẽ một chút cho cảm giác công bằng.
- **Xử lý va chạm tách theo từng trục**: dời theo X, kiểm tra các ô chồng lên rồi đẩy ra; sau đó mới làm tương tự với Y. Khi đẩy ra theo Y từ phía dưới lên thì `dangDungDat = true` và `vy = 0`.
- Nhảy chỉ khi đang đứng đất. Thả Space sớm thì cú nhảy thấp hơn (giữ lâu thì nhảy cao).
- Thêm hình nhảy riêng cho capybara (chân duỗi ra).

## Files

- Modify: `/Users/truongbaodi/Downloads/CLAUDE APP/game mario/index.html`

## Implementation Steps

1. Thêm phần MÀN CHƠI với mảng ký tự và hàm `laO`.
2. Vẽ các ô `#` bằng hình pixel khối đất (lưới ký tự 16×16 có viền cỏ).
3. Viết `diChuyenVaVaCham(vatThe)` theo hai trục. Viết thành hàm dùng chung vì giai đoạn 5 sẽ dùng lại cho quái.
4. Thêm trọng lực, nhảy, nhảy thấp khi thả nút sớm.
5. Đổi hình theo trạng thái: đứng, chạy, nhảy.
6. Giải thích va chạm bằng hình hai hình chữ nhật chồng nhau, vẽ bằng ký tự trong chú thích.

## Todo

- [x] Map tạm bằng mảng ký tự, vẽ ô đất
- [x] Trọng lực và giới hạn tốc độ rơi
- [x] Va chạm tách trục X rồi Y, dùng chung cho mọi vật
- [x] Nhảy, nhảy cao/thấp theo độ dài giữ nút
- [x] Hình capybara lúc nhảy
- [x] Gợi ý thử: đổi `TRONG_LUC` và `LUC_NHAY`

## Success Criteria

- Capybara đứng yên trên đất, không rung và không lún.
- Nhảy lên được bục cao 3 ô; đụng đầu vào trần thì rơi xuống ngay.
- Chạy vào tường thì dừng, không xuyên qua, không bị kẹt khi trượt dọc tường.
- Không nhảy được khi đang ở trên không.
- Giữ Space nhảy cao hơn rõ rệt so với bấm nhanh.
- Console không có lỗi.

## Verification

- Chơi thử các trường hợp: nhảy lên bục, nhảy vào góc tường, đi ra khỏi mép bục.
- Đổi `TRONG_LUC` nhỏ đi một nửa và thấy cú nhảy bay bổng hơn.
