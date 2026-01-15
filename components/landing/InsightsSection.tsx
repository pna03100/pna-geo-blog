/**
 * [Section] Insights - Latest WordPress Posts
 * [Design] Uses shared PostCard component from insights page
 * [Animation] Scroll-triggered entrance for post cards
 */

"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { SectionWrapper } from "./SectionWrapper";
import { SectionTitle } from "./SectionTitle";
import { PostCard } from "@/components/insights/PostCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WPContent } from "@/lib/types";

interface InsightsSectionProps {
  posts: WPContent[];
}

export function InsightsSection({ posts }: InsightsSectionProps) {
  // 최신 3개 글만 표시
  const latestPosts = posts?.slice(0, 3) || [];

  // 데이터가 없으면 로딩 메시지 표시
  if (!posts || posts.length === 0) {
    return (
      <SectionWrapper id="insights" className="bg-[#0B0C10] overflow-hidden" data-section="INSIGHTS">
        {/* SECTION: #INSIGHTS */}
        {/* Cyber Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(to right, #2563EB 1px, transparent 1px), linear-gradient(to bottom, #2563EB 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
        
        <div className="relative">
          <div className="mb-12 md:mb-16 text-center">
            {/* Badge */}
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 shadow-lg shadow-blue-600/20 text-blue-400 text-xs md:text-sm font-semibold mb-5 md:mb-7">
              Insights
            </span>
            
            {/* Title */}
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight" style={{ letterSpacing: '-1.5px', lineHeight: '1.3' }}>
              마케팅 인사이트
            </h2>
            
            {/* Description */}
            <p className="text-base md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
              곧 유용한 마케팅 인사이트를 공유하겠습니다
            </p>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="insights" className="bg-[#0B0C10] overflow-hidden" data-section="INSIGHTS">
      {/* SECTION: #INSIGHTS */}
      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(to right, #2563EB 1px, transparent 1px), linear-gradient(to bottom, #2563EB 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />
      
      {/* Blue Glow Accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      
      <div className="relative">
        {/* Header - Dark Mode */}
        <div className="mb-12 md:mb-16 text-center">
          {/* Badge */}
          <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 shadow-lg shadow-blue-600/20 text-blue-400 text-xs md:text-sm font-semibold mb-5 md:mb-7">
            Insights
          </span>
          
          {/* Title */}
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight" style={{ letterSpacing: '-1.5px', lineHeight: '1.3' }}>
            마케팅 인사이트
          </h2>
          
          {/* Description */}
          <p className="text-base md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            데이터 기반 성과 마케팅을 위한 실무 노하우와 최신 트렌드를 공유합니다
          </p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {latestPosts.map((post, index) => (
          <FadeIn key={post.slug || index} delay={index * 0.1}>
            <PostCard post={post} priority={index === 0} />
          </FadeIn>
        ))}
      </div>

      {/* View All Link - Dark Mode */}
      <FadeIn delay={0.4}>
        <div className="text-center mt-12">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-blue-500/30 bg-blue-600/10 hover:border-blue-400 hover:bg-blue-600/20 text-blue-400 font-bold transition-all group"
          >
            <span>모든 인사이트 보기</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </FadeIn>
      </div>
    </SectionWrapper>
  );
}
