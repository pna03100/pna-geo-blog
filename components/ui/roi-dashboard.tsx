/**
 * [UI] 3D Isometric ROI Dashboard - Floating Stack Architecture
 * [Purpose] "Wow Factor" - 3D perspective with layered depth
 * [Design] Isometric view + Floating widgets with Z-axis depth
 */

"use client";

import { motion } from "framer-motion";
import { TrendingUp, Sparkles } from "lucide-react";

export function ROIDashboard() {
  // Chart data points
  const points = [
    { x: 0, y: 30 },
    { x: 20, y: 35 },
    { x: 40, y: 45 },
    { x: 60, y: 55 },
    { x: 80, y: 75 },
    { x: 100, y: 95 },
  ];

  const createPath = (points: { x: number; y: number }[]) => {
    const pathData = points.map((point, i) => {
      const command = i === 0 ? "M" : "L";
      return `${command} ${point.x} ${100 - point.y}`;
    });
    return pathData.join(" ");
  };

  const linePath = createPath(points);
  const areaPath = `${linePath} L 100 100 L 0 100 Z`;

  return (
    <div 
      className="relative w-full h-full min-h-[500px] flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      {/* 3D Isometric Container */}
      <motion.div
        initial={{ opacity: 0, z: -200, rotateY: -30 }}
        animate={{ opacity: 1, z: 0, rotateY: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        whileHover={{
          rotateY: 0,
          rotateX: 0,
          scale: 1.02,
          transition: { duration: 0.4 },
        }}
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(-12deg) rotateX(5deg)",
        }}
      >
        {/* BASE LAYER - Backdrop Panel (Farthest) */}
        <motion.div
          initial={{ z: -100, opacity: 0 }}
          animate={{ z: -40, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-sky-500/10 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl"
          style={{
            transform: "translateZ(-40px)",
            filter: "blur(2px)",
          }}
        />

        {/* MIDDLE LAYER - Main Dashboard Card */}
        <motion.div
          initial={{ z: -50, opacity: 0 }}
          animate={{ z: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{
            z: 20,
            transition: { duration: 0.3 },
          }}
          className="relative w-full max-w-md h-80 bg-white/50 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-6 overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(0px)",
          }}
        >
          {/* Floating Animation */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-slate-600 font-medium">
                  Real-time Analytics
                </p>
                <h3 className="text-2xl font-bold text-slate-950">
                  광고 성과 대시보드
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* SVG Chart with GLOW */}
            <div className="relative h-32 mb-4">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                preserveAspectRatio="none"
                style={{
                  filter: "drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4))",
                }}
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>

                {/* Area Fill */}
                <motion.path
                  d={areaPath}
                  fill="url(#chartGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                />

                {/* Glowing Line */}
                <motion.path
                  d={linePath}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.7, ease: "easeInOut" }}
                />

                {/* Data Points */}
                {points.map((point, index) => (
                  <motion.circle
                    key={index}
                    cx={point.x}
                    cy={100 - point.y}
                    r="2.5"
                    fill="#3b82f6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.7 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  />
                ))}
              </svg>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-slate-50/60 backdrop-blur-sm">
                <p className="text-xs text-slate-600">전환율</p>
                <p className="text-base font-bold text-slate-950">8.5%</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-50/60 backdrop-blur-sm">
                <p className="text-xs text-slate-600">CPA</p>
                <p className="text-base font-bold text-slate-950">₩15K</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-50/60 backdrop-blur-sm">
                <p className="text-xs text-slate-600">CTR</p>
                <p className="text-base font-bold text-slate-950">12.3%</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* TOP LAYER - Floating Widget 1: ROAS (Highest Z-index) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, z: -50 }}
          animate={{ opacity: 1, scale: 1, z: 80 }}
          transition={{ duration: 0.8, delay: 1, type: "spring", stiffness: 100 }}
          className="absolute -top-8 -right-8 z-30"
          style={{
            transform: "translateZ(80px)",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotateZ: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white shadow-2xl flex items-center gap-2 border border-emerald-400/50"
          >
            {/* Pulse Effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-emerald-300"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-2xl relative z-10">🚀</span>
            <div className="relative z-10">
              <p className="text-xs font-medium opacity-90">ROAS</p>
              <p className="text-lg font-bold">+520%</p>
            </div>
          </motion.div>
        </motion.div>

        {/* TOP LAYER - Floating Widget 2: AI Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, z: -30 }}
          animate={{ opacity: 1, scale: 1, z: 60 }}
          transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 100 }}
          className="absolute -bottom-6 -left-6 z-30"
          style={{
            transform: "translateZ(60px)",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="relative px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-blue-200/80 shadow-2xl"
          >
            {/* Scanning Animation */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              animate={{
                y: [0, 50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            <div className="flex items-center gap-3 relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-blue-600" />
              </motion.div>
              <div>
                <p className="text-xs text-slate-600 font-medium">AI 최적화</p>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <p className="text-sm font-bold text-slate-950">Active</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
