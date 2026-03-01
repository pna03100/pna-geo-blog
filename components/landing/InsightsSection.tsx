/**
 * [Section] Insights - Latest WordPress Posts
 * [Design] Uses shared PostCard component from insights page
 */

"use client";

import { SectionWrapper } from "./SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PostCard } from "@/components/insights/PostCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WPContent } from "@/lib/types";
import { useState, useEffect } from "react";

interface InsightsSectionProps {
  posts: WPContent[];
}

export function InsightsSection({ posts }: InsightsSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일: 4개, 데스크톱: 3개
  const latestPosts = posts?.slice(0, isMobile ? 4 : 3) || [];

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
        <div className="mb-8 md:mb-16">
          <div className="badge-dot mb-6">INSIGHTS</div>
          <h2 className="section-title mb-6">성과를 만드는<br/>데이터와 전략 인사이트</h2>
          
          {/* Description & View All Link - 모바일: Description만, 데스크톱: Same Row */}
          <div className="md:flex md:items-center md:justify-between md:gap-8">
            <p className="section-description max-w-3xl">
              데이터 기반 마케팅 전문가가 전하는 최신 트렌드와 성공 노하우
            </p>
            
            {/* 데스크톱: 헤더 영역에 링크 */}
            <Link 
              href="/insights" 
              className="hidden md:flex group items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors flex-shrink-0"
            >
              <span className="text-sm font-semibold whitespace-nowrap">모든 인사이트 보기</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      {/* 모바일: 1열 (뉴스 스타일), 데스크톱: 3열 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 mb-6 md:mb-0">
        {latestPosts.map((post, index) => (
          <PostCard key={post.slug || index} post={post} />
        ))}
      </div>

      {/* 모바일: 카드 아래에 링크 */}
      <div className="md:hidden flex justify-center mt-6">
        <Link 
          href="/insights" 
          className="group flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <span className="text-sm font-semibold">모든 인사이트 보기</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      </div>
    </SectionWrapper>
  );
}
