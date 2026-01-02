import { MetadataRoute } from 'next';
import { getAllUris } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  console.log('🗺️ sitemap.ts 실행');
  
  try {
    const data = await getAllUris();
    
    const posts = data.posts.nodes.map((post) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}${post.uri}`,
      lastModified: new Date(post.modified),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const pages = data.pages.nodes.map((page) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}${page.uri}`,
      lastModified: new Date(page.modified),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    console.log(`✅ Sitemap 생성 완료: Posts ${posts.length}개, Pages ${pages.length}개`);

    return [...posts, ...pages];
  } catch (error) {
    console.error('❌ Sitemap 생성 실패:', error);
    return [];
  }
}

