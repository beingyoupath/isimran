import ServicePageTemplate from "../../components/ServicePageTemplate";

export default function CbtTherapyPune() {
  return (
    <ServicePageTemplate
      config={{
        path: "/services/cbt-therapy-pune",
        breadcrumbName: "CBT Therapy in Pune & Online",
        seoTitle: "CBT Therapy in Pune & Online | Being You Path",
        seoDescription:
          "Structured CBT for overthinking, anxiety and low mood with certified practitioners in Pune. In person at Deccan Gymkhana or online.",
        serviceType: "Cognitive Behavioral Therapy (CBT)",
        badgeLabel: "Deccan Gymkhana, Pune & Online",
        alternates: [
          { hreflang: "en-IN", href: "/services/cbt-therapy-pune" },
          { hreflang: "hi-IN", href: "/hi/services/cbt-therapy-pune" },
          { hreflang: "x-default", href: "/services/cbt-therapy-pune" },
        ],
        languageSwitch: {
          label: "हिन्दी में पढ़ें",
          to: "/hi/services/cbt-therapy-pune",
        },
        h1: "CBT Therapy in Pune & Online",
        heroSubtitle:
          "Structured Cognitive Behavioral Therapy to untangle unhelpful thought loops, anxiety, low mood, and avoidance at a steady, practical pace.",
        whoThisIsForIntro:
          "At Being You Path, we work with adults, university students, and working professionals who want practical tools alongside a warm, non-judgmental space when logic alone does not quiet repetitive spirals.",
        whoThisIsForPoints: [
          "Adults caught in rumination, worst-case worrying, or over-analysis before daily decisions",
          "Working professionals managing high-functioning anxiety, perfectionism, or self-criticism",
          "Individuals navigating low mood, procrastination, or avoidance that shrinks confidence",
          "Clients looking for structured sessions with practical exercises between appointments",
        ],
        whatWeWorkOnIntro:
          "Rather than forcing positive thoughts, we help you see how thoughts, physical tension, emotions, and habits reinforce each other, and build calmer everyday alternatives.",
        whatWeWorkOnGroups: [
          {
            heading: "Thought Patterns & Reframing",
            items: [
              "We spot automatic negative thoughts and all-or-nothing filters early",
              "We test catastrophic 'what-if' worries gently against balanced evidence",
              "We build practical thought-distancing skills so worrying feels like background noise",
              "We replace relentless self-criticism with realistic self-talk",
            ],
          },
          {
            heading: "Habits & Nervous-System Calming",
            items: [
              "We plan gradual steps out of avoidance instead of overwhelming leaps",
              "We pair cognitive tools with breath pacing and nervous-system settling",
              "We rebuild steady sleep routines, work boundaries, and focus",
              "We co-create a simple relapse-prevention plan you can use independently",
            ],
          },
        ],
        howSessionsWorkIntro:
          "Our CBT work is led by Imran Hussain, a psychologist with clinical training at NIMHANS, and counselling psychologist Tejaswini Joshi, keeping every stage transparent and collaborative.",
        howSessionsWorkSteps: [
          {
            title: "Shared assessment and pattern mapping",
            detail:
              "We listen closely to your history and map the daily triggers and safety habits keeping anxiety or low mood active.",
          },
          {
            title: "Targeted cognitive and behavioral tools",
            detail:
              "In sessions we practice thought records, worry containers, and small behavioral experiments fitted to your workweek.",
          },
          {
            title: "Real-world practice and review",
            detail:
              "Between visits you test one manageable step in real work or family situations, and we refine what felt supportive at our next session so progress stays steady and sustainable.",
          },
        ],
        firstSessionIntro:
          "In your first 50–60 minute CBT session, our priority is clarity and comfort—never jargon or judgment.",
        firstSessionPoints: [
          "We understand what brought you in now and where mental loops feel heaviest.",
          "Together we outline realistic focus areas for your first 6 to 10 sessions.",
          "We practice one grounded tool you can test immediately during the week.",
          "We clarify confidentiality, pacing, and switching between Pune clinic visits and online video.",
        ],
        formatDurationDetails: {
          sessionLength: "50–60 minutes for 1-on-1 individual CBT sessions.",
          mode: "In person near Prabhat Road, Deccan Gymkhana, Pune or via confidential video across India.",
          frequency: "Typically weekly at first for momentum, then fortnightly as tools steady.",
          feesNote:
            "We share session fees transparently during your free 15-minute clarity call before booking.",
          locationNote:
            "Convenient from Erandwane, Shivaji Nagar, FC Road, Model Colony, Kothrud, Karve Nagar, Aundh, and Baner.",
        },
        faqs: [
          {
            question: "How many CBT sessions do we usually plan for?",
            answer:
              "Many clients work within an 8 to 14 session arc depending on how long patterns have lasted, then space out to monthly check-ins.",
          },
          {
            question: "Is our CBT approach only focused on changing thoughts?",
            answer:
              "No. Alongside thought reframing, we integrate behavioral experiments, healthy boundaries, and nervous-system regulation.",
          },
          {
            question: "Can we switch between Pune visits and online video?",
            answer:
              "Yes. Many clients visit Deccan Gymkhana when in town and use encrypted video during travel or heavy rain.",
          },
          {
            question: "Do our psychologists prescribe medication?",
            answer:
              "No. We provide counselling and psychotherapy, and discuss trustworthy psychiatric referrals with you whenever medication could help.",
          },
        ],
        relatedLinks: [
          { label: "Stress & Anxiety Counselling", to: "/services/stress-anxiety-counselling-pune" },
          { label: "Overthinking Therapy", to: "/services/overthinking-therapy" },
          { label: "Everyday Talk Therapy", to: "/services/talk-therapy-pune" },
          { label: "Behavioural Change & Habit Coaching", to: "/services/behavioural-change-habit-coaching-pune" },
          { label: "Guide: 3 Types of Overthinking & CBT", to: "/resources/the-3-types-of-overthinking-and-cbt-tools" },
          { label: "Article: High-Functioning Anxiety", to: "/resources/high-functioning-anxiety-in-professionals" },
          { label: "Myth: Overthinking Is My Personality", to: "/resources/myth-overthinking-is-my-personality" },
        ],
        bookingServiceName: "CBT Therapy",
      }}
    />
  );
}
