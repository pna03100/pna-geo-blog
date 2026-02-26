// ============================================
// [AG-STANDARD 1단계] 사이트 정체성 정의
// 단일 설정 소스 (Single Source of Truth)
// ============================================

export const SITE_CONFIG = {
  // 도메인 & URL
  url: 'https://pnamarketing.co.kr',
  cmsUrl: 'https://cms.pnamarketing.co.kr',

  // 브랜드 정보
  name: '피앤에이컴퍼니',
  nameEn: 'PNA Company',
  description: '데이터 기반 성과 마케팅 전문 - Google Ads, SEO, GEO 최적화로 ROI 200% 달성',
  slogan: 'Data-Driven Growth Partner, PNA',

  // 연락처
  phone: '+82-70-7733-7905',
  address: {
    street: '백마로195, SK엠시티 상가동 2층 2120호',
    locality: '일산동구',
    region: '고양시',
    country: 'KR',
  },

  // 소셜 & 엔티티 연결 (sameAs)
  sameAs: [
    'https://www.threads.com/@since_1985_love',
  ],

  // 핵심 키워드 & 서비스
  keywords: ['구글애즈', 'Google Ads', '구글 광고 대행', 'SEO', 'GEO', '퍼포먼스 마케팅', 'GA4', '데이터 분석'],
  serviceTypes: ['Google Ads', 'SEO', 'GEO', 'WordPress', 'Performance Marketing'],

  // GEO 운영 모드
  geo: {
    areaServed: 'KR',
    locale: 'ko_KR',
    language: 'Korean',
  },

  // OG 이미지
  ogImage: {
    url: '/opengraph-image.png',
    width: 1200,
    height: 630,
    alt: '피앤에이컴퍼니 - 구글 광고 대행사 | 평균 ROAS 500% 달성',
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
