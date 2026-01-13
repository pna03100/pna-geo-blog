/**
 * [GEO] Pagination Component - Accessible & SEO-Friendly
 * [Security] Type-Safe Props
 * [Design] Tailwind CSS + Shadcn/UI Button
 */

'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================
// [Security] Interface for Props
// ============================================
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
}

// ============================================
// [Implementation] Pagination Component
// ============================================
export function Pagination({ 
  currentPage, 
  totalPages,
  baseUrl = '/blog'
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // [Security] Boundary Check
  if (totalPages <= 1) return null;

  // [Implementation] Generate Page URL
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  // [Implementation] Generate Page Numbers Array
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show with ellipsis
      if (currentPage <= 3) {
        // Near start
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav 
      aria-label="페이지네이션" 
      className="flex items-center justify-center gap-2 mt-12"
    >
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Button
          variant="outline"
          size="sm"
          asChild
        >
          <Link href={createPageUrl(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            이전
          </Link>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          disabled
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          이전
        </Button>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span 
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-muted-foreground"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <Button
              key={pageNum}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              asChild={!isActive}
              disabled={isActive}
              className={isActive ? 'pointer-events-none' : ''}
            >
              {isActive ? (
                <span>{pageNum}</span>
              ) : (
                <Link href={createPageUrl(pageNum)}>
                  {pageNum}
                </Link>
              )}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Button
          variant="outline"
          size="sm"
          asChild
        >
          <Link href={createPageUrl(currentPage + 1)}>
            다음
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          disabled
        >
          다음
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      )}
    </nav>
  );
}
