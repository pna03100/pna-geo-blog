// ============================================
// [Implementation] Homepage (루트 경로)
// Trinity Core: Type-Safe Server Component
// ============================================

import { getContentByURI } from '@/lib/api';
import { WPContent } from '@/lib/types';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

// Dynamic Import - Iframe 방식 (라이센스 불필요)
const ElementorIframe = dynamic(() => import('@/components/ElementorIframe'), {
  ssr: false,
});

// 기존 방식 (CSS 필요)
const ElementorRenderer = dynamic(() => import('@/components/ElementorRenderer'), {
  ssr: true,
});

export const revalidate = 3600; // 1시간 캐싱

// ============================================
// Generate Metadata
// ============================================
export async function generateMetadata(): Promise<Metadata> {
  try {
    // WordPress의 /home 페이지 데이터 가져오기
    const content = await getContentByURI('/home');

    if (!content) {
      return {
        title: '주식회사 피앤에이컴퍼니 | 구글 광고 대행사',
        description: 'SEO·GEO 기반 데이터 분석으로 광고 효율을 극대화하고, 전환 중심의 퍼포먼스 마케팅 전략을 제공합니다.',
      };
    }

    // SEO 플러그인 데이터가 있으면 사용, 없으면 기본 필드 사용
    const seo = content.seo || {};

    return {
      title: seo.title || content.title || '주식회사 피앤에이컴퍼니',
      description: seo.metaDesc || '구글 광고 대행사 피앤에이컴퍼니',
      openGraph: {
        title: seo.opengraphTitle || content.title || '주식회사 피앤에이컴퍼니',
        description: seo.opengraphDescription || '구글 광고 대행사',
        images: seo.opengraphImage?.sourceUrl
          ? [{ url: seo.opengraphImage.sourceUrl }]
          : [],
      },
      alternates: {
        canonical: seo.canonical || 'https://pnamarketing.co.kr/',
      },
    };
  } catch (error) {
    console.error('홈페이지 메타데이터 생성 실패:', error);
    return { 
      title: '주식회사 피앤에이컴퍼니 | 구글 광고 대행사',
      description: 'SEO·GEO 기반 데이터 분석 마케팅',
    };
  }
}

// ============================================
// Homepage Component
// ============================================
// ============================================
// [Implementation] Homepage Component
// ============================================
export default async function HomePage() {
  console.log('🏠 홈페이지 렌더링 시작...');

  let content: WPContent | null = null;

  try {
    content = await getContentByURI('/home');
    console.log('✅ 홈페이지 콘텐츠 로드 성공');
  } catch (error) {
    console.error('❌ 홈페이지 콘텐츠 로드 실패:', error);
    content = null;
  }

  // [Security] API 연결 실패 시 안내 페이지
  if (!content) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">PNA Marketing</h1>
        <p className="text-gray-600 mb-8">
          홈페이지를 불러오는 중 문제가 발생했습니다.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-left">
          <h2 className="text-xl font-semibold mb-2">🔧 개발자 정보:</h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• WordPress GraphQL API 연결을 확인하세요</li>
            <li>• 환경 변수 <code className="bg-gray-200 px-2 py-1 rounded">WORDPRESS_API_URL</code>이 올바른지 확인하세요</li>
            <li>• WordPress에 <strong>/home</strong> 페이지가 존재하는지 확인하세요</li>
            <li>• 서버 로그를 확인하세요 (디버깅 정보가 출력됩니다)</li>
          </ul>
        </div>
      </div>
    );
  }

  // [Implementation] Elementor 페이지 렌더링
  if (content.__typename === 'Page') {
    console.log('📄 페이지 렌더링 - databaseId:', content.databaseId);
    
    // 🔥 임시 iframe 방식 (Elementor 라이센스 문제 우회)
    return <ElementorIframe postId={content.databaseId} />;
    
    // 원래 방식 (CSS 파일 필요)
    // return <ElementorRenderer html={content.content || ''} postId={content.databaseId} />;
  }

  // [Implementation] Post 타입이 올 경우 (일반적으로 홈은 Page지만)
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">{content.title || '제목 없음'}</h1>
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content.content || '' }}
      />
    </div>
  );
}

