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
    $this->parsedBody = $request->getParsedBody();
    $this->init();
    if (!isset($this->parsedBody['id']) || !isset($this->parsedBody['token'])){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'no id or token';
      return json_encode($this->rt);
    }
    // if (!$this->token())
    //   return json_encode($this->rt);
    $stmtq = $this->conn->prepare("SELECT * FROM user");
    $stmtq->execute();
    $row_q = $stmtq->rowCount();
    if (!isset($this->parsedBody['sort']) || !isset($this->parsedBody['start']) || !isset($this->parsedBody['number'])){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'no sort or start or number';
      return json_encode($this->rt);
    }
    if ($this->parsedBody['number'] > $row_q) {
      $this->rt['status'] = 'dbEnd';
      $this->rt['error'] = 'database end reached';
      return json_encode($this->rt);
    }
    $this->exec();
    return json_encode($this->rt);
  }

  private function token(){
    try{
        if  (!$this->check($this->parsedBody['token'], $this->parsedBody['id'])){
          $this->rt['status'] = 'ko';
          $this->rt['error'] = 'wrong token';
          return false;
        }
    $this->rt['token'] = $this->update($this->parsedBody['token']);
  } catch (\Exception $e){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'token is broken';
      return false;
  }
  return true;
  }

  private function exec(){
    $usr = array();
    $start = intval($this->parsedBody['start']);
    $number = intval($this->parsedBody['number']);
    $stmt = $this->conn->prepare("SELECT
       user.f_name, user.l_name, user.u_name, user.id, user.gender, fotos.all_foto, fotos.avatar
      FROM user LEFT JOIN fotos ON fotos.id_user=user.id LIMIT $start, $number");
    if ($stmt->execute()){
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        if (!empty($row['all_foto'] && !empty($row['avatar']))){
          $tmp = unserialize($row['all_foto']);
          if (isset($tmp[inval($row['avatar'])]))
            $row['avatar'] = $tmp[inval($row['avatar'])];
          }
          else
            $row['avatar'] = 'error';
          unset($row['all_foto']);
        array_push($usr, $row);
      }
    }
  $this->rt['data'] = $usr;
  $this->rt['status'] = 'ok';
  return true;
}
}
