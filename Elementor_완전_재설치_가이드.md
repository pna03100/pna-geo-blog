# 🔄 Elementor 완전 재설치 가이드

## ⚠️ 재설치 전 꼭 읽으세요!

### 재설치 시 잃게 되는 것:
- ❌ Elementor 전역 설정 (색상, 글꼴 등)
- ❌ 저장된 템플릿
- ❌ 위젯 설정

### 재설치 시 유지되는 것:
- ✅ 페이지 내용 (데이터베이스에 저장됨)
- ✅ WordPress 설정
- ✅ 다른 플러그인 설정

**권장:** 위 `안전모드_완전_제거_최종판.md`의 방법을 먼저 시도하세요!

---

## 📋 재설치 순서 (안전하게)

### 1단계: 백업 (필수!)

#### A. 데이터베이스 백업

**phpMyAdmin에서:**
```
1. phpMyAdmin 접속
2. WordPress 데이터베이스 선택
3. 상단 "내보내기" 탭 클릭
4. "실행" 클릭
5. .sql 파일 다운로드 (컴퓨터에 저장)
```

**또는 플러그인 사용:**
```
플러그인 → 새로 추가
→ "UpdraftPlus" 검색 → 설치 → 활성화
→ 설정 → UpdraftPlus 백업
→ "지금 백업" 클릭
```

#### B. Elementor 설정 내보내기 (가능하면)

```
Elementor → 도구 → 내보내기 (있다면)
→ 설정 파일 다운로드
```

---

### 2단계: Elementor Pro 라이센스 키 확인 (Pro 사용 시)

```
Elementor → 정보 또는 라이센스
→ 라이센스 키 복사해서 메모장에 저장
```

---

### 3단계: Elementor 완전 삭제

#### A. 플러그인 비활성화

```
1. 플러그인 → 설치된 플러그인
2. "Elementor Pro" 찾기 → "비활성화" 클릭
3. "Elementor" 찾기 → "비활성화" 클릭
```

#### B. 플러그인 삭제

```
1. "Elementor Pro" → "삭제" 클릭
2. "Elementor" → "삭제" 클릭
```

#### C. 데이터베이스 잔여 데이터 삭제 (선택사항, 완전 클린 설치)

**phpMyAdmin → SQL 탭:**

```sql
-- Elementor 관련 모든 데이터 삭제 (주의!)
-- ⚠️ 이 작업은 Elementor 설정을 완전히 지웁니다!

-- 1. 옵션 테이블
DELETE FROM wp_options WHERE option_name LIKE '%elementor%';

-- 2. 사용자 메타
DELETE FROM wp_usermeta WHERE meta_key LIKE '%elementor%';

-- 3. 포스트 메타 (⚠️ 주의: 페이지 내용도 지워질 수 있음!)
-- DELETE FROM wp_postmeta WHERE meta_key LIKE '%elementor%';

-- 4. 트랜지언트
DELETE FROM wp_options WHERE option_name LIKE '_transient%elementor%';
DELETE FROM wp_options WHERE option_name LIKE '_transient_timeout%elementor%';
```

**⚠️ 주의:** 포스트 메타는 페이지 내용이 포함되어 있으므로 삭제하지 마세요!

#### D. 파일 시스템에서 Elementor 폴더 삭제

**FTP 또는 파일 관리자:**

```
/wp-content/plugins/elementor/           → 삭제 (이미 삭제됨)
/wp-content/plugins/elementor-pro/       → 삭제 (이미 삭제됨)
/wp-content/uploads/elementor/           → 삭제 (CSS 캐시)
```

---

### 4단계: Elementor 재설치

#### A. Elementor 무료 버전 설치

```
1. 플러그인 → 새로 추가
2. "Elementor" 검색
3. "Elementor Page Builder" 찾기
4. "지금 설치" 클릭
5. "활성화" 클릭
```

#### B. 초기 설정

```
Elementor 설치 후 자동으로 설정 마법사가 나타남
→ 기본 설정 진행
```

#### C. Elementor Pro 재설치 (Pro 사용 시)

**방법 1: WordPress 관리자에서**
```
1. Elementor → 정보
2. "Get Pro" 또는 업그레이드 클릭
3. 계정 로그인
4. 플러그인 다운로드
5. 업로드 및 활성화
```

**방법 2: 수동 업로드**
```
1. Elementor 웹사이트 로그인 (elementor.com)
2. My Account → My Licenses
3. Elementor Pro 다운로드
4. WordPress: 플러그인 → 새로 추가 → 플러그인 업로드
5. ZIP 파일 선택 → 설치 → 활성화
6. 라이센스 키 입력 → 활성화
```

---

### 5단계: 설정 복원

#### A. 기본 설정

```
1. Elementor → 설정 → 일반
   - 편집기 설정 확인
   
2. Elementor → 설정 → Advanced
   - CSS 생성 방법: "External File" 선택
   
3. Elementor → 도구 → 일반
   - "CSS 파일 재생성" 클릭
   - "데이터 동기화" 클릭
```

#### B. 전역 설정 (색상, 글꼴)

```
Elementor → 설정 → Kit
→ 전역 색상, 글꼴 등 재설정
```

---

### 6단계: 테스트

#### A. 새 페이지 생성 테스트

```
1. 페이지 → 새로 추가
2. "Elementor로 편집" 클릭
3. 위젯 드래그 앤 드롭 테스트
4. 저장 테스트
```

#### B. 기존 페이지 확인

```
1. 페이지 → 모든 페이지
2. 기존 페이지 열기
3. "Elementor로 편집" 클릭
4. 내용이 정상인지 확인
```

#### C. 안전 모드 확인

```
✅ 편집기 상단에 "안전 모드" 배지 없음
✅ 모든 위젯 정상 작동
✅ CSS 편집 가능
```

---

## 🆘 재설치 후에도 안전 모드가 나타나면

### 원인: 서버 환경 문제

#### 확인 사항:

1. **PHP 버전:**
   ```
   WordPress 관리자 → 도구 → 사이트 상태
   → PHP 버전 7.4 이상 권장
   ```

2. **메모리 제한:**
   ```
   wp-config.php에 추가:
   define('WP_MEMORY_LIMIT', '256M');
   ```

3. **플러그인 충돌:**
   ```
   다른 모든 플러그인 비활성화 후 테스트
   → 하나씩 활성화하며 범인 찾기
   ```

4. **테마 충돌:**
   ```
   테마를 "Hello Elementor" 또는 "Astra"로 변경 후 테스트
   ```

---

## ✅ 재설치 완료 체크리스트

- [ ] 1단계: 데이터베이스 백업 완료
- [ ] 2단계: 라이센스 키 저장 (Pro 사용 시)
- [ ] 3단계: Elementor 완전 삭제
- [ ] 4단계: Elementor 재설치
- [ ] 5단계: 기본 설정 완료
- [ ] 6단계: 테스트 완료
- [ ] 안전 모드 없음 확인
- [ ] 기존 페이지 정상 작동 확인

---

## 🎯 재설치 대신 먼저 시도할 것

재설치는 **최후의 수단**입니다!

**먼저 이것을 시도하세요:**

### 1. 데이터베이스 클린 (가장 강력!)
```
phpMyAdmin → SQL:
DELETE FROM wp_usermeta WHERE meta_key LIKE '%safe%mode%';
DELETE FROM wp_options WHERE option_name LIKE '%safe%mode%';
```

### 2. 브라우저 완전 클린
```
Incognito 모드로 접속 테스트
```

### 3. Code Snippets 최강 코드
```
위 "안전모드_완전_제거_최종판.md" 참조
```

**이 3가지만 해도 90% 해결됩니다!**

재설치는 정말 안 될 때만 하세요! 😊



