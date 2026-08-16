const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const srcDir = path.join(__dirname, "..", "assets", "fonts-b64");
const outDir = path.join(__dirname, "..", "public", "fonts");

fs.mkdirSync(outDir, { recursive: true });

for (const file of fs.readdirSync(srcDir)) {
  if (!file.endsWith(".gz.b64")) continue;
  const base64 = fs.readFileSync(path.join(srcDir, file), "utf8");
  const gzipped = Buffer.from(base64, "base64");
  const original = zlib.gunzipSync(gzipped);
  const outPath = path.join(outDir, file.replace(/\.gz\.b64$/, ""));
  fs.writeFileSync(outPath, original);
  console.log("decoded", outPath);
}
