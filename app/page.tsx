/**
 * [TOTAL RECONSTRUCTION] PNA Company Main Landing Page
 * [Architecture] Strategic Section Hierarchy for B2B Tech Agency
 * [Design] High-End, Rhythmic, Data-Driven
 * [GEO] SEO-Optimized with JSON-LD
 */

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HeroSectionFinal } from '@/components/landing/HeroSectionFinal';
import { ProblemsSection } from '@/components/landing/ProblemsSection';
import { getAllPosts } from '@/lib/api';

// Performance: 초기 뷰포트 밖의 섹션들을 lazy load
const AwardMetricsUnified = dynamic(() => import('@/components/landing/AwardMetricsUnified').then(mod => mod.AwardMetricsUnified));
const ServicesAlternate = dynamic(() => import('@/components/landing/ServicesAlternate').then(mod => mod.ServicesAlternate));
const PhilosophyList = dynamic(() => import('@/components/landing/PhilosophyList').then(mod => mod.PhilosophyList));
const CEOSection = dynamic(() => import('@/components/landing/CEOSection').then(mod => mod.CEOSection));
const InsightsSection = dynamic(() => import('@/components/landing/InsightsSection').then(mod => mod.InsightsSection));
const FAQSection = dynamic(() => import('@/components/landing/FAQSection').then(mod => mod.FAQSection));
const CTASection = dynamic(() => import('@/components/landing/CTASection').then(mod => mod.CTASection));

// ============================================
// [GEO] JSON-LD Structured Data
// ============================================
function generateJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pnamarketing.co.kr';
  
  // [Security] env.ts에서 필수 검증 - env 없으면 빌드 실패
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL!; // Non-null assertion (env.ts 검증됨)
  
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
          "telephone": "+82-70-7733-7905",
          "email": contactEmail,
          "contactType": "Customer Service",
          "areaServed": "KR",
          "availableLanguage": ["Korean"]
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "백마로195, SK엠시티 상가동 2층 2120호",
          "addressLocality": "일산동구",
          "addressRegion": "고양시",
          "addressCountry": "KR"
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
  title: '구글 광고 대행사 피앤에이컴퍼니 | TOP 1%가 증명하는 성과 마케팅',
  description: '15년 실전 데이터로 무장한 구글 공식 파트너. ROAS 500%를 지향하는 전략적 구글 광고 대행, SEO/GEO 최적화, 워드프레스 제작 전문. 데이터로 귀사의 성장을 증명합니다.',
  keywords: ['구글애즈', 'Google Ads', '구글 광고 대행', 'SEO', 'GEO', '퍼포먼스 마케팅', 'GA4', '데이터 분석', 'Google TOP 100'],
  openGraph: {
    title: '구글 광고 대행사 피앤에이컴퍼니 | TOP 1%가 증명하는 성과',
    description: '15년 실전 데이터로 무장한 구글 공식 파트너 | ROAS 500% 지향',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://pnamarketing.co.kr',
    siteName: '피앤에이컴퍼니',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: '피앤에이컴퍼니 - 구글 광고 대행사 | 평균 ROAS 500% 달성',
      },
    ],
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
// [MAIN] Homepage - Strategic Layout
// ============================================
export default async function HomePage() {
  const jsonLd = generateJsonLd();
  
  // Fetch latest posts from WordPress
  let posts = await getAllPosts();

  return (
    <>
      {/* [GEO] JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 📐 Strategic Content Hierarchy */}
      <main className="relative">
        {/* Sticky Container - Limits sticky effect scope */}
        <div className="relative" style={{ height: '200vh' }}>
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* SECTION 1: HERO - Performance Architecture                    */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <HeroSectionFinal />
        </div>

        {/* Content Container - Overlays hero */}
        <div className="relative -mt-[100vh]">
          
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* SECTION 2: PROBLEMS - Structural Issues (Sticky Title)        */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <ProblemsSection />

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* SECTION 3: Unified Award + Metrics + Clients Card              */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="py-20 md:pt-12 md:pb-32 relative z-10">
            <div className="section-container">
              <AwardMetricsUnified />
            </div>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* SECTION 4: SERVICES - Alternating Layout                      */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <ServicesAlternate />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 4: PHILOSOPHY - How We Work (Simple List)             */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <PhilosophyList />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 5: CEO - Expert Leadership                            */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <CEOSection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 6: INSIGHTS - Thought Leadership                      */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <InsightsSection posts={posts} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 7: FAQ - Objection Handling (Minimalist Accordion)    */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <FAQSection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 8: CONTACT - Conversion (Split Panel)                 */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <CTASection />
        </div>
      </main>
    </>
  );
}
