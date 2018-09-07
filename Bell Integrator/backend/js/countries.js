// api/countries
function getCountries() {

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/bellintegrator/api/countries.php', true);

	//Передает правильный заголовок в запросе
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	//Вызывает функцию при смене состояния.
	xhr.onreadystatechange = function() {

		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			countries_output.innerHTML = '';
			countries_btn.innerHTML = 'Выполнить';
			countries_btn.disabled = false;

			var countries = JSON.parse(this.responseText).data;
			for (var i = 0; i < countries.length; i++) {
				countries_output.innerHTML += 
				'name: ' + countries[i].name + ', ' + 
				'code: ' + countries[i].code + '<br>';
			}

		}

	}

	xhr.send(); 

	countries_btn.innerHTML = 'Загружаю...'; // (2)
	countries_btn.disabled = true;
	countries_output.innerHTML = '...';	

}