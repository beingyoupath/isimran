import { useState } from "react";
import { ShieldAlert, ShieldCheck, Phone, X, AlertTriangle, FileText, ExternalLink, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "crisis" | "consent";
}

export default function ConsentAndCrisisModal({ isOpen, onClose, defaultTab = "crisis" }: Props) {
  const [activeTab, setActiveTab] = useState<"crisis" | "consent">(defaultTab);

  const helplines = [
    {
      name: "Tele-MANAS (Govt. of India)",
      number: "14416",
      tollFree: "1800-891-4416",
      desc: "24x7 toll-free national tele-mental health helpline operating in multiple regional languages.",
      type: "National Toll-Free"
    },
    {
      name: "KIRAN Helpline",
      number: "1800-599-0019",
      tollFree: "1800-599-0019",
      desc: "24x7 Central Government mental health rehabilitation helpline for panic, anxiety, and distress.",
      type: "Govt. National"
    },
    {
      name: "AASRA (Crisis & Suicide Prevention)",
      number: "+91-9820466726",
      tollFree: "",
      desc: "24/7 free, confidential crisis intervention and emotional support helpline across India.",
      type: "Crisis Intervention"
    },
    {
      name: "Vandrevala Foundation Helpline",
      number: "+91 9999 666 555",
      tollFree: "",
      desc: "24/7 free mental health counseling helpline staffed by trained psychological responders.",
      type: "24x7 Free Counseling"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0B3A42]/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-[#FDFBF7]">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-2xl ${activeTab === "crisis" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-800"}`}>
                  {activeTab === "crisis" ? <ShieldAlert className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B3A42] font-heading">
                    {activeTab === "crisis" ? "24/7 Emergency Crisis Helplines" : "Patient Confidentiality & Consent Policy"}
                  </h3>
                  <p className="text-xs text-charcoal-warm">
                    {activeTab === "crisis" ? "Immediate emergency assistance across India" : "Compliant with the Mental Healthcare Act, 2017"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 bg-gray-50/50 px-6 pt-3">
              <button
                onClick={() => setActiveTab("crisis")}
                className={`pb-3 px-4 font-semibold text-xs tracking-wider uppercase transition-colors relative ${
                  activeTab === "crisis" ? "text-rose-700" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                <span>Emergency Helplines (24x7)</span>
                {activeTab === "crisis" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("consent")}
                className={`pb-3 px-4 font-semibold text-xs tracking-wider uppercase transition-colors relative ${
                  activeTab === "consent" ? "text-[#0B3A42]" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                <span>Informed Consent &amp; Privacy (Act 2017)</span>
                {activeTab === "consent" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0B3A42] rounded-full" />
                )}
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#4A5568]">
              {activeTab === "crisis" ? (
                <>
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-rose-950 leading-relaxed font-medium">
                      <strong>Important Notice:</strong> Being You Path is an appointment-based outpatient counseling practice and is <strong>not equipped for acute psychiatric emergency or crisis response</strong>. If you or someone you care for is experiencing severe self-harm ideation, acute psychosis, or immediate danger, please reach out to the verified 24/7 helplines below or visit your nearest hospital emergency ward immediately.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {helplines.map((h, i) => (
                      <div key={i} className="p-4 rounded-2xl border border-gray-200 bg-white hover:border-rose-300 transition-colors shadow-2xs flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                              {h.type}
                            </span>
                          </div>
                          <h4 className="font-bold text-[#0B3A42] text-sm mb-1">{h.name}</h4>
                          <p className="text-xs text-gray-600 mb-3">{h.desc}</p>
                        </div>
                        <a
                          href={`tel:${h.number.replace(/[^0-9+]/g, '')}`}
                          className="inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#0B3A42] hover:bg-rose-700 text-white font-bold text-xs transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call {h.number}</span>
                        </a>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-gray-700 italic text-center">
                    All numbers listed are officially registered and operating nationwide across India without charge.
                  </p>
                </>
              ) : (
                <div className="space-y-4 leading-relaxed text-xs sm:text-sm">
                  <div className="bg-[#FAF9F6] border border-gray-200 p-4 rounded-2xl">
                    <h4 className="font-bold text-[#0B3A42] mb-1 flex items-center gap-2 text-sm">
                      <Lock className="w-4 h-4 text-emerald-700" />
                      Statutory Compliance: Mental Healthcare Act, 2017
                    </h4>
                    <p className="text-xs text-charcoal-warm/90">
                      Being You Path strictly enforces ethical and legal parameters set forth under the <strong>Mental Healthcare Act, 2017 (MHCA 2017)</strong> of India, including Section 23 (Right to Confidentiality) and Section 4 (Determination of Capacity to Make Mental Healthcare Decisions).
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-[#0B3A42]">1. Right to Confidentiality (Section 23)</h5>
                    <p className="text-xs leading-relaxed">
                      All communications, clinical session notes, psychometric evaluations, and personal data disclosed during in-person consultations at our Prabhat Road clinic or via encrypted online video are held under absolute therapeutic privilege. No client information is released to family members, employers, academic institutions, or third parties without prior written consent, except where mandated by law to prevent imminent, fatal harm to self or others.
                    </p>

                    <h5 className="font-bold text-[#0B3A42]">2. Voluntary Informed Consent</h5>
                    <p className="text-xs leading-relaxed">
                      Therapy is a collaborative, self-determined process. Clients possess the autonomous right to inquire about modalities (CBT, REBT, somatic grounding), understand treatment goals, decline specific interventions, and terminate therapy at any point without penalty.
                    </p>

                    <h5 className="font-bold text-[#0B3A42]">3. Non-Pharmacological Scope of Practice</h5>
                    <p className="text-xs leading-relaxed">
                      Psychologists at Being You Path hold postgraduate clinical and counseling degrees (e.g., M.A. Clinical Psychology from NIMHANS-trained faculty, LSE Certified, Jnana Prabodhini) and provide psychotherapy and psychological counseling. We do not prescribe allopathic or psychiatric medications. If pharmacological evaluation is warranted, we provide ethical referrals to licensed psychiatrists in Pune.
                    </p>

                    <h5 className="font-bold text-[#0B3A42]">4. Digital Data Security (Telehealth)</h5>
                    <p className="text-xs leading-relaxed">
                      Online video consultations are conducted over end-to-end encrypted HIPAA-compliant channels. Session video or audio is never recorded by practitioners.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-[#FDFBF7] flex justify-between items-center">
              <span className="text-[11px] text-gray-700">
                Being You Path™ • Ethical Clinical Practice
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-bold text-white bg-[#0B3A42] hover:bg-[#07252A] rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Understood &amp; Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
