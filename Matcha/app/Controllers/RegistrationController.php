<?php

namespace App\Controllers;

use App\Controllers\BasicMysqlController;

class RegistrationController extends BasicMysqlController {
    public function insert($request, $response){
      $this->exec();
      return "Contaroller";
    }
    private function exec(){
      //$this->init()
      $stmt = $this->conn->prepare("INSERT INTO user (f_name, l_name)
    VALUES (?, ?)");

      // $stmt->bindParam(':firstname', $firstname);
      // $stmt->bindParam(':lastname', $lastname);
      $firstname = "John";
      $lastname = "Doe";
      $stmt->execute([$firstname, $lastname]);
    }
}
