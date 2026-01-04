# WordPress CORS 설정 가이드

## 🎯 목적
Next.js 프론트엔드가 WordPress GraphQL API에 접근할 수 있도록 CORS를 허용합니다.

---

## ✅ 방법 1: 플러그인 사용 (권장)

### 1단계: 플러그인 설치
1. WordPress 관리자 (https://cms.pnamarketing.co.kr/wp-admin) 로그인
2. 왼쪽 메뉴 → **플러그인** → **새로 추가**
3. 검색창에 **"WP GraphQL CORS"** 입력
4. **"WPGraphQL CORS"** 플러그인 찾기
5. **지금 설치** → **활성화**

### 2단계: CORS 설정
1. 왼쪽 메뉴 → **GraphQL** → **Settings**
2. **CORS** 탭 클릭
3. **"Enable CORS"** 체크박스 선택
4. **Allowed Origins** 필드에 다음 추가:
   ```
   https://pnamarketing.co.kr
   http://localhost:3000
   *
   ```
5. **Save Changes** 클릭

---

## ✅ 방법 2: 코드로 설정 (플러그인 없이)

WordPress 테마의 `functions.php` 파일에 추가:

### 옵션 A: 테마 functions.php 수정

1. WordPress 관리자 → **외모** → **테마 파일 편집기**
2. 오른쪽에서 **functions.php** 선택
3. 파일 맨 끝에 다음 코드 추가:

```php
<?php
// WordPress GraphQL CORS 허용
add_action('init', function() {
    // CORS 헤더 설정
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Allow-Credentials: true');
    
    // Preflight 요청 처리
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('HTTP/1.1 200 OK');
        exit();
    }
});

// GraphQL 엔드포인트에 CORS 추가
add_filter('graphql_response_headers_to_send', function($headers) {
    $headers['Access-Control-Allow-Origin'] = '*';
    $headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    $headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    return $headers;
});
```

4. **파일 업데이트** 클릭

---

## ✅ 방법 3: wp-config.php 수정 (서버 접근 가능한 경우)

FTP 또는 호스팅 파일 관리자로 `wp-config.php` 파일 수정:

```php
<?php
// 파일 맨 위에 추가 (<?php 태그 바로 다음)

// CORS 허용
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// ... 나머지 wp-config.php 코드
```

---

## 🧪 테스트 방법

### 1. 브라우저 콘솔 테스트
```javascript
// 브라우저 콘솔(F12)에서 실행
fetch('https://cms.pnamarketing.co.kr/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query: '{ generalSettings { title } }'
    })
})
.then(r => r.json())
.then(data => console.log('✅ 성공:', data))
.catch(err => console.error('❌ 실패:', err));
```

### 2. test-graphql.html 재테스트
프로젝트 폴더의 `test-graphql.html` 파일을 브라우저로 열어서 "모든 테스트 실행"

---

## ⚠️ 보안 권장 사항

프로덕션 환경에서는 `*` 대신 **특정 도메인만 허용**하는 것이 안전합니다:

```php
// 특정 도메인만 허용 (권장)
$allowed_origins = [
    'https://pnamarketing.co.kr',
    'http://localhost:3000'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}
```

---

## 📋 체크리스트

- [ ] WPGraphQL 플러그인 활성화 확인
- [ ] CORS 설정 추가 (방법 1, 2, 또는 3 중 선택)
- [ ] 브라우저 콘솔에서 CORS 에러 사라짐 확인
- [ ] test-graphql.html 테스트 성공 확인
- [ ] Vercel 환경 변수 수정
- [ ] Vercel 재배포
- [ ] 최종 사이트 확인

---

## 🆘 문제 해결

### CORS 에러가 계속 나타나는 경우:
1. WordPress 캐시 플러그인 비활성화 (임시)
2. 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
3. 서버 캐시 재시작 (호스팅 제공업체에 문의)

### .htaccess 방법 (Apache 서버):
WordPress 루트 폴더의 `.htaccess` 파일에 추가:
```apache
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>
```


