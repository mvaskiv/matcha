<?php

namespace App\Controllers;

use PDO;

class ConfirmationController{

use \App\Traits\sqlConnection;

public function insert($request, $response){
  $this->init();
  $id = $request->getParam('id');
  $key = $request->getParam('key');
  $sql = "SELECT * FROM `user` WHERE `id` = ?";
  $tmp = $this->execSelect($sql, array($id));
  if (empty($tmp))
    return json_encode(array('status' => 'ko', 'error' => 'go to hell'));
  if ($tmp[0]['active_value'] == $key){
    $sql = "UPDATE `user` SET `active` = ? WHERE `id` = ?";
    $this->execUpdateInsert($sql, array(1, $tmp[0]['id']));
    return json_encode(array('status' => 'ok'));
  }
  return json_encode(array('status' => 'ko', 'error' => 'go to hell twice'));
}

public function foget($request, $response){
  $this->init();
  $this->parsedBody = $request->getParsedBody();
  if (!$this->parsedBody['id'] || !$this->parsedBody['key'] || !$this->parsedBody['password'])
   return json_encode(array('status' => 'ko', 'error' => 'no id or key or password'));
  $sql = "SELECT * FROM `user` WHERE `id` = ?";
  $tmp = $this->execSelect($sql, array($this->parsedBody['id']));
  if (empty($tmp))
   return json_encode(array('status' => 'ko', 'error' => 'dose not id in db'));
  $email = $tmp[0]['email'];
  if (hash('ripemd160', $email).hash('ripemd160', "secret") == $this->parsedBody['key']){
    //TODO : request on password change
    $sql = "UPDATE `user` SET `password` = ? WHERE `id` = ?";
    $this->execUpdateInsert($sql, array(hash('ripemd160', $this->parsedBody['password']), $this->parsedBody['id']));
    return json_encode(array('status' => 'ok'));
  }
  return json_encode(array('status' => 'ko', 'error' => 'wrong key'));
}

}
