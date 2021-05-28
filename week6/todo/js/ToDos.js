import { ls } from "./ls.js";

// Select ul
const list = document.querySelector('.todo-list');
// select form
const todoForm = document.querySelector('.todo-form');
// select input
const todoInput = document.querySelector('.todo-input');
// select all button
const all = document.querySelector('.all');
// select active button
const active = document.querySelector('.active');
// select cpmpleted button
const completed = document.querySelector('.completed');
// select task counter span
const count = document.querySelector('.count')

// to-do array
let toDoList = ls.getFromLocalStorage('toDoList');


window.addEventListener('load', () => {
  showTodos(toDoList);
});


// add event listener for adding task
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo(todoInput.value);
});

all.addEventListener('click', function(event) {
  event.preventDefault();
  showTodos(toDoList);
});

active.addEventListener('click', function(event) {
  event.preventDefault();
  showActive(toDoList);
});

completed.addEventListener('click', function(event) {
  event.preventDefault();
  showCompleted(toDoList);
});



// function to add task
function addTodo(task) {
  // check if task is empty
  if (task !== '') {
    // make a todo object with properties for id(unique), name, and completed
    const todo = {
      id: Date.now(),
      name: task,
      completed: false,
    };
    // add todo object to toDoList
    toDoList.push(todo);
    // call addToLocalStorage function to save task to local storage
    ls.addToLocalStorage('ToDoList', toDoList);
    showTodos(toDoList);

    // clear input value
    todoInput.value = '';
  }
}


function renderTodo(task) {
  const li = document.createElement('li');
  li.setAttribute('class', 'task');
  li.setAttribute('data-key', task.id);
  let checked = null;
  let counter = 0;
  if (task.completed === true) {
    li.classList.add('checked');
    checked = 'checked';
  } else {
    counter++;
  }
  li.innerHTML = `
    <input type="checkbox" class="checkbox" id="${task.id}" ${checked}>${task.name}
    <button class="delete-button">&#x2715;</button>`;
  // add li element to the ul element
  list.append(li);
  return counter;
}


// function to display all tasks
function showTodos(toDoList) {
  // clear unordered list
  list.innerHTML = '';
  let taskcounter = 0;
  // for each task in toDoList
  toDoList.forEach(function(task) {
    taskcounter += renderTodo(task);
  });
  count.innerHTML = `${taskcounter} tasks left`;
}

// function to display active tasks
function showActive(toDoList) {
  // clear unordered list
  list.innerHTML = '';
  // for each task in toDoList
  toDoList.forEach(function(task) {
    // check if task is not completed
    if (!task.completed) {
      renderTodo(task);
  }
  });
}

// function to display completed tasks
function showCompleted(toDoList) {
  // clear unordered list
  list.innerHTML = '';
  // for each task in toDoList
  toDoList.forEach(function(task) {
    // check if task is completed
    if (task.completed) {
      renderTodo(task);
    }
  });
}


// addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
list.addEventListener('click', function(event) {
  // check if the event is on checkbox
  if (event.target.type === 'checkbox') {
    // toggle the state
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  // check if that is a delete-button
  if (event.target.classList.contains('delete-button')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});


// toggle the value to completed and not completed
function toggle(id) {
  toDoList.forEach(function(task) {
    if (task.id == id) {
      // toggle the value
      task.completed = !task.completed;
    }
  });
  ls.addToLocalStorage('toDoList', toDoList);
  // call showTodos to display toDoList each time they are updated
  showTodos(toDoList);
}


// function to delete todo from toDoList
function deleteTodo(id) {
  toDoList = toDoList.filter(function(task) {
    return task.id != id;
  });
  ls.addToLocalStorage('toDoList', toDoList);
  // call showTodos to display toDoList each time they are updated
  showTodos(toDoList);
}