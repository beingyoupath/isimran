import ServicePageTemplate from "../../components/ServicePageTemplate";

export default function TraumaCounsellingPune() {
  return (
    <ServicePageTemplate
      config={{
        path: "/services/trauma-counselling-pune",
        breadcrumbName: "Trauma-Informed Counselling",
        seoTitle: "Trauma Counselling in Pune | Being You Path",
        seoDescription:
          "Trauma-informed, gently paced counselling in Pune and online focusing on nervous-system safety, grounding and emotional healing.",
        serviceType: "Trauma-Informed Counselling",
        badgeLabel: "Deccan Gymkhana, Pune & Online",
        h1: "Trauma-Informed Counselling in Pune",
        heroSubtitle:
          "We provide gently paced, trauma-informed psychological support anchored in physical and emotional safety—helping your nervous system settle without forcing premature retelling.",
        whoThisIsForIntro:
          "Overwhelming experiences—whether sudden painful events or years of growing up around unpredictable criticism or emotional neglect—often stay active long after life changes, showing up as hypervigilance, emotional numbness, startling easily, or distrusting close relationships.",
        whoThisIsForPoints: [
          "Adults carrying lingering distress from harsh, unpredictable, or emotionally neglectful family environments",
          "Individuals dealing with constant vigilance, tension, or sudden waves of overwhelming panic or shame",
          "People who struggle to relax or trust even in genuinely safe adult friendships and partnerships",
          "Clients who previously felt flooded by rushed approaches and want careful somatic pacing",
        ],
        whatWeWorkOnIntro:
          "In our practice, trauma-informed counselling always starts with stabilization, choice, and grounding before touching painful memories.",
        whatWeWorkOnGroups: [
          {
            heading: "Safety & Nervous-System Stabilization",
            items: [
              "We build sensory grounding and breath anchoring tools you can trust when triggered",
              "We widen your emotional window of tolerance carefully without overwhelm",
              "We explain fight, flight, freeze, and fawn protective patterns clearly without shame",
              "We reduce restless nighttime hyper-alertness and sudden body tension",
            ],
          },
          {
            heading: "Consent-Led Processing & Integration",
            items: [
              "We help release misplaced self-blame tied to painful earlier experiences",
              "We gently reframe rigid survival beliefs about trust, danger, and personal worth",
              "We strengthen present agency and protective personal boundaries",
              "We integrate healing steadily so work, study, and sleep stay grounded between sessions",
            ],
          },
        ],
        howSessionsWorkIntro:
          "You always hold complete say over what topics we visit, how fast we move, and when to pause and return to grounding.",
        howSessionsWorkSteps: [
          {
            title: "Build steady grounding before exploring history",
            detail:
              "Before examining difficult memories, we establish reliable somatic and cognitive anchors so you know how to come back to calm inside and outside sessions.",
          },
          {
            title: "Work in small, manageable steps",
            detail:
              "We process recurring triggers carefully at a respectful pace while watching your emotional bandwidth in real time.",
          },
          {
            title: "Carry inner safety into present living",
            detail:
              "Slowly, your nervous system learns that past threat has ended—allowing steadier relationships, boundaries, and everyday calm.",
          },
        ],
        firstSessionIntro:
          "During your first session with us, we never ask you to recount distressing memories or summarize painful history in detail.",
        firstSessionPoints: [
          "We focus calmly on what feels uncomfortable in daily life right now and what helps you feel grounded.",
          "Together, we agree on clear pause cues so you stay comfortably in control throughout sessions.",
          "You can meet privately at our quiet Deccan Gymkhana room or via encrypted home video.",
        ],
        formatDurationDetails: {
          sessionLength: "50–60 minutes for gently paced 1-on-1 consultations.",
          mode: "In person near Prabhat Road, Deccan Gymkhana, Pune or confidential video pan-India.",
          frequency: "Commonly weekly so continuity and emotional containment remain steady.",
          feesNote:
            "We share clear fee details and session options during your free 15-minute clarity call.",
          locationNote:
            "Quiet, private consulting room near Prabhat Road, Pune strictly by prior appointment.",
        },
        faqs: [
          {
            question: "Will we be expected to talk through traumatic events in the first session?",
            answer:
              "No. Our trauma-informed care starts with present comfort, grounding skills, and consent-led pacing rather than rushed exposure.",
          },
          {
            question: "How is trauma-informed therapy different from standard talk therapy?",
            answer:
              "Alongside understanding thoughts and life stories, we pay dedicated attention to nervous-system reactions, triggers, and pacing so you leave sessions settled rather than emotionally flooded.",
          },
          {
            question: "Can online counselling work safely for trauma recovery?",
            answer:
              "Yes, as long as you have a private, quiet space where you feel physically settled during our video sessions.",
          },
        ],
        relatedLinks: [
          { label: "Stress & Anxiety Counselling", to: "/services/stress-anxiety-counselling-pune" },
          { label: "Self-Esteem Therapy in Pune", to: "/services/self-esteem-therapy-pune" },
          { label: "Guide: Understanding Chronic People-Pleasing", to: "/resources/overcoming-chronic-people-pleasing" },
        ],
        bookingServiceName: "Trauma-Informed Counselling",
        importantNotice:
          "For severe symptoms or risk of harm we refer to a psychiatrist; in a crisis call Tele-MANAS 14416.",
      }}
    />
  );
}
