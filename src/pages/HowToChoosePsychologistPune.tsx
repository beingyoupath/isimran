import { Link } from "react-router-dom";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Calendar,
  MapPin,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import {
  buildArticleSchema,
  CALENDLY_URL,
  CLINIC_ADDRESS,
  LOCAL_BUSINESS_SCHEMA,
  TELE_MANAS_NOTICE,
} from "../lib/seoConfig";

const PILLAR_FAQS = [
  {
    question: "What qualifications should a psychologist in Pune have?",
    answer:
      "Look for a minimum Master's degree (M.A. or M.Sc.) in Clinical Psychology or Counselling Psychology, supervised practicum hours, and clear transparency on their scope of practice. In India, clinical psychologists working in hospital diagnostic settings register with RCI, while M.A./M.Sc. counselling and clinical psychologists provide psychotherapy and outpatient counselling.",
  },
  {
    question: "How do I know if a therapist is the right fit during the first call?",
    answer:
      "Notice whether you feel listened to rather than rushed or lectured, whether they explain their method (such as CBT or somatic work) clearly, and whether fees, session length, and confidentiality boundaries are shared openly upfront.",
  },
  {
    question: "Should I pick an in-person psychologist near Prabhat Road or online therapy?",
    answer:
      "Both work well for non-emergency anxiety, burnout, overthinking, self-esteem, and career concerns. Choose in-person visits in Deccan Gymkhana if a dedicated room away from family feels grounding, or choose online video if Pune traffic or work travel would make weekly consistency difficult.",
  },
  {
    question: "What are red flags when looking for counselling in Pune?",
    answer:
      "Be cautious of practitioners who promise guaranteed cures in a fixed number of days, pressure you into expensive multi-month upfront packages before meeting you, prescribe medication without being a medical psychiatrist (MD), or blur personal boundaries.",
  },
];

export default function HowToChoosePsychologistPune() {
  const canonicalPath = "/guides/how-to-choose-a-psychologist-pune";
  const breadcrumbs = [
    { name: "Resources", url: "/resources" },
    { name: "How to Choose a Psychologist in Pune", url: canonicalPath },
  ];

  // TODO: [I will supply] Add real datePublished / dateModified once confirmed.
  const articleSchema = buildArticleSchema({
    title: "How to Choose a Psychologist or Counsellor in Pune",
    description:
      "Practical guide to choosing a qualified psychologist or counsellor in Pune—what credentials mean, CBT vs talk therapy, red flags to watch out for, and fees.",
    path: canonicalPath,
    authorName: "Imran Hussain",
  });

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#2C3E50]">
      <SEO
        title="How to Choose a Psychologist in Pune | Being You Path"
        description="Practical guide to choosing a psychologist or counsellor in Pune—credentials, CBT vs talk therapy, red flags, fees and first-session questions."
        url={canonicalPath}
        breadcrumbs={breadcrumbs}
        schema={[LOCAL_BUSINESS_SCHEMA, articleSchema]}
        faqs={PILLAR_FAQS}
        articleMeta={{
          author: "Imran Hussain",
        }}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Header */}
      <section className="section-dark bg-[#0B3A42] text-[#FAF9F6] py-14 md:py-20 border-b border-stone-200/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#F8C988]" aria-hidden="true" />
            <span className="text-[#F8C988] uppercase tracking-wider font-bold">
              Pillar Guide · Pune &amp; India
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#FAF9F6] tracking-tight leading-tight mb-4">
            How to Choose a Psychologist or Counsellor in Pune
          </h1>
          <p className="text-base sm:text-lg text-[#FAF9F6] leading-relaxed max-w-2xl">
            Searching for therapy in Pune can feel overwhelming—especially when titles, degrees, fees, and therapy buzzwords look confusing online. Here is a straightforward, honest checklist from our practice in Deccan Gymkhana to help you pick a trustworthy practitioner anywhere in the city or online.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-stone-800 leading-relaxed text-sm sm:text-base">
          {/* Author Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs text-stone-700 flex flex-wrap gap-x-6 gap-y-2">
            <span>
              Author: <strong className="text-[#0B3A42]">Imran Hussain</strong> (Psychologist and CBT practitioner, M.A.)
            </span>
          </div>

          {/* Section 1: Understanding Qualifications in India */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42]">
              1. Understand Credentials &amp; Roles Clearly
            </h2>
            <p className="text-stone-700">
              In India, terms like psychologist, counsellor, therapist, life coach, and psychiatrist are often mixed together on social media. Understanding who does what saves weeks of trial and error:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200">
                <h3 className="font-heading font-bold text-[#0B3A42] text-base mb-2">
                  Counselling &amp; Clinical Psychologists
                </h3>
                <p className="text-sm text-stone-700">
                  Hold a postgraduate degree (M.A. or M.Sc. in Counselling or Clinical Psychology), often paired with specialized clinical internships (such as NIMHANS) and evidence-based modality training like CBT. They provide talk therapy, behavioral tools, and structured emotional support—not medication.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-stone-200">
                <h3 className="font-heading font-bold text-[#0B3A42] text-base mb-2">
                  Psychiatrists vs Life Coaches
                </h3>
                <p className="text-sm text-stone-700">
                  Psychiatrists are medical doctors (MBBS, MD) licensed to diagnose medical conditions and prescribe psychiatric medication. Life coaches typically lack clinical mental health training and should not treat anxiety disorders, trauma, or depression.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Match Your Concern to the Therapy Style */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42]">
              2. Match Your Primary Concern to the Approach
            </h2>
            <p className="text-stone-700">
              Different concerns benefit from different therapeutic structures. Asking how a practitioner works prevents feeling stuck in endless conversations with no practical relief:
            </p>
            <ul className="space-y-3">
              <li className="bg-white p-5 rounded-2xl border border-stone-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-[#0B3A42]">For racing thoughts, worry, and panic:</strong>{" "}
                  Look for structured{" "}
                  <Link to="/services/cbt-therapy-pune" className="text-[#A43F23] underline font-semibold">
                    CBT Therapy
                  </Link>{" "}
                  or{" "}
                  <Link to="/services/overthinking-therapy" className="text-[#A43F23] underline font-semibold">
                    Overthinking Therapy
                  </Link>{" "}
                  combining thought mapping with nervous-system grounding.
                </div>
              </li>
              <li className="bg-white p-5 rounded-2xl border border-stone-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-[#0B3A42]">For chronic work fatigue and boundary strain:</strong>{" "}
                  Explore focused{" "}
                  <Link to="/services/burnout-counselling-pune" className="text-[#A43F23] underline font-semibold">
                    Burnout Counselling
                  </Link>{" "}
                  with someone who understands corporate workloads alongside clinical stress physiology.
                </div>
              </li>
              <li className="bg-white p-5 rounded-2xl border border-stone-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-[#0B3A42]">For self-doubt, relationships, or student stress:</strong>{" "}
                  Check{" "}
                  <Link to="/services/self-esteem-therapy-pune" className="text-[#A43F23] underline font-semibold">
                    Self-Esteem Therapy
                  </Link>
                  ,{" "}
                  <Link to="/services/relationship-couples-counselling-pune" className="text-[#A43F23] underline font-semibold">
                    Couples Counselling
                  </Link>
                  , or{" "}
                  <Link to="/services/student-adolescent-counselling-pune" className="text-[#A43F23] underline font-semibold">
                    Student &amp; Adolescent Counselling
                  </Link>{" "}
                  grounded in culturally aware Indian family understanding.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3: 5 Questions to Ask Before Booking */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42]">
              3. Five Questions to Ask on a Clarity Call
            </h2>
            <ol className="space-y-2.5 text-sm text-stone-700 list-decimal pl-5">
              <li>What specific qualifications and training do you hold for my concern?</li>
              <li>Do sessions follow a structured framework like CBT, or open-ended reflection?</li>
              <li>How long is each session (50–60 minutes vs rushed 30-minute slots), and what is the fee?</li>
              <li>How do you safeguard client confidentiality—especially if family members or employers ask?</li>
              <li>Can I alternate between in-person visits in Pune and online video if work or traffic interferes?</li>
            </ol>
          </section>

          {/* Section 4: Red Flags to Watch Out For */}
          <section className="bg-amber-50/70 p-6 sm:p-8 rounded-3xl border border-amber-200 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#0B3A42] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#A43F23]" aria-hidden="true" />
              <span>4. Red Flags to Avoid</span>
            </h2>
            <ul className="space-y-2 text-sm text-stone-800 list-disc pl-5">
              <li>Guaranteed instant cures, miracle claims, or promising exact recovery timelines before meeting you.</li>
              <li>Heavy pressure to pay for a 15-session package before having even one initial conversation.</li>
              <li>Sharing details of your sessions casually with parents or partners without your consent (barring immediate risk of harm).</li>
              <li>Telling you what major life decisions you must take rather than helping you build independent clarity.</li>
            </ul>
          </section>

          {/* Section 5: Location vs Convenience in Pune */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42]">
              5. Choosing Between Pune Clinic Visits &amp; Online Therapy
            </h2>
            <p className="text-stone-700">
              Consistency matters more than commute heroics. At Being You Path, our clinic at{" "}
              <strong className="text-[#0B3A42]">{CLINIC_ADDRESS}</strong> serves clients across Deccan Gymkhana, Prabhat Road, Erandwane, Kothrud, Shivaji Nagar, FC Road, Model Colony, Baner, Aundh, and Koregaon Park. If traffic or monsoon days make travel tiring, we seamlessly continue over{" "}
              <Link to="/services/online-therapy-india" className="text-[#A43F23] underline font-semibold">
                encrypted online therapy
              </Link>{" "}
              without losing momentum.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/services/counselling-prabhat-road-pune"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-stone-200 text-xs font-semibold text-[#0B3A42] hover:bg-stone-50"
              >
                <MapPin className="w-3.5 h-3.5 text-[#A43F23]" aria-hidden="true" />
                <span>Prabhat Road Clinic Guide</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-stone-200 text-xs font-semibold text-[#0B3A42] hover:bg-stone-50"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#A43F23]" aria-hidden="true" />
                <span>Meet Imran Hussain &amp; Tejaswini Joshi</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </section>

          {/* FAQs */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42]">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {PILLAR_FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-stone-200"
                >
                  <h3 className="text-base font-bold font-heading text-[#0B3A42] mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Closing CTA */}
          <section className="section-dark bg-[#0B3A42] text-[#FAF9F6] p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#FAF9F6] mb-2">
                Still unsure who to speak with first?
              </h2>
              <p className="text-sm text-[#FAF9F6]">
                Book a free 15-minute clarity call with our team to ask your questions before committing to a paid appointment.
              </p>
            </div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#E6A157] hover:bg-[#d69147] text-[#0B3A42] text-xs font-bold uppercase tracking-wider shrink-0 transition-colors"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Book Free Clarity Call</span>
            </a>
          </section>

          <p className="text-xs text-stone-700 leading-relaxed">{TELE_MANAS_NOTICE}</p>
        </div>
      </article>
    </div>
  );
}
