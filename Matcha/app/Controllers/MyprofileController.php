<?php

namespace App\Controllers;

use App\Controllers\BasicToken;
use PDO;

class MyprofileController extends BasicToken {
  private $rt = array();
  private $parsedBody;
  protected $conn;

  protected function init(){
    $var = require_once 'sqlconf.php';
    $this->conn = new PDO($var['dsn'], $var['user'], $var['password']);
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  public function insert($request, $response){
    $this->parsedBody = $request->getParsedBody();
    if  (!$this->check($this->parsedBody['token'], $this->parsedBody['id'])){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'wrong token';
      return json_encode($this->rt);
    }
    if (!isset($this->parsedBody['id']) || !isset($this->parsedBody['token'])){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'no is or token';
      return json_encode($this->rt);
    }
    if ($this->exec())
      $this->rt['status'] = 'ok';
    return json_encode($this->rt);
  }

  private function exec(){
    $stmt = $this->conn->prepare("SELECT * FROM user WHERE `id` = ?");
    $id = $this->parsedBody['id'];
    if ($stmt->execute([$id])){
      $row = $stmt->fetch();
      if (!isset($row['id'])){
        $this->rt['status'] = 'ko';
        $this->rt['error'] = 'no id';
        return false;
    }
    unset($row['password']);
    array_push($this->rt, $row);
    return true;
  }
}
}
