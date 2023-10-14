import "./main.js";
import "./header.js";
import "./footer.js";

// DIGITE SEU CODIGO JAVASCRIPT

const signInButton = document.getElementById("signInButton");

signInButton.addEventListener("click", verifyCredentials);

function verifyCredentials() {
  var emailField = document.getElementById("emailInput");
  var passwordField = document.getElementById("passwordInput");

  const validEmail = validateEmail(emailField);
  const validPassword = validatePassword(passwordField);

  if (!validEmail) {
    emailField.focus();
  } else if (!validPassword) {
    passwordField.focus();
  }
}

function validateEmail(emailField) {
  const email = emailField.value;
  const validationMessage = document.getElementById("emailValidationMessage");

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    emailField.style.setProperty("--inputBorderColor", "var(--gray-gray-200)");
    validationMessage.innerText = "";
    validationMessage.style.display = "none";
    return true;
  }
  emailField.style.setProperty("--inputBorderColor", "var(--color-orange-black)");
  if (email.length) {
    validationMessage.innerText = "O e-mail inserido é invalido";
  } else {
    validationMessage.innerText = "O campo e-mail é obrigatório";
  }
  validationMessage.style.display = "block";
  return false;
}

function validatePassword(passwordField) {
  const password = passwordField.value;
  const validationMessage = document.getElementById("passwordValidationMessage");
  if (!password) {
    passwordField.style.setProperty("--inputBorderColor", "var(--color-orange-black)");
    validationMessage.innerText = "O campo senha é obrigatório";
    validationMessage.style.display = "block";
    return false;
  }
  if (password.length < 8) {
    passwordField.style.setProperty("--inputBorderColor", "var(--color-orange-black)");
    validationMessage.innerText = "A senha deve conter no mínimo 8 caracteres";
    validationMessage.style.display = "block";
    return false;
  } else {
    passwordField.style.setProperty("--inputBorderColor", "var(--gray-gray-200)");
    validationMessage.innerText = "";
    validationMessage.style.display = "none";
    return true;
  }
}

// Previne que a pagina seja recarregada depois que o botão submit (entrar)  é pressionado
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
});
