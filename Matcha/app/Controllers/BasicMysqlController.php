<?php

namespace App\Controllers;

use PDO;

class BasicMysqlController{
  protected $dsn = 'mysql:host=localhost;dbname=matcha_db';
  protected $user = 'root';
  protected $password = '459512144';
  protected $conn;

  function __construct(){
    $this->init();
  }

  protected function init(){
    $this->conn = new PDO($this->dsn, $this->user, $this->password);
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }
}
