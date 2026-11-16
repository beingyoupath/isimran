import { Link } from "react-router-dom";
import { MapPin, Video, Train, Calendar, ArrowRight, Phone } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import {
  CALENDLY_URL,
  CLINIC_ADDRESS,
  CLINIC_HOURS_LABEL,
  LOCAL_BUSINESS_SCHEMA,
  PHONE_PRIMARY,
  PHONE_PRIMARY_HREF,
  TELE_MANAS_NOTICE,
} from "../lib/seoConfig";

export default function AreasWeServe() {
  const breadcrumbs = [{ name: "Areas We Serve", url: "/areas-we-serve" }];

  const centralWestPune = [
    {
      name: "Prabhat Road & Deccan Gymkhana",
      detail: "Clinic location on Dr. Sripati Shastri Path, within walking distance of Prabhat Road lanes, Bhandarkar Road, and Deccan Gymkhana.",
    },
    {
      name: "Erandwane & Karve Road",
      detail: "5–10 minutes from Deccan Gymkhana, convenient for students, families, and working professionals.",
    },
    {
      name: "Law College Road, BMCC & FC Road",
      detail: "Close to major Pune colleges and residential neighborhoods for afternoon and evening appointments.",
    },
    {
      name: "Shivaji Nagar & Model Colony",
      detail: "Quick access via metro and central roads for in-person CBT, career, and stress counselling.",
    },
    {
      name: "Kothrud & Karve Nagar",
      detail: "Direct connectivity along Karve Road and Pune Metro Aqua Line to Deccan Gymkhana station.",
    },
  ];

  const techAndEastPune = [
    {
      name: "Koregaon Park & Kalyani Nagar",
      detail: "Clients regularly commute from Koregaon Park and Kalyani Nagar for in-person sessions in Deccan Gymkhana, or choose evening online appointments.",
    },
    {
      name: "Viman Nagar, Kharadi & Magarpatta",
      detail: "Flexible evening and weekend clinic or video slots designed around IT and corporate shift schedules.",
    },
    {
      name: "Aundh, Baner & Balewadi",
      detail: "Direct access along Senapati Bapat Road and University Road, plus seamless video counselling.",
    },
    {
      name: "Hinjewadi & Wakad (PCMC)",
      detail: "Popular hybrid format—online sessions on weekday evenings with weekend in-person clinic visits when preferred.",
    },
  ];

  const panIndiaCities = [
    "Mumbai & Navi Mumbai",
    "Bengaluru",
    "Delhi NCR & Gurugram",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Ahmedabad",
    "Nagpur & Nashik",
    "Overseas Indian Communities (NRIs)",
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#2C3E50]">
      <SEO
        title="Areas We Serve in Pune & Online India | Being You Path"
        description="In-person counselling near Prabhat Road, Deccan Gymkhana, Pune serving clients across Pune neighbourhoods, plus confidential online therapy across India."
        url="/areas-we-serve"
        breadcrumbs={breadcrumbs}
        schema={LOCAL_BUSINESS_SCHEMA}
      />

      <Breadcrumbs items={breadcrumbs} />

      <section className="section-dark bg-[#0B3A42] text-[#FAF9F6] py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#F8C988] uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Deccan Gymkhana, Pune &amp; Nationwide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#FAF9F6] leading-tight mb-4">
            Areas We Serve in Pune &amp; Across India
          </h1>
          <p className="text-base sm:text-lg text-[#FAF9F6] max-w-2xl leading-relaxed">
            Our clinic is located at{" "}
            <strong className="text-white">{CLINIC_ADDRESS}</strong>. We welcome
            in-person visitors from across Pune and provide confidential online
            video counselling nationwide.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Central & West Pune */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42] mb-2">
              Central &amp; West Pune (Minutes from Our Clinic)
            </h2>
            <p className="text-sm text-stone-600 mb-6">
              Near Prabhat Road and Deccan Gymkhana Metro connectivity, with calm
              appointment-only scheduling.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {centralWestPune.map((area) => (
                <div
                  key={area.name}
                  className="bg-white p-5 rounded-2xl border border-stone-200"
                >
                  <h3 className="font-heading font-bold text-[#0B3A42] text-base mb-1.5">
                    {area.name}
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {area.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* East Pune, Tech Corridors & Koregaon Park Catchment */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3A42] mb-2">
              Extended Pune Neighbourhoods &amp; IT Corridors
            </h2>
            <p className="text-sm text-stone-600 mb-6">
              Clients frequently travel to our Deccan Gymkhana clinic or pair
              weekend clinic sessions with weekday online video appointments.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {techAndEastPune.map((area) => (
                <div
                  key={area.name}
                  className="bg-white p-5 rounded-2xl border border-stone-200"
                >
                  <h3 className="font-heading font-bold text-[#0B3A42] text-base mb-1.5">
                    {area.name}
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {area.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Online Across India */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A43F23] mb-2">
              <Video className="w-4 h-4" aria-hidden="true" />
              <span>Online Video Counselling</span>
            </div>
            <h2 className="text-2xl font-bold font-heading text-[#0B3A42] mb-3">
              Cities &amp; Regions Served Online
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed mb-5">
              Our confidential 1-on-1 video consultations serve clients across
              India and overseas, Monday through Sunday ({CLINIC_HOURS_LABEL}):
            </p>
            <div className="flex flex-wrap gap-2">
              {panIndiaCities.map((city) => (
                <span
                  key={city}
                  className="px-3.5 py-1.5 rounded-full bg-stone-50 border border-stone-200 text-xs font-semibold text-[#0B3A42]"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Directions & CTA */}
          <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B3A42]">
                <Train className="w-4 h-4 text-[#A43F23]" aria-hidden="true" />
                <span>Clinic Details</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#0B3A42]">
                Schedule In Person in Pune or Online
              </h2>
              <p className="text-sm text-stone-700">
                Address: {CLINIC_ADDRESS} · Phone:{" "}
                <a href={PHONE_PRIMARY_HREF} className="underline text-[#0B3A42]">
                  {PHONE_PRIMARY}
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#0B3A42] hover:bg-[#07252A] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Book Clarity Call</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-white border border-stone-300 hover:border-[#0B3A42] text-[#0B3A42] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Contact &amp; Map</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 sm:p-5 text-xs text-stone-700 leading-relaxed">
            <strong className="text-[#0B3A42]">Emergency Note:</strong>{" "}
            {TELE_MANAS_NOTICE}
          </div>
        </div>
      </section>
    </div>
  );
}
