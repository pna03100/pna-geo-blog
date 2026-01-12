/**
 * [GEO] 블로그 목록 페이지 - AI 가시성 최적화
 * [Security] Server Component + Zod Validation
 * [Design] Semantic HTML + Tailwind CSS
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/api';
import { PostCard } from '@/components/blog/PostCard';

// ============================================
// [GEO] Dynamic Metadata
// ============================================
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '블로그',
    description: 'Google Ads, SEO, GEO 최적화 전략과 데이터 기반 마케팅 인사이트를 공유합니다.',
    openGraph: {
      title: '피앤에이컴퍼니 블로그 | 마케팅 인사이트',
      description: 'Google Ads, SEO, GEO 최적화 전략과 데이터 기반 마케팅 인사이트',
      type: 'website',
    },
  };
}

// ============================================
// [Implementation] Blog List Page
// ============================================
export default async function BlogPage() {
  // [Security] Type-Safe Data Fetching
  const posts = await getAllPosts();

  return (
    <article className="container mx-auto px-4 py-12 max-w-7xl">
      {/* [GEO] Semantic Header */}
      <header className="mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          블로그
        </h1>
        {/* [GEO] Snippet Trap - Direct Answer Summary */}
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          데이터 기반 마케팅 전략, Google Ads 최적화 노하우, 
          그리고 <span className="font-semibold text-primary">GEO(생성형 엔진 최적화)</span> 인사이트를 공유합니다.
        </p>
      </header>

      {/* [Design] Blog Posts Grid */}
      {posts.length === 0 ? (
        <section className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            아직 작성된 포스트가 없습니다.
          </p>
        </section>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <PostCard 
              key={post.databaseId} 
              post={post}
              priority={index < 3} // First 3 posts get priority loading
            />
          ))}
        </section>
      )}
    </article>
  );
}
