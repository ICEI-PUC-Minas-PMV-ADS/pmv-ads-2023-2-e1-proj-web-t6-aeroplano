var lsUser = localStorage["user"];
parseUser(lsUser);

var lsUserObject = JSON.parse(localStorage["user"]);
var userRole = lsUserObject.school[0].role;

document.getElementById("menuAvisos").remove();
document.getElementById("menuPerfil").remove();
// Remover botões de acordo com o papel do usuário
switch (userRole) {
  case "admin":
    break;
  case "manager":
    document.getElementById("menuDisponibilidade").remove();
    break;
  case "instructor":
    break;
  case "student":
    document.getElementById("menuTurma").remove();
    break;
  default:
    break;
}

document.addEventListener("disponibilidadeContentLoaded", function () {
  const script = document.createElement("script");
  script.src = `./assets/javascript/disponibilidade.js`;
  document.body.appendChild(script);
});

document.addEventListener("meusvoosContentLoaded", function () {
  const script = document.createElement("script");
  script.src = `./assets/javascript/meusvoos.js`;
  document.body.appendChild(script);
});

// Event listener - Botão "Logout"
document.getElementById("menuLogout").addEventListener("click", () => {
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  window.location.href = "./login.html";
});

const menuButtons = document.querySelectorAll(".menu-option");
menuButtons.forEach((element) => {
  element.addEventListener("click", () => {
    menuButtons.forEach((element) => {
      element.classList.remove("activeTab");
    });
    element.classList.add("activeTab");
    clearMainArea();
    if (element.id == "menuDisponibilidade") {
      loadMainArea("disponibilidade");
    } else if (element.id == "menuMeusVoos") {
      loadMainArea("meusvoos");
    } else if (element.id == "menuTurma") {
      window.location.href = "./turma.html";
    }
  });
});

menuButtons[0].click();

function parseUser(lsUser) {
  if (lsUser) {
    // Se "user" existe no local storage, iniciar parse. Se não, carregar login
    var user = JSON.parse(localStorage["user"]);
    document.getElementById("ribbonUserName").innerText = user.name;
    document.getElementById("ribbonUserEmail").innerText = user.email;
    if (user.metadata && user.metadata.avatar) {
      document.getElementById("userAvatar").src = user.metadata.avatar;
    }
  } else {
    window.location.href = "./login.html";
  }
}

function loadMainArea(app) {
  const mainAreaApp = document.getElementById("main-area");

  fetch(`./${app}.html`)
    .then((resp) => resp.text())
    .then((dados) => {
      mainAreaApp.innerHTML = dados;

      if (app == "disponibilidade") {
        const event = new Event("disponibilidadeContentLoaded");
        document.dispatchEvent(event);
      } else if (app == "meusvoos") {
        const event = new Event("meusvoosContentLoaded");
        document.dispatchEvent(event);
      } else if (app == "turma") {
        const event = new Event("turmaContentLoaded");
        document.dispatchEvent(event);
      }
    });
}

function clearMainArea() {
  const mainAreaApp = document.getElementById("main-area");
  mainAreaApp.innerHTML = "";
}
