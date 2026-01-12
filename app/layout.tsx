// ============================================
// [Implementation] Root Layout (App Router)
// Trinity Core: Type-Safe Server Component
// ============================================

export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
  },
  
  // [GEO] Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: '구글 광고 대행사 피앤에이컴퍼니',
    description: '데이터 기반 성과 마케팅 전문',
  },
  
  // [GEO] 검증 태그 (필요시 추가)
  verification: {
    // google: 'your-google-site-verification-code',
    // naver: 'your-naver-site-verification-code',
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
      <body className={`${inter.className} bg-slate-50 text-slate-950`}>
        {children}
      </body>
    </html>
  );
}

