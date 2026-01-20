/**
 * [Component] Hero Background Typography
 * [Design] CSS animated watermark text
 * [Performance] Pure CSS for optimal performance
 */

export function HeroBackgroundTypo() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
      <div 
        className="absolute bottom-0 right-0 text-right w-full pr-4 md:pr-6 bg-typo-container"
        style={{
          lineHeight: '0.85'
        }}
      >
        <div 
          className="font-black text-slate-900 bg-typo-pna"
          style={{
            fontSize: 'clamp(8rem, 20vw, 26rem)',
            letterSpacing: '-0.05em'
          }}
        >
          PNA
        </div>
        <div 
          className="font-black text-slate-900 bg-typo-marketing"
          style={{
            fontSize: 'clamp(8rem, 20vw, 26rem)',
            letterSpacing: '-0.05em'
          }}
        >
          MARKETING
        </div>
      </div>
    </div>
  );
}
