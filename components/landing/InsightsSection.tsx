/**
 * [Section] Insights - Latest WordPress Posts
 * [Design] Clean card layout with current design system
 */

"use client";

import { FadeIn } from "./FadeIn";
import { SectionWrapper } from "./SectionWrapper";
import Link from "next/link";
import { Calendar, ArrowRight, FileText } from "lucide-react";
import { WPContent } from "@/lib/types";
import { getCategoryColor } from "@/lib/category-colors";

// HTML 엔티티 디코딩 함수
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

interface InsightsSectionProps {
  posts: WPContent[];
}

export function InsightsSection({ posts }: InsightsSectionProps) {
  // 최신 3개 글만 표시
  const latestPosts = posts?.slice(0, 3) || [];

  // 데이터가 없으면 로딩 메시지 표시
  if (!posts || posts.length === 0) {
    return (
      <SectionWrapper id="insights">
        <div className="text-center mb-12 md:mb-16">
          <FadeIn>
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-900/5 text-blue-600 text-xs md:text-sm font-semibold mb-4 md:mb-6">
              Insights
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-6xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight leading-tight">
              마케팅 인사이트
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              곧 유용한 마케팅 인사이트를 공유하겠습니다
            </p>
          </FadeIn>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="insights">
      <div className="text-center mb-12 md:mb-16">
        <FadeIn>
          <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-900/5 text-blue-600 text-xs md:text-sm font-semibold mb-4 md:mb-6">
            Insights
          </span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-6xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight leading-tight">
            마케팅 인사이트
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            데이터 기반 성과 마케팅을 위한<br />
            실무 노하우와 최신 트렌드를 공유합니다
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {latestPosts.map((post, index) => {
          // 날짜 포맷팅
          const date = post.date ? new Date(post.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : '';

          // Excerpt에서 HTML 태그 제거 및 엔티티 디코딩
          const cleanExcerpt = post.excerpt
            ? decodeHTMLEntities(post.excerpt.replace(/<[^>]*>/g, '')).substring(0, 120) + '...'
            : '';

          return (
            <FadeIn key={post.databaseId} delay={0.1 * index} className="h-full">
              <Link 
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-xl md:rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden"
              >
                {/* Featured Image - Always Show Container */}
                <div className="relative w-full h-40 md:h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  {post.featuredImage?.node?.sourceUrl ? (
                    <>
                      <img
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title || ''}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </>
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
                <div className="p-4 md:p-6 flex flex-col">
                  {/* Date */}
                  {date && (
                    <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-slate-500 mb-2 md:mb-3">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{date}</span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-base md:text-xl font-bold text-slate-900 mb-2 md:mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {decodeHTMLEntities(post.title || '')}
                  </h3>

                  {/* Excerpt - Fixed 3 lines */}
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-2 md:mb-3 line-clamp-3">
                    {cleanExcerpt || '내용이 없습니다.'}
                  </p>

                  {/* Read More Link - Small Button */}
                  <div className="flex items-center gap-1 md:gap-1.5 text-blue-600 font-medium text-[0.65rem] md:text-xs group-hover:gap-2 transition-all">
                    <span>자세히 보기</span>
                    <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </div>

      {/* View All Link */}
      {posts.length > 3 && (
        <FadeIn delay={0.4}>
          <div className="text-center mt-8 md:mt-12">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-white border border-slate-300 text-sm md:text-base text-slate-900 font-bold hover:bg-slate-50 hover:border-blue-600 hover:text-blue-600 transition-all shadow-lg"
            >
              모든 인사이트 보기
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </FadeIn>
      )}
    </SectionWrapper>
  );
}
