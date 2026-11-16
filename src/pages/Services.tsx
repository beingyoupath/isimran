import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { recordInquiry } from "../lib/inquiries";
import {
  CALENDLY_URL,
  CLINIC_ADDRESS,
  EMAIL_PRIMARY,
  LOCAL_BUSINESS_SCHEMA,
  TELE_MANAS_NOTICE,
  WHATSAPP_URL,
} from "../lib/seoConfig";
import {
  Phone,
  MapPin,
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  Globe,
  ArrowRight,
  ArrowUpRight,
  X,
  Check,
  Send,
  MessageCircle,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  category: "clinical" | "relationships" | "career" | "mindfulness";
  categoryLabel: string;
  audience: string;
  desc: string;
  whoItFor: string[];
  format: string;
  image: string;
  organicPath: string;
  tag: string;
  clinicalMethods: string[];
}

const ALL_SERVICES: ServiceItem[] = [
  {
    id: "cbt",
    title: "Cognitive Behavioural Therapy (CBT)",
    category: "clinical",
    categoryLabel: "Clinical & Emotional",
    audience: "For Overthinking, Anxiety & Low Mood Patterns",
    desc: "Structured, goal-oriented psychotherapy designed to map how recurring thoughts, physical tension, and daily habits interact. Sessions focus on actionable cognitive tools and behavioural experiments rather than abstract theory.",
    whoItFor: [
      "Adults dealing with persistent worry loops",
      "Individuals navigating low mood and avoidance cycles",
      "Professionals seeking clear, structured tools",
      "Clients wanting measurable progress across sessions",
    ],
    format: "1:1 Sessions | 50–60 minutes | Deccan Gymkhana, Pune or Online Video",
    image: "/images/hero-path.webp",
    organicPath: "/services/cbt-therapy-pune",
    tag: "Structured CBT",
    clinicalMethods: [
      "Cognitive Restructuring",
      "Behavioural Activation",
      "Thought Records",
      "Graded Exposure",
    ],
  },
  {
    id: "anxiety",
    title: "Stress & Anxiety Counselling",
    category: "clinical",
    categoryLabel: "Clinical & Emotional",
    audience: "For Chronic Worry, Racing Thoughts & Somatic Tension",
    desc: "We combine Cognitive Behavioural Therapy (CBT), somatic grounding, and nervous-system regulation tools to help you calm anticipatory dread, manage panic symptoms, and build steadier daily routines.",
    whoItFor: [
      "Overthinkers stuck in repetitive 'what-if' loops",
      "Individuals experiencing sudden panic or restlessness",
      "Social anxiety and performance apprehension",
      "Professionals operating on constant deadline stress",
    ],
    format: "1:1 Sessions | 50–60 minutes | Deccan Gymkhana, Pune or Online Video",
    image: "/images/service-anxiety.webp",
    organicPath: "/services/stress-anxiety-counselling-pune",
    tag: "CBT & Somatic Grounding",
    clinicalMethods: [
      "CBT Cognitive Restructuring",
      "Autonomic Regulation",
      "Exposure Protocols",
      "Cognitive Defusion",
    ],
  },
  {
    id: "burnout",
    title: "Burnout & Workplace Stress Counselling",
    category: "career",
    categoryLabel: "Career & Workplace",
    audience: "For High-Pressure Professionals Facing Exhaustion & Cynicism",
    desc: "Burnout requires more than a weekend break—it calls for recalibrating workload demands, nervous-system recovery, and internal expectations. We equip you to rebuild sustainable energy and workplace boundaries.",
    whoItFor: [
      "Tech professionals, engineers, and corporate managers",
      "Startup founders and leaders under chronic pressure",
      "Professionals struggling with work-night sleep disruption",
      "Employees feeling depleted or emotionally detached",
    ],
    format: "1:1 Sessions | 50–60 minutes | Deccan Gymkhana, Pune or Online Video",
    image: "/images/service-burnout.webp",
    organicPath: "/services/burnout-counselling-pune",
    tag: "Burnout Recovery",
    clinicalMethods: [
      "Energy Audits",
      "Boundary Architecture",
      "Nervous-System Regulation",
    ],
  },
  {
    id: "self-esteem",
    title: "Self-Esteem & Identity Therapy",
    category: "clinical",
    categoryLabel: "Clinical & Emotional",
    audience: "For People-Pleasing, Imposter Syndrome & Inner Critics",
    desc: "We help you trace where harsh self-criticism began, uncouple your sense of worth from external validation, and practise clear, guilt-free boundaries in family and professional relationships.",
    whoItFor: [
      "Habitual people-pleasers reluctant to say no",
      "Achievers navigating chronic imposter feelings",
      "Individuals experiencing guilt when prioritising rest",
      "Anyone seeking steadier self-trust",
    ],
    format: "1:1 Sessions | 50–60 minutes | Deccan Gymkhana, Pune or Online Video",
    image: "/images/service-self-esteem.webp",
    organicPath: "/services/self-esteem-therapy-pune",
    tag: "Boundary Clarity & Worth",
    clinicalMethods: [
      "CBT Core Beliefs",
      "Boundary Practice",
      "Self-Compassion Training",
      "Values Clarification",
    ],
  },
  {
    id: "overthinking",
    title: "Overthinking Therapy & Counselling",
    category: "mindfulness",
    categoryLabel: "Mindfulness & Habits",
    audience: "For Breaking Rumination Loops & Late-Night Overanalysis",
    desc: "Learn how to distinguish constructive problem-solving from repetitive mental loops. Using cognitive techniques and attention training, you build practical habits for stepping out of rumination.",
    whoItFor: [
      "Adults replaying conversations or second-guessing decisions",
      "People lying awake caught in nocturnal worry",
      "Perfectionists delayed by analysis paralysis",
    ],
    format: "1:1 Sessions | 50–60 minutes | Pune or Online Across India",
    image: "/images/mindfulness-calm.webp",
    organicPath: "/services/overthinking-therapy",
    tag: "Rumination & Clarity",
    clinicalMethods: [
      "Attention Training",
      "Worry Postponement",
      "Cognitive Defusion",
    ],
  },
  {
    id: "career",
    title: "Career Counselling in Pune",
    category: "career",
    categoryLabel: "Career & Workplace",
    audience: "For Students, Graduates & Professionals Seeking Direction",
    desc: "Combine strengths profiling, values mapping, and structured behavioural design so students and mid-career professionals can evaluate pivots and career steps with clarity.",
    whoItFor: [
      "Working professionals considering a role or domain shift",
      "University graduates clarifying next steps",
      "Students and parents aligning academic streams",
      "Professionals feeling unmotivated despite stability",
    ],
    format: "1:1 Strategic Sessions | 60 minutes | Pune or Online",
    image: "/images/service-career.webp",
    organicPath: "/services/career-counselling-pune",
    tag: "Strengths & Behavioural Design",
    clinicalMethods: [
      "Strengths Profiling",
      "Values Inventory",
      "Decision Matrix Design",
    ],
  },
  {
    id: "student",
    title: "Student & Adolescent Counselling",
    category: "clinical",
    categoryLabel: "Clinical & Emotional",
    audience: "Exam Stress, Emotional Regulation & Teen Guidance",
    desc: "Calm, non-judgmental support for school and university students managing academic pressure, focus blocks, and emotional overwhelm, with thoughtful parent alignment where helpful.",
    whoItFor: [
      "Competitive exam aspirants and university students",
      "Adolescents balancing parental expectations and identity",
      "Students struggling with test anxiety and procrastination",
    ],
    format: "1:1 Sessions | 50–60 minutes | Deccan Gymkhana, Pune or Online",
    image: "/images/service-student.webp",
    organicPath: "/services/student-adolescent-counselling-pune",
    tag: "Students & Teens",
    clinicalMethods: [
      "Study Routine Calibration",
      "Emotional Regulation",
      "Parent-Teen Alignment",
    ],
  },
  {
    id: "online",
    title: "Online Therapy Across India",
    category: "clinical",
    categoryLabel: "Clinical & Emotional",
    audience: "Confidential Video Counselling With Evening & Weekend Slots",
    desc: "Consistent 1-on-1 counselling from home or office across Mumbai, Bengaluru, Delhi NCR, Hyderabad, Chennai, Kolkata, Pune, and global time zones.",
    whoItFor: [
      "Clients anywhere in India wanting structured continuity",
      "Professionals requiring evening or weekend appointments",
      "Indians living abroad seeking culturally grounded support",
    ],
    format: "Confidential Video Sessions | 50–60 minutes | Pan-India & Global",
    image: "/images/service-online.webp",
    organicPath: "/services/online-therapy-india",
    tag: "Pan-India Video",
    clinicalMethods: [
      "Video Consultations",
      "Digital Reflection Tools",
      "Structured Follow-Ups",
    ],
  },
  {
    id: "depression",
    title: "Depression & Low Mood Therapy",
    category: "clinical",
    categoryLabel: "Clinical & Emotional",
    audience: "For Emotional Numbness, Persistent Fatigue & Low Motivation",
    desc: "Paced, compassionate psychological work using Behavioural Activation and Cognitive Therapy to help restore momentum, sleep stability, and connection without forced positivity.",
    whoItFor: [
      "Individuals experiencing prolonged low mood or apathy",
      "Those navigating grief, emotional exhaustion, or isolation",
      "People noticing loss of interest in everyday activities",
    ],
    format: "1:1 Sessions | 50–60 minutes | Pune or Online",
    image: "/images/service-depression.webp",
    organicPath: "/services/depression-counselling-pune",
    tag: "Behavioural Activation",
    clinicalMethods: [
      "Behavioural Activation",
      "Compassion-Focused Tools",
      "Routine Stabilization",
    ],
  },
  {
    id: "relationships",
    title: "Relationship & Couples Counselling",
    category: "relationships",
    categoryLabel: "Relationships & Family",
    audience: "Communication, Trust & Family Dynamics",
    desc: "A structured, impartial container for individuals, partners, and families to identify recurring argument cycles, listen across defensive patterns, and strengthen emotional safety.",
    whoItFor: [
      "Partners caught in recurring miscommunication cycles",
      "Premarital couples building shared foundations",
      "Parents seeking calmer household communication",
    ],
    format: "Couples & Family Sessions | 75 minutes | Pune or Online",
    image: "/images/family-parenting.webp",
    organicPath: "/services/relationship-couples-counselling-pune",
    tag: "Relationships & Communication",
    clinicalMethods: [
      "Emotionally Focused Concepts",
      "Structured Dialogue",
      "Repair Strategies",
    ],
  },
  {
    id: "trauma",
    title: "Trauma-Informed & Somatic Counselling",
    category: "mindfulness",
    categoryLabel: "Mindfulness & Habits",
    audience: "For Nervous-System Stabilization & Difficult Past Experiences",
    desc: "Carefully paced counselling focused on safety, somatic awareness, and gradual processing so difficult past experiences are addressed without overwhelm.",
    whoItFor: [
      "Adults carrying relational or childhood emotional wounds",
      "Individuals noticing chronic hypervigilance or shutdown",
      "Clients seeking gentle nervous-system stabilization",
    ],
    format: "1:1 Sessions | 50–60 minutes | Deccan Gymkhana, Pune or Online",
    image: "/images/hero-path.webp",
    organicPath: "/services/trauma-counselling-pune",
    tag: "Somatic Stabilization",
    clinicalMethods: [
      "Somatic Grounding",
      "Titrated Processing",
      "Safety Anchoring",
    ],
  },
  {
    id: "corporate",
    title: "Corporate & Institutional Workshops",
    category: "career",
    categoryLabel: "Career & Workplace",
    audience: "Stress, Burnout & Communication Modules for Teams",
    desc: "Interactive, evidence-informed workshops led by our psychologists for workplaces, universities, and leadership teams across Pune and India.",
    whoItFor: [
      "HR, People Operations, and L&D leaders",
      "Engineering and product managers leading hybrid teams",
      "Schools and universities supporting student wellbeing",
    ],
    format: "Workshops & Retreats | In-Person Pune or Virtual Pan-India",
    image: "/images/workshop-corporate.webp",
    organicPath: "/workshops",
    tag: "Workshops & L&D",
    clinicalMethods: [
      "Burnout Prevention",
      "Manager Communication",
      "Psychological Safety",
    ],
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] =
    useState<ServiceItem | null>(null);
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquirySubmittedSuccessfully, setInquirySubmittedSuccessfully] =
    useState(false);

  const breadcrumbs = [{ name: "Services", url: "/services" }];

  const tabOptions = [
    { id: "all", label: "All Focus Areas", count: ALL_SERVICES.length },
    {
      id: "clinical",
      label: "Clinical & Emotional",
      count: ALL_SERVICES.filter((s) => s.category === "clinical").length,
    },
    {
      id: "relationships",
      label: "Relationships & Family",
      count: ALL_SERVICES.filter((s) => s.category === "relationships").length,
    },
    {
      id: "career",
      label: "Career & Workplace",
      count: ALL_SERVICES.filter((s) => s.category === "career").length,
    },
    {
      id: "mindfulness",
      label: "Mindfulness & Habits",
      count: ALL_SERVICES.filter((s) => s.category === "mindfulness").length,
    },
  ];

  const triggerExternalLink = (
    url: string,
    target: "_blank" | "_self" = "_blank"
  ) => {
    const a = document.createElement("a");
    a.href = url;
    if (target === "_blank") {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenCalendly = () => triggerExternalLink(CALENDLY_URL, "_blank");

  const handleOpenWhatsAppQuick = (serviceName?: string) => {
    const text = encodeURIComponent(
      serviceName
        ? `Hello Being You Path,\nI am interested in scheduling a consultation regarding: "${serviceName}".\nPlease share your earliest available slots (Deccan Gymkhana, Pune clinic or online video).\nThank you!`
        : `Hello Being You Path,\nI would like to schedule a 1-on-1 session / free 15-minute clarity call.\nPlease share available slots.\nThank you!`
    );
    triggerExternalLink(`${WHATSAPP_URL}?text=${text}`, "_blank");
  };

  const handleInquirySubmitEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = (
      form.elements.namedItem("service_name") as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem("service_email") as HTMLInputElement
    ).value.trim();
    const phone = (
      form.elements.namedItem("service_phone") as HTMLInputElement
    ).value.trim();
    const message = (
      form.elements.namedItem("service_message") as HTMLTextAreaElement
    ).value.trim();
    const serviceTitle =
      selectedServiceForInquiry?.title || "Service Consultation";

    setIsSubmittingInquiry(true);
    recordInquiry(
      {
        name,
        email,
        whatsapp: phone,
        question: `[Service Inquiry: "${serviceTitle}"] Requirements: ${message}`,
      },
      {
        source: "Services Modal Email Form",
        topic: serviceTitle,
        readiness: "high",
      }
    )
      .then(() => setIsSubmittingInquiry(false))
      .catch(() => setIsSubmittingInquiry(false));

    const subject = encodeURIComponent(
      `Service Inquiry: ${serviceTitle} - ${name}`
    );
    const body = encodeURIComponent(
      `Service Inquiry: ${serviceTitle}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nDescription / Requirements:\n${message}`
    );
    triggerExternalLink(
      `mailto:${EMAIL_PRIMARY}?subject=${subject}&body=${body}`,
      "_self"
    );
    setInquirySubmittedSuccessfully(true);
  };

  const handleInquirySubmitWhatsApp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = (
      form.elements.namedItem("service_name") as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem("service_email") as HTMLInputElement
    ).value.trim();
    const phone = (
      form.elements.namedItem("service_phone") as HTMLInputElement
    ).value.trim();
    const message = (
      form.elements.namedItem("service_message") as HTMLTextAreaElement
    ).value.trim();
    const serviceTitle =
      selectedServiceForInquiry?.title || "Service Consultation";

    setIsSubmittingInquiry(true);
    recordInquiry(
      {
        name,
        email,
        whatsapp: phone,
        question: `[WhatsApp Inquiry: "${serviceTitle}"] Requirements: ${message}`,
      },
      {
        source: "Services Modal WhatsApp Form",
        topic: serviceTitle,
        readiness: "high",
      }
    )
      .then(() => setIsSubmittingInquiry(false))
      .catch(() => setIsSubmittingInquiry(false));

    const waText = encodeURIComponent(
      `*Service Inquiry: ${serviceTitle}*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n\n*My Requirements / Situation:*\n${message}`
    );
    triggerExternalLink(`${WHATSAPP_URL}?text=${waText}`, "_blank");
    setInquirySubmittedSuccessfully(true);
  };

  const portalLinks = [
    {
      title: "CBT Therapy in Pune & Online",
      path: "/services/cbt-therapy-pune",
      badge: "Cognitive Behavioural Therapy",
      desc: "Structured sessions for overthinking, worry cycles, and low mood using practical CBT tools.",
    },
    {
      title: "Stress & Anxiety Counselling in Pune",
      path: "/services/stress-anxiety-counselling-pune",
      badge: "Prabhat Road & Online",
      desc: "Evidence-based support for generalized stress, panic symptoms, and nervous-system regulation.",
    },
    {
      title: "Burnout Counselling in Pune",
      path: "/services/burnout-counselling-pune",
      badge: "Workplace & Fatigue",
      desc: "Recover from work burnout with CBT, rest calibration, and boundary tools.",
    },
    {
      title: "Self-Esteem Therapy in Pune",
      path: "/services/self-esteem-therapy-pune",
      badge: "Identity & Boundaries",
      desc: "Build a steadier sense of self-worth and step out of habitual people-pleasing.",
    },
    {
      title: "Overthinking Therapy & Counselling",
      path: "/services/overthinking-therapy",
      badge: "Rumination Loops",
      desc: "Cognitive techniques for interrupting worry cycles and late-night mental loops.",
    },
    {
      title: "Career Counselling in Pune",
      path: "/services/career-counselling-pune",
      badge: "Students & Professionals",
      desc: "Strengths profiling combined with behavioural design for confident career choices.",
    },
    {
      title: "Student & Adolescent Counselling",
      path: "/services/student-adolescent-counselling-pune",
      badge: "Teens & Exams",
      desc: "Support for exam stress, emotional regulation, and academic pressure with parent alignment.",
    },
    {
      title: "Online Therapy Across India",
      path: "/services/online-therapy-india",
      badge: "Evening & Weekend Slots",
      desc: "Confidential video counselling with qualified psychologists from anywhere in India.",
    },
    {
      title: "Deccan Gymkhana & Prabhat Road Clinic",
      path: "/services/counselling-prabhat-road-pune",
      badge: "In-Person Pune",
      desc: `Visit our clinic at ${CLINIC_ADDRESS}.`,
    },
    {
      title: "Corporate Wellness Workshops",
      path: "/workshops",
      badge: "Organisations & Schools",
      desc: "Structured stress, burnout, and workplace communication programs.",
    },
    {
      title: "Depression & Low Mood Therapy",
      path: "/services/depression-counselling-pune",
      badge: "Prabhat Road & Online",
      desc: "Paced Behavioural Activation and compassionate support for low energy and numbness.",
    },
    {
      title: "Relationship & Couples Counselling",
      path: "/services/relationship-couples-counselling-pune",
      badge: "Partners & Family",
      desc: "Practical dialogue tools for recurring conflict, trust, and family dynamics.",
    },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#2C3E50]">
      <SEO
        title="Counselling & Therapy Services in Pune | Being You Path"
        description="Explore CBT, stress, burnout, self-esteem, career and student counselling in Pune and online. Choose a session and book on Calendly."
        url="/services"
        breadcrumbs={breadcrumbs}
        schema={LOCAL_BUSINESS_SCHEMA}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <section className="relative bg-white border-b border-stone-200/80 pt-10 pb-14 md:pt-14 md:pb-20 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[60px]">
          <div className="max-w-3xl text-left">
            <h1 className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#9E3F24] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Counselling &amp; Therapy Services in Pune &amp; Online</span>
            </h1>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#0B3A42] tracking-tight leading-tight">
              Support That Fits Your Life — Not Someone Else&apos;s Diagnostic Box.
            </h2>

            <p className="text-base sm:text-lg text-stone-700 mt-4 leading-relaxed font-normal">
              Whether you are managing chronic overthinking, navigating relationship friction, or untangling career burnout, we combine clinical psychological rigour with genuine human warmth.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-medium text-stone-700">
              <div className="flex items-center gap-1.5 bg-stone-100 px-3.5 py-2 rounded-full text-[#0B3A42]">
                <MapPin className="w-3.5 h-3.5 text-[#A43F23]" aria-hidden="true" />
                <span>Near Prabhat Road, Deccan Gymkhana, Pune</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-100 px-3.5 py-2 rounded-full text-[#0B3A42]">
                <Globe className="w-3.5 h-3.5 text-[#0B3A42]" aria-hidden="true" />
                <span>Video Sessions Across India</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-900 px-3.5 py-2 rounded-full font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                <span>Confidential In-Person &amp; Online Care</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={handleOpenCalendly}
                className="px-6 py-3.5 min-h-[44px] rounded-full bg-[#0B3A42] hover:bg-[#07252A] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 1-on-1 on Calendly</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenWhatsAppQuick()}
                className="px-6 py-3.5 min-h-[44px] rounded-full bg-[#1E7E45] hover:bg-[#176436] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Rapid Booking</span>
              </button>

              <Link
                to="/guides/how-to-choose-a-psychologist-pune"
                className="px-5 py-3.5 min-h-[44px] rounded-full bg-stone-100 hover:bg-stone-200 text-[#0B3A42] text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>How to choose a psychologist in Pune</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Service Menu with Tabs (all service cards remain in raw HTML DOM) */}
      <section id="service-menu" className="py-12 md:py-16 lg:py-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[60px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200/80 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#9E3F24]">
                Clinical &amp; Counselling Focus Areas
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42] tracking-tight mt-1">
                Explore Focused Practice Areas
              </h2>
              <p className="text-sm text-stone-700 mt-1 max-w-xl">
                Select a domain below or open the dedicated service page for details on what we work on, first session flow, and booking.
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-1.5 p-1.5 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
              {tabOptions.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-2.5 min-h-[44px] sm:min-h-0 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#FAF9F6] border border-stone-300 text-[#0B3A42] shadow-xs"
                        : "text-stone-700 hover:text-stone-900"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{tab.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? "bg-[#0B3A42] text-white"
                            : "bg-stone-100 text-stone-700"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ALL_SERVICES.map((service) => {
              const isVisible =
                activeTab === "all" || service.category === activeTab;

              return (
                <div
                  key={service.id}
                  className={
                    isVisible
                      ? "bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                      : "hidden"
                  }
                >
                  <div>
                    <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-stone-900">
                      <img
                        src={service.image}
                        alt={service.title}
                        width={800}
                        height={450}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/25" />
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-white text-[#0B3A42] text-[11px] font-bold tracking-wide shadow-xs">
                          {service.tag}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-black/75 text-[#F5F0E6] text-[10px] font-medium border border-white/20">
                          {service.categoryLabel}
                        </span>
                      </div>
                      <div className="section-dark absolute bottom-4 left-4 right-4">
                        <span className="text-xs text-[#F8C988] font-bold block uppercase tracking-wider mb-1 drop-shadow-sm">
                          Deccan Gymkhana, Pune &amp; Online
                        </span>
                        <h3 className="card-title text-xl sm:text-2xl font-bold font-heading text-[#FAF9F6] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 md:p-7">
                      <div className="text-xs font-semibold text-[#9E3F24] uppercase tracking-wider mb-2">
                        {service.audience}
                      </div>
                      <p className="text-sm text-stone-700 leading-relaxed">
                        {service.desc}
                      </p>

                      <div className="mt-5 pt-4 border-t border-stone-100">
                        <span className="text-xs font-bold text-[#0B3A42] uppercase tracking-wider block mb-2.5">
                          Who This Supports:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                          {service.whoItFor.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 p-3.5 rounded-xl bg-stone-50 border border-stone-200/60 text-xs flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[#0B3A42] font-semibold">
                          <Clock className="w-3.5 h-3.5 text-[#A43F23]" aria-hidden="true" />
                          <span>{service.format}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 text-stone-700 pt-1 border-t border-stone-200/50">
                          <span className="font-semibold text-stone-800">Modalities:</span>
                          {service.clinicalMethods.map((method) => (
                            <span
                              key={method}
                              className="bg-white px-2 py-0.5 rounded text-[11px] border border-stone-200/60"
                            >
                              {method}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-100">
                    <Link
                      to={service.organicPath}
                      className="w-full sm:w-auto text-xs font-bold text-[#0B3A42] hover:text-[#A43F23] transition-colors flex items-center justify-center gap-1.5 py-2.5 min-h-[44px]"
                    >
                      <span>View Service Details &amp; FAQs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedServiceForInquiry(service);
                          setInquirySubmittedSuccessfully(false);
                        }}
                        className="flex-1 sm:flex-initial px-4 py-2.5 min-h-[44px] rounded-xl bg-stone-100 hover:bg-stone-200 text-[#0B3A42] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                      >
                        Send Inquiry
                      </button>
                      <button
                        type="button"
                        onClick={handleOpenCalendly}
                        className="flex-1 sm:flex-initial px-4 py-2.5 min-h-[44px] rounded-xl bg-[#0B3A42] hover:bg-[#07252A] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <span>Book Session</span>
                        <Calendar className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Spotlight Directory of All Service Pages */}
      <section className="section-dark py-16 bg-[#0B3A42] text-[#FAF9F6] border-t border-stone-200/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C85C3E]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#134954]/60 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[60px]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F8C988]">
              DEDICATED SERVICE GUIDES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#FAF9F6] tracking-tight mt-2 drop-shadow-sm">
              Pune Clinic &amp; Pan-India Services
            </h2>
            <p className="text-sm sm:text-base text-[#FAF9F6] mt-3 max-w-2xl mx-auto leading-relaxed">
              Detailed pages covering what we work on, first session expectations, and direct booking at Prabhat Road, Deccan Gymkhana, Pune or via online video across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {portalLinks.map((head) => (
              <Link
                key={head.path}
                to={head.path}
                className="p-5 rounded-2xl bg-[#0f434c] hover:bg-[#144f59] border border-white/15 hover:border-[#F8C988]/60 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#F8C988] uppercase tracking-wider mb-2">
                    <span>{head.badge}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#FAF9F6] group-hover:text-[#F8C988] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <h3 className="card-title text-base font-bold font-heading text-[#FAF9F6] group-hover:text-[#F8C988] transition-colors leading-snug">
                    {head.title}
                  </h3>
                  <p className="text-xs text-[#FAF9F6] mt-2 leading-relaxed">
                    {head.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/15 text-[11px] font-semibold text-[#FAF9F6] flex items-center justify-between">
                  <span>View Service Guide</span>
                  <span className="text-[#F8C988] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Global Booking CTA */}
      <section className="py-14 bg-[#FAF9F6] border-t border-stone-200/80">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[60px]">
          <div className="section-dark bg-[#0B3A42] text-[#FAF9F6] rounded-3xl p-8 md:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="max-w-2xl text-left z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F8C988]">
                Start With Clarity
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#FAF9F6] tracking-tight mt-1">
                Schedule a Free 15-Minute Clarity Call
              </h2>
              <p className="text-sm text-[#F5F0E6] mt-2 leading-relaxed">
                Not sure which service is right for you? Read our guide on{" "}
                <Link
                  to="/guides/how-to-choose-a-psychologist-pune"
                  className="underline underline-offset-4 text-[#F8C988] hover:text-white font-semibold"
                >
                  how to choose a psychologist or counsellor in Pune
                </Link>{" "}
                or speak briefly with our team to understand how we work.
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-[#F8C988]">
                <MapPin className="w-4 h-4 text-[#F8C988]" aria-hidden="true" />
                <span>{CLINIC_ADDRESS}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto z-10">
              <button
                type="button"
                onClick={handleOpenCalendly}
                className="px-6 py-3.5 min-h-[44px] rounded-full bg-white text-[#0B3A42] hover:bg-stone-100 text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#0B3A42]" />
                <span>Book on Calendly</span>
              </button>
              <Link
                to="/contact"
                className="px-6 py-3.5 min-h-[44px] rounded-full bg-[#A43F23] text-white hover:bg-[#823018] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-stone-700 mt-8 max-w-3xl mx-auto leading-relaxed">
            {TELE_MANAS_NOTICE}
          </p>
        </div>
      </section>

      {/* Service Inquiry Modal */}
      {selectedServiceForInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200/80 overflow-hidden z-10 max-h-[90vh] flex flex-col">
            <div className="p-6 bg-white border-b border-stone-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A43F23]">
                  Service Consultation Inquiry
                </span>
                <h3
                  id="service-modal-title"
                  className="text-xl font-bold font-heading text-[#0B3A42]"
                >
                  {selectedServiceForInquiry.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedServiceForInquiry(null)}
                className="p-2 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Close form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {inquirySubmittedSuccessfully ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold font-heading text-[#0B3A42] mb-2">
                    Inquiry Dispatched
                  </h4>
                  <p className="text-xs text-stone-700 max-w-sm mx-auto leading-relaxed mb-6">
                    Thank you for reaching out regarding{" "}
                    <strong>{selectedServiceForInquiry.title}</strong>. Our practitioners will review your message and reply within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedServiceForInquiry(null)}
                    className="px-6 py-3 min-h-[44px] rounded-full bg-[#0B3A42] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmitEmail} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B3A42] uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="service_name"
                      required
                      placeholder="e.g. Aditi Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#0B3A42] focus:ring-1 focus:ring-[#0B3A42] bg-white text-xs text-stone-800 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B3A42] uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="service_email"
                        required
                        placeholder="aditi@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#0B3A42] focus:ring-1 focus:ring-[#0B3A42] bg-white text-xs text-stone-800 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B3A42] uppercase tracking-wider mb-1.5">
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="tel"
                        name="service_phone"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#0B3A42] focus:ring-1 focus:ring-[#0B3A42] bg-white text-xs text-stone-800 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B3A42] uppercase tracking-wider mb-1.5">
                      Tell Us About Your Requirement
                    </label>
                    <textarea
                      name="service_message"
                      rows={3}
                      required
                      placeholder="Briefly describe what you are looking to address or preferred timings..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#0B3A42] focus:ring-1 focus:ring-[#0B3A42] bg-white text-xs text-stone-800 outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="submit"
                      disabled={isSubmittingInquiry}
                      className="flex-1 py-3 px-4 min-h-[44px] rounded-xl bg-[#0B3A42] hover:bg-[#07252A] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send via Email</span>
                    </button>

                    <button
                      type="button"
                      disabled={isSubmittingInquiry}
                      onClick={(e) => {
                        const form = (
                          e.currentTarget as HTMLElement
                        ).closest("form");
                        if (form) {
                          handleInquirySubmitWhatsApp({
                            preventDefault: () => {},
                            currentTarget: form,
                          } as unknown as React.FormEvent<HTMLFormElement>);
                        }
                      }}
                      className="flex-1 py-3 px-4 min-h-[44px] rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-stone-600 text-center pt-2">
                    Confidentiality assured. Inquiries are reviewed by our lead psychologists.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
