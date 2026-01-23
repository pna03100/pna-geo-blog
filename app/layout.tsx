// ============================================
// [Implementation] Root Layout (App Router)
// Trinity Core: Type-Safe Server Component
// ============================================

export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { Manrope, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { NavbarNew } from '@/components/ui/navbar-new';
import { FooterSection } from '@/components/landing/FooterSection';
import { HeroBackground } from '@/components/ui/hero-background';
import dynamicImport from 'next/dynamic';

// Performance: FloatingActions를 lazy load (초기 번들 크기 감소)
const FloatingActions = dynamicImport(
  () => import('@/components/insights/FloatingActions').then((mod) => mod.FloatingActions),
  { ssr: false } // 서버 사이드 렌더링 불필요
);

// 메인 폰트: Manrope (영문/숫자)
const manrope = Manrope({ 
  subsets: ['latin'], 
  variable: '--font-manrope',
  display: 'swap',
  preload: true,
});

// 포인트 폰트: Cormorant Garamond (세리프)
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

// ============================================
// [GEO] Metadata Configuration
// Trinity: SEO + Open Graph + Canonical URL
// ============================================
export const metadata: Metadata = {
  metadataBase: new URL('https://pnamarketing.co.kr'), // [중요] 기본 도메인 설정
  
  // [GEO 핵심] Title Template 설정
  title: {
    template: '%s | 피앤에이컴퍼니',
    default: '구글 광고 대행사 피앤에이컴퍼니 | 데이터 & GEO 마케팅',
  },
  
  description: '데이터 기반 성과 마케팅 전문 - Google Ads, SEO, GEO 최적화로 ROI 200% 달성',
  
  // [GEO 핵심] Canonical URL 설정
  // 모든 페이지가 자신의 주소를 'https://pnamarketing.co.kr/...'로 가리키게 함
  alternates: {
    canonical: './',
  },
  
  // [GEO] 검색 엔진 크롤링 허용
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
  
  // [GEO] Open Graph (소셜 미디어 공유)
  openGraph: {
    title: '구글 광고 대행사 피앤에이컴퍼니 | 데이터 & GEO 마케팅',
    description: '데이터 기반 성과 마케팅 전문 - Google Ads, SEO, GEO 최적화로 ROI 200% 달성',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://pnamarketing.co.kr',
    siteName: '피앤에이컴퍼니',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: '피앤에이컴퍼니 - 구글 광고 대행 전문 | 데이터 기반 성과 마케팅',
      },
    ],
  },
  
  // [GEO] Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: '구글 광고 대행사 피앤에이컴퍼니',
    description: '데이터 기반 성과 마케팅 전문',
  },
  
  // [GEO] 검증 태그 (Search Console)
  verification: {
    google: 'TMMrqXsSdFTx9VvORpwrCeJziGW-QQC4ukms0YfrNWo',
    other: {
      'naver-site-verification': '886fa3f3a57007c7718e21599f34db31b78116fd',
    },
  },
};

// ============================================
// [Implementation] Root Layout Component
// ============================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="ko">
      <head>
        {/* Pretendard 한글 폰트 - Preload 최적화 */}
        <link 
          rel="preload" 
          as="style" 
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" 
        />
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" 
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${manrope.variable} ${cormorant.variable} font-sans text-slate-950 bg-main`}>
        {/* [PNA] Pure White Background */}
        
        <NavbarNew />
        {children}
        <FloatingActions />
        <FooterSection />
      </body>
    </html>
  );
}

