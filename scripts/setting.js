"use strict";

var inputcategory = document.getElementById("input-category");
var inputnumpage = document.getElementById("input-page-size");
var btnsubmit = document.getElementById("btn-submit");
var setting = getFromStorage("setting")
  ? JSON.parse(getFromStorage("setting"))
  : [];
for (let i = 0; i < setting.length; i++) {
  let currentUser = JSON.parse(getFromStorage("currentUser")) || [];
  if (setting[i].username === currentUser[0].username) {
    inputcategory.value = setting[i].category;
    inputnumpage.value = setting[i].pageSize;
  }
}
//----------------------nút submit-------------------------------------
btnsubmit.addEventListener("click", function () {
  for (let i = 0; i < setting.length; i++) {
    if (currentUser[0].username === setting[i].username) {
      setting.splice(i, 1);
    }
  }
  if (inputcategory.value === "General") {
    alert("Chưa chọn Category");
  } else if (inputnumpage.value === "") {
    alert("News per page không được để trống");
  } else {
    let datasetting;
    datasetting = new Setting(
      `${inputcategory.value}`,
      `${inputnumpage.value}`,
      `${currentUser[0].username}`
    );
    setting.push(datasetting);
    saveToStorage("setting", JSON.stringify(setting));
  }
});
