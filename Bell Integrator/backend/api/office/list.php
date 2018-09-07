<?php

  // подключаем скрипт с настройками бд
	require_once '../../db/connection.php'; 
	sleep($WAITING_TIME);

	// получаем данные post запроса
	$post = json_decode(file_get_contents('php://input'), true);

	if (!isset($post['orgId'])) {
		echo json_encode(array("error" => "не указан ID организации"), JSON_UNESCAPED_UNICODE);
		exit;
	} 

	$orgId = $post['orgId'];
  $name = $post['name'];
  $phone = $post['phone'];
  $isActive = ($post['isActive'] == true) ? 1 : '';

	$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));

  mysqli_set_charset($link, 'utf8');

  // sql запрос
  $sql = "SELECT `id`, `name`, `phone`, `isActive` FROM `offices` WHERE `orgId` = '$orgId' AND `name` LIKE '%$name%' AND `phone` LIKE '%$phone%' AND `isActive` LIKE '%$isActive%'";

	$result = mysqli_query($link, $sql) or die("Ошибка " . mysqli_error($link)); 

	// обрабатываем результат запроса
  $org_arr = array();

	if ($result) {

    while($row = mysqli_fetch_array($result))
		{

			$org_arr[] = array(
				"id" => $row['id'],
				"name" => $row['name'],
				"phone" => $row['phone'],
				"isActive" => ($row['isActive'] == 1) ? true : false,
			);

		}

	}

	$array = array(
		"data" => $org_arr
	);

	echo json_encode($array, JSON_UNESCAPED_UNICODE);

  // закрываем подключение
	mysqli_close($link);
	exit();

?>