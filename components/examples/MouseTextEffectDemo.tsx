/**
 * [Demo] MouseTextEffect 사용 예시
 * [Usage] 어디서든 import해서 사용 가능
 */

"use client";

import { MouseTextEffect } from "@/components/ui/mouse-text-effect";
import { MouseTextEffectAdvanced } from "@/components/ui/mouse-text-effect-advanced";

export function MouseTextEffectDemo() {
  return (
    <div className="space-y-12 p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white min-h-screen flex flex-col items-center justify-center">
      {/* Example 1: Basic Usage */}
      <section className="text-center space-y-4">
        <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
          Basic MouseTextEffect
        </h2>
        <div className="text-5xl md:text-7xl font-bold">
          <MouseTextEffect className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Hover Me
          </MouseTextEffect>
        </div>
        <p className="text-slate-400 text-sm">
          마우스를 텍스트 위에 올려보세요 ✨
        </p>
      </section>

      {/* Example 2: Advanced Character-by-Character */}
      <section className="text-center space-y-4">
        <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
          Advanced Character Animation
        </h2>
        <div className="text-4xl md:text-6xl font-bold">
          <MouseTextEffectAdvanced 
            intensity={0.3}
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"
          >
            Interactive Text
          </MouseTextEffectAdvanced>
        </div>
        <p className="text-slate-400 text-sm">
          각 글자가 독립적으로 반응합니다 🎯
        </p>
      </section>

      {/* Example 3: Real-world Use Case - Hero Title */}
      <section className="text-center space-y-6 mt-12">
        <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
          실제 사용 예시 - Hero Section
        </h2>
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <MouseTextEffectAdvanced 
              intensity={0.15}
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            >
              피앤에이컴퍼니
            </MouseTextEffectAdvanced>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300">
            <MouseTextEffect className="inline-block">
              데이터 기반 성과 마케팅 전문
            </MouseTextEffect>
          </p>
        </div>
      </section>

      {/* Example 4: Multiple Effects */}
      <section className="text-center space-y-4 mt-12">
        <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
          Multiple Text Elements
        </h2>
        <div className="space-y-2">
          <div className="text-3xl font-bold">
            <MouseTextEffect className="text-green-400">
              ROI 200%
            </MouseTextEffect>
            <span className="text-slate-500 mx-4">|</span>
            <MouseTextEffect className="text-blue-400">
              10년+ 경험
            </MouseTextEffect>
            <span className="text-slate-500 mx-4">|</span>
            <MouseTextEffect className="text-purple-400">
              GEO 최적화
            </MouseTextEffect>
          </div>
        </div>
      </section>

      {/* Usage Guide */}
      <section className="mt-16 p-8 bg-slate-800/50 rounded-lg border border-slate-700 max-w-3xl">
        <h3 className="text-xl font-bold mb-4 text-slate-200">💡 사용 방법</h3>
        <div className="space-y-3 text-sm text-slate-300">
          <p>
            <code className="px-2 py-1 bg-slate-900 rounded text-cyan-400">
              MouseTextEffect
            </code>
            {" "}전체 텍스트가 함께 움직입니다
          </p>
          <p>
            <code className="px-2 py-1 bg-slate-900 rounded text-cyan-400">
              MouseTextEffectAdvanced
            </code>
            {" "}각 글자가 독립적으로 반응합니다
          </p>
          <p className="text-xs text-slate-400 mt-4">
            * intensity 값을 조절하여 효과 강도를 변경할 수 있습니다 (0.1 = 미세함, 0.5 = 강함)
          </p>
        </div>
      </section>
    </div>
  );
}
