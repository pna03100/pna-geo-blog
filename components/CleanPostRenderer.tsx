// ============================================
// [GEO] Clean Post Renderer (AI Search Optimized)
// Trinity Core: Type-Safe + Schema Injection
// ============================================

'use client';

import parse, { Element, DOMNode, domToReact } from 'html-react-parser';
import Image from 'next/image';
import { WPContent } from '@/lib/types';
import { replaceCMSDomain } from '@/lib/utils';

interface Props {
  post: WPContent;
}

export default function CleanPostRenderer({ post }: Props) {
  // [Security] 방어 코드
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">게시글을 불러올 수 없습니다</h1>
        <p className="text-gray-600">데이터가 없습니다.</p>
      </div>
    );
  }

  const { title, content, date, author, featuredImage, categories, seo } = post;

  // ============================================
  // [GEO] HTML 파싱: <img> → Next.js <Image> + Domain Replace
  // ============================================
  const parseOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.name === 'img') {
        const { src, alt, width, height } = domNode.attribs;

        if (!src) return domNode;

        // 🔄 CMS 도메인 → 프론트엔드 도메인 변환
        const cleanSrc = replaceCMSDomain(src);

        return (
          <Image
            src={cleanSrc}
            alt={alt || '이미지'}
            width={parseInt(width) || 800}
            height={parseInt(height) || 600}
            className="rounded-lg my-4"
            sizes="(max-width: 768px) 100vw, 800px"
            loading="lazy"
          />
        );
      }
      
      // [GEO] <a> 태그 내부 링크 도메인 변환
      if (domNode instanceof Element && domNode.name === 'a') {
        const { href, ...otherAttribs } = domNode.attribs;
        
        if (href && href.includes('cms.pnamarketing.co.kr')) {
          const cleanHref = replaceCMSDomain(href);
          
          return (
            <a {...otherAttribs} href={cleanHref}>
              {domToReact(domNode.children as DOMNode[], parseOptions)}
            </a>
          );
        }
      }
    },
  };

  // ============================================
  // [GEO] JSON-LD Schema Injection
  // ============================================
  let schemaData: unknown = null;
  try {
    schemaData = seo?.schema?.raw ? JSON.parse(seo.schema.raw) : null;
  } catch (error) {
    console.error('JSON-LD 파싱 실패:', error);
    schemaData = null;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* JSON-LD */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      {/* Featured Image */}
      {featuredImage?.node?.sourceUrl && (
        <div className="mb-8">
          <Image
            src={replaceCMSDomain(featuredImage.node.sourceUrl)}
            alt={featuredImage.node.altText || title || '대표 이미지'}
            width={featuredImage.node.mediaDetails?.width || 1200}
            height={featuredImage.node.mediaDetails?.height || 630}
            className="w-full h-auto rounded-xl"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
      )}

      {/* Categories */}
      {categories?.nodes && categories.nodes.length > 0 && (
        <div className="flex gap-2 mb-4">
          {categories.nodes.map((cat, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {cat.name}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
        {title || '제목 없음'}
      </h1>

      {/* Meta Info */}
      <div className="flex items-center gap-4 mb-8 text-gray-600">
        {author?.node?.name && <span>작성자: {author.node.name}</span>}
        {date && (
          <span>
            {new Date(date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        )}
      </div>

      {/* Content (GEO 최적화 Typography) */}
      <div className="prose prose-lg prose-slate max-w-none">
        {content ? parse(content, parseOptions) : <p>내용이 없습니다.</p>}
      </div>
    </article>
  );
}

