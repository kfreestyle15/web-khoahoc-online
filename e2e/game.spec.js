import { test, expect } from "@playwright/test";

// Các hàm và biến của game (capNhat, capy, trangThai...) nằm trong script thường nên truy cập được từ trang.

test.beforeEach(async ({ page }) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.errors = errors;
  await page.goto("/");
  await page.waitForFunction(() => typeof capy !== "undefined" && typeof capNhat === "function");
});

test.afterEach(async ({ page }) => {
  expect(page.errors, "Console không được có lỗi").toEqual([]);
});

test("trang tải được và có canvas game", async ({ page }) => {
  await expect(page).toHaveTitle("Capybara Mắt Lé");
  await expect(page.locator("canvas#game")).toBeVisible();
});

test("vòng lặp game đang chạy và canvas được vẽ", async ({ page }) => {
  const before = await page.evaluate(() => demKhungHinh);
  await page.waitForTimeout(300);
  const after = await page.evaluate(() => demKhungHinh);
  expect(after).toBeGreaterThan(before);

  // Có pixel không phải màu nền trời trong canvas (game thực sự vẽ ra hình)
  const drawn = await page.evaluate(() => {
    const d = document.getElementById("game").getContext("2d").getImageData(0, 0, 320, 176).data;
    const colors = new Set();
    for (let i = 0; i < d.length; i += 4) colors.add(`${d[i]},${d[i + 1]},${d[i + 2]}`);
    return colors.size;
  });
  expect(drawn).toBeGreaterThan(5);
});

test("bấm phím mũi tên phải thì capybara chạy sang phải", async ({ page }) => {
  const x0 = await page.evaluate(() => capy.x);
  await page.keyboard.down("ArrowRight");
  await page.waitForTimeout(500);
  await page.keyboard.up("ArrowRight");
  const x1 = await page.evaluate(() => capy.x);
  expect(x1).toBeGreaterThan(x0 + 20);
});

test("bấm Space thì capybara nhảy lên rồi đáp xuống đất", async ({ page }) => {
  await page.waitForFunction(() => capy.dangDungDat);
  const yDat = await page.evaluate(() => capy.y);

  await page.keyboard.down("Space");
  await page.waitForTimeout(200);
  const yTrenKhong = await page.evaluate(() => capy.y);
  await page.keyboard.up("Space");
  expect(yTrenKhong).toBeLessThan(yDat - 10);

  await page.waitForFunction(() => capy.dangDungDat, null, { timeout: 5000 });
  expect(await page.evaluate(() => capy.y)).toBeCloseTo(yDat, 0);
});

test("ăn xu thì điểm tăng", async ({ page }) => {
  const diem0 = await page.evaluate(() => diem);
  // Chạy sang phải qua 3 đồng xu đầu màn
  await page.keyboard.down("ArrowRight");
  await page.waitForFunction(() => diem >= 3, null, { timeout: 5000 });
  await page.keyboard.up("ArrowRight");
  expect(await page.evaluate(() => diem)).toBeGreaterThan(diem0);
});

test("chạm slime từ bên hông thì thua, bấm Enter thì chơi lại", async ({ page }) => {
  await page.evaluate(() => {
    const q = quaiList.find((e) => e.y > 100);
    capy.x = q.x - 30;
  });
  await page.keyboard.down("ArrowRight");
  await page.waitForFunction(() => trangThai === "thua", null, { timeout: 5000 });
  await page.keyboard.up("ArrowRight");

  await page.keyboard.press("Enter");
  expect(await page.evaluate(() => trangThai)).toBe("choi");
  expect(await page.evaluate(() => diem)).toBe(0);
  expect(await page.evaluate(() => quaiList.length)).toBe(5);
});

test("chạm cờ đích thì thắng", async ({ page }) => {
  await page.evaluate(() => {
    quaiList.length = 0;
    capy.x = 103 * O;
  });
  await page.keyboard.down("ArrowRight");
  await page.waitForFunction(() => trangThai === "thang", null, { timeout: 5000 });
  await page.keyboard.up("ArrowRight");
});

test("API bảng điểm hoạt động qua Worker + D1", async ({ request }) => {
  const name = "E2E" + Date.now().toString().slice(-6);
  const post = await request.post("/api/scores", { data: { name, score: 9999 } });
  expect(post.status()).toBe(201);
  const res = await request.get("/api/scores");
  const { scores } = await res.json();
  expect(scores.some((s) => s.name === name && s.score === 9999)).toBe(true);
});
