# ============================================
# wp-config.php 자동 파싱 → MySQL One-Liner 생성기
# Trinity-Core Auto-Command Generator (PowerShell)
# ============================================

Write-Host "🚀 MySQL One-Liner 명령어 자동 생성기" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# SSH 접속 정보 입력
Write-Host "📌 원격 서버 정보를 입력하세요:" -ForegroundColor Yellow
$sshUser = Read-Host "SSH 사용자명"
$sshHost = Read-Host "SSH 서버 IP"
$sshPort = Read-Host "SSH 포트 (기본값: 22)"
if ([string]::IsNullOrWhiteSpace($sshPort)) { $sshPort = "22" }

$wpPath = Read-Host "워드프레스 경로 (예: /home/master/applications/appname/public_html)"

Write-Host ""
Write-Host "🔍 원격 서버에서 wp-config.php 정보 추출 중..." -ForegroundColor Yellow
Write-Host ""

# SSH로 원격 서버에서 DB 정보 추출
$extractCommand = @"
cd $wpPath && grep -E 'DB_NAME|DB_USER|DB_PASSWORD|DB_HOST' wp-config.php | grep -v '//' | sed 's/.*'\''\(.*\)'\''.*/\1/'
"@

try {
    $dbInfo = ssh -p $sshPort "$sshUser@$sshHost" $extractCommand
    
    # 추출된 정보 파싱 (순서: DB_NAME, DB_USER, DB_PASSWORD, DB_HOST)
    $dbValues = $dbInfo -split "`n" | Where-Object { $_.Trim() -ne "" }
    
    if ($dbValues.Count -ge 4) {
        $dbName = $dbValues[0].Trim()
        $dbUser = $dbValues[1].Trim()
        $dbPassword = $dbValues[2].Trim()
        $dbHost = $dbValues[3].Trim()
        
        Write-Host "============================================" -ForegroundColor Green
        Write-Host "✅ DB 정보 추출 완료!" -ForegroundColor Green
        Write-Host "============================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "DB Name: $dbName" -ForegroundColor White
        Write-Host "DB User: $dbUser" -ForegroundColor White
        Write-Host "DB Host: $dbHost" -ForegroundColor White
        Write-Host "DB Password: [보안상 숨김]" -ForegroundColor DarkGray
        Write-Host ""
        Write-Host "============================================" -ForegroundColor Cyan
        Write-Host "🔥 복사해서 실행할 명령어:" -ForegroundColor Cyan
        Write-Host "============================================" -ForegroundColor Cyan
        Write-Host ""
        
        # One-Liner 명령어 생성
        $mysqlCommand = "mysql -h`"$dbHost`" -u`"$dbUser`" -p`"$dbPassword`" `"$dbName`" -e `"DELETE FROM wp_options WHERE option_name IN ('elementor_pro_license_key', '_elementor_pro_license_data', 'elementor_remote_info_library'); SELECT option_name, LEFT(option_value, 30) as preview FROM wp_options WHERE option_name LIKE '%elementor%license%' OR option_name LIKE '%elementor%remote%';`""
        
        Write-Host $mysqlCommand -ForegroundColor Yellow
        Write-Host ""
        Write-Host "============================================" -ForegroundColor Cyan
        Write-Host ""
        
        # 클립보드에 복사
        $mysqlCommand | Set-Clipboard
        Write-Host "✅ 명령어가 클립보드에 복사되었습니다!" -ForegroundColor Green
        Write-Host "📌 SSH 접속 후 Ctrl+V로 붙여넣기 하세요." -ForegroundColor Yellow
        Write-Host ""
        
        # 즉시 실행 옵션
        Write-Host "💡 지금 바로 실행하시겠습니까? (y/n)" -ForegroundColor Yellow
        $execute = Read-Host
        
        if ($execute -eq "y") {
            Write-Host ""
            Write-Host "🚀 명령어 실행 중..." -ForegroundColor Cyan
            ssh -p $sshPort "$sshUser@$sshHost" $mysqlCommand
            Write-Host ""
            Write-Host "✅ 완료!" -ForegroundColor Green
        }
        
    } else {
        Write-Host "❌ DB 정보 추출 실패!" -ForegroundColor Red
        Write-Host "💡 수동으로 확인하세요:" -ForegroundColor Yellow
        Write-Host $dbInfo -ForegroundColor White
    }
    
} catch {
    Write-Host "❌ SSH 접속 실패: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 아래 템플릿을 사용하여 수동으로 입력하세요:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "mysql -h`"[호스트]`" -u`"[사용자]`" -p`"[비밀번호]`" `"[DB명]`" -e `"DELETE FROM wp_options WHERE option_name IN ('elementor_pro_license_key', '_elementor_pro_license_data', 'elementor_remote_info_library'); SELECT option_name FROM wp_options WHERE option_name LIKE '%elementor%license%';`"" -ForegroundColor Gray
}

Write-Host ""
Read-Host "엔터를 눌러 종료하세요"


