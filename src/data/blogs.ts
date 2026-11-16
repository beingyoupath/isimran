export interface BlogPost {
  id: string;
  title: string;
  category: 'mind' | 'work' | 'routines' | 'relationships' | 'somatic' | 'myths';
  categoryLabel: string;
  readTime: string;
  overview: string;
  body: string;
  tips: string[];
  conclusion: string;
  datePublished?: string;
  author?: string;
  badge?: string;
  featured?: boolean;
}

export interface BlogCategory {
  id: 'mind' | 'work' | 'routines' | 'relationships' | 'somatic' | 'myths';
  title: string;
  desc: string;
  iconName: string;
  articleCount: number;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: "mind",
    title: "Mind, Overthinking & Anxiety",
    desc: "Cognitive patterns, rumination loops, decision fatigue, and evidence-based CBT frameworks.",
    iconName: "BrainCircuit",
    articleCount: 4
  },
  {
    id: "work",
    title: "Workplace, Burnout & Career",
    desc: "Navigating corporate pressure, imposter syndrome, career crossroads, and executive boundaries.",
    iconName: "Briefcase",
    articleCount: 4
  },
  {
    id: "routines",
    title: "Daily Habits & Nervous System Rest",
    desc: "Behavioral design, overcoming procrastination, evening wind-downs, and restorative routines.",
    iconName: "Coffee",
    articleCount: 4
  },
  {
    id: "relationships",
    title: "Relationships, Boundaries & Family",
    desc: "Compassionate communication, setting boundaries without guilt, attachment safety, and emotional coaching.",
    iconName: "HeartHandshake",
    articleCount: 4
  },
  {
    id: "somatic",
    title: "Somatic Grounding & Breathwork",
    desc: "Autonomic nervous system regulation, panic attack grounding, and physical resilience.",
    iconName: "Waves",
    articleCount: 4
  },
  {
    id: "myths",
    title: "Mental Health Myths & Dilemmas",
    desc: "Understanding therapy in India, clarifying psychiatric vs psychological support, and building self-trust.",
    iconName: "HelpCircle",
    articleCount: 4
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "understanding-psychotherapy-and-counselling-in-pune",
    title: "Understanding Psychotherapy & Counselling in Pune: An Everyday Guide to Mental Health",
    category: "myths",
    categoryLabel: "Mental Health Guide",
    readTime: "7 min read",
    badge: "Featured Guide",
    featured: true,
    datePublished: "2026-11-01",
    author: "Being You Path Editorial Team",
    overview: "A comprehensive roadmap for understanding psychotherapy, talk therapy, and online counselling in Pune and across India without jargon or stigma.",
    body: "Deciding to speak with a mental health professional is an act of clarity, not defeat. Across Pune and nationwide, individuals seeking counselling often share the same essential need: a safe, confidential space with a qualified practitioner who listens without judgment or hasty prescriptions. At Being You Path, we believe psychotherapy belongs to everyday people navigating real life hurdles—overcoming chronic rumination, managing career fatigue, and healing interpersonal relationships.\n\nOur clinical methodologies are anchored in evidence-based Cognitive Behavioural Therapy (CBT), acceptance frameworks, and somatic nervous system regulation. For professionals in high-intensity sectors, our sessions provide pragmatic tools to manage boundary erosion and chronic exhaustion. Simultaneously, we support students and families with academic stress relief and values-based career counselling.\n\nIn-person therapy takes place at our clinic at 119/17, Dr. Sripati Shastri Path, near Prabhat Road and Deccan Gymkhana in Pune. For individuals across India, our encrypted online therapy brings the exact same warmth and privacy directly to your home.",
    tips: [
      "Therapy is Preventative Care: Seeking counselling before reaching acute burnout helps preserve emotional stamina and mental clarity.",
      "Evidence-Based Frameworks: Modalities like CBT address cognitive distortions, while somatic grounding helps calm physiological tension.",
      "Support for All Life Stages: From adolescent guidance to executive stress management, personalized care creates lasting change.",
      "In-Person and Online Accessibility: Attend face-to-face sessions on Prabhat Road or join confidential video sessions from anywhere in India."
    ],
    conclusion: "You do not need to struggle in silence or wait for an emotional emergency to seek guidance. Real healing begins when compassionate science and honest human conversation meet."
  },
  {
    id: "breaking-the-rumination-loop-cbt-tools",
    title: "Breaking the Rumination Loop: Cognitive Behavioural Tools for Overthinking",
    category: "mind",
    categoryLabel: "Mind & Cognition",
    readTime: "6 min read",
    badge: "Popular",
    featured: true,
    datePublished: "2026-10-28",
    author: "Being You Path Editorial Team",
    overview: "Practical, evidence-informed Cognitive Behavioural Therapy strategies to break free from repetitive worry cycles and catastrophic thinking.",
    body: "Overthinking rarely solves problems; more often, it masquerades as problem-solving while keeping your nervous system in a state of high alert. When you replay past conversations or forecast worst-case scenarios, your brain releases stress hormones as if the imagined disaster is occurring right now.\n\nIn Cognitive Behavioural Therapy (CBT), we teach clients to distinguish between productive problem-solving (which leads to concrete action) and unproductive rumination (which circles endlessly). By identifying cognitive distortions—such as catastrophic thinking, mind reading, and emotional reasoning—you can learn to pause the spiral.\n\nAt Being You Path, our practitioners work with clients to develop personalized grounding anchors, thought-challenging records, and cognitive defusion exercises that restore mental space.",
    tips: [
      "Ask: 'Is this actionable right now?': If the worry has no immediate step you can take today, acknowledge it and set it aside.",
      "Designate a 'Worry Window': Spend 15 deliberate minutes journaling worries, then close the notebook and return to your routine.",
      "Engage the Body: Stand up, stretch, splash cool water on your face, or take five slow diaphragmatic breaths to disrupt cognitive loops.",
      "Test Your Assumptions: Write down the feared scenario and examine the objective evidence for and against it."
    ],
    conclusion: "You are not your thoughts; you are the observer of your thoughts. With structured practice, you can reclaim mental calm."
  },
  {
    id: "recovering-from-workplace-burnout-guide",
    title: "Recovering from Workplace Burnout: Practical Steps to Restore Energy",
    category: "work",
    categoryLabel: "Career & Burnout",
    readTime: "7 min read",
    badge: "Workplace Health",
    featured: false,
    datePublished: "2026-10-20",
    author: "Being You Path Editorial Team",
    overview: "Understand the three clinical dimensions of burnout and how working professionals in Pune can rebuild healthy work boundaries.",
    body: "In high-pressure corporate environments, constant availability and intense workloads are often rewarded until physical and emotional exhaustion sets in. Burnout is recognized by the World Health Organization as an occupational phenomenon characterized by chronic energy depletion, mental distance from one's job, and feelings of reduced efficacy.\n\nRecovery from burnout does not happen overnight by sleeping in on Sunday. It requires examining internal drivers like perfectionism, fear of disappointing others, and difficulty saying no, alongside external structural adjustments.\n\nOur counsellors help working professionals establish clear psychological boundaries between duty and rest, enabling sustainable long-term careers without sacrificing personal health.",
    tips: [
      "Audit Your Cognitive Drain: Identify meetings, tasks, or commitments that drain energy disproportionately and explore delegating or restructuring them.",
      "Physical End-of-Day Rituals: Create a tangible signal that the workday is complete, such as shutting down your laptop and walking outside for 10 minutes.",
      "Schedule Micro-Breaks: Step away from screens for 5 minutes every 90 minutes to allow the nervous system to down-regulate.",
      "Explore Professional Counselling: A neutral practitioner can help you untangle guilt and build assertiveness scripts."
    ],
    conclusion: "Protecting your well-being is not a sign of weakness; it is the foundation of sustainable living."
  },
  {
    id: "compassionate-communication-couples-guide",
    title: "Compassionate Communication: De-escalating Conflict in Relationships",
    category: "relationships",
    categoryLabel: "Relationships",
    readTime: "6 min read",
    badge: "Relationships",
    featured: false,
    datePublished: "2026-10-15",
    author: "Being You Path Editorial Team",
    overview: "Learn how couples can identify communication loops, manage emotional reactivity, and rebuild genuine intimacy.",
    body: "All couples experience disagreement, but repetitive destructive argument cycles can erode emotional safety over time. When one partner attacks out of hurt and the other shuts down to avoid escalation, both feel isolated.\n\nIn relationship counselling at Being You Path, we help partners slow down conversations when emotional arousal spikes. By identifying the softer vulnerabilities beneath surface anger—such as fear of rejection or unmet needs—couples learn to express themselves clearly without attacking.\n\nWhether in our consulting rooms near Prabhat Road or via online video sessions, we provide a neutral, balanced space to rebuild connection.",
    tips: [
      "Use 'I' Statements: Focus on your emotional experience ('I feel overwhelmed when...') rather than assigning blame ('You always...').",
      "Recognize Flooding: When heart rate exceeds 100 bpm during an argument, take a mutually agreed 20-minute pause to calm down before continuing.",
      "Listen to Understand, Not to Defend: Summarize what you heard your partner say before presenting your counterpoint.",
      "Acknowledge Small Bids for Connection: Notice and respond when your partner reaches out for attention, conversation, or comfort."
    ],
    conclusion: "Healthy relationships are not built on the absence of conflict, but on the capacity to repair ruptures with empathy."
  }
];
