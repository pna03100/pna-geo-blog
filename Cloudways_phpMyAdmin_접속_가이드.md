# 🌐 Cloudways phpMyAdmin 접속 및 안전 모드 완전 해결

## 🎯 Cloudways phpMyAdmin 접속 방법

### 방법 1: Cloudways 패널에서 접속 (가장 쉬움)

#### 1단계: Cloudways 로그인
```
https://platform.cloudways.com/login
→ 이메일 및 비밀번호 입력
```

#### 2단계: 서버 및 애플리케이션 선택
```
1. 왼쪽 메뉴에서 "Servers" 클릭
2. WordPress가 설치된 서버 선택
3. "Applications" 섹션에서 WordPress 앱 선택
```

#### 3단계: Database Access 찾기
```
1. 애플리케이션 페이지에서 "Access Details" 탭 클릭
2. "Database Access" 섹션 찾기
3. 정보 확인:
   - Database Name: (데이터베이스 이름)
   - Username: (사용자 이름)
   - Password: (비밀번호)
   - phpMyAdmin: (URL 링크) ← 이것 클릭!
```

#### 4단계: phpMyAdmin 접속
```
1. "phpMyAdmin" 링크 클릭
2. 새 탭이 열림
3. 로그인 정보 입력:
   - Username: (위에서 확인한 사용자 이름)
   - Password: (위에서 확인한 비밀번호)
4. "Go" 클릭
```

---

### 방법 2: 직접 URL 접속 (빠른 방법)

Cloudways는 각 서버마다 고유 phpMyAdmin URL을 제공합니다:

```
형식: https://서버IP주소/phpmyadmin
또는: https://서버도메인:8443/phpmyadmin

예시:
https://111.222.333.444/phpmyadmin
https://server-123456.cloudwaysapps.com:8443/phpmyadmin
```

**접속 정보:**
- Cloudways 패널 → Access Details에서 확인
- Username과 Password 입력

---

## ⚡ phpMyAdmin 접속 후 할 일

### 1단계: 데이터베이스 선택

왼쪽 목록에서 WordPress 데이터베이스 클릭:
```
보통: wp_, wrdp1_, 또는 Cloudways 패널에서 확인한 이름
```

### 2단계: SQL 탭 클릭

상단 메뉴에서 **"SQL"** 탭 클릭

### 3단계: SQL 코드 실행

아래 코드 **전체 복사 → 붙여넣기 → 실행(Go) 클릭:**

```sql
-- ============================================
-- Elementor 안전 모드 완전 제거
-- ============================================

-- 1. 현재 상태 확인 (백업용)
SELECT 'BEFORE - User Meta' AS Section, user_id, meta_key, meta_value 
FROM wp_usermeta 
WHERE meta_key LIKE '%safe%mode%' 
   OR meta_key LIKE '%elementor%safe%';

SELECT 'BEFORE - Options' AS Section, option_name, option_value 
FROM wp_options 
WHERE option_name LIKE '%safe%mode%' 
   OR option_name LIKE '%elementor%safe%';

-- 2. 사용자 메타에서 안전 모드 플래그 삭제
DELETE FROM wp_usermeta 
WHERE meta_key LIKE '%safe%mode%';

DELETE FROM wp_usermeta 
WHERE meta_key LIKE '%elementor%safe%';

DELETE FROM wp_usermeta 
WHERE meta_key = '_elementor_safe_mode';

DELETE FROM wp_usermeta 
WHERE meta_key = 'elementor_safe_mode';

-- 3. 옵션 테이블에서 안전 모드 플래그 삭제
DELETE FROM wp_options 
WHERE option_name LIKE '%safe%mode%';

DELETE FROM wp_options 
WHERE option_name LIKE '%elementor%safe%';

DELETE FROM wp_options 
WHERE option_name = 'elementor_safe_mode';

-- 4. 트랜지언트(캐시) 삭제
DELETE FROM wp_options 
WHERE option_name LIKE '_transient%safe%mode%';

DELETE FROM wp_options 
WHERE option_name LIKE '_transient%elementor%safe%';

-- 5. 모든 사용자의 Elementor 환경설정 초기화
DELETE FROM wp_usermeta 
WHERE meta_key LIKE 'elementor_preferences%';

-- 6. 최종 확인
SELECT 'AFTER - User Meta' AS Section, COUNT(*) AS Remaining 
FROM wp_usermeta 
WHERE meta_key LIKE '%safe%mode%';

SELECT 'AFTER - Options' AS Section, COUNT(*) AS Remaining 
FROM wp_options 
WHERE option_name LIKE '%safe%mode%';

-- 7. 완료 메시지
SELECT '✅ Elementor 안전 모드 데이터 완전 삭제 완료!' AS Result;
```

**⚠️ 중요:** 
- 테이블 접두사가 `wp_`가 아닐 수 있습니다!
- 왼쪽 목록에서 `_usermeta`와 `_options`로 끝나는 테이블 이름 확인
- 다르다면 코드에서 `wp_`를 해당 접두사로 변경

### 4단계: 실행 결과 확인

```
✅ "Query OK, X rows affected" 메시지
✅ 마지막에 "안전 모드 데이터 완전 삭제 완료!" 표시
```

---

## 🔥 추가 작업: Cloudways 캐시 클리어

Cloudways는 자체 캐시 시스템이 있습니다!

### Cloudways 패널에서:

```
1. 애플리케이션 선택
2. "Manage Services" 탭 클릭
3. 캐시 관련 서비스 찾기:
   - Varnish (있다면)
   - Redis
   - Memcached
4. 각 캐시의 "Purge" 또는 "Clear" 버튼 클릭
```

### 또는 애플리케이션 관리에서:

```
1. 애플리케이션 선택
2. "Application Management" 탭
3. "Purge Varnish" 클릭 (있다면)
4. "Clear Redis Cache" 클릭 (있다면)
```

---

## 💪 Code Snippets로 영구 방지 추가

phpMyAdmin 작업 후 Code Snippets도 추가하면 완벽!

### WordPress 관리자에서:

1. **플러그인 → 새로 추가**
2. **"Code Snippets" 설치 → 활성화**
3. **Snippets → Add New**
4. **코드 붙여넣기:**

```php
<?php
// Cloudways 환경에서 안전 모드 완전 차단
add_action('admin_init', function() {
    global $wpdb;
    
    // 데이터베이스에서 안전 모드 자동 삭제
    $wpdb->query("DELETE FROM {$wpdb->usermeta} WHERE meta_key LIKE '%safe%mode%'");
    $wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE '%safe%mode%'");
    
    // 쿠키 삭제
    $cookies = ['elementor_safe_mode', 'elementor-safe-mode', 'elementorSafeMode'];
    foreach ($cookies as $cookie) {
        if (isset($_COOKIE[$cookie])) {
            setcookie($cookie, '', time() - 3600, '/', '', true, true);
            setcookie($cookie, '', time() - 3600, '/', $_SERVER['HTTP_HOST'], true, true);
            unset($_COOKIE[$cookie]);
        }
    }
}, 1);

// Elementor 설정 강제 변경
add_filter('elementor/editor/localize_settings', function($settings) {
    $settings['initial_document']['safe_mode'] = false;
    $settings['document']['safe_mode'] = false;
    $settings['safe_mode'] = false;
    return $settings;
}, 999);

// JavaScript 차단
add_action('elementor/editor/before_enqueue_scripts', function() {
    echo '<script>
    (function(){
        if(typeof elementorCommon!=="undefined"){
            elementorCommon.config=elementorCommon.config||{};
            elementorCommon.config.safe_mode=false;
        }
        if(typeof elementor!=="undefined"){
            elementor.config=elementor.config||{};
            elementor.config.safe_mode=false;
        }
        document.cookie.split(";").forEach(function(c){
            var n=c.split("=")[0].trim();
            if(n.includes("elementor")&&n.includes("safe")){
                document.cookie=n+"=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
            }
        });
        Object.keys(localStorage).forEach(function(k){
            if(k.includes("elementor")&&k.includes("safe")){
                localStorage.removeItem(k);
            }
        });
        console.log("✅ Cloudways: 안전 모드 차단 완료!");
    })();
    </script>';
}, 1);

// URL 파라미터 제거
add_action('admin_init', function() {
    if (isset($_GET['elementor-mode']) || isset($_GET['safe-mode'])) {
        wp_safe_redirect(remove_query_arg(['elementor-mode', 'safe-mode']));
        exit;
    }
}, 1);
?>
```

5. **"Save Changes and Activate" 클릭**

---

## 🔄 브라우저 완전 클린

### Chrome/Edge:

```
1. Ctrl + Shift + Delete
2. "전체 기간" 선택
3. 모든 항목 체크:
   ✓ 쿠키 및 기타 사이트 데이터
   ✓ 캐시된 이미지 및 파일
   ✓ 사이트 설정
4. "데이터 삭제"
```

### 또는 시크릿 모드 테스트:

```
Ctrl + Shift + N (새 시크릿 창)
→ https://cms.pnamarketing.co.kr/wp-admin
→ 로그인
→ Elementor 편집기 테스트
```

---

## 🎯 완전 해결 체크리스트

순서대로 체크:

- [ ] **1단계: Cloudways 로그인**
- [ ] **2단계: phpMyAdmin 접속**
  - [ ] Access Details에서 Database 정보 확인
  - [ ] phpMyAdmin 링크 클릭
  - [ ] 로그인 성공
- [ ] **3단계: SQL 코드 실행**
  - [ ] 데이터베이스 선택
  - [ ] SQL 탭 클릭
  - [ ] 코드 붙여넣기
  - [ ] 실행(Go) 클릭
  - [ ] "Query OK" 메시지 확인
- [ ] **4단계: Cloudways 캐시 클리어**
  - [ ] Varnish Purge (있다면)
  - [ ] Redis Clear (있다면)
- [ ] **5단계: Code Snippets 추가**
  - [ ] 플러그인 설치
  - [ ] PHP 코드 추가
  - [ ] 활성화
- [ ] **6단계: 브라우저 캐시 삭제**
  - [ ] Ctrl+Shift+Delete
  - [ ] 전체 삭제
- [ ] **7단계: 시크릿 모드 테스트**
  - [ ] Ctrl+Shift+N
  - [ ] WordPress 로그인
  - [ ] Elementor 편집기 열기
  - [ ] 안전 모드 없음 확인!

---

## ✅ 성공 확인

Elementor 편집기에서:
- ✅ 안전 모드 배지 없음
- ✅ 좌측 위젯 패널 정상 표시
- ✅ 드래그 앤 드롭 작동
- ✅ CSS 편집 가능
- ✅ 저장 기능 작동

---

## 🆘 Cloudways 패널을 못 찾겠다면

### 단계별 스크린샷 가이드:

1. **Cloudways 로그인 화면:**
   ```
   https://platform.cloudways.com/login
   ```

2. **서버 찾기:**
   - 로그인 후 왼쪽 메뉴
   - "Servers" 클릭
   - 목록에서 서버 선택

3. **애플리케이션 찾기:**
   - 서버 페이지에서
   - "Applications" 섹션
   - WordPress 앱 클릭

4. **Access Details:**
   - 상단 탭에서
   - "Access Details" 클릭
   - "Database Access" 섹션
   - "phpMyAdmin" 링크 클릭

---

## 💡 Cloudways 추가 팁

### SFTP로 직접 파일 접근 (선택사항)

Cloudways는 SFTP도 쉽게 제공합니다:

```
1. Access Details 탭
2. "SFTP/SSH ACCESS" 섹션
3. 정보 확인:
   - Host: (호스트 주소)
   - Port: 22 (또는 표시된 포트)
   - Username: (사용자 이름)
   - Password: (비밀번호)
```

**FileZilla로 접속:**
```
1. FileZilla 실행
2. Host: sftp://호스트주소
3. Username: (위에서 확인)
4. Password: (위에서 확인)
5. Port: 22
6. 연결
```

**CSS 폴더 찾기:**
```
/applications/앱ID/public_html/wp-content/uploads/elementor/css/
```

---

이제 완벽하게 해결됩니다! 🎉

**단계를 따라하시다가 막히는 부분이 있으면 언제든 말씀해주세요!** 😊








