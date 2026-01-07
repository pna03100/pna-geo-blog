/**
 * ============================================================================
 * SAFE VERSION: Elementor Safe Mode Fix for Headless WordPress
 * ============================================================================
 * [Strategy] Minimal intervention to prevent Headless redirects
 * [Security] Defensive coding with error handling
 * [Implementation] Step-by-step testable approach
 * 
 * USAGE: Copy ONLY the code you need (Step 1, 2, or 3) to functions.php
 * DO NOT include the opening <?php tag if your file already has it!
 * ============================================================================
 */

// ============================================================================
// STEP 1: MINIMAL SAFE MODE FIX (Start with this)
// ============================================================================

add_action('plugins_loaded', function() {
    // Only run if Elementor is installed and active
    if (!did_action('elementor/loaded')) {
        return;
    }

    // Check if we're in Elementor context
    if (isset($_GET['elementor-preview']) || 
        isset($_GET['elementor_library']) || 
        (isset($_GET['action']) && $_GET['action'] === 'elementor')) {
        
        // Remove WPGraphQL Headless frontend redirect
        remove_action('template_redirect', 'faustwp_handle_frontend_request', 0);
        
        // Force proper headers for iframe
        add_action('send_headers', function() {
            if (!headers_sent()) {
                header('X-Frame-Options: SAMEORIGIN');
                header('Content-Security-Policy: frame-ancestors \'self\'');
            }
        }, 1);
    }
}, 999);


// ============================================================================
// STEP 2: ENHANCED FIX (Use if Step 1 doesn't work)
// ============================================================================

add_action('init', function() {
    // Early exit if not Elementor context
    if (!isset($_GET['elementor-preview']) && 
        !isset($_GET['elementor_library']) && 
        (!isset($_GET['action']) || $_GET['action'] !== 'elementor')) {
        return;
    }

    // Prevent Headless redirects
    if (function_exists('remove_action')) {
        // FaustWP redirects
        remove_action('template_redirect', 'faustwp_handle_frontend_request', 0);
        remove_filter('home_url', 'faustwp_filter_site_url');
        remove_filter('site_url', 'faustwp_filter_site_url');
        
        // Generic Headless redirects
        remove_all_actions('wp_frontend_request');
        remove_all_filters('redirect_canonical');
    }

    // Force CMS domain in preview links
    add_filter('preview_post_link', function($url) {
        // Replace frontend domain with CMS domain
        $url = str_replace('pnamarketing.co.kr', 'cms.pnamarketing.co.kr', $url);
        return $url;
    }, 999);

    // Proper CORS headers
    add_action('send_headers', function() {
        if (!headers_sent()) {
            header('X-Frame-Options: SAMEORIGIN');
            header('Content-Security-Policy: frame-ancestors \'self\' https://cms.pnamarketing.co.kr');
            header('X-Content-Type-Options: nosniff');
            header_remove('Access-Control-Allow-Origin');
        }
    }, 1);
    
}, 1);


// ============================================================================
// STEP 3: MAXIMUM PROTECTION (Nuclear option - use only if 1 & 2 fail)
// ============================================================================

add_action('plugins_loaded', function() {
    if (!did_action('elementor/loaded')) {
        return;
    }

    // Detect Elementor context with multiple checks
    $is_elementor = false;
    
    if (isset($_GET['elementor-preview']) || 
        isset($_GET['elementor_library']) ||
        (isset($_GET['action']) && in_array($_GET['action'], ['elementor', 'elementor_ajax']))) {
        $is_elementor = true;
    }

    // Check if Elementor Plugin class exists and is in preview mode
    if (!$is_elementor && class_exists('\Elementor\Plugin')) {
        try {
            $elementor = \Elementor\Plugin::instance();
            if (isset($elementor->preview) && method_exists($elementor->preview, 'is_preview_mode')) {
                $is_elementor = $elementor->preview->is_preview_mode();
            }
        } catch (Exception $e) {
            // Silently fail - don't break the site
            error_log('Elementor Safe Mode Fix Error: ' . $e->getMessage());
        }
    }

    if (!$is_elementor) {
        return;
    }

    // Kill all known Headless redirects
    $headless_hooks = [
        'faustwp_handle_frontend_request',
        'wpgraphql_headless_frontend_redirect',
    ];

    foreach ($headless_hooks as $hook) {
        if (function_exists('remove_action')) {
            remove_action('template_redirect', $hook, 0);
            remove_action('template_redirect', $hook, 10);
            remove_action('wp', $hook, 0);
        }
    }

    // Force URLs to CMS domain
    add_filter('preview_post_link', function($url, $post) {
        $cms_domain = 'cms.pnamarketing.co.kr';
        $frontend_domain = 'pnamarketing.co.kr';
        
        // Replace frontend with CMS
        $url = str_replace($frontend_domain, $cms_domain, $url);
        
        // Ensure elementor-preview parameter is present
        if (!strpos($url, 'elementor-preview')) {
            $url = add_query_arg('elementor-preview', $post->ID, $url);
        }
        
        return $url;
    }, 9999, 2);

    // Critical headers for iframe loading
    add_action('send_headers', function() {
        if (!headers_sent()) {
            // Allow same-origin iframe
            header('X-Frame-Options: SAMEORIGIN');
            
            // CSP for iframe ancestors
            header('Content-Security-Policy: frame-ancestors \'self\' https://cms.pnamarketing.co.kr');
            
            // Prevent MIME sniffing
            header('X-Content-Type-Options: nosniff');
            
            // Remove conflicting CORS headers
            header_remove('Access-Control-Allow-Origin');
            
            // Ensure proper content type
            header('Content-Type: text/html; charset=UTF-8');
        }
    }, 1);

    // Disable admin bar in preview (reduces conflicts)
    add_filter('show_admin_bar', '__return_false');
    
    // Disable Query Monitor if active
    add_filter('qm/dispatch/html', '__return_false');

}, 999);


// ============================================================================
// DEBUGGING HELPER (Optional - shows when fix is active)
// ============================================================================

add_action('admin_notices', function() {
    if (isset($_GET['elementor-preview']) || 
        (isset($_GET['action']) && $_GET['action'] === 'elementor')) {
        
        echo '<div class="notice notice-success is-dismissible">';
        echo '<p><strong>✅ Elementor Safe Mode Fix Active</strong> - Headless redirects disabled for this editor session.</p>';
        echo '</div>';
    }
});





