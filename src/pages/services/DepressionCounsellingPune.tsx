import ServicePageTemplate from "../../components/ServicePageTemplate";

export default function DepressionCounsellingPune() {
  return (
    <ServicePageTemplate
      config={{
        path: "/services/depression-counselling-pune",
        breadcrumbName: "Depression & Low Mood Counselling",
        seoTitle: "Depression Counselling in Pune | Being You Path",
        seoDescription:
          "Compassionate therapy for low mood, emotional fatigue, grief and loss of motivation in Pune and online.",
        serviceType: "Depression and Low Mood Counselling",
        badgeLabel: "Deccan Gymkhana, Pune & Online",
        h1: "Depression & Low Mood Counselling in Pune",
        heroSubtitle:
          "We offer steady, non-judgmental psychological care when persistent emotional heaviness, emptiness, or exhaustion makes everyday life feel hard to carry alone.",
        whoThisIsForIntro:
          "Depression and prolonged low mood do not always look like visible tears. In our sessions, we often sit with adults and students who go to work or classes every day while feeling quietly numb, unmotivated, weighed down by guilt, or drained no matter how long they sleep.",
        whoThisIsForPoints: [
          "Individuals feeling emotionally flat, disconnected from people they care about, or chronically tired despite resting",
          "Adults weighed down by hopelessness, harsh self-blame, or a quiet loss of interest in hobbies and work",
          "Clients navigating bereavement, heartbreak, relocation, or major life loss that has not yet settled",
          "Professionals keeping up normal routines publicly while silently running on empty inside",
        ],
        whatWeWorkOnIntro:
          "We never tell you to force cheerfulness or look on the bright side. Instead, we pace sessions gently around your real energy reserves while working on both mood patterns and small daily anchors.",
        whatWeWorkOnGroups: [
          {
            heading: "Cognitive & Emotional Processing",
            items: [
              "We explore persistent self-blame, helplessness, and heavy internal narratives safely",
              "We make unhurried room for grief, disappointment, or unmet emotional needs",
              "We use CBT thought evaluation tailored carefully for low-energy depressive spirals",
              "We practice kinder self-talk to loosen deep shame around struggling",
            ],
          },
          {
            heading: "Gentle Behavioral Activation",
            items: [
              "We choose tiny, realistic steps to restore sleep consistency and daily rhythm",
              "We help reconnect slowly with low-pressure meaningful activities without overwhelm",
              "We support clearer communication with understanding partners or family members",
              "We discuss psychiatrist referrals transparently whenever combined medical care may help",
            ],
          },
        ],
        howSessionsWorkIntro:
          "Every step is shaped carefully around how much bandwidth you actually have right now—combining Cognitive Behavioral Therapy (CBT), behavioral activation, and nervous-system stabilization.",
        howSessionsWorkSteps: [
          {
            title: "Be heard safely without pressure",
            detail:
              "First, we listen gently to your mood history, sleep patterns, health context, and existing support network without judgment or rushed conclusions.",
          },
          {
            title: "Build small, low-effort daily anchors",
            detail:
              "Together, we find manageable morning, movement, and connection routines alongside cognitive tools that do not demand superhuman willpower.",
          },
          {
            title: "Address deeper roots and early warning cues",
            detail:
              "As energy returns gradually, we unpack grief, boundaries, or life misalignment while helping you spot early signs of future low-mood dips.",
          },
        ],
        firstSessionIntro:
          "You do not have to arrive feeling energetic, hopeful, or ready to explain everything smoothly in your first appointment.",
        firstSessionPoints: [
          "We talk gently through what has felt heaviest across recent weeks or months.",
          "We let you decide whether quiet clinic visits in Pune or home online video feel easiest right now.",
          "We identify one kind, manageable stabilizer for the week ahead without overloading you.",
        ],
        formatDurationDetails: {
          sessionLength: "50–60 minutes for private 1-on-1 consultations.",
          mode: "In person at Deccan Gymkhana, Pune or encrypted video across India.",
          frequency: "Typically weekly during heavy low-mood phases for reliable continuity.",
          feesNote:
            "We share session fees and scheduling options clearly during a free 15-minute clarity call.",
          locationNote:
            "Quiet, private room near Prabhat Road, Pune with strictly scheduled individual appointments.",
        },
        faqs: [
          {
            question: "Should I consult a psychologist or a psychiatrist for low mood?",
            answer:
              "Mild-to-moderate depressive symptoms often respond well to structured psychotherapy such as CBT and behavioral activation. Where intense sleep loss, appetite collapse, or prolonged severity point toward combined care, we coordinate trustworthy referrals to psychiatrists.",
          },
          {
            question: "What if commuting to Pune clinic feels too tiring right now?",
            answer:
              "We welcome clients to begin via confidential online video from home and transition to clinic visits only when energy allows.",
          },
          {
            question: "Do we keep everything shared in depression counselling confidential?",
            answer:
              "Yes. Strict clinical privacy applies across every appointment, in person and online.",
          },
        ],
        relatedLinks: [
          { label: "CBT Therapy in Pune & Online", to: "/services/cbt-therapy-pune" },
          { label: "Burnout Counselling in Pune", to: "/services/burnout-counselling-pune" },
          { label: "Online Therapy in India", to: "/services/online-therapy-india" },
        ],
        bookingServiceName: "Depression & Low Mood Counselling",
        importantNotice:
          "For severe symptoms or risk of harm we refer to a psychiatrist; in a crisis call Tele-MANAS 14416.",
      }}
    />
  );
}
