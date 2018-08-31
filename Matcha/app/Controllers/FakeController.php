<?php

namespace App\Controllers;

use App\Controllers\BasicToken;
use PDO;

class FakeController extends BasicToken {

private $rt = array();
private $parsedBody;
private $token;

use \App\Traits\sqlConnection;
use \App\Traits\sendMail;

public function insert($request, $response){
  $this->parsedBody = $request->getParsedBody();
  if (!$this->paramCheck()){
    $this->rt['status'] = 'ko';
    $this->rt['error'] = 'wrong parameter';
    return json_encode($this->rt);
  }
  $this->init();
  $sql = "SELECT * FROM `fakeUser` WHERE `fake_id` = ? AND `report_id` = ?";
  $tmp = $this->execSelect($sql, array($this->parsedBody['fake_id'], $this->parsedBody['id']));
  if (empty($tmp)){
    $this->execUpdateInsert("INSERT INTO `fakeUser` (`fake_id`, `report_id`) VALUES(?, ?)",
            array($this->parsedBody['fake_id'], $this->parsedBody['id']));
    $sql = "SELECT `email` from `user` WHERE id = ?";
    $tmp = $this->execSelect($sql, array($this->parsedBody['fake_id']));
    print_r($tmp);
    if (empty($tmp))
      return json_encode(array('status' => 'ko'));
    $email = $tmp[0]['email'];
    $this->FakeMail(array('to' => $email));
  }
  else{
    return json_encode(array('status' => 'ko'));
  }
  $this->rt['status'] = 'ok';
  return json_encode($this->rt);
}

private function paramCheck(){
  if (!isset($this->parsedBody['id']) || !isset($this->parsedBody['token']) ||
        !isset($this->parsedBody['fake_id']))
    return false;
  // if (!$this->check($this->parsedBody['token'], $this->parsedBody['id']))
  //   return false;
  // try{
  //   $this->rt['token'] = $this->update($this->parsedBody['token']);
  // } catch (\Exception $e){
  //   return false;
  // }
  return true;
}

}
