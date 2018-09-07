// api/user/list
function getUsersList() {

	var json = JSON.stringify({
		officeId: document.getElementsByName("user_office_id")[0].value,
		firstName: document.getElementsByName("user_firstName")[0].value,
		lastName: document.getElementsByName("user_lastName")[0].value,
		middleName: document.getElementsByName("user_middleName")[0].value,
		position: document.getElementsByName("user_position")[0].value,
		docCode: document.getElementsByName("user_docCode")[0].value,
		citizenshipCode: document.getElementsByName("user_citizenshipCode")[0].value,
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/bellintegrator/api/user/list.php', true);

	//Передает правильный заголовок в запросе
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	//Вызывает функцию при смене состояния.
	xhr.onreadystatechange = function() {

		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			user_list_output.innerHTML = '';
			user_list_btn.innerHTML = 'Выполнить';
			user_list_btn.disabled = false;

			var organizations = JSON.parse(this.responseText).data;
			for (var i = 0; i < organizations.length; i++) {
				user_list_output.innerHTML += 
				'id: ' + organizations[i].id + ', ' + 
				'firstName: ' + organizations[i].firstName + ', ' + 
				'lastName: ' + organizations[i].lastName + ', ' + 
				'middleName: ' + organizations[i].middleName + ', ' + 
				'position: ' + organizations[i].position + '<br>';
			}

		}

	}

	xhr.send(json); 

	user_list_btn.innerHTML = 'Загружаю...'; // (2)
	user_list_btn.disabled = true;
	user_list_output.innerHTML = '...';

}


// api/user/{id:.+}
function getUserById() {

	var id = document.getElementsByName("user_get_id")[0].value;

	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/bellintegrator/api/user/get.php?id='+id, true);

	xhr.onreadystatechange = function() {

		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			user_get_btn.innerHTML = 'Выполнить';
			user_get_btn.disabled = false;

			if (JSON.parse(xhr.responseText).error) {

				 user_get_output.innerHTML = JSON.parse(xhr.responseText).error;

			} else {

				organization = JSON.parse(xhr.responseText).data;
				user_get_output.innerHTML =
				'id: ' + organization.id + '<br>' +
				'firstName: ' + organization.firstName + '<br>' + 
				'lastName: ' + organization.lastName + '<br>' +
				'middleName: ' + organization.middleName + '<br>' +
				'position: ' + organization.position + '<br>' +
				'phone: ' + organization.phone + '<br>' + 
				'docName: ' + organization.docName + '<br>' + 
				'docNumber: ' + organization.docNumber + '<br>' + 
				'docDate: ' + organization.docDate + '<br>' + 
				'citizenshipName: ' + organization.citizenshipName + '<br>' + 
				'citizenshipCode: ' + organization.citizenshipCode + '<br>' + 
				'isIdentified: ' + organization.isIdentified + '<br>';

			}
		
		}

	}

	xhr.send();

	user_get_btn.innerHTML = 'Загружаю...'; // (2)
	user_get_btn.disabled = true;
	user_get_output.innerHTML = '...';
}


// api/user/update
function updateUser() {

	var docSelected = document.getElementsByName("user_update_docCode")[0];
	var citizenshipSelected = document.getElementsByName("user_update_citizenshipCode")[0];

	var json = JSON.stringify({
		id: document.getElementsByName("user_update_id")[0].value,
		firstName: document.getElementsByName("user_update_firstName")[0].value,
		lastName: document.getElementsByName("user_update_lastName")[0].value,
		middleName: document.getElementsByName("user_update_middleName")[0].value,
		position: document.getElementsByName("user_update_position")[0].value,
		phone: document.getElementsByName("user_update_phone")[0].value,
		docName: docSelected.options[docSelected.options.selectedIndex].innerText,
		docNumber: document.getElementsByName("user_update_docNumber")[0].value,
		docDate: document.getElementsByName("user_update_docDate")[0].value,
		docCode: docSelected.value,
		citizenshipName: citizenshipSelected.options[citizenshipSelected.options.selectedIndex].innerText,
		citizenshipCode: citizenshipSelected.value,
		isIdentified: document.getElementsByName("user_update_isidentified")[0].checked,
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/bellintegrator/api/user/update.php', true);

	//Передает правильный заголовок в запросе
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	//Вызывает функцию при смене состояния.
	xhr.onreadystatechange = function() {

		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			user_update_btn.innerHTML = 'Выполнить'; // (2)
			user_update_btn.disabled = false;

			if (JSON.parse(xhr.responseText).error) {

			 	user_update_output.innerHTML = JSON.parse(xhr.responseText).error;

			} else {

				user_update_output.innerHTML = JSON.parse(xhr.responseText).result;

			}

		}

	}

	xhr.send(json); 

	user_update_btn.innerHTML = 'Загружаю...'; // (2)
	user_update_btn.disabled = true;
	user_update_output.innerHTML = '...';

}


// api/user/delete
function deleteUser() {

	var json = JSON.stringify({
		id: document.getElementsByName("user_delete_id")[0].value,
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/bellintegrator/api/user/delete.php', true);

	//Передает правильный заголовок в запросе
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	//Вызывает функцию при смене состояния.
	xhr.onreadystatechange = function() {

		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			user_delete_btn.innerHTML = 'Выполнить';
			user_delete_btn.disabled = false;

			if (JSON.parse(xhr.responseText).error) {

			 	user_delete_output.innerHTML = JSON.parse(xhr.responseText).error;

			} else {

				user_delete_output.innerHTML = JSON.parse(xhr.responseText).result;

			}

		}

	}

	xhr.send(json); 

	user_delete_btn.innerHTML = 'Загружаю...'; // (2)
	user_delete_btn.disabled = true;
	user_delete_output.innerHTML = '...';

}


// api/user/save
function saveUser() {

	var docSelected = document.getElementsByName("user_save_docCode")[0];
	var citizenshipSelected = document.getElementsByName("user_save_citizenshipCode")[0];

	var json = JSON.stringify({
		officeId: document.getElementsByName("user_save_officeId")[0].value,
		firstName: document.getElementsByName("user_save_firstName")[0].value,
		lastName: document.getElementsByName("user_save_lastName")[0].value,
		middleName: document.getElementsByName("user_save_middleName")[0].value,
		position: document.getElementsByName("user_save_position")[0].value,
		phone: document.getElementsByName("user_save_phone")[0].value,
		docName: docSelected.options[docSelected.options.selectedIndex].innerText,
		docNumber: document.getElementsByName("user_save_docNumber")[0].value,
		docDate: document.getElementsByName("user_save_docDate")[0].value,
		docCode: docSelected.value,
		citizenshipName: citizenshipSelected.options[citizenshipSelected.options.selectedIndex].innerText,
		citizenshipCode: citizenshipSelected.value,
		isIdentified: document.getElementsByName("user_save_isidentified")[0].checked
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/bellintegrator/api/user/save.php', true);

	//Передает правильный заголовок в запросе
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	xhr.onreadystatechange = function() {//Вызывает функцию при смене состояния.
		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			user_save_btn.innerHTML = 'Выполнить'; // (2)
			user_save_btn.disabled = false;

			if (JSON.parse(xhr.responseText).error) {

			 	user_save_output.innerHTML = JSON.parse(xhr.responseText).error;

			} else {

				user_save_output.innerHTML = JSON.parse(xhr.responseText).result;

			}

		}

	}

	xhr.send(json); 

	user_save_btn.innerHTML = 'Загружаю...'; // (2)
	user_save_btn.disabled = true;
	user_save_output.innerHTML = '...';

}