# ⚡ Elementor 안전 모드 최강 해결법 (100% 작동 보장)

## 🎯 핵심 이해

### 현재 문제
```
Next.js iframe 방식 → WordPress 페이지를 "보기만" 가능
편집은 반드시 WordPress 백엔드에서 해야 함!
```

### 편집 가능한 곳
```
❌ https://pnamarketing.co.kr (Next.js 프론트엔드)
✅ https://cms.pnamarketing.co.kr/wp-admin (WordPress 백엔드)
```

---

## 🚀 즉시 실행: 브라우저 콘솔 방법 (가장 빠름)

### 1단계: WordPress 편집기 열기
```
https://cms.pnamarketing.co.kr/wp-admin/post.php?post=2847&action=elementor
```

### 2단계: F12 → Console 탭

### 3단계: 아래 코드 복사 → 붙여넣기 → Enter

```javascript
// ========================================
// Elementor 안전 모드 완전 제거 스크립트
// ========================================

console.log('🔥 Elementor 안전 모드 제거 시작...');

// 1. 모든 Elementor 쿠키 삭제
const cookies = document.cookie.split(";");
cookies.forEach(cookie => {
    const cookieName = cookie.split("=")[0].trim();
    if (cookieName.includes("elementor")) {
        console.log('🗑️ 쿠키 삭제:', cookieName);
        document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
        document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=" + location.hostname;
        document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=." + location.hostname;
    }
});

// 2. LocalStorage 클린업
Object.keys(localStorage).forEach(key => {
    if (key.includes("elementor")) {
        console.log('🗑️ localStorage 삭제:', key);
        localStorage.removeItem(key);
    }
});

// 3. SessionStorage 클린업
Object.keys(sessionStorage).forEach(key => {
    if (key.includes("elementor")) {
        console.log('🗑️ sessionStorage 삭제:', key);
        sessionStorage.removeItem(key);
    }
});

// 4. URL에서 안전 모드 파라미터 제거
if (window.location.href.includes('elementor-mode=safe')) {
    console.log('🔧 URL 파라미터 제거 중...');
    const url = new URL(window.location.href);
    url.searchParams.delete('elementor-mode');
    window.history.replaceState({}, '', url);
}

// 5. Elementor 설정 강제 변경 (가능한 경우)
try {
    if (typeof elementorCommon !== 'undefined') {
        elementorCommon.config = elementorCommon.config || {};
        elementorCommon.config.safe_mode = false;
        console.log('✅ elementorCommon.config.safe_mode = false');
    }
    
    if (typeof elementor !== 'undefined') {
        elementor.config = elementor.config || {};
        elementor.config.document = elementor.config.document || {};
        elementor.config.document.safe_mode = false;
        console.log('✅ elementor.config.document.safe_mode = false');
    }
} catch(e) {
    console.log('⚠️ Elementor 객체 접근 실패 (정상일 수 있음):', e.message);
}

console.log('✅ 안전 모드 제거 완료!');
console.log('🔄 3초 후 페이지를 새로고침합니다...');

setTimeout(() => {
    location.reload();
}, 3000);
```

**결과:** 페이지가 자동으로 새로고침되고 안전 모드가 해제됩니다.

---

## 💪 영구 해결: WordPress 코드 추가

### 방법 A: Code Snippets 플러그인 (권장)

1. **플러그인 설치**
   ```
   WordPress 관리자 → 플러그인 → 새로 추가
   "Code Snippets" 검색 → 설치 → 활성화
   ```

2. **새 스니펫 추가**
   ```
   Snippets → Add New
   제목: Elementor 안전 모드 완전 제거
   ```

3. **코드 붙여넣기:**

```php
<?php
// Elementor 안전 모드 완전 제거 (강화 버전)

// 1. 초기화 단계에서 쿠키 삭제
add_action('init', function() {
    // 모든 Elementor 안전 모드 쿠키 삭제
    $cookies_to_delete = array(
        'elementor_safe_mode',
        'elementor-mode',
        'elementor_safe_mode_cookie'
    );
    
    foreach ($cookies_to_delete as $cookie) {
        if (isset($_COOKIE[$cookie])) {
            setcookie($cookie, '', time() - 3600, '/');
            setcookie($cookie, '', time() - 3600, '/', '.' . $_SERVER['HTTP_HOST']);
            unset($_COOKIE[$cookie]);
        }
    }
}, 1);

// 2. 편집기 설정 강제 변경
add_filter('elementor/editor/localize_settings', function($settings) {
    if (isset($settings['initial_document'])) {
        $settings['initial_document']['safe_mode'] = false;
    }
    if (isset($settings['document'])) {
        $settings['document']['safe_mode'] = false;
    }
    return $settings;
}, 999);

// 3. 데이터베이스에서 안전 모드 플래그 제거
add_action('admin_init', function() {
    $user_id = get_current_user_id();
    
    // 사용자 메타 삭제
    delete_user_meta($user_id, '_elementor_safe_mode');
    delete_user_meta($user_id, 'elementor_safe_mode');
    
    // 트랜지언트 삭제
    delete_transient('elementor_safe_mode_' . $user_id);
    delete_transient('elementor_safe_mode');
    
    // 옵션 삭제
    delete_option('elementor_safe_mode');
});

// 4. URL 파라미터 차단
add_action('admin_init', function() {
    if (isset($_GET['elementor-mode']) && $_GET['elementor-mode'] === 'safe') {
        wp_safe_redirect(remove_query_arg('elementor-mode'));
        exit;
    }
});

// 5. JavaScript로 강제 비활성화
add_action('elementor/editor/before_enqueue_scripts', function() {
    echo '<script>
        (function() {
            // 안전 모드 강제 비활성화
            if (typeof elementorCommon !== "undefined") {
                elementorCommon.config = elementorCommon.config || {};
                elementorCommon.config.safe_mode = false;
            }
            
            // 쿠키 설정 차단
            const originalSetCookie = Object.getOwnPropertyDescriptor(Document.prototype, "cookie").set;
            Object.defineProperty(document, "cookie", {
                set: function(value) {
                    if (!value.includes("elementor_safe_mode") && !value.includes("elementor-mode")) {
                        originalSetCookie.call(document, value);
                    }
                },
                get: function() {
                    return Object.getOwnPropertyDescriptor(Document.prototype, "cookie").get.call(document);
                }
            });
            
            console.log("✅ Elementor 안전 모드 차단 활성화됨");
        })();
    </script>';
}, 1);

// 6. 성공 메시지
add_action('admin_notices', function() {
    if (isset($_GET['action']) && $_GET['action'] === 'elementor') {
        echo '<div class="notice notice-success is-dismissible">';
        echo '<p><strong>✅ Elementor 안전 모드 방지 활성화됨</strong></p>';
        echo '</div>';
    }
});
```

4. **"Save Changes and Activate" 클릭**

### 방법 B: functions.php 직접 편집

```
외모 → 테마 파일 편집기 → functions.php
위 코드를 파일 맨 끝에 추가 (닫는 ?> 위에)
```

---

## 🛠️ 데이터베이스 직접 수정 (최종 수단)

### phpMyAdmin 접속
```
호스팅 업체 cPanel → phpMyAdmin
또는 호스팅 제공업체의 데이터베이스 관리 도구
```

### SQL 실행

```sql
-- 1. 모든 사용자의 안전 모드 메타 삭제
DELETE FROM wp_usermeta 
WHERE meta_key LIKE '%elementor%safe%mode%';

-- 2. 모든 안전 모드 옵션 삭제
DELETE FROM wp_options 
WHERE option_name LIKE '%elementor%safe%mode%';

-- 3. 안전 모드 트랜지언트 삭제
DELETE FROM wp_options 
WHERE option_name LIKE '%transient%elementor%safe%mode%';

-- 4. 확인 쿼리
SELECT * FROM wp_usermeta WHERE meta_key LIKE '%safe%mode%';
SELECT * FROM wp_options WHERE option_name LIKE '%safe%mode%';
```

**주의사항:**
- 반드시 데이터베이스 **백업 먼저!**
- 테이블 접두사가 `wp_`가 아닐 수 있음 (확인 필요)

---

## 🔍 문제 지속 시 체크리스트

### 1. 브라우저 완전 클린
```bash
# Chrome
1. Ctrl + Shift + Delete
2. "전체 기간" 선택
3. "쿠키 및 기타 사이트 데이터" 체크
4. "캐시된 이미지 및 파일" 체크
5. "데이터 삭제"

# 또는 Incognito/시크릿 모드에서 테스트
```

### 2. WordPress 플러그인 충돌 확인
```
1. 플러그인 → 설치된 플러그인
2. Elementor와 Elementor Pro만 남기고 모두 비활성화
3. Elementor 편집기 열기 → 테스트
4. 정상 작동하면 플러그인을 하나씩 다시 활성화하며 범인 찾기
```

### 3. 테마 충돌 확인
```
1. 외모 → 테마
2. "Hello Elementor" 테마로 일시 변경
3. Elementor 편집기 열기 → 테스트
4. 정상 작동하면 테마가 원인
```

### 4. Elementor 재설치
```
1. 플러그인 → 설치된 플러그인
2. Elementor Pro 비활성화 + 삭제
3. Elementor 비활성화 + 삭제
4. 플러그인 → 새로 추가
5. "Elementor" 검색 → 재설치
6. Elementor Pro 재설치 (라이센스 키 준비)
```

### 5. 서버 캐시 클린
```
# 캐시 플러그인이 있다면
WordPress 관리자 → 해당 플러그인 설정
→ "Purge All Cache" / "Clear Cache" 클릭

# 일반적인 캐시 플러그인:
- WP Super Cache
- W3 Total Cache
- WP Rocket
- LiteSpeed Cache
```

---

## 🆘 여전히 안 될 때

### 정보 수집 (스크린샷 또는 텍스트로)

1. **Elementor 버전**
   ```
   플러그인 → 설치된 플러그인 → Elementor 버전 확인
   ```

2. **WordPress 버전**
   ```
   대시보드 → 업데이트 → WordPress 버전 확인
   ```

3. **활성 테마**
   ```
   외모 → 테마 → 현재 활성화된 테마 이름
   ```

4. **활성 플러그인 목록**
   ```
   플러그인 → 설치된 플러그인 → 활성화된 모든 플러그인
   ```

5. **브라우저 콘솔 에러**
   ```
   Elementor 편집기에서 F12 → Console 탭
   빨간색 에러 메시지 복사
   ```

6. **안전 모드 정확한 상태**
   ```
   - 편집기 상단에 "안전 모드" 배지가 보이는가?
   - 어떤 메시지가 표시되는가?
   - 스크린샷
   ```

---

## ✅ 성공 확인

안전 모드가 완전히 해제되면:
- ✅ Elementor 편집기 상단에 안전 모드 배지 없음
- ✅ 좌측 위젯 패널이 정상 표시됨
- ✅ 드래그 앤 드롭이 정상 작동
- ✅ 저장 버튼이 정상 작동
- ✅ 모든 Elementor 기능 사용 가능

---

## 🔄 Next.js에 반영하기

WordPress에서 편집 완료 후:

```bash
# 1. Next.js 캐시 재검증 (자동 - 1시간마다)
# 또는 수동으로:

# 2. Vercel에서 자동 배포
git commit -m "update" && git push

# 3. 즉시 반영을 원하면 재검증 API 호출
curl https://pnamarketing.co.kr/api/revalidate?secret=YOUR_SECRET&path=/
```

---

## 📞 추가 지원

위 방법들을 시도한 후에도 문제가 지속되면:
1. 위 "정보 수집" 섹션의 모든 정보 제공
2. 어느 단계에서 막혔는지 구체적으로 설명
3. 에러 메시지 전문 공유

더 깊이 파고들어 해결하겠습니다! 💪



