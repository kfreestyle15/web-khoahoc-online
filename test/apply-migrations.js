import { env, applyD1Migrations } from "cloudflare:test";

// Chạy trước mỗi file test: tạo bảng scores trong D1 thử nghiệm
await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);
