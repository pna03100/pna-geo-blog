/**
 * [Client] Insights Page - Neo-Tech 2026 Edition
 * [Design] Clean White Hero + Magnetic Segmented Controls
 * [Performance] Keep tab logic, upgrade UI only
 */

"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { WPContent } from "@/lib/types";
import { PostCard } from "@/components/insights/PostCard";
import { Sparkles, ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";

interface InsightsClientProps {
  posts: WPContent[];
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
    <main className="min-h-screen pt-[73px] relative">
      {/* HERO SECTION */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        {/* 1. Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/insights-hero-bg.jpg.jpg"
            alt="Marketing Insights Background"
            fill
            className="object-cover"
            priority
          />
          {/* 2. Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* 3. Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">Marketing Insights</span>
          </motion.div>

          {/* Kinetic Typography Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ lineHeight: '1.35' }}>
            마케팅 인사이트
          </h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-200 font-medium max-w-3xl mx-auto"
          >
            데이터 기반 성과 마케팅을 위한 실무 노하우와 최신 트렌드
          </motion.p>
        </div>
      </section>

      {/* Magnetic Segmented Controls */}
      <section className="sticky top-[73px] z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl py-6">
          <div className="flex items-center justify-center">
            <div className="inline-flex bg-slate-100 rounded-full p-1.5">
              {/* All Tab */}
              <motion.button
                onClick={() => setSelectedCategory('all')}
                className={`
                  relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300
                  ${selectedCategory === 'all' 
                    ? 'text-blue-600' 
                    : 'text-slate-600 hover:text-slate-900'
                  }
                `}
              >
                {selectedCategory === 'all' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">전체 ({posts.length})</span>
              </motion.button>

              {/* Category Tabs */}
              {categories.map((category) => (
                <motion.button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`
                    relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300
                    ${selectedCategory === category.slug 
                      ? 'text-blue-600' 
                      : 'text-slate-600 hover:text-slate-900'
                    }
                  `}
                >
                  {selectedCategory === category.slug && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white rounded-full shadow-md"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category.name} ({category.count})</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid with Glass Cards */}
      <section className="container mx-auto px-4 md:px-6 max-w-7xl pt-16 pb-32">
        {filteredPosts.length === 0 ? (
          // Empty State
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center py-16"
          >
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
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.databaseId || post.slug || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <PostCard post={post} priority={index < 3} />
              </motion.div>
            ))}
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
