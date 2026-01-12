/**
 * [Security] HTML Sanitization Utility
 * [OWASP A03] XSS Defense - Injection Prevention
 * [Trinity] Type-Safe + Defensive Programming
 */

// ============================================
// [Security] Safe HTML Sanitization
// ============================================

/**
 * WordPress에서 받은 HTML을 안전하게 정제합니다.
 * 
 * @param html - WordPress에서 받은 원본 HTML
 * @returns 정제된 HTML 문자열
 * 
 * [Security Note]
 * - WordPress는 자체적으로 콘텐츠를 sanitize하므로,
 *   추가적인 클라이언트 측 정제는 선택사항입니다.
 * - 하지만 Defense in Depth 원칙에 따라 기본적인 검증을 수행합니다.
 */
export function sanitizeWordPressHTML(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  // [Security] 위험한 프로토콜 제거
  let sanitized = html
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '')
    .replace(/vbscript:/gi, '');

  // [Security] 위험한 이벤트 핸들러 제거
  sanitized = sanitized
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '');

  return sanitized;
}

/**
 * WordPress 이미지 URL을 Next.js Image 컴포넌트에 안전하게 전달합니다.
 * 
 * @param url - WordPress 이미지 URL
 * @returns 검증된 URL 또는 null
 */
export function validateImageUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    const parsed = new URL(url);
    
    // [Security] HTTP/HTTPS만 허용
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      console.warn('[Security] Invalid image protocol:', parsed.protocol);
      return null;
    }

    return url;
  } catch (error) {
    console.warn('[Security] Invalid image URL:', url);
    return null;
  }
}

/**
 * WordPress 텍스트 콘텐츠에서 HTML 태그를 제거합니다.
 * (메타 설명, 발췌문 등에 사용)
 * 
 * @param html - HTML 문자열
 * @returns 순수 텍스트
 */
export function stripHtmlTags(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  return html
    .replace(/<[^>]*>/g, '') // HTML 태그 제거
    .replace(/&nbsp;/g, ' ') // &nbsp; 변환
    .replace(/&amp;/g, '&') // &amp; 변환
    .replace(/&lt;/g, '<') // &lt; 변환
    .replace(/&gt;/g, '>') // &gt; 변환
    .replace(/&quot;/g, '"') // &quot; 변환
    .replace(/&#039;/g, "'") // &#039; 변환
    .replace(/\s+/g, ' ') // 연속된 공백 정리
    .trim();
}

/**
 * 텍스트를 지정된 길이로 자르고 말줄임표를 추가합니다.
 * 
 * @param text - 원본 텍스트
 * @param maxLength - 최대 길이
 * @returns 잘린 텍스트
 */
export function truncateText(text: string, maxLength: number = 160): string {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength).trim() + '...';
}
