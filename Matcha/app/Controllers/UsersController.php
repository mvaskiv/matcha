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

  private function exec(){
    $usr = array();
    $start = intval($this->parsedBody['start']);
    $number = intval($this->parsedBody['number']);
    $stmt = $this->conn->prepare("SELECT user.f_name, user.l_name, user.u_name, user.id, user.gender, fotos.avatar FROM user
                                JOIN fotos on user.id = fotos.id_user LIMIT $start, $number");
    if ($stmt->execute()){
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $tmp = unserialize($row['all_foto']);
        array_push($usr, $row, 'photos' => $tmp);
      }
    }
  $this->rt['data'] = $usr;
  $this->rt['status'] = 'ok';
  return true;
}
}
