const theme = document.getElementById("theme");
const inTask = document.getElementById("inTask");
const panel = document.querySelector(".getInput");
const taskList = document.querySelector(".tasks");
const close = document.getElementById("close");
const outerAdder = document.getElementById("outerAdder");

let dark_theme = 0;

const toggleTheme = () => {
  const rootElement = document.documentElement;
  rootElement.classList.toggle("dark-theme");
  dark_theme = dark_theme ? 0 : 1;
  theme.src = dark_theme ? "../assets/Sun.png" : "../assets/Moon and Stars.png";
};

let tasks = [];

inTask.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const now = new Date();
    tasks.push({ time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`, task: inTask.value, done: false });
    inTask.value = "";
    panel.style.display = "none";
    updateTasksList();
  }
});

close.addEventListener("click", () => {
  panel.style.display = "none";
});

theme.addEventListener("click", toggleTheme);

const noItemDiv = document.createElement("div");

if (tasks.length == 0) {
  noItemDiv.classList.add("no-item");

  noItemDiv.innerHTML = `
    <p>No Tasks are there.</p>
    <div class="addFile">
      <p>Add +</p>
    </div>
  `;
  taskList.appendChild(noItemDiv);

  const add = document.querySelectorAll(".addFile");
  add.forEach((button)=>{
    button.addEventListener("click",()=>{
      panel.style.display = "flex";
    })
  })
}

const updateTasksList = () => {
  outerAdder.style.display = "block";
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.innerHTML = `
      <strong class="time">${task.time}</strong>
      <p class="taskText">${task.task}</p>
      <div class="done">done</div>
      <div id="stroke-task" style="display: none;"></div>
    `;

    taskList.appendChild(taskDiv);

    const doneBtn = taskDiv.querySelector(".done");
    const taskStroke = taskDiv.querySelector("#stroke-task");

    if (task.done) {
      doneBtn.style.display = "none";
      taskStroke.style.display = "block";
    }

    doneBtn.addEventListener("click", () => {
      doneBtn.style.display = "none";
      taskStroke.style.display = "block";
      task.done = true;
    });
  }); 
};