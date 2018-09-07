<?php

  // подключаем скрипт с настройками бд
	require_once '../../db/connection.php'; 
	sleep($WAITING_TIME);

	// получаем данные post запроса
	if ($_GET['id']) {
		$id = $_GET['id'];
	} else {
		echo json_encode(array("error" => "не указан ID организации"), JSON_UNESCAPED_UNICODE);
		exit;
	}

	$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));

  mysqli_set_charset($link, 'utf8');

  // sql запрос
  $sql = "SELECT `id`, `name`, `fullName`, `inn`, `kpp`, `address`, `phone`, `isActive` FROM `organizations` WHERE `id` = '$id'";

	$result = mysqli_query($link, $sql) or die("Ошибка " . mysqli_error($link)); 

	if (!mysqli_num_rows($result)) {

		echo json_encode(array("error" => "Организация с ID = $id не найдена"), JSON_UNESCAPED_UNICODE);
		mysqli_close($link);
		exit;

	} else {

		$row = mysqli_fetch_array($result);
		$org_arr = array(
			"id" => $row['id'],
			"name" => $row['name'],
			"fullName" => $row['fullName'],
			"inn" => $row['inn'],
			"kpp" => $row['kpp'],
			"address" => $row['address'],
			"phone" => $row['phone'],
			"isActive" => ($row['isActive'] == 1) ? true : false,
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