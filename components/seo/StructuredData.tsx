/**
 * [GEO] JSON-LD Structured Data Component
 * [Security] Type-Safe Schema Generation
 * [Design] Reusable Schema Builder
 */

import { FAQItem } from '@/lib/types';

// ============================================
// [Security] Interface for Schema Types
// ============================================

interface OrganizationSchema {
  type: 'Organization';
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactEmail?: string;
  sameAs?: string[];
}

interface ArticleSchema {
  type: 'Article';
  headline: string;
  description?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  publisher?: {
    name: string;
    logo: string;
  };
}

interface FAQSchema {
  type: 'FAQPage';
  questions: FAQItem[];
}

interface BreadcrumbSchema {
  type: 'BreadcrumbList';
  items: Array<{
    name: string;
    url: string;
  }>;
}

type SchemaType = OrganizationSchema | ArticleSchema | FAQSchema | BreadcrumbSchema;

interface StructuredDataProps {
  schema: SchemaType;
}

// ============================================
// [Implementation] Schema Generators
// ============================================

function generateOrganizationSchema(data: OrganizationSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    ...(data.logo && {
      logo: {
        '@type': 'ImageObject',
        url: data.logo,
      },
    }),
    ...(data.description && { description: data.description }),
    ...(data.contactEmail && {
      contactPoint: {
        '@type': 'ContactPoint',
        email: data.contactEmail,
        contactType: 'Customer Service',
      },
    }),
    ...(data.sameAs && { sameAs: data.sameAs }),
  };
}

function generateArticleSchema(data: ArticleSchema) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pnamarketing.co.kr';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    ...(data.description && { description: data.description }),
    ...(data.author && {
      author: {
        '@type': 'Person',
        name: data.author,
        jobTitle: '마케팅 전문가',
        worksFor: {
          '@type': 'Organization',
          name: '피앤에이컴퍼니',
        },
      },
    }),
    ...(data.datePublished && { datePublished: data.datePublished }),
    ...(data.dateModified && { dateModified: data.dateModified }),
    ...(data.image && { image: data.image }),
    publisher: data.publisher || {
      '@type': 'Organization',
      name: '피앤에이컴퍼니',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
  };
}

function generateFAQSchema(data: FAQSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.questions.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function generateBreadcrumbSchema(data: BreadcrumbSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: data.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ============================================
// [Implementation] StructuredData Component
// ============================================
export function StructuredData({ schema }: StructuredDataProps) {
  let jsonLd: Record<string, unknown> = {};

  switch (schema.type) {
    case 'Organization':
      jsonLd = generateOrganizationSchema(schema);
      break;
    case 'Article':
      jsonLd = generateArticleSchema(schema);
      break;
    case 'FAQPage':
      jsonLd = generateFAQSchema(schema);
      break;
    case 'BreadcrumbList':
      jsonLd = generateBreadcrumbSchema(schema);
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
