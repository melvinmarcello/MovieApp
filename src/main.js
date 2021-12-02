// function setFormMessage(formElement, type, message) {
//   const messageElement = formElement.querySelector(".form_message");

//   messageElement.textContent = message;
//   messageElement.classList.remove("form_message-success", "form_message-error");
//   messageElement.classList.add(`form_message-${type}`);
// }

// function setInputError(inputElement, message) {
//   inputElement.classList.add("form_input-error");
//   inputElement.parentElement.querySelector(".form_input-error-message").textContent = message;
// }

// function clearInputError(inputElement) {
//   inputElement.classList.remove("form_input-error");
//   inputElement.parentElement.querySelector(".form_input-error-message").textContent = "";
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const loginForm = document.querySelector("#login");
//   const signUpForm = document.querySelector("#signUp");

//   document.querySelector("#linkSignUp").addEventListener("click", (e) => {
//     e.preventDefault();
//     loginForm.classList.add("form-hidden");
//     signUpForm.classList.remove("form-hidden");
//   });

//   document.querySelector("#linkLogin").addEventListener("click", (e) => {
//     e.preventDefault();
//     loginForm.classList.remove("form-hidden");
//     signUpForm.classList.add("form-hidden");
//   });

//   // loginForm.addEventListener("submit", e => {
//   //     e.preventDefault();

//   //     //Masukkin code AJAX/Fetch login disini

//   //     //Tergantung nanti error atau success, tinggal diatur aja, ni contohnya
//   //     setFormMessage(loginForm, "error", "Username/password Anda salah.");
//   // });

//   document.querySelectorAll(".form_input").forEach((inputElement) => {
//     inputElement.addEventListener("blur", (e) => {
//       if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
//         setInputError(inputElement, "Username minimal berjumlah 10 karakter.");
//       }
//     });

//     inputElement.addEventListener("input", (e) => {
//       clearInputError(inputElement);
//     });
//   });
// });
