<?php
class Mysql{
  private $dsn = 'mysql:host=localhost;dbname=matcha_db';
  private $user = 'root';
  private $password = '459512144';
  private $conn;
  private $table;

  function __construct(array $var){
    $this->init();
    if (isset($var['Insert']))
      $this->insert($var['Insert']);
    $this->table = $var['Table'];
  }

  private function init(){
    $this->conn = new PDO($this->dsn, $this->user, $this->password);
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  private function insert(array $var){
    $tmp = array();
    $i = 0;

    $sql = "INSERT INTO $this->table (";
    foreach($var['value'] as $el){
      $sql .= $el;
      $sql .= ", ";
    }
    $sql = substr($sql, 0, -2);
    $sql .= ") VALUES (:";
    foreach($var['value'] as $el){
      $sql .= $el;
      $sql .= ", :";
      array_push($tmp, ":".$el);
    }
    $sql = substr($sql, 0, -3);
    $sql .= ")";
    echo $sql."\n";
    print_r($tmp);
    $stmt = $this->conn->prepare($sql);
    foreach($var['key'] as $el){
       $stmt->bindParam($tmp[i], $el);
      $i++;
    }
    $stmt->execute();
}
  private function exec(){
  }
}
 ?>
