<?php

	// подключаем скрипт с настройками бд
	require_once '../../db/connection.php'; 
	sleep($WAITING_TIME);

	// получаем данные post запроса
	$post = json_decode(file_get_contents('php://input'), true);

	$id = $post['id'];
	$firstName = $post['firstName'];
	$lastName = $post['lastName'];
	$middleName = $post['middleName'];
	$position = $post['position'];
	$phone = $post['phone'];
	$docName = $post['docName'];
	$docNumber = $post['docNumber'];
	$docDate = $post['docDate'];
	$docCode = $post['docCode'];
	$citizenshipName = $post['citizenshipName'];
	$citizenshipCode = $post['citizenshipCode'];
  $isIdentified = ($post['isIdentified'] == true) ? 1 : 0;
	
  // подключаем скрипт с настройками бд
	require_once '../../db/connection.php'; 
	$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));

  mysqli_set_charset($link, 'utf8');

  // sql запрос
  $sql = "UPDATE `users` SET `firstName` = '$firstName', `lastName` = '$lastName', `middleName` = '$middleName', `position` = '$position', `phone` = '$phone', `docName` = '$docName', `docNumber` = '$docNumber', `docDate` = '$docDate', `docCode` = '$docCode', `citizenshipName` = '$citizenshipName', `citizenshipCode` = '$citizenshipCode', `isIdentified` = '$isIdentified' WHERE `users`.`id` = '$id'";

  $result = mysqli_query($link, $sql);
	if(!$result)
        die(mysqli_error($link));

  if (mysqli_affected_rows($link) > 0) {
  	echo json_encode(array("result" => "success"), JSON_UNESCAPED_UNICODE);
		mysqli_close($link);
		exit;
  } else {
  	echo json_encode(array("error" => "Сотрудник с ID = $id не найден"), JSON_UNESCAPED_UNICODE);
		mysqli_close($link);
		exit;
  }

?>

