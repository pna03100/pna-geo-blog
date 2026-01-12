/**
 * [Demo] 간단한 MouseTextEffect 테스트
 */

"use client";

import { MouseTextEffectSimple } from "@/components/ui/mouse-text-effect-simple";

export default function SimpleDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-12">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* 헤더 */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-300">
            MouseTextEffect 데모
          </h1>
          <p className="text-slate-400">
            마우스를 텍스트 위에 올려보세요 ✨
          </p>
        </header>

        {/* 테스트 1: 간단한 버전 */}
        <section className="p-8 bg-slate-800/50 rounded-lg border border-slate-700">
          <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-6">
            1. MouseTextEffect (Simple)
          </h2>
          <div className="text-5xl font-bold text-center">
            <MouseTextEffectSimple className="text-purple-400">
              Hover Me
            </MouseTextEffectSimple>
          </div>
        </section>

        {/* 테스트 2: 그라디언트 */}
        <section className="p-8 bg-slate-800/50 rounded-lg border border-slate-700">
          <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-6">
            2. 그라디언트 텍스트
          </h2>
          <div className="text-6xl font-bold text-center">
            <MouseTextEffectSimple className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              피앤에이컴퍼니
            </MouseTextEffectSimple>
          </div>
        </section>

        {/* 테스트 3: 여러 요소 */}
        <section className="p-8 bg-slate-800/50 rounded-lg border border-slate-700">
          <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-6">
            3. 여러 요소
          </h2>
          <div className="flex justify-center gap-8 text-3xl font-bold flex-wrap">
            <MouseTextEffectSimple className="text-green-400">
              ROI 200%
            </MouseTextEffectSimple>
            <MouseTextEffectSimple className="text-blue-400">
              10년+ 경험
            </MouseTextEffectSimple>
            <MouseTextEffectSimple className="text-purple-400">
              GEO 최적화
            </MouseTextEffectSimple>
          </div>
        </section>

        {/* 사용 가이드 */}
        <section className="p-8 bg-slate-800/50 rounded-lg border border-slate-700">
          <h3 className="text-xl font-bold mb-4 text-slate-200">💡 사용 방법</h3>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-3 bg-slate-900 rounded">
              <code className="text-cyan-400">
                {`<MouseTextEffectSimple>텍스트</MouseTextEffectSimple>`}
              </code>
              <p className="mt-2 text-slate-400">
                마우스를 따라 텍스트가 부드럽게 움직입니다
              </p>
            </div>
            <div className="p-3 bg-slate-900 rounded mt-3">
              <p className="text-slate-400">
                ✅ 간단하고 안정적인 버전<br/>
                ✅ 무한 로딩 문제 해결<br/>
                ✅ 모든 브라우저 지원
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
