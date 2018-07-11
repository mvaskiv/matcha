<?php

namespace App\Controllers;

use App\Controllers\BasicMysqlController;

class LoginController extends BasicMysqlController {
  private $rt = array();

  public function insert($request, $response){


    return json_encode($this->rt);
  }

  
}
