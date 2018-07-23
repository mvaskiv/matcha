<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\Retchet\Chat;

require_once __DIR__ .'/../bootstrap/app.php';
    //require dirname(__DIR__) . '/vendor/autoload.php';

    $server = IoServer::factory(
      new HttpServer(
          new WsServer(
              new Chat('hell')
          )
      ),
      8200
    );

    $server->run();
