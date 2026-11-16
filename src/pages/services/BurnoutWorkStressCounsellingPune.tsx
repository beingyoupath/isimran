import ServicePageTemplate from "../../components/ServicePageTemplate";

export default function BurnoutWorkStressCounsellingPune() {
  return (
    <ServicePageTemplate
      config={{
        path: "/services/burnout-counselling-pune",
        breadcrumbName: "Burnout Counselling in Pune",
        seoTitle: "Burnout Counselling in Pune | Being You Path",
        seoDescription:
          "Recover from work burnout with CBT and nervous-system regulation tools. Sessions in Pune and online.",
        serviceType: "Workplace Burnout and Stress Counselling",
        badgeLabel: "Deccan Gymkhana, Pune & Online",
        alternates: [
          { hreflang: "en-IN", href: "/services/burnout-counselling-pune" },
          { hreflang: "hi-IN", href: "/hi/services/burnout-counselling-pune" },
          { hreflang: "x-default", href: "/services/burnout-counselling-pune" },
        ],
        languageSwitch: {
          label: "हिन्दी में पढ़ें",
          to: "/hi/services/burnout-counselling-pune",
        },
        h1: "Burnout Counselling in Pune",
        heroSubtitle:
          "We help working professionals, founders, and leaders recover from chronic exhaustion, emotional detachment, and boundary erosion using practical CBT and nervous-system care.",
        whoThisIsForIntro:
          "Burnout feels very different from an intense week at the office. When a quiet weekend or vacation stops restoring your energy and Monday morning feels impossible before you even open your laptop, we offer a steady space to unpack what drained your reserves and how to recover safely.",
        whoThisIsForPoints: [
          "IT engineers, managers, doctors, and startup founders in Pune and across India running on chronic depletion",
          "Conscientious professionals noticing growing cynicism, irritability, brain fog, or emotional numbness at work",
          "High achievers unable to switch off after office hours or carrying guilt whenever they pause to rest",
          "Clients weighing a sabbatical, role redesign, or career change from a place of clarity rather than panic",
        ],
        whatWeWorkOnIntro:
          "Together, we look beyond surface time-management tips. We work on both calming your overtaxed nervous system and untangling the unspoken beliefs about responsibility and worth that keep you overextending.",
        whatWeWorkOnGroups: [
          {
            heading: "Boundaries & Workplace Beliefs",
            items: [
              "We unpack people-pleasing, over-functioning, and guilt around saying 'no' cleanly",
              "We challenge imposter feelings that push you to overwork for reassurance",
              "We practice calm, realistic conversations with managers about bandwidth and priorities",
              "We separate your core self-worth from daily output and appraisal metrics",
            ],
          },
          {
            heading: "Energy & Nervous-System Recovery",
            items: [
              "We build end-of-day transition rituals so work tension does not spill into evenings",
              "We address shallow sleep and late-night mental replay after high-stress sprints",
              "We distinguish genuine cognitive rest from passive screen numbing",
              "We pace your return to focus steadily so burnout does not bounce back months later",
            ],
          },
        ],
        howSessionsWorkIntro:
          "Our burnout counselling brings together Tejaswini Joshi's organizational Learning & Development perspective with Imran Hussain's clinical CBT and mindfulness frameworks—giving you both emotional insight and workplace realism.",
        howSessionsWorkSteps: [
          {
            title: "Decompression and energy drain audit",
            detail:
              "First, we slow down and map where your cognitive and emotional energy actually goes each week—including invisible emotional labor, unclear expectations, and constant availability.",
          },
          {
            title: "Boundary scripts and micro-regulation",
            detail:
              "We draft practical, culturally realistic phrases for pushing back respectfully at work alongside 3-to-5 minute nervous-system resets you can fit between calls.",
          },
          {
            title: "Sustainable career and life direction",
            detail:
              "Once heavy exhaustion begins lifting, we explore whether healthier boundaries fit your current team or whether planning a thoughtful career move serves your long-term health.",
          },
        ],
        firstSessionIntro:
          "In your first session, we take pressure off rather than adding another self-improvement checklist onto your already crowded calendar.",
        firstSessionPoints: [
          "We help distinguish acute workplace overload from systemic burnout or overlapping low mood.",
          "We agree on one immediate boundary or evening decompression habit to test during the week.",
          "We match appointment timings comfortably around late calls, commutes, or weekends.",
        ],
        formatDurationDetails: {
          sessionLength: "50–60 minutes for 1-on-1 burnout recovery sessions.",
          mode: "In person at our Deccan Gymkhana clinic, Pune or private video sessions pan-India.",
          frequency: "Typically weekly during initial recovery, spacing to biweekly check-ins as clarity builds.",
          feesNote:
            "We share clear fee details during your free 15-minute clarity call before scheduling.",
          locationNote:
            "Convenient for clients commuting from Hinjewadi, Baner, Aundh, Kothrud, Viman Nagar, Kalyani Nagar, and Koregaon Park, plus remote professionals nationwide.",
        },
        faqs: [
          {
            question: "How do we tell burnout apart from ordinary work stress?",
            answer:
              "Ordinary work stress eases after proper rest or a weekend off. Burnout lingers even after holidays and brings emotional numbness, rising cynicism, sleep disruption, and persistent mental fog.",
          },
          {
            question: "Will counselling push me to resign from my job?",
            answer:
              "No. Our role is to help your mind and body recover enough clarity so you choose freely—whether by resetting boundaries in your current role or planning a thoughtful transition.",
          },
          {
            question: "Can we book sessions after typical 9-to-6 office hours?",
            answer:
              "Yes. We run appointments up to 9:00 PM Monday through Sunday so sessions never have to clash with daytime meetings.",
          },
        ],
        relatedLinks: [
          { label: "Stress & Anxiety Counselling", to: "/services/stress-anxiety-counselling-pune" },
          { label: "Career Counselling in Pune", to: "/services/career-counselling-pune" },
          { label: "Corporate Wellness Workshops", to: "/workshops" },
          { label: "Self-Esteem Therapy", to: "/services/self-esteem-therapy-pune" },
        ],
        bookingServiceName: "Burnout Counselling",
      }}
    />
  );
}
