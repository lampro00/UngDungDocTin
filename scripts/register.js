"use strict";
const Register = document.getElementById("btn-submit");
// let userArr = JSON.parse(getFromStorage(KEY)) || [];
var setting = getFromStorage("setting")
  ? JSON.parse(getFromStorage("setting"))
  : [];
//-----------------------------register--------------------------------
Register.addEventListener("click", function () {
  Adduser();
  let userArr = JSON.parse(getFromStorage(KEY)) || [];
  let datasetting;
  datasetting = new Setting(`Sports`, `10`, `${inputusername.value}`);
  setting.push(datasetting);
  saveToStorage("setting", JSON.stringify(setting));
});
