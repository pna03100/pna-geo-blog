/**
 * [Demo] 간단한 MouseTextEffect 테스트
 * [Design] 브랜드 컬러 준수 - Purple/Pink 제거, Blue 사용
 */

"use client";

import React from "react";
import { MouseTextEffectSimple } from "@/components/ui/mouse-text-effect-simple";
import { BlueprintBackground } from "@/components/ui/blueprint-background";

export default function SimpleDemo() {
  return (
    <div className="relative">
      <BlueprintBackground />
      
      <div className="min-h-screen relative pt-[73px] p-12">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* 헤더 */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">
            MouseTextEffect 데모
          </h1>
          <p className="text-slate-600">
            마우스를 텍스트 위에 올려보세요 ✨
          </p>
        </header>

        {/* 테스트 1: 간단한 버전 */}
        <section className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-medium text-slate-600 uppercase tracking-wider mb-6">
            1. MouseTextEffect (Simple)
          </h2>
          <div className="text-5xl font-bold text-center">
            <MouseTextEffectSimple className="text-blue-600">
              Hover Me
            </MouseTextEffectSimple>
          </div>
        </section>

        {/* 테스트 2: 그라디언트 */}
        <section className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-medium text-slate-600 uppercase tracking-wider mb-6">
            2. 그라디언트 텍스트
          </h2>
          <div className="text-6xl font-bold text-center">
            <MouseTextEffectSimple className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">
              피앤에이컴퍼니
            </MouseTextEffectSimple>
          </div>
        </section>

        {/* 테스트 3: 여러 요소 */}
        <section className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-medium text-slate-600 uppercase tracking-wider mb-6">
            3. 여러 요소
          </h2>
          <div className="flex justify-center gap-8 text-3xl font-bold flex-wrap">
            <MouseTextEffectSimple className="text-green-600">
              ROI 200%
            </MouseTextEffectSimple>
            <MouseTextEffectSimple className="text-blue-600">
              10년+ 경험
            </MouseTextEffectSimple>
            <MouseTextEffectSimple className="text-indigo-600">
              GEO 최적화
            </MouseTextEffectSimple>
          </div>
        </section>

        {/* 사용 가이드 */}
        <section className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-slate-900">💡 사용 방법</h3>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <code className="text-blue-600 font-mono">
                {`<MouseTextEffectSimple>텍스트</MouseTextEffectSimple>`}
              </code>
              <p className="mt-2 text-slate-600">
                마우스를 따라 텍스트가 부드럽게 움직입니다
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mt-3">
              <p className="text-slate-600">
                ✅ 간단하고 안정적인 버전<br/>
                ✅ 무한 로딩 문제 해결<br/>
                ✅ 모든 브라우저 지원
              </p>
            </div>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}
