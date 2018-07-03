<?php
$arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);
$userData = json_encode($arr);
echo '{"data": ' . $userData . '}';