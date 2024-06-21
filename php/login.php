<?php
session_start();
include 'config/Database.php';

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM kurieri WHERE username = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

$response = ['success' => false];
if ($user) {
    $_SESSION['user_id'] = $user['id'];
    $response['success'] = true;
}
echo json_encode($response);
?>
