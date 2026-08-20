import { readFile, access } from "node:fs/promises";

const requiredFiles = [
  "src/index.html",
  "src/styles/tokens.css",
  "src/styles/base.css",
  "src/styles/layout.css",
  "src/styles/components.css",
  "src/styles/main.css",
  "src/scripts/navigation.js"
];

const failures = [];

for (const file of requiredFiles) {
  try {
    await access(file);
  } catch {
    failures.push(`Missing required file: ${file}`);
  }
}

const html = await readFile("src/index.html", "utf8");
const tokenCss = await readFile("src/styles/tokens.css", "utf8");
const implementationCss = (
  await Promise.all([
    "src/styles/base.css",
    "src/styles/layout.css",
    "src/styles/components.css",
    "src/styles/utilities.css"
  ].map((file) => readFile(file, "utf8")))
).join("\n");

const checks = [
  [/<html lang="de">/, "Document language must be German."],
  [/<meta name="viewport"/, "Viewport metadata is required."],
  [/<meta name="description"/, "Meta description is required."],
  [/<a class="skip-link" href="#main-content">/, "Skip link is required."],
  [/<main id="main-content">/, "Main landmark target is required."],
  [/<header class="site-header">/, "Site header is required."],
  [/<footer class="site-footer">/, "Site footer is required."],
  [/aria-label="Hauptnavigation"/, "Primary navigation needs an accessible name."],
  [/aria-expanded="false"/, "Menu trigger must expose its initial state."],
  [/aria-controls="primary-navigation"/, "Menu trigger must reference the navigation."],
  [/<h1 id="hero-title">/, "Hero must contain the page H1."],
  [/prefers-reduced-motion: reduce/, "Reduced-motion handling is required."]
];

for (const [pattern, message] of checks) {
  if (!pattern.test(html + implementationCss)) failures.push(message);
}

const h1Count = (html.match(/<h1\b/g) || []).length;
if (h1Count !== 1) failures.push(`Expected exactly one H1, found ${h1Count}.`);

const hardcodedColors = implementationCss.match(/#[0-9a-f]{3,8}\b/gi) || [];
if (hardcodedColors.length > 0) {
  failures.push(`Hardcoded colors outside tokens: ${[...new Set(hardcodedColors)].join(", ")}`);
}

const definedTokens = new Set(
  [...tokenCss.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((match) => match[1])
);
const usedTokens = new Set(
  [...implementationCss.matchAll(/var\((--[a-z0-9-]+)/g)].map((match) => match[1])
);

for (const token of usedTokens) {
  if (!definedTokens.has(token)) failures.push(`Undefined token: ${token}`);
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Reference validation passed: ${requiredFiles.length} files, ${definedTokens.size} tokens.`);

