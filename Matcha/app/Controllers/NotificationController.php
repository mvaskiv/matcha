<?php

namespace App\Controllers;

use App\Controllers\BasicToken;
use PDO;

class NotificationController extends BasicToken {

private $rt = array();
private $parsedBody;
private $token;

use \App\Traits\sqlConnection;

private function pars($request, $response){
  $this->parsedBody = $request->getParsedBody();
  if (!$this->paramCheck()){
    $this->rt['status'] = 'ko';
    $this->rt['error'] = 'wrong parameter';
    return false;
  }
  $this->init();
  return true;
}

private function paramCheck(){
  if (!isset($this->parsedBody['id']) || !isset($this->parsedBody['token']))
    return false;
  // if (!$this->check($this->parsedBody['token'], $this->parsedBody['id']))
  //   return false;
  // try{
  //   $this->token = $this->update($this->parsedBody['token']);
  // } catch (\Exception $e){
  //   return false;
  // }
  return true;
}

public function push($request, $response){
  if (!$this->pars($request, $response) || !$this->parsedBody['id_user'] ||
        !$this->parsedBody['type']){
          $this->rt['status'] = 'ko';
          $this->rt['error'] = 'no id_user ot type';
    return json_encode($this->rt);
  }
  $sql = "INSERT INTO `notifications` (`new`, `id_user`, `text`, `type`, `from`)
            VALUES(1, ?, ?, ?, ?)";
  if ($this->parsedBody['type'] == "like")
    $text = "Other user likes you";
  else if ($this->parsedBody['type'] == "profilechecked")
    $text = "Your profile has been checked";
  else if ($this->parsedBody['type'] == "message")
    $text = "You receive new messange";
  else if ($this->parsedBody['type'] == "likeback")
    $text = "You receive like back";
  else {
    $text = "Unknow notification";
  }
  $this->execUpdateInsert($sql, array ($this->parsedBody['id_user'], $text, $this->parsedBody['type'], $this->parsedBody['id']));
  return json_encode(array('status' => 'ok'));
}

public function delete($request, $response){
  if (!$this->pars($request, $response)){
    return json_encode($this->rt);
  }
  $sql = "UPDATE `notifications` SET `new` = 0 WHERE `id_user` = ?";
  $this->execUpdateInsert($sql, array ($this->parsedBody['id']));
  return json_encode(array('status' => 'ok'));
}

public function select($request, $response){
  if (!$this->pars($request, $response)){
    return json_encode($this->rt);
  }
  $sql = "SELECT * FROM `notifications` WHERE `id_user` = ? AND `new` = 1";
  $tmp = $this->execSelect($sql, array($this->parsedBody['id']));
  if (!empty($tmp)){
    $this->rt['data'] = $tmp;
    $this->rt['status'] = 'ok';
  } else {
    $this->rt['status'] = 'empty';
  }
  return json_encode($this->rt);
}



}
