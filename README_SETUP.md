# 🚀 Headless WordPress + Next.js 블로그 (방어적 빌드 모드)

## 📁 프로젝트 구조

```
├── app/
│   ├── layout.tsx           # 전역 레이아웃 (헤더, 푸터, 메뉴)
│   ├── page.tsx             # 홈페이지 (글 목록)
│   ├── globals.css          # Tailwind + 커스텀 스타일
│   ├── [...slug]/           # 동적 라우팅 (Posts & Pages)
│   │   └── page.tsx
│   ├── sitemap.ts           # 동적 sitemap.xml 생성
│   ├── robots.ts            # robots.txt 생성
│   ├── loading.tsx          # 전역 로딩 UI
│   ├── error.tsx            # 전역 에러 바운더리
│   ├── not-found.tsx        # 404 페이지
│   └── api/
│       └── revalidate/      # 캐시 재검증 API (Webhook)
│           └── route.ts
├── components/
│   ├── ElementorRenderer.tsx  # Elementor HTML 렌더러 (Pages)
│   └── CleanPostRenderer.tsx  # GEO 최적화 렌더러 (Posts)
├── lib/
│   ├── types.ts             # TypeScript 타입 정의
│   └── api.ts               # WordPress GraphQL API 클라이언트
├── next.config.js           # Next.js 설정 (빌드 에러 무시)
├── tsconfig.json            # TypeScript 설정 (strict: false)
└── .env.local               # 환경변수 (직접 생성 필요!)
```

---

## 🔧 1단계: 환경변수 설정 (.env.local 생성)

**프로젝트 루트에 `.env.local` 파일을 직접 생성하세요!**

```env
# WordPress GraphQL API URL (필수!)
WORDPRESS_API_URL=https://your-wordpress-site.com/graphql

# Next.js 사이트 URL (Sitemap용)
NEXT_PUBLIC_SITE_URL=https://your-nextjs-site.vercel.app

# Revalidation Secret (Webhook 보안용)
WORDPRESS_REVALIDATE_SECRET=supersecretkey12345

# (선택) 로컬 개발 시 SSL 에러 무시
# NODE_TLS_REJECT_UNAUTHORIZED=0
```

---

## 🛡️ 2단계: 방어적 코드의 핵심 특징

### ✅ **API 요청 실패 시 더미 데이터 반환**
- `lib/api.ts`의 모든 함수는 **절대 에러를 throw 하지 않습니다.**
- API 실패 시 → 빈 배열(`[]`) 또는 더미 데이터 반환
- 빌드가 멈추지 않도록 보장!

### ✅ **TypeScript Strict Mode 해제**
- `tsconfig.json`에서 `"strict": false` 설정
- `next.config.js`에서 `typescript.ignoreBuildErrors: true`
- 타입 에러로 빌드 실패하는 상황 차단

### ✅ **디버깅 로그 추가**
- `lib/api.ts`의 `fetchAPI` 함수에 상세한 console.log 추가
- Vercel 빌드 로그에서 "무엇이 잘못되었는지" 즉시 파악 가능

### ✅ **빈 데이터 방어 처리**
- `app/page.tsx`: 글이 없으면 "아직 작성된 글이 없습니다" 메시지 표시
- `app/layout.tsx`: 메뉴가 없으면 "메뉴 로딩 중..." 표시

---

## 🚀 3단계: 빌드 및 배포

### 로컬 개발
```bash
npm install
npm run dev
```

### Vercel 배포
1. **GitHub에 푸시**
2. **Vercel 대시보드에서 환경변수 설정**
   - `WORDPRESS_API_URL`
   - `NEXT_PUBLIC_SITE_URL`
   - `WORDPRESS_REVALIDATE_SECRET`
3. **자동 배포 시작**

---

## 🎯 4단계: WordPress Webhook 설정 (선택)

글 발행/수정 시 자동으로 Next.js 캐시를 갱신하려면:

1. WordPress 플러그인 설치: **WP Webhooks**
2. 트리거: `Post Published`, `Post Updated`
3. Webhook URL:
```
https://your-nextjs-site.vercel.app/api/revalidate
```
4. Body (JSON):
```json
{
  "secret": "supersecretkey12345",
  "path": "/your-post-slug"
}
```

---

## 🧪 빌드 테스트 체크리스트

### ✅ 빌드 성공 확인
```bash
npm run build
```

**예상 결과:**
- ✅ TypeScript 에러 무시
- ✅ ESLint 에러 무시
- ✅ API 연결 실패해도 빌드 계속 진행
- ✅ "Build completed successfully" 메시지

### ✅ 로그 확인 포인트
Vercel 빌드 로그에서 확인할 내용:
1. `🚀 [API 요청 시작]` - 어떤 URL로 요청하는가?
2. `✅ 응답 상태: 200` - 응답이 정상적으로 오는가?
3. `❌ HTTP 에러: 404` - 어떤 에러가 발생했는가?
4. `⚠️  더미 데이터를 반환합니다` - Fallback이 작동하는가?

---

## 🎨 Two-Track Rendering 전략

### Track 1: **Pages (디자인 보존)**
- `__typename === 'Page'`
- Elementor로 제작된 HTML을 그대로 렌더링
- 컴포넌트: `<ElementorRenderer />`
- CSS 스타일 보존 우선

### Track 2: **Posts (GEO 최적화)**
- `__typename === 'Post'`
- Tailwind Typography + 시맨틱 HTML
- `<img>` → Next.js `<Image>` 자동 변환
- JSON-LD 스키마 자동 주입
- 컴포넌트: `<CleanPostRenderer />`

---

## 🐛 트러블슈팅

### 1️⃣ "Build failed: Type error in..."
**원인:** TypeScript Strict Mode가 켜져 있음  
**해결:** `next.config.js`에서 `ignoreBuildErrors: true` 확인

### 2️⃣ "TypeError: Cannot read property 'nodes' of undefined"
**원인:** WordPress API 응답이 없음  
**해결:** `lib/api.ts`의 방어 코드가 제대로 작동하는지 확인 (더미 데이터 반환 여부)

### 3️⃣ "Error: Invalid src prop..."
**원인:** 이미지 URL이 잘못됨  
**해결:** `next.config.js`의 `remotePatterns`에 `hostname: '**'` 확인

### 4️⃣ 빌드 로그에 아무것도 안 보임
**원인:** 환경변수 미설정  
**해결:** Vercel 대시보드 → Settings → Environment Variables 확인

---

## 🎉 완료!

이제 **무조건 배포되는** Headless WordPress 블로그가 완성되었습니다.

- ✅ API 실패해도 빌드 성공
- ✅ TypeScript 에러 무시
- ✅ 디버깅 로그 완비
- ✅ SEO 최적화 (Sitemap, Robots, Metadata)
- ✅ Core Web Vitals 최적화 (Image, Typography)

**문제가 있다면:**  
Vercel 빌드 로그의 `console.log` 출력을 복사해서 검토하세요!

