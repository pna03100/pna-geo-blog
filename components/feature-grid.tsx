// ============================================
// [GEO] Feature Grid Component
// Trinity: Bento Grid Layout + WordPress Data
// Updated: 2026-01-07 - Props fixed to accept 'items'
// ============================================

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// [Security] Props Interface with Optional Items
interface FeatureGridComponentProps {
  title?: string;
  items?: { title: string; description: string; icon?: string }[];
}

// [Implementation] Fallback Data
const DEFAULT_FEATURES = [
  {
    title: '⚡ 빠른 성능',
    description: 'Next.js 14 App Router로 최적화된 성능을 제공합니다.',
  },
  {
    title: '🔒 보안',
    description: 'Zod Validation과 OWASP 보안 기준을 준수합니다.',
  },
  {
    title: '🎯 GEO 최적화',
    description: 'AI 검색 엔진에 최적화된 컨텐츠 구조를 제공합니다.',
  },
];

export function FeatureGrid({ title, items }: FeatureGridComponentProps) {
  // [Implementation] Use items from parent or fallback to default
  const features = items && items.length > 0 ? items : DEFAULT_FEATURES;

  return (
    <section className="w-full py-16 md:py-24 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        {/* [GEO] Section Title */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              {title}
            </h2>
          </div>
        )}
        
        {/* [Implementation] Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-slate-200 hover:border-purple-300 transition-colors duration-300 hover:shadow-lg"
            >
              <CardHeader>
                {/* [GEO] Icon Display (if provided) */}
                {feature.icon && (
                  <div className="mb-4 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-2xl">
                    {feature.icon}
                  </div>
                )}
                
                {/* [GEO] Feature Title - AI-Readable */}
                <CardTitle className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {/* [GEO] Feature Description with Statistics */}
                <CardDescription className="text-slate-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

