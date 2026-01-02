/**
 * 홈페이지
 * - 최근 게시글 목록 표시
 * - 에러가 나도 빌드 중단 안 됨
 */

import Link from 'next/link';
import Image from 'next/image';
import { getRecentPosts } from '@/lib/api';

export const revalidate = 3600; // 1시간마다 재검증

export default async function HomePage() {
  // 🛡️ 방어: 에러가 나도 빈 배열 반환
  const posts = await getRecentPosts(12);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            GEO 최적화 블로그
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
            WordPress + Next.js 14로 구축된, 가장 빠른 블로그
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 py-16">
        {posts.length === 0 ? (
          // 🛡️ Empty State 처리
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500 mb-4">
              아직 작성된 글이 없습니다.
            </p>
            <p className="text-gray-400">
              WordPress 관리자에서 첫 게시글을 작성해보세요.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-10 text-center">최근 게시글</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={post.uri}
                  className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  {/* Featured Image */}
                  {post.featuredImage?.node.sourceUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Categories */}
                    {post.categories && post.categories.nodes.length > 0 && (
                      <div className="mb-3">
                        <span className="text-xs text-blue-600 font-semibold uppercase">
                          {post.categories.nodes[0].name}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p
                        className="text-gray-600 text-sm line-clamp-3 mb-4"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                      />
                    )}

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.author?.node.name || 'Anonymous'}</span>
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

