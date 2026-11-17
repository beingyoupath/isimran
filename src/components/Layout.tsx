import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Copy,
  Check,
  Calendar,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Brain,
  Heart,
  Briefcase,
  Globe,
  Users,
  Compass,
  Smile,
  Shield,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";
import GeminiChatbot from "./GeminiChatbot";
import AdminInquiriesModal from "./AdminInquiriesModal";
import { useAuth } from "../contexts/AuthContext";
import {
  CALENDLY_URL,
  CLINIC_ADDRESS,
  CLINIC_HOURS_LABEL,
  EMAIL_PRIMARY,
  EMAIL_SECONDARY,
  GBP_URL,
  PHONE_PRIMARY,
  PHONE_PRIMARY_HREF,
  PHONE_SECONDARY,
  PHONE_SECONDARY_HREF,
  TELE_MANAS_NOTICE,
  WHATSAPP_URL,
} from "../lib/seoConfig";

import {
  ThoughtEntry,
  buildCopyThoughtText,
  getDailyThoughtIST,
  msUntilNextISTMidnight,
} from "../lib/thoughts";

export const useThoughtOfTheDay = () => {
  const [thought, setThought] = useState<ThoughtEntry | null>(null);

  useEffect(() => {
    let midnightTimer: ReturnType<typeof setTimeout> | undefined;

    const refreshThought = () => {
      const result = getDailyThoughtIST(new Date());
      setThought(result.thought);
      midnightTimer = setTimeout(refreshThought, msUntilNextISTMidnight());
    };

    refreshThought();

    return () => {
      if (midnightTimer) clearTimeout(midnightTimer);
    };
  }, []);

  return {
    message: thought
      ? thought.short || thought.text
      : "Daily grounded reflection — updates at midnight IST",
    color: "bg-[#0B3A42]",
    thought,
  };
};

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  if (!isOpen) return null;

  const whatsappText = encodeURIComponent(
    "Hello Being You Path,\nI would like to schedule a 1-on-1 psychological consultation / free 15-minute clarity call.\nPlease share your earliest available slots (Prabhat Road clinic Pune / online video across India).\nThank you!"
  );
  const whatsappUrl = `${WHATSAPP_URL}?text=${whatsappText}`;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-lg bg-[#FAF9F6] rounded-2xl shadow-2xl border border-stone-200/80 overflow-hidden z-10 p-6 md:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] p-2.5 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-left mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#A43F23] uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect with Our Psychologists</span>
          </div>
          <h3 className="text-2xl font-bold font-heading text-[#0B3A42] tracking-tight">
            Schedule Your Consultation
          </h3>
          <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
            Begin with a free 15-minute clarity call or secure your preferred session time with Imran Hussain or Tejaswini Joshi.
          </p>
        </div>

        <div className="space-y-3.5">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full text-left p-4 rounded-xl bg-white hover:bg-stone-50 border border-stone-200/80 hover:border-[#0B3A42]/30 shadow-xs hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#0B3A42]/10 text-[#0B3A42] flex items-center justify-center shrink-0 group-hover:bg-[#0B3A42] group-hover:text-white transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0B3A42] flex items-center gap-1.5">
                  <span>Pick Slot on Calendly</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-xs text-stone-600 mt-0.5">
                  Direct calendar scheduling · Deccan Gymkhana, Pune or Online video
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-[#0B3A42] group-hover:translate-x-1 transition-all" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full text-left p-4 rounded-xl bg-white hover:bg-stone-50 border border-stone-200/80 hover:border-emerald-500/40 shadow-xs hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0B3A42] flex items-center gap-1.5">
                  <span>WhatsApp Quick Booking</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-xs text-stone-600 mt-0.5">
                  Message our clinic coordinator for scheduling support
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" />
          </a>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-700">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#A43F23]" />
            <span>Near Prabhat Road, Deccan Gymkhana, Pune &amp; Online</span>
          </div>
          <span>Confidential Care</span>
        </div>
      </motion.div>
    </div>
  );
}

export interface ServiceMenuCategory {
  id: string;
  name: string;
  badge: string;
  headline: string;
  description: string;
  image: string;
  items: {
    title: string;
    subtitle: string;
    path: string;
    tag: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

export const SERVICE_CATEGORIES: ServiceMenuCategory[] = [
  {
    id: "clinical",
    name: "CBT & Emotional Care",
    badge: "Individual Therapy",
    headline: "Evidence-Based Counselling & Cognitive Care",
    description:
      "Structured CBT, somatic regulation, and compassionate psychotherapy for anxiety, overthinking, low mood, and self-worth.",
    image: "/images/service-anxiety.webp",
    items: [
      {
        title: "CBT Therapy in Pune & Online",
        subtitle:
          "Structured cognitive behavioural tools for worry, rumination, and mood balance",
        path: "/services/cbt-therapy-pune",
        tag: "Cognitive Behavioural",
        icon: Brain,
      },
      {
        title: "Stress & Anxiety Counselling",
        subtitle:
          "Calm chronic worry, restlessness, and panic triggers with practical tools",
        path: "/services/stress-anxiety-counselling-pune",
        tag: "CBT & Grounding",
        icon: Sparkles,
      },
      {
        title: "Overthinking Therapy & Counselling",
        subtitle:
          "Interrupt repetitive mental loops and nighttime rumination",
        path: "/services/overthinking-therapy",
        tag: "Rumination Relief",
        icon: Compass,
      },
      {
        title: "Self-Esteem Therapy in Pune",
        subtitle:
          "Soften the inner critic, build boundaries, and strengthen self-trust",
        path: "/services/self-esteem-therapy-pune",
        tag: "Identity & Worth",
        icon: Smile,
      },
      {
        title: "Depression & Low Mood Therapy",
        subtitle:
          "Steady, compassionate support for emotional numbness and low vitality",
        path: "/services/depression-counselling-pune",
        tag: "Behavioral Activation",
        icon: Shield,
      },
      {
        title: "Trauma-Informed Counselling",
        subtitle:
          "Paced nervous system stabilization and safe emotional processing",
        path: "/services/trauma-counselling-pune",
        tag: "Somatic Safety",
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: "relationships",
    name: "Couples, Students & Family",
    badge: "Interpersonal & Youth Care",
    headline: "Relationships, Student Resilience & Family Support",
    description:
      "Guided therapy for partners, school and college students facing exam stress, and families building calmer communication.",
    image: "/images/service-relationships.webp",
    items: [
      {
        title: "Student & Adolescent Counselling",
        subtitle:
          "Exam stress, emotional regulation, and clarity for teens and young adults",
        path: "/services/student-adolescent-counselling-pune",
        tag: "Teens & Students",
        icon: GraduationCap,
      },
      {
        title: "Relationship & Couples Counselling",
        subtitle:
          "Resolve recurring conflict, strengthen communication, and rebuild trust",
        path: "/services/relationship-couples-counselling-pune",
        tag: "Couples & Premarital",
        icon: Heart,
      },
      {
        title: "Prabhat Road Clinic, Pune",
        subtitle:
          "In-person 1-on-1 consultations at Dr. Sripati Shastri Path, Deccan Gymkhana",
        path: "/services/counselling-prabhat-road-pune",
        tag: "Deccan Gymkhana",
        icon: MapPin,
      },
    ],
  },
  {
    id: "career",
    name: "Career & Burnout Care",
    badge: "Work & Leadership",
    headline: "Career Clarity, Burnout Recovery & Team Workshops",
    description:
      "Evidence-informed counselling for professionals, students, and workplaces navigating burnout, career transitions, and team wellbeing.",
    image: "/images/service-career.webp",
    items: [
      {
        title: "Burnout Counselling in Pune",
        subtitle:
          "Recover from workplace exhaustion with CBT and nervous-system regulation",
        path: "/services/burnout-counselling-pune",
        tag: "Burnout Recovery",
        icon: Briefcase,
      },
      {
        title: "Career Counselling in Pune",
        subtitle:
          "Strengths profiling and behavioural design for students and professionals",
        path: "/services/career-counselling-pune",
        tag: "Career Clarity",
        icon: Compass,
      },
      {
        title: "Corporate Wellness Workshops",
        subtitle:
          "Structured stress, burnout, and communication workshops for teams",
        path: "/services/corporate-workshops-pune",
        tag: "Organisations",
        icon: Users,
      },
    ],
  },
  {
    id: "online",
    name: "Online Therapy India",
    badge: "Pan-India Video Sessions",
    headline: "Confidential Online Counselling Across India",
    description:
      "Private video consultations with qualified psychologists available across India, including evening and weekend slots.",
    image: "/images/service-online.webp",
    items: [
      {
        title: "Online Therapy in India",
        subtitle:
          "Confidential 1-on-1 video counselling across Mumbai, Bengaluru, Delhi & nationwide",
        path: "/services/online-therapy-india",
        tag: "Pan-India Video",
        icon: Globe,
      },
      {
        title: "Areas We Serve in Pune & India",
        subtitle:
          "View clinic access across Deccan Gymkhana, Prabhat Road, Kothrud & Pune",
        path: "/areas-we-serve",
        tag: "Clinic & Online",
        icon: MapPin,
      },
    ],
  },
];

export default function Layout() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [quoteCopied, setQuoteCopied] = useState(false);
  const [showFloatingWidgets, setShowFloatingWidgets] = useState(false);

  const serviceMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const location = useLocation();
  const thoughtState = useThoughtOfTheDay();
  const { isAdmin } = useAuth();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServiceMenuOpen(false);
    setMobileServicesExpanded(false);
  }, [location.pathname]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;
    const win = typeof window !== "undefined" ? (window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    }) : null;

    if (win && typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(() => setShowFloatingWidgets(true), {
        timeout: 1500,
      });
    } else {
      timeoutId = setTimeout(() => setShowFloatingWidgets(true), 1200);
    }

    return () => {
      if (idleId !== undefined && win?.cancelIdleCallback) {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const handleServiceMouseEnter = () => {
    if (serviceMenuTimeoutRef.current) {
      clearTimeout(serviceMenuTimeoutRef.current);
    }
    setIsServiceMenuOpen(true);
  };

  const handleServiceMouseLeave = () => {
    serviceMenuTimeoutRef.current = setTimeout(() => {
      setIsServiceMenuOpen(false);
    }, 200);
  };

  const copyThoughtToClipboard = () => {
    if (!thoughtState.thought) return;
    const textToCopy = buildCopyThoughtText(thoughtState.thought);
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy);
      setQuoteCopied(true);
      setTimeout(() => setQuoteCopied(false), 2000);
    }
  };

  const currentCategory =
    SERVICE_CATEGORIES[activeCategoryIndex] || SERVICE_CATEGORIES[0];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services", isServices: true },
    { name: "Workshops", path: "/workshops" },
    { name: "Resources / Blogs", path: "/resources" },
    { name: "Contact", path: "/contact" },
  ];

  const footerServiceLinks = [
    { name: "CBT Therapy in Pune", path: "/services/cbt-therapy-pune" },
    {
      name: "Stress & Anxiety Counselling",
      path: "/services/stress-anxiety-counselling-pune",
    },
    {
      name: "Burnout Counselling in Pune",
      path: "/services/burnout-counselling-pune",
    },
    {
      name: "Self-Esteem Therapy in Pune",
      path: "/services/self-esteem-therapy-pune",
    },
    {
      name: "Overthinking Therapy",
      path: "/services/overthinking-therapy",
    },
    {
      name: "Career Counselling in Pune",
      path: "/services/career-counselling-pune",
    },
    {
      name: "Student & Adolescent Counselling",
      path: "/services/student-adolescent-counselling-pune",
    },
    {
      name: "Online Therapy Across India",
      path: "/services/online-therapy-india",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] text-[#2C3E50] antialiased selection:bg-[#C85C3E]/20 selection:text-[#0B3A42]">
      {/* Sticky Top Header Area */}
      <header className="sticky top-0 z-50 flex flex-col w-full shadow-xs">
        {/* Top Utility & Wisdom Announcement Bar */}
        <div
          className={`section-dark ${thoughtState.color} text-[#FAF9F6] w-full transition-colors duration-500`}
        >
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[60px] py-2 flex flex-col md:flex-row justify-between items-center text-[11px] lg:text-[12px] tracking-wide font-medium gap-2 md:gap-0">
            {/* Left: Contact Hotlines */}
            <div className="hidden md:flex items-center space-x-5 lg:space-x-6 shrink-0">
              <a
                href={PHONE_PRIMARY_HREF}
                className="flex items-center hover:text-[#E6A157] transition-colors duration-300 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5 text-[#E6A157]" />
                {PHONE_PRIMARY}
              </a>
              <span className="text-white/40" aria-hidden="true">
                ·
              </span>
              <a
                href={`mailto:${EMAIL_PRIMARY}`}
                className="hidden lg:flex items-center hover:text-[#E6A157] transition-colors duration-300 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 mr-1.5 text-[#E6A157]" />
                {EMAIL_PRIMARY}
              </a>
            </div>

            {/* Center: Thought of the Day */}
            <div className="text-center font-heading text-[11px] md:text-[12px] lg:text-[12.5px] flex items-center justify-center flex-wrap gap-2 text-[#FDFBF7]">
              <Link
                to="/thought-of-the-day"
                className="text-[10px] md:text-[10.5px] tracking-widest uppercase font-semibold text-[#E6A157] hover:text-white transition-colors flex items-center gap-1 font-sans"
              >
                <Sparkles className="w-3 h-3 text-[#E6A157]" aria-hidden="true" />
                <span>Thought of the Day</span>
              </Link>
              <span className="text-white/40 hidden sm:inline" aria-hidden="true">
                ·
              </span>
              <button
                type="button"
                onClick={copyThoughtToClipboard}
                className="font-serif italic tracking-wide hover:text-[#E6A157] transition-colors cursor-pointer inline-flex items-center gap-1.5 text-left"
                title={
                  thoughtState.thought
                    ? "Copy full Thought of the Day"
                    : "Updates automatically for today in IST"
                }
              >
                <span suppressHydrationWarning>
                  {thoughtState.thought
                    ? `“${thoughtState.message}”`
                    : thoughtState.message}
                </span>
                {thoughtState.thought && (
                  <span className="text-[10px] text-[#FDFBF7]/85 font-sans not-italic">
                    {quoteCopied ? (
                      <span className="text-[#E6A157] font-semibold inline-flex items-center gap-0.5">
                        <Check className="w-3 h-3 inline" /> Copied!
                      </span>
                    ) : (
                      <Copy className="w-3 h-3 inline opacity-80" aria-hidden="true" />
                    )}
                  </span>
                )}
              </button>
            </div>


            {/* Right: Clinic Location & Admin Digest */}
            <div className="hidden md:flex items-center space-x-4 shrink-0">
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(true)}
                  className="flex items-center text-[11px] text-[#FDFBF7] hover:text-[#E6A157] transition-colors cursor-pointer bg-white/10 px-2.5 py-0.5 rounded-md"
                  title="Inquiries Dashboard"
                >
                  <ShieldCheck className="w-3 h-3 mr-1 text-[#E6A157]" />
                  Inquiries Digest
                </button>
              )}
              <a
                href={GBP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 group cursor-pointer hover:text-[#E6A157] transition-colors duration-300"
                aria-label="View clinic on Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-[#E6A157]" />
                <span>Deccan Gymkhana, Pune &amp; Online</span>
              </a>
            </div>
          </div>
        </div>

        {/* Primary Navbar */}
        <nav className="relative bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[60px] h-20 sm:h-22 flex items-center justify-between">
            {/* Logo and Brand Title */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 sm:w-13 sm:h-13 bg-white rounded-full flex items-center justify-center border border-stone-200/80 shrink-0 overflow-hidden p-1 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/assets/aistudio/being_you_logo_b4a82e75.png"
                  alt="Being You Path Logo"
                  width="52"
                  height="52"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl sm:text-2xl font-bold font-heading text-[#0B3A42] tracking-tight group-hover:text-[#A43F23] transition-colors leading-tight">
                  Being You Path™
                </span>
                <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] font-semibold text-[#A43F23]">
                  Where you meet your real self™
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.isServices && location.pathname.startsWith("/services")) ||
                  (link.path === "/resources" &&
                    location.pathname.startsWith("/resources"));

                if (link.isServices) {
                  return (
                    <div
                      key={link.name}
                      className="relative py-4"
                      onMouseEnter={handleServiceMouseEnter}
                      onMouseLeave={handleServiceMouseLeave}
                    >
                      <div className="flex items-center">
                        <Link
                          to={link.path}
                          className={`text-[14.5px] tracking-wide font-medium py-2 px-1 relative transition-colors duration-200 flex items-center gap-1.5 ${
                            isActive
                              ? "text-[#A43F23] font-semibold"
                              : "text-[#0B3A42] hover:text-[#A43F23]"
                          }`}
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${
                              isServiceMenuOpen
                                ? "rotate-180 text-[#A43F23]"
                                : "opacity-60"
                            }`}
                          />
                          {isActive && (
                            <motion.span
                              layoutId="navTabIndicator"
                              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A43F23] rounded-full"
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 30,
                              }}
                            />
                          )}
                        </Link>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-[14.5px] tracking-wide font-medium py-2 px-1 relative transition-colors duration-200 ${
                      isActive
                        ? "text-[#A43F23] font-semibold"
                        : "text-[#0B3A42] hover:text-[#A43F23]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A43F23] rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Interactive Book Consultation Trigger */}
              <button
                type="button"
                onClick={() => setIsConsultationModalOpen(true)}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#0B3A42] hover:bg-[#07252A] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Book Consultation
              </button>
            </div>

            {/* Mobile Menu Hamburger (>= 44px touch target) */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-[#0B3A42] hover:bg-stone-100 transition-colors focus-visible:ring-2 focus-visible:ring-[#0B3A42] cursor-pointer flex items-center justify-center"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Mega-Menu for Services (always mounted in HTML for crawlers, toggled visually) */}
          <div
            onMouseEnter={handleServiceMouseEnter}
            onMouseLeave={handleServiceMouseLeave}
            aria-hidden={!isServiceMenuOpen}
            className={`hidden lg:block absolute top-full left-0 right-0 bg-[#FAF9F6]/98 backdrop-blur-xl border-b border-stone-200/90 shadow-2xl z-40 overflow-hidden transition-all duration-200 ease-out ${
              isServiceMenuOpen
                ? "opacity-100 visible translate-y-0 pointer-events-auto"
                : "opacity-0 invisible -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[60px] py-7">
              {/* Category Tabs Header */}
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-stone-200/70 gap-3">
                <div className="flex items-center gap-1.5 p-1 bg-stone-200/50 rounded-xl">
                  {SERVICE_CATEGORIES.map((category, index) => {
                    const isTabActive = activeCategoryIndex === index;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setActiveCategoryIndex(index)}
                        onMouseEnter={() => setActiveCategoryIndex(index)}
                        className={`relative px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                          isTabActive
                            ? "text-[#0B3A42] bg-white shadow-xs"
                            : "text-stone-700 hover:text-stone-900"
                        }`}
                      >
                        <span className="relative z-10">{category.name}</span>
                      </button>
                    );
                  })}
                </div>

                <Link
                  to="/services"
                  onClick={() => setIsServiceMenuOpen(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A43F23] hover:text-[#0B3A42] transition-colors"
                >
                  <span>Explore All Services Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Mega-Menu Body (all categories rendered in HTML; inactive tabs hidden visually) */}
              <div className="pt-6 grid grid-cols-12 gap-8 items-stretch">
                <div className="col-span-8 flex flex-col justify-between">
                  <div>
                    {SERVICE_CATEGORIES.map((category, catIndex) => {
                      const isCatActive = catIndex === activeCategoryIndex;
                      return (
                        <div
                          key={category.id}
                          className={isCatActive ? "block" : "hidden"}
                        >
                          <div className="mb-4">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-[#A43F23]">
                              {category.badge}
                            </span>
                            <h4 className="text-xl font-bold font-heading text-[#0B3A42] mt-0.5">
                              {category.headline}
                            </h4>
                            <p className="text-xs text-stone-700 mt-1 max-w-2xl leading-relaxed">
                              {category.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-3.5 mt-5">
                            {category.items.map((item) => {
                              const IconComponent = item.icon;
                              return (
                                <Link
                                  key={item.title}
                                  to={item.path}
                                  onClick={() => setIsServiceMenuOpen(false)}
                                  className="group p-3.5 rounded-xl bg-white hover:bg-white/90 border border-stone-200/70 hover:border-[#A43F23]/40 hover:shadow-sm transition-all flex flex-col justify-between relative overflow-hidden"
                                >
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="w-8 h-8 rounded-lg bg-[#0B3A42]/5 text-[#0B3A42] group-hover:bg-[#A43F23]/10 group-hover:text-[#A43F23] flex items-center justify-center transition-colors">
                                        <IconComponent className="w-4 h-4" />
                                      </div>
                                      <span className="text-[10px] font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
                                        {item.tag}
                                      </span>
                                    </div>
                                    <h5 className="text-[13.5px] font-bold text-[#0B3A42] group-hover:text-[#A43F23] transition-colors leading-snug">
                                      {item.title}
                                    </h5>
                                    <p className="text-[11.5px] text-stone-700 mt-1 line-clamp-2 leading-relaxed">
                                      {item.subtitle}
                                    </p>
                                  </div>

                                  <div className="mt-3 flex items-center text-[11px] font-semibold text-[#0B3A42] group-hover:text-[#A43F23] transition-colors pt-2 border-t border-stone-100">
                                    <span>Learn More</span>
                                    <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-700">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#A43F23]" />
                      <span>{CLINIC_ADDRESS}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#0B3A42] font-medium">
                        Pan-India Online Video
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-span-4">
                  <div className="h-full rounded-2xl bg-white border border-stone-200/80 p-5 flex flex-col justify-between shadow-xs relative overflow-hidden">
                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-stone-900 mb-4 shadow-2xs">
                      <img
                        src={currentCategory.image}
                        alt={currentCategory.headline}
                        width={800}
                        height={500}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25" />
                      <div className="section-dark absolute bottom-3 left-3 right-3 text-[#FAF9F6]">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#F8C988] block mb-0.5 drop-shadow">
                          Deccan Gymkhana, Pune &amp; Online
                        </span>
                        <span className="card-title text-xs font-semibold text-[#FAF9F6] drop-shadow-md">
                          Warm, Confidential Therapeutic Space
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-stone-600 mb-4 leading-relaxed">
                        Looking for dedicated 1-on-1 clarity? Speak directly with psychologists Imran Hussain or Tejaswini Joshi.
                      </div>

                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsServiceMenuOpen(false);
                            setIsConsultationModalOpen(true);
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-[#0B3A42] hover:bg-[#07252A] text-white text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Free 15-Min Clarity Call</span>
                        </button>

                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide transition-all border border-emerald-200/60 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-700" />
                          <span>WhatsApp Rapid Booking</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Mobile Menu Drawer */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="lg:hidden bg-[#FAF9F6] border-t border-stone-200/80 px-4 sm:px-6 py-5 shadow-xl space-y-4 max-h-[85vh] overflow-y-auto"
              >
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const isActive =
                      location.pathname === link.path ||
                      (link.isServices &&
                        location.pathname.startsWith("/services")) ||
                      (link.path === "/resources" &&
                        location.pathname.startsWith("/resources"));

                    if (link.isServices) {
                      return (
                        <div key={link.name} className="rounded-xl overflow-hidden">
                          <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-stone-100/70">
                            <Link
                              to="/services"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-base font-semibold text-[#0B3A42] flex items-center gap-2 py-1"
                            >
                              <span>Services</span>
                              <span className="text-[10px] uppercase font-bold text-[#A43F23] bg-[#A43F23]/10 px-2 py-0.5 rounded-full">
                                Pune &amp; Online
                              </span>
                            </Link>
                            <button
                              type="button"
                              onClick={() =>
                                setMobileServicesExpanded(!mobileServicesExpanded)
                              }
                              className="min-w-[44px] min-h-[44px] p-2 text-stone-700 hover:text-stone-900 rounded-lg flex items-center justify-center"
                              aria-label="Toggle services list"
                            >
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  mobileServicesExpanded ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          </div>

                          <AnimatePresence>
                            {mobileServicesExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="pl-3 pr-1 py-2 space-y-1.5 border-l-2 border-[#A43F23]/30 ml-3 my-1"
                              >
                                {SERVICE_CATEGORIES.flatMap((c) => c.items).map(
                                  (item) => (
                                    <Link
                                      key={item.title}
                                      to={item.path}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="block p-2.5 rounded-lg hover:bg-stone-100 text-xs transition-colors"
                                    >
                                      <div className="font-semibold text-[#0B3A42] flex items-center justify-between">
                                        <span>{item.title}</span>
                                        <ChevronRight className="w-3 h-3 text-stone-600" />
                                      </div>
                                      <div className="text-[11px] text-stone-700 mt-0.5">
                                        {item.subtitle}
                                      </div>
                                    </Link>
                                  )
                                )}
                                <Link
                                  to="/services"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block py-2 text-xs font-bold text-[#A43F23] mt-2"
                                >
                                  &rarr; View All Services
                                </Link>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-3 px-3 rounded-xl text-base font-medium transition-colors ${
                          isActive
                            ? "text-[#A43F23] bg-[#A43F23]/10 font-semibold"
                            : "text-[#0B3A42] hover:bg-stone-100"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-2 space-y-2.5 border-t border-stone-200/80">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsConsultationModalOpen(true);
                    }}
                    className="w-full min-h-[44px] inline-flex items-center justify-center py-3 rounded-full bg-[#0B3A42] hover:bg-[#07252A] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
                  >
                    Book Consultation
                  </button>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-center text-xs">
                    <a
                      href={PHONE_PRIMARY_HREF}
                      className="min-h-[44px] py-2.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#0B3A42] font-medium flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#A43F23]" />
                      <span>Call Us</span>
                    </a>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] py-2.5 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-medium flex items-center justify-center gap-1.5"
                    >
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Site Footer */}
      <footer className="section-dark bg-[#0B3A42] text-[#FAF9F6] pt-16 pb-24 sm:pb-24 border-t border-stone-200/10">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
            {/* Col 1: Brand & Philosophy */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 min-w-[56px] min-h-[56px] bg-white rounded-full flex items-center justify-center p-1.5 shrink-0 shadow-xs overflow-hidden">
                  <img
                    src="/assets/aistudio/being_you_logo_b4a82e75.png"
                    alt="Being You Path Logo"
                    width="56"
                    height="56"
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="card-title text-xl font-bold font-heading text-[#FAF9F6]">
                    Being You Path™
                  </h3>
                  <p className="text-[11px] text-[#E6A157] uppercase tracking-wider font-semibold">
                    Where you meet your real self™
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#FAF9F6] max-w-md leading-relaxed">
                Evidence-based CBT and psychological counselling in Deccan Gymkhana, Pune and online across India. Led by a psychologist with clinical training at NIMHANS and a counselling psychologist.
              </p>
              <p className="text-xs text-[#FAF9F6] max-w-md leading-relaxed">
                <strong className="text-[#F8C988] font-semibold">
                  Areas we serve:
                </strong>{" "}
                <Link
                  to="/areas-we-serve"
                  className="underline hover:text-white transition-colors"
                >
                  Deccan Gymkhana, Prabhat Road, Erandwane, Kothrud, Shivaji Nagar, Aundh, Baner, Koregaon Park, and online across India
                </Link>
                .
              </p>
            </div>

            {/* Col 2: Specializations (Canonical URLs) */}
            <div>
              <h4 className="card-title text-xs font-bold uppercase tracking-widest text-[#FAF9F6] mb-4">
                Specializations
              </h4>
              <ul className="space-y-2.5 text-xs text-[#FAF9F6]">
                {footerServiceLinks.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="hover:text-[#E6A157] transition-colors inline-block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Quick Links */}
            <div>
              <h4 className="card-title text-xs font-bold uppercase tracking-widest text-[#FAF9F6] mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-xs text-[#FAF9F6]">
                <li>
                  <Link to="/about" className="hover:text-[#E6A157] transition-colors inline-block py-0.5">
                    Our Psychologists
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-[#E6A157] transition-colors inline-block py-0.5">
                    All Therapy Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/counselling-prabhat-road-pune"
                    className="hover:text-[#E6A157] transition-colors inline-block py-0.5"
                  >
                    Prabhat Road Clinic, Pune
                  </Link>
                </li>
                <li>
                  <Link to="/workshops" className="hover:text-[#E6A157] transition-colors inline-block py-0.5">
                    Corporate Workshops
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="hover:text-[#E6A157] transition-colors inline-block py-0.5">
                    Psychology Articles &amp; Guides
                  </Link>
                </li>
                <li>
                  <Link to="/areas-we-serve" className="hover:text-[#E6A157] transition-colors inline-block py-0.5">
                    Areas We Serve
                  </Link>
                </li>
                <li>
                  <Link to="/thought-of-the-day" className="hover:text-[#E6A157] transition-colors inline-block py-0.5">
                    Thought of the Day
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#E6A157] transition-colors inline-block py-0.5">
                    Book a Clarity Call
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Pune Clinic & Contact (Consistent NAP) */}
            <div>
              <h4 className="card-title text-xs font-bold uppercase tracking-widest text-[#FAF9F6] mb-4">
                Clinic &amp; Contact
              </h4>
              <div className="space-y-3 text-xs text-[#F5F0E6] leading-relaxed">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#E6A157] shrink-0 mt-0.5" />
                  <span>{CLINIC_ADDRESS}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-[#E6A157] shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <a
                      href={PHONE_PRIMARY_HREF}
                      className="hover:text-[#E6A157] transition-colors"
                    >
                      {PHONE_PRIMARY}
                    </a>
                    <a
                      href={PHONE_SECONDARY_HREF}
                      className="hover:text-[#E6A157] transition-colors"
                    >
                      {PHONE_SECONDARY}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-[#E6A157] shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <a
                      href={`mailto:${EMAIL_PRIMARY}`}
                      className="hover:text-[#E6A157] transition-colors"
                    >
                      {EMAIL_PRIMARY}
                    </a>
                    <a
                      href={`mailto:${EMAIL_SECONDARY}`}
                      className="hover:text-[#E6A157] transition-colors"
                    >
                      {EMAIL_SECONDARY}
                    </a>
                  </div>
                </div>
                <p className="text-[11px] text-[#FAF9F6] pt-1">
                  {CLINIC_HOURS_LABEL}
                </p>
              </div>
            </div>
          </div>

          {/* Non-Emergency Crisis Helpline Notice */}
          <div className="py-4 px-4 rounded-xl bg-white/5 border border-white/15 mb-6 text-xs text-[#F5F0E6] leading-relaxed">
            <strong className="text-[#E6A157]">Crisis &amp; Emergency Support:</strong>{" "}
            {TELE_MANAS_NOTICE}
          </div>

          {/* Bottom Copyright & Legal Links */}
          <div className="pt-6 border-t border-[#FDFBF7]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5F0E6] gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <p suppressHydrationWarning>
                © {new Date().getFullYear()} Being You Path™. All rights reserved.
              </p>
              <Link
                to="/privacy-policy"
                className="text-[#E6A157] hover:text-white underline transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-[#E6A157] hover:text-white underline transition-colors"
              >
                Terms &amp; Scope of Care
              </Link>
            </div>
            <p className="text-[11px] text-[#F5F0E6]/90">
              Prabhat Road, Deccan Gymkhana, Pune · Online Counselling Across India
            </p>
          </div>
        </div>
      </footer>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />

      {/* Admin Digest Modal */}
      <AdminInquiriesModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* Deferred Floating Action Widgets (Post-Mount for Fast Initial Paint) */}
      {showFloatingWidgets && (
        <>
          {/* Floating Call Button */}
          <motion.a
            href={PHONE_PRIMARY_HREF}
            className="fixed bottom-[76px] right-3.5 sm:bottom-[100px] sm:right-6 z-40 flex items-center justify-center group"
            aria-label="Call Us"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-25 animate-ping"
              style={{ animationDuration: "2s", animationDelay: "0.2s" }}
            />
            <motion.div
              className="relative bg-[#1D4ED8] text-white p-2.5 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow cursor-pointer min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center"
              whileHover={{ scale: 1.08 }}
            >
              <Phone className="w-5 h-5 sm:w-7 sm:h-7" />
            </motion.div>
          </motion.a>

          {/* Floating WhatsApp Button */}
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center group"
            aria-label="Chat on WhatsApp"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-30 animate-ping"
              style={{ animationDuration: "3s" }}
            />
            <motion.div
              className="relative bg-[#15803D] text-white p-2.5 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow cursor-pointer min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center"
              whileHover={{ scale: 1.08 }}
            >
              <svg
                className="w-5 h-5 sm:w-7 sm:h-7 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.18-.175.201-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.135-.135.301-.351.452-.527.15-.175.201-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.237-.245-.589-.494-.509-.678-.519-.175-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.512 1.079 2.913 1.23 3.114c.15.201 2.123 3.242 5.143 4.547.718.311 1.279.497 1.716.636.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.201-.577-.351zM12.012 21.82a9.787 9.787 0 0 1-4.99-1.365l-.358-.213-3.71.973.99-3.617-.233-.371A9.8 9.8 0 0 1 2.213 12.01c0-5.41 4.4-9.81 9.8-9.81 2.62 0 5.084 1.02 6.938 2.873a9.77 9.77 0 0 1 2.868 6.936c0 5.41-4.4 9.811-9.807 9.811zM12.012 0C5.388 0 0 5.388 0 12.013c0 2.115.553 4.183 1.602 6.004L0 24l6.17-1.618a11.97 11.97 0 0 0 5.842 1.503c6.624 0 12.013-5.388 12.013-12.013C24.025 5.388 18.636 0 12.012 0z" />
              </svg>
            </motion.div>
          </motion.a>

          {/* Floating Gemini Chatbot */}
          <GeminiChatbot />
        </>
      )}
    </div>
  );
}
