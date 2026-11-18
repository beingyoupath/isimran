import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import SEO from "../components/SEO";
import { GOOGLE_REVIEWS } from "../data/testimonials";
import serviceGenZWorkplaceImg from "../assets/images/service_genz_workplace_1794985547582.jpg";
import {
  CLINIC_ADDRESS,
  CLINIC_HOURS_LABEL,
  GBP_URL,
  LOCAL_BUSINESS_SCHEMA,
  TELE_MANAS_NOTICE,
} from "../lib/seoConfig";
import {
  Quote,
  Star,
  ChevronDown,
  ChevronUp,
  Check,
  Copy,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  GraduationCap,
  CircleHelp,
  BookOpen,
  Coffee,
  Users,
  HeartHandshake,
  Compass,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Share2,
  PhoneCall,
} from "lucide-react";
import {
  DailyThoughtResult,
  buildCopyThoughtText,
  buildWhatsAppThoughtShareUrl,
  getDailyThoughtIST,
  msUntilNextISTMidnight,
} from "../lib/thoughts";

export const HOME_FAQS = [
  {
    question: "How much do counselling sessions cost and is there a free call first?",
    answer:
      "We always begin with a free 15-minute clarity call so you can speak with us, ask questions, and decide if we feel like the right fit before booking anything. Regular 50–60 minute individual sessions and 75-minute couples sessions have fees shared transparently during that call based on the format (in person in Pune or online across India).",
  },
  {
    question: "What happens in the first counselling session?",
    answer:
      "Our first 50–60 minute session is calm, unhurried, and structured around listening. We ask about what brought you here, your sleep, work or study routines, and what feels hardest right now. You do not need to share everything at once—by the end of the session we outline initial themes and a practical plan together.",
  },
  {
    question: "What is the difference between CBT and regular talk therapy?",
    answer:
      "Traditional talk therapy focuses mainly on exploring thoughts, feelings, and past context in conversation. Cognitive Behavioural Therapy (CBT) is active and structured: alongside listening warmly, we map specific thought loops and daily habits, practise measurable tools between sessions, and focus on steady, real-life change.",
  },
  {
    question: "Should I choose online therapy or in-person sessions in Pune?",
    answer:
      "Both formats offer the same clinical depth and confidentiality. Choose in-person visits at our Deccan Gymkhana clinic near Prabhat Road, Pune if you prefer stepping into a quiet room away from home. Choose online video therapy if you live elsewhere in India, commute long distances, or need evening and weekend flexibility.",
  },
  {
    question: "Is everything I share completely confidential?",
    answer:
      "Your information is confidential. Exceptions are limited and set by law, for example serious risk of harm, a legal duty to report abuse, or a court order.",
  },
];



const CORE_PILLARS = [
  {
    title: "Modern Psychology",
    subtitle: "Grounded in Science",
    description:
      "Using evidence-based therapeutic techniques like Cognitive Behavioural Therapy (CBT) and Positive Psychology, we help you understand your mind, rewire unhelpful thought patterns, and build genuine emotional resilience without the heavy jargon.",
  },
  {
    title: "Secular Mindfulness",
    subtitle: "Attention & Regulation",
    description:
      "Practical, accessible attention training for the real world. Learn how to regulate your nervous system, pause before reacting, and navigate high-stress environments without needing to retreat to a mountaintop.",
  },
  {
    title: "Ancient Wisdom",
    subtitle: "Meaning & Purpose",
    description:
      "We translate timeless, profound historical insights into actionable modern frameworks. Because beyond fixing what's broken, true well-being is about finding deeper connection, purpose, and clarity in your everyday life.",
  },
  {
    title: "Body-Mind Awareness",
    subtitle: "Breath & Nervous System",
    description:
      "Learning to notice the physical sensations of emotion, understanding how stress shows up in the body, and using paced breathing and grounding techniques to restore physical and emotional equilibrium.",
  },
  {
    title: "Behavioral Integration",
    subtitle: "Sustainable Habits",
    description:
      "Moving beyond insight to action. We focus on creating structured, consistent, and resilient daily habits that reinforce your well-being journey and align your behaviors with your deepest values.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [isPillarPaused, setIsPillarPaused] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [copiedQuote, setCopiedQuote] = useState(false);

  const [dailyThought, setDailyThought] = useState<DailyThoughtResult | null>(null);

  const reviews = GOOGLE_REVIEWS;

  useEffect(() => {
    let midnightTimer: ReturnType<typeof setTimeout> | undefined;

    const refreshDailyThought = () => {
      setDailyThought(getDailyThoughtIST(new Date()));
      midnightTimer = setTimeout(refreshDailyThought, msUntilNextISTMidnight());
    };

    refreshDailyThought();

    return () => {
      if (midnightTimer) clearTimeout(midnightTimer);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  useEffect(() => {
    if (isPillarPaused) return;
    const timer = setInterval(() => {
      setActivePillarIndex((prev) => (prev + 1) % CORE_PILLARS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPillarPaused]);

  const currentPractice = dailyThought?.practice || null;
  const currentThought = dailyThought?.thought || null;

  const handleCopyQuote = () => {
    if (!currentThought) return;
    const text = buildCopyThoughtText(currentThought);
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopiedQuote(true);
          setTimeout(() => setCopiedQuote(false), 2000);
        })
        .catch(() => {});
    }
  };

  const audienceCards = [
    {
      icon: Briefcase,
      title: "Working Professional / Businessmen",
      desc: "Productive on paper but running on empty inside — managing deadlines, businesses, and expectations while quietly wondering if this is it.",
      image: "/images/audience-professional.webp",
      alt: "Working professional in Pune reflecting on career clarity and work-life balance",
    },
    {
      icon: GraduationCap,
      title: "Student / Young Adult",
      desc: "Navigating performance pressure, future uncertainty, identity questions, and the gap between who you are and who everyone expects you to be.",
      image: "/images/audience-student.webp",
      alt: "Young adult student studying with calm focus and guidance",
    },
    {
      icon: Users,
      title: "Parent / Bachelor or Single",
      desc: "Whether navigating the chaos of raising kids or trying to find balance and purpose on your own — realising no one handed you a manual for life.",
      image: "/images/family-parenting.webp",
      alt: "Warm family conversation representing parenting and personal well-being support",
    },
    {
      icon: HeartHandshake,
      title: "HR / Team Lead or Manager",
      desc: "Knows culture and well-being matter, and wants evidence-based, practical solutions for their team — not wellness fluff.",
      image: serviceGenZWorkplaceImg,
      alt: "Workplace team collaborating in a supportive wellness workshop",
    },
  ];

  const pathCards = [
    {
      icon: Compass,
      title: "Career Counselling & Clarity",
      desc: "For professionals stuck or burning out",
      path: "/services/career-counselling-pune",
    },
    {
      icon: Briefcase,
      title: "Employee Well-Being Workshops",
      desc: "For organisations that take people seriously",
      path: "/workshops",
    },
    {
      icon: GraduationCap,
      title: "Student Support & Exam Stress",
      desc: "For young adults navigating pressure",
      path: "/services/student-adolescent-counselling-pune",
    },
    {
      icon: ShieldCheck,
      title: "Stress & Anxiety Counselling",
      desc: "Calm chronic worry, panic, and tension",
      path: "/services/stress-anxiety-counselling-pune",
    },
    {
      icon: HeartHandshake,
      title: "CBT & Self-Esteem Therapy",
      desc: "Train attention. Change unhelpful loops.",
      path: "/services/cbt-therapy-pune",
    },
    {
      icon: Layers,
      title: "Burnout & Workplace Stress",
      desc: "Practical recovery and healthy boundaries",
      path: "/services/burnout-counselling-pune",
    },
  ];

  return (
    <div className="bg-soft-sand">
      <SEO
        title="Psychologist & Counselling in Pune | Being You Path"
        description="CBT & counselling in Pune and online across India, led by a psychologist with clinical training at NIMHANS. Book a free 15-min clarity call."
        url="/"
        lcpImage="/images/hero-path.webp"
        locale="en_IN"
        alternates={[
          { hreflang: "en-IN", href: "/" },
          { hreflang: "hi-IN", href: "/hi" },
          { hreflang: "x-default", href: "/" },
        ]}
        schema={[LOCAL_BUSINESS_SCHEMA]}
        faqs={HOME_FAQS}
      />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="w-full bg-soft-sand pt-12 pb-12 lg:pt-16 lg:pb-16 flex justify-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row bg-white">
            <div className="w-full lg:w-5/12 h-[40vh] md:h-[50vh] lg:h-auto min-h-[350px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B3A42]/30 via-transparent to-[#0B3A42]/10 z-10 transition-opacity duration-700 ease-in-out" />
              <motion.img
                src="/images/hero-path.webp"
                alt="Quiet pathway in morning light representing psychological counselling at Being You Path in Pune"
                width={1200}
                height={800}
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover origin-center"
                style={{ y: heroImgY, scale: heroImgScale }}
              />
            </div>

            <motion.div
              style={{ y: heroTextY, opacity: heroTextOpacity }}
              className="w-full lg:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col items-center lg:items-start text-center lg:text-left justify-center relative z-20 bg-white"
            >
              <div className="w-full max-w-2xl mx-auto lg:mx-0">
                <h1 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-terracotta mb-3 font-sans">
                  Psychologist &amp; Counselling Centre in Pune
                </h1>
                <h2 className="text-4xl md:text-[48px] lg:text-[52px] xl:text-[56px] leading-tight font-bold text-deep-teal mb-6 font-heading tracking-tight">
                  Feel Clearer. Think Better. Live With More Purpose.
                </h2>
                <p className="text-xl md:text-[26px] md:leading-[34px] text-charcoal-warm mb-6 font-semibold font-heading">
                  Evidence-informed well-being support for the way real life actually feels.
                </p>
                <p className="text-lg text-charcoal-warm mb-10 leading-relaxed">
                  You don&apos;t need to be in crisis to deserve support. Maybe you&apos;re tired in ways sleep doesn&apos;t fix. Maybe you&apos;re doing everything right but feel nothing clicking. Maybe you&apos;re good at your job but lost on the inside.
                  <br />
                  <br />
                  Being You Path™ blends modern psychology, mindfulness, and practical everyday science into support that&apos;s grounded, warm, and built for real people. No jargon. Just clarity, direction, and tools that work.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 text-base tracking-wide font-medium rounded-[50px] text-white bg-terracotta hover:bg-[#823018] transition-all uppercase shadow-md hover:shadow-lg w-full sm:w-auto"
                  >
                    → Book Your Free Clarity Call
                  </Link>
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center px-8 py-4 text-base tracking-wide font-medium rounded-[50px] text-terracotta border-2 border-terracotta hover:bg-terracotta hover:text-white transition-all uppercase shadow-sm hover:shadow-md w-full sm:w-auto"
                  >
                    → Explore What We Do
                  </Link>
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs font-semibold">
                  <Link
                    to="/guides/how-to-choose-a-psychologist-pune"
                    className="text-deep-teal hover:text-terracotta underline underline-offset-4 py-1"
                  >
                    How to choose a psychologist in Pune &rarr;
                  </Link>
                  <Link
                    to="/hi"
                    hrefLang="hi-IN"
                    className="text-terracotta hover:text-deep-teal underline underline-offset-4 py-1"
                  >
                    हिन्दी में देखें (Hindi)
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-[44px] font-semibold text-deep-teal mb-4 font-heading">
              You&apos;re In The Right Place If...
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audienceCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-soft-sand rounded-[16px] border-t-4 border-t-terracotta border-x border-b border-gray-200 shadow-sm hover-lift group overflow-hidden flex flex-col"
              >
                <div className="h-48 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  <img
                    src={card.image}
                    alt={card.alt}
                    width={800}
                    height={480}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4">
                    <card.icon
                      className="text-terracotta w-8 h-8 group-hover:scale-110 transition-transform duration-300 ease-out icon-scale"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-deep-teal mb-3 font-heading">
                    {card.title}
                  </h3>
                  <p className="text-charcoal-warm text-[15px]">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Model Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-[36px] font-semibold text-deep-teal mb-6 font-heading leading-tight">
              Not a clinic. Not a coach.
              <br />
              Something more integrated.
            </h2>
          </div>
          <div className="lg:w-1/2">
            <p className="text-lg text-charcoal-warm mb-10 leading-relaxed">
              Most well-being services give you one lens. Therapy looks at the past. Coaching looks at goals. Meditation apps give you breathing exercises. We bring all three together — in a way that&apos;s practical, personalised, and grounded in how minds actually work.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <HeartHandshake className="w-8 h-8 text-terracotta flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <span className="font-semibold text-charcoal-warm text-lg">
                  Psychology-Grounded (CBT, Positive, Counselling)
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Compass className="w-8 h-8 text-terracotta flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <span className="font-semibold text-charcoal-warm text-lg">
                  Mindfulness-Based (Secular, Attention Training)
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Layers className="w-8 h-8 text-terracotta flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <span className="font-semibold text-charcoal-warm text-lg">
                  Behavioural Science (Habits, Environment, Friction)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Your Path Grid */}
      <section className="py-12 md:py-16 lg:py-20 bg-soft-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-[44px] font-semibold text-deep-teal mb-4 font-heading">
              Find Your Path
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pathCards.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="group bg-white p-8 rounded-[16px] border border-gray-100 shadow-sm hover-lift flex flex-col h-full block"
              >
                <item.icon className="w-8 h-8 text-terracotta mb-6 icon-scale" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="text-[24px] font-medium text-deep-teal mb-3 font-heading group-hover:text-terracotta transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-charcoal-warm mb-8 flex-grow">{item.desc}</p>
                <span className="text-terracotta font-medium flex items-center mt-auto uppercase text-sm tracking-wide">
                  Learn More →{" "}
                  <ChevronRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-stone-200/80 text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-deep-teal">
              Explore All 17 Specialised Services &amp; Programmes
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: "Overthinking Therapy", to: "/services/overthinking-therapy" },
                { label: "Self-Esteem & Identity", to: "/services/self-esteem-therapy-pune" },
                { label: "Depression & Low Mood", to: "/services/depression-counselling-pune" },
                { label: "Everyday Talk Therapy", to: "/services/talk-therapy-pune" },
                { label: "Relationship & Couples", to: "/services/relationship-couples-counselling-pune" },
                { label: "Parenting & Family", to: "/services/parenting-family-counselling-pune" },
                { label: "Mindfulness & Meditation", to: "/services/mindfulness-meditation-pune" },
                { label: "Habit & Behavioural Coaching", to: "/services/behavioural-change-habit-coaching-pune" },
                { label: "Gen Z Workplace Workshop", to: "/workshops/gen-z-in-the-workplace-pune" },
                { label: "Online Therapy Across India", to: "/services/online-therapy-india" },
                { label: "Prabhat Road Clinic, Pune", to: "/services/counselling-prabhat-road-pune" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="inline-flex items-center px-3.5 py-2 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-xs font-medium text-deep-teal hover:text-terracotta transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-semibold">
              <Link
                to="/services"
                className="text-terracotta hover:text-deep-teal underline underline-offset-4"
              >
                Explore All 17 Services &rarr;
              </Link>
              <Link
                to="/about"
                className="text-deep-teal hover:text-terracotta underline underline-offset-4"
              >
                Meet Our Psychologists &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Path Carousel (all slides preserved in raw DOM for SSR/crawlers) */}
      <section
        className="py-12 md:py-16 lg:py-20 bg-white border-b border-t border-gray-100"
        aria-label="Our Core Path"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-[44px] font-semibold text-deep-teal mb-4 font-heading">
              The Core Path
            </h2>
            <p className="text-lg text-charcoal-warm">
              A holistic well-being practice integrating five essential pillars.
            </p>
          </div>

          <div
            className="relative bg-soft-sand rounded-[32px] p-8 md:p-16 shadow-sm border border-gray-200"
            onMouseEnter={() => setIsPillarPaused(true)}
            onMouseLeave={() => setIsPillarPaused(false)}
          >
            <Quote className="absolute top-8 left-8 md:top-12 md:left-12 w-12 h-12 text-terracotta/20" aria-hidden="true" />

            <div className="relative z-10 min-h-[260px] flex items-center justify-center overflow-hidden">
              {CORE_PILLARS.map((pillar, idx) => (
                <div
                  key={pillar.title}
                  className={idx === activePillarIndex ? "text-center w-full" : "hidden"}
                >
                  <h3 className="text-3xl md:text-4xl text-deep-teal font-heading font-semibold mb-4">
                    {pillar.title}
                  </h3>
                  <div className="text-sm font-bold tracking-wider text-terracotta uppercase mb-6">
                    {pillar.subtitle}
                  </div>
                  <p className="text-lg md:text-xl text-charcoal-warm leading-relaxed mb-8 px-4 md:px-12">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 md:-mx-6 pointer-events-none z-20">
              <button
                type="button"
                onClick={() =>
                  setActivePillarIndex((prev) =>
                    prev === 0 ? CORE_PILLARS.length - 1 : prev - 1
                  )
                }
                aria-label="Previous core path"
                className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-deep-teal hover:text-terracotta hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-terracotta/50 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActivePillarIndex((prev) => (prev + 1) % CORE_PILLARS.length)
                }
                aria-label="Next core path"
                className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-deep-teal hover:text-terracotta hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-terracotta/50 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-12 relative z-20">
              {CORE_PILLARS.map((pillar, idx) => (
                <button
                  key={pillar.title}
                  type="button"
                  onClick={() => setActivePillarIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${pillar.title}`}
                  className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    activePillarIndex === idx
                      ? "bg-terracotta w-8"
                      : "bg-gray-300 hover:bg-terracotta/50 w-3"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insights & Blogs Preview */}
      <section className="py-16 md:py-20 lg:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-[36px] font-semibold text-deep-teal mb-4 font-heading">
                Insights &amp; Blogs
              </h2>
              <p className="text-lg text-charcoal-warm">
                Practical, evidence-based articles to help you think clearer and live better.
              </p>
            </div>
            <Link
              to="/resources"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-full border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white transition-all uppercase tracking-wide group whitespace-nowrap min-h-[44px]"
            >
              Explore All Articles{" "}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <article className="bg-soft-sand rounded-[24px] p-7 border border-amber-glow/30 hover:shadow-md transition-all group flex flex-col hover-lift h-full ring-2 ring-amber-glow/20">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-terracotta flex-shrink-0">
                <CircleHelp className="w-6 h-6" aria-hidden="true" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E3F24] bg-amber-glow/20 px-2.5 py-1 rounded-full self-start mb-3">
                Myth Buster
              </span>
              <h3 className="text-lg font-bold font-heading text-deep-teal mb-2 group-hover:text-terracotta transition-colors leading-tight">
                Therapy Is Only for &apos;Rock Bottom&apos;
              </h3>
              <p className="text-charcoal-warm text-[14px] mb-5 flex-grow leading-relaxed">
                Why waiting for complete breakdown hurts, and how proactive emotional support helps rewire thought patterns early.
              </p>
              <Link
                to="/resources/myth-therapy-is-only-for-rock-bottom"
                className="text-sm font-bold uppercase tracking-wide text-terracotta group-hover:text-deep-teal transition-colors flex items-center mt-auto min-h-[44px]"
              >
                Read Myth &amp; Dilemma <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </article>

            <article className="bg-soft-sand rounded-[24px] p-7 border border-gray-100 hover:shadow-md transition-all group flex flex-col hover-lift h-full">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-terracotta flex-shrink-0">
                <BookOpen className="w-6 h-6" aria-hidden="true" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-deep-teal bg-white px-2.5 py-1 rounded-full self-start mb-3">
                Mind &amp; Thinking
              </span>
              <h3 className="text-lg font-bold font-heading text-deep-teal mb-2 group-hover:text-terracotta transition-colors leading-tight">
                Why You&apos;re Tired in Ways Sleep Can&apos;t Fix
              </h3>
              <p className="text-charcoal-warm text-[14px] mb-5 flex-grow leading-relaxed">
                Mistaking cognitive and emotional fatigue for physical tiredness leads to resting without recovering.
              </p>
              <Link
                to="/resources/why-youre-tired-in-ways-sleep-cant-fix"
                className="text-sm font-bold uppercase tracking-wide text-terracotta group-hover:text-deep-teal transition-colors flex items-center mt-auto min-h-[44px]"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </article>

            <article className="bg-soft-sand rounded-[24px] p-7 border border-gray-100 hover:shadow-md transition-all group flex flex-col hover-lift h-full">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-terracotta flex-shrink-0">
                <Coffee className="w-6 h-6" aria-hidden="true" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-deep-teal bg-white px-2.5 py-1 rounded-full self-start mb-3">
                Daily Habits
              </span>
              <h3 className="text-lg font-bold font-heading text-deep-teal mb-2 group-hover:text-terracotta transition-colors leading-tight">
                The &apos;Good Enough&apos; Morning Routine
              </h3>
              <p className="text-charcoal-warm text-[14px] mb-5 flex-grow leading-relaxed">
                A realistic approach to starting your day that doesn&apos;t involve waking up at 5 AM or ice baths.
              </p>
              <Link
                to="/resources/realistic-morning-routine-no-ice-baths"
                className="text-sm font-bold uppercase tracking-wide text-terracotta group-hover:text-deep-teal transition-colors flex items-center mt-auto min-h-[44px]"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </article>

            <article className="bg-soft-sand rounded-[24px] p-7 border border-gray-100 hover:shadow-md transition-all group flex flex-col hover-lift h-full">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-terracotta flex-shrink-0">
                <Briefcase className="w-6 h-6" aria-hidden="true" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-deep-teal bg-white px-2.5 py-1 rounded-full self-start mb-3">
                Work &amp; Life
              </span>
              <h3 className="text-lg font-bold font-heading text-deep-teal mb-2 group-hover:text-terracotta transition-colors leading-tight">
                Setting Boundaries When Ambitious
              </h3>
              <p className="text-charcoal-warm text-[14px] mb-5 flex-grow leading-relaxed">
                Protect your mental well-being and calendar without compromising high-standard career goals.
              </p>
              <Link
                to="/resources/setting-boundaries-when-ambitious"
                className="text-sm font-bold uppercase tracking-wide text-terracotta group-hover:text-deep-teal transition-colors flex items-center mt-auto min-h-[44px]"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Client Testimonials Carousel (all slides kept in raw HTML DOM) */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-soft-sand/50 border-y border-gray-100 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <a
              href={GBP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-xs mb-4 hover:border-terracotta transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
                Client Feedback on Google
              </span>
            </a>

            <h2 className="text-3xl md:text-[38px] font-bold text-deep-teal mb-3 font-heading">
              Real Shifts. Client Experiences.
            </h2>
            <p className="text-base text-charcoal-warm max-w-2xl mx-auto">
              Feedback from clients who sought grounded peace, career clarity, and emotional resilience with{" "}
              <strong className="font-semibold text-deep-teal">Being You Path</strong>.
            </p>
          </div>

          <div className="relative bg-white p-8 md:p-12 rounded-[28px] border border-gray-200/80 shadow-md">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-terracotta/15 pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 flex flex-col justify-between min-h-[310px] md:min-h-[260px]">
              {reviews.map((rev, idx) => (
                <div key={rev.id} className={idx === activeReviewIndex ? "w-full" : "hidden"}>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400" aria-label="5 out of 5 stars">
                        {[...Array(rev.rating || 5)].map((_, sIdx) => (
                          <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Google Review
                      </span>
                    </div>

                    {rev.date && (
                      <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <span>{rev.date}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-charcoal-warm leading-relaxed mb-8 text-[15px] md:text-[17px] font-normal whitespace-pre-line">
                    &ldquo;{rev.quote}&rdquo;
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-deep-teal text-white flex items-center justify-center font-bold text-base shadow-xs">
                        {rev.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-deep-teal font-heading font-semibold text-base md:text-lg m-0">
                          {rev.author}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={GBP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-deep-teal hover:text-terracotta underline transition-colors"
                      >
                        Google Business Profile →
                      </a>
                      <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                        {idx + 1} of {reviews.length}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-20">
              <button
                type="button"
                onClick={() =>
                  setActiveReviewIndex((prev) =>
                    prev === 0 ? reviews.length - 1 : prev - 1
                  )
                }
                className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-deep-teal hover:text-terracotta hover:scale-105 transition-all cursor-pointer"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-20">
              <button
                type="button"
                onClick={() =>
                  setActiveReviewIndex((prev) => (prev + 1) % reviews.length)
                }
                className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-deep-teal hover:text-terracotta hover:scale-105 transition-all cursor-pointer"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {reviews.map((rev, idx) => (
              <button
                key={rev.id}
                type="button"
                onClick={() => setActiveReviewIndex(idx)}
                className={`px-3.5 py-2 min-h-[44px] sm:min-h-0 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeReviewIndex === idx
                    ? "bg-deep-teal text-white shadow-xs font-semibold"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-terracotta hover:text-terracotta"
                }`}
              >
                {rev.author.replace("13_", "")}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Hubs Section: Deccan Gymkhana Clinic + Online Across India */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-glow/20 text-[#9E3F24] border border-amber-glow/40 shadow-2xs">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                Deccan Gymkhana, Pune
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-deep-teal/10 text-deep-teal border border-deep-teal/20 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-sage-green" aria-hidden="true" />
                Online Counselling Across India
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white border border-gray-200 text-gray-700 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-terracotta" aria-hidden="true" />
                Clinical Training at NIMHANS
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-deep-teal font-heading tracking-tight mb-4">
              In-Person Therapy in Pune &amp; Online Across India
            </h2>
            <p className="text-base md:text-lg text-charcoal-warm leading-relaxed">
              Visit our clinic at{" "}
              <strong className="font-semibold text-deep-teal">{CLINIC_ADDRESS}</strong>{" "}
              or book confidential{" "}
              <strong className="font-semibold text-deep-teal">online counselling across India</strong>{" "}
              for support with stress, overthinking, burnout, self-esteem, and career clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Pune Clinic Card */}
            <div className="bg-soft-sand rounded-[28px] p-8 md:p-10 border border-gray-200 flex flex-col justify-between hover-lift shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-glow/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-terracotta mb-3">
                  <Calendar className="w-4 h-4 text-terracotta" aria-hidden="true" />
                  Deccan Gymkhana, Pune Clinic
                </div>
                <h3 className="text-2xl md:text-[28px] font-bold text-deep-teal font-heading mb-4">
                  In-Person Counselling Near Prabhat Road, Pune
                </h3>
                <p className="text-charcoal-warm text-[15px] leading-relaxed mb-6">
                  Our quiet clinic on Dr. Sripati Shastri Path near Prabhat Road serves clients from{" "}
                  <strong>Deccan Gymkhana, Erandwane, Law College Road, Bhandarkar Road, FC Road, Model Colony, Kothrud, Baner, Aundh,</strong>{" "}
                  and <strong>Hinjewadi</strong>, as well as visitors travelling from{" "}
                  <strong>Koregaon Park, Viman Nagar,</strong> and <strong>Kalyani Nagar</strong>.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2.5 text-sm text-charcoal-warm">
                    <Check className="w-4 h-4 text-sage-green flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong>Work-Stress &amp; Burnout Therapy:</strong> Tailored for professionals managing demanding workloads and mental exhaustion.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-charcoal-warm">
                    <Check className="w-4 h-4 text-sage-green flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong>Self-Esteem &amp; Overthinking Therapy:</strong> Structured CBT strategies for negative thought loops and inner resilience.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-charcoal-warm">
                    <Check className="w-4 h-4 text-sage-green flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong>Student &amp; Career Counselling:</strong> Strengths and values mapping with practical direction for students and professionals.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <Clock className="w-4 h-4 text-terracotta" aria-hidden="true" />
                  <span>{CLINIC_HOURS_LABEL} (By Appointment)</span>
                </div>
                <Link
                  to="/services/counselling-prabhat-road-pune"
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-deep-teal hover:text-terracotta transition-colors group min-h-[44px]"
                >
                  <span>Prabhat Road Clinic &amp; Directions</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Online India Card */}
            <div className="section-dark bg-[#0B3A42] text-[#FAF9F6] rounded-[28px] p-8 md:p-10 flex flex-col justify-between hover-lift shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sage-green/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#A7E0BA] mb-3">
                  <ShieldCheck className="w-4 h-4 text-[#A7E0BA]" aria-hidden="true" />
                  Pan-India Online Counselling
                </div>
                <h3 className="card-title text-2xl md:text-[28px] font-bold text-[#FAF9F6] font-heading mb-4">
                  Online Therapy Across India
                </h3>
                <p className="text-[#F5F0E6] text-[15px] leading-relaxed mb-6">
                  Distance should not get in the way of consistent care. Through private video sessions, Being You Path supports{" "}
                  <strong className="text-white">online counselling across India</strong>—serving clients in{" "}
                  <strong className="text-white">Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata,</strong> and across every state with evening and weekend slots.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2.5 text-sm text-[#F5F0E6]">
                    <Check className="w-4 h-4 text-[#F8C988] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong className="text-white">Cognitive Behavioural Therapy (CBT):</strong> Evidence-based work for anxiety, overthinking, and low mood patterns.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-[#F5F0E6]">
                    <Check className="w-4 h-4 text-[#F8C988] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong className="text-white">Secular Mindfulness &amp; Grounding:</strong> Nervous-system regulation tools for busy workdays and academic schedules.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-[#F5F0E6]">
                    <Check className="w-4 h-4 text-[#F8C988] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong className="text-white">Corporate Wellness Workshops:</strong> Structured stress, burnout, and communication modules for teams across India.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F0E6]">
                  <CheckCircle2 className="w-4 h-4 text-[#A7E0BA]" aria-hidden="true" />
                  <span>Confidential Video Consultations</span>
                </div>
                <Link
                  to="/services/online-therapy-india"
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#F8C988] hover:text-white transition-colors group min-h-[44px]"
                >
                  <span>Explore Online Therapy</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/areas-we-serve"
              className="inline-flex items-center gap-2 text-xs font-semibold text-deep-teal hover:text-terracotta underline underline-offset-4 min-h-[44px]"
            >
              <span>See all Pune neighbourhoods &amp; Indian cities we serve</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section (all answers present in raw HTML DOM via CSS collapse) */}
      <section className="py-16 md:py-24 bg-soft-sand border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-terracotta text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <CircleHelp className="w-3.5 h-3.5 text-terracotta" aria-hidden="true" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-deep-teal font-heading tracking-tight mb-4">
              Questions people ask
            </h2>
            <p className="text-base text-charcoal-warm max-w-2xl mx-auto">
              Clear answers about fees, your first session, CBT vs talk therapy, online vs in-person care in Pune, and client confidentiality.
            </p>
          </div>

          <div className="space-y-4">
            {HOME_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[20px] border border-gray-200/90 shadow-2xs overflow-hidden transition-all duration-200"
                >
                  <h3 className="m-0 font-heading font-semibold text-deep-teal text-base md:text-lg leading-snug">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-6 md:p-7 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span
                        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                          isOpen ? "bg-deep-teal text-white" : "bg-soft-sand text-deep-teal"
                        }`}
                      >
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    </button>
                  </h3>

                  <div
                    className={`grid transition-all duration-200 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 md:px-7 md:pb-7 pt-2 text-charcoal-warm text-[15px] leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center p-8 bg-white rounded-[24px] border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-lg font-bold font-heading text-deep-teal mb-1">
                Still deciding who is the right fit?
              </h3>
              <p className="text-sm text-charcoal-warm">
                Read our step-by-step guide on{" "}
                <Link
                  to="/guides/how-to-choose-a-psychologist-pune"
                  className="font-semibold text-terracotta underline underline-offset-4 hover:text-deep-teal"
                >
                  how to choose a psychologist or counsellor in Pune
                </Link>{" "}
                or book a free 15-minute clarity call.
              </p>
            </div>
            <Link
              to="/contact"
              className="bg-deep-teal text-white hover:bg-deep-teal/90 px-6 py-3.5 min-h-[44px] rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors shadow-sm flex items-center gap-2"
            >
              <span>Book Free Clarity Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Micro-Practice & Thought of the Day */}
      <section className="pt-16 md:pt-20 lg:pt-24 pb-24 md:pb-28 bg-soft-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            <div className="bg-amber-glow/15 rounded-[24px] p-8 md:p-10 flex-1 max-w-[500px] border border-amber-glow/20 shadow-sm flex flex-col justify-center text-center">
              <div
                suppressHydrationWarning
                className="text-xs sm:text-sm font-bold tracking-wider text-terracotta uppercase mb-4"
              >
                {currentPractice
                  ? `${currentPractice.weekday} Micro-Practice · ${currentPractice.duration}`
                  : "Daily Micro-Practice · Updates at Midnight IST"}
              </div>
              <h3
                suppressHydrationWarning
                className="text-[24px] font-medium text-deep-teal mb-4 font-heading"
              >
                {currentPractice
                  ? `${currentPractice.emoji} ${currentPractice.title}`
                  : "Grounded Pause & Check-In"}
              </h3>
              <p
                suppressHydrationWarning
                className="text-charcoal-warm text-lg leading-relaxed"
              >
                {currentPractice
                  ? currentPractice.body
                  : "A brief weekday breath or cognitive practice loads here for today's date in India Standard Time."}
              </p>
            </div>

            <div className="section-dark bg-[#0B3A42] rounded-[24px] p-8 md:p-10 flex-1 max-w-[500px] shadow-md flex flex-col justify-between text-center border-l-4 border-[#FDFBF7]/80 relative overflow-hidden">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#FAF9F6] uppercase bg-white/15 px-3 py-1 rounded-full font-sans border border-[#FAF9F6]/20">
                      <Sparkles className="w-3.5 h-3.5 text-[#F8C988]" aria-hidden="true" />
                      <span>Thought of the Day</span>
                    </div>
                    {currentThought?.occasion && (
                      <span
                        suppressHydrationWarning
                        className="inline-flex items-center text-[11px] font-bold tracking-wide text-[#F8C988] bg-[#E6A157]/20 border border-[#E6A157]/45 px-2.5 py-1 rounded-full font-sans"
                      >
                        {currentThought.occasion}
                      </span>
                    )}
                  </div>

                  {currentThought && (
                    <div className="flex items-center gap-1.5 ml-auto">
                      <button
                        type="button"
                        onClick={handleCopyQuote}
                        className="px-3 py-1.5 min-h-[38px] rounded-full bg-white/10 hover:bg-white/20 text-[#FAF9F6] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-sans border border-[#FAF9F6]/25"
                        title={copiedQuote ? "Copied to clipboard!" : "Copy thought"}
                        aria-label="Copy thought"
                      >
                        {copiedQuote ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#F8C988]" />
                            <span className="text-[11px] text-[#F8C988] font-semibold">
                              Copied!
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#FAF9F6]" aria-hidden="true" />
                            <span className="text-[11px] text-[#FAF9F6] font-medium">
                              Copy
                            </span>
                          </>
                        )}
                      </button>

                      <a
                        href={buildWhatsAppThoughtShareUrl(currentThought)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 min-h-[38px] rounded-full bg-white/10 hover:bg-white/20 text-[#FAF9F6] hover:text-white transition-colors inline-flex items-center gap-1.5 text-xs font-sans border border-[#FAF9F6]/25"
                        aria-label="Share on WhatsApp"
                      >
                        <Share2 className="w-3.5 h-3.5 text-[#F8C988]" aria-hidden="true" />
                        <span className="text-[11px] text-[#FAF9F6] font-medium">
                          Share on WhatsApp
                        </span>
                      </a>
                    </div>
                  )}
                </div>

                <Quote className="w-8 h-8 text-[#FAF9F6]/70 mx-auto mb-4" aria-hidden="true" />
                <blockquote
                  suppressHydrationWarning
                  className="text-[#FAF9F6] text-lg sm:text-xl md:text-2xl font-heading font-medium leading-relaxed italic px-2 min-h-[72px] flex items-center justify-center"
                >
                  {currentThought
                    ? `“${currentThought.text}”`
                    : "Today's grounded reflection is loaded for India Standard Time."}
                </blockquote>

                {currentThought?.helplineNote && (
                  <div className="mt-4 px-4 py-3 rounded-xl bg-white/10 border border-[#F8C988]/50 text-[#FAF9F6] text-xs font-sans leading-relaxed flex flex-col items-center gap-1.5">
                    <span>{currentThought.helplineNote}</span>
                    <a
                      href="tel:14416"
                      className="inline-flex items-center gap-1.5 font-bold text-[#F8C988] hover:text-white underline underline-offset-4"
                    >
                      <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Call Tele-MANAS 14416</span>
                    </a>
                  </div>
                )}

                <div
                  suppressHydrationWarning
                  className="mt-4 text-sm text-[#FAF9F6] font-semibold font-sans"
                >
                  {currentThought ? (
                    <>
                      — {currentThought.author}
                      {currentThought.source && (
                        <span className="block text-[#F5F0E6]/90 text-xs font-normal mt-0.5">
                          {currentThought.source}
                        </span>
                      )}
                    </>
                  ) : (
                    <span>Being You Path · Daily Reflection</span>
                  )}
                </div>

                {currentThought && (
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                    <span
                      suppressHydrationWarning
                      className="inline-block text-[11px] font-sans uppercase tracking-widest text-[#FAF9F6] bg-[#FAF9F6]/15 border border-[#FAF9F6]/25 px-3 py-1 rounded-full font-semibold"
                    >
                      {currentThought.theme}
                    </span>
                    {currentThought.linkTo && (
                      <Link
                        to={currentThought.linkTo}
                        className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-[#F8C988] hover:text-white underline underline-offset-4 transition-colors"
                      >
                        <span>Read more</span>
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#FAF9F6]/20 flex flex-wrap items-center justify-between gap-2 text-xs text-[#FAF9F6]/90 font-sans">
                <span suppressHydrationWarning className="text-[#FAF9F6] font-medium">
                  {dailyThought
                    ? `${dailyThought.ist.weekday} Reflection`
                    : "Daily Reflection · IST"}
                </span>
                <Link
                  to="/thought-of-the-day"
                  className="text-[#F8C988] hover:text-white font-semibold underline underline-offset-4 transition-colors"
                >
                  {dailyThought
                    ? `All ${dailyThought.ist.year} thoughts →`
                    : "Daily Thought Archive →"}
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-stone-700 max-w-3xl mx-auto mt-10 leading-relaxed">
            {TELE_MANAS_NOTICE}
          </p>
        </div>
      </section>
    </div>
  );
}
