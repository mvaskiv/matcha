<?php

namespace App\Controllers;

use App\Controllers\BasicToken;
use PDO;

class LikeController extends BasicToken {

private $rt = array();
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
    if ($this->exist_like()){
      $this->execUpdateInsert("INSERT INTO `u_likes` (`u1`, `u2`) VALUES(?, ?)",
              array($this->parsedBody['id'], $this->parsedBody['liked_id']));
              //inser this line 
      $this->execUpdateInsert("UPDATE `user` SET `rate` = `rate` + 1 WHERE id = ?", array($this->parsedBody['liked_id']));
    }
    $this->likeBack();
    $this->rt['status'] = 'ok';
    return json_encode($this->rt);
}

private function exist_like(){
  $sql = "SELECT * FROM `u_likes` WHERE `u1` = ? AND `u2` = ?";
  $tmp = $this->execSelect($sql, array($this->parsedBody['id'], $this->parsedBody['liked_id']));
  if (empty($tmp))
    return true;
  return false;
}

private function paramCheck(){
  if (!isset($this->parsedBody['id']) || !isset($this->parsedBody['token']) ||
        !isset($this->parsedBody['liked_id']))
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

private function likeBack(){
  $sql = "SELECT * FROM `u_likes` WHERE `u1` = ? AND `u2` = ?";
  $tmp = $this->execSelect($sql, array($this->parsedBody['liked_id'], $this->parsedBody['id']));
  if (empty($tmp))
    return false;
  $sql = "SELECT * FROM `like_both` WHERE (`u1` = ? AND `u2` = ?) OR (`u1` = ? AND `u2` = ?)";
  $tmp = $this->execSelect($sql, array($this->parsedBody['liked_id'], $this->parsedBody['id'],
                            $this->parsedBody['liked_id'], $this->parsedBody['id']));
  if (!empty($tmp))
    return true;
  $sql = "INSERT INTO `like_both` (`u1`, `u2`) VALUES(?, ?)";
  $this->execUpdateInsert($sql, array($this->parsedBody['liked_id'], $this->parsedBody['id']));
  $this->rt['mutual'] = true;
}

}
