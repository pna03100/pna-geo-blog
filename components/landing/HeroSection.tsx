// ============================================
// [GEO] Hero Section - Aurora Gradient Animation
// [Security] Client Component (Framer Motion)
// [Implementation] RSC-compatible, Performance-optimized
// ============================================

'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* [GEO] Aurora Background - GPU Accelerated */}
      <div className="aurora-gradient" aria-hidden="true" />
      <div className="grid-pattern absolute inset-0 opacity-30" aria-hidden="true" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* [GEO] New Feature Badge - AI Citation Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Badge 
            variant="secondary" 
            className="glass-panel px-4 py-2 text-sm font-medium border-violet-500/20"
          >
            <Sparkles className="w-4 h-4 mr-2 text-violet-400" />
            <span className="text-white">
              New: <span className="text-violet-400">40% 더 빠른 로딩 속도</span>
            </span>
          </Badge>
        </motion.div>

        {/* [GEO] H1 - Gradient Title (AI Readability) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
            Beyond WordPress
          </span>
          <br />
          <span className="text-white">
            순수 엔지니어링의 미학
          </span>
        </motion.h1>

        {/* [GEO] Subtext with Statistics (Chen et al. Citation Pattern) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
        >
          Elementor의 무거운 레거시를 벗어나{' '}
          <span className="text-violet-400 font-semibold">
            Next.js 14로 구축된 초고속 웹사이트
          </span>
          . 평균 로딩 시간 <span className="text-white font-bold">0.8초</span>, 
          Lighthouse 점수 <span className="text-white font-bold">98점</span> 달성.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button 
            size="lg" 
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/40 group"
          >
            프로젝트 시작하기
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="glass-panel border-white/10 text-white hover:bg-white/5 px-8 py-6 text-lg rounded-xl"
          >
            포트폴리오 보기
          </Button>
        </motion.div>

        {/* [GEO] Trust Signal - Expert Citation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 text-sm text-gray-500"
        >
          ⚡ Trusted by <span className="text-violet-400 font-semibold">500+ 고객사</span>
          {' '}| 평균 ROI <span className="text-white font-bold">240% 증가</span>
        </motion.div>
      </div>

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true" />
    </section>
  );
}



