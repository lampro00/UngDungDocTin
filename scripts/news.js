"use strict";
var totalResults = 0;
const pagenum = document.getElementById("page-num");
const btnnext = document.getElementById("btn-next");
const btnprev = document.getElementById("btn-prev");
const container = document.getElementById("news-container");
let currentUser = JSON.parse(getFromStorage("currentUser")) || [];
var setting = getFromStorage("setting")
  ? JSON.parse(getFromStorage("setting"))
  : [];
let a = "";
let b = "";
//----------------------load giao diện lúc mới vào-------------------------------
for (let i = 0; i < setting.length; i++) {
  if (setting[i].username === currentUser[0].username) {
    b = setting[i].category;
    a = setting[i].pageSize;
  }
}
//------------------------Lấy nguồn API-------------------------
async function getpage(pageSize, category, page) {
  try {
    const url =
      "https://newsapi.org/v2/top-headlines?" +
      "country=us&" +
      `category=${category}&` +
      `pageSize=${pageSize}&` +
      `page=${page}&` +
      "apiKey=0b1dd45b4372419fa25fae25963f5284";
    const res = await fetch(url);
    const data = await res.json();
    renderdata(data);
  } catch (err) {
    alert("err : " + err.message);
  }
}
//-----------------------sự kiện nút Next----------------------
btnnext.addEventListener("click", function () {
  container.innerHTML = "";
  getpage(a, b, ++pagenum.textContent);
});
//-----------------------sự kiện nút prev----------------------
btnprev.addEventListener("click", function () {
  container.innerHTML = "";
  getpage(a, b, --pagenum.textContent);
});

function checknext() {
  if (pagenum.textContent == Math.ceil(totalResults / a)) {
    btnnext.style.display = "none";
  }
  if (pagenum.textContent > 1) {
    btnprev.style.display = "block";
  }
}
function checkprev() {
  if (pagenum.textContent < Math.ceil(totalResults / a)) {
    btnnext.style.display = "block";
  }
  if (pagenum.textContent == 1) btnprev.style.display = "none";
}
//-----------------------render giao diện NEWS-------------------------------

const renderdata = function (data) {
  totalResults = data.totalResults;
  checknext();
  checkprev();
  let html = "";
  data.articles.forEach(function (article) {
    html += `<div class="card flex-row flex-wrap">
   <div class="card mb-3" style="">
       <div class="row no-gutters">
           <div class="col-md-4">
               <img src="${article.urlToImage}"
                   class="card-img"
                   alt="${article.description}">
           </div>
           <div class="col-md-8">
               <div class="card-body">
                   <h5 class="card-title">${article.title}</h5>
                   <p class="card-text">${article.content}</p>
                   <a href="${article.url}"
                       class="btn btn-primary">View</a>
               </div>
           </div>
       </div>
   </div>
 </div>`;
  });
  container.insertAdjacentHTML("beforeend", html);
};

getpage(a, b, 1);
