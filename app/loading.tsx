/**
 * [UX] Global Loading Component
 * [Design] Clean, centered spinner with PNA Blue
 */

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      {/* Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      
      {/* Optional Text */}
      <p className="mt-6 text-slate-600 font-medium">로딩 중...</p>
    </div>
  );
}

