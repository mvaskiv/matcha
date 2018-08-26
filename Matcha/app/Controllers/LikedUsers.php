<?php

namespace App\Controllers;

use App\Controllers\BasicToken;
use PDO;

class LikedUsers extends BasicToken {
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
    $this->exec();
    return json_encode($this->rt);
  }

  private function exec(){
    $usr = array();
    $uid = $this->parsedBody['id'];
    $stmt = $this->conn->prepare("SELECT u_likes.u2 FROM user LEFT JOIN u_likes ON user.id=u_likes.u1 OR user.id=u_likes.u2 WHERE u_likes.u1=user.id OR u_likes.u2=user.id");
    if ($stmt->execute()){
      $block = $this->block();
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $blk = true;
        foreach($block as $el){
          if ($el['blocked'] === $row['id']) {
            $blk = false;
            $this->parsedBody['number']--;
          }
        }
        unset($row['all_foto']);
        if ($blk)
          array_push($usr, $row);
      }
    }
    $this->rt['data'] = $usr;
    $this->rt['status'] = 'ok';
    if (($this->parsedBody['number'] > $row_q) || ($this->parsedBody['number'] > count($usr))) {
        $this->rt['status'] = 'dbEnd';
    }
  return true;
  }
  public function block(){
    $stmt = $this->conn->prepare("SELECT * FROM `black_list` WHERE id = ?");
    $stmt->execute([$this->parsedBody['id']]);
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return ($row);
  }
}
