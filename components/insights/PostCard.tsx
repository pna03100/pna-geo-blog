/**
 * [Component] Post Card - New Modern Design
 * [Design] Full image background with content overlay
 * [Security] Type-Safe Props
 */

import Link from 'next/link';
import Image from 'next/image';
import { WPContent } from '@/lib/types';
import { ArrowRight, FileText } from 'lucide-react';

interface PostCardProps {
  post: WPContent;
  priority?: boolean;
}

function decodeHTMLEntities(text: string): string {
  if (!text) return '';
  
  return text
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8230;/g, '…');
}

export function PostCard({ post, priority = false }: PostCardProps) {
  const date = post.date ? new Date(post.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\. /g, '.') : '';

  const excerpt = post.excerpt
    ? decodeHTMLEntities(post.excerpt.replace(/<[^>]*>/g, '')).substring(0, 100) + '...'
    : '';

  const categorySlug = post.categories?.nodes && post.categories.nodes.length > 0
    ? post.categories.nodes[0].slug
    : '';

  const categoryName = post.categories?.nodes && post.categories.nodes.length > 0
    ? post.categories.nodes[0].name
    : '';

  return (
    <Link
      href={`/insights/${post.slug}${categorySlug ? `?category=${categorySlug}` : ''}`}
      prefetch={true}
      className="group block h-full"
    >
      <article className="relative h-full rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl flex flex-col">
        
        {/* Image with overlay */}
        <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
          {post.featuredImage?.node?.sourceUrl ? (
            <>
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title || ''}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={priority}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <FileText className="w-16 h-16 text-slate-400" strokeWidth={1.5} />
            </div>
          )}
          
          {/* Category Badge - Top Left */}
          {categoryName && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-200">
                {categoryName}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Date + RESEARCH Label */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-slate-500">{date}</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">RESEARCH</span>
          </div>
          
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-tight tracking-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
            {decodeHTMLEntities(post.title || '')}
          </h3>
          
          {/* Excerpt */}
          <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2 flex-1">
            {excerpt || '내용이 없습니다.'}
          </p>

          {/* Read More Link */}
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-200">
            <span>Read Insight</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </article>
    </Link>
  );
}
