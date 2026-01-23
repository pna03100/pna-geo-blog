/**
 * [Section] Insights - Latest WordPress Posts
 * [Design] Uses shared PostCard component from insights page
 */

"use client";

import { SectionWrapper } from "./SectionWrapper";
import { SectionTitle } from "./SectionTitle";
import { PostCard } from "@/components/insights/PostCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
        
        <SectionHeader 
          badge="INSIGHTS"
          title="성과를 만드는 데이터와 전략 인사이트"
          description="곧 유용한 마케팅 인사이트를 공유하겠습니다"
        />
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="insights" className="overflow-hidden" data-section="INSIGHTS">
      {/* SECTION: #INSIGHTS */}
      
      <div className="relative">
        {/* Badge & Title */}
        <div className="mb-12 md:mb-16">
          <div className="badge-dot mb-6">INSIGHTS</div>
          <h2 className="section-title mb-6">성과를 만드는 데이터와 전략 인사이트</h2>
          
          {/* Description & View All Link - Same Row */}
          <div className="flex items-center justify-between gap-8">
            <p className="section-description max-w-3xl">
              데이터 기반 마케팅 전문가가 전하는 최신 트렌드와 성공 노하우
            </p>
            
            <Link 
              href="/insights" 
              className="group flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors flex-shrink-0"
            >
              <span className="text-sm font-semibold whitespace-nowrap">모든 인사이트 보기</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {latestPosts.map((post, index) => (
          <PostCard key={post.slug || index} post={post} priority={index === 0} />
        ))}
      </div>
      </div>
    </SectionWrapper>
  );
}
