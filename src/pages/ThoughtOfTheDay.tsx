import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Check,
  Copy,
  PhoneCall,
  Quote,
  Share2,
  Sparkles,
} from "lucide-react";
import SEO from "../components/SEO";
import { TELE_MANAS_NOTICE } from "../lib/seoConfig";
import {
  ArchiveMonthGroup,
  DailyThoughtResult,
  buildCopyThoughtText,
  buildISTDatePartsFromYMD,
  buildWhatsAppThoughtShareUrl,
  getDailyThoughtIST,
  getDefaultThought,
  getDefaultWeekdayPractice,
  getSeasonFromMonth,
  getYearArchiveUntilISTToday,
  msUntilNextISTMidnight,
} from "../lib/thoughts";

export default function ThoughtOfTheDay() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [daily, setDaily] = useState<DailyThoughtResult>(() => {
    const defaultIst = buildISTDatePartsFromYMD(2026, 1, 5);
    return {
      thought: getDefaultThought(),
      practice: getDefaultWeekdayPractice(),
      ist: defaultIst,
      season: getSeasonFromMonth(defaultIst.month),
      matchKind: "fallback",
    };
  });

  const [archiveMonths, setArchiveMonths] = useState<ArchiveMonthGroup[]>(() =>
    getYearArchiveUntilISTToday(buildISTDatePartsFromYMD(2026, 1, 5))
  );

  useEffect(() => {
    let midnightTimer: ReturnType<typeof setTimeout> | undefined;

    const refresh = () => {
      const currentDaily = getDailyThoughtIST(new Date());
      setDaily(currentDaily);
      setArchiveMonths(getYearArchiveUntilISTToday(currentDaily.ist));
      midnightTimer = setTimeout(refresh, msUntilNextISTMidnight());
    };

    refresh();

    return () => {
      if (midnightTimer) clearTimeout(midnightTimer);
    };
  }, []);

  const handleCopy = (id: string, textToCopy: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopiedId(id);
          setTimeout(() => setCopiedId(null), 2000);
        })
        .catch(() => {});
    }
  };

  const { thought, practice, ist } = daily;

  return (
    <div className="bg-soft-sand min-h-screen pb-24">
      <SEO
        title="Thought of the Day & Daily Reflection Archive | Being You Path"
        description="Daily evidence-informed psychology reflections, classic philosophical insights, and quick weekday micro-practices updated at midnight India Standard Time (IST)."
        url="/thought-of-the-day"
        breadcrumbs={[
          { name: "Thought of the Day", url: "/thought-of-the-day" },
        ]}
      />

      {/* Hero Header */}
      <section className="section-dark bg-[#0B3A42] text-[#FAF9F6] py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F8C988] mb-3">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Daily Reflection · India Standard Time</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-[#FAF9F6] mb-4">
            Thought of the Day
          </h1>
          <p className="text-base md:text-lg text-[#F5F0E6] max-w-2xl mx-auto leading-relaxed">
            One grounded reflection each day from classical philosophy, Indian wisdom traditions, and practical CBT psychology—paired with a 30–90 second weekday micro-practice.
          </p>
        </div>
      </section>

      {/* Featured Today Card + Weekday Micro-Practice */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Today's Large Thought Card */}
          <div className="section-dark bg-[#0B3A42] text-[#FAF9F6] rounded-[28px] p-8 md:p-12 shadow-lg border-l-4 border-[#E6A157]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  suppressHydrationWarning
                  className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#FAF9F6] uppercase bg-white/15 px-3.5 py-1.5 rounded-full border border-[#FAF9F6]/20"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#F8C988]" aria-hidden="true" />
                  {ist.formattedDate} (IST)
                </span>
                {thought.occasion && (
                  <span
                    suppressHydrationWarning
                    className="inline-flex items-center text-xs font-bold tracking-wide text-[#F8C988] bg-[#E6A157]/20 border border-[#E6A157]/45 px-3 py-1 rounded-full"
                  >
                    {thought.occasion}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy("hero", buildCopyThoughtText(thought))}
                  className="px-3.5 py-2 min-h-[40px] rounded-full bg-white/10 hover:bg-white/20 text-[#FAF9F6] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold border border-[#FAF9F6]/25"
                >
                  {copiedId === "hero" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#F8C988]" />
                      <span className="text-[#F8C988]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={buildWhatsAppThoughtShareUrl(thought)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 min-h-[40px] rounded-full bg-white/10 hover:bg-white/20 text-[#FAF9F6] hover:text-white transition-colors inline-flex items-center gap-1.5 text-xs font-semibold border border-[#FAF9F6]/25"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#F8C988]" aria-hidden="true" />
                  <span>Share on WhatsApp</span>
                </a>
              </div>
            </div>

            <Quote className="w-10 h-10 text-[#FAF9F6]/60 mb-4" aria-hidden="true" />
            <blockquote
              suppressHydrationWarning
              className="text-2xl sm:text-3xl md:text-4xl font-heading font-medium text-[#FAF9F6] leading-snug italic mb-6"
            >
              &ldquo;{thought.text}&rdquo;
            </blockquote>

            {thought.helplineNote && (
              <div className="mb-6 px-5 py-4 rounded-2xl bg-white/10 border border-[#F8C988]/50 text-[#FAF9F6] text-sm leading-relaxed flex flex-wrap items-center justify-between gap-3">
                <span>{thought.helplineNote}</span>
                <a
                  href="tel:14416"
                  className="inline-flex items-center gap-1.5 font-bold text-[#F8C988] hover:text-white underline underline-offset-4"
                >
                  <PhoneCall className="w-4 h-4" aria-hidden="true" />
                  <span>Call Tele-MANAS 14416</span>
                </a>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#FAF9F6]/20">
              <div>
                <p suppressHydrationWarning className="text-base font-semibold text-[#FAF9F6]">
                  — {thought.author}
                </p>
                <p suppressHydrationWarning className="text-xs text-[#F5F0E6]/90 mt-0.5">
                  {thought.source}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  suppressHydrationWarning
                  className="inline-block text-[11px] uppercase tracking-widest text-[#FAF9F6] bg-[#FAF9F6]/15 border border-[#FAF9F6]/25 px-3 py-1 rounded-full font-semibold"
                >
                  {thought.theme}
                </span>
                {thought.linkTo && (
                  <Link
                    to={thought.linkTo}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F8C988] hover:text-white underline underline-offset-4 transition-colors"
                  >
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Today's Weekday Micro-Practice */}
          <div className="bg-white rounded-[24px] p-7 md:p-9 border border-stone-200/80 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span
                suppressHydrationWarning
                className="text-xs font-bold uppercase tracking-wider text-terracotta"
              >
                {practice.weekday} Micro-Practice · {practice.duration}
              </span>
              <span className="text-xs font-semibold text-deep-teal bg-soft-sand px-3 py-1 rounded-full">
                Resets Daily at Midnight IST
              </span>
            </div>
            <h2
              suppressHydrationWarning
              className="text-2xl font-bold font-heading text-deep-teal mb-3"
            >
              {practice.emoji} {practice.title}
            </h2>
            <p
              suppressHydrationWarning
              className="text-charcoal-warm text-base md:text-lg leading-relaxed"
            >
              {practice.body}
            </p>
          </div>
        </div>
      </section>

      {/* Year Archive So Far (Month by Month) */}
      <section className="py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2
              suppressHydrationWarning
              className="text-2xl md:text-3xl font-bold font-heading text-deep-teal mb-2"
            >
              {ist.year} Daily Archive (Jan 1 – Today IST)
            </h2>
            <p className="text-charcoal-warm text-sm md:text-base">
              Browse every thought published so far this calendar year, grouped by month.
            </p>
          </div>

          <div className="space-y-10">
            {archiveMonths.map((group) => (
              <div key={group.month} className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-300/70 pb-2">
                  <h3 className="text-xl font-bold font-heading text-deep-teal">
                    {group.monthName} {ist.year}
                  </h3>
                  <span className="text-xs font-semibold text-stone-700">
                    {group.items.length} {group.items.length === 1 ? "day" : "days"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.items.map((item) => (
                    <article
                      key={item.isoDate}
                      className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                          <span className="text-xs font-bold text-terracotta">
                            {item.displayDate} · {item.weekday}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-deep-teal bg-soft-sand px-2.5 py-0.5 rounded-full">
                            {item.thought.theme}
                          </span>
                        </div>

                        {item.thought.occasion && (
                          <div className="mb-2">
                            <span className="inline-block text-[11px] font-semibold text-[#9E3F24] bg-amber-glow/20 px-2.5 py-0.5 rounded-full">
                              {item.thought.occasion}
                            </span>
                          </div>
                        )}

                        <p className="text-deep-teal font-heading text-[15.5px] leading-relaxed italic mb-3">
                          &ldquo;{item.thought.text}&rdquo;
                        </p>
                      </div>

                      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="text-charcoal-warm">
                          <span className="font-semibold text-deep-teal">
                            {item.thought.author}
                          </span>
                          <span className="block text-[11px] text-stone-600">
                            {item.thought.source}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.thought.linkTo && (
                            <Link
                              to={item.thought.linkTo}
                              className="text-xs font-semibold text-terracotta hover:text-deep-teal underline underline-offset-4"
                            >
                              Read more
                            </Link>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(item.isoDate, buildCopyThoughtText(item.thought))
                            }
                            className="px-2.5 py-1 rounded-full bg-soft-sand hover:bg-stone-200 text-deep-teal font-medium inline-flex items-center gap-1 cursor-pointer"
                            aria-label={`Copy thought for ${item.displayDate}`}
                          >
                            {copiedId === item.isoDate ? (
                              <>
                                <Check className="w-3 h-3 text-sage-green" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" aria-hidden="true" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-stone-700 max-w-3xl mx-auto mt-12 leading-relaxed">
            {TELE_MANAS_NOTICE}
          </p>
        </div>
      </section>
    </div>
  );
}
