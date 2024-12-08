<?php
// CORS headers to allow requests from different origins
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');  // Allow OPTIONS method
header('Access-Control-Allow-Headers: Content-Type');

// Handle the OPTIONS preflight request (required by CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // If the request is a preflight request, just return status 200
    http_response_code(200);
    exit;
}

// Path to the contact.txt (JSON file)
$file_path = './data/contact.txt';

// Handle GET request (fetch contact details)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($file_path)) {
        // Open the file in read mode
        $file = fopen($file_path, 'r');
        if ($file) {
            // Read the content of the file
            $content = fread($file, filesize($file_path));
            fclose($file);

            // Return the content as JSON
            echo $content;
        } else {
            echo json_encode(['error' => 'Failed to open file']);
        }
    } else {
        // Default values if file doesn't exist
        echo json_encode(['address' => '', 'email' => '', 'phone' => '']);
    }
    exit;
}

// Handle POST request (save contact details)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    // Check if the required fields are set
    if (isset($input['address']) && isset($input['email']) && isset($input['phone'])) {
        // Prepare the data to save as JSON
        $content = json_encode([
            'address' => $input['address'],
            'email' => $input['email'],
            'phone' => $input['phone']
        ]);

        // Open the file in write mode
        $file = fopen($file_path, 'w');
        if ($file) {
            // Write the content to the file
            fwrite($file, $content);
            fclose($file);
            echo json_encode(['message' => 'Content saved successfully.']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to open file for writing']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required']);
    }
    exit;
}

// Fallback for unsupported methods
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
