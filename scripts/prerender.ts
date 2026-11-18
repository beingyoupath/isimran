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

  const getSourceLastMod = (route: string): string => {
    const fileMap: Record<string, string> = {
      "/": "src/pages/Home.tsx",
      "/about": "src/pages/About.tsx",
      "/services": "src/pages/Services.tsx",
      "/workshops": "src/pages/Workshops.tsx",
      "/resources": "src/pages/Resources.tsx",
      "/contact": "src/pages/Contact.tsx",
      "/areas-we-serve": "src/pages/AreasWeServe.tsx",
      "/guides/how-to-choose-a-psychologist-pune": "src/pages/HowToChoosePsychologistPune.tsx",
      "/privacy-policy": "src/pages/PrivacyPolicy.tsx",
      "/terms": "src/pages/Terms.tsx",
      "/thought-of-the-day": "src/pages/ThoughtOfTheDay.tsx",
      "/hi": "src/pages/hi/HomeHi.tsx",
      "/hi/services/cbt-therapy-pune": "src/pages/hi/CbtTherapyHi.tsx",
      "/hi/services/stress-anxiety-counselling-pune": "src/pages/hi/AnxietyCounsellingHi.tsx",
      "/hi/services/burnout-counselling-pune": "src/pages/hi/BurnoutCounsellingHi.tsx",
      "/services/cbt-therapy-pune": "src/pages/services/CbtTherapyPune.tsx",
      "/services/stress-anxiety-counselling-pune": "src/pages/services/AnxietyCounsellingPune.tsx",
      "/services/burnout-counselling-pune": "src/pages/services/BurnoutWorkStressCounsellingPune.tsx",
      "/services/self-esteem-therapy-pune": "src/pages/services/SelfEsteemTherapyPune.tsx",
      "/services/overthinking-therapy": "src/pages/services/OverthinkingTherapy.tsx",
      "/services/career-counselling-pune": "src/pages/services/CareerCounsellingPune.tsx",
      "/services/student-adolescent-counselling-pune": "src/pages/services/StudentAdolescentCounsellingPune.tsx",
      "/services/online-therapy-india": "src/pages/services/OnlineTherapyIndia.tsx",
      "/services/counselling-prabhat-road-pune": "src/pages/services/PrabhatRoadCounsellingPune.tsx",
      "/services/depression-counselling-pune": "src/pages/services/DepressionCounsellingPune.tsx",
      "/services/relationship-couples-counselling-pune": "src/pages/services/RelationshipCouplesCounsellingPune.tsx",
      "/services/talk-therapy-pune": "src/pages/services/TalkTherapyPune.tsx",
      "/services/parenting-family-counselling-pune": "src/pages/services/ParentingFamilyCounsellingPune.tsx",
      "/services/mindfulness-meditation-pune": "src/pages/services/MindfulnessMeditationPune.tsx",
      "/services/behavioural-change-habit-coaching-pune": "src/pages/services/BehaviouralChangeHabitCoachingPune.tsx",
      "/workshops/gen-z-in-the-workplace-pune": "src/pages/services/GenZWorkplaceWorkshopPune.tsx",
    };

    const candidateFile = route.startsWith("/resources/")
      ? "src/data/resourcesData.ts"
      : fileMap[route];

    if (candidateFile && fs.existsSync(path.join(rootDir, candidateFile))) {
      const mtime = fs.statSync(path.join(rootDir, candidateFile)).mtime;
      return mtime.toISOString().split("T")[0];
    }
    return "2026-11-17";
  };

  const pageImagesMap: Record<string, { loc: string; title: string }[]> = {
    "/": [
      { loc: `${SITE_URL}/images/hero-path.webp`, title: "Being You Path Psychological Counselling Pune" },
    ],
    "/about": [
      { loc: `${SITE_URL}/images/imran-hussain.webp`, title: "Imran Hussain Psychologist and CBT practitioner Pune" },
      { loc: `${SITE_URL}/images/tejaswini-joshi.webp`, title: "Tejaswini Joshi Counselling Psychologist Pune" },
    ],
    "/services": [
      { loc: `${SITE_URL}/images/service-cbt.webp`, title: "Cognitive Behavioural Therapy in Pune" },
      { loc: `${SITE_URL}/images/service-anxiety.webp`, title: "Stress and Anxiety Counselling Pune" },
      { loc: `${SITE_URL}/images/deccan-gymkhana-clinic-pune.webp`, title: "Deccan Gymkhana Counselling Clinic" },
    ],
    "/workshops": [
      { loc: `${SITE_URL}/images/workshop-hero-1.webp`, title: "Corporate Wellness Workshops in Pune" },
      { loc: `${SITE_URL}/images/workshop-corporate.webp`, title: "Employee Well-Being Training" },
    ],
    "/resources": [
      { loc: `${SITE_URL}/images/being-you-path-og.jpg`, title: "Psychology Articles and Guides" },
    ],
    "/contact": [
      { loc: `${SITE_URL}/images/contact-hero-1.webp`, title: "Book a Psychologist at Deccan Gymkhana Pune" },
    ],
    "/services/cbt-therapy-pune": [
      { loc: `${SITE_URL}/images/service-cbt.webp`, title: "CBT Therapy in Pune" },
    ],
    "/services/stress-anxiety-counselling-pune": [
      { loc: `${SITE_URL}/images/service-anxiety.webp`, title: "Stress and Anxiety Counselling in Pune" },
    ],
    "/services/burnout-counselling-pune": [
      { loc: `${SITE_URL}/images/service-burnout.webp`, title: "Burnout Counselling in Pune" },
    ],
    "/services/self-esteem-therapy-pune": [
      { loc: `${SITE_URL}/images/service-self-esteem.webp`, title: "Self-Esteem Therapy in Pune" },
    ],
    "/services/career-counselling-pune": [
      { loc: `${SITE_URL}/images/service-career.webp`, title: "Career Counselling in Pune" },
    ],
    "/services/student-adolescent-counselling-pune": [
      { loc: `${SITE_URL}/images/service-student.webp`, title: "Student and Adolescent Counselling" },
    ],
    "/services/online-therapy-india": [
      { loc: `${SITE_URL}/images/service-online.webp`, title: "Online Therapy Across India" },
    ],
    "/services/counselling-prabhat-road-pune": [
      { loc: `${SITE_URL}/images/deccan-gymkhana-clinic-pune.webp`, title: "Prabhat Road Clinic Pune" },
    ],
    "/services/depression-counselling-pune": [
      { loc: `${SITE_URL}/images/service-depression.webp`, title: "Depression and Low Mood Counselling" },
    ],
    "/services/relationship-couples-counselling-pune": [
      { loc: `${SITE_URL}/images/service-relationships.webp`, title: "Relationship and Couples Counselling" },
    ],
    "/services/parenting-family-counselling-pune": [
      { loc: `${SITE_URL}/images/family-parenting.webp`, title: "Parenting and Family Well-Being" },
    ],
    "/services/mindfulness-meditation-pune": [
      { loc: `${SITE_URL}/images/mindfulness-calm.webp`, title: "Mindfulness and Meditation Coaching" },
    ],
  };

  const escapeXml = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  // Generate /sitemap.xml
  const urlEntries = allSitemapRoutes
    .map((route) => {
      const loc = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
      const lastmod = getSourceLastMod(route);
      const priority =
        route === "/"
          ? "1.0"
          : route.startsWith("/services/")
            ? "0.9"
            : route.startsWith("/resources/")
              ? "0.7"
              : "0.8";
      const changefreq = route === "/" || route === "/resources" ? "weekly" : "monthly";
      const images = pageImagesMap[route] || [];
      const imageXml = images
        .map(
          (img) => `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
    </image:image>`
        )
        .join("\n");

      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imageXml ? `\n${imageXml}` : ""}
  </url>`;
    })
    .join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>
`;

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /*?utm_
Disallow: /*?fbclid=

# Search and AI-search crawlers (allowed so we can appear in answers)
User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: Applebot
Allow: /

# AI training crawlers: allowed (owner's choice; change to Disallow: / to opt out)
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  // Generate RSS 2.0 feed at /resources/feed.xml
  const rssItemsXml = RESOURCE_ARTICLES.map((article) => {
    const link = `${SITE_URL}/resources/${article.id}`;
    return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(article.overview)}</description>
      <category>${escapeXml(article.categoryLabel)}</category>
    </item>`;
  }).join("\n");

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Being You Path — Psychology Articles &amp; Guides</title>
    <link>${SITE_URL}/resources</link>
    <description>Evidence-based articles on stress, burnout, overthinking, relationships and everyday mental wellbeing.</description>
    <language>en-in</language>
    <atom:link href="${SITE_URL}/resources/feed.xml" rel="self" type="application/rss+xml" />
${rssItemsXml}
  </channel>
</rss>
`;

  const indexNowKey = (process.env.INDEXNOW_KEY || "REPLACE_ME").trim();

  const serviceRoutesList = STATIC_CANONICAL_ROUTES.filter(
    (r) => r.startsWith("/services/") || r.startsWith("/workshops")
  );
  const resourceArticleLinks = RESOURCE_ARTICLES.map(
    (a) => `- [${a.title}](${SITE_URL}/resources/${a.id}): ${a.overview}`
  ).join("\n");

  const llmsTxt = `# Being You Path — Psychological Counselling & CBT Practice in Pune

> Being You Path is a psychological counselling and Cognitive Behavioural Therapy (CBT) practice at 119/17, Dr. Sripati Shastri Path, Near Prabhat Road, Deccan Gymkhana, Pune 411004, led by Imran Hussain (Psychologist and CBT practitioner, clinical training at NIMHANS) and Tejaswini Joshi (Counselling Psychologist, LSE certification in Managing People). Sessions are available in English, Hindi, and Marathi, both in person in Pune and online across India. For severe symptoms or crisis support in India, we refer to Tele-MANAS (14416) or emergency services (112).

## Core Pages
- [Home](${SITE_URL}/): Overview of counselling approach, practitioners, reviews, FAQs, and clarity call booking.
- [Services Directory](${SITE_URL}/services): Filterable catalogue of all 17 clinical counselling, family, career, habit coaching, and workplace services.
- [About Our Psychologists](${SITE_URL}/about): Practitioner qualifications, publications, and therapeutic philosophy.
- [Corporate Wellness Workshops](${SITE_URL}/workshops): Stress management, burnout prevention, and psychological safety workshops for organisations and schools.
- [Psychology Articles & Guides](${SITE_URL}/resources): Evidence-informed psychoeducational articles.
- [How to Choose a Psychologist in Pune](${SITE_URL}/guides/how-to-choose-a-psychologist-pune): Practical guide to choosing therapy in Pune.
- [Areas We Serve in Pune & India](${SITE_URL}/areas-we-serve): Local Pune neighbourhoods served from Deccan Gymkhana clinic and online video coverage.
- [Thought of the Day](${SITE_URL}/thought-of-the-day): Daily deterministic psychology & philosophy reflections updated at midnight IST.
- [Contact & Booking](${SITE_URL}/contact): Book a free 15-minute clarity call, phone, WhatsApp, email, and clinic directions.

## Services & Workshops
${serviceRoutesList.map((r) => `- ${SITE_URL}${r}`).join("\n")}

## Hindi Pages (hi-IN)
- ${SITE_URL}/hi
- ${SITE_URL}/hi/services/cbt-therapy-pune
- ${SITE_URL}/hi/services/stress-anxiety-counselling-pune
- ${SITE_URL}/hi/services/burnout-counselling-pune

## Psychology Articles & Guides
${resourceArticleLinks}
`;

  fs.mkdirSync(publicDir, { recursive: true });
  fs.mkdirSync(path.join(distDir, "resources"), { recursive: true });
  fs.mkdirSync(path.join(publicDir, "resources"), { recursive: true });

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf-8");
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf-8");
  fs.writeFileSync(path.join(distDir, "robots.txt"), robotsTxt, "utf-8");
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf-8");
  fs.writeFileSync(path.join(distDir, "llms.txt"), llmsTxt, "utf-8");
  fs.writeFileSync(path.join(publicDir, "llms.txt"), llmsTxt, "utf-8");
  fs.writeFileSync(path.join(distDir, "resources", "feed.xml"), rssFeedXml, "utf-8");
  fs.writeFileSync(path.join(publicDir, "resources", "feed.xml"), rssFeedXml, "utf-8");
  fs.writeFileSync(path.join(distDir, `${indexNowKey}.txt`), indexNowKey, "utf-8");
  fs.writeFileSync(path.join(publicDir, `${indexNowKey}.txt`), indexNowKey, "utf-8");

  console.log(
    `Prerendered ${routesToPrerender.length} HTML routes and generated sitemap.xml (${allSitemapRoutes.length} URLs), robots.txt, /resources/feed.xml, /${indexNowKey}.txt, and llms.txt.`
  );
  process.exit(0);
}

runPrerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
