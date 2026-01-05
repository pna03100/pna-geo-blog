# ============================================
# Elementor Pro 라이선스 DB 강제 정리 스크립트
# Trinity-Core System Management Script
# Windows PowerShell 버전
# ============================================

Write-Host "🚀 Elementor Pro 라이선스 DB 정리 도구" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# SSH 접속 정보 입력
Write-Host "📌 SSH 접속 정보를 입력하세요:" -ForegroundColor Yellow
$sshUser = Read-Host "SSH 사용자명 (예: master-appname)"
$sshHost = Read-Host "SSH 서버 IP"
$sshPort = Read-Host "SSH 포트 (기본값: 22, 엔터)"
if ([string]::IsNullOrWhiteSpace($sshPort)) { $sshPort = "22" }

$wpPath = Read-Host "워드프레스 경로 (예: /home/master/applications/appname/public_html)"

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "🔍 접속 정보 확인:" -ForegroundColor Green
Write-Host "  사용자: $sshUser" -ForegroundColor White
Write-Host "  서버: $sshHost" -ForegroundColor White
Write-Host "  포트: $sshPort" -ForegroundColor White
Write-Host "  경로: $wpPath" -ForegroundColor White
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

$confirm = Read-Host "계속 진행하시겠습니까? (y/n)"
if ($confirm -ne "y") {
    Write-Host "❌ 작업이 취소되었습니다." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "🔥 라이선스 데이터 삭제 명령어를 전송합니다..." -ForegroundColor Yellow
Write-Host ""

# SSH 명령어 생성 (WP-CLI 우선 시도)
$sshCommand = @"
cd $wpPath && \
if command -v wp &> /dev/null; then \
  echo '✅ WP-CLI 사용 가능 - WP-CLI로 삭제합니다.' && \
  wp option delete elementor_pro_license_key --allow-root && \
  wp option delete _elementor_pro_license_data --allow-root && \
  wp option delete elementor_remote_info_library --allow-root && \
  echo '' && \
  echo '🔍 삭제 확인:' && \
  wp db query \"SELECT option_name FROM wp_options WHERE option_name LIKE '%elementor%license%';\" --allow-root; \
else \
  echo '⚠️  WP-CLI 없음 - MySQL 직접 접속 방법을 사용하세요.' && \
  echo '' && \
  echo '📋 wp-config.php에서 DB 정보 확인:' && \
  grep -E 'DB_NAME|DB_USER|DB_PASSWORD|DB_HOST' wp-config.php && \
  echo '' && \
  echo '💡 위 정보로 아래 명령어를 실행하세요:' && \
  echo 'mysql -h[호스트] -u[사용자] -p[비밀번호] [DB명] -e \"DELETE FROM wp_options WHERE option_name IN (''elementor_pro_license_key'', ''_elementor_pro_license_data'', ''elementor_remote_info_library''); SELECT option_name FROM wp_options WHERE option_name LIKE ''%elementor%license%'';\"'; \
fi
"@

# SSH 실행
Write-Host "🔌 SSH 접속 중..." -ForegroundColor Cyan
ssh -p $sshPort "$sshUser@$sshHost" $sshCommand

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "✅ 작업 완료!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "📌 다음 단계:" -ForegroundColor Yellow
Write-Host "1. 워드프레스 관리자 페이지 접속" -ForegroundColor White
Write-Host "2. Elementor > 도구 > 라이선스 재인증" -ForegroundColor White
Write-Host "3. 또는 라이선스 없이 사용 (Pro 기능 제한)" -ForegroundColor White
Write-Host ""

Read-Host "엔터를 눌러 종료하세요"


