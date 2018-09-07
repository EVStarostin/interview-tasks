<?php

  // подключаем скрипт с настройками бд
  require_once '../../db/connection.php'; 
  sleep($WAITING_TIME);

	// получаем данные post запроса
	$post = json_decode(file_get_contents('php://input'), true);

	$name = $post['name'];
	$fullName = $post['fullName'];
  $inn = $post['inn'];
  $kpp = $post['kpp'];
  $address = $post['address'];
  $phone = $post['phone'];
  $isActive = ($post['isActive'] == true) ? 1 : 0;

	$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));

  mysqli_set_charset($link, 'utf8');

  // sql запрос
  $sql = "INSERT INTO `organizations` (`id`, `name`, `fullName`, `inn`, `kpp`, `address`, `phone`, `isActive`) VALUES (NULL, '$name', '$fullName', '$inn', '$kpp', '$address', '$phone', '$isActive')";

  $result = mysqli_query($link, $sql);
	if(!$result)
        die(mysqli_error($link));

  if (mysqli_affected_rows($link) > 0) {
  	echo json_encode(array("result" => "success"), JSON_UNESCAPED_UNICODE);
		mysqli_close($link);
		exit;
  } else {
  	echo json_encode(array("error" => "Добавление организации не выполнено"), JSON_UNESCAPED_UNICODE);
		mysqli_close($link);
		exit;
  }

?>