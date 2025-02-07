const input = document.getElementById("input");
const add = document.getElementById("add");
const dels = document.querySelectorAll("#del");
const checks = document.querySelectorAll("#check");
const main = document.getElementById("main");

let tasks = JSON.parse(localStorage.getItem("list")) || [];

const updateDB = () => {
    localStorage.setItem("list", JSON.stringify(tasks));
};

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


add.addEventListener("click", () => {
    const text = input.value.trim();
    if(!text) {
        alert("Type something to add todo task.");
        return;
    }

    const id = Date.now();
    tasks.push({ id, content: text, checked: false });
    updateDB();
    createTodo(id, text, false);
    input.value = "";
});


const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    updateDB();
    document.querySelector(`[data-id="${id}"]`).remove();
};

const toggleCheck = (id) => {
    const task = tasks.find(t => t.id === id);
    
    if (task) {
        task.checked = !task.checked;
        updateDB();
    }

    const el = document.querySelector(`[data-id="${id}"]`);
    el.classList.toggle("done", task.checked);

    const container = document.querySelector(task.checked ? ".ended" : ".not_ended");
    if (container) {
        container.appendChild(el);
    }
};



const createTodo = (id, text, checked = false) => {
    const cardDate = new Date(id);
    const card = `
        <div class="task ${checked && "done"}" data-id="${id}">
            <div class="content">
                <input type="checkbox" id="check" class="check" ${checked ? "checked" : ""} onClick="toggleCheck(${id})">
                <p>${text}</p>
            </div>
            <p>${days[cardDate.getDay()]}  ${cardDate.getHours()}:${cardDate.getMinutes()}</p>
            <svg class="del" onClick="deleteTask(${id})" data-id="${id}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
        </div>
    `;

    const container = document.querySelector(checked ? ".ended" : ".not_ended");
    if(container) container.innerHTML += card;
}


tasks.forEach(task => createTodo(task.id, task.content, task.checked));

