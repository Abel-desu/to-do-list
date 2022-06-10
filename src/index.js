import './style.css';

class Todo {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

let myArray = [];
const sendToLocalStorage = () => {
  localStorage.setItem('list', JSON.stringify(myArray));
};

const section = document.querySelector('section');
section.innerHTML = `
  <div class="main-div">
    <p id="header">Today's To Do <i class="fas fa-sync"></i></p>
    <form class="form">
      <input class="Input" type="text" placeholder="Add to your list..." required></input>
    </form>
    <button class="clear">Clear all completed</button>
  </div>
`;
// Create list
const createList = () => {
  const form = document.querySelector('.form');
  const list = document.createElement('div');
  list.className = 'input-div';
  form.appendChild(list);
  const checkboxes = document.createElement('input');
  checkboxes.className = 'input';
  checkboxes.type = 'checkbox';
  const inputText = document.createElement('p');
  inputText.className = 'todoContainer';
  const editIcons = document.createElement('i');
  editIcons.className = 'fas fa-ellipsis-v';
  const removeIcon = document.createElement('i');
  removeIcon.className = 'fas fa-trash-alt icon2';
  list.append(checkboxes, inputText, editIcons, removeIcon);
  // Add event to checkboxes
  /* eslint-disable */
  let count = 1;
  checkboxes.addEventListener('click', () => {
    editIcons.classList.toggle('remove-icon-active');
    removeIcon.classList.toggle('icon2');
    inputText.classList.toggle('todoContainer-disable');
    list.classList.toggle('change');
    const getting = JSON.parse(localStorage.getItem('list'));
    const empty = [];
    const hammasi = document.querySelectorAll('.input-div');
    for (let i = 0; i < getting.length; i += 1) {
      if (hammasi[i].classList.contains('change')) {
        getting[i].completed = true;
        count += 1;
      } else {
        getting[i].completed = false;
      }
      empty.push(getting[i]);
      localStorage.setItem('list', JSON.stringify(empty));
    }
  });

  // Remove from list event
  /* eslint-disable */
  removeIcon.addEventListener('click', () => {
    form.removeChild(list);
    const getFromLocalStorage = JSON.parse(localStorage.getItem('list'));
    const result = getFromLocalStorage.filter((word) => word.description === inputText.textContent);
    const empty = [];
    for (let i = 0; i < getFromLocalStorage.length; i += 1) {
      if (result[0].description === getFromLocalStorage[i].description) {
        continue;
      }
      empty.push(getFromLocalStorage[i]);
    }
    localStorage.setItem('list', JSON.stringify(empty));
  });

  editIcons.addEventListener('click', () => {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'todoContainer';
    editInput.value = inputText.textContent;
    list.replaceChild(editInput, inputText);
    editInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && editInput.value) {
        const getting = JSON.parse(localStorage.getItem('list'));
        const result = getting.filter((word) => word.description === inputText.textContent);
        const empty = [];
        for (let i = 0; i < getting.length; i += 1) {
          if (getting[i].index === result[0].index) {
            getting[i].description = editInput.value;
          }
          empty.push(getting[i]);
          localStorage.setItem('list', JSON.stringify(empty));
        }
        list.replaceChild(inputText, editInput);
        inputText.textContent = editInput.value;
        list.style.backgroundColor = '#fff';
      }
    });
  });
};

// Entering list event
const Input = document.querySelector('.Input');
Input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && Input.value) {
    const object = new Todo(Input.value, false, myArray.length);
    myArray.push(object);
    e.preventDefault();
    createList();
    const inputText = document.querySelectorAll('.todoContainer');
    for (let i = 0; i < myArray.length; i += 1) {
      inputText[i].textContent = myArray[i].description;
    }
    Input.value = null;
    sendToLocalStorage();
  }
});

// Window Load event
window.addEventListener('load', () => {
  const getFromLocalStorage = JSON.parse(localStorage.getItem('list'));
  for (let i = 0; i < getFromLocalStorage.length; i += 1) {
    createList();
    const inputText = document.querySelectorAll('.todoContainer');
    inputText[i].textContent = getFromLocalStorage[i].description;
    if (getFromLocalStorage[i].completed === true) {
      getFromLocalStorage[i].completed = false;
    }
    localStorage.setItem('list', JSON.stringify(getFromLocalStorage));

    myArray = getFromLocalStorage;
  }
});
