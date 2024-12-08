<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Path to portfolio.txt file
$file_path = './data/portfolio.txt';

// Get portfolio data
function getPortfolioData()
{
    global $file_path;
    if (file_exists($file_path)) {
        $content = file_get_contents($file_path);
        return json_decode($content, true) ?: [];
    }
    return [];
}

// Save portfolio data
function savePortfolioData($data)
{
    global $file_path;
    file_put_contents($file_path, json_encode($data, JSON_PRETTY_PRINT));
}

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(getPortfolioData());
    exit;
}

// Handle POST (add new item)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $portfolio = getPortfolioData();
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $key_features = $_POST['key_features'] ?? '';
    $image = '';

    // Handle file upload
    if (!empty($_FILES['image'])) {
        $target_dir = './uploads/';
        $file_name = basename($_FILES['image']['name']);
        $target_file = $target_dir . $file_name;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
            $image = $target_file;
        }
    }

    // Add new portfolio item
    $portfolio[] = [
        'id' => count($portfolio),
        'title' => $title,
        'description' => $description,
        'key_features' => $key_features,
        'image' => $image
    ];

    savePortfolioData($portfolio);
    echo json_encode(['message' => 'Portfolio item added']);
    exit;
}

// Handle PUT (update item)
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Get the raw data from the request body
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? null;
    $portfolio = getPortfolioData();

    if ($id !== null && isset($portfolio[$id])) {
        // If a new image is provided, update it; otherwise, keep the old image
        if (isset($_FILES['image']) && !empty($_FILES['image']['name'])) {
            // Handle file upload for the new image
            $target_dir = './uploads/';
            $file_name = basename($_FILES['image']['name']);
            $target_file = $target_dir . $file_name;

            if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
                $input['image'] = $target_file;
            }
        } else {
            // Keep the old image if no new one is uploaded
            $input['image'] = $portfolio[$id]['image'];
        }

        // Merge the rest of the updated data
        $portfolio[$id] = array_merge($portfolio[$id], $input);

        // Save the updated portfolio
        savePortfolioData($portfolio);

        echo json_encode(['message' => 'Portfolio item updated']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Item not found']);
    }
    exit;
}

// Handle DELETE (delete item)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get the 'id' from the query string (not from the body)
    $id = $_GET['id'] ?? null;
    $portfolio = getPortfolioData();

    if ($id !== null && isset($portfolio[$id])) {
        // Get the image path of the item to be deleted
        $imagePath = $portfolio[$id]['image'];

        // Remove the portfolio item from the array
        unset($portfolio[$id]);
        $portfolio = array_values($portfolio); // Reindex the array

        // Delete the image file if it exists
        if (!empty($imagePath) && file_exists($imagePath)) {
            unlink($imagePath);
        }

        // Write the updated portfolio back to the file
        savePortfolioData($portfolio);

        echo json_encode(['message' => 'Portfolio item deleted']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Item not found']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
