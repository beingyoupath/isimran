import ServicePageTemplate from "../../components/ServicePageTemplate";

export default function StudentAdolescentCounsellingPune() {
  return (
    <ServicePageTemplate
      config={{
        path: "/services/student-adolescent-counselling-pune",
        breadcrumbName: "Student & Adolescent Counselling",
        seoTitle: "Student & Adolescent Counselling in Pune | Being You Path",
        seoDescription:
          "Exam stress, emotional regulation and career guidance for students and teens, with parent involvement where needed.",
        serviceType: "Student and Adolescent Counselling",
        badgeLabel: "Deccan Gymkhana, Pune & Online",
        h1: "Student & Adolescent Counselling in Pune",
        heroSubtitle:
          "We provide warm, structured counselling for school teenagers, college students, and competitive exam aspirants—building emotional regulation, study composure, and calmer parent-teen understanding.",
        whoThisIsForIntro:
          "Academic pressure, board exams, peer comparison, and constant smartphone stimulation weigh heavily on teenagers and college young adults—often even when they tell parents everything is 'fine'. In our sessions, we listen carefully to young people without scolding or lecturing.",
        whoThisIsForPoints: [
          "School teens and college students experiencing exam panic, blanking out in tests, or chronic study paralysis",
          "Competitive exam aspirants (JEE, NEET, UPSC, CAT, MHT-CET) dealing with exhaustion, loneliness, or self-doubt",
          "Adolescents navigating social anxiety, screen-time battles, sleep disruption, or low self-confidence",
          "Parents wanting calm, thoughtful support around motivating their teen without constant household conflict",
        ],
        whatWeWorkOnIntro:
          "We meet students with genuine respect and practical curiosity. Together, we address both the emotional fears fueling procrastination and realistic daily study and rest habits.",
        whatWeWorkOnGroups: [
          {
            heading: "Academic & Exam Composure",
            items: [
              "We unpack procrastination driven by perfectionism or fear of disappointing family",
              "We practice calm test-taking regulation so minds do not freeze during exams",
              "We design realistic focus schedules paired with proper nighttime sleep recovery",
              "We reduce heavy comparison with coaching-class peers and social media",
            ],
          },
          {
            heading: "Emotional & Family Resilience",
            items: [
              "We teach approachable emotional regulation tools for irritability, sadness, or overwhelm",
              "We strengthen self-esteem and comfortable peer boundaries at school and campus",
              "We include thoughtful parent check-ins while protecting adolescent privacy and trust",
              "We support calm thinking around subject choices and early career direction",
            ],
          },
        ],
        howSessionsWorkIntro:
          "Our psychologists draw on adolescent-friendly Cognitive Behavioral Therapy (CBT), emotional coaching, and practical habit design adapted to a student's schedule.",
        howSessionsWorkSteps: [
          {
            title: "Build safety and genuine trust first",
            detail:
              "Students speak in a friendly, non-judgmental room where we do not sound like another teacher or strict parent—making honesty comfortable from session one.",
          },
          {
            title: "Practice usable focus and calming routines",
            detail:
              "Together, we introduce realistic study blocks, quick breath resets before mock papers, and steadier self-talk when mock test scores fluctuate.",
          },
          {
            title: "Coordinate calm parent support when helpful",
            detail:
              "Within clear confidentiality boundaries agreed upfront by both teen and parents, we share practical ways home conversations can stay supportive rather than tense.",
          },
        ],
        firstSessionIntro:
          "At the beginning of a teen's first visit, parents can join briefly for shared context before stepping out so we meet the student privately 1-on-1.",
        firstSessionPoints: [
          "We explain confidentiality rules plainly in front of both student and parents so trust starts strong.",
          "We listen to immediate academic, peer, or emotional stressors without rushing to advice.",
          "We arrange approachable afternoon, evening, or weekend appointments in Pune or online.",
        ],
        formatDurationDetails: {
          sessionLength: "50–60 minutes for student sessions, with planned parent check-ins when helpful.",
          mode: "In person near Prabhat Road, Deccan Gymkhana, Pune or confidential video pan-India.",
          frequency: "Weekly or biweekly adjusted thoughtfully around school, college, and exam calendars.",
          feesNote:
            "We share session fees transparently during a free 15-minute parent or student clarity call.",
          locationNote:
            "Convenient for students attending schools and colleges near Prabhat Road, FC Road, Law College Road, BMCC Road, and Kothrud.",
        },
        faqs: [
          {
            question: "Are teenage counselling conversations kept confidential from parents?",
            answer:
              "Yes. We protect personal disclosures to foster genuine adolescent trust, while keeping parents thoughtfully involved around overall support themes and immediate safety.",
          },
          {
            question: "What student age groups do we counsel?",
            answer:
              "We work regularly with adolescents aged 14 and above, junior-college teens, university undergraduates, and young adults preparing for competitive exams.",
          },
          {
            question: "Can sessions fit around coaching classes and college lectures?",
            answer:
              "Yes. We offer afternoon, evening (up to 9:00 PM), and weekend slots both at our Deccan Gymkhana clinic and online.",
          },
        ],
        relatedLinks: [
          { label: "Career Counselling in Pune", to: "/services/career-counselling-pune" },
          { label: "Stress & Anxiety Counselling", to: "/services/stress-anxiety-counselling-pune" },
          { label: "Overthinking Therapy", to: "/services/overthinking-therapy" },
          { label: "Article: Digital Overstimulation & Focus", to: "/resources/digital-overstimulation-and-dopamine" },
          { label: "Myth: Overthinking Is My Personality", to: "/resources/myth-overthinking-is-my-personality" },
          { label: "Article: Sleep Anxiety & Nighttime Spirals", to: "/resources/sleep-anxiety-nighttime-spiral" },
        ],
        bookingServiceName: "Student & Adolescent Counselling",
      }}
    />
  );
}
