// ============================================
// Dynamic Catch-All Route (Posts & Pages)
// ============================================

// @ts-nocheck
import { getContentByURI, getAllPosts, getAllPages, getElementorCSSUrls } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// 🔥 동적 렌더링 강제 (프리렌더링 에러 방지)
export const dynamicParams = true; // 정의되지 않은 경로도 허용
export const revalidate = 3600; // 1시간마다 재검증

// Dynamic Import (Code Splitting)
const ElementorRenderer = dynamic(() => import('@/components/ElementorRenderer'), {
  ssr: true,
});
const CleanPostRenderer = dynamic(() => import('@/components/CleanPostRenderer'), {
  ssr: true,
});

// ============================================
// Generate Static Params (for SSG)
// ============================================
export async function generateStaticParams() {
  try {
    // @ts-ignore
    const [posts, pages] = await Promise.all([getAllPosts(), getAllPages()]);

    // @ts-ignore
    if (!posts || !pages) {
      console.log('🚨 generateStaticParams: 데이터 없음, 빈 배열 반환');
      return [];
    }

    // @ts-ignore
    const allPaths = [...posts, ...pages]
      .filter((item: any) => item && item.uri) // null/undefined 제거
      .map((item: any) => ({
        // @ts-ignore
        slug: item.uri.split('/').filter(Boolean),
      }))
      // 🔥 루트 경로(빈 배열) 필터링 - next.config.js 리라이트 충돌 방지
      .filter((item: any) => item.slug && item.slug.length > 0);

    console.log(`✅ generateStaticParams: ${allPaths.length}개 경로 생성 (루트 경로 제외)`);
    return allPaths;
  } catch (error) {
    console.error('generateStaticParams 실패:', error);
    console.log('🚨 빈 배열 반환 (빌드 계속 진행)');
    return [];
  }
}

// ============================================
// Generate Metadata (SEO)
// ============================================
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const uri = `/${params.slug.join('/')}`;

  try {
    const content = await getContentByURI(uri);

    // @ts-ignore
    if (!content || !content.seo) {
      return {
        title: '페이지를 찾을 수 없습니다',
      };
    }

    // @ts-ignore
    const seo = content.seo;

    return {
      // @ts-ignore
      title: seo.title || content.title || '제목 없음',
      // @ts-ignore
      description: seo.metaDesc || '',
      openGraph: {
        // @ts-ignore
        title: seo.opengraphTitle || seo.title || '',
        // @ts-ignore
        description: seo.opengraphDescription || seo.metaDesc || '',
        // @ts-ignore
        images: seo.opengraphImage?.sourceUrl
          // @ts-ignore
          ? [{ url: seo.opengraphImage.sourceUrl }]
          : [],
      },
      alternates: {
        // @ts-ignore
        canonical: seo.canonical || uri,
      },
    };
  } catch (error) {
    console.error('generateMetadata 실패:', error);
    return { title: '에러 발생' };
  }
}

// ============================================
// Page Component
// ============================================
export default async function DynamicPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const uri = `/${params.slug.join('/')}`;

  let content;

  try {
    content = await getContentByURI(uri);
  } catch (error) {
    console.error('페이지 데이터 로드 실패:', error);
    // @ts-ignore
    content = null;
  }

  // 🔥 절대 notFound() 호출 안 함! 무조건 화면 표시
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
  // Two-Track Rendering Strategy
  // ============================================

  // Track 1: Page (Elementor HTML)
  // @ts-ignore
  if (content.__typename === 'Page') {
    // @ts-ignore
    return <ElementorRenderer html={content.content || ''} postId={content.databaseId} />;
  }

  // Track 2: Post (GEO Optimized)
  // @ts-ignore
  if (content.__typename === 'Post') {
    // @ts-ignore
    return <CleanPostRenderer post={content} />;
  }

  // Fallback
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">알 수 없는 콘텐츠 타입</h1>
      <p className="text-gray-600">
        {/* @ts-ignore */}
        이 페이지는 지원되지 않는 형식입니다. ({content.__typename})
      </p>
    </div>
  );
}

