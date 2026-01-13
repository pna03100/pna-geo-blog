/**
 * [Page] Terms of Service (이용약관)
 * [Design] Clean Text-Based Document Style
 * [GEO] SEO-Optimized with proper metadata
 */

import type { Metadata } from "next";
import { FileText, Clock } from "lucide-react";
import { BlueprintBackground } from "@/components/ui/blueprint-background";

// ============================================
// [GEO] Metadata
// ============================================
export const metadata: Metadata = {
  title: "이용약관 | 피앤에이컴퍼니",
  description:
    "주식회사 피앤에이컴퍼니의 이용약관입니다. 광고 대행 및 마케팅 서비스 이용 시 적용되는 조건을 확인하세요.",
  robots: {
    index: true,
    follow: true,
  },
};

// ============================================
// [Main] Terms of Service Page
// ============================================
export default function TermsPage() {
  return (
    <>
      {/* Standard BlueprintBackground */}
      <BlueprintBackground />

      {/* Main Content */}
      <main className="relative min-h-screen py-24 md:py-32 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Glass Container */}
          <article className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl p-8 md:p-12">
            {/* Header */}
            <header className="text-center mb-12 pb-8 border-b border-slate-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 mb-6 shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-950 mb-4">
                이용약관
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                주식회사 피앤에이컴퍼니의 서비스 이용 조건 및 권리·의무 사항입니다.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-sm text-blue-700 font-semibold">
                <Clock className="w-4 h-4" />
                시행일자: 2026년 1월 14일
              </div>
            </header>

            {/* Article 1 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제1조 (목적)
              </h2>
              <p className="text-slate-700 leading-relaxed">
                본 약관은 주식회사 피앤에이컴퍼니(이하 "회사")가 제공하는 광고 대행 및 마케팅 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 회원의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <hr className="border-slate-200 my-8" />

            {/* Article 2 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제2조 (용어의 정의)
              </h2>
              <ul className="list-decimal pl-5 space-y-2 text-slate-700">
                <li>
                  "서비스"란 회사가 제공하는 구글 애즈, 검색 최적화(SEO), SNS 광고 등 마케팅 관련 제반 서비스를 의미합니다.
                </li>
                <li>
                  "광고주"란 회사에 마케팅 업무를 위탁하고 대가를 지불하는 개인 또는 법인을 말합니다.
                </li>
              </ul>
            </section>

            <hr className="border-slate-200 my-8" />

            {/* Article 3 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제3조 (서비스의 제공)
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                회사는 광고주와의 계약에 따라 다음과 같은 서비스를 제공합니다.
              </p>
              <ul className="list-decimal pl-5 space-y-2 text-slate-700">
                <li>온라인 광고 기획 및 집행 (Google Ads, Meta, Naver 등)</li>
                <li>웹사이트 및 콘텐츠 제작 컨설팅</li>
                <li>성과 분석 및 리포팅 제공</li>
              </ul>
            </section>

            <hr className="border-slate-200 my-8" />

            {/* Article 4 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제4조 (대금 결제)
              </h2>
              <ul className="list-decimal pl-5 space-y-2 text-slate-700">
                <li>서비스 이용료는 선불을 원칙으로 하며, 별도 계약에 따릅니다.</li>
                <li>
                  광고 매체비(Media Spend)는 광고주가 매체사에 직접 충전하거나, 회사에 대납을 요청할 수 있습니다.
                </li>
              </ul>
            </section>

            <hr className="border-slate-200 my-8" />

            {/* Article 5 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제5조 (계약 해지 및 환불)
              </h2>
              <ul className="list-decimal pl-5 space-y-3 text-slate-700">
                <li>
                  <strong className="text-slate-900">
                    이미 각 매체사(Google, Meta 등)에 집행되어 소진된 광고 비용은 어떠한 경우에도 환불되지 않습니다.
                  </strong>
                </li>
                <li>
                  대행 수수료는 계약 기간 중 용역이 제공된 일수를 제외하고 남은 기간에 대해 일할 계산하여 환불합니다.
                </li>
                <li>
                  위약금 규정은 별도의 서면 계약서를 따릅니다.
                </li>
              </ul>
            </section>

            <hr className="border-slate-200 my-8" />

            {/* Article 6 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제6조 (면책 조항)
              </h2>
              <ul className="list-decimal pl-5 space-y-3 text-slate-700">
                <li>
                  <strong className="text-slate-900">
                    회사는 광고 집행에 따른 특정 매출액, ROAS(광고비 대비 매출액), DB 유입 수치 등을 법적으로 보증하지 않습니다.
                  </strong>
                </li>
                <li>
                  매체사(Google 등)의 정책 변경으로 인한 광고 중단이나 계정 정지에 대해 회사는 고의 또는 중과실이 없는 한 책임을 지지 않습니다.
                </li>
              </ul>
            </section>

            <hr className="border-slate-200 my-8" />

            {/* Article 7 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제7조 (저작권의 귀속)
              </h2>
              <ul className="list-decimal pl-5 space-y-2 text-slate-700">
                <li>
                  회사가 제작한 콘텐츠(이미지, 영상, 문구 등)의 저작권은 잔금 완납 시 광고주에게 이전됩니다.
                </li>
                <li>
                  단, 회사는 해당 제작물을 포트폴리오 및 자사 홍보 목적으로 활용할 수 있습니다.
                </li>
              </ul>
            </section>

            <hr className="border-slate-200 my-8" />

            {/* Article 8 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                제8조 (관할 법원)
              </h2>
              <p className="text-slate-700 leading-relaxed">
                서비스 이용과 관련하여 발생한 분쟁에 대해 소송이 제기될 경우, 회사의 본점 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.
              </p>
            </section>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-600">
                이 약관은 2026년 1월 14일부터 시행합니다.
              </p>
              <p className="text-sm text-slate-600 mt-2">
                © 2026 주식회사 피앤에이컴퍼니. All rights reserved.
              </p>
            </footer>
          </article>
        </div>
      </main>
    </>
  );
}
