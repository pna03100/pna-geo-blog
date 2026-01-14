/**
 * [System] Global Error Boundary (500 Error)
 * [Design] Matches 404 page layout for brand consistency
 */

'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { BlueprintBackground } from '@/components/ui/blueprint-background';
import { RefreshCw, Mail } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Global Error:', error);
    }
    // In production, you should send this to an error tracking service (e.g., Sentry)
  }, [error]);

  return (
    <>
      <BlueprintBackground />
      
      <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-[73px]">
        {/* Visual Decor: Huge 500 Text Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          <h1 className="text-[12rem] md:text-[16rem] font-bold text-slate-200/30 select-none leading-none">
            500
          </h1>
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 border-2 border-red-100 mb-4">
            <RefreshCw className="w-10 h-10 text-red-600" />
          </div>
          
          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            <div className="mb-2">시스템에 일시적인</div>
            <div>오류가 발생했습니다</div>
          </h2>
          
          {/* Description */}
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-md mx-auto">
            서버와의 통신 중 문제가 발생했습니다.<br />
            잠시 후 다시 시도해 주시기 바랍니다.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 group"
            >
              <RefreshCw className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>다시 시도하기</span>
            </button>
            
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-blue-600 hover:text-blue-600 transition-all group"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>문의하기</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

