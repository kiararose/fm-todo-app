const inputField = document.querySelector(".input-field");
const todoList = document.getElementById("todo-list");
const todoBtns = document.getElementById("todo-btns");
const todoBtnsMobile = document.getElementById("todo-btns-mobile");
const todoCount = document.getElementById("items");
const clearAll = document.getElementById("clear");
const btnsContainer = document.getElementById("btns");
const allToDo = document.getElementById("all");
const activeToDo = document.getElementById("active");
const completedToDo = document.getElementById("completed");
const checkbox = document.getElementById("checkbox");

countToDo();

function createToDo(e) {
    let todo = document.createElement("div");
    todo.className = "todo active";
    todo.innerHTML = 
            `<input type="checkbox" class="checkbox" id="checkbox">
            <label for="">${e}</label>
            <button id="delete" class="delete-btn"></button>`;
    todoList.appendChild(todo);
    todoList.insertBefore(todo, todoBtnsMobile);

    inputField.value = "";
    countToDo();
    console.log("added new to do");
}

function countToDo() {
    let count = document.querySelectorAll(".active").length;
    
    if(!count) {
        todoCount.innerText = "0 items left";
    } else if (count === 1) {
        todoCount.innerText = "1 item left";
    } else {
        todoCount.innerText = `${count} items left`;
    }
}

function deleteToDo(e) {
    e.remove();
}

function clearCompletedToDo() {
    let completed = [...document.querySelectorAll(".completed")];

    completed.forEach((c) => c.remove());
    console.log("cleared all completed");
}

function showAllToDo() {
    let all = [...document.querySelectorAll(".todo")];

    all.forEach((a) => (a.style.display = "flex"));
    console.log("displaying all to dos");
}

function showActiveToDo() {
    let hide = [...document.querySelectorAll(".completed")];

    showAllToDo();
    hide.forEach((h) => (h.style.display = "none"));
    console.log("displaying active to dos");
}

function showCompletedToDo() {
    let hide = [...document.querySelectorAll(".active")];

    showAllToDo();
    hide.forEach((h) => (h.style.display = "none"));
    console.log("displaying completed to dos");
}

inputField.addEventListener('keypress', (e) => {
    if(e.key === "Enter" && inputField.value.length > 0) {
        createToDo(inputField.value);
    }
});

todoList.addEventListener('click', (e) => {
    let el = e.target;

    if(el.checked === true) {
        console.log("completed");
        el.classList.add("checked");
        el.parentElement.classList.remove("active");
        el.parentElement.classList.add("completed");
        el.style.backgroundColor = "pink";
        countToDo();
    } else if (el.checked === false){
        console.log("incomplete");
        el.classList.remove("checked");
        el.parentElement.classList.add("active");
        el.parentElement.classList.remove("completed");
        el.style.backgroundColor = "white";
        countToDo();
    }

    if(el.tagName === "BUTTON" && el.classList.contains("delete-btn")) {
        deleteToDo(el.parentElement);
        console.log("deleted");
        countToDo();
    }
});

clearAll.addEventListener("click", clearCompletedToDo);

btnsContainer.addEventListener("click", (e) => {
    let el = e.target;

    if(el === allToDo) {
        showAllToDo();
    }

    if(el === activeToDo) {
        showActiveToDo();
    }

    if(el === completedToDo) {
        showCompletedToDo();
    }
});