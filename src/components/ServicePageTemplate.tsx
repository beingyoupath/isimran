import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Globe,
} from "lucide-react";
import SEO, { HreflangAlternate } from "./SEO";
import Breadcrumbs from "./Breadcrumbs";
import BookingForm from "./BookingForm";
import {
  buildServiceSchema,
  CALENDLY_URL,
  CLINIC_ADDRESS,
  CLINIC_HOURS_LABEL,
  EMAIL_PRIMARY,
  LOCAL_BUSINESS_SCHEMA,
  PHONE_PRIMARY,
  PHONE_PRIMARY_HREF,
  TELE_MANAS_NOTICE,
} from "../lib/seoConfig";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceSectionLabels {
  servicesCrumb: string;
  heroCtaText: string;
  whoThisIsForHeading: string;
  whatWeWorkOnHeading: string;
  howSessionsWorkHeading: string;
  firstSessionHeading: string;
  formatDurationFeesHeading: string;
  sessionDurationLabel: string;
  modeLocationLabel: string;
  feesClarityLabel: string;
  faqsHeading: string;
  relatedHeading: string;
  pillarGuideText: string;
  crisisPrefix: string;
  closingHeading: string;
  closingBookingTitlePrefix: string;
  closingBookingSubtitle: string;
}

const DEFAULT_SECTION_LABELS: ServiceSectionLabels = {
  servicesCrumb: "Services",
  heroCtaText: "Book a free 15-minute clarity call",
  whoThisIsForHeading: "Who this is for",
  whatWeWorkOnHeading: "What we work on",
  howSessionsWorkHeading: "How sessions work",
  firstSessionHeading: "What to expect in the first session",
  formatDurationFeesHeading: "Format, duration and fees",
  sessionDurationLabel: "Session duration & cadence",
  modeLocationLabel: "In-person Pune & online formats",
  feesClarityLabel: "Fees & clarity call:",
  faqsHeading: "Frequently asked questions",
  relatedHeading: "Related Services & Guides",
  pillarGuideText: "Read our guide: How to choose a psychologist or counsellor in Pune",
  crisisPrefix: "Support & Crisis Disclaimer:",
  closingHeading: "Book a free 15-minute clarity call",
  closingBookingTitlePrefix: "Request a Consultation",
  closingBookingSubtitle:
    "Share your preferred timing for an in-person session in Deccan Gymkhana, Pune or an online video consultation.",
};

export interface ServicePageConfig {
  path: string;
  breadcrumbName: string;
  seoTitle: string;
  seoDescription: string;
  serviceType: string;
  badgeLabel?: string;
  locale?: string;
  alternates?: HreflangAlternate[];
  languageSwitch?: { label: string; to: string };
  sectionLabels?: Partial<ServiceSectionLabels>;
  h1: string;
  heroSubtitle: string;
  whoThisIsForIntro: string;
  whoThisIsForPoints: string[];
  whatWeWorkOnIntro: string;
  whatWeWorkOnGroups: {
    heading: string;
    items: string[];
  }[];
  howSessionsWorkIntro: string;
  howSessionsWorkSteps: {
    title: string;
    detail: string;
  }[];
  firstSessionIntro: string;
  firstSessionPoints: string[];
  formatDurationDetails: {
    sessionLength: string;
    mode: string;
    frequency: string;
    feesNote: string;
    locationNote: string;
  };
  faqs: ServiceFAQ[];
  relatedLinks: { label: string; to: string }[];
  bookingServiceName: string;
  calloutSection?: {
    heading: string;
    body: string;
    note?: string;
  };
  importantNotice?: string;
}

export default function ServicePageTemplate({
  config,
}: {
  config: ServicePageConfig;
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const labels: ServiceSectionLabels = {
    ...DEFAULT_SECTION_LABELS,
    ...(config.sectionLabels || {}),
  };

  const breadcrumbs = [
    { name: labels.servicesCrumb, url: config.locale === "hi_IN" ? "/services" : "/services" },
    { name: config.breadcrumbName, url: config.path },
  ];

  const serviceSchema = buildServiceSchema({
    name: `${config.h1} — Being You Path`,
    description: config.seoDescription,
    path: config.path,
    serviceType: config.serviceType,
  });

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#2C3E50]">
      <SEO
        title={config.seoTitle}
        description={config.seoDescription}
        url={config.path}
        locale={config.locale || "en_IN"}
        alternates={config.alternates}
        breadcrumbs={breadcrumbs}
        schema={[LOCAL_BUSINESS_SCHEMA, serviceSchema]}
        faqs={config.faqs}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Header */}
      <section className="section-dark bg-[#0B3A42] text-[#FAF9F6] border-b border-stone-200/20 py-14 md:py-20 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#F8C988]" aria-hidden="true" />
              <span className="text-[#F8C988] uppercase tracking-wider font-bold">
                {config.badgeLabel || "Deccan Gymkhana, Pune & Online"}
              </span>
            </div>

            {config.languageSwitch && (
              <Link
                to={config.languageSwitch.to}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-xs font-semibold text-[#F8C988] border border-white/20 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{config.languageSwitch.label}</span>
              </Link>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#FAF9F6] tracking-tight leading-tight mb-4">
            {config.h1}
          </h1>
          <p className="text-base sm:text-lg text-[#FAF9F6] leading-relaxed max-w-2xl font-normal">
            {config.heroSubtitle}
          </p>

          {/* One Clear Primary CTA */}
          <div className="mt-8">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[48px] px-7 py-3.5 rounded-full bg-[#E6A157] hover:bg-[#d69147] text-[#0B3A42] text-xs uppercase tracking-wider font-bold transition-all shadow-md gap-2"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>{labels.heroCtaText}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Structured 7-H2 Clinical Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-stone-800 leading-relaxed text-sm sm:text-base">
          {/* H2 #1: Who this is for */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42] mb-3">
              {labels.whoThisIsForHeading}
            </h2>
            <p className="mb-4 text-stone-700 leading-relaxed">{config.whoThisIsForIntro}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {config.whoThisIsForPoints.map((pt, idx) => (
                <li
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-stone-200 flex items-start gap-2.5 text-sm text-stone-700"
                >
                  <CheckCircle2
                    className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* H2 #2: What we work on */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42] mb-3">
              {labels.whatWeWorkOnHeading}
            </h2>
            <p className="mb-5 text-stone-700 leading-relaxed">{config.whatWeWorkOnIntro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.whatWeWorkOnGroups.map((group, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-stone-200"
                >
                  <h3 className="font-bold text-[#0B3A42] mb-2 font-heading text-base">
                    {group.heading}
                  </h3>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700 list-disc pl-4">
                    {group.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* H2 #3: How sessions work */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42] mb-3">
              {labels.howSessionsWorkHeading}
            </h2>
            <p className="mb-4 text-stone-700 leading-relaxed">{config.howSessionsWorkIntro}</p>
            <ol className="space-y-3">
              {config.howSessionsWorkSteps.map((step, idx) => (
                <li
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-stone-200 flex items-start gap-3"
                >
                  <span className="w-7 h-7 rounded-full bg-[#0B3A42] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-[#0B3A42] text-base mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-stone-700 leading-relaxed">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {config.calloutSection && (
            <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-[#A43F23]/25">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#0B3A42] mb-2.5">
                {config.calloutSection.heading}
              </h2>
              <p className="text-sm sm:text-base text-stone-800 leading-relaxed">
                {config.calloutSection.body}
              </p>
              {config.calloutSection.note && (
                <p className="text-xs text-stone-700 mt-2.5 leading-relaxed">
                  {config.calloutSection.note}
                </p>
              )}
            </div>
          )}

          {/* H2 #4: What to expect in the first session */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42] mb-3">
              {labels.firstSessionHeading}
            </h2>
            <p className="mb-4 text-stone-700 leading-relaxed">{config.firstSessionIntro}</p>
            <ul className="space-y-2.5 text-sm text-stone-700">
              {config.firstSessionPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <ShieldCheck
                    className="w-4 h-4 text-[#A43F23] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* H2 #5: Format, duration and fees */}
          <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-stone-200">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42] mb-4">
              {labels.formatDurationFeesHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-stone-700">
              <div className="bg-white p-4 rounded-2xl border border-stone-200">
                <h3 className="font-heading font-bold text-[#0B3A42] text-sm mb-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#A43F23]" aria-hidden="true" />
                  <span>{labels.sessionDurationLabel}</span>
                </h3>
                <p>{config.formatDurationDetails.sessionLength}</p>
                <p className="text-xs text-stone-600 mt-1">
                  {config.formatDurationDetails.frequency}
                </p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-stone-200">
                <h3 className="font-heading font-bold text-[#0B3A42] text-sm mb-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#A43F23]" aria-hidden="true" />
                  <span>{labels.modeLocationLabel}</span>
                </h3>
                <p>{config.formatDurationDetails.mode}</p>
                <p className="text-xs text-stone-600 mt-1">
                  {config.formatDurationDetails.locationNote}
                </p>
              </div>
            </div>
            <div className="mt-4 bg-white p-4 rounded-2xl border border-stone-200 text-sm text-stone-700 space-y-1.5">
              <p>
                <strong className="text-[#0B3A42]">{labels.feesClarityLabel}</strong>{" "}
                {config.formatDurationDetails.feesNote}
              </p>
              <p className="text-xs text-stone-600">
                Clinic address: {CLINIC_ADDRESS} · Hours: {CLINIC_HOURS_LABEL} ·
                Phone:{" "}
                <a href={PHONE_PRIMARY_HREF} className="underline text-[#0B3A42]">
                  {PHONE_PRIMARY}
                </a>{" "}
                · Email:{" "}
                <a
                  href={`mailto:${EMAIL_PRIMARY}`}
                  className="underline text-[#0B3A42]"
                >
                  {EMAIL_PRIMARY}
                </a>
              </p>
            </div>
          </div>

          {/* H2 #6: Frequently asked questions */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42] mb-4">
              {labels.faqsHeading}
            </h2>
            <div className="space-y-3">
              {config.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden"
                  >
                    <h3 className="m-0 text-sm sm:text-base font-bold font-heading text-[#0B3A42]">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full min-h-[48px] text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#A43F23] shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-100"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-4 pt-1 text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-stone-100">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Guides & Services Internal Links */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[#A43F23]">
              {labels.relatedHeading}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {config.relatedLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-full bg-stone-50 hover:bg-stone-100 border border-stone-200 text-xs font-semibold text-[#0B3A42] transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              ))}
              <Link
                to="/guides/how-to-choose-a-psychologist-pune"
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-full bg-[#FDFBF7] hover:bg-stone-100 border border-[#A43F23]/30 text-xs font-semibold text-[#A43F23] transition-colors"
              >
                <span>{labels.pillarGuideText}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Ethical & Crisis Support Disclaimer */}
          {config.importantNotice && (
            <div className="bg-rose-50/90 border-2 border-[#A43F23]/40 rounded-2xl p-4 sm:p-5 text-sm font-semibold text-[#0B3A42] leading-relaxed">
              {config.importantNotice}
            </div>
          )}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 sm:p-5 text-xs text-stone-700 leading-relaxed">
            <strong className="text-[#0B3A42]">{labels.crisisPrefix}</strong>{" "}
            {TELE_MANAS_NOTICE}
          </div>
        </div>
      </section>

      {/* H2 #7: Book a free 15-minute clarity call */}
      <section
        id="booking-section"
        className="py-12 md:py-16 bg-white border-t border-stone-200/80"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42]">
              {labels.closingHeading}
            </h2>
            <p className="text-sm text-stone-700 max-w-xl mx-auto">
              Schedule on{" "}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A43F23] underline font-semibold"
              >
                Calendly
              </a>
              , call{" "}
              <a
                href={PHONE_PRIMARY_HREF}
                className="text-[#0B3A42] underline font-semibold"
              >
                {PHONE_PRIMARY}
              </a>
              , or submit your preferred window below.
            </p>
          </div>
          <BookingForm
            serviceDefault={config.bookingServiceName}
            title={`${labels.closingBookingTitlePrefix} — ${config.bookingServiceName}`}
            subtitle={labels.closingBookingSubtitle}
          />
        </div>
      </section>
    </div>
  );
}
