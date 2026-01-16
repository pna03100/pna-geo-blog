/**
 * [Component] Google Award Card - Clean Design
 * [Purpose] Highlight "2023 Google Top 100 Campaign" Achievement
 */

export function GoogleAwardCard() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative bg-transparent border-t border-b border-white/30">
        <div className="relative p-8 md:p-10 text-center">
          <div className="mb-6">
            <span className="text-4xl">🏆</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1" style={{ lineHeight: '1.4' }}>
            2023년 구글 100대
            <br />
            우수 캠페인 선정
          </h3>
        </div>
      </div>
    </div>
  );
}
