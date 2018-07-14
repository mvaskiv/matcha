<?php

$app->post('/registration', 'RegistrationController:insert');
$app->post('/login', 'LoginController:insert');
$app->post('/users', 'UsersController:insert');
$app->get('/chat', function ($request, $response, $args) {
    return $response->withRedirect('chat.html');;
});
