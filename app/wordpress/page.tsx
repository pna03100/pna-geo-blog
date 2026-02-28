import type { Metadata } from "next";
import { WordPressClient } from "./WordPressClient";

export const metadata: Metadata = {
  title: "워드프레스 홈페이지 제작 - 반응형 웹사이트·SEO 최적화",
  description: "비즈니스 성장을 위한 프리미엄 워드프레스 웹사이트 제작. 빠른 속도, 보안, 관리 편의성을 모두 갖춘 반응형 맞춤형 솔루션. SEO 최적화 기본 포함.",
  keywords: "워드프레스, 워드프레스 제작, 웹사이트 제작, 홈페이지 제작, 반응형 웹, CMS, 워드프레스 호스팅",
  openGraph: {
    title: "워드프레스 홈페이지 제작 - 반응형·SEO 최적화 | 피앤에이컴퍼니",
    description: "비즈니스 성장을 위한 프리미엄 워드프레스 웹사이트 제작. 빠른 속도, 보안, SEO 최적화 기본 포함.",
    type: "website",
  },
};

function generateJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pnamarketing.co.kr";

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${baseUrl}/wordpress/#service`,
      "name": "워드프레스 웹사이트 제작",
      "description": "비즈니스 성장을 위한 프리미엄 워드프레스 웹사이트 제작. 빠른 속도, 보안, 관리 편의성을 모두 갖춘 맞춤형 솔루션.",
      "provider": {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "피앤에이컴퍼니"
      },
      "areaServed": "KR",
      "serviceType": "워드프레스 웹사이트 제작",
      "url": `${baseUrl}/wordpress`
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "워드프레스와 다른 CMS의 차이점은 무엇인가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "워드프레스는 전 세계 웹사이트의 43%가 사용하는 검증된 CMS로, 무료 오픈소스이며 확장성이 뛰어납니다. 풍부한 플러그인 생태계와 테마 옵션으로 커스터마이징이 자유롭고, SEO 최적화에 매우 유리합니다. 또한 개발자 커뮤니티가 방대하여 지속적인 업데이트와 보안 패치가 제공됩니다."
          }
        },
        {
          "@type": "Question",
          "name": "제작 후 직접 콘텐츠를 수정할 수 있나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "네, 가능합니다. 워드프레스는 직관적인 에디터(Gutenberg)를 제공하여 기술 지식 없이도 글 작성, 이미지 업로드, 페이지 수정이 가능합니다. 납품 시 관리자 교육을 제공하며, 매뉴얼 문서도 함께 전달드립니다. 평생 무료 기술 지원도 제공되어 언제든 문의 가능합니다."
          }
        },
        {
          "@type": "Question",
          "name": "반응형 디자인은 기본으로 포함되나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "네, 모든 웹사이트는 모바일, 태블릿, 데스크톱에서 완벽하게 작동하는 반응형 디자인으로 제작됩니다. Google의 Mobile-First Indexing 정책에 맞춰 모바일 환경을 우선 최적화하며, 다양한 디바이스에서 테스트를 거쳐 납품합니다."
          }
        },
        {
          "@type": "Question",
          "name": "보안은 어떻게 관리되나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "워드프레스 코어, 테마, 플러그인의 정기 업데이트, 보안 플러그인(Wordfence 등) 설치, SSL 인증서 적용, 정기 백업 시스템 구축을 진행합니다. 로그인 시도 제한, 관리자 계정 보호, 파일 권한 설정 등 OWASP 보안 기준에 따라 설정합니다."
          }
        },
        {
          "@type": "Question",
          "name": "제작 후 유지보수 비용은 얼마인가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "기본 유지보수(보안 업데이트, 백업, 기술 지원)는 평생 무료로 제공됩니다. 다만, 대규모 디자인 변경이나 신규 기능 추가는 별도 견적이 필요할 수 있습니다. 호스팅 비용은 월 1~3만원 수준이며, 트래픽에 따라 조정 가능합니다."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": baseUrl },
        { "@type": "ListItem", "position": 2, "name": "워드프레스 홈페이지 제작", "item": `${baseUrl}/wordpress` }
      ]
    }
  ];
}

export default function WordPressPage() {
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
      <WordPressClient />
    </>
  );
}
