import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { env } from './env';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================
// [GEO] CMS Domain → Frontend Domain Converter
// 전략: AI Search/Google에 CMS 도메인을 노출하지 않고
//       브랜드 일관성 유지 (cms.pnamarketing.co.kr → pnamarketing.co.kr)
// ============================================

/**
 * CMS 도메인을 프론트엔드 도메인으로 변환
 * @param content HTML 콘텐츠 또는 URL 문자열
 * @returns 변환된 콘텐츠
 * 
 * @example
 * replaceCMSDomain('<img src="https://cms.pnamarketing.co.kr/image.jpg" />')
 * // → '<img src="https://pnamarketing.co.kr/image.jpg" />'
 */
export function replaceCMSDomain(content: string): string {
  if (!content) return content;

  const cmsUrl = env.NEXT_PUBLIC_WORDPRESS_URL;
  const frontendDomain = env.NEXT_PUBLIC_FRONTEND_DOMAIN;

  // cms.pnamarketing.co.kr → pnamarketing.co.kr
  const regex = new RegExp(cmsUrl.replace('https://', 'https?://'), 'g');
  const result = content.replace(regex, `https://${frontendDomain}`);

  // [Debug] 변환 발생 시 로그
  if (result !== content) {
    const changeCount = (content.match(regex) || []).length;
    console.log(`🔄 [Domain Replace] ${changeCount} occurrences: cms.pnamarketing.co.kr → ${frontendDomain}`);
  }

  return result;
}

/**
 * 이미지 URL만 선택적으로 변환 (src, srcset 속성)
 * @param html HTML 문자열
 * @returns 변환된 HTML
 */
export function replaceImageDomains(html: string): string {
  if (!html) return html;

  const cmsUrl = env.NEXT_PUBLIC_WORDPRESS_URL;
  const frontendDomain = env.NEXT_PUBLIC_FRONTEND_DOMAIN;

  // src="..." 변환
  let result = html.replace(
    /src=["'](https?:\/\/cms\.pnamarketing\.co\.kr[^"']+)["']/g,
    `src="https://${frontendDomain}$1"`
  );

  // srcset="..." 변환
  result = result.replace(
    /srcset=["']([^"']*cms\.pnamarketing\.co\.kr[^"']*)["']/g,
    (match) => match.replace(/cms\.pnamarketing\.co\.kr/g, frontendDomain)
  );

  return result;
}

/**
 * 내부 링크 변환 (a href)
 * @param html HTML 문자열
 * @returns 변환된 HTML
 */
export function replaceLinkDomains(html: string): string {
  if (!html) return html;

  const frontendDomain = env.NEXT_PUBLIC_FRONTEND_DOMAIN;

  // href="..." 변환
  const result = html.replace(
    /href=["'](https?:\/\/cms\.pnamarketing\.co\.kr[^"']+)["']/g,
    `href="https://${frontendDomain}$1"`
  );

  return result;
}

// ============================================
// [Security] CMS URL 숨김 처리 (심플 버전)
// 목적: 소스코드에서 CMS 도메인 완전 제거
// ============================================

/**
 * 문자열에서 모든 CMS URL을 프론트엔드 URL로 치환
 * @param content 문자열 (HTML, JSON, 텍스트 등)
 * @returns CMS URL이 제거된 문자열
 * 
 * @example
 * replaceCmsUrl('<img src="https://cms.pnamarketing.co.kr/image.jpg" />')
 * // → '<img src="https://pnamarketing.co.kr/image.jpg" />'
 */
export function replaceCmsUrl(content: string | null | undefined): string {
  // [Security] Null/Undefined 방어
  if (!content) return '';

  // [Implementation] 전역 치환 (모든 발생 위치)
  const result = content.replace(
    /https?:\/\/cms\.pnamarketing\.co\.kr/g,
    'https://pnamarketing.co.kr'
  );

  // [Debug] 치환 발생 시 로그
  if (result !== content && typeof window === 'undefined') {
    const count = (content.match(/cms\.pnamarketing\.co\.kr/g) || []).length;
    console.log(`🔒 [CMS URL Hidden] ${count} occurrence(s) replaced`);
  }

  return result;
}
