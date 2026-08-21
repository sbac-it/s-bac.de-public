import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve(".");
const source = resolve(root, "src");
const pages = resolve(root, "content/pages");
const dist = resolve(root, "dist");
const pgpSource = resolve(root, "assets/pgp");
const isDevelopment = process.env.SITE_ENV === "development";

const sourceHtml = await readFile(resolve(source, "index.html"), "utf8");
const extract = (pattern, name) => {
  const match = sourceHtml.match(pattern);
  if (!match) throw new Error(`Could not extract ${name} from src/index.html.`);
  return match[0];
};

// Shared fragments come from the root page, where relative asset paths work.
// Normalize them so the same markup also works on nested routes.
const normalizeAssetPaths = (html) => html.replaceAll('src="assets/', 'src="/assets/');
const resolveStandalonePlaceholders = (html) => html.replaceAll("{{PORTRAIT_URL}}", "/assets/sascha-bachmeier.png");
const header = normalizeAssetPaths(extract(/<header class="site-header">[\s\S]*?<\/header>/, "header"));
const homepage = normalizeAssetPaths(extract(/<main id="main-content">[\s\S]*?<\/main>/, "homepage"));
const footer = normalizeAssetPaths(extract(/<footer class="site-footer">[\s\S]*?<\/footer>/, "footer"));

const routeDefinitions = [
  { route: "/", title: "s-bac.de – Technologie verstehen. Wissen teilen.", description: "Sascha Bachmeier dokumentiert IT-Infrastruktur, Microsoft 365, Linux, Automatisierung und nachhaltige technische Lösungen.", main: homepage, section: "Startseite" },
  { route: "/ueber-mich/", file: "ueber-mich.html", title: "Über mich – Sascha Bachmeier", description: "Beruflicher Weg, Erfahrung und fachliche Schwerpunkte von Sascha Bachmeier.", section: "Über mich" },
  { route: "/leistungen/", file: "leistungen.html", title: "Leistungen – s-bac.de", description: "Unterstützung für IT-Infrastruktur, Microsoft 365, Linux und nachvollziehbare Automatisierung.", section: "Leistungen" },
  { route: "/leistungen/microsoft-365/", file: "leistungen-microsoft-365.html", title: "Microsoft 365 und Entra ID – s-bac.de", description: "Microsoft-365-Umgebungen sicher, nachvollziehbar und nachhaltig gestalten.", section: "Leistungen" },
  { route: "/leistungen/infrastruktur/", file: "leistungen-infrastruktur.html", title: "IT-Infrastruktur – s-bac.de", description: "Stabile, sichere und wartbare IT-Infrastrukturen planen und betreiben.", section: "Leistungen" },
  { route: "/leistungen/automatisierung/", file: "leistungen-automatisierung.html", title: "IT-Automatisierung – s-bac.de", description: "Administrative Abläufe mit PowerShell, Shell und Git zuverlässig automatisieren.", section: "Leistungen" },
  { route: "/projekte/", file: "projekte.html", title: "Projekte – s-bac.de", description: "Technische Projekte mit nachvollziehbaren Entscheidungen, Umsetzung und Erkenntnissen.", section: "Projekte" },
  { route: "/fachwissen/", file: "fachwissen.html", title: "Fachwissen – s-bac.de", description: "Praxisnahe Fachartikel zu IT-Infrastruktur, Sicherheit, Cloud und Automatisierung.", section: "Fachwissen" },
  { route: "/fachwissen/moderne-it-governance/", file: "fachwissen-moderne-it-governance.html", title: "Moderne IT-Governance – s-bac.de", description: "Ein praxisnaher Orientierungsrahmen für sichere, wirksame und zukunftsfähige IT-Governance in modernen Unternehmen.", section: "Fachwissen" },
  { route: "/fachwissen/openpgp-e-mail-verschluesselung/", file: "fachwissen-openpgp-e-mail-verschluesselung.html", title: "OpenPGP-E-Mail-Verschlüsselung – s-bac.de", description: "E-Mails mit OpenPGP unter Windows, Linux und macOS verschlüsseln und signieren.", section: "Fachwissen" },
  { route: "/fachwissen/smime-wiseid-cacert/", file: "fachwissen-smime-wiseid-cacert.html", title: "S/MIME mit WISeID und CAcert – s-bac.de", description: "Erfahrungen mit S/MIME, WISeID, CAcert, Thunderbird und verschlüsselter E-Mail-Kommunikation.", section: "Fachwissen" },
  { route: "/kontakt/", file: "kontakt.html", title: "Kontakt – s-bac.de", description: "Kontakt zu Sascha Bachmeier und öffentliche PGP-Schlüssel für verschlüsselte Kommunikation.", section: "Kontakt" },
  { route: "/impressum/", file: "impressum.html", title: "Impressum – s-bac.de", description: "Impressum und Anbieterkennzeichnung für s-bac.de." },
  { route: "/datenschutz/", file: "datenschutz.html", title: "Datenschutz – s-bac.de", description: "Datenschutzhinweise für den Besuch von s-bac.de." },
  { route: "/barrierefreiheit/", file: "barrierefreiheit.html", title: "Barrierefreiheit – s-bac.de", description: "Informationen zur barrierearmen und zugänglichen Gestaltung von s-bac.de." }
];

const makeHeader = (section) => {
  let result = header.replaceAll(' aria-current="page"', "");
  if (!section) return result;
  const escaped = section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const linkPattern = new RegExp(`(<a)( href="[^"]+"[^>]*>${escaped}</a>)`);
  return result.replace(linkPattern, '$1 aria-current="page"$2');
};

const render = ({ title, description, main, section }) => {
  const mainId = main.match(/<main\s[^>]*id="([^"]+)"/)?.[1] ?? "main-content";
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${description}">
  ${isDevelopment ? '<meta name="robots" content="noindex, nofollow">' : ""}
  <title>${title}</title>
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="/styles/main.css">
  <script src="/scripts/navigation.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#${mainId}">Zum Hauptinhalt</a>
  ${makeHeader(section)}
  ${main}
  ${footer}
</body>
</html>
`;
};

const outputFile = (route) => route === "/" ? resolve(dist, "index.html") : resolve(dist, route.slice(1), "index.html");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await Promise.all([
  cp(resolve(source, "styles"), resolve(dist, "styles"), { recursive: true, dereference: true }),
  cp(resolve(source, "scripts"), resolve(dist, "scripts"), { recursive: true, dereference: true }),
  cp(resolve(source, "assets"), resolve(dist, "assets"), { recursive: true, dereference: true })
]);
await cp(pgpSource, resolve(dist, "assets/pgp"), { recursive: true });

for (const definition of routeDefinitions) {
  const main = resolveStandalonePlaceholders(definition.main ?? await readFile(resolve(pages, definition.file), "utf8"));
  const file = outputFile(definition.route);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, render({ ...definition, main }));
}

const notFoundMain = `<main id="not-found-main" class="s-bac-legal" tabindex="-1"><section class="legal-hero"><div class="container"><p class="eyebrow">Fehler 404</p><h1>Diese Seite wurde nicht gefunden.</h1><p>Die Adresse ist möglicherweise veraltet oder unvollständig.</p><p><a class="button button--primary" href="/">Zur Startseite</a></p></div></section></main>`;
await writeFile(resolve(dist, "404.html"), render({ title: "Seite nicht gefunden – s-bac.de", description: "Die angeforderte Seite wurde nicht gefunden.", main: notFoundMain }));

await writeFile(resolve(dist, ".htaccess"), `Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !/$
  RewriteRule ^ %{REQUEST_URI}/ [R=301,L]
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  SetEnvIf Host "^dev\\.s-bac\\.de$" development_host
  Header set X-Robots-Tag "noindex, nofollow" env=development_host
</IfModule>
`);

await writeFile(resolve(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routeDefinitions.map(({ route }) => `  <url><loc>https://www.s-bac.de${route}</loc></url>`).join("\n")}
</urlset>
`);
await writeFile(
  resolve(dist, "robots.txt"),
  isDevelopment
    ? "User-agent: *\nDisallow: /\n"
    : "User-agent: *\nAllow: /\nSitemap: https://www.s-bac.de/sitemap.xml\n"
);

console.log(`Static website created: ${routeDefinitions.length} routes plus 404 page.`);
