"use strict";
const pagenum = document.getElementById("page-num");
const btnnext = document.getElementById("btn-next");
const btnprev = document.getElementById("btn-prev");
const inputquery = document.getElementById("input-query");
const btnsubmid = document.getElementById("btn-submit");
const news = document.getElementById("news-container");
var totalResults = 0;
//-----------------load giao diẹn khi mới vào ----------------------------
btnsubmid.addEventListener("click", function () {
  pagenum.textContent = "1";
  news.innerHTML = "";
  if (inputquery.value == "") {
    alert("NHập vào từ khoá tìm kiếm");
  } else {
    getpage(10, inputquery.value, 1);
  }
});
//-------------------lấy API------------------
async function getpage(pageSize, news, page) {
  try {
    const url =
      "https://newsapi.org/v2/everything?" +
      `q=${news}&` +
      `pageSize=${pageSize}&` +
      `page=${page}&` +
      "apiKey=46164065364544d9bc0bd5f40604987d";
    const res = await fetch(url);
    const data = await res.json();
    renderNews(data);
  } catch (err) {
    alert("err : " + err.message);
  }
}

//-------------------------------------- render trang--------------------------------------------------

const renderNews = function (data) {
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
  news.insertAdjacentHTML("beforeend", html);
};
//---------------------------------------------sự kiên bút lùi / tiến trang---------------------------

btnnext.addEventListener("click", function () {
  news.innerHTML = "";
  getpage("10", inputquery.value, ++pagenum.textContent);
});
btnprev.addEventListener("click", function () {
  news.innerHTML = "";
  getpage("10", inputquery.value, --pagenum.textContent);
});

function checknext() {
  if (pagenum.textContent == Math.ceil(totalResults / 10)) {
    btnnext.style.display = "none";
  }
  if (pagenum.textContent > 1) {
    btnprev.style.display = "block";
  }
}
function checkprev() {
  if (pagenum.textContent < Math.ceil(totalResults / 10)) {
    btnnext.style.display = "block";
  }
  if (pagenum.textContent == 1) btnprev.style.display = "none";
}
