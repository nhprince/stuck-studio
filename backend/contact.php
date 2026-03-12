<?php
/**
 * Stuck Studio — Contact Form PHP Backend
 *
 * Deploy this file to your PHP-enabled hosting server.
 * Set $recipientEmail to the address you want to receive messages.
 * The frontend (Contact.tsx) should POST to the public URL of this file.
 *
 * Requirements: PHP 7.4+, mail() configured on server (or use PHPMailer/SMTP instead)
 */

// ─── CORS Headers ───────────────────────────────────────────────────────────
// Change the allowed origin to your production domain before deploying.
$allowedOrigins = [
    'http://localhost:3000',
    'https://stuckstudio.com',       // update with your real domain
    'https://www.stuckstudio.com',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ─── Only accept POST ────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// ─── Config ─────────────────────────────────────────────────────────────────
$recipientEmail = 'info@stuckstudio.com'; // Change to your email
$recipientName  = 'Stuck Studio';

// ─── Parse JSON body ─────────────────────────────────────────────────────────
$rawBody = file_get_contents('php://input');
$data    = json_decode($rawBody, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON body.']);
    exit;
}

// ─── Validate & Sanitize ─────────────────────────────────────────────────────
$name    = trim(strip_tags($data['name']    ?? ''));
$email   = trim(strip_tags($data['email']   ?? ''));
$service = trim(strip_tags($data['service'] ?? ''));
$message = trim(strip_tags($data['message'] ?? ''));

$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Name must be at least 2 characters.';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}
if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Message must be at least 10 characters.';
}

// Basic spam honeypot check (add a hidden field named "website" in your form)
if (!empty($data['website'])) {
    // Silently succeed to confuse bots
    echo json_encode(['success' => true, 'message' => 'Message sent!']);
    exit;
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// ─── Rate Limiting (simple session-based) ────────────────────────────────────
session_start();
$now          = time();
$cooldownSecs = 60; // 1 message per minute per session

if (isset($_SESSION['last_contact_time']) && ($now - $_SESSION['last_contact_time']) < $cooldownSecs) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Please wait a moment before sending another message.']);
    exit;
}

// ─── Build Email ─────────────────────────────────────────────────────────────
$subject = "New Contact from Stuck Studio Website — {$name}";

$body  = "You have received a new contact form submission:\n\n";
$body .= "Name:    {$name}\n";
$body .= "Email:   {$email}\n";
if ($service) {
    $body .= "Service: {$service}\n";
}
$body .= "\nMessage:\n{$message}\n\n";
$body .= "---\nSent from stuckstudio.com contact form";

$headers  = "From: Stuck Studio Website <noreply@stuckstudio.com>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ─── Send Email ──────────────────────────────────────────────────────────────
$mailSent = mail($recipientEmail, $subject, $body, $headers);

if ($mailSent) {
    $_SESSION['last_contact_time'] = $now;
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => "Thanks {$name}! We'll get back to you within 24 hours."]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Email failed to send. Please contact us directly via WhatsApp.']);
}
