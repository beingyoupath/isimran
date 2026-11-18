import ServicePageTemplate from "../../components/ServicePageTemplate";

export default function OnlineTherapyIndia() {
  return (
    <ServicePageTemplate
      config={{
        path: "/services/online-therapy-india",
        breadcrumbName: "Online Therapy in India",
        seoTitle: "Online Therapy in India | Being You Path",
        seoDescription:
          "Confidential video counselling with qualified psychologists, available across India. Evening and weekend slots.",
        serviceType: "Online Psychological Counselling",
        badgeLabel: "Pan-India Encrypted Video",
        h1: "Online Therapy in India",
        heroSubtitle:
          "We deliver confidential 1-on-1 video counselling with our qualified psychologists across India—giving you consistent care from home with flexible evening and weekend appointments.",
        whoThisIsForIntro:
          "City traffic, demanding work hours, or living away from Pune should never keep you from steady psychological support. In our online practice, we work with individuals and couples across India and abroad who value practical, culturally grounded therapy from a private room.",
        whoThisIsForPoints: [
          "Adults across Mumbai, Bengaluru, Delhi NCR, Hyderabad, Chennai, Kolkata, Pune, and smaller Indian cities",
          "Working professionals needing evening or Sunday video appointments without spending hours commuting",
          "University students living in hostels or shared flats seeking private emotional support",
          "Indians living overseas (NRIs) wanting psychologists who understand Indian family expectations firsthand",
        ],
        whatWeWorkOnIntro:
          "Our online sessions follow the exact same clinical rigor, warmth, and structured continuity as our in-person clinic appointments near Prabhat Road, Pune.",
        whatWeWorkOnGroups: [
          {
            heading: "Individual Mental Health & CBT",
            items: [
              "We address chronic stress, excessive worrying, and sudden panic surges calmly",
              "We work through nighttime rumination, overthinking, and analysis paralysis",
              "We support recovery from persistent low mood, grief, and loneliness",
              "We help build healthier self-esteem and guilt-free personal boundaries",
            ],
          },
          {
            heading: "Work, Career & Relationships",
            items: [
              "We treat workplace burnout and boundary strain among tech and corporate teams",
              "We facilitate values-based career transitions and early-career clarity",
              "We work with couples and individuals on communication and extended-family dynamics",
              "We support emotional adjustment around relocation, marriage, or major life shifts",
            ],
          },
        ],
        howSessionsWorkIntro:
          "Starting online counselling with us takes only a quiet corner, a reliable phone or laptop connection, and earphones for privacy.",
        howSessionsWorkSteps: [
          {
            title: "Start with a free 15-minute clarity call",
            detail:
              "Schedule a brief introductory call on Calendly or WhatsApp so we can understand your concerns, answer practical questions, and match you with Imran Hussain or Tejaswini Joshi.",
          },
          {
            title: "Join via a private, encrypted video link",
            detail:
              "Before your session, we send a simple, secure video invitation directly to your calendar—no complicated software setup needed.",
          },
          {
            title: "Maintain steady therapeutic continuity",
            detail:
              "We meet 1-on-1 for 50–60 minutes (or 75 minutes for couples) and share practical between-session reflections you can apply right away.",
          },
        ],
        firstSessionIntro:
          "To make your first online session feel calm and unhurried, we recommend choosing a quiet spot where nobody can overhear your conversation.",
        firstSessionPoints: [
          "We skip commutes and waiting rooms—you connect comfortably straight from home or a private room.",
          "We let you share comfortably at your own natural pace.",
          "We make it easy to alternate between online video and Deccan Gymkhana clinic visits whenever you are in Pune.",
        ],
        formatDurationDetails: {
          sessionLength: "50–60 minutes (individual) or 75 minutes (couples video sessions).",
          mode: "Encrypted 1-on-1 video consultations (primarily in English; please ask about additional languages during your clarity call).",
          frequency: "Weekly or fortnightly cadence with evening and Sunday slots available.",
          feesNote:
            "We share session fees and convenient payment methods (UPI, cards, bank transfer) clearly during your clarity call.",
          locationNote:
            "Available pan-India across all states as well as NRI time zones aligned with IST 10:00 AM – 9:00 PM.",
        },
        faqs: [
          {
            question: "Are online video sessions as effective as visiting a clinic in person?",
            answer:
              "Yes. For stress, anxiety, burnout, overthinking, self-esteem, depression, and career counselling, structured online CBT and talk therapy produce comparable results—often with better continuity because travel friction disappears.",
          },
          {
            question: "Do we record online therapy sessions?",
            answer:
              "Never. We do not record sessions, and our exact clinical confidentiality standards protect both video and clinic conversations.",
          },
          {
            question: "Which languages do our psychologists offer sessions in?",
            answer:
              "Sessions are conducted primarily in English. Please ask during your free 15-minute clarity call if you would like to check availability for additional languages.",
          },
          {
            question: "What happens if Wi-Fi or mobile internet drops mid-session?",
            answer:
              "If a connection freezes, we immediately reconnect over video or switch cleanly to a private phone call so we finish your session without interruption.",
          },
        ],
        relatedLinks: [
          { label: "CBT Therapy in Pune & Online", to: "/services/cbt-therapy-pune" },
          { label: "Burnout Counselling", to: "/services/burnout-counselling-pune" },
          { label: "Stress & Anxiety Counselling", to: "/services/stress-anxiety-counselling-pune" },
          { label: "Meet Our Psychologists", to: "/about" },
          { label: "Myth: Seeking Counselling Makes You Weak", to: "/resources/myth-seeking-counselling-makes-you-weak" },
          { label: "Guide: Nervous-System Down-Regulation", to: "/resources/nervous-system-down-regulation-guide" },
          { label: "Article: Decision Fatigue & Mental Clarity", to: "/resources/decision-fatigue-protecting-mental-clarity" },
        ],
        bookingServiceName: "Online Therapy",
      }}
    />
  );
}
