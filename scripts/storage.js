"use strict";
const KEY = "USER_ARRAY";
// let userArr = [];
let userArr = JSON.parse(getFromStorage(KEY)) || [];
const inputfirstName = document.getElementById("input-firstname");
const inputlastName = document.getElementById("input-lastname");
const inputusername = document.getElementById("input-username");
const inputpassword = document.getElementById("input-password");
const inputconfirmpass = document.getElementById("input-password-confirm");
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
function getFromStorage(key) {
  return localStorage.getItem(key);
}
function Adduser() {
  let kt = true;
  //Kiểm tra dữ kiện nhập vào
  for (let i = 0; i < userArr.length; i++) {
    if (inputusername.value === userArr[i].username) {
      kt = false;
    }
  }
  if (!kt) {
    kt = true;
    alert("Duplicate username");
  } else if (
    inputfirstName.value == "" ||
    inputlastName.value == "" ||
    inputusername.value == "" ||
    inputconfirmpass.value == "" ||
    inputpassword.value == ""
  ) {
    alert("Không được để trống");
  } else if (inputpassword.value.length < 8) {
    alert("Password phải có nhiều hơn 8 ký tự.");
  } else if (inputpassword.value != inputconfirmpass.value) {
    alert("Password và Confirm Password phải giống nhau.");
  } else {
    let userData;
    userData = new User(
      `${inputfirstName.value}`,
      `${inputlastName.value}`,
      `${inputusername.value}`,
      `${inputpassword.value}`
    );
    userArr.push(userData);
    saveToStorage(KEY, JSON.stringify(userArr));
    window.location.href = "../pages/login.html";
  }
}
