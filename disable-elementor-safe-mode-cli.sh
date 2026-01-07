#!/bin/bash
# ============================================
# Elementor 안전모드 완전 비활성화 (WP-CLI)
# SSH로 WordPress 서버 접속 후 실행
# ============================================

echo "🔧 Elementor 안전모드 제거 시작..."

# 1. 안전모드 플래그 제거
wp option delete elementor_safe_mode --allow-root
echo "✅ 안전모드 플래그 제거"

# 2. 라이센스 관련 옵션 제거
wp option delete elementor_pro_license_key --allow-root
wp option delete _elementor_pro_license_data --allow-root
echo "✅ 라이센스 데이터 제거"

# 3. Elementor 캐시 완전 삭제
wp transient delete --all --allow-root
echo "✅ 캐시 삭제"

# 4. Elementor 재생성
wp elementor flush-css --allow-root
echo "✅ CSS 재생성"

# 5. 확인
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 현재 상태 확인:"
wp option list --search="elementor*safe*" --allow-root
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ 완료! WordPress 관리자 페이지를 새로고침하세요."






