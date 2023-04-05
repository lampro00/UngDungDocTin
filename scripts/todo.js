"use strict";

const inputtask = document.getElementById("input-task");
const btnadd = document.getElementById("btn-add");
const todolisst = document.getElementById("todo-list");
// let taskArr = getFromStorage("Task") ? JSON.parse(getFromStorage("Task")) : [];
// let userArr = JSON.parse(getFromStorage(KEY)) || [];
let currentUser = JSON.parse(getFromStorage("currentUser")) || [];
let taskuse = [];
function taskuse1() {
  const taskArr = getFromStorage("Task")
    ? JSON.parse(getFromStorage("Task"))
    : [];
  taskuse = taskArr.filter((value) => {
    return value.owner == currentUser[0].username;
  });
  console.log(taskArr);
  console.log(taskuse);

  // for (let i = 0; i < taskArr.length; i++) {
  //   if (taskArr[i].owner == currentUser[0].username) {
  //     taskuse.push(taskArr[i]);
  //   }
  // }

  rendertodolist(taskuse);
}
taskuse1();

//------------------------------------ AddTaskr -------------------------------------------
function AddTask() {
  const taskArr = getFromStorage("Task")
    ? JSON.parse(getFromStorage("Task"))
    : [];
  const user = new Task(inputtask.value, currentUser[0].username, false);
  let check = true;
  if (inputtask.value == "") {
    alert("Nhập vào task");
    check = false;
  }
  taskuse.forEach((value) => {
    if (inputtask.value === value.task) {
      alert("Task đã tồn tại");
      check = false;
    }
  });

  check && taskArr.push(user);
  saveToStorage("Task", JSON.stringify(taskArr));
}
//------------------giao diện lúc mới vào---------------------------------
btnadd.addEventListener("click", function () {
  AddTask();
  taskuse1();
});
//-------render giao diện-----------------------
function rendertodolist(taskuse) {
  todolisst.innerHTML = "";
  let html = "";
  for (let i = 0; i < taskuse.length; i++) {
    let a = "";
    if (taskuse[i].isDone) {
      a = "checked";
      console.log(true);
    }
    html += `<li class=${a} id="test">
    ${taskuse[i].task}
     <span class="close" onclick="deletetash('${taskuse[i].task}','${currentUser[0].username}')">x</span>
    </li>`;
    todolisst.innerHTML = html;
  }
}
//----------------------------checked-----------------------------------
todolisst.addEventListener("click", function (ev) {
  if (ev.target.tagName === "LI") {
    ev.target.classList.toggle("checked");
  }
  let taskArr = JSON.parse(getFromStorage("Task")) || [];
  const a = ev.target.textContent.trim();

  for (let i = 0; i < taskArr.length; i++) {
    if (
      ev.target.textContent.trim().slice(0, -1).trim() === taskArr[i].task &&
      currentUser[0].username === taskArr[i].owner
    ) {
      console.log("ád");
      // taskuse.splice(taskuse.indexOf(task), 1);
      taskArr[i].isDone = ev.target.classList.contains("checked")
        ? true
        : false;
      console.log(taskArr[i]);
      saveToStorage("Task", JSON.stringify(taskArr));
      break;
    }
  }
});
//-----------------xoá task-----------------------------------
function deletetash(task, owner) {
  console.log("ok ");
  let taskArr = JSON.parse(getFromStorage("Task")) || [];

  for (let i = 0; i < taskArr.length; i++) {
    if (task === taskArr[i].task && owner === taskArr[i].owner) {
      taskArr.splice(i, 1);
      taskuse.splice(taskuse.indexOf(task), 1);
      saveToStorage("Task", JSON.stringify(taskArr));

      break;
    }
  }
  console.log(taskuse);
  taskuse1();
}
