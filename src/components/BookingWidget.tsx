import React from "react";
import { Clock, Calendar, ExternalLink, CheckCircle2, Shield, Video, MapPin, Sparkles, UserCheck } from "lucide-react";

export const CALENDLY_MAIN_URL = "https://calendly.com/beingyoupathappointment";

export default function BookingWidget({ className = "" }: { className?: string }) {
  const handleOpenCalendly = () => {
    window.open(CALENDLY_MAIN_URL, "_blank", "noopener,noreferrer");
  };

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      "Hello Being You Path,\n\nI would like to schedule a 1-on-1 psychological session / free 15-minute clarity call.\n\nPlease share your earliest available slots for online video or in-person clinic (Pune).\n\nThank you!"
    );
    window.open(`https://wa.me/917387772573?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`bg-white rounded-[28px] border border-gray-200 shadow-md overflow-hidden ${className}`}>
      {/* Top Banner & Psychologists Info */}
      <div className="bg-deep-teal text-white p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#FDFBF7] uppercase tracking-wider mb-3 font-sans border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-glow" />
              <span>Direct 1-on-1 Calendly Scheduling</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold text-[#FDFBF7] leading-tight">
              Book Directly with Our Lead Psychologists
            </h3>
            <p className="text-white/85 text-sm sm:text-base mt-2 leading-relaxed">
              Choose your session duration and practitioner—<strong>Imran Hussain</strong> or <strong>Tejaswini Joshi</strong>—instantly on Calendly. Available in-person at our Pune sanctuary (near Koregaon Park) or via confidential online video nationwide.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col items-start gap-2.5 text-xs text-white/90 shrink-0">
            <span className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-full border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-amber-glow" />
              <span>Pune Clinic (Near Koregaon Park)</span>
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-full border border-white/10">
              <Video className="w-3.5 h-3.5 text-amber-glow" />
              <span>Pan-India Video Sessions</span>
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-full border border-white/10">
              <Shield className="w-3.5 h-3.5 text-amber-glow" />
              <span>100% Confidential & Secure</span>
            </span>
          </div>
        </div>
      </div>

      {/* Available Session Types on Calendly */}
      <div className="p-6 sm:p-8 lg:p-10 bg-soft-sand/30 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-warm/70 font-sans">
            Available Session Options on Calendly
          </h4>
          <span className="text-xs font-medium text-terracotta">Select your preference on Calendly</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 15-Min Free Clarity Call */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-terracotta/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  15 Minutes Free
                </span>
                <span className="text-xs font-semibold text-terracotta font-sans">
                  Free Clarity Call
                </span>
              </div>
              <h5 className="font-heading font-bold text-deep-teal text-lg mb-1.5">
                Introductory Clarity Call
              </h5>
              <p className="text-xs text-charcoal-warm/80 leading-relaxed mb-3">
                A free 15-minute introductory conversation to discuss what you're navigating, explore therapeutic fit, and map your path forward with zero obligation.
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center gap-1.5 text-xs text-charcoal-warm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Free initial fit & goal mapping</span>
            </div>
          </div>

          {/* 30 & 45 Min Focused Therapy */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-terracotta/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                  30 or 45 Minutes
                </span>
                <span className="text-xs font-semibold text-terracotta font-sans">
                  Focused Therapy
                </span>
              </div>
              <h5 className="font-heading font-bold text-deep-teal text-lg mb-1.5">
                Targeted CBT & Regulation
              </h5>
              <p className="text-xs text-charcoal-warm/80 leading-relaxed mb-3">
                High-impact therapeutic sessions addressing acute workplace burnout, stress loops, overthinking, and immediate anxiety coping tools.
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center gap-1.5 text-xs text-charcoal-warm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Evidence-based CBT reframing</span>
            </div>
          </div>

          {/* 60 Min In-Depth Consultation */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-terracotta/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-deep-teal/10 text-deep-teal">
                  60 Minutes (1 Hour)
                </span>
                <span className="text-xs font-semibold text-terracotta font-sans">
                  Deep Dive
                </span>
              </div>
              <h5 className="font-heading font-bold text-deep-teal text-lg mb-1.5">
                Comprehensive Consultation
              </h5>
              <p className="text-xs text-charcoal-warm/80 leading-relaxed mb-3">
                In-depth psychological assessment, root-cause emotional processing, behavioral habit redesign, and personalized healing roadmaps.
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center gap-1.5 text-xs text-charcoal-warm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Complete psychological roadmap</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Section */}
      <div className="p-6 sm:p-8 lg:p-10 bg-white">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-soft-sand rounded-2xl p-6 border border-gray-200">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal font-sans">
              <UserCheck className="w-4 h-4 text-terracotta" />
              <span>Imran Hussain &amp; Tejaswini Joshi</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-heading font-bold text-deep-teal">
              Ready to Book? Choose Your Slot on Calendly
            </h4>
            <p className="text-charcoal-warm text-sm max-w-xl">
              One unified scheduling link. Select your preferred practitioner, session length (15-min free clarity call, 30-min, 45-min, or 1-hour), and live available time slots directly in Calendly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <button
              type="button"
              onClick={handleOpenCalendly}
              className="py-4 px-7 bg-terracotta text-white rounded-xl font-semibold text-sm hover:bg-amber-glow transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Open Calendly Scheduler</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </button>

            <button
              type="button"
              onClick={handleWhatsAppBooking}
              className="py-4 px-6 bg-[#25D366] text-white hover:bg-[#1DA851] rounded-xl font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-4 h-4">
                <path d="M12.031 0C5.398 0 .016 5.378.016 12.015c0 2.128.553 4.202 1.602 6.03L0 24l6.113-1.604a11.967 11.967 0 005.918 1.564h.005c6.634 0 12.014-5.38 12.014-12.017C24.05 5.378 18.665 0 12.031 0zm0 21.964c-1.802 0-3.567-.485-5.11-1.401l-.367-.217-3.794.996 1.015-3.698-.238-.378a9.98 9.98 0 01-1.521-5.263c0-5.518 4.492-10.013 10.015-10.013 5.517 0 10.014 4.495 10.014 10.013 0 5.517-4.497 10.013-10.014 10.013zm5.494-7.514c-.301-.151-1.782-.879-2.059-.979-.276-.1-.478-.152-.678.151-.2.302-.779.979-.955 1.18-.175.201-.351.226-.652.076-.301-.151-1.272-.469-2.424-1.496-.897-.798-1.503-1.784-1.678-2.086-.176-.302-.019-.465.132-.615.136-.135.301-.351.452-.526.151-.176.201-.301.301-.502.1-.2.051-.377-.025-.527-.076-.151-.678-1.633-.929-2.235-.245-.589-.494-.509-.678-.518-.175-.008-.376-.011-.577-.011-.2 0-.527.075-.802.376-.276.301-1.054 1.029-1.054 2.508s1.079 2.909 1.23 3.11c.151.2 2.122 3.238 5.14 4.542.718.31 1.28.495 1.717.635.72.228 1.376.195 1.894.118.579-.085 1.782-.728 2.033-1.431.251-.703.251-1.306.176-1.432-.075-.125-.276-.2-.577-.35z"/>
              </svg>
              <span>Connect on WhatsApp</span>
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-charcoal-warm/70 px-2 gap-2">
          <span>Need a customized schedule? Reach out directly to <strong>hello@beingyoupath.com</strong></span>
          <span>WhatsApp support: <strong>+91 7387772573</strong> / <strong>+91 7387779238</strong></span>
        </div>
      </div>
    </div>
  );
}
