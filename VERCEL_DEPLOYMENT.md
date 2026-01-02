# 🚀 Vercel 배포 가이드

## Vercel 빌드가 실패하는 이유 파악하기

### 현재 상황 분석
Vercel 로그를 보면:
```
Running "npm run build"
> next build

Attention: Next.js now collects completely anonymous telemetry...
```

이후 멈춘다면, 주요 원인은 **환경변수 누락**입니다.

## ✅ 해결 방법: Vercel 환경변수 설정

### 1단계: Vercel 대시보드 접속
1. [vercel.com](https://vercel.com) 로그인
2. 프로젝트 선택
3. **Settings** 탭 클릭
4. 왼쪽 메뉴에서 **Environment Variables** 클릭

### 2단계: 환경변수 추가

다음 3개의 환경변수를 추가하세요:

#### 변수 1: `WORDPRESS_API_URL`
```
Name: WORDPRESS_API_URL
Value: https://your-wordpress-site.com/graphql
Environments: ✅ Production  ✅ Preview  ✅ Development
```

#### 변수 2: `NEXT_PUBLIC_SITE_URL`
```
Name: NEXT_PUBLIC_SITE_URL
Value: https://your-project.vercel.app
Environments: ✅ Production  ✅ Preview  ✅ Development
```

#### 변수 3: `WORDPRESS_REVALIDATE_SECRET`
```
Name: WORDPRESS_REVALIDATE_SECRET
Value: (강력한 랜덤 문자열 - 아래 참조)
Environments: ✅ Production  ✅ Preview  ✅ Development
```

**랜덤 문자열 생성:**
```bash
# Mac/Linux
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### 3단계: 재배포
환경변수 추가 후:
1. **Deployments** 탭으로 이동
2. 가장 최근 배포에서 **⋯** 버튼 클릭
3. **Redeploy** 선택
4. **Redeploy** 버튼 클릭

## 📊 빌드 로그 확인하기

### ✅ 정상 빌드 로그
```
🚀 [fetchAPI] 시작
📍 호출 URL: https://your-wordpress.com/graphql
⏱️  [fetchAPI] 응답 시간: 245ms
✅ [fetchAPI] 응답 수신 성공
📚 [getAllPosts] 5개 글 발견

Route (app)                    Size     First Load JS
┌ ○ /                          1.2 kB    85.3 kB
├ ○ /_not-found                ...
└ λ /[...slug]                 ...

○  (Static)   prerendered as static content
λ  (Dynamic)  server-rendered on demand

✓ Compiled successfully
```

### ❌ 에러 로그 예시

#### 에러 1: 환경변수 없음
```
❌ [fetchAPI] WORDPRESS_API_URL 환경변수가 설정되지 않았습니다!
💡 .env.local 파일에 WORDPRESS_API_URL을 추가하세요.
```
**해결:** Vercel 환경변수에 `WORDPRESS_API_URL` 추가

#### 에러 2: 워드프레스 연결 실패
```
❌ [fetchAPI] HTTP 에러 발생!
Status: 500
```
**해결:**
1. 워드프레스 URL이 정확한지 확인
2. WPGraphQL 플러그인이 활성화되어 있는지 확인
3. 워드프레스가 정상 작동하는지 확인

#### 에러 3: GraphQL 쿼리 에러
```
❌ [fetchAPI] GraphQL 에러 발생!
Errors: [{"message":"Cannot query field..."}]
```
**해결:**
1. `WPGraphQL for Rank Math` 플러그인 설치 확인
2. 워드프레스에서 GraphiQL IDE로 쿼리 테스트

## 🔍 빌드 타임아웃 방지

### 문제 상황
```
Error: Command "npm run build" timed out after 15m
```

### 해결 방법

#### 1. `generateStaticParams` 제한
`app/[...slug]/page.tsx` 파일 수정:

```typescript
export async function generateStaticParams() {
  if (process.env.VERCEL_ENV === 'preview') {
    // Preview 배포 시 정적 생성 건너뛰기
    return [];
  }

  // Production에서만 정적 페이지 생성
  const uris = await getAllUris();
  return uris.map((uri) => ({
    slug: uri.split('/').filter((segment) => segment !== ''),
  }));
}
```

#### 2. 페이지 제한 설정
`lib/api.ts`의 쿼리 수정:

```typescript
// 최대 100개까지만 가져오기
posts(first: 100, where: { status: PUBLISH })
pages(first: 100, where: { status: PUBLISH })
```

## 🎯 최적 배포 전략

### A. 첫 배포 (빠른 배포)
환경변수만 설정하고 배포하면, 페이지가 **On-Demand**로 생성됩니다.

**장점:**
- ⚡ 빌드 시간: 1-2분
- 🚀 빠른 배포

**단점:**
- 첫 방문자는 약간 느릴 수 있음 (첫 렌더링)

### B. 전체 정적 생성 (최고 성능)
모든 페이지를 빌드 시 미리 생성합니다.

**장점:**
- ⚡ 초고속 로딩
- 🎯 SEO 최적화

**단점:**
- ⏳ 빌드 시간: 5-15분 (글 개수에 따라)

**권장:** 글이 100개 이하면 B, 그 이상이면 A를 선택하세요.

## 🔄 자동 재배포 설정

### GitHub 연동 시
1. Vercel 프로젝트 → Settings → Git
2. **Production Branch:** `main` 설정
3. `main` 브랜치에 푸시하면 자동 배포됨

### 워드프레스 Webhook 연동
1. 워드프레스에 **WP Webhooks** 플러그인 설치
2. Webhook URL: `https://your-project.vercel.app/api/revalidate`
3. Authorization Header:
   ```
   Bearer your-revalidate-secret-token
   ```
4. 글 발행/수정 시 자동으로 캐시 갱신

## 📈 배포 후 확인사항

### 1. Sitemap 확인
```
https://your-project.vercel.app/sitemap.xml
```
모든 글과 페이지가 나열되어야 합니다.

### 2. Robots.txt 확인
```
https://your-project.vercel.app/robots.txt
```

출력 예시:
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /private/

Sitemap: https://your-project.vercel.app/sitemap.xml
```

### 3. 페이지 로딩 확인
- 홈페이지: `https://your-project.vercel.app`
- 특정 글: `https://your-project.vercel.app/your-post-slug`

### 4. Core Web Vitals 확인
[PageSpeed Insights](https://pagespeed.web.dev/)에서 테스트:
- ✅ LCP: < 2.5s
- ✅ FID: < 100ms
- ✅ CLS: < 0.1

## 🚨 긴급 롤백 방법

빌드가 실패하거나 사이트가 다운되었을 때:

1. Vercel 대시보드 → **Deployments**
2. 이전의 정상 배포 찾기 (✓ 표시)
3. **⋯** → **Promote to Production**

## 💡 팁

### 배포 시간 단축
```typescript
// app/[...slug]/page.tsx
export const revalidate = 3600; // 1시간
export const dynamicParams = true; // 새 경로 허용
```

### Preview 배포 빠르게
`.vercelignore` 파일 생성:
```
# 미리보기 배포 시 제외할 파일
.git
.github
*.md
```

---

**배포 성공! 🎉**

이제 세상에서 가장 빠른 블로그를 소유하셨습니다!

