/**
 * [GEO] Related Posts - 같은 카테고리 기반 관련 글
 * AG-STANDARD 7단계: 시맨틱 내부 링크 자동 연결
 * AI가 토픽 클러스터 관계를 인식하도록 같은 주제의 글을 자동 추천
 */

import Link from 'next/link';
import Image from 'next/image';
import { WPContent } from '@/lib/types';
import { FileText } from 'lucide-react';
import { stripHtmlTags, decodeHTMLEntities } from '@/lib/sanitize';

interface RelatedPostsProps {
  currentPost: WPContent;
  allPosts: WPContent[];
  maxPosts?: number;
}

export function RelatedPosts({ currentPost, allPosts, maxPosts = 3 }: RelatedPostsProps) {
  const currentCategories = currentPost.categories?.nodes.map(c => c.slug) || [];

  // 1순위: 같은 카테고리 글 (카테고리 겹침 수 기준 정렬)
  const scored = allPosts
    .filter(p => p.databaseId !== currentPost.databaseId)
    .map(post => {
      const postCategories = post.categories?.nodes.map(c => c.slug) || [];
      const overlap = postCategories.filter(c => currentCategories.includes(c)).length;
      return { post, overlap };
    })
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, maxPosts);

  // 관련 글이 없으면 렌더링하지 않음
  if (scored.length === 0) return null;

  return (
    <section className="mt-8 mb-6" aria-label="관련 글">
      <h2 className="text-xl font-bold text-slate-900 mb-4">관련 인사이트</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scored.map(({ post }) => {
          const date = post.date
            ? new Date(post.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            : '';
          const categoryName = post.categories?.nodes?.[0]?.name || '';
          const excerpt = post.excerpt
            ? decodeHTMLEntities(stripHtmlTags(post.excerpt)).substring(0, 80) + '...'
            : '';

          return (
            <Link
              key={post.databaseId}
              href={`/insights/${post.slug}`}
              className="group block rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-blue-200 hover:shadow-md"
              style={{ transition: 'all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
            >
              {/* Thumbnail */}
              <div className="relative w-full h-36 bg-gradient-to-br from-slate-100 to-slate-200">
                {post.featuredImage?.node?.sourceUrl ? (
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title || ''}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <FileText className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
                  </div>
                )}
                {categoryName && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-bold border border-blue-200">
                      {categoryName}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {date && (
                  <p className="text-xs text-slate-500 mb-1">{date}</p>
                )}
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-1">
                  {decodeHTMLEntities(post.title || '')}
                </h3>
                {excerpt && (
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {excerpt}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
