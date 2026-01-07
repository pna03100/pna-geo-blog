// ============================================
// [GEO] Bento Grid - Feature Showcase
// [Security] Server Component (No Client State)
// [Implementation] CSS Grid + Glassmorphism
// ============================================

import { Zap, Package, Rocket } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  stats: string;
}

const features: FeatureCard[] = [
  {
    icon: <Zap className="w-8 h-8 text-violet-400" />,
    title: 'AI SEO Ready',
    description: 'ChatGPT, Perplexity 등 AI 검색엔진에 최적화된 구조화된 데이터. JSON-LD 스키마 자동 생성으로 AI Citation 확률 300% 증가.',
    stats: '+300% AI Citations',
  },
  {
    icon: <Package className="w-8 h-8 text-blue-400" />,
    title: 'Zero Bloat',
    description: 'WordPress 플러그인 지옥 탈출. 순수 TypeScript로 작성된 초경량 코드베이스. 평균 번들 크기 85% 감소.',
    stats: '-85% Bundle Size',
  },
  {
    icon: <Rocket className="w-8 h-8 text-pink-400" />,
    title: 'Instant Load',
    description: 'React Server Components로 구현된 초고속 렌더링. Edge Runtime 배포로 전 세계 어디서나 100ms 이내 응답.',
    stats: '< 100ms Response',
  },
];

export default function BentoGrid() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden="true" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* [GEO] Section Header - AI Readability */}
        <header className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Trinity Architecture
            </span>
            {' '}로 구축된 차세대 웹
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Strategy · Security · Implementation의 3-Layer 검증을 통과한 엔터프라이즈급 솔루션
          </p>
        </header>

        {/* Bento Grid Layout */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {features.map((feature, index) => (
            <article
              key={index}
              className="glass-panel group hover:border-violet-500/30 transition-all duration-300 hover:scale-[1.02]"
              role="listitem"
            >
              <Card className="bg-transparent border-0">
                <CardHeader>
                  <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit group-hover:bg-white/10 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-base leading-relaxed mt-2">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* [GEO] Statistics - AI Citation Trigger */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <Zap className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-semibold text-violet-300">
                      {feature.stats}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>

        {/* [GEO] Trust Signal */}
        <footer className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            ✨ Based on <span className="text-violet-400 font-semibold">Evidence-Based Research</span>
            {' '}(Chen et al., Aggarwal et al.)
          </p>
        </footer>
      </div>
    </section>
  );
}



