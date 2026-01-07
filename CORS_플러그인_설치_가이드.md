# WPGraphQL CORS 플러그인 설치 가이드 (가장 쉬운 방법)

## ✅ 방법: 플러그인으로 CORS 활성화

### 1단계: 플러그인 설치

1. **WordPress 관리자** 로그인 (https://cms.pnamarketing.co.kr/wp-admin)

2. 왼쪽 메뉴 → **플러그인** → **새로 추가**

3. 검색창에 다음 중 하나 입력:
   - **"WPGraphQL CORS"**
   - 또는 **"wp cors"**

4. 다음 플러그인 찾기:
   - **"WP GraphQL CORS"** 
   - 또는 **"WP CORS"**

5. **지금 설치** 버튼 클릭

6. **활성화** 버튼 클릭

### 2단계: 플러그인 설정

#### 옵션 A: WP GraphQL CORS 설정
1. 왼쪽 메뉴 → **GraphQL** → **Settings**
2. **CORS** 또는 **Access Control** 탭 찾기
3. 다음 설정 입력:
   ```
   Allowed Origins: *
   ```
   또는
   ```
   https://pnamarketing.co.kr
   http://localhost:3000
   ```
4. **Save Settings** 클릭

#### 옵션 B: WP CORS 설정
1. 왼쪽 메뉴 → **설정** → **WP CORS**
2. **Access-Control-Allow-Origin** 필드에:
   ```
   *
   ```
3. **Save Changes** 클릭

---

## 🔧 대안 방법: Code Snippets 플러그인 사용

만약 전용 CORS 플러그인을 찾을 수 없다면:

### 1단계: Code Snippets 플러그인 설치

1. WordPress 관리자 → **플러그인** → **새로 추가**
2. 검색: **"Code Snippets"**
3. **"Code Snippets"** (작성자: Code Snippets Pro) 설치 및 활성화

### 2단계: CORS 코드 추가

1. 왼쪽 메뉴 → **Snippets** → **Add New**

2. **Title**: "GraphQL CORS 허용" 입력

3. **Code** 필드에 다음 코드 붙여넣기:

```php
// GraphQL CORS 허용
add_filter('graphql_response_headers_to_send', function($headers) {
    $headers['Access-Control-Allow-Origin'] = '*';
    $headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    $headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    return $headers;
});

// OPTIONS 요청 처리
add_action('init', function() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('HTTP/1.1 200 OK');
        exit();
    }
});
```

4. **Run snippet everywhere** 선택

5. **Save Changes and Activate** 클릭

---

## 🧪 테스트

### 브라우저 콘솔 테스트:
```javascript
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

### test-graphql.html 테스트:
프로젝트 폴더의 `test-graphql.html` 파일 열어서 "모든 테스트 실행"

---

## 📋 빠른 체크리스트

```
☐ WordPress 관리자 로그인
☐ 플러그인 → 새로 추가
☐ "WPGraphQL CORS" 또는 "Code Snippets" 설치
☐ 활성화 및 설정
☐ 브라우저 콘솔 테스트
☐ test-graphql.html 재테스트
```

---

## 💡 추천 순서

1. **"WP CORS"** 플러그인 시도 (가장 간단)
2. 안 되면 **"Code Snippets"** 플러그인 사용
3. 그래도 안 되면 FTP 접근 방법 사용











