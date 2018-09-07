<?php

  // подключаем скрипт с настройками бд
	require_once '../../db/connection.php'; 
	sleep($WAITING_TIME);

	// получаем данные post запроса
	$post = json_decode(file_get_contents('php://input'), true);

	$id = $post['id'];
	$name = $post['name'];
	$address = $post['address'];
  $phone = $post['phone'];
  $isActive = ($post['isActive'] == true) ? 1 : 0;
	
	$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));

  mysqli_set_charset($link, 'utf8');

  // sql запрос
  $sql = "UPDATE `offices` SET `name` = '$name', `address` = '$address', `phone` = '$phone', `isActive` = '$isActive' WHERE `offices`.`id` = '$id'";

  $result = mysqli_query($link, $sql);
	if(!$result)
        die(mysqli_error($link));

  if (mysqli_affected_rows($link) > 0) {
  	echo json_encode(array("result" => "success"), JSON_UNESCAPED_UNICODE);
		mysqli_close($link);
		exit;
  } else {
  	echo json_encode(array("error" => "Офис с ID = $id не найден"), JSON_UNESCAPED_UNICODE);
		mysqli_close($link);
		exit;
  }

?>