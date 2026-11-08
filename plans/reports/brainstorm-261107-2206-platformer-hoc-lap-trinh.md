---
type: brainstorm
date: 2026-11-07
topic: Game platformer 2D đơn giản để học lập trình
status: accepted
next: ak-plan, sau đó ak-cook
---

# Brainstorm: Game platformer 2D đơn giản để học lập trình

## Tóm tắt

Người dùng chưa từng lập trình và muốn học bằng cách tự làm một game platformer đi ngang có cách chơi giống Mario, chạy trên trình duyệt máy tính. Hướng được chọn là **một file `index.html` viết bằng HTML + JavaScript thuần trên canvas**, xây dựng qua **5 bước nhỏ**, mỗi bước chạy thử được ngay và có chú thích tiếng Việt. Nhân vật và quái là **pixel art 8-bit tự thiết kế**, vẽ từ lưới ký tự ngay trong code, không dùng hình ảnh hay nhân vật của Nintendo.

Thư mục dự án hiện đang trống (đã kiểm tra ngày 2026-11-07), nên đây là dự án làm từ đầu.

## Kết quả mong muốn (Outcome)

Mở `index.html` bằng trình duyệt là chơi được một màn platformer hoàn chỉnh từ đầu tới cờ đích. Người dùng hiểu và tự giải thích được vòng lặp game, trọng lực và va chạm hoạt động ra sao.

## Ràng buộc (Constraints)

- Chỉ một file `index.html`, không thư viện ngoài, không công cụ build, không cần cài đặt để chạy.
- Code ngắn và dễ đọc cho người mới, chú thích bằng tiếng Việt.
- Nhân vật, quái và đồ vật đều tự thiết kế theo phong cách retro 8-bit. Không sao chép tên, hình ảnh, âm thanh hay màn chơi của Mario hoặc Nintendo.
- Nhân vật chính là **một con capybara ngộ nghĩnh mắt lé**: thân tròn màu nâu, mõm vuông, tai nhỏ, hai con ngươi lệch nhau. Khi chạy thì chân nhún nhảy.
- Người dùng chưa biết VS Code là gì. Bước 1 phải có hướng dẫn cài đặt từng bước, và game vẫn phải mở được bằng cách bấm đúp file, không bắt buộc dùng Live Server.
- Chia thành 5 bước, sau mỗi bước game đều chạy được.
- Điều khiển: phím ← → để chạy, Space để nhảy.

## Ngoài phạm vi (Non-goals)

- Chơi trên điện thoại, nút cảm ứng.
- Âm thanh, nhạc nền.
- Nhiều màn chơi, lưu điểm cao.
- Power-up (ví dụ nấm làm nhân vật lớn lên), ống nước, kẻ thù có hành vi phức tạp.
- Framework (Phaser, Godot, Unity) và công cụ build (npm, Vite).

## Tiêu chí hoàn thành (Acceptance criteria)

1. Bấm đúp `index.html` là game chạy trên Chrome hoặc Safari, Console không có lỗi đỏ.
2. Nhân vật pixel chạy bằng ← →, nhảy bằng Space, rơi theo trọng lực và đứng được trên đất cũng như trên bục.
3. Màn chơi dài hơn một màn hình, camera cuộn ngang theo nhân vật.
4. Ăn xu thì điểm tăng. Húc đầu vào khối từ bên dưới thì khối nhả ra xu, và mỗi khối chỉ nhả một lần.
5. Quái đi qua lại. Đạp lên đầu thì quái biến mất, chạm từ bên hông thì chơi lại từ đầu, rơi xuống hố cũng chơi lại.
6. Chạm cờ đích thì hiện chữ "Thắng!".
7. Mỗi bước trong 5 bước có đoạn giải thích ngắn bằng tiếng Việt. Người dùng sửa được ít nhất 3 thông số (tốc độ, độ cao cú nhảy, màu nhân vật) và thấy game thay đổi theo.

## Các phương án đã cân nhắc

### Quyết định 1: Công nghệ

| Phương án | Ưu điểm | Nhược điểm | Phụ thuộc nhất vào giả định | Thất bại đầu tiên khi |
|---|---|---|---|---|
| **A. HTML + JS thuần, canvas, 1 file** *(chọn)* | Không cài gì, nhìn thấy hết mọi dòng code, học được kiến thức nền tảng | Phải tự viết va chạm và camera, khoảng 150–250 dòng | Người dùng chịu đọc giải thích từng bước | Game phình ra nhiều màn và nhiều loại quái, khi đó code tự viết bắt đầu rối |
| B. Phaser 3 qua CDN | Có sẵn vật lý, va chạm, animation, viết ít code hơn | Phải học API của framework; lỗi khó hiểu với người mới; framework làm thay phần quan trọng nhất cần học | Người dùng muốn có sản phẩm nhanh hơn là hiểu sâu | Người dùng không hiểu vì sao nhân vật đứng được trên đất, nên bế tắc khi gặp lỗi |
| C. Godot 4 / Scratch | Có editor trực quan, kéo thả | Phải cài editor (Godot) hoặc không học được JavaScript và web (Scratch) | Người dùng thích công cụ đồ họa hơn viết code | Người dùng muốn chạy trên trình duyệt mà không cần xuất bản |

Chọn **A** vì khớp với cả ba ràng buộc: người mới, chạy trên trình duyệt, nhanh và gọn. Phương án A cũng rẻ nhất nếu phải bỏ giữa chừng. Các khái niệm học được (vòng lặp game, vận tốc, va chạm hình chữ nhật) dùng lại được nguyên vẹn khi chuyển sang Phaser hay Godot.

### Quyết định 2: Cách vẽ nhân vật

| Phương án | Ưu điểm | Nhược điểm |
|---|---|---|
| Khối màu | Đơn giản nhất | Người dùng đã từ chối vì muốn có cảm giác giống Mario hơn |
| **Lưới ký tự trong code, vẽ thành pixel** *(chọn)* | Vẫn chỉ một file, tự sửa hình bằng cách đổi ký tự, có cảm giác 8-bit | Hình đơn giản, kích thước nhỏ (khoảng 12×16 ô) |
| File ảnh PNG sprite sheet | Đẹp hơn | Cần thêm file, cần công cụ vẽ (Aseprite, Piskel); mở trực tiếp bằng `file://` có thể vướng lỗi khi đọc ảnh tùy trình duyệt |

### Quyết định 3: Cách tạo màn chơi

Màn chơi viết bằng **mảng chuỗi ký tự** ngay trong code, ví dụ `'#'` là đất, `'B'` là khối có xu, `'o'` là xu, `'E'` là quái, `'F'` là cờ. Cách này không cần editor và người dùng tự vẽ lại màn chơi bằng cách gõ ký tự. Phương án dùng editor Tiled bị loại vì phải cài thêm công cụ và cần thư viện để đọc file.

## Hướng đề xuất

### Lộ trình 5 bước

| Bước | Người dùng thấy gì | Khái niệm học được |
|---|---|---|
| 1 | Nhân vật pixel đứng trên nền trời | Canvas, tọa độ x/y, vẽ pixel từ lưới ký tự, biến |
| 2 | Bấm ← → thì nhân vật chạy | Sự kiện bàn phím, vòng lặp game `requestAnimationFrame`, hàm |
| 3 | Nhảy, rơi, đứng trên đất và bục | Vận tốc, trọng lực, va chạm hình chữ nhật (AABB), câu lệnh `if` |
| 4 | Màn chơi dài, camera cuộn, xu, khối nhả xu, cờ đích | Mảng, map bằng ký tự, camera |
| 5 | Quái, thắng/thua, chơi lại | Trạng thái game, ghép mọi phần lại với nhau |

### Ghi chú kỹ thuật (dành cho người thực hiện)

- **Bước cập nhật cố định 1/60 giây** (cộng dồn thời gian rồi chạy từng bước). Nếu không, nhân vật sẽ nhảy cao thấp khác nhau trên màn hình 60Hz và 120Hz (MacBook ProMotion là 120Hz).
- **Xử lý va chạm tách theo từng trục**: di chuyển X rồi xử lý va chạm, sau đó mới tới Y. Làm vậy để nhân vật không bị kẹt vào góc tường.
- **Giới hạn tốc độ rơi** nhỏ hơn kích thước một ô mỗi khung hình, để nhân vật không rơi xuyên qua đất.
- **Đặt các thông số ở đầu file** (`TOC_DO`, `LUC_NHAY`, `TRONG_LUC`, bảng màu) để người dùng dễ tìm và sửa thử.
- Dùng `ctx.imageSmoothingEnabled = false` và phóng to theo số nguyên để pixel sắc nét.
- Không dùng class phức tạp hay ECS. Chỉ cần object thường và vài hàm `capNhat` / `ve`.

## Đánh đổi (Trade-offs)

- Phương án A cần viết nhiều code hơn Phaser. Đổi lại, người dùng hiểu được phần cốt lõi, và đó là mục tiêu chính.
- Hình vẽ bằng lưới ký tự sẽ đơn giản. Đổi lại vẫn giữ được một file duy nhất và không cần công cụ vẽ.
- Một file duy nhất sẽ dài khoảng 250–350 dòng ở bước 5. Với game nhỏ thì chấp nhận được. Nếu vượt khoảng 500 dòng thì nên tách thành nhiều file `.js`.
- **Khi nào hướng này không còn đúng:** người dùng muốn nhiều màn, chơi trên điện thoại hoặc phát hành game. Khi đó chuyển sang Phaser. Chi phí chuyển thấp vì khái niệm giữ nguyên; chỉ phải viết lại phần vật lý và vẽ hình theo API mới.

## Phương án tốt hơn

Không có. Hướng đề xuất trùng với hướng người dùng đã chọn. Lý do: người dùng chưa từng code, muốn chạy trên trình duyệt, muốn nhanh và gọn, và thư mục dự án đang trống nên không có code cũ nào ràng buộc.

## Rủi ro

| Rủi ro | Cách giảm |
|---|---|
| Phạm vi phình ra (thêm âm thanh, power-up) trước khi xong bước 5 | Giữ đúng mục Ngoài phạm vi; làm xong bước 5 rồi mới bàn tiếp |
| Bước 3 (va chạm) quá khó với người mới | Giải thích bằng hình vẽ chữ nhật chồng nhau; cho người dùng thử đổi số để thấy kết quả |
| Nhân vật vô tình giống Mario | Đã xử lý: nhân vật chính là capybara, không phải người |
| Người dùng chưa biết VS Code | Bước 1 có hướng dẫn cài VS Code từng bước; Live Server là tùy chọn |
| Capybara 12×16 ô khó nhận ra | Vẽ ngang (capybara dài hơn cao), khoảng 16×12 ô; mắt lé làm bằng 2 ô đen lệch nhau |

## Giao việc cho bước tiếp theo

Bước tiếp theo là `ak-plan` để lập kế hoạch 5 giai đoạn, sau đó `ak-cook` để làm từng giai đoạn.

```text
Objective: Làm game platformer 2D đơn giản trong 1 file index.html (HTML + JavaScript thuần, canvas) cho người chưa từng code, chia 5 bước nhỏ, mỗi bước chạy thử được, chú thích tiếng Việt.
Done means: 7 tiêu chí hoàn thành trong báo cáo này đều đạt.
Out of scope: Mobile, âm thanh, nhiều màn, power-up, framework/công cụ build, mọi hình ảnh hay nhân vật của Nintendo.
Constraints: Chỉ 1 file, không thư viện ngoài; nhân vật pixel tự thiết kế; code ngắn và dễ đọc cho người mới.
Stop and ask only if: một bước buộc phải thêm file hoặc thư viện ngoài.
```

## Câu hỏi còn mở

Không còn. Đã chốt: nhân vật là capybara mắt lé; người dùng chưa có VS Code nên bước 1 kèm hướng dẫn cài đặt.
