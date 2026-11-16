import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, CheckCircle2 } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import BookingForm from "../components/BookingForm";
import { BLOG_POSTS } from "../data/blogs";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.id === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const breadcrumbs = [
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.id}` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.overview,
    "author": {
      "@type": "Organization",
      "name": post.author || "Being You Path Editorial Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Being You Path",
      "url": "https://www.beingyoupath.com"
    },
    "datePublished": post.datePublished || "2026-11-01",
    "dateModified": post.datePublished || "2026-11-03"
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SEO
        title={`${post.title.slice(0, 42)} | Being You Path`}
        description={post.overview.slice(0, 155)}
        url={`https://www.beingyoupath.com/blog/${post.id}`}
        breadcrumbs={breadcrumbs}
        schema={articleSchema}
        articleMeta={{
          publishedTime: post.datePublished,
          modifiedTime: post.datePublished,
          author: post.author,
        }}
      />

      <Breadcrumbs items={breadcrumbs} />

      <article className="py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <header className="pb-8 border-b border-stone-200">
            <Link
              to="/blog"
              className="inline-flex items-center text-xs font-semibold text-[#0B3A42] hover:text-[#A43F23] gap-1 mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all articles</span>
            </Link>
            <div className="flex items-center gap-3 text-xs text-stone-600 mb-3">
              <span className="px-2.5 py-1 rounded-full bg-stone-100 text-[#0B3A42] font-semibold text-[11px]">
                {post.categoryLabel}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
              {post.datePublished && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.datePublished}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#0B3A42] tracking-tight leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
              {post.overview}
            </p>
          </header>

          {/* Body Content */}
          <div className="space-y-6 text-stone-800 leading-relaxed text-sm sm:text-base whitespace-pre-line">
            {post.body}
          </div>

          {/* Practical Tips Box */}
          {post.tips && post.tips.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 space-y-4">
              <h2 className="text-xl font-bold font-heading text-[#0B3A42]">
                Key Reflections &amp; Action Steps
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                {post.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {post.conclusion && (
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-stone-200 italic text-stone-700 text-sm sm:text-base">
              &quot;{post.conclusion}&quot;
            </div>
          )}

          {/* Consultation CTA */}
          <div className="pt-6">
            <BookingForm
              title="Speak with a Counsellor"
              subtitle="If this article resonated with you, reach out to schedule an in-person session in Pune or an online video consultation."
            />
          </div>
        </div>
      </article>
    </div>
  );
}
