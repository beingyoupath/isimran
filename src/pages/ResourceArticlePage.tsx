import { Link, useParams } from "react-router-dom";
import {
  Clock,
  Calendar,
  UserCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { RESOURCE_ARTICLES, getArticleMeta } from "../data/resourcesData";
import { buildArticleSchema, CALENDLY_URL, TELE_MANAS_NOTICE } from "../lib/seoConfig";
import NotFound from "./NotFound";

export default function ResourceArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const articleIndex = RESOURCE_ARTICLES.findIndex((a) => a.id === slug);
  const article = articleIndex >= 0 ? RESOURCE_ARTICLES[articleIndex] : undefined;

  if (!article) {
    return <NotFound />;
  }

  const meta = getArticleMeta(article);
  const canonicalPath = `/resources/${article.id}`;
  const breadcrumbs = [
    { name: "Resources", url: "/resources" },
    { name: article.title, url: canonicalPath },
  ];

  const prevArticle =
    articleIndex > 0 ? RESOURCE_ARTICLES[articleIndex - 1] : null;
  const nextArticle =
    articleIndex < RESOURCE_ARTICLES.length - 1
      ? RESOURCE_ARTICLES[articleIndex + 1]
      : null;

  const cleanTitle =
    article.title.length > 43
      ? `${article.title.slice(0, 39).trim()}... | Being You Path`
      : `${article.title} | Being You Path`;

  const cleanDesc =
    article.overview.length > 155
      ? `${article.overview.slice(0, 152).trim()}...`
      : article.overview;

  const articleSchema = buildArticleSchema({
    title: article.title,
    description: cleanDesc,
    path: canonicalPath,
    authorName: meta.author,
    datePublished: meta.datePublished,
    dateModified: meta.lastReviewed,
  });

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#2C3E50]">
      <SEO
        title={cleanTitle}
        description={cleanDesc}
        url={canonicalPath}
        breadcrumbs={breadcrumbs}
        schema={articleSchema}
        articleMeta={{
          publishedTime: meta.datePublished,
          modifiedTime: meta.lastReviewed,
          author: meta.author,
        }}
      />

      <Breadcrumbs items={breadcrumbs} />

      <article className="py-8 md:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Link
            to="/resources"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B3A42] hover:text-[#A43F23] min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>All Psychology Articles &amp; Guides</span>
          </Link>

          <header className="space-y-4 pb-6 border-b border-stone-200">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#0B3A42] text-white font-semibold">
                {article.categoryLabel}
              </span>
              <span className="inline-flex items-center gap-1 text-stone-700 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#A43F23]" aria-hidden="true" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#0B3A42] leading-tight">
              {article.title}
            </h1>

            <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs text-stone-700 flex flex-wrap gap-x-6 gap-y-2">
              <span className="inline-flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#A43F23]" aria-hidden="true" />
                <span>
                  Author: <strong className="text-[#0B3A42]">{meta.author}</strong> ({meta.authorRole})
                </span>
              </span>
              <span>
                Reviewed by: <strong className="text-[#0B3A42]">{meta.reviewedBy}</strong>
              </span>
              <span>Published: {meta.datePublished}</span>
              <span>Last reviewed: {meta.lastReviewed}</span>
            </div>

            {article.keywords && article.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {article.keywords.slice(0, 3).map((kw, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium text-stone-700 bg-stone-100 px-3 py-1 rounded-full"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Overview */}
          <div className="text-base sm:text-lg font-medium text-stone-900 border-l-4 border-[#A43F23] pl-4 leading-relaxed">
            {article.overview}
          </div>

          {/* Search Query / Question */}
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs sm:text-sm text-stone-800">
            <strong className="text-[#0B3A42] block mb-1">
              Common question explored in sessions:
            </strong>
            <p className="italic">&ldquo;{article.searchQuery}&rdquo;</p>
          </div>

          {/* Main Article Body */}
          <div className="space-y-4 text-sm sm:text-base text-stone-800 leading-relaxed">
            {Array.isArray(article.body) ? (
              article.body.map((para, idx) => <p key={idx}>{para}</p>)
            ) : (
              <p>{article.body}</p>
            )}
          </div>

          {/* Practical Takeaways */}
          {article.tips && article.tips.length > 0 && (
            <section className="bg-white p-6 rounded-3xl border border-stone-200 space-y-3">
              <h2 className="text-lg font-bold font-heading text-[#0B3A42] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#A43F23]" aria-hidden="true" />
                <span>Practical Steps to Try</span>
              </h2>
              <ul className="space-y-2.5 text-sm text-stone-700">
                {article.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#A43F23] font-bold">&bull;</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Conclusion */}
          <section className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-2">
            <h2 className="text-lg font-bold font-heading text-[#0B3A42]">
              Clinical Perspective
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              {article.conclusion}
            </p>
          </section>

          {/* 2-3 Relevant Internal Service Links + Pillar Guide */}
          <section className="bg-white p-6 rounded-3xl border border-stone-200 space-y-3">
            <h2 className="text-base font-bold font-heading text-[#0B3A42] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#A43F23]" aria-hidden="true" />
              <span>Relevant Counselling Services &amp; Guides</span>
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {meta.relatedServices.map((srv) => (
                <Link
                  key={srv.to}
                  to={srv.to}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-full bg-stone-50 hover:bg-stone-100 border border-stone-200 text-xs font-semibold text-[#0B3A42] transition-colors"
                >
                  <span>{srv.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              ))}
              <Link
                to="/guides/how-to-choose-a-psychologist-pune"
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-semibold text-[#0B3A42] transition-colors"
              >
                <span>How to Choose a Psychologist or Counsellor in Pune</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </section>

          {/* Closing CTA */}
          <section className="section-dark bg-[#0B3A42] text-[#FAF9F6] p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold font-heading text-[#FAF9F6]">
                Book a free 15-minute clarity call
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF9F6]">
                Speak with Imran Hussain or Tejaswini Joshi in Pune (Deccan Gymkhana) or online across India.
              </p>
            </div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#E6A157] hover:bg-[#d69147] text-[#0B3A42] text-xs font-bold uppercase tracking-wider shrink-0 transition-colors"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Book Clarity Call</span>
            </a>
          </section>

          {/* Crisis Note */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-stone-700 leading-relaxed">
            <strong className="text-[#0B3A42]">Note:</strong> {TELE_MANAS_NOTICE}
          </div>

          {/* Prev / Next Navigation */}
          <nav className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
            {prevArticle ? (
              <Link
                to={`/resources/${prevArticle.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B3A42] hover:text-[#A43F23] min-h-[44px] max-w-xs"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{prevArticle.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {nextArticle && (
              <Link
                to={`/resources/${nextArticle.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B3A42] hover:text-[#A43F23] min-h-[44px] max-w-xs ml-auto"
              >
                <span className="truncate">{nextArticle.title}</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </Link>
            )}
          </nav>
        </div>
      </article>
    </div>
  );
}
