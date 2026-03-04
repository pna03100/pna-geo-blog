# 🔧 SEO/GEO 속도 최적화: 코드 품질 개선 필요

## 개요
SEO/GEO 속도 및 접속 속도 코드 리뷰 결과 발견된 문제점들입니다.

---

## 🔴 높은 우선순위 (배포 전 필수)

### 1. TypeScript/ESLint 빌드 에러 무시 설정 제거
**파일**: `next.config.js` (라인 14, 17)

**현재 상태**:
```javascript
typescript: { ignoreBuildErrors: true },
eslint: { ignoreDuringBuilds: true },
```

**문제점**: 프로덕션 배포 후 런타임 에러 발생 가능

**수정 방법**:
1. `false`로 변경
2. `npm run build` 실행
3. 발생하는 모든 타입/린트 에러 수정

---

### 2. revalidate API 라우트 타입 안전성 개선
**파일**: `app/api/revalidate/route.ts`

**현재 상태**: `@ts-nocheck` 및 다중 `@ts-ignore` 사용

**수정 방법**:
1. `@ts-nocheck` 제거
2. 적절한 타입 정의 추가
3. `revalidateTag`, `revalidatePath` 반환값 타입 처리

---

## 🟡 중간 우선순위 (성능 개선)

### 3. getAllPages() 함수 cache() 래핑 누락
**파일**: `lib/api.ts` (라인 471)

**현재 상태**:
```typescript
export async function getAllPages(): Promise<WPContent[]> {
```

**수정 방법**:
```typescript
export const getAllPages = cache(async (): Promise<WPContent[]> => {
  // 기존 로직
});
```

**효과**: SSR 중복 요청 제거

---

### 4. getAllPosts() 배열 순회 최적화
**파일**: `lib/api.ts` (라인 443-454)

**현재 상태**: 3번의 배열 순회 (map → filter → map)
```typescript
data.posts.nodes
  .map((node, index) => WPContentSchema.safeParse(node))
  .filter((result) => result.success)
  .map((result) => (result as z.SafeParseSuccess<WPContent>).data);
```

**수정 방법**: reduce로 단일 순회 최적화
```typescript
data.posts.nodes.reduce<WPContent[]>((acc, node) => {
  const result = WPContentSchema.safeParse(node);
  if (result.success) acc.push(result.data);
  return acc;
}, []);
```

**효과**: 포스트 100개 기준 API 응답 시간 -20ms

---

### 5. Pretendard 폰트 로딩 최적화
**파일**: `app/layout.tsx` (라인 138-142)

**현재 상태**: `window.addEventListener("load", ...)` 사용

**수정 방법**: `requestIdleCallback()` 사용
```javascript
window.addEventListener("load", function() {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadPretendard);
  } else {
    setTimeout(loadPretendard, 1);
  }
});
```

**효과**: LCP -0.5초 가능

---

## 🟢 낮은 우선순위 (보안/기술부채)

### 6. XSS 방어 라이브러리 교체
**파일**: `lib/sanitize.ts`

**현재 상태**: regex 기반 XSS 필터링

**수정 방법**:
1. `npm install dompurify`
2. DOMPurify 라이브러리로 교체

---

### 7. 홈페이지 불필요 재검증 제거
**파일**: `app/api/revalidate/route.ts` (라인 47)

**현재 상태**: 블로그 발행 시 홈페이지도 함께 재검증
```typescript
await revalidatePath('/');
```

**문제점**: 홈페이지는 블로그와 무관 → 불필요한 재생성

**수정 방법**: 조건부 재검증 또는 제거 검토

---

### 8. 캐시 태그 세분화 (선택)
**파일**: `lib/api.ts`

**현재 상태**: 모든 데이터가 `['wordpress']` 단일 태그

**개선안**: 태그 분리
- `wordpress:posts` - 블로그 포스트
- `wordpress:pages` - 페이지
- `wordpress:menu` - 메뉴

**효과**: 캐시 활용도 +10%

---

## 체크리스트

- [ ] `next.config.js` ignoreBuildErrors → false
- [ ] `app/api/revalidate/route.ts` 타입 정리
- [ ] `lib/api.ts` getAllPages() cache() 래핑
- [ ] `lib/api.ts` 배열 순회 최적화
- [ ] `app/layout.tsx` Pretendard requestIdleCallback 적용
- [ ] `lib/sanitize.ts` DOMPurify 도입 검토
- [ ] 불필요한 홈페이지 재검증 제거

---

## 예상 개선 효과

| 항목 | 개선 효과 |
|------|----------|
| 빌드 안정성 | +50% |
| LCP | -0.5초 |
| API 응답 시간 | -20ms |
| 캐시 히트율 | +10% |
| 타입 안전성 | +30% |

---

## 참고
- 분석 세션: Claude Code 디버그 모드 코드 리뷰
- 분석 범위: SEO/GEO 속도, 접속 속도, 캐싱 전략
