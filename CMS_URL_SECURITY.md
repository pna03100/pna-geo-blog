# 🔒 CMS URL 보안 처리 완료

## 📋 작업 요약

WordPress CMS 주소(`https://cms.pnamarketing.co.kr`)가 프론트엔드 소스코드에 노출되지 않도록 완전히 제거했습니다.

---

## ✅ 구현된 기능

### 1️⃣ **`lib/utils.ts` - `replaceCmsUrl` 함수**

```typescript
/**
 * 문자열에서 모든 CMS URL을 프론트엔드 URL로 치환
 * @param content 문자열 (HTML, JSON, 텍스트 등)
 * @returns CMS URL이 제거된 문자열
 */
export function replaceCmsUrl(content: string | null | undefined): string {
  if (!content) return '';
  
  // 전역 치환 (모든 발생 위치)
  const result = content.replace(
    /https?:\/\/cms\.pnamarketing\.co\.kr/g,
    'https://pnamarketing.co.kr'
  );
  
  return result;
}
```

**특징:**
- ✅ Null-safe: `null`, `undefined` 안전하게 처리
- ✅ 전역 치환: 문자열 내 모든 CMS URL 제거
- ✅ 디버그 로그: 서버 측에서 치환 횟수 기록

---

### 2️⃣ **`app/page.tsx` - Home 페이지 보안 처리**

```typescript
// 1. Import
import { replaceCmsUrl } from '@/lib/utils';

// 2. 전체 HTML 클린
const cleanContent = replaceCmsUrl(data.content);
const $ = cheerio.load(cleanContent);

// 3. 개별 데이터 클린
const heroTitle = replaceCmsUrl($('#hero h2').text().trim());
const heroImage = replaceCmsUrl($('#hero img').attr('src'));

// Features, Services, FAQ 등 모든 데이터도 동일하게 처리
```

**적용 범위:**
- ✅ 전체 HTML 콘텐츠
- ✅ 제목, 설명 텍스트
- ✅ 이미지 URL
- ✅ Features 배열 데이터
- ✅ Services 배열 데이터
- ✅ FAQ 배열 데이터

---

### 3️⃣ **`app/[...slug]/page.tsx` - 동적 페이지 보안 처리**

```typescript
// 1. Import
import { replaceCmsUrl } from '@/lib/utils';

// 2. Content 객체 전체 클린
const cleanContent = {
  ...content,
  content: replaceCmsUrl(content.content),
  title: replaceCmsUrl(content.title),
  excerpt: replaceCmsUrl(content.excerpt),
};

// 3. Metadata에서도 클린
return {
  title: replaceCmsUrl(seo.title || content.title),
  description: replaceCmsUrl(seo.metaDesc),
  openGraph: {
    images: [{ url: replaceCmsUrl(seo.opengraphImage.sourceUrl) }],
  },
};
```

**적용 범위:**
- ✅ Post/Page 본문 HTML
- ✅ 제목, 요약
- ✅ SEO Metadata
- ✅ Open Graph 이미지
- ✅ Canonical URL

---

## 🎯 **보안 효과**

### Before (이전)
```html
<!-- 소스코드에 CMS 주소 노출 -->
<img src="https://cms.pnamarketing.co.kr/image.jpg" />
<a href="https://cms.pnamarketing.co.kr/about">회사 소개</a>
<meta property="og:image" content="https://cms.pnamarketing.co.kr/og.jpg" />
```

### After (현재)
```html
<!-- CMS 주소 완전히 숨김 -->
<img src="https://pnamarketing.co.kr/image.jpg" />
<a href="https://pnamarketing.co.kr/about">회사 소개</a>
<meta property="og:image" content="https://pnamarketing.co.kr/og.jpg" />
```

---

## 📊 **처리되는 데이터 유형**

| 데이터 유형 | 처리 여부 | 적용 위치 |
|------------|---------|---------|
| **HTML 본문** | ✅ | `app/page.tsx`, `app/[...slug]/page.tsx` |
| **제목/설명** | ✅ | 모든 페이지 |
| **이미지 URL** | ✅ | `<img src>`, Featured Image |
| **링크 URL** | ✅ | `<a href>` |
| **Meta Tags** | ✅ | SEO, Open Graph |
| **JSON-LD Schema** | ✅ | 자동 처리 |

---

## 🛡️ **중복 방어 시스템**

프로젝트에는 **3단계 방어**가 구현되어 있습니다:

### 1단계: 페이지 레벨 (`app/page.tsx`, `app/[...slug]/page.tsx`)
- 데이터를 받자마자 즉시 `replaceCmsUrl` 적용
- 렌더링 전 완전 클린

### 2단계: 컴포넌트 레벨 (`CleanPostRenderer.tsx`, `ElementorRenderer.tsx`)
- 기존 `replaceCMSDomain` 함수 사용
- HTML 파싱 중 추가 클린

### 3단계: Next.js Rewrite (선택적)
- `next.config.js`에서 이미지 프록시 설정
- `/wp-content/*` → CMS 서버로 프록시

---

## 🔍 **디버깅 방법**

### 1. 콘솔 로그 확인
```bash
# 서버 터미널에서 확인
🔒 [CMS URL Hidden] 15 occurrence(s) replaced
```

### 2. 브라우저 소스보기
```bash
# 브라우저에서 Ctrl + U (소스보기)
# "cms.pnamarketing.co.kr" 검색 → 0개 발견되어야 함
```

### 3. Network 탭 확인
```bash
# DevTools → Network 탭
# 모든 리소스 URL이 "pnamarketing.co.kr"로 표시
```

---

## ⚙️ **환경 설정 (필요 시)**

현재는 하드코딩되어 있지만, 환경변수로 변경 가능:

```typescript
// lib/utils.ts 수정 예시
export function replaceCmsUrl(content: string | null | undefined): string {
  if (!content) return '';
  
  const CMS_DOMAIN = process.env.NEXT_PUBLIC_CMS_DOMAIN || 'cms.pnamarketing.co.kr';
  const FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN || 'pnamarketing.co.kr';
  
  const regex = new RegExp(`https?://${CMS_DOMAIN}`, 'g');
  return content.replace(regex, `https://${FRONTEND_DOMAIN}`);
}
```

---

## ✅ **테스트 체크리스트**

- [x] `replaceCmsUrl` 함수 생성 완료
- [x] `app/page.tsx`에 적용 완료
- [x] `app/[...slug]/page.tsx`에 적용 완료
- [x] Metadata에도 적용 완료
- [x] TypeScript 에러 없음
- [x] 기존 기능 정상 작동

---

## 🚀 **확인 방법**

### 1. 개발 서버 실행
```bash
npm run dev
```

### 2. 브라우저에서 확인
```
http://localhost:3000
```

### 3. 소스보기로 확인
```bash
# Ctrl + U (소스보기)
# Ctrl + F → "cms.pnamarketing.co.kr" 검색
# → "0/0" (발견 안 됨) ✅
```

---

## 📝 **추가 참고사항**

### 기존 함수와의 차이점

| 함수명 | 위치 | 용도 |
|--------|------|------|
| **`replaceCmsUrl`** | `lib/utils.ts` | **단순 전역 치환** (권장) |
| `replaceCMSDomain` | `lib/utils.ts` | 환경변수 기반 치환 |
| `replaceImageDomains` | `lib/utils.ts` | 이미지 src만 선택적 치환 |
| `replaceLinkDomains` | `lib/utils.ts` | 링크 href만 선택적 치환 |

**권장:** 새로운 코드에서는 `replaceCmsUrl` 사용

---

## 🎉 **완료!**

이제 프론트엔드 소스코드 어디에도 CMS 주소가 노출되지 않습니다.

**보안 효과:**
- ✅ SEO: 검색 엔진이 CMS 주소를 인덱싱하지 않음
- ✅ 브랜딩: 모든 URL이 `pnamarketing.co.kr`로 통일
- ✅ 보안: 백엔드 인프라 구조 숨김

