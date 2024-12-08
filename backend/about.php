<?php
// CORS headers to allow requests from different origins
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Path to the .txt file
$file_path = './data/about.txt';

// Handle OPTIONS request (preflight for CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Handle GET request (fetch content)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($file_path)) {
        // Open the file in read mode
        $file = fopen($file_path, 'r');
        if ($file) {
            // Read the content of the file
            $content = fread($file, filesize($file_path));
            fclose($file);
            echo json_encode(['content' => $content]);
        } else {
            echo json_encode(['error' => 'Failed to open file']);
        }
    } else {
        echo json_encode(['content' => '']);
    }
    exit;
}

// Handle POST request (save content)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['content'])) {
        // Open the file in write mode
        $file = fopen($file_path, 'w');
        if ($file) {
            // Write the content to the file
            fwrite($file, $input['content']);
            fclose($file);
            echo json_encode(['message' => 'Content saved successfully.']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to open file for writing']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Content is required']);
    }
    exit;
}

// Fallback for unsupported methods
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
