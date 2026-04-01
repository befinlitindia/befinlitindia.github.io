import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    path: string;
    type?: 'website' | 'article';
    jsonLd?: Record<string, any>;
}

const SITE_URL = 'https://befinlit.in';
const SITE_NAME = 'BeFinLit India';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`; // Ensure this exists in /public

const SEO: React.FC<SEOProps> = ({ title, description, path, type = 'website', jsonLd }) => {
    const canonicalUrl = `${SITE_URL}${path}`;
    const fullTitle = path === '/' ? `${SITE_NAME} - Financial Literacy, Simplified` : `${title} | ${SITE_NAME}`;

    const defaultJsonLd = {
        '@context': 'https://schema.org',
        '@type': type === 'article' ? 'Article' : 'WebPage',
        name: title,
        description,
        url: canonicalUrl,
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
        },
    };

    const structuredData = jsonLd || defaultJsonLd;

    return (
        <Helmet>
            {/* Primary Meta */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={DEFAULT_IMAGE} />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={DEFAULT_IMAGE} />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

export default SEO;
