/**
 * [Component] Award + Metrics Combined Card
 * [Design] Modern dark card with gradient border and clean layout
 */

"use client";

import { CountUpNumber } from "./CountUpNumber";
import { Trophy } from "lucide-react";

export function AwardMetricsCard() {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 md:p-16 border border-slate-700/50 shadow-2xl">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-bold mb-8 backdrop-blur-sm">
          <Trophy className="w-4 h-4" />
          <span>Google TOP 100</span>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-16 items-center">
          
          {/* Left: Award Text */}
          <div className="text-white">
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
              2023 Google<br/>
              Top 100 Campaign
            </h2>
            
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              수천 개의 대행사 중<br/>
              <strong className="text-white font-semibold">구글코리아가 직접 선정한</strong><br/>
              우수 캠페인 파트너십
            </p>
          </div>

          {/* Right: 3 Metrics - Vertical Stack on Mobile, Horizontal on Desktop */}
          <div className="grid grid-cols-3 gap-6">
            {/* Metric 1 */}
            <div className="text-center">
              <div className="flex flex-col items-center justify-center mb-3">
                <div className="flex items-baseline gap-1">
                  <CountUpNumber 
                    end={500} 
                    suffix="" 
                    className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text"
                  />
                  <span className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text">%</span>
                </div>
              </div>
              <p className="text-sm md:text-base text-slate-400 font-medium">평균 ROAS</p>
            </div>

            {/* Metric 2 */}
            <div className="text-center border-x border-slate-700/50">
              <div className="flex flex-col items-center justify-center mb-3">
                <div className="flex items-baseline gap-1">
                  <CountUpNumber 
                    end={470} 
                    suffix="" 
                    className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-br from-emerald-400 to-emerald-600 bg-clip-text"
                  />
                  <span className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-br from-emerald-400 to-emerald-600 bg-clip-text">억+</span>
                </div>
              </div>
              <p className="text-sm md:text-base text-slate-400 font-medium">누적 집행액</p>
            </div>

            {/* Metric 3 */}
            <div className="text-center">
              <div className="flex flex-col items-center justify-center mb-3">
                <div className="flex items-baseline gap-1">
                  <CountUpNumber 
                    end={15} 
                    suffix="" 
                    className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-br from-purple-400 to-purple-600 bg-clip-text"
                  />
                  <span className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-br from-purple-400 to-purple-600 bg-clip-text">년+</span>
                </div>
              </div>
              <p className="text-sm md:text-base text-slate-400 font-medium">실전 경력</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
