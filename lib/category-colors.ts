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
};

// Mapping Korean category names to color keys
const CATEGORY_SLUG_MAP: Record<string, string> = {
  '구글 애즈': 'google-ads',
  '구글애즈': 'google-ads',
  'google-ads': 'google-ads',
  '워드프레스 & SEO': 'wordpress-seo',
  '워드프레스': 'wordpress-seo',
  'wordpress': 'wordpress-seo',
  '마케팅 인사이트': 'marketing-insights',
  '마케팅': 'marketing-insights',
  'marketing': 'marketing-insights',
  'AI 마케팅 & GEO': 'ai-marketing-geo',
  'AI': 'ai-marketing-geo',
  'ai-marketing-geo': 'ai-marketing-geo',
};

export function getCategoryColor(categoryName: string): CategoryColor {
  const slug = CATEGORY_SLUG_MAP[categoryName] || 'google-ads';
  return GOOGLE_COLORS[slug] || GOOGLE_COLORS['google-ads'];
}
