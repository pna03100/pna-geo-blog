# 🚀 GEO 최적화 Next.js + Headless WordPress 블로그

구글 Core Web Vitals와 생성형 엔진 최적화(GEO)에 최적화된, **현존하는 가장 빠른 블로그**.

## ✨ 주요 특징

- ⚡ **Two-Track Rendering 전략**
  - **Pages:** Elementor HTML을 그대로 파싱하여 디자인 완벽 보존
  - **Posts:** GEO 최적화된 시맨틱 마크업 + JSON-LD 스키마

- 🛡️ **방탄 에러 핸들링**
  - API 요청 실패 시에도 빌드가 중단되지 않음
  - Empty State 안전 처리
  - 상세한 디버깅 로그

- 🎯 **완벽한 SEO**
  - Rank Math SEO 데이터 자동 적용
  - 동적 sitemap.xml 생성
  - 구조화된 JSON-LD 스키마

- ⚙️ **자동 캐시 갱신**
  - WordPress Webhook 연동
  - 변경된 콘텐츠만 선택적 재검증

## 📦 기술 스택

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + @tailwindcss/typography
- **Data:** WordPress GraphQL (WPGraphQL + Rank Math)
- **Parsing:** html-react-parser

## 🔧 설치 방법

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd <project-name>
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# WordPress GraphQL API URL
WORDPRESS_API_URL=https://your-wordpress-site.com/graphql

# Revalidation Secret (랜덤 문자열)
WORDPRESS_REVALIDATE_SECRET=your-super-secret-token-here

# 사이트 URL (Sitemap용)
NEXT_PUBLIC_SITE_URL=https://your-nextjs-site.com
```

### 3. WordPress 플러그인 설치

WordPress 관리자에서 다음 플러그인을 설치하세요:

1. **WPGraphQL** (필수)
2. **WPGraphQL for Rank Math** (필수)

⚠️ **중요:** `WPGraphQL for Elementor`는 설치하지 마세요. (이 프로젝트에서는 표준 `content` 필드만 사용합니다)

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어보세요.

## 📁 프로젝트 구조

```
.
├── app/
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts          # Webhook 재검증 API
│   ├── [...slug]/
│   │   └── page.tsx              # 동적 라우팅 (Post/Page)
│   ├── layout.tsx                # Root Layout
│   ├── page.tsx                  # 홈페이지
│   ├── globals.css               # 전역 스타일
│   ├── sitemap.ts                # 동적 Sitemap
│   ├── robots.ts                 # Robots.txt
│   └── not-found.tsx             # 404 페이지
├── components/
│   ├── ElementorRenderer.tsx     # Elementor HTML 렌더러
│   └── CleanPostRenderer.tsx     # GEO 최적화 Post 렌더러
├── lib/
│   ├── api.ts                    # WordPress API 함수 (방탄 에러 핸들링)
│   └── types.ts                  # TypeScript 타입 정의
└── .env.local                    # 환경 변수 (직접 생성)
```

## 🔍 디버깅

`lib/api.ts` 파일에는 상세한 디버깅 로그가 포함되어 있습니다.

빌드 또는 개발 서버 실행 시 터미널에서 다음 정보를 확인할 수 있습니다:

- 📡 API 요청 URL
- 📥 HTTP 응답 상태
- ✅/❌ 성공/실패 여부
- 💥 에러 상세 메시지

## 🚀 배포 (Vercel)

### 1. GitHub에 푸시

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Vercel에서 프로젝트 임포트

[Vercel 대시보드](https://vercel.com/new)에서 GitHub 저장소를 선택하세요.

### 3. 환경 변수 설정

Vercel 프로젝트 설정에서 다음 환경 변수를 추가하세요:

- `WORDPRESS_API_URL`
- `WORDPRESS_REVALIDATE_SECRET`
- `NEXT_PUBLIC_SITE_URL`

### 4. 배포 완료!

Vercel이 자동으로 빌드하고 배포합니다.

## 🔄 WordPress Webhook 설정

WordPress에서 콘텐츠가 업데이트될 때 자동으로 Next.js 캐시를 갱신하려면:

1. WordPress에 플러그인 추가 (예: WP Webhooks)
2. 다음 URL로 POST 요청 설정:

```
https://your-nextjs-site.com/api/revalidate?secret=YOUR_SECRET
```

3. Webhook Payload (옵션):

```json
{
  "path": "/your-post-slug",
  "type": "post"
}
```

## 📊 성능 최적화 포인트

### 1. Core Web Vitals
- ✅ **LCP:** Featured Image에 `priority` 속성 적용
- ✅ **CLS:** 이미지 width/height 명시로 레이아웃 시프트 방지
- ✅ **FID:** Server Components로 JavaScript 번들 최소화

### 2. GEO 최적화
- ✅ **시맨틱 HTML:** h1, h2, h3 계층 구조 명확화
- ✅ **JSON-LD 스키마:** Rank Math 데이터 자동 주입
- ✅ **Metadata API:** 완벽한 OG 태그 및 Canonical URL

### 3. 캐싱 전략
- ✅ **Static Generation:** 빌드 시 모든 페이지 사전 생성
- ✅ **ISR:** 1시간마다 자동 재검증
- ✅ **On-Demand Revalidation:** Webhook으로 즉시 갱신

## 🛠️ 트러블슈팅

### 빌드가 실패할 때

**증상:** Vercel 빌드가 무한 로딩 또는 실패

**해결책:**
1. 환경 변수가 올바르게 설정되었는지 확인
2. WordPress GraphQL이 제대로 작동하는지 테스트:
   ```bash
   curl -X POST https://your-wordpress-site.com/graphql \
     -H "Content-Type: application/json" \
     -d '{"query": "{ posts { nodes { title } } }"}'
   ```
3. 터미널 로그에서 `[API 요청 시작]` 메시지 확인

### 이미지가 안 보일 때

**증상:** Next.js Image 컴포넌트에서 403 에러

**해결책:**
1. `next.config.js`의 `remotePatterns`에 WordPress 도메인 추가
2. WordPress에서 이미지 핫링킹 차단 해제

### 404 페이지만 보일 때

**증상:** 모든 페이지에서 404 에러

**해결책:**
1. WordPress에 게시글이 최소 1개 이상 있는지 확인
2. WordPress GraphQL에서 `status: PUBLISH` 상태 확인
3. `generateStaticParams` 로그 확인

## 📝 라이선스

MIT License

## 🤝 기여

이슈와 PR은 언제나 환영입니다!

---

**Made with ❤️ for speed and SEO**
