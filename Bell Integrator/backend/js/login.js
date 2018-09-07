// api/organization/update
function signIn() {

	var json = JSON.stringify({
		login: document.getElementsByName("login_login")[0].value,
		password: document.getElementsByName("login_password")[0].value
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/bellintegrator/api/login.php', true);

	//Передает правильный заголовок в запросе
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	//Вызывает функцию при смене состояния.
	xhr.onreadystatechange = function() {

		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			login_btn.innerHTML = 'Выполнить'; // (2)
			login_btn.disabled = false;

			if (JSON.parse(xhr.responseText).error) {

			 	login_output.innerHTML = JSON.parse(xhr.responseText).error;

			} else {

				login_output.innerHTML = JSON.parse(xhr.responseText).result;

			}

		}

	}

	xhr.send(json); 

	login_btn.innerHTML = 'Загружаю...'; // (2)
	login_btn.disabled = true;
	login_output.innerHTML = '...';

}