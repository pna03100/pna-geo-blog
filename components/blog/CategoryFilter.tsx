/**
 * [GEO] Category Filter Component - Client-Side Navigation
 * [Security] Type-Safe Props
 * [Design] Tailwind CSS + Shadcn/UI Badge
 */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

// ============================================
// [Security] Interface for Props
// ============================================
interface CategoryFilterProps {
  categories: Array<{
    name: string;
    slug: string;
    count: number;
  }>;
}

// ============================================
// [Implementation] CategoryFilter Component
// ============================================
export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  // [Implementation] Handle Category Click
  const handleCategoryClick = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    
    // Reset to page 1 when changing category
    params.delete('page');
    
    const queryString = params.toString();
    router.push(queryString ? `/blog?${queryString}` : '/blog');
  };

  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {/* All Posts Badge */}
      <Badge
        variant={!currentCategory ? 'default' : 'outline'}
        className="cursor-pointer transition-all hover:scale-105"
        onClick={() => handleCategoryClick(null)}
      >
        전체
      </Badge>

      {/* Category Badges */}
      {categories.map((category) => (
        <Badge
          key={category.slug}
          variant={currentCategory === category.slug ? 'default' : 'outline'}
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => handleCategoryClick(category.slug)}
        >
          {category.name} ({category.count})
        </Badge>
      ))}
    </div>
  );
}
