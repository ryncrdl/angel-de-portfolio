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
$file_path = './data/experience.txt';

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

// Handle POST request (save new experience data)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    // Check if the required fields are set
    if (isset($input['title'], $input['company'], $input['address'], $input['type'], $input['dates'])) {
        $experience = getExperienceData();
        $newExperience = [
            'id' => count($experience),  // Auto-generate ID based on array count
            'title' => $input['title'],
            'company' => $input['company'],
            'address' => $input['address'],
            'type' => $input['type'],
            'dates' => $input['dates'],
        ];

        // Add the new experience to the array
        $experience[] = $newExperience;

        // Save the updated data back to the file
        file_put_contents($file_path, json_encode($experience));
        echo json_encode(['message' => 'Experience added successfully.']);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required']);
    }
    exit;
}

// Handle DELETE request (delete specific experience by ID)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);
    $idToDelete = $input['id'] ?? null;

    if ($idToDelete !== null) {
        $experience = getExperienceData();
        if (isset($experience[$idToDelete])) {
            // Remove the experience from the array
            unset($experience[$idToDelete]);
            // Reindex the array to avoid gaps in the keys
            $experience = array_values($experience);

            // Save the updated data back to the file
            file_put_contents($file_path, json_encode($experience));
            echo json_encode(['message' => 'Experience deleted successfully.']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Experience not found']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request']);
    }
    exit;
}

// Handle PUT request (update specific experience by ID)
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $idToUpdate = $input['id'] ?? null;

    if ($idToUpdate !== null) {
        $experience = getExperienceData();
        if (isset($experience[$idToUpdate])) {
            // Update the specific experience data
            $experience[$idToUpdate] = array_merge($experience[$idToUpdate], $input);

            // Save the updated data back to the file
            file_put_contents($file_path, json_encode($experience));
            echo json_encode(['message' => 'Experience updated successfully.']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Experience not found']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request']);
    }
    exit;
}

// Fallback for unsupported methods
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
