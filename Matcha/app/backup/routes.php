<?php

$app->post('/registration', 'RegistrationController:insert');
$app->post('/login', 'LoginController:insert');
$app->post('/myprofile', 'MyprofileController:insert');
$app->post('/myprofile/avatar', 'UploadController:avatar');
$app->post('/users', 'UsersController:insert');
$app->post('/uploadphoto', 'UploadController:insert');
$app->post('/delphoto', 'UploadController:delete');
$app->post('/chat', function ($request, $response, $args) {
    return $response->withRedirect('chat.html');;
});
