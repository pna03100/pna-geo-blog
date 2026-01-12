// ============================================
// [Trinity] Insights List Page (Blog Index)
// [GEO] Optimized for SEO & User Experience
// [Design] Premium Blue Theme matching Main Page
// ============================================

import { getAllPosts } from '@/lib/api';
import { Metadata } from 'next';
import { InsightsClient } from './InsightsClient';
import { GridBackground } from '@/components/ui/grid-background';

// [GEO] Metadata
export const metadata: Metadata = {
  title: 'Insights - 마케팅 인사이트',
  description: 'Google Ads, SEO, GEO 최적화에 대한 전문가의 인사이트와 최신 마케팅 트렌드를 확인하세요.',
  openGraph: {
    title: 'Insights - 마케팅 인사이트 | 피앤에이컴퍼니',
    description: 'Google Ads, SEO, GEO 최적화에 대한 전문가의 인사이트',
    type: 'website',
  },
};

// [Performance] ISR
export const revalidate = 1800; // 30분마다 재검증

// ============================================
// [Trinity] Insights List Page Component
// ============================================
export default async function InsightsPage() {
  const posts = await getAllPosts();

  return (
    <>
      <GridBackground />
      <InsightsClient posts={posts} />
    </>
  );
}

