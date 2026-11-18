import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  HelpCircle,
  BrainCircuit,
  Briefcase,
  Coffee,
  HeartHandshake,
  Waves,
  UserCheck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  BookOpen,
} from "lucide-react";
import { SEO } from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import resourcesHeroReadingImg from "../assets/images/resources_hero_reading_1794985548253.jpg";
import {
  RESOURCE_CATEGORIES,
  RESOURCE_ARTICLES,
  getArticleMeta,
} from "../data/resourcesData";

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [isTouchPaused, setIsTouchPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const breadcrumbs = [{ name: "Resources", url: "/resources" }];

  const heroSlides = [
    {
      focusLabel: "01 · Overthinking & Emotional Clarity",
      title: "Practical Well-Being — Written for the Way People Actually Live",
      subtitle:
        "Evidence-informed psychological frameworks for everyday life in Pune and across India.",
      desc: "Explore actionable guides to address overthinking, workplace burnout, relationship friction, self-esteem, and nervous-system regulation.",
    },
    {
      focusLabel: "02 · CBT & Behavioural Science",
      title: "Insights That Spark Concrete Behavioral Action",
      subtitle: "Move from getting by to intentional, grounded living.",
      desc: "Our clinical team distills behavioral science, Cognitive Behavioral Therapy (CBT), and secular mindfulness into practical tools you can use right away.",
    },
    {
      focusLabel: "03 · Work, Study & Boundaries",
      title: "Mental Hygiene & Tools for Modern Work and Study",
      subtitle: "Sustainable emotional resilience built on daily habits.",
      desc: "From understanding work burnout to setting clear boundaries with family, explore structured psychoeducational reading curated by our psychologists.",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const isCarouselPaused =
    isUserPaused ||
    isHoverPaused ||
    isFocusPaused ||
    isTouchPaused ||
    prefersReducedMotion;

  useEffect(() => {
    if (isCarouselPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isCarouselPaused, heroSlides.length]);

  const filteredArticles = useMemo(() => {
    return RESOURCE_ARTICLES.filter((article) => {
      const matchesCategory =
        activeCategory === "all" || article.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const bodyMatches = Array.isArray(article.body)
        ? article.body.some((b) => b.toLowerCase().includes(q))
        : (article.body || "").toLowerCase().includes(q);

      const matchesSearch =
        article.title.toLowerCase().includes(q) ||
        article.searchQuery.toLowerCase().includes(q) ||
        article.overview.toLowerCase().includes(q) ||
        bodyMatches ||
        article.keywords.some((k) => k.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "BrainCircuit":
        return <BrainCircuit className="w-4 h-4" />;
      case "Briefcase":
        return <Briefcase className="w-4 h-4" />;
      case "Coffee":
        return <Coffee className="w-4 h-4" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-4 h-4" />;
      case "Waves":
        return <Waves className="w-4 h-4" />;
      case "HelpCircle":
        return <HelpCircle className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SEO
        title="Psychology Articles & Guides | Being You Path"
        description="Evidence-based articles on stress, burnout, overthinking, relationships and everyday mental wellbeing."
        url="/resources"
        lcpImage={resourcesHeroReadingImg}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Header Carousel — All slides stay stacked in the raw HTML DOM; Slide 0 provides the single semantic <h1> */}
      <section
        className="section-dark bg-[#0B3A42] text-[#FAF9F6] py-12 md:py-16 relative overflow-hidden"
        onMouseEnter={() => setIsHoverPaused(true)}
        onMouseLeave={() => setIsHoverPaused(false)}
        onTouchStart={() => setIsTouchPaused(true)}
        onTouchEnd={() => setIsTouchPaused(false)}
      >
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E6A157]/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#165763]/50 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-amber-200 border border-white/10">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Clinical &amp; Psychoeducational Resource Library</span>
                </div>
                <span className="text-xs font-semibold tracking-wider text-white/75 tabular-nums">
                  {String(currentSlide + 1).padStart(2, "0")} of{" "}
                  {String(heroSlides.length).padStart(2, "0")}
                </span>
              </div>

              <div className="grid">
                {heroSlides.map((slide, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <motion.div
                      key={idx}
                      initial={false}
                      animate={
                        prefersReducedMotion
                          ? { opacity: isActive ? 1 : 0, y: 0 }
                          : {
                              opacity: isActive ? 1 : 0,
                              y: isActive ? 0 : 12,
                            }
                      }
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      aria-hidden={!isActive}
                      className={`col-start-1 row-start-1 ${
                        isActive
                          ? "pointer-events-auto relative z-10"
                          : "pointer-events-none select-none z-0"
                      }`}
                    >
                      {idx === 0 ? (
                        <>
                          <h1 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-200 mb-3 font-sans">
                            Psychology Articles &amp; Guides
                          </h1>
                          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#FAF9F6] tracking-tight leading-tight mb-4">
                            {slide.title}
                          </h2>
                        </>
                      ) : (
                        <>
                          <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-200 mb-3 font-sans">
                            {slide.focusLabel}
                          </p>
                          <p className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#FAF9F6] tracking-tight leading-tight mb-4">
                            {slide.title}
                          </p>
                        </>
                      )}
                      <p className="text-lg text-amber-100 font-medium mb-3">
                        {slide.subtitle}
                      </p>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl">
                        {slide.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-7">
                <div
                  className="flex items-center gap-1.5"
                  onFocusCapture={() => setIsFocusPaused(true)}
                  onBlurCapture={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                      setIsFocusPaused(false);
                    }
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentSlide((prev) =>
                        prev === 0 ? heroSlides.length - 1 : prev - 1
                      )
                    }
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF9F6] border border-white/25 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <div
                    className="flex items-center gap-1 px-1.5"
                    role="tablist"
                    aria-label="Resource header slides"
                  >
                    {heroSlides.map((_, idx) => {
                      const isActive = currentSlide === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentSlide(idx)}
                          className="group min-w-[24px] min-h-[40px] flex items-center justify-center px-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A157] rounded-md"
                          aria-label={`View slide ${idx + 1}`}
                          aria-current={isActive ? "true" : undefined}
                        >
                          <span
                            className={`relative block h-2.5 rounded-full overflow-hidden transition-all duration-300 ${
                              isActive
                                ? "w-9 bg-white/25"
                                : "w-2.5 bg-white/45 group-hover:bg-white/80"
                            }`}
                          >
                            {isActive && (
                              <motion.span
                                key={`pill-progress-${currentSlide}-${isCarouselPaused ? "paused" : "play"}`}
                                initial={{
                                  scaleX: isCarouselPaused ? 1 : 0,
                                }}
                                animate={{ scaleX: 1 }}
                                transition={{
                                  duration: isCarouselPaused ? 0 : 6,
                                  ease: "linear",
                                }}
                                style={{ transformOrigin: "left center" }}
                                className="absolute inset-0 bg-[#E6A157] rounded-full block"
                              />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
                    }
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF9F6] border border-white/25 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                {!prefersReducedMotion && (
                  <button
                    type="button"
                    onClick={() => setIsUserPaused((prev) => !prev)}
                    aria-pressed={isUserPaused}
                    className="min-h-[40px] px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF9F6] border border-white/25 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isUserPaused ? (
                      <>
                        <Play className="w-3.5 h-3.5 text-[#E6A157]" aria-hidden="true" />
                        <span>Play</span>
                      </>
                    ) : (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#E6A157]" aria-hidden="true" />
                        <span>Pause</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Curated Reading Hero Visual with subtle animated cadence */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#072B31] shadow-2xl aspect-[16/10] lg:aspect-[4/3]">
                <motion.img
                  src={resourcesHeroReadingImg}
                  alt="Hardcover psychology books, reading notebook, glasses, and chamomile tea by a sunlit window"
                  width={960}
                  height={540}
                  referrerPolicy="no-referrer"
                  initial={false}
                  animate={
                    prefersReducedMotion
                      ? { scale: 1 }
                      : { scale: currentSlide % 2 === 0 ? 1.04 : 1 }
                  }
                  transition={{ duration: 6, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07252A]/95 via-[#07252A]/25 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <motion.div
                    key={`visual-caption-${currentSlide}`}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="bg-[#0B3A42]/90 backdrop-blur-sm border border-white/15 rounded-2xl p-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#F8C988] truncate">
                        {heroSlides[currentSlide].focusLabel}
                      </p>
                      <p className="text-xs text-white/90 truncate mt-0.5">
                        {RESOURCE_ARTICLES.length} evidence-informed psychology guides
                      </p>
                    </div>
                    <BookOpen
                      className="w-5 h-5 text-[#E6A157] shrink-0"
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>

                {/* Self-advancing bottom cadence progress bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white/15 overflow-hidden"
                  aria-hidden="true"
                >
                  <motion.div
                    key={`bar-progress-${currentSlide}-${isCarouselPaused ? "paused" : "play"}`}
                    initial={{ scaleX: isCarouselPaused ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: isCarouselPaused ? 0 : 6,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: "left center" }}
                    className="h-full w-full bg-[#E6A157]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Category Tabs */}
      <section className="py-10 bg-white border-b border-stone-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="relative max-w-2xl">
            <Search className="w-5 h-5 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, symptom, question (e.g. overthinking, burnout, boundaries, sleep)..."
              aria-label="Search psychology articles and guides"
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-stone-50 border border-stone-200 text-sm text-[#2C3E50] focus:outline-none focus:ring-2 focus:ring-[#0B3A42] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-600 hover:text-stone-900 min-h-[36px] px-2"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {RESOURCE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 min-h-[44px] rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#0B3A42] text-white shadow-xs"
                    : "bg-stone-100 text-stone-800 hover:bg-stone-200"
                }`}
              >
                {getCategoryIcon(cat.iconName)}
                <span>{cat.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat.id
                      ? "bg-white/20 text-white"
                      : "bg-stone-200 text-stone-700"
                  }`}
                >
                  {cat.id === "all"
                    ? RESOURCE_ARTICLES.length
                    : RESOURCE_ARTICLES.filter((a) => a.category === cat.id)
                        .length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid — Each card links directly to its clean SSR/canonical /resources/:slug URL */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-stone-700">
              Showing <strong>{filteredArticles.length}</strong> of{" "}
              <strong>{RESOURCE_ARTICLES.length}</strong> clinical guides
            </p>
            {activeCategory !== "all" && (
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className="text-xs font-semibold text-[#A43F23] hover:underline min-h-[44px] px-2 cursor-pointer"
              >
                Reset to All Guides
              </button>
            )}
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-lg mx-auto">
              <HelpCircle className="w-12 h-12 text-stone-400 mx-auto mb-4" />
              <h2 className="text-lg font-bold font-heading text-[#0B3A42] mb-2">
                No matching guides found
              </h2>
              <p className="text-xs text-stone-600 mb-6">
                Try searching with different terms or select &ldquo;All Articles &amp; Guides&rdquo; to browse all topics.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="px-6 py-3 min-h-[44px] rounded-full bg-[#0B3A42] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                View All Articles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => {
                const meta = getArticleMeta(article);
                return (
                  <Link
                    key={article.id}
                    to={`/resources/${article.id}`}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-semibold text-[#0B3A42] bg-stone-100 px-3 py-1 rounded-full">
                          {article.categoryLabel}
                        </span>
                        <span className="text-[11px] text-stone-700 flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {article.readTime}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold font-heading text-[#0B3A42] group-hover:text-[#A43F23] transition-colors leading-snug mb-3">
                        {article.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4 line-clamp-3">
                        {article.overview}
                      </p>

                      <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80 mb-4">
                        <p className="text-[11px] text-stone-700 italic">
                          <strong>Common Question:</strong> &ldquo;
                          {article.searchQuery}&rdquo;
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {article.keywords.slice(0, 3).map((kw, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-medium text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-md"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>

                      <div className="text-[11px] text-stone-700 space-y-1 mb-4 pt-2.5 border-t border-stone-100">
                        <p className="flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-[#A43F23] shrink-0" aria-hidden="true" />
                          <span>
                            By <strong className="text-[#0B3A42]">{meta.author}</strong>
                            {meta.reviewedBy ? (
                              <>
                                {" "}
                                &middot; Reviewed by <strong className="text-[#0B3A42]">{meta.reviewedBy}</strong>
                              </>
                            ) : null}
                          </span>
                        </p>
                        {(meta.datePublished || meta.lastReviewed) && (
                          <p className="flex items-center gap-1.5 text-stone-600">
                            <Calendar className="w-3.5 h-3.5 text-[#A43F23] shrink-0" aria-hidden="true" />
                            <span>
                              {[
                                meta.datePublished ? `Published: ${meta.datePublished}` : null,
                                meta.lastReviewed ? `Last reviewed: ${meta.lastReviewed}` : null,
                              ]
                                .filter(Boolean)
                                .join(" · ")}
                            </span>
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#0B3A42] group-hover:text-[#A43F23]">
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
