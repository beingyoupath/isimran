import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  Clock,
  Globe,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import SEO from "../../components/SEO";
import {
  CALENDLY_URL,
  CLINIC_ADDRESS,
  CLINIC_HOURS_LABEL,
  LOCAL_BUSINESS_SCHEMA,
  PHONE_PRIMARY,
  PHONE_PRIMARY_HREF,
  TELE_MANAS_NOTICE,
} from "../../lib/seoConfig";

const HI_HOME_FAQS = [
  {
    question: "एक काउंसलिंग सेशन की फीस कितनी होती है?",
    answer:
      "फीस सेशन के प्रकार (व्यक्तिगत काउंसलिंग, कपल्स सेशन या करियर मार्गदर्शन) पर निर्भर करती है। हम आपकी निःशुल्क 15-मिनट क्लैरिटी कॉल के दौरान पूरी फीस संरचना स्पष्ट रूप से साझा करते हैं ताकि कोई छिपा शुल्क न हो।",
  },
  {
    question: "पहले सेशन में क्या होता है?",
    answer:
      "50–60 मिनट के पहले सेशन में हम बिना किसी जल्दबाज़ी या निर्णय के आपकी स्थिति सुनते हैं, मुख्य तनाव बिंदुओं को समझते हैं, और अगले कुछ सेशंस के लिए एक व्यावहारिक लक्ष्य व एक तुरंत उपयोगी ग्राउंडिंग टूल साझा करते हैं।",
  },
  {
    question: "CBT और सामान्य टॉक थेरेपी में क्या अंतर है?",
    answer:
      "सामान्य टॉक थेरेपी मुख्यतः बातचीत और भावनात्मक अभिव्यक्ति पर केंद्रित होती है, जबकि Cognitive Behavioral Therapy (CBT) में विचारों के पैटर्न को पहचानने, उन्हें संतुलित करने और रोज़मर्रा के अभ्यास के व्यावहारिक टूल्स शामिल होते हैं।",
  },
  {
    question: "क्या ऑनलाइन थेरेपी पुणे में क्लिनिक विज़िट जितनी ही प्रभावी है?",
    answer:
      "हाँ। तनाव, चिंता, बर्नआउट, ओवरथिंकिंग और करियर स्पष्टता के लिए सुरक्षित वीडियो सेशंस बिल्कुल उन्हीं वैज्ञानिक पद्धतियों का उपयोग करते हैं जो हमारे डेक्कन जिमखाना क्लिनिक में उपलब्ध हैं—शाम व सप्ताहांत के समय के साथ।",
  },
  {
    question: "क्या मेरे सेशन की बातें पूरी तरह गोपनीय रखी जाती हैं?",
    answer:
      "आपकी जानकारी गोपनीय रखी जाती है। अपवाद सीमित हैं और कानून द्वारा तय हैं—जैसे गंभीर नुकसान का जोखिम, दुर्व्यवहार की रिपोर्ट करने का कानूनी कर्तव्य, या न्यायालय का आदेश।",
  },
];

export default function HomeHi() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="w-full bg-soft-sand text-charcoal-warm">
      <SEO
        title="पुणे में मनोवैज्ञानिक एवं काउंसलिंग | Being You Path"
        description="पुणे (डेक्कन जिमखाना) और पूरे भारत में ऑनलाइन CBT व काउंसलिंग। NIMHANS में क्लिनिकल प्रशिक्षण प्राप्त मनोवैज्ञानिक के साथ निःशुल्क 15-मिनट क्लैरिटी कॉल बुक करें।"
        url="/hi"
        locale="hi_IN"
        alternates={[
          { hreflang: "en-IN", href: "/" },
          { hreflang: "hi-IN", href: "/hi" },
          { hreflang: "x-default", href: "/" },
        ]}
        schema={[LOCAL_BUSINESS_SCHEMA]}
        faqs={HI_HOME_FAQS}
      />

      {/* Hero Section */}
      <section className="section-dark relative bg-[#0B3A42] text-[#FAF9F6] py-16 md:py-24 border-b border-stone-200/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#F8C988]">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              डेक्कन जिमखाना, पुणे एवं पूरे भारत में ऑनलाइन
            </span>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-xs font-semibold text-[#F8C988] border border-white/20 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>View in English</span>
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#FAF9F6] leading-tight">
            पुणे में मनोवैज्ञानिक एवं काउंसलिंग सेंटर
          </h1>

          <p className="text-base sm:text-lg text-[#FAF9F6] max-w-3xl leading-relaxed">
            Being You Path में हम NIMHANS में क्लिनिकल प्रशिक्षण प्राप्त मनोवैज्ञानिक इमरान हुसैन और काउंसलिंग साइकोलॉजिस्ट तेजस्विनी जोशी के नेतृत्व में प्रमाण-आधारित CBT, तनाव, बर्नआउट, ओवरथिंकिंग, आत्मविश्वास और करियर काउंसलिंग प्रदान करते हैं—प्रभात रोड, डेक्कन जिमखाना, पुणे में और पूरे भारत में ऑनलाइन वीडियो द्वारा।
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[48px] px-7 py-3.5 rounded-full bg-[#E6A157] hover:bg-[#d69147] text-[#0B3A42] text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>निःशुल्क 15-मिनट क्लैरिटी कॉल बुक करें</span>
            </a>
            <Link
              to="/guides/how-to-choose-a-psychologist-pune"
              className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-[#FAF9F6] text-xs font-semibold border border-white/25 transition-colors"
            >
              <span>पुणे में सही मनोवैज्ञानिक कैसे चुनें (गाइड)</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Top Services in Hindi */}
      <section className="py-14 md:py-20 bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42] mb-2">
              हमारी प्रमुख सेवाएं (हिन्दी में पढ़ें)
            </h2>
            <p className="text-sm sm:text-base text-stone-700">
              व्यक्तिगत और कार्यस्थल से जुड़ी चुनौतियों के लिए हमारे प्रमुख थेरेपी पृष्ठ:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/hi/services/cbt-therapy-pune"
              className="bg-soft-sand p-6 rounded-3xl border border-stone-200 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-lg font-bold font-heading text-[#0B3A42] group-hover:text-[#A43F23] mb-2">
                  CBT थेरेपी (पुणे और ऑनलाइन)
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed mb-4">
                  ओवरथिंकिंग, चिंता और लो मूड को संतुलित करने के लिए संरचित Cognitive Behavioral Therapy।
                </p>
              </div>
              <span className="text-xs font-bold text-[#A43F23] inline-flex items-center gap-1">
                विस्तार से पढ़ें <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              to="/hi/services/stress-anxiety-counselling-pune"
              className="bg-soft-sand p-6 rounded-3xl border border-stone-200 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-lg font-bold font-heading text-[#0B3A42] group-hover:text-[#A43F23] mb-2">
                  तनाव और चिंता काउंसलिंग
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed mb-4">
                  लगातार बेचैनी, पैनिक अटैक, नींद की परेशानी और घबराहट के लिए व्यावहारिक मनोवैज्ञानिक सहायता।
                </p>
              </div>
              <span className="text-xs font-bold text-[#A43F23] inline-flex items-center gap-1">
                विस्तार से पढ़ें <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              to="/hi/services/burnout-counselling-pune"
              className="bg-soft-sand p-6 rounded-3xl border border-stone-200 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-lg font-bold font-heading text-[#0B3A42] group-hover:text-[#A43F23] mb-2">
                  बर्नआउट और कार्य तनाव काउंसलिंग
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed mb-4">
                  कॉर्पोरेट व IT प्रोफेशनल्स के लिए पुरानी थकान, सीमाएं तय करने और ऊर्जा पुनर्निर्माण में सहयोग।
                </p>
              </div>
              <span className="text-xs font-bold text-[#A43F23] inline-flex items-center gap-1">
                विस्तार से पढ़ें <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Questions people ask in Hindi */}
      <section className="py-14 md:py-20 bg-soft-sand border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-bold text-[#A43F23]">
              <CircleHelp className="w-3.5 h-3.5" aria-hidden="true" />
              सामान्य प्रश्न
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42]">
              लोग अक्सर जो सवाल पूछते हैं (Questions people ask)
            </h2>
          </div>

          <div className="space-y-3">
            {HI_HOME_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden"
                >
                  <h3 className="m-0 font-heading font-semibold text-[#0B3A42] text-base">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#0B3A42] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#0B3A42] shrink-0" />
                      )}
                    </button>
                  </h3>
                  <div
                    className={`grid transition-all duration-200 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pt-2 text-sm text-stone-700 leading-relaxed border-t border-stone-100">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clinic Details */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-soft-sand p-6 sm:p-8 rounded-3xl border border-stone-200 space-y-3 text-sm text-stone-700">
            <h2 className="text-xl font-bold font-heading text-[#0B3A42] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#A43F23]" aria-hidden="true" />
              <span>पुणे क्लिनिक का पता व समय</span>
            </h2>
            <p>
              <strong>पता:</strong> {CLINIC_ADDRESS}
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#A43F23]" aria-hidden="true" />
              <span>{CLINIC_HOURS_LABEL} (केवल अपॉइंटमेंट द्वारा)</span>
            </p>
            <p>
              <strong>फ़ोन / व्हाट्सएप:</strong>{" "}
              <a href={PHONE_PRIMARY_HREF} className="underline font-semibold text-[#0B3A42]">
                {PHONE_PRIMARY}
              </a>
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-900 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
              <span>सेशंस मुख्यतः अंग्रेज़ी में उपलब्ध हैं (अतिरिक्त भाषा विकल्प कॉल पर पूछें)।</span>
            </div>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">{TELE_MANAS_NOTICE}</p>
        </div>
      </section>
    </div>
  );
}
