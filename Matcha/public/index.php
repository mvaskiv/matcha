<?php

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\Retchet\Chat;

require_once __DIR__ .'/../bootstrap/app.php';

//phpinfo();

$app->run();
