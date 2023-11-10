import "./main.js";
import "./header.js";

// DIGITE SEU CODIGO JAVASCRIPT
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
});

document.getElementById("signUpButton").addEventListener("click", verifyCredentials);

async function verifyCredentials() {
  const nameField = document.getElementById("nameInput");
  const validName = validateName(nameField);

  const emailField = document.getElementById("emailInput");
  const validEmail = validateEmail(emailField);

  const passwordField = document.getElementById("passwordInput");
  const validPassword = validatePassword(passwordField);

  const confirmPasswordField = document.getElementById("confirmPasswordInput");
  const validConfirm = validateConfirmPassword(confirmPasswordField, passwordField);
  if (validName && validEmail && validPassword && validConfirm) {
    await signup(nameField.value, emailField.value, passwordField.value);
  }
}

function validateName(nameField) {
  const name = nameField.value;
  if (name.length) {
    updateWarning("nameWarning", false);
    nameField.style.setProperty("--inputBorderColor", "var(--gray-gray-200)");
    return true;
  } else {
    nameField.style.setProperty("--inputBorderColor", "var(--color-orange-black)");
    nameField.focus();
    updateWarning("nameWarning", true, "O campo nome é obrigatório");
    return false;
  }
}

async function signup(name, email, password) {
  const user = await getExistingUser(email);
  if (user) {
    updateWarning("emailWarning", true, "O email que você inseriu já está conectado a uma conta");
  } else {
    updateWarning("emailWarning", false);
    const newUser = {
      availability: {
        counter: 0,
        details: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        },
      },
      name: name,
      email: email,
      password: password,
      lastAccess: new Date(),
      tokenExpire: getExpirationTime(0.1),
      school: [
        {
          id: 0,
          registerNumber: (Math.random() * 1e5).toFixed(0),
          role: "student",
        },
      ],
    };
    await insertUserOnDatabase(newUser);
    localStorage["user"] = JSON.stringify(newUser);
    window.location.href = "./dashboard.html";
  }
}

async function insertUserOnDatabase(user) {
  let usersArray;

  if (!localStorage["usersArray"]) {
    usersArray = await getUserDatabase();
  } else {
    usersArray = JSON.parse(localStorage["usersArray"]);
  }
  user.id = usersArray.length;
  usersArray.push(user);
  localStorage["usersArray"] = JSON.stringify(usersArray);
}

function getExpirationTime(hours) {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date;
}

async function getExistingUser(email) {
  const usersArray = !localStorage["usersArray"] ? await getUserDatabase() : JSON.parse(localStorage["usersArray"]);

  const user = usersArray.find((objeto) => objeto.email === email);
  return user;
}

async function getUserDatabase() {
  return fetch("./assets/bd/users.json")
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
}

function validateConfirmPassword(confirmPasswordField, passwordField) {
  const confirmPassword = confirmPasswordField.value;
  const password = passwordField.value;

  if (confirmPassword === password) {
    confirmPasswordField.style.setProperty("--inputBorderColor", "var(--gray-gray-200)");
    updateWarning("confirmPasswordWarning", false);
    return true;
  } else {
    confirmPasswordField.style.setProperty("--inputBorderColor", "var(--color-orange-black)");
    confirmPasswordField.focus();
    if (confirmPassword.length) {
      updateWarning("confirmPasswordWarning", true, "As senhas não coincidem");
    } else {
      updateWarning("confirmPasswordWarning", true, "O campo de confirmação de senha é obrigatório");
    }
    return false;
  }
}

function validatePassword(passwordField) {
  const password = passwordField.value;

  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(password)) {
    updateWarning("passwordWarning", false);
    passwordField.style.setProperty("--inputBorderColor", "var(--gray-gray-200)");
    return true;
  } else {
    passwordField.style.setProperty("--inputBorderColor", "var(--color-orange-black)");
    passwordField.focus();
    if (password.length < 8) {
      updateWarning("passwordWarning", true, "A senha deve ter no mínimo 8 caracteres");
    } else if (password.length > 15) {
      updateWarning("passwordWarning", true, "A senha deve ter no máximo 15 caracteres");
    } else if (password.search(/[a-z]/) < 0) {
      updateWarning("passwordWarning", true, "A senha deve ter pelo menos uma letra minúscula");
    } else if (password.search(/[A-Z]/) < 0) {
      updateWarning("passwordWarning", true, "A senha deve ter pelo menos uma letra maiúscula");
    } else if (password.search(/\d/) < 0) {
      updateWarning("passwordWarning", true, "A senha deve ter pelo menos um número");
    } else if (password.search(/[@.#$!%*?&]/) < 0) {
      updateWarning("passwordWarning", true, "A senha deve ter pelo menos um caractere especial");
    } else {
      updateWarning("passwordWarning", true, "A senha deve ter pelo menos um caractere especial");
    }
    return false;
  }
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
  emailField.focus();
  emailField.style.setProperty("--inputBorderColor", "var(--color-orange-black)");
  return false;
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
