//Define Ui variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clrBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load Event Listener
loadEventlistener();

function loadEventlistener() {
    //Add task event
    form.addEventListener('submit', addTask);
    //remove task 
    taskList.addEventListener('click', removeTask);
    //clear task
    clrBtn.addEventListener('click', clearTask);
    //filter task
    filter.addEventListener('keyup', filterTask);
    //dom load event
    document.addEventListener('DOMContentLoaded', getTasks)
}
//Add Task 

function addTask(e) {

    if (taskInput.value === "") {
        alert("Add a Task");
    } else {
        //Create li element
        const li = document.createElement('li');
        //Add classs
        li.className = "collection-item";
        //Create TextNode And append
        li.appendChild(document.createTextNode(taskInput.value));
        //add link
        const link = document.createElement('a');
        link.className = "delete-item secondary-content";

        //add icon
        link.innerHTML = '<i class="fa fa-remove "></i>';
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);

        //store in ls
        addToLocalStorage(taskInput.value);
        //clear input
        taskInput.value = "";
    }


    e.preventDefault();
}
//remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you Sure')) {
            e.target.parentElement.parentElement.remove();
            removefromLS(e.target.parentElement.parentElement);
        }
    }

}
//cleartask
function clearTask() {
    // taskList.innerHTML = "";
    if (confirm("Are You Sure to Clear the TaskList")) {
        while (taskList.firstChild) {

            taskList.removeChild(taskList.firstChild);
        }

    }
    localStorage.clear();
}
//filterTask
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

function addToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    if (task !== "") {
        tasks.push(task);

    }
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        //Create li element
        const li = document.createElement('li');
        //Add classs
        li.className = "collection-item";
        //Create TextNode And append
        li.appendChild(document.createTextNode(task));
        //add link
        const link = document.createElement('a');
        link.className = "delete-item secondary-content";

        //add icon
        link.innerHTML = '<i class="fa fa-remove "></i>';
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
    });
}

function removefromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}