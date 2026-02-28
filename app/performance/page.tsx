import type { Metadata } from "next";
import { PerformanceClient } from "./PerformanceClient";

export const metadata: Metadata = {
  title: "퍼포먼스 마케팅 - 데이터 기반 광고 최적화·ROAS 500%",
  description: "데이터로 증명하는 광고 성과. 평균 ROAS 500%를 달성하는 퍼포먼스 마케팅 전문 대행사. Google Ads, Meta 등 멀티 채널 통합 최적화.",
  keywords: "퍼포먼스 마케팅, ROAS 최적화, 광고 대행, 구글 애즈, 성과 마케팅, 광고 최적화, CPA",
  openGraph: {
    title: "퍼포먼스 마케팅 - 데이터 기반 광고 최적화·ROAS 500% | 피앤에이컴퍼니",
    description: "데이터로 증명하는 광고 성과. 평균 ROAS 500%를 달성하는 퍼포먼스 마케팅 전문 대행사.",
    type: "website",
  },
};

function generateJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pnamarketing.co.kr";

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${baseUrl}/performance/#service`,
      "name": "퍼포먼스 마케팅",
      "description": "데이터로 증명하는 광고 성과. 평균 ROAS 500%를 달성하는 퍼포먼스 마케팅 전문 대행사.",
      "provider": {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "피앤에이컴퍼니"
      },
      "areaServed": "KR",
      "serviceType": "퍼포먼스 마케팅",
      "url": `${baseUrl}/performance`
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "퍼포먼스 마케팅이 일반 브랜드 마케팅과 다른 점은 무엇인가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "퍼포먼스 마케팅은 클릭, 전환, 매출 등 측정 가능한 성과에 초점을 맞춥니다. 모든 광고비 지출이 데이터로 추적되며, ROAS, CPA 등의 지표로 실시간 효율을 평가합니다. 브랜드 마케팅이 인지도 향상을 목표로 한다면, 퍼포먼스 마케팅은 즉각적인 비즈니스 성과를 목표로 합니다."
          }
        },
        {
          "@type": "Question",
          "name": "ROAS 500%는 모든 업종에서 달성 가능한가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "업종, 경쟁 강도, 제품 마진에 따라 차이가 있습니다. 고마진 상품이나 재구매율이 높은 업종은 더 높은 ROAS를 달성하기 쉽습니다. 500%는 저희 평균 수치이며, 일부 고객사는 1000% 이상도 달성하셨습니다. 초기 3개월은 데이터 수집 및 최적화 기간으로, 이후 본격적인 성과가 나타납니다."
          }
        },
        {
          "@type": "Question",
          "name": "광고 채널은 어떻게 선택하나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "비즈니스 목표, 타겟 고객, 예산을 분석하여 최적의 채널을 제안합니다. Google Ads는 검색 의도가 명확한 고객에게, Meta(Facebook/Instagram)는 시각적 소구가 중요한 제품에, 네이버는 국내 중장년층 타겟에 효과적입니다. 보통 2~3개 채널을 조합하여 시너지를 냅니다."
          }
        },
        {
          "@type": "Question",
          "name": "랜딩페이지도 함께 제작해주시나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "네, 전환율 최적화(CRO)를 위한 랜딩페이지 제작이 가능합니다. 광고 메시지와 일관된 디자인, 명확한 CTA, 빠른 로딩 속도로 설계하며, A/B 테스트를 통해 지속적으로 개선합니다. 기존 웹사이트가 있다면 분석 후 개선 방안도 제안드립니다."
          }
        },
        {
          "@type": "Question",
          "name": "성과가 나지 않으면 어떻게 하나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "초기 1개월은 학습 기간으로, 이 기간 동안 데이터를 수집하며 최적화합니다. 2~3개월 내 목표 성과가 나지 않으면 캠페인 구조, 타겟팅, 크리에이티브, 랜딩페이지 등을 전면 재검토합니다. 투명한 데이터 공유와 개선 방향 제시로 함께 해결책을 찾습니다."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": baseUrl },
        { "@type": "ListItem", "position": 2, "name": "퍼포먼스 마케팅", "item": `${baseUrl}/performance` }
      ]
    }
  ];
}

export default function PerformancePage() {
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
      <PerformanceClient />
    </>
  );
}
