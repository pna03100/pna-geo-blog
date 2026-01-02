# Headless WordPress + Next.js 14 블로그

Core Web Vitals와 GEO(생성형 엔진 최적화)에 최적화된 블로그 시스템입니다.

## 🚀 주요 기능

- **Two-Track Rendering**: Pages는 Elementor 디자인 보존, Posts는 GEO 최적화
- **Next.js 14 App Router**: 최신 React Server Components 사용
- **TypeScript Strict Mode**: 타입 안전성 보장
- **상세한 디버깅 로그**: 모든 API 호출과 응답을 터미널에 출력

## 📋 필수 요구사항

### WordPress 플러그인
1. **WPGraphQL** - GraphQL API 제공
2. **WPGraphQL for Rank Math** - SEO 데이터 노출

⚠️ **주의**: `WPGraphQL for Elementor`는 설치하지 마세요. 표준 `content` 필드만 사용합니다.

## 🛠️ 설치 방법

1. 의존성 설치:
```bash
npm install
```

2. 환경 변수 설정:
`.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```env
WORDPRESS_API_URL=https://your-wordpress-site.com/graphql
WORDPRESS_REVALIDATE_SECRET=your-secret-key-here
NEXT_PUBLIC_SITE_URL=https://your-nextjs-site.com
```

3. 개발 서버 실행:
```bash
npm run dev
```

브라우저에서 http://localhost:3000 을 열어 확인하세요.

## 🐛 디버깅

`lib/api.ts`의 `fetchAPI` 함수는 다음 정보를 터미널에 상세히 출력합니다:

- ① 호출 URL
- ② GraphQL 쿼리
- ③ Variables
- ④ 현재 시간
- ⑤ Response 상태
- ⑥ Response 헤더
- ⑦ 워드프레스 응답 데이터
- ⑧-⑭ 에러 정보 (발생 시)

무한 로딩이나 에러 발생 시 터미널 로그를 확인하세요!

## 📁 폴더 구조

```
├── app/
│   ├── [...slug]/
│   │   └── page.tsx          # 동적 라우팅
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts       # 캐시 재검증 API
│   ├── layout.tsx             # 루트 레이아웃
│   ├── page.tsx               # 홈페이지
│   ├── sitemap.ts             # 동적 Sitemap
│   ├── robots.ts              # Robots.txt
│   └── globals.css            # 전역 스타일
├── components/
│   ├── ElementorRenderer.tsx  # Page 렌더링
│   └── CleanPostRenderer.tsx  # Post 렌더링 (GEO 최적화)
├── lib/
│   ├── types.ts               # TypeScript 타입 정의
│   └── api.ts                 # WordPress API 함수
├── .env.local                 # 환경 변수 (Git 무시)
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 🔄 워드프레스 Webhook 설정

워드프레스에서 글/페이지 수정 시 자동으로 캐시를 갱신하려면:

1. 워드프레스에 Webhook 플러그인 설치 (예: WP Webhooks)
2. 다음 URL로 POST 요청 설정:
   ```
   https://your-nextjs-site.com/api/revalidate
   ```
3. Body 예시:
   ```json
   {
     "secret": "your-secret-key-here",
     "path": "/blog/post-slug/"
   }
   ```

## 🎯 성능 최적화

- **ISR (Incremental Static Regeneration)**: 정적 페이지 자동 갱신
- **Next.js Image**: 자동 이미지 최적화
- **Variable Fonts**: 폰트 로딩 최적화
- **Tailwind CSS**: 사용하지 않는 CSS 자동 제거

## 📝 라이센스

MIT

