<?php
include 'config/Database.php';

$id = $_POST['id'];
$name = $_POST['name'];
$manager = $_POST['manager'];
$address = $_POST['address'];
$phone = $_POST['phone'];
$working_hours = $_POST['working_hours'];

$sql = "UPDATE ofisi SET name = ?, manager = ?, address = ?, phone = ?, working_hours = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $name, $manager, $address, $phone, $working_hours, $id);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'id' => $id]);
} else {
    echo json_encode(['success' => false]);
}
?>
