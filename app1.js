const form = document.querySelector("#task-form");
const clrBtn = document.querySelector(".clear-tasks");
const taskList = document.querySelector(".collection");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");


loadAllEventListener();

function loadAllEventListener() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clrBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTask);
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTask)
}

//get task from LS
function getTask() {
    let tasks;
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        //add class
        li.className = "collection-item"
        li.appendChild(document.createTextNode(task));
        //create link
        const link = document.createElement('a');
        link.className = "delete-item secondary-content";
        //add icom
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li)

    });

}

//add task
function addTask(e) {
    if (taskInput.value === "") {
        alert("Enter a task");
    } else {
        //create element
        const li = document.createElement('li');
        //add class
        li.className = "collection-item"
        li.appendChild(document.createTextNode(taskInput.value));
        //create link
        const link = document.createElement('a');
        link.className = "delete-item secondary-content";
        //add icom
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li)
        //store in ls
        storeTaskInLocalstorage(taskInput.value);

        //clear Input
        taskInput.value = "";

        e.preventDefault();
    }
}
//store in localstorage
function storeTaskInLocalstorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}



function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure')) {
            e.target.parentElement.parentElement.remove();
            //remove from ls
            removeTaskFromLS(e.target.parentElement.parentElement);
        }
    }

}
//remove tasks from ls
function removeTaskFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
}

function clearTasks() {
    // taskList.innerHTML = "";
    if (confirm("Are You Sure to clear Tasks")) {
        while (taskList.firstChild) {

            taskList.removeChild(taskList.firstChild);
        }
    }
    localStorage.clear();
}

function filterTask(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}