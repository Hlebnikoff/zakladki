(function () {

  // Создаем пустой массивю
  let todoArray = [];

  // Функция, которая создает h2 элемент на странице с главным заголовком. Каждой странице - разный title.
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;

    return appTitle;
  }

  // Создаем и возвращаем форму для создания тела
  // <form class="input-group mb-3">
  //   <input class="form-controle" placeholder="Введите название нового дела">
  //     <div class="input-group-append">
  //       <button class="btn btn-primary">Добавить новое дело</button>
  //     </div>
  // </form>
  function createTodoItemForm() {
    let form = document.createElement('form'); // <form>
    let input = document.createElement('input'); // <input>
    let buttonWrapper = document.createElement('div'); // <div>
    let button = document.createElement('button'); // <button>

    button.disabled = !input.value.length; // Устанавливать кнопке "Добавить дело" атрибут disabled, когда input пуст.

    // Вешаем слушателя на input, при появлении хоть одного символа в поле убираем атрибут disabled у кнопки.
    input.addEventListener('input', () => {
      button.disabled = !input.value.length;
    });

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  // Создание списка наших дел. <ul class="list-group"></ul>
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');

    return list;
  }

  // Создание элементов списка.
  // <li class="list-group-item d-flex justify-content-between align-items-center">
  // "Название дела" - item.textContent.
  // <div class="btn-group btn-group-sm">
  // <button class="btn btn-success">Готово</button>
  // <button class="btn btn-danger">Удалить</button>
  // </div>
  // </li>
  function createTodoItem(name) {

    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    // Присваиваем каждому элементу списка рандомное число. В нашем случае в диапозоне 250. Округленное до ближайшего целого
    let randomIdItem = Math.round(Math.random() * 250);
    item.id = randomIdItem; // Присваеваем ID н

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-itema-center');
    item.textContent = name;
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // let caseTodo = [name, done];
    // console.log(caseTodo);

    // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
    return {
      item,
      doneButton,
      deleteButton,
      buttonGroup,
    };
  }

  // Функция, которая меняет значение у наших li-шек. done: true/false
  function changeItemDone(arr, item) {
    arr.map(obj => { // Пробегаемся по массиву
      if (obj.id === item.id & obj.done === false) { // Если наш объект с присвоенным ID равен <li id="obj.id"> и если у объекта значение done равно false
        obj.done = true; // тогда выполнить код: присовить значению done = true
      } else if (obj.id === item.id & obj.done === true) { // Если наш объект с присвоенным ID равен <li id="obj.id"> и если у объекта значение done равно true
        obj.done = false; // тогда выполнить код: присовить значению done = false
      }
    });
  }

  // Вешаем слушателя события по клику на кнопку doneButton(готово)
  function completeTodoItem(item, btn) { // Создаем два аргумента. item - наша li-ка и кнопка btn.
    btn.addEventListener('click', () => { // на кнопку вешаем событие click
      todoArray = JSON.parse(localStorage.getItem(key)); // получаем в пустой массив todoArray с парсингом в формате JSON строки, которые получаем из локального хранилища с ключём key
      item.classList.toggle('list-group-item-success'); // Если мы произвели клик на кнопку(готово) добавляем класс <li> и вся строчка окрашивается в зеленый.
      changeItemDone(todoArray, item); // Это необходимо для того, чтобы значения done менялись у наших <li>.

      localStorage.setItem(key, JSON.stringify(todoArray)); // Записываем в локальное хранилище ключ(key) и его значение(value) - наш массив todoArray с преобразованием в строки
    });
  }

  // Вешаем слушателя события по клику на кнопку deleteButton(удалить)
  function deleteTodoItem(item, btn) { // Создаем два аргумента. item - наша li-ка и кнопка btn.
    btn.addEventListener('click', () => { // на кнопку вешаем событие click
      if (confirm('Вы уверены?')) { // Проводим проверку, когда пользователь хочет удалить элемент из списка. По дефолту confirm имеет true/false
        todoArray = JSON.parse(localStorage.getItem(key)); // получаем в пустой массив todoArray с парсингом в формате JSON строки, которые получаем из локального хранилища с ключём key

        let newList = todoArray.filter(obj => obj.id !== item.id); // Создаем новую переменную в которой наш массив фильтруется и записывается в новую переменную newlist.
        // obj - коллбэк если элемент массива вернет true, тогда он останется в массиве, если же он вернет false, то удалится из массива
        // obj.id - присвоенный ID в локальном хранилище строго не равен <li id="obj.id">
        localStorage.setItem(key, JSON.stringify(newList)); // записываем в ключ(key) новую переменную в которой записываем отфильтрованныые элементы списка. (удалим элемент из хранилища)
        item.remove();
      }
    });
  }

  function createTodoApp(container, title = 'Cписок дел', key) {  // Приложение принимает 3 аргумента, которые есть у наших 3-ёх страниц. Это container, он один общий. У всех страниц есть title. Ну и ключи, которые будут сохраняться для каждой из страниц свои.

    let todoAppTitle = createAppTitle(title); // Инициализуем в наше приложение Заголовок(Мои дела, Дела мамы, Дела папы).
    let todoItemForm = createTodoItemForm(); // Инициализуем форму <input> и кнопку <button> добавить дело.
    let todoList = createTodoList(); // Инициализуем наш список дел.

    container.append(todoAppTitle); // Добавляем в container заголовок.
    container.append(todoItemForm.form); // Добавляем в container форму.
    container.append(todoList); // Добавляем в container список дел.

    if (localStorage.getItem(key)) { // Если в хранилище есть ключи, забираем их.
      todoArray = JSON.parse(localStorage.getItem(key));

      for (let obj of todoArray) { // Пробегаемся по нашему массиву todoArray
        let todoItem = createTodoItem(todoItemForm.input.value); // Создаем элементы списка item, buttonGroup.

        todoItem.item.textContent = obj.name; // Из хранилища берем и добавляем в наш item элемент.
        todoItem.item.id = obj.id; // Так же из хранилища берем ID элемента и отдаем его <li>.

        if (obj.done == true) {  // Тут проводим проверку на true/false из нашего хранилища. Если элемент из хранилища будет равен true - закрашиваем <li> в зеленый цвет.
          todoItem.item.classList.add('list-group-item-success');
        } else {
          todoItem.item.classList.remove('list-group-item-success'); // Иначе удаляем класс готовности.
        }

        completeTodoItem(todoItem.item, todoItem.doneButton); // Инициализируем наши элементы списка, а именно <li> кнопку готово.
        deleteTodoItem(todoItem.item, todoItem.deleteButton); // Инициализируем наши элементы списка, а именно <li> кнопку удалить.

        todoList.append(todoItem.item); // К нашему списку добавляем item(<li>)
        todoItem.item.append(todoItem.buttonGroup); // К нашему списку добавляем кнопки (готово, удалить)
      }
    }

    // браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', function (e) {
      // эта строчка необходима, чтобы предотвратить стандартное действие браузера
      // в данном случае мы хотим, чтобы страница не перезагружалась при отправке формы
      e.preventDefault();

      let todoItem = createTodoItem(todoItemForm.input.value); // Добавление дела.

      // игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }

      completeTodoItem(todoItem.item, todoItem.doneButton); // Инициализируем наши элементы списка, а именно <li> кнопку готово.
      deleteTodoItem(todoItem.item, todoItem.deleteButton); // Инициализируем наши элементы списка, а именно <li> кнопку удалить.

      let localStorageData = localStorage.getItem(key); // В новую переменную получаем ключи из key

      if (localStorageData == null) { // если в новой переменной ничего нет, то данные берем из нашего масива todoArray
        todoArray = [];
      } else { // Иначе берем данные из localStorageData
        todoArray = JSON.parse(localStorageData);
      }

      // Создаем наше хранилище itemObj в котором будет = name, id, done
      let createItemObj = (arr) => {
        let itemObj = {}; // пустой объект в который будем записывать
        itemObj.name = todoItemForm.input.value; // Где name будет равен item
        itemObj.id = todoItem.item.id; // где ID будет равен item.id
        itemObj.done = false; // создаем дефолтное значени false для каждого нового элемента

        arr.push(itemObj); // пушим в arr наши данные
      }
      createItemObj(todoArray); //Инициалузируем выше наше хранилище.
      localStorage.setItem(key, JSON.stringify(todoArray));

      todoList.append(todoItem.item); // добавляем в список элементы.
      todoItemForm.input.value = ''; // Когда добавим дело в список - обнулить input
      todoItemForm.button.disabled = !todoItemForm.button.disabled; // Когда добавим дело в список - заблокировать кнопку.
    });
  }

  window.createTodoApp = createTodoApp; // Инициализируем тело.
})();
