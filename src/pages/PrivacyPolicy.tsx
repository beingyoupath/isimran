import { Link } from "react-router-dom";
import { Shield, Lock, AlertCircle, FileText } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";

export default function PrivacyPolicy() {
  const breadcrumbs = [
    { name: "Privacy Policy", url: "/privacy-policy" },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SEO
        title="Privacy Policy | Being You Path"
        description="Privacy policy for Being You Path under India's DPDP Act 2023. Details on data collected, purpose, retention, deletion rights, and confidentiality."
        url="https://www.beingyoupath.com/privacy-policy"
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <section className="py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <header className="pb-8 border-b border-stone-200">
            <span className="text-xs font-bold text-[#A43F23] uppercase tracking-wider">
              Legal Transparency &amp; Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-[#0B3A42] tracking-tight leading-tight mt-2 mb-3">
              Privacy Policy &amp; Data Protection
            </h1>
            <p className="text-xs sm:text-sm text-stone-700">
              Compliant with India&apos;s Digital Personal Data Protection (DPDP) Act, 2023 &bull; Last updated: November 3, 2026
            </p>
          </header>

          {/* Mandatory Legal Review Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950 mb-0.5">Notice to Users &amp; Practice Administrators:</p>
              <p>
                This privacy policy is provided for informational and transparency purposes and should be formally reviewed by a qualified legal professional to ensure ongoing alignment with your practice&apos;s operations.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-stone-800 leading-relaxed text-xs sm:text-sm">
            <section className="space-y-2">
              <h2 className="text-lg font-bold font-heading text-[#0B3A42]">1. Overview &amp; Practice Identity</h2>
              <p>
                Being You Path (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates a psychological counselling and therapy practice headquartered at <strong>119/17, Dr. Sripati Shastri Path, Near Prabhat Road, Deccan Gymkhana, Pune, Maharashtra 411004, India</strong> (contact email: <strong>hello@beingyoupath.com</strong>, phone: <strong>+91 7387772573</strong>). We are committed to honoring and safeguarding the privacy of our website visitors, clients, and prospective clients.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold font-heading text-[#0B3A42]">2. What Data We Collect</h2>
              <p>We strictly limit data collection to what is necessary for appointment scheduling and clinical coordination:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
                <li>
                  <strong>Consultation Booking Form:</strong> When you submit our booking form, we collect your <em>full name</em>, <em>phone number</em>, <em>preferred consultation time window</em>, and an <em>optional brief note</em> describing your inquiry.
                </li>
                <li>
                  <strong>WhatsApp &amp; Phone Inquiries:</strong> When you contact our practice via WhatsApp (+91 7387772573) or phone, we collect your phone number and any scheduling information you voluntarily share.
                </li>
                <li>
                  <strong>Technical &amp; Analytical Logs:</strong> Anonymous aggregate usage data (e.g. pages viewed, button clicks) collected via Google Analytics 4 (GA4) with IP anonymization to evaluate site usability.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold font-heading text-[#0B3A42]">3. Purpose of Processing (Why We Collect It)</h2>
              <p>Under India&apos;s DPDP Act, 2023, data is processed solely for lawful, specific purposes:</p>
              <ul className="list-disc pl-5 space-y-1 text-stone-700">
                <li>To contact you and confirm your consultation appointment schedule.</li>
                <li>To allocate an appropriate counselling practitioner based on your preferences.</li>
                <li>To provide technical and logistical links for encrypted video appointments.</li>
                <li>We <strong>never</strong> sell, rent, or monetize your personal information or use it for promotional spam.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold font-heading text-[#0B3A42]">4. Statutory Clinical Confidentiality</h2>
              <p>
                Everything disclosed within clinical therapy sessions is governed by ethical guidelines and statutory confidentiality under <strong>Section 23 of the Mental Healthcare Act, 2017</strong>. Session notes are maintained separately from web server records and cannot be shared without your explicit written release, except where required by law to prevent immediate, serious self-harm or harm to others.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold font-heading text-[#0B3A42]">5. Data Retention Period</h2>
              <p>
                Consultation booking inquiries that do not result in ongoing therapy are routinely deleted from our intake database within <strong>90 days</strong>. For active clients, clinical documentation is maintained securely in accordance with standard medical record retention regulations in India.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold font-heading text-[#0B3A42]">6. Your Rights Under India&apos;s DPDP Act 2023</h2>
              <p>As a data principal, you have the following rights:</p>
              <ul className="list-disc pl-5 space-y-1 text-stone-700">
                <li><strong>Right to Access:</strong> You may request a summary of the personal data we hold about you.</li>
                <li><strong>Right to Correction &amp; Erasure:</strong> You may request that inaccurate data be updated or that your contact records be permanently erased from our booking database.</li>
                <li><strong>Right of Grievance Redressal:</strong> You may submit any data protection concerns directly to our Data Grievance Officer.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold font-heading text-[#0B3A42]">7. How to Request Data Deletion or Correction</h2>
              <p>
                To exercise any of your data rights or request the permanent deletion of your inquiry details, send an email to <strong>hello@beingyoupath.com</strong> with the subject line <em>&quot;Data Deletion Request&quot;</em> accompanied by your name and phone number. Our team will verify your identity and process the deletion within <strong>7 business days</strong>.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold font-heading text-[#0B3A42]">8. Contact Our Practice</h2>
              <p>
                For questions regarding this policy or our data practices, reach us at:
              </p>
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1">
                <p><strong>Being You Path</strong></p>
                <p>119/17, Dr. Sripati Shastri Path, Near Prabhat Road, Deccan Gymkhana, Pune, Maharashtra 411004, India</p>
                <p>Email: <a href="mailto:hello@beingyoupath.com" className="text-[#0B3A42] underline">hello@beingyoupath.com</a></p>
                <p>Phone: <a href="tel:+917387772573" className="text-[#0B3A42] underline">+91 7387772573</a> / <a href="tel:+917387779238" className="text-[#0B3A42] underline">+91 7387779238</a></p>
                <p className="pt-1">
                  Related: <Link to="/terms" className="text-[#A43F23] underline font-semibold">Terms of Service &amp; Clinical Scope of Care</Link>
                </p>
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-stone-800">
                <strong>Non-Emergency Support:</strong> If you are experiencing a mental health crisis or thoughts of self-harm, please call India&apos;s free 24/7 Tele-MANAS helpline on <strong>14416</strong> or <strong>1800-891-4416</strong>, or seek local emergency medical care immediately.
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
