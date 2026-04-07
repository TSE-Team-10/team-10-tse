<?php
$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "";

$conn = new mysqli($servername, $username, $password, $dbname); //Creates new connection

//Checks connection
if ($conn->connect_error) {  
    die("Connection status : False : " . $conn->connect_error);
}
echo "Connection status : Vaild "
?>