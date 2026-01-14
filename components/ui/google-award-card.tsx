/**
 * [Component] Google Award Card - Premium Edition
 * [Design] Clean, Modern, Sophisticated with subtle accents
 * [Purpose] Highlight "2023 Google Top 100 Campaign" Achievement
 */

"use client";

import { Trophy, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function GoogleAwardCard() {
  return (
    <div className="relative w-full max-w-6xl mx-auto my-12 md:my-16">
      {/* Premium Card with Sophisticated Design */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative group"
      >
        {/* Subtle Blue Border Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
        
        {/* Main Card */}
        <div className="relative bg-white rounded-3xl border-2 border-slate-200 shadow-2xl overflow-hidden">
          {/* Subtle Pattern Background */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(37 99 235) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
          
          {/* Content Container */}
          <div className="relative p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
              
              {/* Left: Award Info */}
              <div className="text-center md:text-left">
                {/* Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold text-blue-600">Official Recognition</span>
                </motion.div>

                {/* Main Title */}
                <div className="mb-4">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                    <span className="text-3xl">🏆</span>
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-purple-600" style={{ lineHeight: '1.1' }}>
                      TOP 100
                    </h3>
                    <span className="text-3xl">🏆</span>
                  </div>
                </div>
                
                <h4 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3" style={{ lineHeight: '1.3' }}>
                  구글 우수 100대 캠페인
                </h4>
                <p className="text-lg md:text-xl text-slate-600 font-medium" style={{ lineHeight: '1.5' }}>
                  2023년 공식 선정 🇰🇷
                </p>

                {/* Trust Badge */}
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200">
                  <Trophy className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">Google Korea Official Award</span>
                </div>
              </div>

              {/* Right: Year & Rank Cards */}
              <div className="flex justify-center gap-4">
                {/* 2023 Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative group/card"
                >
                  <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-0 group-hover/card:opacity-20 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl min-w-[120px] text-center">
                    <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">2023</div>
                    <div className="text-sm font-bold text-slate-600">Year</div>
                  </div>
                </motion.div>

                {/* TOP 100 Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="relative group/card"
                >
                  <div className="absolute inset-0 bg-orange-500 rounded-2xl blur-lg opacity-0 group-hover/card:opacity-20 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-300 hover:border-orange-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl min-w-[120px] text-center">
                    <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-2">TOP</div>
                    <div className="text-sm font-bold text-slate-600">100</div>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>

          {/* Bottom Accent Line */}
          <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        </div>
      </motion.div>
    </div>
  );
}
