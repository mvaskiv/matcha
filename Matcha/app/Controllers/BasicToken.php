<?php

namespace App\Controllers;

use \Firebase\JWT\JWT;

class BasicToken{
  protected $_key = "Xd234mOp*)fd";

  function generate($id_user){
    $token = array(
      $id => $id_user,
      $time => time() + 2 * 60 * 60
    );
    $jwt = JWT::encode($token, $this->_key);
    return ($jwt);
  }

  function check($token, $id){
    $decoded = JWT::decode($jwt, $key, array('HS256'));
    if ($decode['id'] == $id)
      return ture;
    return false;
  }

  function update($token){
    $decoded = JWT::decode($jwt, $key, array('HS256'));
    $decode['time'] = time() + 2 * 60 * 60;
    $jwt = JWT::encode($token, $this->_key);
    return ($jwt);
  }
}
