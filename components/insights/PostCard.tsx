/**
 * [GEO] Blog Post Card Component - Semantic & Accessible
 * [Security] Type-Safe Props
 * [Design] Tailwind CSS + Shadcn/UI
 */

import Link from 'next/link';
import Image from 'next/image';
import { WPContent } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

// ============================================
// [Security] Interface for Props
// ============================================
interface PostCardProps {
  post: WPContent;
  priority?: boolean;
}

// ============================================
// [Utility] HTML Entity Decoder & Tag Stripper
// ============================================
function decodeAndStripHTML(html: string): string {
  if (!html) return '';
  
  // HTML 태그 제거
  const withoutTags = html.replace(/<[^>]*>/g, '');
  
  // HTML 엔티티 디코딩
  const textarea = typeof document !== 'undefined' ? document.createElement('textarea') : null;
  if (textarea) {
    textarea.innerHTML = withoutTags;
    return textarea.value;
  }
  
  // 서버 사이드에서는 기본 엔티티만 디코딩
  return withoutTags
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

// ============================================
// [Implementation] PostCard Component
// ============================================
export function PostCard({ post, priority = false }: PostCardProps) {
  // [Security] Safe Fallbacks
  const title = post.title || '제목 없음';
  const excerpt = decodeAndStripHTML(post.excerpt || '');
  const featuredImageUrl = post.featuredImage?.node?.sourceUrl || null;
  const categories = post.categories?.nodes || [];
  const date = post.date ? new Date(post.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
        {/* [GEO] Featured Image with CLS Defense - Always Show Container */}
        <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
          {featuredImageUrl ? (
            <Image
              src={featuredImageUrl}
              alt={post.featuredImage?.node?.altText || title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className="w-16 h-16 text-slate-400" strokeWidth={1.5} />
            </div>
          )}
        </div>

        <CardHeader className="space-y-3">
          {/* [GEO] Categories as Badges */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 2).map((category) => (
                <Badge 
                  key={category.slug} 
                  variant="secondary" 
                  className="text-xs font-medium"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          )}

          {/* [GEO] Semantic Title */}
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>

          {/* [Design] Date */}
          {date && (
            <CardDescription className="text-xs">
              {date}
            </CardDescription>
          )}
        </CardHeader>

        {/* [GEO] Excerpt for Snippet */}
        {excerpt && (
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
