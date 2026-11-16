import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import {
  CLINIC_ADDRESS,
  IMRAN_PERSON_SCHEMA,
  LOCAL_BUSINESS_SCHEMA,
  TEJASWINI_PERSON_SCHEMA,
  TELE_MANAS_NOTICE,
} from "../lib/seoConfig";
import {
  Quote,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Compass,
  ShieldCheck,
  Layers,
  Calendar,
  BookOpen,
} from "lucide-react";

const ABOUT_FAQS = [
  {
    question:
      "How do I book a wellness session, and what happens during the first consultation?",
    answer:
      "You can book by clicking 'Free Clarity Call' on our contact page, using Calendly, or messaging us on WhatsApp at +91 7387772573. Initially, we schedule a free 15-minute introductory call to understand your challenges, explain our approach, and ensure we're the right fit for your goals. There is no commitment required at this stage.",
  },
  {
    question:
      "What types of mental health counselling and coaching services do you provide?",
    answer:
      "We offer individual counselling grounded in modern psychology (including Cognitive Behavioural Therapy or CBT), secular mindfulness, and behavioural science. Focus areas include anxiety and stress management, burnout recovery, self-esteem therapy, career counselling, student support, and relationship guidance.",
  },
  {
    question:
      "Do you offer corporate wellness workshops and employee mental health programs?",
    answer:
      "Yes, we design and facilitate structured corporate employee well-being workshops covering stress management, workplace resilience, communication across generations, and burnout prevention in Pune and online across India.",
  },
  {
    question: "How can mindfulness and resilience workshops benefit students?",
    answer:
      "Our student workshops and individual sessions help young adults manage academic pressure, improve sustained attention, and build practical emotional regulation skills without stigma or overwhelm.",
  },
  {
    question:
      "What is the fee structure for counselling sessions or corporate workshops?",
    answer:
      "Fees depend on session format—individual counselling, couples sessions, career packages, or organisational workshops. During your free 15-minute clarity call, we share transparent fees clearly before you schedule.",
  },
];

const IMRAN_BOOKS = [
  {
    title: "1. Healing Journey through chakras",
    desc: "Explore traditional perspectives on inner energy centres paired with practical reflective methods for emotional grounding and calm in daily life.",
    price: "₹499",
    img: "https://drive.google.com/thumbnail?id=14Na8ysaUXG8UnlS9X48Mcvq3PMh5mTj2&sz=w600",
    alt: "Book cover: Healing Journey through chakras by Imran Hussain",
    waName: "Healing Journey through chakras",
  },
  {
    title: "2. The essence of Wellness (Mind, Body, Spirit)",
    desc: "An accessible roadmap to integrative everyday well-being, connecting physical vitality, mental clarity, and thoughtful daily habits.",
    price: "₹499",
    img: "https://drive.google.com/thumbnail?id=1jrQuEeXPUkF1LsxgO46CCr1uqrGKzVCm&sz=w600",
    alt: "Book cover: The essence of Wellness by Imran Hussain",
    waName: "The essence of Wellness (Mind, Body, Spirit)",
  },
  {
    title: "3. The power of mindful thoughts",
    desc: "Learn to notice the space between stimulus and thought, breaking overthinking loops using practical cognitive awareness and mindfulness exercises.",
    price: "₹499",
    img: "https://drive.google.com/thumbnail?id=160i1TW3o7ZDaUTxzesxuu-FE5T9KT1p8&sz=w600",
    alt: "Book cover: The power of mindful thoughts by Imran Hussain",
    waName: "The power of mindful thoughts",
  },
];

export default function About() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const breadcrumbs = [{ name: "About", url: "/about" }];

  const slides = [
    {
      title:
        "We Help People Understand Themselves — And Build Lives That Actually Work",
      subtitle:
        "Meet the psychologists behind Being You Path™ — blending modern psychology, mindfulness, and practical behavioural science.",
      desc: "Our approach integrates evidence-based behavioural science with genuine human warmth, helping you translate insight into steady everyday resilience.",
      image: "/images/about-hero-1.webp",
      alt: "Psychologists and well-being facilitators collaborating at Being You Path in Pune",
    },
    {
      title: "Guided by Empathy, Grounded in Science",
      subtitle: "A philosophy built on understanding the human experience.",
      desc: "We don't just offer generic advice; we teach practical cognitive and nervous-system tools in a safe, non-judgmental space.",
      image: "/images/about-hero-2.webp",
      alt: "Structured journal and reflective therapy desk",
    },
    {
      title: "Your Journey to Intentional Living",
      subtitle: "Moving from 'just getting by' to steadiness.",
      desc: "Together, we navigate work pressure, emotional loops, and life transitions so your daily choices align with your values.",
      image: "/images/mindfulness-calm.webp",
      alt: "Morning calm representing steady emotional regulation",
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const credentials = [
    "M.A. Clinical Psychology (Imran Hussain)",
    "M.A. Counselling Psychology (Tejaswini Joshi)",
    "LSE Certification — Managing People (Tejaswini Joshi)",
    "NIMHANS-trained clinical experience (Imran Hussain)",
    "CBT & Secular Mindfulness Practitioner Training",
  ];

  return (
    <div className="bg-soft-sand">
      <SEO
        title="Our Psychologists | Being You Path, Pune"
        description="Meet Imran Hussain and Tejaswini Joshi, their training, approach and credentials."
        url="/about"
        breadcrumbs={breadcrumbs}
        schema={[LOCAL_BUSINESS_SCHEMA, IMRAN_PERSON_SCHEMA, TEJASWINI_PERSON_SCHEMA]}
        faqs={ABOUT_FAQS}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Carousel (all slides preserved in raw HTML DOM; only Slide 0 uses H1) */}
      <section className="w-full bg-soft-sand py-8 md:py-14 lg:py-16 flex justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className="relative rounded-[32px] overflow-hidden shadow-2xl flex flex-col bg-white"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className={
                  idx === currentSlide
                    ? "flex flex-col lg:flex-row w-full min-h-[580px] lg:min-h-[540px]"
                    : "hidden"
                }
              >
                <div className="w-full lg:w-5/12 h-[35vh] md:h-[45vh] lg:h-auto relative shrink-0">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    width={1200}
                    height={800}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-16 pb-20 md:pb-24 lg:pb-16 flex flex-col items-center lg:items-start text-center lg:text-left justify-center relative z-20">
                  <div className="w-full max-w-2xl mx-auto lg:mx-0">
                    {idx === 0 ? (
                      <h1 className="text-3xl md:text-[40px] lg:text-[48px] leading-tight font-bold text-deep-teal mb-6 font-heading tracking-tight">
                        {slide.title}
                      </h1>
                    ) : (
                      <h2 className="text-3xl md:text-[40px] lg:text-[48px] leading-tight font-bold text-deep-teal mb-6 font-heading tracking-tight">
                        {slide.title}
                      </h2>
                    )}
                    <p className="text-xl md:text-[24px] md:leading-[32px] text-terracotta mb-6 font-semibold font-heading">
                      {slide.subtitle}
                    </p>
                    <p className="text-lg text-charcoal-warm mb-10 leading-relaxed">
                      {slide.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 z-30">
              <button
                type="button"
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev === 0 ? slides.length - 1 : prev - 1
                  )
                }
                className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white shadow-md text-deep-teal hover:text-terracotta backdrop-blur-md flex items-center justify-center transition-all border border-gray-100 cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 z-30">
              <button
                type="button"
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % slides.length)
                }
                className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white shadow-md text-deep-teal hover:text-terracotta backdrop-blur-md flex items-center justify-center transition-all border border-gray-100 cursor-pointer"
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
                  className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx
                      ? "bg-terracotta w-8"
                      : "bg-gray-300 hover:bg-terracotta/60 w-3"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section
        className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden"
        aria-label="Our Story and Origin"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <span className="text-terracotta font-semibold text-sm tracking-wider uppercase mb-3 block font-sans">
                A Haven for Your Mind
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-semibold text-deep-teal font-heading leading-tight mb-6">
                Our Story: You Don&apos;t Have to Carry It All Alone
              </h2>
              <p className="text-charcoal-warm/90 text-base leading-relaxed font-sans">
                Co-founded by Imran Hussain and Tejaswini Joshi, Being You Path was built as a calm, practical space—a place to set down the weight you&apos;ve carried quietly and talk with qualified professionals without stigma.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-6 text-charcoal-warm text-base md:text-lg leading-relaxed font-sans">
              <p>
                Look closely at everyday urban life: working professionals carrying quiet exhaustion behind full calendars, students and young adults caught in loops of overthinking at 2:00 AM, and parents trying to stay patient while stretched thin themselves.
              </p>
              <p>
                Too often, psychological support feels either overly sterile and jargon-heavy or like superficial motivational slogans. Being You Path brings clinical training together with human conversation, curiosity, and structured everyday exercises.
              </p>
              <p>
                From our clinic at <strong>{CLINIC_ADDRESS}</strong> to confidential{" "}
                <Link to="/services/online-therapy-india" className="font-semibold text-deep-teal underline underline-offset-4 hover:text-terracotta">
                  online therapy across India
                </Link>
                , you are met as a whole person rather than a label.
              </p>
              <p>
                We blend{" "}
                <Link to="/services/cbt-therapy-pune" className="font-semibold text-deep-teal underline underline-offset-4 hover:text-terracotta">
                  Cognitive Behavioural Therapy (CBT)
                </Link>
                , nervous-system regulation,{" "}
                <Link to="/services/burnout-counselling-pune" className="font-semibold text-deep-teal underline underline-offset-4 hover:text-terracotta">
                  work burnout support
                </Link>
                , and{" "}
                <Link to="/services/self-esteem-therapy-pune" className="font-semibold text-deep-teal underline underline-offset-4 hover:text-terracotta">
                  self-esteem counselling
                </Link>{" "}
                into practical tools you can apply between sessions.
              </p>
            </div>
          </div>

          <div className="mt-14 max-w-[860px] mx-auto bg-gradient-to-br from-soft-sand/80 to-soft-sand p-10 md:p-14 rounded-[28px] border border-muted-clay/20 text-center relative shadow-sm">
            <Quote className="w-12 h-12 text-terracotta/20 absolute top-8 left-8 hidden sm:block" aria-hidden="true" />
            <p className="text-2xl sm:text-3xl md:text-[34px] text-charcoal-warm italic font-heading font-medium leading-snug relative z-10 px-4 sm:px-10">
              &ldquo;Well-being is not a destination. It&apos;s a set of skills — and skills can be learned.&rdquo;
            </p>
            <p className="mt-4 text-sm text-terracotta font-medium tracking-wide uppercase font-sans">
              The Being You Path Philosophy
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 lg:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-[36px] font-semibold text-deep-teal mb-4 font-heading">
              Why Work With Us
            </h2>
            <p className="text-lg text-charcoal-warm max-w-2xl mx-auto">
              How Being You Path™ bridges clinical psychology with practical everyday skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Compass,
                title: "Human First, Clinical Second",
                desc: "We drop heavy jargon and sterile formality. Expect warm, grounded dialogue rooted in evidence.",
              },
              {
                icon: ShieldCheck,
                title: "Tool-Based Approach",
                desc: "Insight alone rarely shifts daily habits. We equip you with practical cognitive and nervous-system exercises.",
              },
              {
                icon: Layers,
                title: "No Cookie-Cutter Models",
                desc: "Your context matters. We tailor CBT, mindfulness, and behavioural science to your real schedule and goals.",
              },
              {
                icon: Calendar,
                title: "Holistic Integration",
                desc: "Work stress, relationships, sleep, and identity affect one another—we address your well-being as a connected whole.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-soft-sand p-8 rounded-[24px] border border-gray-100 group hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-[16px] shadow-sm flex items-center justify-center mb-6 origin-center group-hover:bg-terracotta/5">
                  <item.icon className="w-8 h-8 text-terracotta" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-deep-teal mb-3 font-heading leading-tight">
                  {item.title}
                </h3>
                <p className="text-charcoal-warm text-[15px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-12 md:py-16 lg:py-20 bg-soft-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[800px] mx-auto mb-12 lg:mb-20">
            <h2 className="text-[36px] font-semibold text-deep-teal mb-8 font-heading">
              What We Believe About How People Change
            </h2>
            <p className="text-lg text-charcoal-warm leading-relaxed">
              Change happens at the intersection of insight and action. Understanding why you think or respond a certain way is valuable—but what moves people forward is guided, repeatable practice that retrains attention, reshapes habits, and steadily shifts how you relate to yourself and others.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <span className="text-terracotta font-bold text-2xl">1</span>
              </div>
              <h3 className="text-[20px] font-semibold text-deep-teal mb-4 font-heading">
                Modern Psychology Frameworks
              </h3>
              <p className="text-charcoal-warm">
                Cognitive Behavioural Therapy (CBT), Positive Psychology (PERMA), Counselling Psychology, and Organisational Psychology.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <span className="text-terracotta font-bold text-2xl">2</span>
              </div>
              <h3 className="text-[20px] font-semibold text-deep-teal mb-4 font-heading">
                Secular Mindfulness
              </h3>
              <p className="text-charcoal-warm">
                Evidence-based attention training without dogma—present-moment awareness, cognitive defusion, and self-compassion.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <span className="text-terracotta font-bold text-2xl">3</span>
              </div>
              <h3 className="text-[20px] font-semibold text-deep-teal mb-4 font-heading">
                Applied Behavioural &amp; Somatic Tools
              </h3>
              <p className="text-charcoal-warm">
                Circadian sleep routines, paced breathing for autonomic regulation, and reflective dialogue—used strictly where evidence supports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Practitioners + Credentials Grid */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-[36px] font-semibold text-deep-teal mb-4 font-heading">
              Meet the Practitioners
            </h2>
            <p className="text-base text-charcoal-warm max-w-2xl mx-auto">
              Qualified psychologists offering in-person appointments near Prabhat Road, Deccan Gymkhana, Pune and online video sessions across India.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Imran Hussain */}
            <div className="bg-soft-sand rounded-[24px] overflow-hidden shadow-sm flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md">
              <div className="pt-10 px-6 mx-auto w-full max-w-sm relative">
                <div className="aspect-[4/5] w-full rounded-[24px] bg-white p-3 shadow-md border border-gray-100/50 group relative">
                  <div className="w-full h-full rounded-[14px] overflow-hidden relative bg-gray-100">
                    <img
                      src="https://drive.google.com/thumbnail?id=1iTW_XmU7hqQSNtJIKRC3ApQjW2yyZnne&sz=w1000"
                      alt="Imran Hussain, Co-Founder and Clinical Psychologist at Being You Path, Pune"
                      width={600}
                      height={750}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-10 flex-grow flex flex-col">
                <h3 className="text-[32px] md:text-[36px] font-bold text-deep-teal mb-2 font-heading">
                  Imran Hussain
                </h3>
                <p className="text-terracotta font-medium mb-5 uppercase text-sm tracking-wide">
                  M.A. Clinical Psychology | CBT Practitioner | Mindfulness Facilitator
                </p>
                <p className="text-charcoal-warm mb-8 leading-relaxed">
                  NIMHANS-trained clinical psychologist and CBT practitioner with clinical experience across NIMHANS, Mannah Wellness, and Mantra Care. Specialising in Cognitive Behavioural Therapy (CBT), anxiety and stress management, burnout recovery, and secular mindfulness, Imran sees clients in person near Prabhat Road, Deccan Gymkhana, Pune and online across India.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {[
                    "CBT",
                    "Anxiety & Stress",
                    "Relationship & Career Counselling",
                    "Secular Mindfulness",
                    "Student & Adolescent Support",
                    "Motivational Interviewing",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="bg-white text-charcoal-warm border border-gray-200 text-[13px] font-medium px-4 py-1.5 rounded-full hover:border-terracotta transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tejaswini Joshi */}
            <div className="bg-soft-sand rounded-[24px] overflow-hidden shadow-sm flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md">
              <div className="pt-10 px-6 mx-auto w-full max-w-sm relative">
                <div className="aspect-[4/5] w-full rounded-[24px] bg-white p-3 shadow-md border border-gray-100/50 group relative">
                  <div className="w-full h-full rounded-[14px] overflow-hidden relative bg-gray-100">
                    <img
                      src="https://drive.google.com/thumbnail?id=1gmpGHtsb2iJ0tP-_yuMI-PnArP-KnZV2&sz=w1000"
                      alt="Tejaswini Joshi, Co-Founder and Counselling Psychologist at Being You Path, Pune"
                      width={600}
                      height={750}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-10 flex-grow flex flex-col">
                <h3 className="text-[32px] md:text-[36px] font-bold text-deep-teal mb-2 font-heading">
                  Tejaswini Joshi
                </h3>
                <p className="text-terracotta font-medium mb-5 uppercase text-sm tracking-wide">
                  M.A. Counselling Psychology | LSE-Certified | Learning &amp; Development Specialist
                </p>
                <p className="text-charcoal-warm mb-8 leading-relaxed">
                  Counselling psychologist, LSE-certified Learning &amp; Development specialist whose work spans Jnana Prabodhini and corporate organisations across Pune, Mumbai, and Bengaluru. Tejaswini supports individuals, young adults, and workplace teams with self-esteem, emotional intelligence, interpersonal boundaries, workplace stress, and career clarity.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {[
                    "Counselling Psychology",
                    "Employee Well-Being",
                    "Behavioural Patterns",
                    "L&D Facilitation",
                    "Strengths Assessments",
                    "Interpersonal Dynamics",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="bg-white text-charcoal-warm border border-gray-200 text-[13px] font-medium px-4 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Credentials & Training Grid (prominently positioned right below practitioner bios) */}
          <div className="mt-12 max-w-5xl mx-auto">
            <h3 className="text-xl font-semibold text-deep-teal font-heading text-center mb-6">
              Academic Training &amp; Practice Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {credentials.map((cred, idx) => (
                <div
                  key={idx}
                  className="bg-soft-sand rounded-[24px] px-5 py-3.5 flex items-center shadow-sm border border-gray-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-terracotta mr-3 flex-shrink-0" aria-hidden="true" />
                  <span className="text-deep-teal font-medium text-[14px]">
                    {cred}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Books by Imran Hussain (Cleanly separated below practitioner credentials) */}
      <section className="py-12 md:py-16 bg-soft-sand border-t border-gray-200" aria-label="Books by Imran Hussain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-terracotta mb-2">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Published Writing</span>
            </div>
            <h2 className="text-2xl md:text-[32px] font-semibold text-deep-teal font-heading">
              Books by Imran Hussain
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {IMRAN_BOOKS.map((book) => (
              <div
                key={book.title}
                className="flex flex-col sm:flex-row md:flex-col gap-4 bg-white p-5 rounded-[20px] border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1"
              >
                <div className="w-28 sm:w-32 md:w-36 mx-auto aspect-[3/4] bg-[#FDFBF7] rounded-[10px] flex-shrink-0 flex items-center justify-center border border-gray-200/60 shadow-sm p-1.5 group">
                  <img
                    src={book.img}
                    alt={book.alt}
                    width={240}
                    height={320}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-[5px] drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="font-heading font-semibold text-deep-teal leading-tight mb-2 text-base">
                    {book.title}
                  </h3>
                  <p className="text-[13px] text-charcoal-warm mb-4 flex-grow leading-relaxed">
                    {book.desc}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="font-bold text-terracotta">{book.price}</span>
                    <a
                      href={`https://wa.me/917387772573?text=${encodeURIComponent(
                        `Hello, I am interested in purchasing the book "${book.waName}".\n\nName: \nPhone Number: \nDelivery Address: \nCity/State/Pincode: \n\nThank you!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold uppercase tracking-wider bg-deep-teal text-white px-5 py-2.5 min-h-[44px] sm:min-h-0 inline-flex items-center rounded-full hover:bg-terracotta transition-colors shadow-sm cursor-pointer"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[36px] font-semibold text-deep-teal mb-4 font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-charcoal-warm">
              Common questions about getting started, our services, and fees.
            </p>
          </div>

          <div className="space-y-4">
            {ABOUT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-soft-sand rounded-[16px] shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none hover:bg-white/60 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-deep-teal font-heading pr-8">
                      {faq.question}
                    </h3>
                    <div
                      className={`flex-shrink-0 text-terracotta transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="w-6 h-6" />
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-charcoal-warm leading-relaxed pt-2 border-t border-gray-200/70">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-stone-700 mt-10 leading-relaxed">
            {TELE_MANAS_NOTICE}
          </p>
        </div>
      </section>
    </div>
  );
}
