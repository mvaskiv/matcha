<?php
try {
$dsn = 'mysql:host=localhost';
$user = 'root';
$password = '459512144';
  $conn = new PDO($dsn, $user, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $conn->exec("CREATE DATABASE IF NOT EXISTS matcha_db;");
  $conn->exec("Use matcha_db;");
  $conn->exec("CREATE TABLE `User` (f_name VARCHAR(15), l_name VARCHAR(15),
      u_name VARCHAR(15), gender ENUM('M', 'F'), sex_preference ENUM('M', 'F'),
       id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, biography VARCHAR(8064))");
  echo "Connection sucssec\n";
} catch (PDOException $e) {
  echo 'Conection is fail ' . $e->getMessage();
}
 ?>