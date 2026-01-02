/**
 * GEO 최적화 Post Renderer
 * - 텍스트 가독성 극대화
 * - 이미지 최적화 (next/image 변환)
 * - JSON-LD 구조화 데이터
 */

import Image from 'next/image';
import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';
import { Post } from '@/lib/types';

interface CleanPostRendererProps {
  post: Post;
}

export default function CleanPostRenderer({ post }: CleanPostRendererProps) {
  // 🎨 이미지 태그를 Next.js Image로 변환
  const parseOptions: HTMLReactParserOptions = {
    replace: (node) => {
      const domNode = node as Element;

      // <img> 태그를 찾아서 Next.js Image로 변환
      if (domNode.name === 'img' && domNode.attribs) {
        const { src, alt, width, height } = domNode.attribs;

        if (src && src.startsWith('http')) {
          return (
            <Image
              src={src}
              alt={alt || ''}
              width={parseInt(width) || 800}
              height={parseInt(height) || 600}
              className="rounded-lg my-6"
              sizes="(max-width: 768px) 100vw, 800px"
              priority={false}
            />
          );
        }
      }

      return undefined;
    },
  };

  // Featured Image
  const featuredImageUrl = post.featuredImage?.node.sourceUrl;

  // JSON-LD 스키마 (Rank Math 우선, 없으면 자체 생성)
  const generateSchemaData = () => {
    // Rank Math 스키마가 있으면 사용
    if (post.seo?.schema?.raw) {
      try {
        return JSON.parse(post.seo.schema.raw);
      } catch (e) {
        console.warn('⚠️ Rank Math 스키마 파싱 실패:', e);
      }
    }

    // 자체 생성 스키마
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.seo?.description || post.excerpt || '',
      image: featuredImageUrl || '',
      datePublished: post.date,
      dateModified: post.modified,
      author: {
        '@type': 'Person',
        name: post.author?.node.name || 'Anonymous',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Your Site Name',
      },
    };
  };

  return (
    <>
      {/* JSON-LD 스키마 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSchemaData()),
        }}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* 카테고리 */}
        {post.categories && post.categories.nodes.length > 0 && (
          <div className="mb-4">
            {post.categories.nodes.map((category, index) => (
              <span
                key={category.slug}
                className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        {/* 제목 (H1) */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* 메타 정보 */}
        <div className="flex items-center gap-4 text-gray-600 mb-8 pb-8 border-b">
          {post.author?.node.avatar && (
            <Image
              src={post.author.node.avatar.url}
              alt={post.author.node.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-medium text-gray-900">
              {post.author?.node.name || 'Anonymous'}
            </p>
            <time dateTime={post.date} className="text-sm">
              {new Date(post.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>

        {/* Featured Image */}
        {featuredImageUrl && (
          <div className="mb-10">
            <Image
              src={featuredImageUrl}
              alt={post.featuredImage?.node.altText || post.title}
              width={post.featuredImage?.node.mediaDetails?.width || 1200}
              height={post.featuredImage?.node.mediaDetails?.height || 630}
              className="rounded-xl w-full h-auto"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </div>
        )}

        {/* 본문 콘텐츠 */}
        <div className="prose prose-lg prose-slate max-w-none">
          {post.content ? parse(post.content, parseOptions) : (
            <p className="text-gray-500">본문 내용이 없습니다.</p>
          )}
        </div>

        {/* 작성자 정보 */}
        {post.author?.node.description && (
          <div className="mt-12 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-bold mb-2">작성자 소개</h3>
            <p className="text-gray-700">{post.author.node.description}</p>
          </div>
        )}
      </article>
    </>
  );
}

