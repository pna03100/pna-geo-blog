/**
 * [TOTAL RECONSTRUCTION] PNA Company Main Landing Page
 * [Architecture] Strategic Section Hierarchy for B2B Tech Agency
 * [Design] High-End, Rhythmic, Data-Driven
 * [GEO] SEO-Optimized with JSON-LD
 */

import type { Metadata } from 'next';
import { HeroSection } from '@/components/landing/HeroSection';
import { MetricsSection } from '@/components/landing/MetricsSection';
import { BentoSection } from '@/components/landing/BentoSection';
import { PhilosophySection } from '@/components/landing/PhilosophySection';
import { ExpertiseSection } from '@/components/landing/ExpertiseSection';
import { LogoMarquee } from '@/components/ui/logo-marquee';
import { InsightsSection } from '@/components/landing/InsightsSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { ContactSection } from '@/components/sections/contact-section';
import { getAllPosts } from '@/lib/api';

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
      <main className="relative pt-16">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 1: HERO - The Hook & Authority                        */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <HeroSection />

        {/* Google Award Badge - Below Hero */}
        <section className="relative -mt-8 mb-16 md:mb-20">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl flex justify-center">
            <div className="inline-flex items-center gap-6 md:gap-8 px-10 md:px-16 py-8 md:py-12 rounded-3xl md:rounded-[2rem] bg-white border-2 border-blue-100 shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50">
                <span className="text-5xl md:text-7xl">🏆</span>
              </div>
              <div className="text-left">
                <p className="text-xl md:text-3xl font-bold text-slate-900 mb-2">2023 Google Top 100 Campaign</p>
                <p className="text-base md:text-lg text-slate-600">구글 공식 인증 우수 캠페인 선정</p>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 2: STATS - The Proof (Open Financial Layout)          */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <MetricsSection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 3: SERVICES - Core Offering (Asymmetrical Bento)      */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <BentoSection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 4: PHILOSOPHY - How We Work (Open Air)                */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <PhilosophySection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* SECTION 5: TRUST - Credibility (Glassmorphism + Marquee)      */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <ExpertiseSection />
        
        {/* 🎞️ Partners Section with Marquee */}
        <section className="relative py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            {/* Title */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3" style={{ lineHeight: '1.4' }}>
                주요 파트너사
              </h2>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                대한민국 대표 기업들과 함께합니다
              </p>
            </div>
          </div>
          
          {/* Logo Marquee */}
          <LogoMarquee />
        </section>

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
        <ContactSection />
      </main>
    </>
  );
}
