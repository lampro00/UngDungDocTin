"use strict";

// let userArr = JSON.parse(getFromStorage(KEY)) || [];
let currentUser = JSON.parse(getFromStorage("currentUser")) || [];
const logout = document.getElementById("btn-logout");

const loginmoda = document.getElementById("login-modal");
if (currentUser.username != "") {
  loginmoda.innerHTML = `Welcom ${currentUser[0].firstName}`;
  logout.style.display = "block";
  console.log("456");
}
//----------------log out---------------------
logout.addEventListener("click", function () {
  currentUser = [];
  logout.style.display = "none";
  saveToStorage("currentUser", JSON.stringify(currentUser));
  loginmoda.innerHTML = `<p>Please Login or Register</p>
  <div class="row" >
      <div class="col-md-3">
          <a href="./pages/login.html" class="btn btn-primary btn-block">Login</a>
      </div>
      <div class="col-md-3">
          <a href="./pages/register.html" class="btn btn-primary btn-block">Register</a>
      </div>
  </div>`;
});
