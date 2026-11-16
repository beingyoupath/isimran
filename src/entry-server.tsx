import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import {
  CollectedHeadData,
  HeadCollectorProvider,
  serializeHeadDataToHtml,
} from "./components/SEO";

export interface RenderResult {
  html: string;
  headTags: string;
  headData: CollectedHeadData | null;
}

export function render(url: string): RenderResult {
  let collectedHead: CollectedHeadData | null = null;

  const rawHtml = renderToString(
    <HeadCollectorProvider
      onCollect={(data) => {
        collectedHead = data;
      }}
    >
      <AuthProvider>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </AuthProvider>
    </HeadCollectorProvider>
  );

  // React 19 renderToString prepends <link rel="preload" .../> hints when rendering a subtree.
  // Strip them from #root so SSR root children match client hydrateRoot 1:1.
  const floatedLinks: string[] = [];
  const html = rawHtml.replace(/^(?:<link\b[^>]*\/?>)+/i, (match) => {
    const matches = match.match(/<link\b[^>]*\/?>/gi);
    if (matches) {
      for (const linkTag of matches) {
        // index.html already preloads /images/hero-path.webp
        if (!linkTag.includes("/images/hero-path.webp")) {
          floatedLinks.push(linkTag);
        }
      }
    }
    return "";
  });

  const baseHeadTags = collectedHead
    ? serializeHeadDataToHtml(collectedHead)
    : `<title>Psychologist &amp; Counselling in Pune | Being You Path</title>`;

  const headTags =
    floatedLinks.length > 0
      ? `${baseHeadTags}\n    ${floatedLinks.join("\n    ")}`
      : baseHeadTags;

  return {
    html,
    headTags,
    headData: collectedHead,
  };
}
