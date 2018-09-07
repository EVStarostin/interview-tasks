// api/docs
function getDocs() {

/*	var json = JSON.stringify({
		orgId: document.getElementsByName("office_org_id")[0].value,
		name: document.getElementsByName("office_name")[0].value,
		phone: document.getElementsByName("office_phone")[0].value,
		isActive: document.getElementsByName("office_list_isActive")[0].checked
	});*/

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/bellintegrator/api/docs.php', true);

	//Передает правильный заголовок в запросе
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	//Вызывает функцию при смене состояния.
	xhr.onreadystatechange = function() {

		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			docs_output.innerHTML = '';
			docs_btn.innerHTML = 'Выполнить';
			docs_btn.disabled = false;

			var docs = JSON.parse(this.responseText).data;
			for (var i = 0; i < docs.length; i++) {
				docs_output.innerHTML += 
				'name: ' + docs[i].name + ', ' + 
				'code: ' + docs[i].code + '<br>';
			}

		}

	}

	xhr.send(); 

	docs_btn.innerHTML = 'Загружаю...'; // (2)
	docs_btn.disabled = true;
	docs_output.innerHTML = '...';	

}