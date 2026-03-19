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

  // [Security] 위험한 태그 완전 제거 (콘텐츠 포함)
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^>]*\/?>/gi, '')
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '');

  // [Security] 위험한 프로토콜 제거
  sanitized = sanitized
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
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Security] Invalid image protocol:', parsed.protocol);
      }
      return null;
    }

    return url;
  } catch {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Security] Invalid image URL:', url);
    }
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
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10))) // 숫자형 엔티티 (&#8220; 등)
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16))) // 16진수 엔티티
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
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

/**
 * HTML 엔티티를 유니코드 문자로 디코딩합니다.
 * (WordPress 제목, 발췌문 등에 포함된 스마트 따옴표, 말줄임표 등 처리)
 */
export function decodeHTMLEntities(text: string): string {
  if (!text) return '';
  return text
    .replace(/&#8220;/g, '\u201C')
    .replace(/&#8221;/g, '\u201D')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8230;/g, '\u2026')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}
