import ServicePageTemplate from "../../components/ServicePageTemplate";

export default function ParentingFamilyCounsellingPune() {
  return (
    <ServicePageTemplate
      config={{
        path: "/services/parenting-family-counselling-pune",
        breadcrumbName: "Parenting & Family Well-Being",
        seoTitle: "Parenting & Family Counselling in Pune | Being You Path",
        seoDescription:
          "Compassionate parenting guidance and family well-being counselling in Pune and online across India. Co-regulation, boundaries, and calmer homes.",
        serviceType: "Parenting and Family Well-Being Counselling",
        badgeLabel: "Deccan Gymkhana, Pune & Online",
        h1: "Parenting & Family Well-Being Counselling in Pune",
        heroSubtitle:
          "We help parents, joint households, and families build calmer everyday communication, emotional safety with children and teens, and healthier shared boundaries without guilt or constant shouting.",
        whoThisIsForIntro:
          "Raising children and maintaining warm family bonds in fast-moving urban households brings exhaustion alongside love. In our parenting and family well-being sessions, we support mothers, fathers, and multi-generational families who want fewer daily power struggles and steadier connection.",
        whoThisIsForPoints: [
          "Parents feeling worn down by homework battles, screen-time arguments, tantrums, or teenage silence",
          "Couples trying to align on discipline, routines, and shared parenting expectations without resentment",
          "Working parents balancing demanding careers while carrying persistent guilt about family presence",
          "Multi-generational Indian households navigating differing parenting views with grandparents and elders",
        ],
        whatWeWorkOnIntro:
          "We never judge parents or offer impractical textbook scripts that ignore real household pressures. Instead, we strengthen how adults stay regulated first so children feel safer listening and opening up.",
        whatWeWorkOnGroups: [
          {
            heading: "Child & Teen Emotional Connection",
            items: [
              "We practice emotional coaching alongside clear, calm household limits instead of harshness or permissiveness",
              "We help parents understand age-appropriate emotional development from early childhood through adolescence",
              "We build practical screen-time, study, and bedtime routines that reduce daily negotiation fatigue",
              "We support calmer conversations around teenage autonomy, friendships, and academic stress",
            ],
          },
          {
            heading: "Household & Co-Parent Alignment",
            items: [
              "We explore how co-parents can back each other up rather than drifting into opposing 'strict vs lenient' roles",
              "We work through boundary friction politely in joint and extended family settings",
              "We support parents noticing their own nervous-system triggers and burnout before reacting",
              "We coordinate smoothly with student counselling whenever a teen also wants private 1-on-1 support",
            ],
          },
        ],
        howSessionsWorkIntro:
          "Guided by counselling psychology, family systems awareness, and practical behavioural routines, sessions run calmly with one parent, both parents together, or planned family check-ins.",
        howSessionsWorkSteps: [
          {
            title: "Understand the household pattern without blame",
            detail:
              "We listen carefully to the moments that escalate fastest at home—mornings, evenings, exam months, or family gatherings—without pointing fingers.",
          },
          {
            title: "Build adult calm and clear communication shifts",
            detail:
              "Together, we replace long lectures or heated ultimatums with brief, respectful validation and consistent boundaries children can trust.",
          },
          {
            title: "Test manageable weekly shifts at home",
            detail:
              "You try one specific evening routine or conversation approach between visits, and we review how your child and household responded.",
          },
        ],
        firstSessionIntro:
          "In your first parenting or family consultation, you do not have to pretend everything at home runs smoothly.",
        firstSessionPoints: [
          "We hear your immediate concerns, household setup, and what feels hardest right now.",
          "We clarify whether sessions work best with parents alone, with adolescents involved, or a blend.",
          "We share one grounded co-regulation tool to soften heated moments at home that same week.",
        ],
        formatDurationDetails: {
          sessionLength: "60 minutes (individual parents) or 75 minutes (co-parent / family sessions).",
          mode: "In person at Deccan Gymkhana, Pune or encrypted video across India and abroad.",
          frequency: "Weekly or biweekly adjusted thoughtfully around school terms and family calendars.",
          feesNote:
            "We share clear session fees during a free 15-minute clarity call before any commitment.",
          locationNote:
            "Accessible from Prabhat Road, Erandwane, Kothrud, Aundh, Baner, Koregaon Park, and Viman Nagar.",
        },
        faqs: [
          {
            question: "Should my child attend the very first parenting counselling session?",
            answer:
              "Usually we meet parents alone first so you can speak candidly without putting your child on the spot. Depending on age and goals, we decide together when a joint or youth session helps.",
          },
          {
            question: "Can just one parent start even if a partner or elder is hesitant?",
            answer:
              "Yes. Even when one caregiver adopts calmer emotional coaching and predictable limits, the overall tension at home often begins easing within weeks.",
          },
          {
            question: "Do you work with families raising teenagers as well as younger children?",
            answer:
              "Yes. We support parents of school-age kids, adolescents managing exam pressure and social life, and adult-family boundary dynamics.",
          },
          {
            question: "In which languages are parenting and family sessions offered?",
            answer:
              "We facilitate sessions comfortably in English, Hindi, and Marathi.",
          },
        ],
        relatedLinks: [
          { label: "Student & Adolescent Counselling", to: "/services/student-adolescent-counselling-pune" },
          { label: "Relationship & Couples Counselling", to: "/services/relationship-couples-counselling-pune" },
          { label: "Setting Boundaries with Indian Families", to: "/resources/setting-boundaries-indian-families-no-guilt" },
          { label: "Emotional Coaching vs Dismissing", to: "/resources/emotional-coaching-vs-dismissing-parenting" },
        ],
        bookingServiceName: "Parenting & Family Well-Being",
      }}
    />
  );
}
