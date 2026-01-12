/**
 * [Section] Key Metrics - Trust indicators with animated numbers
 * [Animation] Count-up effect on scroll
 */

"use client";

import { FadeIn } from "./FadeIn";
import { SectionWrapper } from "./SectionWrapper";
import { CountUpNumber } from "./CountUpNumber";
import { TrendingUp, DollarSign, Award, Zap } from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    value: 500,
    suffix: "%",
    label: "광고주 평균 ROAS",
    color: "text-blue-600",
    bgColor: "bg-blue-500/15",
  },
  {
    icon: DollarSign,
    value: 470,
    suffix: "억+",
    label: "누적 광고 집행 금액",
    color: "text-blue-700",
    bgColor: "bg-blue-600/15",
  },
  {
    icon: Zap,
    value: 30,
    suffix: "억",
    label: "월 구글 애즈 집행 예산",
    color: "text-sky-600",
    bgColor: "bg-sky-500/15",
  },
  {
    icon: Award,
    value: 100,
    suffix: "대",
    label: "구글 선정 우수 캠페인",
    color: "text-blue-500",
    bgColor: "bg-blue-400/15",
  },
];

export function MetricsSection() {
  return (
    <SectionWrapper className="py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <FadeIn key={metric.label} delay={index * 0.1}>
              <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-md border border-blue-100/50 shadow-xl p-8 hover:scale-105 hover:shadow-2xl hover:border-blue-200 transition-all duration-300">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-2xl ${metric.bgColor} mb-4`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>

                {/* Number */}
                <div className="text-4xl md:text-5xl font-bold text-slate-950 mb-2">
                  <CountUpNumber
                    end={metric.value}
                    suffix={metric.suffix}
                    duration={2.5}
                  />
                </div>

                {/* Label */}
                <p className="text-sm text-slate-700 font-semibold">{metric.label}</p>

                {/* Decorative gradient */}
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-sky-500/10 rounded-full blur-2xl" />
              </div>
            </FadeIn>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
