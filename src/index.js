import './style.css';
// Create object with different hardcoded elements
const todolists = document.querySelector('.todo-container');

const todolist = [
  {
    index: 1,
    description: 'Wash the dishes',
    completed: false,
  },

  {
    index: 1,
    description: 'Complete todo list project',
    completed: false,
  },
];

const displayLists = () => {
  todolist.forEach((list) => {
    const todoContainer = document.createElement('div');
    todoContainer.className = 'list border-bottom';
    todoContainer.innerHTML += `
          <div>
          <input type="checkbox" class="check">
          <span>${list.description}</span>
          </div>
          <i class="fa-solid fa-ellipsis-vertical"></i>
          `;
    todolists.append(todoContainer);
  });
};

displayLists();