import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";

const dist = resolve("dist");
const files = [];
const walk = async (directory) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else files.push(path);
  }
};

await walk(dist);
const htmlFiles = files.filter((file) => extname(file) === ".html");
const failures = [];

const localTarget = (url, sourceFile) => {
  const path = url.split(/[?#]/, 1)[0];
  if (!path.startsWith("/")) return resolve(dirname(sourceFile), path);
  if (path === "/") return resolve(dist, "index.html");
  if (extname(path)) return resolve(dist, path.slice(1));
  return resolve(dist, path.slice(1), "index.html");
};

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const required of [/<html lang="de">/, /<title>[^<]+<\/title>/, /<meta name="description"/, /<h1(?:\s|>)/, /class="site-header"/, /class="site-footer"/]) {
    if (!required.test(html)) failures.push(`${file}: missing ${required}`);
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) failures.push(`${file}: duplicate ids ${[...new Set(duplicates)].join(", ")}`);

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|#)/.test(url)) continue;
    const target = localTarget(url, file);
    if (!target) continue;
    try { await access(target); }
    catch { failures.push(`${file}: missing target ${url}`); }
  }
}

if (htmlFiles.length !== 16) failures.push(`Expected 16 HTML files, found ${htmlFiles.length}.`);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Static site validation passed: ${htmlFiles.length} HTML files, ${files.length} total files.`);
}
