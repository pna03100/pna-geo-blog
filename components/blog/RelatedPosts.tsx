/**
 * [Section] Related Posts
 * Shows related posts at the bottom of article
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { WPContent } from "@/lib/types";
import { Calendar, FileText, ArrowRight } from "lucide-react";
import { getCategoryColor } from "@/lib/category-colors";

interface RelatedPostsProps {
  posts: WPContent[];
  currentPostId: number;
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

export function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  // Filter out current post and take 3 random posts
  const relatedPosts = posts
    .filter(post => post.databaseId !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-16 border-t border-slate-200">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
          Related Posts
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          함께 읽으면 좋은 글
        </h2>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => {
          const date = post.date ? new Date(post.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : '';

          const excerpt = post.excerpt
            ? decodeHTMLEntities(post.excerpt.replace(/<[^>]*>/g, '')).substring(0, 100) + '...'
            : '';

          return (
            <Link
              key={post.databaseId}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden"
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
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-slate-400" strokeWidth={1.5} />
                  </div>
                )}
                
                {/* Category Badge - Top Left */}
                {post.categories?.nodes && post.categories.nodes.length > 0 && (() => {
                  const category = post.categories.nodes[0];
                  const colors = getCategoryColor(category.name);
                  const bgColorMatch = colors.bg.match(/\[([#\w]+)\]/);
                  const bgColor = bgColorMatch ? bgColorMatch[1] : '#4285F4';
                  
                  return (
                    <div className="absolute top-3 left-3 flex gap-2 z-10">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
                        style={{
                          backgroundColor: bgColor,
                          color: colors.text === 'text-white' ? 'white' : '#0f172a'
                        }}
                      >
                        {category.name}
                      </span>
                    </div>
                  );
                })()}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                {date && (
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{date}</span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                  {decodeHTMLEntities(post.title || '')}
                </h3>

                {/* Excerpt */}
                {excerpt && (
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                    {excerpt}
                  </p>
                )}

                {/* Read More */}
                <div className="flex items-center gap-1.5 text-blue-600 font-medium text-xs group-hover:gap-2 transition-all">
                  <span>자세히 보기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
