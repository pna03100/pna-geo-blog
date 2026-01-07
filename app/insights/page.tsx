// ============================================
// [Trinity] Insights List Page (Blog Index)
// [GEO] Optimized for SEO & User Experience
// ============================================

import { getAllPosts } from '@/lib/api';
import { replaceCmsUrl } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// [GEO] Metadata
export const metadata: Metadata = {
  title: 'Insights - 마케팅 인사이트',
  description: 'Google Ads, SEO, GEO 최적화에 대한 전문가의 인사이트와 최신 마케팅 트렌드를 확인하세요.',
  openGraph: {
    title: 'Insights - 마케팅 인사이트 | 피앤에이컴퍼니',
    description: 'Google Ads, SEO, GEO 최적화에 대한 전문가의 인사이트',
    type: 'website',
  },
};

// [Performance] ISR
export const revalidate = 1800; // 30분마다 재검증

// ============================================
// [Trinity] Insights List Page Component
// ============================================
export default async function InsightsPage() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📚 [Insights] Loading posts list...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  let posts;

  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error('❌ [Insights] Failed to load posts:', error);
    posts = [];
  }

  // [Security] CMS URL 제거
  const cleanPosts = posts.map((post) => ({
    ...post,
    title: replaceCmsUrl(post.title),
    excerpt: replaceCmsUrl(post.excerpt),
    uri: replaceCmsUrl(post.uri),
    featuredImage: post.featuredImage
      ? {
          node: {
            ...post.featuredImage.node,
            sourceUrl: replaceCmsUrl(post.featuredImage.node.sourceUrl),
            altText: replaceCmsUrl(post.featuredImage.node.altText),
          },
        }
      : null,
  }));

  console.log(`✅ [Insights] Loaded ${cleanPosts.length} posts`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  return (
    <main className="min-h-screen bg-slate-50">
      {/* [GEO] Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-slate-900 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Insights
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            Google Ads, SEO, GEO 최적화에 대한 전문가의 인사이트와<br />
            최신 마케팅 트렌드를 확인하세요
          </p>
        </div>
      </section>

      {/* [Implementation] Posts Grid */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        {cleanPosts.length === 0 ? (
          // Empty State
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              아직 게시글이 없습니다
            </h2>
            <p className="text-slate-600">
              곧 유익한 인사이트를 공유하겠습니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {cleanPosts.map((post) => (
              <Link
                key={post.databaseId}
                href={post.uri || `/insights/${post.slug}`}
                className="group"
              >
                <Card className="h-full border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                  {/* Featured Image */}
                  {post.featuredImage?.node?.sourceUrl && (
                    <div className="relative aspect-video overflow-hidden rounded-t-lg bg-slate-100">
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title || ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <CardHeader>
                    {/* Categories */}
                    {post.categories?.nodes && post.categories.nodes.length > 0 && (
                      <div className="flex gap-2 mb-2">
                        {post.categories.nodes.slice(0, 2).map((cat) => (
                          <Badge
                            key={cat.slug}
                            variant="secondary"
                            className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                          >
                            {cat.name}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {post.title || '제목 없음'}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    {/* Excerpt */}
                    {post.excerpt && (
                      <CardDescription className="text-slate-600 line-clamp-3 mb-4">
                        {post.excerpt.replace(/<[^>]*>/g, '')}
                      </CardDescription>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      {post.date && (
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      )}
                      {post.author?.node?.name && (
                        <span className="flex items-center gap-1">
                          <span>by</span>
                          <span className="font-medium">{post.author.node.name}</span>
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* [GEO] JSON-LD Schema for Blog Listing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Insights - 피앤에이컴퍼니',
            description: 'Google Ads, SEO, GEO 최적화 마케팅 인사이트',
            url: 'https://pnamarketing.co.kr/insights',
            blogPost: cleanPosts.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              datePublished: post.date,
              author: {
                '@type': 'Person',
                name: post.author?.node?.name || 'PNA Marketing',
              },
              url: `https://pnamarketing.co.kr${post.uri}`,
            })),
          }),
        }}
      />
    </main>
  );
}

