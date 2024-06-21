<?php
include 'includes/db_connect.php';

$naseleno_myasto_id = $_GET['naseleno_myasto_id'];
$sql = "SELECT * FROM ofisi WHERE naseleno_myasto_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $naseleno_myasto_id);
$stmt->execute();
$result = $stmt->get_result();
$offices = [];
while($row = $result->fetch_assoc()) {
    $offices[] = $row;
}
echo json_encode($offices);
?>
