import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  noindex?: boolean;
}
export function SEO({ title, description, keywords, url, noindex }: SEOProps) {
  const siteName = "Being You Path™ - Best Counselling Centre in India";
  const fullTitle = title.includes("Being You Path") ? title : `${title} | ${siteName}`;

  const defaultKeywords = "Being You Path best counselling centre in India, best counselling centre in India, best counselling centre India, top counselling centre in India, best psychologist in Pune, online counselling India, mental health support India, psychological counselling, CBT therapy, relationship counselling, anxiety counselling, corporate wellness";
  const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": ["CounselingService", "MedicalBusiness", "HealthAndBeautyBusiness"],
    "name": "Being You Path™ - Best Counselling Centre in India",
    "alternateName": ["Being You Path Counselling Centre", "Being You Path Pune"],
    "slogan": "Best Counselling Centre in India",
    "description": description || "Being You Path is recognized as the best counselling centre in India, blending modern psychology, CBT, secular mindfulness, and holistic well-being.",
    "url": "https://www.beingyoupath.com",
    "telephone": "+917387772573", 
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "India"
      },
      {
        "@type": "City",
        "name": "Pune"
      }
    ],
    "serviceType": [
      "Individual Psychological Counselling",
      "Online Therapy & Counselling India",
      "Stress & Anxiety Management",
      "Student Resilience & Focus Coaching",
      "Corporate Mental Health & Wellness Workshops",
      "Cognitive Behavioral Therapy (CBT)",
      "Couples & Relationship Counselling"
    ],
    "sameAs": [
      "https://www.instagram.com/beingyoupathoffical",
      "https://www.linkedin.com/company/beingyou-path-9965b1389/",
      "https://www.facebook.com/profile.php?id=61590091544601",
      "https://www.reddit.com/u/Beingyoupath/s/PcquEhRTpM",
      "https://youtube.com/@beingyoupath",
      "https://x.com/BeingyouP84126",
      "https://share.google/bQZJdmxPTbKo8iwKM"
    ]
  };

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const canonicalUrl = url || `https://www.beingyoupath.com${currentPath}`;

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      
      {/* Schema.org for Search Engine Indexing */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}
