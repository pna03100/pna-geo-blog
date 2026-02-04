// ============================================
// [SEO] Frontend-Driven Sitemap.xml Generator
// [Trinity-Core Solution] Headless WordPress + Next.js
// [Ref: 6. Next.js Server Components Implementation]
// [Ref: 20. Twelve-Factor App - Config (Environment Variables)]
// [Ref: 26. 구글 SEO GEO 핵심로직 (구조화된 데이터)]
// ============================================
// [Architecture]
// - WordPress: 백엔드 주소 숨김 (Headless CMS 역할만 수행)
// - Next.js: 프론트엔드 주소로 사이트맵 생성 및 제공
// - Googlebot: 프론트엔드 주소만 크롤링 (백엔드 노출 방지)
// ============================================

import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/api';

const baseUrl = 'https://pnamarketing.co.kr';
const backendUrl = 'https://cms.pnamarketing.co.kr'; // 백엔드 주소 (치환용)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // ============================================
  // 1. WordPress 백엔드에서 포스트 목록 가져오기
  // [Security] 환경 변수를 통해 백엔드 주소 숨김 처리
  // ============================================
  let posts: Awaited<ReturnType<typeof getAllPosts>> = [];
  
  try {
    const fetchedPosts = await getAllPosts();
    // [Defense] null/undefined 체크
    posts = Array.isArray(fetchedPosts) ? fetchedPosts : [];
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ [Sitemap] Successfully fetched ${posts.length} posts`);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ [Sitemap] Failed to fetch posts:', error);
    }
    // 에러 발생 시 빈 배열로 처리 (정적 페이지만 노출)
    posts = [];
  }

  // ============================================
  // 2. 포스트 데이터를 사이트맵 형식으로 변환
  // [GEO Logic] 백엔드 URL을 프론트엔드 URL로 치환
  // ============================================
  const postEntries: MetadataRoute.Sitemap = (posts || [])
    .filter((post) => post && post.uri) // [Defense] null 체크
    .map((post) => {
      try {
        // WordPress URI를 프론트엔드 경로로 변환
        // 예: /insights/post-slug -> https://pnamarketing.co.kr/insights/post-slug
        const frontendUrl = post.uri.startsWith('/') 
          ? `${baseUrl}${post.uri}`
          : `${baseUrl}/${post.uri}`;

        // [Trinity] 실제 수정 날짜 활용 (SEO 최적화)
        const lastModified = post.date ? new Date(post.date) : currentDate;

        return {
          url: frontendUrl,
          lastModified,
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        };
      } catch (mapError) {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ [Sitemap] Error mapping post:', post, mapError);
        }
        // 에러 발생 시 null 반환 (아래에서 필터링됨)
        return null;
      }
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  // ============================================
  // 3. 정적 페이지 + 동적 포스트 결합
  // [Architecture] 프론트엔드 도메인 기준으로 통합 사이트맵 생성
  // ============================================
  return [
    // 메인 페이지 (최우선)
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    
    // 서비스 페이지 (높은 우선순위)
    {
      url: `${baseUrl}/google-ads`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/seo-geo`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wordpress`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/performance`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // 인사이트 허브 페이지
    {
      url: `${baseUrl}/insights`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },

    // 회사 정보 페이지
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // 법적 문서 (낮은 우선순위)
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },

    // ============================================
    // 동적 포스트 (WordPress에서 가져온 데이터)
    // [Trinity-Core] 백엔드 주소 숨김 + 프론트엔드 주소로 치환
    // ============================================
    ...postEntries,
  ];
}

// ============================================
// [Performance] Next.js Revalidation 설정
// 1시간마다 사이트맵 재생성 (신규 포스트 자동 반영)
// ============================================
export const revalidate = 3600; // 1시간 (초 단위)
