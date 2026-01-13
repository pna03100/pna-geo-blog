/**
 * [Utility] Category Color Mapping
 * Google Brand Colors for each category
 */

interface CategoryColor {
  bg: string;
  text: string;
  hover: string;
  hoverBg: string;
  borderHover: string;
}

// Google Brand Colors
const GOOGLE_COLORS: Record<string, CategoryColor> = {
  'google-ads': {
    bg: 'bg-[#4285F4]', // Google Blue
    text: 'text-white',
    hover: 'hover:bg-[#3367D6]',
    hoverBg: 'bg-[#4285F4]',
    borderHover: 'border-[#4285F4]',
  },
  'wordpress-seo': {
    bg: 'bg-[#DB4437]', // Google Red
    text: 'text-white',
    hover: 'hover:bg-[#C33326]',
    hoverBg: 'bg-[#DB4437]',
    borderHover: 'border-[#DB4437]',
  },
  'marketing-insights': {
    bg: 'bg-[#F4B400]', // Google Yellow
    text: 'text-slate-900',
    hover: 'hover:bg-[#F09300]',
    hoverBg: 'bg-[#F4B400]',
    borderHover: 'border-[#F4B400]',
  },
  'ai-marketing-geo': {
    bg: 'bg-[#0F9D58]', // Google Green
    text: 'text-white',
    hover: 'hover:bg-[#0B8043]',
    hoverBg: 'bg-[#0F9D58]',
    borderHover: 'border-[#0F9D58]',
  },
  'data-analytics': {
    bg: 'bg-[#9C27B0]', // Purple (Material Design)
    text: 'text-white',
    hover: 'hover:bg-[#7B1FA2]',
    hoverBg: 'bg-[#9C27B0]',
    borderHover: 'border-[#9C27B0]',
  },
  'social-media-ads': {
    bg: 'bg-[#FF6D00]', // Deep Orange
    text: 'text-white',
    hover: 'hover:bg-[#F4511E]',
    hoverBg: 'bg-[#FF6D00]',
    borderHover: 'border-[#FF6D00]',
  },
};

// Mapping Korean category names to color keys
const CATEGORY_SLUG_MAP: Record<string, string> = {
  '구글 애즈': 'google-ads',
  '구글애즈': 'google-ads',
  'google-ads': 'google-ads',
  '워드프레스 & SEO': 'wordpress-seo',
  '워드프레스 & seo': 'wordpress-seo',
  '워드프레스': 'wordpress-seo',
  'wordpress': 'wordpress-seo',
  'wordpress-seo': 'wordpress-seo',
  '마케팅 인사이트': 'marketing-insights',
  '마케팅': 'marketing-insights',
  'marketing': 'marketing-insights',
  'marketing-insights': 'marketing-insights',
  'AI 마케팅 & GEO': 'ai-marketing-geo',
  'AI 마케팅 & geo': 'ai-marketing-geo',
  'AI': 'ai-marketing-geo',
  'ai-marketing-geo': 'ai-marketing-geo',
  '데이터 & 분석': 'data-analytics',
  '데이터': 'data-analytics',
  'data-analytics': 'data-analytics',
  '소셜 미디어 광고': 'social-media-ads',
  '소셜미디어': 'social-media-ads',
  'social-media-ads': 'social-media-ads',
};

export function getCategoryColor(categoryName: string): CategoryColor {
  const slug = CATEGORY_SLUG_MAP[categoryName] || 'google-ads';
  return GOOGLE_COLORS[slug] || GOOGLE_COLORS['google-ads'];
}
