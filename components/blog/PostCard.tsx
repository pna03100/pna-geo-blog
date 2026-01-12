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

// ============================================
// [Security] Interface for Props
// ============================================
interface PostCardProps {
  post: WPContent;
  priority?: boolean;
}

// ============================================
// [Implementation] PostCard Component
// ============================================
export function PostCard({ post, priority = false }: PostCardProps) {
  // [Security] Safe Fallbacks
  const title = post.title || '제목 없음';
  const excerpt = post.excerpt || '';
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
        {/* [GEO] Featured Image with CLS Defense */}
        {featuredImageUrl && (
          <div className="relative aspect-video bg-muted overflow-hidden">
            <Image
              src={featuredImageUrl}
              alt={post.featuredImage?.node?.altText || title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
            />
          </div>
        )}

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
            <p 
              className="text-sm text-muted-foreground line-clamp-3 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
