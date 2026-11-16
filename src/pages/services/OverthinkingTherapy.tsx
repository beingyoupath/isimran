import ServicePageTemplate from "../../components/ServicePageTemplate";

export default function OverthinkingTherapy() {
  return (
    <ServicePageTemplate
      config={{
        path: "/services/overthinking-therapy",
        breadcrumbName: "Overthinking Therapy & Counselling",
        seoTitle: "Overthinking Therapy & Counselling | Being You Path",
        seoDescription:
          "Break the overthinking loop with cognitive techniques that work in daily life. Online and in Pune.",
        serviceType: "Overthinking and Rumination Counselling",
        badgeLabel: "Pune Clinic & Pan-India Online",
        h1: "Overthinking Therapy & Counselling",
        heroSubtitle:
          "We help you step out of repetitive rumination, 2:00 AM mental spirals, and analysis paralysis using practical CBT, attention training, and nervous-system grounding.",
        whoThisIsForIntro:
          "At Being You Path, we remind clients that overthinking is not a flawed personality you are stuck with forever. It is a learned mental safety habit—one your brain relies on when trying to predict regret, avoid conflict, or manufacture certainty where none exists.",
        whoThisIsForPoints: [
          "Individuals replaying past conversations late at night wishing they had phrased something differently",
          "People trapped in relentless 'what-if' loops ahead of routine work emails, social plans, or family calls",
          "Students and professionals frozen by analysis paralysis when choosing a career step or everyday option",
          "Anyone exhausted by non-stop background mental noise even on quiet weekends or holidays",
        ],
        whatWeWorkOnIntro:
          "Trying to argue a worry into silence with even more thinking almost always feeds the spiral. Instead, we help you change how you notice and respond the moment a loop kicks off.",
        whatWeWorkOnGroups: [
          {
            heading: "Interrupting Rumination Loops",
            items: [
              "We help separate useful planning from circular rumination that solves nothing",
              "We use structured worry containers and cognitive defusion so thoughts lose grip",
              "We soften perfectionism around minor daily choices and social impressions",
              "We address fear of mistakes or judgment that keeps repetitive mental review running",
            ],
          },
          {
            heading: "Nighttime & Somatic Anchoring",
            items: [
              "We teach simple sunset 'brain-dump' routines before lights out to protect sleep",
              "We practice secular mindfulness attention-shifting rather than forcing an empty mind",
              "We use body-based breath resets when spirals trigger chest tension or panic",
              "We turn endless weighing into small, low-stakes decisive actions",
            ],
          },
        ],
        howSessionsWorkIntro:
          "Our sessions bring together Cognitive Behavioral Therapy (CBT), secular attention training, and grounded nervous-system regulation so mental clarity returns without constant self-policing.",
        howSessionsWorkSteps: [
          {
            title: "Spot your specific overthinking pattern",
            detail:
              "Together, we notice whether your mind loops mostly on past mistakes, future worst-case scenarios, or present decision freeze—because each pattern responds best to a distinct practical tool.",
          },
          {
            title: "Build space between you and the thought",
            detail:
              "We practice stepping back from sticky mental stories so a single anxious thought no longer feels like an order you must analyze for hours.",
          },
          {
            title: "Anchor attention back into living and rest",
            detail:
              "Step by step, we replace endless mental rehearsal with calm decision limits, somatic grounding, and reliable evening wind-down habits.",
          },
        ],
        firstSessionIntro:
          "In your first session with us, you do not need to arrive with tidy notes or clear conclusions—we help untangle the mental clutter calmly together.",
        firstSessionPoints: [
          "We trace the specific triggers and times of day (such as bedtime or after work calls) when loops accelerate.",
          "We walk through one immediate pattern-interruption exercise to test during nighttime spirals.",
          "We agree on an unhurried weekly or biweekly rhythm in Pune or online.",
        ],
        formatDurationDetails: {
          sessionLength: "50–60 minutes for private 1-on-1 counselling appointments.",
          mode: "In person at Deccan Gymkhana, Pune or confidential video consultations across India.",
          frequency: "Typically weekly at the start to build momentum, then spaced as spirals quiet.",
          feesNote:
            "We share full fee and slot information transparently during your free 15-minute clarity call.",
          locationNote:
            "In-person clinic near Prabhat Road, Pune; online sessions across Mumbai, Bengaluru, Delhi NCR, Hyderabad, Chennai, and pan-India.",
        },
        faqs: [
          {
            question: "Wait—isn't overthinking simply part of my natural personality?",
            answer:
              "No. Rumination is a conditioned mental habit, not permanent DNA. When we combine CBT cognitive defusion with attention training, your mind learns to disengage smoothly from unproductive loops.",
          },
          {
            question: "Why does overthinking hit hardest right before sleep?",
            answer:
              "During the day, tasks and screens occupy working memory. Once lights go out and quiet sets in, unprocessed worries surface quickly. In our sessions, we build sunset offload steps and physical grounding cues so bed stays for rest.",
          },
          {
            question: "Can we attend overthinking therapy online outside Pune?",
            answer:
              "Yes. We conduct live confidential video sessions across every city in India as well as for Indians abroad.",
          },
        ],
        relatedLinks: [
          { label: "CBT Therapy in Pune", to: "/services/cbt-therapy-pune" },
          { label: "Stress & Anxiety Counselling", to: "/services/stress-anxiety-counselling-pune" },
          { label: "Guide: 3 Types of Overthinking", to: "/resources/the-3-types-of-overthinking-and-cbt-tools" },
        ],
        bookingServiceName: "Overthinking Therapy",
      }}
    />
  );
}
