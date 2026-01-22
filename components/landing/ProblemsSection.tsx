/**
 * [Section] Problems - Sticky Title Layout
 * [Design] Left sticky title + Right scrolling cards
 */

"use client";

import Image from "next/image";

const problems = [
  {
    number: "01",
    title: "비효율적 예산 집행",
    subtitle: "ROAS Stagnation",
    description: "광고비를 2배로 늘려도 매출은 2배가 되지 않습니다. 성과 한계선(Marginal Utility)을 돌파할 구조 없이 예산만 증액하는 것은 밑 빠진 독에 물 붓기입니다.",
    image: "/images/hero/performance-hero-bg.jpg"
  },
  {
    number: "02",
    title: "AI 검색 시대의 고립",
    subtitle: "Invisible in AI Search (GEO)",
    description: "검색의 패러다임이 생성형 AI(ChatGPT, SearchGPT)로 이동했습니다. 기존의 키워드 SEO만으로는 더 이상 고객의 질문에 답변할 수 없습니다.",
    image: "/images/hero/seo-hero-bg.jpg"
  },
  {
    number: "03",
    title: "전환이 없는 웹사이트",
    subtitle: "Broken Conversion Funnel",
    description: "유입된 고객이 구매까지 이어지지 않습니다. 심미적인 디자인에 치중해 설득과 전환을 위한 UX/UI 설계가 부재하기 때문입니다.",
    image: "/images/hero/wordpress-hero-bg.jpg"
  },
  {
    number: "04",
    title: "데이터 결정 장애",
    subtitle: "Data Paralysis",
    description: "GA4와 광고 관리자에 수많은 데이터가 쌓이지만, 정작 '다음 행동'을 결정하지 못합니다. 인사이트를 추출하는 의사결정 시스템이 없습니다.",
    image: "/images/hero/company-hero-bg.jpg"
  }
];

export function ProblemsSection() {
  return (
    <section className="py-20 md:py-32" data-section="PROBLEMS">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Grid Layout for Sticky */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-20">
          
          {/* Left Column: Sticky Title */}
          <div className="sticky top-36 self-start h-fit">
            <div className="badge-dot mb-6">
              The Structural Problem
            </div>
            
            <h2 className="section-title mb-6">
              구글 광고를 운영해도<br/>
              <span className="text-slate-400">성과가 나지 않는</span><br/>
              구조적 이유
            </h2>
            
            <p className="section-description">
              마케팅 예산을 늘려도 효율은 제자리걸음입니다. 이것은 단순한 운영의 문제가 아니라, 비즈니스를 지탱하는 '구조'의 결함입니다.
            </p>
          </div>

          {/* Right Column: Scrolling Problem Cards */}
          <div className="space-y-20 md:space-y-24">
            {problems.map((problem, index) => (
              <div key={index}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr,300px] gap-8 items-start">
                  
                  {/* Left: Text */}
                  <div>
                    <p className="text-sm text-blue-600 font-bold mb-3 tracking-widest">{problem.number}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight leading-tight">
                      {problem.title}
                    </h3>
                    <p className="text-base text-blue-600 font-semibold mb-4 tracking-wide">{problem.subtitle}</p>
                    <p className="text-base text-slate-600 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>

                  {/* Right: Image */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                    <Image
                      src={problem.image}
                      alt={problem.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                </div>
                
                {/* Divider - 마지막 항목 제외 */}
                {index < problems.length - 1 && (
                  <div className="mt-20 md:mt-24">
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
