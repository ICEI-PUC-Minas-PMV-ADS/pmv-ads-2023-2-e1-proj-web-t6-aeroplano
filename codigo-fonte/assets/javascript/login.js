import "./main.js";
import "./header.js";
import "./footer.js";

// Previne que a pagina seja recarregada depois que o botão submit (entrar)  é pressionado
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
});

// Event listener - Botão "Entrar"
document.getElementById("signInButton").addEventListener("click", verifyCredentials);

async function verifyCredentials() {
  var emailField = document.getElementById("emailInput");
  var passwordField = document.getElementById("passwordInput");

  const validEmail = validateEmail(emailField);
  const validPassword = validatePassword(passwordField);

  if (!validEmail) {
    emailField.focus();
  } else if (!validPassword) {
    passwordField.focus();
  } else {
    const user = await getExistingUser(emailField.value);
    if (user) {
      emailField.style.setProperty("--inputBorderColor", "var(--gray-gray-200)");
      updateWarning("emailWarning", false);

      if (checkPassword(passwordField.value, user.password)) {
        updateWarning("passwordWarning", false);
        localStorage["user"] = JSON.stringify(user);
        window.location.href = "./dashboard.html";
      } else {
        updateWarning("passwordWarning", true, "Senha incorreta");
      }
    } else {
      emailField.style.setProperty("--inputBorderColor", "var(--color-orange-black)");
      updateWarning("emailWarning", true, "O email que você inseriu não está conectado a uma conta");
    }
  }
}

function checkPassword(inputPass, databasePass) {
  // WIP - TODO - Check encripted passwords
  if (inputPass === databasePass) {
    return true;
  } else {
    return false;
  }
}

async function getExistingUser(email) {
  var userDataJson = await getUserDatabase();

  return await search(email, "email", userDataJson);
}

async function search(value, key, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
}

async function getUserDatabase() {
  return fetch("./assets/bd/users.json")
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
}

function validateEmail(emailField) {
  const email = emailField.value;

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    emailField.style.setProperty("--inputBorderColor", "var(--gray-gray-200)");
    updateWarning("emailWarning", false);
    return true;
  }
  if (email.length) {
    updateWarning("emailWarning", true, "O e-mail inserido é inválido");
  } else {
    updateWarning("emailWarning", true, "O campo e-mail é obrigatório");
  }
  emailField.style.setProperty("--inputBorderColor", "var(--color-orange-black)");
  return false;
}

function validatePassword(passwordField) {
  const password = passwordField.value;
  if (!password) {
    passwordField.style.setProperty("--inputBorderColor", "var(--color-orange-black)");
    updateWarning("passwordWarning", true, "O campo senha é obrigatório");
    return false;
  }
  if (password.length < 8) {
    passwordField.style.setProperty("--inputBorderColor", "var(--color-orange-black)");
    updateWarning("passwordWarning", true, "A senha deve conter no mínimo 8 caracteres");
    return false;
  } else {
    passwordField.style.setProperty("--inputBorderColor", "var(--gray-gray-200)");
    updateWarning("passwordWarning", false);
    return true;
  }
}

function updateWarning(fieldID, display, message = "") {
  const field = document.getElementById(fieldID);
  field.innerText = message;
  if (display) {
    field.style.display = "block";
  } else {
    field.style.display = "none";
  }
}
