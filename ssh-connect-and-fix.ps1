# Cloudways SSH 접속 및 WP-CLI 자동 실행 스크립트
# Windows PowerShell에서 실행하세요

Write-Host "🔐 Cloudways SSH 접속 및 Elementor 라이선스 삭제" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# 사용자 입력 받기
Write-Host "📋 Cloudways 접속 정보를 입력하세요:" -ForegroundColor Yellow
Write-Host "   (Cloudways 대시보드 > Access Details에서 확인)" -ForegroundColor Gray
Write-Host ""

$sshHost = Read-Host "SSH Host (예: server-123456.cloudwaysapps.com)"
$sshUser = Read-Host "SSH User (기본값: master, 엔터 입력)"
if ([string]::IsNullOrWhiteSpace($sshUser)) {
    $sshUser = "master"
}

Write-Host ""
Write-Host "🚀 SSH 접속 시작..." -ForegroundColor Green
Write-Host "   (비밀번호를 입력하라는 메시지가 나오면 Cloudways 비밀번호를 붙여넣기 하세요)" -ForegroundColor Gray
Write-Host ""

# SSH 명령어 생성
$sshCommand = @"
# Step 1: WordPress 경로 찾기
echo '🔍 Step 1: WordPress 경로 찾기...'
WP_PATH=`$(find /home -name wp-config.php 2>/dev/null | head -1 | xargs dirname)
echo \"✅ WordPress 경로: `$WP_PATH\"
cd \"`$WP_PATH\"

# Step 2: 라이선스 삭제
echo ''
echo '🔥 Step 2: Elementor 라이선스 삭제...'
wp option delete elementor_pro_license_key --allow-root 2>/dev/null || echo '  (이미 없음)'
wp option delete _elementor_pro_license_data --allow-root 2>/dev/null || echo '  (이미 없음)'
wp option delete elementor_remote_info_library --allow-root 2>/dev/null || echo '  (이미 없음)'
wp option delete elementor_safe_mode --allow-root 2>/dev/null || echo '  (이미 없음)'

# Step 3: 캐시 비우기
echo ''
echo '🧹 Step 3: 캐시 비우기...'
wp transient delete --all --allow-root
wp cache flush --allow-root

# Step 4: 확인
echo ''
echo '✅ Step 4: 삭제 확인...'
wp option get elementor_pro_license_key --allow-root 2>&1 | grep -q 'Could not get' && echo '✅ 완벽하게 삭제됨!' || echo '⚠️  아직 존재함'

echo ''
echo '🎉 완료! Ctrl+D로 SSH 종료하세요.'
"@

# SSH 실행
ssh "$sshUser@$sshHost" $sshCommand

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ 스크립트 실행 완료!" -ForegroundColor Green
Write-Host ""
Write-Host "📌 다음 단계:" -ForegroundColor Yellow
Write-Host "   1. WordPress 관리자 페이지 접속" -ForegroundColor White
Write-Host "   2. Elementor > 도구 메뉴 확인" -ForegroundColor White
Write-Host "   3. 안전 모드가 OFF 되어 있는지 확인" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

