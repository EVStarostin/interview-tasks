const list = [
  {_id: 1, title: 'Список', parent:null}, 
  {_id: 2, title: 'Первый пункт', parent:1}, 
  {_id: 3, title: 'Второй пункт', parent:1}, 
  {_id: 4, title: 'Подпункт 2.1', parent:3}, 
  {_id: 5, title: 'Подпункт 2.2', parent:3}, 
  {_id: 6, title: 'Вложенный подпункт 2.2.1', parent:5}, 
  {_id: 7, title: 'Вложенный подпункт 2.2.2', parent:5}, 
  {_id: 8, title: 'Подпункт 2.3', parent:3}, 
  {_id: 9, title: 'Третий пункт', parent:1}, 
  {_id: 10, title: 'Четвертый пункт', parent:1} 
]

function renderUl(arr, sortedList) {
  const ul = document.createElement('ul');
  arr.forEach((el, i, arr) => {
    const li = renderLi(el);
    if (!sortedList[el._id]) {
      ul.appendChild(li);
    } else {
      li.appendChild( renderUl(sortedList[el._id], sortedList) )
      ul.appendChild(li);
    }
  });
  return ul;
}

function renderLi(obj) {
  const li = document.createElement('li');
  li.innerText = obj.title;
  return li;
}

function renderList() {
  const sortedList = {};
  let startId;
  
  list.forEach(el => {
    if (el.parent === null) {
      startId = el._id;
    } else {
      if (!sortedList[el.parent]) sortedList[el.parent] = [];
      sortedList[el.parent].push(el);
    }
  })

  const ul = renderUl(sortedList[startId], sortedList);
  console.log(ul);
  document.getElementById('app').appendChild(ul);
}

window.addEventListener('load', renderList);

