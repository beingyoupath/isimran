import ServicePageTemplate from "../../components/ServicePageTemplate";

export default function MindfulnessMeditationPune() {
  return (
    <ServicePageTemplate
      config={{
        path: "/services/mindfulness-meditation-pune",
        breadcrumbName: "Mindfulness & Meditation",
        seoTitle: "Mindfulness & Meditation Counselling in Pune | Being You Path",
        seoDescription:
          "Secular mindfulness, attention training, and guided meditation coaching in Pune and online across India. Practical calm without dogma.",
        serviceType: "Secular Mindfulness and Meditation Training",
        badgeLabel: "Deccan Gymkhana, Pune & Online",
        h1: "Mindfulness & Meditation Counselling in Pune",
        heroSubtitle:
          "We teach grounded, secular mindfulness and practical meditation skills designed for busy minds—helping you step back from racing thoughts, steady attention, and calm everyday stress physiology without dogma or hours of sitting still.",
        whoThisIsForIntro:
          "Many people download meditation apps only to abandon them after three frustrating evenings convinced they 'cannot clear their mind'. In our mindfulness sessions, we demystify meditation completely: mindfulness is not forcing silence, it is training how you relate to noise in your head.",
        whoThisIsForPoints: [
          "Working professionals and students who feel restless whenever they pause and struggle with typical meditation apps",
          "Overthinkers wanting practical attention-training tools they can apply during meetings, commutes, and busy days",
          "Clients seeking secular, psychologically grounded breath and awareness practices free from rigid dogma",
          "Individuals looking to complement CBT counselling with daily nervous-system settling and emotional steadiness",
        ],
        whatWeWorkOnIntro:
          "Led by Imran Hussain alongside structured psychological practice, we tailor mindfulness to your temperament and lifestyle—turning short 3-to-12 minute daily practices into reliable emotional anchors.",
        whatWeWorkOnGroups: [
          {
            heading: "Secular Attention Training",
            items: [
              "We replace the myth of 'having zero thoughts' with calm noticing and gentle attentional redirection",
              "We train present-moment anchoring using breath rhythm, auditory cues, and grounded visual focus",
              "We apply mindfulness to everyday eating, walking, and digital transitions so calm fits busy schedules",
              "We build tolerance for momentary boredom and discomfort without reaching instinctively for screens",
            ],
          },
          {
            heading: "Emotional & Breath Settling",
            items: [
              "We integrate slow, paced exhalations and body-scan relaxation before sleep or stressful conversations",
              "We practice the 'pause between trigger and response' so frustration or worry does not drive impulsive reactions",
              "We notice physical tension cues—jaw, shoulders, shallow chest breath—before stress spirals upward",
              "We personalize gentle, accessible seated or movement-friendly options if stillness feels uncomfortable",
            ],
          },
        ],
        howSessionsWorkIntro:
          "Every session combines guided live practice with honest psychological troubleshooting—adapting techniques immediately when restlessness, drowsiness, or busy thoughts arise.",
        howSessionsWorkSteps: [
          {
            title: "Assess attention style and daily friction",
            detail:
              "We explore when your mind feels most scattered, what meditation styles previously frustrated you, and which 5-minute pockets realistically exist in your day.",
          },
          {
            title: "Practice guided methods live in session",
            detail:
              "Together, we walk through paced breathing, non-judgmental thought labeling, and focused attention drills while noticing what settles your system cleanly.",
          },
          {
            title: "Lock in a realistic daily rhythm",
            detail:
              "You leave with audio-free self-led prompts you can practice quietly at home, on a park bench, or between meetings without needing hours of free time.",
          },
        ],
        firstSessionIntro:
          "Your first mindfulness session requires zero prior meditation experience, special posture, or flexible joints.",
        firstSessionPoints: [
          "We start comfortably seated in chairs—no rigid cross-legged endurance required.",
          "We run two brief 3-minute guided resets together and discuss candidly how each felt.",
          "We design a realistic 7-day starter practice suited to your actual energy levels.",
        ],
        formatDurationDetails: {
          sessionLength: "50–60 minutes for private 1-on-1 mindfulness and meditation guidance.",
          mode: "In person near Prabhat Road, Deccan Gymkhana, Pune or live online video nationwide.",
          frequency: "Weekly or biweekly across 4–8 skill-building sessions, or woven into ongoing therapy.",
          feesNote:
            "We discuss clear session fees during your free 15-minute clarity call before any booking.",
          locationNote:
            "Welcoming clients across Deccan Gymkhana, Prabhat Road, Kothrud, Shivaji Nagar, Aundh, Baner, Koregaon Park, and online across India.",
        },
        faqs: [
          {
            question: "What if my mind races nonstop every time I close my eyes?",
            answer:
              "That is exactly why most people benefit from guided mindfulness coaching. Noticing a busy mind is not failing meditation—it is the first step of training attention, and we adjust anchors (open-eyed focus, breath counting, sound) to fit you.",
          },
          {
            question: "Is mindfulness at Being You Path religious or tied to any spiritual sect?",
            answer:
              "No. Our sessions teach strictly secular, evidence-informed mindfulness and attention training grounded in psychological science, welcoming clients of every belief and background.",
          },
          {
            question: "Can mindfulness help with anxiety, sleep trouble, or workplace stress?",
            answer:
              "Yes. Consistent short daily mindfulness and paced exhalation practices support lower reactivity, better sleep transitions, and steadier focus alongside CBT tools.",
          },
          {
            question: "Can sessions be booked in Hindi or Marathi as well as English?",
            answer:
              "Yes. We facilitate mindfulness and meditation sessions in English, Hindi, and Marathi.",
          },
        ],
        relatedLinks: [
          { label: "Overthinking Therapy", to: "/services/overthinking-therapy" },
          { label: "Stress & Anxiety Counselling", to: "/services/stress-anxiety-counselling-pune" },
          { label: "Behavioural Change & Habit Coaching", to: "/services/behavioural-change-habit-coaching-pune" },
          { label: "Thought of the Day Archive", to: "/thought-of-the-day" },
        ],
        bookingServiceName: "Mindfulness & Meditation",
      }}
    />
  );
}
