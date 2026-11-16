import ServicePageTemplate from "../../components/ServicePageTemplate";

export default function AnxietyCounsellingPune() {
  return (
    <ServicePageTemplate
      config={{
        path: "/services/stress-anxiety-counselling-pune",
        breadcrumbName: "Stress & Anxiety Counselling",
        seoTitle: "Stress & Anxiety Counselling in Pune | Being You Path",
        seoDescription:
          "Practical, evidence-based support for stress and anxiety. Free 15-minute clarity call, in person in Pune or online.",
        serviceType: "Stress and Anxiety Counselling",
        badgeLabel: "Deccan Gymkhana, Pune & Online",
        alternates: [
          { hreflang: "en-IN", href: "/services/stress-anxiety-counselling-pune" },
          { hreflang: "hi-IN", href: "/hi/services/stress-anxiety-counselling-pune" },
          { hreflang: "x-default", href: "/services/stress-anxiety-counselling-pune" },
        ],
        languageSwitch: {
          label: "हिन्दी में पढ़ें",
          to: "/hi/services/stress-anxiety-counselling-pune",
        },
        h1: "Stress & Anxiety Counselling in Pune",
        heroSubtitle:
          "We provide calm, evidence-based psychological support for chronic worry, sudden panic surges, restlessness, and the daily weight of feeling permanently on edge.",
        whoThisIsForIntro:
          "In our stress and anxiety sessions, we support adults, professionals, and students whose nervous systems have been stuck in threat mode for months. Even when everything appears fine on paper, living with constant internal tension leaves sleep shallow and everyday decisions exhausting.",
        whoThisIsForPoints: [
          "Individuals carrying persistent morning dread, chest tightness, or ongoing worrying before ordinary days",
          "Clients experiencing sudden panic episodes, racing heartbeats, or dizziness in traffic, meetings, or crowded spaces",
          "Working professionals stretched thin by relentless deadlines, people-pleasing, and perfectionism",
          "Students and adults navigating social anxiety, health worry, or sleeplessness fueled by racing thoughts",
        ],
        whatWeWorkOnIntro:
          "We never ask you to simply 'calm down' or ignore physical panic. Instead, we address both the anxious thought habits in your mind and the biological stress response running in your body.",
        whatWeWorkOnGroups: [
          {
            heading: "Cognitive & Worry Cycles",
            items: [
              "We help slow down 'what-if' rumination and catastrophic forecasting before it spirals",
              "We gently unwind reassurance-seeking and chronic second-guessing on routine decisions",
              "We soften perfectionist rules that keep stress high even after tasks are finished",
              "We build steadier comfort with everyday uncertainty at work and in family life",
            ],
          },
          {
            heading: "Body & Nervous-System Calming",
            items: [
              "We practice discreet diaphragmatic breathing and vagus-nerve settling cues",
              "We teach quick somatic grounding techniques for sudden panic surges anywhere",
              "We design practical evening wind-down routines to restore deep sleep quality",
              "We support gentle, stepped return to places or situations you have started avoiding",
            ],
          },
        ],
        howSessionsWorkIntro:
          "We blend Cognitive Behavioral Therapy (CBT), Acceptance and Commitment tools, and somatic nervous-system grounding in clear, plain language free from heavy clinical jargon.",
        howSessionsWorkSteps: [
          {
            title: "Map triggers and physical warning signals",
            detail:
              "We trace the specific thoughts, sensory situations, and bodily cues—like tight shoulders or shallow breath—that turn everyday stress into acute anxiety.",
          },
          {
            title: "Practice discreet calming and reframing skills",
            detail:
              "Together, we practice grounding exercises and balanced thinking tools you can use quietly at your desk, in transit, or late at night.",
          },
          {
            title: "Rebuild long-term emotional steadiness",
            detail:
              "Across 6 to 10+ sessions, we work gently through the core fears fueling vigilance so your baseline feels calmer without constant effort.",
          },
        ],
        firstSessionIntro:
          "Your first appointment with us gives you room to lay down what you have been carrying—there is zero pressure to explain everything neatly or hold back emotion.",
        firstSessionPoints: [
          "We listen to when stress started escalating and how it touches sleep, concentration, digestion, and close relationships.",
          "We explain the physiology of stress and panic plainly so physical symptoms feel understandable rather than frightening.",
          "We walk you through one simple, practical calming tool you can start testing that very evening.",
          "We decide together on an approachable rhythm at our Deccan Gymkhana clinic or via online video.",
        ],
        formatDurationDetails: {
          sessionLength: "50–60 minutes for private 1-on-1 counselling appointments.",
          mode: "In person near Prabhat Road, Deccan Gymkhana, Pune or encrypted HD video pan-India.",
          frequency: "Usually weekly at the start for steady nervous-system relief, then fortnightly.",
          feesNote:
            "We discuss session fees clearly during your free 15-minute clarity call before any commitment.",
          locationNote:
            "Accessible from Prabhat Road, Erandwane, Kothrud, Shivaji Nagar, Aundh, Baner, and Koregaon Park.",
        },
        faqs: [
          {
            question: "How many sessions do we usually recommend for anxiety?",
            answer:
              "Many of our clients notice calmer sleep and steadier coping tools within 6 to 10 sessions, though some continue longer when unpacking long-standing life or family stressors.",
          },
          {
            question: "Can counselling reduce panic attacks without medication?",
            answer:
              "Yes. Psychoeducation about adrenaline surges, paced exhalations, somatic grounding, and CBT reframing together reduce both how often panic hits and the fear of future spikes.",
          },
          {
            question: "Do our psychologists prescribe anti-anxiety medication?",
            answer:
              "No. Our practice focuses on psychotherapy and behavioral care. If combined psychiatric support would help you feel stable enough for therapy, we coordinate trusted referrals openly.",
          },
          {
            question: "Do we offer evening or weekend anxiety counselling slots?",
            answer:
              "Yes. We schedule sessions Monday through Sunday from 10:00 AM to 9:00 PM by prior appointment in Pune and online.",
          },
        ],
        relatedLinks: [
          { label: "CBT Therapy in Pune", to: "/services/cbt-therapy-pune" },
          { label: "Overthinking Therapy", to: "/services/overthinking-therapy" },
          { label: "Burnout Counselling", to: "/services/burnout-counselling-pune" },
          { label: "Online Therapy India", to: "/services/online-therapy-india" },
        ],
        bookingServiceName: "Stress & Anxiety Counselling",
      }}
    />
  );
}
