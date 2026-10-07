var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
var message = document.getElementById("message");

// Add a task
function addTask() {
  var text = taskInput.value.trim();

  if (text === "") {
    message.textContent = "Please enter a task.";
    return;
  }
  message.textContent = "";

  // Create the elements
  var li = document.createElement("li");

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  var span = document.createElement("span");
  span.textContent = text;

  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete";

  // Mark as completed
  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed");
  });

  // Delete the task
  deleteBtn.addEventListener("click", function () {
    taskList.removeChild(li);
  });

  // Put it all together
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  taskInput.focus();
}

addBtn.addEventListener("click", addTask);

// Press Enter to add
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});