/**
 * [Section] Insights - Latest WordPress Posts
 * [Design] Uses shared PostCard component from insights page
 */

"use client";

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
      <SectionWrapper id="insights" className="overflow-hidden" data-section="INSIGHTS">
        {/* SECTION: #INSIGHTS */}
        
        <div className="relative">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              인사이트
            </span>
          </div>
          
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.2' }}>
              마케팅 인사이트
            </h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl">
              곧 유용한 마케팅 인사이트를 공유하겠습니다
            </p>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="insights" className="overflow-hidden" data-section="INSIGHTS">
      {/* SECTION: #INSIGHTS */}
      
      <div className="relative">
        {/* Header */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            인사이트
          </span>
        </div>
        
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.2' }}>
            마케팅 인사이트
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl">
            데이터 기반 성과 마케팅을 위한 실무 노하우와 최신 트렌드를 공유합니다
          </p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {latestPosts.map((post, index) => (
          <PostCard key={post.slug || index} post={post} priority={index === 0} />
        ))}
      </div>

      {/* View All Link - Light Mode */}
      <div className="text-center mt-12">
        <Link
          href="/insights"
          className="btn-premium-primary !bg-blue-50 !text-blue-700 !border-blue-200 hover:!bg-blue-600 hover:!text-white hover:!border-blue-600 group"
        >
          <span>모든 인사이트 보기</span>
          <ArrowRight className="w-5 h-5 arrow-premium" />
        </Link>
      </div>
      </div>
    </SectionWrapper>
  );
}
