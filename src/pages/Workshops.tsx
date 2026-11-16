import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { recordInquiry } from "../lib/inquiries";
import {
  EMAIL_PRIMARY,
  PHONE_SECONDARY_HREF,
  LOCAL_BUSINESS_SCHEMA,
  buildServiceSchema,
} from "../lib/seoConfig";
import {
  ChevronLeft,
  ChevronRight,
  Brain,
  Users,
  GraduationCap,
  HeartHandshake,
  ShieldAlert,
  Sprout,
  MessageCircle,
  CheckCircle2,
  Mail,
  Clock,
  Target,
  CalendarDays,
  Building2,
  X,
} from "lucide-react";

interface WorkshopTheme {
  title: string;
  desc: string;
  image: string;
  icon: React.ReactNode;
}

export default function Workshops() {
  const breadcrumbs = [{ name: "Workshops", url: "/workshops" }];

  const workshopServiceSchema = buildServiceSchema({
    name: "Corporate Wellness, School & Community Psychology Workshops",
    description:
      "Structured, facilitated workshops on stress management, burnout prevention, psychological safety, focus, and resilience for organisations, schools, and communities in Pune and online across India.",
    path: "/workshops",
    serviceType: "Corporate Wellness & Psychoeducational Workshops",
  });

  const slides = [
    {
      title: "Workshops That Change How People Work, Think, and Live Together",
      subtitle:
        "Built for organisations, schools, and communities — not conference rooms.",
      desc: "Our workshops are structured, facilitated learning experiences built around evidence-based psychological frameworks, practical tools, and honest conversation. Customised to your people, your context, and your goals.",
      image: "/images/workshop-hero-1.webp",
    },
    {
      title: "Facilitated Learning Grounded in Psychology",
      subtitle: "Beyond theory into practical daily skills.",
      desc: "Sessions integrate applied behavioural science with structured exercises, equipping teams with practical tools to regulate stress, communicate clearly, and adapt under demanding workloads.",
      image: "/images/workshop-hero-2.webp",
    },
    {
      title: "Meaningful Connection & Engagement",
      subtitle: "Where honest conversation meets practical application.",
      desc: "Whether bridging generational communication gaps or strengthening psychological safety, we facilitate environments where steady, measurable habits take root.",
      image: "/images/workshop-hero-3.webp",
    },
  ];

  const workshopThemes: WorkshopTheme[] = [
    {
      title: "Stress & Burnout Prevention",
      desc: "Practical tools for regulation, recovery, and sustainable performance.",
      icon: <ShieldAlert className="w-8 h-8 text-terracotta mb-4" aria-hidden="true" />,
      image: "/images/mindfulness-calm.webp",
    },
    {
      title: "Focus & Attention in a Distracted World",
      desc: "Protecting attention in an environment designed to fragment it.",
      icon: <Brain className="w-8 h-8 text-terracotta mb-4" aria-hidden="true" />,
      image: "/images/workshop-focus.webp",
    },
    {
      title: "Psychological Safety & Communication",
      desc: "Building environments where people speak up constructively without fear.",
      icon: <MessageCircle className="w-8 h-8 text-terracotta mb-4" aria-hidden="true" />,
      image: "/images/workshop-safety.webp",
    },
    {
      title: "Gen Z in Your Organisation",
      desc: "Grounded in developmental psychology, not stereotypes.",
      icon: <Users className="w-8 h-8 text-terracotta mb-4" aria-hidden="true" />,
      image: "/images/workshop-corporate.webp",
    },
    {
      title: "Parenting in the Digital Age",
      desc: "For parent communities, schools, and family programmes.",
      icon: <HeartHandshake className="w-8 h-8 text-terracotta mb-4" aria-hidden="true" />,
      image: "/images/family-parenting.webp",
    },
    {
      title: "Student Resilience & Exam Readiness",
      desc: "For schools and colleges (ages 15–22).",
      icon: <GraduationCap className="w-8 h-8 text-terracotta mb-4" aria-hidden="true" />,
      image: "/images/service-student.webp",
    },
    {
      title: "Habit Science for Behaviour Change",
      desc: "Applied behavioural psychology for teams or individuals.",
      icon: <Sprout className="w-8 h-8 text-terracotta mb-4" aria-hidden="true" />,
      image: "/images/service-burnout.webp",
    },
  ];

  const targetAudiences = [
    {
      title: "Corporate, IT & Product Teams",
      desc: "Software teams, startups, and mid-to-large organisations navigating deadline intensity, hybrid fatigue, and cross-functional pressure.",
    },
    {
      title: "HR & People Leadership",
      desc: "Managers and L&D leaders building trauma-informed feedback cultures, psychological safety, and early burnout prevention.",
    },
    {
      title: "Schools, Junior Colleges & Universities",
      desc: "Student cohorts (ages 15–22) and faculty managing academic anxiety, digital distraction, career clarity, and emotional regulation.",
    },
    {
      title: "Parent & Community Groups",
      desc: "Parent collectives across Pune and online seeking structured guidance on adolescent communication and screen boundaries.",
    },
  ];

  const learningOutcomes = [
    "Recognise early nervous-system markers of chronic stress vs acute deadline pressure before burnout develops.",
    "Apply structured CBT cognitive reframing and 60-second somatic down-regulation techniques during high-stakes workdays.",
    "Practice clear, non-defensive boundary statements and feedback conversations that strengthen psychological safety.",
    "Leave with an actionable personal or team implementation checklist tailored to daily routines and meeting cadences.",
  ];

  const sampleAgenda = [
    {
      time: "00:00 – 00:35",
      phase: "Part 1: Baseline Mapping & Context",
      detail:
        "Confidential live reflection on real team stressors, normalising cognitive load and separating controllable triggers from systemic demands.",
    },
    {
      time: "00:35 – 01:25",
      phase: "Part 2: Clinical & Behavioural Frameworks",
      detail:
        "Applied psychology modules covering CBT thought loops, nervous-system regulation, attention hygiene, and practical stress physiology.",
    },
    {
      time: "01:25 – 02:30",
      phase: "Part 3: Guided Practice & Role Scenarios",
      detail:
        "Small-group exercises, boundary scripts, breathwork resets, and realistic workplace or campus scenarios.",
    },
    {
      time: "02:30 – 03:15",
      phase: "Part 4: Implementation Plan & Open Q&A",
      detail:
        "Personal 14-day habit commitments, manager takeaways, and anonymous Q&A facilitated by our psychologists.",
    },
  ];

  const durationOptions = [
    {
      duration: "90 Minutes",
      title: "Focused Deep-Dive",
      detail: "Ideal for leadership townhalls, team offsites, or virtual lunch-and-learn sessions (up to 60 participants).",
    },
    {
      duration: "Half-Day (3–3.5 Hours)",
      title: "Interactive Applied Lab",
      detail: "Includes baseline mapping, interactive small-group practice, role-play, and toolkits (15–35 participants).",
    },
    {
      duration: "Full-Day (6 Hours)",
      title: "Comprehensive Immersion",
      detail: "Two-part curriculum combining individual stress regulation with team communication & culture agreements.",
    },
    {
      duration: "Multi-Week Series",
      title: "4- to 6-Session Cohorts",
      detail: "Bi-weekly spaced learning with habit check-ins and optional 1-on-1 leadership coaching follow-ups.",
    },
  ];

  const workshopFormats = [
    {
      name: "90-minute Sessions",
      desc: "Brief, focused dives into core psychological concepts.",
    },
    {
      name: "Half-day Workshops",
      desc: "Deep explorations with interactive group exercises.",
    },
    {
      name: "Full-day Workshops",
      desc: "Comprehensive immersions for lasting framework adoption.",
    },
    {
      name: "Online Sessions",
      desc: "Accessible interactive formats via Zoom or Microsoft Teams.",
    },
    {
      name: "In-person (Pune)",
      desc: "Direct, facilitated physical sessions across Pune.",
    },
    {
      name: "Hybrid Workshops",
      desc: "Blending in-room and remote team participation.",
    },
    {
      name: "Single Session",
      desc: "Focused intervention for a targeted organisational topic.",
    },
    {
      name: "Workshop Series",
      desc: "Sequential learning spaced across multiple weeks.",
    },
    {
      name: "Ongoing Retainer Programmes",
      desc: "Continuous facilitation support and team check-ins.",
    },
    {
      name: "Customisable Formats",
      desc: "Tailored directly to your organisation's goals.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopTheme | null>(
    null
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Inline Workshop Enquiry state
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryOrg, setEnquiryOrg] = useState("");
  const [enquiryEmail, setEnquiryEmail] = useState("");
  const [enquiryPhone, setEnquiryPhone] = useState("");
  const [enquiryTopic, setEnquiryTopic] = useState("Stress & Burnout Prevention");
  const [enquiryDuration, setEnquiryDuration] = useState("Half-Day (3–3.5 Hours)");
  const [enquiryGroupSize, setEnquiryGroupSize] = useState("15–35 participants");
  const [enquiryNotes, setEnquiryNotes] = useState("");
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryError, setEnquiryError] = useState("");

  const handleEmailSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form || !form.checkValidity()) {
      form?.reportValidity();
      return;
    }
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const attendees = (form.elements.namedItem("attendees") as HTMLInputElement)
      .value;
    const body = encodeURIComponent(
      `Workshop: ${selectedWorkshop?.title || "Corporate/Community"}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAttendees: ${attendees}`
    );

    recordInquiry(
      {
        name,
        email,
        whatsapp: phone,
        question: `Workshop Email Registration: "${selectedWorkshop?.title || "Corporate/Community"}" | Attendees: ${attendees}`,
      },
      {
        source: "Workshops Email Form",
        topic: selectedWorkshop?.title || "Workshop",
        readiness: "high",
      }
    ).catch((err) =>
      console.error("Could not record workshop registration in database:", err)
    );

    const mailLink = document.createElement("a");
    mailLink.href = `mailto:${EMAIL_PRIMARY}?subject=${encodeURIComponent(
      `Workshop Registration: ${selectedWorkshop?.title || "Workshop"}`
    )}&body=${body}`;
    document.body.appendChild(mailLink);
    mailLink.click();
    document.body.removeChild(mailLink);
    setIsSubmitted(true);
  };

  const handleWhatsAppSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form || !form.checkValidity()) {
      form?.reportValidity();
      return;
    }
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const attendees = (form.elements.namedItem("attendees") as HTMLInputElement)
      .value;

    recordInquiry(
      {
        name,
        email,
        whatsapp: phone,
        question: `Workshop Registration: "${selectedWorkshop?.title || "Corporate/Community"}" | Attendees: ${attendees}`,
      },
      {
        source: "Workshops WhatsApp Form",
        topic: selectedWorkshop?.title || "Workshop",
        readiness: "high",
      }
    ).catch((err) =>
      console.error("Could not record workshop registration in database:", err)
    );

    const waUrl = `https://wa.me/917387779238?text=${encodeURIComponent(
      `Workshop Registration:\n\nWorkshop: ${selectedWorkshop?.title || "Workshop"}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAttendees: ${attendees}`
    )}`;
    const link = document.createElement("a");
    link.href = waUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsSubmitted(true);
  };

  const handleInlineEnquiry = async (mode: "email" | "whatsapp") => {
    if (!enquiryName.trim() || !enquiryPhone.trim() || !enquiryEmail.trim()) {
      setEnquiryError("Please enter your name, email address, and phone or WhatsApp number.");
      return;
    }
    setEnquiryError("");

    const summary = `Workshop Enquiry | Topic: ${enquiryTopic} | Org: ${enquiryOrg.trim() || "Not specified"} | Duration: ${enquiryDuration} | Group Size: ${enquiryGroupSize}${enquiryNotes.trim() ? ` | Notes: ${enquiryNotes.trim()}` : ""}`;

    try {
      await recordInquiry(
        {
          name: enquiryName.trim(),
          email: enquiryEmail.trim(),
          whatsapp: enquiryPhone.trim(),
          question: summary,
        },
        {
          source: "Workshops Page Enquiry Form",
          topic: enquiryTopic,
          readiness: "high",
        }
      );
    } catch (err) {
      console.error("Could not record inline workshop enquiry:", err);
    }

    if (mode === "email") {
      const mailLink = document.createElement("a");
      mailLink.href = `mailto:${EMAIL_PRIMARY}?subject=${encodeURIComponent(
        `Workshop Enquiry: ${enquiryTopic}`
      )}&body=${encodeURIComponent(
        `Name: ${enquiryName.trim()}\nOrganisation / School: ${enquiryOrg.trim() || "-"}\nEmail: ${enquiryEmail.trim()}\nPhone: ${enquiryPhone.trim()}\nTopic: ${enquiryTopic}\nPreferred Duration: ${enquiryDuration}\nGroup Size: ${enquiryGroupSize}\nNotes: ${enquiryNotes.trim() || "-"}`
      )}`;
      document.body.appendChild(mailLink);
      mailLink.click();
      document.body.removeChild(mailLink);
    } else {
      const waLink = document.createElement("a");
      waLink.href = `https://wa.me/917387779238?text=${encodeURIComponent(
        `Workshop Enquiry:\nName: ${enquiryName.trim()}\nOrganisation: ${enquiryOrg.trim() || "-"}\nTopic: ${enquiryTopic}\nDuration: ${enquiryDuration}\nGroup Size: ${enquiryGroupSize}\nEmail: ${enquiryEmail.trim()}`
      )}`;
      waLink.target = "_blank";
      waLink.rel = "noopener noreferrer";
      document.body.appendChild(waLink);
      waLink.click();
      document.body.removeChild(waLink);
    }

    setEnquirySubmitted(true);
  };

  const closeModal = () => {
    setSelectedWorkshop(null);
    setIsSubmitted(false);
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [slides.length, isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="bg-soft-sand">
      <SEO
        title="Corporate Wellness Workshops in Pune | Being You Path"
        description="Structured stress, burnout and communication workshops for organisations, schools and communities. Enquire online."
        url="/workshops"
        breadcrumbs={breadcrumbs}
        schema={[LOCAL_BUSINESS_SCHEMA, workshopServiceSchema]}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Carousel — All slides stay in raw HTML DOM; Slide 0 contains single H1 */}
      <section className="w-full bg-soft-sand py-8 md:py-12 lg:py-16 flex justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className="relative rounded-[32px] overflow-hidden shadow-2xl flex flex-col bg-white"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {slides.map((slide, idx) => {
              const isVisible = idx === currentSlide;
              return (
                <div
                  key={idx}
                  className={
                    isVisible
                      ? "flex flex-col lg:flex-row w-full min-h-[560px] lg:min-h-[520px]"
                      : "hidden"
                  }
                >
                  <div className="w-full lg:w-5/12 h-[35vh] md:h-[45vh] lg:h-auto relative shrink-0">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      width={1200}
                      height={800}
                      loading={idx === 0 ? "eager" : "lazy"}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-16 pb-20 md:pb-24 lg:pb-16 flex flex-col items-center lg:items-start text-center lg:text-left justify-center relative z-20">
                    <div className="w-full max-w-2xl mx-auto lg:mx-0">
                      {idx === 0 ? (
                        <h1 className="text-3xl md:text-[40px] lg:text-[46px] leading-tight font-bold text-deep-teal mb-6 font-heading tracking-tight">
                          {slide.title}
                        </h1>
                      ) : (
                        <h2 className="text-3xl md:text-[40px] lg:text-[46px] leading-tight font-bold text-deep-teal mb-6 font-heading tracking-tight">
                          {slide.title}
                        </h2>
                      )}
                      <p className="text-xl md:text-[24px] md:leading-[32px] text-[#A43F23] mb-6 font-semibold font-heading">
                        {slide.subtitle}
                      </p>
                      <p className="text-lg text-charcoal-warm mb-10 leading-relaxed">
                        {slide.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 z-30">
              <button
                type="button"
                onClick={prevSlide}
                className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/95 hover:bg-white shadow-md text-deep-teal hover:text-[#A43F23] backdrop-blur-md flex items-center justify-center transition-all border border-gray-100 cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 z-30">
              <button
                type="button"
                onClick={nextSlide}
                className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/95 hover:bg-white shadow-md text-deep-teal hover:text-[#A43F23] backdrop-blur-md flex items-center justify-center transition-all border border-gray-100 cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute bottom-6 md:bottom-8 lg:bottom-12 right-0 left-0 lg:left-auto lg:right-[29%] z-30 flex justify-center gap-3">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide
                      ? "w-8 bg-[#A43F23]"
                      : "w-2.5 bg-gray-400 hover:bg-[#A43F23]/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Themes */}
      <section className="py-12 md:py-16 lg:py-20 bg-soft-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-[44px] font-semibold text-deep-teal mb-4 font-heading">
              Workshop Themes
            </h2>
            <p className="text-lg text-charcoal-warm">
              Tailored, interactive, and grounded in behavioural science. Click any theme to request a briefing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {workshopThemes.map((theme, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedWorkshop(theme)}
                className="bg-white rounded-[16px] border-t-4 border-t-[#A43F23] border-x border-b border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group flex flex-col h-full cursor-pointer relative overflow-hidden"
              >
                <div className="h-40 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-300 z-10" />
                  <img
                    src={theme.image}
                    alt={theme.title}
                    width={800}
                    height={500}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col relative z-20">
                  <div className="transform group-hover:scale-105 transition-all duration-300 origin-left relative z-10">
                    {theme.icon}
                  </div>
                  <h3 className="text-[20px] font-semibold text-deep-teal mb-3 font-heading leading-snug group-hover:text-[#A43F23] transition-colors duration-300 text-pretty relative z-10">
                    {theme.title}
                  </h3>
                  <p className="text-charcoal-warm text-[15px] leading-relaxed mt-auto relative z-10">
                    {theme.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience & Core Learning Outcomes */}
      <section className="py-14 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A43F23] block mb-2">
                Who We Facilitate For
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-deep-teal font-heading mb-3">
                Audience Cohorts &amp; Contexts
              </h2>
              <p className="text-charcoal-warm text-base">
                Each session is calibrated to the hierarchy, workload rhythm, and developmental stage of the group in the room.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {targetAudiences.map((aud, idx) => (
                <div
                  key={idx}
                  className="bg-soft-sand p-6 rounded-[24px] border border-stone-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0B3A42] mb-4 shadow-xs">
                      <Building2 className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold font-heading text-[#0B3A42] mb-2">
                      {aud.title}
                    </h3>
                    <p className="text-sm text-charcoal-warm leading-relaxed">
                      {aud.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Learning Outcomes */}
            <div className="section-dark lg:col-span-5 bg-[#0B3A42] text-[#FAF9F6] p-8 rounded-[28px] shadow-lg">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F8C988] mb-3">
                <Target className="w-4 h-4" aria-hidden="true" />
                <span>Measurable Takeaways</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#FAF9F6] mb-4">
                Learning Outcomes
              </h2>
              <p className="text-sm text-[#FAF9F6] leading-relaxed mb-6">
                Rather than passive slideshows, participants practice tools they can immediately apply in meetings, study schedules, and family life.
              </p>
              <ul className="space-y-4 text-sm text-[#F5F0E6]">
                {learningOutcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 text-[#F8C988] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sample Half-Day Agenda */}
            <div className="lg:col-span-7 bg-[#FAF9F6] p-8 rounded-[28px] border border-stone-200">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A43F23] mb-3">
                <CalendarDays className="w-4 h-4" aria-hidden="true" />
                <span>Typical Flow</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42] mb-6">
                Sample Half-Day Workshop Agenda
              </h2>
              <div className="space-y-4">
                {sampleAgenda.map((block, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5"
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A43F23] bg-soft-sand px-3 py-1.5 rounded-full shrink-0 w-fit">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {block.time}
                    </span>
                    <div>
                      <h3 className="text-base font-bold font-heading text-[#0B3A42] mb-1">
                        {block.phase}
                      </h3>
                      <p className="text-sm text-charcoal-warm leading-relaxed">
                        {block.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Durations Grid */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold text-deep-teal font-heading mb-3">
                Durations &amp; Delivery Structure
              </h2>
              <p className="text-charcoal-warm text-sm sm:text-base">
                Available in-person across Pune, live online across India, or as hybrid cohorts.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {durationOptions.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-soft-sand p-6 rounded-[24px] border border-stone-200 flex flex-col"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A43F23] mb-2">
                    {item.duration}
                  </span>
                  <h3 className="text-lg font-bold font-heading text-[#0B3A42] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-charcoal-warm leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Formats Marquee */}
      <section className="py-16 md:py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[40px] font-semibold text-deep-teal font-heading">
              Workshop Formats
            </h2>
          </div>
        </div>

        <div className="relative w-full flex overflow-hidden mb-12 py-10">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />
          <div className="animate-marquee flex w-max items-stretch px-3">
            {[...workshopFormats, ...workshopFormats].map((format, idx) => (
              <div
                key={idx}
                className="bg-soft-sand border border-gray-100 shadow-sm px-8 py-8 rounded-[24px] w-[300px] md:w-[320px] whitespace-normal flex flex-col items-center text-center mx-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300 outline-none flex-shrink-0"
              >
                <h3 className="text-lg font-semibold text-deep-teal font-heading mb-3">
                  {format.name}
                </h3>
                <p className="text-[14px] text-charcoal-warm leading-relaxed">
                  {format.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <p className="text-[13px] uppercase tracking-wider text-charcoal-warm font-medium mb-8">
            All workshop formats are customised based on audience type, duration, delivery mode, and organisational goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#workshop-enquiry"
              className="inline-flex items-center justify-center px-10 py-4 text-[13px] font-medium rounded-full text-white bg-deep-teal hover:bg-[#07252A] transition-all duration-300 uppercase tracking-[0.15em] shadow-sm"
            >
              Enquire About a Workshop
            </a>
            <a
              href={PHONE_SECONDARY_HREF}
              className="inline-flex items-center justify-center px-8 py-4 text-[13px] font-medium rounded-full border-2 border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-white transition-all uppercase tracking-[0.12em]"
            >
              Call for Custom Brief
            </a>
          </div>
        </div>
      </section>

      {/* Inline Workshop Enquiry Form */}
      <section
        id="workshop-enquiry"
        className="py-16 md:py-24 bg-soft-sand"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-lg border border-stone-200">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A43F23] block mb-2">
                Custom Brief &amp; Scheduling
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-deep-teal mb-3">
                Workshop Enquiry Form
              </h2>
              <p className="text-sm sm:text-base text-charcoal-warm leading-relaxed">
                Share your team context, preferred duration, and topic. Our facilitation team responds within 24 business hours with a tailored syllabus and commercial proposal.
              </p>
            </div>

            {enquirySubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                  <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-emerald-950">
                  Workshop Enquiry Received
                </h3>
                <p className="text-sm text-emerald-900 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{enquiryName}</strong>. We have logged your enquiry for <strong>{enquiryTopic}</strong> ({enquiryDuration}) and will reply within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setEnquirySubmitted(false);
                    setEnquiryName("");
                    setEnquiryOrg("");
                    setEnquiryEmail("");
                    setEnquiryPhone("");
                    setEnquiryNotes("");
                  }}
                  className="px-6 py-3 rounded-full bg-deep-teal text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleInlineEnquiry("email");
                }}
                className="space-y-6"
              >
                {enquiryError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-900">
                    {enquiryError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="we-name"
                      className="block text-sm font-semibold text-deep-teal mb-1.5"
                    >
                      Your Full Name <span className="text-rose-700">*</span>
                    </label>
                    <input
                      id="we-name"
                      type="text"
                      required
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-sm text-[#2C3E50] focus:border-[#0B3A42] focus:ring-2 focus:ring-[#0B3A42]/20 outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="we-org"
                      className="block text-sm font-semibold text-deep-teal mb-1.5"
                    >
                      Organisation / School / Community
                    </label>
                    <input
                      id="we-org"
                      type="text"
                      value={enquiryOrg}
                      onChange={(e) => setEnquiryOrg(e.target.value)}
                      placeholder="Company, college, or community name"
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-sm text-[#2C3E50] focus:border-[#0B3A42] focus:ring-2 focus:ring-[#0B3A42]/20 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="we-email"
                      className="block text-sm font-semibold text-deep-teal mb-1.5"
                    >
                      Work or Contact Email <span className="text-rose-700">*</span>
                    </label>
                    <input
                      id="we-email"
                      type="email"
                      required
                      value={enquiryEmail}
                      onChange={(e) => setEnquiryEmail(e.target.value)}
                      placeholder="you@organisation.com"
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-sm text-[#2C3E50] focus:border-[#0B3A42] focus:ring-2 focus:ring-[#0B3A42]/20 outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="we-phone"
                      className="block text-sm font-semibold text-deep-teal mb-1.5"
                    >
                      Phone / WhatsApp Number <span className="text-rose-700">*</span>
                    </label>
                    <input
                      id="we-phone"
                      type="tel"
                      required
                      value={enquiryPhone}
                      onChange={(e) => setEnquiryPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-sm text-[#2C3E50] focus:border-[#0B3A42] focus:ring-2 focus:ring-[#0B3A42]/20 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label
                      htmlFor="we-topic"
                      className="block text-sm font-semibold text-deep-teal mb-1.5"
                    >
                      Primary Theme
                    </label>
                    <select
                      id="we-topic"
                      value={enquiryTopic}
                      onChange={(e) => setEnquiryTopic(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-sm text-[#2C3E50] focus:border-[#0B3A42] focus:ring-2 focus:ring-[#0B3A42]/20 outline-none"
                    >
                      {workshopThemes.map((t) => (
                        <option key={t.title} value={t.title}>
                          {t.title}
                        </option>
                      ))}
                      <option value="Custom Curriculum">Custom Curriculum</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="we-duration"
                      className="block text-sm font-semibold text-deep-teal mb-1.5"
                    >
                      Preferred Duration
                    </label>
                    <select
                      id="we-duration"
                      value={enquiryDuration}
                      onChange={(e) => setEnquiryDuration(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-sm text-[#2C3E50] focus:border-[#0B3A42] focus:ring-2 focus:ring-[#0B3A42]/20 outline-none"
                    >
                      <option value="90 Minutes">90 Minutes</option>
                      <option value="Half-Day (3–3.5 Hours)">Half-Day (3–3.5 Hours)</option>
                      <option value="Full-Day (6 Hours)">Full-Day (6 Hours)</option>
                      <option value="Multi-Week Series">Multi-Week Series</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="we-size"
                      className="block text-sm font-semibold text-deep-teal mb-1.5"
                    >
                      Estimated Group Size
                    </label>
                    <select
                      id="we-size"
                      value={enquiryGroupSize}
                      onChange={(e) => setEnquiryGroupSize(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-sm text-[#2C3E50] focus:border-[#0B3A42] focus:ring-2 focus:ring-[#0B3A42]/20 outline-none"
                    >
                      <option value="Under 15 participants">Under 15 participants</option>
                      <option value="15–35 participants">15–35 participants</option>
                      <option value="35–75 participants">35–75 participants</option>
                      <option value="75+ audience / townhall">75+ audience / townhall</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="we-notes"
                    className="block text-sm font-semibold text-deep-teal mb-1.5"
                  >
                    Goals, Delivery Mode (Pune In-Person / Online), &amp; Timeline
                  </label>
                  <textarea
                    id="we-notes"
                    rows={3}
                    value={enquiryNotes}
                    onChange={(e) => setEnquiryNotes(e.target.value)}
                    placeholder="Tell us about your team, preferred dates, and key challenges you want addressed..."
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-sm text-[#2C3E50] focus:border-[#0B3A42] focus:ring-2 focus:ring-[#0B3A42]/20 outline-none resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => void handleInlineEnquiry("email")}
                    className="flex-1 py-4 px-6 bg-[#A43F23] hover:bg-[#823018] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>Send Enquiry via Email</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleInlineEnquiry("whatsapp")}
                    className="flex-1 py-4 px-6 bg-[#15803D] hover:bg-[#166534] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Send Enquiry via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {selectedWorkshop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0B3A42]/80 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-soft-sand rounded-[24px] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
                <div>
                  <h3 className="text-xl font-bold text-deep-teal font-heading">
                    Register for Workshop
                  </h3>
                  <p className="text-sm text-[#A43F23] font-medium mt-1">
                    {selectedWorkshop.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close registration modal"
                  className="text-gray-700 hover:text-[#A43F23] transition-colors min-w-[44px] min-h-[44px] p-2 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-green-700" />
                    </div>
                    <h4 className="text-2xl font-bold text-deep-teal font-heading mb-4">
                      Registration Received
                    </h4>
                    <p className="text-charcoal-warm mb-8">
                      Thank you for your interest in the{" "}
                      <span className="font-semibold">
                        {selectedWorkshop.title}
                      </span>{" "}
                      workshop. We will be in touch with you shortly to coordinate details.
                    </p>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-8 py-3 bg-deep-teal text-white rounded-full font-medium tracking-wide hover:bg-[#07252A] transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-deep-teal mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#A43F23] focus:ring focus:ring-[#A43F23]/20 bg-white transition-all outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-deep-teal mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#A43F23] focus:ring focus:ring-[#A43F23]/20 bg-white transition-all outline-none"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-deep-teal mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#A43F23] focus:ring focus:ring-[#A43F23]/20 bg-white transition-all outline-none"
                        placeholder="+91"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="attendees"
                        className="block text-sm font-medium text-deep-teal mb-2"
                      >
                        Estimated Number of Attendees
                      </label>
                      <input
                        type="number"
                        id="attendees"
                        required
                        min="1"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#A43F23] focus:ring focus:ring-[#A43F23]/20 bg-white transition-all outline-none"
                        placeholder="15"
                      />
                    </div>
                    <div className="pt-2 flex flex-col sm:flex-row gap-4">
                      <button
                        type="button"
                        onClick={handleEmailSubmit}
                        className="flex-1 py-4 bg-[#A43F23] text-white rounded-xl font-semibold tracking-wide hover:bg-[#823018] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap px-4 flex justify-center items-center gap-2 cursor-pointer"
                      >
                        <Mail className="w-5 h-5" />
                        Register via Email
                      </button>
                      <button
                        type="button"
                        onClick={handleWhatsAppSubmit}
                        className="flex-1 py-4 bg-[#15803D] text-white rounded-xl font-semibold tracking-wide hover:bg-[#166534] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap px-4 flex justify-center items-center gap-2 cursor-pointer"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="none"
                          className="w-5 h-5"
                        >
                          <path d="M12.031 0C5.398 0 .016 5.378.016 12.015c0 2.128.553 4.202 1.602 6.03L0 24l6.113-1.604a11.967 11.967 0 005.918 1.564h.005c6.634 0 12.014-5.38 12.014-12.017C24.05 5.378 18.665 0 12.031 0zm0 21.964c-1.802 0-3.567-.485-5.11-1.401l-.367-.217-3.794.996 1.015-3.698-.238-.378a9.98 9.98 0 01-1.521-5.263c0-5.518 4.492-10.013 10.015-10.013 5.517 0 10.014 4.495 10.014 10.013 0 5.517-4.497 10.013-10.014 10.013zm5.494-7.514c-.301-.151-1.782-.879-2.059-.979-.276-.1-.478-.152-.678.151-.2.302-.779.979-.955 1.18-.175.201-.351.226-.652.076-.301-.151-1.272-.469-2.424-1.496-.897-.798-1.503-1.784-1.678-2.086-.176-.302-.019-.465.132-.615.136-.135.301-.351.452-.526.151-.176.201-.301.301-.502.1-.2.051-.377-.025-.527-.076-.151-.678-1.633-.929-2.235-.245-.589-.494-.509-.678-.518-.175-.008-.376-.011-.577-.011-.2 0-.527.075-.802.376-.276.301-1.054 1.029-1.054 2.508s1.079 2.909 1.23 3.11c.151.2 2.122 3.238 5.14 4.542.718.31 1.28.495 1.717.635.72.228 1.376.195 1.894.118.579-.085 1.782-.728 2.033-1.431.251-.703.251-1.306.176-1.432-.075-.125-.276-.2-.577-.35z" />
                        </svg>
                        Register via WhatsApp
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
