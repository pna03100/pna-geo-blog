/**
 * [TOTAL RECONSTRUCTION] PNA Company Main Landing Page
 * [Architecture] Strategic Section Hierarchy for B2B Tech Agency
 * [Design] High-End, Rhythmic, Data-Driven
 * [GEO] SEO-Optimized with JSON-LD
 */

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import './styles/home-animations.css';

// [Performance] ISR - 1시간마다 재생성
export const revalidate = 3600;
import { HeroSectionFinal } from '@/components/landing/HeroSectionFinal';
import { getAllPosts } from '@/lib/api';

// Performance: 초기 뷰포트 밖의 섹션들을 lazy load
const ProblemsSection = dynamic(() => import('@/components/landing/ProblemsSection').then(mod => mod.ProblemsSection));
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

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@pnamarketing.co.kr';

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
        "sameAs": [
          "https://www.threads.com/@since_1985_love"
        ],
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
      {
        "@type": "Person",
        "@id": `${baseUrl}/#ceo`,
        "name": "안태민",
        "jobTitle": "대표이사 / Google Ads 전문가",
        "worksFor": { "@id": `${baseUrl}/#organization` },
        "knowsAbout": ["Google Ads", "SEO", "GEO", "퍼포먼스 마케팅", "데이터 분석"],
        "description": "15년 실전 경력의 디지털 마케팅 전문가. Google TOP 100 캠페인 선정.",
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        "url": baseUrl,
        "name": "구글 광고 대행사 피앤에이컴퍼니 | 데이터 & GEO 마케팅",
        "isPartOf": { "@id": `${baseUrl}/#website` },
        "about": { "@id": `${baseUrl}/#organization` },
        "description": "15년 실전 데이터로 무장한 구글 공식 파트너. ROAS 500%를 지향하는 전략적 구글 광고 대행, SEO/GEO 최적화, 워드프레스 제작 전문.",
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${baseUrl}/#navigation`,
        "name": "메인 네비게이션",
        "hasPart": [
          { "@type": "WebPage", "name": "회사소개", "url": `${baseUrl}/about` },
          { "@type": "WebPage", "name": "구글 애즈 광고 대행", "url": `${baseUrl}/google-ads` },
          { "@type": "WebPage", "name": "SEO & GEO 최적화", "url": `${baseUrl}/seo-geo` },
          { "@type": "WebPage", "name": "워드프레스 제작", "url": `${baseUrl}/wordpress` },
          { "@type": "WebPage", "name": "퍼포먼스 마케팅", "url": `${baseUrl}/performance` },
          { "@type": "WebPage", "name": "마케팅 인사이트", "url": `${baseUrl}/insights` },
          { "@type": "WebPage", "name": "프로젝트 문의", "url": `${baseUrl}/contact` },
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "피앤에이컴퍼니의 차별점은 무엇인가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "15년 실전 경험과 구글 TOP 100 선정 이력이 증명하는 전문성입니다. 담당자가 수시로 바뀌지 않는 전문가 직접 관리 시스템을 지향합니다. 영업 사원이 아닌 15년 차 전문가가 귀사의 비즈니스 본질에 집중한 전략을 직접 리딩합니다."
            }
          },
          {
            "@type": "Question",
            "name": "SEO와 GEO 전략은 어떻게 진행되나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "기존 검색 결과 상위 노출(SEO)과 AI 검색 결과(GEO)를 동시에 분석하여, 브랜드가 최상단에 노출될 수 있는 시맨틱 구조를 설계합니다. Gemini AI와 Google 검색 엔진 모두에서 상위 노출되는 통합 전략을 제공합니다."
            }
          },
          {
            "@type": "Question",
            "name": "대행 비용과 계약 방식이 궁금합니다.",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "투명한 수수료 체계를 지향하며, 비즈니스 규모와 목표에 최적화된 맞춤형 견적을 제안드립니다. 월 광고비의 15~20%로 책정되며, 초기 셋업 비용은 별도 협의 가능합니다. 무료 성과 진단을 통해 정확한 견적을 받아보세요."
            }
          },
          {
            "@type": "Question",
            "name": "효율 개선 시점은 언제부터인가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "셋팅 직후부터 실시간 모니터링이 시작됩니다. 정교한 AI 학습 과정을 거쳐 점진적이고 지속적인 성과 향상을 도모합니다. 일반적으로 2~4주 내에 초기 최적화 효과가 나타나며, 3개월 후부터 안정적인 성과를 확인하실 수 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "성과 분석 리포트는 어떻게 제공되나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GA4 기반의 객관적 데이터를 바탕으로 분석 보고서를 제공하며, 대시보드를 통해 모든 지표를 투명하게 공유합니다. 주간 성과 요약과 월간 상세 리포트를 통해 캠페인 성과를 실시간으로 확인하실 수 있습니다."
            }
          }
        ]
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
