/**
 * [UI] Grid Background - Engineering-Grade Precision
 * [Purpose] Clean architectural grid for FinTech/B2B SaaS
 * [Design] Inspired by Stripe, Vercel, Linear - Solid & Sharp
 */

export function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
      {/* Single Subtle Glow */}
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]" />
    </div>
  );
}
