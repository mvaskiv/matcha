<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\Retchet\Chat;

    require dirname(__DIR__) . '/../vendor/autoload.php';

    $server = IoServer::factory(
      new Chat('pl, work'),
        8300
    );

    $server->run();
