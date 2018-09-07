<?php

  // подключаем скрипт с настройками бд
  require_once '../db/connection.php'; 
	sleep($WAITING_TIME);

	// получаем данные post запроса
	$post = json_decode(file_get_contents('php://input'), true);

	$login = $post['login'];
	$pass = $post['password'];
	
	$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));

  mysqli_set_charset($link, 'utf8');

  // sql запрос
  $sql = "SELECT * FROM `logins` WHERE `login` = '$login' AND `password` = '$pass' LIMIT 1";

  $result = mysqli_query($link, $sql);
	if(!$result)
        die(mysqli_error($link));

  if (!mysqli_num_rows($result)) {

    echo json_encode(array("error" => "Неверный логин и/или пароль"), JSON_UNESCAPED_UNICODE);
    mysqli_close($link);
    exit;

  } else {

    echo json_encode(array("result" => "success"), JSON_UNESCAPED_UNICODE);
    mysqli_close($link);
    exit;

  }

?>