/**
 * [Page] Google Ads Service
 * Premium Blue Theme matching Main Page
 */

import { Metadata } from 'next';
import { GoogleAdsClient } from './GoogleAdsClient';

export const metadata: Metadata = {
  title: '구글 애즈(Google Ads) 광고 대행 - 공식 파트너 ROAS 500%',
  description: 'Google 공식 파트너가 직접 관리하는 프리미엄 구글 애즈 광고 대행 서비스. 평균 ROAS 500% 달성. 데이터 기반 캠페인 최적화로 광고비 효율을 극대화합니다.',
  keywords: '구글 애즈, Google Ads, 구글 광고 대행, 구글 광고 대행사, ROAS, 검색 광고, 디스플레이 광고, 리마케팅',
  openGraph: {
    title: '구글 애즈(Google Ads) 광고 대행 - 공식 파트너 | 피앤에이컴퍼니',
    description: 'Google 공식 파트너가 직접 관리하는 프리미엄 구글 애즈 광고 대행. 평균 ROAS 500% 달성.',
    type: 'website',
  },
};

function generateJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pnamarketing.co.kr';

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${baseUrl}/google-ads/#service`,
      "name": "구글 애즈 광고 대행",
      "description": "Google 공식 파트너가 직접 관리하는 프리미엄 구글 애즈 광고 대행 서비스. 평균 ROAS 500% 달성.",
      "provider": {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "피앤에이컴퍼니"
      },
      "areaServed": "KR",
      "serviceType": "Google Ads 광고 대행",
      "url": `${baseUrl}/google-ads`
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "광고비는 최소 얼마부터 시작해야 하나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "최소 월 200만원부터 시작 가능하며, 중소기업은 월 500~1,500만원을 권장합니다. 광고비가 너무 적으면 충분한 데이터를 확보하기 어렵고, Google AI 학습에 시간이 오래 걸립니다. 업종과 경쟁 강도에 따라 권장 예산이 다르므로, 무료 진단을 통해 최적 예산을 안내해드립니다."
          }
        },
        {
          "@type": "Question",
          "name": "ROAS는 어느 정도 나올까요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "업종과 제품에 따라 다르지만, 이커머스는 평균 ROAS 1:4~1:8, B2B SaaS는 리드당 비용(CPL) 기준으로 측정합니다. 실제 사례로 뷰티 이커머스는 ROAS 1:8.3, 피부과는 예약당 6,250원을 달성했습니다. 초기 1~2개월은 학습 기간이며, 3개월 이후부터 안정적인 성과가 나타납니다."
          }
        },
        {
          "@type": "Question",
          "name": "Google Ads와 네이버 광고, 어떤 게 더 좋나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Google Ads는 글로벌 도달과 AI 최적화가 강점이며, 검색 의도 기반 정확한 타겟팅이 가능합니다. 네이버는 한국 시장에 특화되어 있으나 CPC가 높고 AI 기능이 제한적입니다. 일반적으로 이커머스와 B2B는 Google Ads가, 로컬 비즈니스는 두 플랫폼을 병행하는 것이 효과적입니다."
          }
        },
        {
          "@type": "Question",
          "name": "광고 효과는 얼마나 빨리 나타나나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "광고 집행 즉시 노출되지만, 본격적인 성과는 1개월 후부터 나타납니다. 초기 1~2주는 Google AI가 데이터를 학습하는 기간으로, 클릭과 전환 패턴을 분석합니다. 3개월 차부터 ROAS가 안정화되며, 6개월 이후 최적 효율에 도달합니다."
          }
        },
        {
          "@type": "Question",
          "name": "광고 계정과 데이터는 누가 소유하나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "광고 계정은 100% 고객님 소유이며, 저희는 관리 권한만 부여받습니다. 모든 광고비는 고객님의 Google Ads 계정으로 직접 결제되며, 계약 종료 시에도 계정과 모든 데이터가 그대로 유지됩니다. 투명한 리포팅을 위해 고객님께 계정 접근 권한을 100% 제공합니다."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": baseUrl },
        { "@type": "ListItem", "position": 2, "name": "구글 애즈 광고 대행", "item": `${baseUrl}/google-ads` }
      ]
    }
  ];
}

export default function GoogleAdsPage() {
  const jsonLd = generateJsonLd();

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <GoogleAdsClient />
    </>
  );
}
