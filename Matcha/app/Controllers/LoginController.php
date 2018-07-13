<?php

namespace App\Controllers;

use App\Controllers\BasicToken;
use PDO;

class LoginController extends BasicToken {
  private $rt = array();
  private $parsedBody;
  protected $dsn = 'mysql:host=localhost;dbname=matcha_db';
  protected $user = 'root';
  protected $password = '459512144';
  protected $conn;

  protected function init(){
    $this->conn = new PDO($this->dsn, $this->user, $this->password);
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  public function insert($request, $response){
    $this->parsedBody = $request->getParsedBody();
    $this->init();
    if (!isset($this->parsedBody['login']) || !isset($this->parsedBody['password'])){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'no login or password';
      return json_encode($this->rt);
    }
    if ($this->exec())
      $this->rt['status'] = 'ok';
    return json_encode($this->rt);
  }

  private function exec(){
    $stmt = $this->conn->prepare("SELECT * FROM user WHERE `email` = ? OR `u_name` = ?");
    $login = $this->parsedBody['login'];
    if ($stmt->execute([$login, $login])){
      $row = $stmt->fetch();
      if (!isset($row['email'])){
        $this->rt['status'] = 'ko';
        $this->rt['error'] = 'no user';
        return false;
    }
    else if (hash('ripemd160', $this->parsedBody['password']) != $row['password']){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'password dose not match';
      return false;
    }
  }
  array_push($this->rt, $row);
  $this->rt['status'] = 'ok';
  return true;
}

}
