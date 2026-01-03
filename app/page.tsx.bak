// ============================================
// 메인 페이지 (rewrites로 워드프레스 프록시)
// ============================================
// 
// ⚠️ 주의: next.config.js의 rewrites 설정으로 인해
// 이 페이지는 실제로 렌더링되지 않고, 
// https://cms.pnamarketing.co.kr/ 의 내용이 직접 보여집니다.
//
// 만약 rewrites가 실패하거나 개발 환경에서 테스트하려면
// 아래 코드가 실행됩니다.
// ============================================

// @ts-nocheck
import { getAllPosts } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 3600; // 1시간마다 재검증

export default async function HomePage() {
  // 🎯 Rewrites가 작동 중이면 이 코드는 실행되지 않습니다
  // 하지만 개발 환경이나 fallback을 위해 콘텐츠를 준비합니다

  let posts = [];

  try {
    // @ts-ignore
    posts = await getAllPosts();
  } catch (error) {
    console.error('메인 페이지 데이터 로드 실패:', error);
    // @ts-ignore
    posts = [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          안녕하세요 👋
        </h1>
        <p className="text-xl text-gray-600">
          Next.js + WordPress Headless CMS 블로그입니다
        </p>
      </section>

      {/* Posts Grid */}
      <section>
        <h2 className="text-3xl font-bold mb-8">최근 게시글</h2>
        
        {/* @ts-ignore */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* @ts-ignore */}
            {posts.slice(0, 6).map((post) => (
              <article
                key={post.slug}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                {/* Featured Image */}
                {post.featuredImage?.node?.sourceUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title || ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Categories */}
                  {post.categories?.nodes && post.categories.nodes.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {post.categories.nodes.slice(0, 2).map((cat: any, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {post.title || '제목 없음'}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <div
                      className="text-gray-600 text-sm mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                  )}

                  {/* Date */}
                  {post.date && (
                    <p className="text-gray-500 text-sm mb-4">
                      {new Date(post.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}

                  {/* Link */}
                  <Link
                    href={post.uri || `/post/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    자세히 보기 →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">
              아직 게시글이 없습니다. 워드프레스에서 콘텐츠를 추가해주세요.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
