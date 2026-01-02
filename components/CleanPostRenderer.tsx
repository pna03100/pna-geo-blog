'use client';

import parse, { Element, domToReact, DOMNode } from 'html-react-parser';
import Image from 'next/image';
import { Post } from '@/lib/types';

interface CleanPostRendererProps {
  post: Post;
}

/**
 * GEO 최적화된 포스트 렌더링 컴포넌트
 * - 시맨틱 HTML
 * - Next.js Image 최적화
 * - JSON-LD 스키마
 */
export default function CleanPostRenderer({ post }: CleanPostRendererProps) {
  console.log('📝 CleanPostRenderer 렌더링');
  console.log('Post:', post.title);

  // HTML 내 이미지를 Next.js Image로 변환
  const content = parse(post.content || '', {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === 'img') {
        const src = domNode.attribs.src;
        const alt = domNode.attribs.alt || '';
        const width = parseInt(domNode.attribs.width || '800', 10);
        const height = parseInt(domNode.attribs.height || '600', 10);

        if (!src) return domNode;

        return (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        );
      }
    },
  });

  // JSON-LD 스키마
  const schema = post.seo?.schema?.raw ? JSON.parse(post.seo.schema.raw) : null;

  return (
    <article className="clean-post-content py-12 px-4">
      {/* JSON-LD 스키마 */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      {/* Featured Image */}
      {post.featuredImage?.node?.sourceUrl && (
        <div className="mb-8 -mx-4">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title || ''}
            width={post.featuredImage.node.mediaDetails?.width || 1200}
            height={post.featuredImage.node.mediaDetails?.height || 630}
            priority
            className="w-full h-auto"
            sizes="100vw"
          />
        </div>
      )}

      {/* 제목 */}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {/* 메타 정보 */}
      <div className="flex gap-4 text-sm text-gray-600 mb-8">
        {post.author?.node?.name && (
          <span>작성자: {post.author.node.name}</span>
        )}
        {post.date && (
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('ko-KR')}
          </time>
        )}
        {post.categories?.nodes && post.categories.nodes.length > 0 && (
          <span>
            카테고리: {post.categories.nodes.map(cat => cat.name).join(', ')}
          </span>
        )}
      </div>

      {/* 본문 */}
      <div className="prose prose-lg prose-slate max-w-none">
        {content}
      </div>
    </article>
  );
}

