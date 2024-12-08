<?php
// CORS headers to allow requests from different origins
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Allow preflight request
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(200); // Respond with OK
    exit;
}

// Path to the experience.txt (JSON file)
$file_path = './data/skills.txt';

// Fetch experience data
function getExperienceData()
{
    global $file_path;
    if (file_exists($file_path)) {
        $content = file_get_contents($file_path);
        return json_decode($content, true); // Return as an array
    }
    return [];
}

// Handle GET request (fetch experience data)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $experience = getExperienceData();
    echo json_encode($experience);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Add a new skill
    $input = json_decode(file_get_contents('php://input'), true);
    $skills = getExperienceData();
    $input['id'] = count($skills); // Auto-increment ID
    $skills[] = $input;
    file_put_contents($file_path, json_encode($skills));
    echo json_encode(['message' => 'Skill added successfully']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Update an existing skill
    $input = json_decode(file_get_contents('php://input'), true);
    $skills = getExperienceData();
    foreach ($skills as &$skill) {
        if ($skill['id'] == $input['id']) {
            $skill = array_merge($skill, $input);
            file_put_contents($file_path, json_encode($skills));
            echo json_encode(['message' => 'Skill updated successfully']);
            exit;
        }
    }
    http_response_code(404);
    echo json_encode(['error' => 'Skill not found']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Delete a skill
    $input = json_decode(file_get_contents('php://input'), true);
    $skills = getExperienceData();
    $skills = array_filter($skills, fn($skill) => $skill['id'] !== $input['id']);
    file_put_contents($file_path, json_encode($skills));
    echo json_encode(['message' => 'Skill deleted successfully']);
    exit;
}

// Fallback for unsupported methods
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
