import { defineConfig } from "@playwright/test";

// Chạy thử game trong trình duyệt thật. Server thử nghiệm là Worker chạy cục bộ bằng wrangler dev.
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:8787",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npx wrangler d1 migrations apply DB --local && npx wrangler dev --port 8787",
    url: "http://localhost:8787/api/health",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
