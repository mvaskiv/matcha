<?php

namespace App\Controllers;

use App\Controllers\BasicMysqlController;

class RegistrationController extends BasicMysqlController {
  private $parsedBody;
  private $rt = array();

    public function insert($request, $response){
      $this->parsedBody = $request->getParsedBody();

      if (!$this->ifis())
        $this->exec();
      return json_encode($this->rt);;
    }

    private function exec(){
      $stmt = $this->conn->prepare("INSERT INTO User (f_name, l_name)
    VALUES (?, ?)");

      $firstname = "John";
      $lastname = "Doe";
      $stmt->execute([$firstname, $lastname]);
    }

    private function ifis(){
      if (isset($this->parsedBody['email'])){
        if ($this->notexist()){
          return true;
        }
        else{
          $this->rt['error'] = 'email exist';
          return false;
        }
      }
      else {
        $this->rt['error'] = 'no email';
      }
      return false;
    }

    private function notexist(){

      $stmt = $this->conn->prepare("SELECT * FROM User WHERE email = ?");

      $email = $this->parsedBody['email'];
      if ($stmt->execute([$email])){
        $row = $stmt->fetch();
        if (isset(row['email'])){
          return false;
        }
      }
      return true;
    }
}
