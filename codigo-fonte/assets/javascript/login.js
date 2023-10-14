import "./main.js";
import "./header.js";
import "./footer.js";

// DIGITE SEU CODIGO JAVASCRIPT

const signInButton = document.getElementById("signInButton");

signInButton.addEventListener("click", verifyCredentials);

function verifyCredentials() {
  var emailField = document.getElementById("emailInput");
  var email = emailField.value;

  if (ValidateEmail(email)) {
    console.log("E-mail válido!");
  } else {
    console.log("E-mail inválido.");
  }
}

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

// Previne que a pagina seja recarregada depois que o botão submit (entrar)  é pressionado
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
});
