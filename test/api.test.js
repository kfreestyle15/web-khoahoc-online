import { env, exports } from "cloudflare:workers";
import { beforeEach, describe, expect, it } from "vitest";

function post(body) {
  return exports.default.fetch("https://example.com/api/scores", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

async function getScores() {
  const res = await exports.default.fetch("https://example.com/api/scores");
  return { res, data: await res.json() };
}

describe("API bảng điểm", () => {
  beforeEach(async () => {
    await env.DB.prepare("DELETE FROM scores").run();
  });

  it("health check trả về ok", async () => {
    const res = await exports.default.fetch("https://example.com/api/health");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("bảng điểm trống lúc đầu", async () => {
    const { res, data } = await getScores();
    expect(res.status).toBe(200);
    expect(data.scores).toEqual([]);
  });

  it("lưu điểm vào D1 và đọc lại theo thứ tự cao đến thấp", async () => {
    expect((await post({ name: "Capy", score: 5 })).status).toBe(201);
    expect((await post({ name: "Lé", score: 30 })).status).toBe(201);
    expect((await post({ name: "Mập", score: 12 })).status).toBe(201);

    const { data } = await getScores();
    expect(data.scores.map((s) => [s.name, s.score])).toEqual([
      ["Lé", 30],
      ["Mập", 12],
      ["Capy", 5],
    ]);

    const row = await env.DB.prepare("SELECT COUNT(*) AS n FROM scores").first();
    expect(row.n).toBe(3);
  });

  it("chỉ trả về tối đa 10 điểm cao nhất", async () => {
    for (let i = 1; i <= 15; i++) await post({ name: "P" + i, score: i });
    const { data } = await getScores();
    expect(data.scores).toHaveLength(10);
    expect(data.scores[0].score).toBe(15);
    expect(data.scores[9].score).toBe(6);
  });

  it("cắt khoảng trắng thừa ở tên", async () => {
    await post({ name: "  Capy  ", score: 1 });
    const { data } = await getScores();
    expect(data.scores[0].name).toBe("Capy");
  });

  it.each([
    ["tên rỗng", { name: "", score: 1 }],
    ["tên toàn khoảng trắng", { name: "   ", score: 1 }],
    ["tên quá dài", { name: "a".repeat(13), score: 1 }],
    ["tên không phải chuỗi", { name: 5, score: 1 }],
    ["điểm âm", { name: "A", score: -1 }],
    ["điểm quá lớn", { name: "A", score: 10000 }],
    ["điểm thập phân", { name: "A", score: 1.5 }],
    ["điểm là chuỗi", { name: "A", score: "10" }],
    ["thiếu điểm", { name: "A" }],
  ])("từ chối dữ liệu sai: %s", async (_label, body) => {
    const res = await post(body);
    expect(res.status).toBe(400);
    const { data } = await getScores();
    expect(data.scores).toEqual([]);
  });

  it("từ chối nội dung không phải JSON", async () => {
    expect((await post("không phải json")).status).toBe(400);
  });

  it("từ chối nội dung quá lớn", async () => {
    expect((await post(JSON.stringify({ name: "A", score: 1, pad: "x".repeat(2000) }))).status).toBe(413);
  });

  it("từ chối phương thức không hỗ trợ", async () => {
    const res = await exports.default.fetch("https://example.com/api/scores", { method: "DELETE" });
    expect(res.status).toBe(405);
  });

  it("đường dẫn /api/ không tồn tại trả về 404", async () => {
    const res = await exports.default.fetch("https://example.com/api/khong-co");
    expect(res.status).toBe(404);
  });

  it("chống SQL injection: tên chứa câu lệnh SQL chỉ được lưu như văn bản", async () => {
    const res = await post({ name: "');DROP--", score: 1 });
    expect(res.status).toBe(201);
    await post({ name: "Capy", score: 2 });
    const { data } = await getScores();
    expect(data.scores).toHaveLength(2);
    expect(data.scores.map((s) => s.name)).toContain("');DROP--");
  });
});
