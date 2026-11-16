import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import {
  CLINIC_ADDRESS,
  EMAIL_PRIMARY,
  PHONE_PRIMARY,
  TELE_MANAS_NOTICE,
} from "../lib/seoConfig";

export default function Terms() {
  const breadcrumbs = [{ name: "Terms & Scope of Care", url: "/terms" }];

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#2C3E50]">
      <SEO
        title="Terms of Service & Scope of Care | Being You Path"
        description="Terms of engagement, appointment rescheduling, confidentiality boundaries, and non-emergency scope of psychological counselling at Being You Path."
        url="/terms"
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <section className="py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <header className="pb-6 border-b border-stone-200">
            <span className="text-xs font-bold text-[#A43F23] uppercase tracking-wider">
              Practice Policies
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-[#0B3A42] tracking-tight leading-tight mt-2 mb-3">
              Terms of Service &amp; Clinical Scope of Care
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              Being You Path · {CLINIC_ADDRESS}
            </p>
          </header>

          <div className="space-y-6 text-sm text-stone-800 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold font-heading text-[#0B3A42]">
                1. Non-Emergency Outpatient Counselling
              </h2>
              <p>
                Being You Path provides scheduled, non-emergency psychological
                counselling, psychotherapy, career guidance, and workshops. This
                website and our chatbot are informational only and do not provide
                crisis intervention or emergency medical care.
              </p>
              <p className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-stone-800">
                <strong>Crisis Support:</strong> {TELE_MANAS_NOTICE}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold font-heading text-[#0B3A42]">
                2. Appointments &amp; Rescheduling
              </h2>
              <p>
                All in-person sessions in Deccan Gymkhana, Pune and online video
                sessions require prior scheduling. If you need to reschedule or
                cancel a paid session, please notify us via WhatsApp or email at
                least 24 hours in advance so the slot can be offered to another
                client.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold font-heading text-[#0B3A42]">
                3. Confidentiality &amp; Exceptions
              </h2>
              <p>
                Personal disclosures shared during counselling sessions are kept
                strictly confidential. Exceptions apply only where disclosure is
                legally required to prevent imminent, serious harm to yourself or
                others, or under valid court order under Indian law.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold font-heading text-[#0B3A42]">
                4. Educational Content &amp; AI Guide Disclaimer
              </h2>
              <p>
                Articles in our Resources library and automated Wellness Guide
                conversations offer general psychoeducation and reflective tools.
                They do not constitute a clinical diagnosis, medical prescription,
                or substitute for individualized consultation with a qualified
                professional.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold font-heading text-[#0B3A42]">
                5. Questions &amp; Contact
              </h2>
              <p>
                For questions about these terms or our{" "}
                <Link to="/privacy-policy" className="text-[#A43F23] underline font-semibold">
                  Privacy Policy
                </Link>
                , contact us at{" "}
                <a href={`mailto:${EMAIL_PRIMARY}`} className="text-[#0B3A42] underline">
                  {EMAIL_PRIMARY}
                </a>{" "}
                or call {PHONE_PRIMARY}.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
