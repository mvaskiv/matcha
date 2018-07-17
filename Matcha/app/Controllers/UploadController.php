<?php
namespace App\Controllers;

use App\Controllers\BasicToken;
use Slim\Http\UploadedFile;
use PDO;



class UploadController extends BasicToken {
  private $rt = array();
  private $parsedBody;
  protected $conn;

  protected function init(){
    $var = require_once 'sqlconf.php';
    $this->conn = new PDO($var['dsn'], $var['user'], $var['password']);
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  public function insert($request, $response){
    $this->parsedBody = $request->getParsedBody();
    $this->init();
    if (!isset($this->parsedBody['id']) || !isset($this->parsedBody['token'])){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'no id or token';
      return json_encode($this->rt);
    }
    if (!isset($this->parsedBody['img'])){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'no img';
      return json_encode($this->rt);
    }
    $arr = preg_split('/base64,/', $this->parsedBody['img']);
    //print_r($arr);
    echo __DIR__.'/uploads/'.$this->getImgName($arr[0]);

    $imageData = file_get_contents("php://input");
    echo "\n";
    echo $imageData;
    $filteredData=substr($imageData, strpos($imageData, ",") + 1);
    $unencodedData=base64_decode($filteredData);

    file_put_contents(__DIR__.'/../../uploads/'.$this->getImgName($arr[0]), $unencodedData);
  }

  public function getImgName($str){

    $arr = preg_split('/\//', $str);
    $arr = preg_split('/;/', $arr[1]);

    $dir = __DIR__.'/../../uploads/';
    $max = 0;
    if (is_dir($dir)) {
      if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
              if ($max < intval($file))
                $max = intval($file);
        }
        closedir($dh);
      }
    }
    $max++;
    return strval($max).".".$arr[0];
  }
}
