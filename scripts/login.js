"use strict";
const btnsubmitlogin = document.getElementById("btn-submit");
// let userArr = JSON.parse(getFromStorage(KEY)) || [];
let currentUser = JSON.parse(getFromStorage("currentUser ")) || [];
var setting = getFromStorage("setting")
  ? JSON.parse(getFromStorage("setting"))
  : [];
//-----------------------------log in-------------------------------
btnsubmitlogin.addEventListener("click", function () {
  if (inputusername.value == "" || inputpassword.value == "") {
    alert("Không được để trống");
  } else {
    for (let index = 0; index < userArr.length; index++) {
      if (
        userArr[index].username === inputusername.value &&
        userArr[index].password === inputpassword.value
      ) {
        window.location.href = "../index.html";
        currentUser.push(userArr[index]);
        saveToStorage("currentUser", JSON.stringify(currentUser));
        break;
      } else if (index == userArr.length - 1)
        alert("Username or Password wrong ?");
    }
  }
});
