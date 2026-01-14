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
      className="group block h-full rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        {post.featuredImage?.node?.sourceUrl ? (
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title || ''}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FileText className="w-16 h-16 text-slate-400" strokeWidth={1.5} />
          </div>
        )}
        
        {/* Category Badge - Top Left */}
        {categoryName && (
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            <span 
              className="px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
              style={{
                backgroundColor: bgColor,
                color: categoryColors.text === 'text-white' ? 'white' : '#0f172a'
              }}
            >
              {categoryName}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col">
        {/* Date */}
        {date && (
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
          {decodeHTMLEntities(post.title || '')}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
          {excerpt || '내용이 없습니다.'}
        </p>

        {/* Read More */}
        <div className="flex items-center gap-1.5 text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
          <span>자세히 보기</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
