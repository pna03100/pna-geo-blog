/**
 * 404 페이지
 * - 콘텐츠를 찾을 수 없을 때 표시
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-6">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          요청하신 페이지가 존재하지 않거나, 이동되었거나, 삭제되었습니다.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

