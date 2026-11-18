import ServicePageTemplate from "../../components/ServicePageTemplate";

export default function GenZWorkplaceWorkshopPune() {
  return (
    <ServicePageTemplate
      config={{
        path: "/workshops/gen-z-in-the-workplace-pune",
        breadcrumbName: "Gen Z in the Workplace",
        seoTitle: "Gen Z in the Workplace Workshop in Pune | Being You Path",
        seoDescription:
          "Developmental psychology workshop for HR, managers, and teams in Pune and online across India to bridge generational expectations and strengthen retention.",
        serviceType: "Gen Z in the Workplace Corporate Workshop",
        badgeLabel: "Corporate & L&D · Pune & India",
        sectionLabels: {
          servicesCrumb: "Workshops",
          heroCtaText: "Book a workshop briefing call",
          closingHeading: "Schedule a workshop briefing call",
          closingBookingTitlePrefix: "Request a Workshop Proposal",
          closingBookingSubtitle:
            "Share your team size, preferred format (Pune in-person, online pan-India, or hybrid), and dates for our Gen Z in the Workplace module.",
        },
        h1: "Gen Z in the Workplace Workshop in Pune",
        heroSubtitle:
          "We partner with HR leaders, engineering managers, and cross-generational teams in Pune and across India—moving past stereotypes into developmental psychology, clear communication, and mutual accountability.",
        whoThisIsForIntro:
          "Across IT parks in Hinjewadi, Kharadi, Bengaluru, and hybrid offices nationwide, managers frequently tell us younger hires seem 'hard to read'—while Gen Z employees quietly report unclear expectations, burnout from always-on chat, and hesitation to speak up. This workshop bridges both sides honestly.",
        whoThisIsForPoints: [
          "People managers, team leads, and senior engineers mentoring early-career and campus hires",
          "HR, Talent Acquisition, and L&D leaders noticing early attrition or onboarding disconnect among younger cohorts",
          "Cross-generational project teams navigating differing norms around feedback, urgency, autonomy, and work-life boundaries",
          "Universities and placement cells preparing final-year graduates for healthy professional communication",
        ],
        whatWeWorkOnIntro:
          "Facilitated by Tejaswini Joshi (M.A. Counselling Psychology, LSE-certified L&D specialist) and Imran Hussain, this session grounds workplace friction in real behavioural and developmental context—not viral labels.",
        whatWeWorkOnGroups: [
          {
            heading: "For Managers & Team Leads",
            items: [
              "We unpack what shaped the digital-native cohort—and separate real learning needs from unhelpful stereotypes",
              "We practice delivering direct, psychologically safe feedback that clarifies expectations without triggering defensiveness",
              "We replace vague instructions with structured autonomy, clear context ('why this matters'), and steady check-ins",
              "We address early quiet quitting and disconnection before appraisal cycles turn tense",
            ],
          },
          {
            heading: "For Multi-Generational Teams",
            items: [
              "We facilitate honest cross-cohort dialogue on async tools, response expectations, and hybrid collaboration norms",
              "We coach early-career professionals on professional ownership, upward communication, and navigating ambiguity",
              "We co-create shared team working agreements respected by both senior leads and new hires",
              "We strengthen day-to-day psychological safety without lowering performance standards",
            ],
          },
        ],
        howSessionsWorkIntro:
          "Rather than one-way lecture slides, participants work through realistic case scenarios drawn from Indian corporate, startup, and tech workplaces.",
        howSessionsWorkSteps: [
          {
            title: "Pre-session context briefing with HR & leads",
            detail:
              "Before we enter the room, we speak briefly with your People Operations or leadership leads to understand team dynamics, hierarchy, and recurring tension points.",
          },
          {
            title: "Interactive psychology & role-play workshop",
            detail:
              "Through structured exercises and live feedback scripts, managers and team members test clearer ways to discuss deadlines, feedback, and workload.",
          },
          {
            title: "Actionable 14-day team playbook",
            detail:
              "Every cohort leaves with practical 1-on-1 check-in prompts and communication agreements ready to apply in Monday stand-ups immediately.",
          },
        ],
        firstSessionIntro:
          "Our briefing call makes planning straightforward for HR, founders, and department heads—whether for 15 leads or a 100-person organisation.",
        firstSessionPoints: [
          "We tailor depth smoothly between a focused 90-minute leadership briefing and a 3.5-hour interactive lab.",
          "We deliver in person across Pune (Hinjewadi, Baner, Kharadi, Magarpatta, Viman Nagar, Deccan) or live online nationwide.",
          "We keep examples pragmatic, culturally grounded, and respectful of performance goals.",
        ],
        formatDurationDetails: {
          sessionLength: "90 minutes (focused deep-dive), Half-Day (3–3.5 hours), or Full-Day cohort immersion.",
          mode: "In person at your Pune campus/office, hybrid, or live interactive Zoom / Teams pan-India.",
          frequency: "Standalone session or multi-week leadership & onboarding series.",
          feesNote:
            "Workshop investment scales by duration and cohort size; we share a tailored commercial proposal right after our free 15-minute briefing call.",
          locationNote:
            "Delivered across Pune corporate hubs and remotely for teams across Mumbai, Bengaluru, Delhi NCR, Hyderabad, and Chennai.",
        },
        faqs: [
          {
            question: "Should managers and Gen Z employees attend together or in separate sessions?",
            answer:
              "Both formats work well. Many organisations run a focused manager lab first so leads practice feedback tools openly, followed by a combined team alignment workshop.",
          },
          {
            question: "How many participants work best for interactive exercises?",
            answer:
              "Interactive labs run best with 15 to 35 participants; larger cohorts up to 100+ can be delivered in structured townhall-plus-breakout formats.",
          },
          {
            question: "Can this workshop be customised for IT teams, startups, or campus-to-corporate onboarding?",
            answer:
              "Yes. Every briefing includes custom examples aligned with your industry, hybrid setup, and onboarding pain points.",
          },
          {
            question: "Do we receive follow-up takeaways after the workshop?",
            answer:
              "Yes. We provide a concise summary sheet with 1-on-1 conversation frameworks, feedback checklists, and communication prompts.",
          },
        ],
        relatedLinks: [
          { label: "Corporate Wellness Workshops Overview", to: "/workshops" },
          { label: "Burnout Counselling in Pune", to: "/services/burnout-counselling-pune" },
          { label: "Career Counselling in Pune", to: "/services/career-counselling-pune" },
          { label: "Article: Imposter Syndrome in Corporate Tech", to: "/resources/imposter-syndrome-corporate-tech" },
          { label: "Article: Setting Boundaries When Ambitious", to: "/resources/setting-boundaries-when-ambitious" },
        ],
        bookingServiceName: "Gen Z in the Workplace Workshop",
      }}
    />
  );
}
