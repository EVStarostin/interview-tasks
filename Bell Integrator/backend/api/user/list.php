<?php

  // подключаем скрипт с настройками бд
	require_once '../../db/connection.php'; 
	sleep($WAITING_TIME);

	// получаем данные post запроса
	$post = json_decode(file_get_contents('php://input'), true);

	if (!isset($post['officeId'])) {
		echo json_encode(array("error" => "не указан ID офиса"), JSON_UNESCAPED_UNICODE);
		exit;
	} 

	$officeId = $post['officeId'];
  $firstName = $post['firstName'];
  $lastName = $post['lastName'];
  $middleName = $post['middleName'];
  $position = $post['position'];
  $docCode = $post['docCode'];
  $citizenshipCode = $post['citizenshipCode'];

	$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));

  mysqli_set_charset($link, 'utf8');

  // sql запрос
	$sql = "SELECT `id`, `firstName`, `lastName`, `middleName`, `position` FROM `users` WHERE `officeId` = '$officeId' AND `firstName` LIKE '%$firstName%' AND `lastName` LIKE '%$lastName%' AND `middleName` LIKE '%$middleName%' AND `position` LIKE '%$position%' AND `docCode` = '$docCode' AND `citizenshipCode` = '$citizenshipCode'";

	$result = mysqli_query($link, $sql) or die("Ошибка " . mysqli_error($link)); 

	// обрабатываем результат запроса
  $org_arr = array();

	if ($result) {

    while($row = mysqli_fetch_array($result))
		{

			$org_arr[] = array(
				"id" => $row['id'],
				"firstName" => $row['firstName'],
				"lastName" => $row['lastName'],
				"middleName" => $row['middleName'],
				"position" => $row['position']
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