// ============================================
// [Implementation] Insights 404 Page
// ============================================

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function InsightNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-100 text-purple-600 text-4xl font-bold">
            404
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          게시글을 찾을 수 없습니다
        </h1>

        {/* Description */}
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          요청하신 인사이트 게시글이 존재하지 않거나,<br />
          삭제되었을 수 있습니다.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Link href="/insights">
              인사이트 목록으로
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline">
            <Link href="/">
              홈으로 돌아가기
            </Link>
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            문제가 지속되면{' '}
            <a 
              href="mailto:contact@pnamarketing.co.kr" 
              className="text-purple-600 hover:text-purple-700 underline"
            >
              문의하기
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

