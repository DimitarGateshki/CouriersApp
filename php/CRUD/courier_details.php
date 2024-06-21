<?php
include 'config/Database.php';

$avtomobil_id = $_GET['avtomobil_id'];

$sql = "SELECT id, marka, model, reg_number, fuel_consumption FROM avtomobili WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $avtomobil_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $avtomobil = $result->fetch_assoc();
    echo json_encode(['success' => true, 'avtomobil' => $avtomobil]);
} else {
    echo json_encode(['success' => false, 'message' => 'Автомобилът не е намерен']);
}

$stmt->close();
$conn->close();
?>
