# WordPress 콘텐츠 작성 가이드

## 📋 개요
Next.js 프론트엔드가 WordPress 데이터를 파싱하여 v0.dev 디자인 컴포넌트로 렌더링합니다.
이 가이드는 WordPress에서 Home 페이지 콘텐츠를 어떻게 작성해야 하는지 설명합니다.

---

## 🎯 Home 페이지 구조

WordPress의 **Home 페이지 (URI: `/`)**에서 다음 섹션들을 작성하면 자동으로 파싱됩니다:

### 1️⃣ Hero Section (메인 히어로)
**필수 요소:** 제목, 설명, CTA 버튼

```html
<section id="hero" class="hero-section">
  <!-- 선택: 배지/부제목 -->
  <div class="subtitle">⚡ 통계 또는 인증 정보</div>
  
  <!-- 필수: 메인 제목 -->
  <h2>혁신적인 AI 마케팅 솔루션</h2>
  
  <!-- 필수: 설명 -->
  <p>데이터 기반 의사결정으로 마케팅 효율을 40% 향상시킵니다.</p>
  
  <!-- 선택: CTA 버튼 -->
  <a href="/contact" class="button">무료 상담 받기</a>
</section>
```

**지원되는 선택자:**
- ID: `#hero`, `[id*="hero"]`
- Class: `.hero`, `.hero-section`
- 제목: `h1`, `h2`, `[class*="heading"]`
- 설명: `p`, `.description`
- 버튼: `a.button`, `a.btn`, `.cta a`

---

### 2️⃣ Features Section (주요 기능)
**필수 요소:** 섹션 제목, 기능 카드들 (제목 + 설명)

```html
<section id="features" class="features-section">
  <!-- 섹션 제목 -->
  <h2>주요 기능</h2>
  
  <!-- 기능 1 -->
  <article class="feature">
    <div class="icon">🚀</div>
    <h3>빠른 속도</h3>
    <p>Next.js 기반으로 초당 1만 요청 처리 가능</p>
  </article>
  
  <!-- 기능 2 -->
  <article class="feature">
    <div class="icon">🔒</div>
    <h3>강력한 보안</h3>
    <p>OWASP Top 10 보안 기준 100% 준수</p>
  </article>
  
  <!-- 더 많은 기능들... -->
</section>
```

**지원되는 선택자:**
- ID: `#features`, `[id*="feature"]`
- Class: `.features`, `.feature-section`
- 아이템: `article`, `.feature`, `.feature-item`, `.col`
- 제목: `h3`, `h4`, `.title`
- 설명: `p`, `.description`
- 아이콘: `.icon`, `.emoji`

---

### 3️⃣ Services Section (서비스 탭)
**필수 요소:** 섹션 제목, 서비스 아이템들 (제목 + 설명 + 상세 내용)

```html
<section id="services" class="services-section">
  <!-- 섹션 제목 -->
  <h2>제공 서비스</h2>
  
  <!-- 서비스 1 -->
  <article class="service">
    <h3>SEO 최적화</h3>
    <p class="description">검색 엔진 상위 노출을 위한 전략적 컨설팅</p>
    <div class="content">
      <p>Google E-E-A-T 기준 충족</p>
      <ul>
        <li>키워드 분석</li>
        <li>콘텐츠 최적화</li>
        <li>백링크 구축</li>
      </ul>
    </div>
  </article>
  
  <!-- 더 많은 서비스들... -->
</section>
```

**지원되는 선택자:**
- ID: `#services`, `[id*="service"]`
- Class: `.services`, `.service-section`
- 아이템: `article`, `.service`, `.service-item`
- 제목: `h3`, `h4`, `.title`
- 설명: `p`, `.description`
- 상세: `.content`, `.details`

---

### 4️⃣ FAQ Section (자주 묻는 질문)
**필수 요소:** 섹션 제목, FAQ 아이템들 (질문 + 답변)

```html
<section id="faq" class="faq-section">
  <!-- 섹션 제목 -->
  <h2>자주 묻는 질문</h2>
  
  <!-- FAQ 1 -->
  <article class="faq">
    <h3 class="question">서비스 가격은 어떻게 되나요?</h3>
    <p class="answer">프로젝트 규모에 따라 맞춤 견적을 제공합니다. 무료 상담 후 정확한 견적을 받아보세요.</p>
  </article>
  
  <!-- FAQ 2 -->
  <article class="faq">
    <h3>계약 기간은 어떻게 되나요?</h3>
    <p>최소 3개월부터 시작하며, 월 단위로 연장 가능합니다.</p>
  </article>
  
  <!-- 또는 dt/dd 구조 -->
  <dl>
    <dt>환불 정책이 있나요?</dt>
    <dd>서비스 시작 후 7일 이내 100% 환불 가능합니다.</dd>
  </dl>
</section>
```

**지원되는 선택자:**
- ID: `#faq`, `[id*="faq"]`, `[id*="question"]`
- Class: `.faq`, `.faq-section`, `.faqs`
- 아이템: `article`, `.faq`, `.faq-item`
- 질문: `h3`, `h4`, `.question`, `dt`
- 답변: `p`, `.answer`, `dd`

---

## 🎨 Elementor/페이지 빌더 사용 시

Elementor나 다른 페이지 빌더를 사용하는 경우:

1. **섹션 ID 설정**: 각 섹션에 `hero`, `features`, `services`, `faq` ID를 부여
2. **구조 유지**: 제목(Heading), 텍스트(Text Editor), 버튼(Button) 위젯 사용
3. **CSS 클래스 추가**: Advanced 탭에서 `feature`, `service`, `faq` 등의 클래스 추가

---

## 🔍 디버깅 방법

### 콘솔 로그 확인
Next.js 서버를 실행하면 다음과 같은 로그가 출력됩니다:

```
📊 WordPress HTML Structure Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📏 Total HTML Length: 15,234 characters

🔖 Available Section IDs:
   - #hero
   - #features
   - #services
   - #faq

📦 Found 4 Sections:
1. <section> id="hero"
   Headings: "혁신적인 AI 마케팅 솔루션"
   Content: 2 paragraphs, 1 links
```

### 파싱 실패 시
특정 섹션이 파싱되지 않으면 다음을 확인하세요:

1. **섹션 ID가 있는지**: `id="hero"` 등
2. **제목이 있는지**: `<h2>`, `<h3>` 등
3. **콘텐츠가 있는지**: 최소 1개의 `<p>` 태그
4. **구조가 올바른지**: 콘솔 로그의 "HTML Preview" 확인

---

## 📝 예시: 완전한 Home 페이지 HTML

```html
<!-- Hero Section -->
<section id="hero">
  <span class="badge">★ 5년 연속 1위</span>
  <h2>AI 기반 마케팅 솔루션</h2>
  <p>데이터 분석부터 실행까지, 성공률 93%의 검증된 전략</p>
  <a href="/start" class="button">무료 체험 시작</a>
</section>

<!-- Features Section -->
<section id="features">
  <h2>왜 저희를 선택해야 할까요?</h2>
  
  <article class="feature">
    <div class="icon">⚡</div>
    <h3>빠른 성과</h3>
    <p>평균 3개월 내 ROI 200% 달성</p>
  </article>
  
  <article class="feature">
    <div class="icon">🎯</div>
    <h3>정밀 타겟팅</h3>
    <p>AI 기반 고객 세그먼트 분석</p>
  </article>
  
  <article class="feature">
    <div class="icon">📊</div>
    <h3>실시간 대시보드</h3>
    <p>24/7 성과 모니터링 시스템</p>
  </article>
</section>

<!-- Services Section -->
<section id="services">
  <h2>제공 서비스</h2>
  
  <article class="service">
    <h3>SEO 컨설팅</h3>
    <p>검색 엔진 최적화 전문가의 1:1 컨설팅</p>
    <div class="content">
      <p>Google 1페이지 진입률 85%</p>
    </div>
  </article>
  
  <article class="service">
    <h3>콘텐츠 마케팅</h3>
    <p>AI가 생성한 맞춤형 콘텐츠 전략</p>
    <div class="content">
      <p>월 평균 10만 방문자 유입 달성</p>
    </div>
  </article>
</section>

<!-- FAQ Section -->
<section id="faq">
  <h2>자주 묻는 질문</h2>
  
  <article class="faq">
    <h3>계약 기간은?</h3>
    <p>최소 3개월, 월 단위 연장 가능</p>
  </article>
  
  <article class="faq">
    <h3>환불 정책은?</h3>
    <p>7일 이내 100% 환불 보장</p>
  </article>
</section>
```

---

## ✅ 체크리스트

- [ ] Home 페이지 URI가 `/`인지 확인
- [ ] 각 섹션에 ID 부여 (`hero`, `features`, `services`, `faq`)
- [ ] 제목(Heading) 태그 사용
- [ ] 의미 있는 CSS 클래스 추가
- [ ] 콘솔 로그에서 파싱 결과 확인
- [ ] Fallback 데이터가 아닌 실제 데이터가 표시되는지 확인

---

## 🚨 문제 해결

### "Using fallback Hero data" 로그가 나올 때
1. WordPress에서 `/` URI의 페이지가 발행(Publish) 상태인지 확인
2. `#hero` ID가 있는지 확인
3. 제목(`<h2>`) 태그가 있는지 확인

### 특정 섹션만 파싱되지 않을 때
- 콘솔의 "HTML Structure Analysis"에서 해당 섹션 ID가 보이는지 확인
- ID나 클래스명이 정확한지 확인 (대소문자 구분)
- 최소 요구사항(제목 + 내용)이 충족되는지 확인

### Elementor 콘텐츠가 파싱되지 않을 때
- Elementor 위젯의 "고급" 탭에서 CSS ID 설정
- 섹션(Section) 위젯 사용 (컨테이너가 아님)
- 각 카드/아이템에 개별 클래스 추가

---

## 📞 지원

추가 도움이 필요하면 터미널 콘솔 로그를 확인하세요.
상세한 HTML 구조 분석이 자동으로 출력됩니다.

