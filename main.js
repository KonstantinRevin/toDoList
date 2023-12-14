var form = document.getElementById("addForm");
var itemsList = document.getElementById("items");
var filter = document.getElementById("filter");

var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

var timestamps = JSON.parse(localStorage.getItem("timestamps")) || {};

var completedStatus = JSON.parse(localStorage.getItem("completedStatus")) || {};


displayTasks();

form.addEventListener("submit", addItem);
itemsList.addEventListener("click", handleItemClick);
filter.addEventListener("keyup", filterItems);

function addItem(e) {
    e.preventDefault();

    var newItemInput = document.getElementById("newItemText");
    var newItemText = newItemInput.value;

    var newElement = document.createElement("li");
    newElement.className = "list-group-item";

    var newTextNode = document.createTextNode(newItemText);
    newElement.appendChild(newTextNode);

    var deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Удалить"));
    deleteBtn.className = "btn btn-light btn-sm float-right";
    deleteBtn.dataset.action = "delete";

    var completeBtn = document.createElement("button");
    completeBtn.appendChild(document.createTextNode("Выполнено"));
    completeBtn.className = "btn btn-success btn-sm mr-2 float-right";
    completeBtn.dataset.action = "complete";

    newElement.appendChild(completeBtn);
    newElement.appendChild(deleteBtn);

    var timestamp = new Date().toLocaleString();
    timestamps[newItemText] = timestamp;

    tasks.push(newItemText);

    saveToLocalStorage();

    itemsList.prepend(newElement);
    newItemInput.value = "";
}

function handleItemClick(e) {
    if (e.target.dataset.action === "delete") {
        var taskText = e.target.parentNode.firstChild.textContent;
        var timestamp = timestamps[taskText];

    
        tasks = tasks.filter(task => task !== taskText);

     
        delete timestamps[taskText];
        delete completedStatus[taskText];
        saveToLocalStorage();

 
        e.target.parentNode.remove();
    } else if (e.target.dataset.action === "complete") {
        var taskText = e.target.parentNode.firstChild.textContent;

     
        e.target.parentNode.classList.toggle("completed");

    
        updateCompletedStatus(taskText);
    }
}

function updateCompletedStatus(taskText) {

    completedStatus[taskText] = !completedStatus[taskText];


    localStorage.setItem("completedStatus", JSON.stringify(completedStatus));
}

function filterItems(e) {
    var searchedText = e.target.value.toLowerCase();
    var items = itemsList.querySelectorAll("li");

    items.forEach(function(item) {
        var itemText = item.firstChild.textContent.toLowerCase();

        if (itemText.indexOf(searchedText) !== -1) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function displayTasks() {
    tasks.forEach(function(task) {
        var newElement = document.createElement("li");
        newElement.className = "list-group-item";

        var newTextNode = document.createTextNode(task);
        newElement.appendChild(newTextNode);

        var deleteBtn = document.createElement("button");
        deleteBtn.appendChild(document.createTextNode("Удалить"));
        deleteBtn.className = "btn btn-light btn-sm float-right";
        deleteBtn.dataset.action = "delete";

        var completeBtn = document.createElement("button");
        completeBtn.appendChild(document.createTextNode("Выполнено"));
        completeBtn.className = "btn btn-success btn-sm mr-2 float-right";
        completeBtn.dataset.action = "complete";

        newElement.appendChild(completeBtn);
        newElement.appendChild(deleteBtn);

     
        if (completedStatus[task]) {
            newElement.classList.add("completed");
        }

        itemsList.appendChild(newElement);
    });
}

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("timestamps", JSON.stringify(timestamps));
    localStorage.setItem("completedStatus", JSON.stringify(completedStatus));
}