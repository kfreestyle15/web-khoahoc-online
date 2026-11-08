// Dùng trong GitHub Actions trước khi deploy:
// 1. Tìm database D1 tên "capybara-scores" trên tài khoản Cloudflare; chưa có thì tạo.
// 2. Ghi database_id vào wrangler.jsonc (chỉ trong bản chạy trên CI, không commit lại).
// Chạy lại nhiều lần vẫn an toàn.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const DB_NAME = "capybara-scores";
const CONFIG = "wrangler.jsonc";

function wrangler(args) {
  return execFileSync("npx", ["wrangler", ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] });
}

function findId() {
  const list = JSON.parse(wrangler(["d1", "list", "--json"]));
  const db = list.find((d) => d.name === DB_NAME);
  return db ? (db.uuid ?? db.id ?? db.database_id) : undefined;
}

export function injectId(configText, id) {
  const marker = `"database_name": "${DB_NAME}",`;
  if (!configText.includes(marker)) throw new Error(`Không thấy ${marker} trong ${CONFIG}`);
  if (/"database_id"\s*:/.test(configText)) {
    return configText.replace(/"database_id"\s*:\s*"[^"]*"/, `"database_id": "${id}"`);
  }
  return configText.replace(marker, `${marker}\n      "database_id": "${id}",`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  let id = findId();
  if (!id) {
    console.log(`Chưa có database ${DB_NAME}, đang tạo mới...`);
    wrangler(["d1", "create", DB_NAME]);
    id = findId();
  }
  if (!id) throw new Error(`Không lấy được ID của database ${DB_NAME}`);
  writeFileSync(CONFIG, injectId(readFileSync(CONFIG, "utf8"), id));
  console.log(`Database ${DB_NAME} sẵn sàng.`);
}
