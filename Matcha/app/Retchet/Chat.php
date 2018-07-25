<?php
namespace App\Retchet;


use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use App\Retchet\UserIndetify;


class Chat implements MessageComponentInterface {
    protected $clients;
    private $user;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->user = new UserIndetify;
    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages to later
        $this->clients->attach($conn);
        $querystring = (explode('=', $conn->httpRequest->getUri()->getQuery()))[1];
        $this->user->addUser($querystring ,$conn->resourceId);

        echo "New connection! ({$conn->resourceId}) id ({$querystring})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $br = false;
        $rt = array();
        $token = "";
        $numRecv = count($this->clients) - 1;
        // echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
        //     , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');

<<<<<<< HEAD
        $tmp = json_decode($msg, true);
        // var_dump($tmp);
        // return ;
        if (!($token = $this->user->checkInput($tmp))){
=======
        print_r($from->resourceId);
        return ;
        $tmp = json_decode($json, true);
        if (!($token =$this->user->checkInput($tmp))){
>>>>>>> 31dfb68c3231c602c30c947b0df6207c6021744c
          $this->rt['status'] = 'ko';
          $this->rt['error'] = 'error';
        //   $from->send(json_encode($this->rt));
          return ;
        }else {
          if ($this->user->receiver($tmp['to'])){
            $this->rt['status'] = 'ok';
          }
          else{
            $this->rt['status'] = 'ko';
            $this->rt['error'] = 'receiver ofline';
            // $from->send(json_encode($this->rt));
          }
          $this->rt['token'] = $token;
        //   $from->send(json_encode($this->rt));
        }
        
        foreach ($this->clients as $client) {
<<<<<<< HEAD
            // print_r($client);
            // echo $this->user->receiver($tmp['to']) . '\n';
            if ($this->user->receiver($tmp['to']) === $client->resourceId) {
=======
           if ($this->user->receiver($tmp['to']) === $client->resourceId) {
>>>>>>> 31dfb68c3231c602c30c947b0df6207c6021744c
             $client->send($tmp['msg']);
           }
         }
    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);
        $this->user->dropUser($conn->resourceId);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}
