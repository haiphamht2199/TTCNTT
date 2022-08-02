var email = document.querySelector('#email');
var password = document.querySelector('#password');
var form = document.querySelector('form');

function showError(input, message) {
 let parent = input.parentElement;
 let small = parent.querySelector('small');
 parent.classList.add("error");
 small.innerText = message;
}
function showSuccess(input) {
 let parent = input.parentElement;
 let small = parent.querySelector('small');
 parent.classList.remove("error");
 small.innerText = "";
}
function checkEmtyError(listInput) {
 let isEmtyError = false;
 listInput.forEach(input => {
  input.value = input.value.trim();
  if (!input.value) {
   isEmtyError = true;
   showError(input, "Không được để trống!");
  } else {
   showSuccess(input);
  }
 });
 return isEmtyError;
}
form.addEventListener('submit', function (e) {
 e.preventDefault();
 let isError = checkEmtyError([email, password]);
 console.log(isError)
 if (!isError) {
  if (password.value.trim() == '1234' && email.value.trim() == 'john') {
   window.location.href = "dashboard.html";
   localStorage.setItem("name", email.value.trim());
   localStorage.setItem("password", password.value.trim());
  } else {
   let small = document.querySelector(".error-toggle");
   small.innerText = "Mật khẩu hoặc tên đăng nhập sai!";
   return;
  }
 }
})


