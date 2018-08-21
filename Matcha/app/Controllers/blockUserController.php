<?php

namespace App\Controllers;

use App\Controllers\BasicToken;
use PDO;

class blockUserController extends BasicToken {

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
  $this->execUpdateInsert("INSERT INTO `black_list` (`id`, `blocked`) VALUES(?, ?)",
              array($this->parsedBody['id'], $this->parsedBody['blocked']));
  $this->rt['status'] = 'ok';
  return json_encode($this->rt);
}


  private function paramCheck(){
    if (!isset($this->parsedBody['id']) || !isset($this->parsedBody['token']) ||
          !isset($this->parsedBody['blocked']))
      return false;
    if (!$this->check($this->parsedBody['token'], $this->parsedBody['id']))
      return false;
    try{
      $this->token = $this->update($this->parsedBody['token']);
    } catch (\Exception $e){
      return false;
    }
    return true;
  }

}