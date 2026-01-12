# 🏗️ 아키텍처 문서

## 개요

이 프로젝트는 **Headless WordPress**를 CMS로 사용하고, **Next.js 14 App Router**를 프론트엔드로 사용하는 **Jamstack 아키텍처**입니다.

---

## 시스템 구조

```
┌─────────────────────────────────────────────────────────────┐
│                        사용자 (Browser)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 14 Frontend                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  App Router (Server Components)                      │  │
│  │  - SSG (Static Site Generation)                      │  │
│  │  - ISR (Incremental Static Regeneration)            │  │
│  │  - Dynamic Metadata                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Client Components (필요시만)                        │  │
│  │  - Pagination                                        │  │
│  │  - CategoryFilter                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ GraphQL
┌─────────────────────────────────────────────────────────────┐
│                    WordPress (Headless CMS)                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  WPGraphQL Plugin                                    │  │
│  │  - Posts, Pages, Categories                         │  │
│  │  - Media (Images)                                    │  │
│  │  - SEO Data (RankMath/Yoast)                        │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  MySQL Database                                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 데이터 흐름

### 1. 빌드 타임 (SSG)

```
WordPress (GraphQL)
    │
    ▼ getAllPosts()
Next.js Build Process
    │
    ▼ generateStaticParams()
Static HTML Files
    │
    ▼
CDN (Vercel/Cloudflare)
```

### 2. 런타임 (ISR)

```
User Request
    │
    ▼
CDN Cache (Hit?)
    │ No
    ▼
Next.js Server
    │
    ▼ getContentByURI()
WordPress GraphQL API
    │
    ▼
Zod Validation
    │
    ▼
Render Server Component
    │
    ▼
Update CDN Cache (revalidate: 3600)
```

---

## 보안 레이어

### 1. 입력 검증 (Input Validation)

```typescript
// lib/api.ts
const WPContentSchema = z.object({
  title: z.string(),
  content: z.string(),
  // ...
});

const validated = WPContentSchema.safeParse(data);
if (!validated.success) {
  // 에러 처리
}
```

### 2. HTML 정제 (XSS Defense)

```typescript
// lib/sanitize.ts
export function sanitizeWordPressHTML(html: string): string {
  return html
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
}
```

### 3. 환경변수 격리

```typescript
// lib/env.ts
const envSchema = z.object({
  WORDPRESS_API_URL: z.string().url(),
  // ...
});

export const env = validateEnv();
```

---

## 성능 최적화

### 1. Static Site Generation (SSG)

**장점:**
- ⚡ 초고속 로딩 (TTFB < 100ms)
- 💰 서버 비용 절감 (정적 파일)
- 🔒 보안 강화 (공격 표면 최소화)

**구현:**
```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

### 2. Incremental Static Regeneration (ISR)

**장점:**
- 🔄 자동 재검증 (1시간마다)
- 📊 최신 데이터 유지
- ⚡ 여전히 빠른 로딩

**구현:**
```typescript
fetch(url, {
  next: { revalidate: 3600 } // 1시간
});
```

### 3. 이미지 최적화

**Next.js Image:**
- ✅ 자동 WebP 변환
- ✅ Lazy Loading
- ✅ Responsive Images
- ✅ CLS 방어

```typescript
<Image
  src={imageUrl}
  alt={altText}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={index < 3}
/>
```

---

## SEO 전략

### 1. Metadata 최적화

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: { /* ... */ },
    twitter: { /* ... */ },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
```

### 2. JSON-LD Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "제목",
  "author": {
    "@type": "Person",
    "name": "작성자"
  },
  "datePublished": "2024-01-01",
  "image": "https://..."
}
```

### 3. Semantic HTML

```html
<article>
  <header>
    <h1>제목</h1>
    <p class="lead">요약 (Snippet Trap)</p>
  </header>
  <section>
    <h2>섹션 제목</h2>
    <p>내용...</p>
  </section>
</article>
```

---

## 에러 처리

### 1. WordPress API 실패

```typescript
try {
  const data = await getContentByURI(uri);
  if (!data) {
    notFound(); // 404 페이지
  }
} catch (error) {
  console.error('API Error:', error);
  return null; // Fallback
}
```

### 2. 이미지 로딩 실패

```typescript
const imageUrl = validateImageUrl(sourceUrl);
if (!imageUrl) {
  return <div className="bg-muted aspect-video" />;
}
```

### 3. 검증 실패

```typescript
const validated = WPContentSchema.safeParse(data);
if (!validated.success) {
  console.error('Validation Error:', validated.error);
  return null;
}
```

---

## 확장 가능성

### 1. 다국어 지원 (i18n)

```typescript
// app/[locale]/blog/page.tsx
export async function generateStaticParams() {
  return [
    { locale: 'ko' },
    { locale: 'en' },
  ];
}
```

### 2. 댓글 시스템

```typescript
// components/blog/Comments.tsx
'use client';

export function Comments({ postId }: { postId: number }) {
  // Disqus, Utterances, Giscus 등
}
```

### 3. 검색 기능

```typescript
// app/search/page.tsx
export default async function SearchPage({ searchParams }) {
  const query = searchParams.q;
  const results = await searchPosts(query);
  // ...
}
```

---

## 배포 전략

### Vercel (권장)

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 배포
vercel

# 3. 환경변수 설정
vercel env add WORDPRESS_API_URL
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

## 모니터링

### 1. Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 2. 에러 추적

```typescript
// Sentry, LogRocket 등 통합
if (error) {
  console.error('[Error]', error);
  // Sentry.captureException(error);
}
```

---

## 유지보수

### 1. WordPress 업데이트

- ✅ 플러그인 업데이트 (WPGraphQL)
- ✅ 테마 업데이트 (사용 안 함)
- ✅ 보안 패치

### 2. Next.js 업데이트

```bash
npm update next react react-dom
npm run build
npm test
```

### 3. 의존성 관리

```bash
# 보안 취약점 확인
npm audit

# 자동 수정
npm audit fix
```

---

## 참고 자료

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [WPGraphQL Documentation](https://www.wpgraphql.com/)
- [Zod Documentation](https://zod.dev/)
- [Shadcn/UI Documentation](https://ui.shadcn.com/)
