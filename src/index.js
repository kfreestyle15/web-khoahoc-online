// Worker: phục vụ API bảng điểm cao, lưu trong D1.
// File tĩnh của game (public/) được Cloudflare phục vụ trực tiếp, không qua đây.

const TOP_N = 10;
const MAX_NAME_LENGTH = 12;
const MAX_SCORE = 9999;
const MAX_BODY_BYTES = 1024;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

async function listScores(env) {
  const { results } = await env.DB
    .prepare("SELECT name, score, created_at FROM scores ORDER BY score DESC, id ASC LIMIT ?")
    .bind(TOP_N)
    .all();
  return json({ scores: results });
}

async function addScore(request, env) {
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return json({ error: "Dữ liệu gửi lên quá lớn" }, 413);

  let body;
  try {
    body = JSON.parse(text);
  } catch {
    return json({ error: "Dữ liệu phải là JSON" }, 400);
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const score = body?.score;

  if (name.length < 1 || name.length > MAX_NAME_LENGTH) {
    return json({ error: `Tên phải dài 1-${MAX_NAME_LENGTH} ký tự` }, 400);
  }
  if (!Number.isInteger(score) || score < 0 || score > MAX_SCORE) {
    return json({ error: `Điểm phải là số nguyên từ 0 đến ${MAX_SCORE}` }, 400);
  }

  await env.DB.prepare("INSERT INTO scores (name, score) VALUES (?, ?)").bind(name, score).run();
  return json({ ok: true }, 201);
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/health") return json({ ok: true });

    if (pathname === "/api/scores") {
      if (request.method === "GET") return listScores(env);
      if (request.method === "POST") return addScore(request, env);
      return json({ error: "Phương thức không được hỗ trợ" }, 405);
    }

    if (pathname.startsWith("/api/")) return json({ error: "Không tìm thấy" }, 404);

    // Mọi đường dẫn còn lại là file tĩnh của game
    return env.ASSETS.fetch(request);
  },
};
