<?php

namespace App\Traits;

use PDO;

trait sendMail{
/*
  @param{
  to => '',
  subject => '',
  text => ''
}
*/
protected function sendMail(array $param){
    $mailHeaders = 'MIME-version: 1.0' . "\r\n";
		$mailHeaders .= 'Content-Type:text/html;charset=UTF-8' . "\r\n";
		$mailHeaders .= 'From: noreply@camagru.com' . "\r\n";
		$mailHeaders .= 'Content-Transfer-Encoding: 8bit' . "\r\n";
		$mailHeaders .= 'Date: ' . date("r (T)") . "\r\n";
		$mailHeaders .= iconv_mime_encode("Subject", "Registration to Camagru");

    mail($param['to'], $param['subject'], $param['text'], $mailHeaders);
  }

  /*
    @param{
    to => '',
    id => ''
  }
  */
protected function sendActivationMail(array $param){
  $subject = "Activation";
  $txt = "Hello!\n";
  $txt .= "In order to activate your login folow to the link:\n";
  $link = hash('ripemd160', $param['to']);
  $txt .= "http://localhost:8100/confirmation?id=".$param['id']."&key=".$link;
  $this->sendMail(array(
    'to' => $param['to'],
    'subject' => $subject,
    'text' => $txt
  )
  );
  return $link;
}

protected function sendReinstallMail(array $param){
  $subject = "Reinstall";
  $txt = "Hello!\n";
  $txt .= "In order reinstall password folow to the link:\n";
  $link = hash('ripemd160', $param['to']).hash('ripemd160', "secret");
  $txt .= "http://localhost:8100/reinstall?id=".$param['id']."&key=".$link;
  $this->sendMail(array(
    'to' => $param['to'],
    'subject' => $subject,
    'text' => $txt
  )
  );
  return $link;
}

protected function FakeMail(array $param){
  $subject = "Fake";
  $txt = "Hello!\n";
  $txt .= "Are you fake user?:\n";
  $this->sendMail(array(
    'to' => $param['to'],
    'subject' => $subject,
    'text' => $txt
  )
  );
  return $link;
}

}
