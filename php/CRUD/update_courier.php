<?php
include 'includes/db_connect.php';

$id = $_POST['id'];
$personal_number = $_POST['personal_number'];
$username = $_POST['username'];
$password = $_POST['password'];
$full_name = $_POST['full_name'];
$phone = $_POST['phone'];

$sql = "UPDATE kurieri SET personal_number = ?, username = ?, password = ?, full_name = ?, phone = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $personal_number, $username, $password, $full_name, $phone, $id);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'id' => $id]);
} else {
    echo json_encode(['success' => false]);
}
?>
