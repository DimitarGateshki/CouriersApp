<?php
include 'config/Database.php';

$office_id = $_GET['office_id'];

$sql = "SELECT * FROM ofisi WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $office_id);
$stmt->execute();
$result = $stmt->get_result();
$office = $result->fetch_assoc();

$sql = "SELECT * FROM kurieri WHERE office_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $office_id);
$stmt->execute();
$result = $stmt->get_result();
$kurieri = [];
while($row = $result->fetch_assoc()) {
    $kurieri[] = $row;
}

$sql = "SELECT a.*, k.full_name FROM avtomobili a LEFT JOIN kurieri k ON a.kurier_id = k.id WHERE a.office_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $office_id);
$stmt->execute();
$result = $stmt->get_result();
$avtomobili = [];
while($row = $result->fetch_assoc()) {
    $avtomobili[] = $row;
}

echo json_encode([
    'office' => $office,
    'kurieri' => $kurieri,
    'avtomobili' => $avtomobili
]);
?>
