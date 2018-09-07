// api/organization/list{orgId:.+}
function getOfficesList() {

	var json = JSON.stringify({
		orgId: document.getElementsByName("office_org_id")[0].value,
		name: document.getElementsByName("office_name")[0].value,
		phone: document.getElementsByName("office_phone")[0].value,
		isActive: document.getElementsByName("office_list_isActive")[0].checked
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/bellintegrator/api/office/list.php', true);

	//Передает правильный заголовок в запросе
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	//Вызывает функцию при смене состояния.
	xhr.onreadystatechange = function() {

		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			office_list_output.innerHTML = '';
			office_list_btn.innerHTML = 'Выполнить';
			office_list_btn.disabled = false;

			var organizations = JSON.parse(this.responseText).data;
			for (var i = 0; i < organizations.length; i++) {
				office_list_output.innerHTML += 
				'id: ' + organizations[i].id + ', ' + 
				'name: ' + organizations[i].name + ', ' + 
				'isActive: ' + organizations[i].isActive + '<br>';
			}

		}

	}

	xhr.send(json); 

	office_list_btn.innerHTML = 'Загружаю...'; // (2)
	office_list_btn.disabled = true;
	office_list_output.innerHTML = '...';	

}


// api/office/{id:.+}
function getOfficeById() {

	var id = document.getElementsByName("office_get_id")[0].value;

	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/bellintegrator/api/office/get.php?id='+id, true);

	xhr.onreadystatechange = function() {

		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			office_get_btn.innerHTML = 'Выполнить';
			office_get_btn.disabled = false;

			if (JSON.parse(xhr.responseText).error) {

				 office_get_output.innerHTML = JSON.parse(xhr.responseText).error;

			} else {

				organization = JSON.parse(xhr.responseText).data;
				office_get_output.innerHTML =
				'id: ' + organization.id + '<br>' +
				'name: ' + organization.name + '<br>' + 
				'address: ' + organization.address + '<br>' +
				'phone: ' + organization.phone + '<br>' + 
				'isActive: ' + organization.isActive + '<br>';

			}
		
		}

	}

	xhr.send();

	office_get_btn.innerHTML = 'Загружаю...'; // (2)
	office_get_btn.disabled = true;
	office_get_output.innerHTML = '...';
}


// api/office/update
function updateOffice() {

	var json = JSON.stringify({
		id: document.getElementsByName("office_update_id")[0].value,
		name: document.getElementsByName("office_update_name")[0].value,
		address: document.getElementsByName("office_update_address")[0].value,
		phone: document.getElementsByName("office_update_phone")[0].value,
		isActive: document.getElementsByName("office_update_isactive")[0].checked,
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/bellintegrator/api/office/update.php', true);

	//Передает правильный заголовок в запросе
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	//Вызывает функцию при смене состояния.
	xhr.onreadystatechange = function() {

		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			office_update_btn.innerHTML = 'Выполнить'; // (2)
			office_update_btn.disabled = false;

			if (JSON.parse(xhr.responseText).error) {

			 	office_update_output.innerHTML = JSON.parse(xhr.responseText).error;

			} else {

				office_update_output.innerHTML = JSON.parse(xhr.responseText).result;

			}

		}

	}

	xhr.send(json); 

	office_update_btn.innerHTML = 'Загружаю...'; // (2)
	office_update_btn.disabled = true;
	office_update_output.innerHTML = '...';

}


// api/office/delete
function deleteOffice() {

	var json = JSON.stringify({
		id: document.getElementsByName("office_delete_id")[0].value,
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/bellintegrator/api/office/delete.php', true);

	//Передает правильный заголовок в запросе
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	//Вызывает функцию при смене состояния.
	xhr.onreadystatechange = function() {

		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			office_delete_btn.innerHTML = 'Выполнить';
			office_delete_btn.disabled = false;

			if (JSON.parse(xhr.responseText).error) {

			 	office_delete_output.innerHTML = JSON.parse(xhr.responseText).error;

			} else {

				office_delete_output.innerHTML = JSON.parse(xhr.responseText).result;

			}

		}

	}

	xhr.send(json); 

	office_delete_btn.innerHTML = 'Загружаю...'; // (2)
	office_delete_btn.disabled = true;
	office_delete_output.innerHTML = '...';

}


// api/organization/save
function saveOffice() {

	var json = JSON.stringify({
		orgId: document.getElementsByName("office_save_orgId")[0].value,
		name: document.getElementsByName("office_save_name")[0].value,
		address: document.getElementsByName("office_save_address")[0].value,
		phone: document.getElementsByName("office_save_phone")[0].value,
		isActive: document.getElementsByName("office_save_isactive")[0].checked,
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/bellintegrator/api/office/save.php', true);

	//Передает правильный заголовок в запросе
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	xhr.onreadystatechange = function() {//Вызывает функцию при смене состояния.
		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			// Запрос завершен. Здесь можно обрабатывать результат.

			office_save_btn.innerHTML = 'Выполнить'; // (2)
			office_save_btn.disabled = false;

			if (JSON.parse(xhr.responseText).error) {

			 	office_save_output.innerHTML = JSON.parse(xhr.responseText).error;

			} else {

				office_save_output.innerHTML = JSON.parse(xhr.responseText).result;

			}

		}

	}

	xhr.send(json); 

	office_save_btn.innerHTML = 'Загружаю...'; // (2)
	office_save_btn.disabled = true;
	office_save_output.innerHTML = '...';

}