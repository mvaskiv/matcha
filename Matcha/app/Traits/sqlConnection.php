<?php

namespace App\Traits;

use PDO;

trait sqlConnection{

  protected $conn;

    protected function init(){
      $this->conn = new PDO('mysql:host=localhost;dbname=matcha_db', 'root', '459512144');
      $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    protected function execUpdateInsert($sql, array $param){
        $stmt = $this->conn->prepare($sql);
        $stmt->execute($param);
    }

    protected function execSelect($sql, array $param){
      $stmt = $this->conn->prepare($sql);
      $stmt->execute($param);
      if (!$stmt)
        return (array());
      return ($stmt->fetchAll());
    }
  }
