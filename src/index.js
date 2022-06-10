import './style.css';

const textInput = document.querySelector('input');
const todosMaincontainer = document.querySelector('.todos-container');

class MyObject {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}
const updateLocal = () => {
  const localData = JSON.parse(localStorage.getItem('list'));
  const todos = document.querySelectorAll('span');
  for (let i = 0; i < todos.length; i += 1) {
    if (todos[i].classList.contains('checkTodo')) {
      localData[i].completed = true;
    } else {
      localData[i].completed = false;
    }
  }
  localStorage.setItem('list', JSON.stringify(localData));
};
const myArray = [];
const addTodo = (todoValue) => {
  const todoContainer = document.createElement('div');
  todoContainer.className = 'todoContainer';
  todoContainer.innerHTML += `
      <input type="checkbox" class="checkbox">
      <span>${todoValue}</span>
      <i class="fas fa-ellipsis-v"></i>
      <i class="fas fa-trash-alt"></i>
    `;
  todosMaincontainer.appendChild(todoContainer);

  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checkedContainer');
      i.nextElementSibling.classList.toggle('checkTodo');
      i.parentElement.lastElementChild.classList.toggle('trash-active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-desable');
      updateLocal();
    });
  });
  /* eslint-disable */
  const editTodo = (todoContainer, todo) => {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'editInput';
    editInput.value = todo.textContent;
    todoContainer.replaceChild(editInput, todo);
    editInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const todoContainers = document.querySelectorAll('.todoContainer');
        const localData = JSON.parse(localStorage.getItem('list'));
        for (let i = 0; i < todoContainers.length; i += 1) {
          if (todoContainers[i].classList.contains('checkedContainer')) {
            localData[i].description = editInput.value;
            localStorage.setItem('list', JSON.stringify(localData));
          }
        }
  
        editInput.parentElement.classList.remove('checkedContainer');
        todoContainer.replaceChild(todo, editInput);
        todo.textContent = editInput.value;
      }
    });
  };
  const object = new MyObject(todoValue, false, checkbox.length - 1);
  myArray.push(object);
  localStorage.setItem('list', JSON.stringify(myArray));

  const editIcons = document.querySelectorAll('.fa-ellipsis-v');
  editIcons.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.add('checkedContainer');
      editTodo(todoContainer, i.previousElementSibling);
    });
  });

  const removeIcons = document.querySelectorAll('.fa-trash-alt');
  removeIcons.forEach((i) => {
    i.addEventListener('click', () => {
      removeTodo(i.parentElement);
    });
  });
};
 /* eslint-disable */
const removeTodo = (todo) => {
  todosMaincontainer.removeChild(todo);
  let count = 0;
  const localData = JSON.parse(localStorage.getItem('list'));
  const data = Array.from(localData).filter((i) => i.completed === false);
  data.map((i) => i.index = count += 1);
  localStorage.setItem('list', JSON.stringify(data));
};


textInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && textInput.value) {
    e.preventDefault();
    addTodo(textInput.value);
    textInput.value = null;
  }
});

const getFromLocal = () => {
  const data = JSON.parse(localStorage.getItem('list'));
  data.map((i) => {
    myArray.push(i);
    const todoContainer = document.createElement('div');
    todoContainer.className = 'todoContainer';
    todoContainer.innerHTML += `
          <input type="checkbox" class="checkbox">
          <span>${i.description}</span>
          <i class="fas fa-ellipsis-v"></i>
          <i class="fas fa-trash-alt"></i>
        `;
    todosMaincontainer.appendChild(todoContainer);

    const editIcons = document.querySelectorAll('.fa-ellipsis-v');
    editIcons.forEach((i) => {
      i.addEventListener('click', () => {
        editTodo(todoContainer, i.previousElementSibling);
        i.parentElement.classList.add('checkedContainer');
      });
    });
  });
  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checkedContainer');
      i.nextElementSibling.classList.toggle('checkTodo');
      i.parentElement.lastElementChild.classList.toggle('trash-active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-desable');
      updateLocal();
    });
  });
  const removeIcons = document.querySelectorAll('fa-trash-alt');
  removeIcons.forEach((i) => {
    i.addEventListener('click', () => {
      removeTodo(i.parentElement);
    });
  });
  localStorage.setItem('list', JSON.stringify(myArray));
};
window.addEventListener('load', getFromLocal);


