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
window.addEventListener("DOMContentLoaded", async function () {
 var nameLocal = localStorage.getItem('name');
 var passwordLocal = localStorage.getItem('password');
 if (!nameLocal || !passwordLocal) {
  window.location.href = "/signin.html";
 }
 if (nameLocal && passwordLocal) {
  document.getElementById("namePr").value = nameLocal;
  document.getElementById("password").value = passwordLocal;
 }
});
var txtname = document.querySelector('#namePr');
var txtpassword = document.querySelector('#password')
function editProfile() {
 let isError = checkEmtyError([txtname, txtpassword]);
 if (!isError) {
  localStorage.setItem("name", txtname.value.trim());
  localStorage.setItem("password", txtpassword.value.trim());
 }
}