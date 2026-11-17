import ServicePageTemplate from "../../components/ServicePageTemplate";

export default function CorporateWorkshopsPune() {
  return (
    <ServicePageTemplate
      config={{
        path: "/services/corporate-workshops-pune",
        breadcrumbName: "Corporate Wellness Workshops",
        seoTitle: "Corporate Wellness Workshops Pune | Being You Path",
        seoDescription:
          "Structured stress, burnout, psychological safety and Gen Z workplace workshops for organizations in Pune and across India.",
        serviceType: "Corporate Mental Health and Wellness Workshops",
        badgeLabel: "Pune Organizations & Pan-India Virtual",
        h1: "Corporate Wellness Workshops in Pune",
        heroSubtitle:
          "We design and facilitate interactive, psychology-grounded workshops for teams, people managers, and campuses—focused on burnout prevention, psychological safety, and everyday focus.",
        whoThisIsForIntro:
          "In our organizational work, we partner with HR leaders, Learning & Development teams, startups, IT organizations, and schools looking for practical behavioral skill-building rather than surface-level motivational speeches.",
        whoThisIsForPoints: [
          "Engineering, product, and corporate teams navigating relentless sprint cycles and hybrid fatigue",
          "First-time and senior people managers bridging communication expectations across multi-generational teams",
          "HR and L&D departments planning structured quarterly wellbeing initiatives with tangible takeaways",
          "Schools, colleges, and parent communities building student resilience and calmer family dialogue",
        ],
        whatWeWorkOnIntro:
          "Our programmes are co-led by Organizational Learning & Development specialist Tejaswini Joshi and psychologist and CBT practitioner Imran Hussain—blending applied workplace insight with grounded psychological tools.",
        whatWeWorkOnGroups: [
          {
            heading: "Team & Leadership Modules",
            items: [
              "We cover early burnout warning signs, recovery habits, and nervous-system resets",
              "We build psychological safety skills for honest feedback without defensiveness",
              "We unpack generational dynamics—including working effectively with Gen Z cohorts",
              "We equip teams with attention protection habits for meeting-heavy hybrid calendars",
            ],
          },
          {
            heading: "Institutional & Community Modules",
            items: [
              "We teach applied habit science for lasting behavioral change at work and home",
              "We run practical Parenting in the Digital Age workshops for school parent collectives",
              "We facilitate student resilience and exam readiness sessions (ages 15–22)",
              "We provide clear post-workshop summary guides teams can revisit anytime",
            ],
          },
        ],
        howSessionsWorkIntro:
          "Rather than delivering generic off-the-shelf slide decks, we shape every session around your team size, industry pressures, and leadership priorities.",
        howSessionsWorkSteps: [
          {
            title: "Discovery and context brief",
            detail:
              "We begin with a focused conversation alongside your HR or leadership team to understand current pressures, participant seniority, and measurable session goals.",
          },
          {
            title: "Interactive, facilitated curriculum",
            detail:
              "We deliver structured 90-minute, half-day, or full-day sessions featuring live exercises, realistic workplace scenarios, and anonymous Q&A.",
          },
          {
            title: "Actionable daily takeaways",
            detail:
              "Participants leave with realistic cognitive and breathing resets plus simple meeting and boundary agreements they can start testing immediately.",
          },
        ],
        firstSessionIntro:
          "Whether you are organizing an in-person offsite in Pune or a distributed series across India, planning starts with one straightforward briefing call.",
        firstSessionPoints: [
          "We review audience size, preferred module themes, and delivery dates smoothly.",
          "We send back a clear module outline and transparent fee proposal within 24–48 hours.",
          "We can optionally pair workshops with confidential 1-on-1 clarity-call access for team members.",
        ],
        formatDurationDetails: {
          sessionLength: "90-minute intensives, half-day applied labs (3.5 hrs), or full-day immersions (6 hrs).",
          mode: "Onsite across Pune / India or live interactive video workshops (Zoom / MS Teams).",
          frequency: "Single standalone workshops, multi-week series, or ongoing quarterly retainers.",
          feesNote:
            "We prepare clear institutional proposals promptly after scoping group size, format, and travel.",
          locationNote:
            "Conducted onsite for organizations across Hinjewadi, Baner, Magarpatta, Viman Nagar, Shivaji Nagar, Mumbai, Bengaluru, and pan-India.",
        },
        faqs: [
          {
            question: "Are our corporate workshops lecture-style or interactive?",
            answer:
              "We facilitate interactive sessions built around live reflections, group scenarios, quick practical resets, and open Q&A—never passive one-way slide reading.",
          },
          {
            question: "Can we tailor workshops for technical engineering or client-facing teams?",
            answer:
              "Yes. Before every engagement, we adapt examples, phrasing, and exercises to mirror your team's real workflow pressures.",
          },
          {
            question: "Do we conduct live virtual workshops for remote India teams?",
            answer:
              "Yes. We run interactive online sessions regularly across Indian time zones for distributed organizations.",
          },
        ],
        relatedLinks: [
          { label: "Full Workshops Syllabus & Enquiry", to: "/workshops" },
          { label: "Burnout Counselling in Pune", to: "/services/burnout-counselling-pune" },
          { label: "Contact Our Facilitation Team", to: "/contact" },
        ],
        bookingServiceName: "Corporate Wellness Workshops",
      }}
    />
  );
}
