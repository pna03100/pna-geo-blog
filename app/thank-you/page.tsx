/**
 * [Page] Thank You - Contact Form Success Page
 * [Design] Clean, centered confirmation
 * [UX] Reassures user, provides next actions
 */

import { CheckCircle, Home, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen pt-16 flex items-center justify-center">

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-3xl text-center py-20">
        {/* Checkmark Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-600 shadow-2xl shadow-blue-600/50">
            <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          문의가 성공적으로 접수되었습니다.
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-slate-600 mb-4 leading-relaxed">
          담당자가 내용을 확인 후, 24시간 이내에
          <br />
          남겨주신 연락처로 안내해 드리겠습니다.
        </p>

        {/* Emergency Contact */}
        <p className="text-sm md:text-base text-slate-500 mb-12">
          급한 문의는{" "}
          <a
            href="tel:010-6318-4601"
            className="font-semibold text-blue-600 hover:text-blue-700 underline decoration-2 underline-offset-4"
          >
            010-6318-4601
          </a>
          로 연락주세요.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary Button */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-base shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 will-change-transform"
          >
            <Home className="w-5 h-5" />
            메인으로 돌아가기
          </Link>

          {/* Secondary Link */}
          <Link
            href="/insights"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-semibold text-base hover:border-blue-300 hover:text-blue-600 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 will-change-transform"
          >
            <Lightbulb className="w-5 h-5" />
            최신 마케팅 인사이트 보기
          </Link>
        </div>
      </div>
    </main>
  );
}
