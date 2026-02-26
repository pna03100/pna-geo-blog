/**
 * [AG-STANDARD 7단계] TL;DR (Too Long; Didn't Read) 요약 블록
 * AI 검색 엔진(GEO)이 글의 핵심을 즉시 파악할 수 있도록 구조화된 요약 제공
 * 
 * [주의] 프론트엔드 디자인 수정 금지 - 기존 prose 스타일 내에서 자연스럽게 표시
 */

interface ArticleTLDRProps {
    /** 요약 텍스트 (HTML 태그 제거된 순수 텍스트) */
    summary: string;
}

export function ArticleTLDR({ summary }: ArticleTLDRProps) {
    if (!summary || summary.trim().length === 0) {
        return null;
    }

    return (
        <aside
            role="note"
            aria-label="핵심 요약"
            className="mb-8 p-6 bg-blue-50/50 border border-blue-100 rounded-xl"
        >
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                핵심 요약
            </p>
            <p className="text-base text-slate-700 leading-relaxed">
                {summary}
            </p>
        </aside>
    );
}
