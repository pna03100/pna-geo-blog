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
- **프론트엔드 주도형 사이트맵** (백엔드 주소 숨김)
- Dynamic Metadata (RankMath/Yoast 통합)
- JSON-LD Structured Data
- Semantic HTML
- Open Graph & Twitter Cards
- 자동 사이트맵 생성 (`/sitemap.xml`)
- Robots.txt 최적화

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

## 🗺️ 사이트맵 & SEO 설정

### 프론트엔드 주도형 사이트맵 (Headless 아키텍처)

이 프로젝트는 **백엔드(WordPress) 주소를 완전히 숨긴 상태**로 프론트엔드(Next.js)에서 사이트맵을 생성합니다.

#### 아키텍처 원칙

```
┌─────────────────────────────────────────────────────────────┐
│ 🤖 Googlebot (구글봇)                                        │
│    ↓ 크롤링 요청                                             │
│    https://pnamarketing.co.kr/sitemap.xml                   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 🎯 Next.js Frontend (프론트엔드)                             │
│    • app/sitemap.ts → 동적 XML 생성                          │
│    • WordPress API에서 포스트 목록 가져오기                   │
│    • 백엔드 URL → 프론트엔드 URL 자동 치환                    │
└─────────────────────────────────────────────────────────────┘
                          ↑ GraphQL API 호출 (내부)
┌─────────────────────────────────────────────────────────────┐
│ 🔒 WordPress Backend (백엔드)                                │
│    • cms.pnamarketing.co.kr (숨겨진 주소)                    │
│    • Headless CMS 역할만 수행                                │
│    • 구글봇 접근 차단 (프론트엔드만 노출)                      │
└─────────────────────────────────────────────────────────────┘
```

#### 핵심 로직

`app/sitemap.ts`가 자동으로:

1. **WordPress에서 포스트 목록 가져오기** (GraphQL API 호출)
2. **백엔드 URL을 프론트엔드 URL로 치환**
   - 예: `cms.pnamarketing.co.kr/insights/post` → `pnamarketing.co.kr/insights/post`
3. **실제 수정 날짜 반영** (SEO 최적화)
4. **1시간마다 자동 재생성** (신규 포스트 자동 반영)

#### 검증 방법

1. **로컬 테스트**
   ```bash
   npm run dev
   # 브라우저에서 http://localhost:3000/sitemap.xml 접속
   # → XML 코드가 나오면 성공 (HTML 아님)
   ```

2. **프로덕션 확인**
   ```
   https://pnamarketing.co.kr/sitemap.xml
   ```
   - ✅ 모든 URL이 `pnamarketing.co.kr`로 시작
   - ✅ XML 형식 (HTML 아님)
   - ✅ WordPress 포스트가 자동으로 포함됨

3. **구글 서치 콘솔 등록**
   - 기존 WordPress 사이트맵 삭제
   - 새 사이트맵 등록: `https://pnamarketing.co.kr/sitemap.xml`

#### 보안 이점

- ✅ 백엔드 주소(`cms.pnamarketing.co.kr`) 완전 숨김
- ✅ 구글봇이 프론트엔드만 크롤링
- ✅ 백엔드 보안 강화 (외부 노출 차단)

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
