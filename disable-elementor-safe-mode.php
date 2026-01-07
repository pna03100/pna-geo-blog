<?php
/**
 * Elementor 안전 모드 강제 비활성화
 * 
 * 사용 방법:
 * 1. WordPress 관리자 > 플러그인 > 새로 추가
 * 2. "Code Snippets" 검색 후 설치/활성화
 * 3. Snippets > Add New
 * 4. 아래 코드를 붙여넣고 "Save Changes and Activate"
 * 5. 페이지를 새로고침하면 안전 모드가 해제됩니다
 */

// 방법 1: 안전 모드 쿠키 삭제
add_action('init', function() {
    if (isset($_COOKIE['elementor_safe_mode'])) {
        setcookie('elementor_safe_mode', '', time() - 3600, '/');
        unset($_COOKIE['elementor_safe_mode']);
    }
});

// 방법 2: 안전 모드 URL 파라미터 강제 제거
add_filter('elementor/editor/localize_settings', function($settings) {
    if (isset($settings['initial_document']['safe_mode'])) {
        $settings['initial_document']['safe_mode'] = false;
    }
    return $settings;
});

// 방법 3: 안전 모드 JavaScript 변수 강제 비활성화
add_action('elementor/editor/before_enqueue_scripts', function() {
    echo '<script>window.elementorCommon = window.elementorCommon || {}; window.elementorCommon.config = window.elementorCommon.config || {}; window.elementorCommon.config.isEditorMode = true;</script>';
});

// 방법 4: 세션에서 안전 모드 플래그 제거
add_action('admin_init', function() {
    if (isset($_GET['action']) && $_GET['action'] === 'elementor') {
        // 안전 모드 관련 옵션 삭제
        delete_user_meta(get_current_user_id(), '_elementor_safe_mode');
        delete_transient('elementor_safe_mode_' . get_current_user_id());
    }
});

// 디버그 메시지 (확인용)
add_action('admin_notices', function() {
    if (isset($_GET['action']) && $_GET['action'] === 'elementor') {
        echo '<div class="notice notice-success is-dismissible"><p>✅ Elementor 안전 모드가 비활성화되었습니다.</p></div>';
    }
});








