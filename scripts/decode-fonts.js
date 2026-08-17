const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const srcDir = path.join(__dirname, "..", "assets", "fonts-b64");
const partsDir = path.join(srcDir, "parts");
const outDir = path.join(__dirname, "..", "public", "fonts");

fs.mkdirSync(outDir, { recursive: true });

function decode(name, base64) {
  const gzipped = Buffer.from(base64, "base64");
  const original = zlib.gunzipSync(gzipped);
  const outPath = path.join(outDir, name);
  fs.writeFileSync(outPath, original);
  console.log("decoded", outPath);
}

// Whole-file blobs directly under assets/fonts-b64/*.gz.b64
for (const file of fs.readdirSync(srcDir)) {
  if (!file.endsWith(".gz.b64")) continue;
  const base64 = fs.readFileSync(path.join(srcDir, file), "utf8");
  decode(file.replace(/\.gz\.b64$/, ""), base64);
}

// Chunked blobs under assets/fonts-b64/parts/<Name>.partNN, reassembled in order
if (fs.existsSync(partsDir)) {
  const groups = {};
  for (const file of fs.readdirSync(partsDir)) {
    const match = file.match(/^(.+)\.part\d+$/);
    if (!match) continue;
    const name = match[1];
    (groups[name] ||= []).push(file);
  }
  for (const [name, files] of Object.entries(groups)) {
    files.sort();
    const base64 = files.map((f) => fs.readFileSync(path.join(partsDir, f), "utf8")).join("");
    decode(`${name}.ttf`, base64);
  }
}
