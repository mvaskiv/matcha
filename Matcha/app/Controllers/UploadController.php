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
    // if (!isset($this->parsedBody['id']) || !isset($this->parsedBody['token'])){
    //   $this->rt['status'] = 'ko';
    //   $this->rt['error'] = 'no id or token';
    //   return json_encode($this->rt);
    // }
    if (!isset($this->parsedBody['img'])){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'no img';
      return json_encode($this->rt);
    }




    $imageData = file_get_contents("php://input");
    //echo "works"."\n";
    $tmp = preg_split('/img=/', $imageData);
    $imageData = $tmp[1];
    //echo $imageDate."\n";
    $arr = preg_split('/base64,/', $imageData);
    $filteredData=substr($imageData, strpos($imageData, ",") + 1);
    //echo $filteredData."\n";
    $unencodedData=base64_decode($filteredData);

    $name = $this->getImgName($arr[0]);
    file_put_contents(__DIR__.'/../../uploads/'.$name, $unencodedData);
    $this->writeToDB($name, $this->parsedBody['id']);
  }

  public function writeToDB($name, $user_id){
    echo $name." i dan't beliave\n";
    $stmt = $this->conn->prepare("SELECT * FROM `fotos` WHERE `id_user` = ?");
    if ($stmt->execute([$user_id])){
      $row = $stmt->fetch();
      //var_dump($row);
      if (empty($row['all_foto'])){
        $ser_str = array('1' => $name);
        $str = serialize($ser_str);
        var_dump($str);
        //print_r($ser_str);
        $stmt = $this->conn->prepare("INSERT INTO `fotos` (`id_user`, `all_foto`) VALUES(?, ?)");
        $stmt->execute([$user_id, $str]);
      }
      else{
        $ser_str = unserialize($row['all_foto']);
        $tmp = 1;
        foreach ($ser_str as $key => $value)
          if ($tmp < intval($key))
            $tmp = intval($key);
        array_push($ser_str, $name);
        $str = serialize($ser_str);
        $stmt = $this->conn->prepare("UPDATE `fotos` SET `all_foto` = ? WHERE `id_user` = ?");
        $stmt->execute([$str, $user_id]);
        print_r(unserialize($str));
      }
    }
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
