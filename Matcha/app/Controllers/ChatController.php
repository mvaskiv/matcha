<?php
namespace App\Controllers;

use App\Controllers\BasicToken;
use Slim\Http\UploadedFile;
use PDO;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\Retchet\Chat;


class ChatController extends BasicToken {

public function insert($request, $response){
  $server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Chat('Controller')
        )
    ),
    8200
  );
  return $response->withRedirect('chat.html');
}

}
