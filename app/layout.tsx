// ============================================
// [Implementation] Root Layout (App Router)
// Trinity Core: Type-Safe Server Component
// ============================================

export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getPrimaryMenu } from '@/lib/api';
import { MenuItem } from '@/lib/types';
import Link from 'next/link';

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
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // [Security] Type-Safe Menu Loading
  let menuItems: MenuItem[] = [];

  try {
    menuItems = await getPrimaryMenu();
  } catch (error) {
    console.error('메뉴 로드 실패 (Layout):', error);
    menuItems = [];
  }

  return (
    <html lang="ko">
      <body className={inter.className}>
        {/* [GEO] Header with Semantic HTML */}
        <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
            <Link 
              href="/" 
              className="text-xl md:text-2xl font-bold text-slate-900 hover:text-purple-600 transition-colors"
            >
              피앤에이컴퍼니
            </Link>
            <ul className="flex gap-4 md:gap-6">
              {menuItems && menuItems.length > 0 ? (
                menuItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.path || item.url || '/'}
                      className="text-sm md:text-base text-slate-700 hover:text-purple-600 font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-slate-400 text-sm">메뉴 로딩 중...</li>
              )}
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        {/* [GEO] Footer with Company Info */}
        <footer className="border-t border-slate-200 bg-slate-50 py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Company Info */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">피앤에이컴퍼니</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  데이터 기반 성과 마케팅 전문<br />
                  Google Ads · SEO · GEO 최적화
                </p>
              </div>
              
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">빠른 링크</h3>
                <ul className="space-y-2">
                  {menuItems.slice(0, 4).map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.path || item.url || '/'}
                        className="text-sm text-slate-600 hover:text-purple-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Contact */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">문의</h3>
                <p className="text-sm text-slate-600">
                  Email: contact@pnamarketing.co.kr
                </p>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="border-t border-slate-200 pt-8 text-center">
              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} 피앤에이컴퍼니. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

