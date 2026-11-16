import ServicePageTemplate from "../../components/ServicePageTemplate";

export default function CareerCounsellingPune() {
  return (
    <ServicePageTemplate
      config={{
        path: "/services/career-counselling-pune",
        breadcrumbName: "Career Counselling in Pune",
        seoTitle: "Career Counselling in Pune | Being You Path",
        seoDescription:
          "Career clarity for students and professionals, combining strengths profiling with behavioural design. Pune and online.",
        serviceType: "Career Counselling and Vocational Guidance",
        badgeLabel: "Deccan Gymkhana, Pune & Online",
        h1: "Career Counselling in Pune",
        heroSubtitle:
          "We help school students, college graduates, and mid-career professionals reach grounded career clarity—combining psychological strengths profiling, values mapping, and behavioral design.",
        whoThisIsForIntro:
          "Career confusion is rarely solved by scanning salary charts or a generic checklist. In our practice, we find that career crossroads usually blend family expectations, fear of regretting a turn, burnout from mismatched roles, and uncertainty about real everyday work environments.",
        whoThisIsForPoints: [
          "Class 10–12 students and college undergraduates choosing streams, degrees, or postgraduate paths",
          "Recent graduates unsure which early-career track fits their natural energy, temperament, and strengths",
          "Working professionals in their late 20s to 40s experiencing role stagnation or weighing a mid-career pivot",
          "Parents wanting calm, constructive family alignment sessions alongside their teenager or young adult",
        ],
        whatWeWorkOnIntro:
          "Rather than handing you an automated one-page printout, we examine your cognitive strengths, values, personality fit, emotional blocks, and realistic market pathways together.",
        whatWeWorkOnGroups: [
          {
            heading: "Strengths & Values Profiling",
            items: [
              "We explore authentic motivations separately from peer pressure or prestige trends",
              "We clarify ideal work environments, learning habits, autonomy needs, and stress tolerance",
              "We check whether imposter feelings or perfectionism are clouding realistic confidence",
              "We narrow broad confusion down to two or three grounded academic or industry tracks",
            ],
          },
          {
            heading: "Behavioral Design & Real-World Testing",
            items: [
              "We design small, low-risk micro-experiments before committing years or tuition fees",
              "We use calm decision frameworks to compare trade-offs without overwhelm",
              "We facilitate balanced parent-student conversations when viewpoints differ at home",
              "We map practical 90-day skill, networking, or transition milestones for working adults",
            ],
          },
        ],
        howSessionsWorkIntro:
          "Our career counselling pairs psychological inquiry with Learning & Development specialist Tejaswini Joshi's organizational insight and Imran Hussain's behavioral guidance.",
        howSessionsWorkSteps: [
          {
            title: "Unpack options, pressure points, and context",
            detail:
              "In our opening session, we examine your academic background, current role or stream choices, family expectations, and what feels most stuck or urgent right now.",
          },
          {
            title: "Map strengths, values, and environmental fit",
            detail:
              "Using structured psychological frameworks, we separate external noise from genuine long-term drivers so clearer career criteria emerge naturally.",
          },
          {
            title: "Leave with a practical exploration roadmap",
            detail:
              "Together, we translate insight into concrete next steps—such as shadowing conversations, short projects, course selection, or realistic transition timelines.",
          },
        ],
        firstSessionIntro:
          "Bring your questions, academic transcripts, or current CV—we do not expect you to arrive knowing the answers already.",
        firstSessionPoints: [
          "We explore current dilemmas openly, including where fear of mistakes or family expectations create friction.",
          "We agree together on whether one focused consultation or a short 2–4 session arc suits your stage.",
          "For school and college students, we welcome parents into part of the process whenever helpful.",
        ],
        formatDurationDetails: {
          sessionLength: "60 minutes per structured career counselling consultation.",
          mode: "In person at Deccan Gymkhana, Pune or live online video across India.",
          frequency: "Commonly 2 to 4 focused sessions tailored around admission or job-switch timelines.",
          feesNote:
            "We share session pricing and multi-session options transparently during your free 15-minute clarity call.",
          locationNote:
            "Visited by students and professionals from Deccan Gymkhana, Kothrud, Shivaji Nagar, Aundh, Baner, and pan-India online.",
        },
        faqs: [
          {
            question: "How is our career counselling different from automated psychometric reports?",
            answer:
              "Tests can offer helpful data points, yet a printout cannot weigh your values, family dynamics, emotional fatigue, or what a job actually feels like Monday to Friday. We combine psychological reflection with practical real-world testing.",
          },
          {
            question: "Can parents participate in career counselling for teenagers?",
            answer:
              "Yes. We value collaborative family conversations—typically hearing the student individually first and bringing parents in smoothly to build shared understanding.",
          },
          {
            question: "Do we support mid-career professionals considering an industry shift?",
            answer:
              "Yes. Many professionals in tech, finance, design, and management consult us when balancing financial responsibilities with long-term career fulfillment.",
          },
        ],
        relatedLinks: [
          { label: "Student & Adolescent Counselling", to: "/services/student-adolescent-counselling-pune" },
          { label: "Burnout Counselling in Pune", to: "/services/burnout-counselling-pune" },
          { label: "Guide: Mid-Career Transitions", to: "/resources/career-crisis-mid-career-transitions" },
        ],
        bookingServiceName: "Career Counselling",
      }}
    />
  );
}
