# PNA Marketing Site — Claude Code 지침

## 절대 규칙

- **프론트엔드 디자인 변경 절대 금지** — 색상, 레이아웃, 폰트 크기, 간격, 컴포넌트 구조, UI 요소 위치 등 시각적 변경 일절 불가. 성능/SEO/GEO 최적화는 사용자에게 보이지 않는 내부 로직만 수정할 것.
- **커밋은 사용자 요청 시에만** — 자동 커밋 금지. 커밋 메시지는 한글로 작성.
- **기존 파일 수정 우선** — 새 파일 생성은 최소화. 기존 코드 위에 작업할 것.
- **과잉 엔지니어링 금지** — 요청한 것만 수정. 주변 코드 정리, 불필요한 추상화, 미래 대비 설계 하지 말 것.

---

## 프로젝트 개요

| 항목 | 값 |
|------|-----|
| 프레임워크 | Next.js 15 + React 19 (App Router) |
| CMS | WordPress Headless (GraphQL) |
| 프론트 도메인 | pnamarketing.co.kr |
| CMS 도메인 | cms.pnamarketing.co.kr |
| 배포 | Vercel |
| 스타일링 | Tailwind CSS 3 + Shadcn/UI |
| 유효성 검증 | Zod (런타임) + TypeScript strict |
| ISR | 기본 3600초(1시간), /insights 1800초(30분) |

---

## 핵심 아키텍처

### 데이터 흐름
```
WordPress (cms.pnamarketing.co.kr/graphql)
  ↓ Server Component: 직접 호출
  ↓ Client Component: /api/graphql 프록시 (CORS 우회)
  → Zod 검증 → 렌더링
```

### 캐시 & Revalidation
- `lib/api.ts` fetchAPI: `next: { revalidate: 3600, tags: ['wordpress'] }`
- `/api/revalidate` webhook: WordPress 발행 시 `revalidateTag('wordpress')` + `revalidatePath` 호출
- `WORDPRESS_REVALIDATE_SECRET` 환경변수로 webhook 보안

### CMS URL 숨김
- 프론트에 `cms.pnamarketing.co.kr` 노출 금지
- `lib/utils.ts`의 `replaceCmsUrl()`로 치환
- `next.config.js` rewrites로 `/wp-content/`, `/wp-includes/`, `/wp-json/` 프록시

---

## 디렉토리 구조

```
app/
├── page.tsx                    # 메인 랜딩 (ISR 3600s)
├── layout.tsx                  # 루트 레이아웃 (폰트, 메타데이터, GA4)
├── globals.css                 # 전역 CSS 변수
├── styles/                     # 페이지별 CSS
│   ├── home-animations.css
│   ├── about-animations.css
│   └── prose.css               # 블로그 타이포그래피
├── insights/
│   ├── page.tsx                # 블로그 목록 (ISR 1800s)
│   └── [slug]/
│       ├── page.tsx            # 블로그 상세 (SSG + ISR)
│       └── opengraph-image.tsx # 동적 OG 이미지 (Edge Runtime)
├── about/ contact/ google-ads/ seo-geo/ wordpress/ performance/
│   └── page.tsx                # 각 서비스/정보 페이지
├── api/
│   ├── graphql/route.ts        # WP GraphQL 프록시
│   ├── contact/route.ts        # 문의 폼 (Rate Limit + Honeypot)
│   └── revalidate/route.ts     # ISR webhook
├── sitemap.ts                  # 동적 사이트맵
├── robots.ts                   # robots.txt
└── feed.xml/route.ts           # RSS 피드

components/
├── landing/     # 메인 페이지 섹션 (Hero, FAQ, CTA, Footer 등)
├── insights/    # 블로그 컴포넌트 (PostCard, ReadingProgress 등)
├── sections/    # 재사용 섹션 (ServiceHero, Contact)
├── service/     # 서비스별 FAQ
├── seo/         # StructuredData (JSON-LD)
└── ui/          # Shadcn 기본 컴포넌트 (Button, Card, Badge 등)

lib/
├── api.ts              # WordPress GraphQL 클라이언트 (Zod 검증, cache())
├── types.ts            # 공용 타입 (WPContent, MenuItem, FAQItem 등)
├── env.ts              # 환경변수 검증 (server-only)
├── sanitize.ts         # XSS 방어 (regex 기반)
├── utils.ts            # cn(), replaceCmsUrl()
├── category-colors.ts  # 카테고리 색상 매핑
├── google-indexing.ts  # Google Indexing API
└── hooks/useScrollReveal.ts  # IntersectionObserver 훅

config/
└── site-config.ts      # 사이트 메타데이터 단일 소스 (SITE_CONFIG)
```

---

## 주요 파일별 역할

| 파일 | 역할 | 수정 시 주의사항 |
|------|------|------------------|
| `lib/api.ts` | WP GraphQL 클라이언트 | Zod 스키마 변경 시 WP 응답 구조 확인 필수 |
| `lib/types.ts` | 공용 타입 정의 | 타입 변경 시 api.ts Zod 스키마도 동기화 |
| `config/site-config.ts` | 브랜드/연락처 정보 | 여기만 수정하면 전체 반영 (SSOT) |
| `app/layout.tsx` | 루트 레이아웃 | 폰트 로딩 순서, GA4, Pretendard 지연 로딩 건드리지 말 것 |
| `next.config.js` | 빌드 설정 | redirects/rewrites 변경 시 SEO 영향 검토 |
| `app/api/revalidate/route.ts` | ISR webhook | secret 검증 로직 유지 필수 |
| `components/seo/StructuredData.tsx` | JSON-LD | schema.org 스펙 준수 |

---

## 개발 컨벤션

### 코드 스타일
- TypeScript strict mode (`noUnusedLocals`, `noUnusedParameters`)
- Zod로 외부 데이터(WP 응답, 폼 입력) 런타임 검증
- `console.log`는 반드시 `process.env.NODE_ENV === 'development'` 가드
- `'server-only'` import로 서버 전용 모듈 표시

### 컴포넌트 패턴
- Server Component 기본, Client는 `"use client"` 명시
- Below-fold 섹션은 `next/dynamic`으로 코드 스플리팅
- 이미지는 반드시 `next/image` 사용
- React `cache()`로 SSR 중복 요청 방지

### SEO / GEO
- 모든 페이지에 `generateMetadata()` 또는 `export const metadata` 필수
- Semantic HTML: `<section>`, `<article>`, `<header>`, `<main>` 사용 (`<div>` 래퍼 지양)
- JSON-LD: `StructuredData` 컴포넌트로 주입
- Canonical URL: `alternates: { canonical: './' }` 패턴

### 보안
- XSS: `lib/sanitize.ts`로 WP HTML 정화
- CSRF: Rate limit + Honeypot (contact 폼)
- 환경변수: `lib/env.ts`에서 Zod 검증 (모든 값에 default 있음)
- CMS URL 노출 금지: `replaceCmsUrl()` 적용

---

## 폰트 체계

| 폰트 | 용도 | 로딩 |
|------|------|------|
| Manrope | 영문/숫자 (기본) | preload, display:swap |
| Cormorant Garamond | 세리프 포인트 | preload:false, display:swap |
| Pretendard Variable | 한글 본문 | load 이벤트 이후 지연 로딩 (CDN dynamic subset ~300KB) |

---

## 환경변수

| 변수 | 용도 | 기본값 |
|------|------|--------|
| `WORDPRESS_API_URL` | WP GraphQL 엔드포인트 | `https://cms.pnamarketing.co.kr/graphql` |
| `WORDPRESS_REVALIDATE_SECRET` | Webhook 인증 | (필수, .env.local) |
| `NEXT_PUBLIC_SITE_URL` | 프론트 도메인 | `https://pnamarketing.co.kr` |
| `NEXT_PUBLIC_GA4_ID` | GA4 추적 ID | (선택) |
| `GMAIL_USER` / `GMAIL_APP_PASSWORD` | 문의 메일 발송 | (필수, contact 폼용) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare CAPTCHA | (선택) |

---

## 빌드 & 배포

```bash
npm run dev      # 로컬 개발 서버
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint 검사
```

- Vercel 자동 배포 (main 브랜치 push 시)
- `next.config.js`에 `ignoreBuildErrors: true` — 프로덕션 전 false 전환 필요

---

## 알려진 미해결 사항

- `next.config.js`: `ignoreBuildErrors` / `ignoreDuringBuilds` = true (TODO: false 전환)
- `lib/sanitize.ts`: regex 기반 XSS 방어 (DOMPurify 도입 권장)
- `app/api/revalidate/route.ts`: `@ts-nocheck` 다수 (타입 정리 필요)
- `.cursorrules`: Next.js 14 기준으로 작성됨 (현재 15, 내용 갱신 필요)
