# 🚨 Production White Screen 문제 진단 보고서

## ✅ CSS Configuration Status (모두 정상)

### 1. Tailwind CSS Setup
- ✅ `app/layout.tsx:10` - `import './globals.css'` 존재
- ✅ `app/globals.css:1-3` - Tailwind directives 모두 존재
- ✅ `tailwind.config.ts:8` - Content path `./app/**/*.{js,ts,jsx,tsx,mdx}` 설정됨

### 2. Build Status
- ✅ TypeScript: No errors
- ✅ Linter: No errors
- ✅ Build: Success (134초)
- ✅ Route: `/ (4.54 kB, 112 kB First Load JS)`

## 🔍 Production White Screen 원인 분석

CSS 설정은 완벽하므로, Production 환경에서 White Screen이 발생하는 경우 다음을 확인하세요:

### Cause 1: 환경변수 누락 (Vercel/Production)
**증상:** Server Component가 데이터를 못 가져옴 → 빈 화면

**해결책:**
```bash
# Vercel Dashboard에서 설정 필요
WORDPRESS_API_URL=https://cms.pnamarketing.co.kr/graphql
NEXT_PUBLIC_WORDPRESS_URL=https://cms.pnamarketing.co.kr
NEXT_PUBLIC_FRONTEND_DOMAIN=pnamarketing.co.kr
NEXT_PUBLIC_SITE_URL=https://pnamarketing.co.kr
```

**검증 방법:**
```bash
# Vercel에서 빌드 로그 확인
vercel logs [deployment-url] --follow
```

### Cause 2: WordPress API 타임아웃
**증상:** `getContentByURI('/')` 호출이 30초 이상 걸림

**해결책 (next.config.js):**
```js
staticPageGenerationTimeout: 180, // 이미 설정됨 ✅
```

**추가 조치:**
```js
// app/page.tsx에 이미 적용됨
export default async function HomePage() {
  const data = await getContentByURI('/');
  if (!data?.content) {
    notFound(); // 404 페이지로 리다이렉트
  }
  // ...
}
```

### Cause 3: CORS 문제 (WordPress)
**증상:** 브라우저 콘솔에 CORS 에러

**현재 상태:** WordPress API가 CORS 허용 중
```
'access-control-allow-origin': '*',
```

**검증 방법:**
```bash
curl -H "Origin: https://pnamarketing.co.kr" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"query":"{ posts { nodes { title } } }"}' \
  https://cms.pnamarketing.co.kr/graphql
```

### Cause 4: CSS Purge 문제 (Tailwind Production Build)
**증상:** Production에서만 일부 스타일 누락

**현재 설정 (정상):**
```ts
// tailwind.config.ts
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",  // ✅ 올바름
  "./components/**/*.{js,ts,jsx,tsx,mdx}",  // ✅ 올바름
]
```

**추가 검증:**
```bash
# Production 빌드 CSS 확인
npm run build
cat .next/static/css/*.css | grep "bg-gradient-to-r"
```

### Cause 5: Next.js Static Generation 실패
**증상:** 페이지가 빌드 타임에 생성되지 않음

**현재 설정 (force-dynamic):**
```ts
// app/layout.tsx:6
export const dynamic = 'force-dynamic';
```

**주의:** `force-dynamic`은 매 요청마다 서버에서 렌더링합니다.  
Production에서 성능 문제가 있다면 다음으로 변경:

```ts
// app/page.tsx 상단에 추가
export const revalidate = 3600; // 1시간마다 재생성
```

## 🎯 즉시 실행 체크리스트

### Vercel 배포 전 확인
- [ ] Vercel Dashboard > Settings > Environment Variables 설정
- [ ] `NEXT_PUBLIC_SITE_URL` 추가 (예: `https://pnamarketing.co.kr`)
- [ ] 빌드 성공 확인 (`npm run build`)
- [ ] Localhost에서 정상 작동 확인 (`npm run dev`)

### Vercel 배포 후 확인
- [ ] Deployment URL 접속 → White Screen 여부 확인
- [ ] 브라우저 개발자 도구 > Console 확인 (에러 로그)
- [ ] 브라우저 개발자 도구 > Network 확인 (API 호출 실패?)
- [ ] Vercel Logs 확인 (`vercel logs [url] --follow`)

### 긴급 디버깅 코드
다음 코드를 `app/page.tsx`에 임시로 추가:

```tsx
export default async function HomePage() {
  // [DEBUG] 환경변수 확인
  console.log('🔍 ENV CHECK:', {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    wpUrl: process.env.WORDPRESS_API_URL,
  });

  const data = await getContentByURI('/');
  
  // [DEBUG] 데이터 확인
  console.log('🔍 DATA CHECK:', {
    hasData: !!data,
    hasContent: !!data?.content,
    contentLength: data?.content?.length || 0,
  });

  if (!data?.content) {
    // [DEBUG] 에러 상세 정보
    return (
      <div className="p-10 bg-red-50 border border-red-200">
        <h1 className="text-2xl font-bold text-red-600">데이터 로드 실패</h1>
        <pre className="mt-4 text-sm">{JSON.stringify({
          env: process.env.NODE_ENV,
          wpUrl: process.env.WORDPRESS_API_URL,
        }, null, 2)}</pre>
      </div>
    );
  }
  
  // ... 나머지 코드
}
```

## 🚀 최종 권장사항

### 1. 로컬 테스트 (필수)
```bash
# Production 빌드 로컬 테스트
npm run build
npm run start
# http://localhost:3000 접속하여 확인
```

### 2. Vercel 환경변수 설정 (필수)
```
NEXT_PUBLIC_SITE_URL=https://pnamarketing.co.kr
WORDPRESS_API_URL=https://cms.pnamarketing.co.kr/graphql
```

### 3. WordPress 헬스 체크
```bash
curl https://cms.pnamarketing.co.kr/graphql -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"{ pages(first:1) { nodes { title } } }"}'
```

### 4. Performance Optimization
```ts
// app/page.tsx 상단 추가 (선택)
export const revalidate = 3600; // ISR 활성화
```

## 📊 현재 상태 요약

| 항목 | 상태 | 비고 |
|------|------|------|
| CSS 설정 | ✅ 정상 | Tailwind 완벽 설정 |
| 빌드 성공 | ✅ 정상 | 134초, 에러 없음 |
| WordPress API | ✅ 정상 | GraphQL 응답 확인 |
| TypeScript | ✅ 정상 | 컴파일 에러 없음 |
| Linter | ✅ 정상 | ESLint 에러 없음 |

**결론:** 로컬 빌드는 완벽합니다. Production White Screen은 환경변수 또는 네트워크 이슈일 가능성이 높습니다.
