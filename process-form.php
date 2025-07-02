<?php
/**
 * OVERSEACE HITECH Form Processing Script
 * Handles contact forms and quote requests
 */

// Enable CORS for local development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get form data
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

// Validate required fields
$required_fields = ['name', 'email'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Field '$field' is required"]);
        exit();
    }
}

// Sanitize input data
function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

$name = sanitize_input($input['name']);
$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
$phone = isset($input['phone']) ? sanitize_input($input['phone']) : '';
$company = isset($input['company']) ? sanitize_input($input['company']) : '';
$subject = isset($input['subject']) ? sanitize_input($input['subject']) : 'Contact Form Submission';
$message = isset($input['message']) ? sanitize_input($input['message']) : '';

// Quote-specific fields
$services = isset($input['services']) ? $input['services'] : (isset($input['service']) ? [$input['service']] : []);
if (is_array($services)) {
    $services = array_map('sanitize_input', $services);
    $service = implode(', ', $services);
} else {
    $service = sanitize_input($services);
}

$origin = isset($input['origin']) ? sanitize_input($input['origin']) : '';
$destination = isset($input['destination']) ? sanitize_input($input['destination']) : '';
$cargo_type = isset($input['cargo-type']) ? sanitize_input($input['cargo-type']) : '';
$weight = isset($input['weight']) ? sanitize_input($input['weight']) : '';
$distance = isset($input['distance']) ? sanitize_input($input['distance']) : '';
$timeline = isset($input['timeline']) ? sanitize_input($input['timeline']) : '';
$details = isset($input['details']) ? sanitize_input($input['details']) : '';
$estimated_total = isset($input['estimated_total']) ? sanitize_input($input['estimated_total']) : '';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// Determine form type
$form_type = !empty($service) ? 'quote' : 'contact';

// Email configuration
$to_email = 'mudyhajixpro@gmail.com';
$from_email = 'noreply@overseace.com';

// Prepare email content
if ($form_type === 'quote') {
    $email_subject = "New Quote Request from $name";
    $email_body = "
    <html>
    <head>
        <title>New Quote Request</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #2563eb; }
            .value { margin-left: 10px; }
            .quote-section { background: #f8fafc; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h2>New Quote Request - OVERSEACE HITECH</h2>
        </div>
        <div class='content'>
            <h3>Client Information</h3>
            <div class='field'><span class='label'>Name:</span><span class='value'>$name</span></div>
            <div class='field'><span class='label'>Email:</span><span class='value'>$email</span></div>
            <div class='field'><span class='label'>Phone:</span><span class='value'>$phone</span></div>
            <div class='field'><span class='label'>Company:</span><span class='value'>$company</span></div>

            <div class='quote-section'>
                <h3>Service Requirements</h3>
                <div class='field'><span class='label'>Selected Services:</span><span class='value'>$service</span></div>
                <div class='field'><span class='label'>Origin:</span><span class='value'>$origin</span></div>
                <div class='field'><span class='label'>Destination:</span><span class='value'>$destination</span></div>
                <div class='field'><span class='label'>Cargo Type:</span><span class='value'>$cargo_type</span></div>
                <div class='field'><span class='label'>Weight:</span><span class='value'>$weight kg</span></div>
                <div class='field'><span class='label'>Distance:</span><span class='value'>$distance km</span></div>
                <div class='field'><span class='label'>Timeline:</span><span class='value'>$timeline</span></div>
                " . (!empty($estimated_total) ? "<div class='field'><span class='label'>Estimated Total:</span><span class='value'>$estimated_total</span></div>" : "") . "
            </div>

            " . (!empty($details) ? "<h3>Additional Details</h3><p>$details</p>" : "") . "

            <p><em>This quote request was submitted on " . date('Y-m-d H:i:s') . "</em></p>
        </div>
    </body>
    </html>";
} else {
    $email_subject = "New Contact Form Submission from $name";
    $email_body = "
    <html>
    <head>
        <title>Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #2563eb; }
            .value { margin-left: 10px; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h2>Contact Form Submission - OVERSEACE HITECH</h2>
        </div>
        <div class='content'>
            <div class='field'><span class='label'>Name:</span><span class='value'>$name</span></div>
            <div class='field'><span class='label'>Email:</span><span class='value'>$email</span></div>
            <div class='field'><span class='label'>Phone:</span><span class='value'>$phone</span></div>
            <div class='field'><span class='label'>Subject:</span><span class='value'>$subject</span></div>
            <div class='field'><span class='label'>Message:</span></div>
            <div style='background: #f8fafc; padding: 15px; border-left: 4px solid #2563eb; margin: 10px 0;'>
                $message
            </div>
            <p><em>This message was submitted on " . date('Y-m-d H:i:s') . "</em></p>
        </div>
    </body>
    </html>";
}

// Email headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: $from_email" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";

// Send email
$mail_sent = mail($to_email, $email_subject, $email_body, $headers);

// Log the submission (optional)
$log_entry = date('Y-m-d H:i:s') . " - $form_type submission from $name ($email)\n";
file_put_contents('form_submissions.log', $log_entry, FILE_APPEND | LOCK_EX);

// Return response
if ($mail_sent) {
    echo json_encode([
        'success' => true,
        'message' => $form_type === 'quote' ? 'Quote request sent successfully!' : 'Message sent successfully!',
        'form_type' => $form_type
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send message. Please try again or contact us directly.',
        'form_type' => $form_type
    ]);
}
?>
