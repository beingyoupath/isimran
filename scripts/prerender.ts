import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { RESOURCE_ARTICLES } from "../src/data/resourcesData";
import { SITE_URL } from "../src/lib/seoConfig";

const STATIC_CANONICAL_ROUTES = [
  "/",
  "/services",
  "/services/cbt-therapy-pune",
  "/services/stress-anxiety-counselling-pune",
  "/services/burnout-counselling-pune",
  "/services/self-esteem-therapy-pune",
  "/services/overthinking-therapy",
  "/services/career-counselling-pune",
  "/services/student-adolescent-counselling-pune",
  "/services/online-therapy-india",
  "/services/counselling-prabhat-road-pune",
  "/services/depression-counselling-pune",
  "/services/relationship-couples-counselling-pune",
  "/services/talk-therapy-pune",
  "/services/parenting-family-counselling-pune",
  "/services/mindfulness-meditation-pune",
  "/services/behavioural-change-habit-coaching-pune",
  "/workshops",
  "/workshops/gen-z-in-the-workplace-pune",
  "/about",
  "/resources",
  "/contact",
  "/areas-we-serve",
  "/guides/how-to-choose-a-psychologist-pune",
  "/hi",
  "/hi/services/cbt-therapy-pune",
  "/hi/services/stress-anxiety-counselling-pune",
  "/hi/services/burnout-counselling-pune",
  "/privacy-policy",
  "/terms",
  "/thought-of-the-day",
];

async function runPrerender() {
  const rootDir = process.cwd();
  const distDir = path.join(rootDir, "dist");
  const publicDir = path.join(rootDir, "public");
  const templatePath = path.join(distDir, "index.html");
  const ssrEntryPath = pathToFileURL(
    path.join(rootDir, "dist-server", "entry-server.js")
  ).href;

  if (!fs.existsSync(templatePath)) {
    throw new Error("Missing dist/index.html. Run `vite build` first.");
  }

  const templateHtml = fs.readFileSync(templatePath, "utf-8");
  const { render } = await import(ssrEntryPath);

  const articleRoutes = RESOURCE_ARTICLES.map(
    (article) => `/resources/${article.id}`
  );
  const allSitemapRoutes = [...STATIC_CANONICAL_ROUTES, ...articleRoutes];
  const routesToPrerender = [...allSitemapRoutes, "/404"];

  for (const route of routesToPrerender) {
    const { html, headTags } = render(route === "/404" ? "/__404__" : route);
    let fullHtml = templateHtml
      .replace("<!--HEAD_TAGS-->", headTags)
      .replace("<!--APP_HTML-->", html);

    if (route === "/hi" || route.startsWith("/hi/")) {
      fullHtml = fullHtml.replace('<html lang="en-IN">', '<html lang="hi-IN">');
    }

    if (route === "/") {
      fs.writeFileSync(path.join(distDir, "index.html"), fullHtml, "utf-8");
    } else if (route === "/404") {
      fs.writeFileSync(path.join(distDir, "404.html"), fullHtml, "utf-8");
    } else {
      const cleanRoute = route.replace(/^\/+/, "");
      const outDir = path.join(distDir, cleanRoute);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), fullHtml, "utf-8");
    }
  }

  // Generate /sitemap.xml
  const todayIso = new Date().toISOString().split("T")[0];
  const urlEntries = allSitemapRoutes
    .map((route) => {
      const loc = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
      const priority =
        route === "/"
          ? "1.0"
          : route.startsWith("/services/")
            ? "0.9"
            : route.startsWith("/resources/")
              ? "0.7"
              : "0.8";
      const changefreq = route === "/" || route === "/resources" ? "weekly" : "monthly";
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${todayIso}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf-8");
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf-8");
  fs.writeFileSync(path.join(distDir, "robots.txt"), robotsTxt, "utf-8");
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf-8");

  console.log(
    `Prerendered ${routesToPrerender.length} HTML routes and generated sitemap.xml (${allSitemapRoutes.length} URLs) + robots.txt.`
  );
  process.exit(0);
}

runPrerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
