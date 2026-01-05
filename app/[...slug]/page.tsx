// ============================================
// [Implementation] Dynamic Catch-All Route
// Trinity Core: Type-Safe Dynamic Pages
// ============================================

import { getContentByURI, getAllPosts, getAllPages } from '@/lib/api';
import { WPContent } from '@/lib/types';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// 🔥 동적 렌더링 강제 (프리렌더링 에러 방지)
export const dynamicParams = true; // 정의되지 않은 경로도 허용
export const revalidate = 3600; // 1시간마다 재검증

// Dynamic Import (Code Splitting)
const ElementorIframe = dynamic(() => import('@/components/ElementorIframe'), {
  ssr: false,
});
const ElementorRenderer = dynamic(() => import('@/components/ElementorRenderer'), {
  ssr: true,
});
const CleanPostRenderer = dynamic(() => import('@/components/CleanPostRenderer'), {
  ssr: true,
});

// ============================================
// [Implementation] Generate Static Params (SSG)
// ============================================
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  try {
    const [posts, pages] = await Promise.all([getAllPosts(), getAllPages()]);

    if (!posts || !pages) {
      console.log('🚨 generateStaticParams: 데이터 없음, 빈 배열 반환');
      return [];
    }

    const allPaths = [...posts, ...pages]
      .filter((item) => item && item.uri)
      .map((item) => ({
        slug: item.uri.split('/').filter(Boolean),
      }))
      .filter((item) => item.slug && item.slug.length > 0);

    console.log(`✅ generateStaticParams: ${allPaths.length}개 경로 생성`);
    return allPaths;
  } catch (error) {
    console.error('generateStaticParams 실패:', error);
    return [];
  }
}

// ============================================
// [GEO] Generate Metadata (SEO Optimization)
// ============================================
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const uri = `/${params.slug.join('/')}`;

  try {
    const content = await getContentByURI(uri);

    if (!content) {
      return {
        title: '페이지를 찾을 수 없습니다',
      };
    }

    const seo = content.seo;

    return {
      title: seo?.title || content.title || '제목 없음',
      description: seo?.metaDesc || content.excerpt || '',
      openGraph: {
        title: seo?.opengraphTitle || content.title || '',
        description: seo?.opengraphDescription || content.excerpt || '',
        images: seo?.opengraphImage?.sourceUrl
          ? [{ url: seo.opengraphImage.sourceUrl }]
          : content.featuredImage?.node?.sourceUrl
          ? [{ url: content.featuredImage.node.sourceUrl }]
          : [],
      },
      alternates: {
        canonical: seo?.canonical || `https://pnamarketing.co.kr${uri}`,
      },
    };
  } catch (error) {
    console.error('generateMetadata 실패:', error);
    return { title: 'PNA Marketing' };
  }
}

// ============================================
// [Implementation] Page Component
// ============================================
export default async function DynamicPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const uri = `/${params.slug.join('/')}`;

  let content: WPContent | null = null;

  try {
    content = await getContentByURI(uri);
  } catch (error) {
    console.error('페이지 데이터 로드 실패:', error);
    content = null;
  }

  // [Security] 콘텐츠 없을 시 안내 페이지
  if (!content) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">콘텐츠를 불러올 수 없습니다</h1>
        <p className="text-gray-600">
          워드프레스 API 연결을 확인하세요. (URI: {uri})
        </p>
      </div>
    );
  }

  // ============================================
  // [Implementation] Two-Track Rendering
  // ============================================

  // Track 1: Page (Elementor HTML)
  if (content.__typename === 'Page') {
    console.log(`📄 페이지 렌더링 (${uri}) - databaseId:`, content.databaseId);
    return <ElementorIframe postId={content.databaseId} />;
  }

  // Track 2: Post (GEO Optimized)
  if (content.__typename === 'Post') {
    return <CleanPostRenderer post={content} />;
  }

  // Fallback
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">알 수 없는 콘텐츠 타입</h1>
      <p className="text-gray-600">
        이 페이지는 지원되지 않는 형식입니다. ({content.__typename})
      </p>
    </div>
  );
}

