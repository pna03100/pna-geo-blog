'use client';

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// [Structure] 워드프레스에서 받을 데이터의 모양을 정의합니다.
interface HeroProps {
  title: string;       // H1 제목
  description: string; // 본문 설명
  ctaText?: string;    // 버튼 텍스트 (옵션)
  ctaLink?: string;    // 버튼 링크 (옵션)
}

export function HeroSection({ 
  title, 
  description, 
  ctaText = "Get Started", 
  ctaLink = "/contact-us" 
}: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      
      {/* 1. Aurora Background (Style) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] opacity-50 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] opacity-30" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      {/* 2. Semantic Content (Data Binding) */}
      <div className="z-10 text-center max-w-4xl px-4">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-gray-300">Next-Gen GEO Architecture</span>
        </motion.div>

        {/* Main Heading (Dynamic Data) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6"
          // [GEO] dangerouslySetInnerHTML을 쓰지 않고 텍스트로 렌더링하여 안전 확보
        >
          {title}
        </motion.h1>

        {/* Subtext (Dynamic Data) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href={ctaLink}>
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold rounded-full h-12 px-8">
              {ctaText}
            </Button>
          </Link>
          
          <Link href="/insights">
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full h-12 px-8 group">
              Check Demo 
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}