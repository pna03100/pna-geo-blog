# 🎯 WordPress Elementor 편집 완전 가이드

## ⚠️ 핵심 개념
**Next.js 사이트 (pnamarketing.co.kr)에서는 편집이 불가능합니다!**
**반드시 WordPress 관리자 페이지에서 편집해야 합니다.**

---

## 📋 1단계: WordPress 관리자 페이지 접속

```
https://cms.pnamarketing.co.kr/wp-admin
```

**로그인 정보 확인:**
- 아이디: (WordPress 관리자 계정)
- 비밀번호: (비밀번호)

---

## 📋 2단계: 편집할 페이지 찾기

### 방법 A: 페이지 목록에서 찾기
1. 왼쪽 메뉴 **페이지** → **모든 페이지**
2. 편집하고 싶은 페이지 찾기
3. 마우스 오버 → **Elementor로 편집** 클릭

### 방법 B: 직접 URL 입력
```
https://cms.pnamarketing.co.kr/wp-admin/post.php?post=페이지ID&action=elementor
```

**현재 프로젝트의 주요 페이지:**
- 홈페이지: post=2847 또는 /home
- 기타 페이지: URI에서 ID 확인

---

## 🔥 3단계: 안전 모드 완전 제거

### 즉시 실행 방법 (브라우저 콘솔)

1. **Elementor 편집 페이지**에서 F12 누르기
2. **Console** 탭 선택
3. 아래 코드 **붙여넣기 + Enter**:

```javascript
// 안전 모드 쿠키 완전 삭제
document.cookie.split(";").forEach(function(c) { 
    if(c.indexOf("elementor") >= 0) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    }
});

// 로컬 스토리지 삭제
Object.keys(localStorage).forEach(function(key) {
    if(key.indexOf("elementor") >= 0) {
        localStorage.removeItem(key);
    }
});

// 세션 스토리지 삭제
Object.keys(sessionStorage).forEach(function(key) {
    if(key.indexOf("elementor") >= 0) {
        sessionStorage.removeItem(key);
    }
});

// 페이지 강제 새로고침
alert("✅ 안전 모드 데이터 삭제 완료! 페이지를 새로고침합니다.");
location.reload();
```

---

## 🛡️ 4단계: WordPress 플러그인으로 영구 방지

### Code Snippets 플러그인 사용

1. **플러그인 설치**
   - 플러그인 → 새로 추가
   - "Code Snippets" 검색 후 설치/활성화

2. **새 스니펫 추가**
   - Snippets → Add New
   - 제목: `Elementor 안전 모드 영구 비활성화`

3. **아래 코드 붙여넣기:**

```php
<?php
/**
 * Elementor 안전 모드 완전 제거 (최강 버전)
 */

// 1. 쿠키 완전 차단
add_action('init', function() {
    // 기존 쿠키 삭제
    if (isset($_COOKIE['elementor_safe_mode'])) {
        setcookie('elementor_safe_mode', '', time() - 3600, '/');
        unset($_COOKIE['elementor_safe_mode']);
    }
    
    // 모든 Elementor 관련 안전 모드 쿠키 삭제
    foreach ($_COOKIE as $key => $value) {
        if (strpos($key, 'elementor') !== false && strpos($key, 'safe') !== false) {
            setcookie($key, '', time() - 3600, '/');
            unset($_COOKIE[$key]);
        }
    }
}, 1);

// 2. 편집기 설정에서 안전 모드 강제 비활성화
add_filter('elementor/editor/localize_settings', function($settings) {
    $settings['initial_document']['safe_mode'] = false;
    return $settings;
}, 999);

// 3. JavaScript에서도 강제 비활성화
add_action('elementor/editor/before_enqueue_scripts', function() {
    ?>
    <script>
        // 안전 모드 완전 차단
        if (typeof elementorCommon !== 'undefined') {
            elementorCommon.config = elementorCommon.config || {};
            elementorCommon.config.safe_mode = false;
        }
        
        // 쿠키 생성 차단
        const originalSetCookie = document.__lookupSetter__('cookie');
        document.__defineGetter__('cookie', function() {
            return document.cookie;
        });
        document.__defineSetter__('cookie', function(value) {
            if (value.indexOf('elementor_safe_mode') === -1) {
                originalSetCookie.call(document, value);
            }
        });
    </script>
    <?php
}, 1);

// 4. 사용자 메타 및 트랜지언트 삭제
add_action('admin_init', function() {
    $user_id = get_current_user_id();
    
    // 사용자별 안전 모드 플래그 삭제
    delete_user_meta($user_id, '_elementor_safe_mode');
    delete_user_meta($user_id, 'elementor_safe_mode');
    
    // 트랜지언트 삭제
    delete_transient('elementor_safe_mode_' . $user_id);
    delete_transient('elementor_safe_mode');
    
    // 옵션 테이블에서도 삭제
    delete_option('elementor_safe_mode');
});

// 5. URL 파라미터 제거
add_action('admin_init', function() {
    if (isset($_GET['elementor-mode']) && $_GET['elementor-mode'] === 'safe') {
        wp_redirect(remove_query_arg('elementor-mode'));
        exit;
    }
});

// 6. 성공 알림
add_action('admin_notices', function() {
    if (isset($_GET['action']) && $_GET['action'] === 'elementor') {
        echo '<div class="notice notice-success is-dismissible">';
        echo '<p><strong>✅ Elementor 안전 모드가 완전히 비활성화되었습니다.</strong></p>';
        echo '</div>';
    }
});
?>
```

4. **"Save Changes and Activate"** 클릭

---

## 🔍 5단계: 문제 진단

### 여전히 안전 모드인 경우 체크리스트

#### A. 브라우저 확인
- [ ] Chrome Incognito 모드로 접속 시도
- [ ] 다른 브라우저(Firefox, Edge)로 시도
- [ ] 브라우저 캐시 완전 삭제 (Ctrl+Shift+Delete)

#### B. WordPress 설정 확인
```
1. 플러그인 → 설치된 플러그인
   - Elementor 버전 확인 (최신인지)
   - Elementor Pro 라이센스 활성화 확인
   - 다른 플러그인 일시 비활성화 (충돌 테스트)

2. 외모 → 테마
   - Hello Elementor 테마 사용 권장
   - 다른 테마라면 일시 변경 테스트
```

#### C. 서버 캐시 확인
```
WordPress 관리자 → 플러그인 → 캐시 플러그인 찾기
(예: WP Super Cache, W3 Total Cache, LiteSpeed Cache 등)
→ 모든 캐시 삭제 (Purge All Cache)
```

---

## 🆘 최후의 해결책: 데이터베이스 직접 수정

### phpMyAdmin 접근 (호스팅 제공업체 cPanel)

```sql
-- 1. 안전 모드 관련 모든 메타 삭제
DELETE FROM wp_usermeta WHERE meta_key LIKE '%elementor_safe_mode%';

-- 2. 안전 모드 관련 모든 옵션 삭제
DELETE FROM wp_options WHERE option_name LIKE '%elementor_safe_mode%';

-- 3. 안전 모드 관련 트랜지언트 삭제
DELETE FROM wp_options WHERE option_name LIKE '%_transient_elementor_safe_mode%';
DELETE FROM wp_options WHERE option_name LIKE '%_transient_timeout_elementor_safe_mode%';
```

**주의:** 데이터베이스 작업 전 **반드시 백업** 받으세요!

---

## ✅ 성공 확인 방법

안전 모드가 해제되면:
- ✅ Elementor 편집기 상단에 "안전 모드" 배지가 사라짐
- ✅ 모든 위젯과 요소가 정상 표시됨
- ✅ 좌측 패널의 모든 위젯을 드래그 앤 드롭 가능
- ✅ 변경 사항 저장이 정상 작동

---

## 🔄 Next.js에서 변경사항 확인

WordPress에서 편집 완료 후:

```bash
# Vercel 배포 환경
https://pnamarketing.co.kr

# Next.js 캐시 재검증 API 호출
https://pnamarketing.co.kr/api/revalidate?secret=YOUR_SECRET&path=/페이지경로
```

---

## 📞 추가 도움이 필요한 경우

1. **Elementor 버전:** [플러그인 → 설치된 플러그인]에서 확인
2. **WordPress 버전:** [대시보드 → 업데이트]에서 확인
3. **사용 중인 테마:** [외모 → 테마]에서 확인
4. **활성화된 플러그인 목록:** 스크린샷 찍어서 공유

이 정보가 있으면 더 정확한 해결책을 제공할 수 있습니다!



