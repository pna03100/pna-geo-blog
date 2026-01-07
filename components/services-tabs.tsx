// ============================================
// [GEO] Services Tabs Component
// Trinity: Interactive Tabs + WordPress Data
// ============================================

'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// [Security] Props Interface with Optional Items
interface ServicesTabsComponentProps {
  title?: string;
  items?: { id: string; title: string; content: string }[];
}

// [Implementation] Fallback Data
const DEFAULT_SERVICES = [
  {
    id: 'service-1',
    title: '마케팅 전략',
    content: '<p>데이터 기반 마케팅 전략을 수립합니다. 전문적인 마케팅 전략 컨설팅을 제공합니다.</p>',
  },
  {
    id: 'service-2',
    title: 'SEO 최적화',
    content: '<p>검색 엔진 최적화를 통해 온라인 가시성을 높입니다.</p>',
  },
  {
    id: 'service-3',
    title: '콘텐츠 마케팅',
    content: '<p>고품질 콘텐츠로 브랜드 가치를 전달합니다.</p>',
  },
];

export function ServicesTabs({ title, items }: ServicesTabsComponentProps) {
  // [Implementation] Use items from parent or fallback to default
  const tabs = items && items.length > 0 ? items : DEFAULT_SERVICES;

  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        {/* [GEO] Section Title */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              {title}
            </h2>
          </div>
        )}
        
        {/* [Implementation] Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              className={
                activeTab === tab.id
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50'
              }
            >
              {tab.title}
            </Button>
          ))}
        </div>
        
        {/* [GEO] Tab Content with AI-Readable Text */}
        <Card className="border-slate-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              {currentTab?.title}
            </h3>
            
            {/* [Implementation] Detailed Content */}
            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: currentTab?.content || '' }}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

