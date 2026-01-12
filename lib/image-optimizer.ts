/**
 * [GEO] Image Optimization Utility
 * [Security] URL Validation
 * [Performance] Next.js Image Integration
 */

import { validateImageUrl } from './sanitize';

// ============================================
// [Security] Interface for Image Data
// ============================================
export interface OptimizedImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

// ============================================
// [Implementation] WordPress Image Optimizer
// ============================================

/**
 * WordPress 이미지를 Next.js Image 컴포넌트용으로 최적화합니다.
 * 
 * @param sourceUrl - WordPress 이미지 URL
 * @param altText - 대체 텍스트
 * @param width - 이미지 너비
 * @param height - 이미지 높이
 * @returns OptimizedImage 객체 또는 null
 */
export function optimizeWordPressImage(
  sourceUrl: string | null | undefined,
  altText: string | null | undefined,
  width?: number,
  height?: number
): OptimizedImage | null {
  // [Security] URL 검증
  const validatedUrl = validateImageUrl(sourceUrl);
  
  if (!validatedUrl) {
    return null;
  }

  return {
    src: validatedUrl,
    alt: altText || '이미지',
    width,
    height,
  };
}

/**
 * WordPress 이미지 URL에서 크기별 URL을 생성합니다.
 * (WordPress는 자동으로 여러 크기의 이미지를 생성합니다)
 * 
 * @param sourceUrl - 원본 이미지 URL
 * @param size - 크기 (thumbnail, medium, large, full)
 * @returns 크기별 이미지 URL
 */
export function getWordPressImageSize(
  sourceUrl: string,
  size: 'thumbnail' | 'medium' | 'large' | 'full' = 'full'
): string {
  if (size === 'full') {
    return sourceUrl;
  }

  // WordPress 이미지 URL 패턴: /uploads/2024/01/image.jpg
  // 크기별 URL: /uploads/2024/01/image-300x200.jpg (thumbnail)
  const sizeMap = {
    thumbnail: '-150x150',
    medium: '-300x300',
    large: '-1024x1024',
  };

  const extension = sourceUrl.split('.').pop();
  const baseUrl = sourceUrl.replace(`.${extension}`, '');
  
  return `${baseUrl}${sizeMap[size]}.${extension}`;
}

/**
 * 이미지 로딩 우선순위를 결정합니다.
 * (Above the fold 이미지는 priority=true)
 * 
 * @param index - 이미지 인덱스
 * @param threshold - 우선순위 임계값 (기본 3)
 * @returns priority 플래그
 */
export function shouldPrioritizeImage(index: number, threshold: number = 3): boolean {
  return index < threshold;
}

/**
 * Next.js Image 컴포넌트용 sizes 속성을 생성합니다.
 * 
 * @param type - 이미지 타입 (hero, card, full)
 * @returns sizes 문자열
 */
export function getImageSizes(type: 'hero' | 'card' | 'full' | 'thumbnail'): string {
  const sizesMap = {
    hero: '100vw',
    card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    full: '(max-width: 1024px) 100vw, 1024px',
    thumbnail: '(max-width: 768px) 50vw, 150px',
  };

  return sizesMap[type];
}
