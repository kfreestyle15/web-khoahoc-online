# CI/CD: GitHub Actions + Cloudflare Workers + D1

Mỗi lần bạn push code lên nhánh `main`, GitHub tự làm các việc sau:

1. **CI** (`.github/workflows/ci.yml`): chạy kiểm thử tự động. Chạy cả trên pull request.
   - Kiểm thử API + D1 (`npm test`, Vitest chạy trong môi trường Workers thật).
   - Kiểm thử game trên trình duyệt (`npm run test:e2e`, Playwright): game tải được, chạy, nhảy, ăn xu, thua, thắng, chơi lại.
2. **Deploy** (`.github/workflows/deploy.yml`): chỉ chạy khi CI **thành công**.
   - Tạo database D1 `capybara-scores` nếu chưa có (`scripts/ensure-d1.mjs`).
   - Áp dụng cấu trúc bảng (`migrations/`).
   - Đưa game và API lên Cloudflare Workers.

Nếu kiểm thử hỏng thì **không deploy**.

## Cấu trúc

| Đường dẫn | Vai trò |
|---|---|
| `public/index.html` | Game (file tĩnh, Cloudflare phục vụ trực tiếp) |
| `src/index.js` | Worker: API bảng điểm `/api/scores`, `/api/health` |
| `migrations/` | Cấu trúc bảng D1 |
| `wrangler.jsonc` | Cấu hình Worker, file tĩnh và D1 |
| `test/` | Kiểm thử API + D1 |
| `e2e/` | Kiểm thử game trên trình duyệt |
| `scripts/ensure-d1.mjs` | Tìm hoặc tạo database D1 khi deploy |

## Thiết lập một lần (cần làm trước khi deploy chạy được)

### 1. Lấy Account ID

Đăng nhập `dash.cloudflare.com`. Chọn **Workers & Pages**, Account ID nằm ở cột bên phải. Sao chép nó.

### 2. Tạo API Token

1. Vào `dash.cloudflare.com/profile/api-tokens` rồi bấm **Create Token**.
2. Chọn mẫu **Edit Cloudflare Workers**, bấm **Use template**.
3. Trong danh sách quyền, thêm **Account → D1 → Edit** nếu mẫu chưa có.
4. Chọn đúng tài khoản ở **Account Resources**, bấm **Continue to summary** rồi **Create Token**.
5. Sao chép token (chỉ hiện một lần).

### 3. Lưu vào GitHub

Mở `github.com/kfreestyle15/web-khoahoc-online/settings/secrets/actions` rồi bấm **New repository secret**, tạo hai secret:

| Name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | token ở bước 2 |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID ở bước 1 |

Không dán token vào code hay vào chat.

### 4. Tùy chọn: chặn deploy khi chưa duyệt

Workflow deploy dùng environment `production`. Vào **Settings → Environments → production** nếu muốn thêm bước duyệt tay trước khi deploy.

## Chạy thử trên máy

```bash
npm ci
npm test
npx playwright install chromium
npm run test:e2e
npm run dev
```

`npm run dev` mở game tại `http://localhost:8787`. Lần đầu chạy, D1 cục bộ cần có bảng:

```bash
npm run db:migrate:local
```

## API bảng điểm

| Phương thức | Đường dẫn | Việc |
|---|---|---|
| GET | `/api/scores` | 10 điểm cao nhất |
| POST | `/api/scores` | Lưu điểm. Body JSON: `{"name": "Capy", "score": 12}`. Tên 1-12 ký tự, điểm số nguyên 0-9999 |
| GET | `/api/health` | Kiểm tra Worker còn sống |

Game hiện **chưa gọi** API này. API và D1 đã sẵn sàng để nối vào game khi cần.

## Thêm thay đổi cấu trúc bảng

Tạo file mới trong `migrations/`, ví dụ `0002_ten_thay_doi.sql`. Không sửa file đã có. Lần deploy sau sẽ tự áp dụng.

## Sự cố thường gặp

- **Deploy báo thiếu secret**: làm lại bước 3.
- **Deploy báo lỗi quyền D1**: token thiếu quyền **D1 Edit**, làm lại bước 2.
- **Đổi tên database**: sửa `DB_NAME` trong `scripts/ensure-d1.mjs` và `database_name` trong `wrangler.jsonc`.
