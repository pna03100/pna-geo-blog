/**
 * [Page] SEO & GEO Service
 * Google Green Theme
 */

import { Metadata } from 'next';
import { SEOGEOClient } from './SEOGEOClient';

export const metadata: Metadata = {
  title: 'SEO & GEO 최적화',
  description: '검색엔진과 AI 엔진 모두에서 상위 노출되는 SEO & GEO 전략. ChatGPT, Perplexity, Google 검색 노출 극대화.',
  keywords: 'SEO, GEO, 검색엔진 최적화, Generative Engine Optimization, AI 검색, ChatGPT, Perplexity',
  openGraph: {
    title: 'SEO & GEO 최적화 | 피앤에이컴퍼니',
    description: '검색엔진과 AI 엔진 모두에서 상위 노출되는 전략',
    type: 'website',
  },
};

export default function SEOGEOPage() {
  return <SEOGEOClient />;
}
