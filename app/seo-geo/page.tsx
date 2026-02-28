/**
 * [Page] SEO & GEO Service
 * Google Green Theme
 */

import { Metadata } from 'next';
import { SEOGEOClient } from './SEOGEOClient';

export const metadata: Metadata = {
  title: 'SEO & GEO 최적화 - 검색엔진·AI 검색 상위 노출 전략',
  description: '검색엔진과 AI 엔진 모두에서 상위 노출되는 SEO & GEO 전략. ChatGPT, Perplexity, Google 검색 노출 극대화. 기술 SEO부터 콘텐츠 최적화까지 통합 솔루션.',
  keywords: 'SEO, GEO, 검색엔진 최적화, Generative Engine Optimization, AI 검색, ChatGPT, Perplexity, 콘텐츠 마케팅',
  openGraph: {
    title: 'SEO & GEO 최적화 - 검색엔진·AI 검색 상위 노출 | 피앤에이컴퍼니',
    description: '검색엔진과 AI 엔진 모두에서 상위 노출되는 SEO & GEO 전략. ChatGPT, Perplexity, Google 검색 노출 극대화.',
    type: 'website',
  },
};

function generateJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pnamarketing.co.kr';

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${baseUrl}/seo-geo/#service`,
      "name": "SEO & GEO 최적화",
      "description": "검색엔진과 AI 엔진 모두에서 상위 노출되는 SEO & GEO 전략. ChatGPT, Perplexity, Google 검색 노출 극대화.",
      "provider": {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "피앤에이컴퍼니"
      },
      "areaServed": "KR",
      "serviceType": "SEO & GEO 최적화",
      "url": `${baseUrl}/seo-geo`
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "SEO와 GEO의 차이점은 무엇인가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SEO(Search Engine Optimization)는 Google, Naver 등 전통적인 검색 엔진에서 상위 노출을 목표로 합니다. GEO(Generative Engine Optimization)는 ChatGPT, Perplexity, Gemini 같은 AI 검색 엔진에서 Featured Answer로 선택되도록 콘텐츠를 최적화하는 차세대 전략입니다. 두 전략을 함께 적용하면 모든 검색 채널에서 우위를 점할 수 있습니다."
          }
        },
        {
          "@type": "Question",
          "name": "SEO 효과는 얼마나 빨리 나타나나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SEO는 중장기 전략으로, 초기 3~6개월은 기반 구축 기간입니다. 기술 SEO와 On-Page 최적화는 1~2개월 내 효과가 나타나지만, 본격적인 자연 검색 트래픽 증가는 6개월 이후부터 가속화됩니다. 단, 경쟁이 낮은 롱테일 키워드는 1~2개월 내에도 상위 노출이 가능합니다."
          }
        },
        {
          "@type": "Question",
          "name": "AI 검색 엔진(ChatGPT, Perplexity)에서 어떻게 상위 노출되나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI 검색은 RAG(Retrieval-Augmented Generation) 방식으로 작동합니다. ① 명확한 답변 구조(H1 직후 요약, FAQ), ② 권위 있는 출처와 데이터, ③ 구조화된 데이터(JSON-LD, Table), ④ 최신성(Freshness)이 핵심입니다. 사용자의 질문에 대한 직접적이고 구체적인 답변을 제공해야 AI가 우리 콘텐츠를 인용합니다."
          }
        },
        {
          "@type": "Question",
          "name": "SaaS 제품의 SEO는 일반 웹사이트와 무엇이 다른가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SaaS SEO는 Product-Led Growth 전략과 연동되어야 하며, Bottom-of-Funnel 키워드에 집중하고, Feature별 랜딩 페이지를 구축하며, Free Trial → Activation 전환율까지 추적해야 합니다. 단순 트래픽이 아닌 MQL → SQL 전환을 목표로 하며, CAC 대비 LTV를 최적화하는 것이 핵심입니다."
          }
        },
        {
          "@type": "Question",
          "name": "SEO 작업 후 순위 보장이 되나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "검색 엔진 알고리즘은 수백 가지 변수로 작동하며, 특정 순위를 법적으로 보장할 수는 없습니다. 하지만 체계적인 기술 SEO, 콘텐츠 최적화, 링크 빌딩을 통해 평균 200% 이상의 자연 검색 트래픽 증가를 경험하실 수 있습니다. 월간 리포트로 순위 변동과 트래픽 추이를 투명하게 공유드립니다."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": baseUrl },
        { "@type": "ListItem", "position": 2, "name": "SEO & GEO 최적화", "item": `${baseUrl}/seo-geo` }
      ]
    }
  ];
}

export default function SEOGEOPage() {
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
      <SEOGEOClient />
    </>
  );
}
