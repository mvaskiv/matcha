<?php
try {
$dsn = 'mysql:host=localhost';
$user = 'root';
$password = '459512144';
  $conn = new PDO($dsn, $user, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $conn->exec("CREATE DATABASE IF NOT EXISTS matcha_db;");
  $conn->exec("Use matcha_db;");
  // $conn->exec("CREATE TABLE `user` (`f_name` VARCHAR(15), `l_name` VARCHAR(15),
  //     `u_name` VARCHAR(15), `gender` ENUM('M', 'F'), `sex_preference` ENUM('M', 'F'),
  //      `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `biography` TEXT, `tags` TEXT,
  //      `email` VARCHAR(50), `password` VARCHAR(50), `date` DATE, `active` INT(1) DEFAULT 0,
  //       `active_value` VARCHAR(50))");
  // $conn->exec("CREATE TABLE `fotos` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `id_user` INT,
  //               `all_foto` TEXT, `avatar` TEXT)");
  // $conn->exec("CREATE TABLE `notifications` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `id_user` INT,
  //     `text` TEXT, `new` int(1), `type` ENUM('like', 'like_back', 'dislike', 'new_msg', 'checked'),
  //     `from` INT,`date` DATETIME DEFAULT CURRENT_TIMESTAMP)");
  //  $conn->exec("CREATE TABLE `chats` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  //  `user1` INT, `user2` INT)");
  //  $conn->exec("CREATE TABLE `messages` (`chat_id` INT,
  //  `sender` INT, `recipient` INT, `date` DATETIME DEFAULT CURRENT_TIMESTAMP, `msg` TEXT)");
  //  $conn->exec("CREATE TABLE `black_list` (`id` INT, `blocked` INT)");
  //  $conn->exec("CREATE TABLE `u_likes` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `u1` INT, `u2` INT)");
  //  $conn->exec("CREATE TABLE `like_both` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `u1` INT, `u2` INT)");
  //  $conn->exec("CREATE TABLE `tags` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  //  `user_id` INT, `tags` TEXT)");
   $conn->exec("CREATE TABLE `fakeUser` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   `fake_id` INT, `report_id` INT, `num` INT)");
  echo "Connection sucssec\n";
} catch (PDOException $e) {
  echo 'Conection is fail ' . $e->getMessage();
}
 ?>
