<?php
namespace App\Retchet;

use App\Controllers\BasicToken;
use App\Controllers;
use PDO;

class UserIndetify extends BasicToken {
  public $pool = array();
  private $conn;

  public function __construct(){
    $var = include "sqlconf.php";
    $this->conn = new PDO('mysql:host=localhost;dbname=matcha_db', $var['user'], $var['password']);
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  public function addUser($id, $chat_id){
    $tmp = array(
      'id' => $id,
      'chat_id' => $chat_id
    );
    array_push($this->pool, $tmp);
    $sql = include "sqlconf.php";
    print_r($sql);
  }

  public function dropUser($chat_id){
    $del = array_search(array('chatt_id' => $chat_id), $this->pool);
    echo $del." find\n";
    for ($i = 0; $i < count($this->pool); $i++){
      if ($this->pool[$i]['chat_id'] == $chat_id){
        unset($this->pool[$i]);
        array_slice($this->pool, 0, count($this->pool));
        break;
      }
  }
}

public function checkInput(array $tmp){
  if (!isset($tmp['id']) || !isset($tmp['token']) || !isset($tmp['to'])
        || !isset($tmp['status']))
    return false;
  if (!$this->check($tmp['token'], $tmp['id']))
    return false;
  try{
    return $this->update($tmp['token']);
  } catch (\Exception $e){
    return false;
  }
}

public function receiver($to){
  foreach($this->pool as $usr){
    if ($usr['id'] === $to)
      return $usr['chat_id'];
  }
  return false;
}

public function possible_chat($user1, $user2){
  $tmp = array(0, 0);

  $stmt = $this->conn->prepare("SELECT FROM `chats` WHERE (`user1` = {$user1} AND `user2` = {$user2}) OR (`user1` = {$user2} AND `user2` = {$user1})");
  if ($stmt->execute()){
    $row = $stmt->fetch();
    if (isset($row['id']))
      return array('status' => 'ok', 'chat' => $row['id']);
  }
  $stmt = $this->conn->prepare("SELECT DISTINCT `id_user` FROM `notifications` WHERE (`type` = 'like' OR `type` = 'like_back') AND ((`id_user` = ? AND `from` = ?) OR (`id_user` = ? AND `from` = ?))");
  if ($stmt->execute([$user1, $user2, $user2, $user1])){
    while (($row = $stmt->fetch())){
      if ($row['id_user'] == $user1)
        $tmp[1] = 1;
      else if ($row['id_user'] == $user2)
        $tmp[2] = 1;
    }
  }
  if ($tmp[0] === 1 && $tmp[1] === 1)
    return array('status' => 'ok', 'chat' => 0);
  return array('status' => 'ko');
}

public function write_to_db($to, $from, $msg){
  $messange = json_decode($msg, true);
  $tmp = $this->possible_chat($to, $from);
  if ($tmp['status'] === 'ko')
    return false;
  if ($tmp['chat'] == 0){
    $stmt = $this->conn->prepare("INSERT INTO `chats` (`user1`, `user2`) VALUES({$to}, {$from})");
    $stmt->execute();
    $row = $stmt->fetch();
    $stmt = $this->conn->prepare("INSERT INTO `messages` (`chat_id`, `sender`, `recipient`, `msg`) VALUES(?, ?, ?, ?)");
    $stmt->execute([$row['id'], $from, $to, $messange['message']]);
  }
  $stmt = $this->conn->prepare("INSERT INTO `messages` (`chat_id`, `sender`, `recipient`, `msg`) VALUES(?, ?, ?, ?)");
  $stmt->execute([$row['id'], $from, $to, $messange['message']]);
  return true;
}
}
