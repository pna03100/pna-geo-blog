/**
 * [Trinity Standard] PNA Company Main Landing Page
 * [Design] Clean, Professional, High-Performance
 * [GEO] SEO-Optimized with JSON-LD
 */

import type { Metadata } from 'next';
import { GridBackground } from '@/components/ui/grid-background';
import { HeroSection } from '@/components/landing/HeroSection';
import { VelocityScrollBanner } from '@/components/ui/velocity-scroll-banner';
import { MetricsSection } from '@/components/landing/MetricsSection';
import { BentoSection } from '@/components/landing/BentoSection';
import { ExpertiseSection } from '@/components/landing/ExpertiseSection';
import { CTASection } from '@/components/landing/CTASection';

// ============================================
// [GEO] JSON-LD Structured Data
// ============================================
function generateJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pnamarketing.co.kr';
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "피앤에이컴퍼니",
        "alternateName": "PNA Company",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`,
        },
        "description": "데이터 기반 성과 마케팅 전문 - Google Ads, SEO, GEO 최적화로 ROI 200% 달성",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "pna0310@naver.com",
          "contactType": "Customer Service",
          "areaServed": "KR",
          "availableLanguage": ["Korean"]
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "피앤에이컴퍼니",
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#service`,
        "name": "Google Ads 광고 대행 서비스",
        "provider": {
          "@id": `${baseUrl}/#organization`
        },
        "areaServed": "KR",
        "serviceType": ["Google Ads", "SEO", "GEO", "WordPress", "Performance Marketing"],
      },
    ]
  };
}

// ============================================
// [GEO] Dynamic Metadata
// ============================================
export const metadata: Metadata = {
  title: '구글애즈 광고 대행사 피앤에이컴퍼니 | 데이터로 증명하는 성과',
  description: 'Google 공식 파트너 | 평균 ROAS 500% | GA4 정밀 분석 | SEO & GEO 최적화 | 15년 실전 경험으로 증명된 데이터 기반 성과 마케팅',
  keywords: ['구글애즈', 'Google Ads', '구글 광고 대행', 'SEO', 'GEO', '퍼포먼스 마케팅', 'GA4', '데이터 분석'],
  openGraph: {
    title: '피앤에이컴퍼니 - 구글 광고 대행사',
    description: 'Google 공식 파트너 | 평균 ROAS 500% 달성',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://pnamarketing.co.kr',
    siteName: '피앤에이컴퍼니',
  },
  twitter: {
    card: 'summary_large_image',
    title: '피앤에이컴퍼니 - 구글 광고 대행사',
    description: 'Google 공식 파트너 | 평균 ROAS 500% 달성',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ============================================
// [Main] Homepage Implementation
// ============================================
export default function HomePage() {
  const jsonLd = generateJsonLd();

  return (
    <>
      {/* [GEO] JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Grid Background */}
      <GridBackground />

      {/* Main Content */}
      <main className="relative">
        <HeroSection />
        <VelocityScrollBanner />
        <MetricsSection />
        <BentoSection />
        <ExpertiseSection />
        <CTASection />
      </main>
    </>
  );
}
