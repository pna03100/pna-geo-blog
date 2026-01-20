/**
 * [Component] Google Award Badge - 3D Interactive Hologram
 * [Purpose] Highlight "2023 Google Top 100 Campaign" Achievement
 * [Design] Interactive 3D tilt effect with hologram gradient
 */

"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function GoogleAwardCard() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 15;
    const y = (e.clientY - rect.top - rect.height / 2) / 15;
    setMousePosition({ x, y });
  };

  return (
    <div className="relative w-full max-w-md mx-auto md:mx-0 md:ml-auto perspective-1000">
      <motion.div
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setMousePosition({ x: 0, y: 0 });
        }}
        animate={{
          rotateX: isHovering ? -mousePosition.y : 0,
          rotateY: isHovering ? mousePosition.x : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Floating Glow Effects */}
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: isHovering ? 1.1 : 1,
            opacity: isHovering ? 0.3 : 0.2,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Main Badge Container */}
        <div className="relative bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl p-8 md:p-10 overflow-hidden">
          {/* Hologram Gradient Border */}
          <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60">
            <div className="w-full h-full bg-white rounded-3xl" />
          </div>

          {/* Animated Rainbow Gradient Overlay */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              background: "linear-gradient(45deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #96CEB4 75%, #FFEAA7 100%)",
              backgroundSize: "200% 200%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* 3D Trophy with Sparkles */}
            <motion.div
              className="relative mb-6"
              animate={{
                y: isHovering ? -10 : 0,
                scale: isHovering ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Sparkle Effects */}
              <motion.div
                className="absolute -top-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0,
                }}
              />
              <motion.div
                className="absolute -top-3 -right-3 w-2 h-2 bg-blue-400 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />
              <motion.div
                className="absolute -bottom-2 right-0 w-2.5 h-2.5 bg-purple-400 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1,
                }}
              />

              {/* Trophy with Glow */}
              <div className="relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <div className="relative text-7xl md:text-8xl">🏆</div>
              </div>
            </motion.div>

            {/* Google Colors Divider */}
            <div className="flex gap-2 mb-6">
              <motion.div
                className="w-12 h-1 bg-blue-500 rounded-full"
                animate={{ scaleX: isHovering ? 1.2 : 1 }}
              />
              <motion.div
                className="w-12 h-1 bg-red-500 rounded-full"
                animate={{ scaleX: isHovering ? 1.2 : 1 }}
                transition={{ delay: 0.1 }}
              />
              <motion.div
                className="w-12 h-1 bg-yellow-500 rounded-full"
                animate={{ scaleX: isHovering ? 1.2 : 1 }}
                transition={{ delay: 0.2 }}
              />
              <motion.div
                className="w-12 h-1 bg-green-500 rounded-full"
                animate={{ scaleX: isHovering ? 1.2 : 1 }}
                transition={{ delay: 0.3 }}
              />
            </div>

            {/* Year Badge */}
            <motion.div
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-base md:text-lg font-bold text-white">2023</span>
            </motion.div>

            {/* Title with Gradient */}
            <h3 className="text-3xl md:text-4xl font-bold mb-3 leading-tight text-center">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                구글 100대
                <br />
                우수 캠페인 선정
              </span>
            </h3>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-slate-600 font-semibold text-center tracking-wide">
              GOOGLE OFFICIAL RECOGNITION
            </p>

            {/* Bottom Shine Effect */}
            <motion.div
              className="mt-6 h-1 w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
