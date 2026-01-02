// ============================================
// Global Error Boundary
// ============================================

'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    console.error('에러 발생:', error);
  }, [error]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-32 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">오류 발생</h1>
      <p className="text-gray-700 mb-8">
        예상치 못한 오류가 발생했습니다. 다시 시도해주세요.
      </p>
      <button
        // @ts-ignore
        onClick={() => reset()}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        다시 시도
      </button>
    </div>
  );
}

