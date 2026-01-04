# WPGraphQL 플러그인 완전 재설치 가이드

## 🎯 문제 상황
GraphQL 엔드포인트가 HTML을 반환하고 있음 (JSON 대신)

---

## ✅ 해결 방법: WPGraphQL 완전 재설치

### Step 1: 기존 플러그인 완전 제거

1. WordPress 관리자 → **플러그인** → **설치된 플러그인**

2. **WPGraphQL** 찾기

3. **비활성화** 클릭

4. **삭제** 링크 클릭

5. 확인 창에서 **확인** 또는 **OK**

---

### Step 2: 플러그인 재설치

1. **플러그인** → **새로 추가**

2. 검색창에 정확히 입력:
   ```
   WPGraphQL
   ```

3. 다음 플러그인 찾기:
   ```
   📦 WPGraphQL
   작성자: WPGraphQL
   설명: GraphQL API for WordPress
   ⭐ 평점: 거의 만점
   📊 100,000+ 활성 설치
   ```

4. **지금 설치** 클릭

5. **활성화** 클릭

---

### Step 3: Permalink 재저장

1. 왼쪽 메뉴 → **설정** → **고유주소**

2. 아무것도 변경하지 말고 맨 아래로 스크롤

3. **변경사항 저장** 버튼 클릭

---

### Step 4: .htaccess 파일 확인 (FTP 접근 가능 시)

WordPress 루트 폴더의 `.htaccess` 파일이 다음을 포함해야 합니다:

```apache
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress
```

**없거나 다르다면:**
1. `.htaccess` 파일 삭제
2. WordPress 관리자 → 설정 → 고유주소 → 변경사항 저장
3. WordPress가 자동으로 `.htaccess` 재생성

---

### Step 5: GraphQL 설정 확인

1. 왼쪽 메뉴에 새로 생긴 **GraphQL** 클릭

2. **Settings** 클릭

3. 다음 설정 확인:
   - **GraphQL Endpoint:** `/graphql` (기본값)
   - **Enable GraphQL Endpoint:** ✅ 체크됨
   - **Public Introspection:** ✅ 체크됨 (개발 중)

4. **Save Changes** 클릭

---

### Step 6: 테스트

#### 브라우저 직접 접속:
```
https://cms.pnamarketing.co.kr/graphql
```

**기대 결과:** GraphiQL IDE 화면 (검은 배경)

#### test-graphql.html 테스트:
1. 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
2. test-graphql.html 재실행
3. "모든 테스트 실행"

---

## 🔧 추가 해결 방법

### 방법 A: WordPress 업데이트 확인
1. WordPress 관리자 → **대시보드** → **업데이트**
2. WordPress, 플러그인, 테마 모두 최신 버전으로 업데이트

### 방법 B: 다른 플러그인 충돌 확인
1. 모든 플러그인 비활성화 (WPGraphQL 제외)
2. GraphQL 엔드포인트 테스트
3. 작동하면 → 플러그인을 하나씩 활성화하며 충돌 확인

### 방법 C: 테마 충돌 확인
1. **외모** → **테마**
2. 기본 테마(Twenty Twenty-Four 등)로 임시 변경
3. GraphQL 엔드포인트 테스트
4. 작동하면 → 테마 문제

### 방법 D: PHP 버전 확인
WPGraphQL 요구사항:
- PHP 7.4 이상 (권장: PHP 8.0+)
- WordPress 5.0 이상

확인:
1. WordPress 관리자 → **도구** → **사이트 상태**
2. **정보** 탭
3. **서버** 섹션에서 PHP 버전 확인

---

## 🆘 여전히 안 되는 경우

### 호스팅 제공업체 확인:
일부 호스팅은 GraphQL 엔드포인트를 차단할 수 있습니다.

호스팅 지원팀에 문의:
- "WPGraphQL 플러그인을 사용하려고 합니다"
- "/graphql 엔드포인트가 작동하지 않습니다"
- "mod_rewrite가 활성화되어 있나요?"

---

## 📋 체크리스트

```
☐ WPGraphQL 플러그인 삭제
☐ WPGraphQL 플러그인 재설치 및 활성화
☐ 설정 → 고유주소 → 변경사항 저장
☐ GraphQL → Settings 확인
☐ https://cms.pnamarketing.co.kr/graphql 브라우저 접속 테스트
☐ GraphiQL IDE 화면 확인
☐ test-graphql.html 재테스트
```



