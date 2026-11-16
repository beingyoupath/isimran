import React, { createContext, useContext, useEffect } from "react";
import {
  OG_IMAGE_URL,
  ORGANIZATION_SCHEMA,
  SITE_URL,
} from "../lib/seoConfig";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HreflangAlternate {
  hreflang: string;
  href: string;
}

export interface CollectedHeadData {
  title: string;
  description: string;
  canonicalUrl: string;
  robots: string;
  locale: string;
  ogType: "website" | "article";
  ogImage: string;
  ogImageAlt: string;
  alternates?: HreflangAlternate[];
  articleMeta?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
  };
  schemas: Record<string, any>[];
}

export interface HeadCollectorContextValue {
  setHead: (data: CollectedHeadData) => void;
}

const HeadCollectorContext = createContext<HeadCollectorContextValue | null>(null);

export function HeadCollectorProvider({
  children,
  onCollect,
}: {
  children: React.ReactNode;
  onCollect: (data: CollectedHeadData) => void;
}) {
  return (
    <HeadCollectorContext.Provider value={{ setHead: onCollect }}>
      {children}
    </HeadCollectorContext.Provider>
  );
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string; // Deprecated & ignored — retained in type only to avoid breaking unused props during migration.
  url?: string;
  noindex?: boolean;
  locale?: string;
  alternates?: HreflangAlternate[];
  ogImageAlt?: string;
  breadcrumbs?: BreadcrumbItem[];
  schema?: Record<string, any> | Record<string, any>[];
  faqs?: FAQItem[];
  articleMeta?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
  };
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function serializeHeadDataToHtml(head: CollectedHeadData): string {
  const tags: string[] = [
    `<title>${escapeText(head.title)}</title>`,
    `<meta data-seo-managed="true" name="description" content="${escapeAttr(head.description)}" />`,
    `<meta data-seo-managed="true" name="robots" content="${escapeAttr(head.robots)}" />`,
    `<link data-seo-managed="true" rel="canonical" href="${escapeAttr(head.canonicalUrl)}" />`,
    `<meta data-seo-managed="true" property="og:type" content="${escapeAttr(head.ogType)}" />`,
    `<meta data-seo-managed="true" property="og:url" content="${escapeAttr(head.canonicalUrl)}" />`,
    `<meta data-seo-managed="true" property="og:title" content="${escapeAttr(head.title)}" />`,
    `<meta data-seo-managed="true" property="og:description" content="${escapeAttr(head.description)}" />`,
    `<meta data-seo-managed="true" property="og:site_name" content="Being You Path" />`,
    `<meta data-seo-managed="true" property="og:locale" content="${escapeAttr(head.locale || "en_IN")}" />`,
    ...(head.alternates || []).map(
      (alt) =>
        `<link data-seo-managed="true" rel="alternate" hreflang="${escapeAttr(alt.hreflang)}" href="${escapeAttr(
          alt.href.startsWith("http") ? alt.href : `${SITE_URL}${alt.href}`
        )}" />`
    ),
    `<meta data-seo-managed="true" property="og:image" content="${escapeAttr(head.ogImage)}" />`,
    `<meta data-seo-managed="true" property="og:image:type" content="image/jpeg" />`,
    `<meta data-seo-managed="true" property="og:image:width" content="1200" />`,
    `<meta data-seo-managed="true" property="og:image:height" content="630" />`,
    `<meta data-seo-managed="true" property="og:image:alt" content="${escapeAttr(head.ogImageAlt)}" />`,
    `<meta data-seo-managed="true" name="twitter:card" content="summary_large_image" />`,
    `<meta data-seo-managed="true" name="twitter:url" content="${escapeAttr(head.canonicalUrl)}" />`,
    `<meta data-seo-managed="true" name="twitter:title" content="${escapeAttr(head.title)}" />`,
    `<meta data-seo-managed="true" name="twitter:description" content="${escapeAttr(head.description)}" />`,
    `<meta data-seo-managed="true" name="twitter:image" content="${escapeAttr(head.ogImage)}" />`,
  ];

  if (head.articleMeta?.publishedTime) {
    tags.push(
      `<meta data-seo-managed="true" property="article:published_time" content="${escapeAttr(head.articleMeta.publishedTime)}" />`
    );
  }
  if (head.articleMeta?.modifiedTime) {
    tags.push(
      `<meta data-seo-managed="true" property="article:modified_time" content="${escapeAttr(head.articleMeta.modifiedTime)}" />`
    );
  }
  if (head.articleMeta?.author) {
    tags.push(
      `<meta data-seo-managed="true" property="article:author" content="${escapeAttr(head.articleMeta.author)}" />`
    );
  }

  for (const s of head.schemas) {
    const safeJson = JSON.stringify(s).replace(/</g, "\\u003c");
    tags.push(`<script data-seo-managed="true" type="application/ld+json">${safeJson}</script>`);
  }

  return tags.join("\n    ");
}

function appendManagedMeta(
  headEl: HTMLHeadElement,
  attrName: "name" | "property",
  attrValue: string,
  content: string
) {
  const el = document.createElement("meta");
  el.setAttribute("data-seo-managed", "true");
  el.setAttribute(attrName, attrValue);
  el.setAttribute("content", content);
  headEl.appendChild(el);
}

export function SEO({
  title,
  description,
  url,
  noindex = false,
  locale = "en_IN",
  alternates,
  ogImageAlt = "Being You Path psychological counselling clinic in Deccan Gymkhana, Pune",
  breadcrumbs,
  schema,
  faqs,
  articleMeta,
}: SEOProps) {
  const canonicalUrl = url
    ? url.startsWith("http")
      ? url
      : `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`
    : typeof window !== "undefined"
      ? `${SITE_URL}${window.location.pathname === "/" ? "/" : window.location.pathname.replace(/\/+$/, "")}`
      : `${SITE_URL}/`;

  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-snippet:-1, max-image-preview:large";

  const faqSchema =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const breadcrumbsSchema =
    breadcrumbs && breadcrumbs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${SITE_URL}/`,
            },
            ...breadcrumbs.map((crumb, idx) => ({
              "@type": "ListItem",
              position: idx + 2,
              name: crumb.name,
              item: crumb.url.startsWith("http")
                ? crumb.url
                : `${SITE_URL}${crumb.url.startsWith("/") ? crumb.url : `/${crumb.url}`}`,
            })),
          ],
        }
      : null;

  const extraSchemas: Record<string, any>[] = [];
  if (schema) {
    if (Array.isArray(schema)) {
      extraSchemas.push(...schema);
    } else {
      extraSchemas.push(schema);
    }
  }
  if (faqSchema) extraSchemas.push(faqSchema);
  if (breadcrumbsSchema) extraSchemas.push(breadcrumbsSchema);

  const allSchemas = [ORGANIZATION_SCHEMA, ...extraSchemas];

  const collector = useContext(HeadCollectorContext);
  if (collector) {
    collector.setHead({
      title,
      description,
      canonicalUrl,
      robots,
      locale,
      alternates,
      ogType: articleMeta ? "article" : "website",
      ogImage: OG_IMAGE_URL,
      ogImageAlt,
      articleMeta,
      schemas: allSchemas,
    });
  }

  const headSnapshot = JSON.stringify({
    title,
    description,
    canonicalUrl,
    robots,
    locale,
    alternates,
    ogImageAlt,
    articleMeta,
    allSchemas,
  });

  useEffect(() => {
    if (typeof document === "undefined") return;

    document.title = title;
    const headEl = document.head;

    headEl
      .querySelectorAll('[data-seo-managed="true"]')
      .forEach((node) => node.remove());

    appendManagedMeta(headEl, "name", "description", description);
    appendManagedMeta(headEl, "name", "robots", robots);

    const canonicalEl = document.createElement("link");
    canonicalEl.setAttribute("data-seo-managed", "true");
    canonicalEl.setAttribute("rel", "canonical");
    canonicalEl.setAttribute("href", canonicalUrl);
    headEl.appendChild(canonicalEl);

    for (const alt of alternates || []) {
      const altEl = document.createElement("link");
      altEl.setAttribute("data-seo-managed", "true");
      altEl.setAttribute("rel", "alternate");
      altEl.setAttribute("hreflang", alt.hreflang);
      altEl.setAttribute(
        "href",
        alt.href.startsWith("http") ? alt.href : `${SITE_URL}${alt.href}`
      );
      headEl.appendChild(altEl);
    }

    appendManagedMeta(headEl, "property", "og:type", articleMeta ? "article" : "website");
    appendManagedMeta(headEl, "property", "og:url", canonicalUrl);
    appendManagedMeta(headEl, "property", "og:title", title);
    appendManagedMeta(headEl, "property", "og:description", description);
    appendManagedMeta(headEl, "property", "og:site_name", "Being You Path");
    appendManagedMeta(headEl, "property", "og:locale", locale);
    appendManagedMeta(headEl, "property", "og:image", OG_IMAGE_URL);
    appendManagedMeta(headEl, "property", "og:image:type", "image/jpeg");
    appendManagedMeta(headEl, "property", "og:image:width", "1200");
    appendManagedMeta(headEl, "property", "og:image:height", "630");
    appendManagedMeta(headEl, "property", "og:image:alt", ogImageAlt);

    appendManagedMeta(headEl, "name", "twitter:card", "summary_large_image");
    appendManagedMeta(headEl, "name", "twitter:url", canonicalUrl);
    appendManagedMeta(headEl, "name", "twitter:title", title);
    appendManagedMeta(headEl, "name", "twitter:description", description);
    appendManagedMeta(headEl, "name", "twitter:image", OG_IMAGE_URL);

    if (articleMeta?.publishedTime) {
      appendManagedMeta(headEl, "property", "article:published_time", articleMeta.publishedTime);
    }
    if (articleMeta?.modifiedTime) {
      appendManagedMeta(headEl, "property", "article:modified_time", articleMeta.modifiedTime);
    }
    if (articleMeta?.author) {
      appendManagedMeta(headEl, "property", "article:author", articleMeta.author);
    }

    for (const schemaObj of allSchemas) {
      const scriptEl = document.createElement("script");
      scriptEl.setAttribute("data-seo-managed", "true");
      scriptEl.setAttribute("type", "application/ld+json");
      scriptEl.textContent = JSON.stringify(schemaObj);
      headEl.appendChild(scriptEl);
    }
  }, [headSnapshot]);

  // Identical null render on both SSR and Client prevents React 19 Helmet hydration mismatches.
  return null;
}

export default SEO;
