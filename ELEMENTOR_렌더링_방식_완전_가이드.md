# 🎨 Elementor 렌더링 방식 완전 가이드

## ✅ 변경 완료!

**app/page.tsx**와 **app/[...slug]/page.tsx**가 수정되었습니다.

```typescript
// [Before] iframe 방식
return <ElementorIframe postId={content.databaseId} />;

// [After] ElementorRenderer 방식 (현재 활성화)
return <ElementorRenderer 
  html={content.content || ''} 
  postId={content.databaseId} 
/>;
```

---

## 🧪 테스트 방법 (3단계)

### **Step 1: CSS 파일 확인 (필수!)**

브라우저를 열고 다음 URL을 방문하세요:

```
https://cms.pnamarketing.co.kr/wp-content/uploads/elementor/css/global.css
```

#### ✅ **CSS 코드가 보이면**:
```css
/* 예시 응답 */
.elementor-section { ... }
.elementor-container { ... }
```
→ **정상! 다음 단계로 진행**

#### ❌ **404 에러가 나오면**:
```html
<!DOCTYPE html>
<html>
<head><title>404 Not Found</title></head>
...
```
→ **CSS 재생성 필요 (아래 "문제 해결" 참조)**

---

### **Step 2: 개발 서버 재시작**

```powershell
# 터미널에서 Ctrl+C로 서버 중지 후
npm run dev
```

브라우저에서 확인:
```
http://localhost:3000
```

---

### **Step 3: 결과 확인**

#### ✅ **정상 작동 (예상)**:
- Elementor 디자인이 완벽하게 표시됨
- ❌ 안전모드 배너 없음 (WordPress 실행 안 함)
- 빠른 로딩 속도
- URL이 Next.js 주소(`localhost:3000`)로 유지

#### ❌ **디자인 깨짐 (CSS 파일 없을 때)**:
- HTML 구조만 보임 (스타일 없음)
- 텍스트만 세로로 나열
- 레이아웃 엉망

→ **아래 "문제 해결" 섹션으로**

---

## 🔧 문제 해결

### **문제 1: 디자인이 완전히 깨짐 (CSS 없음)**

#### 원인:
```
❌ https://cms.pnamarketing.co.kr/wp-content/uploads/elementor/css/global.css
→ 404 Not Found
```

#### 해결 방법 A: WordPress 관리자 패널

1. **WordPress 로그인**
   ```
   https://cms.pnamarketing.co.kr/wp-admin
   ```

2. **Elementor → 도구 (Tools)**

3. **"Regenerate CSS & Data" 버튼 클릭**

4. **완료 후 CSS 파일 다시 확인**
   ```
   https://cms.pnamarketing.co.kr/wp-content/uploads/elementor/css/global.css
   ```

#### 해결 방법 B: WP-CLI (SSH 접속 가능 시)

```bash
# SSH로 WordPress 서버 접속 후
wp elementor flush-css --allow-root
```

#### 해결 방법 C: iframe 방식으로 되돌리기

CSS 재생성이 안 되면 iframe 방식으로 되돌리세요:

```typescript
// app/page.tsx:104-120
// app/[...slug]/page.tsx:131-141

// ElementorRenderer 주석 처리
// return <ElementorRenderer 
//   html={content.content || ''} 
//   postId={content.databaseId} 
// />;

// iframe 방식 활성화
return <ElementorIframe postId={content.databaseId} />;
```

**하지만!** iframe 방식은 WordPress에서 안전모드가 그대로 보이므로,
**phpMyAdmin에서 안전모드 제거 필수**:

```sql
DELETE FROM wp_options WHERE option_name = 'elementor_safe_mode';
```

---

### **문제 2: 일부 스타일만 적용됨 (부분적 깨짐)**

#### 원인:
```
✅ global.css는 있음
❌ post-{ID}.css가 없음
```

#### 해결:
동일하게 WordPress → Elementor → Tools → Regenerate CSS

---

### **문제 3: GraphQL로 HTML을 가져오지 못함**

#### 증상:
```
⚠️ URI "/home" not found. Returning dummy data.
```

#### 원인:
WPGraphQL 플러그인 비활성화 또는 404 에러

#### 해결:
1. **WPGraphQL 플러그인 확인**
   - WordPress → 플러그인 → WPGraphQL 활성화

2. **고유주소 설정 확인**
   - WordPress → 설정 → 고유주소
   - "글 이름" 선택 (필수!)

3. **GraphQL 엔드포인트 테스트**
   ```
   https://cms.pnamarketing.co.kr/graphql
   ```
   → JSON 응답 확인 (404 에러 아니어야 함)

---

## 📊 비교표: iframe vs ElementorRenderer

| 항목 | iframe 방식 | ElementorRenderer 방식 |
|------|-------------|----------------------|
| **Elementor 안전모드** | ❌ 그대로 보임 | ✅ 우회 가능 |
| **SEO** | ❌ 불리 | ✅ 최적화 |
| **로딩 속도** | ❌ 느림 (WordPress 전체) | ✅ 빠름 (HTML만) |
| **URL 동기화** | ❌ iframe 안에서 끊김 | ✅ 완벽 |
| **구현 난이도** | ✅ 쉬움 | ⚠️ CSS 파일 필요 |
| **WordPress 설정** | 안전모드 SQL 제거 필요 | CSS 파일만 있으면 됨 |

---

## 🎯 최종 권장사항

### ✅ **ElementorRenderer 사용 (권장)**

**조건:**
- Elementor CSS 파일 존재
- `global.css`와 `post-{ID}.css` 모두 접근 가능

**장점:**
- Elementor 안전모드 자동 우회
- SEO 최적화
- Trinity Core 철학에 부합

---

### 🔄 **iframe 방식 (차선책)**

**조건:**
- CSS 파일 재생성 실패
- 빠른 임시 해결 필요

**단점:**
- WordPress에서 안전모드 SQL 제거 필수
- SEO 불리
- 로딩 느림

---

## 🚀 다음 단계

1. **CSS 파일 확인** (위 Step 1)
2. **개발 서버 재시작** (`npm run dev`)
3. **브라우저 테스트** (`localhost:3000`)
4. **문제 발생 시** 위 "문제 해결" 참조

어느 단계에서 막히셨나요? 상세히 알려주시면 바로 해결해드리겠습니다! 💪






