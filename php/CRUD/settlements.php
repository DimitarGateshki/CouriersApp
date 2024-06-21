<?php
include 'includes/db_connect.php';

$sql = "SELECT * FROM naseleni_mesta";
$result = $conn->query($sql);
$naseleniMesta = [];
while($row = $result->fetch_assoc()) {
    $naseleniMesta[] = $row;
}
echo json_encode($naseleniMesta);
?>
