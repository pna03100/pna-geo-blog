/**
 * [Page] 404 Error - Custom Not Found Page
 * [UX] Prevent bounce rate with clear CTAs
 * [Design] Clean Tech style matching PNA Brand
 */

import Link from 'next/link';
import { BlueprintBackground } from '@/components/ui/blueprint-background';
import { Home, Mail, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <BlueprintBackground />
      
      <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-[73px]">
        {/* Visual Decor: Huge 404 Text Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          <h1 className="text-[12rem] md:text-[16rem] font-bold text-slate-200/30 select-none leading-none">
            404
          </h1>
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 border-2 border-blue-100 mb-4">
            <ArrowLeft className="w-10 h-10 text-blue-600" />
          </div>
          
          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          
          {/* Description */}
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-md mx-auto">
            요청하신 페이지가 삭제되었거나 주소가 변경되었습니다.<br />
            입력하신 주소가 정확한지 다시 한번 확인해 주세요.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>홈으로 돌아가기</span>
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-blue-600 hover:text-blue-600 transition-all group"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>문의하기</span>
            </Link>
          </div>
          
          {/* Popular Links */}
          <div className="pt-8 border-t border-slate-200 mt-12">
            <p className="text-sm text-slate-500 mb-4">자주 찾는 페이지</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/google-ads"
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
              >
                구글 애즈
              </Link>
              <Link
                href="/wordpress"
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
              >
                워드프레스
              </Link>
              <Link
                href="/performance"
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
              >
                퍼포먼스
              </Link>
              <Link
                href="/insights"
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
              >
                인사이트
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
