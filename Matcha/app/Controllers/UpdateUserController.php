<?php

namespace App\Controllers;

use App\Controllers\BasicToken;
use PDO;

class UpdateUserController extends BasicToken {
  private $rt = array();
  private $parsedBody;
  protected $conn;

  use \App\Traits\sqlConnection;

  public function insert($request, $response){
    $this->parsedBody = $request->getParsedBody();
    if (!$this->paramCheck()){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'wrong parameter';
      return json_encode($this->rt);
    }
    $this->init();
    if ($this->route())
      return json_encode($this->rt);
    return json_encode(array('status' => 'ko', 'error' => 'hz'));
  }

  private function route(){
    if (isset($this->parsedBody['f_name']))
       return $this->changeFname();
    else if (isset($this->parsedBody['l_name']))
       return $this->changeLname();
    else if (isset($this->parsedBody['u_name']))
       return $this->changeUname();
    else if (isset($this->parsedBody['gender']))
       return $this->changeGender();
    else if (isset($this->parsedBody['sex_preference']))
       return $this->changeSex();
    else if (isset($this->parsedBody['biography']))
       return $this->changeBio();
    else if (isset($this->parsedBody['tags']))
       return $this->changeTag();
    else if (isset($this->parsedBody['email']))
       return $this->changeEmail();
    else if (isset($this->parsedBody['password']))
       return $this->changePass();
    else if (isset($this->parsedBody['date']))
       return $this->changeDate();
    return false;
  }

  private function changeDate(){
    $sql = "UPDATE `user` SET `date` = ? WHERE `id` = ?";
    $this->execUpdateInsert($sql, $this->parsedBody['date'], $this->parsedBody['id']));
    $this->rt['status'] = 'ok';
    $this->rt['mod'] = 'date';
    return true;
  }

  private function changePass(){
    $sql = "UPDATE `user` SET `password` = ? WHERE `id` = ?";
    $this->execUpdateInsert($sql, array(hash('ripemd160', $this->parsedBody['password']), $this->parsedBody['id']));
    $this->rt['status'] = 'ok';
    $this->rt['mod'] = 'password';
    return true;
  }

  private function changeEmail(){
    $sql = "UPDATE `user` SET `email` = ? WHERE `id` = ?";
    $this->execUpdateInsert($sql, array($this->parsedBody['email'], $this->parsedBody['id']));
    $this->rt['status'] = 'ok';
    $this->rt['mod'] = 'email';
    return true;
  }

  private function changeTag(){
    $sql = "UPDATE `user` SET `tags` = ? WHERE `id` = ?";
    $this->execUpdateInsert($sql, array($this->parsedBody['tags'], $this->parsedBody['id']));
    $this->rt['status'] = 'ok';
    $this->rt['mod'] = 'tags';
    return true;
  }

  private function changeFname(){
    $sql = "UPDATE `user` SET `f_name` = ? WHERE `id` = ?";
    $this->execUpdateInsert($sql, array($this->parsedBody['f_name'], $this->parsedBody['id']));
    $this->rt['status'] = 'ok';
    $this->rt['mod'] = 'first name';
    return true;
  }

  private function changeLname(){
    $sql = "UPDATE `user` SET `l_name` = ? WHERE `id` = ?";
    $this->execUpdateInsert($sql, array($this->parsedBody['l_name'], $this->parsedBody['id']));
    $this->rt['status'] = 'ok';
    $this->rt['mod'] = 'last name';
    return true;
  }

  private function changeUname(){
    $sql = "UPDATE `user` SET `u_name` = ? WHERE `id` = ?";
    $this->execUpdateInsert($sql, array($this->parsedBody['u_name'], $this->parsedBody['id']));
    $this->rt['status'] = 'ok';
    $this->rt['mod'] = 'user name';
    return true;
  }

  private function changeGender(){
    $sql = "UPDATE `user` SET `gender` = ? WHERE `id` = ?";
    $this->execUpdateInsert($sql, array($this->parsedBody['gender'], $this->parsedBody['id']));
    $this->rt['status'] = 'ok';
    $this->rt['mod'] = 'gender';
    return true;
  }

  private function changeSex(){
    $sql = "UPDATE `user` SET `sex_preference` = ? WHERE `id` = ?";
    $this->execUpdateInsert($sql, array($this->parsedBody['sex_preference'], $this->parsedBody['id']));
    $this->rt['status'] = 'ok';
    $this->rt['mod'] = 'sex_preference';
    return true;
  }

  private function changeBio(){
    $sql = "UPDATE `user` SET `biography` = ? WHERE `id` = ?";
    $this->execUpdateInsert($sql, array($this->parsedBody['biography'], $this->parsedBody['id']));
    $this->rt['status'] = 'ok';
    $this->rt['mod'] = 'biography';
    return true;
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

}
