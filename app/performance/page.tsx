import type { Metadata } from "next";
import { PerformanceClient } from "./PerformanceClient";
import { BlueprintBackground } from "@/components/ui/blueprint-background";

export const metadata: Metadata = {
  title: "퍼포먼스 마케팅 | PNA Company",
  description: "데이터로 증명하는 광고 성과. 평균 ROAS 500%를 달성하는 퍼포먼스 마케팅 전문 대행사.",
  keywords: "퍼포먼스 마케팅, ROAS 최적화, 광고 대행, 구글 애즈, 성과 마케팅",
  openGraph: {
    title: "퍼포먼스 마케팅 | PNA Company",
    description: "데이터로 증명하는 광고 성과. 평균 ROAS 500%를 달성합니다.",
    type: "website",
  },
};

export default function PerformancePage() {
  return <PerformanceClient />;
}
