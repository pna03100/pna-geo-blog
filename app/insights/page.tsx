// ============================================
// [Trinity] Insights List Page (Blog Index)
// [GEO] Optimized for SEO & User Experience
// [Design] Premium Blue Theme matching Main Page
// ============================================

import { getAllPosts } from '@/lib/api';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { InsightsClient } from './InsightsClient';

// [GEO] Metadata
export const metadata: Metadata = {
  title: '마케팅 인사이트 블로그 - Google Ads·SEO·GEO 전문가 칼럼',
  description: 'Google Ads, SEO, GEO 최적화에 대한 전문가의 인사이트와 최신 마케팅 트렌드를 확인하세요. 데이터 기반 디지털 마케팅 전략과 실전 노하우를 공유합니다.',
  keywords: '마케팅 인사이트, Google Ads 팁, SEO 전략, GEO 최적화, 디지털 마케팅 블로그, 퍼포먼스 마케팅',
  openGraph: {
    title: '마케팅 인사이트 블로그 - Google Ads·SEO·GEO 전문가 칼럼 | 피앤에이컴퍼니',
    description: 'Google Ads, SEO, GEO 최적화에 대한 전문가의 인사이트와 최신 마케팅 트렌드.',
    type: 'website',
  },
};

// [Performance] ISR
export const revalidate = 1800; // 30분마다 재검증

// [GEO] JSON-LD: CollectionPage + BreadcrumbList
function generateJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pnamarketing.co.kr';

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${baseUrl}/insights/#webpage`,
      "name": "마케팅 인사이트 블로그",
      "description": "Google Ads, SEO, GEO 최적화에 대한 전문가의 인사이트와 최신 마케팅 트렌드.",
      "url": `${baseUrl}/insights`,
      "isPartOf": { "@type": "WebSite", "@id": `${baseUrl}/#website` },
      "publisher": { "@type": "Organization", "@id": `${baseUrl}/#organization`, "name": "피앤에이컴퍼니" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": baseUrl },
        { "@type": "ListItem", "position": 2, "name": "인사이트", "item": `${baseUrl}/insights` },
      ],
    },
  ];
}

// ============================================
// [Trinity] Insights List Page Component
// ============================================
export default async function InsightsPage() {
  const posts = await getAllPosts();
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
      <Suspense fallback={<div className="min-h-screen pt-[73px]" />}>
        <InsightsClient posts={posts} />
      </Suspense>
    </>
  );
}

