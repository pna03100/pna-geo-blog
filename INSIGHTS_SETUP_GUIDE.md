# 📝 Insights (Blog) 시스템 구축 완료

## 🎯 구현된 기능

WordPress Post를 `/insights` 경로로 보여주는 완전한 블로그 시스템을 구축했습니다.

---

## 📁 생성된 파일

### 1️⃣ **`app/insights/page.tsx`** - 블로그 목록 페이지
- ✅ 모든 Post 목록 표시 (카드 그리드)
- ✅ Featured Image, 카테고리, 날짜, 작성자 표시
- ✅ JSON-LD Blog Schema 자동 주입
- ✅ CMS URL 완전 제거

### 2️⃣ **`app/insights/[slug]/page.tsx`** - 개별 Post 상세 페이지
- ✅ WordPress Post 상세 내용 렌더링
- ✅ SEO Metadata 완전 통합
- ✅ generateStaticParams로 빌드 시 경로 생성
- ✅ JSON-LD Article Schema 자동 주입
- ✅ CMS URL 완전 제거

### 3️⃣ **`app/insights/[slug]/not-found.tsx`** - 404 페이지
- ✅ 사용자 친화적 디자인
- ✅ 인사이트 목록 / 홈 링크 제공

---

## 🎨 **페이지 구조**

### Insights 목록 (`/insights`)

```
┌─────────────────────────────────────────┐
│         🎯 Insights Hero Section        │
│   (Purple Gradient Background)          │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│         📚 Posts Grid (3 Columns)       │
│  ┌───────┐  ┌───────┐  ┌───────┐       │
│  │ Post1 │  │ Post2 │  │ Post3 │       │
│  │ Image │  │ Image │  │ Image │       │
│  │ Title │  │ Title │  │ Title │       │
│  │ Date  │  │ Date  │  │ Date  │       │
│  └───────┘  └───────┘  └───────┘       │
└─────────────────────────────────────────┘
```

### Post 상세 (`/insights/[slug]`)

```
┌─────────────────────────────────────────┐
│      🖼️ Featured Image (Full Width)     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│         📝 Post Content                  │
│  - Categories Badges                     │
│  - Title (H1)                            │
│  - Meta (Date, Author)                   │
│  - Content (Typography Optimized)        │
└─────────────────────────────────────────┘
```

---

## 🔧 **SEO Metadata 통합**

### WordPress SEO 데이터 → Next.js Metadata API

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getContentByURI(`/insights/${params.slug}`);
  const seo = post.seo; // RankMath/Yoast 데이터

  return {
    // 기본 SEO
    title: seo.title || post.title,
    description: seo.metaDesc,
    
    // Canonical URL
    alternates: {
      canonical: seo.canonical || `/insights/${params.slug}`,
    },
    
    // Open Graph
    openGraph: {
      title: seo.opengraphTitle,
      description: seo.opengraphDescription,
      images: [seo.opengraphImage.sourceUrl],
      type: 'article',
      publishedTime: post.date,
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.metaDesc,
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
    },
  };
}
```

---

## 📊 **SEO 데이터 흐름**

```
WordPress (RankMath/Yoast)
    ↓
WPGraphQL (seo 필드)
    ↓
lib/api.ts (getContentByURI)
    ↓
generateMetadata 함수
    ↓
Next.js <head> 태그
    ↓
Google/Naver 검색엔진
```

---

## 🎯 **WordPress에서 설정해야 할 것**

### 1. Post URI 설정
WordPress에서 Post를 `/insights/[slug]` 경로로 설정:

```
WordPress 관리자 → 설정 → 고유주소
→ 사용자 정의 구조: /insights/%postname%/
```

또는 개별 Post 편집 시:
```
고유주소 → /insights/my-post-title
```

### 2. SEO 플러그인 설정 (RankMath 권장)

**필수 필드:**
- ✅ Title (제목)
- ✅ Meta Description (설명)
- ✅ Open Graph Title
- ✅ Open Graph Description
- ✅ Open Graph Image (1200x630px 권장)
- ✅ Canonical URL
- ✅ JSON-LD Schema

### 3. Featured Image 설정
모든 Post에 Featured Image 설정 (Open Graph 이미지로 사용됨)

---

## 🚀 **Build & Deploy**

### 1. Static Generation (권장)
```bash
npm run build
```

**자동으로 생성되는 경로:**
- `/insights` (목록 페이지)
- `/insights/post-1` (개별 Post들)
- `/insights/post-2`
- ...

### 2. ISR (Incremental Static Regeneration)
```typescript
// app/insights/[slug]/page.tsx
export const revalidate = 3600; // 1시간마다 재검증
```

**효과:**
- 빌드 후 새 Post 추가 시 자동으로 1시간 후 반영
- 서버 재시작 불필요

---

## 🔍 **테스트 방법**

### 1. 개발 환경
```bash
npm run dev
```

**확인할 URL:**
- http://localhost:3000/insights → 목록 페이지
- http://localhost:3000/insights/test-post → 개별 Post

### 2. SEO 확인

#### 소스보기 (Ctrl + U)
```html
<!-- 확인해야 할 태그들 -->
<title>Post 제목 | 피앤에이컴퍼니</title>
<meta name="description" content="..." />
<meta property="og:title" content="..." />
<meta property="og:image" content="https://pnamarketing.co.kr/..." />
<link rel="canonical" href="https://pnamarketing.co.kr/insights/..." />
<script type="application/ld+json">...</script>
```

#### CMS URL 제거 확인
```bash
# Ctrl + F → "cms.pnamarketing.co.kr" 검색
# → 0개 발견되어야 함 ✅
```

---

## 📱 **반응형 디자인**

### 목록 페이지 (Grid)
- **Desktop:** 3 columns
- **Tablet:** 2 columns
- **Mobile:** 1 column

### 상세 페이지
- **Max Width:** 4xl (56rem)
- **Typography:** Tailwind Prose (가독성 최적화)
- **Images:** Next.js Image (자동 최적화)

---

## 🎨 **디자인 커스터마이징**

### 카드 스타일 변경
```typescript
// app/insights/page.tsx
<Card className="border-slate-200 hover:border-purple-300">
  // 여기서 색상/간격 조정
</Card>
```

### Hero 섹션 변경
```typescript
<section className="bg-gradient-to-br from-purple-900 via-slate-900 to-slate-900">
  // 배경색/그라디언트 조정
</section>
```

---

## 🔄 **데이터 흐름**

### 목록 페이지
```
getAllPosts() (lib/api.ts)
    ↓
WordPress GraphQL Query
    ↓
100개 최신 Post
    ↓
replaceCmsUrl() (CMS URL 제거)
    ↓
Grid로 렌더링
```

### 상세 페이지
```
getContentByURI(`/insights/${slug}`)
    ↓
WordPress GraphQL Query
    ↓
Post 데이터 + SEO 데이터
    ↓
generateMetadata() (Metadata)
    ↓
replaceCmsUrl() (CMS URL 제거)
    ↓
CleanPostRenderer (렌더링)
```

---

## 🛡️ **보안 & 성능**

### 1. CMS URL 완전 제거
```typescript
// 모든 데이터에 적용
const cleanPost = {
  title: replaceCmsUrl(post.title),
  content: replaceCmsUrl(post.content),
  featuredImage: {
    sourceUrl: replaceCmsUrl(post.featuredImage.node.sourceUrl),
  },
};
```

### 2. Type Safety
```typescript
// TypeScript 타입 체크
if (!post || post.__typename !== 'Post') {
  notFound();
}
```

### 3. 이미지 최적화
```typescript
<Image
  src={...}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy" // 자동 Lazy Loading
/>
```

---

## 📈 **SEO 최적화 체크리스트**

- [x] Title 태그 (WordPress SEO 연동)
- [x] Meta Description
- [x] Canonical URL (중복 콘텐츠 방지)
- [x] Open Graph (소셜 미디어)
- [x] Twitter Card
- [x] JSON-LD Schema (Article, Blog)
- [x] Robots Meta (index, follow)
- [x] Featured Image (1200x630px)
- [x] Alt Text (이미지 접근성)
- [x] Semantic HTML (article, header, time)

---

## 🚨 **문제 해결**

### Q1: Post가 목록에 안 나타남
**확인:**
1. WordPress에서 Post가 "발행(Publish)" 상태인가?
2. URI가 `/insights/...`로 시작하는가?
3. GraphQL에서 조회 가능한가?

### Q2: SEO 데이터가 없음
**확인:**
1. RankMath/Yoast 플러그인 설치되어 있는가?
2. WPGraphQL SEO 플러그인 설치되어 있는가?
3. WordPress Post에서 SEO 설정 완료했는가?

### Q3: 404 에러
**확인:**
1. Post URI 경로가 올바른가?
2. `generateStaticParams`가 실행되었는가? (빌드 로그 확인)
3. ISR revalidate 시간이 지났는가?

---

## 🎉 **완료!**

이제 완전한 블로그 시스템이 구축되었습니다:

- ✅ `/insights` - Post 목록
- ✅ `/insights/[slug]` - Post 상세
- ✅ SEO 완벽 통합
- ✅ CMS URL 완전 숨김
- ✅ 반응형 디자인
- ✅ JSON-LD Schema
- ✅ ISR 자동 업데이트

**다음 단계:**
1. WordPress에 Post 작성
2. SEO 설정 (RankMath)
3. Featured Image 설정
4. 빌드 & 배포

