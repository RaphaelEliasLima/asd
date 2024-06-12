const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// Funções
const saveTodo = (text, done = 0, save = 1) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const finishBtn = document.createElement("button");
  finishBtn.classList.add("finish-todo");
  finishBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(finishBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deleteBtn);

  // Utilizando dados da localStorage
  if (done) {
    todo.classList.add("done");
  }

  if (save) {
    saveTodoLocalStorage({ text, done: 0 });
  }

  todoList.appendChild(todo);

  todoInput.value = "";
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;

      // Utilizando dados da localStorage
      updateTodoLocalStorage(oldInputValue, text);
    }
  });
};

const removeTodo = (todoElement) => {
  const todoTitle = todoElement.querySelector("h3").innerText;
  todoElement.remove();

  // Utilizando dados da localStorage
  removeTodoLocalStorage(todoTitle);
};

const toggleForms = () => {
  document.querySelector("#todo-form").classList.toggle("hide");
  document.querySelector("#edit-form").classList.toggle("hide");
};

// Event Listeners
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!todoInput.value.trim()) return;
  saveTodo(todoInput.value);
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest(".todo");

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
    const todoTitle = parentEl.querySelector("h3").innerText;
    updateTodoStatusLocalStorage(todoTitle);
  }

  if (targetEl.classList.contains("remove-todo")) {
    removeTodo(parentEl);
  }

  if (targetEl.classList.contains("edit-todo")) {
    const todoTitle = parentEl.querySelector("h3").innerText;
    oldInputValue = todoTitle;
    toggleForms();
    document.querySelector("#edit-input").value = todoTitle;
  }
});

filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;
  filterTodos(filterValue);
});

// Local Storage
const getTodosLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  return todos;
};

const loadTodos = () => {
  const todos = getTodosLocalStorage();
  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0);
  });
};

const saveTodoLocalStorage = (todo) => {
  const todos = getTodosLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();
  const filteredTodos = todos.filter((todo) => todo.text !== todoText);
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();
  todos.forEach((todo) => {
    if (todo.text === todoText) {
      todo.done = !todo.done;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
  const todos = getTodosLocalStorage();
  todos.forEach((todo) => {
    if (todo.text === todoOldText) {
      todo.text = todoNewText;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();
