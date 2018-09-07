// api/organization/list
function getOrganizationsList() {

	var json = JSON.stringify({
		name: document.getElementsByName("org_list_name")[0].value,
		inn: document.getElementsByName("org_list_inn")[0].value,
		isActive: document.getElementsByName("org_list_isActive")[0].checked
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/bellintegrator/api/organization/list.php', true);

	//Передает правильный заголовок в запросе
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	//Вызывает функцию при смене состояния.
	xhr.onreadystatechange = function() {

		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			org_list_output.innerHTML = '';
			org_list_btn.innerHTML = 'Выполнить';
			org_list_btn.disabled = false;

			var organizations = JSON.parse(this.responseText).data;
			for (var i = 0; i < organizations.length; i++) {
				org_list_output.innerHTML += 
				'id: ' + organizations[i].id + ', ' + 
				'name: ' + organizations[i].name + ', ' + 
				'inn: ' + organizations[i].inn + ', ' + 
				'isActive: ' + organizations[i].isActive + '<br>';
			}

		}

	}

	xhr.send(json); 

	org_list_btn.innerHTML = 'Загружаю...'; // (2)
	org_list_btn.disabled = true;
	org_list_output.innerHTML = '...';

}


// api/organization/{id:.+}
function getOrganizationById() {

	var id = document.getElementsByName("org_get_id")[0].value;

	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/bellintegrator/api/organization/get.php?id='+id, true);

	xhr.onreadystatechange = function() {

		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			org_get_btn.innerHTML = 'Выполнить';
			org_get_btn.disabled = false;

			if (JSON.parse(xhr.responseText).error) {

				 org_get_output.innerHTML = JSON.parse(xhr.responseText).error;

			} else {

				organization = JSON.parse(xhr.responseText).data;
				org_get_output.innerHTML =
				'id: ' + organization.id + '<br>' +
				'name: ' + organization.name + '<br>' + 
				'fullName: ' + organization.fullName + '<br>' + 
				'inn: ' + organization.inn + '<br>' + 
				'kpp: ' + organization.kpp + '<br>' + 
				'address: ' + organization.address + '<br>' +
				'phone: ' + organization.phone + '<br>' + 
				'isActive: ' + organization.isActive + '<br>';

			}
			
		}

	}

	xhr.send();

	org_get_btn.innerHTML = 'Загружаю...'; // (2)
	org_get_btn.disabled = true;
	org_get_output.innerHTML = '...';

}


// api/organization/update
function updateOrganization() {

	var json = JSON.stringify({
		id: document.getElementsByName("org_update_id")[0].value,
		name: document.getElementsByName("org_update_name")[0].value,
		fullName: document.getElementsByName("org_update_fullname")[0].value,
		inn: document.getElementsByName("org_update_inn")[0].value,
		kpp: document.getElementsByName("org_update_kpp")[0].value,
		address: document.getElementsByName("org_update_address")[0].value,
		phone: document.getElementsByName("org_update_phone")[0].value,
		isActive: document.getElementsByName("org_update_isactive")[0].checked,
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/bellintegrator/api/organization/update.php', true);

	//Передает правильный заголовок в запросе
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	//Вызывает функцию при смене состояния.
	xhr.onreadystatechange = function() {

		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			org_update_btn.innerHTML = 'Выполнить'; // (2)
			org_update_btn.disabled = false;

			if (JSON.parse(xhr.responseText).error) {

			 	org_update_output.innerHTML = JSON.parse(xhr.responseText).error;

			} else {

				org_update_output.innerHTML = JSON.parse(xhr.responseText).result;

			}

		}

	}

	xhr.send(json); 

	org_update_btn.innerHTML = 'Загружаю...'; // (2)
	org_update_btn.disabled = true;
	org_update_output.innerHTML = '...';

}


// api/organization/save
function saveOrganization() {

	var json = JSON.stringify({
		name: document.getElementsByName("org_save_name")[0].value,
		fullName: document.getElementsByName("org_save_fullname")[0].value,
		inn: document.getElementsByName("org_save_inn")[0].value,
		kpp: document.getElementsByName("org_save_kpp")[0].value,
		address: document.getElementsByName("org_save_address")[0].value,
		phone: document.getElementsByName("org_save_phone")[0].value,
		isActive: document.getElementsByName("org_save_isactive")[0].checked,
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/bellintegrator/api/organization/save.php', true);

	//Передает правильный заголовок в запросе
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	xhr.onreadystatechange = function() {//Вызывает функцию при смене состояния.
		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			org_save_btn.innerHTML = 'Выполнить'; // (2)
			org_save_btn.disabled = false;

			if (JSON.parse(xhr.responseText).error) {

			 	org_save_output.innerHTML = JSON.parse(xhr.responseText).error;

			} else {

				org_save_output.innerHTML = JSON.parse(xhr.responseText).result;

			}

		}

	}

	xhr.send(json); 

	org_save_btn.innerHTML = 'Загружаю...'; // (2)
	org_save_btn.disabled = true;
	org_save_output.innerHTML = '...';

}


// api/organization/delete
function deleteOrganization() {

	var json = JSON.stringify({
		id: document.getElementsByName("org_delete_id")[0].value,
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/bellintegrator/api/organization/delete.php', true);

	//Передает правильный заголовок в запросе
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	//Вызывает функцию при смене состояния.
	xhr.onreadystatechange = function() {

		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			org_delete_btn.innerHTML = 'Выполнить';
			org_delete_btn.disabled = false;

			if (JSON.parse(xhr.responseText).error) {

			 	org_delete_output.innerHTML = JSON.parse(xhr.responseText).error;

			} else {

				org_delete_output.innerHTML = JSON.parse(xhr.responseText).result;

			}

		}

	}

	xhr.send(json); 

	org_delete_btn.innerHTML = 'Загружаю...'; // (2)
	org_delete_btn.disabled = true;
	org_delete_output.innerHTML = '...';

}