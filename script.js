const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

const tasks = [];

addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    renderTasks();
});

function renderTasks(){
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.innerText = task.text;

        taskText.addEventListener("click", () => {
           task.completed = !task.completed;

           if(task.completed){
               taskText.innerText = "✔️ " + task.text;
           }
           else {
               taskText.innerText = task.text;
           }
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";

        deleteButton.addEventListener("click", () => {
           const index = tasks.findIndex((item) => {
               return item.id === task.id;
           });

           tasks.splice(index, 1);
           renderTasks();
        });

        if(task.completed){
            taskText.innerText = "✔️ " + task.text;
        }

        li.appendChild(taskText);
        li.appendChild(document.createTextNode(" "));
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    taskCount.innerText = tasks.length;
}