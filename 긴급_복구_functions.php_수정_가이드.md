# 🚨 긴급 복구: functions.php 수정 가이드

## 즉시 실행 단계

### 방법 1: FTP/SFTP (가장 빠름)
1. FileZilla 또는 FTP 클라이언트 실행
2. 서버 접속: `cms.pnamarketing.co.kr`
3. 경로 이동: `/public_html/wp-content/themes/hello-elementor/`
4. `functions.php` 파일 다운로드
5. 텍스트 에디터로 열기
6. **방금 추가한 코드 블록 전체 삭제** (파일 맨 끝 부분)
7. 저장 후 다시 업로드
8. 사이트 새로고침

### 방법 2: Cloudways File Manager
1. Cloudways 대시보드 로그인
2. Application Management > File Manager
3. `public_html/wp-content/themes/hello-elementor/functions.php` 클릭
4. Edit 버튼 클릭
5. 맨 끝에 추가된 코드 삭제
6. Save

### 방법 3: SSH 터미널 (고급)
```bash
# SSH 접속
ssh your-user@your-server-ip

# 파일 백업
cp ~/public_html/wp-content/themes/hello-elementor/functions.php ~/functions.php.backup

# 마지막 추가된 줄 제거 (줄 수에 따라 조정)
# 예: 마지막 150줄 제거
head -n -150 ~/public_html/wp-content/themes/hello-elementor/functions.php > ~/temp_functions.php
mv ~/temp_functions.php ~/public_html/wp-content/themes/hello-elementor/functions.php
```

### 방법 4: WordPress Recovery Mode (자동 감지)
- 관리자 이메일 확인
- "Recovery Mode" 링크 클릭
- 문제 플러그인/테마 비활성화

## 복구 후 확인
✅ 사이트가 정상적으로 로드되는지 확인
✅ 관리자 페이지 접속 가능 여부 확인

## 다음 단계
복구가 완료되면 아래의 **안전한 버전 코드**를 사용하세요.





