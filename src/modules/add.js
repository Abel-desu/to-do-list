export default class TODO {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}
export const addTodo = (description, tasks) => {
  const newTask = {
    description,
    completed: false,
    index: tasks.length,
  };

  const newTasks = [...tasks, newTask];
  return newTasks;
};

export const deleteTodo = (index, tasks) => tasks.filter((task) => task.index !== index);