'use client'
import React, { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Trophy, TrendingUp, Cpu, Activity } from "lucide-react"

export default function HeroVisual3D() {
  const ref = useRef<HTMLDivElement>(null)
  
  // Mouse State
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Physics: Stiffness(텐션), Damping(반동제어)
  const mouseX = useSpring(x, { stiffness: 200, damping: 20 })
  const mouseY = useSpring(y, { stiffness: 200, damping: 20 })

  // Rotation Mapping (마우스 위치에 따라 각도 비틀기)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"])

  // Glare Effect (빛 반사 위치)
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    
    const width = rect.width
    const height = rect.height
    
    const mouseXPos = e.clientX - rect.left
    const mouseYPos = e.clientY - rect.top
    
    // Normalize coordinates -0.5 to 0.5
    const xPct = mouseXPos / width - 0.5
    const yPct = mouseYPos / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center [perspective:1200px] overflow-visible z-20">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-[360px] md:w-[420px] aspect-[4/5] rounded-[32px] bg-gradient-to-br from-white/80 to-white/20 border border-white/60 backdrop-blur-2xl shadow-2xl shadow-blue-900/10"
      >
        {/* Dynamic Glare Overlay */}
        <motion.div 
          style={{ 
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.9) 0%, transparent 50%)`,
            zIndex: 10
          }}
          className="absolute inset-0 rounded-[32px] opacity-40 pointer-events-none mix-blend-overlay"
        />

        {/* --- LEVEL 1: DASHBOARD BASE --- */}
        <div className="absolute inset-6 rounded-2xl bg-white/40 border border-white/50 shadow-inner overflow-hidden flex flex-col">
           {/* Header */}
           <div className="h-14 border-b border-white/30 flex items-center px-5 gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </div>
              <div className="ml-auto w-20 h-2 rounded-full bg-slate-400/20" />
           </div>
           
           {/* Graph Area */}
           <div className="flex-1 p-5 relative">
              <div className="absolute inset-x-5 top-10 bottom-5 flex items-end justify-between gap-2 opacity-30">
                 {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="w-full bg-blue-600 rounded-t-sm" style={{ height: `${h}%` }} />
                 ))}
              </div>
              
              {/* The Rising Line */}
              <svg className="absolute inset-x-0 bottom-0 w-full h-48 overflow-visible" preserveAspectRatio="none">
                 <path d="M0,150 C50,150 50,100 100,80 C150,60 150,90 200,50 C250,10 300,40 400,0" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" filter="url(#glow)" />
                 <defs>
                   <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                     <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                     <feMerge>
                       <feMergeNode in="coloredBlur" />
                       <feMergeNode in="SourceGraphic" />
                     </feMerge>
                   </filter>
                 </defs>
              </svg>
           </div>
        </div>

        {/* --- LEVEL 2: FLOATING ELEMENTS (TranslateZ) --- */}
        
        {/* Badge 1: Google Partner (Top Right) */}
        <motion.div 
          style={{ transform: "translateZ(60px)" }}
          className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl shadow-blue-900/10 border border-white/80 flex items-center gap-3 animate-float-slow"
        >
            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                <Trophy size={20} strokeWidth={2.5} />
            </div>
            <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Certified</div>
                <div className="text-sm font-bold text-slate-800">Google Partner</div>
            </div>
        </motion.div>

        {/* Badge 2: AI Status (Middle Left) */}
        <motion.div 
          style={{ transform: "translateZ(40px)" }}
          className="absolute top-1/3 -left-8 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/60 flex items-center gap-3"
        >
            <div className="relative">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping opacity-75" />
            </div>
            <div className="text-xs font-bold text-slate-700">AI Engine Active</div>
        </motion.div>

        {/* Badge 3: ROAS Result (Bottom Center) */}
        <motion.div 
          style={{ transform: "translateZ(80px)" }}
          className="absolute -bottom-8 left-10 right-10 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl shadow-blue-600/30 flex items-center justify-between"
        >
            <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg">
                    <TrendingUp size={20} className="text-green-400" />
                </div>
                <div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase">Average ROAS</div>
                    <div className="text-xl font-bold text-white tracking-tight">500% +</div>
                </div>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="text-right">
                <div className="text-[10px] text-slate-400 font-medium">Monthly</div>
                <div className="text-sm font-bold text-blue-300">Target Hit</div>
            </div>
        </motion.div>

      </motion.div>
    </div>
  )
}
