<?php
include 'config/Database.php';

$id = $_POST['id'];
$marka = $_POST['marka'];
$model = $_POST['model'];
$reg_number = $_POST['reg_number'];
$fuel_consumption = $_POST['fuel_consumption'];

$sql = "UPDATE avtomobili SET marka = ?, model = ?, reg_number = ?, fuel_consumption = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssdi", $marka, $model, $reg_number, $fuel_consumption, $id);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'id' => $id]);
} else {
    echo json_encode(['success' => false]);
}
?>
