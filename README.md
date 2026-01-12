# 🚀 PNA Marketing - Next.js 14 + Headless WordPress

**데이터 기반 성과 마케팅 전문** 피앤에이컴퍼니 공식 웹사이트

---

## 🎯 프로젝트 개요

- **Framework**: Next.js 14 (App Router)
- **CMS**: WordPress (Headless)
- **API**: WPGraphQL
- **Styling**: Tailwind CSS
- **UI Library**: Shadcn/UI
- **Animation**: Framer Motion
- **Language**: TypeScript

---

## 📂 프로젝트 구조

```
c:\dev\pna-geo-blog\
├── app/                      # Next.js 14 App Router
│   ├── page.tsx             # 메인 페이지
│   ├── blog/                # 블로그 시스템
│   │   ├── page.tsx         # 목록
│   │   └── [slug]/page.tsx  # 상세 (SSG)
│   └── api/                 # API 라우트
│
├── components/              # React 컴포넌트
│   ├── blog/               # 블로그 전용
│   ├── seo/                # SEO 컴포넌트
│   └── ui/                 # Shadcn/UI
│
├── lib/                    # 유틸리티
│   ├── api.ts              # WordPress GraphQL 클라이언트
│   ├── types.ts            # TypeScript 타입
│   ├── sanitize.ts         # XSS 방어
│   └── image-optimizer.ts  # 이미지 최적화
│
└── docs/                   # 문서
    └── ARCHITECTURE.md     # 아키텍처 상세
```

---

## 🚀 시작하기

### 1. 환경변수 설정

`.env.local` 파일을 생성하세요:

```bash
# WordPress GraphQL API
WORDPRESS_API_URL=https://cms.pnamarketing.co.kr/graphql

# 프론트엔드 도메인
NEXT_PUBLIC_SITE_URL=https://pnamarketing.co.kr
NEXT_PUBLIC_FRONTEND_DOMAIN=pnamarketing.co.kr
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

→ http://localhost:3000

### 4. 빌드

```bash
npm run build
npm start
```

---

## 🎨 주요 기능

### ✅ Headless WordPress 통합
```typescript
import { getAllPosts, getContentByURI } from '@/lib/api';

// 블로그 목록
const posts = await getAllPosts();

// 특정 포스트
const post = await getContentByURI('/blog/my-post');
```

### ✅ SEO 최적화
- Dynamic Metadata (RankMath/Yoast 통합)
- JSON-LD Structured Data
- Semantic HTML
- Open Graph & Twitter Cards

### ✅ 보안
- XSS 방어 (HTML Sanitization)
- Zod 스키마 검증
- 타입 안전성 (TypeScript)
- 환경변수 검증

### ✅ 성능
- SSG (Static Site Generation)
- ISR (Incremental Static Regeneration)
- Next.js Image 최적화
- CLS 방어

### ✅ UI 컴포넌트

#### 블로그
```tsx
import { PostCard } from '@/components/blog/PostCard';
import { Pagination } from '@/components/blog/Pagination';

<PostCard post={post} priority={true} />
<Pagination currentPage={1} totalPages={10} />
```

#### 인터랙티브 텍스트
```tsx
import { MouseTextEffectSimple } from '@/components/ui/mouse-text-effect-simple';

<MouseTextEffectSimple className="text-purple-600">
  Hover Me!
</MouseTextEffectSimple>
```

---

## 📊 성능 목표

| 지표 | 목표 |
|------|------|
| **LCP** | < 2.5s |
| **FID** | < 100ms |
| **CLS** | < 0.1 |
| **Lighthouse** | > 90 |

---

## 🔒 보안 체크리스트

- [x] XSS 방어 (HTML Sanitization)
- [x] Injection 방어 (Zod Validation)
- [x] 환경변수 격리
- [x] CMS URL 노출 방지
- [x] HTTPS 강제

---

## 📚 문서

자세한 내용은 다음 문서를 참고하세요:

- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - 아키텍처 상세 문서

---

## 🚢 배포

### Vercel (권장)

```bash
vercel
```

환경변수 설정:
- `WORDPRESS_API_URL`
- `NEXT_PUBLIC_SITE_URL`

---

## 🛠️ 기술 스택

| 카테고리 | 기술 |
|---------|------|
| Framework | Next.js 14 |
| CMS | WordPress (Headless) |
| API | WPGraphQL |
| Styling | Tailwind CSS |
| UI | Shadcn/UI |
| Animation | Framer Motion |
| Validation | Zod |
| Language | TypeScript |

---

## 📝 라이선스

© 2024 피앤에이컴퍼니. All rights reserved.

---

## 💬 문의

- Email: contact@pnamarketing.co.kr
- Website: https://pnamarketing.co.kr
