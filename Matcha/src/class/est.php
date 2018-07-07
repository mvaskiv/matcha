<?php
require_once  (__DIR__."/Mysql.class.php");

$test = array('Insert' => array('value' => array('f_name') , 'key' => array('vasy') ), 'Table' => 'user');
try{
$obj = new Mysql($test);
} catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
?>
