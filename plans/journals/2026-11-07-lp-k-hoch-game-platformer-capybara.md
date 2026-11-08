---
title: Lập kế hoạch game platformer Capybara
date: 2026-11-07
summary: Kế hoạch 5 giai đoạn cho game platformer một file JavaScript thuần dành cho người mới học
---

# Lập kế hoạch game platformer Capybara

## What happened
Người dùng chưa từng lập trình muốn làm game platformer kiểu Mario để học. Đã tư vấn, brainstorm và lập kế hoạch tại `plans/261107-1513-capybara-platformer/`.

## Decision
- Một file `index.html`, JavaScript thuần trên canvas, không thư viện và không công cụ build. Đã loại Phaser và Godot vì người mới cần hiểu vòng lặp game, trọng lực và va chạm.
- Nhân vật chính là capybara pixel mắt lé tự thiết kế, vẽ từ lưới ký tự. Người dùng từng muốn nhân vật giống Mario; đã từ chối sao chép tài sản của Nintendo.
- Bước cập nhật cố định 1/60 giây và va chạm tách theo từng trục, để cú nhảy như nhau trên màn 60Hz và 120Hz.

## Next steps
Chạy `/ak-cook plans/261107-1513-capybara-platformer/plan.md`, bắt đầu từ giai đoạn 1 (cài VS Code, vẽ capybara).

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
