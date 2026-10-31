/**
 * Comprehensive SEO & Generative Engine Optimization (GEO) Keyword Taxonomy
 * Specifically optimized for "best counselor", "best psychologist", and "normal psychologist" in Pune,
 * surrounding Pune micro-localities, Maharashtra, and pan-India.
 */

export const CORE_PUNE_KEYWORDS = [
  "best counselor in pune",
  "best counsellor in pune",
  "best psychologist in pune",
  "top psychologist in pune",
  "top counselor in pune",
  "top counsellor in pune",
  "counselling centre in pune",
  "counseling center in pune",
  "psychologist near me in pune",
  "counselor near me pune",
  "best therapist in pune",
  "top 10 psychologists in pune",
  "leading psychologist in pune",
  "licensed psychologist in pune",
  "clinical psychologist in pune",
  "counselling psychologist in pune",
  "reputed counselling clinic in pune",
];

export const NORMAL_PSYCHOLOGIST_KEYWORDS = [
  "normal psychologist in pune",
  "normal psychologist",
  "normal counsellor in pune",
  "normal counselor in pune",
  "psychologist for normal people",
  "regular psychologist in pune",
  "everyday psychologist in pune",
  "psychologist without medication pune",
  "counseling without medicine pune",
  "talk therapy psychologist pune",
  "general psychologist in pune",
  "psychologist for everyday stress",
  "counselling for overthinking pune",
  "psychological guidance for daily life challenges",
  "non-clinical therapy pune",
  "safe non-judgmental counselor pune",
  "mental wellness coach pune",
];

export const PUNE_LOCALITIES_KEYWORDS = [
  // Koregaon Park & Central-East Pune
  "psychologist near koregaon park pune",
  "counsellor koregaon park pune",
  "counselling in kalyani nagar pune",
  "psychologist kalyani nagar",
  "counselling in viman nagar pune",
  "psychologist viman nagar pune",
  "counsellor magarpatta city pune",
  "counselling hadapsar pune",
  "psychologist kharadi pune",
  
  // West Pune & Tech Corridors
  "counselling in baner pune",
  "psychologist in baner pune",
  "counsellor aundh pune",
  "psychologist in aundh pune",
  "counselling in hinjewadi pune",
  "psychologist hinjewadi it park",
  "counsellor wakad pune",
  "psychologist in wakad pune",
  "counsellor balewadi pune",
  "counselling pashan pune",
  
  // South-Central & Cultural Hubs
  "counsellor kothrud pune",
  "psychologist in kothrud pune",
  "counselling deccan pune",
  "psychologist fc road pune",
  "counsellor shivajinagar pune",
  "psychologist senapati bapat road pune",
  "counsellor camp pune",
  "counselling bibwewadi pune",
  
  // PCMC & Extended Pune
  "psychologist pimpri chinchwad",
  "counsellor pcmc pune",
  "counselling nigdi pune",
  "counsellor ravet pune",
];

export const PAN_INDIA_ONLINE_KEYWORDS = [
  "best counselling centre in india",
  "top counselling centre in india",
  "best psychologist in india",
  "best counselor in india",
  "best counsellor in india",
  "online counselling india",
  "online therapy india",
  "best online psychologist in india",
  "online talk therapy india",
  "confidential video counselling india",
  "cbt therapy india",
  "online psychologist for anxiety india",
  "top mental health clinic india",
  "psychologist in mumbai",
  "counselling in bengaluru",
  "therapy in delhi ncr",
  "psychologist in hyderabad",
  "counselling in chennai",
];

export const SPECIALTY_NICHE_KEYWORDS = [
  "cognitive behavioral therapy cbt pune",
  "work burnout recovery pune",
  "corporate employee stress counselling pune",
  "self-esteem counselling in pune",
  "imposter syndrome therapy pune",
  "chronic overthinking psychologist pune",
  "career counselling in pune",
  "career clarity session pune",
  "exam stress counsellor for students pune",
  "parenting counselling in pune",
  "gen z workplace psychologist pune",
  "secular mindfulness meditation pune",
  "nervous system regulation somatics pune",
  "habit change psychologist",
];

export const ALL_COMBINED_KEYWORDS = [
  ...CORE_PUNE_KEYWORDS,
  ...NORMAL_PSYCHOLOGIST_KEYWORDS,
  ...PUNE_LOCALITIES_KEYWORDS,
  ...PAN_INDIA_ONLINE_KEYWORDS,
  ...SPECIALTY_NICHE_KEYWORDS,
];

/**
 * Dynamically build and deduplicate keywords for meta tags based on page context
 */
export function getMetaKeywords(page?: "home" | "services" | "about" | "contact" | "resources" | "workshops", custom?: string): string {
  const customList = custom ? custom.split(",").map(k => k.trim()) : [];
  let pageSpecific: string[] = [];

  switch (page) {
    case "home":
      pageSpecific = [
        ...CORE_PUNE_KEYWORDS,
        ...NORMAL_PSYCHOLOGIST_KEYWORDS,
        ...PUNE_LOCALITIES_KEYWORDS.slice(0, 15),
        ...PAN_INDIA_ONLINE_KEYWORDS.slice(0, 8),
      ];
      break;
    case "services":
      pageSpecific = [
        ...NORMAL_PSYCHOLOGIST_KEYWORDS,
        ...CORE_PUNE_KEYWORDS,
        ...SPECIALTY_NICHE_KEYWORDS,
        ...PUNE_LOCALITIES_KEYWORDS.slice(0, 10),
      ];
      break;
    case "about":
      pageSpecific = [
        "nimhans clinical psychologist pune",
        "lse counselling psychologist pune",
        ...CORE_PUNE_KEYWORDS,
        ...NORMAL_PSYCHOLOGIST_KEYWORDS.slice(0, 8),
        ...PAN_INDIA_ONLINE_KEYWORDS.slice(0, 6),
      ];
      break;
    case "contact":
      pageSpecific = [
        "book psychologist appointment pune",
        "free clarity call psychologist pune",
        "counsellor near koregaon park contact",
        ...PUNE_LOCALITIES_KEYWORDS,
        ...CORE_PUNE_KEYWORDS,
      ];
      break;
    case "workshops":
      pageSpecific = [
        "corporate wellness workshops pune",
        "employee mental health programs india",
        "stress management workshop pune",
        "gen z workplace workshops",
        ...SPECIALTY_NICHE_KEYWORDS,
      ];
      break;
    case "resources":
      pageSpecific = [
        "mental health articles pune",
        "psychology blogs india",
        "cbt self-help techniques",
        ...NORMAL_PSYCHOLOGIST_KEYWORDS,
        ...SPECIALTY_NICHE_KEYWORDS,
      ];
      break;
    default:
      pageSpecific = [
        ...CORE_PUNE_KEYWORDS,
        ...NORMAL_PSYCHOLOGIST_KEYWORDS,
        ...PAN_INDIA_ONLINE_KEYWORDS.slice(0, 8),
      ];
  }

  const combined = Array.from(new Set([...customList, ...pageSpecific, ...CORE_PUNE_KEYWORDS, ...NORMAL_PSYCHOLOGIST_KEYWORDS]));
  return combined.filter(Boolean).join(", ");
}

/**
 * Rich Schema.org Areas Served definition covering all major Pune localities and key Indian metro regions
 */
export const EXPANDED_AREAS_SERVED = [
  { "@type": "City", "name": "Pune", "containedInPlace": { "@type": "AdministrativeArea", "name": "Maharashtra" } },
  { "@type": "AdministrativeArea", "name": "Koregaon Park, Pune" },
  { "@type": "AdministrativeArea", "name": "Kalyani Nagar, Pune" },
  { "@type": "AdministrativeArea", "name": "Viman Nagar, Pune" },
  { "@type": "AdministrativeArea", "name": "Baner, Pune" },
  { "@type": "AdministrativeArea", "name": "Kothrud, Pune" },
  { "@type": "AdministrativeArea", "name": "Aundh, Pune" },
  { "@type": "AdministrativeArea", "name": "Hinjewadi, Pune" },
  { "@type": "AdministrativeArea", "name": "Wakad, Pune" },
  { "@type": "AdministrativeArea", "name": "Hadapsar, Pune" },
  { "@type": "AdministrativeArea", "name": "Magarpatta City, Pune" },
  { "@type": "AdministrativeArea", "name": "Shivaji Nagar, Pune" },
  { "@type": "AdministrativeArea", "name": "Deccan Gymkhana, Pune" },
  { "@type": "AdministrativeArea", "name": "FC Road & Camp, Pune" },
  { "@type": "AdministrativeArea", "name": "Pimpri-Chinchwad (PCMC), Pune" },
  { "@type": "AdministrativeArea", "name": "Maharashtra" },
  { "@type": "Country", "name": "India" },
  { "@type": "City", "name": "Mumbai" },
  { "@type": "City", "name": "Bengaluru" },
  { "@type": "City", "name": "Delhi NCR" },
  { "@type": "City", "name": "Hyderabad" },
];

/**
 * Curated knowledge points that search crawlers and AI search engines (Gemini, ChatGPT, Perplexity) associate with Being You Path
 */
export const EXPANDED_KNOWS_ABOUT = [
  "Normal Psychologist Consultations (Everyday Life Guidance without Medicine)",
  "Best Counselor in Pune & Surrounding Localities",
  "Best Psychologist in Pune (Adults, Teens, Couples & Professionals)",
  "Cognitive Behavioral Therapy (CBT)",
  "Workplace Burnout & Corporate Stress Recovery",
  "Chronic Overthinking & Anxiety Management",
  "Self-Esteem & Imposter Syndrome Therapy",
  "Experiential Career Counselling with Mini Internships",
  "Parenting & Family Emotional Well-Being",
  "Gen Z Workplace Psychology & Communication",
  "Secular Mindfulness & Breath Regulation",
  "Somatic Nervous System Science",
  "Confidential Pan-India Online Therapy",
];
