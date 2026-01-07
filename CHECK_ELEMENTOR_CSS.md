# Elementor CSS 파일 확인 가이드

## 1️⃣ CSS 파일 존재 여부 확인

브라우저에서 다음 URL들을 열어보세요:

### 글로벌 CSS (필수)
```
https://cms.pnamarketing.co.kr/wp-content/uploads/elementor/css/global.css
```
✅ CSS 내용이 보이면 OK  
❌ 404 에러면 파일 없음

### 페이지별 CSS (필수)
```
https://cms.pnamarketing.co.kr/wp-content/uploads/elementor/css/post-2847.css
```
(2847은 페이지 ID, 실제 ID로 변경)

✅ CSS 내용이 보이면 OK  
❌ 404 에러면 파일 없음

---

## 2️⃣ CSS 파일이 있으면 → ElementorRenderer 사용 (권장)

### app/page.tsx 수정:

```typescript
// 109줄: iframe 방식 주석 처리
// return <ElementorIframe postId={content.databaseId} />;

// 112줄: ElementorRenderer 활성화
return <ElementorRenderer 
  html={content.content || ''} 
  postId={content.databaseId} 
/>;
```

### 장점:
- ✅ Elementor 안전모드 우회
- ✅ SEO 최적화
- ✅ 빠른 로딩 속도
- ✅ 디자인 완벽 표시

---

## 3️⃣ CSS 파일이 없으면 → CSS 재생성

### WordPress 관리자 패널에서:

**방법 A: Elementor 도구**
1. Elementor → 도구 (Tools)
2. "Regenerate CSS & Data" 클릭
3. 완료 후 위 URL 다시 확인

**방법 B: WP-CLI (SSH 접속 가능 시)**
```bash
wp elementor flush-css --allow-root
```

**방법 C: 플러그인 사용**
- "Elementor - Header, Footer & Blocks" 설치
- Settings → Tools → Regenerate Files

---

## 4️⃣ CSS 재생성이 안 되면 → iframe 방식 유지

```typescript
// app/page.tsx:109 (현재 상태 유지)
return <ElementorIframe postId={content.databaseId} />;
```

### 하지만 WordPress에서 안전모드는 제거해야 함:

```sql
-- phpMyAdmin에서 실행
DELETE FROM wp_options WHERE option_name = 'elementor_safe_mode';
```

---

## 📊 최종 결정 플로우차트

```
CSS 파일 있음?
├─ YES → ElementorRenderer 사용 (권장)
│         └─ 안전모드 자동 우회 ✅
│
└─ NO → 선택
    ├─ CSS 재생성 시도
    │   ├─ 성공 → ElementorRenderer 사용
    │   └─ 실패 → iframe + 안전모드 SQL 제거
    │
    └─ iframe 유지 + WordPress 안전모드 SQL 제거
```

---

## 🎯 추천 방법 (순서대로 시도)

1. **CSS 파일 확인** (브라우저에서 URL 열기)
2. **없으면 재생성** (WordPress 도구 또는 WP-CLI)
3. **있으면 ElementorRenderer로 전환** (app/page.tsx 수정)
4. **안 되면 iframe + SQL 제거** (phpMyAdmin)

각 단계에서 막히면 알려주세요!






