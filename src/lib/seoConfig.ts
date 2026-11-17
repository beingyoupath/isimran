/**
 * Single Source of Truth for Being You Path NAP, SEO URLs, and Structured Data (JSON-LD)
 * Strictly complies with factual, verifiable clinical & local SEO standards.
 */

export const SITE_URL = "https://www.beingyoupath.com";
export const BRAND_NAME = "Being You Path";
export const BRAND_TAGLINE = "Where you meet your real self";

export const CLINIC_STREET = "119/17, Dr. Sripati Shastri Path, Near Prabhat Road, Deccan Gymkhana";
export const CLINIC_LOCALITY = "Pune";
export const CLINIC_REGION = "Maharashtra";
export const CLINIC_POSTAL_CODE = "411004";
export const CLINIC_COUNTRY = "India";
export const CLINIC_ADDRESS =
  "119/17, Dr. Sripati Shastri Path, Near Prabhat Road, Deccan Gymkhana, Pune, Maharashtra 411004";

export const PHONE_PRIMARY = "+91 7387772573";
export const PHONE_PRIMARY_HREF = "tel:+917387772573";
export const PHONE_SECONDARY = "+91 7387779238";
export const PHONE_SECONDARY_HREF = "tel:+917387779238";

export const EMAIL_PRIMARY = "hello@beingyoupath.com";
export const EMAIL_SECONDARY = "info@beingyoupath.com";

export const CLINIC_HOURS_LABEL = "Monday – Sunday: 10:00 AM – 9:00 PM";
export const CALENDLY_URL = "https://calendly.com/beingyoupathappointment";
export const WHATSAPP_URL = "https://wa.me/917387772573";
export const GBP_URL = "https://share.google/bQZJdmxPTbKo8iwKM";
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Being+You+Path/@18.5142273,73.8309474,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2bf009a76793f:0xe544b78e3d109854!8m2!3d18.5142273!4d73.8309474";
export const OG_IMAGE_URL = `${SITE_URL}/images/being-you-path-og.jpg`;
export const LOGO_URL = `${SITE_URL}/assets/aistudio/being_you_logo_b4a82e75.png`;

// TODO: Verify exact clinic pin coordinates with Google Maps before production release.
export const CLINIC_GEO = {
  latitude: 18.5142,
  longitude: 73.8309,
};

export const SOCIAL_PROFILES = [
  "https://www.instagram.com/beingyoupathoffical",
  "https://www.linkedin.com/company/beingyou-path-9965b1389/",
  "https://www.facebook.com/profile.php?id=61590091544601",
  "https://www.reddit.com/u/Beingyoupath/s/PcquEhRTpM",
  "https://www.youtube.com/@beingyoupath",
  "https://x.com/BeingyouP84126",
  GOOGLE_MAPS_URL,
];

export const TELE_MANAS_NOTICE =
  "Being You Path provides non-emergency outpatient psychological counselling and therapy. If you are experiencing a mental health crisis or thoughts of self-harm, please call India's free 24/7 Tele-MANAS helpline on 14416 or 1800-891-4416, or contact emergency services immediately.";

export const AREAS_SERVED_STRUCTURED = [
  { "@type": "City", name: "Pune", containedInPlace: { "@type": "AdministrativeArea", name: "Maharashtra" } },
  { "@type": "AdministrativeArea", name: "Deccan Gymkhana, Pune" },
  { "@type": "AdministrativeArea", name: "Prabhat Road, Pune" },
  { "@type": "AdministrativeArea", name: "Erandwane, Pune" },
  { "@type": "AdministrativeArea", name: "Shivaji Nagar, Pune" },
  { "@type": "AdministrativeArea", name: "Law College Road, Pune" },
  { "@type": "AdministrativeArea", name: "Bhandarkar Road, Pune" },
  { "@type": "AdministrativeArea", name: "FC Road, Pune" },
  { "@type": "AdministrativeArea", name: "Model Colony, Pune" },
  { "@type": "AdministrativeArea", name: "Kothrud, Pune" },
  { "@type": "AdministrativeArea", name: "Aundh, Pune" },
  { "@type": "AdministrativeArea", name: "Baner, Pune" },
  { "@type": "AdministrativeArea", name: "Karve Nagar, Pune" },
  { "@type": "AdministrativeArea", name: "Koregaon Park, Pune" },
  { "@type": "AdministrativeArea", name: "Viman Nagar, Pune" },
  { "@type": "AdministrativeArea", name: "Kalyani Nagar, Pune" },
  { "@type": "AdministrativeArea", name: "Wakad, Pune" },
  { "@type": "AdministrativeArea", name: "Hinjewadi, Pune" },
  { "@type": "Country", name: "India" },
];

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: BRAND_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 1024,
    height: 1024,
  },
  image: OG_IMAGE_URL,
  description:
    "Being You Path is a psychological counselling and therapy practice located near Prabhat Road in Deccan Gymkhana, Pune, offering in-person and online counselling across India.",
  email: EMAIL_PRIMARY,
  telephone: PHONE_PRIMARY,
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC_STREET,
    addressLocality: CLINIC_LOCALITY,
    addressRegion: CLINIC_REGION,
    postalCode: CLINIC_POSTAL_CODE,
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: PHONE_PRIMARY,
      contactType: "customer service",
      areaServed: "IN",
      // TODO: [my languages] Add additional confirmed spoken/session languages once supplied.
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      telephone: PHONE_SECONDARY,
      contactType: "customer service",
      areaServed: "IN",
      // TODO: [my languages] Add additional confirmed spoken/session languages once supplied.
      availableLanguage: ["English"],
    },
  ],
  founder: [
    { "@id": `${SITE_URL}/about#imran-hussain` },
    { "@id": `${SITE_URL}/about#tejaswini-joshi` },
  ],
  sameAs: SOCIAL_PROFILES,
};

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#localbusiness`,
  name: BRAND_NAME,
  url: SITE_URL,
  image: OG_IMAGE_URL,
  logo: LOGO_URL,
  description:
    "Psychologist and counselling centre near Prabhat Road, Deccan Gymkhana, Pune. Offering CBT, stress, anxiety, burnout, self-esteem, career, and online counselling.",
  telephone: [PHONE_PRIMARY, PHONE_SECONDARY],
  email: EMAIL_PRIMARY,
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC_STREET,
    addressLocality: CLINIC_LOCALITY,
    addressRegion: CLINIC_REGION,
    postalCode: CLINIC_POSTAL_CODE,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: CLINIC_GEO.latitude,
    longitude: CLINIC_GEO.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "21:00",
    },
  ],
  areaServed: AREAS_SERVED_STRUCTURED,
  hasMap: GOOGLE_MAPS_URL,
  sameAs: SOCIAL_PROFILES,
};

export const IMRAN_PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#imran-hussain`,
  name: "Imran Hussain",
  jobTitle: "Co-Founder, Psychologist and CBT practitioner",
  description:
    "Psychologist with clinical training at NIMHANS and CBT practitioner offering evidence-based counselling, mindfulness-based stress reduction, and anxiety support in Pune and online.",
  image: `${SITE_URL}/images/imran-hussain.webp`,
  url: `${SITE_URL}/about`,
  worksFor: { "@id": `${SITE_URL}/#organization` },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "NIMHANS (National Institute of Mental Health and Neuro Sciences)",
  },
  knowsAbout: [
    "Cognitive Behavioral Therapy (CBT)",
    "Anxiety and Stress Management",
    "Burnout Recovery",
    "Secular Mindfulness",
    "Breathwork and Nervous System Regulation",
  ],
};

export const TEJASWINI_PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#tejaswini-joshi`,
  name: "Tejaswini Joshi",
  jobTitle: "Co-Founder & Counselling Psychologist",
  description:
    "Counselling psychologist, LSE-certified Learning & Development specialist supporting self-esteem, emotional intelligence, workplace stress, and career clarity.",
  image: `${SITE_URL}/images/tejaswini-joshi.webp`,
  url: `${SITE_URL}/about`,
  worksFor: { "@id": `${SITE_URL}/#organization` },
  alumniOf: [
    { "@type": "EducationalOrganization", name: "Jnana Prabodhini" },
    { "@type": "EducationalOrganization", name: "London School of Economics and Political Science (LSE)" },
  ],
  knowsAbout: [
    "Counselling Psychology",
    "Self-Esteem Therapy",
    "Workplace Mental Health and Burnout",
    "Career Counselling",
    "Learning and Development",
  ],
};

export function buildServiceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name,
    description,
    serviceType,
    url: `${SITE_URL}${path}`,
    provider: { "@id": `${SITE_URL}/#localbusiness` },
    areaServed: AREAS_SERVED_STRUCTURED,
    availableChannel: [
      {
        "@type": "ServiceChannel",
        serviceLocation: {
          "@type": "Place",
          name: "Being You Path Clinic — Deccan Gymkhana, Pune",
          address: {
            "@type": "PostalAddress",
            streetAddress: CLINIC_STREET,
            addressLocality: CLINIC_LOCALITY,
            addressRegion: CLINIC_REGION,
            postalCode: CLINIC_POSTAL_CODE,
            addressCountry: "IN",
          },
        },
      },
      {
        "@type": "ServiceChannel",
        serviceUrl: CALENDLY_URL,
      },
    ],
  };
}

export function buildArticleSchema({
  title,
  description,
  path,
  authorName,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  authorName: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${path}`,
    },
    image: OG_IMAGE_URL,
    author: {
      "@type": "Person",
      name: authorName,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    inLanguage: "en-IN",
  };
}
