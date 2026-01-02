// ============================================
// Homepage (글 목록)
// ============================================

import { getAllPosts } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 3600; // 1시간마다 재검증

export default async function HomePage() {
  // @ts-ignore
  let posts = [];

  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error('홈페이지 데이터 로드 실패:', error);
    // @ts-ignore
    posts = [];
  }

  // 🔥 데이터가 없을 때 방어 코드 (절대 에러 안냄!)
  // @ts-ignore
  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">블로그</h1>
        <p className="text-gray-600">
          아직 작성된 글이 없습니다. 워드프레스에서 글을 작성해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-12">최신 글</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* @ts-ignore */}
        {posts.map((post: any) => (
          <Link
            key={post.slug}
            href={post.uri || `/${post.slug}`}
            className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            {/* Featured Image */}
            {post.featuredImage?.node?.sourceUrl && (
              <div className="relative w-full h-48 bg-gray-100">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title || ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Categories */}
              {post.categories?.nodes && post.categories.nodes.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {post.categories.nodes.slice(0, 2).map((cat: any, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}

              <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition">
                {post.title || '제목 없음'}
              </h2>

              {post.date && (
                <p className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString('ko-KR')}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

