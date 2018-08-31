<?php

namespace App\Controllers;

use App\Controllers\BasicToken;
use PDO;

class UsersController extends BasicToken {
  private $rt = array();
  private $parsedBody;
  protected $conn;
  private $lol = array();

  protected function init(){
    $var = require_once 'sqlconf.php';
    $this->conn = new PDO($var['dsn'], $var['user'], $var['password']);
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  public function insert($request, $response){
    $this->parsedBody = $request->getParsedBody();
    $this->init();
    if (!isset($this->parsedBody['sort']) || !isset($this->parsedBody['start']) || !isset($this->parsedBody['number'])
        || !isset($this->parsedBody['id'])){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'no sort or start or number or id';
      return json_encode($this->rt);
    }
    if ($this->parsedBody['sort'] == 'age' && (!isset($this->parsedBody['start_age']) || !isset($this->parsedBody['end_age']))){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'no start_age or end_age';
      return json_encode($this->rt);
    }
    if ($this->parsedBody['sort'] == 'gender' && !isset($this->parsedBody['gender'])){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'no gender';
      return json_encode($this->rt);
    }
    if ($this->parsedBody['sort'] == 'age_gender' && (!isset($this->parsedBody['gender']) || !isset($this->parsedBody['start_age']) || !isset($this->parsedBody['end_age']))){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'no gender or start_age or end_age';
      return json_encode($this->rt);
    }
    if ($this->parsedBody['sort'] == 'tags' && !isset($this->parsedBody['param'])){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'no param';
      return json_encode($this->rt);
    }
    //print_r($this->parsedBody);
    if ($this->parsedBody['sort'] == 'all' && (!isset($this->parsedBody['gender']) ||
          !isset($this->parsedBody['start_age']) || !isset($this->parsedBody['end_age']) ||
        !isset($this->parsedBody['start_rate']) || !isset($this->parsedBody['end_rate'])
        || !isset($this->parsedBody['param']) || !isset($this->parsedBody['km']) ||
      !isset($this->parsedBody['longitude']) || !isset($this->parsedBody['latitude']))){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'no param for all';
      return json_encode($this->rt);
    }
    if ($this->parsedBody['sort'] == 'location' || !isset($this->parsedBody['latitude']) ||
          !isset($this->parsedBody['longitude']) || !isset($this->parsedBody['km'])){
      $this->rt['status'] = 'ko';
      $this->rt['error'] = 'no param for location';
      return json_encode($this->rt);
    }
    $this->exec();
    return json_encode($this->rt);
  }

  private function exec(){
    $stmt = NULL;
    $usr = array();
    $start = intval($this->parsedBody['start']);
    $number = intval($this->parsedBody['number']);
    $stmtq = $this->conn->prepare("SELECT * FROM user");
    $stmtq->execute();
    $row_q = $stmtq->rowCount();
    if ($this->parsedBody['sort'] == 'unsort')
      $stmt = $this->conn->prepare("SELECT user.f_name, user.l_name, user.u_name, user.id, user.gender, fotos.all_foto, fotos.avatar
                                    FROM user LEFT JOIN fotos ON fotos.id_user=user.id LIMIT $start, $number");
    else if ($this->parsedBody['sort'] == 'age'){
      $start_age = $this->parsedBody['start_age'];
      $end_age = $this->parsedBody['end_age'];
      $stmt = $this->conn->prepare("SELECT
        user.f_name, user.l_name, user.u_name, user.id, user.gender, fotos.all_foto, fotos.avatar
         FROM user LEFT JOIN fotos ON fotos.id_user=user.id
        WHERE TIMESTAMPDIFF(YEAR, `date`, CURDATE()) > $start_age and TIMESTAMPDIFF(YEAR, `date`, CURDATE()) < $end_age  LIMIT $start, $number");
      }
      else if ($this->parsedBody['sort'] == 'gender'){
        $gender = $this->parsedBody['gender'];
        $stmt = $this->conn->prepare("SELECT
          user.f_name, user.l_name, user.u_name, user.id, user.gender, fotos.all_foto, fotos.avatar
           FROM user LEFT JOIN fotos ON fotos.id_user=user.id
          WHERE `gender` = '$gender' LIMIT $start, $number");
      }
      else if ($this->parsedBody['sort'] == 'age_gender'){
        $start_age = $this->parsedBody['start_age'];
        $end_age = $this->parsedBody['end_age'];
        $gender = $this->parsedBody['gender'];
        $stmt = $this->conn->prepare("SELECT
          user.f_name, user.l_name, user.u_name, user.id, user.gender, fotos.all_foto, fotos.avatar
           FROM user LEFT JOIN fotos ON fotos.id_user=user.id
          WHERE TIMESTAMPDIFF(YEAR, `date`, CURDATE()) > $start_age and TIMESTAMPDIFF(YEAR, `date`, CURDATE()) < $end_age
          and `gender` = '$gender'  LIMIT $start, $number");
        }
      else if ($this->parsedBody['sort'] == 'tags'){
        $tmp = json_decode($this->parsedBody['param'], true);
        if (!$tmp){
          $this->rt['status'] = 'ko';
          $this->rt['error'] = 'wrong json format';
          return ;
        }
        $count = count($tmp);
        $sql = "";
        if ($count < 1){
          $this->rt['status'] = 'ko';
          $this->rt['error'] = 'no param in json';
          return ;
        }
        $block = $this->block();
        //print_r($tmp);
        if ($count === 1){
          $tg = $tmp[0];
          $sql = "SELECT user_id, count(user_id) AS `Count` FROM tags
           WHERE tags LIKE '$tg' GROUP BY user_id ORDER BY `Count` DESC";
         } else{
           $tg = $tmp[0];
           $sql = "SELECT user_id, count(user_id) AS `Count` FROM tags
            WHERE tags LIKE '$tg'";
           for ($i = 1; $i < $count; $i++){
             $tg2 = $tmp[$i];
             $sql .= "OR tags LIKE '$tg2'";
           }
           $sql .= "GROUP BY user_id ORDER BY `Count` DESC LIMIT $start, $number";
         }
         //echo $sql."\n";
         $stmt = $this->conn->prepare($sql);
         $stmt->execute([]);
         while (($row = $stmt->fetch(PDO::FETCH_ASSOC))){
           $blk = true;
           //print_r($row);
           foreach($block as $el){
             if ($el['blocked'] === $row['user_id']) {
               $blk = false;
               $this->parsedBody['number']--;
             }
           }
            if (!$blk)
              continue ;
            if ($row['user_id'] == $this->parsedBody['id'])
              continue;
           $stt = $this->conn->prepare("SELECT user.f_name, user.l_name, user.u_name, user.id, user.gender, fotos.all_foto, fotos.avatar
                                         FROM user LEFT JOIN fotos ON fotos.id_user=user.id WHERE user.id = ?");
            $stt->execute([$row['user_id']]);
            $rw = $stt->fetch(PDO::FETCH_ASSOC);
            if (!empty($row))
               array_push($this->lol, $rw);
         }
         $this->rt['data'] = $this->lol;
         $this->rt['status'] = 'ok';
         if (($this->parsedBody['number'] > $row_q) || ($this->parsedBody['number'] > count($this->lol))) {
             $this->rt['status'] = 'dbEnd';
         }
         return true;
      }
      else if ($this->parsedBody['sort'] == 'fame'){
        $sql = "SELECT `u2`, count(*) AS `rate` FROM `u_likes` GROUP BY `u2` ORDER BY `rate` DESC";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([]);
        $block = $this->block();
        while (($row = $stmt->fetch(PDO::FETCH_ASSOC))){
          $blk = true;
          //print_r($row);
          foreach($block as $el){
            if ($el['blocked'] === $row['u2']) {
              $blk = false;
              $this->parsedBody['number']--;
            }
          }
           if (!$blk)
             continue ;
           if ($row['u2'] == $this->parsedBody['id'])
             continue;
          $stt = $this->conn->prepare("SELECT user.f_name, user.l_name, user.u_name, user.id, user.gender, fotos.all_foto, fotos.avatar
                                        FROM user LEFT JOIN fotos ON fotos.id_user=user.id WHERE user.id = ?");
           $stt->execute([$row['u2']]);
           $rw = $stt->fetch(PDO::FETCH_ASSOC);
           if (!empty($row))
              array_push($this->lol, $rw);
        }
        $this->rt['data'] = $this->lol;
        $this->rt['status'] = 'ok';
        if (($this->parsedBody['number'] > $row_q) || ($this->parsedBody['number'] > count($this->lol))) {
            $this->rt['status'] = 'dbEnd';
        }
        return true;
      }
      else if ($this->parsedBody['sort'] == 'all'){
        $start_age = $this->parsedBody['start_age'];
        $end_age = $this->parsedBody['end_age'];
        $start_rate = $this->parsedBody['start_rate'];
        $end_rate = $this->parsedBody['end_age'];
        $gender = $this->parsedBody['gender'];
        $lon = $this->parsedBody['longitude'];//your longitude
        $lat = $this->parsedBody['latitude'];//your latitude
        $miles = $this->parsedBody['km'];


          $tmp = json_decode($this->parsedBody['param'], true);
          if (!$tmp){
            goto search_by_rate;
            $this->rt['status'] = 'ko';
            $this->rt['error'] = 'wrong json format';
            return ;
          }
          $count = count($tmp);
          $sql = "";
          if ($count < 1){
            goto search_by_rate;
            $this->rt['status'] = 'ko';
            $this->rt['error'] = 'no param in json';
            return ;
          }
          $block = $this->block();
          if ($count === 1){
            $tg = $tmp[0];
            $sql = "SELECT ( 1.6 * 3959 * acos( cos( radians('$lat') ) *
            cos( radians( location.latitude ) ) *
            cos( radians( location.longitude ) -
            radians('$lon') ) +
            sin( radians('$lat') ) *
            sin( radians( location.latitude ) ) ) )
            AS distance, user.f_name, user.l_name, user.u_name, user.id, user.gender,
             tags.user_id, count(tags.user_id) AS Count FROM tags JOIN user ON user.id = tags.user_id
             LEFT JOIN location ON location.user_id=tags.user_id
             WHERE tags.tags LIKE '$tg' AND user.rate >= $start_rate AND user.rate < $end_rate AND
             TIMESTAMPDIFF(YEAR, user.date, CURDATE()) >= $start_age and TIMESTAMPDIFF(YEAR, user.date, CURDATE()) < $end_age
             AND user.gender = '$gender'
             GROUP BY tags.user_id having distance < '$miles' ORDER BY `Count` DESC LIMIT $start, $number";
           } else{
             $tg = $tmp[0];
             $sql = "SELECT user.rate, user.f_name, user.l_name, user.u_name, user.id, user.gender,
              tags.user_id, count(user_id) AS Count FROM tags JOIN user ON user.id = tags.user_id
              WHERE (tags.tags LIKE '$tg'";
             for ($i = 1; $i < $count; $i++){
               $tg2 = $tmp[$i];
               $sql .= " OR tags.tags LIKE '$tg2'";
             }
             $sql .= ") AND user.rate > $start_rate AND user.rate < $end_rate AND
             TIMESTAMPDIFF(YEAR, user.date, CURDATE()) > $start_age and TIMESTAMPDIFF(YEAR, user.date, CURDATE()) < $end_age
             AND user.gender = '$gender'
             GROUP BY tags.user_id ORDER BY `Count` DESC LIMIT $start, $number";
           }
           $stmt = $this->conn->prepare($sql);
      }
      else if ($this->parsedBody['sort'] == 'all'){
        $lon = $this->parsedBody['longitude'];//your longitude
        $lat = $this->parsedBody['latitude'];//your latitude
        $miles = $this->parsedBody['km'];//your search radius
        $stmt = $this->conn->prepare("SELECT user.f_name, user.l_name, user.u_name, user.id, user.gender,
          ( 1.6 * 3959 * acos( cos( radians('$lat') ) *
          cos( radians( location.latitude ) ) *
          cos( radians( location.longitude ) -
          radians('$lon') ) +
          sin( radians('$lat') ) *
          sin( radians( location.latitude ) ) ) )
          AS distance FROM location JOIN user on user.id = location.user_id LEFT JOIN fotos ON
          fotos.id_user=location.id HAVING distance < '$miles' ORDER BY distance ASC LIMIT $start, $number");
      }
      else if (0){
        search_by_rate:
        $this->rt['tags_search'] = 'wrong json';
        $start_age = $this->parsedBody['start_age'];
        $end_age = $this->parsedBody['end_age'];
        $start_rate = $this->parsedBody['start_rate'];
        $end_rate = $this->parsedBody['end_age'];
        $gender = $this->parsedBody['gender'];
        $lon = $this->parsedBody['longitude'];//your longitude
        $lat = $this->parsedBody['latitude'];//your latitude
        $miles = $this->parsedBody['km'];//your search radius
        $stmt = $this->conn->prepare("SELECT user.f_name, user.l_name, user.u_name, user.id, user.gender, user.rate, user.date,
          ( 1.6 * 3959 * acos( cos( radians('$lat') ) *
          cos( radians( location.latitude ) ) *
          cos( radians( location.longitude ) -
          radians('$lon') ) +
          sin( radians('$lat') ) *
          sin( radians( location.latitude ) ) ) )
          AS distance FROM location JOIN user on user.id = location.user_id LEFT JOIN fotos ON
          fotos.id_user=location.id HAVING distance < '$miles' AND user.rate >= $start_rate AND user.rate < $end_rate AND
          TIMESTAMPDIFF(YEAR, user.date, CURDATE()) >= $start_age AND TIMESTAMPDIFF(YEAR, user.date, CURDATE()) < $end_age
          AND user.gender = '$gender'
           ORDER BY distance ASC LIMIT $start, $number");
      }
      else {
        $this->rt['status'] = 'ko';
        $this->rt['error'] = 'sort error';
        return ;
      }
    if ($stmt->execute([])){
      $block = $this->block();
      while (($row = $stmt->fetch(PDO::FETCH_ASSOC))){
        $blk = true;
        foreach($block as $el){
          if ($el['blocked'] === $row['id']) {
            $blk = false;
            $this->parsedBody['number']--;
          }
        }
        unset($row['all_foto']);
        if ($blk)
          array_push($usr, $row);
      }
    }
    $this->rt['data'] = $usr;
    $this->rt['status'] = 'ok';
    if (($this->parsedBody['number'] > $row_q) || ($this->parsedBody['number'] > count($usr))) {
        $this->rt['status'] = 'dbEnd';
    }
  return true;
  }
  public function block(){
    $stmt = $this->conn->prepare("SELECT * FROM `black_list` WHERE id = ?");
    $stmt->execute([$this->parsedBody['id']]);
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return ($row);
  }
}
