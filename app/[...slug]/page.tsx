/**
 * 동적 라우팅 페이지
 * - Post와 Page를 모두 처리
 * - Two-Track Rendering 전략
 * - 방어적 코드로 빌드 안정성 확보
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContentByURI, getAllPosts, getAllPages } from '@/lib/api';
import { ContentNode } from '@/lib/types';
import dynamic from 'next/dynamic';

// 지연 로딩으로 성능 최적화
const ElementorRenderer = dynamic(() => import('@/components/ElementorRenderer'), {
  loading: () => <p className="text-center py-20">로딩 중...</p>,
});

const CleanPostRenderer = dynamic(() => import('@/components/CleanPostRenderer'), {
  loading: () => <p className="text-center py-20">로딩 중...</p>,
});

type Props = {
  params: { slug: string[] };
};

// ========================================
// generateStaticParams (빌드 시 경로 생성)
// ========================================
export async function generateStaticParams() {
  console.log('📋 [generateStaticParams] 시작...');

  try {
    // 🛡️ 방어: 에러가 나도 빈 배열 반환
    const [posts, pages] = await Promise.all([
      getAllPosts(),
      getAllPages(),
    ]);

    const paths = [
      ...posts.map((post) => ({
        slug: post.uri.split('/').filter(Boolean),
      })),
      ...pages.map((page) => ({
        slug: page.uri.split('/').filter(Boolean),
      })),
    ];

    console.log(`✅ [generateStaticParams] ${paths.length}개 경로 생성됨`);
    return paths;
  } catch (error) {
    console.error('❌ [generateStaticParams] 에러:', error);
    // 🛡️ 빌드가 터지지 않도록 빈 배열 반환
    return [];
  }
}

// ========================================
// generateMetadata (SEO 메타데이터)
// ========================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const uri = '/' + params.slug.join('/');
  const content = await getContentByURI(uri);

  if (!content || !content.seo) {
    return {
      title: 'Page Not Found',
    };
  }

  const seo = content.seo;

  return {
    title: seo.title || content.title,
    description: seo.description || '',
    openGraph: {
      title: seo.openGraphTitle || seo.title || content.title,
      description: seo.openGraphDescription || seo.description || '',
      images: seo.openGraphImage?.sourceUrl
        ? [{ url: seo.openGraphImage.sourceUrl }]
        : [],
      type: content.__typename === 'Post' ? 'article' : 'website',
    },
    alternates: {
      canonical: seo.canonical || undefined,
    },
  };
}

// ========================================
// 페이지 컴포넌트
// ========================================
export default async function ContentPage({ params }: Props) {
  const uri = '/' + params.slug.join('/');
  
  console.log(`📄 [ContentPage] URI 요청: ${uri}`);

  // 🛡️ 방어: 데이터 가져오기 실패 시 404
  const content = await getContentByURI(uri);

  if (!content) {
    console.warn(`⚠️ [ContentPage] 콘텐츠를 찾을 수 없음: ${uri}`);
    notFound();
  }

  console.log(`✅ [ContentPage] 렌더링 타입: ${content.__typename}`);

  // ========================================
  // Two-Track Rendering
  // ========================================
  
  // Track 1: Page (Elementor HTML 파싱)
  if (content.__typename === 'Page') {
    return <ElementorRenderer html={content.content} />;
  }

  // Track 2: Post (GEO 최적화 렌더링)
  if (content.__typename === 'Post') {
    return <CleanPostRenderer post={content} />;
  }

  // 🛡️ 방어: 알 수 없는 타입
  console.error(`❌ [ContentPage] 알 수 없는 콘텐츠 타입: ${content.__typename}`);
  notFound();
}

// 재검증 설정
export const revalidate = 3600; // 1시간

