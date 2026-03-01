import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
