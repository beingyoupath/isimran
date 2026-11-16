import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, Calendar } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../data/blogs";

export default function BlogIndex() {
  const breadcrumbs = [
    { name: "Blog & Articles", url: "/blog" },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SEO
        title="Mental Health Blog & Articles | Being You Path"
        description="Evidence-informed articles on anxiety, overthinking, burnout recovery, relationship communication, and psychological wellness in Pune and online."
        url="https://www.beingyoupath.com/blog"
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Header */}
      <section className="bg-white border-b border-stone-200/80 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-[#0B3A42] text-xs font-semibold mb-4">
              <BookOpen className="w-3.5 h-3.5 text-[#A43F23]" />
              <span>Evidence-Informed Psychology Insights</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#0B3A42] tracking-tight leading-tight mb-4">
              Mental Health &amp; Well-Being Articles
            </h1>
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
              Thoughtful, practical reflections on anxiety, emotional regulation, workplace burnout, and relationships from our counselling practitioners in Pune.
            </p>
          </div>
        </div>
      </section>

      {/* Categories & Articles Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
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
                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#0B3A42] mb-3 leading-snug">
                    <Link to={`/blog/${post.id}`} className="hover:text-[#A43F23] transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-6">
                    {post.overview}
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-600">{post.author}</span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-xs font-semibold text-[#A43F23] hover:text-[#823018] gap-1 group min-h-[36px]"
                  >
                    <span>Read full article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
