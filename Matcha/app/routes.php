<?php

use PDO;

$app->post('/registration', 'RegistrationController:insert');
$app->post('/login', 'LoginController:insert');
$app->post('/myprofile', 'MyprofileController:insert');
$app->post('/myprofile/avatar', 'UploadController:avatar');
$app->post('/users', 'UsersController:insert');
$app->post('/uploadphoto', 'UploadController:insert');
$app->post('/delphoto', 'UploadController:delete');
$app->post('/send', 'UploadController:send');
$app->post('/getchats', 'UploadController:getchats');
$app->post('/msghistory', 'UploadController:messagehistory');
$app->post('/fbtoken', 'UploadController:fb_token');
$app->post('/bladd', 'blockUserController:insert');
// $app->post('/getchatmates', 'LikedUsers:insert');
$app->post('/like', 'LikeController:insert');
$app->post('/foget', 'FogetController:foget');
$app->post('/reinstall', 'ConfirmationController:foget');
$app->get('/confirmation', 'ConfirmationController:insert');
$app->post('/update_info', 'UpdateUserController:insert');
$app->post('/getchatmates', 'BothLikeController:insert');
$app->post('/chat', function ($request, $response, $args) {
    return $response->withRedirect('chat.html');;
});

$app->post('/pushnotification', 'NotificationController:push');
$app->post('/deletenotification', 'NotificationController:delete');
$app->post('/selectnotification', 'NotificationController:select');

$app->post('/fakeuser', 'FakeController:insert');
