# CORS 완전 해결 가이드 - 단계별 진단

## 🚨 현재 상황
모든 테스트가 실패하고 있음 → CORS 설정이 제대로 적용되지 않음

---

## 📊 단계 1: 정확한 에러 확인

### 브라우저 콘솔에서 확인:
1. test-graphql.html 열린 상태에서 F12
2. Console 탭
3. "모든 테스트 실행" 클릭
4. 빨간색 에러 메시지 복사

---

## ✅ 해결 방법 A: WordPress 캐시 삭제

### 1. WordPress 캐시 플러그인 확인
WordPress 관리자에서:
- WP Super Cache
- W3 Total Cache
- WP Rocket
- LiteSpeed Cache

있다면 → **캐시 삭제** 또는 **임시 비활성화**

### 2. 브라우저 캐시 삭제
- Ctrl + Shift + Delete
- "쿠키 및 사이트 데이터"와 "캐시된 이미지 및 파일" 선택
- "데이터 삭제"

---

## ✅ 해결 방법 B: .htaccess 파일 수정 (강력한 방법)

WordPress 루트 폴더의 .htaccess 파일에 추가:

```apache
# WordPress GraphQL CORS 허용
<IfModule mod_headers.c>
    # GraphQL 엔드포인트에만 적용
    <FilesMatch "graphql">
        Header set Access-Control-Allow-Origin "*"
        Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
        Header set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
        Header set Access-Control-Allow-Credentials "true"
    </FilesMatch>
    
    # 전역 CORS (모든 요청에 적용)
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>

# OPTIONS 요청 처리
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_METHOD} OPTIONS
    RewriteRule ^(.*)$ $1 [R=200,L]
</IfModule>
```

### .htaccess 파일 수정 방법:
1. FTP 또는 호스팅 파일 관리자 접속
2. WordPress 루트 폴더로 이동
3. .htaccess 파일 편집
4. 파일 맨 위 (# BEGIN WordPress 위)에 위 코드 추가
5. 저장

---

## ✅ 해결 방법 C: wp-config.php 수정

WordPress 루트 폴더의 wp-config.php 파일 수정:

```php
<?php
// 파일 맨 위에 추가 (<?php 바로 다음)

// CORS 허용
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

// ... 나머지 wp-config.php 코드
```

---

## ✅ 해결 방법 D: 추가 플러그인 설치

### 플러그인 1: "Allow CORS: Access-Control-Allow-Origin"
1. 플러그인 → 새로 추가
2. 검색: "Allow CORS"
3. 설치 및 활성화
4. 설정 없이 바로 작동

### 플러그인 2: "WP CORS"
1. 플러그인 → 새로 추가
2. 검색: "WP CORS"
3. 설치 및 활성화
4. 설정에서 "*" 입력

---

## ✅ 해결 방법 E: Code Snippets 코드 재확인

### 기존 스니펫 삭제하고 새로 만들기:

1. Snippets → All Snippets
2. 기존 CORS 스니펫 찾아서 → Delete
3. Add New
4. 다음 **더 강력한 코드** 사용:

```php
// 전역 CORS 헤더 추가 (모든 요청)
add_action('init', function() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin');
    header('Access-Control-Allow-Credentials: true');
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}, 0);

// GraphQL 전용 CORS
add_filter('graphql_response_headers_to_send', function($headers) {
    $headers['Access-Control-Allow-Origin'] = '*';
    $headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    $headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With';
    $headers['Access-Control-Allow-Credentials'] = 'true';
    return $headers;
}, 10, 1);

// REST API CORS
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
}, 15);
```

---

## 🧪 테스트 순서

각 해결 방법 시도 후:

1. WordPress 로그아웃 후 재로그인
2. 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
3. test-graphql.html 새로고침 (Ctrl+F5)
4. "모든 테스트 실행" 클릭
5. 결과 확인

---

## 🔍 추가 진단

### 1. GraphQL 엔드포인트 직접 확인:
브라우저에서 접속:
```
https://cms.pnamarketing.co.kr/graphql
```

**기대 결과:** GraphiQL IDE 화면 (검은 배경, 코드 편집기)
**문제 발생:** 404, 500, 또는 빈 화면

### 2. WPGraphQL 플러그인 재설치:
1. 플러그인 → 설치된 플러그인
2. WPGraphQL → 비활성화
3. 삭제
4. 플러그인 → 새로 추가
5. "WPGraphQL" 검색
6. 재설치 및 활성화

---

## 📞 호스팅 제공업체 확인

일부 호스팅은 서버 레벨에서 CORS를 차단합니다:

### 확인 사항:
1. 호스팅 제공업체 이름 확인
2. 호스팅 지원팀에 문의:
   - "GraphQL API에 CORS 허용이 필요합니다"
   - "Access-Control-Allow-Origin 헤더 허용 요청"

### 알려진 문제 호스팅:
- 일부 공유 호스팅
- 일부 관리형 WordPress 호스팅
- Cloudflare 사용 시 추가 설정 필요

---

## 🎯 긴급 임시 해결책

CORS를 완전히 우회하는 방법 (개발 중에만):

### Chrome 확장 프로그램 사용:
1. Chrome 웹 스토어 접속
2. "Allow CORS: Access-Control-Allow-Origin" 검색
3. 확장 프로그램 설치
4. 활성화
5. test-graphql.html 재테스트

**주의:** 이것은 임시 방편이며, 실제 사이트는 작동하지 않습니다.

---

## 📋 체크리스트

- [ ] 브라우저 콘솔에서 정확한 에러 확인
- [ ] WordPress 캐시 삭제
- [ ] 브라우저 캐시 삭제
- [ ] Code Snippets 스니펫 활성 상태 확인
- [ ] Code Snippets 코드를 더 강력한 버전으로 교체
- [ ] "Allow CORS" 플러그인 추가 설치
- [ ] .htaccess 파일 수정 (FTP 접근 가능 시)
- [ ] WPGraphQL 플러그인 재설치
- [ ] 호스팅 제공업체 문의










