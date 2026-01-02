# 🛠️ 빠른 설정 가이드

## 1단계: 환경변수 파일 생성 (매우 중요!)

프로젝트 루트에 `.env.local` 파일을 생성하세요:

```bash
# Windows (PowerShell)
Copy-Item .env.local.example .env.local

# Mac/Linux
cp .env.local.example .env.local
```

## 2단계: 환경변수 값 입력

`.env.local` 파일을 열어서 다음 값들을 입력하세요:

```env
# ✅ 필수: 워드프레스 GraphQL API 엔드포인트
WORDPRESS_API_URL=https://your-wordpress-site.com/graphql

# ✅ 필수: 사이트 공개 URL (sitemap에 사용)
NEXT_PUBLIC_SITE_URL=https://your-nextjs-site.com

# ✅ 필수: Revalidation 보안 토큰
WORDPRESS_REVALIDATE_SECRET=abc123def456ghi789
```

### 환경변수 값 찾는 방법

#### `WORDPRESS_API_URL`
1. 워드프레스 관리자 패널에 로그인
2. WPGraphQL 플러그인이 설치되어 있는지 확인
3. URL은 보통 `https://your-wordpress-site.com/graphql` 형태

**테스트 방법:**
브라우저에서 `https://your-wordpress-site.com/graphql`을 열었을 때 GraphiQL IDE가 나타나야 합니다.

#### `NEXT_PUBLIC_SITE_URL`
- 로컬 개발: `http://localhost:3000`
- Vercel 배포: `https://your-project.vercel.app`
- 커스텀 도메인: `https://yourdomain.com`

#### `WORDPRESS_REVALIDATE_SECRET`
강력한 랜덤 문자열을 생성하세요:

```bash
# Mac/Linux
openssl rand -base64 32

# Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

예시: `xK3mP9qR7vN2jF8dL5wC0aE4tS6yU1iO`

## 3단계: 워드프레스 플러그인 확인

다음 플러그인들이 설치되어 있어야 합니다:

- ✅ **WPGraphQL** (필수)
- ✅ **WPGraphQL for Rank Math** (필수)

> ⚠️ **주의:** `WPGraphQL for Elementor`는 설치하지 않아도 됩니다!

### 플러그인 설치 방법
1. 워드프레스 관리자 → 플러그인 → 새로 추가
2. "WPGraphQL" 검색 및 설치
3. "WPGraphQL for Rank Math" 검색 및 설치
4. 두 플러그인 모두 활성화

## 4단계: 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## 5단계: 에러 확인

### ✅ 정상 작동 시 로그
```
🚀 [fetchAPI] 시작
📍 호출 URL: https://your-wordpress-site.com/graphql
⏱️  [fetchAPI] 응답 시간: 245ms
✅ [fetchAPI] 응답 수신 성공
📚 [getAllPosts] 5개 글 발견
```

### ❌ 에러 발생 시

#### 에러 1: 환경변수 없음
```
❌ [fetchAPI] WORDPRESS_API_URL 환경변수가 설정되지 않았습니다!
```
**해결:** `.env.local` 파일을 확인하고 `WORDPRESS_API_URL`을 추가하세요.

#### 에러 2: GraphQL 에러
```
❌ [fetchAPI] GraphQL 에러 발생!
```
**해결:**
1. 워드프레스에서 WPGraphQL 플러그인이 활성화되어 있는지 확인
2. 워드프레스 관리자 → GraphQL → Settings에서 권한 설정 확인
3. 워드프레스 URL이 정확한지 확인

#### 에러 3: 빈 데이터
```
⚠️  [getAllPosts] 데이터 없음 - 빈 배열 반환
```
**해결:** 워드프레스에 발행된 글이 하나도 없습니다. 글을 작성하세요!

## 6단계: Vercel 배포

### A. Vercel CLI 사용
```bash
npm install -g vercel
vercel
```

### B. Vercel 대시보드 사용
1. [vercel.com](https://vercel.com)에서 GitHub 저장소 연결
2. Environment Variables 설정:
   - `WORDPRESS_API_URL`
   - `NEXT_PUBLIC_SITE_URL` (배포 URL 입력)
   - `WORDPRESS_REVALIDATE_SECRET`
3. Deploy 버튼 클릭

### Vercel 환경변수 설정 화면
```
Variable Name: WORDPRESS_API_URL
Value: https://your-wordpress-site.com/graphql
Environment: Production, Preview, Development
```

## 7단계: 워드프레스 Webhook 설정 (선택사항)

글 발행 시 자동으로 Next.js 캐시를 갱신하려면:

### A. WP Webhooks 플러그인 설치
1. 워드프레스 관리자 → 플러그인 → WP Webhooks 설치
2. 활성화

### B. Webhook 추가
1. Webhooks → Send Data
2. **Trigger:** Post Published / Post Updated
3. **Webhook URL:** `https://your-nextjs-site.com/api/revalidate`
4. **Authentication:** Bearer Token
5. **Token:** `.env.local`의 `WORDPRESS_REVALIDATE_SECRET` 값 입력

### C. 테스트
1. 워드프레스에서 글 발행
2. Next.js 로그 확인:
```
🔄 [Revalidate API] 요청 수신
✅ [Revalidate API] 재검증 완료
```

## 🚨 자주 발생하는 문제

### 문제 1: 빌드가 무한 로딩
**원인:** `WORDPRESS_API_URL`이 없거나 잘못됨
**해결:** `.env.local` 파일 확인

### 문제 2: 404 에러
**원인:** 워드프레스에 해당 슬러그의 글/페이지가 없음
**해결:** 워드프레스에서 글 상태를 "발행됨"으로 변경

### 문제 3: 이미지가 안 보임
**원인:** Next.js가 외부 이미지 도메인을 신뢰하지 않음
**해결:** `next.config.js`에 이미지 도메인 추가:
```js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-wordpress-site.com',
    },
  ],
},
```

## 📞 도움이 필요하신가요?

1. 터미널 로그를 확인하세요 (디버깅 메시지가 매우 상세합니다)
2. `README.md` 파일을 읽어보세요
3. 워드프레스 GraphQL IDE에서 쿼리를 테스트하세요

---

**설정 완료! 🎉**

