<?php

namespace App\Controllers;

use App\Controllers\BasicToken;
use PDO;

class BothLikeController extends BasicToken {

private $rt = array();
private $lol = array();
private $parsedBody;
private $token;

use \App\Traits\sqlConnection;

public function insert($request, $response){
  $this->parsedBody = $request->getParsedBody();
  if (!$this->paramCheck()){
    $this->rt['status'] = 'ko';
    $this->rt['error'] = 'wrong parameter';
    return json_encode($this->rt);
  }
  $this->init();
  $this->exec();
  return json_encode($this->rt);
}

private function paramCheck(){
  if (!isset($this->parsedBody['id']) || !isset($this->parsedBody['token']))
    return false;
  try{
  if (!$this->check($this->parsedBody['token'], $this->parsedBody['id']))
    return false;
  $this->token = $this->update($this->parsedBody['token']);
  $this->rt['token'] = $this->token;
  } catch (\Exception $e){
    return false;
  }
  return true;
}

private function exec(){
  $usr = array();
  $start = $this->parsedBody['start'];
  $number = $this->parsedBody['number'];


  $stmt = $this->conn->prepare("SELECT * FROM `like_both` WHERE `u1` = ? OR `u2` = ?");
  $stmt->execute([$this->parsedBody['id'], $this->parsedBody['id']]);
  $row_q = $stmt->rowCount();
  $block = $this->block();
  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $blk = true;

    foreach($block as $el){
      if ($el['blocked'] === $row['u1'] || $el['blocked'] === $row['u2']){
        $blk = false;
      }
    }
    if ($blk)
      array_push($usr, $row);
  }
  $this->join($usr);
  $this->rt['data'] = $this->lol;
  //print_r($this->rt['data']);
  $this->rt['status'] = 'ok';

  return true;
}

public function join($data){
  //print_r($data);
  $tmp = array();

  foreach($data as $el){
    if ($el['u1'] == $this->parsedBody['id'])
      array_push($tmp, $el['u2']);
      else {
        array_push($tmp, $el['u1']);
      }
  }
  foreach ($tmp as $elem){
    $stmt = $this->conn->prepare("SELECT user.f_name, user.l_name, user.u_name, user.id, user.gender, fotos.all_foto, fotos.avatar
                                  FROM user LEFT JOIN fotos ON fotos.id_user=user.id WHERE user.id = ?");
    $stmt->execute([$elem]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!empty($row))
      array_push($this->lol, $row);
  }
  //print_r($lol);
  return true;
}

public function block(){
  $stmt = $this->conn->prepare("SELECT * FROM `black_list` WHERE id = ?");
  $stmt->execute([$this->parsedBody['id']]);
  $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return ($row);
}

}
