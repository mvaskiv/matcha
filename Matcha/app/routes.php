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
$app->post('/block', 'blockUserController:insert');
$app->post('/like', 'LikeController:insert');
$app->get('/confirmation', 'ConfirmationController:insert');
$app->post('/foget', 'FogetController:foget');
$app->post('/updateuser', 'UpdateUserController:insert');

$app->post('/bothlike', 'BothLikeController:insert');

$app->post('/reinstall', 'ConfirmationController:foget');
