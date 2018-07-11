<?php
$one = hash('ripemd160', crypt('12345', "apple").(time()));
sleep(2);
$two = hash('ripemd160', crypt('12345', "apple").(time()));

if ($one < $two)
  echo "work\n";

var_dump(hash_equals($one, $two));
