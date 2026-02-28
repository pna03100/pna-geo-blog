import { Metadata } from 'next';
import { AboutClient } from './AboutClient';

export const metadata: Metadata = {
  title: '회사소개 - 15년 데이터 마케팅 전문 디지털 에이전시',
  description: '데이터 기반 마케팅 전략과 AI 기술로 클라이언트의 성장을 이끄는 디지털 마케팅 전문 기업. Google 공식 파트너, 15년 실전 경험의 전문가 팀.',
  keywords: '피앤에이컴퍼니, PNA Company, 디지털 마케팅 에이전시, 구글 공식 파트너, 마케팅 대행사',
  openGraph: {
    title: '회사소개 - 15년 데이터 마케팅 전문 에이전시 | 피앤에이컴퍼니',
    description: '데이터 기반 마케팅 전략과 AI 기술로 클라이언트의 성장을 이끄는 디지털 마케팅 전문 기업.',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: '피앤에이컴퍼니 회사소개' }],
  },
};

function generateJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pnamarketing.co.kr';

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "피앤에이컴퍼니",
    "alternateName": "PNA Company",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo.png`
    },
    "description": "데이터 기반 마케팅 전략과 AI 기술로 클라이언트의 성장을 이끄는 디지털 마케팅 전문 기업",
    "foundingDate": "2011",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "경기 고양시 일산서구 킨텍스로 240",
      "addressLocality": "고양시",
      "addressRegion": "경기도",
      "addressCountry": "KR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+82-70-7733-7905",
      "contactType": "customer service",
      "availableLanguage": ["Korean", "English"]
    },
    "sameAs": [
      "https://www.threads.com/@since_1985_love"
    ]
  };
}

function generateBreadcrumb() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pnamarketing.co.kr';
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "회사소개", "item": `${baseUrl}/about` }
    ]
  };
}

export default function AboutPage() {
  const jsonLd = generateJsonLd();
  const breadcrumb = generateBreadcrumb();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <AboutClient />
    </>
  );
}
