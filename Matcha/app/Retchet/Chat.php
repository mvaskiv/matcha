<?php
namespace App\Retchet;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Myclent extends \SplObjectStorage{
  public function rt(){
    return "work";
  }
}

class Chat implements MessageComponentInterface {
    protected $clients;
    protected $var;

    public function __construct($var) {
        // $this->clients = new \SplObjectStorage;
        $this->clients = new Myclent;
        $this->var = $var;
    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages to later
        $this->clients->attach($conn);
        //var_dump($conn);
        //var_dump($this->clients);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $numRecv = count($this->clients) - 1;
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
            , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');

        foreach ($this->clients as $client) {
            // print_r($client->resourceId);
            // if ($from === $client) {
                // The sender is not the receiver, send to each client connected
                //$client->send(45, $msg);
                //$client->send($this->clients->rt());
          //  }
        //  if (65 == $client->resourceId) {
                $client->send($msg);
                $tt = array(
                  'answer' => 'yes',
                  'from' => '123'
                );
                $client->send(json_encode($tt));
  // }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}
