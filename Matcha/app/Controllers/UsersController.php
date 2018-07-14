<?php

namespace App\Controllers;

use App\Controllers\BasicToken;
use PDO;

class UsersController extends BasicToken {
  private $rt = array();
  private $parsedBody;
  protected $conn;

  protected function init(){
    $var = require_once 'sqlconf.php';
    $this->conn = new PDO($var['dsn'], $var['user'], $var['password']);
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  public function insert($request, $response){
    $this->init();
    foreach ($conn->query($sql) as $row) {

    }
    $this->rt['status'] = 'ko';
    return json_encode($this->rt);
  }

  private function exec(){
    $stmt = $this->conn->prepare("SELECT * FROM user");
    $login = $this->parsedBody['login'];
    if ($stmt->execute([$login, $login])){
      $row = $stmt->fetch();
      if (!isset($row['email'])){
        $this->rt['status'] = 'ko';
        $this->rt['error'] = 'no user';
        return false;
      }
    }
  }
  unset($row['password']);
  array_push($this->rt, $row);
  $this->rt['status'] = 'ok';
  return true;
}
