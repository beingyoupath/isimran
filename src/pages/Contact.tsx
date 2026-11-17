import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { GOOGLE_REVIEWS } from "../data/testimonials";
import { recordInquiry } from "../lib/inquiries";
import {
  CLINIC_ADDRESS,
  CLINIC_HOURS_LABEL,
  EMAIL_PRIMARY,
  EMAIL_SECONDARY,
  GBP_URL,
  LOCAL_BUSINESS_SCHEMA,
  PHONE_PRIMARY,
  PHONE_PRIMARY_HREF,
  PHONE_SECONDARY,
  PHONE_SECONDARY_HREF,
  TELE_MANAS_NOTICE,
  WHATSAPP_URL,
} from "../lib/seoConfig";
import {
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Star,
  Quote,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

export default function Contact() {
  const [showToast, setShowToast] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const breadcrumbs = [{ name: "Contact", url: "/contact" }];
  const reviews = GOOGLE_REVIEWS;

  const slides = [
    {
      title: "Let's Start With a Conversation",
      subtitle: "Your free 15-minute clarity call.",
      desc: "No commitment, no pressure, no clinical intake forms. Just a 15-minute chat to understand your context and see if we're the right fit for your journey.",
      image: "/images/contact-hero-1.webp",
      alt: "Supportive conversation representing an introductory clarity call at Being You Path",
    },
    {
      title: "Here to Listen, Ready to Guide",
      subtitle: "Professional support in Pune and online across India.",
      desc: "Whether you prefer face-to-face sessions at our Deccan Gymkhana clinic or video consultations from home, we offer flexible scheduling Monday to Sunday.",
      image: "/images/contact-hero-2.webp",
      alt: "Warm counselling consultation environment",
    },
    {
      title: "Reach Out Today",
      subtitle: "Taking the first step does not have to be complicated.",
      desc: "Send us a message via the form below, WhatsApp, or email—our team responds within 24 hours.",
      image: "/images/contact-hero-3.webp",
      alt: "Booking an appointment or sending an inquiry online",
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handleEmailSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const contact = (form.elements.namedItem("contact") as HTMLInputElement).value.trim();
    const heardAbout =
      (form.elements.namedItem("heard_about") as HTMLSelectElement).value ||
      "Not specified";
    const message = (
      form.elements.namedItem("message") as HTMLTextAreaElement
    ).value.trim();

    const emailVal = contact.includes("@")
      ? contact
      : `${name.toLowerCase().replace(/[^a-z0-9]/g, "") || "client"}@beingyoupath.client`;
    const waVal = contact.includes("@") ? "" : contact;
    const summaryQuestion = message || "General 15-minute clarity call request";

    recordInquiry(
      {
        name,
        email: emailVal,
        whatsapp: waVal,
        question: `[Source: Contact Page Email | Heard via: ${heardAbout}] ${summaryQuestion}`,
      },
      {
        source: "Contact Page Email Form",
        topic: "Clarity Call Request",
        readiness: "high",
      }
    ).catch((err) => console.error("Could not record inquiry:", err));

    const mailBody = encodeURIComponent(
      `Name: ${name}\nContact: ${contact}\nHeard About: ${heardAbout}\nMessage: ${summaryQuestion}`
    );
    const mailLink = document.createElement("a");
    mailLink.href = `mailto:${EMAIL_PRIMARY}?subject=${encodeURIComponent(
      `New Clarity Request from ${name}`
    )}&body=${mailBody}`;
    document.body.appendChild(mailLink);
    mailLink.click();
    document.body.removeChild(mailLink);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleWhatsAppSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const contact = (form.elements.namedItem("contact") as HTMLInputElement).value.trim();
    const heardAbout =
      (form.elements.namedItem("heard_about") as HTMLSelectElement).value ||
      "Not specified";
    const message = (
      form.elements.namedItem("message") as HTMLTextAreaElement
    ).value.trim();

    const emailVal = contact.includes("@")
      ? contact
      : `${name.toLowerCase().replace(/[^a-z0-9]/g, "") || "client"}@beingyoupath.client`;
    const waVal = contact.includes("@") ? "" : contact;
    const summaryQuestion = message || "General 15-minute clarity call request";

    recordInquiry(
      {
        name,
        email: emailVal,
        whatsapp: waVal,
        question: `[Source: Contact Page WhatsApp | Heard via: ${heardAbout}] ${summaryQuestion}`,
      },
      {
        source: "Contact Page WhatsApp Form",
        topic: "Clarity Call Request",
        readiness: "high",
      }
    ).catch((err) => console.error("Could not record inquiry:", err));

    const waHref = `${WHATSAPP_URL}?text=${encodeURIComponent(
      `New Clarity Request:\n\nName: ${name}\nContact: ${contact}\nHeard About: ${heardAbout}\nMessage: ${summaryQuestion}`
    )}`;
    const link = document.createElement("a");
    link.href = waHref;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="bg-white">
      <SEO
        title="Book a Psychologist in Pune | Contact Being You Path"
        description="Free 15-minute clarity call. Visit us at Deccan Gymkhana, Pune, call, WhatsApp or email. Replies within 24 hours."
        url="/contact"
        lcpImage="/images/contact-hero-1.webp"
        breadcrumbs={breadcrumbs}
        schema={[LOCAL_BUSINESS_SCHEMA]}
      />

      <Breadcrumbs items={breadcrumbs} />

      {showToast && (
        <div
          role="status"
          className="fixed top-24 right-4 z-50 bg-deep-teal text-white px-6 py-4 rounded-[12px] shadow-xl flex items-center gap-3 toast-slide-in"
        >
          <CheckCircle2 className="w-5 h-5 text-[#A7E0BA]" aria-hidden="true" />
          <span className="font-medium">Message sent successfully!</span>
        </div>
      )}

      {/* Hero Carousel (all slides remain in raw HTML DOM; Slide 0 holds H1) */}
      <section className="w-full bg-soft-sand py-8 md:py-14 lg:py-16 flex justify-center border-b border-gray-200">
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
                      <>
                        <h1 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-terracotta mb-3 font-sans">
                          Book a Psychologist in Pune
                        </h1>
                        <h2 className="text-3xl md:text-[40px] lg:text-[48px] leading-tight font-bold text-deep-teal mb-6 font-heading tracking-tight">
                          {slide.title}
                        </h2>
                      </>
                    ) : (
                      <p className="text-3xl md:text-[40px] lg:text-[48px] leading-tight font-bold text-deep-teal mb-6 font-heading tracking-tight">
                        {slide.title}
                      </p>
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

      {/* Contact Cards (Strict NAP Consistency) */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 lg:mb-20 max-w-5xl mx-auto">
            <div className="bg-soft-sand p-8 rounded-[24px] border border-gray-200 hover-lift text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Phone className="w-8 h-8 text-terracotta" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h2 className="text-[20px] font-semibold text-deep-teal mb-2 font-heading">
                WhatsApp / Call
              </h2>
              <div className="space-y-1 text-[15px] text-charcoal-warm">
                <p>
                  <a href={PHONE_PRIMARY_HREF} className="hover:text-terracotta transition-colors font-medium">
                    {PHONE_PRIMARY}
                  </a>
                </p>
                <p>
                  <a href={PHONE_SECONDARY_HREF} className="hover:text-terracotta transition-colors font-medium">
                    {PHONE_SECONDARY}
                  </a>
                </p>
              </div>
              <p className="text-[13px] text-[#0B3A42] mt-3 font-medium uppercase tracking-wide">
                {CLINIC_HOURS_LABEL}
              </p>
            </div>

            <div className="bg-soft-sand p-8 rounded-[24px] border border-gray-200 hover-lift text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Mail className="w-8 h-8 text-terracotta" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h2 className="text-[20px] font-semibold text-deep-teal mb-2 font-heading">
                Email
              </h2>
              <div className="space-y-1 my-2 text-[15px] text-charcoal-warm">
                <p>
                  <a href={`mailto:${EMAIL_PRIMARY}`} className="hover:text-terracotta transition-colors font-medium">
                    {EMAIL_PRIMARY}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${EMAIL_SECONDARY}`} className="hover:text-terracotta transition-colors font-medium">
                    {EMAIL_SECONDARY}
                  </a>
                </p>
              </div>
              <p className="text-[13px] text-[#0B3A42] mt-3 font-medium uppercase tracking-wide">
                Replies within 24 hours
              </p>
            </div>

            <div className="bg-soft-sand p-8 rounded-[24px] border border-gray-200 transition-all text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <MapPin className="w-8 h-8 text-terracotta" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h2 className="text-[20px] font-semibold text-deep-teal mb-2 font-heading">
                In Person (Pune Clinic)
              </h2>
              <p className="text-charcoal-warm text-[14px] mb-1 font-medium leading-relaxed">
                {CLINIC_ADDRESS}
              </p>
              <p className="text-charcoal-warm text-[13px] mb-3">
                Private sessions by appointment only.
              </p>
              <div className="flex flex-col gap-2 mt-auto">
                <a
                  href={GBP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terracotta hover:text-deep-teal font-medium text-[14px] underline transition-colors"
                >
                  Visit our Google Business Profile
                </a>
                <a
                  href="https://www.google.com/maps/dir//Being+You+Path,+119%2F17,+Dr.+Sripati+Shastri+Path,+Near,+Prabhat+Rd,+Deccan+Gymkhana,+Pune,+Maharashtra+411004/@18.5201048,73.8771897,15z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3bc2bf009a76793f:0xe544b78e3d109854!2m2!1d73.8309474!2d18.5142273"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep-teal hover:text-terracotta font-medium text-[14px] transition-colors"
                >
                  Get Directions on Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Steps */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-start max-w-6xl mx-auto">
            <div className="lg:w-3/5 w-full">
              <div className="bg-soft-sand rounded-[32px] p-8 sm:p-12 border border-gray-200 shadow-sm">
                <h2 className="text-[30px] font-semibold text-deep-teal mb-2 font-heading">
                  Send a Message
                </h2>
                <p className="text-charcoal-warm mb-8">
                  Can&apos;t find a slot that works for you? Drop us a message below.
                </p>

                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[15px] font-semibold text-deep-teal mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-5 py-4 rounded-[12px] border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none text-[15px]"
                      placeholder="What should we call you?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact"
                      className="block text-[15px] font-semibold text-deep-teal mb-2"
                    >
                      Email or WhatsApp Number
                    </label>
                    <input
                      type="text"
                      id="contact"
                      required
                      className="w-full px-5 py-4 rounded-[12px] border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none text-[15px]"
                      placeholder="How should we reach you?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="heard_about"
                      className="block text-[15px] font-semibold text-deep-teal mb-2"
                    >
                      How did you hear about us?
                    </label>
                    <select
                      id="heard_about"
                      defaultValue=""
                      className="w-full px-5 py-4 rounded-[12px] border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none text-charcoal-warm text-[15px]"
                    >
                      <option value="" disabled>
                        Please select one
                      </option>
                      <option value="friend">Referred by friend/colleague</option>
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="google">Google Search</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[15px] font-semibold text-deep-teal mb-2"
                    >
                      What&apos;s going on for you right now? (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-5 py-4 rounded-[12px] border border-gray-300 focus:border-terracotta focus:ring focus:ring-terracotta/20 bg-white transition-all outline-none resize-none text-[15px]"
                      placeholder="A brief sentence or two is completely fine."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <button
                      type="button"
                      onClick={handleEmailSubmit}
                      className="flex-1 bg-terracotta text-white font-medium text-[15px] py-4 min-h-[44px] rounded-[50px] hover:bg-[#823018] transition-all shadow-md hover:shadow-lg uppercase tracking-wide flex justify-center items-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Send via Email</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="flex-1 bg-[#1E7E45] text-white font-medium text-[15px] py-4 min-h-[44px] rounded-[50px] hover:bg-[#176436] transition-all shadow-md hover:shadow-lg uppercase tracking-wide flex justify-center items-center gap-2 cursor-pointer"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                        className="w-5 h-5"
                        aria-hidden="true"
                      >
                        <path d="M12.031 0C5.398 0 .016 5.378.016 12.015c0 2.128.553 4.202 1.602 6.03L0 24l6.113-1.604a11.967 11.967 0 005.918 1.564h.005c6.634 0 12.014-5.38 12.014-12.017C24.05 5.378 18.665 0 12.031 0zm0 21.964c-1.802 0-3.567-.485-5.11-1.401l-.367-.217-3.794.996 1.015-3.698-.238-.378a9.98 9.98 0 01-1.521-5.263c0-5.518 4.492-10.013 10.015-10.013 5.517 0 10.014 4.495 10.014 10.013 0 5.517-4.497 10.013-10.014 10.013zm5.494-7.514c-.301-.151-1.782-.879-2.059-.979-.276-.1-.478-.152-.678.151-.2.302-.779.979-.955 1.18-.175.201-.351.226-.652.076-.301-.151-1.272-.469-2.424-1.496-.897-.798-1.503-1.784-1.678-2.086-.176-.302-.019-.465.132-.615.136-.135.301-.351.452-.526.151-.176.201-.301.301-.502.1-.2.051-.377-.025-.527-.076-.151-.678-1.633-.929-2.235-.245-.589-.494-.509-.678-.518-.175-.008-.376-.011-.577-.011-.2 0-.527.075-.802.376-.276.301-1.054 1.029-1.054 2.508s1.079 2.909 1.23 3.11c.151.2 2.122 3.238 5.14 4.542.718.31 1.28.495 1.717.635.72.228 1.376.195 1.894.118.579-.085 1.782-.728 2.033-1.431.251-.703.251-1.306.176-1.432-.075-.125-.276-.2-.577-.35z" />
                      </svg>
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-center text-[13px] text-charcoal-warm mt-4">
                    We&apos;ll reply within 24 hours.
                  </p>
                </form>

                <div className="grid grid-cols-2 gap-y-6 mt-12 pt-10 border-t border-gray-300/50">
                  <div className="flex items-center text-[14px] text-charcoal-warm font-medium">
                    <Phone className="w-5 h-5 text-terracotta mr-3" strokeWidth={1.5} aria-hidden="true" />
                    Free 15-min call
                  </div>
                  <div className="flex items-center text-[14px] text-charcoal-warm font-medium">
                    <ShieldCheck className="w-5 h-5 text-terracotta mr-3" strokeWidth={1.5} aria-hidden="true" />
                    Private &amp; confidential
                  </div>
                  <div className="flex items-center text-[14px] text-charcoal-warm font-medium">
                    <UserCheck className="w-5 h-5 text-terracotta mr-3" strokeWidth={1.5} aria-hidden="true" />
                    Qualified practitioners
                  </div>
                  <div className="flex items-center text-[14px] text-charcoal-warm font-medium">
                    <HeartHandshake className="w-5 h-5 text-terracotta mr-3 flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    Honest if not the right fit
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/5 w-full flex flex-col gap-8">
              <div className="bg-amber-glow/15 border border-amber-glow/20 rounded-[32px] p-10 relative overflow-hidden">
                <h3 className="text-[20px] font-semibold text-deep-teal mb-6 font-heading">
                  Before You Reach Out
                </h3>
                <p className="text-charcoal-warm mb-6 text-[15px] leading-relaxed">
                  A quick check-in: Notice your jaw. Are your teeth clenched? Take a slow breath in, and let your shoulders soften slightly.
                </p>
                <p className="text-charcoal-warm text-[15px] leading-relaxed">
                  Reaching out is often the hardest step. Once you message us, we&apos;ll guide the rest gently.
                </p>
              </div>

              <div className="bg-white rounded-[32px] p-10 border border-gray-200">
                <h3 className="text-[20px] font-semibold text-deep-teal mb-8 font-heading">
                  What happens next?
                </h3>
                <ol className="space-y-8">
                  <li className="flex items-start">
                    <span className="w-10 h-10 rounded-full bg-soft-sand text-terracotta font-heading font-bold flex items-center justify-center mr-5 flex-shrink-0">
                      1
                    </span>
                    <div>
                      <h4 className="font-semibold text-deep-teal text-[16px] mb-1">
                        You reach out
                      </h4>
                      <p className="text-[14px] text-charcoal-warm">
                        Via the form, WhatsApp, or email.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-10 h-10 rounded-full bg-soft-sand text-terracotta font-heading font-bold flex items-center justify-center mr-5 flex-shrink-0">
                      2
                    </span>
                    <div>
                      <h4 className="font-semibold text-deep-teal text-[16px] mb-1">
                        We schedule a quick call
                      </h4>
                      <p className="text-[14px] text-charcoal-warm">
                        A 15-minute chat to understand your needs and explain our approach.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-10 h-10 rounded-full bg-soft-sand text-terracotta font-heading font-bold flex items-center justify-center mr-5 flex-shrink-0">
                      3
                    </span>
                    <div>
                      <h4 className="font-semibold text-deep-teal text-[16px] mb-1">
                        Decide together
                      </h4>
                      <p className="text-[14px] text-charcoal-warm">
                        If another specialist is a better match, we&apos;ll let you know honestly and suggest appropriate options.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-10 h-10 rounded-full bg-soft-sand text-terracotta font-heading font-bold flex items-center justify-center mr-5 flex-shrink-0">
                      4
                    </span>
                    <div>
                      <h4 className="font-semibold text-deep-teal text-[16px] mb-1 uppercase">
                        Book Your First Full Session
                      </h4>
                      <p className="text-[14px] text-charcoal-warm">
                        Choose an in-person appointment near Prabhat Road, Pune or an online video slot.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-soft-sand border border-stone-200 rounded-[24px] p-6 text-xs text-stone-700 leading-relaxed">
                <strong className="text-deep-teal block mb-1 uppercase tracking-wide">
                  Emergency &amp; Crisis Support Notice
                </strong>
                {TELE_MANAS_NOTICE}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Feedback Carousel (all reviews present in raw HTML DOM) */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-soft-sand/60 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <a
              href={GBP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-xs mb-3 hover:border-terracotta transition-colors"
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

            <h2 className="text-3xl md:text-[36px] font-bold text-deep-teal mb-3 font-heading">
              Real Voices. Client Experiences.
            </h2>
            <p className="text-base text-charcoal-warm max-w-2xl mx-auto">
              Read experiences shared by clients who reached out for stress relief, self-esteem therapy, career clarity, and psychological care at Being You Path.
            </p>
          </div>

          <div className="relative bg-white p-8 md:p-12 rounded-[28px] border border-gray-200/80 shadow-md">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-terracotta/15 pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 flex flex-col justify-between min-h-[300px] md:min-h-[250px]">
              {reviews.map((rev, idx) => (
                <div key={rev.id} className={idx === activeReviewIndex ? "w-full" : "hidden"}>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
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

          <p className="text-center text-xs text-stone-600 mt-8">
            <Link to="/areas-we-serve" className="underline hover:text-deep-teal">
              See Pune localities &amp; cities we serve across India
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
