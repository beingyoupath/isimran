import ServicePageTemplate from "../../components/ServicePageTemplate";

export default function TalkTherapyPune() {
  return (
    <ServicePageTemplate
      config={{
        path: "/services/talk-therapy-pune",
        breadcrumbName: "Everyday Talk Therapy",
        seoTitle: "Everyday Talk Therapy & Counselling in Pune | Being You Path",
        seoDescription:
          "Unhurried everyday talk therapy in Pune and online across India for clarity, emotional release, life transitions, and feeling genuinely heard.",
        serviceType: "Everyday Talk Therapy and Psychological Counselling",
        badgeLabel: "Deccan Gymkhana, Pune & Online",
        h1: "Everyday Talk Therapy & Counselling in Pune",
        heroSubtitle:
          "We provide a calm, confidential conversational space when life feels heavy, confusing, or lonely—and you want to think out loud with a qualified psychologist without waiting for a crisis.",
        whoThisIsForIntro:
          "Not every concern arrives with a neat clinical label or urgent diagnosis. In our everyday talk therapy sessions, we sit with working professionals, homemakers, university students, and creatives who simply need an honest, neutral room to untangle everyday pressure, loneliness, life changes, and unspoken emotions.",
        whoThisIsForPoints: [
          "Adults feeling quietly weighed down by relocation, friendship shifts, or carrying everyone else's practical responsibilities",
          "Individuals looking for an unhurried, non-judgmental space to speak candidly without worrying family or friends",
          "Professionals who function well on the surface yet feel disconnected, flat, or unsure what the next chapter holds",
          "Clients wanting grounded human dialogue before deciding whether structured CBT or deeper habit work is helpful",
        ],
        whatWeWorkOnIntro:
          "We adapt to the rhythm of your week rather than forcing every session into a rigid worksheet. Together, we slow down, hear what has been sitting beneath the noise, and connect everyday insight to calmer choices.",
        whatWeWorkOnGroups: [
          {
            heading: "Emotional Processing & Clarity",
            items: [
              "We unpack daily frustrations, loneliness, quiet resentment, and emotional fatigue in plain conversation",
              "We help sort tangled decisions around personal life, friendships, living independently, and family roles",
              "We notice recurring emotional triggers without self-criticism or rushed labels",
              "We reflect back honest observations so blind spots become easier to see gently",
            ],
          },
          {
            heading: "Practical Grounding Between Sessions",
            items: [
              "We draw on counselling psychology and conversational CBT only where useful and welcomed",
              "We strengthen everyday self-trust so choices feel steadier after sessions end",
              "We explore healthier pacing for work, rest, and social boundaries in real Indian family contexts",
              "We connect seamlessly to focused support if anxiety, low mood, or burnout patterns emerge",
            ],
          },
        ],
        howSessionsWorkIntro:
          "Our everyday talk therapy appointments with Imran Hussain and Tejaswini Joshi feel warm, steady, and grounded in ethical psychological practice rather than casual chatting or textbook lectures.",
        howSessionsWorkSteps: [
          {
            title: "Speak freely without editing yourself",
            detail:
              "You choose where to start—whether that is a tough phone call earlier in the day, a recurring argument, or a general feeling that something in your routine is off.",
          },
          {
            title: "Reflect together and spot quiet patterns",
            detail:
              "We ask thoughtful, unhurried questions that help separate external noise from what you actually need, want, and value right now.",
          },
          {
            title: "Carry calmer perspective into your week",
            detail:
              "You leave each conversation feeling lighter, clearer, and supported by simple, realistic intentions rather than an overwhelming to-do list.",
          },
        ],
        firstSessionIntro:
          "There is zero requirement to arrive with a polished summary or dramatic backstory in your first appointment.",
        firstSessionPoints: [
          "We start with a relaxed check-in on how the past few weeks have felt day to day.",
          "We clarify confidentiality limits and answer any questions you have about how therapy works.",
          "We help you decide comfortably between weekly check-ins, fortnightly conversations, or occasional maintenance sessions.",
        ],
        formatDurationDetails: {
          sessionLength: "50–60 minutes for private 1-on-1 talk therapy appointments.",
          mode: "In person at our quiet clinic near Prabhat Road, Pune or confidential video pan-India.",
          frequency: "Flexible—weekly, fortnightly, or monthly maintenance depending on your rhythm.",
          feesNote:
            "We explain session fees clearly during your free 15-minute clarity call before any booking.",
          locationNote:
            "Easy access from Deccan Gymkhana, Prabhat Road, Erandwane, Kothrud, Shivaji Nagar, Aundh, Baner, and online across India.",
        },
        faqs: [
          {
            question: "Do I need a formal mental health concern to book everyday talk therapy?",
            answer:
              "No. Many of our clients start talk therapy to think through ordinary life transitions, relationship questions, work dissatisfaction, or emotional loneliness well before things escalate.",
          },
          {
            question: "How is talk therapy with a psychologist different from talking to a close friend?",
            answer:
              "Friends love us, yet conversations naturally involve their opinions, expectations, or worry. With a psychologist, the space belongs 100% to you—completely confidential, impartial, and trained in listening cleanly without bias.",
          },
          {
            question: "Can sessions shift toward structured CBT later if I decide I want tools?",
            answer:
              "Yes. Whenever specific anxiety, overthinking, or habit patterns stand out, we smoothly blend practical CBT or mindfulness exercises at a pace you choose.",
          },
          {
            question: "What languages can we speak during sessions?",
            answer:
              "We conduct everyday talk therapy comfortably in English, Hindi, and Marathi.",
          },
        ],
        relatedLinks: [
          { label: "CBT Therapy in Pune & Online", to: "/services/cbt-therapy-pune" },
          { label: "Self-Esteem Therapy", to: "/services/self-esteem-therapy-pune" },
          { label: "Mindfulness & Meditation", to: "/services/mindfulness-meditation-pune" },
          { label: "Prabhat Road Clinic, Pune", to: "/services/counselling-prabhat-road-pune" },
        ],
        bookingServiceName: "Everyday Talk Therapy",
      }}
    />
  );
}
