// ============================================
// Global Loading Component
// ============================================

export default function Loading() {
  // @ts-ignore
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
      <p className="mt-4 text-gray-600">로딩 중...</p>
    </div>
  );
}

