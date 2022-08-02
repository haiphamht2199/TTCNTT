const Logs = [
 {
  "id": "101",
  "name": "TV",
  "action": "Turn on",
  "date": "124689"
 },
 {
  "id": "102",
  "name": "Washer",
  "action": "Sleep",
  "date": "124518"
 },
 {
  "id": "103",
  "name": "Selling Fan",
  "action": "Turn off",
  "date": "124533"
 },
 {
  "id": "104",
  "name": "Washer",
  "action": "Turn on",
  "date": "124689"
 },
 {
  "id": "105",
  "name": "TV",
  "action": "Turn on",
  "date": "124533"
 },
 {
  "id": "106",
  "name": "Washer",
  "action": "Turn on",
  "date": "124899"
 },
 {
  "id": "107",
  "name": "Selling Fan",
  "action": "Turn off",
  "date": "124588"
 },
 {
  "id": "108",
  "name": "TV",
  "action": "Turn on",
  "date": "124689"
 },
 {
  "id": "109",
  "name": "Washer",
  "action": "Turn on",
  "date": "124533"
 },
 {
  "id": "110",
  "name": "Selling Fan",
  "action": "Turn on",
  "date": "124588"
 },
 {
  "id": "111",
  "name": "TV",
  "action": "Turn on",
  "date": "124689"
 },
 {
  "id": "112",
  "name": "Washer",
  "action": "Turn on",
  "date": "124533"
 },
 {
  "id": "113",
  "name": "TV",
  "action": "Turn on",
  "date": "124689"
 },
 {
  "id": "114",
  "name": "Selling Fan",
  "action": "Turn on",
  "date": "124689"
 },
 {
  "id": "115",
  "name": "TV",
  "action": "Turn on",
  "date": "124689"
 },
 {
  "id": "116",
  "name": "TV",
  "action": "Turn off",
  "date": "124566"
 },
 {
  "id": "117",
  "name": "TV",
  "action": "Turn on",
  "date": "124689"
 },
 {
  "id": "118",
  "name": "Washer",
  "action": "Sleep",
  "date": "124518"
 },
 {
  "id": "119",
  "name": "Selling Fan",
  "action": "Turn off",
  "date": "124533"
 },
 {
  "id": "120",
  "name": "Washer",
  "action": "Turn on",
  "date": "124689"
 },
 {
  "id": "121",
  "name": "TV",
  "action": "Turn on",
  "date": "124533"
 },
 {
  "id": "122",
  "name": "Washer",
  "action": "Turn on",
  "date": "124899"
 },
 {
  "id": "123",
  "name": "Selling Fan",
  "action": "Turn off",
  "date": "124588"
 },
 {
  "id": "124",
  "name": "TV",
  "action": "Turn on",
  "date": "124689"
 }
]
let perPage = 6;
let idPage = 1;
let start = 0;
let end = perPage;
let LogArr = [];
let showAdd = false;
LogArr = Logs;
const pageConfig = document.querySelector('.page-config select');
const mySelect = document.getElementById('mySelect');
const countTotalPage = document.querySelector('.total-page');
const countTotalProduct = document.querySelector('.total-item');

let totalPages = Math.ceil(LogArr.length / perPage);
const searchText = document.querySelector('.inputSearch');
const searchBtn = document.getElementById('search');
function initRender(LogArr, totalPage) {
 var nas = localStorage.getItem('name');
 var password = localStorage.getItem('password');
 if (!nas || !password) {
  window.location.href = "/signin.html";
 } else {
  renderLog(LogArr);
  renderListPage(totalPage);
 }

}

initRender(LogArr, totalPages);

function getCurrentPage(indexPage) {
 start = (indexPage - 1) * perPage;
 end = indexPage * perPage;
 totalPages = Math.ceil(LogArr.length / perPage);
 countTotalPage.innerHTML = `Total pages: ${totalPages}`;
 countTotalProduct.innerHTML = `Total Product:  ${LogArr.length}`
}

getCurrentPage(1);

searchBtn.addEventListener('click', () => {
 idPage = 1;
 LogArr = [];
 Logs.forEach((item, index) => {
  if (item.name.toLocaleLowerCase().indexOf(searchText.value.toLocaleLowerCase()) != -1) {
   LogArr.push(item);
  }
 });
 if (LogArr.length === 0) {
  $('.no-result').css('display', 'block')
 } else {
  $('.no-result').css('display', 'none')
 }
 getCurrentPage(idPage);
 initRender(LogArr, totalPages);
 changePage();
 if (totalPages <= 1) {
  $('.btn-prev').addClass('btn-active');
  $('.btn-next').addClass('btn-active');
 } else {
  $('.btn-next').removeClass('btn-active');
 }
});

searchText.addEventListener("keyup", (event) => {
 if (event.keyCode === 13) {
  event.preventDefault();
  searchBtn.click();
 }
});

pageConfig.addEventListener('change', () => {
 idPage = 1;
 perPage = Number(pageConfig.value);
 getCurrentPage(idPage);
 initRender(LogArr, totalPages);
 if (totalPages == 1) {
  $('.btn-prev').addClass('btn-active');
  $('.btn-next').addClass('btn-active');
 } else {
  $('.btn-next').removeClass('btn-active');
 }
 changePage();
});



function renderLog(Logs) {
 html = '';
 const content = Logs.map((item, index) => {
  if (index >= start && index < end) {
   html += '<tr>';
   html += '<td>' + item.id + '</td>';
   html += '<td>' + item.name + '</td>';
   html += '<td>' + item.action + '</td>';
   html += '<td>' + item.date + '</td>';
   html += '</tr>';
   return html;
  }
 });


 document.getElementById('logs').innerHTML = html;

}

function renderListPage(totalPages) {
 let html = '';
 html += `<li class="current-page active"><a>${1}</a></li>`;
 for (let i = 2; i <= totalPages; i++) {
  html += `<li><a>${i}</a></li>`;
 }
 if (totalPages === 0) {
  html = ''
 }
 document.getElementById('number-page').innerHTML = html;
}

function changePage() {
 const idPages = document.querySelectorAll('.number-page li');
 for (let i = 0; i < idPages.length; i++) {
  idPages[i].onclick = function () {
   let value = i + 1;
   const current = document.getElementsByClassName('active');
   current[0].className = current[0].className.replace('active', '');
   this.classList.add('active');
   if (value > 1 && value < idPages.length) {
    $('.btn-prev').removeClass('btn-active');
    $('.btn-next').removeClass('btn-active');
   }
   if (value == 1) {
    $('.btn-prev').addClass('btn-active');
    $('.btn-next').removeClass('btn-active');
   }
   if (value == idPages.length) {
    $('.btn-next').addClass('btn-active');
    $('.btn-prev').removeClass('btn-active');
   }
   idPage = value;
   getCurrentPage(idPage);
   renderLog(LogArr);
  };
 }
}

changePage();

$('.btn-next').on('click', () => {
 idPage++;
 if (idPage > totalPages) {
  idPage = totalPages;
 }
 if (idPage == totalPages) {
  $('.btn-next').addClass('btn-active');
 } else {
  $('.btn-next').removeClass('btn-active');
 }
 const btnPrev = document.querySelector('.btn-prev');
 btnPrev.classList.remove('btn-active');
 $('.number-page li').removeClass('active');
 $(`.number-page li:eq(${idPage - 1})`).addClass('active');
 getCurrentPage(idPage);
 renderLog(LogArr);
});

$('.btn-prev').on('click', () => {
 idPage--;
 if (idPage <= 0) {
  idPage = 1;
 }
 if (idPage == 1) {
  $('.btn-prev').addClass('btn-active');
 } else {
  $('.btn-prev').removeClass('btn-active');
 }
 const btnNext = document.querySelector('.btn-next');
 btnNext.classList.remove('btn-active');
 $('.number-page li').removeClass('active');
 $(`.number-page li:eq(${idPage - 1})`).addClass('active');
 getCurrentPage(idPage);
 renderLog(LogArr);
});
