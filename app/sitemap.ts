/**
 * 동적 Sitemap 생성
 * - 모든 Post와 Page를 sitemap.xml에 포함
 * - 구글봇이 필수로 요구하는 파일
 */

import { MetadataRoute } from 'next';
import { getAllPosts, getAllPages } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.com';

  console.log('🗺️ [Sitemap] 생성 시작...');

  try {
    // 🛡️ 방어: 에러가 나도 빈 배열 반환
    const [posts, pages] = await Promise.all([
      getAllPosts(),
      getAllPages(),
    ]);

    // 홈페이지
    const homeEntry: MetadataRoute.Sitemap[0] = {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    };

    // Post 엔트리들
    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}${post.uri}`,
      lastModified: new Date(post.modified),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Page 엔트리들
    const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
      url: `${baseUrl}${page.uri}`,
      lastModified: new Date(page.modified),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    const sitemap = [homeEntry, ...postEntries, ...pageEntries];

    console.log(`✅ [Sitemap] ${sitemap.length}개 URL 생성됨`);

    return sitemap;
  } catch (error) {
    console.error('❌ [Sitemap] 생성 실패:', error);
    
    // 🛡️ 빌드가 터지지 않도록 최소한의 sitemap 반환
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
    ];
  }
}

