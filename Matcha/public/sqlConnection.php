<?php
try {
$dsn = 'mysql:unix_socket=/Users/dkalashn/Library/Containers/MAMP/mysql/tmp/mysql.sock;host=localhost;port=3306';
$user = 'root';
$password = '459512144';
  $conn = new PDO($dsn, $user, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connection sucssec\n";
} catch (PDOException $e) {
  echo 'Conection is fail ' . $e->getMessage();
}
 ?>
