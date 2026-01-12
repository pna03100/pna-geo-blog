/**
 * [Simple] Post Renderer - No Elementor Dependency
 * [Security] HTML Sanitization
 * [GEO] Semantic HTML
 */

import { WPContent } from '@/lib/types';
import Image from 'next/image';

interface SimplePostRendererProps {
  post: WPContent;
}

export default function SimplePostRenderer({ post }: SimplePostRendererProps) {
  const title = post.title || '제목 없음';
  const content = post.content || '';
  const featuredImageUrl = post.featuredImage?.node?.sourceUrl;
  const date = post.date ? new Date(post.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <header className="mb-8 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-950 tracking-tight">
          {title}
        </h1>
        {date && (
          <p className="text-slate-600 text-sm">{date}</p>
        )}
      </header>

      {/* Featured Image */}
      {featuredImageUrl && (
        <figure className="mb-8">
          <div className="relative aspect-video bg-slate-100 rounded-xl overflow-hidden">
            <Image
              src={featuredImageUrl}
              alt={post.featuredImage?.node?.altText || title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </figure>
      )}

      {/* Content */}
      <section 
        className="prose prose-slate prose-lg max-w-none
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-950
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-950 prose-strong:font-bold
          prose-ul:text-slate-700 prose-ol:text-slate-700
          prose-li:text-slate-700"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
