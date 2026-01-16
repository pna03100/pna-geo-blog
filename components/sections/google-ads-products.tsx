/**
 * [Section] Google Ads Products - Dark Mode Bento Grid
 * [Design] Deep Black + Glass Cards + Blue Glow
 * [Content] 6 Campaign Types with Featured P-Max
 */

"use client";

import { 
  Cpu, Search, Monitor, Youtube, Smartphone, Zap
} from "lucide-react";

const products = [
  {
    id: "pmax",
    title: "실적최대화",
    subtitle: "Performance Max",
    icon: Cpu,
    description: "구글의 모든 지면(유튜브, 검색, 지도 등)을 AI가 실시간으로 학습하여, 단 하나의 캠페인으로 전환 성과를 극대화합니다.",
    keywords: ["#AI자동화", "#머신러닝", "#ROAS최적화"],
    featured: true
  },
  {
    id: "demand-gen",
    title: "디맨드젠",
    subtitle: "Demand Gen",
    icon: Zap,
    description: "YouTube Shorts, 디스커버, Gmail 등 몰입도 높은 지면에서 시각적 스토리텔링으로 구매 욕구를 자극합니다.",
    keywords: ["#숏폼광고", "#디스커버", "#구매수요창출"],
    featured: true
  },
  {
    id: "search",
    title: "검색",
    subtitle: "Search",
    icon: Search,
    description: "구매 의도가 확실한 고객이 키워드를 검색할 때, 최상단에 브랜드를 노출하여 즉각적인 전환을 유도합니다.",
    keywords: ["#키워드광고", "#상위노출"]
  },
  {
    id: "youtube",
    title: "유튜브",
    subtitle: "YouTube",
    icon: Youtube,
    description: "전 세계 1위 동영상 플랫폼에서 시청각적 몰입감을 통해 브랜드 스토리를 전달하고 팬덤을 구축합니다.",
    keywords: ["#영상광고", "#브랜딩", "#트루뷰"]
  },
  {
    id: "display",
    title: "디스플레이",
    subtitle: "Display",
    icon: Monitor,
    description: "300만 개 이상의 웹사이트와 앱에 배너를 노출하여, 광범위한 도달과 정교한 리타겟팅을 동시에 수행합니다.",
    keywords: ["#GDN", "#배너광고", "#리타겟팅"]
  },
  {
    id: "app",
    title: "앱",
    subtitle: "App",
    icon: Smartphone,
    description: "구글 검색, Play 스토어, 유튜브 등 다양한 경로를 통해 앱 설치를 유도하고 인앱 액션을 최적화합니다.",
    keywords: ["#앱설치", "#UAC", "#인앱액션"]
  },
];

export function GoogleAdsProducts() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.35' }}>
            Google Ads 캠페인 타입
          </h2>
          <p className="text-xl text-slate-600">
            목적에 맞는 6가지 광고 솔루션
          </p>
        </div>

        {/* Bento Grid - Asymmetrical Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
          {products.map((product, index) => {
            const Icon = product.icon;
            const spanClass = product.id === "pmax" ? "md:col-span-2 md:row-span-1" : "";
            
            return (
              <div key={product.id}>
                <div
                  className={`group relative bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-blue-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 will-change-transform ${spanClass}`}
                >
                  {/* Featured Badge */}
                  {product.featured && (
                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold">
                      FEATURED
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center transition-transform duration-200">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors" style={{ lineHeight: '1.35' }}>
                    {product.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-semibold mb-4">
                    {product.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-base text-slate-600 leading-relaxed mb-5">
                    {product.description}
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2">
                    {product.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
