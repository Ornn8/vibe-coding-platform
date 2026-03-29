import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const envPath = path.join(process.cwd(), ".env.local");

if (!existsSync(envPath)) {
  console.error(".env.local not found. Create it from .env.example first.");
  process.exit(1);
}

const content = readFileSync(envPath, "utf8");
const lines = content.split(/\r?\n/);

const updates = new Map();

for (const [index, line] of lines.entries()) {
  if (line.startsWith('AUTH_SECRET="replace-with-a-long-random-string"')) {
    const secret = randomBytes(32).toString("hex");
    lines[index] = `AUTH_SECRET="${secret}"`;
    updates.set("AUTH_SECRET", "generated");
  }
}

writeFileSync(envPath, `${lines.join("\n")}\n`, "utf8");

if (updates.size === 0) {
  console.log("No placeholder values were updated.");
} else {
  for (const [key, status] of updates.entries()) {
    console.log(`${key}: ${status}`);
  }
}
