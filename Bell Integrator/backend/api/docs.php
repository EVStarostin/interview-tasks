<?php

  // подключаем скрипт с настройками бд
	require_once '../db/connection.php'; 
	sleep($WAITING_TIME);

	$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));

  mysqli_set_charset($link, 'utf8');

  // sql запрос
	$sql = "SELECT `name`, `code` FROM `docs`";

	$result = mysqli_query($link, $sql) or die("Ошибка " . mysqli_error($link)); 

	// обрабатываем результат запроса
  $docs_arr = array();

	if ($result) {

    while($row = mysqli_fetch_array($result))
		{

			$docs_arr[] = array(
				"name" => $row['name'],
				"code" => $row['code']
			);

		}

	}

	$array = array(
		"data" => $docs_arr
	);

	echo json_encode($array, JSON_UNESCAPED_UNICODE);

  // закрываем подключение
	mysqli_close($link);
	exit();

?>