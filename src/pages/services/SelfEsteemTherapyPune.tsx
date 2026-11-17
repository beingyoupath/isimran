import ServicePageTemplate from "../../components/ServicePageTemplate";

export default function SelfEsteemTherapyPune() {
  return (
    <ServicePageTemplate
      config={{
        path: "/services/self-esteem-therapy-pune",
        breadcrumbName: "Self-Esteem Therapy in Pune",
        seoTitle: "Self-Esteem Therapy in Pune | Being You Path",
        seoDescription:
          "Build a steadier sense of self-worth with CBT-based therapy. Confidential sessions in Pune and online.",
        serviceType: "Self-Esteem and Identity Therapy",
        badgeLabel: "Deccan Gymkhana, Pune & Online",
        h1: "Self-Esteem Therapy in Pune",
        heroSubtitle:
          "We help you quiet the relentless inner critic, unlearn chronic people-pleasing, and build a steadier sense of self-worth through collaborative CBT and relational support.",
        whoThisIsForIntro:
          "Low self-esteem rarely looks obvious from the outside. In our sessions, we often meet thoughtful, capable adults and students who hold themselves to punishing standards internally—doubting every achievement, fearing disapproval, and putting everyone else's comfort ahead of their own needs.",
        whoThisIsForPoints: [
          "Individuals worn down by chronic people-pleasing, over-apologizing, and difficulty saying 'no' cleanly",
          "Competent professionals convinced their successes happened by luck rather than genuine skill",
          "Adults healing from childhood environments where approval felt conditional on flawless performance",
          "People holding back from relationships, leadership roles, or honest conversations out of rejection fear",
        ],
        whatWeWorkOnIntro:
          "Lasting confidence does not grow from forcing mirror affirmations you do not believe. Together, we trace where harsh self-judgment started and practice grounded self-trust inside everyday choices.",
        whatWeWorkOnGroups: [
          {
            heading: "Core Beliefs & The Inner Critic",
            items: [
              "We identify hidden perfectionism and all-or-nothing rules around worthiness",
              "We help separate a single mistake from global shame ('that went poorly' vs 'I am inadequate')",
              "We unpack constant social comparison and hyper-sensitivity to mild criticism",
              "We practice treating personal emotional needs with quiet respect rather than embarrassment",
            ],
          },
          {
            heading: "Boundaries & Honest Expression",
            items: [
              "We practice declining requests at home and work without drowning in prolonged guilt",
              "We navigate close-knit Indian family expectations with warmth and clear personal boundaries",
              "We support speaking honestly about preferences in friendships, dating, and marriage",
              "We strengthen trust in your own judgment on career and life decisions",
            ],
          },
        ],
        howSessionsWorkIntro:
          "Our approach combines structured Cognitive Behavioral Therapy (CBT), collaborative counselling dialogue, and realistic behavioral exercises built around your actual social and family relationships.",
        howSessionsWorkSteps: [
          {
            title: "Understand where the inner critic learned its voice",
            detail:
              "We explore gently how early expectations, comparison, or critical experiences taught you that acceptance only came from pleasing others or performing perfectly.",
          },
          {
            title: "Reshape core beliefs with balanced evidence",
            detail:
              "Using CBT thought evaluation, we test sweeping self-critical conclusions against real facts and develop a calmer, fairer internal voice.",
          },
          {
            title: "Test small boundaries in real relationships",
            detail:
              "Between sessions, we choose manageable everyday situations—stating a small preference or pausing before saying yes—so genuine self-respect builds through lived experience.",
          },
        ],
        firstSessionIntro:
          "Your first appointment with us is a space where you do not have to perform, justify your feelings, or worry about sounding 'needy'.",
        firstSessionPoints: [
          "We listen to how self-doubt, comparison, or people-pleasing shows up across work, friendships, and family.",
          "Together, we spot one or two recurring self-critical rules worth noticing gently during the coming week.",
          "We agree on an unhurried weekly or biweekly cadence at our Pune clinic or over online video.",
        ],
        formatDurationDetails: {
          sessionLength: "50–60 minutes per confidential 1-on-1 therapy appointment.",
          mode: "In person at our Deccan Gymkhana clinic, Pune or secure video across India.",
          frequency: "Weekly or biweekly tailored to your comfort, pace, and schedule.",
          feesNote:
            "We walk you through session fees transparently during your free 15-minute clarity call.",
          locationNote:
            "Easily reached from Prabhat Road, Deccan Gymkhana, Model Colony, FC Road, Kothrud, Baner, and Koregaon Park.",
        },
        faqs: [
          {
            question: "Can therapy help if low self-confidence has been with me since childhood?",
            answer:
              "Yes. Beliefs formed early feel automatic, not fixed for life. With structured CBT and steady therapeutic support, long-standing self-doubt and shame loosen reliably.",
          },
          {
            question: "How do we set family boundaries without sounding rude or disrespectful?",
            answer:
              "We pay close attention to cultural values and Indian family closeness—helping you practice respectful, warm phrasing that protects your peace without creating unnecessary distance.",
          },
          {
            question: "Are self-esteem sessions kept completely confidential?",
            answer:
              "Yes. Everything you share stays strictly private under ethical clinical confidentiality standards.",
          },
        ],
        relatedLinks: [
          { label: "CBT Therapy in Pune", to: "/services/cbt-therapy-pune" },
          { label: "Overthinking Therapy", to: "/services/overthinking-therapy" },
          { label: "Relationship & Couples Counselling", to: "/services/relationship-couples-counselling-pune" },
        ],
        bookingServiceName: "Self-Esteem Therapy",
      }}
    />
  );
}
