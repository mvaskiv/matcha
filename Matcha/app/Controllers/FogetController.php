<?php

namespace App\Controllers;

use App\Controllers\BasicToken;
use PDO;

class FogetController{

use \App\Traits\sqlConnection;
use \App\Traits\sendMail;

private $parsedBody;

public function foget($request, $response){
  $this->init();
   $this->parsedBody = $request->getParsedBody();
   if (!$this->parsedBody['email'])
    return json_encode(array('status' => 'ko', 'error' => 'no email'));
  $sql = "SELECT * FROM `user` WHERE `email` = ?";
  $tmp = $this->execSelect($sql, array($this->parsedBody['email']));
  if (empty($tmp))
    return json_encode(array('status' => 'ko', 'error' => 'dose not email in db'));
  $this->sendReinstallMail(array('to' => $tmp[0]['email'], 'id' => $tmp[0]['id']));
  return json_encode(array('status' => 'ok'));
 }

}
