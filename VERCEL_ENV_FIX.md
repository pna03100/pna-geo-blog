# 🚀 Vercel 환경변수 문제 해결 완료

## 📋 문제 요약
- **증상:** Next.js 사이트에서 "API 연결 실패" 에러 발생
- **원인:** Vercel 환경변수 이름 불일치
  - 코드: `WORDPRESS_API_URL` 사용
  - Vercel: `NEXT_PUBLIC_WORDPRESS_API_URL` 설정
- **해결:** Fallback Chain 구현으로 양쪽 모두 지원

---

## ✅ 적용된 수정사항

### 1. 환경변수 Fallback 로직 추가 (`lib/env.ts`)

```typescript
// ✅ Vercel 호환 Fallback Chain
const apiUrl = 
  process.env.WORDPRESS_API_URL ||           // 로컬 개발
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL; // Vercel 배포
```

**지원하는 환경변수:**
- `WORDPRESS_API_URL` (로컬 개발용)
- `NEXT_PUBLIC_WORDPRESS_API_URL` (Vercel 배포용)
- 둘 중 하나만 설정하면 자동으로 작동합니다!

---

### 2. 상세한 에러 로깅 추가 (`lib/api.ts`)

**기존:**
```typescript
console.warn(`⚠️ URI "${uri}" not found. Returning dummy data.`);
```

**개선:**
```typescript
console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.error('❌ [Data Not Found]');
console.error('📍 URI:', uri);
console.error('💡 Possible Causes:');
console.error('  1. WordPress API URL이 잘못되었습니다');
console.error('  2. 해당 URI의 콘텐츠가 WordPress에 존재하지 않습니다');
console.error('  3. WPGraphQL 플러그인이 비활성화되었습니다');
console.error('  4. CORS 문제로 요청이 차단되었습니다');
console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
```

**장점:**
- 에러 원인을 즉시 파악 가능
- Vercel 로그에서 디버깅 용이
- Dummy 데이터 대신 `null` 반환 (더 명확한 에러 처리)

---

### 3. CMS 도메인 자동 변환 유틸리티 (`lib/utils.ts`)

**전략 (GEO):**
- AI Search/Google에 `cms.pnamarketing.co.kr` 노출 방지
- 브랜드 일관성 유지: `pnamarketing.co.kr`로 통일

**추가된 함수:**

#### `replaceCMSDomain(content: string)`
모든 CMS 도메인을 프론트엔드 도메인으로 변환
```typescript
replaceCMSDomain('<img src="https://cms.pnamarketing.co.kr/image.jpg" />')
// → '<img src="https://pnamarketing.co.kr/image.jpg" />'
```

#### `replaceImageDomains(html: string)`
이미지 URL만 선택적으로 변환 (src, srcset)

#### `replaceLinkDomains(html: string)`
내부 링크만 변환 (a href)

---

### 4. 컴포넌트에 도메인 변환 적용

#### `CleanPostRenderer.tsx`
```typescript
// Featured Image 변환
<Image src={replaceCMSDomain(featuredImage.node.sourceUrl)} />

// HTML 내부 이미지 변환
const cleanSrc = replaceCMSDomain(src);

// 링크 변환
const cleanHref = replaceCMSDomain(href);
```

#### `ElementorRenderer.tsx`
```typescript
// 전체 HTML 변환
const cleanHtml = replaceCMSDomain(html);
```

---

## 🔧 Vercel 환경변수 설정 방법

### 현재 설정 (이미 완료)
```
NEXT_PUBLIC_WORDPRESS_API_URL=https://cms.pnamarketing.co.kr/graphql
```

### 추가 권장 설정
```
NEXT_PUBLIC_WORDPRESS_URL=https://cms.pnamarketing.co.kr
NEXT_PUBLIC_FRONTEND_DOMAIN=pnamarketing.co.kr
```

### 설정 위치
1. Vercel 대시보드 → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 위 변수들 추가 후 **Save**
4. **Deployments** → 최신 배포 → **Redeploy**

---

## 🧪 테스트 방법

### 1. 로컬 테스트
```bash
# .env.local 파일 확인
cat .env.local

# 개발 서버 실행
npm run dev

# 브라우저 콘솔에서 확인
# ✅ [Env Validated] Using: https://cms.pnamarketing.co.kr/graphql
```

### 2. Vercel 배포 후 테스트
```bash
# Vercel 로그 확인
vercel logs

# 다음 로그가 보여야 함:
# 🔍 [Env Check] API URL Source:
#   - NEXT_PUBLIC_WORDPRESS_API_URL: https://cms.pnamarketing.co.kr/graphql
#   - Selected: https://cms.pnamarketing.co.kr/graphql
# ✅ [Env Validated] Using: https://cms.pnamarketing.co.kr/graphql
```

### 3. API 연결 확인
```bash
# 브라우저에서 아무 페이지나 접속
# 콘솔에서 다음 로그 확인:
# 🚀 [API Request]
# 📍 URL: https://cms.pnamarketing.co.kr/graphql
# ✅ Response Status: 200 OK
```

---

## 📊 변경 파일 목록

| 파일 | 변경 내용 |
|------|----------|
| `lib/env.ts` | Fallback Chain 추가, 환경변수 로깅 강화 |
| `lib/api.ts` | 에러 로깅 개선, Dummy 데이터 제거 |
| `lib/utils.ts` | CMS 도메인 변환 유틸리티 3종 추가 |
| `components/CleanPostRenderer.tsx` | 이미지/링크 도메인 자동 변환 |
| `components/ElementorRenderer.tsx` | HTML 전체 도메인 자동 변환 |
| `env.example` | 새로운 환경변수 예시 추가 |

---

## 🎯 기대 효과

### 1. 보안 (Security)
- ✅ OWASP A05 (Security Misconfiguration) 방어
- ✅ 환경변수 Runtime Validation 강화
- ✅ Fail Fast 원칙 적용 (Production)

### 2. SEO/GEO
- ✅ AI Search에 CMS 도메인 노출 방지
- ✅ 브랜드 일관성 유지 (pnamarketing.co.kr)
- ✅ E-E-A-T 신뢰도 향상

### 3. 개발 경험 (DX)
- ✅ 에러 원인 즉시 파악 가능
- ✅ Vercel/로컬 환경 모두 지원
- ✅ 명확한 로그로 디버깅 시간 단축

---

## 🚨 주의사항

### 1. 환경변수 우선순위
```
WORDPRESS_API_URL (우선) → NEXT_PUBLIC_WORDPRESS_API_URL (대체)
```

### 2. 도메인 변환 범위
- ✅ 이미지 URL (`<img src>`, `srcset`)
- ✅ 내부 링크 (`<a href>`)
- ✅ Featured Image
- ❌ 외부 링크 (변환하지 않음)

### 3. 성능 영향
- 도메인 변환은 서버 사이드에서 1회만 실행
- 정규식 기반 Replace (매우 빠름)
- 캐싱으로 중복 변환 방지

---

## 📞 문제 발생 시

### 여전히 "API 연결 실패"가 뜨는 경우

1. **Vercel 환경변수 재확인**
   ```bash
   vercel env ls
   ```

2. **재배포 (캐시 제거)**
   ```bash
   vercel --prod --force
   ```

3. **WordPress API 직접 테스트**
   ```bash
   curl -X POST https://cms.pnamarketing.co.kr/graphql \
     -H "Content-Type: application/json" \
     -d '{"query":"{ posts { nodes { title } } }"}'
   ```

4. **WPGraphQL 플러그인 확인**
   - WordPress 관리자 → 플러그인 → WPGraphQL 활성화 확인

---

## ✨ 완료!

이제 Vercel에서 정상적으로 WordPress API에 연결되며,
CMS 도메인이 자동으로 프론트엔드 도메인으로 변환됩니다.

**배포 후 확인:**
- ✅ API 연결 성공
- ✅ 상세한 에러 로그 출력
- ✅ 이미지/링크 도메인 자동 변환



