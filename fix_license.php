<?php
/**
 * Elementor Pro License Data Cleanup Script
 * 
 * [Security] WordPress API 사용으로 SQL Injection 방지
 * [Implementation] delete_option()으로 안전한 데이터 삭제
 * 
 * ⚠️ 경고: 이 파일은 실행 후 즉시 삭제하세요!
 */

// WordPress 환경 로드
$wp_load_path = '../wp-load.php'; // WordPress 설치 경로에 맞게 조정 필요

if (!file_exists($wp_load_path)) {
    die('❌ 오류: wp-load.php 파일을 찾을 수 없습니다. 경로를 확인하세요: ' . $wp_load_path);
}

require_once($wp_load_path);

// 보안: WordPress 환경이 제대로 로드되었는지 확인
if (!function_exists('delete_option')) {
    die('❌ 오류: WordPress 환경이 제대로 로드되지 않았습니다.');
}

echo '<h2>🔧 Elementor Pro 라이선스 데이터 정리 스크립트</h2>';
echo '<hr>';

// [Security] WordPress API를 사용한 안전한 삭제 (Raw SQL 사용 안 함)
$results = [];

// 1. elementor_pro_license_key 삭제
$deleted_key = delete_option('elementor_pro_license_key');
$results[] = [
    'option' => 'elementor_pro_license_key',
    'success' => $deleted_key,
    'message' => $deleted_key ? '✅ 삭제 완료' : '⚠️ 항목이 존재하지 않거나 이미 삭제됨'
];

// 2. _elementor_pro_license_data 삭제
$deleted_data = delete_option('_elementor_pro_license_data');
$results[] = [
    'option' => '_elementor_pro_license_data',
    'success' => $deleted_data,
    'message' => $deleted_data ? '✅ 삭제 완료' : '⚠️ 항목이 존재하지 않거나 이미 삭제됨'
];

// 결과 출력
echo '<table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%; max-width: 600px;">';
echo '<thead><tr><th>옵션 이름</th><th>상태</th></tr></thead>';
echo '<tbody>';

foreach ($results as $result) {
    echo '<tr>';
    echo '<td><code>' . esc_html($result['option']) . '</code></td>';
    echo '<td>' . $result['message'] . '</td>';
    echo '</tr>';
}

echo '</tbody>';
echo '</table>';

echo '<hr>';
echo '<h3>✅ 삭제 완료</h3>';
echo '<p><strong style="color: red;">⚠️ 보안 경고:</strong> 이 파일(<code>fix_license.php</code>)을 즉시 삭제하세요!</p>';
echo '<p>다음 명령어로 삭제할 수 있습니다:</p>';
echo '<pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;">rm fix_license.php</pre>';
echo '<p>또는 FTP/파일 매니저에서 수동으로 삭제하세요.</p>';


