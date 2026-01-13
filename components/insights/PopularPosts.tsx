/**
 * [Sidebar] Popular Posts Widget
 * Displays top 5 popular posts
 */

"use client";

import Link from "next/link";
import { WPContent } from "@/lib/types";
import { TrendingUp } from "lucide-react";

interface PopularPostsProps {
  posts: WPContent[];
  currentPostId?: number;
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

export function PopularPosts({ posts, currentPostId }: PopularPostsProps) {
  // Filter out current post and take top 5
  const popularPosts = posts
    .filter(post => post.databaseId !== currentPostId)
    .slice(0, 5);

  if (popularPosts.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-blue-50">
          <TrendingUp className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">인기 글</h3>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {popularPosts.map((post, index) => {
          const date = post.date ? new Date(post.date).toLocaleDateString('ko-KR', {
            month: 'short',
            day: 'numeric'
          }) : '';

          return (
            <Link
              key={post.databaseId}
              href={`/insights/${post.slug}`}
              className="group block"
            >
              <div className="flex gap-3">
                {/* Number Badge */}
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 group-hover:bg-blue-600 text-slate-600 group-hover:text-white flex items-center justify-center text-sm font-bold transition-colors">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 line-clamp-2 transition-colors leading-snug mb-1">
                    {decodeHTMLEntities(post.title || '')}
                  </h4>
                  {date && (
                    <p className="text-xs text-slate-500">{date}</p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
