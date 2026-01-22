# PNA Design System

## 개요
PNA 컴퍼니의 모든 디자인 요소를 통일된 규칙으로 관리하여 유지보수성을 높이고 일관된 사용자 경험을 제공합니다.

---

## 1. 색상 (Color Palette)

### Background Colors
- **Main Background**: `#FFFFFF` (Pure White) - 기본 배경색
  - 적용: 전체 웹사이트의 기본 배경
  - 의도: 잡지처럼 깔끔한 에디토리얼 무드
  - 클래스: `.bg-main`

- **Authority Section**: `bg-slate-950` (#020617) - 강조 배경색
  - 적용: 2023 Google Korea 선정 카드 영역
  - 의도: 프리미엄 권위감, 시선 집중
  - 클래스: `.bg-authority`

### Primary Colors
- **Blue 600**: `#2563EB` - 주요 CTA 버튼, 링크, 강조 요소
- **Slate 900**: `#0F172A` - 제목, 본문
- **Slate 600**: `#475569` - 서브 텍스트, 설명
- **White**: `#FFFFFF` - 배경, 카드

### Accent Colors
- **Blue 400**: `#60A5FA` - 밝은 강조 요소
- **Blue 50**: `#EFF6FF` - 배지 배경, 하이라이트
- **Slate 200**: `#E2E8F0` - 테두리, 구분선

---

## 2. 타이포그래피 (Typography)

### 폰트 패밀리
```css
font-sans: 'Manrope', 'Pretendard', sans-serif
font-serif: 'Cormorant Garamond', serif
font-mono: 'SFMono-Regular', 'Menlo', 'Monaco', monospace
```

### 제목 스타일
```css
/* 큰 제목 (H1, H2) */
.section-title
- Font Size: text-3xl md:text-5xl (1.875rem ~ 3rem)
- Font Weight: font-bold (700)
- Color: text-slate-900
- Tracking: tracking-tight (-0.025em)
- Line Height: 1.3
```

### 본문 스타일
```css
/* 설명 텍스트 */
.section-description
- Font Size: text-base md:text-lg (1rem ~ 1.125rem)
- Color: text-slate-600
- Tracking: tracking-normal (0em)
- Line Height: 1.7
```

### 자간 & 행간 규칙
- **제목**: 자간 좁게 (`tracking-tight`), 행간 적당 (`1.2 ~ 1.3`)
- **본문**: 자간 보통 (`tracking-normal`), 행간 넓게 (`1.7`)
- **라벨/배지**: 자간 매우 넓게 (`tracking-widest`)

---

## 3. 버튼 (Buttons)

### Primary Button
```css
.btn-primary
- Background: bg-blue-600
- Text: text-white
- Padding: px-8 py-4
- Border Radius: rounded-full
- Hover: bg-blue-700 + shadow-xl
```

**사용 예시:**
```tsx
<button className="btn-primary">
  무료 상담 신청
</button>
```

### Secondary Button (Outline)
```css
.btn-secondary
- Border: border-2 border-blue-600
- Text: text-blue-600
- Padding: px-8 py-4
- Border Radius: rounded-full
- Hover: bg-blue-600 + text-white
```

**사용 예시:**
```tsx
<Link href="/insights" className="btn-secondary">
  모든 인사이트 보기
</Link>
```

### Outline Button (White)
```css
.btn-outline
- Background: bg-white
- Text: text-slate-900
- Border: border-2 border-slate-300
- Hover: bg-slate-50
```

---

## 4. 배지 (Badges)

### Primary Badge (Dark Background)
```css
.badge-primary
- Background: bg-blue-600/10
- Border: border border-blue-500/30
- Text: text-blue-400
- Font: text-xs font-bold uppercase
- Tracking: tracking-widest
```

**사용 예시:**
```tsx
<div className="badge-primary">EXPERT</div>
```

### Secondary Badge (Light Background)
```css
.badge-secondary
- Background: bg-blue-50
- Border: border border-blue-200
- Text: text-blue-600
- Font: text-xs font-bold uppercase
- Tracking: tracking-wider
```

### Badge with Dot
```css
.badge-dot
- Color: text-blue-600
- Font: font-semibold text-sm
- Before Pseudo: w-2 h-2 rounded-full bg-blue-600
```

**사용 예시:**
```tsx
<div className="badge-dot">FAQ</div>
```

---

## 5. 카드 (Cards)

### White Card
```css
.card-white
- Background: bg-white
- Border: border border-slate-200
- Border Radius: rounded-2xl
- Hover: border-slate-300
```

### Dark Card
```css
.card-dark
- Background: bg-slate-900
- Border: border border-slate-800
- Border Radius: rounded-2xl
- Hover: border-slate-700
```

---

## 6. 입력 필드 (Form Inputs)

### Input Field
```css
.input-field
- Width: w-full
- Padding: px-5 py-4
- Border: border-2 border-slate-200
- Border Radius: rounded-xl
- Background: bg-slate-50
- Focus: border-blue-600 + ring-4 ring-blue-600/10 + bg-white
```

**사용 예시:**
```tsx
<input
  type="text"
  placeholder="회사명"
  className="input-field"
/>

<textarea
  rows={6}
  className="input-field resize-none"
/>

<select className="input-field cursor-pointer">
  <option>옵션 1</option>
</select>
```

---

## 7. 섹션 헤더 (Section Headers)

### SectionHeader 컴포넌트
```tsx
import { SectionHeader } from '@/components/ui/SectionHeader';

<SectionHeader
  badge="FAQ"
  title="자주 묻는 질문"
  description="PNA 컴퍼니에 대해 궁금하신 점을 확인하세요"
  titleClassName="" // 추가 커스텀 클래스
/>
```

**레이아웃:**
- 2단 구조 (좌: 배지+제목, 우: 설명)
- 하단 정렬 (`items-end`)
- 우측 설명 텍스트 우측 정렬

---

## 8. 간격 (Spacing)

### 섹션 여백
```css
py-20 md:py-32  /* 상하 여백 */
mb-12 md:mb-16  /* 헤더 하단 여백 */
```

### 카드 간격
```css
gap-5 md:gap-8   /* 그리드 간격 */
space-y-6        /* 세로 간격 */
```

---

## 9. 애니메이션 (Animations)

### 호버 효과
```css
hover:scale-105           /* 약간 확대 */
hover:shadow-xl          /* 그림자 추가 */
active:scale-[0.98]      /* 클릭 시 축소 */
transition-all duration-200  /* 부드러운 전환 */
```

### 아이콘 이동
```css
group-hover:translate-x-1  /* 오른쪽으로 이동 */
```

---

## 10. 사용 가이드

### ✅ DO (권장)
1. 공통 클래스를 최대한 재사용하세요
2. `section-title`, `section-description`, `btn-primary` 등 사전 정의된 클래스 사용
3. 새로운 컴포넌트 추가 시 `globals.css`의 `@layer components`에 추가
4. 색상은 Tailwind 기본 팔레트 사용 (`blue-600`, `slate-900` 등)

### ❌ DON'T (지양)
1. 인라인 스타일 (`style={{ ... }}`) 최소화
2. 중복된 긴 클래스 문자열 반복
3. 임의의 색상 값 (`#123456`) 직접 사용
4. 각 컴포넌트마다 다른 버튼/배지 스타일 생성

---

## 11. 파일 구조

```
app/
  globals.css           # 공통 스타일 정의

components/
  ui/
    SectionHeader.tsx   # 재사용 가능한 섹션 헤더
    button.tsx          # 기본 버튼 컴포넌트
    card.tsx            # 기본 카드 컴포넌트
  landing/
    HeroButtons.tsx     # btn-primary, btn-outline 사용
    CTASection.tsx      # btn-primary 사용
  sections/
    contact-section.tsx # input-field, btn-primary 사용
```

---

## 12. 유지보수 체크리스트

### 새로운 컴포넌트 추가 시
- [ ] 기존 공통 클래스를 사용했는가?
- [ ] 새로운 스타일이 필요하면 `globals.css`에 추가했는가?
- [ ] 타이포그래피 규칙을 준수했는가?
- [ ] 색상 팔레트를 벗어나지 않았는가?

### 디자인 수정 시
- [ ] 모든 페이지에서 일관성을 유지하는가?
- [ ] 접근성 (색상 대비, 포커스 상태)을 고려했는가?
- [ ] 반응형 디자인이 적용되었는가?

---

## 참고 자료
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [PNA Brand Guidelines](../README.md)
- [Architecture](./ARCHITECTURE.md)
