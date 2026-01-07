// ============================================
// [Debug] HTML Structure Analyzer
// Trinity: WordPress HTML 구조 자동 감지 도구
// ============================================

import * as cheerio from 'cheerio';

export interface HTMLStructureInfo {
  totalLength: number;
  sections: Array<{
    id?: string;
    class?: string;
    tag: string;
    headings: string[];
    paragraphCount: number;
    linkCount: number;
  }>;
  allIds: string[];
  commonClasses: string[];
}

/**
 * WordPress HTML 구조를 분석하여 섹션 정보를 반환
 */
export function analyzeHTMLStructure(html: string): HTMLStructureInfo {
  const $ = cheerio.load(html);
  
  const sections: HTMLStructureInfo['sections'] = [];
  const allIds: string[] = [];
  const classMap: Map<string, number> = new Map();

  // 모든 section, div, article 태그 분석
  $('section, article, div[class*="section"], div[id]').each((_, element) => {
    const $el = $(element);
    const id = $el.attr('id');
    const className = $el.attr('class');
    const tag = element.tagName;

    // ID 수집
    if (id) {
      allIds.push(id);
    }

    // Class 빈도 수집
    if (className) {
      className.split(/\s+/).forEach(cls => {
        classMap.set(cls, (classMap.get(cls) || 0) + 1);
      });
    }

    // 섹션 내부 구조 분석
    const headings = $el.find('h1, h2, h3, h4, h5, h6')
      .map((_, h) => $(h).text().trim())
      .get();

    const paragraphCount = $el.find('p').length;
    const linkCount = $el.find('a').length;

    // 의미 있는 섹션만 추가 (내용이 있는 것)
    if (headings.length > 0 || paragraphCount > 0) {
      sections.push({
        id,
        class: className,
        tag,
        headings,
        paragraphCount,
        linkCount,
      });
    }
  });

  // 가장 빈번한 클래스 추출
  const commonClasses = Array.from(classMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([cls]) => cls);

  return {
    totalLength: html.length,
    sections,
    allIds,
    commonClasses,
  };
}

/**
 * HTML 구조 정보를 콘솔에 출력
 */
export function logHTMLStructure(html: string): void {
  const info = analyzeHTMLStructure(html);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 WordPress HTML Structure Analysis');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log(`📏 Total HTML Length: ${info.totalLength.toLocaleString()} characters\n`);

  if (info.allIds.length > 0) {
    console.log('🔖 Available Section IDs:');
    info.allIds.forEach(id => console.log(`   - #${id}`));
    console.log('');
  }

  if (info.commonClasses.length > 0) {
    console.log('🎨 Common CSS Classes:');
    info.commonClasses.slice(0, 5).forEach(cls => console.log(`   - .${cls}`));
    console.log('');
  }

  if (info.sections.length > 0) {
    console.log(`📦 Found ${info.sections.length} Sections:\n`);
    info.sections.forEach((section, index) => {
      console.log(`${index + 1}. <${section.tag}>${section.id ? ` id="${section.id}"` : ''}${section.class ? ` class="${section.class.substring(0, 50)}..."` : ''}`);
      if (section.headings.length > 0) {
        console.log(`   Headings: ${section.headings.slice(0, 2).map(h => `"${h.substring(0, 40)}"`).join(', ')}`);
      }
      console.log(`   Content: ${section.paragraphCount} paragraphs, ${section.linkCount} links`);
      console.log('');
    });
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

/**
 * 특정 키워드로 섹션 찾기
 */
export function findSectionByKeyword(html: string, keyword: string): string | null {
  const $ = cheerio.load(html);
  
  // ID로 찾기
  const byId = $(`[id*="${keyword}" i]`).first();
  if (byId.length > 0) {
    return byId.attr('id') || null;
  }

  // Class로 찾기
  const byClass = $(`[class*="${keyword}" i]`).first();
  if (byClass.length > 0) {
    return byClass.attr('class')?.split(/\s+/)[0] || null;
  }

  // 제목 텍스트로 찾기
  let foundId: string | null = null;
  $('h1, h2, h3').each((_, element) => {
    const text = $(element).text().toLowerCase();
    if (text.includes(keyword.toLowerCase())) {
      const parent = $(element).closest('section, div[id], article[id]');
      if (parent.length > 0) {
        foundId = parent.attr('id') || null;
        return false; // break
      }
    }
  });

  return foundId;
}

