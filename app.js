const form = document.getElementById("task-form");
const taskList =  document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", getTasksFromLS);
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    clearBtn.addEventListener("click", emptyTaskList);
    filter.addEventListener("keyup", clearFilterTask);
}

function addTask(e) {
    if(taskInput.value === '') {
        alert('add a task');
    }
     const li = document.createElement('li');
     li.className = "collection-item";
     li.appendChild(document.createTextNode(taskInput.value));
     const link = document.createElement('a');
     link.className = "delete-item secondary-content";
     link.innerHTML = "<i class='fa fa-remove'></i>"
     li.appendChild(link);
     console.log(li);
     taskList.appendChild(li);
     storeTaskInLocalStorage(taskInput.value);
     taskInput.value  = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("task"));     
    }
    tasks.push(task);
    localStorage.setItem('tasksList', JSON.stringify(task));
}

function removeTask(e) {
    if(e.target.classList.contains("fa-remove")){
        if(confirm("Task done? Confirm removal:")) {
        e.target.parentElement.parentElement.remove();
        }
    }
    // remove task from LS
    removeTaskFomLs(e.target.parentElement.parentElement);

    e.preventDefault();
}

function emptyTaskList(e) {
    if(confirm("Clear entire list?")){        
        // taskList.innerHTML = '';
        Array(taskList).forEach(element => {            
            element.remove();
        });
    }
}

function clearFilterTask(e) {
    var text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll(".collection-item").forEach(task => {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    })
}

function getTasksFromLS() {
    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));   
    }
    Array(tasks).forEach(task => {
        const li = document.createElement('li');
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = "delete-item secondary-content";
        link.innerHTML = "<i class='fa fa-remove'></i>";
        li.appendChild(link);
        taskList.appendChild(li);
    })
    // tasks.forEach(function(task) {
    //     const li = document.createElement('li');
    //     li.className = "collection-item";
    //     li.appendChild(document.createTextNode(task));
    //     const link = document.createElement('a');
    //     link.className = "delete-item secondary-content";
    //     link.innerHTML = "<i class='fa fa-remove'></i>";
    //     li.appendChild(link);
    //     taskList.appendChild(li);
    // })
}



function removeTaskFomLs(taskItem) {
    console.log(taskItem);
    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));   
    }
    Array(tasks).forEach(function(task, index){
        if(taskItem.textContent === task) {
            Array(tasks).splice(index, 1);
        }
    });

    localStorage.setItem("tasksList", JSON.stringify(tasks))
    localStorage.clear;
    
}

