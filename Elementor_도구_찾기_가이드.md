# 🔍 Elementor 도구 메뉴 찾기 가이드

## 🎯 방법 1: 왼쪽 메뉴에서 찾기 (기본)

### WordPress 관리자 페이지에서:

```
https://cms.pnamarketing.co.kr/wp-admin
```

### 단계별 안내:

1. **왼쪽 사이드바 메뉴 확인**

2. **"Elementor" 메뉴 찾기**
   - 보통 "플러그인" 아래쪽에 위치
   - Elementor 아이콘(핑크색 E 로고)

3. **"Elementor" 메뉴에 마우스 올리기 (호버)**
   - 서브메뉴가 펼쳐짐

4. **서브메뉴 목록:**
   ```
   Elementor
   ├─ 개요 (Overview)
   ├─ 템플릿 (Templates)
   ├─ 시스템 정보 (System Info)
   ├─ 도구 (Tools)          ← 여기!
   ├─ 설정 (Settings)
   └─ 업그레이드 (Get Pro / License)
   ```

5. **"도구" (Tools) 클릭**

---

## 🎯 방법 2: 직접 URL로 접속 (가장 빠름!)

브라우저 주소창에 직접 입력:

```
https://cms.pnamarketing.co.kr/wp-admin/admin.php?page=elementor-tools
```

**Enter 누르면 바로 Elementor 도구 페이지로 이동!**

---

## 🎯 방법 3: WordPress 검색 기능 사용

1. **WordPress 관리자 상단**에 검색창이 있을 수 있음
2. **"Elementor Tools"** 검색
3. **결과 클릭**

---

## 📋 도구 페이지에서 할 일

도구 페이지에 도착하면:

### 탭 목록:
```
도구 페이지 탭:
├─ 일반 (General)           ← 여기로 이동
├─ 버전 관리 (Version Control)
├─ 유지보수 모드 (Maintenance Mode)
└─ 교체 URL (Replace URL)
```

### "일반 (General)" 탭에서:

#### 1. CSS 파일 재생성
```
[재생성] 버튼 클릭

설명: 
Elementor가 생성한 모든 CSS 파일을 다시 만듭니다.
페이지가 제대로 표시되지 않을 때 사용합니다.
```

#### 2. 데이터 동기화
```
[동기화] 버튼 클릭

설명:
Elementor의 모든 위젯과 설정을 데이터베이스와 동기화합니다.
편집기에서 위젯이 누락될 때 사용합니다.
```

---

## 🚨 "Elementor" 메뉴가 보이지 않는다면?

### 원인 1: 권한 문제
**해결:** 관리자(Administrator) 계정으로 로그인했는지 확인

### 원인 2: Elementor 플러그인 비활성화
**해결:** 
```
플러그인 → 설치된 플러그인
→ Elementor 찾아서 "활성화" 클릭
```

### 원인 3: 플러그인 설치 안 됨
**해결:**
```
플러그인 → 새로 추가
→ "Elementor" 검색
→ 설치 → 활성화
```

---

## 🎯 대체 방법: 플러그인 설정에서 접근

1. **플러그인 → 설치된 플러그인**
2. **"Elementor" 찾기**
3. **"설정" 링크 클릭** (플러그인 이름 아래)
4. **설정 페이지에서 "도구" 탭 클릭**

---

## 💡 CSS 재생성을 할 수 없다면?

### 수동으로 CSS 파일 삭제 (FTP/파일 관리자)

WordPress 서버에서 다음 폴더 삭제:

```
/wp-content/uploads/elementor/css/
```

**삭제 후 페이지를 새로고침하면 자동으로 재생성됩니다.**

### SSH/터미널 접근이 가능하다면:

```bash
# WordPress 루트 폴더에서
rm -rf wp-content/uploads/elementor/css/*

# 권한 재설정
chmod 755 wp-content/uploads/elementor/css/
```

---

## 🆘 여전히 찾을 수 없다면?

다음 정보를 확인해주세요:

1. **WordPress 버전:**
   ```
   대시보드 → 업데이트 페이지에서 확인
   ```

2. **Elementor 설치 여부:**
   ```
   플러그인 → 설치된 플러그인
   → "Elementor" 검색해서 있는지 확인
   ```

3. **사용자 권한:**
   ```
   우측 상단 → 프로필 편집
   → "역할" 확인 (관리자여야 함)
   ```

4. **스크린샷 공유:**
   - WordPress 관리자 왼쪽 메뉴 전체 스크린샷
   - 플러그인 목록 스크린샷

---

## ✅ 빠른 체크리스트

- [ ] WordPress 관리자 로그인 (관리자 권한)
- [ ] 왼쪽 메뉴에서 "Elementor" 찾기
- [ ] "Elementor" → "도구" 클릭
- [ ] 또는 직접 URL로 접속: `/wp-admin/admin.php?page=elementor-tools`
- [ ] "일반" 탭에서 "CSS 파일 재생성" 클릭
- [ ] "데이터 동기화" 클릭

---

## 🎉 성공 후:

CSS 재생성 완료 메시지:
```
✅ "Elementor CSS 파일이 성공적으로 재생성되었습니다"
```

데이터 동기화 완료 메시지:
```
✅ "Elementor 데이터가 성공적으로 동기화되었습니다"
```

이제 브라우저 캐시를 삭제하고 Elementor 편집기를 다시 열어보세요!

---

**어느 단계에서 막히셨는지 알려주시면 더 도와드리겠습니다!** 😊



