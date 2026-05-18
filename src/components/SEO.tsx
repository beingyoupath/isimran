import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  noindex?: boolean;
}

export function SEO({ title, description, keywords, url, noindex }: SEOProps) {
  const siteName = "Being You Path™";
  const fullTitle = `${title} | ${siteName}`;

  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Being You Path™",
    "description": "Holistic well-being practice blending psychology, secular mindfulness, and ancient wisdom.",
    "url": "https://www.beingyoupath.com",
    "telephone": "+917387772573", 
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.instagram.com/beingyoupath",
      "https://www.linkedin.com/company/beingyoupath"
    ]
  };

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const canonicalUrl = url || `https://www.beingyoupath.com${currentPath}`;

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
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
      
      {/* Schema.org for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}
