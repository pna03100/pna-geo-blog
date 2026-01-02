// ============================================
// Dynamic Sitemap Generator
// ============================================

// @ts-nocheck
import { getAllPosts, getAllPages } from '@/lib/api';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';

  try {
    // @ts-ignore
    const [posts, pages] = await Promise.all([getAllPosts(), getAllPages()]);

    // @ts-ignore
    const postUrls = posts.map((post: any) => ({
      // @ts-ignore
      url: `${baseUrl}${post.uri}`,
      // @ts-ignore
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // @ts-ignore
    const pageUrls = pages.map((page: any) => ({
      // @ts-ignore
      url: `${baseUrl}${page.uri}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      // @ts-ignore
      ...postUrls,
      // @ts-ignore
      ...pageUrls,
    ];
  } catch (error) {
    console.error('sitemap 생성 실패:', error);
    // 🔥 에러 발생 시 최소한의 sitemap 반환
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

