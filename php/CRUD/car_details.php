<?php
include 'includes/db_connect.php';

$kurier_id = $_GET['kurier_id'];

$sql = "SELECT id, personal_number, username, password, full_name, phone FROM kurieri WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $kurier_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $kurier = $result->fetch_assoc();
    echo json_encode(['success' => true, 'kurier' => $kurier]);
} else {
    echo json_encode(['success' => false, 'message' => 'Куриерът не е намерен']);
}

$stmt->close();
$conn->close();
?>
