<?php
/**
 * OVERSEACE HITECH Configuration File
 * Contains email settings and other configuration options
 */

// Email Configuration
define('ADMIN_EMAIL', 'mudyhajixpro@gmail.com');
define('FROM_EMAIL', 'noreply@overseace.com');
define('COMPANY_NAME', 'OVERSEACE HITECH INDUSTRIAL COMPANY LIMITED');

// Database Configuration (for future use)
define('DB_HOST', 'localhost');
define('DB_NAME', 'overseace_db');
define('DB_USER', 'overseace_user');
define('DB_PASS', 'secure_password');

// Site Configuration
define('SITE_URL', 'https://overseace.com');
define('SITE_NAME', 'OVERSEACE HITECH');

// Security Settings
define('ENABLE_CSRF_PROTECTION', true);
define('MAX_FORM_SUBMISSIONS_PER_HOUR', 10);

// Logging
define('ENABLE_LOGGING', true);
define('LOG_FILE', 'form_submissions.log');

// Email Templates
define('EMAIL_TEMPLATE_PATH', 'email_templates/');

// File Upload Settings (for future use)
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_FILE_TYPES', ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png']);

// Rate Limiting
define('RATE_LIMIT_ENABLED', true);
define('RATE_LIMIT_REQUESTS', 5);
define('RATE_LIMIT_WINDOW', 300); // 5 minutes

// Development Settings
define('DEBUG_MODE', false);
define('DISPLAY_ERRORS', false);

// Timezone
date_default_timezone_set('Africa/Dar_es_Salaam');

// Error Reporting
if (DEBUG_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}
?>
