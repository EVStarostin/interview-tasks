<?php

	// подключаем скрипт с настройками бд
	require_once '../../db/connection.php'; 
	sleep($WAITING_TIME);

	// получаем данные post запроса
	if ($_GET['id']) {
		$id = $_GET['id'];
	} else {
		echo json_encode(array("error" => "не указан ID сотрудника"), JSON_UNESCAPED_UNICODE);
		exit;
	}

	$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));

  mysqli_set_charset($link, 'utf8');

  // sql запрос
  $sql = "SELECT `id`, `firstName`, `lastName`, `middleName`, `position`, `phone`, `docCode`, `docName`, `docNumber`, `docDate`, `citizenshipName`, `citizenshipCode`, `isIdentified` FROM `users` WHERE `id` = '$id'";

	$result = mysqli_query($link, $sql) or die("Ошибка " . mysqli_error($link)); 

	if (!mysqli_num_rows($result)) {

		echo json_encode(array("error" => "Сотрудник с ID = $id не найден"), JSON_UNESCAPED_UNICODE);
		mysqli_close($link);
		exit;

	} else {

		$row = mysqli_fetch_array($result);
		$org_arr = array(
			"id" => $row['id'],
			"firstName" => $row['firstName'],
			"lastName" => $row['lastName'],
			"middleName" => $row['middleName'],
			"position" => $row['position'],
			"phone" => $row['phone'],
			"docCode" => $row['docCode'],
			"docName" => $row['docName'],
			"docNumber" => $row['docNumber'],
			"docDate" => $row['docDate'],
			"citizenshipName" => $row['citizenshipName'],
			"citizenshipCode" => $row['citizenshipCode'],
			"isIdentified" => ($row['isIdentified'] == 1) ? true : false,
		);

		$array = array(
			"data" => $org_arr
		);

		echo json_encode($array, JSON_UNESCAPED_UNICODE);

	  // закрываем подключение
		mysqli_close($link);
		exit();

	}

?>