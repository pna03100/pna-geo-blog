/**
 * [Component] Post Card - Original Insights Page Design
 * [Design] Clean rounded card with category badge
 * [Security] Type-Safe Props
 */

import Link from 'next/link';
import Image from 'next/image';
import { WPContent } from '@/lib/types';
import { Calendar, ArrowRight, FileText } from 'lucide-react';
import { getCategoryColor } from '@/lib/category-colors';

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
    month: 'long',
    day: 'numeric'
  }) : '';

  const excerpt = post.excerpt
    ? decodeHTMLEntities(post.excerpt.replace(/<[^>]*>/g, '')).substring(0, 120) + '...'
    : '';

  const categorySlug = post.categories?.nodes && post.categories.nodes.length > 0
    ? post.categories.nodes[0].slug
    : '';

  const categoryName = post.categories?.nodes && post.categories.nodes.length > 0
    ? post.categories.nodes[0].name
    : '';

  const categoryColors = getCategoryColor(categoryName || categorySlug);

  // Extract color from Tailwind class
  const bgColorMatch = categoryColors.bg.match(/\[([#\w]+)\]/);
  const bgColor = bgColorMatch ? bgColorMatch[1] : '#4285F4';

  return (
    <Link
      href={`/insights/${post.slug}${categorySlug ? `?category=${categorySlug}` : ''}`}
      prefetch={true}
      className="group block h-full rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 transition-all duration-300 bg-white hover:shadow-xl hover:-translate-y-1"
    >
      {/* Image with overlay and content */}
      <div className="relative w-full h-72 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
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
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <FileText className="w-16 h-16 text-slate-400" strokeWidth={1.5} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
          </div>
        )}
        
        {/* Category Badge - Top Left */}
        {categoryName && (
          <div className="absolute top-4 left-4 z-10">
            <span 
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: bgColor,
                color: categoryColors.text === 'text-white' ? 'white' : '#0f172a'
              }}
            >
              {categoryName}
            </span>
          </div>
        )}
        
        {/* Content overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          {/* Date */}
          {date && (
            <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
          )}
          
          {/* Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2 mb-2">
            {decodeHTMLEntities(post.title || '')}
          </h3>
        </div>
      </div>

      {/* Bottom content area */}
      <div className="p-6 bg-white">
        {/* Excerpt */}
        <p className="text-slate-600 text-sm line-clamp-2 mb-4">
          {excerpt || '내용이 없습니다.'}
        </p>

        {/* Read More */}
        <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-sm transition-all duration-200">
          <span>자세히 보기</span>
          <ArrowRight className="w-4 h-4 arrow-premium" />
        </div>
      </div>
    </Link>
  );
}
