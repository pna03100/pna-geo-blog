/**
 * [Client] Insights Page - Premium Blue Theme
 * [Design] Matching Main Page tone & manner
 */

"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { WPContent } from "@/lib/types";
import { CategoryFilter } from "@/components/insights/CategoryFilter";
import { Calendar, FileText, ArrowRight, Sparkles } from "lucide-react";
import { getCategoryColor } from "@/lib/category-colors";

interface InsightsClientProps {
  posts: WPContent[];
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

export function InsightsClient({ posts }: InsightsClientProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');

  // Update selected category when URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Extract categories and count
  const categories = useMemo(() => {
    // Define category display names
    const CATEGORY_NAMES: Record<string, string> = {
      '구글 애즈': '구글 애즈',
      '구글애즈': '구글 애즈',
      'google-ads': '구글 애즈',
      '워드프레스 & SEO': '워드프레스 & SEO',
      '워드프레스 & seo': '워드프레스 & SEO',
      '워드프레스': '워드프레스 & SEO',
      'wordpress': '워드프레스 & SEO',
      'wordpress-seo': '워드프레스 & SEO',
      'AI 마케팅 & GEO': 'AI 마케팅 & GEO',
      'AI 마케팅 & geo': 'AI 마케팅 & GEO',
      'AI': 'AI 마케팅 & GEO',
      'ai-marketing-geo': 'AI 마케팅 & GEO',
      '마케팅 인사이트': '마케팅 인사이트',
      '마케팅': '마케팅 인사이트',
      'marketing': '마케팅 인사이트',
      'marketing-insights': '마케팅 인사이트',
      '데이터 & 분석': '데이터 & 분석',
      '데이터': '데이터 & 분석',
      'data-analytics': '데이터 & 분석',
      '소셜 미디어 광고': '소셜 미디어 광고',
      '소셜미디어': '소셜 미디어 광고',
      'social-media-ads': '소셜 미디어 광고',
    };

    // Collect all unique categories from posts
    const categoryMap = new Map<string, { slug: string; name: string; count: number }>();
    
    posts.forEach((post) => {
      post.categories?.nodes?.forEach((cat) => {
        const displayName = CATEGORY_NAMES[cat.name] || cat.name;
        const existing = categoryMap.get(displayName);
        
        if (existing) {
          existing.count++;
        } else {
          categoryMap.set(displayName, {
            slug: cat.slug,
            name: displayName,
            count: 1,
          });
        }
      });
    });

    // Add missing categories with 0 count
    const allCategories = [
      '구글 애즈',
      '워드프레스 & SEO',
      'AI 마케팅 & GEO',
      '데이터 & 분석',
      '소셜 미디어 광고',
    ];

    allCategories.forEach((name) => {
      if (!categoryMap.has(name)) {
        categoryMap.set(name, {
          slug: name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, ''),
          name,
          count: 0,
        });
      }
    });

    return Array.from(categoryMap.values());
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') return posts;
    
    // Find the selected category display name
    const selectedCategoryData = categories.find(cat => cat.slug === selectedCategory);
    if (!selectedCategoryData) return posts;

    // Category name mapping for flexible matching
    const CATEGORY_NAMES: Record<string, string> = {
      '구글 애즈': '구글 애즈',
      '구글애즈': '구글 애즈',
      'google-ads': '구글 애즈',
      '워드프레스 & SEO': '워드프레스 & SEO',
      '워드프레스 & seo': '워드프레스 & SEO',
      '워드프레스': '워드프레스 & SEO',
      'wordpress': '워드프레스 & SEO',
      'wordpress-seo': '워드프레스 & SEO',
      'AI 마케팅 & GEO': 'AI 마케팅 & GEO',
      'AI 마케팅 & geo': 'AI 마케팅 & GEO',
      'AI': 'AI 마케팅 & GEO',
      'ai-marketing-geo': 'AI 마케팅 & GEO',
      '마케팅 인사이트': '마케팅 인사이트',
      '마케팅': '마케팅 인사이트',
      'marketing': '마케팅 인사이트',
      'marketing-insights': '마케팅 인사이트',
      '데이터 & 분석': '데이터 & 분석',
      '데이터': '데이터 & 분석',
      'data-analytics': '데이터 & 분석',
      '소셜 미디어 광고': '소셜 미디어 광고',
      '소셜미디어': '소셜 미디어 광고',
      'social-media-ads': '소셜 미디어 광고',
    };
    
    return posts.filter((post) =>
      post.categories?.nodes?.some((cat) => {
        const normalizedName = CATEGORY_NAMES[cat.name] || cat.name;
        return normalizedName === selectedCategoryData.name || cat.slug === selectedCategory;
      })
    );
  }, [posts, selectedCategory, categories]);

  return (
    <main className="min-h-screen pt-[73px]">
      {/* Hero Section - NO ANIMATION for LCP */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Marketing Insights</span>
            </div>

            {/* Heading - NO ANIMATION for SEO & LCP */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.35]">
              마케팅 인사이트
            </h1>

            {/* Description */}
            <p className="text-xl text-blue-100 leading-relaxed">
              데이터 기반 성과 마케팅을 위한 실무 노하우와<br className="hidden md:block" />
              최신 트렌드를 공유합니다
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-[73px] z-30 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl py-6">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            totalPosts={posts.length}
          />
        </div>
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 md:px-6 max-w-7xl pt-16 pb-32">
        {filteredPosts.length === 0 ? (
          // Empty State
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 mb-6">
              <Sparkles className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              곧 만나요! 새로운 인사이트를 준비 중입니다
            </h2>
            <p className="text-slate-600 mb-6 whitespace-pre-line">
              양질의 콘텐츠로 찾아뵙겠습니다.{'\n'}다른 카테고리의 인사이트를 먼저 살펴보세요 😊
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              전체 글 보기
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => {
              const date = post.date ? new Date(post.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : '';

              const excerpt = post.excerpt
                ? decodeHTMLEntities(post.excerpt.replace(/<[^>]*>/g, '')).substring(0, 120) + '...'
                : '';

              // Get first category slug for back navigation
              const categorySlug = post.categories?.nodes && post.categories.nodes.length > 0
                ? post.categories.nodes[0].slug
                : '';

              return (
                <div key={post.databaseId}>
                  <Link
                    href={`/insights/${post.slug}${selectedCategory !== 'all' ? `?category=${selectedCategory}` : categorySlug ? `?category=${categorySlug}` : ''}`}
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
                      <div className="flex items-center gap-1.5 text-blue-600 font-medium text-xs group-hover:gap-2 transition-all">
                        <span>자세히 보기</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Insights - 피앤에이컴퍼니',
            description: 'Google Ads, SEO, GEO 최적화 마케팅 인사이트',
            url: 'https://pnamarketing.co.kr/insights',
            blogPost: posts.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              datePublished: post.date,
              url: `https://pnamarketing.co.kr/insights/${post.slug}`,
            })),
          }),
        }}
      />
    </main>
  );
}
