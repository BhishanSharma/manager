const themeBtn = document.getElementById("theme");
const inTask = document.getElementById("inTask");
const panel = document.querySelector(".getInput");
const taskList = document.querySelector(".tasks");
const closeBtn = document.getElementById("close");
const outerAdder = document.getElementById("outerAdder");

// 0: light Theme 1: dark Theme
let theme = localStorage.getItem("theme") === "1" ? 1 : 0;
let tasks = [];

const applyTheme = () => {
  const rootElement = document.documentElement;
  rootElement.classList.toggle("dark-theme", theme);
  themeBtn.src = theme ? "../assets/Sun.png" : "../assets/Moon and Stars.png";
  closeBtn.src = theme ? "../assets/CloseL.png" : "../assets/Close.png";
};
applyTheme();

const toggleTheme = () => {
  theme = theme ? 0 : 1;
  localStorage.setItem("theme", theme);
  applyTheme();
};

themeBtn.addEventListener("click", toggleTheme);

inTask.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const now = new Date();
    let time = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    tasks.push({
      date: now.toDateString(),
      time: time,
      task: inTask.value,
      done: false,
    });
    inTask.value = "";
    panel.style.display = "none";
    updateTasksList();
  }
});

closeBtn.addEventListener("click", () => {
  panel.style.display = "none";
});

const noItemDiv = document.createElement("div");

if (!tasks.length) {
  noItemDiv.classList.add("no-item");

  noItemDiv.innerHTML = `
    <p>No Tasks are there.</p>
    <div class="addFile">
      <p>Add +</p>
    </div>
  `;
  taskList.appendChild(noItemDiv);

  const add = document.querySelectorAll(".addFile");
  add.forEach((button) => {
    button.addEventListener("click", () => {
      panel.style.display = "flex";
    });
  });
}

const updateTasksList = () => {
  outerAdder.style.display = "block";
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    console.log(task.date);
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