/**
 * [Page] Contact - 프로젝트 문의
 * [Design] Clean Tech Style with Contact Form
 */

import { Metadata } from 'next';
import { ContactSection } from '@/components/sections/contact-section';

// ============================================
// [GEO] Metadata
// ============================================
export const metadata: Metadata = {
  title: '프로젝트 문의 - 무료 상담·24시간 내 회신',
  description: '성장을 위한 파트너, 피앤에이컴퍼니입니다. 문의 남겨주시면 담당자가 24시간 이내에 연락드립니다. Google Ads, SEO, 워드프레스 제작 무료 상담.',
  keywords: '마케팅 상담, 광고 대행 문의, 무료 상담, 프로젝트 문의, 피앤에이컴퍼니 연락처',
  openGraph: {
    title: '프로젝트 문의 - 무료 상담·24시간 내 회신 | 피앤에이컴퍼니',
    description: '성장을 위한 파트너, 피앤에이컴퍼니입니다. Google Ads, SEO, 워드프레스 제작 무료 상담.',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: '피앤에이컴퍼니 프로젝트 문의' }],
  },
};

function generateJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pnamarketing.co.kr';

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "프로젝트 문의 - 피앤에이컴퍼니",
    "description": "Google Ads, SEO, GEO, 워드프레스 제작 무료 상담. 24시간 이내 회신.",
    "url": `${baseUrl}/contact`,
    "mainEntity": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": "피앤에이컴퍼니",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+82-70-7733-7905",
        "email": "contact@pnamarketing.co.kr",
        "contactType": "customer service",
        "availableLanguage": ["Korean", "English"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      }
    }
  };
}

function generateBreadcrumb() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pnamarketing.co.kr';
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "프로젝트 문의", "item": `${baseUrl}/contact` }
    ]
  };
}

// ============================================
// [Component] Contact Page
// ============================================
export default function ContactPage() {
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
      <main className="relative min-h-screen pt-16">
        <ContactSection />
      </main>
    </>
  );
}
