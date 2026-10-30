import { useState, useEffect, useMemo } from "react";
import { 
  BrainCircuit, 
  Coffee, 
  Briefcase, 
  HeartHandshake, 
  Waves, 
  ArrowRight, 
  X, 
  Twitter, 
  Linkedin, 
  Mail, 
  Facebook, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle, 
  Search, 
  Sparkles,
  BookOpen,
  CheckCircle2,
  Share2,
  Clock,
  Tag,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { SEO } from "../components/SEO";
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost } from "../data/blogs";

export default function Resources() {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const heroSlides = [
    {
      title: "Practical Well-Being — Written for the Way People Actually Live",
      subtitle: "No jargon. No generic advice. Evidence-informed psychological frameworks for everyday life.",
      desc: "Explore actionable guides to overcome overthinking, conquer workplace burnout, heal relationship patterns, and regulate your nervous system in Pune and across India.",
      image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2787&auto=format&fit=crop"
    },
    {
      title: "Insights That Spark Concrete Behavioral Action",
      subtitle: "Move from 'just getting by' to intentional, grounded living.",
      desc: "Our clinical team distills behavioral science, Cognitive Behavioral Therapy (CBT), and somatic regulation into simple, practical tools you can implement immediately.",
      image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2874&auto=format&fit=crop"
    },
    {
      title: "Mental Hygiene & Tools for the High-Performing Mind",
      subtitle: "Equip yourself with sustainable emotional resilience.",
      desc: "From understanding executive burnout to establishing guilt-free boundaries with family, discover why preventative counselling is the highest-leverage investment.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    if (isHovered) return;
    const sliderTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(sliderTimer);
  }, [heroSlides.length, isHovered]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Filtered articles based on search query and selected category
  const filteredArticles = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTitle = post.title.toLowerCase().includes(q);
      const inQuery = post.searchQuery.toLowerCase().includes(q);
      const inOverview = post.overview.toLowerCase().includes(q);
      const inBody = post.body.toLowerCase().includes(q);
      const inKeywords = post.keywords.some((k) => k.toLowerCase().includes(q));

      return inTitle || inQuery || inOverview || inBody || inKeywords;
    });
  }, [selectedCategory, searchQuery]);

  // Article navigation in modal
  const selectedArticleIndex = selectedArticle 
    ? filteredArticles.findIndex(a => a.id === selectedArticle.id) 
    : -1;

  const handlePrevArticle = () => {
    if (selectedArticleIndex > 0) {
      setSelectedArticle(filteredArticles[selectedArticleIndex - 1]);
    } else {
      setSelectedArticle(filteredArticles[filteredArticles.length - 1]);
    }
  };

  const handleNextArticle = () => {
    if (selectedArticleIndex !== -1 && selectedArticleIndex < filteredArticles.length - 1) {
      setSelectedArticle(filteredArticles[selectedArticleIndex + 1]);
    } else {
      setSelectedArticle(filteredArticles[0]);
    }
  };

  // Category Icon helper
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "mind": return BrainCircuit;
      case "work": return Briefcase;
      case "routines": return Coffee;
      case "relationships": return HeartHandshake;
      case "somatic": return Waves;
      case "myths": return HelpCircle;
      default: return Sparkles;
    }
  };

  // Featured article (first featured or first article)
  const featuredArticle = useMemo(() => {
    return BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Mental Health Articles, Myth Busters & CBT Guides | #1 in Pune & India | Being You Path"
        description="Evidence-based mental health articles, therapy myth busters, and CBT advice from Being You Path, ranked #1 in Pune and top 5 in India. Explore practical tools for overthinking, burnout, relationships, and somatic grounding."
        keywords="mental health blog pune, best counselling centre in pune articles, psychology articles india, anxiety relief tips pune, self esteem therapy advice, cbt techniques india, burnout counselling pune, psychologist koregaon park pune"
      />
      <h1 className="sr-only">Mental Health Blog, Guides & Myth Busters - Ranked #1 in Pune & Top 5 in India | Being You Path</h1>
      <p className="sr-only">Read expert psychological insights, mental health guides, and wellness tips from the professionals at Being You Path, recognized as the best counselling centre in Pune, Maharashtra and top 5 across India. Explore articles on stress relief, cognitive behavioral practices, mindfulness, and authentic living.</p>
      
      {/* Hero Slider */}
      <section className="w-full bg-[#FAF8F5] py-10 md:py-14 lg:py-16 flex justify-center border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div 
            className="relative rounded-[32px] overflow-hidden shadow-xl flex flex-col bg-white border border-gray-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col lg:flex-row w-full min-h-[480px] lg:min-h-[500px]"
              >
                {/* Image Element */}
                <div className="w-full lg:w-5/12 h-[30vh] md:h-[40vh] lg:h-auto relative shrink-0">
                  <img 
                    src={heroSlides[currentSlide].image} 
                    alt={heroSlides[currentSlide].title}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
                </div>
                
                {/* Text Content Area */}
                <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-14 flex flex-col items-start justify-center relative z-20">
                  <div className="w-full max-w-2xl">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-terracotta/10 text-terracotta mb-4">
                      <Sparkles className="w-3.5 h-3.5" />
                      Evidence-Based Psychological Insights
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight font-bold text-deep-teal mb-4 font-heading tracking-tight">
                      {heroSlides[currentSlide].title}
                    </h2>
                    
                    <p className="text-base md:text-lg text-terracotta mb-4 font-semibold">
                      {heroSlides[currentSlide].subtitle}
                    </p>

                    <p className="text-charcoal-warm mb-8 leading-relaxed text-[15px] md:text-[16px]">
                      {heroSlides[currentSlide].desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                      <a 
                        href="#all-articles"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-deep-teal text-white hover:bg-terracotta transition-all text-sm font-semibold uppercase tracking-wider shadow-sm hover:shadow"
                      >
                        <BookOpen className="w-4 h-4" />
                        Explore All 24 Guides
                      </a>
                      <a 
                        href="https://wa.me/917387779238?text=Hi%20Being%20You%20Path%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20counselling%20and%20wellness%20sessions."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-deep-teal hover:border-terracotta hover:text-terracotta transition-all text-sm font-semibold uppercase tracking-wider"
                      >
                        <MessageSquare className="w-4 h-4 text-[#25D366]" />
                        Speak with a Psychologist
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 z-30">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md text-deep-teal hover:text-terracotta backdrop-blur-md flex items-center justify-center transition-all border border-gray-200"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 z-30">
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md text-deep-teal hover:text-terracotta backdrop-blur-md flex items-center justify-center transition-all border border-gray-200"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 right-8 z-30 flex gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx 
                      ? "bg-terracotta w-7" 
                      : "bg-gray-300 hover:bg-terracotta/60 w-2"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Editorial Spotlight Banner */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#FAF6F0] via-[#F4ECE1] to-[#FAF6F0] rounded-[24px] p-6 sm:p-8 md:p-10 border border-[#E8DACB] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  Featured Editorial Spotlight
                </span>
                <span className="px-3 py-1 bg-white/80 border border-[#DAC4B0] text-deep-teal text-xs font-medium rounded-full flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-terracotta" />
                  {featuredArticle.readTime}
                </span>
                <span className="px-3 py-1 bg-white/80 border border-[#DAC4B0] text-deep-teal text-xs font-medium rounded-full">
                  {featuredArticle.categoryLabel}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-deep-teal font-heading leading-snug">
                {featuredArticle.title}
              </h3>
              <p className="text-charcoal-warm text-sm sm:text-base leading-relaxed">
                {featuredArticle.overview}
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs text-charcoal-warm/80">
                <span className="font-semibold text-deep-teal">Common user query:</span>
                <span className="italic">"{featuredArticle.searchQuery}"</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedArticle(featuredArticle)}
              className="shrink-0 px-8 py-4 bg-terracotta hover:bg-deep-teal text-white font-semibold rounded-full text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              Read Full Guide
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Filter, Search & Articles Section */}
      <section id="all-articles" className="py-12 md:py-16 lg:py-20 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-terracotta font-semibold text-sm uppercase tracking-widest block mb-2">
              Mental Health & Well-Being Knowledge Base
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-deep-teal font-heading mb-4">
              Search & Explore Evidence-Based Articles
            </h2>
            <p className="text-charcoal-warm text-base md:text-lg">
              Practical psychological guidance, Cognitive Behavioral Therapy (CBT) frameworks, somatic protocols, and answers to common mental dilemmas.
            </p>
          </div>

          {/* Search Bar & Stats */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by keyword, question, or dilemma (e.g. overthinking, burnout, boundaries, sleep, CBT)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-full text-deep-teal placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 shadow-sm transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal-warm p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-deep-teal text-white shadow-sm"
                  : "bg-white text-charcoal-warm hover:bg-gray-100 border border-gray-200"
              }`}
            >
              All Topics ({BLOG_POSTS.length})
            </button>
            {BLOG_CATEGORIES.map((cat) => {
              const Icon = getCategoryIcon(cat.id);
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? "bg-deep-teal text-white shadow-sm"
                      : "bg-white text-charcoal-warm hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-amber-glow" : "text-terracotta"}`} />
                  {cat.title.split(",")[0]} ({cat.articleCount})
                </button>
              );
            })}
          </div>

          {/* Results Summary Counter */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <span className="text-xs sm:text-sm text-charcoal-warm font-medium">
              Showing <strong className="text-deep-teal">{filteredArticles.length}</strong> {filteredArticles.length === 1 ? "article" : "articles"}
              {searchQuery && (
                <span> for <strong className="text-terracotta">"{searchQuery}"</strong></span>
              )}
            </span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="text-xs font-semibold text-terracotta hover:underline"
              >
                Clear Search
              </button>
            )}
          </div>

          {/* Balanced Article Cards Grid - Eliminating All Blank Spaces */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <SkeletonLoader />
                </div>
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="bg-white rounded-[24px] p-12 text-center border border-gray-200 max-w-xl mx-auto shadow-sm">
              <BrainCircuit className="w-12 h-12 text-terracotta mx-auto mb-4" />
              <h3 className="text-xl font-bold text-deep-teal font-heading mb-2">No matching guides found</h3>
              <p className="text-charcoal-warm text-sm mb-6">
                We couldn't find an article matching "{searchQuery}". Try searching for terms like "anxiety", "burnout", "boundaries", "sleep", or "overthinking".
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-2.5 bg-terracotta text-white font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-deep-teal transition-all"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => {
                const Icon = getCategoryIcon(article.category);
                return (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                    className="bg-white rounded-[24px] p-6 sm:p-7 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group hover:border-terracotta/40"
                  >
                    {/* Card Top: Badges & Read Time */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-soft-sand rounded-full text-xs font-semibold text-deep-teal">
                          <Icon className="w-3.5 h-3.5 text-terracotta" />
                          {article.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-charcoal-warm/75">
                          <Clock className="w-3.5 h-3.5 text-terracotta" />
                          {article.readTime}
                        </div>
                      </div>

                      {/* Card Title */}
                      <h3 className="text-lg sm:text-[19px] font-bold text-deep-teal font-heading leading-snug mb-3 group-hover:text-terracotta transition-colors">
                        {article.title}
                      </h3>

                      {/* User Query Solved Box */}
                      <div className="bg-[#F8F6F0] rounded-xl p-3 border border-[#EAE3D2] mb-3.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta block mb-0.5">
                          Answers User Query
                        </span>
                        <p className="text-xs text-deep-teal font-medium italic line-clamp-1">
                          "{article.searchQuery}"
                        </p>
                      </div>

                      {/* Overview Excerpt */}
                      <p className="text-sm text-charcoal-warm leading-relaxed line-clamp-3 mb-4">
                        {article.overview}
                      </p>

                      {/* Key Keyword Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {article.keywords.slice(0, 3).map((keyword, kidx) => (
                          <span 
                            key={kidx}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-gray-50 border border-gray-200 text-[11px] text-charcoal-warm/80 font-medium"
                          >
                            <Tag className="w-2.5 h-2.5 text-terracotta/70" />
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Bottom: Action Button */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-terracotta hover:text-deep-teal transition-colors group-hover:translate-x-0.5"
                      >
                        Read Full Guide & Tools
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      {article.badge && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-amber-glow/20 text-[#8C4A15] rounded">
                          {article.badge}
                        </span>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          {/* Direct Consultation Callout Footer */}
          <div className="mt-14 bg-deep-teal text-white rounded-[28px] p-8 md:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-glow block mb-2">
                Need Personalized Support?
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading mb-3">
                Connect with Imran Hussain & Tejaswini at Being You Path
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Reading articles provides helpful cognitive clarity, but uncovering the subconscious root triggers is the other half of your journey. Available in Koregaon Park, Pune and online across India.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="https://wa.me/917387779238?text=Hi%20Being%20You%20Path%2C%20I%20read%20your%20articles%20and%20would%20like%20to%20consult%20with%20a%20psychologist."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-full text-xs sm:text-sm uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <Link
                to="/contact"
                className="px-6 py-3.5 bg-terracotta hover:bg-amber-glow text-white font-semibold rounded-full text-xs sm:text-sm uppercase tracking-wider text-center transition-all shadow-md"
              >
                Book 1-on-1 Session
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Newsletter Signup Area */}
      <section id="newsletter" className="py-12 md:py-16 bg-[#F4EFE6] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            whileHover={{ scale: 1.005 }}
            className="bg-white/80 border border-amber-glow/30 rounded-[32px] p-8 sm:p-12 text-center shadow-sm backdrop-blur-sm"
          >
            <span className="text-terracotta font-semibold text-xs uppercase tracking-widest block mb-2">
              Weekly Psychology Digest
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-teal mb-4 font-heading">
              Get One Practical Well-Being Framework Per Week
            </h2>
            <p className="text-base text-charcoal-warm mb-8 max-w-2xl mx-auto leading-relaxed">
              One short, research-informed piece on overcoming mental barriers, managing emotions, and living intentionally. No spam. Unsubscribe anytime.
            </p>
            
            {isSubscribed ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-green-200 text-center"
              >
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-deep-teal mb-2 font-heading">You're Subscribed!</h3>
                <p className="text-charcoal-warm text-sm mb-6">
                  We'll send practical psychological tools directly to <strong className="text-deep-teal">{email}</strong>. 
                  You can also join our direct WhatsApp Community for daily reflections.
                </p>
                <a 
                  href="https://whatsapp.com/channel/0029VbCcrrzHAdNY1M7MEF31" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold rounded-full text-white bg-[#25D366] hover:bg-[#128C7E] transition-all uppercase tracking-wider w-full sm:w-auto shadow gap-2"
                >
                  Join Official WhatsApp Channel
                </a>
              </motion.div>
            ) : (
              <form 
                className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3" 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setIsSubscribed(true);
                }}
              >
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow px-6 py-3.5 rounded-full border border-gray-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 bg-white text-deep-teal outline-none transition-all text-sm"
                />
                <button 
                  type="submit"
                  className="px-8 py-3.5 bg-terracotta text-white font-semibold rounded-full hover:bg-deep-teal transition-all whitespace-nowrap shadow uppercase tracking-wider text-xs"
                >
                  Subscribe Free &rarr;
                </button>
              </form>
            )}
            {!isSubscribed && (
              <p className="text-xs text-charcoal-warm/70 mt-4">We respect your privacy. 100% spam-free guarantee.</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Comprehensive Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 pb-16">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-charcoal-warm/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-[24px] shadow-2xl z-10 flex flex-col border border-gray-100"
            >
              {/* Modal Sticky Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex justify-between items-center z-20 rounded-t-[24px]">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-terracotta/10 text-terracotta text-xs font-bold uppercase tracking-wider rounded-full">
                    {selectedArticle.categoryLabel}
                  </span>
                  <span className="text-xs text-charcoal-warm/70 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-terracotta" />
                    {selectedArticle.readTime}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-400 hover:text-terracotta transition-colors bg-gray-100 hover:bg-gray-200 rounded-full p-1.5"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Modal Body Content */}
              <div className="p-6 sm:p-8 md:p-10">
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-deep-teal leading-tight mb-4">
                  {selectedArticle.title}
                </h2>

                {/* Question Answered Box */}
                <div className="bg-[#FAF7F0] border-l-4 border-terracotta p-4 rounded-r-xl mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta block mb-1">
                    Direct Search Query Solved:
                  </span>
                  <p className="text-sm font-semibold text-deep-teal italic">
                    "{selectedArticle.searchQuery}"
                  </p>
                </div>

                {/* Overview Box */}
                <div className="mb-6">
                  <p className="text-base sm:text-lg text-deep-teal font-medium leading-relaxed bg-soft-sand/60 p-4 rounded-xl border border-amber-glow/20">
                    {selectedArticle.overview}
                  </p>
                </div>

                {/* Comprehensive Body Content */}
                <div className="mb-8 space-y-4 text-charcoal-warm leading-relaxed text-sm sm:text-base">
                  <p>{selectedArticle.body}</p>
                </div>

                {/* Actionable Practical Tools Box */}
                <div className="mb-8 bg-[#F6F4ED] p-6 sm:p-8 rounded-2xl border border-[#E3DCB8]">
                  <h4 className="text-base sm:text-lg font-bold font-heading text-deep-teal mb-4 flex items-center">
                    <BrainCircuit className="w-5 h-5 mr-2.5 text-terracotta" />
                    Practical Tools & Interventions to Apply
                  </h4>
                  <div className="space-y-4">
                    {selectedArticle.tips.map((tip: string, idx: number) => {
                      const tipParts = tip.split(':');
                      const hasTitle = tipParts.length > 1;
                      const title = hasTitle ? tipParts[0] : '';
                      const desc = hasTitle ? tipParts.slice(1).join(':') : tip;
                      
                      return (
                        <div key={idx} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-terracotta mt-2 mr-3 flex-shrink-0" />
                          <p className="text-charcoal-warm leading-relaxed text-sm sm:text-[15px]">
                            {hasTitle ? (
                              <><strong className="text-deep-teal font-semibold">{title}:</strong>{desc}</>
                            ) : (
                              tip
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Takeaway / Conclusion */}
                <div className="mb-8 p-5 bg-white rounded-xl border border-gray-200">
                  <h4 className="text-sm uppercase font-bold tracking-widest text-terracotta mb-2">The Clinical Takeaway</h4>
                  <p className="text-charcoal-warm leading-relaxed italic text-base sm:text-lg font-medium">
                    "{selectedArticle.conclusion}"
                  </p>
                </div>

                {/* Article Keywords */}
                <div className="mb-8">
                  <span className="text-xs font-semibold text-deep-teal block mb-2">Related Topics & Keywords:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.keywords.map((kw, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 bg-gray-100 rounded-md text-charcoal-warm font-medium">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Next / Previous Article Navigation */}
                <div className="mb-8 border-t border-gray-200 pt-6 flex items-center justify-between">
                  <button 
                    onClick={handlePrevArticle} 
                    className="text-terracotta hover:text-deep-teal font-semibold text-xs sm:text-sm flex items-center uppercase tracking-wider transition-colors group"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                    Previous Guide
                  </button>
                  <button 
                    onClick={handleNextArticle} 
                    className="text-terracotta hover:text-deep-teal font-semibold text-xs sm:text-sm flex items-center uppercase tracking-wider transition-colors group"
                  >
                    Next Guide
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Social Share Bar */}
                <div className="mb-8 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs font-bold text-deep-teal uppercase tracking-widest flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-terracotta" />
                    Share this Guide
                  </span>
                  <div className="flex gap-3">
                    <a 
                      href={`https://wa.me/?text=${encodeURIComponent(selectedArticle.title + " - " + window.location.origin + '/resources')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all"
                      aria-label="Share on WhatsApp"
                      title="Share on WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/resources')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-blue-50 text-[#1877F2] hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-4 h-4" fill="currentColor" />
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedArticle.title)}&url=${encodeURIComponent(window.location.origin + '/resources')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-sky-50 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-all"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-4 h-4" fill="currentColor" />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/resources')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-blue-50 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-all"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" fill="currentColor" />
                    </a>
                    <a 
                      href={`mailto:?subject=${encodeURIComponent(selectedArticle.title)}&body=${encodeURIComponent("Read this insight from Being You Path:\n\n" + window.location.origin + '/resources')}`}
                      className="w-9 h-9 rounded-full bg-orange-50 text-terracotta hover:bg-terracotta hover:text-white flex items-center justify-center transition-all"
                      aria-label="Share via Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                {/* 1-on-1 Consultation Callout */}
                <div className="pt-8 border-t border-gray-200 flex flex-col items-center text-center bg-[#FAF8F5] -mx-6 sm:-mx-8 md:-mx-10 -mb-6 sm:-mb-8 md:-mb-10 p-8 rounded-b-[24px]">
                  <h4 className="text-xl sm:text-2xl font-bold text-deep-teal font-heading mb-2">
                    Ready to uncover the root cause with our psychologists?
                  </h4>
                  <p className="text-charcoal-warm mb-6 max-w-lg text-sm sm:text-base leading-relaxed">
                    Reading provides half the picture; personalized psychological support in Pune gives you the second half. Book a 1-on-1 clarity session today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://wa.me/917387779238?text=Hi%20Being%20You%20Path%2C%20I%20would%20like%20to%20discuss%20a%20counselling%20session%20after%20reading%20your%20articles."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold rounded-full text-white bg-[#25D366] hover:bg-[#128C7E] transition-all uppercase tracking-wider shadow"
                    >
                      Chat on WhatsApp (+91 7387779238)
                    </a>
                    <Link
                      to="/contact"
                      onClick={() => setSelectedArticle(null)}
                      className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold rounded-full text-white bg-terracotta hover:bg-deep-teal transition-all uppercase tracking-wider shadow"
                    >
                      Book A Clarity Call &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
