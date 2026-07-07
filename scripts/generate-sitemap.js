const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "..", "app");
const OUT_FILE = path.join(__dirname, "..", "public", "sitemap.xml");
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://composerui.com";

function walk(dir) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	let routes = [];
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			routes = routes.concat(walk(full));
		} else {
			if (/^page\.(t|j)sx?$/.test(entry.name)) {
				// Determine route path relative to app folder
				const rel = path.relative(APP_DIR, dir);
				// split and sanitize segments: ignore private/special folders (start with '@' or contain '(' )
				const parts = rel
					.split(path.sep)
					.filter(Boolean)
					.filter(
						(p) =>
							!p.startsWith("@") &&
							!p.includes("(") &&
							!p.includes("..."),
					);
				let route = "/" + parts.join("/");
				if (route === "/page" || route === "/.") route = "/";
				route = route.replace(/^\/+/, "/");
				routes.push(route === "" ? "/" : route);
			}
		}
	}
	return routes;
}

const routes = Array.from(new Set(walk(APP_DIR))).sort();

const items = routes
	.map(
		(r) =>
			`  <url>\n    <loc>${SITE_URL}${r}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
	)
	.join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`;

fs.writeFileSync(OUT_FILE, xml);
console.log("sitemap written to", OUT_FILE);
